# 
class PhoenixT1ReportView extends View

  template: ->
    div '.filter-report-component.component', 'data-bind': 'visible: visible', ->
      div '.module', ->
        div '.flex-module', ->
          div '.flex-module-header', ->
            h3 headerTemplate
          div '.flex-module-inner', ->
            div bodyTemplate

  headerTemplate: ->
    text messages.get('filtering_by_start')
    text ' '
    span '.user-stat-link', 'data-bind': 'text: hiddenCount'
    text ' '
    span 'data-bind': 'text: filteringByEndMessage'
    text '.'

  bodyTemplate: ->
    span 'data-bind' : 'if: hasHiddenTweets', ->
      span -> messages.get('users_with_hidden_tweets') + ':'
      br ->
    span 'data-bind' : 'foreach: usersPhotos', ->
      img 'data-bind': 'attr: {src: $data.src, title: $data.title}', style: 'margin-right:5px;', width: 24, height: 24
    span 'data-bind' : 'foreach: usersNames', ->
      div 'data-bind': 'text: $data + "&nbsp;&nbsp"'

  render: (viewModel) ->

    $('.filter-report-component')
      .each(-> ko.cleanNode this)
      .remove()

    html = CoffeeKup.render @template, hardcode:
      headerTemplate: @headerTemplate
      bodyTemplate: @bodyTemplate

    $('.dashboard').find('>.component:not(:empty):eq(0),>.module:not(:empty):eq(0)').first().after(html)

    ko.applyBindings viewModel, $('.filter-report-component')[0]
