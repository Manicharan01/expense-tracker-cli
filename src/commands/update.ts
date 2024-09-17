#!/usr/bin/env node

import { z } from "zod";
import fs from "fs";

const stringSchema = z.coerce.string();
const numberSchema = z.coerce.number();
const dateSchema = z.coerce.date();

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

export function update(options: any) {
  const updatedExpense: Expense = {
    id: 0,
    date: "",
    description: "",
    amount: 0,
  };

  const allExpenses = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  const wantedExpense = allExpenses[String(options.id)];

  if (options.amount) {
    const newAmount = numberSchema.parse(options.amount);
    updatedExpense["amount"] = newAmount;
  } else {
    updatedExpense["amount"] = wantedExpense.amount;
  }

  if (options.description) {
    const newDescription = stringSchema.parse(options.description);
    updatedExpense["description"] = newDescription;
  } else {
    updatedExpense["description"] = wantedExpense.description;
  }

  const newDate = dateSchema.safeParse(new Date());
  updatedExpense["date"] = String(newDate.data).slice(0, 10);
  updatedExpense["id"] = Number(options.id);

  allExpenses[String(options.id)] = updatedExpense;

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
