const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');
const wapService = require('../api/wap/wap.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('wap topic', topic => {
            console.log('Join to room:', topic)
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('wap name', name => {
            console.log('Join to Name:', name)
            socket.myName = name
        })
        socket.on('wap change', action => {
            socket.to(socket.myTopic).emit('wap change', action);
        })
        socket.on('leads update', async (lead) => {
            console.log('leads update', socket.myName, lead)
            await wapService.addLead(socket.myName, lead)
            gIo.emit(`updated leads`)
        })
    })
}

module.exports = {
    connectSockets
}



