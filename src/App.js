import { Button, Container, Stack } from "react-bootstrap";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModel from "./components/addBudgetModel";
import { useState } from "react";
import { useBudget } from "./context/BudgetContext";
import AddExpenseModel from "./components/AddExpenseModel";

function App() {
  const [showAppBudgetModel, setShowAppBudgetModel] = useState(false);
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false);
  const [AddExpenseModelBudgetId, setAddExpenseModelBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudget();

  function openAddExpendModel(budgetId) {
    setShowAddExpenseModel(true);
    setAddExpenseModelBudgetId(budgetId);
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAppBudgetModel(true)}>
            Add Budget
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => openAddExpendModel(true)}
          >
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                maxAmount={budget.max}
                gray
                onAddExpendClick={() => openAddExpendModel(budget.id)}
              />
            );
          })}
        </div>
      </Container>
      <AddBudgetModel
        show={showAppBudgetModel}
        closeModal={() => setShowAppBudgetModel(false)}
      />
      <AddExpenseModel
        show={showAddExpenseModel}
        defaultBudgetId={AddExpenseModelBudgetId}
        closeModal={() => setShowAddExpenseModel(false)}
      />
    </>
  );
}

export default App;
