exports.main = function() {};

var pageMod = require("page-mod");
var data = require("self").data;

pageMod.PageMod({
    include: "*.twitter.com",
    contentScriptWhen: 'ready',
    contentScriptFile: [
        data.url("js/filter.js")
    ]
});
