#
class ReportViewModel

  constructor: (dialogViewModel) ->
 
    # Temporary properties
    @applied        = ko.observable false
    @hasTerms       = ko.observable false
    @hasUsers       = ko.observable false
    @hiddenCount    = ko.observable false
    @hiddenUsers    = ko.observable false
    
    # Computed properites
    @visible = ko.computed =>
      dialogViewModel.showReportView() and @applied() and (@hasTerms() or @hasUsers())
    
    @hasHiddenTweets = ko.computed =>
      @hiddenCount() isnt 0
    
    @filteringByEndMessage = ko.computed =>
      if @hiddenCount() is 1
        messages.get('filtering_by_end_singular')
      else
        messages.get('filtering_by_end')
    
    @filtersMessage = ko.computed =>
      filters = []
      filters.push messages.get('terms') if @hasTerms()
      filters.push messages.get('people') if @hasUsers()
      filters.join ' ' + messages.get('and') + ' '

    @usersPhotos = ko.computed =>
      {title, src} for title, src of @hiddenUsers() when src

    @usersNames = ko.computed =>
      title for title, src of @hiddenUsers() when not src
