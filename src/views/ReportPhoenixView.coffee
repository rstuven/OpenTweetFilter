# 
class ReportPhoenixView

  template: ->
    div '.filter-report-component.component', ->
      div ->
        h2 ->
          text messages.get('filtering_by_start')
          span '.user-stat-link', -> "#{hiddenCount} "
          text "#{filteringByEndMessage} #{filtersMessage}."
        div ->
          for item in items
            tag.apply null, item
      hr '.component-spacer'

  render: (apply, terms, users, hiddenCount, hiddenUsers) ->

    $('.filter-report-component').remove()
  
    return unless apply and (terms or users)
    
    items = []
    for title, src of hiddenUsers
      if src
        items.push ['img', {src, title, style: "margin-right:5px;", width: "24", height: "24"}]
      else
        items.push ['div', -> title + '&nbsp;&nbsp']
    
    if items.length != 0
      items.unshift ['br', -> ]
      items.unshift ['span', -> messages.get('users_with_hidden_tweets') + ':']

    filters = []
    filters.push messages.get('terms') if terms
    filters.push messages.get('people') if users
    filtersMessage = filters.join ' ' + messages.get('and') + ' '

    filteringByEndMessage = messages.get('filtering_by_end' + (if hiddenCount == 1 then '_singular' else ''))
    
    html = CoffeeKup.render @template, locals: {hiddenCount, filtersMessage, filteringByEndMessage, items}

    $('.dashboard').find('.component:not(:empty):eq(0)').after(html)
