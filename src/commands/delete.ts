#!/usr/bin/env node

import fs from "fs";

export function remove(id: any) {
  const allExpenses = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  delete allExpenses[String(id)];

  fs.writeFileSync("files/expenses.json", JSON.stringify(allExpenses));
}
