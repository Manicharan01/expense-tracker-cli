#!/usr/bin/env node

import fs from "fs";
import { DIRECTORY, Expense } from "./add";

export function remove(id: any) {
    const allExpenses: Expense[] = JSON.parse(
        fs.readFileSync(`${DIRECTORY}/expenses.json`, "utf-8"),
    );

    delete allExpenses[Number(id)];

    fs.writeFileSync(`${DIRECTORY}/expenses.json`, JSON.stringify(allExpenses));
}
