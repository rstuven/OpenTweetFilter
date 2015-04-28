$ = require 'jquery'
ko = require 'knockout'
messages = require '../messages'
{View} = require './View'

class @PhoenixT1ReportView extends View

  render: (viewModel) ->

    $('.filter-report-component')
      .each(-> ko.cleanNode this)
      .remove()

    report = $ require('./report.jade')(messages: messages)
    firstComponent = $('.dashboard').find('.component:not(:empty):eq(0),.module:not(:empty):eq(0)').first()
    firstComponent.after report if firstComponent[0]?

    ko.applyBindings viewModel, report[0]
