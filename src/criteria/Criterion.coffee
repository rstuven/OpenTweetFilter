class Criterion

  constructor: (csv, whole) ->
    @rx = @buildRegExp @buildPattern csv, whole

  match: (text) ->
    return false unless @rx?
    @rx.lastIndex = 0
    @rx.test text

  # Build a filter regular expression pattern
  buildPattern: (csv, whole) ->
    values = csv.split ','
    values = $.map values, (v) ->
      v = $.trim v
      if v.length > 2 and v[0] == '/' and v[v.length - 1] == '/'
        # support user regexes
        v.substr 1, v.length - 2
      else
        # escape some characters
        v.replace /([\.\(\)\[\]\{\}\+\*\?\\])/g, '\\$1'

    values = $.grep values, (v, i) -> v != ''

    return null if values.length is 0

    values = '('+ values.join('|') + ')'
    if whole
      "^#{values}$"
    else
      values

  # Build an actual regular expression
  buildRegExp: (pattern) ->
    return null unless pattern?
    try
      new RegExp pattern, 'gi'
    catch e
      null
