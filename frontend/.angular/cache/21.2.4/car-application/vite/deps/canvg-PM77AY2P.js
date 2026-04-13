import {
  __commonJS,
  __toESM
} from "./chunk-KWSTWQNB.js";

// node_modules/core-js/internals/global-this.js
var require_global_this = __commonJS({
  "node_modules/core-js/internals/global-this.js"(exports, module) {
    "use strict";
    var check = function(it) {
      return it && it.Math === Math && it;
    };
    module.exports = // eslint-disable-next-line es/no-global-this -- safe
    check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
    check(typeof self == "object" && self) || check(typeof global == "object" && global) || check(typeof exports == "object" && exports) || // eslint-disable-next-line no-new-func -- fallback
    /* @__PURE__ */ (function() {
      return this;
    })() || Function("return this")();
  }
});

// node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "node_modules/core-js/internals/fails.js"(exports, module) {
    "use strict";
    module.exports = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
  }
});

// node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "node_modules/core-js/internals/descriptors.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = !fails11(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] !== 7;
    });
  }
});

// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "node_modules/core-js/internals/function-bind-native.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = !fails11(function() {
      var test2 = function() {
      }.bind();
      return typeof test2 != "function" || test2.hasOwnProperty("prototype");
    });
  }
});

// node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "node_modules/core-js/internals/function-call.js"(exports, module) {
    "use strict";
    var NATIVE_BIND = require_function_bind_native();
    var call5 = Function.prototype.call;
    module.exports = NATIVE_BIND ? call5.bind(call5) : function() {
      return call5.apply(call5, arguments);
    };
  }
});

// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
    "use strict";
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor5 = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor5 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
    exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor5(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
  }
});

// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
    "use strict";
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this.js"(exports, module) {
    "use strict";
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype2 = Function.prototype;
    var call5 = FunctionPrototype2.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype2.bind.bind(call5, call5);
    module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
      return function() {
        return call5.apply(fn, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "node_modules/core-js/internals/classof-raw.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var toString9 = uncurryThis12({}.toString);
    var stringSlice5 = uncurryThis12("".slice);
    module.exports = function(it) {
      return stringSlice5(toString9(it), 8, -1);
    };
  }
});

// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "node_modules/core-js/internals/indexed-object.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var fails11 = require_fails();
    var classof = require_classof_raw();
    var $Object = Object;
    var split = uncurryThis12("".split);
    module.exports = fails11(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) === "String" ? split(it, "") : $Object(it);
    } : $Object;
  }
});

// node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
  "node_modules/core-js/internals/is-null-or-undefined.js"(exports, module) {
    "use strict";
    module.exports = function(it) {
      return it === null || it === void 0;
    };
  }
});

// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
    "use strict";
    var isNullOrUndefined = require_is_null_or_undefined();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
    "use strict";
    var IndexedObject2 = require_indexed_object();
    var requireObjectCoercible6 = require_require_object_coercible();
    module.exports = function(it) {
      return IndexedObject2(requireObjectCoercible6(it));
    };
  }
});

// node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "node_modules/core-js/internals/is-callable.js"(exports, module) {
    "use strict";
    var documentAll = typeof document == "object" && document.all;
    module.exports = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
  }
});

// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/internals/is-object.js"(exports, module) {
    "use strict";
    var isCallable3 = require_is_callable();
    module.exports = function(it) {
      return typeof it == "object" ? it !== null : isCallable3(it);
    };
  }
});

// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "node_modules/core-js/internals/get-built-in.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var isCallable3 = require_is_callable();
    var aFunction = function(argument) {
      return isCallable3(argument) ? argument : void 0;
    };
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(globalThis6[namespace]) : globalThis6[namespace] && globalThis6[namespace][method];
    };
  }
});

// node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-is-prototype-of.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    module.exports = uncurryThis12({}.isPrototypeOf);
  }
});

// node_modules/core-js/internals/environment-user-agent.js
var require_environment_user_agent = __commonJS({
  "node_modules/core-js/internals/environment-user-agent.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var navigator = globalThis6.navigator;
    var userAgent = navigator && navigator.userAgent;
    module.exports = userAgent ? String(userAgent) : "";
  }
});

// node_modules/core-js/internals/environment-v8-version.js
var require_environment_v8_version = __commonJS({
  "node_modules/core-js/internals/environment-v8-version.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var userAgent = require_environment_user_agent();
    var process2 = globalThis6.process;
    var Deno2 = globalThis6.Deno;
    var versions = process2 && process2.versions || Deno2 && Deno2.version;
    var v8 = versions && versions.v8;
    var match;
    var version;
    if (v8) {
      match = v8.split(".");
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
      }
    }
    module.exports = version;
  }
});

// node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
    "use strict";
    var V8_VERSION2 = require_environment_v8_version();
    var fails11 = require_fails();
    var globalThis6 = require_global_this();
    var $String = globalThis6.String;
    module.exports = !!Object.getOwnPropertySymbols && !fails11(function() {
      var symbol = /* @__PURE__ */ Symbol("symbol detection");
      return !$String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION2 && V8_VERSION2 < 41;
    });
  }
});

// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
    "use strict";
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "node_modules/core-js/internals/is-symbol.js"(exports, module) {
    "use strict";
    var getBuiltIn2 = require_get_built_in();
    var isCallable3 = require_is_callable();
    var isPrototypeOf3 = require_object_is_prototype_of();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var $Object = Object;
    module.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn2("Symbol");
      return isCallable3($Symbol) && isPrototypeOf3($Symbol.prototype, $Object(it));
    };
  }
});

// node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "node_modules/core-js/internals/try-to-string.js"(exports, module) {
    "use strict";
    var $String = String;
    module.exports = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
  }
});

// node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "node_modules/core-js/internals/a-callable.js"(exports, module) {
    "use strict";
    var isCallable3 = require_is_callable();
    var tryToString = require_try_to_string();
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isCallable3(argument)) return argument;
      throw new $TypeError(tryToString(argument) + " is not a function");
    };
  }
});

// node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "node_modules/core-js/internals/get-method.js"(exports, module) {
    "use strict";
    var aCallable2 = require_a_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable2(func);
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var isCallable3 = require_is_callable();
    var isObject7 = require_is_object();
    var $TypeError = TypeError;
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable3(fn = input.toString) && !isObject7(val = call5(fn, input))) return val;
      if (isCallable3(fn = input.valueOf) && !isObject7(val = call5(fn, input))) return val;
      if (pref !== "string" && isCallable3(fn = input.toString) && !isObject7(val = call5(fn, input))) return val;
      throw new $TypeError("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "node_modules/core-js/internals/is-pure.js"(exports, module) {
    "use strict";
    module.exports = false;
  }
});

// node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
  "node_modules/core-js/internals/define-global-property.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var defineProperty2 = Object.defineProperty;
    module.exports = function(key, value) {
      try {
        defineProperty2(globalThis6, key, { value, configurable: true, writable: true });
      } catch (error) {
        globalThis6[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js"(exports, module) {
    "use strict";
    var IS_PURE3 = require_is_pure();
    var globalThis6 = require_global_this();
    var defineGlobalProperty = require_define_global_property();
    var SHARED = "__core-js_shared__";
    var store = module.exports = globalThis6[SHARED] || defineGlobalProperty(SHARED, {});
    (store.versions || (store.versions = [])).push({
      version: "3.49.0",
      mode: IS_PURE3 ? "pure" : "global",
      copyright: "© 2013–2025 Denis Pushkarev (zloirock.ru), 2025–2026 CoreJS Company (core-js.io). All rights reserved.",
      license: "https://github.com/zloirock/core-js/blob/v3.49.0/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "node_modules/core-js/internals/shared.js"(exports, module) {
    "use strict";
    var store = require_shared_store();
    module.exports = function(key, value) {
      return store[key] || (store[key] = value || {});
    };
  }
});

// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/internals/to-object.js"(exports, module) {
    "use strict";
    var requireObjectCoercible6 = require_require_object_coercible();
    var $Object = Object;
    module.exports = function(argument) {
      return $Object(requireObjectCoercible6(argument));
    };
  }
});

// node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "node_modules/core-js/internals/has-own-property.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var toObject3 = require_to_object();
    var hasOwnProperty = uncurryThis12({}.hasOwnProperty);
    module.exports = Object.hasOwn || function hasOwn3(it, key) {
      return hasOwnProperty(toObject3(it), key);
    };
  }
});

// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "node_modules/core-js/internals/uid.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var id = 0;
    var postfix = Math.random();
    var toString9 = uncurryThis12(1.1.toString);
    module.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString9(++id + postfix, 36);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var shared = require_shared();
    var hasOwn3 = require_has_own_property();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var Symbol2 = globalThis6.Symbol;
    var WellKnownSymbolsStore = shared("wks");
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2["for"] || Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module.exports = function(name) {
      if (!hasOwn3(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn3(Symbol2, name) ? Symbol2[name] : createWellKnownSymbol("Symbol." + name);
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/internals/to-primitive.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var isObject7 = require_is_object();
    var isSymbol2 = require_is_symbol();
    var getMethod4 = require_get_method();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol5 = require_well_known_symbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol5("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject7(input) || isSymbol2(input)) return input;
      var exoticToPrim = getMethod4(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === void 0) pref = "default";
        result = call5(exoticToPrim, input, pref);
        if (!isObject7(result) || isSymbol2(result)) return result;
        throw new $TypeError("Can't convert object to primitive value");
      }
      if (pref === void 0) pref = "number";
      return ordinaryToPrimitive(input, pref);
    };
  }
});

// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "node_modules/core-js/internals/to-property-key.js"(exports, module) {
    "use strict";
    var toPrimitive3 = require_to_primitive();
    var isSymbol2 = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive3(argument, "string");
      return isSymbol2(key) ? key : key + "";
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var isObject7 = require_is_object();
    var document2 = globalThis6.document;
    var EXISTS = isObject7(document2) && isObject7(document2.createElement);
    module.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var fails11 = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS6 && !fails11(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a !== 7;
    });
  }
});

// node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var call5 = require_function_call();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var createPropertyDescriptor = require_create_property_descriptor();
    var toIndexedObject5 = require_to_indexed_object();
    var toPropertyKey3 = require_to_property_key();
    var hasOwn3 = require_has_own_property();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS6 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor5(O, P) {
      O = toIndexedObject5(O);
      P = toPropertyKey3(P);
      if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) {
      }
      if (hasOwn3(O, P)) return createPropertyDescriptor(!call5(propertyIsEnumerableModule.f, O, P), O[P]);
    };
  }
});

// node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "node_modules/core-js/internals/v8-prototype-define-bug.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var fails11 = require_fails();
    module.exports = DESCRIPTORS6 && fails11(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: false
      }).prototype !== 42;
    });
  }
});

// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/internals/an-object.js"(exports, module) {
    "use strict";
    var isObject7 = require_is_object();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isObject7(argument)) return argument;
      throw new $TypeError($String(argument) + " is not an object");
    };
  }
});

// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "node_modules/core-js/internals/object-define-property.js"(exports) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var anObject9 = require_an_object();
    var toPropertyKey3 = require_to_property_key();
    var $TypeError = TypeError;
    var $defineProperty = Object.defineProperty;
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = "enumerable";
    var CONFIGURABLE = "configurable";
    var WRITABLE = "writable";
    exports.f = DESCRIPTORS6 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty2(O, P, Attributes) {
      anObject9(O);
      P = toPropertyKey3(P);
      anObject9(Attributes);
      if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      }
      return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty2(O, P, Attributes) {
      anObject9(O);
      P = toPropertyKey3(P);
      anObject9(Attributes);
      if (IE8_DOM_DEFINE) try {
        return $defineProperty(O, P, Attributes);
      } catch (error) {
      }
      if ("get" in Attributes || "set" in Attributes) throw new $TypeError("Accessors not supported");
      if ("value" in Attributes) O[P] = Attributes.value;
      return O;
    };
  }
});

// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = DESCRIPTORS6 ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      object[key] = value;
      return object;
    };
  }
});

// node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "node_modules/core-js/internals/function-name.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var hasOwn3 = require_has_own_property();
    var FunctionPrototype2 = Function.prototype;
    var getDescriptor = DESCRIPTORS6 && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn3(FunctionPrototype2, "name");
    var PROPER = EXISTS && function something() {
    }.name === "something";
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS6 || DESCRIPTORS6 && getDescriptor(FunctionPrototype2, "name").configurable);
    module.exports = {
      EXISTS,
      PROPER,
      CONFIGURABLE
    };
  }
});

// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "node_modules/core-js/internals/inspect-source.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var isCallable3 = require_is_callable();
    var store = require_shared_store();
    var functionToString2 = uncurryThis12(Function.toString);
    if (!isCallable3(store.inspectSource)) {
      store.inspectSource = function(it) {
        return functionToString2(it);
      };
    }
    module.exports = store.inspectSource;
  }
});

// node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
  "node_modules/core-js/internals/weak-map-basic-detection.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var isCallable3 = require_is_callable();
    var WeakMap = globalThis6.WeakMap;
    module.exports = isCallable3(WeakMap) && /native code/.test(String(WeakMap));
  }
});

// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/internals/shared-key.js"(exports, module) {
    "use strict";
    var shared = require_shared();
    var uid = require_uid();
    var keys2 = shared("keys");
    module.exports = function(key) {
      return keys2[key] || (keys2[key] = uid(key));
    };
  }
});

// node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "node_modules/core-js/internals/hidden-keys.js"(exports, module) {
    "use strict";
    module.exports = {};
  }
});

// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "node_modules/core-js/internals/internal-state.js"(exports, module) {
    "use strict";
    var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
    var globalThis6 = require_global_this();
    var isObject7 = require_is_object();
    var createNonEnumerableProperty3 = require_create_non_enumerable_property();
    var hasOwn3 = require_has_own_property();
    var shared = require_shared_store();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var TypeError3 = globalThis6.TypeError;
    var WeakMap = globalThis6.WeakMap;
    var set;
    var get;
    var has;
    var enforce = function(it) {
      return has(it) ? get(it) : set(it, {});
    };
    var getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject7(it) || (state = get(it)).type !== TYPE) {
          throw new TypeError3("Incompatible receiver, " + TYPE + " required");
        }
        return state;
      };
    };
    if (NATIVE_WEAK_MAP || shared.state) {
      store = shared.state || (shared.state = new WeakMap());
      store.get = store.get;
      store.has = store.has;
      store.set = store.set;
      set = function(it, metadata) {
        if (store.has(it)) throw new TypeError3(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
      };
      get = function(it) {
        return store.get(it) || {};
      };
      has = function(it) {
        return store.has(it);
      };
    } else {
      STATE = sharedKey("state");
      hiddenKeys[STATE] = true;
      set = function(it, metadata) {
        if (hasOwn3(it, STATE)) throw new TypeError3(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty3(it, STATE, metadata);
        return metadata;
      };
      get = function(it) {
        return hasOwn3(it, STATE) ? it[STATE] : {};
      };
      has = function(it) {
        return hasOwn3(it, STATE);
      };
    }
    var store;
    var STATE;
    module.exports = {
      set,
      get,
      has,
      enforce,
      getterFor
    };
  }
});

// node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
  "node_modules/core-js/internals/make-built-in.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var fails11 = require_fails();
    var isCallable3 = require_is_callable();
    var hasOwn3 = require_has_own_property();
    var DESCRIPTORS6 = require_descriptors();
    var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
    var inspectSource = require_inspect_source();
    var InternalStateModule2 = require_internal_state();
    var enforceInternalState = InternalStateModule2.enforce;
    var getInternalState2 = InternalStateModule2.get;
    var $String = String;
    var defineProperty2 = Object.defineProperty;
    var stringSlice5 = uncurryThis12("".slice);
    var replace = uncurryThis12("".replace);
    var join2 = uncurryThis12([].join);
    var CONFIGURABLE_LENGTH = DESCRIPTORS6 && !fails11(function() {
      return defineProperty2(function() {
      }, "length", { value: 8 }).length !== 8;
    });
    var TEMPLATE = String(String).split("String");
    var makeBuiltIn = module.exports = function(value, name, options) {
      if (stringSlice5($String(name), 0, 7) === "Symbol(") {
        name = "[" + replace($String(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
      }
      if (options && options.getter) name = "get " + name;
      if (options && options.setter) name = "set " + name;
      if (!hasOwn3(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS6) defineProperty2(value, "name", { value: name, configurable: true });
        else value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn3(options, "arity") && value.length !== options.arity) {
        defineProperty2(value, "length", { value: options.arity });
      }
      try {
        if (options && hasOwn3(options, "constructor") && options.constructor) {
          if (DESCRIPTORS6) defineProperty2(value, "prototype", { writable: false });
        } else if (value.prototype) value.prototype = void 0;
      } catch (error) {
      }
      var state = enforceInternalState(value);
      if (!hasOwn3(state, "source")) {
        state.source = join2(TEMPLATE, typeof name == "string" ? name : "");
      }
      return value;
    };
    Function.prototype.toString = makeBuiltIn(function toString9() {
      return isCallable3(this) && getInternalState2(this).source || inspectSource(this);
    }, "toString");
  }
});

// node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
  "node_modules/core-js/internals/define-built-in.js"(exports, module) {
    "use strict";
    var isCallable3 = require_is_callable();
    var definePropertyModule = require_object_define_property();
    var makeBuiltIn = require_make_built_in();
    var defineGlobalProperty = require_define_global_property();
    module.exports = function(O, key, value, options) {
      if (!options) options = {};
      var simple = options.enumerable;
      var name = options.name !== void 0 ? options.name : key;
      if (isCallable3(value)) makeBuiltIn(value, name, options);
      if (options.global) {
        if (simple) O[key] = value;
        else defineGlobalProperty(key, value);
      } else {
        try {
          if (!options.unsafe) delete O[key];
          else if (O[key]) simple = true;
        } catch (error) {
        }
        if (simple) O[key] = value;
        else definePropertyModule.f(O, key, {
          value,
          enumerable: false,
          configurable: !options.nonConfigurable,
          writable: !options.nonWritable
        });
      }
      return O;
    };
  }
});

// node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
  "node_modules/core-js/internals/math-trunc.js"(exports, module) {
    "use strict";
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
  }
});

// node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "node_modules/core-js/internals/to-integer-or-infinity.js"(exports, module) {
    "use strict";
    var trunc = require_math_trunc();
    module.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
  }
});

// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
    "use strict";
    var toIntegerOrInfinity2 = require_to_integer_or_infinity();
    var max3 = Math.max;
    var min4 = Math.min;
    module.exports = function(index2, length) {
      var integer = toIntegerOrInfinity2(index2);
      return integer < 0 ? max3(integer + length, 0) : min4(integer, length);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js"(exports, module) {
    "use strict";
    var toIntegerOrInfinity2 = require_to_integer_or_infinity();
    var min4 = Math.min;
    module.exports = function(argument) {
      var len = toIntegerOrInfinity2(argument);
      return len > 0 ? min4(len, 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "node_modules/core-js/internals/length-of-array-like.js"(exports, module) {
    "use strict";
    var toLength5 = require_to_length();
    module.exports = function(obj) {
      return toLength5(obj.length);
    };
  }
});

// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/internals/array-includes.js"(exports, module) {
    "use strict";
    var toIndexedObject5 = require_to_indexed_object();
    var toAbsoluteIndex2 = require_to_absolute_index();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject5($this);
        var length = lengthOfArrayLike3(O);
        if (length === 0) return !IS_INCLUDES && -1;
        var index2 = toAbsoluteIndex2(fromIndex, length);
        var value;
        if (IS_INCLUDES && el !== el) while (length > index2) {
          value = O[index2++];
          if (value !== value) return true;
        }
        else for (; length > index2; index2++) {
          if ((IS_INCLUDES || index2 in O) && O[index2] === el) return IS_INCLUDES || index2 || 0;
        }
        return !IS_INCLUDES && -1;
      };
    };
    module.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    };
  }
});

// node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var hasOwn3 = require_has_own_property();
    var toIndexedObject5 = require_to_indexed_object();
    var indexOf2 = require_array_includes().indexOf;
    var hiddenKeys = require_hidden_keys();
    var push4 = uncurryThis12([].push);
    module.exports = function(object, names) {
      var O = toIndexedObject5(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) !hasOwn3(hiddenKeys, key) && hasOwn3(O, key) && push4(result, key);
      while (names.length > i) if (hasOwn3(O, key = names[i++])) {
        ~indexOf2(result, key) || push4(result, key);
      }
      return result;
    };
  }
});

// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
    "use strict";
    module.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ];
  }
});

// node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
    "use strict";
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames2(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
    "use strict";
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/internals/own-keys.js"(exports, module) {
    "use strict";
    var getBuiltIn2 = require_get_built_in();
    var uncurryThis12 = require_function_uncurry_this();
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var anObject9 = require_an_object();
    var concat3 = uncurryThis12([].concat);
    module.exports = getBuiltIn2("Reflect", "ownKeys") || function ownKeys3(it) {
      var keys2 = getOwnPropertyNamesModule.f(anObject9(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat3(keys2, getOwnPropertySymbols(it)) : keys2;
    };
  }
});

// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
    "use strict";
    var hasOwn3 = require_has_own_property();
    var ownKeys3 = require_own_keys();
    var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
    var definePropertyModule = require_object_define_property();
    module.exports = function(target, source, exceptions) {
      var keys2 = ownKeys3(source);
      var defineProperty2 = definePropertyModule.f;
      var getOwnPropertyDescriptor5 = getOwnPropertyDescriptorModule2.f;
      for (var i = 0; i < keys2.length; i++) {
        var key = keys2[i];
        if (!hasOwn3(target, key) && !(exceptions && hasOwn3(exceptions, key))) {
          defineProperty2(target, key, getOwnPropertyDescriptor5(source, key));
        }
      }
    };
  }
});

// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "node_modules/core-js/internals/is-forced.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var isCallable3 = require_is_callable();
    var replacement = /#|\.prototype\./;
    var isForced2 = function(feature, detection) {
      var value = data[normalize(feature)];
      return value === POLYFILL ? true : value === NATIVE ? false : isCallable3(detection) ? fails11(detection) : !!detection;
    };
    var normalize = isForced2.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    };
    var data = isForced2.data = {};
    var NATIVE = isForced2.NATIVE = "N";
    var POLYFILL = isForced2.POLYFILL = "P";
    module.exports = isForced2;
  }
});

// node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "node_modules/core-js/internals/export.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var getOwnPropertyDescriptor5 = require_object_get_own_property_descriptor().f;
    var createNonEnumerableProperty3 = require_create_non_enumerable_property();
    var defineBuiltIn3 = require_define_built_in();
    var defineGlobalProperty = require_define_global_property();
    var copyConstructorProperties3 = require_copy_constructor_properties();
    var isForced2 = require_is_forced();
    module.exports = function(options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED8, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = globalThis6;
      } else if (STATIC) {
        target = globalThis6[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = globalThis6[TARGET] && globalThis6[TARGET].prototype;
      }
      if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
          descriptor = getOwnPropertyDescriptor5(target, key);
          targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED8 = isForced2(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        if (!FORCED8 && targetProperty !== void 0) {
          if (typeof sourceProperty == typeof targetProperty) continue;
          copyConstructorProperties3(sourceProperty, targetProperty);
        }
        if (options.sham || targetProperty && targetProperty.sham) {
          createNonEnumerableProperty3(sourceProperty, "sham", true);
        }
        defineBuiltIn3(target, key, sourceProperty, options);
      }
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this-clause.js
var require_function_uncurry_this_clause = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this-clause.js"(exports, module) {
    "use strict";
    var classofRaw = require_classof_raw();
    var uncurryThis12 = require_function_uncurry_this();
    module.exports = function(fn) {
      if (classofRaw(fn) === "Function") return uncurryThis12(fn);
    };
  }
});

// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "node_modules/core-js/internals/function-bind-context.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this_clause();
    var aCallable2 = require_a_callable();
    var NATIVE_BIND = require_function_bind_native();
    var bind2 = uncurryThis12(uncurryThis12.bind);
    module.exports = function(fn, that) {
      aCallable2(fn);
      return that === void 0 ? fn : NATIVE_BIND ? bind2(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/internals/is-array.js"(exports, module) {
    "use strict";
    var classof = require_classof_raw();
    module.exports = Array.isArray || function isArray4(argument) {
      return classof(argument) === "Array";
    };
  }
});

// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol5("toStringTag");
    var test2 = {};
    test2[TO_STRING_TAG] = "z";
    module.exports = String(test2) === "[object z]";
  }
});

// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "node_modules/core-js/internals/classof.js"(exports, module) {
    "use strict";
    var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
    var isCallable3 = require_is_callable();
    var classofRaw = require_classof_raw();
    var wellKnownSymbol5 = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol5("toStringTag");
    var $Object = Object;
    var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ (function() {
      return arguments;
    })()) === "Arguments";
    var tryGet = function(it, key) {
      try {
        return it[key];
      } catch (error) {
      }
    };
    module.exports = TO_STRING_TAG_SUPPORT2 ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable3(O.callee) ? "Arguments" : result;
    };
  }
});

// node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
  "node_modules/core-js/internals/is-constructor.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var fails11 = require_fails();
    var isCallable3 = require_is_callable();
    var classof = require_classof();
    var getBuiltIn2 = require_get_built_in();
    var inspectSource = require_inspect_source();
    var noop3 = function() {
    };
    var construct2 = getBuiltIn2("Reflect", "construct");
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis12(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.test(noop3);
    var isConstructorModern = function isConstructor2(argument) {
      if (!isCallable3(argument)) return false;
      try {
        construct2(noop3, [], argument);
        return true;
      } catch (error) {
        return false;
      }
    };
    var isConstructorLegacy = function isConstructor2(argument) {
      if (!isCallable3(argument)) return false;
      switch (classof(argument)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return false;
      }
      try {
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
      } catch (error) {
        return true;
      }
    };
    isConstructorLegacy.sham = true;
    module.exports = !construct2 || fails11(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
  }
});

// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/internals/array-species-constructor.js"(exports, module) {
    "use strict";
    var isArray4 = require_is_array();
    var isConstructor2 = require_is_constructor();
    var isObject7 = require_is_object();
    var wellKnownSymbol5 = require_well_known_symbol();
    var SPECIES2 = wellKnownSymbol5("species");
    var $Array2 = Array;
    module.exports = function(originalArray) {
      var C;
      if (isArray4(originalArray)) {
        C = originalArray.constructor;
        if (isConstructor2(C) && (C === $Array2 || isArray4(C.prototype))) C = void 0;
        else if (isObject7(C)) {
          C = C[SPECIES2];
          if (C === null) C = void 0;
        }
      }
      return C === void 0 ? $Array2 : C;
    };
  }
});

// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/internals/array-species-create.js"(exports, module) {
    "use strict";
    var arraySpeciesConstructor = require_array_species_constructor();
    module.exports = function(originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
  }
});

// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/internals/create-property.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = function(object, key, value) {
      if (DESCRIPTORS6) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
      else object[key] = value;
    };
  }
});

// node_modules/core-js/internals/array-iteration.js
var require_array_iteration = __commonJS({
  "node_modules/core-js/internals/array-iteration.js"(exports, module) {
    "use strict";
    var bind2 = require_function_bind_context();
    var IndexedObject2 = require_indexed_object();
    var toObject3 = require_to_object();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var arraySpeciesCreate2 = require_array_species_create();
    var createProperty4 = require_create_property();
    var createMethod = function(TYPE) {
      var IS_MAP = TYPE === 1;
      var IS_FILTER = TYPE === 2;
      var IS_SOME = TYPE === 3;
      var IS_EVERY = TYPE === 4;
      var IS_FIND_INDEX = TYPE === 6;
      var IS_FILTER_REJECT = TYPE === 7;
      var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
      return function($this, callbackfn, that) {
        var O = toObject3($this);
        var self2 = IndexedObject2(O);
        var length = lengthOfArrayLike3(self2);
        var boundFunction = bind2(callbackfn, that);
        var index2 = 0;
        var resIndex = 0;
        var target = IS_MAP ? arraySpeciesCreate2($this, length) : IS_FILTER || IS_FILTER_REJECT ? arraySpeciesCreate2($this, 0) : void 0;
        var value, result;
        for (; length > index2; index2++) if (NO_HOLES || index2 in self2) {
          value = self2[index2];
          result = boundFunction(value, index2, O);
          if (TYPE) {
            if (IS_MAP) createProperty4(target, index2, result);
            else if (result) switch (TYPE) {
              case 3:
                return true;
              // some
              case 5:
                return value;
              // find
              case 6:
                return index2;
              // findIndex
              case 2:
                createProperty4(target, resIndex++, value);
            }
            else switch (TYPE) {
              case 4:
                return false;
              // every
              case 7:
                createProperty4(target, resIndex++, value);
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };
    module.exports = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod(6),
      // `Array.prototype.filterReject` method
      // https://github.com/tc39/proposal-array-filtering
      filterReject: createMethod(7)
    };
  }
});

// node_modules/core-js/internals/array-method-has-species-support.js
var require_array_method_has_species_support = __commonJS({
  "node_modules/core-js/internals/array-method-has-species-support.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var wellKnownSymbol5 = require_well_known_symbol();
    var V8_VERSION2 = require_environment_v8_version();
    var SPECIES2 = wellKnownSymbol5("species");
    module.exports = function(METHOD_NAME) {
      return V8_VERSION2 >= 51 || !fails11(function() {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES2] = function() {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };
  }
});

// node_modules/core-js/internals/to-string.js
var require_to_string = __commonJS({
  "node_modules/core-js/internals/to-string.js"(exports, module) {
    "use strict";
    var classof = require_classof();
    var $String = String;
    module.exports = function(argument) {
      if (classof(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
      return $String(argument);
    };
  }
});

// node_modules/core-js/internals/regexp-flags.js
var require_regexp_flags = __commonJS({
  "node_modules/core-js/internals/regexp-flags.js"(exports, module) {
    "use strict";
    var anObject9 = require_an_object();
    module.exports = function() {
      var that = anObject9(this);
      var result = "";
      if (that.hasIndices) result += "d";
      if (that.global) result += "g";
      if (that.ignoreCase) result += "i";
      if (that.multiline) result += "m";
      if (that.dotAll) result += "s";
      if (that.unicode) result += "u";
      if (that.unicodeSets) result += "v";
      if (that.sticky) result += "y";
      return result;
    };
  }
});

// node_modules/core-js/internals/regexp-sticky-helpers.js
var require_regexp_sticky_helpers = __commonJS({
  "node_modules/core-js/internals/regexp-sticky-helpers.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var globalThis6 = require_global_this();
    var $RegExp = globalThis6.RegExp;
    var UNSUPPORTED_Y2 = fails11(function() {
      var re = $RegExp("a", "y");
      re.lastIndex = 2;
      return re.exec("abcd") !== null;
    });
    var MISSED_STICKY = UNSUPPORTED_Y2 || fails11(function() {
      return !$RegExp("a", "y").sticky;
    });
    var BROKEN_CARET = UNSUPPORTED_Y2 || fails11(function() {
      var re = $RegExp("^r", "gy");
      re.lastIndex = 2;
      return re.exec("str") !== null;
    });
    module.exports = {
      BROKEN_CARET,
      MISSED_STICKY,
      UNSUPPORTED_Y: UNSUPPORTED_Y2
    };
  }
});

// node_modules/core-js/internals/object-keys.js
var require_object_keys = __commonJS({
  "node_modules/core-js/internals/object-keys.js"(exports, module) {
    "use strict";
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    module.exports = Object.keys || function keys2(O) {
      return internalObjectKeys(O, enumBugKeys);
    };
  }
});

// node_modules/core-js/internals/object-define-properties.js
var require_object_define_properties = __commonJS({
  "node_modules/core-js/internals/object-define-properties.js"(exports) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var definePropertyModule = require_object_define_property();
    var anObject9 = require_an_object();
    var toIndexedObject5 = require_to_indexed_object();
    var objectKeys = require_object_keys();
    exports.f = DESCRIPTORS6 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject9(O);
      var props = toIndexedObject5(Properties);
      var keys2 = objectKeys(Properties);
      var length = keys2.length;
      var index2 = 0;
      var key;
      while (length > index2) definePropertyModule.f(O, key = keys2[index2++], props[key]);
      return O;
    };
  }
});

// node_modules/core-js/internals/html.js
var require_html = __commonJS({
  "node_modules/core-js/internals/html.js"(exports, module) {
    "use strict";
    var getBuiltIn2 = require_get_built_in();
    module.exports = getBuiltIn2("document", "documentElement");
  }
});

// node_modules/core-js/internals/object-create.js
var require_object_create = __commonJS({
  "node_modules/core-js/internals/object-create.js"(exports, module) {
    "use strict";
    var anObject9 = require_an_object();
    var definePropertiesModule = require_object_define_properties();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = require_hidden_keys();
    var html = require_html();
    var documentCreateElement = require_document_create_element();
    var sharedKey = require_shared_key();
    var GT = ">";
    var LT = "<";
    var PROTOTYPE = "prototype";
    var SCRIPT = "script";
    var IE_PROTO = sharedKey("IE_PROTO");
    var EmptyConstructor = function() {
    };
    var scriptTag = function(content) {
      return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
    };
    var NullProtoObjectViaActiveX = function(activeXDocument2) {
      activeXDocument2.write(scriptTag(""));
      activeXDocument2.close();
      var temp = activeXDocument2.parentWindow.Object;
      activeXDocument2 = null;
      return temp;
    };
    var NullProtoObjectViaIFrame = function() {
      var iframe = documentCreateElement("iframe");
      var JS = "java" + SCRIPT + ":";
      var iframeDocument;
      iframe.style.display = "none";
      html.appendChild(iframe);
      iframe.src = String(JS);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(scriptTag("document.F=Object"));
      iframeDocument.close();
      return iframeDocument.F;
    };
    var activeXDocument;
    var NullProtoObject = function() {
      try {
        activeXDocument = new ActiveXObject("htmlfile");
      } catch (error) {
      }
      NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
      var length = enumBugKeys.length;
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
      return NullProtoObject();
    };
    hiddenKeys[IE_PROTO] = true;
    module.exports = Object.create || function create2(O, Properties) {
      var result;
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject9(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        result[IE_PROTO] = O;
      } else result = NullProtoObject();
      return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
    };
  }
});

// node_modules/core-js/internals/regexp-unsupported-dot-all.js
var require_regexp_unsupported_dot_all = __commonJS({
  "node_modules/core-js/internals/regexp-unsupported-dot-all.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var globalThis6 = require_global_this();
    var $RegExp = globalThis6.RegExp;
    module.exports = fails11(function() {
      var re = $RegExp(".", "s");
      return !(re.dotAll && re.test("\n") && re.flags === "s");
    });
  }
});

// node_modules/core-js/internals/regexp-unsupported-ncg.js
var require_regexp_unsupported_ncg = __commonJS({
  "node_modules/core-js/internals/regexp-unsupported-ncg.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var globalThis6 = require_global_this();
    var $RegExp = globalThis6.RegExp;
    module.exports = fails11(function() {
      var re = $RegExp("(?<a>b)", "g");
      return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
    });
  }
});

// node_modules/core-js/internals/regexp-exec.js
var require_regexp_exec = __commonJS({
  "node_modules/core-js/internals/regexp-exec.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var uncurryThis12 = require_function_uncurry_this();
    var toString9 = require_to_string();
    var regexpFlags = require_regexp_flags();
    var stickyHelpers2 = require_regexp_sticky_helpers();
    var shared = require_shared();
    var create2 = require_object_create();
    var getInternalState2 = require_internal_state().get;
    var UNSUPPORTED_DOT_ALL = require_regexp_unsupported_dot_all();
    var UNSUPPORTED_NCG = require_regexp_unsupported_ncg();
    var nativeReplace = shared("native-string-replace", String.prototype.replace);
    var nativeExec = RegExp.prototype.exec;
    var patchedExec = nativeExec;
    var charAt2 = uncurryThis12("".charAt);
    var indexOf2 = uncurryThis12("".indexOf);
    var replace = uncurryThis12("".replace);
    var stringSlice5 = uncurryThis12("".slice);
    var UPDATES_LAST_INDEX_WRONG = (function() {
      var re1 = /a/;
      var re2 = /b*/g;
      call5(nativeExec, re1, "a");
      call5(nativeExec, re2, "a");
      return re1.lastIndex !== 0 || re2.lastIndex !== 0;
    })();
    var UNSUPPORTED_Y2 = stickyHelpers2.BROKEN_CARET;
    var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y2 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
    var setGroups = function(re, groups) {
      var object = re.groups = create2(null);
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        object[group[0]] = re[group[1]];
      }
    };
    if (PATCH) {
      patchedExec = function exec(string) {
        var re = this;
        var state = getInternalState2(re);
        var str = toString9(string);
        var raw = state.raw;
        var result, reCopy, lastIndex;
        if (raw) {
          raw.lastIndex = re.lastIndex;
          result = call5(patchedExec, raw, str);
          re.lastIndex = raw.lastIndex;
          if (result && state.groups) setGroups(result, state.groups);
          return result;
        }
        var groups = state.groups;
        var sticky = UNSUPPORTED_Y2 && re.sticky;
        var flags = call5(regexpFlags, re);
        var source = re.source;
        var charsAdded = 0;
        var strCopy = str;
        if (sticky) {
          flags = replace(flags, "y", "");
          if (indexOf2(flags, "g") === -1) {
            flags += "g";
          }
          strCopy = stringSlice5(str, re.lastIndex);
          var prevChar = re.lastIndex > 0 && charAt2(str, re.lastIndex - 1);
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && prevChar !== "\n" && prevChar !== "\r" && prevChar !== "\u2028" && prevChar !== "\u2029")) {
            source = "(?: (?:" + source + "))";
            strCopy = " " + strCopy;
            charsAdded++;
          }
          reCopy = new RegExp("^(?:" + source + ")", flags);
        }
        if (NPCG_INCLUDED) {
          reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
        var match = call5(nativeExec, sticky ? reCopy : re, strCopy);
        if (sticky) {
          if (match) {
            match.input = str;
            match[0] = stringSlice5(match[0], charsAdded);
            match.index = re.lastIndex;
            re.lastIndex += match[0].length;
          } else re.lastIndex = 0;
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          call5(nativeReplace, match[0], reCopy, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === void 0) match[i] = void 0;
            }
          });
        }
        if (match && groups) setGroups(match, groups);
        return match;
      };
    }
    module.exports = patchedExec;
  }
});

// node_modules/core-js/modules/es.regexp.exec.js
var require_es_regexp_exec = __commonJS({
  "node_modules/core-js/modules/es.regexp.exec.js"() {
    "use strict";
    var $27 = require_export();
    var exec = require_regexp_exec();
    $27({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
      exec
    });
  }
});

// node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js
var require_fix_regexp_well_known_symbol_logic = __commonJS({
  "node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js"(exports, module) {
    "use strict";
    require_es_regexp_exec();
    var call5 = require_function_call();
    var defineBuiltIn3 = require_define_built_in();
    var regexpExec = require_regexp_exec();
    var fails11 = require_fails();
    var wellKnownSymbol5 = require_well_known_symbol();
    var createNonEnumerableProperty3 = require_create_non_enumerable_property();
    var SPECIES2 = wellKnownSymbol5("species");
    var RegExpPrototype2 = RegExp.prototype;
    module.exports = function(KEY, exec, FORCED8, SHAM) {
      var SYMBOL = wellKnownSymbol5(KEY);
      var DELEGATES_TO_SYMBOL = !fails11(function() {
        var O = {};
        O[SYMBOL] = function() {
          return 7;
        };
        return ""[KEY](O) !== 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails11(function() {
        var execCalled = false;
        var re = /a/;
        if (KEY === "split") {
          var constructor = {};
          constructor[SPECIES2] = function() {
            return re;
          };
          re = { constructor, flags: "" };
          re[SYMBOL] = /./[SYMBOL];
        }
        re.exec = function() {
          execCalled = true;
          return null;
        };
        re[SYMBOL]("");
        return !execCalled;
      });
      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED8) {
        var nativeRegExpMethod = /./[SYMBOL];
        var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
          var $exec = regexp.exec;
          if ($exec === regexpExec || $exec === RegExpPrototype2.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              return { done: true, value: call5(nativeRegExpMethod, regexp, str, arg2) };
            }
            return { done: true, value: call5(nativeMethod, str, regexp, arg2) };
          }
          return { done: false };
        });
        defineBuiltIn3(String.prototype, KEY, methods[0]);
        defineBuiltIn3(RegExpPrototype2, SYMBOL, methods[1]);
      }
      if (SHAM) createNonEnumerableProperty3(RegExpPrototype2[SYMBOL], "sham", true);
    };
  }
});

// node_modules/core-js/internals/string-multibyte.js
var require_string_multibyte = __commonJS({
  "node_modules/core-js/internals/string-multibyte.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var toIntegerOrInfinity2 = require_to_integer_or_infinity();
    var toString9 = require_to_string();
    var requireObjectCoercible6 = require_require_object_coercible();
    var charAt2 = uncurryThis12("".charAt);
    var charCodeAt2 = uncurryThis12("".charCodeAt);
    var stringSlice5 = uncurryThis12("".slice);
    var createMethod = function(CONVERT_TO_STRING) {
      return function($this, pos) {
        var S = toString9(requireObjectCoercible6($this));
        var position = toIntegerOrInfinity2(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
        first = charCodeAt2(S, position);
        return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt2(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt2(S, position) : first : CONVERT_TO_STRING ? stringSlice5(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
      };
    };
    module.exports = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod(true)
    };
  }
});

// node_modules/core-js/internals/advance-string-index.js
var require_advance_string_index = __commonJS({
  "node_modules/core-js/internals/advance-string-index.js"(exports, module) {
    "use strict";
    var charAt2 = require_string_multibyte().charAt;
    module.exports = function(S, index2, unicode) {
      return index2 + (unicode ? charAt2(S, index2).length || 1 : 1);
    };
  }
});

// node_modules/core-js/internals/regexp-flags-detection.js
var require_regexp_flags_detection = __commonJS({
  "node_modules/core-js/internals/regexp-flags-detection.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var fails11 = require_fails();
    var RegExp2 = globalThis6.RegExp;
    var FLAGS_GETTER_IS_CORRECT = !fails11(function() {
      var INDICES_SUPPORT = true;
      try {
        RegExp2(".", "d");
      } catch (error) {
        INDICES_SUPPORT = false;
      }
      var O = {};
      var calls = "";
      var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
      var addGetter = function(key2, chr) {
        Object.defineProperty(O, key2, { get: function() {
          calls += chr;
          return true;
        } });
      };
      var pairs = {
        dotAll: "s",
        global: "g",
        ignoreCase: "i",
        multiline: "m",
        sticky: "y"
      };
      if (INDICES_SUPPORT) pairs.hasIndices = "d";
      for (var key in pairs) addGetter(key, pairs[key]);
      var result = Object.getOwnPropertyDescriptor(RegExp2.prototype, "flags").get.call(O);
      return result !== expected || calls !== expected;
    });
    module.exports = { correct: FLAGS_GETTER_IS_CORRECT };
  }
});

// node_modules/core-js/internals/regexp-get-flags.js
var require_regexp_get_flags = __commonJS({
  "node_modules/core-js/internals/regexp-get-flags.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var hasOwn3 = require_has_own_property();
    var isPrototypeOf3 = require_object_is_prototype_of();
    var regExpFlagsDetection = require_regexp_flags_detection();
    var regExpFlagsGetterImplementation = require_regexp_flags();
    var RegExpPrototype2 = RegExp.prototype;
    module.exports = regExpFlagsDetection.correct ? function(it) {
      return it.flags;
    } : function(it) {
      return !regExpFlagsDetection.correct && isPrototypeOf3(RegExpPrototype2, it) && !hasOwn3(it, "flags") ? call5(regExpFlagsGetterImplementation, it) : it.flags;
    };
  }
});

// node_modules/core-js/internals/regexp-exec-abstract.js
var require_regexp_exec_abstract = __commonJS({
  "node_modules/core-js/internals/regexp-exec-abstract.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var anObject9 = require_an_object();
    var isCallable3 = require_is_callable();
    var classof = require_classof_raw();
    var regexpExec = require_regexp_exec();
    var $TypeError = TypeError;
    module.exports = function(R, S) {
      var exec = R.exec;
      if (isCallable3(exec)) {
        var result = call5(exec, R, S);
        if (result !== null) anObject9(result);
        return result;
      }
      if (classof(R) === "RegExp") return call5(regexpExec, R, S);
      throw new $TypeError("RegExp#exec called on incompatible receiver");
    };
  }
});

// node_modules/core-js/internals/function-apply.js
var require_function_apply = __commonJS({
  "node_modules/core-js/internals/function-apply.js"(exports, module) {
    "use strict";
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype2 = Function.prototype;
    var apply4 = FunctionPrototype2.apply;
    var call5 = FunctionPrototype2.call;
    module.exports = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND ? call5.bind(apply4) : function() {
      return call5.apply(apply4, arguments);
    });
  }
});

// node_modules/core-js/internals/get-substitution.js
var require_get_substitution = __commonJS({
  "node_modules/core-js/internals/get-substitution.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var toObject3 = require_to_object();
    var floor = Math.floor;
    var charAt2 = uncurryThis12("".charAt);
    var replace = uncurryThis12("".replace);
    var stringSlice5 = uncurryThis12("".slice);
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
    module.exports = function(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m2 = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== void 0) {
        namedCaptures = toObject3(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return replace(replacement, symbols, function(match, ch) {
        var capture;
        switch (charAt2(ch, 0)) {
          case "$":
            return "$";
          case "&":
            return matched;
          case "`":
            return stringSlice5(str, 0, position);
          case "'":
            return stringSlice5(str, tailPos);
          case "<":
            capture = namedCaptures[stringSlice5(ch, 1, -1)];
            break;
          default:
            var n = +ch;
            if (n === 0) return match;
            if (n > m2) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m2) return captures[f - 1] === void 0 ? charAt2(ch, 1) : captures[f - 1] + charAt2(ch, 1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === void 0 ? "" : capture;
      });
    };
  }
});

// node_modules/core-js/internals/is-regexp.js
var require_is_regexp = __commonJS({
  "node_modules/core-js/internals/is-regexp.js"(exports, module) {
    "use strict";
    var isObject7 = require_is_object();
    var classof = require_classof_raw();
    var wellKnownSymbol5 = require_well_known_symbol();
    var MATCH = wellKnownSymbol5("match");
    module.exports = function(it) {
      var isRegExp;
      return isObject7(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) === "RegExp");
    };
  }
});

// node_modules/core-js/internals/not-a-regexp.js
var require_not_a_regexp = __commonJS({
  "node_modules/core-js/internals/not-a-regexp.js"(exports, module) {
    "use strict";
    var isRegExp = require_is_regexp();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isRegExp(it)) {
        throw new $TypeError("The method doesn't accept regular expressions");
      }
      return it;
    };
  }
});

// node_modules/core-js/internals/correct-is-regexp-logic.js
var require_correct_is_regexp_logic = __commonJS({
  "node_modules/core-js/internals/correct-is-regexp-logic.js"(exports, module) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    var MATCH = wellKnownSymbol5("match");
    module.exports = function(METHOD_NAME) {
      var regexp = /./;
      try {
        "/./"[METHOD_NAME](regexp);
      } catch (error1) {
        try {
          regexp[MATCH] = false;
          return "/./"[METHOD_NAME](regexp);
        } catch (error2) {
        }
      }
      return false;
    };
  }
});

// node_modules/core-js/internals/array-method-is-strict.js
var require_array_method_is_strict = __commonJS({
  "node_modules/core-js/internals/array-method-is-strict.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = function(METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !!method && fails11(function() {
        method.call(null, argument || function() {
          return 1;
        }, 1);
      });
    };
  }
});

// node_modules/core-js/internals/array-slice.js
var require_array_slice = __commonJS({
  "node_modules/core-js/internals/array-slice.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    module.exports = uncurryThis12([].slice);
  }
});

// node_modules/core-js/internals/object-get-own-property-names-external.js
var require_object_get_own_property_names_external = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names-external.js"(exports, module) {
    "use strict";
    var classof = require_classof_raw();
    var toIndexedObject5 = require_to_indexed_object();
    var $getOwnPropertyNames = require_object_get_own_property_names().f;
    var arraySlice = require_array_slice();
    var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    var getWindowNames = function(it) {
      try {
        return $getOwnPropertyNames(it);
      } catch (error) {
        return arraySlice(windowNames);
      }
    };
    module.exports.f = function getOwnPropertyNames2(it) {
      return windowNames && classof(it) === "Window" ? getWindowNames(it) : $getOwnPropertyNames(toIndexedObject5(it));
    };
  }
});

// node_modules/core-js/internals/define-built-in-accessor.js
var require_define_built_in_accessor = __commonJS({
  "node_modules/core-js/internals/define-built-in-accessor.js"(exports, module) {
    "use strict";
    var makeBuiltIn = require_make_built_in();
    var defineProperty2 = require_object_define_property();
    module.exports = function(target, name, descriptor) {
      if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
      if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
      return defineProperty2.f(target, name, descriptor);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol-wrapped.js
var require_well_known_symbol_wrapped = __commonJS({
  "node_modules/core-js/internals/well-known-symbol-wrapped.js"(exports) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    exports.f = wellKnownSymbol5;
  }
});

// node_modules/core-js/internals/path.js
var require_path = __commonJS({
  "node_modules/core-js/internals/path.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    module.exports = globalThis6;
  }
});

// node_modules/core-js/internals/well-known-symbol-define.js
var require_well_known_symbol_define = __commonJS({
  "node_modules/core-js/internals/well-known-symbol-define.js"(exports, module) {
    "use strict";
    var path2 = require_path();
    var hasOwn3 = require_has_own_property();
    var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
    var defineProperty2 = require_object_define_property().f;
    module.exports = function(NAME2) {
      var Symbol2 = path2.Symbol || (path2.Symbol = {});
      if (!hasOwn3(Symbol2, NAME2)) defineProperty2(Symbol2, NAME2, {
        value: wrappedWellKnownSymbolModule.f(NAME2)
      });
    };
  }
});

// node_modules/core-js/internals/symbol-define-to-primitive.js
var require_symbol_define_to_primitive = __commonJS({
  "node_modules/core-js/internals/symbol-define-to-primitive.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var getBuiltIn2 = require_get_built_in();
    var wellKnownSymbol5 = require_well_known_symbol();
    var defineBuiltIn3 = require_define_built_in();
    module.exports = function() {
      var Symbol2 = getBuiltIn2("Symbol");
      var SymbolPrototype2 = Symbol2 && Symbol2.prototype;
      var valueOf = SymbolPrototype2 && SymbolPrototype2.valueOf;
      var TO_PRIMITIVE = wellKnownSymbol5("toPrimitive");
      if (SymbolPrototype2 && !SymbolPrototype2[TO_PRIMITIVE]) {
        defineBuiltIn3(SymbolPrototype2, TO_PRIMITIVE, function(hint) {
          return call5(valueOf, this);
        }, { arity: 1 });
      }
    };
  }
});

// node_modules/core-js/internals/set-to-string-tag.js
var require_set_to_string_tag = __commonJS({
  "node_modules/core-js/internals/set-to-string-tag.js"(exports, module) {
    "use strict";
    var defineProperty2 = require_object_define_property().f;
    var hasOwn3 = require_has_own_property();
    var wellKnownSymbol5 = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol5("toStringTag");
    module.exports = function(target, TAG, STATIC) {
      if (target && !STATIC) target = target.prototype;
      if (target && !hasOwn3(target, TO_STRING_TAG)) {
        defineProperty2(target, TO_STRING_TAG, { configurable: true, value: TAG });
      }
    };
  }
});

// node_modules/core-js/modules/es.symbol.constructor.js
var require_es_symbol_constructor = __commonJS({
  "node_modules/core-js/modules/es.symbol.constructor.js"() {
    "use strict";
    var $27 = require_export();
    var globalThis6 = require_global_this();
    var call5 = require_function_call();
    var uncurryThis12 = require_function_uncurry_this();
    var IS_PURE3 = require_is_pure();
    var DESCRIPTORS6 = require_descriptors();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var fails11 = require_fails();
    var hasOwn3 = require_has_own_property();
    var isPrototypeOf3 = require_object_is_prototype_of();
    var anObject9 = require_an_object();
    var toIndexedObject5 = require_to_indexed_object();
    var toPropertyKey3 = require_to_property_key();
    var $toString2 = require_to_string();
    var createPropertyDescriptor = require_create_property_descriptor();
    var nativeObjectCreate = require_object_create();
    var objectKeys = require_object_keys();
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertyNamesExternal = require_object_get_own_property_names_external();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var getOwnPropertyDescriptorModule2 = require_object_get_own_property_descriptor();
    var definePropertyModule = require_object_define_property();
    var definePropertiesModule = require_object_define_properties();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var defineBuiltIn3 = require_define_built_in();
    var defineBuiltInAccessor3 = require_define_built_in_accessor();
    var shared = require_shared();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var uid = require_uid();
    var wellKnownSymbol5 = require_well_known_symbol();
    var wrappedWellKnownSymbolModule = require_well_known_symbol_wrapped();
    var defineWellKnownSymbol2 = require_well_known_symbol_define();
    var defineSymbolToPrimitive = require_symbol_define_to_primitive();
    var setToStringTag2 = require_set_to_string_tag();
    var InternalStateModule2 = require_internal_state();
    var $forEach = require_array_iteration().forEach;
    var HIDDEN = sharedKey("hidden");
    var SYMBOL = "Symbol";
    var PROTOTYPE = "prototype";
    var setInternalState2 = InternalStateModule2.set;
    var getInternalState2 = InternalStateModule2.getterFor(SYMBOL);
    var ObjectPrototype2 = Object[PROTOTYPE];
    var $Symbol = globalThis6.Symbol;
    var SymbolPrototype2 = $Symbol && $Symbol[PROTOTYPE];
    var RangeError = globalThis6.RangeError;
    var TypeError3 = globalThis6.TypeError;
    var QObject = globalThis6.QObject;
    var nativeGetOwnPropertyDescriptor2 = getOwnPropertyDescriptorModule2.f;
    var nativeDefineProperty = definePropertyModule.f;
    var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
    var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
    var push4 = uncurryThis12([].push);
    var AllSymbols = shared("symbols");
    var ObjectPrototypeSymbols = shared("op-symbols");
    var WellKnownSymbolsStore = shared("wks");
    var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
    var fallbackDefineProperty = function(O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor2(ObjectPrototype2, P);
      if (ObjectPrototypeDescriptor) delete ObjectPrototype2[P];
      nativeDefineProperty(O, P, Attributes);
      if (ObjectPrototypeDescriptor && O !== ObjectPrototype2) {
        nativeDefineProperty(ObjectPrototype2, P, ObjectPrototypeDescriptor);
      }
      return O;
    };
    var setSymbolDescriptor = DESCRIPTORS6 && fails11(function() {
      return nativeObjectCreate(nativeDefineProperty({}, "a", {
        get: function() {
          return nativeDefineProperty(this, "a", { value: 7 }).a;
        }
      })).a !== 7;
    }) ? fallbackDefineProperty : nativeDefineProperty;
    var wrap = function(tag, description) {
      var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype2);
      setInternalState2(symbol, {
        type: SYMBOL,
        tag,
        description
      });
      if (!DESCRIPTORS6) symbol.description = description;
      return symbol;
    };
    var $defineProperty = function defineProperty2(O, P, Attributes) {
      if (O === ObjectPrototype2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
      anObject9(O);
      var key = toPropertyKey3(P);
      anObject9(Attributes);
      if (hasOwn3(AllSymbols, key)) {
        if (!("enumerable" in Attributes) ? !hasOwn3(O, key) || hasOwn3(O, HIDDEN) && O[HIDDEN][key] : !Attributes.enumerable) {
          if (!hasOwn3(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)));
          O[HIDDEN][key] = true;
        } else {
          if (hasOwn3(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
          Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
        }
        return setSymbolDescriptor(O, key, Attributes);
      }
      return nativeDefineProperty(O, key, Attributes);
    };
    var $defineProperties = function defineProperties(O, Properties) {
      anObject9(O);
      var properties = toIndexedObject5(Properties);
      var keys2 = objectKeys(properties).concat($getOwnPropertySymbols(properties));
      $forEach(keys2, function(key) {
        if (!DESCRIPTORS6 || call5($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
      });
      return O;
    };
    var $create = function create2(O, Properties) {
      return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
    };
    var $propertyIsEnumerable = function propertyIsEnumerable(V) {
      var P = toPropertyKey3(V);
      var enumerable = call5(nativePropertyIsEnumerable, this, P);
      if (this === ObjectPrototype2 && hasOwn3(AllSymbols, P) && !hasOwn3(ObjectPrototypeSymbols, P)) return false;
      return enumerable || !hasOwn3(this, P) || !hasOwn3(AllSymbols, P) || hasOwn3(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
    };
    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor5(O, P) {
      var it = toIndexedObject5(O);
      var key = toPropertyKey3(P);
      if (it === ObjectPrototype2 && hasOwn3(AllSymbols, key) && !hasOwn3(ObjectPrototypeSymbols, key)) return;
      var descriptor = nativeGetOwnPropertyDescriptor2(it, key);
      if (descriptor && hasOwn3(AllSymbols, key) && !(hasOwn3(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true;
      }
      return descriptor;
    };
    var $getOwnPropertyNames = function getOwnPropertyNames2(O) {
      var names = nativeGetOwnPropertyNames(toIndexedObject5(O));
      var result = [];
      $forEach(names, function(key) {
        if (!hasOwn3(AllSymbols, key) && !hasOwn3(hiddenKeys, key)) push4(result, key);
      });
      return result;
    };
    var $getOwnPropertySymbols = function(O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype2;
      var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject5(O));
      var result = [];
      $forEach(names, function(key) {
        if (hasOwn3(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn3(ObjectPrototype2, key))) {
          push4(result, AllSymbols[key]);
        }
      });
      return result;
    };
    if (!NATIVE_SYMBOL) {
      $Symbol = function Symbol2() {
        if (isPrototypeOf3(SymbolPrototype2, this)) throw new TypeError3("Symbol is not a constructor");
        var description = !arguments.length || arguments[0] === void 0 ? void 0 : $toString2(arguments[0]);
        var tag = uid(description);
        var setter = function(value) {
          var $this = this === void 0 ? globalThis6 : this;
          if ($this === ObjectPrototype2) call5(setter, ObjectPrototypeSymbols, value);
          if (hasOwn3($this, HIDDEN) && hasOwn3($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
          var descriptor = createPropertyDescriptor(1, value);
          try {
            setSymbolDescriptor($this, tag, descriptor);
          } catch (error) {
            if (!(error instanceof RangeError)) throw error;
            fallbackDefineProperty($this, tag, descriptor);
          }
        };
        if (DESCRIPTORS6 && USE_SETTER) setSymbolDescriptor(ObjectPrototype2, tag, { configurable: true, set: setter });
        return wrap(tag, description);
      };
      SymbolPrototype2 = $Symbol[PROTOTYPE];
      defineBuiltIn3(SymbolPrototype2, "toString", function toString9() {
        return getInternalState2(this).tag;
      });
      defineBuiltIn3($Symbol, "withoutSetter", function(description) {
        return wrap(uid(description), description);
      });
      propertyIsEnumerableModule.f = $propertyIsEnumerable;
      definePropertyModule.f = $defineProperty;
      definePropertiesModule.f = $defineProperties;
      getOwnPropertyDescriptorModule2.f = $getOwnPropertyDescriptor;
      getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
      getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
      wrappedWellKnownSymbolModule.f = function(name) {
        return wrap(wellKnownSymbol5(name), name);
      };
      if (DESCRIPTORS6) {
        defineBuiltInAccessor3(SymbolPrototype2, "description", {
          configurable: true,
          get: function description() {
            return getInternalState2(this).description;
          }
        });
        if (!IS_PURE3) {
          defineBuiltIn3(ObjectPrototype2, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
        }
      }
    }
    $27({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
      Symbol: $Symbol
    });
    $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
      defineWellKnownSymbol2(name);
    });
    $27({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
      useSetter: function() {
        USE_SETTER = true;
      },
      useSimple: function() {
        USE_SETTER = false;
      }
    });
    $27({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS6 }, {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    });
    $27({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames
    });
    defineSymbolToPrimitive();
    setToStringTag2($Symbol, SYMBOL);
    hiddenKeys[HIDDEN] = true;
  }
});

// node_modules/core-js/internals/symbol-registry-detection.js
var require_symbol_registry_detection = __commonJS({
  "node_modules/core-js/internals/symbol-registry-detection.js"(exports, module) {
    "use strict";
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module.exports = NATIVE_SYMBOL && !!Symbol["for"] && !!Symbol.keyFor;
  }
});

// node_modules/core-js/modules/es.symbol.for.js
var require_es_symbol_for = __commonJS({
  "node_modules/core-js/modules/es.symbol.for.js"() {
    "use strict";
    var $27 = require_export();
    var getBuiltIn2 = require_get_built_in();
    var hasOwn3 = require_has_own_property();
    var toString9 = require_to_string();
    var shared = require_shared();
    var NATIVE_SYMBOL_REGISTRY = require_symbol_registry_detection();
    var StringToSymbolRegistry = shared("string-to-symbol-registry");
    var SymbolToStringRegistry = shared("symbol-to-string-registry");
    $27({ target: "Symbol", stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
      "for": function(key) {
        var string = toString9(key);
        if (hasOwn3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
        var symbol = getBuiltIn2("Symbol")(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      }
    });
  }
});

// node_modules/core-js/modules/es.symbol.key-for.js
var require_es_symbol_key_for = __commonJS({
  "node_modules/core-js/modules/es.symbol.key-for.js"() {
    "use strict";
    var $27 = require_export();
    var hasOwn3 = require_has_own_property();
    var isSymbol2 = require_is_symbol();
    var tryToString = require_try_to_string();
    var shared = require_shared();
    var NATIVE_SYMBOL_REGISTRY = require_symbol_registry_detection();
    var SymbolToStringRegistry = shared("symbol-to-string-registry");
    $27({ target: "Symbol", stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
      keyFor: function keyFor(sym) {
        if (!isSymbol2(sym)) throw new TypeError(tryToString(sym) + " is not a symbol");
        if (hasOwn3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
      }
    });
  }
});

// node_modules/core-js/internals/is-raw-json.js
var require_is_raw_json = __commonJS({
  "node_modules/core-js/internals/is-raw-json.js"(exports, module) {
    "use strict";
    var isObject7 = require_is_object();
    var getInternalState2 = require_internal_state().get;
    module.exports = function isRawJSON(O) {
      if (!isObject7(O)) return false;
      var state = getInternalState2(O);
      return !!state && state.type === "RawJSON";
    };
  }
});

// node_modules/core-js/internals/parse-json-string.js
var require_parse_json_string = __commonJS({
  "node_modules/core-js/internals/parse-json-string.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var hasOwn3 = require_has_own_property();
    var $SyntaxError = SyntaxError;
    var $parseInt = parseInt;
    var fromCharCode = String.fromCharCode;
    var at = uncurryThis12("".charAt);
    var slice2 = uncurryThis12("".slice);
    var exec = uncurryThis12(/./.exec);
    var codePoints = {
      '\\"': '"',
      "\\\\": "\\",
      "\\/": "/",
      "\\b": "\b",
      "\\f": "\f",
      "\\n": "\n",
      "\\r": "\r",
      "\\t": "	"
    };
    var IS_4_HEX_DIGITS = /^[\da-f]{4}$/i;
    var IS_C0_CONTROL_CODE = /^[\u0000-\u001F]$/;
    module.exports = function(source, i) {
      var unterminated = true;
      var value = "";
      while (i < source.length) {
        var chr = at(source, i);
        if (chr === "\\") {
          var twoChars = slice2(source, i, i + 2);
          if (hasOwn3(codePoints, twoChars)) {
            value += codePoints[twoChars];
            i += 2;
          } else if (twoChars === "\\u") {
            i += 2;
            var fourHexDigits = slice2(source, i, i + 4);
            if (!exec(IS_4_HEX_DIGITS, fourHexDigits)) throw new $SyntaxError("Bad Unicode escape at: " + i);
            value += fromCharCode($parseInt(fourHexDigits, 16));
            i += 4;
          } else throw new $SyntaxError('Unknown escape sequence: "' + twoChars + '"');
        } else if (chr === '"') {
          unterminated = false;
          i++;
          break;
        } else {
          if (exec(IS_C0_CONTROL_CODE, chr)) throw new $SyntaxError("Bad control character in string literal at: " + i);
          value += chr;
          i++;
        }
      }
      if (unterminated) throw new $SyntaxError("Unterminated string at: " + i);
      return { value, end: i };
    };
  }
});

// node_modules/core-js/internals/native-raw-json.js
var require_native_raw_json = __commonJS({
  "node_modules/core-js/internals/native-raw-json.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = !fails11(function() {
      var unsafeInt = "9007199254740993";
      var raw = JSON.rawJSON(unsafeInt);
      return !JSON.isRawJSON(raw) || JSON.stringify(raw) !== unsafeInt;
    });
  }
});

// node_modules/core-js/modules/es.json.stringify.js
var require_es_json_stringify = __commonJS({
  "node_modules/core-js/modules/es.json.stringify.js"() {
    "use strict";
    var $27 = require_export();
    var getBuiltIn2 = require_get_built_in();
    var apply4 = require_function_apply();
    var call5 = require_function_call();
    var uncurryThis12 = require_function_uncurry_this();
    var fails11 = require_fails();
    var isArray4 = require_is_array();
    var isCallable3 = require_is_callable();
    var isRawJSON = require_is_raw_json();
    var isSymbol2 = require_is_symbol();
    var classof = require_classof_raw();
    var toString9 = require_to_string();
    var arraySlice = require_array_slice();
    var parseJSONString = require_parse_json_string();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var NATIVE_RAW_JSON = require_native_raw_json();
    var $String = String;
    var $stringify = getBuiltIn2("JSON", "stringify");
    var exec = uncurryThis12(/./.exec);
    var charAt2 = uncurryThis12("".charAt);
    var charCodeAt2 = uncurryThis12("".charCodeAt);
    var replace = uncurryThis12("".replace);
    var slice2 = uncurryThis12("".slice);
    var push4 = uncurryThis12([].push);
    var numberToString = uncurryThis12(1.1.toString);
    var surrogates = /[\uD800-\uDFFF]/g;
    var leadingSurrogates = /^[\uD800-\uDBFF]$/;
    var trailingSurrogates = /^[\uDC00-\uDFFF]$/;
    var MARK = uid();
    var MARK_LENGTH = MARK.length;
    var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails11(function() {
      var symbol = getBuiltIn2("Symbol")("stringify detection");
      return $stringify([symbol]) !== "[null]" || $stringify({ a: symbol }) !== "{}" || $stringify(Object(symbol)) !== "{}";
    });
    var ILL_FORMED_UNICODE = fails11(function() {
      return $stringify("\uDF06\uD834") !== '"\\udf06\\ud834"' || $stringify("\uDEAD") !== '"\\udead"';
    });
    var stringifyWithProperSymbolsConversion = WRONG_SYMBOLS_CONVERSION ? function(it, replacer) {
      var args = arraySlice(arguments);
      var $replacer = getReplacerFunction(replacer);
      if (!isCallable3($replacer) && (it === void 0 || isSymbol2(it))) return;
      args[1] = function(key, value) {
        if (isCallable3($replacer)) value = call5($replacer, this, $String(key), value);
        if (!isSymbol2(value)) return value;
      };
      return apply4($stringify, null, args);
    } : $stringify;
    var fixIllFormedJSON = function(match, offset, string) {
      var prev = charAt2(string, offset - 1);
      var next2 = charAt2(string, offset + 1);
      if (exec(leadingSurrogates, match) && !exec(trailingSurrogates, next2) || exec(trailingSurrogates, match) && !exec(leadingSurrogates, prev)) {
        return "\\u" + numberToString(charCodeAt2(match, 0), 16);
      }
      return match;
    };
    var getReplacerFunction = function(replacer) {
      if (isCallable3(replacer)) return replacer;
      if (!isArray4(replacer)) return;
      var rawLength = replacer.length;
      var keys2 = [];
      for (var i = 0; i < rawLength; i++) {
        var element = replacer[i];
        if (typeof element == "string") push4(keys2, element);
        else if (typeof element == "number" || classof(element) === "Number" || classof(element) === "String") push4(keys2, toString9(element));
      }
      var keysLength = keys2.length;
      var root = true;
      return function(key, value) {
        if (root) {
          root = false;
          return value;
        }
        if (isArray4(this)) return value;
        for (var j = 0; j < keysLength; j++) if (keys2[j] === key) return value;
      };
    };
    if ($stringify) $27({ target: "JSON", stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE || !NATIVE_RAW_JSON }, {
      stringify: function stringify(text, replacer, space) {
        var replacerFunction = getReplacerFunction(replacer);
        var rawStrings = [];
        var json = stringifyWithProperSymbolsConversion(text, function(key, value) {
          var v = isCallable3(replacerFunction) ? call5(replacerFunction, this, $String(key), value) : value;
          return !NATIVE_RAW_JSON && isRawJSON(v) ? MARK + (push4(rawStrings, v.rawJSON) - 1) : v;
        }, space);
        if (typeof json != "string") return json;
        if (ILL_FORMED_UNICODE) json = replace(json, surrogates, fixIllFormedJSON);
        if (NATIVE_RAW_JSON) return json;
        var result = "";
        var length = json.length;
        for (var i = 0; i < length; i++) {
          var chr = charAt2(json, i);
          if (chr === '"') {
            var end = parseJSONString(json, ++i).end - 1;
            var string = slice2(json, i, end);
            result += slice2(string, 0, MARK_LENGTH) === MARK ? rawStrings[slice2(string, MARK_LENGTH)] : '"' + string + '"';
            i = end;
          } else result += chr;
        }
        return result;
      }
    });
  }
});

// node_modules/core-js/modules/es.object.get-own-property-symbols.js
var require_es_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/modules/es.object.get-own-property-symbols.js"() {
    "use strict";
    var $27 = require_export();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var fails11 = require_fails();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var toObject3 = require_to_object();
    var FORCED8 = !NATIVE_SYMBOL || fails11(function() {
      getOwnPropertySymbolsModule.f(1);
    });
    $27({ target: "Object", stat: true, forced: FORCED8 }, {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject3(it)) : [];
      }
    });
  }
});

// node_modules/core-js/internals/array-for-each.js
var require_array_for_each = __commonJS({
  "node_modules/core-js/internals/array-for-each.js"(exports, module) {
    "use strict";
    var $forEach = require_array_iteration().forEach;
    var arrayMethodIsStrict6 = require_array_method_is_strict();
    var STRICT_METHOD3 = arrayMethodIsStrict6("forEach");
    module.exports = !STRICT_METHOD3 ? function forEach3(callbackfn) {
      return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    } : [].forEach;
  }
});

// node_modules/core-js/internals/dom-iterables.js
var require_dom_iterables = __commonJS({
  "node_modules/core-js/internals/dom-iterables.js"(exports, module) {
    "use strict";
    module.exports = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };
  }
});

// node_modules/core-js/internals/dom-token-list-prototype.js
var require_dom_token_list_prototype = __commonJS({
  "node_modules/core-js/internals/dom-token-list-prototype.js"(exports, module) {
    "use strict";
    var documentCreateElement = require_document_create_element();
    var classList = documentCreateElement("span").classList;
    var DOMTokenListPrototype3 = classList && classList.constructor && classList.constructor.prototype;
    module.exports = DOMTokenListPrototype3 === Object.prototype ? void 0 : DOMTokenListPrototype3;
  }
});

// node_modules/@babel/runtime/helpers/OverloadYield.js
var require_OverloadYield = __commonJS({
  "node_modules/@babel/runtime/helpers/OverloadYield.js"(exports, module) {
    function _OverloadYield(e, d) {
      this.v = e, this.k = d;
    }
    module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorDefine.js
var require_regeneratorDefine = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorDefine.js"(exports, module) {
    function _regeneratorDefine(e, r, n, t) {
      var i = Object.defineProperty;
      try {
        i({}, "", {});
      } catch (e2) {
        i = 0;
      }
      module.exports = _regeneratorDefine = function regeneratorDefine(e2, r2, n2, t2) {
        function o(r3, n3) {
          _regeneratorDefine(e2, r3, function(e3) {
            return this._invoke(r3, n3, e3);
          });
        }
        r2 ? i ? i(e2, r2, {
          value: n2,
          enumerable: !t2,
          configurable: !t2,
          writable: !t2
        }) : e2[r2] = n2 : (o("next", 0), o("throw", 1), o("return", 2));
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
    }
    module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regenerator.js
var require_regenerator = __commonJS({
  "node_modules/@babel/runtime/helpers/regenerator.js"(exports, module) {
    var regeneratorDefine = require_regeneratorDefine();
    function _regenerator() {
      var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag";
      function i(r2, n2, o2, i2) {
        var c3 = n2 && n2.prototype instanceof Generator ? n2 : Generator, u2 = Object.create(c3.prototype);
        return regeneratorDefine(u2, "_invoke", (function(r3, n3, o3) {
          var i3, c4, u3, f2 = 0, p = o3 || [], y = false, G = {
            p: 0,
            n: 0,
            v: e,
            a: d,
            f: d.bind(e, 4),
            d: function d2(t2, r4) {
              return i3 = t2, c4 = 0, u3 = e, G.n = r4, a;
            }
          };
          function d(r4, n4) {
            for (c4 = r4, u3 = n4, t = 0; !y && f2 && !o4 && t < p.length; t++) {
              var o4, i4 = p[t], d2 = G.p, l = i4[2];
              r4 > 3 ? (o4 = l === n4) && (u3 = i4[(c4 = i4[4]) ? 5 : (c4 = 3, 3)], i4[4] = i4[5] = e) : i4[0] <= d2 && ((o4 = r4 < 2 && d2 < i4[1]) ? (c4 = 0, G.v = n4, G.n = i4[1]) : d2 < l && (o4 = r4 < 3 || i4[0] > n4 || n4 > l) && (i4[4] = r4, i4[5] = n4, G.n = l, c4 = 0));
            }
            if (o4 || r4 > 1) return a;
            throw y = true, n4;
          }
          return function(o4, p2, l) {
            if (f2 > 1) throw TypeError("Generator is already running");
            for (y && 1 === p2 && d(p2, l), c4 = p2, u3 = l; (t = c4 < 2 ? e : u3) || !y; ) {
              i3 || (c4 ? c4 < 3 ? (c4 > 1 && (G.n = -1), d(c4, u3)) : G.n = u3 : G.v = u3);
              try {
                if (f2 = 2, i3) {
                  if (c4 || (o4 = "next"), t = i3[o4]) {
                    if (!(t = t.call(i3, u3))) throw TypeError("iterator result is not an object");
                    if (!t.done) return t;
                    u3 = t.value, c4 < 2 && (c4 = 0);
                  } else 1 === c4 && (t = i3["return"]) && t.call(i3), c4 < 2 && (u3 = TypeError("The iterator does not provide a '" + o4 + "' method"), c4 = 1);
                  i3 = e;
                } else if ((t = (y = G.n < 0) ? u3 : r3.call(n3, G)) !== a) break;
              } catch (t2) {
                i3 = e, c4 = 1, u3 = t2;
              } finally {
                f2 = 1;
              }
            }
            return {
              value: t,
              done: y
            };
          };
        })(r2, o2, i2), true), u2;
      }
      var a = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      t = Object.getPrototypeOf;
      var c2 = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function() {
        return this;
      }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c2);
      function f(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, GeneratorFunctionPrototype) : (e2.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e2, o, "GeneratorFunction")), e2.prototype = Object.create(u), e2;
      }
      return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function() {
        return this;
      }), regeneratorDefine(u, "toString", function() {
        return "[object Generator]";
      }), (module.exports = _regenerator = function _regenerator2() {
        return {
          w: i,
          m: f
        };
      }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
    }
    module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js
var require_regeneratorAsyncIterator = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js"(exports, module) {
    var OverloadYield = require_OverloadYield();
    var regeneratorDefine = require_regeneratorDefine();
    function AsyncIterator(t, e) {
      function n(r2, o, i, f) {
        try {
          var c2 = t[r2](o), u = c2.value;
          return u instanceof OverloadYield ? e.resolve(u.v).then(function(t2) {
            n("next", t2, i, f);
          }, function(t2) {
            n("throw", t2, i, f);
          }) : e.resolve(u).then(function(t2) {
            c2.value = t2, i(c2);
          }, function(t2) {
            return n("throw", t2, i, f);
          });
        } catch (t2) {
          f(t2);
        }
      }
      var r;
      this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function() {
        return this;
      })), regeneratorDefine(this, "_invoke", function(t2, o, i) {
        function f() {
          return new e(function(e2, r2) {
            n(t2, i, e2, r2);
          });
        }
        return r = r ? r.then(f, f) : f();
      }, true);
    }
    module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js
var require_regeneratorAsyncGen = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js"(exports, module) {
    var regenerator = require_regenerator();
    var regeneratorAsyncIterator = require_regeneratorAsyncIterator();
    function _regeneratorAsyncGen(r, e, t, o, n) {
      return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
    }
    module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorAsync.js
var require_regeneratorAsync = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorAsync.js"(exports, module) {
    var regeneratorAsyncGen = require_regeneratorAsyncGen();
    function _regeneratorAsync(n, e, r, t, o) {
      var a = regeneratorAsyncGen(n, e, r, t, o);
      return a.next().then(function(n2) {
        return n2.done ? n2.value : a.next();
      });
    }
    module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorKeys.js
var require_regeneratorKeys = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorKeys.js"(exports, module) {
    function _regeneratorKeys(e) {
      var n = Object(e), r = [];
      for (var t in n) r.unshift(t);
      return function e2() {
        for (; r.length; ) if ((t = r.pop()) in n) return e2.value = t, e2.done = false, e2;
        return e2.done = true, e2;
      };
    }
    module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS({
  "node_modules/@babel/runtime/helpers/typeof.js"(exports, module) {
    function _typeof3(o) {
      "@babel/helpers - typeof";
      return module.exports = _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof3(o);
    }
    module.exports = _typeof3, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorValues.js
var require_regeneratorValues = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorValues.js"(exports, module) {
    var _typeof3 = require_typeof()["default"];
    function _regeneratorValues(e) {
      if (null != e) {
        var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0;
        if (t) return t.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) return {
          next: function next2() {
            return e && r >= e.length && (e = void 0), {
              value: e && e[r++],
              done: !e
            };
          }
        };
      }
      throw new TypeError(_typeof3(e) + " is not iterable");
    }
    module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/regeneratorRuntime.js
var require_regeneratorRuntime = __commonJS({
  "node_modules/@babel/runtime/helpers/regeneratorRuntime.js"(exports, module) {
    var OverloadYield = require_OverloadYield();
    var regenerator = require_regenerator();
    var regeneratorAsync = require_regeneratorAsync();
    var regeneratorAsyncGen = require_regeneratorAsyncGen();
    var regeneratorAsyncIterator = require_regeneratorAsyncIterator();
    var regeneratorKeys = require_regeneratorKeys();
    var regeneratorValues = require_regeneratorValues();
    function _regeneratorRuntime2() {
      "use strict";
      var r = regenerator(), e = r.m(_regeneratorRuntime2), t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
      function n(r2) {
        var e2 = "function" == typeof r2 && r2.constructor;
        return !!e2 && (e2 === t || "GeneratorFunction" === (e2.displayName || e2.name));
      }
      var o = {
        "throw": 1,
        "return": 2,
        "break": 3,
        "continue": 3
      };
      function a(r2) {
        var e2, t2;
        return function(n2) {
          e2 || (e2 = {
            stop: function stop() {
              return t2(n2.a, 2);
            },
            "catch": function _catch() {
              return n2.v;
            },
            abrupt: function abrupt(r3, e3) {
              return t2(n2.a, o[r3], e3);
            },
            delegateYield: function delegateYield(r3, o2, a2) {
              return e2.resultName = o2, t2(n2.d, regeneratorValues(r3), a2);
            },
            finish: function finish(r3) {
              return t2(n2.f, r3);
            }
          }, t2 = function t3(r3, _t, o2) {
            n2.p = e2.prev, n2.n = e2.next;
            try {
              return r3(_t, o2);
            } finally {
              e2.next = n2.n;
            }
          }), e2.resultName && (e2[e2.resultName] = n2.v, e2.resultName = void 0), e2.sent = n2.v, e2.next = n2.n;
          try {
            return r2.call(this, e2);
          } finally {
            n2.p = e2.prev, n2.n = e2.next;
          }
        };
      }
      return (module.exports = _regeneratorRuntime2 = function _regeneratorRuntime3() {
        return {
          wrap: function wrap(e2, t2, n2, o2) {
            return r.w(a(e2), t2, n2, o2 && o2.reverse());
          },
          isGeneratorFunction: n,
          mark: r.m,
          awrap: function awrap(r2, e2) {
            return new OverloadYield(r2, e2);
          },
          AsyncIterator: regeneratorAsyncIterator,
          async: function async(r2, e2, t2, o2, u) {
            return (n(e2) ? regeneratorAsyncGen : regeneratorAsync)(a(r2), e2, t2, o2, u);
          },
          keys: regeneratorKeys,
          values: regeneratorValues
        };
      }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
    }
    module.exports = _regeneratorRuntime2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/regenerator/index.js
var require_regenerator2 = __commonJS({
  "node_modules/@babel/runtime/regenerator/index.js"(exports, module) {
    var runtime = require_regeneratorRuntime()();
    module.exports = runtime;
    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    }
  }
});

// node_modules/core-js/internals/does-not-exceed-safe-integer.js
var require_does_not_exceed_safe_integer = __commonJS({
  "node_modules/core-js/internals/does-not-exceed-safe-integer.js"(exports, module) {
    "use strict";
    var $TypeError = TypeError;
    var MAX_SAFE_INTEGER = 9007199254740991;
    module.exports = function(it) {
      if (it > MAX_SAFE_INTEGER) throw new $TypeError("Maximum allowed index exceeded");
      return it;
    };
  }
});

// node_modules/core-js/internals/array-set-length.js
var require_array_set_length = __commonJS({
  "node_modules/core-js/internals/array-set-length.js"(exports, module) {
    "use strict";
    var DESCRIPTORS6 = require_descriptors();
    var isArray4 = require_is_array();
    var $TypeError = TypeError;
    var getOwnPropertyDescriptor5 = Object.getOwnPropertyDescriptor;
    var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS6 && !(function() {
      if (this !== void 0) return true;
      try {
        Object.defineProperty([], "length", { writable: false }).length = 1;
      } catch (error) {
        return error instanceof TypeError;
      }
    })();
    module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function(O, length) {
      if (isArray4(O) && !getOwnPropertyDescriptor5(O, "length").writable) {
        throw new $TypeError("Cannot set read only .length");
      }
      return O.length = length;
    } : function(O, length) {
      return O.length = length;
    };
  }
});

// node_modules/core-js/internals/array-reduce.js
var require_array_reduce = __commonJS({
  "node_modules/core-js/internals/array-reduce.js"(exports, module) {
    "use strict";
    var aCallable2 = require_a_callable();
    var toObject3 = require_to_object();
    var IndexedObject2 = require_indexed_object();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var $TypeError = TypeError;
    var REDUCE_EMPTY = "Reduce of empty array with no initial value";
    var createMethod = function(IS_RIGHT) {
      return function(that, callbackfn, argumentsLength, memo) {
        var O = toObject3(that);
        var self2 = IndexedObject2(O);
        var length = lengthOfArrayLike3(O);
        aCallable2(callbackfn);
        if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
        var index2 = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) while (true) {
          if (index2 in self2) {
            memo = self2[index2];
            index2 += i;
            break;
          }
          index2 += i;
          if (IS_RIGHT ? index2 < 0 : length <= index2) {
            throw new $TypeError(REDUCE_EMPTY);
          }
        }
        for (; IS_RIGHT ? index2 >= 0 : length > index2; index2 += i) if (index2 in self2) {
          memo = callbackfn(memo, self2[index2], index2, O);
        }
        return memo;
      };
    };
    module.exports = {
      // `Array.prototype.reduce` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduce
      left: createMethod(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduceright
      right: createMethod(true)
    };
  }
});

// node_modules/core-js/internals/environment.js
var require_environment = __commonJS({
  "node_modules/core-js/internals/environment.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var userAgent = require_environment_user_agent();
    var classof = require_classof_raw();
    var userAgentStartsWith = function(string) {
      return userAgent.slice(0, string.length) === string;
    };
    module.exports = (function() {
      if (userAgentStartsWith("Bun/")) return "BUN";
      if (userAgentStartsWith("Cloudflare-Workers")) return "CLOUDFLARE";
      if (userAgentStartsWith("Deno/")) return "DENO";
      if (userAgentStartsWith("Node.js/")) return "NODE";
      if (globalThis6.Bun && typeof Bun.version == "string") return "BUN";
      if (globalThis6.Deno && typeof Deno.version == "object") return "DENO";
      if (classof(globalThis6.process) === "process") return "NODE";
      if (globalThis6.window && globalThis6.document) return "BROWSER";
      return "REST";
    })();
  }
});

// node_modules/core-js/internals/environment-is-node.js
var require_environment_is_node = __commonJS({
  "node_modules/core-js/internals/environment-is-node.js"(exports, module) {
    "use strict";
    var ENVIRONMENT = require_environment();
    module.exports = ENVIRONMENT === "NODE";
  }
});

// node_modules/core-js/internals/object-to-string.js
var require_object_to_string = __commonJS({
  "node_modules/core-js/internals/object-to-string.js"(exports, module) {
    "use strict";
    var TO_STRING_TAG_SUPPORT2 = require_to_string_tag_support();
    var classof = require_classof();
    module.exports = TO_STRING_TAG_SUPPORT2 ? {}.toString : function toString9() {
      return "[object " + classof(this) + "]";
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this-accessor.js
var require_function_uncurry_this_accessor = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this-accessor.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var aCallable2 = require_a_callable();
    module.exports = function(object, key, method) {
      try {
        return uncurryThis12(aCallable2(Object.getOwnPropertyDescriptor(object, key)[method]));
      } catch (error) {
      }
    };
  }
});

// node_modules/core-js/internals/is-possible-prototype.js
var require_is_possible_prototype = __commonJS({
  "node_modules/core-js/internals/is-possible-prototype.js"(exports, module) {
    "use strict";
    var isObject7 = require_is_object();
    module.exports = function(argument) {
      return isObject7(argument) || argument === null;
    };
  }
});

// node_modules/core-js/internals/a-possible-prototype.js
var require_a_possible_prototype = __commonJS({
  "node_modules/core-js/internals/a-possible-prototype.js"(exports, module) {
    "use strict";
    var isPossiblePrototype = require_is_possible_prototype();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isPossiblePrototype(argument)) return argument;
      throw new $TypeError("Can't set " + $String(argument) + " as a prototype");
    };
  }
});

// node_modules/core-js/internals/object-set-prototype-of.js
var require_object_set_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-set-prototype-of.js"(exports, module) {
    "use strict";
    var uncurryThisAccessor = require_function_uncurry_this_accessor();
    var isObject7 = require_is_object();
    var requireObjectCoercible6 = require_require_object_coercible();
    var aPossiblePrototype = require_a_possible_prototype();
    module.exports = Object.setPrototypeOf || ("__proto__" in {} ? (function() {
      var CORRECT_SETTER = false;
      var test2 = {};
      var setter;
      try {
        setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
        setter(test2, []);
        CORRECT_SETTER = test2 instanceof Array;
      } catch (error) {
      }
      return function setPrototypeOf(O, proto) {
        requireObjectCoercible6(O);
        aPossiblePrototype(proto);
        if (!isObject7(O)) return O;
        if (CORRECT_SETTER) setter(O, proto);
        else O.__proto__ = proto;
        return O;
      };
    })() : void 0);
  }
});

// node_modules/core-js/internals/set-species.js
var require_set_species = __commonJS({
  "node_modules/core-js/internals/set-species.js"(exports, module) {
    "use strict";
    var getBuiltIn2 = require_get_built_in();
    var defineBuiltInAccessor3 = require_define_built_in_accessor();
    var wellKnownSymbol5 = require_well_known_symbol();
    var DESCRIPTORS6 = require_descriptors();
    var SPECIES2 = wellKnownSymbol5("species");
    module.exports = function(CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn2(CONSTRUCTOR_NAME);
      if (DESCRIPTORS6 && Constructor && !Constructor[SPECIES2]) {
        defineBuiltInAccessor3(Constructor, SPECIES2, {
          configurable: true,
          get: function() {
            return this;
          }
        });
      }
    };
  }
});

// node_modules/core-js/internals/an-instance.js
var require_an_instance = __commonJS({
  "node_modules/core-js/internals/an-instance.js"(exports, module) {
    "use strict";
    var isPrototypeOf3 = require_object_is_prototype_of();
    var $TypeError = TypeError;
    module.exports = function(it, Prototype) {
      if (isPrototypeOf3(Prototype, it)) return it;
      throw new $TypeError("Incorrect invocation");
    };
  }
});

// node_modules/core-js/internals/a-constructor.js
var require_a_constructor = __commonJS({
  "node_modules/core-js/internals/a-constructor.js"(exports, module) {
    "use strict";
    var isConstructor2 = require_is_constructor();
    var tryToString = require_try_to_string();
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isConstructor2(argument)) return argument;
      throw new $TypeError(tryToString(argument) + " is not a constructor");
    };
  }
});

// node_modules/core-js/internals/species-constructor.js
var require_species_constructor = __commonJS({
  "node_modules/core-js/internals/species-constructor.js"(exports, module) {
    "use strict";
    var anObject9 = require_an_object();
    var aConstructor2 = require_a_constructor();
    var isNullOrUndefined = require_is_null_or_undefined();
    var wellKnownSymbol5 = require_well_known_symbol();
    var SPECIES2 = wellKnownSymbol5("species");
    module.exports = function(O, defaultConstructor) {
      var C = anObject9(O).constructor;
      var S;
      return C === void 0 || isNullOrUndefined(S = anObject9(C)[SPECIES2]) ? defaultConstructor : aConstructor2(S);
    };
  }
});

// node_modules/core-js/internals/validate-arguments-length.js
var require_validate_arguments_length = __commonJS({
  "node_modules/core-js/internals/validate-arguments-length.js"(exports, module) {
    "use strict";
    var $TypeError = TypeError;
    module.exports = function(passed, required) {
      if (passed < required) throw new $TypeError("Not enough arguments");
      return passed;
    };
  }
});

// node_modules/core-js/internals/environment-is-ios.js
var require_environment_is_ios = __commonJS({
  "node_modules/core-js/internals/environment-is-ios.js"(exports, module) {
    "use strict";
    var userAgent = require_environment_user_agent();
    module.exports = /ipad|iphone|ipod/i.test(userAgent) && /applewebkit/i.test(userAgent);
  }
});

// node_modules/core-js/internals/task.js
var require_task = __commonJS({
  "node_modules/core-js/internals/task.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var apply4 = require_function_apply();
    var bind2 = require_function_bind_context();
    var isCallable3 = require_is_callable();
    var hasOwn3 = require_has_own_property();
    var fails11 = require_fails();
    var html = require_html();
    var arraySlice = require_array_slice();
    var createElement = require_document_create_element();
    var validateArgumentsLength = require_validate_arguments_length();
    var IS_IOS = require_environment_is_ios();
    var IS_NODE2 = require_environment_is_node();
    var set = globalThis6.setImmediate;
    var clear = globalThis6.clearImmediate;
    var process2 = globalThis6.process;
    var Dispatch = globalThis6.Dispatch;
    var Function2 = globalThis6.Function;
    var MessageChannel = globalThis6.MessageChannel;
    var String2 = globalThis6.String;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = "onreadystatechange";
    var $location;
    var defer;
    var channel;
    var port;
    fails11(function() {
      $location = globalThis6.location;
    });
    var run = function(id) {
      if (hasOwn3(queue, id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var runner = function(id) {
      return function() {
        run(id);
      };
    };
    var eventListener = function(event2) {
      run(event2.data);
    };
    var globalPostMessageDefer = function(id) {
      globalThis6.postMessage(String2(id), $location.protocol + "//" + $location.host);
    };
    if (!set || !clear) {
      set = function setImmediate(handler) {
        validateArgumentsLength(arguments.length, 1);
        var fn = isCallable3(handler) ? handler : Function2(handler);
        var args = arraySlice(arguments, 1);
        queue[++counter] = function() {
          apply4(fn, void 0, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      if (IS_NODE2) {
        defer = function(id) {
          process2.nextTick(runner(id));
        };
      } else if (Dispatch && Dispatch.now) {
        defer = function(id) {
          Dispatch.now(runner(id));
        };
      } else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = eventListener;
        defer = bind2(port.postMessage, port);
      } else if (globalThis6.addEventListener && isCallable3(globalThis6.postMessage) && !globalThis6.importScripts && $location && $location.protocol !== "file:" && !fails11(globalPostMessageDefer)) {
        defer = globalPostMessageDefer;
        globalThis6.addEventListener("message", eventListener, false);
      } else if (ONREADYSTATECHANGE in createElement("script")) {
        defer = function(id) {
          html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(runner(id), 0);
        };
      }
    }
    module.exports = {
      set,
      clear
    };
  }
});

// node_modules/core-js/internals/safe-get-built-in.js
var require_safe_get_built_in = __commonJS({
  "node_modules/core-js/internals/safe-get-built-in.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var DESCRIPTORS6 = require_descriptors();
    var getOwnPropertyDescriptor5 = Object.getOwnPropertyDescriptor;
    module.exports = function(name) {
      if (!DESCRIPTORS6) return globalThis6[name];
      var descriptor = getOwnPropertyDescriptor5(globalThis6, name);
      return descriptor && descriptor.value;
    };
  }
});

// node_modules/core-js/internals/queue.js
var require_queue = __commonJS({
  "node_modules/core-js/internals/queue.js"(exports, module) {
    "use strict";
    var Queue = function() {
      this.head = null;
      this.tail = null;
    };
    Queue.prototype = {
      add: function(item) {
        var entry = { item, next: null };
        var tail = this.tail;
        if (tail) tail.next = entry;
        else this.head = entry;
        this.tail = entry;
      },
      get: function() {
        var entry = this.head;
        if (entry) {
          var next2 = this.head = entry.next;
          if (next2 === null) this.tail = null;
          return entry.item;
        }
      }
    };
    module.exports = Queue;
  }
});

// node_modules/core-js/internals/environment-is-ios-pebble.js
var require_environment_is_ios_pebble = __commonJS({
  "node_modules/core-js/internals/environment-is-ios-pebble.js"(exports, module) {
    "use strict";
    var userAgent = require_environment_user_agent();
    module.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != "undefined";
  }
});

// node_modules/core-js/internals/environment-is-webos-webkit.js
var require_environment_is_webos_webkit = __commonJS({
  "node_modules/core-js/internals/environment-is-webos-webkit.js"(exports, module) {
    "use strict";
    var userAgent = require_environment_user_agent();
    module.exports = /web0s(?!.*chrome)/i.test(userAgent);
  }
});

// node_modules/core-js/internals/microtask.js
var require_microtask = __commonJS({
  "node_modules/core-js/internals/microtask.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var safeGetBuiltIn = require_safe_get_built_in();
    var bind2 = require_function_bind_context();
    var macrotask = require_task().set;
    var Queue = require_queue();
    var IS_IOS = require_environment_is_ios();
    var IS_IOS_PEBBLE = require_environment_is_ios_pebble();
    var IS_WEBOS_WEBKIT = require_environment_is_webos_webkit();
    var IS_NODE2 = require_environment_is_node();
    var MutationObserver = globalThis6.MutationObserver || globalThis6.WebKitMutationObserver;
    var document2 = globalThis6.document;
    var process2 = globalThis6.process;
    var Promise2 = globalThis6.Promise;
    var microtask = safeGetBuiltIn("queueMicrotask");
    var notify;
    var toggle;
    var node2;
    var promise;
    var then;
    if (!microtask) {
      queue = new Queue();
      flush = function() {
        var parent, fn;
        if (IS_NODE2 && (parent = process2.domain)) parent.exit();
        while (fn = queue.get()) try {
          fn();
        } catch (error) {
          if (queue.head) notify();
          throw error;
        }
        if (parent) parent.enter();
      };
      if (!IS_IOS && !IS_NODE2 && !IS_WEBOS_WEBKIT && MutationObserver && document2) {
        toggle = true;
        node2 = document2.createTextNode("");
        new MutationObserver(flush).observe(node2, { characterData: true });
        notify = function() {
          node2.data = toggle = !toggle;
        };
      } else if (!IS_IOS_PEBBLE && Promise2 && Promise2.resolve) {
        promise = Promise2.resolve(void 0);
        promise.constructor = Promise2;
        then = bind2(promise.then, promise);
        notify = function() {
          then(flush);
        };
      } else if (IS_NODE2) {
        notify = function() {
          process2.nextTick(flush);
        };
      } else {
        macrotask = bind2(macrotask, globalThis6);
        notify = function() {
          macrotask(flush);
        };
      }
      microtask = function(fn) {
        if (!queue.head) notify();
        queue.add(fn);
      };
    }
    var queue;
    var flush;
    module.exports = microtask;
  }
});

// node_modules/core-js/internals/host-report-errors.js
var require_host_report_errors = __commonJS({
  "node_modules/core-js/internals/host-report-errors.js"(exports, module) {
    "use strict";
    module.exports = function(a, b) {
      try {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      } catch (error) {
      }
    };
  }
});

// node_modules/core-js/internals/perform.js
var require_perform = __commonJS({
  "node_modules/core-js/internals/perform.js"(exports, module) {
    "use strict";
    module.exports = function(exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };
  }
});

// node_modules/core-js/internals/promise-native-constructor.js
var require_promise_native_constructor = __commonJS({
  "node_modules/core-js/internals/promise-native-constructor.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    module.exports = globalThis6.Promise;
  }
});

// node_modules/core-js/internals/promise-constructor-detection.js
var require_promise_constructor_detection = __commonJS({
  "node_modules/core-js/internals/promise-constructor-detection.js"(exports, module) {
    "use strict";
    var globalThis6 = require_global_this();
    var NativePromiseConstructor = require_promise_native_constructor();
    var isCallable3 = require_is_callable();
    var isForced2 = require_is_forced();
    var inspectSource = require_inspect_source();
    var wellKnownSymbol5 = require_well_known_symbol();
    var ENVIRONMENT = require_environment();
    var IS_PURE3 = require_is_pure();
    var V8_VERSION2 = require_environment_v8_version();
    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
    var SPECIES2 = wellKnownSymbol5("species");
    var SUBCLASSING = false;
    var NATIVE_PROMISE_REJECTION_EVENT = isCallable3(globalThis6.PromiseRejectionEvent);
    var FORCED_PROMISE_CONSTRUCTOR = isForced2("Promise", function() {
      var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
      var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
      if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION2 === 66) return true;
      if (IS_PURE3 && !(NativePromisePrototype["catch"] && NativePromisePrototype["finally"])) return true;
      if (!V8_VERSION2 || V8_VERSION2 < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
        var promise = new NativePromiseConstructor(function(resolve) {
          resolve(1);
        });
        var FakePromise = function(exec) {
          exec(function() {
          }, function() {
          });
        };
        var constructor = promise.constructor = {};
        constructor[SPECIES2] = FakePromise;
        SUBCLASSING = promise.then(function() {
        }) instanceof FakePromise;
        if (!SUBCLASSING) return true;
      }
      return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === "BROWSER" || ENVIRONMENT === "DENO") && !NATIVE_PROMISE_REJECTION_EVENT;
    });
    module.exports = {
      CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
      REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
      SUBCLASSING
    };
  }
});

// node_modules/core-js/internals/new-promise-capability.js
var require_new_promise_capability = __commonJS({
  "node_modules/core-js/internals/new-promise-capability.js"(exports, module) {
    "use strict";
    var aCallable2 = require_a_callable();
    var $TypeError = TypeError;
    var PromiseCapability = function(C) {
      var resolve, reject;
      this.promise = new C(function($$resolve, $$reject) {
        if (resolve !== void 0 || reject !== void 0) throw new $TypeError("Bad Promise constructor");
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aCallable2(resolve);
      this.reject = aCallable2(reject);
    };
    module.exports.f = function(C) {
      return new PromiseCapability(C);
    };
  }
});

// node_modules/core-js/modules/es.promise.constructor.js
var require_es_promise_constructor = __commonJS({
  "node_modules/core-js/modules/es.promise.constructor.js"() {
    "use strict";
    var $27 = require_export();
    var IS_PURE3 = require_is_pure();
    var IS_NODE2 = require_environment_is_node();
    var globalThis6 = require_global_this();
    var path2 = require_path();
    var call5 = require_function_call();
    var defineBuiltIn3 = require_define_built_in();
    var setPrototypeOf = require_object_set_prototype_of();
    var setToStringTag2 = require_set_to_string_tag();
    var setSpecies = require_set_species();
    var aCallable2 = require_a_callable();
    var isCallable3 = require_is_callable();
    var isObject7 = require_is_object();
    var anInstance = require_an_instance();
    var speciesConstructor2 = require_species_constructor();
    var task = require_task().set;
    var microtask = require_microtask();
    var hostReportErrors = require_host_report_errors();
    var perform = require_perform();
    var Queue = require_queue();
    var InternalStateModule2 = require_internal_state();
    var NativePromiseConstructor = require_promise_native_constructor();
    var PromiseConstructorDetection = require_promise_constructor_detection();
    var newPromiseCapabilityModule = require_new_promise_capability();
    var PROMISE = "Promise";
    var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
    var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
    var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
    var getInternalPromiseState = InternalStateModule2.getterFor(PROMISE);
    var setInternalState2 = InternalStateModule2.set;
    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
    var PromiseConstructor = NativePromiseConstructor;
    var PromisePrototype = NativePromisePrototype;
    var TypeError3 = globalThis6.TypeError;
    var document2 = globalThis6.document;
    var process2 = globalThis6.process;
    var newPromiseCapability = newPromiseCapabilityModule.f;
    var newGenericPromiseCapability = newPromiseCapability;
    var DISPATCH_EVENT = !!(document2 && document2.createEvent && globalThis6.dispatchEvent);
    var UNHANDLED_REJECTION = "unhandledrejection";
    var REJECTION_HANDLED = "rejectionhandled";
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var Internal;
    var OwnPromiseCapability;
    var PromiseWrapper;
    var nativeThen;
    var isThenable = function(it) {
      var then;
      return isObject7(it) && isCallable3(then = it.then) ? then : false;
    };
    var callReaction = function(reaction, state) {
      var value = state.value;
      var ok = state.state === FULFILLED;
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(new TypeError3("Promise-chain cycle"));
          } else if (then = isThenable(result)) {
            call5(then, result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    };
    var notify = function(state, isReject) {
      if (state.notified) return;
      state.notified = true;
      microtask(function() {
        var reactions = state.reactions;
        var reaction;
        while (reaction = reactions.get()) {
          callReaction(reaction, state);
        }
        state.notified = false;
        if (isReject && !state.rejection) onUnhandled(state);
      });
    };
    var dispatchEvent = function(name, promise, reason) {
      var event2, handler;
      if (DISPATCH_EVENT) {
        event2 = document2.createEvent("Event");
        event2.promise = promise;
        event2.reason = reason;
        event2.initEvent(name, false, true);
        globalThis6.dispatchEvent(event2);
      } else event2 = { promise, reason };
      if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis6["on" + name])) handler(event2);
      else if (name === UNHANDLED_REJECTION) hostReportErrors("Unhandled promise rejection", reason);
    };
    var onUnhandled = function(state) {
      call5(task, globalThis6, function() {
        var promise = state.facade;
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function() {
            if (IS_NODE2) {
              process2.emit("unhandledRejection", value, promise);
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
          });
          state.rejection = IS_NODE2 || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) throw result.value;
        }
      });
    };
    var isUnhandled = function(state) {
      return state.rejection !== HANDLED && !state.parent;
    };
    var onHandleUnhandled = function(state) {
      call5(task, globalThis6, function() {
        var promise = state.facade;
        if (IS_NODE2) {
          process2.emit("rejectionHandled", promise);
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
      });
    };
    var bind2 = function(fn, state, unwrap) {
      return function(value) {
        fn(state, value, unwrap);
      };
    };
    var internalReject = function(state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      state.value = value;
      state.state = REJECTED;
      notify(state, true);
    };
    var internalResolve = function(state, value, unwrap) {
      if (state.done) return;
      state.done = true;
      if (unwrap) state = unwrap;
      try {
        if (state.facade === value) throw new TypeError3("Promise can't be resolved itself");
        var then = isThenable(value);
        if (then) {
          microtask(function() {
            var wrapper = { done: false };
            try {
              call5(
                then,
                value,
                bind2(internalResolve, wrapper, state),
                bind2(internalReject, wrapper, state)
              );
            } catch (error) {
              internalReject(wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify(state, false);
        }
      } catch (error) {
        internalReject({ done: false }, error, state);
      }
    };
    if (FORCED_PROMISE_CONSTRUCTOR) {
      PromiseConstructor = function Promise2(executor) {
        anInstance(this, PromisePrototype);
        aCallable2(executor);
        call5(Internal, this);
        var state = getInternalPromiseState(this);
        try {
          executor(bind2(internalResolve, state), bind2(internalReject, state));
        } catch (error) {
          internalReject(state, error);
        }
      };
      PromisePrototype = PromiseConstructor.prototype;
      Internal = function Promise2(executor) {
        setInternalState2(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: new Queue(),
          rejection: false,
          state: PENDING,
          value: null
        });
      };
      Internal.prototype = defineBuiltIn3(PromisePrototype, "then", function then(onFulfilled, onRejected) {
        var state = getInternalPromiseState(this);
        var reaction = newPromiseCapability(speciesConstructor2(this, PromiseConstructor));
        state.parent = true;
        reaction.ok = isCallable3(onFulfilled) ? onFulfilled : true;
        reaction.fail = isCallable3(onRejected) && onRejected;
        reaction.domain = IS_NODE2 ? process2.domain : void 0;
        if (state.state === PENDING) state.reactions.add(reaction);
        else microtask(function() {
          callReaction(reaction, state);
        });
        return reaction.promise;
      });
      OwnPromiseCapability = function() {
        var promise = new Internal();
        var state = getInternalPromiseState(promise);
        this.promise = promise;
        this.resolve = bind2(internalResolve, state);
        this.reject = bind2(internalReject, state);
      };
      newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
        return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
      };
      if (!IS_PURE3 && isCallable3(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
        nativeThen = NativePromisePrototype.then;
        if (!NATIVE_PROMISE_SUBCLASSING) {
          defineBuiltIn3(NativePromisePrototype, "then", function then(onFulfilled, onRejected) {
            var that = this;
            return new PromiseConstructor(function(resolve, reject) {
              call5(nativeThen, that, resolve, reject);
            }).then(onFulfilled, onRejected);
          }, { unsafe: true });
        }
        try {
          delete NativePromisePrototype.constructor;
        } catch (error) {
        }
        if (setPrototypeOf) {
          setPrototypeOf(NativePromisePrototype, PromisePrototype);
        }
      }
    }
    $27({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
      Promise: PromiseConstructor
    });
    PromiseWrapper = path2.Promise;
    setToStringTag2(PromiseConstructor, PROMISE, false, true);
    setSpecies(PROMISE);
  }
});

// node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
  "node_modules/core-js/internals/iterators.js"(exports, module) {
    "use strict";
    module.exports = {};
  }
});

// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "node_modules/core-js/internals/is-array-iterator-method.js"(exports, module) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    var Iterators = require_iterators();
    var ITERATOR2 = wellKnownSymbol5("iterator");
    var ArrayPrototype = Array.prototype;
    module.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR2] === it);
    };
  }
});

// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "node_modules/core-js/internals/get-iterator-method.js"(exports, module) {
    "use strict";
    var classof = require_classof();
    var getMethod4 = require_get_method();
    var isNullOrUndefined = require_is_null_or_undefined();
    var Iterators = require_iterators();
    var wellKnownSymbol5 = require_well_known_symbol();
    var ITERATOR2 = wellKnownSymbol5("iterator");
    module.exports = function(it) {
      if (!isNullOrUndefined(it)) return getMethod4(it, ITERATOR2) || getMethod4(it, "@@iterator") || Iterators[classof(it)];
    };
  }
});

// node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
  "node_modules/core-js/internals/get-iterator.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var aCallable2 = require_a_callable();
    var anObject9 = require_an_object();
    var tryToString = require_try_to_string();
    var getIteratorMethod = require_get_iterator_method();
    var $TypeError = TypeError;
    module.exports = function(argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
      if (aCallable2(iteratorMethod)) return anObject9(call5(iteratorMethod, argument));
      throw new $TypeError(tryToString(argument) + " is not iterable");
    };
  }
});

// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "node_modules/core-js/internals/iterator-close.js"(exports, module) {
    "use strict";
    var call5 = require_function_call();
    var anObject9 = require_an_object();
    var getMethod4 = require_get_method();
    module.exports = function(iterator, kind, value) {
      var innerResult, innerError;
      anObject9(iterator);
      try {
        innerResult = getMethod4(iterator, "return");
        if (!innerResult) {
          if (kind === "throw") throw value;
          return value;
        }
        innerResult = call5(innerResult, iterator);
      } catch (error) {
        innerError = true;
        innerResult = error;
      }
      if (kind === "throw") throw value;
      if (innerError) throw innerResult;
      anObject9(innerResult);
      return value;
    };
  }
});

// node_modules/core-js/internals/iterate.js
var require_iterate = __commonJS({
  "node_modules/core-js/internals/iterate.js"(exports, module) {
    "use strict";
    var bind2 = require_function_bind_context();
    var call5 = require_function_call();
    var anObject9 = require_an_object();
    var tryToString = require_try_to_string();
    var isArrayIteratorMethod = require_is_array_iterator_method();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var isPrototypeOf3 = require_object_is_prototype_of();
    var getIterator = require_get_iterator();
    var getIteratorMethod = require_get_iterator_method();
    var iteratorClose = require_iterator_close();
    var $TypeError = TypeError;
    var Result = function(stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };
    var ResultPrototype = Result.prototype;
    module.exports = function(iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_RECORD = !!(options && options.IS_RECORD);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = bind2(unboundFunction, that);
      var iterator, iterFn, index2, length, result, next2, step;
      var stop = function(condition) {
        var $iterator = iterator;
        iterator = void 0;
        if ($iterator) iteratorClose($iterator, "normal");
        return new Result(true, condition);
      };
      var callFn = function(value2) {
        if (AS_ENTRIES) {
          anObject9(value2);
          return INTERRUPTED ? fn(value2[0], value2[1], stop) : fn(value2[0], value2[1]);
        }
        return INTERRUPTED ? fn(value2, stop) : fn(value2);
      };
      if (IS_RECORD) {
        iterator = iterable.iterator;
      } else if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn) throw new $TypeError(tryToString(iterable) + " is not iterable");
        if (isArrayIteratorMethod(iterFn)) {
          for (index2 = 0, length = lengthOfArrayLike3(iterable); length > index2; index2++) {
            result = callFn(iterable[index2]);
            if (result && isPrototypeOf3(ResultPrototype, result)) return result;
          }
          return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
      }
      next2 = IS_RECORD ? iterable.next : iterator.next;
      while (!(step = call5(next2, iterator)).done) {
        var value = step.value;
        try {
          result = callFn(value);
        } catch (error) {
          if (iterator) iteratorClose(iterator, "throw", error);
          else throw error;
        }
        if (typeof result == "object" && result && isPrototypeOf3(ResultPrototype, result)) return result;
      }
      return new Result(false);
    };
  }
});

// node_modules/core-js/internals/check-correctness-of-iteration.js
var require_check_correctness_of_iteration = __commonJS({
  "node_modules/core-js/internals/check-correctness-of-iteration.js"(exports, module) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    var ITERATOR2 = wellKnownSymbol5("iterator");
    var SAFE_CLOSING = false;
    try {
      called = 0;
      iteratorWithReturn = {
        next: function() {
          return { done: !!called++ };
        },
        "return": function() {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR2] = function() {
        return this;
      };
      Array.from(iteratorWithReturn, function() {
        throw 2;
      });
    } catch (error) {
    }
    var called;
    var iteratorWithReturn;
    module.exports = function(exec, SKIP_CLOSING) {
      try {
        if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
      } catch (error) {
        return false;
      }
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR2] = function() {
          return {
            next: function() {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) {
      }
      return ITERATION_SUPPORT;
    };
  }
});

// node_modules/core-js/internals/promise-statics-incorrect-iteration.js
var require_promise_statics_incorrect_iteration = __commonJS({
  "node_modules/core-js/internals/promise-statics-incorrect-iteration.js"(exports, module) {
    "use strict";
    var NativePromiseConstructor = require_promise_native_constructor();
    var checkCorrectnessOfIteration2 = require_check_correctness_of_iteration();
    var FORCED_PROMISE_CONSTRUCTOR = require_promise_constructor_detection().CONSTRUCTOR;
    module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration2(function(iterable) {
      NativePromiseConstructor.all(iterable).then(void 0, function() {
      });
    });
  }
});

// node_modules/core-js/modules/es.promise.all.js
var require_es_promise_all = __commonJS({
  "node_modules/core-js/modules/es.promise.all.js"() {
    "use strict";
    var $27 = require_export();
    var call5 = require_function_call();
    var aCallable2 = require_a_callable();
    var newPromiseCapabilityModule = require_new_promise_capability();
    var perform = require_perform();
    var iterate = require_iterate();
    var PROMISE_STATICS_INCORRECT_ITERATION = require_promise_statics_incorrect_iteration();
    $27({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function() {
          var $promiseResolve = aCallable2(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate(iterable, function(promise) {
            var index2 = counter++;
            var alreadyCalled = false;
            remaining++;
            call5($promiseResolve, C, promise).then(function(value) {
              if (alreadyCalled) return;
              alreadyCalled = true;
              values[index2] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });
  }
});

// node_modules/core-js/modules/es.promise.catch.js
var require_es_promise_catch = __commonJS({
  "node_modules/core-js/modules/es.promise.catch.js"() {
    "use strict";
    var $27 = require_export();
    var IS_PURE3 = require_is_pure();
    var FORCED_PROMISE_CONSTRUCTOR = require_promise_constructor_detection().CONSTRUCTOR;
    var NativePromiseConstructor = require_promise_native_constructor();
    var getBuiltIn2 = require_get_built_in();
    var isCallable3 = require_is_callable();
    var defineBuiltIn3 = require_define_built_in();
    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
    $27({ target: "Promise", proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
      "catch": function(onRejected) {
        return this.then(void 0, onRejected);
      }
    });
    if (!IS_PURE3 && isCallable3(NativePromiseConstructor)) {
      method = getBuiltIn2("Promise").prototype["catch"];
      if (NativePromisePrototype["catch"] !== method) {
        defineBuiltIn3(NativePromisePrototype, "catch", method, { unsafe: true });
      }
    }
    var method;
  }
});

// node_modules/core-js/modules/es.promise.race.js
var require_es_promise_race = __commonJS({
  "node_modules/core-js/modules/es.promise.race.js"() {
    "use strict";
    var $27 = require_export();
    var call5 = require_function_call();
    var aCallable2 = require_a_callable();
    var newPromiseCapabilityModule = require_new_promise_capability();
    var perform = require_perform();
    var iterate = require_iterate();
    var PROMISE_STATICS_INCORRECT_ITERATION = require_promise_statics_incorrect_iteration();
    $27({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapabilityModule.f(C);
        var reject = capability.reject;
        var result = perform(function() {
          var $promiseResolve = aCallable2(C.resolve);
          iterate(iterable, function(promise) {
            call5($promiseResolve, C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) reject(result.value);
        return capability.promise;
      }
    });
  }
});

// node_modules/core-js/modules/es.promise.reject.js
var require_es_promise_reject = __commonJS({
  "node_modules/core-js/modules/es.promise.reject.js"() {
    "use strict";
    var $27 = require_export();
    var newPromiseCapabilityModule = require_new_promise_capability();
    var FORCED_PROMISE_CONSTRUCTOR = require_promise_constructor_detection().CONSTRUCTOR;
    $27({ target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
      reject: function reject(r) {
        var capability = newPromiseCapabilityModule.f(this);
        var capabilityReject = capability.reject;
        capabilityReject(r);
        return capability.promise;
      }
    });
  }
});

// node_modules/core-js/internals/promise-resolve.js
var require_promise_resolve = __commonJS({
  "node_modules/core-js/internals/promise-resolve.js"(exports, module) {
    "use strict";
    var anObject9 = require_an_object();
    var isObject7 = require_is_object();
    var newPromiseCapability = require_new_promise_capability();
    module.exports = function(C, x) {
      anObject9(C);
      if (isObject7(x) && x.constructor === C) return x;
      var promiseCapability = newPromiseCapability.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };
  }
});

// node_modules/core-js/modules/es.promise.resolve.js
var require_es_promise_resolve = __commonJS({
  "node_modules/core-js/modules/es.promise.resolve.js"() {
    "use strict";
    var $27 = require_export();
    var getBuiltIn2 = require_get_built_in();
    var IS_PURE3 = require_is_pure();
    var NativePromiseConstructor = require_promise_native_constructor();
    var FORCED_PROMISE_CONSTRUCTOR = require_promise_constructor_detection().CONSTRUCTOR;
    var promiseResolve = require_promise_resolve();
    var PromiseConstructorWrapper = getBuiltIn2("Promise");
    var CHECK_WRAPPER = IS_PURE3 && !FORCED_PROMISE_CONSTRUCTOR;
    $27({ target: "Promise", stat: true, forced: IS_PURE3 || FORCED_PROMISE_CONSTRUCTOR }, {
      resolve: function resolve(x) {
        return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
      }
    });
  }
});

// node_modules/performance-now/lib/performance-now.js
var require_performance_now = __commonJS({
  "node_modules/performance-now/lib/performance-now.js"(exports, module) {
    (function() {
      var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
      if (typeof performance !== "undefined" && performance !== null && performance.now) {
        module.exports = function() {
          return performance.now();
        };
      } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
        module.exports = function() {
          return (getNanoSeconds() - nodeLoadTime) / 1e6;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };
        moduleLoadTime = getNanoSeconds();
        upTime = process.uptime() * 1e9;
        nodeLoadTime = moduleLoadTime - upTime;
      } else if (Date.now) {
        module.exports = function() {
          return Date.now() - loadTime;
        };
        loadTime = Date.now();
      } else {
        module.exports = function() {
          return (/* @__PURE__ */ new Date()).getTime() - loadTime;
        };
        loadTime = (/* @__PURE__ */ new Date()).getTime();
      }
    }).call(exports);
  }
});

// node_modules/raf/index.js
var require_raf = __commonJS({
  "node_modules/raf/index.js"(exports, module) {
    var now = require_performance_now();
    var root = typeof window === "undefined" ? global : window;
    var vendors = ["moz", "webkit"];
    var suffix = "AnimationFrame";
    var raf = root["request" + suffix];
    var caf = root["cancel" + suffix] || root["cancelRequest" + suffix];
    for (i = 0; !raf && i < vendors.length; i++) {
      raf = root[vendors[i] + "Request" + suffix];
      caf = root[vendors[i] + "Cancel" + suffix] || root[vendors[i] + "CancelRequest" + suffix];
    }
    var i;
    if (!raf || !caf) {
      last = 0, id = 0, queue = [], frameDuration = 1e3 / 60;
      raf = function(callback) {
        if (queue.length === 0) {
          var _now = now(), next2 = Math.max(0, frameDuration - (_now - last));
          last = next2 + _now;
          setTimeout(function() {
            var cp = queue.slice(0);
            queue.length = 0;
            for (var i2 = 0; i2 < cp.length; i2++) {
              if (!cp[i2].cancelled) {
                try {
                  cp[i2].callback(last);
                } catch (e) {
                  setTimeout(function() {
                    throw e;
                  }, 0);
                }
              }
            }
          }, Math.round(next2));
        }
        queue.push({
          handle: ++id,
          callback,
          cancelled: false
        });
        return id;
      };
      caf = function(handle) {
        for (var i2 = 0; i2 < queue.length; i2++) {
          if (queue[i2].handle === handle) {
            queue[i2].cancelled = true;
          }
        }
      };
    }
    var last;
    var id;
    var queue;
    var frameDuration;
    module.exports = function(fn) {
      return raf.call(root, fn);
    };
    module.exports.cancel = function() {
      caf.apply(root, arguments);
    };
    module.exports.polyfill = function(object) {
      if (!object) {
        object = root;
      }
      object.requestAnimationFrame = raf;
      object.cancelAnimationFrame = caf;
    };
  }
});

// node_modules/rgbcolor/index.js
var require_rgbcolor = __commonJS({
  "node_modules/rgbcolor/index.js"(exports, module) {
    module.exports = function(color_string) {
      this.ok = false;
      this.alpha = 1;
      if (color_string.charAt(0) == "#") {
        color_string = color_string.substr(1, 6);
      }
      color_string = color_string.replace(/ /g, "");
      color_string = color_string.toLowerCase();
      var simple_colors = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "00ffff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000000",
        blanchedalmond: "ffebcd",
        blue: "0000ff",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "00ffff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dodgerblue: "1e90ff",
        feldspar: "d19275",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "ff00ff",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgrey: "d3d3d3",
        lightgreen: "90ee90",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslateblue: "8470ff",
        lightslategray: "778899",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "00ff00",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "ff00ff",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370d8",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "d87093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "ff0000",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        violetred: "d02090",
        wheat: "f5deb3",
        white: "ffffff",
        whitesmoke: "f5f5f5",
        yellow: "ffff00",
        yellowgreen: "9acd32"
      };
      color_string = simple_colors[color_string] || color_string;
      var color_defs = [
        {
          re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
          example: ["rgba(123, 234, 45, 0.8)", "rgba(255,234,245,1.0)"],
          process: function(bits2) {
            return [
              parseInt(bits2[1]),
              parseInt(bits2[2]),
              parseInt(bits2[3]),
              parseFloat(bits2[4])
            ];
          }
        },
        {
          re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
          example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
          process: function(bits2) {
            return [
              parseInt(bits2[1]),
              parseInt(bits2[2]),
              parseInt(bits2[3])
            ];
          }
        },
        {
          re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          example: ["#00ff00", "336699"],
          process: function(bits2) {
            return [
              parseInt(bits2[1], 16),
              parseInt(bits2[2], 16),
              parseInt(bits2[3], 16)
            ];
          }
        },
        {
          re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
          example: ["#fb0", "f0f"],
          process: function(bits2) {
            return [
              parseInt(bits2[1] + bits2[1], 16),
              parseInt(bits2[2] + bits2[2], 16),
              parseInt(bits2[3] + bits2[3], 16)
            ];
          }
        }
      ];
      for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
          var channels = processor(bits);
          this.r = channels[0];
          this.g = channels[1];
          this.b = channels[2];
          if (channels.length > 3) {
            this.alpha = channels[3];
          }
          this.ok = true;
        }
      }
      this.r = this.r < 0 || isNaN(this.r) ? 0 : this.r > 255 ? 255 : this.r;
      this.g = this.g < 0 || isNaN(this.g) ? 0 : this.g > 255 ? 255 : this.g;
      this.b = this.b < 0 || isNaN(this.b) ? 0 : this.b > 255 ? 255 : this.b;
      this.alpha = this.alpha < 0 ? 0 : this.alpha > 1 || isNaN(this.alpha) ? 1 : this.alpha;
      this.toRGB = function() {
        return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
      };
      this.toRGBA = function() {
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
      };
      this.toHex = function() {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = "0" + r;
        if (g.length == 1) g = "0" + g;
        if (b.length == 1) b = "0" + b;
        return "#" + r + g + b;
      };
      this.getHelpXML = function() {
        var examples = new Array();
        for (var i2 = 0; i2 < color_defs.length; i2++) {
          var example = color_defs[i2].example;
          for (var j = 0; j < example.length; j++) {
            examples[examples.length] = example[j];
          }
        }
        for (var sc in simple_colors) {
          examples[examples.length] = sc;
        }
        var xml = document.createElement("ul");
        xml.setAttribute("id", "rgbcolor-examples");
        for (var i2 = 0; i2 < examples.length; i2++) {
          try {
            var list_item = document.createElement("li");
            var list_color = new RGBColor(examples[i2]);
            var example_div = document.createElement("div");
            example_div.style.cssText = "margin: 3px; border: 1px solid black; background:" + list_color.toHex() + "; color:" + list_color.toHex();
            example_div.appendChild(document.createTextNode("test"));
            var list_item_value = document.createTextNode(
              " " + examples[i2] + " -> " + list_color.toRGB() + " -> " + list_color.toHex()
            );
            list_item.appendChild(example_div);
            list_item.appendChild(list_item_value);
            xml.appendChild(list_item);
          } catch (e) {
          }
        }
        return xml;
      };
    };
  }
});

// node_modules/core-js/internals/function-bind.js
var require_function_bind = __commonJS({
  "node_modules/core-js/internals/function-bind.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var aCallable2 = require_a_callable();
    var isObject7 = require_is_object();
    var hasOwn3 = require_has_own_property();
    var arraySlice = require_array_slice();
    var NATIVE_BIND = require_function_bind_native();
    var $Function = Function;
    var concat3 = uncurryThis12([].concat);
    var join2 = uncurryThis12([].join);
    var factories = {};
    var construct2 = function(C, argsLength, args) {
      if (!hasOwn3(factories, argsLength)) {
        var list = [];
        var i = 0;
        for (; i < argsLength; i++) list[i] = "a[" + i + "]";
        factories[argsLength] = $Function("C,a", "return new C(" + join2(list, ",") + ")");
      }
      return factories[argsLength](C, args);
    };
    module.exports = NATIVE_BIND ? $Function.bind : function bind2(that) {
      var F = aCallable2(this);
      var Prototype = F.prototype;
      var partArgs = arraySlice(arguments, 1);
      var boundFunction = function bound() {
        var args = concat3(partArgs, arraySlice(arguments));
        return this instanceof boundFunction ? construct2(F, args.length, args) : F.apply(that, args);
      };
      if (isObject7(Prototype)) boundFunction.prototype = Prototype;
      return boundFunction;
    };
  }
});

// node_modules/core-js/internals/call-with-safe-iteration-closing.js
var require_call_with_safe_iteration_closing = __commonJS({
  "node_modules/core-js/internals/call-with-safe-iteration-closing.js"(exports, module) {
    "use strict";
    var anObject9 = require_an_object();
    var iteratorClose = require_iterator_close();
    module.exports = function(iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject9(value)[0], value[1]) : fn(value);
      } catch (error) {
        iteratorClose(iterator, "throw", error);
      }
    };
  }
});

// node_modules/core-js/internals/array-from.js
var require_array_from = __commonJS({
  "node_modules/core-js/internals/array-from.js"(exports, module) {
    "use strict";
    var bind2 = require_function_bind_context();
    var call5 = require_function_call();
    var toObject3 = require_to_object();
    var callWithSafeIterationClosing = require_call_with_safe_iteration_closing();
    var isArrayIteratorMethod = require_is_array_iterator_method();
    var isConstructor2 = require_is_constructor();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var createProperty4 = require_create_property();
    var setArrayLength3 = require_array_set_length();
    var getIterator = require_get_iterator();
    var getIteratorMethod = require_get_iterator_method();
    var iteratorClose = require_iterator_close();
    var $Array2 = Array;
    module.exports = function from2(arrayLike) {
      var IS_CONSTRUCTOR = isConstructor2(this);
      var argumentsLength = arguments.length;
      var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
      var mapping = mapfn !== void 0;
      if (mapping) mapfn = bind2(mapfn, argumentsLength > 2 ? arguments[2] : void 0);
      var O = toObject3(arrayLike);
      var iteratorMethod = getIteratorMethod(O);
      var index2 = 0;
      var length, result, step, iterator, next2, value;
      if (iteratorMethod && !(this === $Array2 && isArrayIteratorMethod(iteratorMethod))) {
        result = IS_CONSTRUCTOR ? new this() : [];
        iterator = getIterator(O, iteratorMethod);
        next2 = iterator.next;
        for (; !(step = call5(next2, iterator)).done; index2++) {
          value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
          try {
            createProperty4(result, index2, value);
          } catch (error) {
            iteratorClose(iterator, "throw", error);
          }
        }
      } else {
        length = lengthOfArrayLike3(O);
        result = IS_CONSTRUCTOR ? new this(length) : $Array2(length);
        for (; length > index2; index2++) {
          value = mapping ? mapfn(O[index2], index2) : O[index2];
          createProperty4(result, index2, value);
        }
      }
      setArrayLength3(result, index2);
      return result;
    };
  }
});

// node_modules/core-js/internals/add-to-unscopables.js
var require_add_to_unscopables = __commonJS({
  "node_modules/core-js/internals/add-to-unscopables.js"(exports, module) {
    "use strict";
    var wellKnownSymbol5 = require_well_known_symbol();
    var create2 = require_object_create();
    var defineProperty2 = require_object_define_property().f;
    var UNSCOPABLES = wellKnownSymbol5("unscopables");
    var ArrayPrototype = Array.prototype;
    if (ArrayPrototype[UNSCOPABLES] === void 0) {
      defineProperty2(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: create2(null)
      });
    }
    module.exports = function(key) {
      ArrayPrototype[UNSCOPABLES][key] = true;
    };
  }
});

// node_modules/core-js/internals/correct-prototype-getter.js
var require_correct_prototype_getter = __commonJS({
  "node_modules/core-js/internals/correct-prototype-getter.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = !fails11(function() {
      function F() {
      }
      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });
  }
});

// node_modules/core-js/internals/object-get-prototype-of.js
var require_object_get_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-get-prototype-of.js"(exports, module) {
    "use strict";
    var hasOwn3 = require_has_own_property();
    var isCallable3 = require_is_callable();
    var toObject3 = require_to_object();
    var sharedKey = require_shared_key();
    var CORRECT_PROTOTYPE_GETTER2 = require_correct_prototype_getter();
    var IE_PROTO = sharedKey("IE_PROTO");
    var $Object = Object;
    var ObjectPrototype2 = $Object.prototype;
    module.exports = CORRECT_PROTOTYPE_GETTER2 ? $Object.getPrototypeOf : function(O) {
      var object = toObject3(O);
      if (hasOwn3(object, IE_PROTO)) return object[IE_PROTO];
      var constructor = object.constructor;
      if (isCallable3(constructor) && object instanceof constructor) {
        return constructor.prototype;
      }
      return object instanceof $Object ? ObjectPrototype2 : null;
    };
  }
});

// node_modules/core-js/internals/iterators-core.js
var require_iterators_core = __commonJS({
  "node_modules/core-js/internals/iterators-core.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var isCallable3 = require_is_callable();
    var isObject7 = require_is_object();
    var create2 = require_object_create();
    var getPrototypeOf2 = require_object_get_prototype_of();
    var defineBuiltIn3 = require_define_built_in();
    var wellKnownSymbol5 = require_well_known_symbol();
    var IS_PURE3 = require_is_pure();
    var ITERATOR2 = wellKnownSymbol5("iterator");
    var BUGGY_SAFARI_ITERATORS = false;
    var IteratorPrototype;
    var PrototypeOfArrayIteratorPrototype;
    var arrayIterator;
    if ([].keys) {
      arrayIterator = [].keys();
      if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf2(getPrototypeOf2(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
      }
    }
    var NEW_ITERATOR_PROTOTYPE = !isObject7(IteratorPrototype) || fails11(function() {
      var test2 = {};
      return IteratorPrototype[ITERATOR2].call(test2) !== test2;
    });
    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
    else if (IS_PURE3) IteratorPrototype = create2(IteratorPrototype);
    if (!isCallable3(IteratorPrototype[ITERATOR2])) {
      defineBuiltIn3(IteratorPrototype, ITERATOR2, function() {
        return this;
      });
    }
    module.exports = {
      IteratorPrototype,
      BUGGY_SAFARI_ITERATORS
    };
  }
});

// node_modules/core-js/internals/iterator-create-constructor.js
var require_iterator_create_constructor = __commonJS({
  "node_modules/core-js/internals/iterator-create-constructor.js"(exports, module) {
    "use strict";
    var IteratorPrototype = require_iterators_core().IteratorPrototype;
    var create2 = require_object_create();
    var createPropertyDescriptor = require_create_property_descriptor();
    var setToStringTag2 = require_set_to_string_tag();
    var Iterators = require_iterators();
    var returnThis = function() {
      return this;
    };
    module.exports = function(IteratorConstructor, NAME2, next2, ENUMERABLE_NEXT) {
      var TO_STRING_TAG = NAME2 + " Iterator";
      IteratorConstructor.prototype = create2(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next2) });
      setToStringTag2(IteratorConstructor, TO_STRING_TAG, false, true);
      Iterators[TO_STRING_TAG] = returnThis;
      return IteratorConstructor;
    };
  }
});

// node_modules/core-js/internals/iterator-define.js
var require_iterator_define = __commonJS({
  "node_modules/core-js/internals/iterator-define.js"(exports, module) {
    "use strict";
    var $27 = require_export();
    var call5 = require_function_call();
    var IS_PURE3 = require_is_pure();
    var FunctionName = require_function_name();
    var isCallable3 = require_is_callable();
    var createIteratorConstructor = require_iterator_create_constructor();
    var getPrototypeOf2 = require_object_get_prototype_of();
    var setPrototypeOf = require_object_set_prototype_of();
    var setToStringTag2 = require_set_to_string_tag();
    var createNonEnumerableProperty3 = require_create_non_enumerable_property();
    var defineBuiltIn3 = require_define_built_in();
    var wellKnownSymbol5 = require_well_known_symbol();
    var Iterators = require_iterators();
    var IteratorsCore = require_iterators_core();
    var PROPER_FUNCTION_NAME2 = FunctionName.PROPER;
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
    var IteratorPrototype = IteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR2 = wellKnownSymbol5("iterator");
    var KEYS = "keys";
    var VALUES = "values";
    var ENTRIES = "entries";
    var returnThis = function() {
      return this;
    };
    module.exports = function(Iterable, NAME2, IteratorConstructor, next2, DEFAULT, IS_SET, FORCED8) {
      createIteratorConstructor(IteratorConstructor, NAME2, next2);
      var getIterationMethod = function(KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS:
            return function keys2() {
              return new IteratorConstructor(this, KIND);
            };
          case VALUES:
            return function values() {
              return new IteratorConstructor(this, KIND);
            };
          case ENTRIES:
            return function entries() {
              return new IteratorConstructor(this, KIND);
            };
        }
        return function() {
          return new IteratorConstructor(this);
        };
      };
      var TO_STRING_TAG = NAME2 + " Iterator";
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR2] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME2 === "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;
      if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf2(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (!IS_PURE3 && getPrototypeOf2(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
            } else if (!isCallable3(CurrentIteratorPrototype[ITERATOR2])) {
              defineBuiltIn3(CurrentIteratorPrototype, ITERATOR2, returnThis);
            }
          }
          setToStringTag2(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
          if (IS_PURE3) Iterators[TO_STRING_TAG] = returnThis;
        }
      }
      if (PROPER_FUNCTION_NAME2 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (!IS_PURE3 && CONFIGURABLE_FUNCTION_NAME) {
          createNonEnumerableProperty3(IterablePrototype, "name", VALUES);
        } else {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() {
            return call5(nativeIterator, this);
          };
        }
      }
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED8) for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            defineBuiltIn3(IterablePrototype, KEY, methods[KEY]);
          }
        }
        else $27({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
      }
      if ((!IS_PURE3 || FORCED8) && IterablePrototype[ITERATOR2] !== defaultIterator) {
        defineBuiltIn3(IterablePrototype, ITERATOR2, defaultIterator, { name: DEFAULT });
      }
      Iterators[NAME2] = defaultIterator;
      return methods;
    };
  }
});

// node_modules/core-js/internals/create-iter-result-object.js
var require_create_iter_result_object = __commonJS({
  "node_modules/core-js/internals/create-iter-result-object.js"(exports, module) {
    "use strict";
    module.exports = function(value, done) {
      return { value, done };
    };
  }
});

// node_modules/core-js/internals/whitespaces.js
var require_whitespaces = __commonJS({
  "node_modules/core-js/internals/whitespaces.js"(exports, module) {
    "use strict";
    module.exports = "	\n\v\f\r                　\u2028\u2029\uFEFF";
  }
});

// node_modules/core-js/internals/string-trim.js
var require_string_trim = __commonJS({
  "node_modules/core-js/internals/string-trim.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    var requireObjectCoercible6 = require_require_object_coercible();
    var toString9 = require_to_string();
    var whitespaces = require_whitespaces();
    var replace = uncurryThis12("".replace);
    var ltrim = RegExp("^[" + whitespaces + "]+");
    var rtrim = RegExp("(^|[^" + whitespaces + "])[" + whitespaces + "]+$");
    var createMethod = function(TYPE) {
      return function($this) {
        var string = toString9(requireObjectCoercible6($this));
        if (TYPE & 1) string = replace(string, ltrim, "");
        if (TYPE & 2) string = replace(string, rtrim, "$1");
        return string;
      };
    };
    module.exports = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimstart
      start: createMethod(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimend
      end: createMethod(2),
      // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim
      trim: createMethod(3)
    };
  }
});

// node_modules/core-js/internals/string-trim-forced.js
var require_string_trim_forced = __commonJS({
  "node_modules/core-js/internals/string-trim-forced.js"(exports, module) {
    "use strict";
    var PROPER_FUNCTION_NAME2 = require_function_name().PROPER;
    var fails11 = require_fails();
    var whitespaces = require_whitespaces();
    var non = "​᠎";
    module.exports = function(METHOD_NAME) {
      return fails11(function() {
        return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME2 && whitespaces[METHOD_NAME].name !== METHOD_NAME;
      });
    };
  }
});

// node_modules/core-js/internals/inherit-if-required.js
var require_inherit_if_required = __commonJS({
  "node_modules/core-js/internals/inherit-if-required.js"(exports, module) {
    "use strict";
    var isCallable3 = require_is_callable();
    var isObject7 = require_is_object();
    var setPrototypeOf = require_object_set_prototype_of();
    module.exports = function($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype;
      if (
        // it can work only with native `setPrototypeOf`
        setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
        isCallable3(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject7(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype
      ) setPrototypeOf($this, NewTargetPrototype);
      return $this;
    };
  }
});

// node_modules/core-js/internals/this-number-value.js
var require_this_number_value = __commonJS({
  "node_modules/core-js/internals/this-number-value.js"(exports, module) {
    "use strict";
    var uncurryThis12 = require_function_uncurry_this();
    module.exports = uncurryThis12(1.1.valueOf);
  }
});

// node_modules/core-js/internals/array-fill.js
var require_array_fill = __commonJS({
  "node_modules/core-js/internals/array-fill.js"(exports, module) {
    "use strict";
    var toObject3 = require_to_object();
    var toAbsoluteIndex2 = require_to_absolute_index();
    var lengthOfArrayLike3 = require_length_of_array_like();
    module.exports = function fill2(value) {
      var O = toObject3(this);
      var length = lengthOfArrayLike3(O);
      var argumentsLength = arguments.length;
      var index2 = toAbsoluteIndex2(argumentsLength > 1 ? arguments[1] : void 0, length);
      var end = argumentsLength > 2 ? arguments[2] : void 0;
      var endPos = end === void 0 ? length : toAbsoluteIndex2(end, length);
      while (endPos > index2) O[index2++] = value;
      return O;
    };
  }
});

// node_modules/core-js/modules/es.array.iterator.js
var require_es_array_iterator = __commonJS({
  "node_modules/core-js/modules/es.array.iterator.js"(exports, module) {
    "use strict";
    var toIndexedObject5 = require_to_indexed_object();
    var addToUnscopables3 = require_add_to_unscopables();
    var Iterators = require_iterators();
    var InternalStateModule2 = require_internal_state();
    var defineProperty2 = require_object_define_property().f;
    var defineIterator2 = require_iterator_define();
    var createIterResultObject2 = require_create_iter_result_object();
    var IS_PURE3 = require_is_pure();
    var DESCRIPTORS6 = require_descriptors();
    var ARRAY_ITERATOR = "Array Iterator";
    var setInternalState2 = InternalStateModule2.set;
    var getInternalState2 = InternalStateModule2.getterFor(ARRAY_ITERATOR);
    module.exports = defineIterator2(Array, "Array", function(iterated, kind) {
      setInternalState2(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject5(iterated),
        // target
        index: 0,
        // next index
        kind
        // kind
      });
    }, function() {
      var state = getInternalState2(this);
      var target = state.target;
      var index2 = state.index++;
      if (!target || index2 >= target.length) {
        state.target = null;
        return createIterResultObject2(void 0, true);
      }
      switch (state.kind) {
        case "keys":
          return createIterResultObject2(index2, false);
        case "values":
          return createIterResultObject2(target[index2], false);
      }
      return createIterResultObject2([index2, target[index2]], false);
    }, "values");
    var values = Iterators.Arguments = Iterators.Array;
    addToUnscopables3("keys");
    addToUnscopables3("values");
    addToUnscopables3("entries");
    if (!IS_PURE3 && DESCRIPTORS6 && values.name !== "values") try {
      defineProperty2(values, "name", { value: "values" });
    } catch (error) {
    }
  }
});

// node_modules/core-js/internals/array-buffer-non-extensible.js
var require_array_buffer_non_extensible = __commonJS({
  "node_modules/core-js/internals/array-buffer-non-extensible.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = fails11(function() {
      if (typeof ArrayBuffer == "function") {
        var buffer = new ArrayBuffer(8);
        if (Object.isExtensible(buffer)) Object.defineProperty(buffer, "a", { value: 8 });
      }
    });
  }
});

// node_modules/core-js/internals/object-is-extensible.js
var require_object_is_extensible = __commonJS({
  "node_modules/core-js/internals/object-is-extensible.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    var isObject7 = require_is_object();
    var classof = require_classof_raw();
    var ARRAY_BUFFER_NON_EXTENSIBLE = require_array_buffer_non_extensible();
    var $isExtensible = Object.isExtensible;
    var FAILS_ON_PRIMITIVES2 = fails11(function() {
      $isExtensible(1);
    });
    module.exports = FAILS_ON_PRIMITIVES2 || ARRAY_BUFFER_NON_EXTENSIBLE ? function isExtensible(it) {
      if (!isObject7(it)) return false;
      if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === "ArrayBuffer") return false;
      return $isExtensible ? $isExtensible(it) : true;
    } : $isExtensible;
  }
});

// node_modules/core-js/internals/freezing.js
var require_freezing = __commonJS({
  "node_modules/core-js/internals/freezing.js"(exports, module) {
    "use strict";
    var fails11 = require_fails();
    module.exports = !fails11(function() {
      return Object.isExtensible(Object.preventExtensions({}));
    });
  }
});

// node_modules/core-js/internals/internal-metadata.js
var require_internal_metadata = __commonJS({
  "node_modules/core-js/internals/internal-metadata.js"(exports, module) {
    "use strict";
    var $27 = require_export();
    var uncurryThis12 = require_function_uncurry_this();
    var hiddenKeys = require_hidden_keys();
    var isObject7 = require_is_object();
    var hasOwn3 = require_has_own_property();
    var defineProperty2 = require_object_define_property().f;
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertyNamesExternalModule = require_object_get_own_property_names_external();
    var isExtensible = require_object_is_extensible();
    var uid = require_uid();
    var FREEZING = require_freezing();
    var REQUIRED = false;
    var METADATA = uid("meta");
    var id = 0;
    var setMetadata = function(it) {
      defineProperty2(it, METADATA, { value: {
        objectID: "O" + id++,
        // object ID
        weakData: {}
        // weak collections IDs
      } });
    };
    var fastKey = function(it, create2) {
      if (!isObject7(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
      if (!hasOwn3(it, METADATA)) {
        if (!isExtensible(it)) return "F";
        if (!create2) return "E";
        setMetadata(it);
      }
      return it[METADATA].objectID;
    };
    var getWeakData = function(it, create2) {
      if (!hasOwn3(it, METADATA)) {
        if (!isExtensible(it)) return true;
        if (!create2) return false;
        setMetadata(it);
      }
      return it[METADATA].weakData;
    };
    var onFreeze = function(it) {
      if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn3(it, METADATA)) setMetadata(it);
      return it;
    };
    var enable = function() {
      meta.enable = function() {
      };
      REQUIRED = true;
      var getOwnPropertyNames2 = getOwnPropertyNamesModule.f;
      var splice = uncurryThis12([].splice);
      var test2 = {};
      test2[METADATA] = 1;
      if (getOwnPropertyNames2(test2).length) {
        getOwnPropertyNamesModule.f = function(it) {
          var result = getOwnPropertyNames2(it);
          for (var i = 0, length = result.length; i < length; i++) {
            if (result[i] === METADATA) {
              splice(result, i, 1);
              break;
            }
          }
          return result;
        };
        $27({ target: "Object", stat: true, forced: true }, {
          getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
        });
      }
    };
    var meta = module.exports = {
      enable,
      fastKey,
      getWeakData,
      onFreeze
    };
    hiddenKeys[METADATA] = true;
  }
});

// node_modules/core-js/internals/collection.js
var require_collection = __commonJS({
  "node_modules/core-js/internals/collection.js"(exports, module) {
    "use strict";
    var $27 = require_export();
    var globalThis6 = require_global_this();
    var uncurryThis12 = require_function_uncurry_this();
    var isForced2 = require_is_forced();
    var defineBuiltIn3 = require_define_built_in();
    var InternalMetadataModule = require_internal_metadata();
    var iterate = require_iterate();
    var anInstance = require_an_instance();
    var isCallable3 = require_is_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    var isObject7 = require_is_object();
    var fails11 = require_fails();
    var checkCorrectnessOfIteration2 = require_check_correctness_of_iteration();
    var setToStringTag2 = require_set_to_string_tag();
    var inheritIfRequired2 = require_inherit_if_required();
    module.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
      var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
      var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
      var ADDER = IS_MAP ? "set" : "add";
      var NativeConstructor = globalThis6[CONSTRUCTOR_NAME];
      var NativePrototype = NativeConstructor && NativeConstructor.prototype;
      var Constructor = NativeConstructor;
      var exported = {};
      var fixMethod = function(KEY) {
        var uncurriedNativeMethod = uncurryThis12(NativePrototype[KEY]);
        defineBuiltIn3(
          NativePrototype,
          KEY,
          KEY === "add" ? function add(value) {
            uncurriedNativeMethod(this, value === 0 ? 0 : value);
            return this;
          } : KEY === "delete" ? function(key) {
            return IS_WEAK && !isObject7(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          } : KEY === "get" ? function get(key) {
            return IS_WEAK && !isObject7(key) ? void 0 : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          } : KEY === "has" ? function has(key) {
            return IS_WEAK && !isObject7(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
          } : function set(key, value) {
            uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
            return this;
          }
        );
      };
      var REPLACE2 = isForced2(
        CONSTRUCTOR_NAME,
        !isCallable3(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails11(function() {
          new NativeConstructor().entries().next();
        }))
      );
      if (REPLACE2) {
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
        InternalMetadataModule.enable();
      } else if (isForced2(CONSTRUCTOR_NAME, true)) {
        var instance = new Constructor();
        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance;
        var THROWS_ON_PRIMITIVES = fails11(function() {
          instance.has(1);
        });
        var ACCEPT_ITERABLES = checkCorrectnessOfIteration2(function(iterable) {
          new NativeConstructor(iterable);
        });
        var BUGGY_ZERO = !IS_WEAK && fails11(function() {
          var $instance = new NativeConstructor();
          var index2 = 5;
          while (index2--) $instance[ADDER](index2, index2);
          return !$instance.has(-0);
        });
        if (!ACCEPT_ITERABLES) {
          Constructor = wrapper(function(dummy, iterable) {
            anInstance(dummy, NativePrototype);
            var that = inheritIfRequired2(new NativeConstructor(), dummy, Constructor);
            if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
            return that;
          });
          Constructor.prototype = NativePrototype;
          NativePrototype.constructor = Constructor;
        }
        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod("delete");
          fixMethod("has");
          IS_MAP && fixMethod("get");
        }
        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
        if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
      }
      exported[CONSTRUCTOR_NAME] = Constructor;
      $27({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported);
      setToStringTag2(Constructor, CONSTRUCTOR_NAME);
      if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
      return Constructor;
    };
  }
});

// node_modules/core-js/internals/define-built-ins.js
var require_define_built_ins = __commonJS({
  "node_modules/core-js/internals/define-built-ins.js"(exports, module) {
    "use strict";
    var defineBuiltIn3 = require_define_built_in();
    module.exports = function(target, src, options) {
      for (var key in src) defineBuiltIn3(target, key, src[key], options);
      return target;
    };
  }
});

// node_modules/core-js/internals/collection-strong.js
var require_collection_strong = __commonJS({
  "node_modules/core-js/internals/collection-strong.js"(exports, module) {
    "use strict";
    var create2 = require_object_create();
    var defineBuiltInAccessor3 = require_define_built_in_accessor();
    var defineBuiltIns = require_define_built_ins();
    var bind2 = require_function_bind_context();
    var anInstance = require_an_instance();
    var isNullOrUndefined = require_is_null_or_undefined();
    var iterate = require_iterate();
    var defineIterator2 = require_iterator_define();
    var createIterResultObject2 = require_create_iter_result_object();
    var setSpecies = require_set_species();
    var DESCRIPTORS6 = require_descriptors();
    var fastKey = require_internal_metadata().fastKey;
    var InternalStateModule2 = require_internal_state();
    var setInternalState2 = InternalStateModule2.set;
    var internalStateGetterFor = InternalStateModule2.getterFor;
    module.exports = {
      getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var Constructor = wrapper(function(that, iterable) {
          anInstance(that, Prototype);
          setInternalState2(that, {
            type: CONSTRUCTOR_NAME,
            index: create2(null),
            first: null,
            last: null,
            size: 0
          });
          if (!DESCRIPTORS6) that.size = 0;
          if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
        });
        var Prototype = Constructor.prototype;
        var getInternalState2 = internalStateGetterFor(CONSTRUCTOR_NAME);
        var define = function(that, key, value) {
          var state = getInternalState2(that);
          var entry = getEntry(that, key);
          var previous, index2;
          if (entry) {
            entry.value = value;
          } else {
            state.last = entry = {
              index: index2 = fastKey(key, true),
              key,
              value,
              previous: previous = state.last,
              next: null,
              removed: false
            };
            if (!state.first) state.first = entry;
            if (previous) previous.next = entry;
            if (DESCRIPTORS6) state.size++;
            else that.size++;
            if (index2 !== "F") state.index[index2] = entry;
          }
          return that;
        };
        var getEntry = function(that, key) {
          var state = getInternalState2(that);
          var index2 = fastKey(key);
          var entry;
          if (index2 !== "F") return state.index[index2];
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key === key) return entry;
          }
        };
        defineBuiltIns(Prototype, {
          // `{ Map, Set }.prototype.clear()` methods
          // https://tc39.es/ecma262/#sec-map.prototype.clear
          // https://tc39.es/ecma262/#sec-set.prototype.clear
          clear: function clear() {
            var that = this;
            var state = getInternalState2(that);
            var entry = state.first;
            while (entry) {
              entry.removed = true;
              if (entry.previous) entry.previous = entry.previous.next = null;
              entry = entry.next;
            }
            state.first = state.last = null;
            state.index = create2(null);
            if (DESCRIPTORS6) state.size = 0;
            else that.size = 0;
          },
          // `{ Map, Set }.prototype.delete(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.delete
          // https://tc39.es/ecma262/#sec-set.prototype.delete
          "delete": function(key) {
            var that = this;
            var state = getInternalState2(that);
            var entry = getEntry(that, key);
            if (entry) {
              var next2 = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) prev.next = next2;
              if (next2) next2.previous = prev;
              if (state.first === entry) state.first = next2;
              if (state.last === entry) state.last = prev;
              if (DESCRIPTORS6) state.size--;
              else that.size--;
            }
            return !!entry;
          },
          // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.foreach
          // https://tc39.es/ecma262/#sec-set.prototype.foreach
          forEach: function forEach3(callbackfn) {
            var state = getInternalState2(this);
            var boundFunction = bind2(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            var entry;
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this);
              while (entry && entry.removed) entry = entry.previous;
            }
          },
          // `{ Map, Set}.prototype.has(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.has
          // https://tc39.es/ecma262/#sec-set.prototype.has
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });
        defineBuiltIns(Prototype, IS_MAP ? {
          // `Map.prototype.get(key)` method
          // https://tc39.es/ecma262/#sec-map.prototype.get
          get: function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          },
          // `Map.prototype.set(key, value)` method
          // https://tc39.es/ecma262/#sec-map.prototype.set
          set: function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }
        } : {
          // `Set.prototype.add(value)` method
          // https://tc39.es/ecma262/#sec-set.prototype.add
          add: function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }
        });
        if (DESCRIPTORS6) defineBuiltInAccessor3(Prototype, "size", {
          configurable: true,
          get: function() {
            return getInternalState2(this).size;
          }
        });
        return Constructor;
      },
      setStrong: function(Constructor, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
        var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
        var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
        defineIterator2(Constructor, CONSTRUCTOR_NAME, function(iterated, kind) {
          setInternalState2(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind,
            last: null
          });
        }, function() {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          while (entry && entry.removed) entry = entry.previous;
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            state.target = null;
            return createIterResultObject2(void 0, true);
          }
          if (kind === "keys") return createIterResultObject2(entry.key, false);
          if (kind === "values") return createIterResultObject2(entry.value, false);
          return createIterResultObject2([entry.key, entry.value], false);
        }, IS_MAP ? "entries" : "values", !IS_MAP, true);
        setSpecies(CONSTRUCTOR_NAME);
      }
    };
  }
});

// node_modules/core-js/modules/es.map.constructor.js
var require_es_map_constructor = __commonJS({
  "node_modules/core-js/modules/es.map.constructor.js"() {
    "use strict";
    var collection = require_collection();
    var collectionStrong = require_collection_strong();
    collection("Map", function(init) {
      return function Map2() {
        return init(this, arguments.length ? arguments[0] : void 0);
      };
    }, collectionStrong);
  }
});

// node_modules/core-js/modules/es.array.map.js
var $ = require_export();
var $map = require_array_iteration().map;
var arrayMethodHasSpeciesSupport = require_array_method_has_species_support();
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
$({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
var import_es_regexp = __toESM(require_es_regexp_exec());

// node_modules/core-js/modules/es.string.match.js
var call = require_function_call();
var uncurryThis = require_function_uncurry_this();
var fixRegExpWellKnownSymbolLogic = require_fix_regexp_well_known_symbol_logic();
var anObject = require_an_object();
var isObject = require_is_object();
var toLength = require_to_length();
var toString = require_to_string();
var requireObjectCoercible = require_require_object_coercible();
var getMethod = require_get_method();
var advanceStringIndex = require_advance_string_index();
var getRegExpFlags = require_regexp_get_flags();
var regExpExec = require_regexp_exec_abstract();
var stringIndexOf = uncurryThis("".indexOf);
fixRegExpWellKnownSymbolLogic("match", function(MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = isObject(regexp) ? getMethod(regexp, MATCH) : void 0;
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done) return res.value;
      var flags = toString(getRegExpFlags(rx));
      if (!~stringIndexOf(flags, "g")) return regExpExec(rx, S);
      var fullUnicode = !!~stringIndexOf(flags, "u") || !!~stringIndexOf(flags, "v");
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

// node_modules/core-js/modules/es.string.replace.js
var apply = require_function_apply();
var call2 = require_function_call();
var uncurryThis2 = require_function_uncurry_this();
var fixRegExpWellKnownSymbolLogic2 = require_fix_regexp_well_known_symbol_logic();
var fails = require_fails();
var anObject2 = require_an_object();
var isCallable = require_is_callable();
var isObject2 = require_is_object();
var toIntegerOrInfinity = require_to_integer_or_infinity();
var toLength2 = require_to_length();
var toString2 = require_to_string();
var requireObjectCoercible2 = require_require_object_coercible();
var advanceStringIndex2 = require_advance_string_index();
var getMethod2 = require_get_method();
var getSubstitution = require_get_substitution();
var getRegExpFlags2 = require_regexp_get_flags();
var regExpExec2 = require_regexp_exec_abstract();
var wellKnownSymbol = require_well_known_symbol();
var REPLACE = wellKnownSymbol("replace");
var max = Math.max;
var min = Math.min;
var concat = uncurryThis2([].concat);
var push = uncurryThis2([].push);
var stringIndexOf2 = uncurryThis2("".indexOf);
var stringSlice = uncurryThis2("".slice);
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = (function() {
  return "a".replace(/./, "$0") === "$0";
})();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function() {
  if (/./[REPLACE]) {
    return /./[REPLACE]("a", "$0") === "";
  }
  return false;
})();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
  var re = /./;
  re.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic2("replace", function(_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible2(this);
      var replacer = isObject2(searchValue) ? getMethod2(searchValue, REPLACE) : void 0;
      return replacer ? call2(replacer, searchValue, O, replaceValue) : call2(nativeReplace, toString2(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(string, replaceValue) {
      var rx = anObject2(this);
      var S = toString2(string);
      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString2(replaceValue);
      var flags = toString2(getRegExpFlags2(rx));
      if (typeof replaceValue == "string" && !~stringIndexOf2(replaceValue, UNSAFE_SUBSTITUTE) && !~stringIndexOf2(replaceValue, "$<") && !~stringIndexOf2(flags, "y")) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }
      var global2 = !!~stringIndexOf2(flags, "g");
      var fullUnicode;
      if (global2) {
        fullUnicode = !!~stringIndexOf2(flags, "u") || !!~stringIndexOf2(flags, "v");
        rx.lastIndex = 0;
      }
      var results = [];
      var result;
      while (true) {
        result = regExpExec2(rx, S);
        if (result === null) break;
        push(results, result);
        if (!global2) break;
        var matchStr = toString2(result[0]);
        if (matchStr === "") rx.lastIndex = advanceStringIndex2(S, toLength2(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString2(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== void 0) push(replacerArgs, namedCaptures);
          replacement = toString2(apply(replaceValue, void 0, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

// node_modules/core-js/modules/es.string.starts-with.js
var $2 = require_export();
var uncurryThis3 = require_function_uncurry_this_clause();
var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
var toLength3 = require_to_length();
var toString3 = require_to_string();
var notARegExp = require_not_a_regexp();
var requireObjectCoercible3 = require_require_object_coercible();
var correctIsRegExpLogic = require_correct_is_regexp_logic();
var IS_PURE = require_is_pure();
var stringSlice2 = uncurryThis3("".slice);
var min2 = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!(function() {
  var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
  return descriptor && !descriptor.writable;
})();
$2({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString) {
    var that = toString3(requireObjectCoercible3(this));
    notARegExp(searchString);
    var search = toString3(searchString);
    var index2 = toLength3(min2(arguments.length > 1 ? arguments[1] : void 0, that.length));
    return stringSlice2(that, index2, index2 + search.length) === search;
  }
});

// node_modules/core-js/modules/es.array.join.js
var $3 = require_export();
var uncurryThis4 = require_function_uncurry_this();
var IndexedObject = require_indexed_object();
var toIndexedObject = require_to_indexed_object();
var arrayMethodIsStrict = require_array_method_is_strict();
var nativeJoin = uncurryThis4([].join);
var ES3_STRINGS = IndexedObject !== Object;
var FORCED = ES3_STRINGS || !arrayMethodIsStrict("join", ",");
$3({ target: "Array", proto: true, forced: FORCED }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject(this), separator === void 0 ? "," : separator);
  }
});

// node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

// node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

// node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}

// node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/slicedToArray.js
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}

// node_modules/core-js/modules/es.symbol.js
require_es_symbol_constructor();
require_es_symbol_for();
require_es_symbol_key_for();
require_es_json_stringify();
require_es_object_get_own_property_symbols();

// node_modules/core-js/modules/es.array.filter.js
var $4 = require_export();
var $filter = require_array_iteration().filter;
var arrayMethodHasSpeciesSupport2 = require_array_method_has_species_support();
var HAS_SPECIES_SUPPORT2 = arrayMethodHasSpeciesSupport2("filter");
$4({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT2 }, {
  filter: function filter(callbackfn) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.array.for-each.js
var $5 = require_export();
var forEach = require_array_for_each();
$5({ target: "Array", proto: true, forced: [].forEach !== forEach }, {
  forEach
});

// node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var $6 = require_export();
var fails2 = require_fails();
var toIndexedObject2 = require_to_indexed_object();
var nativeGetOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
var DESCRIPTORS = require_descriptors();
var FORCED2 = !DESCRIPTORS || fails2(function() {
  nativeGetOwnPropertyDescriptor(1);
});
$6({ target: "Object", stat: true, forced: FORCED2, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor2(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject2(it), key);
  }
});

// node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var $7 = require_export();
var DESCRIPTORS2 = require_descriptors();
var ownKeys = require_own_keys();
var toIndexedObject3 = require_to_indexed_object();
var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
var createProperty = require_create_property();
$7({ target: "Object", stat: true, sham: !DESCRIPTORS2 }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject3(object);
    var getOwnPropertyDescriptor5 = getOwnPropertyDescriptorModule.f;
    var keys2 = ownKeys(O);
    var result = {};
    var index2 = 0;
    var key, descriptor;
    while (keys2.length > index2) {
      descriptor = getOwnPropertyDescriptor5(O, key = keys2[index2++]);
      if (descriptor !== void 0) createProperty(result, key, descriptor);
    }
    return result;
  }
});

// node_modules/core-js/modules/es.object.keys.js
var $8 = require_export();
var toObject = require_to_object();
var nativeKeys = require_object_keys();
var fails3 = require_fails();
var FAILS_ON_PRIMITIVES = fails3(function() {
  nativeKeys(1);
});
$8({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});

// node_modules/core-js/modules/web.dom-collections.for-each.js
var globalThis2 = require_global_this();
var DOMIterables = require_dom_iterables();
var DOMTokenListPrototype = require_dom_token_list_prototype();
var forEach2 = require_array_for_each();
var createNonEnumerableProperty = require_create_non_enumerable_property();
var handlePrototype = function(CollectionPrototype) {
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach2) try {
    createNonEnumerableProperty(CollectionPrototype, "forEach", forEach2);
  } catch (error) {
    CollectionPrototype.forEach = forEach2;
  }
};
for (COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(globalThis2[COLLECTION_NAME] && globalThis2[COLLECTION_NAME].prototype);
  }
}
var COLLECTION_NAME;
handlePrototype(DOMTokenListPrototype);

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
var import_regenerator = __toESM(require_regenerator2());

// node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(n, t, e, r, o, a, c2) {
  try {
    var i = n[a](c2), u = i.value;
  } catch (n2) {
    return void e(n2);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function() {
    var t = this, e = arguments;
    return new Promise(function(r, o) {
      var a = n.apply(t, e);
      function _next(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n2);
      }
      function _throw(n2) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n2);
      }
      _next(void 0);
    });
  };
}

// node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}

// node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

// node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

// node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

// node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

// node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: false
  }), e;
}

// node_modules/core-js/modules/es.array.concat.js
var $9 = require_export();
var fails4 = require_fails();
var isArray = require_is_array();
var isObject3 = require_is_object();
var toObject2 = require_to_object();
var lengthOfArrayLike = require_length_of_array_like();
var doesNotExceedSafeInteger = require_does_not_exceed_safe_integer();
var createProperty2 = require_create_property();
var setArrayLength = require_array_set_length();
var arraySpeciesCreate = require_array_species_create();
var arrayMethodHasSpeciesSupport3 = require_array_method_has_species_support();
var wellKnownSymbol2 = require_well_known_symbol();
var V8_VERSION = require_environment_v8_version();
var IS_CONCAT_SPREADABLE = wellKnownSymbol2("isConcatSpreadable");
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails4(function() {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var isConcatSpreadable = function(O) {
  if (!isObject3(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== void 0 ? !!spreadable : isArray(O);
};
var FORCED3 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport3("concat");
$9({ target: "Array", proto: true, arity: 1, forced: FORCED3 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat2(arg) {
    var O = toObject2(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty2(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty2(A, n++, E);
      }
    }
    setArrayLength(A, n);
    return A;
  }
});

// node_modules/core-js/modules/es.array.every.js
var $10 = require_export();
var $every = require_array_iteration().every;
var arrayMethodIsStrict2 = require_array_method_is_strict();
var STRICT_METHOD = arrayMethodIsStrict2("every");
$10({ target: "Array", proto: true, forced: !STRICT_METHOD }, {
  every: function every(callbackfn) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.array.reduce.js
var $11 = require_export();
var $reduce = require_array_reduce().left;
var arrayMethodIsStrict3 = require_array_method_is_strict();
var CHROME_VERSION = require_environment_v8_version();
var IS_NODE = require_environment_is_node();
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED4 = CHROME_BUG || !arrayMethodIsStrict3("reduce");
$11({ target: "Array", proto: true, forced: FORCED4 }, {
  reduce: function reduce(callbackfn) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.object.to-string.js
var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
var defineBuiltIn = require_define_built_in();
var toString4 = require_object_to_string();
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, "toString", toString4, { unsafe: true });
}

// node_modules/core-js/modules/es.promise.js
require_es_promise_constructor();
require_es_promise_all();
require_es_promise_catch();
require_es_promise_race();
require_es_promise_reject();
require_es_promise_resolve();

// node_modules/core-js/modules/es.string.split.js
var call3 = require_function_call();
var uncurryThis5 = require_function_uncurry_this();
var fixRegExpWellKnownSymbolLogic3 = require_fix_regexp_well_known_symbol_logic();
var anObject3 = require_an_object();
var isObject4 = require_is_object();
var requireObjectCoercible4 = require_require_object_coercible();
var speciesConstructor = require_species_constructor();
var advanceStringIndex3 = require_advance_string_index();
var toLength4 = require_to_length();
var toString5 = require_to_string();
var getMethod3 = require_get_method();
var getRegExpFlags3 = require_regexp_get_flags();
var regExpExec3 = require_regexp_exec_abstract();
var stickyHelpers = require_regexp_sticky_helpers();
var fails5 = require_fails();
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 4294967295;
var min3 = Math.min;
var push2 = uncurryThis5([].push);
var stringSlice3 = uncurryThis5("".slice);
var stringIndexOf3 = uncurryThis5("".indexOf);
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails5(function() {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function() {
    return originalExec.apply(this, arguments);
  };
  var result = "ab".split(re);
  return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
});
var BUGGY = "abbc".split(/(b)*/)[1] === "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
"test".split(/(?:)/, -1).length !== 4 || "ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
".".split(/()()/).length > 1 || "".split(/.?/).length;
fixRegExpWellKnownSymbolLogic3("split", function(SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit = "0".split(void 0, 0).length ? function(separator, limit) {
    return separator === void 0 && limit === 0 ? [] : call3(nativeSplit, this, separator, limit);
  } : nativeSplit;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible4(this);
      var splitter = isObject4(separator) ? getMethod3(separator, SPLIT) : void 0;
      return splitter ? call3(splitter, separator, O, limit) : call3(internalSplit, toString5(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(string, limit) {
      var rx = anObject3(this);
      var S = toString5(string);
      if (!BUGGY) {
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;
      }
      var C = speciesConstructor(rx, RegExp);
      var flags = toString5(getRegExpFlags3(rx));
      var unicodeMatching = !!~stringIndexOf3(flags, "u") || !!~stringIndexOf3(flags, "v");
      if (UNSUPPORTED_Y) {
        if (!~stringIndexOf3(flags, "g")) flags += "g";
      } else if (!~stringIndexOf3(flags, "y")) flags += "y";
      var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags);
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return regExpExec3(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = regExpExec3(splitter, UNSUPPORTED_Y ? stringSlice3(S, q) : S);
        var e;
        if (z === null || (e = min3(toLength4(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
          q = advanceStringIndex3(S, q, unicodeMatching);
        } else {
          push2(A, stringSlice3(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push2(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push2(A, stringSlice3(S, p));
      return A;
    }
  ];
}, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
var import_raf = __toESM(require_raf());

// node_modules/core-js/modules/es.function.name.js
var DESCRIPTORS3 = require_descriptors();
var FUNCTION_NAME_EXISTS = require_function_name().EXISTS;
var uncurryThis6 = require_function_uncurry_this();
var defineBuiltInAccessor = require_define_built_in_accessor();
var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis6(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec4 = uncurryThis6(nameRE.exec);
var NAME = "name";
if (DESCRIPTORS3 && !FUNCTION_NAME_EXISTS) {
  defineBuiltInAccessor(FunctionPrototype, NAME, {
    configurable: true,
    get: function() {
      try {
        return regExpExec4(nameRE, functionToString(this))[1];
      } catch (error) {
        return "";
      }
    }
  });
}

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
var import_rgbcolor = __toESM(require_rgbcolor());

// node_modules/core-js/modules/es.reflect.construct.js
var $12 = require_export();
var getBuiltIn = require_get_built_in();
var apply2 = require_function_apply();
var bind = require_function_bind();
var aConstructor = require_a_constructor();
var anObject4 = require_an_object();
var isObject5 = require_is_object();
var create = require_object_create();
var fails6 = require_fails();
var nativeConstruct = getBuiltIn("Reflect", "construct");
var ObjectPrototype = Object.prototype;
var push3 = [].push;
var NEW_TARGET_BUG = fails6(function() {
  function F() {
  }
  return !(nativeConstruct(function() {
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails6(function() {
  nativeConstruct(function() {
  });
});
var FORCED5 = NEW_TARGET_BUG || ARGS_BUG;
$12({ target: "Reflect", stat: true, forced: FORCED5, sham: FORCED5 }, {
  construct: function construct(Target, args) {
    aConstructor(Target);
    var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2]);
    anObject4(args);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target === newTarget) {
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      var $args = [null];
      apply2(push3, $args, args);
      return new (apply2(bind, Target, $args))();
    }
    var proto = newTarget.prototype;
    var instance = create(isObject5(proto) ? proto : ObjectPrototype);
    var result = apply2(Target, instance, args);
    return isObject5(result) ? result : instance;
  }
});

// node_modules/core-js/modules/es.regexp.to-string.js
var PROPER_FUNCTION_NAME = require_function_name().PROPER;
var defineBuiltIn2 = require_define_built_in();
var anObject5 = require_an_object();
var $toString = require_to_string();
var fails7 = require_fails();
var getRegExpFlags4 = require_regexp_get_flags();
var TO_STRING = "toString";
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];
var NOT_GENERIC = fails7(function() {
  return nativeToString.call({ source: "a", flags: "b" }) !== "/a/b";
});
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn2(RegExpPrototype, TO_STRING, function toString9() {
    var R = anObject5(this);
    var pattern = $toString(R.source);
    var flags = $toString(getRegExpFlags4(R));
    return "/" + pattern + "/" + flags;
  }, { unsafe: true });
}

// node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

// node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

// node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, _getPrototypeOf(t);
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inherits.js
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t, "prototype", {
    writable: false
  }), e && _setPrototypeOf(t, e);
}

// node_modules/core-js/modules/es.array.from.js
var $13 = require_export();
var from = require_array_from();
var checkCorrectnessOfIteration = require_check_correctness_of_iteration();
var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
  Array.from(iterable);
});
$13({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
  from
});

// node_modules/core-js/modules/es.array.includes.js
var $14 = require_export();
var $includes = require_array_includes().includes;
var fails8 = require_fails();
var addToUnscopables = require_add_to_unscopables();
var BROKEN_ON_SPARSE = fails8(function() {
  return !Array(1).includes();
});
var BROKEN_ON_SPARSE_WITH_FROM_INDEX = fails8(function() {
  return [, 1].includes(void 0, 1);
});
$14({ target: "Array", proto: true, forced: BROKEN_ON_SPARSE || BROKEN_ON_SPARSE_WITH_FROM_INDEX }, {
  includes: function includes(el) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables("includes");

// node_modules/core-js/modules/es.array.some.js
var $15 = require_export();
var $some = require_array_iteration().some;
var arrayMethodIsStrict4 = require_array_method_is_strict();
var STRICT_METHOD2 = arrayMethodIsStrict4("some");
$15({ target: "Array", proto: true, forced: !STRICT_METHOD2 }, {
  some: function some(callbackfn) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});

// node_modules/core-js/modules/es.string.includes.js
var $16 = require_export();
var uncurryThis7 = require_function_uncurry_this();
var notARegExp2 = require_not_a_regexp();
var requireObjectCoercible5 = require_require_object_coercible();
var toString6 = require_to_string();
var correctIsRegExpLogic2 = require_correct_is_regexp_logic();
var stringIndexOf4 = uncurryThis7("".indexOf);
$16({ target: "String", proto: true, forced: !correctIsRegExpLogic2("includes") }, {
  includes: function includes2(searchString) {
    return !!~stringIndexOf4(
      toString6(requireObjectCoercible5(this)),
      toString6(notARegExp2(searchString)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});

// node_modules/core-js/modules/es.string.iterator.js
var charAt = require_string_multibyte().charAt;
var toString7 = require_to_string();
var InternalStateModule = require_internal_state();
var defineIterator = require_iterator_define();
var createIterResultObject = require_create_iter_result_object();
var STRING_ITERATOR = "String Iterator";
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
defineIterator(String, "String", function(iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString7(iterated),
    index: 0
  });
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index2 = state.index;
  var point;
  if (index2 >= string.length) return createIterResultObject(void 0, true);
  point = charAt(string, index2);
  state.index += point.length;
  return createIterResultObject(point, false);
});

// node_modules/core-js/modules/es.string.trim.js
var $17 = require_export();
var $trim = require_string_trim().trim;
var forcedStringTrimMethod = require_string_trim_forced();
$17({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
  trim: function trim() {
    return $trim(this);
  }
});

// node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}

// node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

// node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}

// node_modules/core-js/modules/es.array.index-of.js
var $18 = require_export();
var uncurryThis8 = require_function_uncurry_this_clause();
var $indexOf = require_array_includes().indexOf;
var arrayMethodIsStrict5 = require_array_method_is_strict();
var nativeIndexOf = uncurryThis8([].indexOf);
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED6 = NEGATIVE_ZERO || !arrayMethodIsStrict5("indexOf");
$18({ target: "Array", proto: true, forced: FORCED6 }, {
  indexOf: function indexOf(searchElement) {
    var fromIndex = arguments.length > 1 ? arguments[1] : void 0;
    return NEGATIVE_ZERO ? nativeIndexOf(this, searchElement, fromIndex) || 0 : $indexOf(this, searchElement, fromIndex);
  }
});

// node_modules/core-js/modules/es.array.reverse.js
var $19 = require_export();
var uncurryThis9 = require_function_uncurry_this();
var isArray2 = require_is_array();
var nativeReverse = uncurryThis9([].reverse);
var test = [1, 2];
$19({ target: "Array", proto: true, forced: String(test) === String(test.reverse()) }, {
  reverse: function reverse() {
    if (isArray2(this)) this.length = this.length;
    return nativeReverse(this);
  }
});

// node_modules/@babel/runtime/helpers/esm/superPropBase.js
function _superPropBase(t, o) {
  for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t)); ) ;
  return t;
}

// node_modules/@babel/runtime/helpers/esm/get.js
function _get() {
  return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(e, t, r) {
    var p = _superPropBase(e, t);
    if (p) {
      var n = Object.getOwnPropertyDescriptor(p, t);
      return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value;
    }
  }, _get.apply(null, arguments);
}

// node_modules/core-js/modules/es.number.constructor.js
var $20 = require_export();
var IS_PURE2 = require_is_pure();
var DESCRIPTORS4 = require_descriptors();
var globalThis3 = require_global_this();
var path = require_path();
var uncurryThis10 = require_function_uncurry_this();
var isForced = require_is_forced();
var hasOwn = require_has_own_property();
var inheritIfRequired = require_inherit_if_required();
var isPrototypeOf = require_object_is_prototype_of();
var isSymbol = require_is_symbol();
var toPrimitive2 = require_to_primitive();
var fails9 = require_fails();
var getOwnPropertyNames = require_object_get_own_property_names().f;
var getOwnPropertyDescriptor3 = require_object_get_own_property_descriptor().f;
var defineProperty = require_object_define_property().f;
var thisNumberValue = require_this_number_value();
var trim2 = require_string_trim().trim;
var NUMBER = "Number";
var NativeNumber = globalThis3[NUMBER];
var PureNumberNamespace = path[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError2 = globalThis3.TypeError;
var stringSlice4 = uncurryThis10("".slice);
var charCodeAt = uncurryThis10("".charCodeAt);
var toNumeric = function(value) {
  var primValue = toPrimitive2(value, "number");
  return typeof primValue == "bigint" ? primValue : toNumber(primValue);
};
var toNumber = function(argument) {
  var it = toPrimitive2(argument, "number");
  var first, third, radix, maxCode, digits, length, index2, code;
  if (isSymbol(it)) throw new TypeError2("Cannot convert a Symbol value to a number");
  if (typeof it == "string" && it.length > 2) {
    it = trim2(it);
    first = charCodeAt(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt(it, 2);
      if (third === 88 || third === 120) return NaN;
    } else if (first === 48) {
      switch (charCodeAt(it, 1)) {
        // fast equal of /^0b[01]+$/i
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0o[0-7]+$/i
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      digits = stringSlice4(it, 2);
      length = digits.length;
      for (index2 = 0; index2 < length; index2++) {
        code = charCodeAt(digits, index2);
        if (code < 48 || code > maxCode) return NaN;
      }
      return parseInt(digits, radix);
    }
  }
  return +it;
};
var FORCED7 = isForced(NUMBER, !NativeNumber(" 0o1") || !NativeNumber("0b1") || NativeNumber("+0x1"));
var calledWithNew = function(dummy) {
  return isPrototypeOf(NumberPrototype, dummy) && fails9(function() {
    thisNumberValue(dummy);
  });
};
var NumberWrapper = function Number2(value) {
  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
  return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n;
};
NumberWrapper.prototype = NumberPrototype;
if (FORCED7 && !IS_PURE2) NumberPrototype.constructor = NumberWrapper;
$20({ global: true, constructor: true, wrap: true, forced: FORCED7 }, {
  Number: NumberWrapper
});
var copyConstructorProperties = function(target, source) {
  for (var keys2 = DESCRIPTORS4 ? getOwnPropertyNames(source) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), j = 0, key; keys2.length > j; j++) {
    if (hasOwn(source, key = keys2[j]) && !hasOwn(target, key)) {
      defineProperty(target, key, getOwnPropertyDescriptor3(source, key));
    }
  }
};
if (IS_PURE2 && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace);
if (FORCED7 || IS_PURE2) copyConstructorProperties(path[NUMBER], NativeNumber);

// node_modules/core-js/modules/es.array.fill.js
var $21 = require_export();
var fill = require_array_fill();
var addToUnscopables2 = require_add_to_unscopables();
$21({ target: "Array", proto: true }, {
  fill
});
addToUnscopables2("fill");

// node_modules/core-js/modules/es.reflect.delete-property.js
var $22 = require_export();
var anObject6 = require_an_object();
var getOwnPropertyDescriptor4 = require_object_get_own_property_descriptor().f;
var toPropertyKey2 = require_to_property_key();
$22({ target: "Reflect", stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    anObject6(target);
    var key = toPropertyKey2(propertyKey);
    var descriptor = getOwnPropertyDescriptor4(target, key);
    return descriptor && !descriptor.configurable ? false : delete target[key];
  }
});

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
var import_es_array14 = __toESM(require_es_array_iterator());

// node_modules/core-js/modules/web.dom-collections.iterator.js
var globalThis4 = require_global_this();
var DOMIterables2 = require_dom_iterables();
var DOMTokenListPrototype2 = require_dom_token_list_prototype();
var ArrayIteratorMethods = require_es_array_iterator();
var createNonEnumerableProperty2 = require_create_non_enumerable_property();
var setToStringTag = require_set_to_string_tag();
var wellKnownSymbol3 = require_well_known_symbol();
var ITERATOR = wellKnownSymbol3("iterator");
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype2 = function(CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty2(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
    if (DOMIterables2[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty2(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};
for (COLLECTION_NAME in DOMIterables2) {
  handlePrototype2(globalThis4[COLLECTION_NAME] && globalThis4[COLLECTION_NAME].prototype, COLLECTION_NAME);
}
var COLLECTION_NAME;
handlePrototype2(DOMTokenListPrototype2, "DOMTokenList");

// node_modules/core-js/modules/es.symbol.description.js
var $23 = require_export();
var DESCRIPTORS5 = require_descriptors();
var globalThis5 = require_global_this();
var call4 = require_function_call();
var uncurryThis11 = require_function_uncurry_this();
var hasOwn2 = require_has_own_property();
var isCallable2 = require_is_callable();
var isPrototypeOf2 = require_object_is_prototype_of();
var toString8 = require_to_string();
var defineBuiltInAccessor2 = require_define_built_in_accessor();
var copyConstructorProperties2 = require_copy_constructor_properties();
var NativeSymbol = globalThis5.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;
if (DESCRIPTORS5 && isCallable2(NativeSymbol) && (!("description" in SymbolPrototype) || // Safari 12 bug
NativeSymbol().description !== void 0)) {
  EmptyStringDescriptionStore = {};
  SymbolWrapper = function Symbol2() {
    var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : toString8(arguments[0]);
    var result = isPrototypeOf2(SymbolPrototype, this) ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
    if (description === "") EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties2(SymbolWrapper, NativeSymbol);
  nativeFor = SymbolWrapper["for"];
  SymbolWrapper["for"] = { "for": function(key) {
    var stringKey = toString8(key);
    var symbol = call4(nativeFor, this, stringKey);
    if (stringKey === "") EmptyStringDescriptionStore[symbol] = true;
    return symbol;
  } }["for"];
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;
  NATIVE_SYMBOL = String(NativeSymbol("description detection")) === "Symbol(description detection)";
  thisSymbolValue = uncurryThis11(SymbolPrototype.valueOf);
  symbolDescriptiveString = uncurryThis11(SymbolPrototype.toString);
  regexp = /^Symbol\((.*)\)[^)]+$/;
  replace = uncurryThis11("".replace);
  stringSlice5 = uncurryThis11("".slice);
  defineBuiltInAccessor2(SymbolPrototype, "description", {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn2(EmptyStringDescriptionStore, symbol)) return "";
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL ? stringSlice5(string, 7, -1) : replace(string, regexp, "$1");
      return desc === "" ? void 0 : desc;
    }
  });
  $23({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}
var EmptyStringDescriptionStore;
var SymbolWrapper;
var nativeFor;
var NATIVE_SYMBOL;
var thisSymbolValue;
var symbolDescriptiveString;
var regexp;
var replace;
var stringSlice5;

// node_modules/core-js/modules/es.symbol.iterator.js
var defineWellKnownSymbol = require_well_known_symbol_define();
defineWellKnownSymbol("iterator");

// node_modules/core-js/modules/es.array.slice.js
var $24 = require_export();
var isArray3 = require_is_array();
var isConstructor = require_is_constructor();
var isObject6 = require_is_object();
var toAbsoluteIndex = require_to_absolute_index();
var lengthOfArrayLike2 = require_length_of_array_like();
var toIndexedObject4 = require_to_indexed_object();
var createProperty3 = require_create_property();
var setArrayLength2 = require_array_set_length();
var wellKnownSymbol4 = require_well_known_symbol();
var arrayMethodHasSpeciesSupport4 = require_array_method_has_species_support();
var nativeSlice = require_array_slice();
var HAS_SPECIES_SUPPORT3 = arrayMethodHasSpeciesSupport4("slice");
var SPECIES = wellKnownSymbol4("species");
var $Array = Array;
var max2 = Math.max;
$24({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT3 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject4(this);
    var length = lengthOfArrayLike2(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
    var Constructor, result, n;
    if (isArray3(O)) {
      Constructor = O.constructor;
      if (isConstructor(Constructor) && (Constructor === $Array || isArray3(Constructor.prototype))) {
        Constructor = void 0;
      } else if (isObject6(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = void 0;
      }
      if (Constructor === $Array || Constructor === void 0) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor === void 0 ? $Array : Constructor)(max2(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty3(result, n, O[k]);
    setArrayLength2(result, n);
    return result;
  }
});

// node_modules/core-js/modules/es.map.js
require_es_map_constructor();

// node_modules/core-js/modules/es.reflect.apply.js
var $25 = require_export();
var functionApply = require_function_apply();
var aCallable = require_a_callable();
var anObject7 = require_an_object();
var fails10 = require_fails();
var OPTIONAL_ARGUMENTS_LIST = !fails10(function() {
  Reflect.apply(function() {
  });
});
$25({ target: "Reflect", stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply3(target, thisArgument, argumentsList) {
    return functionApply(aCallable(target), thisArgument, anObject7(argumentsList));
  }
});

// node_modules/core-js/modules/es.reflect.get-prototype-of.js
var $26 = require_export();
var anObject8 = require_an_object();
var objectGetPrototypeOf = require_object_get_prototype_of();
var CORRECT_PROTOTYPE_GETTER = require_correct_prototype_getter();
$26({ target: "Reflect", stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject8(target));
  }
});

// node_modules/stackblur-canvas/dist/stackblur-es.js
function _typeof2(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof2 = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof2(obj);
}
function _classCallCheck2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
var shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
function getImageDataFromCanvas(canvas, topX, topY, width, height) {
  if (typeof canvas === "string") {
    canvas = document.getElementById(canvas);
  }
  if (!canvas || _typeof2(canvas) !== "object" || !("getContext" in canvas)) {
    throw new TypeError("Expecting canvas with `getContext` method in processCanvasRGB(A) calls!");
  }
  var context = canvas.getContext("2d");
  try {
    return context.getImageData(topX, topY, width, height);
  } catch (e) {
    throw new Error("unable to access image data: " + e);
  }
}
function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
  if (isNaN(radius) || radius < 1) {
    return;
  }
  radius |= 0;
  var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
  imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
  canvas.getContext("2d").putImageData(imageData, topX, topY);
}
function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
  var pixels = imageData.data;
  var div = 2 * radius + 1;
  var widthMinus1 = width - 1;
  var heightMinus1 = height - 1;
  var radiusPlus1 = radius + 1;
  var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
  var stackStart = new BlurStack();
  var stack = stackStart;
  var stackEnd;
  for (var i = 1; i < div; i++) {
    stack = stack.next = new BlurStack();
    if (i === radiusPlus1) {
      stackEnd = stack;
    }
  }
  stack.next = stackStart;
  var stackIn = null, stackOut = null, yw = 0, yi = 0;
  var mulSum = mulTable[radius];
  var shgSum = shgTable[radius];
  for (var y = 0; y < height; y++) {
    stack = stackStart;
    var pr = pixels[yi], pg = pixels[yi + 1], pb = pixels[yi + 2], pa = pixels[yi + 3];
    for (var _i = 0; _i < radiusPlus1; _i++) {
      stack.r = pr;
      stack.g = pg;
      stack.b = pb;
      stack.a = pa;
      stack = stack.next;
    }
    var rInSum = 0, gInSum = 0, bInSum = 0, aInSum = 0, rOutSum = radiusPlus1 * pr, gOutSum = radiusPlus1 * pg, bOutSum = radiusPlus1 * pb, aOutSum = radiusPlus1 * pa, rSum = sumFactor * pr, gSum = sumFactor * pg, bSum = sumFactor * pb, aSum = sumFactor * pa;
    for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
      var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
      var r = pixels[p], g = pixels[p + 1], b = pixels[p + 2], a = pixels[p + 3];
      var rbs = radiusPlus1 - _i2;
      rSum += (stack.r = r) * rbs;
      gSum += (stack.g = g) * rbs;
      bSum += (stack.b = b) * rbs;
      aSum += (stack.a = a) * rbs;
      rInSum += r;
      gInSum += g;
      bInSum += b;
      aInSum += a;
      stack = stack.next;
    }
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var x = 0; x < width; x++) {
      var paInitial = aSum * mulSum >>> shgSum;
      pixels[yi + 3] = paInitial;
      if (paInitial !== 0) {
        var _a2 = 255 / paInitial;
        pixels[yi] = (rSum * mulSum >>> shgSum) * _a2;
        pixels[yi + 1] = (gSum * mulSum >>> shgSum) * _a2;
        pixels[yi + 2] = (bSum * mulSum >>> shgSum) * _a2;
      } else {
        pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
      }
      rSum -= rOutSum;
      gSum -= gOutSum;
      bSum -= bOutSum;
      aSum -= aOutSum;
      rOutSum -= stackIn.r;
      gOutSum -= stackIn.g;
      bOutSum -= stackIn.b;
      aOutSum -= stackIn.a;
      var _p = x + radius + 1;
      _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
      rInSum += stackIn.r = pixels[_p];
      gInSum += stackIn.g = pixels[_p + 1];
      bInSum += stackIn.b = pixels[_p + 2];
      aInSum += stackIn.a = pixels[_p + 3];
      rSum += rInSum;
      gSum += gInSum;
      bSum += bInSum;
      aSum += aInSum;
      stackIn = stackIn.next;
      var _stackOut = stackOut, _r = _stackOut.r, _g = _stackOut.g, _b = _stackOut.b, _a = _stackOut.a;
      rOutSum += _r;
      gOutSum += _g;
      bOutSum += _b;
      aOutSum += _a;
      rInSum -= _r;
      gInSum -= _g;
      bInSum -= _b;
      aInSum -= _a;
      stackOut = stackOut.next;
      yi += 4;
    }
    yw += width;
  }
  for (var _x = 0; _x < width; _x++) {
    yi = _x << 2;
    var _pr = pixels[yi], _pg = pixels[yi + 1], _pb = pixels[yi + 2], _pa = pixels[yi + 3], _rOutSum = radiusPlus1 * _pr, _gOutSum = radiusPlus1 * _pg, _bOutSum = radiusPlus1 * _pb, _aOutSum = radiusPlus1 * _pa, _rSum = sumFactor * _pr, _gSum = sumFactor * _pg, _bSum = sumFactor * _pb, _aSum = sumFactor * _pa;
    stack = stackStart;
    for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
      stack.r = _pr;
      stack.g = _pg;
      stack.b = _pb;
      stack.a = _pa;
      stack = stack.next;
    }
    var yp = width;
    var _gInSum = 0, _bInSum = 0, _aInSum = 0, _rInSum = 0;
    for (var _i4 = 1; _i4 <= radius; _i4++) {
      yi = yp + _x << 2;
      var _rbs = radiusPlus1 - _i4;
      _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
      _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
      _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
      _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
      _rInSum += _pr;
      _gInSum += _pg;
      _bInSum += _pb;
      _aInSum += _pa;
      stack = stack.next;
      if (_i4 < heightMinus1) {
        yp += width;
      }
    }
    yi = _x;
    stackIn = stackStart;
    stackOut = stackEnd;
    for (var _y = 0; _y < height; _y++) {
      var _p2 = yi << 2;
      pixels[_p2 + 3] = _pa = _aSum * mulSum >>> shgSum;
      if (_pa > 0) {
        _pa = 255 / _pa;
        pixels[_p2] = (_rSum * mulSum >>> shgSum) * _pa;
        pixels[_p2 + 1] = (_gSum * mulSum >>> shgSum) * _pa;
        pixels[_p2 + 2] = (_bSum * mulSum >>> shgSum) * _pa;
      } else {
        pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
      }
      _rSum -= _rOutSum;
      _gSum -= _gOutSum;
      _bSum -= _bOutSum;
      _aSum -= _aOutSum;
      _rOutSum -= stackIn.r;
      _gOutSum -= stackIn.g;
      _bOutSum -= stackIn.b;
      _aOutSum -= stackIn.a;
      _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
      _rSum += _rInSum += stackIn.r = pixels[_p2];
      _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
      _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
      _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
      stackIn = stackIn.next;
      _rOutSum += _pr = stackOut.r;
      _gOutSum += _pg = stackOut.g;
      _bOutSum += _pb = stackOut.b;
      _aOutSum += _pa = stackOut.a;
      _rInSum -= _pr;
      _gInSum -= _pg;
      _bInSum -= _pb;
      _aInSum -= _pa;
      stackOut = stackOut.next;
      yi += width;
    }
  }
  return imageData;
}
var BlurStack = (
  /**
   * Set properties.
   */
  function BlurStack2() {
    _classCallCheck2(this, BlurStack2);
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  }
);

// node_modules/@amcharts/amcharts4/.internal/canvg/index.js
function compressSpaces(str) {
  return str.replace(/(?!\u3000)\s+/gm, " ");
}
function trimLeft(str) {
  return str.replace(/^[\n \t]+/, "");
}
function trimRight(str) {
  return str.replace(/[\n \t]+$/, "");
}
function toNumbers(str) {
  var matches = (str || "").match(/-?(\d+(?:\.\d*(?:[eE][+-]?\d+)?)?|\.\d+)(?=\D|$)/gm) || [];
  return matches.map(parseFloat);
}
var allUppercase = /^[A-Z-]+$/;
function normalizeAttributeName(name) {
  if (allUppercase.test(name)) {
    return name.toLowerCase();
  }
  return name;
}
function parseExternalUrl(url) {
  var urlMatch = url.match(/url\(('([^']+)'|"([^"]+)"|([^'"\)]+))\)/) || [];
  return urlMatch[2] || urlMatch[3] || urlMatch[4];
}
function normalizeColor(color) {
  if (!color.startsWith("rgb")) {
    return color;
  }
  var rgbParts = 3;
  var normalizedColor = color.replace(/\d+(\.\d+)?/g, function(num, isFloat) {
    return rgbParts-- && isFloat ? String(Math.round(parseFloat(num))) : num;
  });
  return normalizedColor;
}
var attributeRegex = /(\[[^\]]+\])/g;
var idRegex = /(#[^\s\+>~\.\[:]+)/g;
var classRegex = /(\.[^\s\+>~\.\[:]+)/g;
var pseudoElementRegex = /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi;
var pseudoClassWithBracketsRegex = /(:[\w-]+\([^\)]*\))/gi;
var pseudoClassRegex = /(:[^\s\+>~\.\[:]+)/g;
var elementRegex = /([^\s\+>~\.\[:]+)/g;
function findSelectorMatch(selector, regex) {
  var matches = selector.match(regex);
  if (!matches) {
    return [selector, 0];
  }
  return [selector.replace(regex, " "), matches.length];
}
function getSelectorSpecificity(selector) {
  var specificity = [0, 0, 0];
  var currentSelector = selector.replace(/:not\(([^\)]*)\)/g, "     $1 ").replace(/{[\s\S]*/gm, " ");
  var delta = 0;
  var _findSelectorMatch = findSelectorMatch(currentSelector, attributeRegex);
  var _findSelectorMatch2 = _slicedToArray(_findSelectorMatch, 2);
  currentSelector = _findSelectorMatch2[0];
  delta = _findSelectorMatch2[1];
  specificity[1] += delta;
  var _findSelectorMatch3 = findSelectorMatch(currentSelector, idRegex);
  var _findSelectorMatch4 = _slicedToArray(_findSelectorMatch3, 2);
  currentSelector = _findSelectorMatch4[0];
  delta = _findSelectorMatch4[1];
  specificity[0] += delta;
  var _findSelectorMatch5 = findSelectorMatch(currentSelector, classRegex);
  var _findSelectorMatch6 = _slicedToArray(_findSelectorMatch5, 2);
  currentSelector = _findSelectorMatch6[0];
  delta = _findSelectorMatch6[1];
  specificity[1] += delta;
  var _findSelectorMatch7 = findSelectorMatch(currentSelector, pseudoElementRegex);
  var _findSelectorMatch8 = _slicedToArray(_findSelectorMatch7, 2);
  currentSelector = _findSelectorMatch8[0];
  delta = _findSelectorMatch8[1];
  specificity[2] += delta;
  var _findSelectorMatch9 = findSelectorMatch(currentSelector, pseudoClassWithBracketsRegex);
  var _findSelectorMatch10 = _slicedToArray(_findSelectorMatch9, 2);
  currentSelector = _findSelectorMatch10[0];
  delta = _findSelectorMatch10[1];
  specificity[1] += delta;
  var _findSelectorMatch11 = findSelectorMatch(currentSelector, pseudoClassRegex);
  var _findSelectorMatch12 = _slicedToArray(_findSelectorMatch11, 2);
  currentSelector = _findSelectorMatch12[0];
  delta = _findSelectorMatch12[1];
  specificity[1] += delta;
  currentSelector = currentSelector.replace(/[\*\s\+>~]/g, " ").replace(/[#\.]/g, " ");
  var _findSelectorMatch13 = findSelectorMatch(currentSelector, elementRegex);
  var _findSelectorMatch14 = _slicedToArray(_findSelectorMatch13, 2);
  currentSelector = _findSelectorMatch14[0];
  delta = _findSelectorMatch14[1];
  specificity[2] += delta;
  return specificity.join("");
}
var PSEUDO_ZERO = 1e-8;
function vectorMagnitude(v) {
  return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
}
function vectorsRatio(u, v) {
  return (u[0] * v[0] + u[1] * v[1]) / (vectorMagnitude(u) * vectorMagnitude(v));
}
function vectorsAngle(u, v) {
  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vectorsRatio(u, v));
}
function CB1(t) {
  return t * t * t;
}
function CB2(t) {
  return 3 * t * t * (1 - t);
}
function CB3(t) {
  return 3 * t * (1 - t) * (1 - t);
}
function CB4(t) {
  return (1 - t) * (1 - t) * (1 - t);
}
function QB1(t) {
  return t * t;
}
function QB2(t) {
  return 2 * t * (1 - t);
}
function QB3(t) {
  return (1 - t) * (1 - t);
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var runtime_1 = createCommonjsModule(function(module) {
  var runtime = (function(exports) {
    var Op = Object.prototype;
    var hasOwn3 = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self2, context);
      return generator;
    }
    exports.wrap = wrap;
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function() {
      return this;
    };
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn3.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return {
        __await: arg
      };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn3.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
      }
      this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function() {
      return this;
    };
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self2, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self2, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        context.delegate = null;
        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";
    Gp[iteratorSymbol] = function() {
      return this;
    };
    Gp.toString = function() {
      return "[object Generator]";
    };
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(object) {
      var keys2 = [];
      for (var key in object) {
        keys2.push(key);
      }
      keys2.reverse();
      return function next2() {
        while (keys2.length) {
          var key2 = keys2.pop();
          if (key2 in object) {
            next2.value = key2;
            next2.done = false;
            return next2;
          }
        }
        next2.done = true;
        return next2;
      };
    };
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next2 = function next3() {
            while (++i < iterable.length) {
              if (hasOwn3.call(iterable, i)) {
                next3.value = iterable[i];
                next3.done = false;
                return next3;
              }
            }
            next3.value = undefined$1;
            next3.done = true;
            return next3;
          };
          return next2.next = next2;
        }
      }
      return {
        next: doneResult
      };
    }
    exports.values = values;
    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn3.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn3.call(entry, "catchLoc");
            var hasFinally = hasOwn3.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn3.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  })(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  );
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});
var Property = (function() {
  function Property2(document2, name, value) {
    _classCallCheck(this, Property2);
    this.document = document2;
    this.name = name;
    this.value = value;
    this.isNormalizedColor = false;
  }
  _createClass(Property2, [{
    key: "hasValue",
    value: function hasValue() {
      var value = this.value;
      return value !== null && value !== "" && value !== 0 && typeof value !== "undefined";
    }
  }, {
    key: "isString",
    value: function isString(regexp) {
      var value = this.value;
      var result = typeof value === "string";
      if (!result || !regexp) {
        return result;
      }
      return regexp.test(value);
    }
  }, {
    key: "isUrlDefinition",
    value: function isUrlDefinition() {
      return this.isString(/^url\(/);
    }
  }, {
    key: "isPixels",
    value: function isPixels() {
      if (!this.hasValue()) {
        return false;
      }
      var asString = this.getString();
      switch (true) {
        case /px$/.test(asString):
        case /^[0-9]+$/.test(asString):
          return true;
        default:
          return false;
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.value = value;
      return this;
    }
  }, {
    key: "getValue",
    value: function getValue(def) {
      if (typeof def === "undefined" || this.hasValue()) {
        return this.value;
      }
      return def;
    }
  }, {
    key: "getNumber",
    value: function getNumber(def) {
      if (!this.hasValue()) {
        if (typeof def === "undefined") {
          return 0;
        }
        return parseFloat(def);
      }
      var value = this.value;
      var n = parseFloat(value);
      if (this.isString(/%$/)) {
        n = n / 100;
      }
      return n;
    }
  }, {
    key: "getString",
    value: function getString(def) {
      if (typeof def === "undefined" || this.hasValue()) {
        return typeof this.value === "undefined" ? "" : String(this.value);
      }
      return String(def);
    }
  }, {
    key: "getColor",
    value: function getColor(def) {
      var color = this.getString(def);
      if (this.isNormalizedColor) {
        return color;
      }
      this.isNormalizedColor = true;
      color = normalizeColor(color);
      this.value = color;
      return color;
    }
  }, {
    key: "getDpi",
    value: function getDpi() {
      return 96;
    }
  }, {
    key: "getRem",
    value: function getRem() {
      return this.document.rootEmSize;
    }
  }, {
    key: "getEm",
    value: function getEm() {
      return this.document.emSize;
    }
  }, {
    key: "getUnits",
    value: function getUnits() {
      return this.getString().replace(/[0-9\.\-]/g, "");
    }
  }, {
    key: "getPixels",
    value: function getPixels(axisOrIsFontSize) {
      var processPercent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (!this.hasValue()) {
        return 0;
      }
      var _ref = typeof axisOrIsFontSize === "boolean" ? [void 0, axisOrIsFontSize] : [axisOrIsFontSize], _ref2 = _slicedToArray(_ref, 2), axis = _ref2[0], isFontSize = _ref2[1];
      var viewPort = this.document.screen.viewPort;
      switch (true) {
        case this.isString(/vmin$/):
          return this.getNumber() / 100 * Math.min(viewPort.computeSize("x"), viewPort.computeSize("y"));
        case this.isString(/vmax$/):
          return this.getNumber() / 100 * Math.max(viewPort.computeSize("x"), viewPort.computeSize("y"));
        case this.isString(/vw$/):
          return this.getNumber() / 100 * viewPort.computeSize("x");
        case this.isString(/vh$/):
          return this.getNumber() / 100 * viewPort.computeSize("y");
        case this.isString(/rem$/):
          return this.getNumber() * this.getRem();
        case this.isString(/em$/):
          return this.getNumber() * this.getEm();
        case this.isString(/ex$/):
          return this.getNumber() * this.getEm() / 2;
        case this.isString(/px$/):
          return this.getNumber();
        case this.isString(/pt$/):
          return this.getNumber() * this.getDpi() * (1 / 72);
        case this.isString(/pc$/):
          return this.getNumber() * 15;
        case this.isString(/cm$/):
          return this.getNumber() * this.getDpi() / 2.54;
        case this.isString(/mm$/):
          return this.getNumber() * this.getDpi() / 25.4;
        case this.isString(/in$/):
          return this.getNumber() * this.getDpi();
        case (this.isString(/%$/) && isFontSize):
          return this.getNumber() * this.getEm();
        case this.isString(/%$/):
          return this.getNumber() * viewPort.computeSize(axis);
        default: {
          var n = this.getNumber();
          if (processPercent && n < 1) {
            return n * viewPort.computeSize(axis);
          }
          return n;
        }
      }
    }
  }, {
    key: "getMilliseconds",
    value: function getMilliseconds() {
      if (!this.hasValue()) {
        return 0;
      }
      if (this.isString(/ms$/)) {
        return this.getNumber();
      }
      return this.getNumber() * 1e3;
    }
  }, {
    key: "getRadians",
    value: function getRadians() {
      if (!this.hasValue()) {
        return 0;
      }
      switch (true) {
        case this.isString(/deg$/):
          return this.getNumber() * (Math.PI / 180);
        case this.isString(/grad$/):
          return this.getNumber() * (Math.PI / 200);
        case this.isString(/rad$/):
          return this.getNumber();
        default:
          return this.getNumber() * (Math.PI / 180);
      }
    }
  }, {
    key: "getDefinition",
    value: function getDefinition() {
      var asString = this.getString();
      var name = asString.match(/#([^\)'"]+)/);
      if (name) {
        name = name[1];
      }
      if (!name) {
        name = asString;
      }
      return this.document.definitions[name];
    }
  }, {
    key: "getFillStyleDefinition",
    value: function getFillStyleDefinition(element, opacity) {
      var def = this.getDefinition();
      if (!def) {
        return null;
      }
      if (typeof def.createGradient === "function") {
        return def.createGradient(this.document.ctx, element, opacity);
      }
      if (typeof def.createPattern === "function") {
        if (def.getHrefAttribute().hasValue()) {
          var patternTransform = def.getAttribute("patternTransform");
          def = def.getHrefAttribute().getDefinition();
          if (patternTransform.hasValue()) {
            def.getAttribute("patternTransform", true).setValue(patternTransform.value);
          }
        }
        return def.createPattern(this.document.ctx, element, opacity);
      }
      return null;
    }
  }, {
    key: "getTextBaseline",
    value: function getTextBaseline() {
      if (!this.hasValue()) {
        return null;
      }
      return Property2.textBaselineMapping[this.getString()];
    }
  }, {
    key: "addOpacity",
    value: function addOpacity(opacity) {
      var value = this.getColor();
      var len = value.length;
      var commas = 0;
      for (var i = 0; i < len; i++) {
        if (value[i] === ",") {
          commas++;
        }
        if (commas === 3) {
          break;
        }
      }
      if (opacity.hasValue() && this.isString() && commas !== 3) {
        var color = new import_rgbcolor.default(value);
        if (color.ok) {
          color.alpha = opacity.getNumber();
          value = color.toRGBA();
        }
      }
      return new Property2(this.document, this.name, value);
    }
  }], [{
    key: "empty",
    value: function empty(document2) {
      return new Property2(document2, "EMPTY", "");
    }
  }]);
  return Property2;
})();
Property.textBaselineMapping = {
  "baseline": "alphabetic",
  "before-edge": "top",
  "text-before-edge": "top",
  "middle": "middle",
  "central": "middle",
  "after-edge": "bottom",
  "text-after-edge": "bottom",
  "ideographic": "ideographic",
  "alphabetic": "alphabetic",
  "hanging": "hanging",
  "mathematical": "alphabetic"
};
var ViewPort = (function() {
  function ViewPort2() {
    _classCallCheck(this, ViewPort2);
    this.viewPorts = [];
  }
  _createClass(ViewPort2, [{
    key: "clear",
    value: function clear() {
      this.viewPorts = [];
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(width, height) {
      this.viewPorts.push({
        width,
        height
      });
    }
  }, {
    key: "removeCurrent",
    value: function removeCurrent() {
      this.viewPorts.pop();
    }
  }, {
    key: "getCurrent",
    value: function getCurrent() {
      var viewPorts = this.viewPorts;
      return viewPorts[viewPorts.length - 1];
    }
  }, {
    key: "computeSize",
    value: function computeSize(d) {
      if (typeof d === "number") {
        return d;
      }
      if (d === "x") {
        return this.width;
      }
      if (d === "y") {
        return this.height;
      }
      return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2)) / Math.sqrt(2);
    }
  }, {
    key: "width",
    get: function get() {
      return this.getCurrent().width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.getCurrent().height;
    }
  }]);
  return ViewPort2;
})();
var Point = (function() {
  function Point2(x, y) {
    _classCallCheck(this, Point2);
    this.x = x;
    this.y = y;
  }
  _createClass(Point2, [{
    key: "angleTo",
    value: function angleTo(point) {
      return Math.atan2(point.y - this.y, point.x - this.x);
    }
  }, {
    key: "applyTransform",
    value: function applyTransform(transform) {
      var x = this.x, y = this.y;
      var xp = x * transform[0] + y * transform[2] + transform[4];
      var yp = x * transform[1] + y * transform[3] + transform[5];
      this.x = xp;
      this.y = yp;
    }
  }], [{
    key: "parse",
    value: function parse(point) {
      var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var _toNumbers = toNumbers(point), _toNumbers2 = _slicedToArray(_toNumbers, 2), _toNumbers2$ = _toNumbers2[0], x = _toNumbers2$ === void 0 ? defaultValue : _toNumbers2$, _toNumbers2$2 = _toNumbers2[1], y = _toNumbers2$2 === void 0 ? defaultValue : _toNumbers2$2;
      return new Point2(x, y);
    }
  }, {
    key: "parseScale",
    value: function parseScale(scale) {
      var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var _toNumbers3 = toNumbers(scale), _toNumbers4 = _slicedToArray(_toNumbers3, 2), _toNumbers4$ = _toNumbers4[0], x = _toNumbers4$ === void 0 ? defaultValue : _toNumbers4$, _toNumbers4$2 = _toNumbers4[1], y = _toNumbers4$2 === void 0 ? x : _toNumbers4$2;
      return new Point2(x, y);
    }
  }, {
    key: "parsePath",
    value: function parsePath(path2) {
      var points = toNumbers(path2);
      var len = points.length;
      var pathPoints = [];
      for (var i = 0; i < len; i += 2) {
        pathPoints.push(new Point2(points[i], points[i + 1]));
      }
      return pathPoints;
    }
  }]);
  return Point2;
})();
var Mouse = (function() {
  function Mouse2(screen) {
    _classCallCheck(this, Mouse2);
    this.screen = screen;
    this.working = false;
    this.events = [];
    this.eventElements = [];
    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }
  _createClass(Mouse2, [{
    key: "isWorking",
    value: function isWorking() {
      return this.working;
    }
  }, {
    key: "start",
    value: function start() {
      if (this.working) {
        return;
      }
      var screen = this.screen, onClick = this.onClick, onMouseMove = this.onMouseMove;
      var canvas = screen.ctx.canvas;
      canvas.onclick = onClick;
      canvas.onmousemove = onMouseMove;
      this.working = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.working) {
        return;
      }
      var canvas = this.screen.ctx.canvas;
      this.working = false;
      canvas.onclick = null;
      canvas.onmousemove = null;
    }
  }, {
    key: "hasEvents",
    value: function hasEvents() {
      return this.working && this.events.length > 0;
    }
  }, {
    key: "runEvents",
    value: function runEvents() {
      if (!this.working) {
        return;
      }
      var document2 = this.screen, events = this.events, eventElements = this.eventElements;
      var style = document2.ctx.canvas.style;
      if (style) {
        style.cursor = "";
      }
      events.forEach(function(_ref, i) {
        var run = _ref.run;
        var element = eventElements[i];
        while (element) {
          run(element);
          element = element.parent;
        }
      });
      this.events = [];
      this.eventElements = [];
    }
  }, {
    key: "checkPath",
    value: function checkPath(element, ctx) {
      if (!this.working || !ctx) {
        return;
      }
      var events = this.events, eventElements = this.eventElements;
      events.forEach(function(_ref2, i) {
        var x = _ref2.x, y = _ref2.y;
        if (!eventElements[i] && ctx.isPointInPath && ctx.isPointInPath(x, y)) {
          eventElements[i] = element;
        }
      });
    }
  }, {
    key: "checkBoundingBox",
    value: function checkBoundingBox(element, boundingBox) {
      if (!this.working || !boundingBox) {
        return;
      }
      var events = this.events, eventElements = this.eventElements;
      events.forEach(function(_ref3, i) {
        var x = _ref3.x, y = _ref3.y;
        if (!eventElements[i] && boundingBox.isPointInBox(x, y)) {
          eventElements[i] = element;
        }
      });
    }
  }, {
    key: "mapXY",
    value: function mapXY(x, y) {
      var _this$screen = this.screen, window2 = _this$screen.window, ctx = _this$screen.ctx;
      var point = new Point(x, y);
      var element = ctx.canvas;
      while (element) {
        point.x -= element.offsetLeft;
        point.y -= element.offsetTop;
        element = element.offsetParent;
      }
      if (window2.scrollX) {
        point.x += window2.scrollX;
      }
      if (window2.scrollY) {
        point.y += window2.scrollY;
      }
      return point;
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      var _this$mapXY = this.mapXY((evt || event).clientX, (evt || event).clientY), x = _this$mapXY.x, y = _this$mapXY.y;
      this.events.push({
        type: "onclick",
        x,
        y,
        run: function run(event2) {
          if (event2.onClick) {
            event2.onClick();
          }
        }
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(evt) {
      var _this$mapXY2 = this.mapXY((evt || event).clientX, (evt || event).clientY), x = _this$mapXY2.x, y = _this$mapXY2.y;
      this.events.push({
        type: "onmousemove",
        x,
        y,
        run: function run(event2) {
          if (event2.onMouseMove) {
            event2.onMouseMove();
          }
        }
      });
    }
  }]);
  return Mouse2;
})();
var defaultWindow = typeof window !== "undefined" ? window : null;
var defaultFetch = typeof fetch !== "undefined" ? fetch.bind(void 0) : null;
var Screen = (function() {
  function Screen2(ctx) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$fetch = _ref.fetch, fetch2 = _ref$fetch === void 0 ? defaultFetch : _ref$fetch, _ref$window = _ref.window, window2 = _ref$window === void 0 ? defaultWindow : _ref$window;
    _classCallCheck(this, Screen2);
    this.ctx = ctx;
    this.FRAMERATE = 30;
    this.MAX_VIRTUAL_PIXELS = 3e4;
    this.CLIENT_WIDTH = 800;
    this.CLIENT_HEIGHT = 600;
    this.viewPort = new ViewPort();
    this.mouse = new Mouse(this);
    this.animations = [];
    this.waits = [];
    this.frameDuration = 0;
    this.isReadyLock = false;
    this.isFirstRender = true;
    this.intervalId = null;
    this.window = window2;
    this.fetch = fetch2;
  }
  _createClass(Screen2, [{
    key: "wait",
    value: function wait(checker) {
      this.waits.push(checker);
    }
  }, {
    key: "ready",
    value: function ready() {
      if (!this.readyPromise) {
        return Promise.resolve();
      }
      return this.readyPromise;
    }
  }, {
    key: "isReady",
    value: function isReady() {
      if (this.isReadyLock) {
        return true;
      }
      var isReadyLock = this.waits.every(function(_) {
        return _();
      });
      if (isReadyLock) {
        this.waits = [];
        if (this.resolveReady) {
          this.resolveReady();
        }
      }
      this.isReadyLock = isReadyLock;
      return isReadyLock;
    }
  }, {
    key: "setDefaults",
    value: function setDefaults(ctx) {
      ctx.strokeStyle = "rgba(0,0,0,0)";
      ctx.lineCap = "butt";
      ctx.lineJoin = "miter";
      ctx.miterLimit = 4;
    }
  }, {
    key: "setViewBox",
    value: function setViewBox(_ref2) {
      var document2 = _ref2.document, ctx = _ref2.ctx, aspectRatio = _ref2.aspectRatio, width = _ref2.width, desiredWidth = _ref2.desiredWidth, height = _ref2.height, desiredHeight = _ref2.desiredHeight, _ref2$minX = _ref2.minX, minX = _ref2$minX === void 0 ? 0 : _ref2$minX, _ref2$minY = _ref2.minY, minY = _ref2$minY === void 0 ? 0 : _ref2$minY, refX = _ref2.refX, refY = _ref2.refY, _ref2$clip = _ref2.clip, clip = _ref2$clip === void 0 ? false : _ref2$clip, _ref2$clipX = _ref2.clipX, clipX = _ref2$clipX === void 0 ? 0 : _ref2$clipX, _ref2$clipY = _ref2.clipY, clipY = _ref2$clipY === void 0 ? 0 : _ref2$clipY;
      var cleanAspectRatio = compressSpaces(aspectRatio).replace(/^defer\s/, "");
      var _cleanAspectRatio$spl = cleanAspectRatio.split(" "), _cleanAspectRatio$spl2 = _slicedToArray(_cleanAspectRatio$spl, 2), aspectRatioAlign = _cleanAspectRatio$spl2[0], aspectRatioMeetOrSlice = _cleanAspectRatio$spl2[1];
      var align = aspectRatioAlign || "xMidYMid";
      var meetOrSlice = aspectRatioMeetOrSlice || "meet";
      var scaleX = width / desiredWidth;
      var scaleY = height / desiredHeight;
      var scaleMin = Math.min(scaleX, scaleY);
      var scaleMax = Math.max(scaleX, scaleY);
      var finalDesiredWidth = desiredWidth;
      var finalDesiredHeight = desiredHeight;
      if (meetOrSlice === "meet") {
        finalDesiredWidth *= scaleMin;
        finalDesiredHeight *= scaleMin;
      }
      if (meetOrSlice === "slice") {
        finalDesiredWidth *= scaleMax;
        finalDesiredHeight *= scaleMax;
      }
      var refXProp = new Property(document2, "refX", refX);
      var refYProp = new Property(document2, "refY", refY);
      var hasRefs = refXProp.hasValue() && refYProp.hasValue();
      if (hasRefs) {
        ctx.translate(-scaleMin * refXProp.getPixels("x"), -scaleMin * refYProp.getPixels("y"));
      }
      if (clip) {
        var scaledClipX = scaleMin * clipX;
        var scaledClipY = scaleMin * clipY;
        ctx.beginPath();
        ctx.moveTo(scaledClipX, scaledClipY);
        ctx.lineTo(width, scaledClipY);
        ctx.lineTo(width, height);
        ctx.lineTo(scaledClipX, height);
        ctx.closePath();
        ctx.clip();
      }
      if (!hasRefs) {
        var isMeetMinY = meetOrSlice === "meet" && scaleMin === scaleY;
        var isSliceMaxY = meetOrSlice === "slice" && scaleMax === scaleY;
        var isMeetMinX = meetOrSlice === "meet" && scaleMin === scaleX;
        var isSliceMaxX = meetOrSlice === "slice" && scaleMax === scaleX;
        if (/^xMid/.test(align) && (isMeetMinY || isSliceMaxY)) {
          ctx.translate(width / 2 - finalDesiredWidth / 2, 0);
        }
        if (/YMid$/.test(align) && (isMeetMinX || isSliceMaxX)) {
          ctx.translate(0, height / 2 - finalDesiredHeight / 2);
        }
        if (/^xMax/.test(align) && (isMeetMinY || isSliceMaxY)) {
          ctx.translate(width - finalDesiredWidth, 0);
        }
        if (/YMax$/.test(align) && (isMeetMinX || isSliceMaxX)) {
          ctx.translate(0, height - finalDesiredHeight);
        }
      }
      switch (true) {
        case align === "none":
          ctx.scale(scaleX, scaleY);
          break;
        case meetOrSlice === "meet":
          ctx.scale(scaleMin, scaleMin);
          break;
        case meetOrSlice === "slice":
          ctx.scale(scaleMax, scaleMax);
          break;
      }
      ctx.translate(-minX, -minY);
    }
  }, {
    key: "start",
    value: function start(element) {
      var _this = this;
      var _ref3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref3$enableRedraw = _ref3.enableRedraw, enableRedraw = _ref3$enableRedraw === void 0 ? false : _ref3$enableRedraw, _ref3$ignoreMouse = _ref3.ignoreMouse, ignoreMouse = _ref3$ignoreMouse === void 0 ? false : _ref3$ignoreMouse, _ref3$ignoreAnimation = _ref3.ignoreAnimation, ignoreAnimation = _ref3$ignoreAnimation === void 0 ? false : _ref3$ignoreAnimation, _ref3$ignoreDimension = _ref3.ignoreDimensions, ignoreDimensions = _ref3$ignoreDimension === void 0 ? false : _ref3$ignoreDimension, _ref3$ignoreClear = _ref3.ignoreClear, ignoreClear = _ref3$ignoreClear === void 0 ? false : _ref3$ignoreClear, forceRedraw = _ref3.forceRedraw, scaleWidth = _ref3.scaleWidth, scaleHeight = _ref3.scaleHeight, offsetX = _ref3.offsetX, offsetY = _ref3.offsetY;
      var FRAMERATE = this.FRAMERATE, mouse = this.mouse;
      var frameDuration = 1e3 / FRAMERATE;
      this.frameDuration = frameDuration;
      this.readyPromise = new Promise(function(resolve) {
        _this.resolveReady = resolve;
      });
      if (this.isReady()) {
        this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
      }
      if (!enableRedraw) {
        return;
      }
      var now = Date.now();
      var then = now;
      var delta = 0;
      var tick = function tick2() {
        now = Date.now();
        delta = now - then;
        if (delta >= frameDuration) {
          then = now - delta % frameDuration;
          if (_this.shouldUpdate(ignoreAnimation, forceRedraw)) {
            _this.render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY);
            mouse.runEvents();
          }
        }
        _this.intervalId = (0, import_raf.default)(tick2);
      };
      if (!ignoreMouse) {
        mouse.start();
      }
      this.intervalId = (0, import_raf.default)(tick);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.intervalId) {
        import_raf.default.cancel(this.intervalId);
        this.intervalId = null;
      }
      this.mouse.stop();
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(ignoreAnimation, forceRedraw) {
      if (!ignoreAnimation) {
        var frameDuration = this.frameDuration;
        var shouldUpdate2 = this.animations.reduce(function(shouldUpdate3, animation) {
          return animation.update(frameDuration) || shouldUpdate3;
        }, false);
        if (shouldUpdate2) {
          return true;
        }
      }
      if (typeof forceRedraw === "function" && forceRedraw()) {
        return true;
      }
      if (!this.isReadyLock && this.isReady()) {
        return true;
      }
      if (this.mouse.hasEvents()) {
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render(element, ignoreDimensions, ignoreClear, scaleWidth, scaleHeight, offsetX, offsetY) {
      var CLIENT_WIDTH = this.CLIENT_WIDTH, CLIENT_HEIGHT = this.CLIENT_HEIGHT, viewPort = this.viewPort, ctx = this.ctx, isFirstRender = this.isFirstRender;
      var canvas = ctx.canvas;
      viewPort.clear();
      if (canvas.width && canvas.height) {
        viewPort.setCurrent(canvas.width, canvas.height);
      } else {
        viewPort.setCurrent(CLIENT_WIDTH, CLIENT_HEIGHT);
      }
      var widthStyle = element.getStyle("width");
      var heightStyle = element.getStyle("height");
      if (!ignoreDimensions && (isFirstRender || typeof scaleWidth !== "number" && typeof scaleHeight !== "number")) {
        if (widthStyle.hasValue()) {
          canvas.width = widthStyle.getPixels("x");
          if (canvas.style) {
            canvas.style.width = "".concat(canvas.width, "px");
          }
        }
        if (heightStyle.hasValue()) {
          canvas.height = heightStyle.getPixels("y");
          if (canvas.style) {
            canvas.style.height = "".concat(canvas.height, "px");
          }
        }
      }
      var cWidth = canvas.clientWidth || canvas.width;
      var cHeight = canvas.clientHeight || canvas.height;
      if (ignoreDimensions && widthStyle.hasValue() && heightStyle.hasValue()) {
        cWidth = widthStyle.getPixels("x");
        cHeight = heightStyle.getPixels("y");
      }
      viewPort.setCurrent(cWidth, cHeight);
      if (typeof offsetX === "number") {
        element.getAttribute("x", true).setValue(offsetX);
      }
      if (typeof offsetY === "number") {
        element.getAttribute("y", true).setValue(offsetY);
      }
      if (typeof scaleWidth === "number" || typeof scaleHeight === "number") {
        var viewBox = toNumbers(element.getAttribute("viewBox").getString());
        var xRatio = 0;
        var yRatio = 0;
        if (typeof scaleWidth === "number") {
          var _widthStyle = element.getStyle("width");
          if (_widthStyle.hasValue()) {
            xRatio = _widthStyle.getPixels("x") / scaleWidth;
          } else if (!isNaN(viewBox[2])) {
            xRatio = viewBox[2] / scaleWidth;
          }
        }
        if (typeof scaleHeight === "number") {
          var _heightStyle = element.getStyle("height");
          if (_heightStyle.hasValue()) {
            yRatio = _heightStyle.getPixels("y") / scaleHeight;
          } else if (!isNaN(viewBox[3])) {
            yRatio = viewBox[3] / scaleHeight;
          }
        }
        if (!xRatio) {
          xRatio = yRatio;
        }
        if (!yRatio) {
          yRatio = xRatio;
        }
        element.getAttribute("width", true).setValue(scaleWidth);
        element.getAttribute("height", true).setValue(scaleHeight);
        var transformStyle = element.getStyle("transform", true, true);
        transformStyle.setValue("".concat(transformStyle.getString(), " scale(").concat(1 / xRatio, ", ").concat(1 / yRatio, ")"));
      }
      if (!ignoreClear) {
        ctx.clearRect(0, 0, cWidth, cHeight);
      }
      element.render(ctx);
      if (isFirstRender) {
        this.isFirstRender = false;
      }
    }
  }]);
  return Screen2;
})();
Screen.defaultWindow = defaultWindow;
Screen.defaultFetch = defaultFetch;
var defaultFetch$1 = Screen.defaultFetch;
var DefaultDOMParser = typeof DOMParser !== "undefined" ? DOMParser : null;
var Parser = (function() {
  function Parser2() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref$fetch = _ref.fetch, fetch2 = _ref$fetch === void 0 ? defaultFetch$1 : _ref$fetch, _ref$DOMParser = _ref.DOMParser, DOMParser2 = _ref$DOMParser === void 0 ? DefaultDOMParser : _ref$DOMParser;
    _classCallCheck(this, Parser2);
    this.fetch = fetch2;
    this.DOMParser = DOMParser2;
  }
  _createClass(Parser2, [{
    key: "parse",
    value: (function() {
      var _parse = _asyncToGenerator(import_regenerator.default.mark(function _callee(resource) {
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!/^</.test(resource)) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return", this.parseFromString(resource));
              case 2:
                return _context.abrupt("return", this.load(resource));
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function parse(_x) {
        return _parse.apply(this, arguments);
      }
      return parse;
    })()
  }, {
    key: "parseFromString",
    value: function parseFromString(xml) {
      var parser = new this.DOMParser();
      try {
        return this.checkDocument(parser.parseFromString(xml, "image/svg+xml"));
      } catch (err) {
        return this.checkDocument(parser.parseFromString(xml, "text/xml"));
      }
    }
  }, {
    key: "checkDocument",
    value: function checkDocument(document2) {
      var parserError = document2.getElementsByTagName("parsererror")[0];
      if (parserError) {
        throw new Error(parserError.textContent);
      }
      return document2;
    }
  }, {
    key: "load",
    value: (function() {
      var _load = _asyncToGenerator(import_regenerator.default.mark(function _callee2(url) {
        var response, xml;
        return import_regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetch(url);
              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.text();
              case 5:
                xml = _context2.sent;
                return _context2.abrupt("return", this.parseFromString(xml));
              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function load(_x2) {
        return _load.apply(this, arguments);
      }
      return load;
    })()
  }]);
  return Parser2;
})();
var Translate = (function() {
  function Translate2(_, point) {
    _classCallCheck(this, Translate2);
    this.type = "translate";
    this.point = null;
    this.point = Point.parse(point);
  }
  _createClass(Translate2, [{
    key: "apply",
    value: function apply4(ctx) {
      var _this$point = this.point, x = _this$point.x, y = _this$point.y;
      ctx.translate(x || 0, y || 0);
    }
  }, {
    key: "unapply",
    value: function unapply(ctx) {
      var _this$point2 = this.point, x = _this$point2.x, y = _this$point2.y;
      ctx.translate(-1 * x || 0, -1 * y || 0);
    }
  }, {
    key: "applyToPoint",
    value: function applyToPoint(point) {
      var _this$point3 = this.point, x = _this$point3.x, y = _this$point3.y;
      point.applyTransform([1, 0, 0, 1, x || 0, y || 0]);
    }
  }]);
  return Translate2;
})();
var Rotate = (function() {
  function Rotate2(document2, rotate) {
    var transformOrigin = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    _classCallCheck(this, Rotate2);
    this.type = "rotate";
    this.angle = null;
    this.cx = 0;
    this.cy = 0;
    var numbers = toNumbers(rotate);
    this.angle = new Property(document2, "angle", numbers[0]);
    this.cx = (numbers[1] || 0) + (transformOrigin[0] || 0);
    this.cy = (numbers[2] || 0) + (transformOrigin[1] || 0);
  }
  _createClass(Rotate2, [{
    key: "apply",
    value: function apply4(ctx) {
      var cx = this.cx, cy = this.cy, angle = this.angle;
      ctx.translate(cx, cy);
      ctx.rotate(angle.getRadians());
      ctx.translate(-cx, -cy);
    }
  }, {
    key: "unapply",
    value: function unapply(ctx) {
      var cx = this.cx, cy = this.cy, angle = this.angle;
      ctx.translate(cx, cy);
      ctx.rotate(-1 * angle.getRadians());
      ctx.translate(-cx, -cy);
    }
  }, {
    key: "applyToPoint",
    value: function applyToPoint(point) {
      var cx = this.cx, cy = this.cy, angle = this.angle;
      var rad = angle.getRadians();
      point.applyTransform([
        1,
        0,
        0,
        1,
        cx || 0,
        cy || 0
        // this.p.y
      ]);
      point.applyTransform([Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad), 0, 0]);
      point.applyTransform([
        1,
        0,
        0,
        1,
        -cx || 0,
        -cy || 0
        // -this.p.y
      ]);
    }
  }]);
  return Rotate2;
})();
var Scale = (function() {
  function Scale2(_, scale) {
    _classCallCheck(this, Scale2);
    this.type = "scale";
    this.scale = null;
    var scaleSize = Point.parseScale(scale);
    if (scaleSize.x === 0 || scaleSize.y === 0) {
      scaleSize.x = PSEUDO_ZERO;
      scaleSize.y = PSEUDO_ZERO;
    }
    this.scale = scaleSize;
  }
  _createClass(Scale2, [{
    key: "apply",
    value: function apply4(ctx) {
      var _this$scale = this.scale, x = _this$scale.x, y = _this$scale.y;
      ctx.scale(x, y || x);
    }
  }, {
    key: "unapply",
    value: function unapply(ctx) {
      var _this$scale2 = this.scale, x = _this$scale2.x, y = _this$scale2.y;
      ctx.scale(1 / x, 1 / y || x);
    }
  }, {
    key: "applyToPoint",
    value: function applyToPoint(point) {
      var _this$scale3 = this.scale, x = _this$scale3.x, y = _this$scale3.y;
      point.applyTransform([x || 0, 0, 0, y || 0, 0, 0]);
    }
  }]);
  return Scale2;
})();
var Matrix = (function() {
  function Matrix2(_, matrix) {
    _classCallCheck(this, Matrix2);
    this.type = "matrix";
    this.matrix = [];
    this.matrix = toNumbers(matrix);
  }
  _createClass(Matrix2, [{
    key: "apply",
    value: function apply4(ctx) {
      var matrix = this.matrix;
      ctx.transform(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5]);
    }
  }, {
    key: "unapply",
    value: function unapply(ctx) {
      var matrix = this.matrix;
      var a = matrix[0];
      var b = matrix[2];
      var c2 = matrix[4];
      var d = matrix[1];
      var e = matrix[3];
      var f = matrix[5];
      var g = 0;
      var h = 0;
      var i = 1;
      var det = 1 / (a * (e * i - f * h) - b * (d * i - f * g) + c2 * (d * h - e * g));
      ctx.transform(det * (e * i - f * h), det * (f * g - d * i), det * (c2 * h - b * i), det * (a * i - c2 * g), det * (b * f - c2 * e), det * (c2 * d - a * f));
    }
  }, {
    key: "applyToPoint",
    value: function applyToPoint(point) {
      point.applyTransform(this.matrix);
    }
  }]);
  return Matrix2;
})();
function _createSuper(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var Skew = (function(_Matrix) {
  _inherits(Skew2, _Matrix);
  var _super = _createSuper(Skew2);
  function Skew2(document2, skew) {
    var _this;
    _classCallCheck(this, Skew2);
    _this = _super.call(this, document2, skew);
    _this.type = "skew";
    _this.angle = null;
    _this.angle = new Property(document2, "angle", skew);
    return _this;
  }
  return Skew2;
})(Matrix);
function _createSuper$1(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$1()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var SkewX = (function(_Skew) {
  _inherits(SkewX2, _Skew);
  var _super = _createSuper$1(SkewX2);
  function SkewX2(document2, skew) {
    var _this;
    _classCallCheck(this, SkewX2);
    _this = _super.call(this, document2, skew);
    _this.type = "skewX";
    _this.matrix = [1, 0, Math.tan(_this.angle.getRadians()), 1, 0, 0];
    return _this;
  }
  return SkewX2;
})(Skew);
function _createSuper$2(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$2()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var SkewY = (function(_Skew) {
  _inherits(SkewY2, _Skew);
  var _super = _createSuper$2(SkewY2);
  function SkewY2(document2, skew) {
    var _this;
    _classCallCheck(this, SkewY2);
    _this = _super.call(this, document2, skew);
    _this.type = "skewY";
    _this.matrix = [1, Math.tan(_this.angle.getRadians()), 0, 1, 0, 0];
    return _this;
  }
  return SkewY2;
})(Skew);
function parseTransforms(transform) {
  return compressSpaces(transform).trim().replace(/\)([a-zA-Z])/g, ") $1").replace(/\)(\s?,\s?)/g, ") ").split(/\s(?=[a-z])/);
}
function parseTransform(transform) {
  var _transform$split = transform.split("("), _transform$split2 = _slicedToArray(_transform$split, 2), type = _transform$split2[0], value = _transform$split2[1];
  return [type.trim(), value.trim().replace(")", "")];
}
var Transform = (function() {
  function Transform2(document2, transform, transformOrigin) {
    var _this = this;
    _classCallCheck(this, Transform2);
    this.document = document2;
    this.transforms = [];
    var data = parseTransforms(transform);
    var originCoords = transformOrigin ? toNumbers(transformOrigin) : [];
    data.forEach(function(transform2) {
      if (transform2 === "none") {
        return;
      }
      var _parseTransform = parseTransform(transform2), _parseTransform2 = _slicedToArray(_parseTransform, 2), type = _parseTransform2[0], value = _parseTransform2[1];
      var TransformType = Transform2.transformTypes[type];
      if (typeof TransformType !== "undefined") {
        _this.transforms.push(new TransformType(_this.document, value, originCoords));
      }
    });
  }
  _createClass(Transform2, [{
    key: "apply",
    value: function apply4(ctx) {
      var transforms = this.transforms;
      var len = transforms.length;
      for (var i = 0; i < len; i++) {
        transforms[i].apply(ctx);
      }
    }
  }, {
    key: "unapply",
    value: function unapply(ctx) {
      var transforms = this.transforms;
      var len = transforms.length;
      for (var i = len - 1; i >= 0; i--) {
        transforms[i].unapply(ctx);
      }
    }
    // TODO: applyToPoint unused ... remove?
  }, {
    key: "applyToPoint",
    value: function applyToPoint(point) {
      var transforms = this.transforms;
      var len = transforms.length;
      for (var i = 0; i < len; i++) {
        transforms[i].applyToPoint(point);
      }
    }
  }], [{
    key: "fromElement",
    value: function fromElement(document2, element) {
      var transformStyle = element.getStyle("transform", false, true);
      var transformOriginStyle = element.getStyle("transform-origin", false, true);
      if (transformStyle.hasValue()) {
        return new Transform2(document2, transformStyle.getString(), transformOriginStyle.getString());
      }
      return null;
    }
  }]);
  return Transform2;
})();
Transform.transformTypes = {
  translate: Translate,
  rotate: Rotate,
  scale: Scale,
  matrix: Matrix,
  skewX: SkewX,
  skewY: SkewY
};
var Element = (function() {
  function Element2(document2, node2) {
    var _this = this;
    var captureTextNodes = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    _classCallCheck(this, Element2);
    this.document = document2;
    this.node = node2;
    this.captureTextNodes = captureTextNodes;
    this.attributes = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.animationFrozen = false;
    this.animationFrozenValue = "";
    this.parent = null;
    this.children = [];
    if (!node2 || node2.nodeType !== 1) {
      return;
    }
    Array.from(node2.attributes).forEach(function(attribute) {
      var nodeName = normalizeAttributeName(attribute.nodeName);
      _this.attributes[nodeName] = new Property(document2, nodeName, attribute.value);
    });
    this.addStylesFromStyleDefinition();
    if (this.getAttribute("style").hasValue()) {
      var styles = this.getAttribute("style").getString().split(";").map(function(_) {
        return _.trim();
      });
      styles.forEach(function(style) {
        if (!style) {
          return;
        }
        var _style$split$map = style.split(":").map(function(_) {
          return _.trim();
        }), _style$split$map2 = _slicedToArray(_style$split$map, 2), name = _style$split$map2[0], value = _style$split$map2[1];
        _this.styles[name] = new Property(document2, name, value);
      });
    }
    var definitions = document2.definitions;
    var id = this.getAttribute("id");
    if (id.hasValue()) {
      if (!definitions[id.getValue()]) {
        definitions[id.getValue()] = this;
      }
    }
    Array.from(node2.childNodes).forEach(function(childNode) {
      if (childNode.nodeType === 1) {
        _this.addChild(childNode);
      } else if (captureTextNodes && (childNode.nodeType === 3 || childNode.nodeType === 4)) {
        var textNode = document2.createTextNode(childNode);
        if (textNode.getText().length > 0) {
          _this.addChild(textNode);
        }
      }
    });
  }
  _createClass(Element2, [{
    key: "getAttribute",
    value: function getAttribute(name) {
      var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var attr = this.attributes[name];
      if (!attr && createIfNotExists) {
        var _attr = new Property(this.document, name, "");
        this.attributes[name] = _attr;
        return _attr;
      }
      return attr || Property.empty(this.document);
    }
  }, {
    key: "getHrefAttribute",
    value: function getHrefAttribute() {
      for (var key in this.attributes) {
        if (key === "href" || /:href$/.test(key)) {
          return this.attributes[key];
        }
      }
      return Property.empty(this.document);
    }
  }, {
    key: "getStyle",
    value: function getStyle(name) {
      var createIfNotExists = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var skipAncestors = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var style = this.styles[name];
      if (style) {
        return style;
      }
      var attr = this.getAttribute(name);
      if (attr && attr.hasValue()) {
        this.styles[name] = attr;
        return attr;
      }
      if (!skipAncestors) {
        var parent = this.parent;
        if (parent) {
          var parentStyle = parent.getStyle(name);
          if (parentStyle && parentStyle.hasValue()) {
            return parentStyle;
          }
        }
      }
      if (createIfNotExists) {
        var _style = new Property(this.document, name, "");
        this.styles[name] = _style;
        return _style;
      }
      return style || Property.empty(this.document);
    }
  }, {
    key: "render",
    value: function render(ctx) {
      if (this.getStyle("display").getString() === "none" || this.getStyle("visibility").getString() === "hidden") {
        return;
      }
      ctx.save();
      if (this.getStyle("mask").hasValue()) {
        var mask = this.getStyle("mask").getDefinition();
        if (mask) {
          this.applyEffects(ctx);
          mask.apply(ctx, this);
        }
      } else if (this.getStyle("filter").getValue("none") !== "none") {
        var filter2 = this.getStyle("filter").getDefinition();
        if (filter2) {
          this.applyEffects(ctx);
          filter2.apply(ctx, this);
        }
      } else {
        this.setContext(ctx);
        this.renderChildren(ctx);
        this.clearContext(ctx);
      }
      ctx.restore();
    }
  }, {
    key: "setContext",
    value: function setContext(_) {
    }
  }, {
    key: "applyEffects",
    value: function applyEffects(ctx) {
      var transform = Transform.fromElement(this.document, this);
      if (transform) {
        transform.apply(ctx);
      }
      var clipPathStyleProp = this.getStyle("clip-path", false, true);
      if (clipPathStyleProp.hasValue()) {
        var clip = clipPathStyleProp.getDefinition();
        if (clip) {
          clip.apply(ctx);
        }
      }
    }
  }, {
    key: "clearContext",
    value: function clearContext(_) {
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      this.children.forEach(function(child) {
        child.render(ctx);
      });
    }
  }, {
    key: "addChild",
    value: function addChild(childNode) {
      var child = childNode instanceof Element2 ? childNode : this.document.createElement(childNode);
      child.parent = this;
      if (!Element2.ignoreChildTypes.includes(child.type)) {
        this.children.push(child);
      }
    }
  }, {
    key: "matchesSelector",
    value: function matchesSelector(selector) {
      var node2 = this.node;
      if (typeof node2.matches === "function") {
        return node2.matches(selector);
      }
      var styleClasses = node2.getAttribute("class");
      if (!styleClasses || styleClasses === "") {
        return false;
      }
      return styleClasses.split(" ").some(function(styleClass) {
        if (".".concat(styleClass) === selector) {
          return true;
        }
      });
    }
  }, {
    key: "addStylesFromStyleDefinition",
    value: function addStylesFromStyleDefinition() {
      var _this$document = this.document, styles = _this$document.styles, stylesSpecificity = _this$document.stylesSpecificity;
      for (var selector in styles) {
        if (selector[0] !== "@" && this.matchesSelector(selector)) {
          var style = styles[selector];
          var specificity = stylesSpecificity[selector];
          if (style) {
            for (var name in style) {
              var existingSpecificity = this.stylesSpecificity[name];
              if (typeof existingSpecificity === "undefined") {
                existingSpecificity = "000";
              }
              if (specificity >= existingSpecificity) {
                this.styles[name] = style[name];
                this.stylesSpecificity[name] = specificity;
              }
            }
          }
        }
      }
    }
  }, {
    key: "removeStyles",
    value: function removeStyles(element, ignoreStyles) {
      var toRestore = ignoreStyles.reduce(function(toRestore2, name) {
        var styleProp = element.getStyle(name);
        if (!styleProp.hasValue()) {
          return toRestore2;
        }
        var value = styleProp.getString();
        styleProp.setValue("");
        return [].concat(_toConsumableArray(toRestore2), [[name, value]]);
      }, []);
      return toRestore;
    }
  }, {
    key: "restoreStyles",
    value: function restoreStyles(element, styles) {
      styles.forEach(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), name = _ref2[0], value = _ref2[1];
        element.getStyle(name, true).setValue(value);
      });
    }
  }]);
  return Element2;
})();
Element.ignoreChildTypes = ["title"];
function _createSuper$3(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$3()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var UnknownElement = (function(_Element) {
  _inherits(UnknownElement2, _Element);
  var _super = _createSuper$3(UnknownElement2);
  function UnknownElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, UnknownElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    return _this;
  }
  return UnknownElement2;
})(Element);
function wrapFontFamily(fontFamily) {
  var trimmed = fontFamily.trim();
  return /^('|")/.test(trimmed) ? trimmed : '"'.concat(trimmed, '"');
}
function prepareFontFamily(fontFamily) {
  return typeof process === "undefined" ? fontFamily : fontFamily.trim().split(",").map(wrapFontFamily).join(",");
}
function prepareFontStyle(fontStyle) {
  if (!fontStyle) {
    return "";
  }
  var targetFontStyle = fontStyle.trim().toLowerCase();
  switch (targetFontStyle) {
    case "normal":
    case "italic":
    case "oblique":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontStyle;
    default:
      if (/^oblique\s+(-|)\d+deg$/.test(targetFontStyle)) {
        return targetFontStyle;
      }
      return "";
  }
}
function prepareFontWeight(fontWeight) {
  if (!fontWeight) {
    return "";
  }
  var targetFontWeight = fontWeight.trim().toLowerCase();
  switch (targetFontWeight) {
    case "normal":
    case "bold":
    case "lighter":
    case "bolder":
    case "inherit":
    case "initial":
    case "unset":
      return targetFontWeight;
    default:
      if (/^[\d.]+$/.test(targetFontWeight)) {
        return targetFontWeight;
      }
      return "";
  }
}
var Font = (function() {
  function Font2(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit) {
    _classCallCheck(this, Font2);
    var inheritFont = inherit ? typeof inherit === "string" ? Font2.parse(inherit) : inherit : {};
    this.fontFamily = fontFamily || inheritFont.fontFamily;
    this.fontSize = fontSize || inheritFont.fontSize;
    this.fontStyle = fontStyle || inheritFont.fontStyle;
    this.fontWeight = fontWeight || inheritFont.fontWeight;
    this.fontVariant = fontVariant || inheritFont.fontVariant;
  }
  _createClass(Font2, [{
    key: "toString",
    value: function toString9() {
      return [
        prepareFontStyle(this.fontStyle),
        this.fontVariant,
        prepareFontWeight(this.fontWeight),
        this.fontSize,
        // Wrap fontFamily only on nodejs and only for canvas.ctx
        prepareFontFamily(this.fontFamily)
      ].join(" ").trim();
    }
  }], [{
    key: "parse",
    value: function parse() {
      var font = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var inherit = arguments.length > 1 ? arguments[1] : void 0;
      var fontStyle = "";
      var fontVariant = "";
      var fontWeight = "";
      var fontSize = "";
      var fontFamily = "";
      var parts = compressSpaces(font).trim().split(" ");
      var set = {
        fontSize: false,
        fontStyle: false,
        fontWeight: false,
        fontVariant: false
      };
      parts.forEach(function(part) {
        switch (true) {
          case (!set.fontStyle && Font2.styles.includes(part)):
            if (part !== "inherit") {
              fontStyle = part;
            }
            set.fontStyle = true;
            break;
          case (!set.fontVariant && Font2.variants.includes(part)):
            if (part !== "inherit") {
              fontVariant = part;
            }
            set.fontStyle = true;
            set.fontVariant = true;
            break;
          case (!set.fontWeight && Font2.weights.includes(part)):
            if (part !== "inherit") {
              fontWeight = part;
            }
            set.fontStyle = true;
            set.fontVariant = true;
            set.fontWeight = true;
            break;
          case !set.fontSize:
            if (part !== "inherit") {
              var _part$split = part.split("/");
              var _part$split2 = _slicedToArray(_part$split, 1);
              fontSize = _part$split2[0];
            }
            set.fontStyle = true;
            set.fontVariant = true;
            set.fontWeight = true;
            set.fontSize = true;
            break;
          default:
            if (part !== "inherit") {
              fontFamily += part;
            }
        }
      });
      return new Font2(fontStyle, fontVariant, fontWeight, fontSize, fontFamily, inherit);
    }
  }]);
  return Font2;
})();
Font.styles = "normal|italic|oblique|inherit";
Font.variants = "normal|small-caps|inherit";
Font.weights = "normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit";
var BoundingBox = (function() {
  function BoundingBox2() {
    var x1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Number.NaN;
    var y1 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.NaN;
    var x2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Number.NaN;
    var y2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Number.NaN;
    _classCallCheck(this, BoundingBox2);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.addPoint(x1, y1);
    this.addPoint(x2, y2);
  }
  _createClass(BoundingBox2, [{
    key: "addPoint",
    value: function addPoint(x, y) {
      if (typeof x !== "undefined") {
        if (isNaN(this.x1) || isNaN(this.x2)) {
          this.x1 = x;
          this.x2 = x;
        }
        if (x < this.x1) {
          this.x1 = x;
        }
        if (x > this.x2) {
          this.x2 = x;
        }
      }
      if (typeof y !== "undefined") {
        if (isNaN(this.y1) || isNaN(this.y2)) {
          this.y1 = y;
          this.y2 = y;
        }
        if (y < this.y1) {
          this.y1 = y;
        }
        if (y > this.y2) {
          this.y2 = y;
        }
      }
    }
  }, {
    key: "addX",
    value: function addX(x) {
      this.addPoint(x, null);
    }
  }, {
    key: "addY",
    value: function addY(y) {
      this.addPoint(null, y);
    }
  }, {
    key: "addBoundingBox",
    value: function addBoundingBox(boundingBox) {
      if (!boundingBox) {
        return;
      }
      var x1 = boundingBox.x1, y1 = boundingBox.y1, x2 = boundingBox.x2, y2 = boundingBox.y2;
      this.addPoint(x1, y1);
      this.addPoint(x2, y2);
    }
  }, {
    key: "sumCubic",
    value: function sumCubic(t, p0, p1, p2, p3) {
      return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
    }
  }, {
    key: "bezierCurveAdd",
    value: function bezierCurveAdd(forX, p0, p1, p2, p3) {
      var b = 6 * p0 - 12 * p1 + 6 * p2;
      var a = -3 * p0 + 9 * p1 - 9 * p2 + 3 * p3;
      var c2 = 3 * p1 - 3 * p0;
      if (a === 0) {
        if (b === 0) {
          return;
        }
        var t = -c2 / b;
        if (0 < t && t < 1) {
          if (forX) {
            this.addX(this.sumCubic(t, p0, p1, p2, p3));
          } else {
            this.addY(this.sumCubic(t, p0, p1, p2, p3));
          }
        }
        return;
      }
      var b2ac = Math.pow(b, 2) - 4 * c2 * a;
      if (b2ac < 0) {
        return;
      }
      var t1 = (-b + Math.sqrt(b2ac)) / (2 * a);
      if (0 < t1 && t1 < 1) {
        if (forX) {
          this.addX(this.sumCubic(t1, p0, p1, p2, p3));
        } else {
          this.addY(this.sumCubic(t1, p0, p1, p2, p3));
        }
      }
      var t2 = (-b - Math.sqrt(b2ac)) / (2 * a);
      if (0 < t2 && t2 < 1) {
        if (forX) {
          this.addX(this.sumCubic(t2, p0, p1, p2, p3));
        } else {
          this.addY(this.sumCubic(t2, p0, p1, p2, p3));
        }
      }
    }
    // from http://blog.hackers-cafe.net/2009/06/how-to-calculate-bezier-curves-bounding.html
  }, {
    key: "addBezierCurve",
    value: function addBezierCurve(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
      this.addPoint(p0x, p0y);
      this.addPoint(p3x, p3y);
      this.bezierCurveAdd(true, p0x, p1x, p2x, p3x);
      this.bezierCurveAdd(false, p0y, p1y, p2y, p3y);
    }
  }, {
    key: "addQuadraticCurve",
    value: function addQuadraticCurve(p0x, p0y, p1x, p1y, p2x, p2y) {
      var cp1x = p0x + 2 / 3 * (p1x - p0x);
      var cp1y = p0y + 2 / 3 * (p1y - p0y);
      var cp2x = cp1x + 1 / 3 * (p2x - p0x);
      var cp2y = cp1y + 1 / 3 * (p2y - p0y);
      this.addBezierCurve(p0x, p0y, cp1x, cp2x, cp1y, cp2y, p2x, p2y);
    }
  }, {
    key: "isPointInBox",
    value: function isPointInBox(x, y) {
      var x1 = this.x1, y1 = this.y1, x2 = this.x2, y2 = this.y2;
      return x1 <= x && x <= x2 && y1 <= y && y <= y2;
    }
  }, {
    key: "x",
    get: function get() {
      return this.x1;
    }
  }, {
    key: "y",
    get: function get() {
      return this.y1;
    }
  }, {
    key: "width",
    get: function get() {
      return this.x2 - this.x1;
    }
  }, {
    key: "height",
    get: function get() {
      return this.y2 - this.y1;
    }
  }]);
  return BoundingBox2;
})();
function _createSuper$4(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$4()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var RenderedElement = (function(_Element) {
  _inherits(RenderedElement2, _Element);
  var _super = _createSuper$4(RenderedElement2);
  function RenderedElement2() {
    var _this;
    _classCallCheck(this, RenderedElement2);
    _this = _super.apply(this, arguments);
    _this.modifiedEmSizeStack = false;
    return _this;
  }
  _createClass(RenderedElement2, [{
    key: "calculateOpacity",
    value: function calculateOpacity() {
      var opacity = 1;
      var element = this;
      while (element) {
        var opacityStyle = element.getStyle("opacity", false, true);
        if (opacityStyle.hasValue()) {
          opacity *= opacityStyle.getNumber();
        }
        element = element.parent;
      }
      return opacity;
    }
  }, {
    key: "setContext",
    value: function setContext(ctx) {
      var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (!fromMeasure) {
        var fillStyleProp = this.getStyle("fill");
        var fillOpacityStyleProp = this.getStyle("fill-opacity");
        var strokeStyleProp = this.getStyle("stroke");
        var strokeOpacityProp = this.getStyle("stroke-opacity");
        if (fillStyleProp.isUrlDefinition()) {
          var fillStyle = fillStyleProp.getFillStyleDefinition(this, fillOpacityStyleProp);
          if (fillStyle) {
            ctx.fillStyle = fillStyle;
          }
        } else if (fillStyleProp.hasValue()) {
          if (fillStyleProp.getString() === "currentColor") {
            fillStyleProp.setValue(this.getStyle("color").getColor());
          }
          var _fillStyle = fillStyleProp.getColor();
          if (_fillStyle !== "inherit") {
            ctx.fillStyle = _fillStyle === "none" ? "rgba(0,0,0,0)" : _fillStyle;
          }
        }
        if (fillOpacityStyleProp.hasValue()) {
          var _fillStyle2 = new Property(this.document, "fill", ctx.fillStyle).addOpacity(fillOpacityStyleProp).getColor();
          ctx.fillStyle = _fillStyle2;
        }
        if (strokeStyleProp.isUrlDefinition()) {
          var strokeStyle = strokeStyleProp.getFillStyleDefinition(this, strokeOpacityProp);
          if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
          }
        } else if (strokeStyleProp.hasValue()) {
          if (strokeStyleProp.getString() === "currentColor") {
            strokeStyleProp.setValue(this.getStyle("color").getColor());
          }
          var _strokeStyle = strokeStyleProp.getString();
          if (_strokeStyle !== "inherit") {
            ctx.strokeStyle = _strokeStyle === "none" ? "rgba(0,0,0,0)" : _strokeStyle;
          }
        }
        if (strokeOpacityProp.hasValue()) {
          var _strokeStyle2 = new Property(this.document, "stroke", ctx.strokeStyle).addOpacity(strokeOpacityProp).getString();
          ctx.strokeStyle = _strokeStyle2;
        }
        var strokeWidthStyleProp = this.getStyle("stroke-width");
        if (strokeWidthStyleProp.hasValue()) {
          var newLineWidth = strokeWidthStyleProp.getPixels();
          ctx.lineWidth = !newLineWidth ? PSEUDO_ZERO : newLineWidth;
        }
        var strokeLinecapStyleProp = this.getStyle("stroke-linecap");
        var strokeLinejoinStyleProp = this.getStyle("stroke-linejoin");
        var strokeMiterlimitProp = this.getStyle("stroke-miterlimit");
        var pointOrderStyleProp = this.getStyle("paint-order");
        var strokeDasharrayStyleProp = this.getStyle("stroke-dasharray");
        var strokeDashoffsetProp = this.getStyle("stroke-dashoffset");
        if (strokeLinecapStyleProp.hasValue()) {
          ctx.lineCap = strokeLinecapStyleProp.getString();
        }
        if (strokeLinejoinStyleProp.hasValue()) {
          ctx.lineJoin = strokeLinejoinStyleProp.getString();
        }
        if (strokeMiterlimitProp.hasValue()) {
          ctx.miterLimit = strokeMiterlimitProp.getNumber();
        }
        if (pointOrderStyleProp.hasValue()) {
          ctx.paintOrder = pointOrderStyleProp.getValue();
        }
        if (strokeDasharrayStyleProp.hasValue() && strokeDasharrayStyleProp.getString() !== "none") {
          var gaps = toNumbers(strokeDasharrayStyleProp.getString());
          if (typeof ctx.setLineDash !== "undefined") {
            ctx.setLineDash(gaps);
          } else if (typeof ctx.webkitLineDash !== "undefined") {
            ctx.webkitLineDash = gaps;
          } else if (typeof ctx.mozDash !== "undefined" && !(gaps.length === 1 && gaps[0] === 0)) {
            ctx.mozDash = gaps;
          }
          var offset = strokeDashoffsetProp.getPixels();
          if (typeof ctx.lineDashOffset !== "undefined") {
            ctx.lineDashOffset = offset;
          } else if (typeof ctx.webkitLineDashOffset !== "undefined") {
            ctx.webkitLineDashOffset = offset;
          } else if (typeof ctx.mozDashOffset !== "undefined") {
            ctx.mozDashOffset = offset;
          }
        }
      }
      this.modifiedEmSizeStack = false;
      if (typeof ctx.font !== "undefined") {
        var fontStyleProp = this.getStyle("font");
        var fontStyleStyleProp = this.getStyle("font-style");
        var fontVariantStyleProp = this.getStyle("font-variant");
        var fontWeightStyleProp = this.getStyle("font-weight");
        var fontSizeStyleProp = this.getStyle("font-size");
        var fontFamilyStyleProp = this.getStyle("font-family");
        var font = new Font(fontStyleStyleProp.getString(), fontVariantStyleProp.getString(), fontWeightStyleProp.getString(), fontSizeStyleProp.hasValue() ? "".concat(fontSizeStyleProp.getPixels(true), "px") : "", fontFamilyStyleProp.getString(), Font.parse(fontStyleProp.getString(), ctx.font));
        fontStyleStyleProp.setValue(font.fontStyle);
        fontVariantStyleProp.setValue(font.fontVariant);
        fontWeightStyleProp.setValue(font.fontWeight);
        fontSizeStyleProp.setValue(font.fontSize);
        fontFamilyStyleProp.setValue(font.fontFamily);
        ctx.font = font.toString();
        if (fontSizeStyleProp.isPixels()) {
          this.document.emSize = fontSizeStyleProp.getPixels();
          this.modifiedEmSizeStack = true;
        }
      }
      if (!fromMeasure) {
        this.applyEffects(ctx);
        ctx.globalAlpha = this.calculateOpacity();
      }
    }
  }, {
    key: "clearContext",
    value: function clearContext(ctx) {
      _get(_getPrototypeOf(RenderedElement2.prototype), "clearContext", this).call(this, ctx);
      if (this.modifiedEmSizeStack) {
        this.document.popEmSize();
      }
    }
  }]);
  return RenderedElement2;
})(Element);
function _createSuper$5(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$5()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$5() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextElement = (function(_RenderedElement) {
  _inherits(TextElement2, _RenderedElement);
  var _super = _createSuper$5(TextElement2);
  function TextElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, TextElement2);
    _this = _super.call(this, document2, node2, (this instanceof TextElement2 ? this.constructor : void 0) === TextElement2 ? true : captureTextNodes);
    _this.type = "text";
    _this.x = 0;
    _this.y = 0;
    _this.measureCache = -1;
    return _this;
  }
  _createClass(TextElement2, [{
    key: "setContext",
    value: function setContext(ctx) {
      var fromMeasure = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      _get(_getPrototypeOf(TextElement2.prototype), "setContext", this).call(this, ctx, fromMeasure);
      var textBaseline = this.getStyle("dominant-baseline").getTextBaseline() || this.getStyle("alignment-baseline").getTextBaseline();
      if (textBaseline) {
        ctx.textBaseline = textBaseline;
      }
    }
  }, {
    key: "initializeCoordinates",
    value: function initializeCoordinates(ctx) {
      this.x = this.getAttribute("x").getPixels("x");
      this.y = this.getAttribute("y").getPixels("y");
      var dxAttr = this.getAttribute("dx");
      var dyAttr = this.getAttribute("dy");
      if (dxAttr.hasValue()) {
        this.x += dxAttr.getPixels("x");
      }
      if (dyAttr.hasValue()) {
        this.y += dyAttr.getPixels("y");
      }
      this.x += this.getAnchorDelta(ctx, this, 0);
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(ctx) {
      var _this2 = this;
      if (this.type !== "text") {
        return this.getTElementBoundingBox(ctx);
      }
      this.initializeCoordinates(ctx);
      var boundingBox = null;
      this.children.forEach(function(_, i) {
        var childBoundingBox = _this2.getChildBoundingBox(ctx, _this2, _this2, i);
        if (!boundingBox) {
          boundingBox = childBoundingBox;
        } else {
          boundingBox.addBoundingBox(childBoundingBox);
        }
      });
      return boundingBox;
    }
  }, {
    key: "getFontSize",
    value: function getFontSize() {
      var document2 = this.document, parent = this.parent;
      var inheritFontSize = Font.parse(document2.ctx.font).fontSize;
      var fontSize = parent.getStyle("font-size").getNumber(inheritFontSize);
      return fontSize;
    }
  }, {
    key: "getTElementBoundingBox",
    value: function getTElementBoundingBox(ctx) {
      var fontSize = this.getFontSize();
      return new BoundingBox(this.x, this.y - fontSize, this.x + this.measureText(ctx), this.y);
    }
  }, {
    key: "getGlyph",
    value: function getGlyph(font, text, i) {
      var char = text[i];
      var glyph = null;
      if (font.isArabic) {
        var len = text.length;
        var prevChar = text[i - 1];
        var nextChar = text[i + 1];
        var arabicForm = "isolated";
        if ((i === 0 || prevChar === " ") && i < len - 2 && nextChar !== " ") {
          arabicForm = "terminal";
        }
        if (i > 0 && prevChar !== " " && i < len - 2 && nextChar !== " ") {
          arabicForm = "medial";
        }
        if (i > 0 && prevChar !== " " && (i === len - 1 || nextChar === " ")) {
          arabicForm = "initial";
        }
        if (typeof font.glyphs[char] !== "undefined") {
          glyph = font.glyphs[char][arabicForm];
          if (!glyph && font.glyphs[char].type === "glyph") {
            glyph = font.glyphs[char];
          }
        }
      } else {
        glyph = font.glyphs[char];
      }
      if (!glyph) {
        glyph = font.missingGlyph;
      }
      return glyph;
    }
  }, {
    key: "getText",
    value: function getText() {
      return "";
    }
  }, {
    key: "getTextFromNode",
    value: function getTextFromNode(node2) {
      var textNode = node2 || this.node;
      var childNodes = Array.from(textNode.parentNode.childNodes);
      var index2 = childNodes.indexOf(textNode);
      var lastIndex = childNodes.length - 1;
      var text = compressSpaces(textNode.value || textNode.text || textNode.textContent || "");
      if (index2 === 0) {
        text = trimLeft(text);
      }
      if (index2 === lastIndex) {
        text = trimRight(text);
      }
      return text;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      var _this3 = this;
      if (this.type !== "text") {
        this.renderTElementChildren(ctx);
        return;
      }
      this.initializeCoordinates(ctx);
      this.children.forEach(function(_, i) {
        _this3.renderChild(ctx, _this3, _this3, i);
      });
      var mouse = this.document.screen.mouse;
      if (mouse.isWorking()) {
        mouse.checkBoundingBox(this, this.getBoundingBox(ctx));
      }
    }
  }, {
    key: "renderTElementChildren",
    value: function renderTElementChildren(ctx) {
      var document2 = this.document, parent = this.parent;
      var renderText = this.getText();
      var customFont = parent.getStyle("font-family").getDefinition();
      if (customFont) {
        var unitsPerEm = customFont.fontFace.unitsPerEm;
        var ctxFont = Font.parse(document2.ctx.font);
        var fontSize = parent.getStyle("font-size").getNumber(ctxFont.fontSize);
        var fontStyle = parent.getStyle("font-style").getString(ctxFont.fontStyle);
        var scale = fontSize / unitsPerEm;
        var text = customFont.isRTL ? renderText.split("").reverse().join("") : renderText;
        var dx = toNumbers(parent.getAttribute("dx").getString());
        var len = text.length;
        for (var i = 0; i < len; i++) {
          var glyph = this.getGlyph(customFont, text, i);
          ctx.translate(this.x, this.y);
          ctx.scale(scale, -scale);
          var lw = ctx.lineWidth;
          ctx.lineWidth = ctx.lineWidth * unitsPerEm / fontSize;
          if (fontStyle === "italic") {
            ctx.transform(1, 0, 0.4, 1, 0, 0);
          }
          glyph.render(ctx);
          if (fontStyle === "italic") {
            ctx.transform(1, 0, -0.4, 1, 0, 0);
          }
          ctx.lineWidth = lw;
          ctx.scale(1 / scale, -1 / scale);
          ctx.translate(-this.x, -this.y);
          this.x += fontSize * (glyph.horizAdvX || customFont.horizAdvX) / unitsPerEm;
          if (typeof dx[i] !== "undefined" && !isNaN(dx[i])) {
            this.x += dx[i];
          }
        }
        return;
      }
      var x = this.x, y = this.y;
      if (ctx.paintOrder === "stroke") {
        if (ctx.strokeStyle) {
          ctx.strokeText(renderText, x, y);
        }
        if (ctx.fillStyle) {
          ctx.fillText(renderText, x, y);
        }
      } else {
        if (ctx.fillStyle) {
          ctx.fillText(renderText, x, y);
        }
        if (ctx.strokeStyle) {
          ctx.strokeText(renderText, x, y);
        }
      }
    }
  }, {
    key: "getAnchorDelta",
    value: function getAnchorDelta(ctx, parent, startI) {
      var textAnchor = this.getStyle("text-anchor").getString("start");
      if (textAnchor !== "start") {
        var children = parent.children;
        var len = children.length;
        var child = null;
        var width = 0;
        for (var i = startI; i < len; i++) {
          child = children[i];
          if (i > startI && child.getAttribute("x").hasValue() || child.getAttribute("text-anchor").hasValue()) {
            break;
          }
          width += child.measureTextRecursive(ctx);
        }
        return -1 * (textAnchor === "end" ? width : width / 2);
      }
      return 0;
    }
  }, {
    key: "adjustChildCoordinates",
    value: function adjustChildCoordinates(ctx, textParent, parent, i) {
      var child = parent.children[i];
      if (typeof child.measureText !== "function") {
        return child;
      }
      ctx.save();
      child.setContext(ctx, true);
      var xAttr = child.getAttribute("x");
      var yAttr = child.getAttribute("y");
      var dxAttr = child.getAttribute("dx");
      var dyAttr = child.getAttribute("dy");
      var textAnchor = child.getAttribute("text-anchor").getString("start");
      if (i === 0 && child.type !== "textNode") {
        if (!xAttr.hasValue()) {
          xAttr.setValue(textParent.getAttribute("x").getValue("0"));
        }
        if (!yAttr.hasValue()) {
          yAttr.setValue(textParent.getAttribute("y").getValue("0"));
        }
        if (!dxAttr.hasValue()) {
          dxAttr.setValue(textParent.getAttribute("dx").getValue("0"));
        }
        if (!dyAttr.hasValue()) {
          dyAttr.setValue(textParent.getAttribute("dy").getValue("0"));
        }
      }
      if (xAttr.hasValue()) {
        child.x = xAttr.getPixels("x") + textParent.getAnchorDelta(ctx, parent, i);
        if (textAnchor !== "start") {
          var width = child.measureTextRecursive(ctx);
          child.x += -1 * (textAnchor === "end" ? width : width / 2);
        }
        if (dxAttr.hasValue()) {
          child.x += dxAttr.getPixels("x");
        }
      } else {
        if (textAnchor !== "start") {
          var _width = child.measureTextRecursive(ctx);
          textParent.x += -1 * (textAnchor === "end" ? _width : _width / 2);
        }
        if (dxAttr.hasValue()) {
          textParent.x += dxAttr.getPixels("x");
        }
        child.x = textParent.x;
      }
      textParent.x = child.x + child.measureText(ctx);
      if (yAttr.hasValue()) {
        child.y = yAttr.getPixels("y");
        if (dyAttr.hasValue()) {
          child.y += dyAttr.getPixels("y");
        }
      } else {
        if (dyAttr.hasValue()) {
          textParent.y += dyAttr.getPixels("y");
        }
        child.y = textParent.y;
      }
      textParent.y = child.y;
      child.clearContext(ctx);
      ctx.restore();
      return child;
    }
  }, {
    key: "getChildBoundingBox",
    value: function getChildBoundingBox(ctx, textParent, parent, i) {
      var child = this.adjustChildCoordinates(ctx, textParent, parent, i);
      var boundingBox = child.getBoundingBox(ctx);
      if (!boundingBox) {
        return null;
      }
      child.children.forEach(function(_, i2) {
        var childBoundingBox = textParent.getChildBoundingBox(ctx, textParent, child, i2);
        boundingBox.addBoundingBox(childBoundingBox);
      });
      return boundingBox;
    }
  }, {
    key: "renderChild",
    value: function renderChild(ctx, textParent, parent, i) {
      var child = this.adjustChildCoordinates(ctx, textParent, parent, i);
      child.render(ctx);
      child.children.forEach(function(_, i2) {
        textParent.renderChild(ctx, textParent, child, i2);
      });
    }
  }, {
    key: "measureTextRecursive",
    value: function measureTextRecursive(ctx) {
      var width = this.children.reduce(function(width2, child) {
        return width2 + child.measureTextRecursive(ctx);
      }, this.measureText(ctx));
      return width;
    }
  }, {
    key: "measureText",
    value: function measureText(ctx) {
      var measureCache = this.measureCache;
      if (~measureCache) {
        return measureCache;
      }
      var renderText = this.getText();
      var measure = this.measureTargetText(ctx, renderText);
      this.measureCache = measure;
      return measure;
    }
  }, {
    key: "measureTargetText",
    value: function measureTargetText(ctx, targetText) {
      if (!targetText.length) {
        return 0;
      }
      var parent = this.parent;
      var customFont = parent.getStyle("font-family").getDefinition();
      if (customFont) {
        var fontSize = this.getFontSize();
        var text = customFont.isRTL ? targetText.split("").reverse().join("") : targetText;
        var dx = toNumbers(parent.getAttribute("dx").getString());
        var len = text.length;
        var _measure = 0;
        for (var i = 0; i < len; i++) {
          var glyph = this.getGlyph(customFont, text, i);
          _measure += (glyph.horizAdvX || customFont.horizAdvX) * fontSize / customFont.fontFace.unitsPerEm;
          if (typeof dx[i] !== "undefined" && !isNaN(dx[i])) {
            _measure += dx[i];
          }
        }
        return _measure;
      }
      if (!ctx.measureText) {
        return targetText.length * 10;
      }
      ctx.save();
      this.setContext(ctx, true);
      var _ctx$measureText = ctx.measureText(targetText), measure = _ctx$measureText.width;
      this.clearContext(ctx);
      ctx.restore();
      return measure;
    }
  }]);
  return TextElement2;
})(RenderedElement);
function _createSuper$6(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$6()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$6() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TSpanElement = (function(_TextElement) {
  _inherits(TSpanElement2, _TextElement);
  var _super = _createSuper$6(TSpanElement2);
  function TSpanElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, TSpanElement2);
    _this = _super.call(this, document2, node2, (this instanceof TSpanElement2 ? this.constructor : void 0) === TSpanElement2 ? true : captureTextNodes);
    _this.type = "tspan";
    _this.text = _this.children.length > 0 ? "" : _this.getTextFromNode();
    return _this;
  }
  _createClass(TSpanElement2, [{
    key: "getText",
    value: function getText() {
      return this.text;
    }
  }]);
  return TSpanElement2;
})(TextElement);
function _createSuper$7(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$7()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$7() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextNode = (function(_TSpanElement) {
  _inherits(TextNode2, _TSpanElement);
  var _super = _createSuper$7(TextNode2);
  function TextNode2() {
    var _this;
    _classCallCheck(this, TextNode2);
    _this = _super.apply(this, arguments);
    _this.type = "textNode";
    return _this;
  }
  return TextNode2;
})(TSpanElement);
function preparePath(path2) {
  var d = path2.replace(/,/gm, " ").replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2").replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm, "$1 $2").replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm, "$1 $2").replace(/([0-9])([+\-])/gm, "$1 $2").replace(/(\.[0-9]*)(\.)/gm, "$1 $2").replace(/(\.[0-9]*)(\.)/gm, "$1 $2").replace(/([Aa](?:\s+(?:[0-9]*\.)?[0-9]+){3})\s+([01])\s*([01])/gm, "$1 $2 $3 ");
  return compressSpaces(d).trim();
}
var PathParser = (function() {
  function PathParser2(path2) {
    _classCallCheck(this, PathParser2);
    this.control = null;
    this.start = null;
    this.current = null;
    this.command = "";
    this.tokens = [];
    this.i = -1;
    this.previousCommand = "";
    this.points = [];
    this.angles = [];
    this.tokens = preparePath(path2).split(" ");
  }
  _createClass(PathParser2, [{
    key: "reset",
    value: function reset() {
      this.i = -1;
      this.command = "";
      this.previousCommand = "";
      this.start = new Point(0, 0);
      this.control = new Point(0, 0);
      this.current = new Point(0, 0);
      this.points = [];
      this.angles = [];
    }
  }, {
    key: "isEnd",
    value: function isEnd() {
      var i = this.i, tokens = this.tokens;
      return i >= tokens.length - 1;
    }
  }, {
    key: "isCommandOrEnd",
    value: function isCommandOrEnd() {
      if (this.isEnd()) {
        return true;
      }
      var i = this.i, tokens = this.tokens;
      return /^[A-Za-z]$/.test(tokens[i + 1]);
    }
  }, {
    key: "isRelativeCommand",
    value: function isRelativeCommand() {
      switch (this.command) {
        case "m":
        case "l":
        case "h":
        case "v":
        case "c":
        case "s":
        case "q":
        case "t":
        case "a":
        case "z":
          return true;
        default:
          return false;
      }
    }
  }, {
    key: "getToken",
    value: function getToken() {
      this.i++;
      return this.tokens[this.i];
    }
  }, {
    key: "getScalar",
    value: function getScalar() {
      return parseFloat(this.getToken());
    }
  }, {
    key: "nextCommand",
    value: function nextCommand() {
      this.previousCommand = this.command;
      this.command = this.getToken();
    }
  }, {
    key: "getPoint",
    value: function getPoint() {
      var point = new Point(this.getScalar(), this.getScalar());
      return this.makeAbsolute(point);
    }
  }, {
    key: "getAsControlPoint",
    value: function getAsControlPoint() {
      var point = this.getPoint();
      this.control = point;
      return point;
    }
  }, {
    key: "getAsCurrentPoint",
    value: function getAsCurrentPoint() {
      var point = this.getPoint();
      this.current = point;
      return point;
    }
  }, {
    key: "getReflectedControlPoint",
    value: function getReflectedControlPoint() {
      var previousCommand = this.previousCommand.toLowerCase();
      if (previousCommand !== "c" && previousCommand !== "s" && previousCommand !== "q" && previousCommand !== "t") {
        return this.current;
      }
      var _this$current = this.current, cx = _this$current.x, cy = _this$current.y, _this$control = this.control, ox = _this$control.x, oy = _this$control.y;
      var point = new Point(2 * cx - ox, 2 * cy - oy);
      return point;
    }
  }, {
    key: "makeAbsolute",
    value: function makeAbsolute(point) {
      if (this.isRelativeCommand()) {
        var _this$current2 = this.current, x = _this$current2.x, y = _this$current2.y;
        point.x += x;
        point.y += y;
      }
      return point;
    }
  }, {
    key: "addMarker",
    value: function addMarker(point, from2, priorTo) {
      var points = this.points, angles = this.angles;
      if (priorTo && angles.length > 0 && !angles[angles.length - 1]) {
        angles[angles.length - 1] = points[points.length - 1].angleTo(priorTo);
      }
      this.addMarkerAngle(point, from2 ? from2.angleTo(point) : null);
    }
  }, {
    key: "addMarkerAngle",
    value: function addMarkerAngle(point, angle) {
      this.points.push(point);
      this.angles.push(angle);
    }
  }, {
    key: "getMarkerPoints",
    value: function getMarkerPoints() {
      return this.points;
    }
  }, {
    key: "getMarkerAngles",
    value: function getMarkerAngles() {
      var angles = this.angles;
      var len = angles.length;
      for (var i = 0; i < len; i++) {
        if (!angles[i]) {
          for (var j = i + 1; j < len; j++) {
            if (angles[j]) {
              angles[i] = angles[j];
              break;
            }
          }
        }
      }
      return angles;
    }
  }]);
  return PathParser2;
})();
function _createSuper$8(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$8()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$8() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PathElement = (function(_RenderedElement) {
  _inherits(PathElement2, _RenderedElement);
  var _super = _createSuper$8(PathElement2);
  function PathElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, PathElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "path";
    _this.pathParser = null;
    _this.pathParser = new PathParser(_this.getAttribute("d").getString());
    return _this;
  }
  _createClass(PathElement2, [{
    key: "path",
    value: function path2(ctx) {
      var pathParser = this.pathParser;
      var boundingBox = new BoundingBox();
      pathParser.reset();
      if (ctx) {
        ctx.beginPath();
      }
      while (!pathParser.isEnd()) {
        pathParser.nextCommand();
        switch (pathParser.command) {
          case "M":
          case "m":
            this.pathM(ctx, boundingBox);
            break;
          case "L":
          case "l":
            this.pathL(ctx, boundingBox);
            break;
          case "H":
          case "h":
            this.pathH(ctx, boundingBox);
            break;
          case "V":
          case "v":
            this.pathV(ctx, boundingBox);
            break;
          case "C":
          case "c":
            this.pathC(ctx, boundingBox);
            break;
          case "S":
          case "s":
            this.pathS(ctx, boundingBox);
            break;
          case "Q":
          case "q":
            this.pathQ(ctx, boundingBox);
            break;
          case "T":
          case "t":
            this.pathT(ctx, boundingBox);
            break;
          case "A":
          case "a":
            this.pathA(ctx, boundingBox);
            break;
          case "Z":
          case "z":
            this.pathZ(ctx, boundingBox);
            break;
        }
      }
      return boundingBox;
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(_) {
      return this.path();
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      var pathParser = this.pathParser;
      var points = pathParser.getMarkerPoints();
      var angles = pathParser.getMarkerAngles();
      var markers = points.map(function(point, i) {
        return [point, angles[i]];
      });
      return markers;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      this.path(ctx);
      this.document.screen.mouse.checkPath(this, ctx);
      var fillRuleStyleProp = this.getStyle("fill-rule");
      if (ctx.fillStyle !== "") {
        if (fillRuleStyleProp.getString("inherit") !== "inherit") {
          ctx.fill(fillRuleStyleProp.getString());
        } else {
          ctx.fill();
        }
      }
      if (ctx.strokeStyle !== "") {
        ctx.stroke();
      }
      var markers = this.getMarkers();
      if (markers) {
        var markersLastIndex = markers.length - 1;
        var markerStartStyleProp = this.getStyle("marker-start");
        var markerMidStyleProp = this.getStyle("marker-mid");
        var markerEndStyleProp = this.getStyle("marker-end");
        if (markerStartStyleProp.isUrlDefinition()) {
          var marker = markerStartStyleProp.getDefinition();
          var _markers$ = _slicedToArray(markers[0], 2), point = _markers$[0], angle = _markers$[1];
          marker.render(ctx, point, angle);
        }
        if (markerMidStyleProp.isUrlDefinition()) {
          var _marker = markerMidStyleProp.getDefinition();
          for (var i = 1; i < markersLastIndex; i++) {
            var _markers$i = _slicedToArray(markers[i], 2), _point = _markers$i[0], _angle = _markers$i[1];
            _marker.render(ctx, _point, _angle);
          }
        }
        if (markerEndStyleProp.isUrlDefinition()) {
          var _marker2 = markerEndStyleProp.getDefinition();
          var _markers$markersLastI = _slicedToArray(markers[markersLastIndex], 2), _point2 = _markers$markersLastI[0], _angle2 = _markers$markersLastI[1];
          _marker2.render(ctx, _point2, _angle2);
        }
      }
    }
  }, {
    key: "pathM",
    value: function pathM(ctx, boundingBox) {
      var pathParser = this.pathParser;
      var point = pathParser.getAsCurrentPoint();
      var x = point.x, y = point.y;
      pathParser.addMarker(point);
      boundingBox.addPoint(x, y);
      if (ctx) {
        ctx.moveTo(x, y);
      }
      pathParser.start = pathParser.current;
      while (!pathParser.isCommandOrEnd()) {
        var _point3 = pathParser.getAsCurrentPoint();
        var _x = _point3.x, _y = _point3.y;
        pathParser.addMarker(_point3, pathParser.start);
        boundingBox.addPoint(_x, _y);
        if (ctx) {
          ctx.lineTo(_x, _y);
        }
      }
    }
  }, {
    key: "pathL",
    value: function pathL(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = pathParser.getAsCurrentPoint();
        var x = point.x, y = point.y;
        pathParser.addMarker(point, current);
        boundingBox.addPoint(x, y);
        if (ctx) {
          ctx.lineTo(x, y);
        }
      }
    }
  }, {
    key: "pathH",
    value: function pathH(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = new Point((pathParser.isRelativeCommand() ? current.x : 0) + pathParser.getScalar(), current.y);
        pathParser.addMarker(point, current);
        pathParser.current = point;
        boundingBox.addPoint(point.x, point.y);
        if (ctx) {
          ctx.lineTo(point.x, point.y);
        }
      }
    }
  }, {
    key: "pathV",
    value: function pathV(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = new Point(current.x, (pathParser.isRelativeCommand() ? current.y : 0) + pathParser.getScalar());
        pathParser.addMarker(point, current);
        pathParser.current = point;
        boundingBox.addPoint(point.x, point.y);
        if (ctx) {
          ctx.lineTo(point.x, point.y);
        }
      }
    }
  }, {
    key: "pathC",
    value: function pathC(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = pathParser.getPoint();
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        pathParser.addMarker(currentPoint, controlPoint, point);
        boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx) {
          ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        }
      }
    }
  }, {
    key: "pathS",
    value: function pathS(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = pathParser.getReflectedControlPoint();
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        pathParser.addMarker(currentPoint, controlPoint, point);
        boundingBox.addBezierCurve(current.x, current.y, point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx) {
          ctx.bezierCurveTo(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        }
      }
    }
  }, {
    key: "pathQ",
    value: function pathQ(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        pathParser.addMarker(currentPoint, controlPoint, controlPoint);
        boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx) {
          ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        }
      }
    }
  }, {
    key: "pathT",
    value: function pathT(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var controlPoint = pathParser.getReflectedControlPoint();
        pathParser.control = controlPoint;
        var currentPoint = pathParser.getAsCurrentPoint();
        pathParser.addMarker(currentPoint, controlPoint, controlPoint);
        boundingBox.addQuadraticCurve(current.x, current.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        if (ctx) {
          ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
        }
      }
    }
  }, {
    key: "pathA",
    value: function pathA(ctx, boundingBox) {
      var pathParser = this.pathParser;
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var rx = pathParser.getScalar();
        var ry = pathParser.getScalar();
        var xAxisRotation = pathParser.getScalar() * (Math.PI / 180);
        var largeArcFlag = pathParser.getScalar();
        var sweepFlag = pathParser.getScalar();
        var currentPoint = pathParser.getAsCurrentPoint();
        var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2);
        var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);
        if (l > 1) {
          rx *= Math.sqrt(l);
          ry *= Math.sqrt(l);
        }
        var s = (largeArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(currp.y, 2) - Math.pow(ry, 2) * Math.pow(currp.x, 2)) / (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
        if (isNaN(s)) {
          s = 0;
        }
        var cpp = new Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
        var centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
        var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]);
        var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
        var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
        var ad = vectorsAngle(u, v);
        if (vectorsRatio(u, v) <= -1) {
          ad = Math.PI;
        }
        if (vectorsRatio(u, v) >= 1) {
          ad = 0;
        }
        var dir = 1 - sweepFlag ? 1 : -1;
        var ah = a1 + dir * (ad / 2);
        var halfWay = new Point(centp.x + rx * Math.cos(ah), centp.y + ry * Math.sin(ah));
        pathParser.addMarkerAngle(halfWay, ah - dir * Math.PI / 2);
        pathParser.addMarkerAngle(currentPoint, ah - dir * Math.PI);
        boundingBox.addPoint(currentPoint.x, currentPoint.y);
        if (ctx && !isNaN(a1) && !isNaN(ad)) {
          var r = rx > ry ? rx : ry;
          var sx = rx > ry ? 1 : rx / ry;
          var sy = rx > ry ? ry / rx : 1;
          ctx.translate(centp.x, centp.y);
          ctx.rotate(xAxisRotation);
          ctx.scale(sx, sy);
          ctx.arc(0, 0, r, a1, a1 + ad, Boolean(1 - sweepFlag));
          ctx.scale(1 / sx, 1 / sy);
          ctx.rotate(-xAxisRotation);
          ctx.translate(-centp.x, -centp.y);
        }
      }
    }
  }, {
    key: "pathZ",
    value: function pathZ(ctx, boundingBox) {
      var pathParser = this.pathParser;
      if (ctx) {
        if (boundingBox.x1 !== boundingBox.x2 && boundingBox.y1 !== boundingBox.y2) {
          ctx.closePath();
        }
      }
      pathParser.current = pathParser.start;
    }
  }]);
  return PathElement2;
})(RenderedElement);
function _createSuper$9(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$9()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$9() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var SVGElement = (function(_RenderedElement) {
  _inherits(SVGElement2, _RenderedElement);
  var _super = _createSuper$9(SVGElement2);
  function SVGElement2() {
    var _this;
    _classCallCheck(this, SVGElement2);
    _this = _super.apply(this, arguments);
    _this.type = "svg";
    _this.root = false;
    return _this;
  }
  _createClass(SVGElement2, [{
    key: "clearContext",
    value: function clearContext(ctx) {
      _get(_getPrototypeOf(SVGElement2.prototype), "clearContext", this).call(this, ctx);
      this.document.screen.viewPort.removeCurrent();
    }
  }, {
    key: "setContext",
    value: function setContext(ctx) {
      var document2 = this.document;
      var screen = document2.screen, window2 = document2.window;
      var canvas = ctx.canvas;
      screen.setDefaults(ctx);
      if (canvas.style && typeof ctx.font !== "undefined" && window2 && typeof window2.getComputedStyle !== "undefined") {
        ctx.font = window2.getComputedStyle(canvas).getPropertyValue("font");
        var fontSizeProp = new Property(document2, "fontSize", Font.parse(ctx.font).fontSize);
        if (fontSizeProp.hasValue()) {
          document2.rootEmSize = fontSizeProp.getPixels("y");
          document2.emSize = document2.rootEmSize;
        }
      }
      _get(_getPrototypeOf(SVGElement2.prototype), "setContext", this).call(this, ctx);
      if (!this.getAttribute("x").hasValue()) {
        this.getAttribute("x", true).setValue(0);
      }
      if (!this.getAttribute("y").hasValue()) {
        this.getAttribute("y", true).setValue(0);
      }
      ctx.translate(this.getAttribute("x").getPixels("x"), this.getAttribute("y").getPixels("y"));
      var _screen$viewPort = screen.viewPort, width = _screen$viewPort.width, height = _screen$viewPort.height;
      if (!this.getStyle("width").hasValue()) {
        this.getStyle("width", true).setValue("100%");
      }
      if (!this.getStyle("height").hasValue()) {
        this.getStyle("height", true).setValue("100%");
      }
      if (!this.getStyle("color").hasValue()) {
        this.getStyle("color", true).setValue("black");
      }
      var refXAttr = this.getAttribute("refX");
      var refYAttr = this.getAttribute("refY");
      var viewBoxAttr = this.getAttribute("viewBox");
      var viewBox = viewBoxAttr.hasValue() ? toNumbers(viewBoxAttr.getString()) : null;
      var clip = !this.root && this.getAttribute("overflow").getValue("hidden") !== "visible";
      var minX = 0;
      var minY = 0;
      var clipX = 0;
      var clipY = 0;
      if (viewBox) {
        minX = viewBox[0];
        minY = viewBox[1];
      }
      if (!this.root) {
        width = this.getStyle("width").getPixels("x");
        height = this.getStyle("height").getPixels("y");
        if (this.type === "marker") {
          clipX = minX;
          clipY = minY;
          minX = 0;
          minY = 0;
        }
      }
      screen.viewPort.setCurrent(width, height);
      if (viewBox) {
        width = viewBox[2];
        height = viewBox[3];
      }
      document2.setViewBox({
        ctx,
        aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
        width: screen.viewPort.width,
        desiredWidth: width,
        height: screen.viewPort.height,
        desiredHeight: height,
        minX,
        minY,
        refX: refXAttr.getValue(),
        refY: refYAttr.getValue(),
        clip,
        clipX,
        clipY
      });
      if (viewBox) {
        screen.viewPort.removeCurrent();
        screen.viewPort.setCurrent(width, height);
      }
    }
    /**
     * Resize SVG to fit in given size.
     * @param width
     * @param height
     * @param preserveAspectRatio
     */
  }, {
    key: "resize",
    value: function resize(width) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
      var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var widthAttr = this.getAttribute("width", true);
      var heightAttr = this.getAttribute("height", true);
      var viewBoxAttr = this.getAttribute("viewBox");
      var styleAttr = this.getAttribute("style");
      var originWidth = widthAttr.getNumber(0);
      var originHeight = heightAttr.getNumber(0);
      if (preserveAspectRatio) {
        if (typeof preserveAspectRatio === "string") {
          this.getAttribute("preserveAspectRatio", true).setValue(preserveAspectRatio);
        } else {
          var preserveAspectRatioAttr = this.getAttribute("preserveAspectRatio");
          if (preserveAspectRatioAttr.hasValue()) {
            preserveAspectRatioAttr.setValue(preserveAspectRatioAttr.getString().replace(/^\s*(\S.*\S)\s*$/, "$1"));
          }
        }
      }
      widthAttr.setValue(width);
      heightAttr.setValue(height);
      if (!viewBoxAttr.hasValue()) {
        viewBoxAttr.setValue("0 0 ".concat(originWidth || width, " ").concat(originHeight || height));
      }
      if (styleAttr.hasValue()) {
        var widthStyle = this.getStyle("width");
        var heightStyle = this.getStyle("height");
        if (widthStyle.hasValue()) {
          widthStyle.setValue("".concat(width, "px"));
        }
        if (heightStyle.hasValue()) {
          heightStyle.setValue("".concat(height, "px"));
        }
      }
    }
  }]);
  return SVGElement2;
})(RenderedElement);
function _createSuper$a(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$a()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$a() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var RectElement = (function(_PathElement) {
  _inherits(RectElement2, _PathElement);
  var _super = _createSuper$a(RectElement2);
  function RectElement2() {
    var _this;
    _classCallCheck(this, RectElement2);
    _this = _super.apply(this, arguments);
    _this.type = "rect";
    return _this;
  }
  _createClass(RectElement2, [{
    key: "path",
    value: function path2(ctx) {
      var x = this.getAttribute("x").getPixels("x");
      var y = this.getAttribute("y").getPixels("y");
      var width = this.getStyle("width").getPixels("x");
      var height = this.getStyle("height").getPixels("y");
      var rxAttr = this.getAttribute("rx");
      var ryAttr = this.getAttribute("ry");
      var rx = rxAttr.getPixels("x");
      var ry = ryAttr.getPixels("y");
      if (rxAttr.hasValue() && !ryAttr.hasValue()) {
        ry = rx;
      }
      if (ryAttr.hasValue() && !rxAttr.hasValue()) {
        rx = ry;
      }
      rx = Math.min(rx, width / 2);
      ry = Math.min(ry, height / 2);
      if (ctx) {
        var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
        ctx.beginPath();
        if (height > 0 && width > 0) {
          ctx.moveTo(x + rx, y);
          ctx.lineTo(x + width - rx, y);
          ctx.bezierCurveTo(x + width - rx + KAPPA * rx, y, x + width, y + ry - KAPPA * ry, x + width, y + ry);
          ctx.lineTo(x + width, y + height - ry);
          ctx.bezierCurveTo(x + width, y + height - ry + KAPPA * ry, x + width - rx + KAPPA * rx, y + height, x + width - rx, y + height);
          ctx.lineTo(x + rx, y + height);
          ctx.bezierCurveTo(x + rx - KAPPA * rx, y + height, x, y + height - ry + KAPPA * ry, x, y + height - ry);
          ctx.lineTo(x, y + ry);
          ctx.bezierCurveTo(x, y + ry - KAPPA * ry, x + rx - KAPPA * rx, y, x + rx, y);
          ctx.closePath();
        }
      }
      return new BoundingBox(x, y, x + width, y + height);
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      return null;
    }
  }]);
  return RectElement2;
})(PathElement);
function _createSuper$b(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$b()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$b() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var CircleElement = (function(_PathElement) {
  _inherits(CircleElement2, _PathElement);
  var _super = _createSuper$b(CircleElement2);
  function CircleElement2() {
    var _this;
    _classCallCheck(this, CircleElement2);
    _this = _super.apply(this, arguments);
    _this.type = "circle";
    return _this;
  }
  _createClass(CircleElement2, [{
    key: "path",
    value: function path2(ctx) {
      var cx = this.getAttribute("cx").getPixels("x");
      var cy = this.getAttribute("cy").getPixels("y");
      var r = this.getAttribute("r").getPixels();
      if (ctx && r > 0) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
        ctx.closePath();
      }
      return new BoundingBox(cx - r, cy - r, cx + r, cy + r);
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      return null;
    }
  }]);
  return CircleElement2;
})(PathElement);
function _createSuper$c(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$c()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$c() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var EllipseElement = (function(_PathElement) {
  _inherits(EllipseElement2, _PathElement);
  var _super = _createSuper$c(EllipseElement2);
  function EllipseElement2() {
    var _this;
    _classCallCheck(this, EllipseElement2);
    _this = _super.apply(this, arguments);
    _this.type = "ellipse";
    return _this;
  }
  _createClass(EllipseElement2, [{
    key: "path",
    value: function path2(ctx) {
      var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
      var rx = this.getAttribute("rx").getPixels("x");
      var ry = this.getAttribute("ry").getPixels("y");
      var cx = this.getAttribute("cx").getPixels("x");
      var cy = this.getAttribute("cy").getPixels("y");
      if (ctx && rx > 0 && ry > 0) {
        ctx.beginPath();
        ctx.moveTo(cx + rx, cy);
        ctx.bezierCurveTo(cx + rx, cy + KAPPA * ry, cx + KAPPA * rx, cy + ry, cx, cy + ry);
        ctx.bezierCurveTo(cx - KAPPA * rx, cy + ry, cx - rx, cy + KAPPA * ry, cx - rx, cy);
        ctx.bezierCurveTo(cx - rx, cy - KAPPA * ry, cx - KAPPA * rx, cy - ry, cx, cy - ry);
        ctx.bezierCurveTo(cx + KAPPA * rx, cy - ry, cx + rx, cy - KAPPA * ry, cx + rx, cy);
        ctx.closePath();
      }
      return new BoundingBox(cx - rx, cy - ry, cx + rx, cy + ry);
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      return null;
    }
  }]);
  return EllipseElement2;
})(PathElement);
function _createSuper$d(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$d()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$d() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var LineElement = (function(_PathElement) {
  _inherits(LineElement2, _PathElement);
  var _super = _createSuper$d(LineElement2);
  function LineElement2() {
    var _this;
    _classCallCheck(this, LineElement2);
    _this = _super.apply(this, arguments);
    _this.type = "line";
    return _this;
  }
  _createClass(LineElement2, [{
    key: "getPoints",
    value: function getPoints() {
      return [new Point(this.getAttribute("x1").getPixels("x"), this.getAttribute("y1").getPixels("y")), new Point(this.getAttribute("x2").getPixels("x"), this.getAttribute("y2").getPixels("y"))];
    }
  }, {
    key: "path",
    value: function path2(ctx) {
      var _this$getPoints = this.getPoints(), _this$getPoints2 = _slicedToArray(_this$getPoints, 2), _this$getPoints2$ = _this$getPoints2[0], x0 = _this$getPoints2$.x, y0 = _this$getPoints2$.y, _this$getPoints2$2 = _this$getPoints2[1], x1 = _this$getPoints2$2.x, y1 = _this$getPoints2$2.y;
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
      }
      return new BoundingBox(x0, y0, x1, y1);
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      var _this$getPoints3 = this.getPoints(), _this$getPoints4 = _slicedToArray(_this$getPoints3, 2), p0 = _this$getPoints4[0], p1 = _this$getPoints4[1];
      var a = p0.angleTo(p1);
      return [[p0, a], [p1, a]];
    }
  }]);
  return LineElement2;
})(PathElement);
function _createSuper$e(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$e()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$e() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PolylineElement = (function(_PathElement) {
  _inherits(PolylineElement2, _PathElement);
  var _super = _createSuper$e(PolylineElement2);
  function PolylineElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, PolylineElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "polyline";
    _this.points = [];
    _this.points = Point.parsePath(_this.getAttribute("points").getString());
    return _this;
  }
  _createClass(PolylineElement2, [{
    key: "path",
    value: function path2(ctx) {
      var points = this.points;
      var _points = _slicedToArray(points, 1), _points$ = _points[0], x0 = _points$.x, y0 = _points$.y;
      var boundingBox = new BoundingBox(x0, y0);
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x0, y0);
      }
      points.forEach(function(_ref) {
        var x = _ref.x, y = _ref.y;
        boundingBox.addPoint(x, y);
        if (ctx) {
          ctx.lineTo(x, y);
        }
      });
      return boundingBox;
    }
  }, {
    key: "getMarkers",
    value: function getMarkers() {
      var points = this.points;
      var lastIndex = points.length - 1;
      var markers = [];
      points.forEach(function(point, i) {
        if (i === lastIndex) {
          return;
        }
        markers.push([point, point.angleTo(points[i + 1])]);
      });
      if (markers.length > 0) {
        markers.push([points[points.length - 1], markers[markers.length - 1][1]]);
      }
      return markers;
    }
  }]);
  return PolylineElement2;
})(PathElement);
function _createSuper$f(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$f()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$f() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PolygonElement = (function(_PolylineElement) {
  _inherits(PolygonElement2, _PolylineElement);
  var _super = _createSuper$f(PolygonElement2);
  function PolygonElement2() {
    var _this;
    _classCallCheck(this, PolygonElement2);
    _this = _super.apply(this, arguments);
    _this.type = "polygon";
    return _this;
  }
  _createClass(PolygonElement2, [{
    key: "path",
    value: function path2(ctx) {
      var boundingBox = _get(_getPrototypeOf(PolygonElement2.prototype), "path", this).call(this, ctx);
      var _this$points = _slicedToArray(this.points, 1), _this$points$ = _this$points[0], x = _this$points$.x, y = _this$points$.y;
      if (ctx) {
        ctx.lineTo(x, y);
        ctx.closePath();
      }
      return boundingBox;
    }
  }]);
  return PolygonElement2;
})(PolylineElement);
function _createSuper$g(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$g()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$g() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PatternElement = (function(_Element) {
  _inherits(PatternElement2, _Element);
  var _super = _createSuper$g(PatternElement2);
  function PatternElement2() {
    var _this;
    _classCallCheck(this, PatternElement2);
    _this = _super.apply(this, arguments);
    _this.type = "pattern";
    return _this;
  }
  _createClass(PatternElement2, [{
    key: "createPattern",
    value: function createPattern(ctx, _, parentOpacityProp) {
      var width = this.getStyle("width").getPixels("x", true);
      var height = this.getStyle("height").getPixels("y", true);
      var patternSvg = new SVGElement(this.document, null);
      patternSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
      patternSvg.attributes.width = new Property(this.document, "width", "".concat(width, "px"));
      patternSvg.attributes.height = new Property(this.document, "height", "".concat(height, "px"));
      patternSvg.attributes.transform = new Property(this.document, "transform", this.getAttribute("patternTransform").getValue());
      patternSvg.children = this.children;
      var patternCanvas = this.document.createCanvas(width, height);
      var patternCtx = patternCanvas.getContext("2d");
      var xAttr = this.getAttribute("x");
      var yAttr = this.getAttribute("y");
      if (xAttr.hasValue() && yAttr.hasValue()) {
        patternCtx.translate(xAttr.getPixels("x", true), yAttr.getPixels("y", true));
      }
      if (parentOpacityProp.hasValue()) {
        this.styles["fill-opacity"] = parentOpacityProp;
      } else {
        Reflect.deleteProperty(this.styles, "fill-opacity");
      }
      for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
          patternCtx.save();
          patternSvg.attributes.x = new Property(this.document, "x", x * patternCanvas.width);
          patternSvg.attributes.y = new Property(this.document, "y", y * patternCanvas.height);
          patternSvg.render(patternCtx);
          patternCtx.restore();
        }
      }
      var pattern = ctx.createPattern(patternCanvas, "repeat");
      return pattern;
    }
  }]);
  return PatternElement2;
})(Element);
function _createSuper$h(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$h()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$h() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var MarkerElement = (function(_Element) {
  _inherits(MarkerElement2, _Element);
  var _super = _createSuper$h(MarkerElement2);
  function MarkerElement2() {
    var _this;
    _classCallCheck(this, MarkerElement2);
    _this = _super.apply(this, arguments);
    _this.type = "marker";
    return _this;
  }
  _createClass(MarkerElement2, [{
    key: "render",
    value: function render(ctx, point, angle) {
      if (!point) {
        return;
      }
      var x = point.x, y = point.y;
      var orient = this.getAttribute("orient").getValue("auto");
      var markerUnits = this.getAttribute("markerUnits").getValue("strokeWidth");
      ctx.translate(x, y);
      if (orient === "auto") {
        ctx.rotate(angle);
      }
      if (markerUnits === "strokeWidth") {
        ctx.scale(ctx.lineWidth, ctx.lineWidth);
      }
      ctx.save();
      var markerSvg = new SVGElement(this.document, null);
      markerSvg.type = this.type;
      markerSvg.attributes.viewBox = new Property(this.document, "viewBox", this.getAttribute("viewBox").getValue());
      markerSvg.attributes.refX = new Property(this.document, "refX", this.getAttribute("refX").getValue());
      markerSvg.attributes.refY = new Property(this.document, "refY", this.getAttribute("refY").getValue());
      markerSvg.attributes.width = new Property(this.document, "width", this.getAttribute("markerWidth").getValue());
      markerSvg.attributes.height = new Property(this.document, "height", this.getAttribute("markerHeight").getValue());
      markerSvg.attributes.overflow = new Property(this.document, "overflow", this.getAttribute("overflow").getValue());
      markerSvg.attributes.fill = new Property(this.document, "fill", this.getAttribute("fill").getColor("black"));
      markerSvg.attributes.stroke = new Property(this.document, "stroke", this.getAttribute("stroke").getValue("none"));
      markerSvg.children = this.children;
      markerSvg.render(ctx);
      ctx.restore();
      if (markerUnits === "strokeWidth") {
        ctx.scale(1 / ctx.lineWidth, 1 / ctx.lineWidth);
      }
      if (orient === "auto") {
        ctx.rotate(-angle);
      }
      ctx.translate(-x, -y);
    }
  }]);
  return MarkerElement2;
})(Element);
function _createSuper$i(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$i()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$i() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var DefsElement = (function(_Element) {
  _inherits(DefsElement2, _Element);
  var _super = _createSuper$i(DefsElement2);
  function DefsElement2() {
    var _this;
    _classCallCheck(this, DefsElement2);
    _this = _super.apply(this, arguments);
    _this.type = "defs";
    return _this;
  }
  _createClass(DefsElement2, [{
    key: "render",
    value: function render() {
    }
  }]);
  return DefsElement2;
})(Element);
function _createSuper$j(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$j()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$j() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var GElement = (function(_RenderedElement) {
  _inherits(GElement2, _RenderedElement);
  var _super = _createSuper$j(GElement2);
  function GElement2() {
    var _this;
    _classCallCheck(this, GElement2);
    _this = _super.apply(this, arguments);
    _this.type = "g";
    return _this;
  }
  _createClass(GElement2, [{
    key: "getBoundingBox",
    value: function getBoundingBox(ctx) {
      var boundingBox = new BoundingBox();
      this.children.forEach(function(child) {
        boundingBox.addBoundingBox(child.getBoundingBox(ctx));
      });
      return boundingBox;
    }
  }]);
  return GElement2;
})(RenderedElement);
function _createSuper$k(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$k()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$k() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var GradientElement = (function(_Element) {
  _inherits(GradientElement2, _Element);
  var _super = _createSuper$k(GradientElement2);
  function GradientElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, GradientElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.attributesToInherit = ["gradientUnits"];
    _this.stops = [];
    var _assertThisInitialize = _assertThisInitialized(_this), stops = _assertThisInitialize.stops, children = _assertThisInitialize.children;
    children.forEach(function(child) {
      if (child.type === "stop") {
        stops.push(child);
      }
    });
    return _this;
  }
  _createClass(GradientElement2, [{
    key: "getGradientUnits",
    value: function getGradientUnits() {
      return this.getAttribute("gradientUnits").getString("objectBoundingBox");
    }
  }, {
    key: "createGradient",
    value: function createGradient(ctx, element, parentOpacityProp) {
      var _this2 = this;
      var stopsContainer = this;
      if (this.getHrefAttribute().hasValue()) {
        stopsContainer = this.getHrefAttribute().getDefinition();
        this.inheritStopContainer(stopsContainer);
      }
      var _stopsContainer = stopsContainer, stops = _stopsContainer.stops;
      var gradient = this.getGradient(ctx, element);
      if (!gradient) {
        return this.addParentOpacity(parentOpacityProp, stops[stops.length - 1].color);
      }
      stops.forEach(function(stop) {
        gradient.addColorStop(stop.offset, _this2.addParentOpacity(parentOpacityProp, stop.color));
      });
      if (this.getAttribute("gradientTransform").hasValue()) {
        var document2 = this.document;
        var _document$screen = document2.screen, MAX_VIRTUAL_PIXELS = _document$screen.MAX_VIRTUAL_PIXELS, viewPort = _document$screen.viewPort;
        var _viewPort$viewPorts = _slicedToArray(viewPort.viewPorts, 1), rootView = _viewPort$viewPorts[0];
        var rect = new RectElement(document2, null);
        rect.attributes.x = new Property(document2, "x", -MAX_VIRTUAL_PIXELS / 3);
        rect.attributes.y = new Property(document2, "y", -MAX_VIRTUAL_PIXELS / 3);
        rect.attributes.width = new Property(document2, "width", MAX_VIRTUAL_PIXELS);
        rect.attributes.height = new Property(document2, "height", MAX_VIRTUAL_PIXELS);
        var group = new GElement(document2, null);
        group.attributes.transform = new Property(document2, "transform", this.getAttribute("gradientTransform").getValue());
        group.children = [rect];
        var patternSvg = new SVGElement(document2, null);
        patternSvg.attributes.x = new Property(document2, "x", 0);
        patternSvg.attributes.y = new Property(document2, "y", 0);
        patternSvg.attributes.width = new Property(document2, "width", rootView.width);
        patternSvg.attributes.height = new Property(document2, "height", rootView.height);
        patternSvg.children = [group];
        var patternCanvas = document2.createCanvas(rootView.width, rootView.height);
        var patternCtx = patternCanvas.getContext("2d");
        patternCtx.fillStyle = gradient;
        patternSvg.render(patternCtx);
        return patternCtx.createPattern(patternCanvas, "no-repeat");
      }
      return gradient;
    }
  }, {
    key: "inheritStopContainer",
    value: function inheritStopContainer(stopsContainer) {
      var _this3 = this;
      this.attributesToInherit.forEach(function(attributeToInherit) {
        if (!_this3.getAttribute(attributeToInherit).hasValue() && stopsContainer.getAttribute(attributeToInherit).hasValue()) {
          _this3.getAttribute(attributeToInherit, true).setValue(stopsContainer.getAttribute(attributeToInherit).getValue());
        }
      });
    }
  }, {
    key: "addParentOpacity",
    value: function addParentOpacity(parentOpacityProp, color) {
      if (parentOpacityProp.hasValue()) {
        var colorProp = new Property(this.document, "color", color);
        return colorProp.addOpacity(parentOpacityProp).getColor();
      }
      return color;
    }
  }]);
  return GradientElement2;
})(Element);
function _createSuper$l(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$l()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$l() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var LinearGradientElement = (function(_GradientElement) {
  _inherits(LinearGradientElement2, _GradientElement);
  var _super = _createSuper$l(LinearGradientElement2);
  function LinearGradientElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, LinearGradientElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "linearGradient";
    _this.attributesToInherit.push("x1", "y1", "x2", "y2");
    return _this;
  }
  _createClass(LinearGradientElement2, [{
    key: "getGradient",
    value: function getGradient(ctx, element) {
      var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
      var boundingBox = isBoundingBoxUnits ? element.getBoundingBox(ctx) : null;
      if (isBoundingBoxUnits && !boundingBox) {
        return null;
      }
      if (!this.getAttribute("x1").hasValue() && !this.getAttribute("y1").hasValue() && !this.getAttribute("x2").hasValue() && !this.getAttribute("y2").hasValue()) {
        this.getAttribute("x1", true).setValue(0);
        this.getAttribute("y1", true).setValue(0);
        this.getAttribute("x2", true).setValue(1);
        this.getAttribute("y2", true).setValue(0);
      }
      var x1 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x1").getNumber() : this.getAttribute("x1").getPixels("x");
      var y1 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y1").getNumber() : this.getAttribute("y1").getPixels("y");
      var x2 = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("x2").getNumber() : this.getAttribute("x2").getPixels("x");
      var y2 = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("y2").getNumber() : this.getAttribute("y2").getPixels("y");
      if (x1 === x2 && y1 === y2) {
        return null;
      }
      return ctx.createLinearGradient(x1, y1, x2, y2);
    }
  }]);
  return LinearGradientElement2;
})(GradientElement);
function _createSuper$m(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$m()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$m() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var RadialGradientElement = (function(_GradientElement) {
  _inherits(RadialGradientElement2, _GradientElement);
  var _super = _createSuper$m(RadialGradientElement2);
  function RadialGradientElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, RadialGradientElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "radialGradient";
    _this.attributesToInherit.push("cx", "cy", "r", "fx", "fy", "fr");
    return _this;
  }
  _createClass(RadialGradientElement2, [{
    key: "getGradient",
    value: function getGradient(ctx, element) {
      var isBoundingBoxUnits = this.getGradientUnits() === "objectBoundingBox";
      var boundingBox = element.getBoundingBox(ctx);
      if (isBoundingBoxUnits && !boundingBox) {
        return null;
      }
      if (!this.getAttribute("cx").hasValue()) {
        this.getAttribute("cx", true).setValue("50%");
      }
      if (!this.getAttribute("cy").hasValue()) {
        this.getAttribute("cy", true).setValue("50%");
      }
      if (!this.getAttribute("r").hasValue()) {
        this.getAttribute("r", true).setValue("50%");
      }
      var cx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("cx").getNumber() : this.getAttribute("cx").getPixels("x");
      var cy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("cy").getNumber() : this.getAttribute("cy").getPixels("y");
      var fx = cx;
      var fy = cy;
      if (this.getAttribute("fx").hasValue()) {
        fx = isBoundingBoxUnits ? boundingBox.x + boundingBox.width * this.getAttribute("fx").getNumber() : this.getAttribute("fx").getPixels("x");
      }
      if (this.getAttribute("fy").hasValue()) {
        fy = isBoundingBoxUnits ? boundingBox.y + boundingBox.height * this.getAttribute("fy").getNumber() : this.getAttribute("fy").getPixels("y");
      }
      var r = isBoundingBoxUnits ? (boundingBox.width + boundingBox.height) / 2 * this.getAttribute("r").getNumber() : this.getAttribute("r").getPixels();
      var fr = this.getAttribute("fr").getPixels();
      return ctx.createRadialGradient(fx, fy, fr, cx, cy, r);
    }
  }]);
  return RadialGradientElement2;
})(GradientElement);
function _createSuper$n(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$n()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$n() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var StopElement = (function(_Element) {
  _inherits(StopElement2, _Element);
  var _super = _createSuper$n(StopElement2);
  function StopElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, StopElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "stop";
    var offset = Math.max(0, Math.min(1, _this.getAttribute("offset").getNumber()));
    var stopOpacity = _this.getStyle("stop-opacity");
    var stopColor = _this.getStyle("stop-color", true);
    if (stopColor.getString() === "") {
      stopColor.setValue("#000");
    }
    if (stopOpacity.hasValue()) {
      stopColor = stopColor.addOpacity(stopOpacity);
    }
    _this.offset = offset;
    _this.color = stopColor.getColor();
    return _this;
  }
  return StopElement2;
})(Element);
function _createSuper$o(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$o()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$o() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AnimateElement = (function(_Element) {
  _inherits(AnimateElement2, _Element);
  var _super = _createSuper$o(AnimateElement2);
  function AnimateElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, AnimateElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "animate";
    _this.duration = 0;
    _this.initialValue = null;
    _this.initialUnits = "";
    _this.removed = false;
    _this.frozen = false;
    document2.screen.animations.push(_assertThisInitialized(_this));
    _this.begin = _this.getAttribute("begin").getMilliseconds();
    _this.maxDuration = _this.begin + _this.getAttribute("dur").getMilliseconds();
    _this.from = _this.getAttribute("from");
    _this.to = _this.getAttribute("to");
    _this.values = _this.getAttribute("values");
    if (_this.values.hasValue()) {
      _this.values.setValue(_this.values.getString().split(";"));
    }
    return _this;
  }
  _createClass(AnimateElement2, [{
    key: "getProperty",
    value: function getProperty() {
      var attributeType = this.getAttribute("attributeType").getString();
      var attributeName = this.getAttribute("attributeName").getString();
      if (attributeType === "CSS") {
        return this.parent.getStyle(attributeName, true);
      }
      return this.parent.getAttribute(attributeName, true);
    }
  }, {
    key: "calcValue",
    value: function calcValue() {
      var initialUnits = this.initialUnits;
      var _this$getProgress = this.getProgress(), progress = _this$getProgress.progress, from2 = _this$getProgress.from, to = _this$getProgress.to;
      var newValue = from2.getNumber() + (to.getNumber() - from2.getNumber()) * progress;
      if (initialUnits === "%") {
        newValue *= 100;
      }
      return "".concat(newValue).concat(initialUnits);
    }
  }, {
    key: "update",
    value: function update(delta) {
      var parent = this.parent;
      var prop = this.getProperty();
      if (!this.initialValue) {
        this.initialValue = prop.getString();
        this.initialUnits = prop.getUnits();
      }
      if (this.duration > this.maxDuration) {
        var fill2 = this.getAttribute("fill").getString("remove");
        if (this.getAttribute("repeatCount").getString() === "indefinite" || this.getAttribute("repeatDur").getString() === "indefinite") {
          this.duration = 0;
        } else if (fill2 === "freeze" && !this.frozen) {
          this.frozen = true;
          parent.animationFrozen = true;
          parent.animationFrozenValue = prop.getString();
        } else if (fill2 === "remove" && !this.removed) {
          this.removed = true;
          prop.setValue(parent.animationFrozen ? parent.animationFrozenValue : this.initialValue);
          return true;
        }
        return false;
      }
      this.duration += delta;
      var updated = false;
      if (this.begin < this.duration) {
        var newValue = this.calcValue();
        var typeAttr = this.getAttribute("type");
        if (typeAttr.hasValue()) {
          var type = typeAttr.getString();
          newValue = "".concat(type, "(").concat(newValue, ")");
        }
        prop.setValue(newValue);
        updated = true;
      }
      return updated;
    }
  }, {
    key: "getProgress",
    value: function getProgress() {
      var document2 = this.document, values = this.values;
      var result = {
        progress: (this.duration - this.begin) / (this.maxDuration - this.begin)
      };
      if (values.hasValue()) {
        var p = result.progress * (values.getValue().length - 1);
        var lb = Math.floor(p);
        var ub = Math.ceil(p);
        result.from = new Property(document2, "from", parseFloat(values.getValue()[lb]));
        result.to = new Property(document2, "to", parseFloat(values.getValue()[ub]));
        result.progress = (p - lb) / (ub - lb);
      } else {
        result.from = this.from;
        result.to = this.to;
      }
      return result;
    }
  }]);
  return AnimateElement2;
})(Element);
function _createSuper$p(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$p()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$p() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AnimateColorElement = (function(_AnimateElement) {
  _inherits(AnimateColorElement2, _AnimateElement);
  var _super = _createSuper$p(AnimateColorElement2);
  function AnimateColorElement2() {
    var _this;
    _classCallCheck(this, AnimateColorElement2);
    _this = _super.apply(this, arguments);
    _this.type = "animateColor";
    return _this;
  }
  _createClass(AnimateColorElement2, [{
    key: "calcValue",
    value: function calcValue() {
      var _this$getProgress = this.getProgress(), progress = _this$getProgress.progress, from2 = _this$getProgress.from, to = _this$getProgress.to;
      var colorFrom = new import_rgbcolor.default(from2.getColor());
      var colorTo = new import_rgbcolor.default(to.getColor());
      if (colorFrom.ok && colorTo.ok) {
        var r = colorFrom.r + (colorTo.r - colorFrom.r) * progress;
        var g = colorFrom.g + (colorTo.g - colorFrom.g) * progress;
        var b = colorFrom.b + (colorTo.b - colorFrom.b) * progress;
        return "rgb(".concat(parseInt(r, 10), ", ").concat(parseInt(g, 10), ", ").concat(parseInt(b, 10), ")");
      }
      return this.getAttribute("from").getColor();
    }
  }]);
  return AnimateColorElement2;
})(AnimateElement);
function _createSuper$q(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$q()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$q() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AnimateTransformElement = (function(_AnimateElement) {
  _inherits(AnimateTransformElement2, _AnimateElement);
  var _super = _createSuper$q(AnimateTransformElement2);
  function AnimateTransformElement2() {
    var _this;
    _classCallCheck(this, AnimateTransformElement2);
    _this = _super.apply(this, arguments);
    _this.type = "animateTransform";
    return _this;
  }
  _createClass(AnimateTransformElement2, [{
    key: "calcValue",
    value: function calcValue() {
      var _this$getProgress = this.getProgress(), progress = _this$getProgress.progress, from2 = _this$getProgress.from, to = _this$getProgress.to;
      var transformFrom = toNumbers(from2.getString());
      var transformTo = toNumbers(to.getString());
      var newValue = transformFrom.map(function(from3, i) {
        var to2 = transformTo[i];
        return from3 + (to2 - from3) * progress;
      }).join(" ");
      return newValue;
    }
  }]);
  return AnimateTransformElement2;
})(AnimateElement);
function _createForOfIteratorHelper(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray2(o))) {
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var it, normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null) it.return();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _createSuper$r(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$r()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$r() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FontElement = (function(_Element) {
  _inherits(FontElement2, _Element);
  var _super = _createSuper$r(FontElement2);
  function FontElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, FontElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "font";
    _this.glyphs = {};
    _this.horizAdvX = _this.getAttribute("horiz-adv-x").getNumber();
    var definitions = document2.definitions;
    var _assertThisInitialize = _assertThisInitialized(_this), children = _assertThisInitialize.children;
    var _iterator = _createForOfIteratorHelper(children), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var child = _step.value;
        switch (child.type) {
          case "font-face": {
            _this.fontFace = child;
            var fontFamilyStyle = child.getStyle("font-family");
            if (fontFamilyStyle.hasValue()) {
              definitions[fontFamilyStyle.getString()] = _assertThisInitialized(_this);
            }
            break;
          }
          case "missing-glyph":
            _this.missingGlyph = child;
            break;
          case "glyph": {
            var glyph = child;
            if (glyph.arabicForm) {
              _this.isRTL = true;
              _this.isArabic = true;
              if (typeof _this.glyphs[glyph.unicode] === "undefined") {
                _this.glyphs[glyph.unicode] = {};
              }
              _this.glyphs[glyph.unicode][glyph.arabicForm] = glyph;
            } else {
              _this.glyphs[glyph.unicode] = glyph;
            }
            break;
          }
          default:
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return _this;
  }
  _createClass(FontElement2, [{
    key: "render",
    value: function render() {
    }
  }]);
  return FontElement2;
})(Element);
function _createSuper$s(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$s()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$s() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FontFaceElement = (function(_Element) {
  _inherits(FontFaceElement2, _Element);
  var _super = _createSuper$s(FontFaceElement2);
  function FontFaceElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, FontFaceElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "font-face";
    _this.ascent = _this.getAttribute("ascent").getNumber();
    _this.descent = _this.getAttribute("descent").getNumber();
    _this.unitsPerEm = _this.getAttribute("units-per-em").getNumber();
    return _this;
  }
  return FontFaceElement2;
})(Element);
function _createSuper$t(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$t()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$t() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var MissingGlyphElement = (function(_PathElement) {
  _inherits(MissingGlyphElement2, _PathElement);
  var _super = _createSuper$t(MissingGlyphElement2);
  function MissingGlyphElement2() {
    var _this;
    _classCallCheck(this, MissingGlyphElement2);
    _this = _super.apply(this, arguments);
    _this.type = "missing-glyph";
    _this.horizAdvX = 0;
    return _this;
  }
  return MissingGlyphElement2;
})(PathElement);
function _createSuper$u(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$u()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$u() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var GlyphElement = (function(_PathElement) {
  _inherits(GlyphElement2, _PathElement);
  var _super = _createSuper$u(GlyphElement2);
  function GlyphElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, GlyphElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "glyph";
    _this.horizAdvX = _this.getAttribute("horiz-adv-x").getNumber();
    _this.unicode = _this.getAttribute("unicode").getString();
    _this.arabicForm = _this.getAttribute("arabic-form").getString();
    return _this;
  }
  return GlyphElement2;
})(PathElement);
function _createSuper$v(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$v()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$v() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TRefElement = (function(_TextElement) {
  _inherits(TRefElement2, _TextElement);
  var _super = _createSuper$v(TRefElement2);
  function TRefElement2() {
    var _this;
    _classCallCheck(this, TRefElement2);
    _this = _super.apply(this, arguments);
    _this.type = "tref";
    return _this;
  }
  _createClass(TRefElement2, [{
    key: "getText",
    value: function getText() {
      var element = this.getHrefAttribute().getDefinition();
      if (element) {
        var firstChild = element.children[0];
        if (firstChild) {
          return firstChild.getText();
        }
      }
      return "";
    }
  }]);
  return TRefElement2;
})(TextElement);
function _createSuper$w(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$w()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$w() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AElement = (function(_TextElement) {
  _inherits(AElement2, _TextElement);
  var _super = _createSuper$w(AElement2);
  function AElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, AElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "a";
    var childNodes = node2.childNodes;
    var firstChild = childNodes[0];
    var hasText = childNodes.length > 0 && Array.from(childNodes).every(function(node3) {
      return node3.nodeType === 3;
    });
    _this.hasText = hasText;
    _this.text = hasText ? _this.getTextFromNode(firstChild) : "";
    return _this;
  }
  _createClass(AElement2, [{
    key: "getText",
    value: function getText() {
      return this.text;
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      if (this.hasText) {
        _get(_getPrototypeOf(AElement2.prototype), "renderChildren", this).call(this, ctx);
        var document2 = this.document, x = this.x, y = this.y;
        var mouse = document2.screen.mouse;
        var fontSize = new Property(document2, "fontSize", Font.parse(document2.ctx.font).fontSize);
        if (mouse.isWorking()) {
          mouse.checkBoundingBox(this, new BoundingBox(x, y - fontSize.getPixels("y"), x + this.measureText(ctx), y));
        }
      } else if (this.children.length > 0) {
        var g = new GElement(this.document, null);
        g.children = this.children;
        g.parent = this;
        g.render(ctx);
      }
    }
  }, {
    key: "onClick",
    value: function onClick() {
      var window2 = this.document.window;
      if (window2) {
        window2.open(this.getHrefAttribute().getString());
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      var ctx = this.document.ctx;
      ctx.canvas.style.cursor = "pointer";
    }
  }]);
  return AElement2;
})(TextElement);
function _createForOfIteratorHelper$1(o) {
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (o = _unsupportedIterableToArray$1(o))) {
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var it, normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = o[Symbol.iterator]();
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it.return != null) it.return();
    } finally {
      if (didErr) throw err;
    }
  } };
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
function _createSuper$x(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$x()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$x() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextPathElement = (function(_TextElement) {
  _inherits(TextPathElement2, _TextElement);
  var _super = _createSuper$x(TextPathElement2);
  function TextPathElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, TextPathElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "textPath";
    _this.textWidth = 0;
    _this.textHeight = 0;
    _this.pathLength = -1;
    _this.glyphInfo = null;
    _this.letterSpacingCache = [];
    _this.measuresCache = /* @__PURE__ */ new Map([["", 0]]);
    var pathElement = _this.getHrefAttribute().getDefinition();
    _this.text = _this.getTextFromNode();
    _this.dataArray = _this.parsePathData(pathElement);
    return _this;
  }
  _createClass(TextPathElement2, [{
    key: "getText",
    value: function getText() {
      return this.text;
    }
  }, {
    key: "path",
    value: function path2(ctx) {
      var dataArray = this.dataArray;
      if (ctx) {
        ctx.beginPath();
      }
      dataArray.forEach(function(_ref) {
        var command = _ref.command, points = _ref.points;
        switch (command) {
          case "L":
            if (ctx) {
              ctx.lineTo(points[0], points[1]);
            }
            break;
          case "M":
            if (ctx) {
              ctx.moveTo(points[0], points[1]);
            }
            break;
          case "C":
            if (ctx) {
              ctx.bezierCurveTo(points[0], points[1], points[2], points[3], points[4], points[5]);
            }
            break;
          case "Q":
            if (ctx) {
              ctx.quadraticCurveTo(points[0], points[1], points[2], points[3]);
            }
            break;
          case "A": {
            var cx = points[0];
            var cy = points[1];
            var rx = points[2];
            var ry = points[3];
            var theta = points[4];
            var dTheta = points[5];
            var psi = points[6];
            var fs = points[7];
            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;
            if (ctx) {
              ctx.translate(cx, cy);
              ctx.rotate(psi);
              ctx.scale(scaleX, scaleY);
              ctx.arc(0, 0, r, theta, theta + dTheta, Boolean(1 - fs));
              ctx.scale(1 / scaleX, 1 / scaleY);
              ctx.rotate(-psi);
              ctx.translate(-cx, -cy);
            }
            break;
          }
          case "z":
            if (ctx) {
              ctx.closePath();
            }
            break;
        }
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      this.setTextData(ctx);
      ctx.save();
      var textDecoration = this.parent.getStyle("text-decoration").getString();
      var fontSize = this.getFontSize();
      var glyphInfo = this.glyphInfo;
      var fill2 = ctx.fillStyle;
      if (textDecoration === "underline") {
        ctx.beginPath();
      }
      glyphInfo.forEach(function(glyph, i) {
        var p0 = glyph.p0, p1 = glyph.p1, partialText = glyph.text;
        ctx.save();
        ctx.translate(p0.x, p0.y);
        ctx.rotate(glyphInfo[i].rotation);
        if (ctx.fillStyle) {
          ctx.fillText(partialText, 0, 0);
        }
        if (ctx.strokeStyle) {
          ctx.strokeText(partialText, 0, 0);
        }
        ctx.restore();
        if (textDecoration === "underline") {
          if (i === 0) {
            ctx.moveTo(p0.x, p0.y + fontSize / 8);
          }
          ctx.lineTo(p1.x, p1.y + fontSize / 5);
        }
      });
      if (textDecoration === "underline") {
        ctx.lineWidth = fontSize / 20;
        ctx.strokeStyle = fill2;
        ctx.stroke();
        ctx.closePath();
      }
      ctx.restore();
    }
  }, {
    key: "getLetterSpacingAt",
    value: function getLetterSpacingAt() {
      var idx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      return this.letterSpacingCache[idx] || 0;
    }
  }, {
    key: "findSegmentToFitChar",
    value: function findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, inputOffset, c2, charI) {
      var offset = inputOffset;
      var glyphWidth = this.measureText(ctx, c2);
      if (c2 === " " && anchor === "justify" && textFullWidth < fullPathWidth) {
        glyphWidth += (fullPathWidth - textFullWidth) / spacesNumber;
      }
      if (charI > -1) {
        offset += this.getLetterSpacingAt(charI);
      }
      var splineStep = this.textHeight / 20;
      var segment = {
        p0: this.getEquidistantPointOnPath(offset, splineStep),
        p1: this.getEquidistantPointOnPath(offset + glyphWidth, splineStep)
      };
      offset += glyphWidth;
      return {
        offset,
        segment
      };
    }
  }, {
    key: "measureText",
    value: function measureText(ctx, text) {
      var measuresCache = this.measuresCache;
      var targetText = text || this.getText();
      if (measuresCache.has(targetText)) {
        return measuresCache.get(targetText);
      }
      var measure = this.measureTargetText(ctx, targetText);
      measuresCache.set(targetText, measure);
      return measure;
    }
    // This method supposes what all custom fonts already loaded.
    // If some font will be loaded after this method call, <textPath> will not be rendered correctly.
    // You need to call this method manually to update glyphs cache.
  }, {
    key: "setTextData",
    value: function setTextData(ctx) {
      var _this2 = this;
      if (this.glyphInfo) {
        return;
      }
      var renderText = this.getText();
      var chars = renderText.split("");
      var spacesNumber = renderText.split(" ").length - 1;
      var dx = toNumbers(this.parent.getAttribute("dx").getString("0"));
      var anchor = this.parent.getStyle("text-anchor").getString("start");
      var thisSpacing = this.getStyle("letter-spacing");
      var parentSpacing = this.parent.getStyle("letter-spacing");
      var letterSpacing = 0;
      if (!thisSpacing.hasValue() || thisSpacing.getValue() === "inherit") {
        letterSpacing = parentSpacing.getPixels();
      } else if (thisSpacing.hasValue()) {
        if (thisSpacing.getValue() !== "initial" && thisSpacing.getValue() !== "unset") {
          letterSpacing = thisSpacing.getPixels();
        }
      }
      var letterSpacingCache = [];
      var textLen = renderText.length;
      this.letterSpacingCache = letterSpacingCache;
      for (var i = 0; i < textLen; i++) {
        letterSpacingCache.push(typeof dx[i] !== "undefined" ? dx[i] : letterSpacing);
      }
      var dxSum = letterSpacingCache.reduce(function(acc, cur) {
        return acc + cur || 0;
      }, 0);
      this.textWidth = this.measureText(ctx);
      this.textHeight = this.getFontSize();
      var textFullWidth = Math.max(this.textWidth + dxSum, 0);
      this.glyphInfo = [];
      var fullPathWidth = this.getPathLength();
      var startOffset = this.getStyle("startOffset").getNumber(0) * fullPathWidth;
      var offset = 0;
      if (anchor === "middle" || anchor === "center") {
        offset = -textFullWidth / 2;
      }
      if (anchor === "end" || anchor === "right") {
        offset = -textFullWidth;
      }
      offset += startOffset;
      chars.forEach(function(char, i2) {
        var _this2$findSegmentToF = _this2.findSegmentToFitChar(ctx, anchor, textFullWidth, fullPathWidth, spacesNumber, offset, char, i2), nextOffset = _this2$findSegmentToF.offset, segment = _this2$findSegmentToF.segment;
        offset = nextOffset;
        if (!segment.p0 || !segment.p1) {
          return;
        }
        var width = _this2.getLineLength(segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y);
        var kern = 0;
        var midpoint = _this2.getPointOnLine(kern + width / 2, segment.p0.x, segment.p0.y, segment.p1.x, segment.p1.y);
        var rotation = Math.atan2(segment.p1.y - segment.p0.y, segment.p1.x - segment.p0.x);
        _this2.glyphInfo.push({
          transposeX: midpoint.x,
          transposeY: midpoint.y,
          text: chars[i2],
          p0: segment.p0,
          p1: segment.p1,
          rotation
        });
      });
    }
  }, {
    key: "parsePathData",
    value: function parsePathData(path2) {
      this.pathLength = -1;
      if (!path2) {
        return [];
      }
      var pathCommands = [];
      var pathParser = path2.pathParser;
      pathParser.reset();
      while (!pathParser.isEnd()) {
        var current = pathParser.current;
        var startX = current ? current.x : 0;
        var startY = current ? current.y : 0;
        var cmd = "";
        var points = [];
        pathParser.nextCommand();
        var upperCommand = pathParser.command.toUpperCase();
        switch (pathParser.command) {
          case "M":
          case "m":
            cmd = this.pathM(pathParser, points);
            break;
          case "L":
          case "l":
            cmd = this.pathL(pathParser, points);
            break;
          case "H":
          case "h":
            cmd = this.pathH(pathParser, points);
            break;
          case "V":
          case "v":
            cmd = this.pathV(pathParser, points);
            break;
          case "C":
          case "c":
            this.pathC(pathParser, points);
            break;
          case "S":
          case "s":
            cmd = this.pathS(pathParser, points);
            break;
          case "Q":
          case "q":
            this.pathQ(pathParser, points);
            break;
          case "T":
          case "t":
            cmd = this.pathT(pathParser, points);
            break;
          case "A":
          case "a":
            points = this.pathA(pathParser);
            break;
          case "Z":
          case "z":
            pathParser.current = pathParser.start;
            break;
        }
        if (upperCommand !== "Z") {
          pathCommands.push({
            command: cmd || upperCommand,
            points,
            start: {
              x: startX,
              y: startY
            },
            pathLength: this.calcLength(startX, startY, cmd || upperCommand, points)
          });
        } else {
          pathCommands.push({
            command: "z",
            points: [],
            pathLength: 0
          });
        }
      }
      return pathCommands;
    }
  }, {
    key: "pathM",
    value: function pathM(pathParser, points) {
      var p = pathParser.getAsCurrentPoint();
      points.push(p.x, p.y);
      pathParser.start = pathParser.current;
      while (!pathParser.isCommandOrEnd()) {
        var _p = pathParser.getAsCurrentPoint();
        points.push(_p.x, _p.y);
        return "L";
      }
    }
  }, {
    key: "pathL",
    value: function pathL(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var p = pathParser.getAsCurrentPoint();
        points.push(p.x, p.y);
      }
      return "L";
    }
  }, {
    key: "pathH",
    value: function pathH(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = new Point((pathParser.isRelativeCommand() ? current.x : 0) + pathParser.getScalar(), current.y);
        points.push(point.x, point.y);
        pathParser.current = point;
      }
      return "L";
    }
  }, {
    key: "pathV",
    value: function pathV(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var point = new Point(current.x, (pathParser.isRelativeCommand() ? current.y : 0) + pathParser.getScalar());
        points.push(point.x, point.y);
        pathParser.current = point;
      }
      return "L";
    }
  }, {
    key: "pathC",
    value: function pathC(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var point = pathParser.getPoint();
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
    }
  }, {
    key: "pathS",
    value: function pathS(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var point = pathParser.getReflectedControlPoint();
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        points.push(point.x, point.y, controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
      return "C";
    }
  }, {
    key: "pathQ",
    value: function pathQ(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var controlPoint = pathParser.getAsControlPoint();
        var currentPoint = pathParser.getAsCurrentPoint();
        points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
    }
  }, {
    key: "pathT",
    value: function pathT(pathParser, points) {
      while (!pathParser.isCommandOrEnd()) {
        var controlPoint = pathParser.getReflectedControlPoint();
        pathParser.control = controlPoint;
        var currentPoint = pathParser.getAsCurrentPoint();
        points.push(controlPoint.x, controlPoint.y, currentPoint.x, currentPoint.y);
      }
      return "Q";
    }
  }, {
    key: "pathA",
    value: function pathA(pathParser) {
      while (!pathParser.isCommandOrEnd()) {
        var current = pathParser.current;
        var rx = pathParser.getScalar();
        var ry = pathParser.getScalar();
        var xAxisRotation = pathParser.getScalar() * (Math.PI / 180);
        var largeArcFlag = pathParser.getScalar();
        var sweepFlag = pathParser.getScalar();
        var currentPoint = pathParser.getAsCurrentPoint();
        var currp = new Point(Math.cos(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.sin(xAxisRotation) * (current.y - currentPoint.y) / 2, -Math.sin(xAxisRotation) * (current.x - currentPoint.x) / 2 + Math.cos(xAxisRotation) * (current.y - currentPoint.y) / 2);
        var l = Math.pow(currp.x, 2) / Math.pow(rx, 2) + Math.pow(currp.y, 2) / Math.pow(ry, 2);
        if (l > 1) {
          rx *= Math.sqrt(l);
          ry *= Math.sqrt(l);
        }
        var s = (largeArcFlag === sweepFlag ? -1 : 1) * Math.sqrt((Math.pow(rx, 2) * Math.pow(ry, 2) - Math.pow(rx, 2) * Math.pow(currp.y, 2) - Math.pow(ry, 2) * Math.pow(currp.x, 2)) / (Math.pow(rx, 2) * Math.pow(currp.y, 2) + Math.pow(ry, 2) * Math.pow(currp.x, 2)));
        if (isNaN(s)) {
          s = 0;
        }
        var cpp = new Point(s * rx * currp.y / ry, s * -ry * currp.x / rx);
        var centp = new Point((current.x + currentPoint.x) / 2 + Math.cos(xAxisRotation) * cpp.x - Math.sin(xAxisRotation) * cpp.y, (current.y + currentPoint.y) / 2 + Math.sin(xAxisRotation) * cpp.x + Math.cos(xAxisRotation) * cpp.y);
        var a1 = vectorsAngle([1, 0], [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry]);
        var u = [(currp.x - cpp.x) / rx, (currp.y - cpp.y) / ry];
        var v = [(-currp.x - cpp.x) / rx, (-currp.y - cpp.y) / ry];
        var ad = vectorsAngle(u, v);
        if (vectorsRatio(u, v) <= -1) {
          ad = Math.PI;
        }
        if (vectorsRatio(u, v) >= 1) {
          ad = 0;
        }
        if (sweepFlag === 0 && ad > 0) {
          ad = ad - 2 * Math.PI;
        }
        if (sweepFlag === 1 && ad < 0) {
          ad = ad + 2 * Math.PI;
        }
        return [centp.x, centp.y, rx, ry, a1, ad, xAxisRotation, sweepFlag];
      }
    }
  }, {
    key: "calcLength",
    value: function calcLength(x, y, cmd, points) {
      var len = 0;
      var p1 = null;
      var p2 = null;
      var t = 0;
      switch (cmd) {
        case "L":
          return this.getLineLength(x, y, points[0], points[1]);
        case "C":
          len = 0;
          p1 = this.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
          for (t = 0.01; t <= 1; t += 0.01) {
            p2 = this.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
          return len;
        case "Q":
          len = 0;
          p1 = this.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
          for (t = 0.01; t <= 1; t += 0.01) {
            p2 = this.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
            len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
          return len;
        case "A":
          len = 0;
          var start = points[4];
          var dTheta = points[5];
          var end = points[4] + dTheta;
          var inc = Math.PI / 180;
          if (Math.abs(start - end) < inc) {
            inc = Math.abs(start - end);
          }
          p1 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
          if (dTheta < 0) {
            for (t = start - inc; t > end; t -= inc) {
              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          } else {
            for (t = start + inc; t < end; t += inc) {
              p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          }
          p2 = this.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
          len += this.getLineLength(p1.x, p1.y, p2.x, p2.y);
          return len;
      }
      return 0;
    }
  }, {
    key: "getPointOnLine",
    value: function getPointOnLine(dist, P1x, P1y, P2x, P2y) {
      var fromX = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : P1x;
      var fromY = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : P1y;
      var m2 = (P2y - P1y) / (P2x - P1x + PSEUDO_ZERO);
      var run = Math.sqrt(dist * dist / (1 + m2 * m2));
      if (P2x < P1x) {
        run *= -1;
      }
      var rise = m2 * run;
      var pt = null;
      if (P2x === P1x) {
        pt = {
          x: fromX,
          y: fromY + rise
        };
      } else if ((fromY - P1y) / (fromX - P1x + PSEUDO_ZERO) === m2) {
        pt = {
          x: fromX + run,
          y: fromY + rise
        };
      } else {
        var ix = 0;
        var iy = 0;
        var len = this.getLineLength(P1x, P1y, P2x, P2y);
        if (len < PSEUDO_ZERO) {
          return null;
        }
        var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
        u = u / (len * len);
        ix = P1x + u * (P2x - P1x);
        iy = P1y + u * (P2y - P1y);
        var pRise = this.getLineLength(fromX, fromY, ix, iy);
        var pRun = Math.sqrt(dist * dist - pRise * pRise);
        run = Math.sqrt(pRun * pRun / (1 + m2 * m2));
        if (P2x < P1x) {
          run *= -1;
        }
        rise = m2 * run;
        pt = {
          x: ix + run,
          y: iy + rise
        };
      }
      return pt;
    }
  }, {
    key: "getPointOnPath",
    value: function getPointOnPath(distance) {
      var fullLen = this.getPathLength();
      var cumulativePathLength = 0;
      var p = null;
      if (distance < -5e-5 || distance - 5e-5 > fullLen) {
        return null;
      }
      var dataArray = this.dataArray;
      var _iterator = _createForOfIteratorHelper$1(dataArray), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var pathCmd = _step.value;
          if (pathCmd && (pathCmd.pathLength < 5e-5 || cumulativePathLength + pathCmd.pathLength + 5e-5 < distance)) {
            cumulativePathLength += pathCmd.pathLength;
            continue;
          }
          var delta = distance - cumulativePathLength;
          var currentT = 0;
          switch (pathCmd.command) {
            case "L":
              p = this.getPointOnLine(delta, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.start.x, pathCmd.start.y);
              break;
            case "A":
              var start = pathCmd.points[4];
              var dTheta = pathCmd.points[5];
              var end = pathCmd.points[4] + dTheta;
              currentT = start + delta / pathCmd.pathLength * dTheta;
              if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
                break;
              }
              p = this.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
              break;
            case "C":
              currentT = delta / pathCmd.pathLength;
              if (currentT > 1) {
                currentT = 1;
              }
              p = this.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
              break;
            case "Q":
              currentT = delta / pathCmd.pathLength;
              if (currentT > 1) {
                currentT = 1;
              }
              p = this.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
              break;
            default:
          }
          if (p) {
            return p;
          }
          break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return null;
    }
  }, {
    key: "getLineLength",
    value: function getLineLength(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
  }, {
    key: "getPathLength",
    value: function getPathLength() {
      if (this.pathLength === -1) {
        this.pathLength = this.dataArray.reduce(function(length, command) {
          return command.pathLength > 0 ? length + command.pathLength : length;
        }, 0);
      }
      return this.pathLength;
    }
  }, {
    key: "getPointOnCubicBezier",
    value: function getPointOnCubicBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
      var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
      var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
      return {
        x,
        y
      };
    }
  }, {
    key: "getPointOnQuadraticBezier",
    value: function getPointOnQuadraticBezier(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
      var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
      var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
      return {
        x,
        y
      };
    }
  }, {
    key: "getPointOnEllipticalArc",
    value: function getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi) {
      var cosPsi = Math.cos(psi);
      var sinPsi = Math.sin(psi);
      var pt = {
        x: rx * Math.cos(theta),
        y: ry * Math.sin(theta)
      };
      return {
        x: cx + (pt.x * cosPsi - pt.y * sinPsi),
        y: cy + (pt.x * sinPsi + pt.y * cosPsi)
      };
    }
    // TODO need some optimisations. possibly build cache only for curved segments?
  }, {
    key: "buildEquidistantCache",
    value: function buildEquidistantCache(inputStep, inputPrecision) {
      var fullLen = this.getPathLength();
      var precision = inputPrecision || 0.25;
      var step = inputStep || fullLen / 100;
      if (!this.equidistantCache || this.equidistantCache.step !== step || this.equidistantCache.precision !== precision) {
        this.equidistantCache = {
          step,
          precision,
          points: []
        };
        var s = 0;
        for (var l = 0; l <= fullLen; l += precision) {
          var p0 = this.getPointOnPath(l);
          var p1 = this.getPointOnPath(l + precision);
          if (!p0 || !p1) {
            continue;
          }
          s += this.getLineLength(p0.x, p0.y, p1.x, p1.y);
          if (s >= step) {
            this.equidistantCache.points.push({
              x: p0.x,
              y: p0.y,
              distance: l
            });
            s -= step;
          }
        }
      }
    }
  }, {
    key: "getEquidistantPointOnPath",
    value: function getEquidistantPointOnPath(targetDistance, step, precision) {
      this.buildEquidistantCache(step, precision);
      if (targetDistance < 0 || targetDistance - this.getPathLength() > 5e-5) {
        return null;
      }
      var idx = Math.round(targetDistance / this.getPathLength() * (this.equidistantCache.points.length - 1));
      return this.equidistantCache.points[idx] || null;
    }
  }]);
  return TextPathElement2;
})(TextElement);
function _createSuper$y(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$y()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$y() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var ImageElement = (function(_RenderedElement) {
  _inherits(ImageElement2, _RenderedElement);
  var _super = _createSuper$y(ImageElement2);
  function ImageElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, ImageElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "image";
    _this.loaded = false;
    var href = _this.getHrefAttribute().getString();
    if (!href) {
      return _possibleConstructorReturn(_this);
    }
    var isSvg = /\.svg$/.test(href);
    document2.images.push(_assertThisInitialized(_this));
    if (!isSvg) {
      _this.loadImage(href);
    } else {
      _this.loadSvg(href);
    }
    _this.isSvg = isSvg;
    return _this;
  }
  _createClass(ImageElement2, [{
    key: "loadImage",
    value: (function() {
      var _loadImage = _asyncToGenerator(import_regenerator.default.mark(function _callee(href) {
        var image;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.document.createImage(href);
              case 3:
                image = _context.sent;
                this.image = image;
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                console.error('Error while loading image "'.concat(href, '":'), _context.t0);
              case 10:
                this.loaded = true;
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));
      function loadImage(_x) {
        return _loadImage.apply(this, arguments);
      }
      return loadImage;
    })()
  }, {
    key: "loadSvg",
    value: (function() {
      var _loadSvg = _asyncToGenerator(import_regenerator.default.mark(function _callee2(href) {
        var response, svg;
        return import_regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.document.fetch(href);
              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.text();
              case 6:
                svg = _context2.sent;
                this.image = svg;
                _context2.next = 13;
                break;
              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                console.error('Error while loading image "'.concat(href, '":'), _context2.t0);
              case 13:
                this.loaded = true;
              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));
      function loadSvg(_x2) {
        return _loadSvg.apply(this, arguments);
      }
      return loadSvg;
    })()
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      var document2 = this.document, image = this.image, loaded = this.loaded;
      var x = this.getAttribute("x").getPixels("x");
      var y = this.getAttribute("y").getPixels("y");
      var width = this.getStyle("width").getPixels("x");
      var height = this.getStyle("height").getPixels("y");
      if (!loaded || !image || !width || !height) {
        return;
      }
      ctx.save();
      if (this.isSvg) {
        document2.canvg.forkString(ctx, this.image, {
          ignoreMouse: true,
          ignoreAnimation: true,
          ignoreDimensions: true,
          ignoreClear: true,
          offsetX: x,
          offsetY: y,
          scaleWidth: width,
          scaleHeight: height
        }).render();
      } else {
        var _image = this.image;
        ctx.translate(x, y);
        document2.setViewBox({
          ctx,
          aspectRatio: this.getAttribute("preserveAspectRatio").getString(),
          width,
          desiredWidth: _image.width,
          height,
          desiredHeight: _image.height
        });
        if (this.loaded) {
          if (typeof _image.complete === "undefined" || _image.complete) {
            ctx.drawImage(_image, 0, 0);
          }
        }
      }
      ctx.restore();
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox() {
      var x = this.getAttribute("x").getPixels("x");
      var y = this.getAttribute("y").getPixels("y");
      var width = this.getStyle("width").getPixels("x");
      var height = this.getStyle("height").getPixels("y");
      return new BoundingBox(x, y, x + width, y + height);
    }
  }]);
  return ImageElement2;
})(RenderedElement);
function _createSuper$z(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$z()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$z() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var SymbolElement = (function(_RenderedElement) {
  _inherits(SymbolElement2, _RenderedElement);
  var _super = _createSuper$z(SymbolElement2);
  function SymbolElement2() {
    var _this;
    _classCallCheck(this, SymbolElement2);
    _this = _super.apply(this, arguments);
    _this.type = "symbol";
    return _this;
  }
  _createClass(SymbolElement2, [{
    key: "render",
    value: function render(_) {
    }
  }]);
  return SymbolElement2;
})(RenderedElement);
var SVGFontLoader = (function() {
  function SVGFontLoader2(document2) {
    _classCallCheck(this, SVGFontLoader2);
    this.document = document2;
    this.loaded = false;
    document2.fonts.push(this);
  }
  _createClass(SVGFontLoader2, [{
    key: "load",
    value: (function() {
      var _load = _asyncToGenerator(import_regenerator.default.mark(function _callee(fontFamily, url) {
        var document2, svgDocument, fonts;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                document2 = this.document;
                _context.next = 4;
                return document2.canvg.parser.load(url);
              case 4:
                svgDocument = _context.sent;
                fonts = svgDocument.getElementsByTagName("font");
                Array.from(fonts).forEach(function(fontNode) {
                  var font = document2.createElement(fontNode);
                  document2.definitions[fontFamily] = font;
                });
                _context.next = 12;
                break;
              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.error('Error while loading font "'.concat(url, '":'), _context.t0);
              case 12:
                this.loaded = true;
              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));
      function load(_x, _x2) {
        return _load.apply(this, arguments);
      }
      return load;
    })()
  }]);
  return SVGFontLoader2;
})();
function _createSuper$A(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$A()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$A() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var StyleElement = (function(_Element) {
  _inherits(StyleElement2, _Element);
  var _super = _createSuper$A(StyleElement2);
  function StyleElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, StyleElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "style";
    var css = compressSpaces(
      Array.from(node2.childNodes).map(function(_) {
        return _.data;
      }).join("").replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm, "").replace(/@import.*;/g, "")
      // remove imports
    );
    var cssDefs = css.split("}");
    cssDefs.forEach(function(_) {
      var def = _.trim();
      if (!def) {
        return;
      }
      var cssParts = def.split("{");
      var cssClasses = cssParts[0].split(",");
      var cssProps = cssParts[1].split(";");
      cssClasses.forEach(function(_2) {
        var cssClass = _2.trim();
        if (!cssClass) {
          return;
        }
        var props = document2.styles[cssClass] || {};
        cssProps.forEach(function(cssProp) {
          var prop = cssProp.indexOf(":");
          var name = cssProp.substr(0, prop).trim();
          var value = cssProp.substr(prop + 1, cssProp.length - prop).trim();
          if (name && value) {
            props[name] = new Property(document2, name, value);
          }
        });
        document2.styles[cssClass] = props;
        document2.stylesSpecificity[cssClass] = getSelectorSpecificity(cssClass);
        if (cssClass === "@font-face") {
          var fontFamily = props["font-family"].getString().replace(/"|'/g, "");
          var srcs = props.src.getString().split(",");
          srcs.forEach(function(src) {
            if (src.indexOf('format("svg")') > 0) {
              var url = parseExternalUrl(src);
              if (url) {
                new SVGFontLoader(document2).load(fontFamily, url);
              }
            }
          });
        }
      });
    });
    return _this;
  }
  return StyleElement2;
})(Element);
StyleElement.parseExternalUrl = parseExternalUrl;
function _createSuper$B(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$B()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$B() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var UseElement = (function(_RenderedElement) {
  _inherits(UseElement2, _RenderedElement);
  var _super = _createSuper$B(UseElement2);
  function UseElement2() {
    var _this;
    _classCallCheck(this, UseElement2);
    _this = _super.apply(this, arguments);
    _this.type = "use";
    return _this;
  }
  _createClass(UseElement2, [{
    key: "setContext",
    value: function setContext(ctx) {
      _get(_getPrototypeOf(UseElement2.prototype), "setContext", this).call(this, ctx);
      var xAttr = this.getAttribute("x");
      var yAttr = this.getAttribute("y");
      if (xAttr.hasValue()) {
        ctx.translate(xAttr.getPixels("x"), 0);
      }
      if (yAttr.hasValue()) {
        ctx.translate(0, yAttr.getPixels("y"));
      }
    }
  }, {
    key: "path",
    value: function path2(ctx) {
      var element = this.element;
      if (element) {
        element.path(ctx);
      }
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(ctx) {
      var document2 = this.document, element = this.element;
      if (element) {
        var tempSvg = element;
        if (element.type === "symbol") {
          tempSvg = new SVGElement(document2, null);
          tempSvg.attributes.viewBox = new Property(document2, "viewBox", element.getAttribute("viewBox").getString());
          tempSvg.attributes.preserveAspectRatio = new Property(document2, "preserveAspectRatio", element.getAttribute("preserveAspectRatio").getString());
          tempSvg.attributes.overflow = new Property(document2, "overflow", element.getAttribute("overflow").getString());
          tempSvg.children = element.children;
        }
        if (tempSvg.type === "svg") {
          var widthStyle = this.getStyle("width", false, true);
          var heightStyle = this.getStyle("height", false, true);
          if (widthStyle.hasValue()) {
            tempSvg.attributes.width = new Property(document2, "width", widthStyle.getString());
          }
          if (heightStyle.hasValue()) {
            tempSvg.attributes.height = new Property(document2, "height", heightStyle.getString());
          }
        }
        var oldParent = tempSvg.parent;
        tempSvg.parent = this;
        tempSvg.render(ctx);
        tempSvg.parent = oldParent;
      }
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(ctx) {
      var element = this.element;
      if (element) {
        return element.getBoundingBox(ctx);
      }
      return null;
    }
  }, {
    key: "elementTransform",
    value: function elementTransform() {
      var document2 = this.document, element = this.element;
      return Transform.fromElement(document2, element);
    }
  }, {
    key: "element",
    get: function get() {
      if (!this._element) {
        this._element = this.getHrefAttribute().getDefinition();
      }
      return this._element;
    }
  }]);
  return UseElement2;
})(RenderedElement);
function _createSuper$C(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$C()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$C() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function imGet(img, x, y, width, _, rgba) {
  return img[y * width * 4 + x * 4 + rgba];
}
function imSet(img, x, y, width, _, rgba, val) {
  img[y * width * 4 + x * 4 + rgba] = val;
}
function m(matrix, i, v) {
  var mi = matrix[i];
  return mi * (mi < 0 ? v - 255 : v);
}
function c(a, m1, m2, m3) {
  return m1 + Math.cos(a) * m2 + Math.sin(a) * m3;
}
var FeColorMatrixElement = (function(_Element) {
  _inherits(FeColorMatrixElement2, _Element);
  var _super = _createSuper$C(FeColorMatrixElement2);
  function FeColorMatrixElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, FeColorMatrixElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "feColorMatrix";
    var matrix = toNumbers(_this.getAttribute("values").getString());
    switch (_this.getAttribute("type").getString("matrix")) {
      // http://www.w3.org/TR/SVG/filters.html#feColorMatrixElement
      case "saturate": {
        var s = matrix[0];
        matrix = [0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0, 0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "hueRotate": {
        var a = matrix[0] * Math.PI / 180;
        matrix = [c(a, 0.213, 0.787, -0.213), c(a, 0.715, -0.715, -0.715), c(a, 0.072, -0.072, 0.928), 0, 0, c(a, 0.213, -0.213, 0.143), c(a, 0.715, 0.285, 0.14), c(a, 0.072, -0.072, -0.283), 0, 0, c(a, 0.213, -0.213, -0.787), c(a, 0.715, -0.715, 0.715), c(a, 0.072, 0.928, 0.072), 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        break;
      }
      case "luminanceToAlpha":
        matrix = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2125, 0.7154, 0.0721, 0, 0, 0, 0, 0, 0, 1];
        break;
    }
    _this.matrix = matrix;
    _this.includeOpacity = _this.getAttribute("includeOpacity").hasValue();
    return _this;
  }
  _createClass(FeColorMatrixElement2, [{
    key: "apply",
    value: function apply4(ctx, _, __, width, height) {
      var includeOpacity = this.includeOpacity, matrix = this.matrix;
      var srcData = ctx.getImageData(0, 0, width, height);
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var r = imGet(srcData.data, x, y, width, height, 0);
          var g = imGet(srcData.data, x, y, width, height, 1);
          var b = imGet(srcData.data, x, y, width, height, 2);
          var a = imGet(srcData.data, x, y, width, height, 3);
          var nr = m(matrix, 0, r) + m(matrix, 1, g) + m(matrix, 2, b) + m(matrix, 3, a) + m(matrix, 4, 1);
          var ng = m(matrix, 5, r) + m(matrix, 6, g) + m(matrix, 7, b) + m(matrix, 8, a) + m(matrix, 9, 1);
          var nb = m(matrix, 10, r) + m(matrix, 11, g) + m(matrix, 12, b) + m(matrix, 13, a) + m(matrix, 14, 1);
          var na = m(matrix, 15, r) + m(matrix, 16, g) + m(matrix, 17, b) + m(matrix, 18, a) + m(matrix, 19, 1);
          if (includeOpacity) {
            nr = ng = nb = 0;
            na *= a / 255;
          }
          imSet(srcData.data, x, y, width, height, 0, nr);
          imSet(srcData.data, x, y, width, height, 1, ng);
          imSet(srcData.data, x, y, width, height, 2, nb);
          imSet(srcData.data, x, y, width, height, 3, na);
        }
      }
      ctx.clearRect(0, 0, width, height);
      ctx.putImageData(srcData, 0, 0);
    }
  }]);
  return FeColorMatrixElement2;
})(Element);
function _createSuper$D(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$D()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$D() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var MaskElement = (function(_Element) {
  _inherits(MaskElement2, _Element);
  var _super = _createSuper$D(MaskElement2);
  function MaskElement2() {
    var _this;
    _classCallCheck(this, MaskElement2);
    _this = _super.apply(this, arguments);
    _this.type = "mask";
    return _this;
  }
  _createClass(MaskElement2, [{
    key: "apply",
    value: function apply4(ctx, element) {
      var document2 = this.document;
      var x = this.getAttribute("x").getPixels("x");
      var y = this.getAttribute("y").getPixels("y");
      var width = this.getStyle("width").getPixels("x");
      var height = this.getStyle("height").getPixels("y");
      if (!width && !height) {
        var boundingBox = new BoundingBox();
        this.children.forEach(function(child) {
          boundingBox.addBoundingBox(child.getBoundingBox(ctx));
        });
        x = Math.floor(boundingBox.x1);
        y = Math.floor(boundingBox.y1);
        width = Math.floor(boundingBox.width);
        height = Math.floor(boundingBox.height);
      }
      var ignoredStyles = this.removeStyles(element, MaskElement2.ignoreStyles);
      var maskCanvas = document2.createCanvas(x + width, y + height);
      var maskCtx = maskCanvas.getContext("2d");
      document2.screen.setDefaults(maskCtx);
      this.renderChildren(maskCtx);
      new FeColorMatrixElement(document2, {
        nodeType: 1,
        childNodes: [],
        attributes: [{
          nodeName: "type",
          value: "luminanceToAlpha"
        }, {
          nodeName: "includeOpacity",
          value: "true"
        }]
      }).apply(maskCtx, 0, 0, x + width, y + height);
      var tmpCanvas = document2.createCanvas(x + width, y + height);
      var tmpCtx = tmpCanvas.getContext("2d");
      document2.screen.setDefaults(tmpCtx);
      element.render(tmpCtx);
      tmpCtx.globalCompositeOperation = "destination-in";
      tmpCtx.fillStyle = maskCtx.createPattern(maskCanvas, "no-repeat");
      tmpCtx.fillRect(0, 0, x + width, y + height);
      ctx.fillStyle = tmpCtx.createPattern(tmpCanvas, "no-repeat");
      ctx.fillRect(0, 0, x + width, y + height);
      this.restoreStyles(element, ignoredStyles);
    }
  }, {
    key: "render",
    value: function render(_) {
    }
  }]);
  return MaskElement2;
})(Element);
MaskElement.ignoreStyles = ["mask", "transform", "clip-path"];
function _createSuper$E(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$E()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$E() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var noop = function noop2() {
};
var ClipPathElement = (function(_Element) {
  _inherits(ClipPathElement2, _Element);
  var _super = _createSuper$E(ClipPathElement2);
  function ClipPathElement2() {
    var _this;
    _classCallCheck(this, ClipPathElement2);
    _this = _super.apply(this, arguments);
    _this.type = "clipPath";
    return _this;
  }
  _createClass(ClipPathElement2, [{
    key: "apply",
    value: function apply4(ctx) {
      var document2 = this.document;
      var contextProto = Reflect.getPrototypeOf(ctx);
      var beginPath = ctx.beginPath, closePath = ctx.closePath;
      if (contextProto) {
        contextProto.beginPath = noop;
        contextProto.closePath = noop;
      }
      Reflect.apply(beginPath, ctx, []);
      this.children.forEach(function(child) {
        if (typeof child.path === "undefined") {
          return;
        }
        var transform = typeof child.elementTransform !== "undefined" ? child.elementTransform() : null;
        if (!transform) {
          transform = Transform.fromElement(document2, child);
        }
        if (transform) {
          transform.apply(ctx);
        }
        child.path(ctx);
        if (contextProto) {
          contextProto.closePath = closePath;
        }
        if (transform) {
          transform.unapply(ctx);
        }
      });
      Reflect.apply(closePath, ctx, []);
      ctx.clip();
      if (contextProto) {
        contextProto.beginPath = beginPath;
        contextProto.closePath = closePath;
      }
    }
  }, {
    key: "render",
    value: function render(_) {
    }
  }]);
  return ClipPathElement2;
})(Element);
function _createSuper$F(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$F()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$F() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FilterElement = (function(_Element) {
  _inherits(FilterElement2, _Element);
  var _super = _createSuper$F(FilterElement2);
  function FilterElement2() {
    var _this;
    _classCallCheck(this, FilterElement2);
    _this = _super.apply(this, arguments);
    _this.type = "filter";
    return _this;
  }
  _createClass(FilterElement2, [{
    key: "apply",
    value: function apply4(ctx, element) {
      var document2 = this.document, children = this.children;
      var boundingBox = element.getBoundingBox(ctx);
      if (!boundingBox) {
        return;
      }
      var px = 0;
      var py = 0;
      children.forEach(function(child) {
        var efd = child.extraFilterDistance || 0;
        px = Math.max(px, efd);
        py = Math.max(py, efd);
      });
      var width = Math.floor(boundingBox.width);
      var height = Math.floor(boundingBox.height);
      var tmpCanvasWidth = width + 2 * px;
      var tmpCanvasHeight = height + 2 * py;
      if (tmpCanvasWidth < 1 || tmpCanvasHeight < 1) {
        return;
      }
      var x = Math.floor(boundingBox.x);
      var y = Math.floor(boundingBox.y);
      var ignoredStyles = this.removeStyles(element, FilterElement2.ignoreStyles);
      var tmpCanvas = document2.createCanvas(tmpCanvasWidth, tmpCanvasHeight);
      var tmpCtx = tmpCanvas.getContext("2d");
      document2.screen.setDefaults(tmpCtx);
      tmpCtx.translate(-x + px, -y + py);
      element.render(tmpCtx);
      children.forEach(function(child) {
        if (typeof child.apply === "function") {
          child.apply(tmpCtx, 0, 0, tmpCanvasWidth, tmpCanvasHeight);
        }
      });
      ctx.drawImage(tmpCanvas, 0, 0, tmpCanvasWidth, tmpCanvasHeight, x - px, y - py, tmpCanvasWidth, tmpCanvasHeight);
      this.restoreStyles(element, ignoredStyles);
    }
  }, {
    key: "render",
    value: function render(_) {
    }
  }]);
  return FilterElement2;
})(Element);
FilterElement.ignoreStyles = ["filter", "transform", "clip-path"];
function _createSuper$G(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$G()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$G() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FeDropShadowElement = (function(_Element) {
  _inherits(FeDropShadowElement2, _Element);
  var _super = _createSuper$G(FeDropShadowElement2);
  function FeDropShadowElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, FeDropShadowElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "feDropShadow";
    _this.addStylesFromStyleDefinition();
    return _this;
  }
  _createClass(FeDropShadowElement2, [{
    key: "apply",
    value: function apply4(_, __, ___, ____, _____) {
    }
  }]);
  return FeDropShadowElement2;
})(Element);
function _createSuper$H(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$H()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$H() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FeMorphologyElement = (function(_Element) {
  _inherits(FeMorphologyElement2, _Element);
  var _super = _createSuper$H(FeMorphologyElement2);
  function FeMorphologyElement2() {
    var _this;
    _classCallCheck(this, FeMorphologyElement2);
    _this = _super.apply(this, arguments);
    _this.type = "feMorphology";
    return _this;
  }
  _createClass(FeMorphologyElement2, [{
    key: "apply",
    value: function apply4(_, __, ___, ____, _____) {
    }
  }]);
  return FeMorphologyElement2;
})(Element);
function _createSuper$I(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$I()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$I() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FeCompositeElement = (function(_Element) {
  _inherits(FeCompositeElement2, _Element);
  var _super = _createSuper$I(FeCompositeElement2);
  function FeCompositeElement2() {
    var _this;
    _classCallCheck(this, FeCompositeElement2);
    _this = _super.apply(this, arguments);
    _this.type = "feComposite";
    return _this;
  }
  _createClass(FeCompositeElement2, [{
    key: "apply",
    value: function apply4(_, __, ___, ____, _____) {
    }
  }]);
  return FeCompositeElement2;
})(Element);
function _createSuper$J(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$J()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$J() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var FeGaussianBlurElement = (function(_Element) {
  _inherits(FeGaussianBlurElement2, _Element);
  var _super = _createSuper$J(FeGaussianBlurElement2);
  function FeGaussianBlurElement2(document2, node2, captureTextNodes) {
    var _this;
    _classCallCheck(this, FeGaussianBlurElement2);
    _this = _super.call(this, document2, node2, captureTextNodes);
    _this.type = "feGaussianBlur";
    _this.blurRadius = Math.floor(_this.getAttribute("stdDeviation").getNumber());
    _this.extraFilterDistance = _this.blurRadius;
    return _this;
  }
  _createClass(FeGaussianBlurElement2, [{
    key: "apply",
    value: function apply4(ctx, x, y, width, height) {
      var document2 = this.document, blurRadius = this.blurRadius;
      var body = document2.window ? document2.window.document.body : null;
      var canvas = ctx.canvas;
      canvas.id = document2.getUniqueId();
      if (body) {
        canvas.style.display = "none";
        body.appendChild(canvas);
      }
      processCanvasRGBA(canvas, x, y, width, height, blurRadius);
      if (body) {
        body.removeChild(canvas);
      }
    }
  }]);
  return FeGaussianBlurElement2;
})(Element);
function _createSuper$K(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$K()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$K() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TitleElement = (function(_Element) {
  _inherits(TitleElement2, _Element);
  var _super = _createSuper$K(TitleElement2);
  function TitleElement2() {
    var _this;
    _classCallCheck(this, TitleElement2);
    _this = _super.apply(this, arguments);
    _this.type = "title";
    return _this;
  }
  return TitleElement2;
})(Element);
function _createSuper$L(Derived) {
  return function() {
    var Super = _getPrototypeOf(Derived), result;
    if (_isNativeReflectConstruct$L()) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct$L() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var DescElement = (function(_Element) {
  _inherits(DescElement2, _Element);
  var _super = _createSuper$L(DescElement2);
  function DescElement2() {
    var _this;
    _classCallCheck(this, DescElement2);
    _this = _super.apply(this, arguments);
    _this.type = "desc";
    return _this;
  }
  return DescElement2;
})(Element);
var elementTypes = {
  "svg": SVGElement,
  "rect": RectElement,
  "circle": CircleElement,
  "ellipse": EllipseElement,
  "line": LineElement,
  "polyline": PolylineElement,
  "polygon": PolygonElement,
  "path": PathElement,
  "pattern": PatternElement,
  "marker": MarkerElement,
  "defs": DefsElement,
  "linearGradient": LinearGradientElement,
  "radialGradient": RadialGradientElement,
  "stop": StopElement,
  "animate": AnimateElement,
  "animateColor": AnimateColorElement,
  "animateTransform": AnimateTransformElement,
  "font": FontElement,
  "font-face": FontFaceElement,
  "missing-glyph": MissingGlyphElement,
  "glyph": GlyphElement,
  "text": TextElement,
  "tspan": TSpanElement,
  "tref": TRefElement,
  "a": AElement,
  "textPath": TextPathElement,
  "image": ImageElement,
  "g": GElement,
  "symbol": SymbolElement,
  "style": StyleElement,
  "use": UseElement,
  "mask": MaskElement,
  "clipPath": ClipPathElement,
  "filter": FilterElement,
  "feDropShadow": FeDropShadowElement,
  "feMorphology": FeMorphologyElement,
  "feComposite": FeCompositeElement,
  "feColorMatrix": FeColorMatrixElement,
  "feGaussianBlur": FeGaussianBlurElement,
  "title": TitleElement,
  "desc": DescElement
};
function ownKeys2(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function createCanvas(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
function createImage(_x) {
  return _createImage.apply(this, arguments);
}
function _createImage() {
  _createImage = _asyncToGenerator(import_regenerator.default.mark(function _callee(src) {
    var anonymousCrossOrigin, image, _args = arguments;
    return import_regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            anonymousCrossOrigin = _args.length > 1 && _args[1] !== void 0 ? _args[1] : false;
            image = document.createElement("img");
            if (anonymousCrossOrigin) {
              image.crossOrigin = "Anonymous";
            }
            return _context.abrupt("return", new Promise(function(resolve, reject) {
              image.onload = function() {
                resolve(image);
              };
              image.onerror = function() {
                reject();
              };
              image.src = src;
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _createImage.apply(this, arguments);
}
var Document = (function() {
  function Document2(canvg) {
    var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$rootEmSize = _ref.rootEmSize, rootEmSize = _ref$rootEmSize === void 0 ? 12 : _ref$rootEmSize, _ref$emSize = _ref.emSize, emSize = _ref$emSize === void 0 ? 12 : _ref$emSize, _ref$createCanvas = _ref.createCanvas, createCanvas2 = _ref$createCanvas === void 0 ? Document2.createCanvas : _ref$createCanvas, _ref$createImage = _ref.createImage, createImage2 = _ref$createImage === void 0 ? Document2.createImage : _ref$createImage, anonymousCrossOrigin = _ref.anonymousCrossOrigin;
    _classCallCheck(this, Document2);
    this.canvg = canvg;
    this.definitions = {};
    this.styles = {};
    this.stylesSpecificity = {};
    this.images = [];
    this.fonts = [];
    this.emSizeStack = [];
    this.uniqueId = 0;
    this.screen = canvg.screen;
    this.rootEmSize = rootEmSize;
    this.emSize = emSize;
    this.createCanvas = createCanvas2;
    this.createImage = this.bindCreateImage(createImage2, anonymousCrossOrigin);
    this.screen.wait(this.isImagesLoaded.bind(this));
    this.screen.wait(this.isFontsLoaded.bind(this));
  }
  _createClass(Document2, [{
    key: "bindCreateImage",
    value: function bindCreateImage(createImage2, anonymousCrossOrigin) {
      if (typeof anonymousCrossOrigin === "boolean") {
        return function(source, forceAnonymousCrossOrigin) {
          return createImage2(source, typeof forceAnonymousCrossOrigin === "boolean" ? forceAnonymousCrossOrigin : anonymousCrossOrigin);
        };
      }
      return createImage2;
    }
  }, {
    key: "popEmSize",
    value: function popEmSize() {
      var emSizeStack = this.emSizeStack;
      emSizeStack.pop();
    }
  }, {
    key: "getUniqueId",
    value: function getUniqueId() {
      return "canvg".concat(++this.uniqueId);
    }
  }, {
    key: "isImagesLoaded",
    value: function isImagesLoaded() {
      return this.images.every(function(_) {
        return _.loaded;
      });
    }
  }, {
    key: "isFontsLoaded",
    value: function isFontsLoaded() {
      return this.fonts.every(function(_) {
        return _.loaded;
      });
    }
  }, {
    key: "createDocumentElement",
    value: function createDocumentElement(document2) {
      var documentElement = this.createElement(document2.documentElement);
      documentElement.root = true;
      documentElement.addStylesFromStyleDefinition();
      this.documentElement = documentElement;
      return documentElement;
    }
  }, {
    key: "createElement",
    value: function createElement(node2) {
      var elementType = node2.nodeName.replace(/^[^:]+:/, "");
      var ElementType = Document2.elementTypes[elementType];
      if (typeof ElementType !== "undefined") {
        return new ElementType(this, node2);
      }
      return new UnknownElement(this, node2);
    }
  }, {
    key: "createTextNode",
    value: function createTextNode(node2) {
      return new TextNode(this, node2);
    }
  }, {
    key: "setViewBox",
    value: function setViewBox(config) {
      this.screen.setViewBox(_objectSpread({
        document: this
      }, config));
    }
  }, {
    key: "window",
    get: function get() {
      return this.screen.window;
    }
  }, {
    key: "fetch",
    get: function get() {
      return this.screen.fetch;
    }
  }, {
    key: "ctx",
    get: function get() {
      return this.screen.ctx;
    }
  }, {
    key: "emSize",
    get: function get() {
      var emSizeStack = this.emSizeStack;
      return emSizeStack[emSizeStack.length - 1];
    },
    set: function set(value) {
      var emSizeStack = this.emSizeStack;
      emSizeStack.push(value);
    }
  }]);
  return Document2;
})();
Document.createCanvas = createCanvas;
Document.createImage = createImage;
Document.elementTypes = elementTypes;
function ownKeys$1(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
var Canvg = (function() {
  function Canvg2(ctx, svg) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    _classCallCheck(this, Canvg2);
    this.parser = new Parser(options);
    this.screen = new Screen(ctx, options);
    this.options = options;
    var document2 = new Document(this, options);
    var documentElement = document2.createDocumentElement(svg);
    this.document = document2;
    this.documentElement = documentElement;
  }
  _createClass(Canvg2, [{
    key: "fork",
    /**
     * Create new Canvg instance with inherited options.
     * @param ctx - Rendering context.
     * @param svg - SVG source string or URL.
     * @param options - Rendering options.
     */
    value: function fork(ctx, svg) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return Canvg2.from(ctx, svg, _objectSpread$1({}, this.options, {}, options));
    }
    /**
     * Create new Canvg instance with inherited options.
     * @param ctx - Rendering context.
     * @param svg - SVG source string.
     * @param options - Rendering options.
     */
  }, {
    key: "forkString",
    value: function forkString(ctx, svg) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return Canvg2.fromString(ctx, svg, _objectSpread$1({}, this.options, {}, options));
    }
    /**
     * Document is ready promise.
     */
  }, {
    key: "ready",
    value: function ready() {
      return this.screen.ready();
    }
    /**
     * Document is ready value.
     */
  }, {
    key: "isReady",
    value: function isReady() {
      return this.screen.isReady();
    }
    /**
     * Render only first frame, ignoring animations and mouse.
     * @param options - Rendering options.
     */
  }, {
    key: "render",
    value: (function() {
      var _render = _asyncToGenerator(import_regenerator.default.mark(function _callee() {
        var options, _args = arguments;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== void 0 ? _args[0] : {};
                this.start(_objectSpread$1({
                  enableRedraw: true,
                  ignoreAnimation: true,
                  ignoreMouse: true
                }, options));
                _context.next = 4;
                return this.ready();
              case 4:
                this.stop();
              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function render() {
        return _render.apply(this, arguments);
      }
      return render;
    })()
    /**
     * Start rendering.
     * @param options - Render options.
     */
  }, {
    key: "start",
    value: function start() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var documentElement = this.documentElement, screen = this.screen, baseOptions = this.options;
      screen.start(documentElement, _objectSpread$1({
        enableRedraw: true
      }, baseOptions, {}, options));
    }
    /**
     * Stop rendering.
     */
  }, {
    key: "stop",
    value: function stop() {
      this.screen.stop();
    }
    /**
     * Resize SVG to fit in given size.
     * @param width
     * @param height
     * @param preserveAspectRatio
     */
  }, {
    key: "resize",
    value: function resize(width) {
      var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : width;
      var preserveAspectRatio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      this.documentElement.resize(width, height, preserveAspectRatio);
    }
  }], [{
    key: "from",
    value: (function() {
      var _from = _asyncToGenerator(import_regenerator.default.mark(function _callee2(ctx, svg) {
        var options, parser, svgDocument, _args2 = arguments;
        return import_regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 2 && _args2[2] !== void 0 ? _args2[2] : {};
                parser = new Parser(options);
                _context2.next = 4;
                return parser.parse(svg);
              case 4:
                svgDocument = _context2.sent;
                return _context2.abrupt("return", new Canvg2(ctx, svgDocument, options));
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      function from2(_x, _x2) {
        return _from.apply(this, arguments);
      }
      return from2;
    })()
    /**
     * Create Canvg isntance from SVG source string.
     * @param ctx - Rendering context.
     * @param svg - SVG source string.
     * @param options - Rendering options.
     */
  }, {
    key: "fromString",
    value: function fromString(ctx, svg) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var parser = new Parser(options);
      var svgDocument = parser.parseFromString(svg);
      return new Canvg2(ctx, svgDocument, options);
    }
  }]);
  return Canvg2;
})();
function offscreen() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, DOMParserFallback = _ref.DOMParser;
  var preset = {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParserFallback,
    createCanvas: function createCanvas2(width, height) {
      return new OffscreenCanvas(width, height);
    },
    createImage: function createImage2(url) {
      return _asyncToGenerator(import_regenerator.default.mark(function _callee() {
        var response, blob, img;
        return import_regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(url);
              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.blob();
              case 5:
                blob = _context.sent;
                _context.next = 8;
                return createImageBitmap(blob);
              case 8:
                img = _context.sent;
                return _context.abrupt("return", img);
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  };
  if (typeof DOMParser !== "undefined" || typeof DOMParserFallback === "undefined") {
    Reflect.deleteProperty(preset, "DOMParser");
  }
  return preset;
}
function node(_ref) {
  var DOMParser2 = _ref.DOMParser, canvas = _ref.canvas, fetch2 = _ref.fetch;
  return {
    window: null,
    ignoreAnimation: true,
    ignoreMouse: true,
    DOMParser: DOMParser2,
    fetch: fetch2,
    createCanvas: canvas.createCanvas,
    createImage: canvas.loadImage
  };
}
var index = Object.freeze({
  __proto__: null,
  offscreen,
  node
});
var canvg_default = Canvg;
export {
  AElement,
  AnimateColorElement,
  AnimateElement,
  AnimateTransformElement,
  BoundingBox,
  CB1,
  CB2,
  CB3,
  CB4,
  Canvg,
  CircleElement,
  ClipPathElement,
  DefsElement,
  DescElement,
  Document,
  Element,
  EllipseElement,
  FeColorMatrixElement,
  FeCompositeElement,
  FeDropShadowElement,
  FeGaussianBlurElement,
  FeMorphologyElement,
  FilterElement,
  Font,
  FontElement,
  FontFaceElement,
  GElement,
  GlyphElement,
  GradientElement,
  ImageElement,
  LineElement,
  LinearGradientElement,
  MarkerElement,
  MaskElement,
  Matrix,
  MissingGlyphElement,
  Mouse,
  PSEUDO_ZERO,
  Parser,
  PathElement,
  PathParser,
  PatternElement,
  Point,
  PolygonElement,
  PolylineElement,
  Property,
  QB1,
  QB2,
  QB3,
  RadialGradientElement,
  RectElement,
  RenderedElement,
  Rotate,
  SVGElement,
  SVGFontLoader,
  Scale,
  Screen,
  Skew,
  SkewX,
  SkewY,
  StopElement,
  StyleElement,
  SymbolElement,
  TRefElement,
  TSpanElement,
  TextElement,
  TextPathElement,
  TitleElement,
  Transform,
  Translate,
  UnknownElement,
  UseElement,
  ViewPort,
  compressSpaces,
  canvg_default as default,
  getSelectorSpecificity,
  normalizeAttributeName,
  normalizeColor,
  parseExternalUrl,
  index as presets,
  toNumbers,
  trimLeft,
  trimRight,
  vectorMagnitude,
  vectorsAngle,
  vectorsRatio
};
//# sourceMappingURL=canvg-PM77AY2P.js.map
