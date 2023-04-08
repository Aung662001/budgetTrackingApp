import React from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudget() {
  React.useContext(BudgetContext);
}

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage();
  const [expenses, setExpenses] = useLocalStorage();
  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpenses({ description, amount, budgetId }) {
    setExpenses((prevExpense) => {
      return [...prevExpense, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget(name, max) {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => (budget.name = name))) return prevBudget;
      return [...prevBudget, { id: uuidV4(), max, name }];
    });
  }
  function deleteBudget({ id }) {
    setBudgets((prevBudget) => {
      return prevBudget.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    setExpenses((prevExpense) => {
      return prevExpense.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpenses,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
