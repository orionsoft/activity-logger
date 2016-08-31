import {Meteor} from 'meteor/meteor'

const activateTime = 60 * 1000
let status = 'active'
let timer = null

const didPerformAnAction = function () {
  if (status !== 'active') {
    status = 'active'
    Meteor.call('orionsoft:activity-logger:unsetIdle')
  }

  startTimer()
}

const setIdle = function () {
  if (status !== 'idle') {
    status = 'idle'
    Meteor.call('orionsoft:activity-logger:setIdle')
  }

  stopTimer()
}

const stopTimer = function () {
  if (timer) {
    clearTimeout(timer)
  }
}

const startTimer = function () {
  stopTimer()
  timer = Meteor.setTimeout(setIdle, activateTime)
}

const start = function () {
  startTimer()

  document.addEventListener('mousemove', didPerformAnAction)
  document.addEventListener('mousedown', didPerformAnAction)
  document.addEventListener('touchend', didPerformAnAction)
  document.addEventListener('keydown', didPerformAnAction)
  window.addEventListener('focus', didPerformAnAction)
  window.addEventListener('blur', setIdle)
}

Meteor.startup(start)
