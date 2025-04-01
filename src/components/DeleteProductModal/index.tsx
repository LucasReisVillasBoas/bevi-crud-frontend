import React from "react";
import { Button } from "react-bootstrap";
import BaseModal from "../BaseModal";
import apiService from "../../services/apiService";
import { HttpMethod } from "../../enums/httpMethods";
import { useFeedback } from "../../contexts/FeedbackContext";
import { ProductDTO } from "../../dtos/ProductDTO";

interface DeleteProductModalProps {
  product: ProductDTO | null;
  show: boolean;
  onClose: () => void;
  onProductDeleted: (id: number) => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({
  product,
  show,
  onClose,
  onProductDeleted,
}) => {
  const { showFeedback } = useFeedback();

  // Handle confirm delete
  const handleConfirmDelete = async () => {
    if (!product) return;

    try {
      await apiService(`/product/delete`, {
        method: HttpMethod.DELETE,
        data: { id: product.id },
      });

      if (!product.id) {
        throw new Error("Erro ao excluir produto");
      }

      onProductDeleted(product.id);
      showFeedback("Produto excluído com sucesso!", "success");
    } catch (error) {
      showFeedback("Erro ao excluir produto", "error");
    } finally {
      onClose();
    }
  };

  return (
    <BaseModal title="Confirmação" show={show} onClose={onClose}>
      <p>Você realmente deseja excluir o item "{product?.name}"?</p>
      <div className="d-flex justify-content-start">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="danger" className="ms-2" onClick={handleConfirmDelete}>
          Excluir
        </Button>
      </div>
    </BaseModal>
  );
};

export default DeleteProductModal;
