const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let button = document.querySelector('.send-button')
textarea.focus()

const color = {
    red:"--themecolor: rgb(250, 4, 4);" , 
    pink:"--themecolor: rgb(255, 15, 183);" ,
    blue:"--themecolor: rgb(68, 0, 255)" ,
    green:"--themecolor: rgb(0, 156, 13)" ,
    yellow:"--themecolor: rgb(255, 255, 0)" ,
    orange:"--themecolor: rgb(255, 102, 0)" ,
    purple:"--themecolor: rgb(97, 0, 189)"
}
 

do {
    name = prompt('Please enter your name: ')
} while(!name)
 socket.emit('new-user', name);
 
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
  button.addEventListener('click', e => {
    sendMessage(textarea.value)
  })
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)
    if (msg.message == "!red") {
        theme(color.red)
        socket.emit('color', color.red)
        
    }
    if (msg.message == "!pink") {
        theme(color.pink)
        socket.emit('color', color.pink)
        
    }

    if (msg.message == "!blue") {
        theme(color.blue)
        socket.emit('color', color.blue)

    }
    if (msg.message == "!green") {
        theme(color.green)
        socket.emit('color', color.green)

    }

    if (msg.message == "!yellow") {
        theme(color.yellow)
        socket.emit('color', color.yellow)

    }
    if (msg.message == "!orange") {
        theme(color.orange)
        socket.emit('color', color.orange)

    }
    if (msg.message == "!purple") {
        theme(color.purple)
        socket.emit('color', color.purple)

    }



}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    
   
    if(type =='incoming') {
         msgtype = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    }
     else {
         msgtype =  ` <p>${msg.message}</p> `
     }
     mainDiv.innerHTML = msgtype;
    messageArea.appendChild(mainDiv)

}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
    
})
    socket.on ('themecolor', color=>{
        theme(color)
    })
    socket.on("user-connected" , data => {
        logmessage(data.name)
     
    })
    socket.on ("user-disconnected", data =>{
        logoutmessage(data.name)

    })
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
 function theme(value) {
      document.documentElement.style.cssText = value;
 }
  function logmessage(value){
      const el = document.createElement('div')
      el.classList.add('khammaghani')
      el.innerHTML = value + " joined"
      messageArea.appendChild(el)
  }
  function logoutmessage(value){
    const el = document.createElement('div')
    el.classList.add('khammaghani')
    el.innerHTML = value + " left"
    messageArea.appendChild(el)
}
    
function sidebarusers(users) {
    //log in to side bar
    useractivelist.innerHTML = "";
    Object.keys(users).forEach(key => {
        // console.log(users[key])
        const newuser = document.createElement("div");
        newuser.classList = "activeusersname";
        newuser.setAttribute("data-inital", getinitals(users[key]));
        newuser.innerHTML = users[key];
        useractivelist.append(newuser);
    });
}
