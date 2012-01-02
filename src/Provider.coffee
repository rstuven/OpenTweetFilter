# Twitter DOM provider
class Provider

  inMyProfilePage: ->
    @screenUser() is @sessionUser()

  normalizeUser: (x) ->
    if x? then x.replace('@', '').trim() else ''

  # Get an instance of the first provider which is active
  @getActive: (providers...) ->
    return p for p in providers.map((x) -> new x) when p.isActive()
