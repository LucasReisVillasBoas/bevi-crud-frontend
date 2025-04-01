import styled from "styled-components";
import colors from "../../constants/colors";

export const ModalContainer = styled.div<{ type: "success" | "error" }>`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) =>
    type === "success" ? colors.success : colors.error};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  animation: fadeIn 0.3s ease-in-out;
  z-index: 9999;
`;

export const Message = styled.span`
  flex-grow: 1;
`;
