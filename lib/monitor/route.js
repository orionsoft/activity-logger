import {Meteor} from 'meteor/meteor'
import {Sessions, PathsCounts, Actions} from '../collections'
import {check} from 'meteor/check'

Meteor.methods({
  'orionsoft:activity-logger:changeRoute': function (path) {
    check(path, String)
    Sessions.update(this.connection.id, {
      $set: {
        activePath: path
      }
    })
    Actions.insert({
      type: 'change-route',
      sessionId: this.connection.id,
      date: new Date(),
      path: path
    })

    const pathCount = PathsCounts.findOne({ path: path })
    if (pathCount) {
      PathsCounts.update(pathCount._id, {
        $inc: {
          count: 1
        }
      })
    } else {
      PathsCounts.insert({
        path: path,
        count: 1
      })
    }
  }
})
