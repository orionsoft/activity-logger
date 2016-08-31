import {Meteor} from 'meteor/meteor'
import {Sessions} from '../collections'

Meteor.startup(function () {
  Sessions.update({ status: { $ne: 'closed' } }, {
    $set: {
      status: 'closed',
      closedAt: new Date()
    },
    $unset: {
      activePath: ''
    }
  }, { multi: true })
})
