#!/usr/bin/env node

import { z } from "zod";
import fs from "fs";

const newExpenseSchema = z.object({
  amount: z.coerce.number(),
  id: z.coerce.number(),
  description: z.string(),
});
const dateSchema = z.coerce.date();

export function add(options: any) {
  const amount = options.amount;
  const id = options.id;
  const description = options.description;
  console.log(amount, id, description);

  const allExpenses = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  const newExpenseVariables = newExpenseSchema.parse({
    amount,
    id,
    description: description[0],
  });
  const newDateVariable = dateSchema.safeParse(new Date());

  const newExpense = {
    id: newExpenseVariables.id,
    date: String(newDateVariable.data).slice(0, 10),
    description: newExpenseVariables.description,
    amount: newExpenseVariables.amount,
  };

  allExpenses[String(newExpenseVariables.id)] = newExpense;

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
