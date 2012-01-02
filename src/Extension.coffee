# 
class Extension

  viewModel: new ViewModel
  provider: Provider.getActive PhoenixProvider, PhoenixT1Provider
  
  constructor: ->
    
    @provider.renderDialog @viewModel
    
    # Apply filter on changes
    $(window).on 'hashchange',         => @applyFilter()
    @provider.onNewTweets              => @applyFilter()
    @viewModel.termsList    .subscribe => @applyFilter()
    @viewModel.termsExclude .subscribe => @applyFilter()
    @viewModel.usersList    .subscribe => @applyFilter()
    @viewModel.usersExclude .subscribe => @applyFilter()
    @viewModel.enabled      .subscribe => @applyFilter()
    
    # Apply filter right now
    @applyFilter()

  # The extension's heart
  applyFilter: -> @throttle 10, =>

    apply = @viewModel.enabled() and @provider.filterCurrentPage()

    if apply
      termsPattern = @filterPattern @viewModel.termsList(), false
      usersPattern = @filterPattern @viewModel.usersList(), true

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
          termsMatch = @viewModel.termsExclude() == foundTermsMatches

        # Users (author or retweeter)
        usersRegExp = @filterRegExp usersPattern
        if usersRegExp?
          foundUserMatches = usersRegExp.test(tweetAuthor) or usersRegExp.test(@provider.tweetRetweeter(el))
          usersMatch = @viewModel.usersExclude() == foundUserMatches

      if termsMatch or usersMatch
        $(el).hide()
        hiddenCount++
        if not (tweetAuthor of hiddenUsers)
          hiddenUsers[tweetAuthor] = @provider.tweetAuthorPhoto(el)
      else 
        $(el).show()
    
    # Update report
    @throttle 1000, =>
      @provider.reportView.render apply, termsPattern?, usersPattern?, hiddenCount, hiddenUsers

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
