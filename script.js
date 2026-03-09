const API_KEY = "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";

async function sendMessage(){

const input = document.getElementById("userInput");
const chatbox = document.getElementById("chatbox");

let message = input.value;

chatbox.innerHTML += `<div class="user"><b>Student:</b> ${message}</div>`;

input.value = "";

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
content:`You are an AI cross-examination tutor.
Never give direct answers. Always guide using questions.`
},
{
role:"user",
content: message
}
]

})
});

const data = await response.json();

console.log(data);

let reply = data.choices[0].message.content;

chatbox.innerHTML += `<div class="ai"><b>AI Tutor:</b> ${reply}</div>`;

}catch(error){

chatbox.innerHTML += `<div class="ai">Error connecting to AI</div>`;

console.error(error);

}

chatbox.scrollTop = chatbox.scrollHeight;

}
