import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListProducts from "./index";
import { FeedbackProvider } from "../../contexts/FeedbackContext";
import apiService from "../../services/apiService";

jest.mock("../../services/apiService", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: "Produto 1",
    description: "Descrição do Produto 1",
    price: 100.0,
    status: 1,
    stock_quantity: 10,
  },
  {
    id: 2,
    name: "Produto 2",
    description: "Descrição do Produto 2",
    price: 200.0,
    status: 2,
    stock_quantity: 5,
  },
];

describe("ListProducts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    render(
      <FeedbackProvider>
        <ListProducts />
      </FeedbackProvider>
    );
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  test("renders error state", async () => {
    (apiService as jest.Mock).mockRejectedValueOnce(
      new Error("Erro ao buscar produtos.")
    );
    render(
      <FeedbackProvider>
        <ListProducts />
      </FeedbackProvider>
    );

    expect(
      await screen.findByText(/Erro ao carregar produtos/i)
    ).toBeInTheDocument();
  });

  test("renders product list", async () => {
    (apiService as jest.Mock).mockResolvedValueOnce({ data: mockProducts });
    render(
      <FeedbackProvider>
        <ListProducts />
      </FeedbackProvider>
    );

    expect(await screen.findByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Produto 1")).toBeInTheDocument();
    expect(screen.getByText("R$ 100.00")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    expect(screen.getByText("Produto 2")).toBeInTheDocument();
    expect(screen.getByText("Descrição do Produto 2")).toBeInTheDocument();
    expect(screen.getByText("R$ 200.00")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("renders empty state when no products are found", async () => {
    (apiService as jest.Mock).mockResolvedValueOnce({ data: [] });
    render(
      <FeedbackProvider>
        <ListProducts />
      </FeedbackProvider>
    );

    expect(
      await screen.findByText(/Nenhum produto encontrado/i)
    ).toBeInTheDocument();
  });
});
