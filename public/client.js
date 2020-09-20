const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
textarea.focus()
const color = {
    red:"--themecolor: rgb(250, 4, 4);" , 
    pink:"--themecolor: rgb(175, 0, 137);"

}


do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
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
        console.log (color.red)
    }
    if (msg.message == "!pink") {
        theme(color.pink)
        socket.emit('color', color.pink)
        console.log (color.pink)
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
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
 function theme(value) {
      document.documentElement.style.cssText = value;
 }