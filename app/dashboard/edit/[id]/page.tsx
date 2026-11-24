
"use client";

import { useEffect, useState, Suspense } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Edit />
        </Suspense>
    );
}

function Edit() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    console.log(id);

    const [expense, setExpense] = useState({
        title: "",
        description: "",
        amount: "",
        category: "",
        date: "",
        payment: ""
    });

    console.log(expense);

    useEffect(() => {
        getExpenseDetails();
    }, [id]);

    const getExpenseDetails = async () => {
        try {
            const res = await axios.get(`/api/expense/${id}`);

            console.log(res);

            if (res.status === 200) {
                setExpense({
                    ...res.data.data,
                    amount: String(res.data.data.amount),
                    date: new Date(res.data.data.date)
                        .toISOString()
                        .split("T")[0]
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch expense details");
        }
    };

    const handleEdit = async (e: any) => {
        e.preventDefault();

        const {
            title,
            description,
            amount,
            category,
            date,
            payment
        } = expense;

        if (
            !title ||
            !description ||
            !amount ||
            !category ||
            !date ||
            !payment
        ) {
            toast.error("Please fill the form completely");
        } else {
            try {
                const res = await axios.put(`/api/expense/${id}`, {
                    ...expense,
                    amount: Number(expense.amount)
                });

                if (res.status === 200) {
                    toast.success("Expense updated successfully");
                    router.push("/dashboard");
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to update expense");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-6">
                <h1 className="text-2xl mb-3">Edit My Expense</h1>

                <form
                    onSubmit={handleEdit}
                    className="flex flex-col items-center justify-center"
                >
                    <input
                        type="text"
                        placeholder="Expense Title"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.title}
                        onChange={e => setExpense({
                            ...expense,
                            title: e.target.value
                        })}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.description}
                        onChange={e => setExpense({
                            ...expense,
                            description: e.target.value
                        })}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.amount}
                        onChange={e => setExpense({
                            ...expense,
                            amount: e.target.value
                        })}
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.category}
                        onChange={e => setExpense({
                            ...expense,
                            category: e.target.value
                        })}
                    />

                    <input
                        type="date"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.date}
                        onChange={e => setExpense({
                            ...expense,
                            date: e.target.value
                        })}
                    />

                    <input
                        type="text"
                        placeholder="Payment Method"
                        className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full"
                        value={expense.payment}
                        onChange={e => setExpense({
                            ...expense,
                            payment: e.target.value
                        })}
                    />

                    <button
                        type="submit"
                        className="bg-red-500 p-2 px-4 rounded-lg"
                    >
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
}
