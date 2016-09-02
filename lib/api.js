import {Meteor} from 'meteor/meteor'
import {trackFB} from './monitor/external'

export const logFB = function (name, params, external) {
  if (external && external.fb) {
    trackFB(external.fb.event, external.fb.params)
  } else {
    trackFB('trackCustom', name, params)
  }
}

export const logLocal = function (name, params, external) {
  Meteor.call('orionsoft:activity-logger:logAction', name, params, (error) => {
    if (error) {
      console.log(error)
    }
  })
}

export const logAction = function (name, params, external) {
  logFB(name, params, external)
  logLocal(name, params, external)
}
