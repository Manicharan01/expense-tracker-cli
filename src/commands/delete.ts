#!/usr/bin/env node

import fs from "fs";
import { Expense } from "./add";

export function remove(id: any) {
  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  delete allExpenses[Number(id)];

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
