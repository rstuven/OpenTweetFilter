#
class FilterPhoenixProvider extends PhoenixProvider

  dialogView: new DialogPhoenixView
  reportView: new ReportPhoenixView

  filterCurrentPage: ->
    isIgnorablePage = location.hash in @ignorablePages()
    not (@inMyProfilePage() or isIgnorablePage)

  ignorablePages: ->
    [
      '#!/retweets'
      '#!/retweeted_of_mine'
      '#!/messages'
    ]
