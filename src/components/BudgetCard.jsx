import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({ name, amount, maxAmount, gray }) {
  const className = [];
  if (amount > maxAmount) {
    className.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    className.push("bg-light");
  }
  return (
    <Card className={className.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div>{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}/
            <span className="ms-2 fs-6 text-mute">
              {currencyFormatter.format(maxAmount)}
            </span>
          </div>
        </Card.Title>
        <ProgressBar
          className="rounded-pill"
          variant={getProgressBarVarient(amount, maxAmount)}
          min={0}
          max={maxAmount}
          now={amount}
        />
        <Stack
          direction="horizontal"
          gap="2"
          className="mt-3 display-flex justify-content-end"
        >
          <Button variant="outline-primary">Add Expense</Button>
          <Button variant="outline-secondary">View Expense</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
function getProgressBarVarient(amount, maxAmount) {
  const ratio = amount / maxAmount;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
