import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "YOUR_OPENAI_API_KEY";

app.post("/ask", async (req,res)=>{

const userMessage = req.body.message;

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},
body:JSON.stringify({

model:"gpt-4.1-mini",

messages:[
{
role:"system",
content:`You are an AI cross examination tutor.
Never give answers. Only guide students using questions.`
},
{
role:"user",
content:userMessage
}
]

})
})

const data = await response.json();

res.json(data);

}catch(error){

res.status(500).send("Error");

}

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});
