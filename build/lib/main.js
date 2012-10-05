exports.main = function() {};

var pageMod = require("page-mod");
var data = require("self").data;

pageMod.PageMod({
    include: "*.twitter.com",
    contentStyleFile: [
        data.url("js/jquery/tipsy/tipsy.css"), 
        data.url("css/filter.css")
    ],
    contentScriptWhen: 'ready',
    contentScriptFile: [
         data.url("js/jquery/jquery-1.7.1.min.js")
        ,data.url("js/jquery/jquery-ui-1.8.16.custom.min.js")
        ,data.url("js/jquery/tipsy/tipsy.js") 
        ,data.url("js/ko/knockout-2.1.0.js")
        ,data.url("js/ko/knockout.localStorage-latest.js")
        ,data.url("js/coffeekup/coffeekup.js")
        ,data.url("js/filter.js")
    ]
});