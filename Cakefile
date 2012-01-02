fs          = require 'fs'
path        = require 'path'
util        = require 'util'
{execFile, exec}  = require 'child_process'

appFiles  = [
  # omit 'src/' and '.coffee' to make the below lines a little shorter
  'coffeekup'
  'messages'
  'messages.en'
  'messages.es'
  'ViewModel'
  'PhoenixDialogView'
  'PhoenixT1DialogView'
  'PhoenixReportView'
  'PhoenixT1ReportView'
  'Provider'
  'PhoenixProvider'
  'PhoenixT1Provider'
  'Extension'
]

build = ->

  appContents = new Array remaining = appFiles.length
  for file, index in appFiles then do (file, index) ->
    fs.readFile "src/#{file}.coffee", 'utf8', (err, fileContents) ->
      return logerr err if err
      appContents[index] = fileContents
      link() if --remaining is 0
  link = ->
    fs.writeFile 'build/filter.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      return logerr err if err
      execFile 'C:/node/node_modules/.bin/coffee.cmd', ['--compile',  "#{__dirname}/build/filter.coffee"], (err, stdout, stderr) ->
        return logerr err if err
        console.log stdout + stderr
        fs.unlink 'build/filter.coffee', (err) ->
          return logerr err if err
          console.log 'Built.\n'

task 'build', 'Build single application file from source files', ->
  build()

task 'watch', 'Watch changes and build.', ->
  build()
  @event = null
  @filename = null
  fs.watch 'src/', (event, filename) =>
    if event != @event or filename != @filename
      console.log event + ' ' + filename
    @event = event
    @filename = filename
    throttle 100, =>
      build()
      @event = null
      @filename = null

task 'package', 'Create or update an extension package', ->
  args = ["--pack-extension=#{__dirname}/build"]
  pemFile = "#{__dirname}/build.pem";
  if path.existsSync pemFile
    args.push '--pack-extension-key=' + pemFile
  execFile process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', args, (err, stdout, stderr) ->
    return logerr err if err
    console.log stdout + stderr

task 'package:webstore', 'Update an extension package for Google Web Store', ->
  fs.unlink 'upload_to_webstore.zip', (err) ->
    fs.copy 'build.pem', 'build/key.pem', true, (err) ->
      return logerr err if err
      exec "cd build/ & zip -r9 ../upload_to_webstore.zip *", (err, stdout, stderr) ->
        return logerr err if err
        fs.unlink 'build/key.pem', (err) ->
          return logerr err if err
        console.log stdout + stderr

task 'package:clear', 'Remove all package related files.', ->
  handler = (err) -> 
    return logerr err if err and err.code isnt 'ENOENT' # ENOENT: No such file or directory
  
  fs.unlink 'build.crx', handler
  fs.unlink 'build.pem', handler
  fs.unlink 'build/key.pem', handler
  fs.unlink 'upload_to_webstore.zip', handler

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
