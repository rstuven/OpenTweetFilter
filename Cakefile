fs          = require 'fs'
util        = require 'util'
{execFile, exec}  = require 'child_process'

appFiles  = [
  # omit 'src/' and '.coffee' to make the below lines a little shorter
  'messages'
  'messages.en'
  'messages.es'
  'messages.pt'
  'models/DialogViewModel'
  'models/ReportViewModel'
  'views/View'
  'views/PhoenixT1DialogView'
  'views/PhoenixT1ReportView'
  'providers/Provider'
  'providers/PhoenixT1Provider'
  'providers/HighlineProvider'
  'criteria/Criterion'
  'criteria/TermCriterion'
  'criteria/UserCriterion'
  'Extension'
].map (file) -> "src/#{file}.coffee"

build = ->

  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile file, 'utf8', (err, fileContents) ->
      return logerr err if err
      appContents[index] = fileContents
      link() if --remaining is 0
  link = ->
    fs.writeFile 'build/data/js/filter.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      return logerr err if err
      exec "coffee --compile #{__dirname}/build/data/js/filter.coffee", (err, stdout, stderr) ->
        return logerr err if err
        console.log stdout + stderr
        fs.unlink 'build/data/js/filter.coffee', (err) ->
          return logerr err if err
          console.log 'Built.\n'

task 'build', 'Build single application file from source files.', ->
  build()

task 'watch', 'Watch source files changes and build.', ->
  build()
  @event = null
  @filename = null
  for file, index in appFiles then do (file, index) ->
    fs.watch file, (event, filename) =>
      if event != @event or filename != @filename
        console.log event + ' ' + filename
      @event = event
      @filename = filename
      throttle 100, =>
        build()
        @event = null
        @filename = null

task 'pack:crx', 'Create or update a Chrome extension package.', ->
  args = ["--pack-extension=#{__dirname}/build"]
  pemFile = "#{__dirname}/build.pem";
  if fs.existsSync pemFile
    args.push '--pack-extension-key=' + pemFile
  execFile process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', args, (err, stdout, stderr) ->
    return logerr err if err
    console.log stdout + stderr
  
task 'pack:cws', 'Update an extension package for Chrome Web Store.', ->
  manifestContent = fs.readFileSync "#{__dirname}/build/manifest.json", 'utf8'
  manifest = JSON.parse manifestContent
  zipFile = "package-cws-#{manifest.version}.zip"
  console.log "\nGenerating #{zipFile}...\n"
  fs.unlink zipFile, (err) ->
    exec "cd build/ & zip -r9 ../#{zipFile} *", (err, stdout, stderr) ->
      return logerr err if err
      console.log stdout + stderr

task 'pack:clear', 'Remove all package related files.', ->
  walk
    dir: "#{__dirname}"
    recursive: false
    matcher: (file) -> 
      file.match(/\/package-(.+)\.zip$/) or file.match(/\.crx$/) or file.match(/\.pem$/) or file.match(/\.xpi$/)
    action: (file) -> fs.unlink file, (err) -> 
      return logerr err if err and err.code isnt 'ENOENT' # ENOENT: No such file or directory

# Utils

logerr = (err) ->
  console.log err.message + '\n'

throttle = do ->
  timeout = null
  (delay, fn) ->
    clearTimeout timeout
    timeout = setTimeout fn, delay

fs.copy = (src, dst, ow, cb) ->
  fs.stat dst, (err) ->
    return cb new Error "File #{dst} exists." if not err and not ow
    fs.stat src, (err) ->
      return cb err if err
      ist = fs.createReadStream src
      ost = fs.createWriteStream dst
      util.pump ist, ost, cb
 
# Based on Rosetta Code
walk = (options) ->
  dir = options.dir
  f_match = options.matcher
  f_visit = options.action
  recursive = options.recursive ? true
  _walk = (dir) ->
    fns = fs.readdirSync dir
    for fn in fns
      fn = dir + '/' + fn
      if f_match fn
        f_visit fn
      if recursive and fs.statSync(fn).isDirectory()
        _walk fn
  _walk(dir)
 