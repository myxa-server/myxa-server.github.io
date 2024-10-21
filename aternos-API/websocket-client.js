let socket; // Объявляем переменную socket глобально

// Функция для подключения к WebSocket серверу
function connect() {
const input = document.getElementById('ServerIP');
const IP = input.value;
console.log(IP); // Выводим значение IP в консоль

// Используем прокси-сервер для обхода CORS
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'wss://aternos.org/hermes/';

// Создаем новый Socket.IO клиент и передаем заголовок с кукой
socket = io(proxyUrl + targetUrl, {
extraHeaders: {
'Cookie': 'your_cookie_here' // Замените 'your_cookie_here' на вашу куку
}
});

// Обработчик открытия соединения
socket.on('connect', function() {
console.log('Connected to the WebSocket server');
displayMessage('Connected to the WebSocket server');
});

// Обработчик получения сообщения
socket.on('message', function(data) {
console.log('Message from server ', data);
displayMessage('Server: ' + data);
});

// Обработчик закрытия соединения
socket.on('disconnect', function() {
console.log('Disconnected from the WebSocket server');
displayMessage('Disconnected from the WebSocket server');
});

// Обработчик ошибок
socket.on('error', function(error) {
console.error('WebSocket error: ', error);
displayMessage('WebSocket error: ' + error);
});
}

// Функция для отправки сообщения
function sendMessage() {
const messageInput = document.getElementById('messageInput');
const message = messageInput.value;
if (socket && socket.connected) {
socket.send(message);
displayMessage('You: ' + message);
} else {
console.error('WebSocket is not connected.');
displayMessage('WebSocket is not connected.');
}
messageInput.value = '';
}

// Функция для отображения сообщений на странице
function displayMessage(message) {
const messagesDiv = document.getElementById('messages');
const messageElement = document.createElement('p');
messageElement.textContent = message;
messagesDiv.appendChild(messageElement);
}
