import {Meteor} from 'meteor/meteor'

export const logAction = function (name, params) {
  Meteor.call('orionsoft:activity-logger:logAction', name, params, (error) => {
    if (error) {
      console.log(error)
    }
  })
}
