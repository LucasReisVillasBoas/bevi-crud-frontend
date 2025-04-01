import React from "react";
import { ModalContainer, Message } from "./styles";

interface FeedbackModalProps {
  message: string;
  type: "success" | "error";
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ message, type }) => {
  return (
    <ModalContainer type={type}>
      <Message>{message}</Message>
    </ModalContainer>
  );
};

export default FeedbackModal;
