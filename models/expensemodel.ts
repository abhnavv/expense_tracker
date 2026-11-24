import mongoose from "mongoose";

interface expense{
    title:string,
    description:string,
    amount:number,
    category:string,
    date:Date,
    payment:string
}

const expenseSchema = new mongoose.Schema<expense> ({
    title:{
        type:"String",
        required:true
    },
    description:{
        type:"String",
        required:true
    },
    amount:{
        type:"Number",
        required:true
    },
    category:{
        type:"String",
        required:true 
    },
    date:{
        type:"Date",
        required:true
    },
    payment:{
        type:"String",
        required:true
    },
})

export default mongoose.models.expenses || mongoose.model<expense>("expenses",expenseSchema)