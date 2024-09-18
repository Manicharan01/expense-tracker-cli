#!/usr/bin/env node

import fs from "fs";
import { Expense } from "./add";

export function listall() {
  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  console.log(allExpenses);
}
