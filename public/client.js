//         
var socket = io('http://localhost:4000');

function getEl(id){
    return document.getElementById(id);
}

let message = getEl("message");
let output = getEl("output");
let handle = getEl("handle");
let sendbtn = getEl("send");
let feedback = getEl("feedback");

sendbtn.addEventListener('click',()=>{
    //console.log(handle.value);
    socket.emit('chat' ,{
        handle:handle.value,message:message.value
    })
})
message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
})

socket.on('chat',(data)=>{
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>'+ data.handle +':</strong>'+ data.message +'</p>'
})
socket.on('typing',(data) =>{
    feedback.innerHTML = '<p><em>'+data +' is typing a message...</em></p>';
})

