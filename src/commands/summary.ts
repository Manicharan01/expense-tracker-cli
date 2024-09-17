#!/usr/bin/env node

import fs from "fs";

export function summary(options: any) {
  const allExpenses = JSON.parse(
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
    Object.keys(allExpenses).map((expense) => {
      if (
        new Date(allExpenses[expense].date) >= startMonth &&
        new Date(allExpenses[expense].date) <= endOfMonth
      ) {
        monthExpenses += allExpenses[expense].amount;
      }
    });

    console.log(`Total expenses: ₹${monthExpenses}`);
  } else {
    let totalExpense = 0;
    Object.keys(allExpenses).map((expense) => {
      totalExpense += allExpenses[expense].amount;
    });

    console.log(`Total expenses: ₹${totalExpense}`);
  }
}
