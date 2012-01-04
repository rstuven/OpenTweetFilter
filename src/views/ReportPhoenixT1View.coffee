# 
class ReportPhoenixT1View extends ReportPhoenixView

  template: ->
    div '.filter-report-component.component', 'data-bind': 'visible: visible', ->
      div '.module', ->
        div '.flex-module', ->
          div '.flex-module-header', ->
            h3 headerTemplate
          div '.flex-module-inner', ->
            div bodyTemplate
