#!/usr/bin/env node

import { Command } from "commander";
import { add } from "./commands/add";
import { update } from "./commands/update";
import { remove } from "./commands/delete";
import { listall } from "./commands/listall";
const program = new Command();

program
  .name("expense-tracker")
  .description("One tracker to track all expenses")
  .version("0.1.0");

program
  .command("add")
  .option(
    "-id, --id <number>",
    "Please enter a number to assign a ID to expense",
  )
  .option("-desc, --description [words...]", "Add a description to the Expense")
  .option("-a, --amount [number]", "Money expended")
  .action(add);

program
  .command("update")
  .option(
    "-id, --id <number>",
    "Please enter a ID of the expense that you want to update",
  )
  .option(
    "-desc, --description [words...]",
    "Add a new description to the Expense",
  )
  .option("-a, --amount [number]", "Update Money expended")
  .action(update);

program.command("delete [id]").action(remove);

program.command("listall").action(listall);

program.parse(process.argv);
