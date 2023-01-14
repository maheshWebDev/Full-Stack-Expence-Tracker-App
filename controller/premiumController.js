const Expence = require('../model/expenceModel');

const User = require('../model/userModel');

const dbConnection = require('../config/dbConfig');

module.exports.showLeaderboard = async(req,res)=>{

    try {
        const users = await User.findAll();
        const expenses = await Expence.findAll()
        const userAggregatedExpenses = {}
        expenses.forEach((expense)=>{

            if(userAggregatedExpenses[expense.userId]){

                userAggregatedExpenses[expense.userId]  += expense.amount
            }else{
                userAggregatedExpenses[expense.userId]  = expense.amount
            }
        })
       let userLeaderboardDetails = [];
        users.forEach((user)=>{
userLeaderboardDetails.push({name:user.name,totalSpent :userAggregatedExpenses[user.id]||0})
        })
        userLeaderboardDetails.sort((a,b)=>b.totalSpent-a.totalSpent);

        res.status(200).json({userLeaderboardDetails})
        
    } catch (error) {
        res.status(500).json({message:"something went wrong"})
    }
}