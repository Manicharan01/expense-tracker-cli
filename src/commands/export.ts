#!/usr/bin/env node

import fs from "fs";
import { Expense } from "./add";

export function jsonToCsv() {
  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  Object.keys(allExpenses).map((key) => {
    const line =
      String(allExpenses[Number(key)].id) +
      ", " +
      String(allExpenses[Number(key)].description) +
      ", " +
      String(allExpenses[Number(key)].amount) +
      ", " +
      String(allExpenses[Number(key)].date).slice(0, 10) +
      ", " +
      String(allExpenses[Number(key)].category) +
      "\n";
    console.log(line);
    fs.appendFileSync("files/expenses.csv", line);
  });
}
