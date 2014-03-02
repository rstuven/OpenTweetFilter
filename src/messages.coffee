supportedLangs = ['en', 'es', pt]

@messages =

  # Get current language according to Twitter user settings, not browser settings.
  lang: ->
    lang = $('html').attr 'lang'
    return 'en' if lang not in supportedLangs
    lang

  # Get message according to current language.
  get: (key) ->
    @[@lang()][key] ? '#' + key + '#'

