import {Meteor} from 'meteor/meteor'
import URL from 'url-parse'

Meteor.startup(function () {
  const url = new URL(document.referrer)
  const referrer = {
    host: url.host,
    path: url.pathname
  }
  Meteor.subscribe('orionsoft:activity-logger:startSession', referrer)
  Meteor.subscribe('orionsoft:activity-logger:setUserId')
})
