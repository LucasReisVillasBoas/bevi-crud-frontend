import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateProduct from "./index";
import { FeedbackProvider } from "../../contexts/FeedbackContext";

test("renders CreateProduct", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const headingElements = screen.getAllByText(/Criar Produto/i);
  expect(headingElements[0]).toBeInTheDocument();
});

test("renders name field", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const nameElement = screen.getByPlaceholderText(/Nome do produto/i);
  expect(nameElement).toBeInTheDocument();
});

test("renders stock quantity field", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const stockQuantityElement = screen.getByPlaceholderText(
    /Quantidade em estoque/i
  );
  expect(stockQuantityElement).toBeInTheDocument();
});

test("renders status select", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const statusElement = screen.getByRole("combobox");
  expect(statusElement).toBeInTheDocument();
});

/* forçando erro */
test("renders description field", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const descriptionElement =
    screen.getByPlaceholderText(/Descri o do produto/i);
  expect(descriptionElement).toBeInTheDocument();
});

test("renders price field", () => {
  render(
    <FeedbackProvider>
      {" "}
      <CreateProduct />{" "}
    </FeedbackProvider>
  );
  const priceElement = screen.getByPlaceholderText(/Pre o/i);
  expect(priceElement).toBeInTheDocument();
});
