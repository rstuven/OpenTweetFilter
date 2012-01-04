# 
class Extension

  provider: Provider.getActive FilterPhoenixProvider, FilterPhoenixT1Provider
  
  constructor: ->

    @dialogViewModel = new DialogViewModel
    @reportViewModel = new ReportViewModel @dialogViewModel
  
    @provider.dialogView.render @dialogViewModel
    
    # Apply filter on changes
    $(window).on 'hashchange', => setTimeout (=> @applyFilter()), 500
    @provider.onNewTweets                     => @applyFilter()
    @dialogViewModel.termsList     .subscribe => @applyFilter()
    @dialogViewModel.termsExclude  .subscribe => @applyFilter()
    @dialogViewModel.usersList     .subscribe => @applyFilter()
    @dialogViewModel.usersExclude  .subscribe => @applyFilter()
    @dialogViewModel.enabled       .subscribe => @applyFilter()
    @dialogViewModel.showReportView.subscribe => @applyFilter()
    
    # Apply filter right now
    @applyFilter()

  # The extension's heart
  applyFilter: -> @throttle 10, =>

    @dialogViewModel.reload()
  
    apply = @dialogViewModel.enabled() and @provider.filterCurrentPage()

    if apply
      termsPattern = @filterPattern @dialogViewModel.termsList(), false
      usersPattern = @filterPattern @dialogViewModel.usersList(), true

    hiddenCount = 0
    hiddenUsers = {}
  
    @provider.tweets().each (i, el) =>

      termsMatch = false
      usersMatch = false

      if apply
        tweetAuthor = @provider.tweetAuthor(el)
        
        # Terms
        termsRegExp = @filterRegExp termsPattern
        if termsRegExp?
          foundTermsMatches = termsRegExp.test @provider.tweetText(el)
          termsMatch = @dialogViewModel.termsExclude() == foundTermsMatches

        # Users (author or retweeter)
        usersRegExp = @filterRegExp usersPattern
        if usersRegExp?
          foundUserMatches = usersRegExp.test(tweetAuthor) or usersRegExp.test(@provider.tweetRetweeter(el))
          usersMatch = @dialogViewModel.usersExclude() == foundUserMatches

      if termsMatch or usersMatch
        $(el).hide()
        hiddenCount++
        if not (tweetAuthor of hiddenUsers)
          hiddenUsers[tweetAuthor] = @provider.tweetAuthorPhoto(el)
      else 
        $(el).show()
    
    # Update report view model
    @reportViewModel
      .applied(apply)
      .hasTerms(termsPattern?)
      .hasUsers(usersPattern?)
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

  # Build a filter regular expression pattern
  filterPattern: (csv, whole) ->
    values = csv.split ','
    values = $.map values, (v, i) ->
      v = $.trim v
      if v.length > 2 and v[0] == '/' and v[v.length - 1] == '/'
        # support user regexes
        v.substr 1, v.length - 2
      else
        # escape some characters
        v.replace /([\.\(\)\[\]\{\}\+\*\?\\])/g, '\\$1'
    
    values = $.grep values, (v, i) -> v != ''
  
    return null if values.length is 0
    
    values = '('+ values.join('|') + ')'
    if whole then "^#{values}$" else values

  # Build an actual regular expression
  filterRegExp: (pattern) ->
    return null unless pattern?
    try
      new RegExp pattern, 'gi'
    catch e
      null

# Go!
new Extension()
