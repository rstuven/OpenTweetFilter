#
class FilterPhoenixT1Provider extends PhoenixT1Provider

  dialogView: new DialogPhoenixT1View
  reportView: new ReportPhoenixT1View
  
  filterCurrentPage: ->
    isIgnorablePage = location.hash in @ignorablePages
    not (@inMyProfilePage() or isIgnorablePage)

  ignorablePages: [
    '#!/i/connect'
    '#!/i/discover'
    '#!/who_to_follow/suggestions'
    '#!/who_to_follow/import'
    '#!/who_to_follow/interests'
  ]
