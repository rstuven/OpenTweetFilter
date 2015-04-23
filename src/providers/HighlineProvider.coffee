# Twitter DOM provider for Highline UI.
class HighlineProvider extends Provider

  dialogView: new PhoenixT1DialogView
  reportView: new PhoenixT1ReportView

  isActive: ->
    $('body').hasClass 'highline'

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
    @normalizeUser $('.ProfileHeaderCard-screenname').text()

  tweets: ->
    $('div.tweet.js-stream-tweet, .Grid[data-component-term="tweet"]')

  tweetText: (el) ->
    $(el).find('.js-tweet-text, .entry-content, .ProfileTweet-text').text()

  tweetAuthor: (el) ->
    @normalizeUser $(el).find('.username').text()

  tweetAuthorPhoto: (el) ->
    $(el).find('img.js-action-profile-avatar').attr 'src'

  tweetRetweeter: (el) ->
    href = $(el).find('.pretty-link.js-user-profile-link').attr 'href'
    if href then href.replace /^\//, '' else ''

  onNewTweets: (callback) ->
    $(document).on 'DOMNodeInserted', '.stream .stream-items', =>
      tweetsCount = @tweets().size()
      if @tweetsCount != tweetsCount
        @tweetsCount = tweetsCount
        callback()
