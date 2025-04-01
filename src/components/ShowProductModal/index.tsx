import React, { useEffect, useState } from "react";
import BaseModal from "../BaseModal";
import { ProductDTO } from "../../dtos/ProductDTO";
import { ProductStatus } from "../../enums/productStatus";
import { Button } from "react-bootstrap";
import apiService from "../../services/apiService";
import { HttpMethod } from "../../enums/httpMethods";

interface ShowProductModalProps {
  show: boolean;
  onClose: () => void;
  productId?: number;
}

const ShowProductModalReadOnly: React.FC<ShowProductModalProps> = ({
  show,
  onClose,
  productId,
}) => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (show && productId) {
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, productId]);

  // Functionality to fetch product
  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService(`/product/read?id=${productId}`, {
        method: HttpMethod.GET,
      });
      setProduct(response.data);
    } catch (error) {
      setError("Erro ao carregar produto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal title="Detalhes do Produto" show={show} onClose={onClose}>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : product ? (
        <div>
          <div className="mb-3">
            <label className="form-label">Nome do Produto</label>
            <input
              type="text"
              className="form-control"
              value={product.name}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descrição do Produto</label>
            <textarea
              className="form-control"
              value={product.description}
              disabled
              rows={3}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Preço do Produto</label>
            <input
              type="number"
              className="form-control"
              value={product.price}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Status do Produto</label>
            <input
              type="text"
              className="form-control"
              value={ProductStatus[product.status]}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantidade em Estoque</label>
            <input
              type="number"
              className="form-control"
              value={product.stock_quantity}
              disabled
            />
          </div>
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
        </div>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </BaseModal>
  );
};

export default ShowProductModalReadOnly;
