import { filesController } from '../controller/sockets/filesController.js'

export const fileSocket = (io) => {
    io.on('connection', (socket) => {
        socket.emit('connection', 'user connected');

        socket.on('getFiles', async () => {
            try {
                const files = await filesController.getAll()
                socket.emit('getFiles', files)
            } catch (err) {
                socket.emit('eventError', err)
            }

        })

        socket.on('disconnect', () => {
        });
    });
} 