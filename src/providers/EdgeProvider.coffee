$ = require 'jquery'
{Provider} = require './Provider'
{PhoenixT1DialogView} = require '../views/PhoenixT1DialogView'
{PhoenixT1ReportView} = require '../views/PhoenixT1ReportView'

# Twitter DOM provider for Phoenix T1 UI.
class @EdgeProvider extends Provider

  dialogView: new PhoenixT1DialogView
  reportView: new PhoenixT1ReportView

  isActive: ->
    $('body').hasClass 'edge-design'

  filterCurrentPage: ->
    isIgnorablePage = (location.pathname + location.hash) in @ignorablePages()
    not (@inMyProfilePage() or isIgnorablePage)

  ignorablePages: ->
    [
      '/' + @sessionUser() + '/lists'
      '/who_to_follow/suggestions'
    ]

  sessionUser: ->
    @normalizeUser $('li.DashUserDropdown-userInfo span.username.u-dir b').text()

  screenUser: ->
    @normalizeUser $('a.ProfileHeaderCard-screennameLink span.username.u-dir b').text()

  tweets: ->
    $('div.tweet.js-stream-tweet')

  tweetText: (el) ->
    $(el).find('.js-tweet-text, .tweet-text, .entry-content, .twtr-tweet-text').text()

  tweetAuthor: (el) ->
    @normalizeUser $(el).data('screen-name')

  tweetAuthorPhoto: (el) ->
    $(el).find('img.avatar').attr 'src'

  tweetRetweeter: (el) ->
    href = $(el).find('.pretty-link.js-user-profile-link').attr 'href'
    if href then href.replace '/', '' else ''

  onNewTweets: (callback) ->
    $(document).on 'DOMNodeInserted', '.stream .stream-items', =>
      tweetsCount = @tweets().size()
      if @tweetsCount != tweetsCount
        @tweetsCount = tweetsCount
        callback()
