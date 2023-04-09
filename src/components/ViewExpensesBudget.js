import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesBudget({ budgetId, closeModal }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudget();
  const expenses = getBudgetExpenses(budgetId);
  console.log(expenses, budgetId);
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((budget) => budget.id === budgetId);
  return (
    <Modal
      show={budgetId !== null && budgetId !== undefined}
      onHide={closeModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  closeModal();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vartical" gap={4}>
          {expenses.map((expense) => {
            return (
              <Stack direction="horizontal" key={expense.id}>
                <div className="me-auto fs-4">{expense.description}</div>
                <div className=" fs-3 mx-3">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteExpense(expense)}
                >
                  X
                </Button>
              </Stack>
            );
          })}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
