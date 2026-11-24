import { connectDB } from "@/lib/mongodb";
import expenses from "@/models/expensemodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = await params;

        const noteDetails = await expenses.findById(id);

        return NextResponse.json(
            { message: "Expense Details", data: noteDetails },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong", data: {} },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = await params;
        const body = await req.json();

        const updatedExpense = await expenses.findByIdAndUpdate(
            {_id:id},body,{new:true}
        );

        return NextResponse.json(
            {
                message: "Expense Updated Successfully",
                data: updatedExpense
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong", data: {} },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = await params;

        const deleteExpense = await expenses.findByIdAndDelete({_id:id});

        return NextResponse.json(
            {
                message: "Expense Deleted Successfully",
                data: deleteExpense
            },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong", data: {} },
            { status: 500 }
        );
    }
}