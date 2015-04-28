{Criterion} = require './Criterion'

class @UserCriterion extends Criterion

  constructor: (@provider, @dialogViewModel, list) ->
    super list, true

  match: (el) ->
    return false unless @rx?
    exclude = @dialogViewModel.usersExclude()
    return exclude if super @provider.tweetAuthor(el)
    return exclude if super @provider.tweetRetweeter(el)
    return not exclude
