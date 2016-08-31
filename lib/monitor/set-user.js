import {Sessions, Actions} from '../collections'
import {Meteor} from 'meteor/meteor'

Meteor.publish('orionsoft:activity-logger:setUserId', function () {
  if (this.userId) {
    Sessions.update({ _id: this.connection.id, userId: { $ne: this.userId } }, {$set: {userId: this.userId}})
    Actions.insert({
      type: 'login',
      sessionId: this.connection.id,
      date: new Date(),
      userId: this.userId
    })
  } else {
    const session = Sessions.findOne(this.connection.id)
    if (session && session.userId) {
      Actions.insert({
        type: 'logout',
        sessionId: this.connection.id,
        date: new Date(),
        userId: session.userId
      })
    }
  }
})
