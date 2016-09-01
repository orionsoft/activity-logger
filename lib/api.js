import {Meteor} from 'meteor/meteor'
import {trackFB} from './monitor/external'

export const logAction = function (name, params, external) {
  if (external && external.fb) {
    trackFB(external.fb.event, external.fb.params)
  } else {
    trackFB('trackCustom', name, params)
  }
  Meteor.call('orionsoft:activity-logger:logAction', name, params, (error) => {
    if (error) {
      console.log(error)
    }
  })
}
