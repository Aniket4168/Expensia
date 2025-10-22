import { db } from "../prisma";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { name: "Check Budget Alerts" },
  { cron: "0 */6 * * *"},      //runs every 6 hours
  async ({ step }) => {
    const budgets = await step.run("fetch-budget", async () => {
        return await db.budget.findMany({
            include: {
                user: {
                    include: {
                        accounts: {
                            where: {
                                isDefault : true,
                            },
                        },
                    },
                },
            },
        });
    });


    for(const budget of budgets) {
        const defautAccount = budget.user.accounts[0];
        if(!defautAccount) continue; //skip if no default account

        await step.run(`check-budget-${budget.id}`, async () => {
            const startDate = new Date();
            startDate.setDate(1); //start of current month
        })
    }
  }
);