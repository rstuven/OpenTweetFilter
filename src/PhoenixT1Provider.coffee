#
class PhoenixT1Provider extends PhoenixProvider

  dialogView: new PhoenixT1DialogView
  reportView: new PhoenixT1ReportView

  ignorablePages: [
    '#!/i/connect'
    '#!/i/discover'
    '#!/who_to_follow/suggestions'
    '#!/who_to_follow/import'
    '#!/who_to_follow/interests'
  ]

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
