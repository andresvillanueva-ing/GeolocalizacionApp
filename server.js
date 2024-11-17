const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la vista del cliente
app.get('/cliente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

// Ruta para la vista del administrador
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado.');

    socket.on('sendLocation', (data) => {
        console.log('Datos de ubicación recibidos:', data);

        // Retransmitir los datos a todos los clientes conectados
        socket.broadcast.emit('locationBroadcast', data);
    });

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado.');
    });
});

server.listen(3000, () => {
    console.log('Servidor funcionando en http://localhost:3000');
});
