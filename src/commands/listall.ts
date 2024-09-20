#!/usr/bin/env node

import fs from "fs";
import { DIRECTORY, Expense } from "./add";

export function listall() {
    const allExpenses: Expense[] = JSON.parse(
        fs.readFileSync(`${DIRECTORY}/expenses.json`, "utf-8"),
    );

    console.log(allExpenses);
}
