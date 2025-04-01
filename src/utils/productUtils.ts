export const translateProductStatus = (status: number): string => {
  const statusMap: { [key: number]: string } = {
    1: "Em Estoque",
    2: "Em Reposição",
    3: "Em Falta",
  };

  return statusMap[status] || "Status Desconhecido";
};
