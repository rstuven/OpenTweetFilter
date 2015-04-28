$ = require 'jquery'

langs =
  en: require './messages.en'
  es: require './messages.es'
  pt: require './messages.pt'

module.exports =

  # Get current language according to Twitter user settings, not browser settings.
  lang: ->
    lang = $('html').attr 'lang'
    return 'en' if lang not of langs
    lang

  # Get message according to current language.
  get: (key) ->
    langs[@lang()][key] ? '#' + key + '#'
