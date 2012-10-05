# Twitter DOM provider for Phoenix UI.
class PhoenixProvider extends Provider

  isActive: ->
    not $('body').hasClass 't1'

  sessionUser: ->
    @normalizeUser $('#screen-name').html()

  screenUser: ->
    @normalizeUser $('.screen-name.pill').html()

  tweets: ->
    $('div.tweet.original-tweet.js-stream-tweet')

  tweetText: (el) ->
    $(el).find('.js-tweet-text, .tweet-text,.entry-content, .twtr-tweet-text').text()

  tweetAuthor: (el) ->
    $(el).find('.tweet-screen-name').text()

  tweetAuthorPhoto: (el) ->
    $(el).find('img.user-profile-link').attr 'src'

  tweetRetweeter: (el) ->
    @normalizeUser $(el).find('.user').text()
  
  onNewTweets: (callback) ->
    $(document).on 'DOMNodeInserted', '.stream .stream-items', =>
      tweetsCount = @tweets().size()
      if @tweetsCount != tweetsCount
        @tweetsCount = tweetsCount
        callback()
