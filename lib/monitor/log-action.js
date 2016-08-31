import {Meteor} from 'meteor/meteor'
import {Actions} from '../collections'
import {check} from 'meteor/check'

Meteor.methods({
  'orionsoft:activity-logger:logAction': function (name, params) {
    check(name, String)

    return Actions.insert({
      type: 'custom',
      sessionId: this.connection.id,
      date: new Date(),
      name,
      params
    })
  }
})
