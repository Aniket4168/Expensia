import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert } from "@/lib/inngest/functions";
// import {
//   checkBudgetAlerts,
//   generateMonthlyReports,
//   processRecurringTransaction,
//   triggerRecurringTransactions,
// } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    // processRecurringTransaction,
    // triggerRecurringTransactions,
    // generateMonthlyReports,
    // checkBudgetAlerts,
    checkBudgetAlert
    
  ],
});
