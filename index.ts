#! /usr/bin/env node
import inquirer from 'inquirer';

const randomNumber:number =Math.floor(10000+Math.random()*9000)
// console.log(randomNumber);

let myBalance: number = 0
let answer = await inquirer.prompt(
    [
        {
            name:"students",
            type:"input",
            message:"Enter Student's name:",
            validate:function(value){
                if(value.trim() !== ""){
                    return true;
                }
                return "Please enter a non empty value.";
       },
        },
        {
            name:"courses",
            type:"list",
            message:"Select a course to enrolled",
            choices:["Html","Css","Javascript","TypeScript","Python"]

}
    ]
);
const tutionFee:{[key:string]:number} = {
    "Html": 2000,
    "Css":2500,
    "Javascript":4000,
    "TypeScript":5000,
    "Python":7000,

};
console.log(`\n Tution Fees:${tutionFee[answer.courses]}/-\n`);
console.log(`Balance:${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name:"payment",
        type:"list",
        message:"Select payment method",
        choices:["Bank Transfer","Easypaisa","Jazzcash"]
    },
    {
        name:"amount",
        type:"input",
        message:"Transfer Money",
        validate:function(value){
            if(value.trim() !== ""){
                return true;
            }
            return "Please enter a non empty value.";
   },
    }

]  
);
console.log(`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees=tutionFee[answer.courses]
const paymentAmount = parseFloat(paymentType.amount)

if (tutionFees === paymentAmount){
    console.log(`Congratulations,you have successfully enrolled in ${answer.courses}\n`)

    let ans=await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:"What wuold you like to do next?",
            choices:["View status","Exit"]
        }
    ])
    if (ans.select === "View status"){
        console.log("\n*****Status*****\n");
        console.log(`Student Name:${answer.students}`);
        console.log(`Student ID:${randomNumber}`);
        console.log(`Course:${answer.courses}`);
        console.log(`Tution Fees Paid:${paymentAmount}`);
        console.log(`Balance:${myBalance += paymentAmount}`);
    }
    else{
        console.log("\n Exiting student management system\n")
    }
}
else{
    console.log("Invalid amount due to course\n");
}

