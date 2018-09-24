// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//exports this to index.js
exports.default = {
    // this is the search funtion in which lies the fetch funtion. This reutrns fetch contents
    search: function search(searchterm, searchlimit, sortby) {
        // all the inputs we got from index.js

        // fetch reddit api(?q= means query=)
        return fetch("http://www.reddit.com/search.json?q=' " + searchterm + "&sort=" + sortby + "&limit=" + searchlimit)
        //results from search in json
        .then(function (res) {
            return res.json();
        })
        //data from res.json()    
        .then(function (data) {
            return data.data.children.map(function (data) {
                return data.data;
            });
        })
        //catch error
        .catch(function (err) {
            return console.log(err);
        });
    }
};
},{}],4:[function(require,module,exports) {
'use strict';

var _redditapi = require('./redditapi');

var _redditapi2 = _interopRequireDefault(_redditapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchform = document.getElementById('searchform'); //import reddit.js file

var searchinput = document.getElementById('searchinput');

// listen for form submission of search button clicked
searchform.addEventListener('submit', function (e) {
    e.preventDefault();

    //get seach term
    var searchterm = searchinput.value;

    //get any input with name sortby and is checked.then get value
    var sortby = document.querySelector('input[name="sortby"]:checked').value;

    //get limit
    var serachlimit = document.getElementById('limit').value;

    //check input not empty
    if (searchterm === '') {
        //show message functio if empty
        showmessage('Please add a  search term', 'alert-danger');
    }

    //clear input box
    searchinput.value = '';

    //Search Reddit. using search funtion in it and giving it these 3 values /////
    _redditapi2.default.search(searchterm, serachlimit, sortby)
    // because this^^ returns a promise
    .then(function (results) {
        console.log(results);
        //output div tag
        var output = '<div class="card-columns">';
        //loop through results
        results.forEach(function (post) {
            //check for images becausesome dont have preview
            // if image preview array exist use it otherwise use reddit logo/ url
            var image = post.preview ? post.preview.images[0].source.url : 'http://www.info24android.com/wp-content/uploads/2017/10/Les-meilleurs-clients-Reddit-pour-iPhone-et-iPad.jpg';

            output += '\n<div class="card">\n<img class="card-img-top" src="' + image + '" alt="Card image cap">\n<div class="card-body">\n<h5 class="card-title">' + post.title + '</h5>\n<p class="card-text">' + shorttext(post.selftext, 100) + '</p>\n<a href="' + post.url + '" target="_blank" class="btn btn-primary">Read More...</a>\n<hr>\n<span class="badge badge-secondary">Subreddit: ' + post.subreddit + '</span>\n<br>\n<span class="badge badge-dark">Score: ' + post.score + '</span>\n</div>\n</div>';
        });

        // target="_blank" to open new tab
        //hr tag is a line break

        //ending div tag
        output += '</div>';

        //output to results div
        document.getElementById('results').innerHTML = output;
    });
});

//show message if input empty
function showmessage(message, className) {
    //create div
    var div = document.createElement('div');
    //Add classes
    div.className = 'alert ' + className;
    //Add text
    div.appendChild(document.createTextNode(message));
    //get parent container (searchcon)
    var searchcontainer = document.getElementById('searchcon');
    // get search
    var search = document.getElementById('search');

    //insert message before search div
    searchcontainer.insertBefore(div, search);

    //timeout alert
    setTimeout(function () {
        return document.querySelector('.alert').remove();
    }, 3000);
}

//shorten text AKA truncate
function shorttext(text, limit) {
    // so it cuts of text  afte a space not in the middle of a word
    var short = text.indexOf(' ', limit);
    if (short == -1) return text;

    return text.substring(0, short);
}
},{"./redditapi":13}],17:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63222' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[17,4])
//# sourceMappingURL=/dist/reddit.map