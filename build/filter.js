(function() {
  var DialogPhoenixT1View, DialogPhoenixView, DialogViewModel, Extension, FilterPhoenixProvider, FilterPhoenixT1Provider, PhoenixProvider, PhoenixT1Provider, Provider, ReportPhoenixT1View, ReportPhoenixView, ReportViewModel, cache, coffee, coffeekup, coffeescript_helpers, elements, merge_elements, skeleton;
  var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; }, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  if (typeof window !== "undefined" && window !== null) {
    coffeekup = window.CoffeeKup = {};
    coffee = typeof CoffeeScript !== "undefined" && CoffeeScript !== null ? CoffeeScript : null;
  } else {
    coffeekup = exports;
    coffee = require('coffee-script');
  }

  coffeekup.version = '0.3.1edge';

  coffeekup.doctypes = {
    'default': '<!DOCTYPE html>',
    '5': '<!DOCTYPE html>',
    'xml': '<?xml version="1.0" encoding="utf-8" ?>',
    'transitional': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    'strict': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
    'frameset': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">',
    '1.1': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
    'basic': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">',
    'mobile': '<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">',
    'ce': '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "ce-html-1.0-transitional.dtd">'
  };

  coffeescript_helpers = "var __slice = Array.prototype.slice;\nvar __hasProp = Object.prototype.hasOwnProperty;\nvar __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };\nvar __extends = function(child, parent) {\n  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }\n  function ctor() { this.constructor = child; }\n  ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype;\n  return child; };\nvar __indexOf = Array.prototype.indexOf || function(item) {\n  for (var i = 0, l = this.length; i < l; i++) {\n    if (this[i] === item) return i;\n  } return -1; };".replace(/\n/g, '');

  elements = {
    regular: 'a abbr address article aside audio b bdi bdo blockquote body button\
 canvas caption cite code colgroup datalist dd del details dfn div dl dt em\
 fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup\
 html i iframe ins kbd label legend li map mark menu meter nav noscript object\
 ol optgroup option output p pre progress q rp rt ruby s samp script section\
 select small span strong style sub summary sup table tbody td textarea tfoot\
 th thead time title tr u ul video',
    "void": 'area base br col command embed hr img input keygen link meta param\
 source track wbr',
    obsolete: 'applet acronym bgsound dir frameset noframes isindex listing\
 nextid noembed plaintext rb strike xmp big blink center font marquee multicol\
 nobr spacer tt',
    obsolete_void: 'basefont frame'
  };

  merge_elements = function() {
    var a, args, element, result, _i, _j, _len, _len2, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    result = [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      a = args[_i];
      _ref = elements[a].split(' ');
      for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
        element = _ref[_j];
        if (__indexOf.call(result, element) < 0) result.push(element);
      }
    }
    return result;
  };

  coffeekup.tags = merge_elements('regular', 'obsolete', 'void', 'obsolete_void');

  coffeekup.self_closing = merge_elements('void', 'obsolete_void');

  skeleton = function(data) {
    var coffeescript, comment, doctype, h, ie, tag, text, yield, __ck, _ref, _ref2;
    if (data == null) data = {};
    if ((_ref = data.format) == null) data.format = false;
    if ((_ref2 = data.autoescape) == null) data.autoescape = false;
    __ck = {
      buffer: [],
      esc: function(txt) {
        if (data.autoescape) {
          return h(txt);
        } else {
          return String(txt);
        }
      },
      tabs: 0,
      repeat: function(string, count) {
        return Array(count + 1).join(string);
      },
      indent: function() {
        if (data.format) return text(this.repeat('  ', this.tabs));
      },
      tag: function(name, args) {
        var combo, i, _i, _len;
        combo = [name];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          i = args[_i];
          combo.push(i);
        }
        return tag.apply(data, combo);
      },
      render_idclass: function(str) {
        var c, classes, i, id, _i, _j, _len, _len2, _ref3;
        classes = [];
        _ref3 = str.split('.');
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          i = _ref3[_i];
          if (__indexOf.call(i, '#') >= 0) {
            id = i.replace('#', '');
          } else {
            if (i !== '') classes.push(i);
          }
        }
        if (id) text(" id=\"" + id + "\"");
        if (classes.length > 0) {
          text(" class=\"");
          for (_j = 0, _len2 = classes.length; _j < _len2; _j++) {
            c = classes[_j];
            if (c !== classes[0]) text(' ');
            text(c);
          }
          return text('"');
        }
      },
      render_attrs: function(obj, prefix) {
        var k, v, _results;
        if (prefix == null) prefix = '';
        _results = [];
        for (k in obj) {
          v = obj[k];
          if (typeof v === 'boolean' && v) v = k;
          if (typeof v === 'function') v = "(" + v + ").call(this);";
          if (typeof v === 'object' && !(v instanceof Array)) {
            _results.push(this.render_attrs(v, prefix + k + '-'));
          } else if (v) {
            _results.push(text(" " + (prefix + k) + "=\"" + (this.esc(v)) + "\""));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      },
      render_contents: function(contents) {
        var result;
        switch (typeof contents) {
          case 'string':
          case 'number':
          case 'boolean':
            return text(this.esc(contents));
          case 'function':
            if (data.format) text('\n');
            this.tabs++;
            result = contents.call(data);
            if (typeof result === 'string') {
              this.indent();
              text(this.esc(result));
              if (data.format) text('\n');
            }
            this.tabs--;
            return this.indent();
        }
      },
      render_tag: function(name, idclass, attrs, contents) {
        this.indent();
        text("<" + name);
        if (idclass) this.render_idclass(idclass);
        if (attrs) this.render_attrs(attrs);
        if (__indexOf.call(this.self_closing, name) >= 0) {
          text(' />');
          if (data.format) text('\n');
        } else {
          text('>');
          this.render_contents(contents);
          text("</" + name + ">");
          if (data.format) text('\n');
        }
        return null;
      }
    };
    tag = function() {
      var a, args, attrs, contents, idclass, name, _i, _len;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        a = args[_i];
        switch (typeof a) {
          case 'function':
            contents = a;
            break;
          case 'object':
            attrs = a;
            break;
          case 'number':
          case 'boolean':
            contents = a;
            break;
          case 'string':
            if (args.length === 1) {
              contents = a;
            } else {
              if (a === args[0]) {
                idclass = a;
              } else {
                contents = a;
              }
            }
        }
      }
      return __ck.render_tag(name, idclass, attrs, contents);
    };
    yield = function(f) {
      var old_buffer, temp_buffer;
      temp_buffer = [];
      old_buffer = __ck.buffer;
      __ck.buffer = temp_buffer;
      f();
      __ck.buffer = old_buffer;
      return temp_buffer.join('');
    };
    h = function(txt) {
      return String(txt).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    };
    doctype = function(type) {
      if (type == null) type = 'default';
      text(__ck.doctypes[type]);
      if (data.format) return text('\n');
    };
    text = function(txt) {
      __ck.buffer.push(String(txt));
      return null;
    };
    comment = function(cmt) {
      text("<!--" + cmt + "-->");
      if (data.format) return text('\n');
    };
    coffeescript = function(param) {
      switch (typeof param) {
        case 'function':
          return script("" + __ck.coffeescript_helpers + "(" + param + ").call(this);");
        case 'string':
          return script({
            type: 'text/coffeescript'
          }, function() {
            return param;
          });
        case 'object':
          param.type = 'text/coffeescript';
          return script(param);
      }
    };
    ie = function(condition, contents) {
      __ck.indent();
      text("<!--[if " + condition + "]>");
      __ck.render_contents(contents);
      text("<![endif]-->");
      if (data.format) return text('\n');
    };
    return null;
  };

  skeleton = String(skeleton).replace(/function\s*\(.*\)\s*\{/, '').replace(/return null;\s*\}$/, '');

  skeleton = coffeescript_helpers + skeleton;

  coffeekup.compile = function(template, options) {
    var code, hardcoded_locals, k, t, tag_functions, tags_used, v, _i, _j, _len, _len2, _ref, _ref2;
    if (options == null) options = {};
    if (typeof template === 'function') {
      template = String(template);
    } else if (typeof template === 'string' && (coffee != null)) {
      template = coffee.compile(template, {
        bare: true
      });
      template = "function(){" + template + "}";
    }
    hardcoded_locals = '';
    if (options.hardcode) {
      _ref = options.hardcode;
      for (k in _ref) {
        v = _ref[k];
        if (typeof v === 'function') {
          hardcoded_locals += "var " + k + " = function(){return (" + v + ").apply(data, arguments);};";
        } else {
          hardcoded_locals += "var " + k + " = " + (JSON.stringify(v)) + ";";
        }
      }
    }
    tag_functions = '';
    tags_used = [];
    _ref2 = coffeekup.tags;
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      t = _ref2[_i];
      if (template.indexOf(t) > -1 || hardcoded_locals.indexOf(t) > -1) {
        tags_used.push(t);
      }
    }
    tag_functions += "var " + (tags_used.join(',')) + ";";
    for (_j = 0, _len2 = tags_used.length; _j < _len2; _j++) {
      t = tags_used[_j];
      tag_functions += "" + t + " = function(){return __ck.tag('" + t + "', arguments);};";
    }
    code = tag_functions + hardcoded_locals + skeleton;
    code += "__ck.doctypes = " + (JSON.stringify(coffeekup.doctypes)) + ";";
    code += "__ck.coffeescript_helpers = " + (JSON.stringify(coffeescript_helpers)) + ";";
    code += "__ck.self_closing = " + (JSON.stringify(coffeekup.self_closing)) + ";";
    if (options.locals) code += 'with(data.locals){';
    code += "(" + template + ").call(data);";
    if (options.locals) code += '}';
    code += "return __ck.buffer.join('');";
    return new Function('data', code);
  };

  cache = {};

  coffeekup.render = function(template, data, options) {
    var k, tpl, v, _ref;
    if (data == null) data = {};
    if (options == null) options = {};
    for (k in options) {
      v = options[k];
      data[k] = v;
    }
    if ((_ref = data.cache) == null) data.cache = false;
    if (data.cache && (cache[template] != null)) {
      tpl = cache[template];
    } else if (data.cache) {
      tpl = cache[template] = coffeekup.compile(template, data);
    } else {
      tpl = coffeekup.compile(template, data);
    }
    return tpl(data);
  };

  if (typeof window === "undefined" || window === null) {
    coffeekup.adapters = {
      simple: coffeekup.render,
      meryl: coffeekup.render,
      express: {
        TemplateError: (function() {

          __extends(_Class, Error);

          function _Class(message) {
            this.message = message;
            Error.call(this, this.message);
            Error.captureStackTrace(this, arguments.callee);
          }

          _Class.prototype.name = 'TemplateError';

          return _Class;

        })(),
        compile: function(template, data) {
          var TemplateError, tpl, _ref;
          if ((_ref = data.hardcode) == null) data.hardcode = {};
          data.hardcode.partial = function() {
            return text(this.partial.apply(this, arguments));
          };
          TemplateError = this.TemplateError;
          try {
            tpl = coffeekup.compile(template, data);
          } catch (e) {
            throw new TemplateError("Error compiling " + data.filename + ": " + e.message);
          }
          return function() {
            try {
              return tpl.apply(null, arguments);
            } catch (e) {
              throw new TemplateError("Error rendering " + data.filename + ": " + e.message);
            }
          };
        }
      }
    };
  }

  this.messages = {
    lang: function() {
      if ($('body').hasClass('es')) {
        return 'es';
      } else {
        return 'en';
      }
    },
    get: function(key) {
      return this[this.lang()][key] || '#' + key + '#';
    }
  };

  this.messages.en = {
    filter_dialog_title: 'Your filters',
    enable: 'Enable',
    disable: 'Disable',
    excluding: 'Excluding',
    including: 'Including',
    tweets_terms: 'tweets containing terms',
    tweets_users: 'tweets from people',
    filter_terms_list_title: 'Terms separated by commas,<br/>eg.: twitcam, #fail',
    filter_users_list_title: 'Usernames separated by commas,<br/>eg.: twitterowsky, robocopano',
    show_report_view: 'Show report of filtered tweets.',
    filtering_by_start: 'Hiding',
    filtering_by_end: 'tweets by filter of',
    filtering_by_end_singular: 'tweet by filter of',
    users_with_hidden_tweets: 'Users with hidden tweets',
    terms: 'terms',
    people: 'people',
    and: 'and',
    clear: 'Clear',
    filter: 'Filter',
    welcome_tip: 'Pssst... Here you can configure<br/>the Open Tweet Filter extension.'
  };

  this.messages.es = {
    filter_dialog_title: 'Tus filtros',
    enable: 'Activar',
    disable: 'Desactivar',
    excluding: 'Excluyendo',
    including: 'Incluyendo',
    tweets_terms: 'tweets con términos',
    tweets_users: 'tweets de usuarios',
    filter_terms_list_title: 'Términos separados por comas.<br/>Por ej.: twitcam, jijiji',
    filter_users_list_title: 'Usuarios separados por comas.<br/>Por ej.: tuiterowsky, robocopano',
    show_report_view: 'Mostrar resumen de tweets filtrados.',
    filtering_by_start: 'Ocultando',
    filtering_by_end: 'tweets por filtro de',
    filtering_by_end_singular: 'tweet por filtro de',
    users_with_hidden_tweets: 'Usuarios con tweets ocultos',
    terms: 'términos',
    people: 'usuarios',
    and: 'y',
    clear: 'Limpiar',
    filter: 'Filtro',
    welcome_tip: 'Pssst... Aquí puedes configurar<br/>la extensión Open Tweet Filter.'
  };

  DialogViewModel = (function() {

    function DialogViewModel() {
      var enabled, showReportView, showWelcomeTip, termsExclude, termsList, usersExclude, usersList;
      var _this = this;
      termsList = localStorage.filter_terms_list || '';
      termsExclude = (localStorage.filter_terms_exclude || '1') === '1';
      usersList = localStorage.filter_from_list || '';
      usersExclude = (localStorage.filter_from_exclude || '1') === '1';
      enabled = (localStorage.filter_enabled || '1') === '1';
      showReportView = true;
      showWelcomeTip = true;
      this.termsList = ko.observable(termsList, {
        persist: 'TwitterFilter.termsList'
      });
      this.termsExclude = ko.observable(termsExclude, {
        persist: 'TwitterFilter.termsExclude'
      });
      this.usersList = ko.observable(usersList, {
        persist: 'TwitterFilter.usersList'
      });
      this.usersExclude = ko.observable(usersExclude, {
        persist: 'TwitterFilter.usersExclude'
      });
      this.enabled = ko.observable(enabled, {
        persist: 'TwitterFilter.enabled'
      });
      this.showReportView = ko.observable(showReportView, {
        persist: 'TwitterFilter.showReportView'
      });
      this.showWelcomeTip = ko.observable(showWelcomeTip, {
        persist: 'TwitterFilter.showWelcomeTip'
      });
      this.visible = ko.observable(false);
      this.buttonStatusHtml = ko.computed(function() {
        if (_this.enabled()) {
          return '&#9745;';
        } else {
          return '&#9744;';
        }
      });
      this.toggleText = ko.computed(function() {
        if (_this.enabled()) {
          return messages.get('disable');
        } else {
          return messages.get('enable');
        }
      });
      this.termsExcludeText = ko.computed(function() {
        if (_this.termsExclude()) {
          return messages.get('excluding');
        } else {
          return messages.get('including');
        }
      });
      this.usersExcludeText = ko.computed(function() {
        if (_this.usersExclude()) {
          return messages.get('excluding');
        } else {
          return messages.get('including');
        }
      });
    }

    DialogViewModel.prototype.clear = function() {
      this.termsList('');
      this.termsExclude(true);
      this.usersList('');
      this.usersExclude(true);
      return this.enabled(true);
    };

    DialogViewModel.prototype.toggle = function(attr) {
      return this[attr](!this[attr]());
    };

    DialogViewModel.prototype.toggleEnabled = function() {
      return this.toggle('enabled');
    };

    DialogViewModel.prototype.toggleVisible = function() {
      return this.toggle('visible');
    };

    DialogViewModel.prototype.toggleTermsExclude = function() {
      return this.toggle('termsExclude');
    };

    DialogViewModel.prototype.toggleUsersExclude = function() {
      return this.toggle('usersExclude');
    };

    DialogViewModel.prototype.toggleShowReportView = function() {
      return this.toggle('showReportView');
    };

    return DialogViewModel;

  })();

  ReportViewModel = (function() {

    function ReportViewModel(dialogViewModel) {
      var _this = this;
      this.applied = ko.observable(false);
      this.hasTerms = ko.observable(false);
      this.hasUsers = ko.observable(false);
      this.hiddenCount = ko.observable(false);
      this.hiddenUsers = ko.observable(false);
      this.visible = ko.computed(function() {
        return dialogViewModel.showReportView() && _this.applied() && (_this.hasTerms() || _this.hasUsers());
      });
      this.hasHiddenTweets = ko.computed(function() {
        return _this.hiddenCount() !== 0;
      });
      this.filteringByEndMessage = ko.computed(function() {
        if (_this.hiddenCount() === 1) {
          return messages.get('filtering_by_end_singular');
        } else {
          return messages.get('filtering_by_end');
        }
      });
      this.filtersMessage = ko.computed(function() {
        var filters;
        filters = [];
        if (_this.hasTerms()) filters.push(messages.get('terms'));
        if (_this.hasUsers()) filters.push(messages.get('people'));
        return filters.join(' ' + messages.get('and') + ' ');
      });
      this.usersPhotos = ko.computed(function() {
        var src, title, _ref, _results;
        _ref = _this.hiddenUsers();
        _results = [];
        for (title in _ref) {
          src = _ref[title];
          if (src) {
            _results.push({
              title: title,
              src: src
            });
          }
        }
        return _results;
      });
      this.usersNames = ko.computed(function() {
        var src, title, _ref, _results;
        _ref = _this.hiddenUsers();
        _results = [];
        for (title in _ref) {
          src = _ref[title];
          if (!src) _results.push(title);
        }
        return _results;
      });
    }

    return ReportViewModel;

  })();

  DialogPhoenixView = (function() {

    function DialogPhoenixView() {}

    DialogPhoenixView.prototype.render = function(viewModel) {
      this.renderButton(viewModel);
      this.renderDialog(viewModel);
      return this.showWelcomeTip(viewModel);
    };

    DialogPhoenixView.prototype.renderButton = function(viewModel) {
      var buttonTemplate;
      buttonTemplate = function() {
        return ul(function() {
          return li('#filter-button', {
            'data-bind': 'css: { active: visible() }'
          }, function() {
            return a({
              'data-bind': 'click: toggleVisible'
            }, function() {
              return messages.get('filter');
            });
          });
        });
      };
      $('#global-nav').append(CoffeeKup.render(buttonTemplate));
      return ko.applyBindings(viewModel, $('#filter-button')[0]);
    };

    DialogPhoenixView.prototype.dialogTemplate = function() {
      return div('#filter-dialog-container.twttr-dialog-container.draggable', function() {
        return div('#filter-dialog.twttr-dialog', function() {
          div('.twttr-dialog-header', function() {
            h3(function() {
              return messages.get('filter_dialog_title');
            });
            return div('.twttr-dialog-close', {
              'data-bind': 'click: toggleVisible'
            }, function() {
              return b(function() {
                return '\u0026times;';
              });
            });
          });
          return div('.twttr-dialog-inside', function() {
            div('.twttr-dialog-body', function() {
              return div('.twttr-dialog-content', function() {
                return fieldset(function() {
                  a('.btn.filter-list-label', {
                    'data-bind': 'text: termsExcludeText, click: toggleTermsExclude'
                  });
                  div('.filter-list-label', function() {
                    return '&nbsp;' + messages.get('tweets_terms') + ':';
                  });
                  input('.filter-terms-list', {
                    'type': 'text',
                    'data-bind': "value: termsList, valueUpdate: ['change', 'afterkeydown']"
                  });
                  div(function() {
                    return '&nbsp;';
                  });
                  a('.btn.filter-list-label', {
                    'data-bind': 'text: usersExcludeText, click: toggleUsersExclude'
                  });
                  div('.filter-list-label', function() {
                    return '&nbsp;' + messages.get('tweets_users') + ':';
                  });
                  input('.filter-users-list', {
                    'type': 'text',
                    'data-bind': "value: usersList, valueUpdate: ['change', 'afterkeydown']"
                  });
                  return label('.checkbox', function() {
                    input({
                      'type': 'checkbox',
                      'data-bind': "checked: showReportView"
                    });
                    return span({
                      'data-bind': 'click: toggleShowReportView'
                    }, function() {
                      return messages.get('show_report_view');
                    });
                  });
                });
              });
            });
            return div('.twttr-dialog-footer', function() {
              div('.filter-dialog-footer-right', function() {
                return a('.btn', {
                  'data-bind': 'text: toggleText, click: toggleEnabled'
                });
              });
              return div('.filter-dialog-footer-left', function() {
                return a('.btn', {
                  'data-bind': 'click: clear'
                }, function() {
                  return messages.get('clear');
                });
              });
            });
          });
        });
      });
    };

    DialogPhoenixView.prototype.renderDialog = function(viewModel) {
      var dialogHtml;
      var _this = this;
      dialogHtml = CoffeeKup.render(this.dialogTemplate);
      return viewModel.visible.subscribe(function(visible) {
        return _this.toggleVisible(visible, dialogHtml, viewModel, {
          appendTo: 'body',
          center: true
        });
      });
    };

    DialogPhoenixView.prototype.toggleVisible = (function() {
      var container, overlay;
      container = null;
      overlay = $('<div class="twttr-dialog-overlay"></div>').appendTo($('body'));
      return function(visible, dialogHtml, viewModel, options) {
        var dialog;
        if (visible) {
          $('body').addClass('modal-enabled');
          overlay.show();
          container = $(dialogHtml).appendTo($(options.appendTo));
          if (options.center) {
            dialog = $('#filter-dialog');
            dialog.css('position', 'absolute').css('top', (($(window).height() - dialog.outerHeight()) / 2) + 'px').css('left', (($(window).width() - dialog.outerWidth()) / 2) + 'px');
          }
          container.draggable();
          container.on('keydown keypress', function(event) {
            return event.stopPropagation();
          });
          container.find('.filter-terms-list').tipsy({
            gravity: 'w',
            trigger: 'focus',
            html: true,
            fallback: messages.get('filter_terms_list_title')
          });
          container.find('.filter-users-list').tipsy({
            gravity: 'w',
            trigger: 'focus',
            html: true,
            fallback: messages.get('filter_users_list_title')
          });
          return ko.applyBindings(viewModel, container[0]);
        } else {
          container.find('.filter-terms-list').tipsy('hide');
          container.find('.filter-users-list').tipsy('hide');
          ko.cleanNode(container[0]);
          container.remove();
          overlay.hide();
          return $('body').removeClass('modal-enabled');
        }
      };
    })();

    DialogPhoenixView.prototype.showWelcomeTip = function(viewModel) {
      var _this = this;
      if (viewModel.showWelcomeTip()) {
        return setTimeout(function() {
          $('#filter-button').tipsy({
            gravity: 'n',
            trigger: 'manual',
            html: true,
            fallback: messages.get('welcome_tip')
          }).tipsy('show').click(function() {
            return $(this).tipsy('hide');
          });
          setTimeout(function() {
            return $('#filter-button').tipsy('hide');
          }, 30000);
          return viewModel.showWelcomeTip(false);
        }, 3000);
      }
    };

    return DialogPhoenixView;

  })();

  DialogPhoenixT1View = (function() {

    __extends(DialogPhoenixT1View, DialogPhoenixView);

    function DialogPhoenixT1View() {
      DialogPhoenixT1View.__super__.constructor.apply(this, arguments);
    }

    DialogPhoenixT1View.prototype.renderButton = function(viewModel) {
      var buttonTemplate;
      buttonTemplate = function() {
        return div('#filter-button.nav.filter', function() {
          return li({
            'data-bind': 'css: { active: visible() }'
          }, function() {
            return a('.js-hover', {
              'data-bind': 'click: toggleVisible'
            }, function() {
              span('.new-wrapper', function() {});
              span('#filter-button-status', {
                'data-bind': 'html: buttonStatusHtml'
              }, function() {});
              return span('#filter-button-title', function() {
                return text(messages.get('filter'), function() {});
              });
            });
          });
        });
      };
      $('#global-actions').after(CoffeeKup.render(buttonTemplate));
      return ko.applyBindings(viewModel, $('#filter-button')[0]);
    };

    DialogPhoenixT1View.prototype.renderDialog = function(viewModel) {
      var dialogHtml;
      var _this = this;
      dialogHtml = CoffeeKup.render(this.dialogTemplate);
      return viewModel.visible.subscribe(function(visible) {
        return _this.toggleVisible(visible, dialogHtml, viewModel, {
          appendTo: '.twttr-dialog-wrapper',
          center: false
        });
      });
    };

    return DialogPhoenixT1View;

  })();

  ReportPhoenixView = (function() {

    function ReportPhoenixView() {}

    ReportPhoenixView.prototype.template = function() {
      return div('.filter-report-component.component', {
        'data-bind': 'visible: visible'
      }, function() {
        div(function() {
          h2(headerTemplate);
          return div(bodyTemplate);
        });
        return hr('.component-spacer');
      });
    };

    ReportPhoenixView.prototype.headerTemplate = function() {
      text(messages.get('filtering_by_start'));
      text(' ');
      span('.user-stat-link', {
        'data-bind': 'text: hiddenCount'
      });
      text(' ');
      span({
        'data-bind': 'text: filteringByEndMessage'
      });
      text(' ');
      return span({
        'data-bind': 'text: filtersMessage'
      });
    };

    ReportPhoenixView.prototype.bodyTemplate = function() {
      span({
        'data-bind': 'if: hasHiddenTweets'
      }, function() {
        span(function() {
          return messages.get('users_with_hidden_tweets') + ':';
        });
        return br(function() {});
      });
      span({
        'data-bind': 'foreach: usersPhotos'
      }, function() {
        return img({
          'data-bind': 'attr: {src: $data.src, title: $data.title}',
          style: 'margin-right:5px;',
          width: 24,
          height: 24
        });
      });
      return span({
        'data-bind': 'foreach: usersNames'
      }, function() {
        return div({
          'data-bind': 'text: $data + "&nbsp;&nbsp"'
        });
      });
    };

    ReportPhoenixView.prototype.render = function(viewModel) {
      var html;
      $('.filter-report-component').each(function() {
        return ko.cleanNode(this);
      }).remove();
      html = CoffeeKup.render(this.template, {
        hardcode: {
          headerTemplate: this.headerTemplate,
          bodyTemplate: this.bodyTemplate
        }
      });
      $('.dashboard').find('.component:not(:empty):eq(0)').after(html);
      return ko.applyBindings(viewModel, $('.filter-report-component')[0]);
    };

    return ReportPhoenixView;

  })();

  ReportPhoenixT1View = (function() {

    __extends(ReportPhoenixT1View, ReportPhoenixView);

    function ReportPhoenixT1View() {
      ReportPhoenixT1View.__super__.constructor.apply(this, arguments);
    }

    ReportPhoenixT1View.prototype.template = function() {
      return div('.filter-report-component.component', {
        'data-bind': 'visible: visible'
      }, function() {
        return div('.module', function() {
          return div('.flex-module', function() {
            div('.flex-module-header', function() {
              return h3(headerTemplate);
            });
            return div('.flex-module-inner', function() {
              return div(bodyTemplate);
            });
          });
        });
      });
    };

    return ReportPhoenixT1View;

  })();

  Provider = (function() {

    function Provider() {}

    Provider.prototype.inMyProfilePage = function() {
      return this.screenUser() === this.sessionUser();
    };

    Provider.prototype.normalizeUser = function(x) {
      if (x != null) {
        return x.replace('@', '').trim();
      } else {
        return '';
      }
    };

    Provider.getActive = function() {
      var p, providers, _i, _len, _ref;
      providers = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = providers.map(function(x) {
        return new x;
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        if (p.isActive()) return p;
      }
    };

    return Provider;

  })();

  PhoenixProvider = (function() {

    __extends(PhoenixProvider, Provider);

    function PhoenixProvider() {
      PhoenixProvider.__super__.constructor.apply(this, arguments);
    }

    PhoenixProvider.prototype.isActive = function() {
      return !$('body').hasClass('t1');
    };

    PhoenixProvider.prototype.sessionUser = function() {
      return this.normalizeUser($('#screen-name').html());
    };

    PhoenixProvider.prototype.screenUser = function() {
      return this.normalizeUser($('.screen-name.pill').html());
    };

    PhoenixProvider.prototype.tweets = function() {
      return $('div.stream-item[data-item-type="tweet"], div.stream-item.js-activity-favorite, div.stream-item.js-activity-retweet');
    };

    PhoenixProvider.prototype.tweetText = function(el) {
      return $(el).find('.js-tweet-text, .tweet-text,.entry-content, .twtr-tweet-text').text();
    };

    PhoenixProvider.prototype.tweetAuthor = function(el) {
      return $(el).find('.tweet-screen-name').text();
    };

    PhoenixProvider.prototype.tweetAuthorPhoto = function(el) {
      return $(el).find('img.user-profile-link').attr('src');
    };

    PhoenixProvider.prototype.tweetRetweeter = function(el) {
      return this.normalizeUser($(el).find('.user').text());
    };

    PhoenixProvider.prototype.onNewTweets = function(callback) {
      var _this = this;
      return $(document).on('DOMNodeInserted', '.stream .stream-items', function() {
        var tweetsCount;
        tweetsCount = _this.tweets().size();
        if (_this.tweetsCount !== tweetsCount) {
          _this.tweetsCount = tweetsCount;
          return callback();
        }
      });
    };

    return PhoenixProvider;

  })();

  PhoenixT1Provider = (function() {

    __extends(PhoenixT1Provider, PhoenixProvider);

    function PhoenixT1Provider() {
      PhoenixT1Provider.__super__.constructor.apply(this, arguments);
    }

    PhoenixT1Provider.prototype.isActive = function() {
      return $('body').hasClass('t1');
    };

    PhoenixT1Provider.prototype.sessionUser = function() {
      return this.normalizeUser($('.account-group.js-mini-current-user').data('screen-name'));
    };

    PhoenixT1Provider.prototype.screenUser = function() {
      return this.normalizeUser($('.screen-name').text());
    };

    PhoenixT1Provider.prototype.tweetAuthor = function(el) {
      return this.normalizeUser($(el).find('.username').text());
    };

    PhoenixT1Provider.prototype.tweetAuthorPhoto = function(el) {
      return $(el).find('img.avatar').attr('src');
    };

    PhoenixT1Provider.prototype.tweetRetweeter = function(el) {
      var href;
      href = $(el).find('.pretty-link.js-user-profile-link').attr('href');
      if (href) {
        return href.replace('/#!/', '');
      } else {
        return '';
      }
    };

    return PhoenixT1Provider;

  })();

  FilterPhoenixProvider = (function() {

    __extends(FilterPhoenixProvider, PhoenixProvider);

    function FilterPhoenixProvider() {
      FilterPhoenixProvider.__super__.constructor.apply(this, arguments);
    }

    FilterPhoenixProvider.prototype.dialogView = new DialogPhoenixView;

    FilterPhoenixProvider.prototype.reportView = new ReportPhoenixView;

    FilterPhoenixProvider.prototype.filterCurrentPage = function() {
      var isIgnorablePage, _ref;
      isIgnorablePage = (_ref = location.hash, __indexOf.call(this.ignorablePages, _ref) >= 0);
      return !(this.inMyProfilePage() || isIgnorablePage);
    };

    FilterPhoenixProvider.prototype.ignorablePages = ['#!/retweets', '#!/retweeted_of_mine', '#!/messages'];

    return FilterPhoenixProvider;

  })();

  FilterPhoenixT1Provider = (function() {

    __extends(FilterPhoenixT1Provider, PhoenixT1Provider);

    function FilterPhoenixT1Provider() {
      FilterPhoenixT1Provider.__super__.constructor.apply(this, arguments);
    }

    FilterPhoenixT1Provider.prototype.dialogView = new DialogPhoenixT1View;

    FilterPhoenixT1Provider.prototype.reportView = new ReportPhoenixT1View;

    FilterPhoenixT1Provider.prototype.filterCurrentPage = function() {
      var isIgnorablePage, _ref;
      isIgnorablePage = (_ref = location.hash, __indexOf.call(this.ignorablePages, _ref) >= 0);
      return !(this.inMyProfilePage() || isIgnorablePage);
    };

    FilterPhoenixT1Provider.prototype.ignorablePages = ['#!/i/connect', '#!/i/discover', '#!/who_to_follow/suggestions', '#!/who_to_follow/import', '#!/who_to_follow/interests'];

    return FilterPhoenixT1Provider;

  })();

  Extension = (function() {

    Extension.prototype.provider = Provider.getActive(FilterPhoenixProvider, FilterPhoenixT1Provider);

    function Extension() {
      var _this = this;
      this.dialogViewModel = new DialogViewModel;
      this.reportViewModel = new ReportViewModel(this.dialogViewModel);
      this.provider.dialogView.render(this.dialogViewModel);
      $(window).on('hashchange', function() {
        return setTimeout((function() {
          return _this.applyFilter();
        }), 500);
      });
      this.provider.onNewTweets(function() {
        return _this.applyFilter();
      });
      this.dialogViewModel.termsList.subscribe(function() {
        return _this.applyFilter();
      });
      this.dialogViewModel.termsExclude.subscribe(function() {
        return _this.applyFilter();
      });
      this.dialogViewModel.usersList.subscribe(function() {
        return _this.applyFilter();
      });
      this.dialogViewModel.usersExclude.subscribe(function() {
        return _this.applyFilter();
      });
      this.dialogViewModel.enabled.subscribe(function() {
        return _this.applyFilter();
      });
      this.applyFilter();
    }

    Extension.prototype.applyFilter = function() {
      var _this = this;
      return this.throttle(10, function() {
        var apply, hiddenCount, hiddenUsers, termsPattern, usersPattern;
        apply = _this.dialogViewModel.enabled() && _this.provider.filterCurrentPage();
        if (apply) {
          termsPattern = _this.filterPattern(_this.dialogViewModel.termsList(), false);
          usersPattern = _this.filterPattern(_this.dialogViewModel.usersList(), true);
        }
        hiddenCount = 0;
        hiddenUsers = {};
        _this.provider.tweets().each(function(i, el) {
          var foundTermsMatches, foundUserMatches, termsMatch, termsRegExp, tweetAuthor, usersMatch, usersRegExp;
          termsMatch = false;
          usersMatch = false;
          if (apply) {
            tweetAuthor = _this.provider.tweetAuthor(el);
            termsRegExp = _this.filterRegExp(termsPattern);
            if (termsRegExp != null) {
              foundTermsMatches = termsRegExp.test(_this.provider.tweetText(el));
              termsMatch = _this.dialogViewModel.termsExclude() === foundTermsMatches;
            }
            usersRegExp = _this.filterRegExp(usersPattern);
            if (usersRegExp != null) {
              foundUserMatches = usersRegExp.test(tweetAuthor) || usersRegExp.test(_this.provider.tweetRetweeter(el));
              usersMatch = _this.dialogViewModel.usersExclude() === foundUserMatches;
            }
          }
          if (termsMatch || usersMatch) {
            $(el).hide();
            hiddenCount++;
            if (!(tweetAuthor in hiddenUsers)) {
              return hiddenUsers[tweetAuthor] = _this.provider.tweetAuthorPhoto(el);
            }
          } else {
            return $(el).show();
          }
        });
        _this.reportViewModel.applied(apply).hasTerms(termsPattern != null).hasUsers(usersPattern != null).hiddenCount(hiddenCount).hiddenUsers(hiddenUsers);
        return _this.throttle(1000, function() {
          return _this.provider.reportView.render(_this.reportViewModel);
        });
      });
    };

    Extension.prototype.throttle = (function() {
      var timeout;
      timeout = {};
      return function(delay, fn) {
        var key;
        key = fn.toString();
        clearTimeout(timeout[key]);
        return timeout[key] = setTimeout(fn, delay);
      };
    })();

    Extension.prototype.filterPattern = function(csv, whole) {
      var values;
      values = csv.split(',');
      values = $.map(values, function(v, i) {
        v = $.trim(v);
        if (v.length > 2 && v[0] === '/' && v[v.length - 1] === '/') {
          return v.substr(1, v.length - 2);
        } else {
          return v.replace(/([\.\(\)\[\]\{\}\+\*\?\\])/g, '\\$1');
        }
      });
      values = $.grep(values, function(v, i) {
        return v !== '';
      });
      if (values.length === 0) return null;
      values = '(' + values.join('|') + ')';
      if (whole) {
        return "^" + values + "$";
      } else {
        return values;
      }
    };

    Extension.prototype.filterRegExp = function(pattern) {
      if (pattern == null) return null;
      try {
        return new RegExp(pattern, 'gi');
      } catch (e) {
        return null;
      }
    };

    return Extension;

  })();

  new Extension();

}).call(this);
