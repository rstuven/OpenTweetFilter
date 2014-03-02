@messages =

  # Get current language according to Twitter user settings, not browser settings.
  lang: ->
    langs = ['es']
    isSelected = (lang) -> $('body').hasClass(lang)
    langs.filter(isSelected)[0] ? 'en'


  # Get message according to current language.
  get: (key) ->
    @[@lang()][key] ? '#' + key + '#'

