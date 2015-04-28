fs          = require 'fs'
{execFile, exec}  = require 'child_process'

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
      console.log 'Removed ' + file

# Utils

logerr = (err) ->
  console.error err.message + '\n'

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
