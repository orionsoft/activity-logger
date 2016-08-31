import {Meteor} from 'meteor/meteor'
import {Sessions, Actions} from '../collections'
import UAParser from './ua-parser'

Meteor.onConnection(function (connection) {
  const sessionId = Sessions.insert({
    _id: connection.id,
    ipAddress: connection.clientAddress,
    status: 'active',
    createdAt: new Date(),
    userAgent: UAParser(connection.httpHeaders['user-agent']),
    language: connection.httpHeaders['accept-language']
  })

  connection.onClose(function () {
    const actions = Actions.find({sessionId}).count()
    if (actions) {
      Sessions.update(sessionId, {
        $set: {
          status: 'closed',
          closedAt: new Date()
        },
        $unset: {
          activePath: ''
        }
      })
    } else {
      Sessions.remove(sessionId)
    }
  })
})
