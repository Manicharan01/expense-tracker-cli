#!/usr/bin/env node

import fs from "fs";
import { DIRECTORY, Expense } from "./add";

export function jsonToCsv() {
    const allExpenses: Expense[] = JSON.parse(
        fs.readFileSync(`${DIRECTORY}/expenses.json`, "utf-8"),
    );
    const header: string = 'ID, Description, Amount, Date, Category\n'

    const today = new Date()
    const FILE_NAME = String(today.getFullYear()) + String(today.getMonth()) + String(today.getDate()) + "_expense_report"
    fs.writeFileSync(`${DIRECTORY}/${FILE_NAME}.csv`, header)

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
        fs.appendFileSync(`${DIRECTORY}/${FILE_NAME}.csv`, line);
    });
}
