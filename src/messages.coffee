@messages =

  # Get current language according to Twitter user settings, not browser settings.
  lang: -> 
    if $('body').hasClass('es') then 'es' else if $('body').hasClass('pt') then 'pt' else 'en'

  # Get message according to current language.
  get: (key) ->
    @[@.lang()][key] or '#' + key + '#'

