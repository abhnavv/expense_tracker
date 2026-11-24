"use client"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function add() {
    const router = useRouter()
    const [expense,setExpense] = useState({
        title:"",
        description:"",
        amount:"",
        category:"",
        date:"",
        payment:""  
    })

    const handleAdd = async(e:any) => {
        e.preventDefault()
        const {title,
            description,
            amount,
            category,
            date,
            payment} = expense
            if(!title ||
                !description ||
                !amount ||
                !category ||
                !date ||
                !payment){
                    toast.error("Please fill the form completely")
                }else{
                    const res = await axios.post('/api/expense',expense)
                    
                    if(res.status === 201){
                        toast.success("added sucessfully")
                    }
                    router.push('/dashboard')
                }
        
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center border border-gray-300 rounded-xl p-6">
                <h1 className="text-2xl mb-3">Add My Expense</h1>
                <form onSubmit={handleAdd} className="flex flex-col items-center justify-center">
                    <input type="text" placeholder=" Expense Title" className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.title} onChange={(e)=>setExpense({...expense,title:e.target.value})}/>
                    <input type="text" placeholder="Description" className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.description} onChange={(e)=>setExpense({...expense,description:e.target.value})}/>
                    <input type="number" placeholder="Amount" className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.amount} onChange={(e)=>setExpense({...expense,amount:e.target.value})}/>
                    <input type="text" placeholder="Category " className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.category} onChange={(e)=>setExpense({...expense,category:e.target.value})}/>
                    <input type="date" placeholder="Expense Date" className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.date} onChange={(e)=>setExpense({...expense,date:e.target.value})}/>
                    <input type="text" placeholder="Payment Method" className="mb-3 p-2 px-3 border border-gray-200 rounded-xl w-full" value={expense.payment} onChange={(e)=>setExpense({...expense,payment:e.target.value})}/>
                    <button type="submit" className="bg-red-500 p-2 px-4 rounded-lg">Add</button>
                </form>
            </div>
        </div>
    )
}