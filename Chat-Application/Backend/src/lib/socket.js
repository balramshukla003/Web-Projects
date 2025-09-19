import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
});

// Track active users and their rooms
const activeUsers = new Map();
const userRooms = new Map();

// Debug middleware to log all events
io.use((socket, next) => {
    const originalEmit = socket.emit;
    socket.emit = function (...args) {
        console.log(`[DEBUG] Socket ${socket.id} emitting event: ${args[0]}`);
        return originalEmit.apply(this, args);
    };
    next();
});

io.on('connection', (socket) => {
    console.log('[DEBUG] A user connected:', socket.id);

    // Handle user connection
    socket.on('user:connect', (userData) => {
        console.log('[DEBUG] user:connect event received:', JSON.stringify(userData));

        if (!userData || !userData.id) {
            console.error('[ERROR] Invalid user data received');
            socket.emit('error', { message: 'Invalid user data' });
            return;
        }

        console.log('[DEBUG] User connected:', JSON.stringify(userData));

        // Store user data with socket id - using the same structure as your frontend
        activeUsers.set(userData.id, {
            socketId: socket.id,
            email: userData.email,
            userId: userData.id,
            id: userData.id,
            status: userData.status || 'online',
            lastActive: userData.lastActive || new Date().toISOString()
        });

        // Send acknowledgment to the user
        socket.emit('user:connected', {
            userId: userData.id,
            success: true
        });

        // Broadcast to all clients that a user's status has changed
        io.emit('users:update', Array.from(activeUsers.values()));
        console.log('[DEBUG] Active users updated, count:', activeUsers.size);
    });

    // Handle user presence updates
    socket.on('user:presence', (userData) => {
        console.log('[DEBUG] user:presence update received:', JSON.stringify(userData));

        if (!userData || !userData.userId) return;

        // Update user's active status
        const user = activeUsers.get(userData.userId);
        if (user) {
            user.status = userData.status || 'online';
            user.lastActive = userData.lastActive || new Date().toISOString();
            activeUsers.set(userData.userId, user);

            // Broadcast updated status
            io.emit('users:update', Array.from(activeUsers.values()));
        }
    });

    // Handle user last seen updates
    socket.on('user:lastseen', (userData) => {
        console.log('[DEBUG] user:lastseen event received:', JSON.stringify(userData));

        if (!userData || !userData.userId) return;

        // Broadcast last seen time to all clients
        io.emit('user:lastseen', {
            userId: userData.userId,
            timestamp: userData.timestamp || new Date().toISOString()
        });
    });

    // Handle joining a room
    socket.on('join:room', ({ roomId }, callback) => {
        console.log(`[DEBUG] join:room event received - roomId: ${roomId}`);

        if (!roomId) {
            console.error('[ERROR] Invalid room ID received for joining');
            socket.emit('error', { message: 'Invalid room ID' });

            // Handle callback if provided by frontend
            if (typeof callback === 'function') {
                callback({ success: false, error: 'Invalid room ID' });
            }
            return;
        }

        console.log(`[DEBUG] Socket ${socket.id} joining room ${roomId}`);
        socket.join(roomId);

        // Store which rooms this socket is in
        if (!userRooms.has(socket.id)) {
            userRooms.set(socket.id, new Set());
        }
        userRooms.get(socket.id).add(roomId);

        // Let the client know they've successfully joined
        socket.emit('room:joined', { roomId, success: true });

        // Handle callback if provided by frontend
        if (typeof callback === 'function') {
            callback({ success: true, roomId });
        }

        const userId = getUserIdBySocketId(socket.id);
        console.log(`[DEBUG] User ${userId} (${socket.id}) joined room ${roomId}`);

        // Notify room members about new user
        socket.to(roomId).emit('user:joined', {
            userId: userId,
            roomId
        });
    });

    // Handle leaving a room
    socket.on('leave:room', ({ roomId }, callback) => {
        console.log(`[DEBUG] leave:room event received - roomId: ${roomId}`);

        if (!roomId) {
            console.error('[ERROR] Invalid room ID received for leaving');
            socket.emit('error', { message: 'Invalid room ID' });

            // Handle callback if provided by frontend
            if (typeof callback === 'function') {
                callback({ success: false, error: 'Invalid room ID' });
            }
            return;
        }

        const userId = getUserIdBySocketId(socket.id);
        console.log(`[DEBUG] User ${userId} (${socket.id}) leaving room ${roomId}`);
        socket.leave(roomId);

        // Remove room from user's room set
        if (userRooms.has(socket.id)) {
            userRooms.get(socket.id).delete(roomId);
        }

        // Handle callback if provided by frontend
        if (typeof callback === 'function') {
            callback({ success: true });
        }

        // Notify room members about user leaving
        socket.to(roomId).emit('user:left', {
            userId: userId,
            roomId
        });
    });

    // Handle sending messages - formatted to match your MongoDB schema
    socket.on('message:send', (messageData, callback) => {
        console.log('[DEBUG] message:send event received:', JSON.stringify(messageData));

        if (!messageData || !messageData.roomId || !messageData.senderId) {
            console.error('[ERROR] Invalid message data received', messageData);
            socket.emit('error', { message: 'Invalid message data' });

            // Handle callback if provided by frontend
            if (typeof callback === 'function') {
                callback({ success: false, error: 'Invalid message data' });
            }
            return;
        }

        console.log(`[DEBUG] Message from user ${messageData.senderId} to room ${messageData.roomId}`);
        console.log(`[DEBUG] Message content: "${messageData.content?.substring(0, 50)}${messageData.content?.length > 50 ? '...' : ''}"`);

        // Validate that sender is in the room
        const room = io.sockets.adapter.rooms.get(messageData.roomId);
        if (!room || !room.has(socket.id)) {
            console.error(`[ERROR] Socket ${socket.id} (${messageData.senderId}) trying to send message to room ${messageData.roomId} they're not in`);
            socket.emit('error', { message: 'You are not in this room' });

            // Handle callback if provided by frontend
            if (typeof callback === 'function') {
                callback({ success: false, error: 'You are not in this room' });
            }
            return;
        }

        // Create a message object that matches your MongoDB schema format
        const formattedMessage = {
            _id: generateObjectId(), // Generate an ID that looks like MongoDB ObjectId
            senderId: messageData.senderId,
            receiverId: messageData.receiverId,
            text: messageData.content, // Frontend uses 'content', DB uses 'text'
            createdAt: messageData.timestamp || new Date().toISOString(),
            updatedAt: messageData.timestamp || new Date().toISOString(),
            __v: 0
        };

        // Broadcast to the specific room
        console.log(`[DEBUG] Broadcasting message from ${messageData.senderId} to room ${messageData.roomId}`);
        io.to(messageData.roomId).emit('message:new', formattedMessage);

        // Handle callback if provided by frontend
        if (typeof callback === 'function') {
            callback({ success: true, messageId: formattedMessage._id });
        }
    });

    // Handle marking messages as read
    socket.on('messages:markRead', (data) => {
        console.log('[DEBUG] messages:markRead event received:', JSON.stringify(data));

        if (!data || !data.userId || !data.contactId) return;

        // Find roomId based on userId and contactId
        const roomId = [data.userId, data.contactId].sort().join('-');

        // Broadcast to room that messages have been read
        socket.to(roomId).emit('messages:read', {
            readBy: data.userId,
            timestamp: new Date().toISOString()
        });
    });

    // Handle message read receipts
    socket.on('message:read', (data) => {
        console.log('[DEBUG] message:read event received:', JSON.stringify(data));

        if (!data || !data.messageId) return;

        // Broadcast read receipt to sender
        if (data.senderId) {
            const senderSocket = getSocketIdByUserId(data.senderId);
            if (senderSocket) {
                io.to(senderSocket).emit('message:read', {
                    messageId: data.messageId,
                    readBy: data.userId,
                    timestamp: new Date().toISOString()
                });
            }
        }
    });

    // Handle typing indicator
    socket.on('user:typing', (data) => {
        console.log('[DEBUG] user:typing event received:', JSON.stringify(data));

        if (!data || !data.userId || !data.receiverId) return;

        // Find roomId based on both user IDs
        const roomId = [data.userId, data.receiverId].sort().join('-');

        // Broadcast typing status to the room
        socket.to(roomId).emit('user:typing', {
            userId: data.userId,
            isTyping: data.isTyping
        });
    });

    // Handle user disconnection
    socket.on('user:disconnect', (userData) => {
        console.log('[DEBUG] user:disconnect event received:', JSON.stringify(userData));
        if (userData && userData.userId) {
            activeUsers.delete(userData.userId);
        }

        // Broadcast updated user list
        io.emit('users:update', Array.from(activeUsers.values()));
        console.log('[DEBUG] Active users updated after disconnect, count:', activeUsers.size);
    });

    // Handle socket disconnection
    socket.on("disconnect", () => {
        console.log('[DEBUG] Socket disconnected:', socket.id);

        // Find and remove the user associated with this socket
        let userIdToRemove = null;
        for (const [userId, userData] of activeUsers.entries()) {
            if (userData.socketId === socket.id) {
                userIdToRemove = userId;
                break;
            }
        }

        if (userIdToRemove) {
            console.log(`[DEBUG] Removing user ${userIdToRemove} due to socket disconnect`);
            activeUsers.delete(userIdToRemove);

            // Notify all rooms this user was in
            if (userRooms.has(socket.id)) {
                const rooms = userRooms.get(socket.id);
                console.log(`[DEBUG] User ${userIdToRemove} was in ${rooms.size} rooms`);
                rooms.forEach(roomId => {
                    console.log(`[DEBUG] Notifying room ${roomId} that user ${userIdToRemove} left`);
                    socket.to(roomId).emit('user:left', {
                        userId: userIdToRemove,
                        roomId
                    });
                });
                userRooms.delete(socket.id);
            }
        }

        // Broadcast updated user list
        io.emit('users:update', Array.from(activeUsers.values()));
        console.log('[DEBUG] Active users updated after socket disconnect, count:', activeUsers.size);
    });

    // Add a ping mechanism to keep connections alive
    socket.on('ping', (callback) => {
        console.log(`[DEBUG] ping received from socket ${socket.id}`);
        if (typeof callback === 'function') {
            callback({ timestamp: new Date().toISOString() });
        } else {
            socket.emit('pong', { timestamp: new Date().toISOString() });
        }
    });
});

// Helper functions
function getUserIdBySocketId(socketId) {
    for (const [userId, userData] of activeUsers.entries()) {
        if (userData.socketId === socketId) {
            return userId;
        }
    }
    return null;
}

function getSocketIdByUserId(userId) {
    const userData = activeUsers.get(userId);
    return userData ? userData.socketId : null;
}

// Generate a MongoDB-like ObjectId
function generateObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16).padStart(8, '0');
    const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
    const process = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
    const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');

    return timestamp + machineId + process + counter;
}

// Log all room information periodically (helpful for debugging)
setInterval(() => {
    console.log('\n[DEBUG] --- ROOM STATUS UPDATE ---');
    console.log(`[DEBUG] Active users: ${activeUsers.size}`);
    console.log('[DEBUG] Active rooms:');

    // Get all rooms from Socket.IO
    const rooms = io.sockets.adapter.rooms;
    let roomCount = 0;

    rooms.forEach((sockets, room) => {
        // Skip rooms that match socket IDs (these are private socket rooms)
        if (!sockets.has(room)) {
            roomCount++;
            console.log(`[DEBUG] Room ${room}: ${sockets.size} connected clients`);
        }
    });

    console.log(`[DEBUG] Total rooms: ${roomCount}`);
    console.log('[DEBUG] ------------------------\n');
}, 60000); // Log every minute

// Add a REST endpoint to get active users (useful for debugging)
app.get('/api/users', (req, res) => {
    res.json(Array.from(activeUsers.values()));
});

// Add a REST endpoint to get room information
app.get('/api/rooms', (req, res) => {
    const roomInfo = [];
    const rooms = io.sockets.adapter.rooms;

    rooms.forEach((sockets, room) => {
        // Skip rooms that match socket IDs (these are private socket rooms)
        if (!sockets.has(room)) {
            roomInfo.push({
                roomId: room,
                userCount: sockets.size,
                users: [...sockets].map(socketId => getUserIdBySocketId(socketId)).filter(Boolean)
            });
        }
    });

    res.json(roomInfo);
});


export { io, app, server };