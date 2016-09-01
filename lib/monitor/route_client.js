import {Meteor} from 'meteor/meteor'
import {trackFB} from './external'

let current = null

export const pathDidChange = function (path) {
  current = path
  Meteor.call('orionsoft:activity-logger:changeRoute', path)
  trackFB('track', 'PageView')
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
