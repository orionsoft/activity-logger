import {Meteor} from 'meteor/meteor'
import URL from 'url-parse'

const getParameterByName = function (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

Meteor.startup(function () {
  const url = new URL(document.referrer)
  const referrer = {
    host: url.host,
    path: url.pathname
  }
  const campaign = {
    source: getParameterByName('utm_source'),
    medium: getParameterByName('utm_medium'),
    name: getParameterByName('utm_campaign')
  }
  Meteor.subscribe('orionsoft:activity-logger:startSession', referrer, campaign)
  Meteor.subscribe('orionsoft:activity-logger:setUserId')
})
