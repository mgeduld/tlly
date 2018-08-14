// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"args/checks.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.hasNoFlagsSet = function (flags) {
    return Object.keys(flags).every(function (key) {
        return flags[key] === false;
    });
};
exports.userWantsToTally = function (flags) {
    return exports.hasNoFlagsSet(flags);
};
exports.userWantsToCount = function (flags) {
    return flags.count;
};
exports.userWantsMockTallies = function (flags) {
    return flags.demo;
};
exports.userWantsToSeinfeldCount = function (flags) {
    return flags.seinfeldCount;
};
exports.userWantsToSeeTimestampList = function (flags) {
    return flags.timestamp;
};
exports.userWantsToDeleteATally = function (flags) {
    return flags["delete"];
};
},{}],"args/config.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.getHelp = function () {
    return "Usage\n\nTo update a tally:\n$ tlly <tally name> <amount> \n\nThe default amount is 1\n\nIf you omit both tally name and amount, 1 will be added \nto the most recent tally name.\n\nYou can add negative amounts\n\nTo display tally counts:\n$ tlly -c <tally name>\n\nIf you omit the tally name, all tally counts will be displayed\n\nTo display tallies that have been updated every day:\n$ tlly -s <tally name>\n\nTo display tallies by timestamp:\n$ tlly -t <tally name>\n\nTo delete a tally:\n$ tlly --delete tally_name\n\nTo force a specific date[1]\n$ tlly exercise 10 2018-06-31\n\n[1]ISO 8601 format\n";
};
exports.getConfig = function () {
    return {
        flags: {
            count: {
                type: 'boolean',
                alias: 'c'
            },
            "delete": {
                type: 'boolean'
            },
            demo: {
                type: 'boolean'
            },
            seinfeldCount: {
                type: 'boolean',
                alias: 's'
            },
            timestamp: {
                type: 'boolean',
                alias: 't'
            }
        }
    };
};
},{}],"args/utils.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.getInputValues = function (args) {
    var _a = args.input,
        tallyName = _a[0],
        amount = _a[1],
        timeStamp = _a[2];
    return {
        tallyName: tallyName,
        amount: amount,
        timeStamp: timeStamp
    };
};
},{}],"args/index.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var checks = __importStar(require("./checks"));
var config = __importStar(require("./config"));
var utils = __importStar(require("./utils"));
exports.userWantsToCount = checks.userWantsToCount;
exports.userWantsToTally = checks.userWantsToTally;
exports.userWantsMockTallies = checks.userWantsMockTallies;
exports.userWantsToSeinfeldCount = checks.userWantsToSeinfeldCount;
exports.userWantsToSeeTimestampList = checks.userWantsToSeeTimestampList;
exports.userWantsToDeleteATally = checks.userWantsToDeleteATally;
exports.getInputValues = utils.getInputValues;
exports.getConfig = config.getConfig;
exports.getHelp = config.getHelp;
},{"./checks":"args/checks.ts","./config":"args/config.ts","./utils":"args/utils.ts"}],"commands/utils.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
exports.displayCount = function (count) {
    return function (tallyName) {
        return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return [4 /*yield*/, count(tallyName)];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/];
                }
            });
        });
    };
};
},{}],"enums/error-message.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["noCurrentTally"] = "No current tally. Please specify a name.";
    ErrorMessage["noTalliesFound"] = "No tallies found.";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
},{}],"queries/utils.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.getTalliesResponseValue = function (db, tally) {
    return tally ? db.get("tallies." + tally).value() : db.get('tallies').value();
};
exports.normalizeTallies = function (talliesResponseValue, tally) {
    var _a;
    return Array.isArray(talliesResponseValue) ? (_a = {}, _a[tally] = talliesResponseValue, _a) : talliesResponseValue;
};
},{}],"queries/count.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var error_message_1 = require("../enums/error-message");
var utils_1 = require("./utils");
exports.tallyReducer = function (result, tally) {
    return result += tally.amount;
};
exports.talliesReducer = function (tallies) {
    return function (counts, tallyName) {
        var listOfTallies = tallies[tallyName];
        var total = listOfTallies.reduce(exports.tallyReducer, 0);
        counts.push(tallyName + ": " + total);
        return counts;
    };
};
exports.getTotal = function (tallies) {
    var totals = Object.keys(tallies).reduce(exports.talliesReducer(tallies), []);
    return totals.join('\n');
};
exports.count = function (db) {
    return function (tally) {
        var talliesResponseValue = utils_1.getTalliesResponseValue(db, tally);
        if (!talliesResponseValue) {
            throw new Error(error_message_1.ErrorMessage.noTalliesFound);
        }
        var tallies = utils_1.normalizeTallies(talliesResponseValue, tally);
        return exports.getTotal(tallies);
    };
};
exports.countFactory = function (db) {
    return exports.count(db);
};
},{"../enums/error-message":"enums/error-message.ts","./utils":"queries/utils.ts"}],"queries/seinfeld-count.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var error_message_1 = require("../enums/error-message");
var date_fns_1 = require("date-fns");
exports.talliesReducer = function (contiguousTallies) {
    return function (counts, tallyName) {
        var record = contiguousTallies[tallyName];
        var dateDiff = date_fns_1.differenceInCalendarDays(new Date(), new Date(record.last));
        counts.push(tallyName + ": " + (dateDiff > 1 ? 0 : record.count));
        return counts;
    };
};
exports.getTotal = function (contiguousTallies) {
    var totals = Object.keys(contiguousTallies).reduce(exports.talliesReducer(contiguousTallies), []);
    return totals.join('\n');
};
exports.getContiguousResponseValue = function (db, tally) {
    return tally ? db.get("contiguous." + tally).value() : db.get('contiguous').value();
};
exports.normalizeContiguousTallies = function (contiguousTalliesResponseValue, tally) {
    var _a;
    return contiguousTalliesResponseValue.count !== undefined && contiguousTalliesResponseValue.timeStamp == undefined ? (_a = {}, _a[tally] = contiguousTalliesResponseValue, _a) : contiguousTalliesResponseValue;
};
exports.seinfeldCount = function (db) {
    return function (tally) {
        var contiguousResponseValue = exports.getContiguousResponseValue(db, tally);
        if (!contiguousResponseValue) {
            throw new Error(error_message_1.ErrorMessage.noTalliesFound);
        }
        var contiguousTallies = exports.normalizeContiguousTallies(contiguousResponseValue, tally);
        return exports.getTotal(contiguousTallies);
    };
};
exports.seinfeldCountFactory = function (db) {
    return exports.seinfeldCount(db);
};
},{"../enums/error-message":"enums/error-message.ts"}],"queries/timestamp.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var error_message_1 = require("../enums/error-message");
var utils_1 = require("./utils");
exports.tallyMap = function (tallyName) {
    return function (tally) {
        return tallyName + ": " + tally.amount + " (" + tally.timeStamp + ")";
    };
};
exports.talliesReducer = function (tallies) {
    return function (counts, tallyName) {
        var listOfTallies = tallies[tallyName];
        var records = listOfTallies.map(exports.tallyMap(tallyName)).join('\n');
        counts.push(records);
        return counts;
    };
};
exports.getList = function (tallies) {
    var totals = Object.keys(tallies).reduce(exports.talliesReducer(tallies), []);
    return totals.join('\n\n');
};
exports.timestamp = function (db) {
    return function (tally) {
        var talliesResponseValue = utils_1.getTalliesResponseValue(db, tally);
        if (!talliesResponseValue) {
            throw new Error(error_message_1.ErrorMessage.noTalliesFound);
        }
        var tallies = utils_1.normalizeTallies(talliesResponseValue, tally);
        return exports.getList(tallies);
    };
};
exports.timestampFactory = function (db) {
    return exports.timestamp(db);
};
},{"../enums/error-message":"enums/error-message.ts","./utils":"queries/utils.ts"}],"../package.json":[function(require,module,exports) {
module.exports = {
  "name": "tlly",
  "version": "1.0.2",
  "description": "a command-line tool for keeping tallies",
  "main": "./bin/app.js",
  "scripts": {
    "test": "nyc ava-ts \"src/**/*.test.ts\"",
    "build": "parcel src/tlly.ts --out-dir lib/ --target node"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/mgeduld/tlly.git"
  },
  "keywords": ["tally"],
  "author": "Marcus Geduld",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/mgeduld/tlly/issues"
  },
  "nyc": {
    "extension": [".ts"],
    "exclude": ["**/*.test.ts", "src/test-fixtures.ts"]
  },
  "configuration": {
    "default": {
      "dbLocation": ""
    }
  },
  "bin": {
    "tlly": "./bin/app.js"
  },
  "homepage": "https://github.com/mgeduld/tlly#readme",
  "devDependencies": {
    "@types/date-fns": "^2.6.0",
    "@types/lowdb": "^1.0.5",
    "@types/meow": "^4.0.1",
    "@types/node": "^10.5.8",
    "ava": "^0.25.0",
    "ava-ts": "^0.25.0",
    "nyc": "^12.0.2",
    "parcel-bundler": "^1.9.7",
    "ts-node": "^7.0.1",
    "tslint-config-airbnb": "^5.9.2",
    "typescript": "^3.0.1"
  },
  "dependencies": {
    "date-fns": "^1.29.0",
    "lowdb": "^1.0.0",
    "meow": "^5.0.0"
  }
};
},{}],"config.ts":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var fs = __importStar(require("fs"));
var os = __importStar(require("os"));
var path_1 = require("path");
var pkg = require('../package.json');
var config;
var maybeCreateConfig = function (configPath, defaultConfig) {
    if (!fs.existsSync(configPath)) {
        var data = JSON.stringify(defaultConfig, null, 4);
        fs.writeFileSync(configPath, data, 'utf8');
    }
};
var readConfig = function (configPath, defaultConfig) {
    var content = fs.readFileSync(configPath, 'utf8');
    var config = JSON.parse(content);
    return __assign({}, defaultConfig, config);
};
var setConfig = function () {
    var defaultConfig = pkg.configuration["default"];
    var configPath = path_1.join(os.homedir(), '.tlly-config.json');
    maybeCreateConfig(configPath, defaultConfig);
    config = readConfig(configPath, defaultConfig);
};
setConfig();
exports.getConfig = function () {
    return config;
};
},{"../package.json":"../package.json"}],"constants.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var os = __importStar(require("os"));
var path_1 = require("path");
var config_1 = require("./config");
exports.dbDefault = {
    currentTally: undefined,
    tallies: {},
    contiguous: {}
};
var configLocation = config_1.getConfig().dbLocation;
exports.dbLocation = path_1.join(config_1.getConfig().dbLocation || os.homedir(), '.tllydb.json');
},{"./config":"config.ts"}],"queries/index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = this && this.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function () {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0:case 1:
                    t = op;break;
                case 4:
                    _.label++;return { value: op[1], done: false };
                case 5:
                    _.label++;y = op[1];op = [0];continue;
                case 7:
                    op = _.ops.pop();_.trys.pop();continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];t = op;break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];_.ops.push(op);break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [6, e];y = 0;
        } finally {
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var lowdb = require("lowdb");
var FileAsync = require("lowdb/adapters/FileAsync");
var FileSync = require("lowdb/adapters/FileSync");
var count_1 = require("./count");
var seinfeld_count_1 = require("./seinfeld-count");
var timestamp_1 = require("./timestamp");
var constants_1 = require("../constants");
exports.count = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(_this, void 0, void 0, function () {
        var adapter, db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adapter = new FileAsync(constants_1.dbLocation);
                    return [4 /*yield*/, lowdb(adapter)];
                case 1:
                    db = _a.sent();
                    db.defaults(constants_1.dbDefault);
                    return [2 /*return*/, count_1.countFactory(db).apply(null, args)];
            }
        });
    });
};
exports.seinfeldCount = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var adapter = new FileSync(constants_1.dbLocation);
    var db = lowdb(adapter);
    db.defaults(constants_1.dbDefault);
    return seinfeld_count_1.seinfeldCountFactory(db).apply(null, args);
};
exports.timestamp = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var adapter = new FileSync(constants_1.dbLocation);
    var db = lowdb(adapter);
    db.defaults(constants_1.dbDefault);
    return timestamp_1.timestampFactory(db).apply(null, args);
};
},{"./count":"queries/count.ts","./seinfeld-count":"queries/seinfeld-count.ts","./timestamp":"queries/timestamp.ts","../constants":"constants.ts"}],"enums/db.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var DB;
(function (DB) {
    DB["currentTally"] = "currentTally";
})(DB = exports.DB || (exports.DB = {}));
},{}],"storage/storage.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var db_1 = require("../enums/db");
var error_message_1 = require("../enums/error-message");
var date_fns_1 = require("date-fns");
exports.getResolvedTally = function (db, tally) {
    var resolvedTally = tally || db.get(db_1.DB.currentTally).value();
    if (resolvedTally) {
        return resolvedTally;
    }
    throw new Error(error_message_1.ErrorMessage.noCurrentTally);
};
exports.maybeStartNewTally = function (tallyResults, db, tallyName) {
    if (!tallyResults) {
        db.set("tallies." + tallyName, []).write();
        db.set("contiguous." + tallyName, { count: 0, last: '' }).write();
    }
};
exports.writeContiguousUpdateToDb = function (db, tallyName, amount, timeStamp) {
    var dateTime = timeStamp ? new Date(timeStamp) : new Date();
    var newLast = dateTime.toUTCString();
    var contiguous = db.get("contiguous." + tallyName).value();
    var count = contiguous.count,
        last = contiguous.last;
    var lastDate = new Date(last);
    var newCount = !last || date_fns_1.differenceInCalendarDays(new Date(dateTime), lastDate) > 1 ? 1 : count + amount;
    db.set("contiguous." + tallyName, { count: newCount, last: newLast }).write();
};
exports.writeUpdatedTallyToDb = function (db, tallyName, amount, timeStamp) {
    var dateTime = timeStamp ? new Date(timeStamp) : new Date();
    db.get("tallies." + tallyName).push({ amount: amount, timeStamp: dateTime.toUTCString() }).write();
};
exports.updateCurrentTally = function (db, resolvedTally) {
    db.set(db_1.DB.currentTally, resolvedTally).write();
};
exports.updateTally = function (db, amount, tally, timeStamp) {
    var resolvedTally = exports.getResolvedTally(db, tally);
    var tallyResults = db.get("tallies." + resolvedTally).value();
    exports.maybeStartNewTally(tallyResults, db, resolvedTally);
    exports.writeUpdatedTallyToDb(db, resolvedTally, amount, timeStamp);
    exports.writeContiguousUpdateToDb(db, resolvedTally, amount, timeStamp);
    exports.updateCurrentTally(db, resolvedTally);
    return resolvedTally;
};
exports.updateTallyFactory = function (db) {
    return function (amount, tally, timeStamp) {
        if (amount === void 0) {
            amount = 1;
        }
        return exports.updateTally(db, amount, tally, timeStamp);
    };
};
},{"../enums/db":"enums/db.ts","../enums/error-message":"enums/error-message.ts"}],"storage/delete.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.deleteTally = function (db, tallyName) {
    db.unset("tallies." + tallyName).write();
    db.unset("contiguous." + tallyName).write();
};
exports.deleteTallyFactory = function (db) {
    return function (tallyName) {
        exports.deleteTally(db, tallyName);
    };
};
},{}],"storage/index.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var lowdb = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var storage_1 = require("./storage");
var delete_1 = require("./delete");
var constants_1 = require("../constants");
var adapter = new FileSync(constants_1.dbLocation);
var db = lowdb(adapter);
db.defaults(constants_1.dbDefault);
exports.updateTally = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return storage_1.updateTallyFactory(db).apply(null, args);
};
exports.deleteTally = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return delete_1.deleteTallyFactory(db).apply(null, args);
};
},{"./storage":"storage/storage.ts","./delete":"storage/delete.ts","../constants":"constants.ts"}],"commands/commands.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
exports.doTally = function (displayCount, updateTally) {
    return function (amount, tallyName, timeStamp) {
        var resolvedTallyName = updateTally(amount && !isNaN(Number(amount)) ? Number(amount) : undefined, tallyName, timeStamp);
        displayCount(resolvedTallyName);
    };
};
exports.doCount = function (displayCount) {
    return function (tallyName) {
        displayCount(tallyName);
    };
};
exports.doSeinfeldCount = function (seinfeldCount) {
    return function (tallyName) {
        var count = seinfeldCount(tallyName);
        console.log(count);
    };
};
exports.doTimestamp = function (timestamp) {
    return function (tallyName) {
        var count = timestamp(tallyName);
        console.log(count);
    };
};
exports.doDeleteTally = function (deleteTally) {
    return function (tallyName) {
        deleteTally(tallyName);
    };
};
},{}],"commands/index.ts":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var utils_1 = require("./utils");
var queries_1 = require("../queries");
var storage_1 = require("../storage");
var commands = __importStar(require("./commands"));
exports.displayCount = utils_1.displayCount(queries_1.count);
exports.doCount = commands.doCount(exports.displayCount);
exports.doTally = commands.doTally(exports.displayCount, storage_1.updateTally);
exports.doSeinfeldCount = commands.doSeinfeldCount(queries_1.seinfeldCount);
exports.doTimestamp = commands.doTimestamp(queries_1.timestamp);
exports.doDeleteTally = commands.doDeleteTally(storage_1.deleteTally);
},{"./utils":"commands/utils.ts","../queries":"queries/index.ts","../storage":"storage/index.ts","./commands":"commands/commands.ts"}],"demo.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var date_fns_1 = require("date-fns");
var lodash_1 = require("lodash");
var storage_1 = require("./storage");
var getLastNDaysAsStrings = function (n, gap, date) {
    if (gap === void 0) {
        gap = 0;
    }
    if (date === void 0) {
        date = new Date();
    }
    return lodash_1.range(1 + gap, n + gap).reverse().map(function (offset) {
        return date_fns_1.subDays(date, offset).toISOString();
    });
};
var addTally = function (name, dates) {
    dates.forEach(function (date) {
        storage_1.updateTally(1, name, date);
    });
    console.log("Added tally " + name);
};
exports.addMockTallies = function () {
    addTally('_exercise', getLastNDaysAsStrings(10));
    addTally('_meditation', getLastNDaysAsStrings(10, 2));
};
},{"./storage":"storage/index.ts"}],"tlly.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
var meow = require("meow");
var args_1 = require("./args");
var args_2 = require("./args");
var commands_1 = require("./commands");
var demo_1 = require("./demo");
var start = function () {
    var moewResult = meow(args_1.getHelp(), args_1.getConfig());
    var flags = moewResult.flags;
    var args = { input: moewResult.input, flags: flags };
    var _a = args_2.getInputValues(args),
        tallyName = _a.tallyName,
        amount = _a.amount,
        timeStamp = _a.timeStamp;
    try {
        if (args_2.userWantsToTally(flags)) {
            commands_1.doTally(amount, tallyName, timeStamp);
        } else if (args_2.userWantsToCount(flags)) {
            commands_1.doCount(tallyName);
        } else if (args_2.userWantsToSeinfeldCount(flags)) {
            commands_1.doSeinfeldCount(tallyName);
        } else if (args_2.userWantsToSeeTimestampList(flags)) {
            commands_1.doTimestamp(tallyName);
        } else if (args_2.userWantsToDeleteATally(flags)) {
            commands_1.doDeleteTally(tallyName);
        } else if (args_2.userWantsMockTallies(flags)) {
            demo_1.addMockTallies();
        }
    } catch (e) {
        console.log(e.message);
    }
};
module.exports = start;
},{"./args":"args/index.ts","./commands":"commands/index.ts","./demo":"demo.ts"}]},{},["tlly.ts"], null)
//# sourceMappingURL=/tlly.map