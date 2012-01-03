# 
class ReportPhoenixT1View extends ReportPhoenixView

  template: ->
    div '.filter-report-component.component', ->
      div '.module', ->
        div '.flex-module', ->
          div '.flex-module-header', ->
            h3 ->
              text messages.get('filtering_by_start')
              strong -> " #{hiddenCount} "
              text "#{filteringByEndMessage} #{filtersMessage}."
          div '.flex-module-inner', ->
            div ->
              for item in items
                tag.apply null, item
