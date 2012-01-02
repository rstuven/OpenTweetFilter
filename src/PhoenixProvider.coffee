#
class PhoenixProvider extends Provider

  dialogView: new PhoenixDialogView
  reportView: new PhoenixReportView

  isActive: ->
    not $('body').hasClass 't1'

  sessionUser: ->
    @normalizeUser $('#screen-name').html()

  screenUser: ->
    @normalizeUser $('.screen-name.pill').html()

  ignorablePages: [
    '#!/retweets'
    '#!/retweeted_of_mine'
    '#!/messages'
  ]

  filterCurrentPage: ->
    isIgnorablePage = location.hash in @ignorablePages
    not (@inMyProfilePage() or isIgnorablePage)

  tweets: ->
    $('div.stream-item[data-item-type="tweet"], div.stream-item.js-activity-favorite, div.stream-item.js-activity-retweet')

  tweetText: (el) ->
    $(el).find('.js-tweet-text, .tweet-text,.entry-content, .twtr-tweet-text').text()

  tweetAuthor: (el) ->
    $(el).find('.tweet-screen-name').text()

  tweetAuthorPhoto: (el) ->
    $(el).find('img.user-profile-link').attr 'src'

  tweetRetweeter: (el) ->
    @normalizeUser $(el).find('.user').text()

  renderDialog: (viewModel) ->
    @dialogView.render viewModel
  
  onNewTweets: (callback) ->
    $(document).on 'DOMNodeInserted', '.stream .stream-items', =>
      tweetsCount = @tweets().size()
      if @tweetsCount != tweetsCount
        @tweetsCount = tweetsCount
        callback()
