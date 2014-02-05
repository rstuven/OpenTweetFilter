# Twitter DOM provider for Phoenix T1 UI.
class PhoenixT1Provider extends Provider

  dialogView: new PhoenixT1DialogView
  reportView: new PhoenixT1ReportView

  isActive: ->
    $('body').hasClass 't1'

  filterCurrentPage: ->
    isIgnorablePage = (location.pathname + location.hash) in @ignorablePages()
    not (@inMyProfilePage() or isIgnorablePage)

  ignorablePages: ->
    [
      '/' + @sessionUser() + '/lists'
      '/i/#!/who_to_follow/suggestions'
      '/i/#!/who_to_follow/import'
      '/i/#!/who_to_follow/interests'

    ]

  sessionUser: ->
    @normalizeUser $('.account-group.js-mini-current-user').data 'screen-name'

  screenUser: ->
    @normalizeUser $('.screen-name:not(.hidden)').text()

  tweets: ->
    $('div.tweet.js-original-tweet.js-stream-tweet')

  tweetText: (el) ->
    $(el).find('.js-tweet-text, .tweet-text,.entry-content, .twtr-tweet-text').text()

  tweetAuthor: (el) ->
    @normalizeUser $(el).find('.username').text()

  tweetAuthorPhoto: (el) ->
    $(el).find('img.avatar').attr 'src'

  tweetRetweeter: (el) ->
    href = $(el).find('.pretty-link.js-user-profile-link').attr 'href'
    if href then href.replace '/#!/', '' else ''

  onNewTweets: (callback) ->
    $(document).on 'DOMNodeInserted', '.stream .stream-items', =>
      tweetsCount = @tweets().size()
      if @tweetsCount != tweetsCount
        @tweetsCount = tweetsCount
        callback()
