#!/usr/bin/env node

import fs from "fs";
import { Expense } from "./add";

export function summary(options: any) {
  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  const today = new Date();

  if (options.month) {
    const startMonth = new Date(
      today.getFullYear(),
      Number(options.month) - 1,
      2,
    );
    const endOfMonth = new Date(
      today.getFullYear(),
      Number(options.month) - 1,
      32,
    );

    let monthExpenses = 0;
    Object.keys(allExpenses).map((key) => {
      if (
        new Date(allExpenses[Number(key)].date ?? new Date()) >= startMonth &&
        new Date(allExpenses[Number(key)].date ?? new Date()) <= endOfMonth
      ) {
        monthExpenses += allExpenses[Number(key)].amount ?? 0;
      }
    });

    console.log(`Total expenses: ₹${monthExpenses}`);
  } else {
    let totalExpense = 0;
    Object.keys(allExpenses).map((key) => {
      totalExpense += allExpenses[Number(key)].amount ?? 0;
    });

    console.log(`Total expenses: ₹${totalExpense}`);
  }
}
