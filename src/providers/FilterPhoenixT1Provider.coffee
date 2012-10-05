#
class FilterPhoenixT1Provider extends PhoenixT1Provider

  dialogView: new DialogPhoenixT1View
  reportView: new ReportPhoenixT1View
  
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
