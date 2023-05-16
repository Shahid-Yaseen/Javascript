//if you want to run it on your computer then firstly make you sure that you have generated 
//your own api from openAI and assign it to apikey variable
const apiKey="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";
const  submitBtn=document.querySelector("#submit");
const msgRepliedBox=document.querySelector(".message-reply-box");
let currentIndex=0;
const regenerateBtn=document.querySelector(".regenerateBtn");
const userQuery=document.querySelector(".query");
const history=document.querySelector(".history-div");
let reciveData;
const newChatBtn=document.querySelector(".new-chat-btn");
function AddQuery(reciveData,currentIndex){
    const msgReplied = document.createElement("p");
    msgReplied.textContent=reciveData.choices[currentIndex].message.content;
    const robot=reciveData.choices[currentIndex].message.role;
    msgReplied.classList.add(robot);
    msgRepliedBox.insertAdjacentElement("beforeend",msgReplied);
}
function regenerateFunc(){
    if(currentIndex<10){
        currentIndex++;
    }
    else{
        currentIndex=0;
    }
    AddQuery(reciveData,currentIndex);    
}
async function messageData(){
      const options={
        method:'POST',
        headers:{
         'Authorization':`Bearer ${apiKey}`,
         'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "model":"gpt-3.5-turbo",
             "messages":[{"role":"user","content":userQuery.value}],
             "temperature":2,
             "n":5,
            })
    }
    try{
        const response=await fetch('https://api.openai.com/v1/chat/completions',options);
        reciveData=await response.json();
        currentIndex=0;
        const question=document.createElement('p');
        question.classList.add('user');
        question.textContent=userQuery.value;
        msgRepliedBox.insertAdjacentElement("beforeend",question);
        AddQuery(reciveData,currentIndex);
        userQuery.value="";    
    }
    catch(error){
        console.log(error);
    }
}
submitBtn.addEventListener('click',messageData);
regenerateBtn.addEventListener('click',regenerateFunc);
newChatBtn.addEventListener('click',()=>{
    const his=document.createElement('p');
    his.classList.add('history');
    his.textContent=document.querySelector('.user').textContent;
    history.insertAdjacentElement('beforeend',his);
    msgRepliedBox.innerHTML='';
});

