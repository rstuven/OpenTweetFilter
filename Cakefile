fs          = require 'fs'
{execFile, execSync}  = require 'child_process'

task 'pack:patch', '', ->
  packVersion 'patch'

task 'pack:minor', '', ->
  packVersion 'minor'

task 'pack:major', '', ->
  packVersion 'major'

packVersion = (level) ->
  execSync 'npm version ' + level
  version = updateVersions()
  invoke 'pack:clear'
  invoke 'pack:cws'
  execSync 'git add ./build/manifest.json'
  execSync 'git add ./build/package.json'
  execSync 'git commit --amend --no-edit'
  execSync 'git tag --force v' + version

task 'pack:crx', 'Create or update a Chrome extension package.', ->
  args = ["--pack-extension=#{__dirname}/build"]
  pemFile = "#{__dirname}/build.pem";
  if fs.existsSync pemFile
    args.push '--pack-extension-key=' + pemFile
  execFile process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe', args, (err, stdout, stderr) ->
    return logerr err if err
    console.log stdout + stderr
  
task 'pack:cws', 'Create an extension package for Chrome Web Store.', ->
  source = require './package.json'
  zipFile = "package-cws-#{source.version}.zip"
  console.log "\nGenerating #{zipFile}...\n"
  try fs.unlinkSync zipFile
  execSync "cd build/ && zip -r9 ../#{zipFile} *"

task 'pack:clear', 'Remove all package related files.', ->
  walk
    dir: "#{__dirname}"
    recursive: false
    matcher: (file) -> 
      file.match(/\/package-(.+)\.zip$/) or file.match(/\.crx$/) or file.match(/\.pem$/) or file.match(/\.xpi$/)
    action: (file) -> try fs.unlinkSync file

task 'update:version', '', ->
  updateVersions()


# Utils

updateVersions =  ->
  source = require './package.json'
  updateVersion source.version, './build/manifest.json'
  updateVersion source.version, './build/package.json'
  source.version

updateVersion = (version, file) ->
  target = require file
  target.version = version
  fs.writeFileSync file, JSON.stringify(target, null, 2)

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
