import {Meteor} from 'meteor/meteor'
import {Sessions, Actions} from '../collections'
import UAParser from './ua-parser'
import {check} from 'meteor/check'

Meteor.publish('orionsoft:activity-logger:startSession', function ({host, path}, campaign, clientIdentifier) {
  check(host, String)
  check(path, String)
  check(clientIdentifier, String)

  const connection = this.connection
  let session = Sessions.findOne({_id: connection.id}, {fields: {_id: 1}})

  if (!session) {
    const sessionId = Sessions.insert({
      _id: connection.id,
      ipAddress: connection.clientAddress,
      status: 'active',
      createdAt: new Date(),
      userAgent: UAParser(connection.httpHeaders['user-agent']),
      language: connection.httpHeaders['accept-language'],
      referrer: {host, path},
      clientIdentifier,
      campaign
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
  }
})
