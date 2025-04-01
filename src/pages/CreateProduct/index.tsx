import React, { useState } from "react";
import apiService from "../../services/apiService";
import { ProductDTO } from "../../dtos/ProductDTO";
import { ProductStatus } from "../../enums/productStatus";
import { HttpMethod } from "../../enums/httpMethods";
import { useFeedback } from "../../contexts/FeedbackContext";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const Navigate = useNavigate();
  const { showFeedback } = useFeedback();
  const [product, setProduct] = useState<ProductDTO>({
    name: "",
    description: "",
    price: 0,
    status: ProductStatus.IN_STOCK,
    stock_quantity: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "status") {
      const newStatus = Number(value);
      setProduct((prev) => ({
        ...prev,
        [name]: newStatus,
        stock_quantity:
          newStatus === ProductStatus.OUT_OF_STOCK ? 0 : prev.stock_quantity,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "stock_quantity" ? Number(value) : value,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const validationErrors: string[] = [];

    if (!product.name) validationErrors.push("O nome é obrigatório.");

    if (isNaN(product.price) || product.price <= 0)
      validationErrors.push("O preço deve ser um número positivo.");
    if (
      product.status !== ProductStatus.OUT_OF_STOCK &&
      (isNaN(product.stock_quantity) || product.stock_quantity < 0)
    ) {
      validationErrors.push(
        "A quantidade em estoque deve ser um número válido."
      );
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await apiService("/product/create", {
        method: HttpMethod.POST,
        data: product,
      });
      showFeedback("Produto criado com sucesso!", "success");
      setProduct({
        name: "",
        description: "",
        price: 0,
        status: ProductStatus.IN_STOCK,
        stock_quantity: 0,
      });
      Navigate("/produtos");
    } catch (error: unknown) {
      const errorMessage =
        (error as { error?: string })?.error || "Erro desconhecido.";
      showFeedback(`${errorMessage}`, "error");
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow mt-4 custom-card">
        <div className="card-header bg-light">
          <h2 className="m-0">Criar Produto</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nome do Produto</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nome do Produto"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descrição do Produto</label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Descrição do Produto"
                value={product.description}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Preço do Produto</label>
              <input
                type="number"
                name="price"
                className="form-control"
                placeholder="Preço do Produto"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status do Produto</label>
              <select
                name="status"
                className="form-select"
                value={product.status}
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
                placeholder="Quantidade em Estoque"
                value={product.stock_quantity}
                onChange={handleChange}
                disabled={product.status === ProductStatus.OUT_OF_STOCK}
              />
              {product.status === ProductStatus.OUT_OF_STOCK && (
                <div className="text-danger">
                  Somente produtos em reposição ou em estoque podem ter
                  quantidade definida.
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Criar Produto
            </button>

            {errors.length > 0 && (
              <div className="mt-3 text-danger">
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
