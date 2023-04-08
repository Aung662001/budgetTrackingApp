import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudget } from "../context/BudgetContext";

export default function AddBudgetModel({ show, closeModal }) {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudget();
  function handleSubmit(e) {
    e.preventDefault();
    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });
    closeModal();
  }
  return (
    <Modal show={show} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required ref={nameRef}></Form.Control>
          </Form.Group>
          <Form.Group controlId="max" className="mb-3">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              ref={maxRef}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end  ">
            <Button type="submit" variant="primary" className="mr-4">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
