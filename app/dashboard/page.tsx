"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function dashboard() {
    const [expenses,setExpenses] = useState([{
        _id:"",
        title:"",
        description:"",
        amount:"",
        category:"",
        date:"",
        payment:"" 
    }])
    console.log(expenses)
    useEffect(() => {
        fetchExpenses()
    },[])
    const totalExpenses = expenses.length

const totalAmount = expenses.reduce(
    (total, item) => total + Number(item.amount), 0
)

const highestExpense = Math.max(
    0, ...expenses.map(item => Number(item.amount))
)

const averageExpense = totalExpenses > 0
    ? (totalAmount / totalExpenses).toFixed(2)
    : 0
    const fetchExpenses = async() => {
        const res = await axios.get('/api/expense')
        console.log(res);
        
        if(res.status === 200){
            setExpenses(res.data.data.expenses)
        }
    }
   const handleDelete = async(id:string) => {
            const res = await axios.delete(`/api/expense/${id}`)
            
            if(res.status === 200) {
                toast.success(res.data.message)
                fetchExpenses()
            }
        }
    return (
        <div className="flex flex-col items-center mt-5  mx-3">
        <div className="flex justify-center items-center gap-10">
            <h1 className="text-2xl font-black text-black">Track My Expenses</h1>
            <Link href={'/dashboard/add'} className="bg-blue-500 p-3 px-3 rounded-2xl shadow">Add Expense</Link>
        </div>
       
        <div className="flex gap-6 mt-7">

    <div className="flex flex-col items-center border border-gray-300 shadow p-5 rounded-xl">
        <p className="text-md text-gray-600">Total number of expenses</p>
        <h1 className="text-xl">{totalExpenses}</h1>
    </div>

    <div className="flex flex-col items-center border border-gray-300 shadow p-5 rounded-xl">
        <p className="text-md text-gray-600">Total expense amount</p>
        <h1 className="text-xl">₹{totalAmount}</h1>
    </div>

    <div className="flex flex-col items-center border border-gray-300 shadow p-5 rounded-xl">
        <p className="text-md text-gray-600">Highest expense amount</p>
        <h1 className="text-xl">₹{highestExpense}</h1>
    </div>

    <div className="flex flex-col items-center border border-gray-300 shadow p-5 rounded-xl">
        <p className="text-md text-gray-600">Average expense amount</p>
        <h1 className="text-xl">₹{averageExpense}</h1>
    </div>

</div>
        <div className="mt-5">
            {expenses?.length >0 ?
                <table className="table-auto border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-300">Title</th>
                        <th className="border border-gray-300">Amount</th>
                        <th className="border border-gray-300">Category</th>
                        <th className="border border-gray-300">Date</th>
                        <th className="border border-gray-300">Payment Method</th>
                        <th className="border border-gray-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses?.map(expense => (
                            <tr key={expense?._id}>
                        <td className="border border-gray-300">{expense?.title}</td>
                        <td className="border border-gray-300">{expense?.amount}</td>
                        <td className="border border-gray-300">{expense?.category}</td>
                        <td className="border border-gray-300">{new Date(expense?.date).toLocaleDateString("en-IN")}</td>
                        <td className="border border-gray-300">{expense?.payment}</td>
                        <td className="flex gap-2 border border-gray-300">
                            <Link href={`/dashboard/edit/${expense?._id}`} className="bg-yellow-500  px-2 rounded-xl m-2">Edit</Link>
                            <button onClick={()=>handleDelete(expense?._id)} className="bg-red-500  px-2 rounded-xl m-2">Delete</button>
                        </td>
                    </tr>
                        ))
                        
                    }
                </tbody>
            </table>
            :
           <p className="text-yellow-500 font-black mt-6">No Expenses Added Yet ! </p>
            }
        </div>
    </div>
    )
}