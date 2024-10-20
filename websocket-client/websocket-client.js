
// Создаем новый WebSocket клиент
function connect() {
    const input = document.getElementById('ServerIP');
    const IP = input.value;
    const socket = new WebSocket('wss://echo.websocket.org');
}


// Обработчик открытия соединения
socket.addEventListener('open', function (event) {
    console.log('Connected to the WebSocket server');
    displayMessage('Connected to the WebSocket server');
});

// Обработчик получения сообщения
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    displayMessage('Server: ' + event.data);
});

// Обработчик закрытия соединения
socket.addEventListener('close', function (event) {
    console.log('Disconnected from the WebSocket server');
    displayMessage('Disconnected from the WebSocket server');
});

// Обработчик ошибок
socket.addEventListener('error', function (event) {
    console.error('WebSocket error: ', event);
    displayMessage('WebSocket error: ' + event);
});

// Функция для отправки сообщения
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    socket.send(message);
    displayMessage('You: ' + message);
    messageInput.value = '';
}

// Функция для отображения сообщений на странице
function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}
