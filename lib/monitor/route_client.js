import {Meteor} from 'meteor/meteor'

let current = null

export const pathDidChange = function (path) {
  current = path
  Meteor.call('orionsoft:activity-logger:changeRoute', path)
}

const checkPath = function () {
  const path = window.location.pathname
  if (path !== current) {
    pathDidChange(path)
  }
}

Meteor.startup(function () {
  setTimeout(() => {
    setInterval(checkPath, 200)
  }, 100)
})
