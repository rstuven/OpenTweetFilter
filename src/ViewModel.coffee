# The extension view model is powered by Knockout.js
# See http://knockoutjs.com/documentation/observables.html
class ViewModel

  constructor: ->

    # Default values
    # Read them from localStorage for backward compatibility.
    # Convert them to native types as localStorage values are string.
    termsList       = (localStorage.filter_terms_list     or '')
    termsExclude    = (localStorage.filter_terms_exclude  or '1') == '1'
    usersList       = (localStorage.filter_from_list      or '')
    usersExclude    = (localStorage.filter_from_exclude   or '1') == '1'
    enabled         = (localStorage.filter_enabled        or '1') == '1'
    showWelcomeTip  = true
    
    # Persistent properties
    @termsList      = ko.observable termsList       , persist: 'TwitterFilter.termsList'
    @termsExclude   = ko.observable termsExclude    , persist: 'TwitterFilter.termsExclude'
    @usersList      = ko.observable usersList       , persist: 'TwitterFilter.usersList'
    @usersExclude   = ko.observable usersExclude    , persist: 'TwitterFilter.usersExclude'
    @enabled        = ko.observable enabled         , persist: 'TwitterFilter.enabled'
    @showWelcomeTip = ko.observable showWelcomeTip  , persist: 'TwitterFilter.showWelcomeTip'
    
    # Temporary properties
    @visible        = ko.observable false
    
    # Dependent properties
    @buttonStatusHtml = ko.computed => if @enabled() then '&#9745;' else '&#9744;'
    @toggleText       = ko.computed => if @enabled() then messages.get('disable') else messages.get('enable')
    @termsExcludeText = ko.computed => if @termsExclude() then messages.get('excluding') else messages.get('including')
    @usersExcludeText = ko.computed => if @usersExclude() then messages.get('excluding') else messages.get('including')

  clear: ->
    @termsList    ''
    @termsExclude true
    @usersList    ''
    @usersExclude true
    @enabled      true

  toggle: (attr) ->
    @[attr] !@[attr]()
  
  toggleEnabled:      -> @toggle 'enabled'
  toggleVisible:      -> @toggle 'visible'
  toggleTermsExclude: -> @toggle 'termsExclude'
  toggleUsersExclude: -> @toggle 'usersExclude'
