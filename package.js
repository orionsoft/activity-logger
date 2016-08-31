Package.describe({
  name: 'orionsoft:activity-logger',
  version: '0.0.3',
  summary: 'Save the actions that users do in your app',
  git: 'https://github.com/orionsoft/activity-logger',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.4.1.1')
  api.use('ecmascript')
  api.mainModule('client.js', 'client')
  api.mainModule('server.js', 'server')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('orionsoft:activity-logger')
})
