import {Meteor} from 'meteor/meteor'

Meteor.startup(function () {
  Meteor.status()
  Meteor.subscribe('orionsoft:activity-logger:setUserId')
})
