const API_KEY = "YOUR_OPENAI_API_KEY";

async function sendMessage(){

const input = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");

let message = input.value;

chatbox.innerHTML += `<div class="user"><b>Student:</b> ${message}</div>`;

input.value = "";

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
content:`You are an AI cross-examination tutor for law students.

Rules:
1. Never give the final answer.
2. Never solve the problem.
3. Always guide using Socratic questioning.
4. Help the student improve questioning strategy.
5. Encourage precise cross-examination.
6. Ask follow-up questions.

Example style:
"Is that question specific enough?"
"What fact are you trying to establish?"
"What contradiction might you explore?"

Always respond with guiding questions.`
},

{
role:"user",
content: message
}

]

})
})

const data = await response.json();

let reply = data.choices[0].message.content;

chatbox.innerHTML += `<div class="ai"><b>AI Witness:</b> ${reply}</div>`;

chatbox.scrollTop = chatbox.scrollHeight;

}
