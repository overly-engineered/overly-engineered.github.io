"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('blog/adapters/application', ['exports', 'ember', 'emberfire/adapters/firebase'], function (exports, _ember, _emberfireAdaptersFirebase) {
  var inject = _ember['default'].inject;
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({
    firebase: inject.service()
  });
});
define('blog/app', ['exports', 'ember', 'blog/resolver', 'ember-load-initializers', 'blog/config/environment'], function (exports, _ember, _blogResolver, _emberLoadInitializers, _blogConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _blogConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _blogConfigEnvironment['default'].podModulePrefix,
    Resolver: _blogResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _blogConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('blog/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'blog/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _blogConfigEnvironment) {

  var name = _blogConfigEnvironment['default'].APP.name;
  var version = _blogConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('blog/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('blog/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('blog/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'blog/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _blogConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_blogConfigEnvironment['default'].APP.name, _blogConfigEnvironment['default'].APP.version)
  };
});
define('blog/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('blog/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('blog/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('blog/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('blog/initializers/export-application-global', ['exports', 'ember', 'blog/config/environment'], function (exports, _ember, _blogConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_blogConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _blogConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_blogConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('blog/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('blog/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('blog/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("blog/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('blog/models/posts', ['exports', 'ember-data/model', 'ember-data/attr'], function (exports, _emberDataModel, _emberDataAttr) {
  exports['default'] = _emberDataModel['default'].extend({
    blogHeading: (0, _emberDataAttr['default'])('string'),
    blogText: (0, _emberDataAttr['default'])('string'),
    blogDate: (0, _emberDataAttr['default'])('string')
  });
});
define('blog/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('blog/router', ['exports', 'ember', 'blog/config/environment'], function (exports, _ember, _blogConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _blogConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('posts');
  });

  exports['default'] = Router;
});
define('blog/routes/posts', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('posts');
    }
  });
});
define('blog/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('blog/services/firebase', ['exports', 'emberfire/services/firebase', 'blog/config/environment'], function (exports, _emberfireServicesFirebase, _blogConfigEnvironment) {

  _emberfireServicesFirebase['default'].config = _blogConfigEnvironment['default'];

  exports['default'] = _emberfireServicesFirebase['default'];
});
define("blog/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "blog/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("blog/templates/posts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.5",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 7,
              "column": 0
            }
          },
          "moduleName": "blog/templates/posts.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
          return morphs;
        },
        statements: [["content", "post.blogHeading", ["loc", [null, [3, 7], [3, 27]]]], ["content", "post.blogText", ["loc", [null, [4, 7], [4, 24]]]], ["content", "post.blogDate", ["loc", [null, [5, 7], [5, 24]]]]],
        locals: ["post"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.4.5",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "blog/templates/posts.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [1, 8], [1, 13]]]]], [], 0, null, ["loc", [null, [1, 0], [7, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define('blog/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('blog/config/environment', ['ember'], function(Ember) {
  var prefix = 'blog';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("blog/app")["default"].create({"name":"blog","version":"0.0.0+e67f159a"});
}

/* jshint ignore:end */
//# sourceMappingURL=blog.map