const message = document.querySelector('.message');
const textarea = document.querySelector('#textarea');
const message_area = document.querySelector('.message_area');
let user = '';

const socket = io();

do {
    user = prompt("Please enter your name");
} while (!user);


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const value = e.target.value.trim();
        if (value.length > 0) {
            sendMessage(e.target.value);
        } else {
            alert("please enter a message");
        }
    }
});

function sendMessage(msg) {
    let message = {
        user: user,
        message: msg?.trim()
    }

    appnedMessage(message, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // send msg to server
    socket.emit('message', (message));
}

function appnedMessage(message, type) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('message', type);

    const userAndMsg = `
        <h4>${message.user}</h4>
        <p>${message.message}</p>
    `;

    mainDiv.innerHTML = userAndMsg;
    message_area.appendChild(mainDiv);
}

// Recieve msg
socket.on('message', (msg) => {
    console.log(msg);
    appnedMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    message_area.scrollTop = message_area.scrollHeight;
}



