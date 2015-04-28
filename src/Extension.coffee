class Extension

  # Select the most suitable provider
  provider: Provider.getActive PhoenixT1Provider, HighlineProvider
  
  constructor: ->

    # The view models are powered by Knockout
    # See http://knockoutjs.com/documentation/observables.html
    @dialogViewModel = new DialogViewModel
    @reportViewModel = new ReportViewModel @dialogViewModel
  
    @provider.dialogView.render @dialogViewModel
    
    # Apply filter on changes
    $(window)         .on 'hashchange',  => setTimeout (=> @applyFilter()), 500
    @provider         .onNewTweets                      => @applyFilter()
    @dialogViewModel  .onSettingsChange                 => @applyFilter()
    
    # Apply filter right now!
    @applyFilter()

  # The extension's heart
  applyFilter: -> @throttle 16, =>

    @dialogViewModel.reload()

    if @dialogViewModel.enabled() and @provider.filterCurrentPage()
      criteria = [
        new TermCriterion @provider, @dialogViewModel, @dialogViewModel.termsList()
        new UserCriterion @provider, @dialogViewModel, @dialogViewModel.usersList()
      ]
    else
      criteria = []

    hiddenCount = 0
    hiddenUsers = {}
  
    @provider.tweets().each (i, el) =>

      hide = true for c in criteria when c.match el

      # Faster than jQuery 'hide' which causes reflow and repaint (call to getComputedStyle).
      el.style.display = if hide then 'none' else 'block'

      if hide
        hiddenCount++
        tweetAuthor = @provider.tweetAuthor(el)
        hiddenUsers[tweetAuthor] ?= @provider.tweetAuthorPhoto(el)

    # Update report view model
    @reportViewModel
      .applied(criteria.length > 0)
      .hiddenCount(hiddenCount)
      .hiddenUsers(hiddenUsers)

    # Try to render in a second
    @throttle 1000, =>
      @provider.reportView.render @reportViewModel

  # Cancelable timeout to avoid too many consecutive calls
  throttle: do ->
    timeout = {}
    (delay, fn) ->
      key = fn.toString()
      clearTimeout timeout[key]
      timeout[key] = setTimeout fn, delay

# Go!
new Extension()
