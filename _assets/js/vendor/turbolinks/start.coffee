Turbolinks.start = ->
  if installTurbolinks()
    Turbolinks.controller ?= createController()
    Turbolinks.controller.start()

installTurbolinks = ->
  window.Turbolinks ?= Turbolinks
  moduleIsInstalled()

createController = ->
  controller = new Turbolinks.Controller
  controller.adapter = new Turbolinks.BrowserAdapter(controller)
  controller

moduleIsInstalled = ->
  window.Turbolinks is Turbolinks

setTimeout Turbolinks.start if moduleIsInstalled()
