import React from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export function useBudget() {
  return React.useContext(BudgetContext);
}
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function BudgetProvider({ children }) {
  const [budgets, setBudgets] = useLocalStorage("budget", []);
  const [expenses, setExpenses] = useLocalStorage("expense", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }
  function addExpenses({ description, amount, budgetId }) {
    setExpenses((prevExpense) => {
      return [...prevExpense, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    setBudgets((prevBudget) => {
      if (prevBudget.find((budget) => budget.name === name)) return prevBudget;
      return [...prevBudget, { id: uuidV4(), max, name }];
    });
  }
  function deleteBudget({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
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
