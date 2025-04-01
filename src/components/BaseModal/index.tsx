import React from "react";
import { Modal, Button } from "react-bootstrap";

interface BaseModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  show,
  onClose,
  children,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header className="bg-light">
        <Modal.Title className="me-auto">{title}</Modal.Title>
        <Button variant="close" onClick={onClose} aria-label="Close"></Button>
      </Modal.Header>
      <Modal.Body className="padding-content">{children}</Modal.Body>
    </Modal>
  );
};

export default BaseModal;
