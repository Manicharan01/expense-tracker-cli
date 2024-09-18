#!/usr/bin/env node

import { z } from "zod";
import fs from "fs";
import { categories } from "./add";
import { Expense } from "./add";

const stringSchema = z.coerce.string();
const numberSchema = z.coerce.number();
const enumSchema = z.nativeEnum(categories);

export function update(options: any) {
  const updatedExpense: Expense = {
    id: 0,
    description: "",
    amount: 0,
  };

  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  const wantedExpense = allExpenses[Number(options.id)];

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

  if (options.category) {
    const newCategory = enumSchema.parse(options.category);
    updatedExpense["category"] = newCategory;
  } else {
    updatedExpense["category"] = wantedExpense.category;
  }

  updatedExpense["id"] = Number(options.id);

  allExpenses[Number(options.id)] = updatedExpense;

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
