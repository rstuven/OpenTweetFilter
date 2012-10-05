#
class DialogPhoenixT1View extends DialogPhoenixView
  
  welcomeTip: ->
    $('#user-dropdown i.nav-session')

  renderButton:  (viewModel) ->
    buttonTemplate = ->
        li '#filter-button', 'data-name': 'filter', ->
          a '.js-filter-dialog', href: '#', 'data-bind': 'click: toggleVisible', ->
            span '#filter-button-title', ->
              text messages.get('filter') + '&nbsp;', ->

    $('#user-dropdown ul li:nth-child(5)').after CoffeeKup.render buttonTemplate
    ko.applyBindings viewModel, $('#filter-button')[0]

  dialogHeaderSelector: '.modal-header'

  dialogTemplate: ->
    div '#filter-dialog-container.modal-container.draggable', ->
      div '.close-modal-background-target', ->
      div '#filter-dialog.modal', ->
        div '.modal-content', ->
          button '.modal-btn.modal-close', 'data-bind': 'click: toggleVisible', ->
            i '.close-medium', ->
              span '.hidden-elements', -> '\u0026times;'
          div '.modal-header', ->
            h3 '.modal-title', -> messages.get('filter_dialog_title')
          div '.modal-body', ->
            fieldset ->
              a '.btn.filter-list-label', 
                'data-bind': 'text: termsExcludeText, click: toggleTermsExclude'
              div '.filter-list-label', -> 
                '&nbsp;' + messages.get('tweets_terms') + ':'
              input '.filter-terms-list', 
                'type': 'text' 
                'data-bind' : "value: termsList, valueUpdate: ['change', 'afterkeydown']"
              div -> '&nbsp;'
              a '.btn.filter-list-label',
                'data-bind': 'text: usersExcludeText, click: toggleUsersExclude'
              div '.filter-list-label', -> 
                '&nbsp;'+ messages.get('tweets_users') + ':'
              input '.filter-users-list', 
                'type': 'text'
                'data-bind' : "value: usersList, valueUpdate: ['change', 'afterkeydown']"
              label '.checkbox', ->
                input
                  'type': 'checkbox'
                  'data-bind' : "checked: showReportView"
                span 'data-bind': 'click: toggleShowReportView', -> messages.get('show_report_view')
          div '.modal-footer', ->
            div '.filter-dialog-footer-left', ->
              a '.btn', 
                'data-bind': 'click: clear', -> messages.get('clear')
            div '.filter-dialog-footer-right', ->
              a '.filter-bookmarklet',
                'data-bind': 'attr: {href: bookmarklet}', -> messages.get('bookmarklet_text')
              a '.btn', 
                'data-bind': 'text: toggleText, click: toggleEnabled'
