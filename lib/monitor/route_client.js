import {Meteor} from 'meteor/meteor'

let current = null

const pathDidChange = function (path) {
  current = path
  Meteor.call('orionsoft:activity-logger:changeRoute', path)
}

const checkPath = function () {
  const path = window.location.pathname
  if (path !== current) {
    pathDidChange(path)
  }
}

setInterval(checkPath, 200)