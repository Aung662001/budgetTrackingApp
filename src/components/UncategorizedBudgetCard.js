import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "../context/BudgetContext";

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses, openAddExpendModel } = useBudget();
  const uncategorizedBudget = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID);
  const amount = uncategorizedBudget.reduce((total, current) => {
    return current.amount + total;
  }, 0);
  if (amount === 0) return null;
  return <BudgetCard gray name="Uncategorized" amount={amount} {...props} />;
}
