# The extension view model is powered by Knockout.js
# See http://knockoutjs.com/documentation/observables.html
class DialogViewModel

  # Settings schema versioning
  version: 2

  # Settings names and defaults
  settings:
    termsList       : ''
    termsExclude    : yes
    usersList       : ''
    usersExclude    : yes
    enabled         : yes
    showReportView  : yes

  constructor: ->
    
    # Define persistent properties
    @showWelcomeTip   = ko.observable yes, persist: 'TwitterFilter.showWelcomeTip'
    
    for setting, $default of @settings
      @[setting] = ko.observable $default, persist: 'TwitterFilter.' + setting

    # Migrate old settings schemas since version 1
    @migrateSince 1
    
    # Define temporary properties
    @visible          = ko.observable no
    
    # Define computed properties
    @buttonStatusHtml = ko.computed => if @enabled() then '&#9745;' else '&#9744;'
    @toggleText       = ko.computed => if @enabled() then messages.get('disable') else messages.get('enable')
    @termsExcludeText = ko.computed => if @termsExclude() then messages.get('excluding') else messages.get('including')
    @usersExcludeText = ko.computed => if @usersExclude() then messages.get('excluding') else messages.get('including')
    @bookmarklet      = ko.computed =>

      # Build a set statement
      set = (setting) => 
        observable = @[setting]
        value = JSON
          .stringify(observable())
          .replace(/\\/g, "\\\\")
          .replace(/\'/g, "\\'")
        "s('#{observable.persistKey}','#{value}');"

      # Build all set statements
      sets = (set setting for setting of @settings).join ''

      # Build bookmarklet that sets values and notifies the change via DOM including schema version
      code = """
      javascript:(function(){
      function s(k,v){window.localStorage.setItem(k,v);}
      #{sets}
      $('<div id=\"filter-reload\" data-version=\"#{@version}\"></div>').appendTo($('#filter-button'));
      })();
      """
      
      # Make it a one-liner
      code.replace /\n/g, ''
  
  # Back to defaults
  clear: ->
    for setting, $default of @settings
      @[setting] $default

  # Load from localStorage
  reload: ->
    for setting of @settings
      @[setting].reload()

  # Subscribe to all settings
  onSettingsChange: (callback) ->
    for setting of @settings
      @[setting].subscribe callback

  # Process bookmarklet settings taking its version into account.
  # We don't want to be incompatible with old bookmarklets and lose settings.
  bookmarkletLoaded: (version) ->
    @migrateSince version
    @reload()
  
  toggle: (attr) ->
    @[attr] !@[attr]()
  
  toggleEnabled:        -> @toggle 'enabled'
  toggleVisible:        -> @toggle 'visible'
  toggleTermsExclude:   -> @toggle 'termsExclude'
  toggleUsersExclude:   -> @toggle 'usersExclude'
  toggleShowReportView: -> @toggle 'showReportView'

  # Migrate settings versions incrementally
  migrateSince: (sinceVersion) ->
    version = sinceVersion + 1
    while version <= @version
      @migrations[version++]()

  # Define migrations for each version
  migrations:
  
    # Migrate from version 1 to 2
    2: ->
      up = (oldKey, newKey, map) ->
        oldValue = localStorage.getItem oldKey
        if oldValue?
          oldValue = map oldValue if map?
          localStorage.setItem 'TwitterFilter.' + newKey, JSON.stringify(oldValue)
          localStorage.removeItem oldKey
      
      toBoolean = (x) -> x is '1'
      
      up 'filter_terms_list'    , 'termsList'
      up 'filter_terms_exclude' , 'termsExclude'  , toBoolean
      up 'filter_from_list'     , 'usersList'
      up 'filter_from_exclude'  , 'usersExclude'  , toBoolean
      up 'filter_enabled'       , 'enabled'       , toBoolean
    
    # Migrate from version 2 to 3
    3: ->
      # Maybe next time...
