const express = require('express');
const cors = require('cors');
const app = express();
const socket= require('socket.io');
const connection= require('./connection');
const configuration = require('./database');


app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200']
};

app.use(cors(corsOptions));

const categoriesRoute = require('./routes/categoryRoutes');
const productsRoute = require('./routes/productRoutes');
const usersRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const chatRoute = require('./routes/chatRoutes');
const { markMessageAsRead} = require("./controllers/chatController");

app.use(express.json());
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/login', authRoute);
app.use('/chat', chatRoute);
app.use('/image', express.static(__dirname + '/image'));


const port = process.env.PORT || 8080;
const server=app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const socketIo = socket(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
});


socketIo.on('connection', socket => {
    console.log(`A connection has been created with ${socket.id}`);
    socket.on(connection.change, (changes) => {
        socketIo.emit(connection.change, changes);
    });
    socket.on(connection.create, (newData) => {
        socketIo.emit(connection.create, newData);
    });
    socket.on(connection.joinRoom, ({roomId}) => {
        socket.join(roomId.toString());
        console.log(`User ${socket.id} joined room: ${roomId}`);
    });

    socket.on(connection.sendMessage, async (data) => {
        const {senderId, recipientId, message} = data;
        const roomId = senderId === 3 ? `${recipientId}` : `${senderId}`;
        console.log('Received message:', {senderId, recipientId, message});
        try {
            const result = await configuration.query('INSERT INTO messages(sender_id, recipient_id, message)' +
                'VALUES ($1, $2, $3) RETURNING *', [senderId, recipientId, message]);
            const savedMessage = result.rows[0];
            console.log("Sending message to room:", roomId, savedMessage);
            socketIo.to([roomId]).emit('receiveMessage', savedMessage);
            console.log("senderId" + senderId)
            if(senderId !== 3) {
                socketIo.to(["3"]).emit('receiveMessage', {id: 1, sender_id: 0, recipient_id: 3, message: senderId.toString()} );
                console.log("sent message to support")
            }
        } catch (err) {
            console.error(err);
        }
    });
    socket.on(connection.watchedMessage, async ({id}) => {
        markMessageAsRead(id).then(() => {
            console.log(`Message with id ${id} marked as read.`);
        });
    });

    socket.on('disconnect', () => {
        console.log(`Client with socket ID ${socket.id} disconnected`);
    });
})
