$ = require 'jquery'
require 'jquery-ui'
require 'tipsy'
ko = require 'knockout'

require './dialog.css'
messages = require '../messages'
{View} = require './View'

class @PhoenixT1DialogView extends View

  render: (viewModel) ->
    @renderButton viewModel
    @renderDialog viewModel
    @monitorBookmarklet viewModel
    @showWelcomeTip viewModel

  renderButton: (viewModel) ->
    button = $ require('./button.jade')(messages: messages)
    $('#user-dropdown ul li:nth-child(5)').after button
    ko.applyBindings viewModel, button[0]

  renderDialog: (viewModel) ->
    dialogHtml = require('./dialog.jade')(messages: messages)
    viewModel.visible.subscribe (visible) =>
      @visibleToggled visible, dialogHtml, viewModel, appendTo: 'body', center: true

  dialogHeaderSelector: '.modal-header'

  visibleToggled: do =>
    container = null
    overlay = $('<div class="twttr-dialog-overlay"></div>').appendTo $('body')
    (visible, dialogHtml, viewModel, options) ->
      if  visible
        #$('body').addClass 'modal-enabled'
        overlay.show()

        container = $ dialogHtml
        container.appendTo $(options.appendTo)
        container.show()

        if options.center
          dialog = $('#filter-dialog')
          dialog
            .css('position', 'absolute')
            .css('top', (($(window).height() - dialog.outerHeight()) / 2) + 'px')
            .css('left', (($(window).width() - dialog.outerWidth()) / 2) + 'px')

        container.draggable handle: @dialogHeaderSelector

        # Stop propagation of events captured by Twitter.
        container.on 'keydown keypress', (event) ->
          event.stopPropagation()

        # Tips
        container.find('.filter-terms-list')  .tipsy gravity: 'w', trigger: 'focus', html: true, fallback: messages.get('filter_terms_list_title')
        container.find('.filter-users-list')  .tipsy gravity: 'w', trigger: 'focus', html: true, fallback: messages.get('filter_users_list_title')
        container.find('.filter-bookmarklet') .tipsy gravity: 'n', trigger: 'hover', html: true, fallback: messages.get('bookmarklet_title')

        # Reload and bind
        viewModel.reload()
        ko.applyBindings viewModel, container[0]

      else
        container.find('.filter-terms-list')  .tipsy 'hide'
        container.find('.filter-users-list')  .tipsy 'hide'
        container.find('.filter-bookmarklet') .tipsy 'hide'

        ko.cleanNode container[0]

        container.remove()
        overlay.hide()
        #$('body').removeClass 'modal-enabled'

  # Monitor bookmarklet execution
  monitorBookmarklet: (viewModel) ->
    $('#filter-button').on 'DOMNodeInserted', (event) ->
      el = $(event.target)
      viewModel.bookmarkletLoaded(el.data('version'))
      el.remove()

  welcomeTip: ->
    $('#user-dropdown')

  showWelcomeTip: (viewModel) ->
    if viewModel.showWelcomeTip()
      setTimeout(=>
        @welcomeTip()
          .tipsy(gravity: 'e', trigger: 'manual', html: true, fallback: messages.get('welcome_tip'))
          .tipsy('show')
          .click ->
            $(@).tipsy 'hide'

        setTimeout(=>
          @welcomeTip().tipsy 'hide'
        , 30000)
        viewModel.showWelcomeTip false
      , 3000)
