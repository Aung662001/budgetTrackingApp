import { Button, Container, Stack } from "react-bootstrap";
import "./App.css";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModel from "./components/addBudgetModel";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./context/BudgetContext";
import AddExpenseModel from "./components/AddExpenseModel";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesBudget from "./components/ViewExpensesBudget";

function App() {
  const [showAppBudgetModel, setShowAppBudgetModel] = useState(false);
  const [showAddExpenseModel, setShowAddExpenseModel] = useState(false);
  const [AddExpenseModelBudgetId, setAddExpenseModelBudgetId] = useState();
  const [viewExpensesBudgetId, setViewExpensesBudgetId] = useState();
  console.log(viewExpensesBudgetId);
  const { budgets, getBudgetExpenses } = useBudget();
  console.log(AddExpenseModelBudgetId);

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
                onViewExpenseClick={() => setViewExpensesBudgetId(budget.id)}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpendClick={openAddExpendModel}
            onViewExpenseClick={() =>
              setViewExpensesBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
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
      <ViewExpensesBudget
        budgetId={viewExpensesBudgetId}
        closeModal={() => setViewExpensesBudgetId()}
      />
    </>
  );
}
export default App;
