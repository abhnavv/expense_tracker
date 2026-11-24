import { connectDB } from "@/lib/mongodb";
import expense from "@/models/expensemodel";
import { handler } from "next/dist/build/templates/app-route";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        await connectDB()
        const body = await req.json()
        const newExpense = await expense.create(body)
        return NextResponse.json({message:"Added successfully",data:{newExpense}},{status:201})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong",data:{}},{status:500})
        
    }
}

export async function GET(req:NextRequest){
    try {
        await connectDB()
        const expenses = await expense.find()
        return NextResponse.json({message:"Added successfully",data:{expenses}},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Something went wrong",data:{}},{status:500})
        
    }
}



