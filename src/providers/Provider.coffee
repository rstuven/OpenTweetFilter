# Twitter DOM provider.
class Provider

  inMyProfilePage: ->
    @screenUser() is @sessionUser()

  normalizeUser: (x) ->
    if x? then x.replace('@', '').trim() else ''

  # Get an instance of the first active provider
  @getActive: (providers...) ->
    providers = providers.map (x) -> new x
    return p for p in providers when p.isActive()
    return providers[providers.length - 1]
