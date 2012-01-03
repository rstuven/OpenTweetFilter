#
class DialogPhoenixT1View extends DialogPhoenixView
  
  renderButton:  (viewModel) ->
    buttonTemplate = ->
      div '#filter-button.nav.filter', ->
        li 'data-bind': 'css: { active: visible() }', ->
          a '.js-hover', 'data-bind': 'click: toggleVisible', ->
            span '.new-wrapper', ->
            span '#filter-button-status', 'data-bind': 'html: buttonStatusHtml', ->
            span '#filter-button-title', ->
              text messages.get('filter'), ->

    $('#global-actions').after CoffeeKup.render buttonTemplate
    ko.applyBindings viewModel, $('#filter-button')[0]

  renderDialog: (viewModel) ->
    dialogHtml = CoffeeKup.render @dialogTemplate
    viewModel.visible.subscribe (visible) =>
      @toggleVisible visible, dialogHtml, viewModel, appendTo: '.twttr-dialog-wrapper', center: false
