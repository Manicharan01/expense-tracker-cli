#!/usr/bin/env node

import fs from "fs";
import { categories, Expense } from "./add";
import { z } from "zod";

const categorySchema = z.object({
  body: z.object({
    category: z.nativeEnum(categories),
  }),
});

export function filter(options: any) {
  const category = options.category;
  const parsedCategory = categorySchema.parse({ body: { category } });

  const allExpenses: Expense[] = JSON.parse(
    fs.readFileSync("files/expenses.json", "utf-8"),
  );

  Object.keys(allExpenses).map((key) => {
    if (allExpenses[Number(key)].category === parsedCategory.body.category) {
      console.log(allExpenses[Number(key)]);
    }
  });
}
