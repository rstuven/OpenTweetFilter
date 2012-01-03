# Twitter DOM provider for Phoenix T1 UI.
class PhoenixT1Provider extends PhoenixProvider

  isActive: ->
    $('body').hasClass 't1'

  sessionUser: ->
    @normalizeUser $('.account-group.js-mini-current-user').data 'screen-name'

  screenUser: ->
    @normalizeUser $('.screen-name').text()

  tweetAuthor: (el) ->
    @normalizeUser $(el).find('.username').text()

  tweetAuthorPhoto: (el) ->
    $(el).find('img.avatar').attr 'src'

  tweetRetweeter: (el) ->
    href = $(el).find('.pretty-link.js-user-profile-link').attr 'href'
    if href then href.replace '/#!/', '' else ''
