"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";

const serializeTransaction = (obj) => {
    const serialized = {...obj};

    if(obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }

    if(obj.amount) {
        serialized.amount = obj.amount.toNumber();
    }
}

export async function createAccount(data) {
    try{
        const {userId} = await auth();
        if(!userId) throw new Error("unauthorized");

        const user = await db.user.findUnique({
            where: {clerkUserId : userId},
        });

        if(!user) {
            throw new Error("User Not Found");
        }

        //convert balance to float before saving
        const balanceFloat = parseFloat(data.balance);

        if(isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }

        //check if this is the user's first account
        const existingAccounts = await db.account.findMany({
            where: { userId : user.id},
        });

        const shouldBeDefault = existingAccounts.length === 0 ? true: data.isDefault;

        //is this account should be defaut, set other accounts as non default
        if(shouldBeDefault) {
            await db.account.updateMany({
                where: { userId : user.id, isDefault:true},
                data: {isDefault:false},
            });
        }

        // create account
        const account = await db.account.create({
            data: {
                ...data, 
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });

        //next js doesnt support decimal/float value, 
        //hence we need to serealize this before returning back to int

        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");
        return {success: true, data: serializedAccount};

    } catch(error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts() {
    const {userId} = await auth();
    if(!userId) throw new Error("unauthorized");

    const user = await db.user.findUnique({
        where: {clerkUserId : userId},
    });

    if(!user) {
        throw new Error("User Not Found");
    }

    const accounts = await db.account.findMany({
        where: {userId: user.id},
        orderBy: { createdAt: "desc"},
        include: {
            _count:{
                select : {
                    transactions:true,
                },
            },
        },
    });

    const serializedAccount = serializeTransaction(account);

    return serializedAccount;
}