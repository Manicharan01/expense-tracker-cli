#!/usr/bin/env node

import fs from "fs";

export function listall() {
  const allExpenses = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  console.log(allExpenses);
}
