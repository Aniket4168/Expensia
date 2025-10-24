import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransaction } from "@/lib/inngest/functions";
// import {
//   checkBudgetAlerts,
//   generateMonthlyReports,
//   processRecurringTransaction,
//   triggerRecurringTransactions,
// } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransaction,
    generateMonthlyReports,
    // checkBudgetAlerts,
    checkBudgetAlert    
  ],
});
