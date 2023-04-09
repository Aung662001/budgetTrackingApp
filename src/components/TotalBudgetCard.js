import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudget } from "../context/BudgetContext";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudget();
  const usedAmount = expenses.reduce((total, current) => {
    return current.amount + total;
  }, 0);
  const maxAmount = budgets.reduce((total, current) => {
    return parseFloat(current.max) + total;
  }, 0);
  console.log(usedAmount);
  if (usedAmount === 0 || maxAmount === 0) return null;
  return (
    <BudgetCard
      darkGray
      name="Total"
      amount={usedAmount}
      maxAmount={maxAmount}
      hideButton={true}
    />
  );
}
