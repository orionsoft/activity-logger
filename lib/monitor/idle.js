import {Meteor} from 'meteor/meteor'
import {Sessions, Actions} from '../collections'

Meteor.methods({
  'orionsoft:activity-logger:setIdle': function () {
    Sessions.update(this.connection.id, {
      $set: {
        status: 'idle'
      }
    })
    Actions.insert({
      type: 'set-idle',
      sessionId: this.connection.id,
      date: new Date()
    })
  },

  'orionsoft:activity-logger:unsetIdle': function () {
    Sessions.update(this.connection.id, {
      $set: {
        status: 'active'
      }
    })
    Actions.insert({
      type: 'set-active',
      sessionId: this.connection.id,
      date: new Date()
    })
  }
})
