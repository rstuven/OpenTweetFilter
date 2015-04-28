{Criterion} = require './Criterion'

class @TermCriterion extends Criterion

  constructor: (@provider, @dialogViewModel, list) ->
    super list, false

  match: (el) ->
    return false unless @rx?
    match = super @provider.tweetText(el)
    match is @dialogViewModel.termsExclude()

