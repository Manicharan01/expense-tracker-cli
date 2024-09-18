#!/usr/bin/env node

import { z } from "zod";
import fs from "fs";

export interface Expense {
  id?: number;
  amount?: number;
  description?: string;
  category?: categories;
  date?: Date;
}

export enum categories {
  Groceries = "Groceries",
  Leisure = "Leisure",
  Elsectronics = "Electronics",
  Utilities = "Utilities",
  Clothing = "Clothing",
  Health = "Health",
  Others = "Others",
}

const newExpenseSchema = z.object({
  amount: z.coerce.number(),
  id: z.coerce.number(),
  description: z.string(),
  body: z.object({
    category: z.nativeEnum(categories),
  }),
});
const dateSchema = z.coerce.date();

export function add(options: any) {
  const amount = options.amount;
  const id = options.id;
  const description = options.description;
  const category = options.category;

  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  const newExpenseVariables = newExpenseSchema.parse({
    amount,
    id,
    body: { category },
    description: description[0],
  });
  const newDate = dateSchema.safeParse(String(options.date));

  const newExpense: Expense = {
    id: newExpenseVariables.id,
    date: newDate?.data ?? new Date(),
    category: newExpenseVariables.body.category,
    description: newExpenseVariables.description,
    amount: newExpenseVariables.amount,
  };

  allExpenses[newExpenseVariables.id] = newExpense;

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
