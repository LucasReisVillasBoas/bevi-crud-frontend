import React, { useEffect, useState } from "react";
import apiService from "../../services/apiService";
import { ProductDTO } from "../../dtos/ProductDTO";
import { HttpMethod } from "../../enums/httpMethods";
import { useFeedback } from "../../contexts/FeedbackContext";
import { translateProductStatus } from "../../utils/productUtils";
import EditProductModal from "../../components/EditProductModal";
import DeleteProductModal from "../../components/DeleteProductModal";
import ShowProductModalReadOnly from "../../components/ShowProductModal";

const ListProducts: React.FC = () => {
  const { showFeedback } = useFeedback();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<ProductDTO | null>(
    null
  );
  const [showEditProductModal, setShowEditProductModal] =
    useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );
  const [detailsProduct, setDetailsProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    if (error !== null) {
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await apiService("/product/list", {
          method: HttpMethod.POST,
        });
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao buscar produtos.");
        showFeedback("Erro ao carregar produtos", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProductInList = (updatedProduct: ProductDTO) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleEditClick = (product: ProductDTO) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleCloseEditProductModal = () => {
    setShowEditProductModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteClick = (product: ProductDTO) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleProductDeleted = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  const handleShowProductClick = (product: ProductDTO) => {
    setDetailsProduct(product);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card shadow mt-4 custom-card">
        <div className="card-header bg-light">
          <h2 className="m-0">Listagem de Produtos</h2>
        </div>
        <div className="card-body">
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Status</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="align-middle">{product.name}</td>
                      <td className="align-middle">{product.description}</td>
                      <td className="align-middle">
                        R$ {product.price.toFixed(2)}
                      </td>
                      <td className="align-middle">
                        {translateProductStatus(product.status)}
                      </td>
                      <td className="align-middle">{product.stock_quantity}</td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-sm"
                          onClick={() => handleShowProductClick(product)}
                        >
                          <i className="bi bi-eye text-info fs-5"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleEditClick(product)}
                        >
                          <i className="bi bi-pencil text-warning fs-5"></i>
                        </button>
                        <button
                          className="btn btn-sm"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <i className="bi bi-trash text-danger fs-5"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de Edição */}
      {selectedProduct && (
        <EditProductModal
          show={showEditProductModal}
          onClose={handleCloseEditProductModal}
          product={selectedProduct}
          onUpdateProduct={updateProductInList}
        />
      )}

      {/* Modal de Exclusão */}
      <DeleteProductModal
        product={productToDelete}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onProductDeleted={handleProductDeleted}
      />

      {/* Modal de Visualização */}
      {detailsProduct && (
        <ShowProductModalReadOnly
          productId={detailsProduct?.id}
          show={!!detailsProduct?.id}
          onClose={() => setDetailsProduct(null)}
        />
      )}
    </div>
  );
};

export default ListProducts;
