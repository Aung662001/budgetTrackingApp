import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useBudget, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetContext";

export default function AddExpenseModel({ show, closeModal, defaultBudgetId }) {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpenses, budgets } = useBudget();
  function handleSubmit(e) {
    e.preventDefault();
    addExpenses({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    closeModal();
  }
  return (
    <Modal show={show} onHide={closeModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              required
              ref={descriptionRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              min={0}
              step={0.01}
              ref={amountRef}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="budgetId" className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option value={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
            </Form.Select>
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
