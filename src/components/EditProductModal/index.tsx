import React, { useState } from "react";
import BaseModal from "../BaseModal";
import { ProductDTO } from "../../dtos/ProductDTO";
import { ProductStatus } from "../../enums/productStatus";
import { Button } from "react-bootstrap";
import apiService from "../../services/apiService";
import { HttpMethod } from "../../enums/httpMethods";
import { useFeedback } from "../../contexts/FeedbackContext";

interface EditProductModalProps {
  show: boolean;
  onClose: () => void;
  product: ProductDTO;
  onUpdateProduct: (updatedProduct: ProductDTO) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  show,
  onClose,
  product,
  onUpdateProduct,
}) => {
  const { showFeedback } = useFeedback();
  const [editedProduct, setEditedProduct] = useState<ProductDTO>(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "status") {
      const newStatus = Number(value);
      setEditedProduct((prev) => ({
        ...prev,
        [name]: newStatus,
        stock_quantity:
          newStatus === ProductStatus.OUT_OF_STOCK ? 0 : prev.stock_quantity,
      }));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "stock_quantity" || name === "status"
            ? Number(value)
            : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(editedProduct);
    try {
      const updatedProduct = await apiService(`/product/update`, {
        method: HttpMethod.PUT,
        data: editedProduct,
      });

      onUpdateProduct(updatedProduct.data);
      showFeedback("Produto atualizado com sucesso!", "success");
      onClose();
    } catch (error) {
      const errorMessage =
        (error as { error?: string })?.error || "Erro ao atualizar produto.";
      showFeedback(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal title="Editar Produto" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome do Produto</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={editedProduct.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição do Produto</label>
          <textarea
            name="description"
            className="form-control"
            value={editedProduct.description}
            onChange={handleChange}
            required
            rows={3}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Preço do Produto</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={editedProduct.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status do Produto</label>
          <select
            name="status"
            className="form-select"
            value={editedProduct.status}
            onChange={handleChange}
          >
            <option value={ProductStatus.IN_STOCK}>Em Estoque</option>
            <option value={ProductStatus.REPLENISHING}>Em Reposição</option>
            <option value={ProductStatus.OUT_OF_STOCK}>Em Falta</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Quantidade em Estoque</label>
          <input
            type="number"
            name="stock_quantity"
            className="form-control"
            value={editedProduct.stock_quantity}
            onChange={handleChange}
            required
            disabled={editedProduct.status === ProductStatus.OUT_OF_STOCK}
          />
          {editedProduct.status === ProductStatus.OUT_OF_STOCK && (
            <div className="text-danger">
              Somente produtos em reposição ou em estoque podem ter quantidade
              definida.
            </div>
          )}
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Atualizando..." : "Atualizar Produto"}
        </Button>
      </form>
    </BaseModal>
  );
};

export default EditProductModal;
