webpackJsonp([22],{

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(480),
  /* template */
  __webpack_require__(639),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _is = __webpack_require__(76);

var _is2 = _interopRequireDefault(_is);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STOP = 0,
    START = 1,
    PAUSE = 2,
    TIMEOUT = 3,
    DEFAULT_TIME = 0;

exports.default = {
    data: function data() {
        return {
            limit: DEFAULT_TIME,
            defaultLimit: DEFAULT_TIME,
            rest: DEFAULT_TIME,
            startTime: null,
            timer: null,
            state: STOP,
            showTimer: false
        };
    },

    props: {
        'time-second': { type: Number, default: 0 },
        'time-order-by': { type: String, default: 'asc' },
        'time-show': { type: Boolean, default: true }
    },
    computed: {
        time: function time() {
            return this.minutes + ":" + this.seconds;
        },
        seconds: function seconds() {
            var strsec,
                sec = Math.floor(this.rest / 1000 % 60);
            if (sec < 0) return '00';
            if (sec < 10) {
                strsec = "0" + sec;
            } else {
                strsec = sec;
            }
            return strsec;
        },
        minutes: function minutes() {
            var strmin,
                min = Math.floor(this.rest / 1000 / 60);
            if (min < 0) return '00';
            if (min < 10) {
                strmin = "0" + min;
            } else {
                strmin = min;
            }
            return strmin;
        }
    },
    methods: {
        getRest: function getRest() {
            var vm = this;

            if (vm.state == START) {
                if ((0, _is2.default)(vm.timeOrderBy, 'asc')) {
                    vm.rest = Date.now() - vm.startTime + vm.limit;
                } else {
                    vm.rest = vm.limit - (Date.now() - vm.startTime);
                    if (vm.rest <= 0) {
                        vm.state = TIMEOUT;
                    }
                }
            }

            return vm.rest;
        },
        setTime: function setTime(time) {
            if (this.state != STOP) {
                this.reset();
            }
            return this.limit = this.defaultLimit = this.rest = time;
        },
        start: function start(time) {
            var vm = this;

            if (vm.state != START) {
                vm.state = START;
                vm.startTime = Date.now();

                if (!vm.timer) {
                    vm.timer = setInterval(vm.getRest.bind(vm));
                }
            }

            return vm.timer;
        },
        pause: function pause() {
            var vm = this;
            if (vm.state == START) {
                vm.state = PAUSE;
                return vm.limit = vm.getRest();
            }
            return vm.limit;
        },
        reset: function reset() {
            var vm = this;
            vm.state = STOP;
            if (vm.timer) clearInterval(vm.timer);
            vm.startTime = vm.timer = null;
            return vm.rest = vm.limit = vm.defaultLimit;
        }
    },
    mounted: function mounted() {
        this.setTime(this.timeSecond * 1000);
    },
    beforeDestroy: function beforeDestroy() {
        this.reset();
    }
};

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".timer-restTime{color:gray;font-size:500%;margin:0;padding:0}.timer-btn-group,.timer-restTime{text-align:center}", ""]);

// exports


/***/ }),

/***/ 448:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(466)
}
var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(370),
  /* template */
  __webpack_require__(461),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 461:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.timeShow),
      expression: "timeShow"
    }],
    attrs: {
      "id": "timer"
    }
  }, [_c('p', {
    staticClass: "timer-restTime",
    domProps: {
      "textContent": _vm._s(_vm.time)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "timer-btn-group"
  }, [_c('button', {
    staticClass: "timer-btn-start",
    on: {
      "click": _vm.start
    }
  }, [_vm._v("Start")]), _vm._v(" "), _c('button', {
    staticClass: "timer-btn-stop",
    on: {
      "click": _vm.pause
    }
  }, [_vm._v("Pause")]), _vm._v(" "), _c('button', {
    staticClass: "timer-btn-reset",
    on: {
      "click": _vm.reset
    }
  }, [_vm._v("Reset")])])])
},staticRenderFns: []}

/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(395);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(34)("224bdbd6", content, true);

/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(72);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = __webpack_require__(35);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _style = __webpack_require__(571);

var _style2 = _interopRequireDefault(_style);

var _range = __webpack_require__(552);

var _range2 = _interopRequireDefault(_range);

var _CTimer = __webpack_require__(448);

var _CTimer2 = _interopRequireDefault(_CTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'c-audio',
    props: {
        'playerOptions': { type: Object },
        'audio-poster': {
            type: String,
            default: 'https://p1.music.126.net/J8AsjYfu2Ugr7Q4ub0Yv0Q==/43980465123047.jpg?param=500y500'
        }
    },
    data: function data() {
        return {
            progress: null,
            playing: false,
            currentTime: 0,
            durationTime: 0,
            player: null
        };
    },

    components: (0, _defineProperty3.default)({
        'c-timer': _CTimer2.default
    }, _range2.default.name, _range2.default),
    computed: {
        options: function options() {
            return (0, _assign2.default)({
                start: 0,
                height: 222,
                muted: false,
                autoplay: true,
                controls: false }, this.playerOptions);
        },
        timer: function timer() {
            return this.$refs.timer;
        },
        size: function size() {
            return this.playerOptions.size;
        }
    },
    mounted: function mounted() {
        this.player = document.getElementById('audioPlayer');
        if (this.player.ended) this.player.play();
    },

    methods: {
        progressAPI: function progressAPI() {
            var vm = this;
            if (vm.player && vm.playing) {
                var duration = Math.floor(vm.player.duration);
                var time = vm.timer.getRest();
                var studyTime = Math.floor(time / 1000);
                var currentTime = Math.floor(vm.player.currentTime);

                var lessonStatus = 'incomplete';
                var itemInfo = JSON.parse(localStorage.itemInfo);
                var total_playtime = itemInfo.total_playtime;

                var progress_length = 80;
                var progress_study_length = 90;

                var progress_time = Math.floor(studyTime * 100 / duration);

                var progress_study_time = Math.floor((total_playtime + studyTime) * 100 / duration);

                var progress_currentTime_time = Math.floor(currentTime * 100 / duration);

                if (progress_time >= progress_length || progress_study_time >= progress_study_length || itemInfo.lesson_status == 'completed') {
                    lessonStatus = 'completed';
                }
                console.log("time==", duration);
                console.log("studyTime==", studyTime);
                console.log("currentTime==", currentTime);
                vm.$set(vm.$data, 'progress', { studyTime: studyTime, currentTime: currentTime, duration: duration, lessonStatus: lessonStatus, progress_currentTime_time: progress_currentTime_time });
            }
            return vm.progress;
        },
        playerPlay: function playerPlay(player) {
            this.timer.start();
            this.playing = true;
        },
        playerPause: function playerPause(player) {
            this.commit();
            this.timer.pause();
        },
        playerEnded: function playerEnded(player) {
            this.commit();
        },
        playerTimeupdate: function playerTimeupdate(player) {
            this.currentTime = Math.floor(player.target.currentTime);
        },
        playerLoadeddata: function playerLoadeddata(player) {
            this.durationTime = Math.floor(player.target.duration);

            player.target.currentTime = this.options.start;

            if (this.player.ended) player.target.play();
        },
        togglePlay: function togglePlay() {
            console.log(this.playing);
            if (this.playing) {
                this.player.pause();
            } else {
                this.player.play();
            }
        },
        changeTime: function changeTime(value) {
            this.player.currentTime = value;
        },
        commit: function commit() {
            this.$emit('commit');

            this.playing = false;
        }
    },
    beforeDestroy: function beforeDestroy() {
        this.player.src = '';
    },

    filters: {
        time: function time(value) {
            var length = Math.floor(parseInt(value));
            var minute = Math.floor(value / 60);
            if (minute < 10) {
                minute = '0' + minute;
            }
            var second = length % 60;
            if (second < 10) {
                second = '0' + second;
            }
            return minute + ':' + second;
        }
    }
};

/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(35);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _CAudio = __webpack_require__(579);

var _CAudio2 = _interopRequireDefault(_CAudio);

var _vuex = __webpack_require__(71);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    components: {
        'c-audio': _CAudio2.default
    },
    data: function data() {
        var _playOptions;

        return {
            itemInfo: {},
            timeInterval: null,
            playOptions: (_playOptions = {
                type: Object,
                title: '',
                src: '',
                poster: '' }, (0, _defineProperty3.default)(_playOptions, 'type', 'audio/mp3'), (0, _defineProperty3.default)(_playOptions, 'start', '0'), _playOptions)
        };
    },

    computed: {
        audio: function audio() {
            return this.$refs.audio;
        }
    },
    methods: {
        commitProgress: function commitProgress() {
            var _this = this;
            var progress = _this.audio.progressAPI();
            if (null != progress) {
                var itemInfo = JSON.parse(localStorage.itemInfo);
                var _p = {
                    "course_id": itemInfo._ids[0],
                    "scorm_id": itemInfo._ids[1],
                    "item_id": itemInfo._ids[2],
                    "lesson_status": progress.lessonStatus + "",
                    "lesson_location": progress.currentTime + "",
                    "session_time": progress.studyTime + "",
                    "study_terminal": 'android',
                    "browser_type": 'android',
                    "suspendData": progress.progress_currentTime_time + "," + progress.currentTime + "," + progress.duration + "," + progress.studyTime
                };
                _this.post(_this.api.scormSavePlayInfo, _p, 1).then(function (res) {
                    if (res.ok && res.body.code == '0000') {}
                }, function (res) {});
            }
        }
    },
    beforeDestroy: function beforeDestroy() {
        clearInterval(this.timeInterval);
        this.commitProgress();
    },
    mounted: function mounted() {
        var _this = this;
        _this.itemInfo = JSON.parse(localStorage.itemInfo);

        _this.playOptions.start = _this.itemInfo.playTime;
        _this.playOptions.title = _this.itemInfo.title;
        _this.playOptions.src = _this.itemInfo.url;
        this.timeInterval = setInterval(function () {
            _this.commitProgress();
        }, 1000 * 60);
    }
};

/***/ }),

/***/ 525:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "\n.mt-range {\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    height: 30px;\n    line-height: 30px\n}\n.mt-range > * {\n    display: -ms-flexbox;\n    display: flex;\n    display: -webkit-box\n}\n.mt-range *[slot=start] {\n    margin-right: 5px\n}\n.mt-range *[slot=end] {\n    margin-left: 5px\n}\n.mt-range-content {\n    position: relative;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    margin-right: 30px\n}\n.mt-range-runway {\n    position: absolute;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    left: 0;\n    right: -30px;\n    border-top-color: #a9acb1;\n    border-top-style: solid\n}\n.mt-range-thumb {\n    background-color: #fff;\n    position: absolute;\n    left: 0;\n    top: 0;\n    width: 30px;\n    height: 30px;\n    border-radius: 100%;\n    cursor: move;\n    box-shadow: 0 1px 3px rgba(0,0,0,.4)\n}\n.mt-range-progress {\n    position: absolute;\n    display: block;\n    background-color: #26a2ff;\n    top: 50%;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%);\n    width: 0\n}\n.mt-range--disabled {\n    opacity: 0.5\n}\n", ""]);

// exports


/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 232);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = __webpack_require__(4);

/***/ },

/***/ 125:
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(125)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(73),
  /* template */
  __webpack_require__(195),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ },

/***/ 195:
/***/ function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mt-range",
    class: {
      'mt-range--disabled': _vm.disabled
    }
  }, [_vm._t("start"), _vm._v(" "), _c('div', {
    ref: "content",
    staticClass: "mt-range-content"
  }, [_c('div', {
    staticClass: "mt-range-runway",
    style: ({
      'border-top-width': _vm.barHeight + 'px'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "mt-range-progress",
    style: ({
      width: _vm.progress + '%',
      height: _vm.barHeight + 'px'
    })
  }), _vm._v(" "), _c('div', {
    ref: "thumb",
    staticClass: "mt-range-thumb",
    style: ({
      left: _vm.progress + '%'
    })
  })]), _vm._v(" "), _vm._t("end")], 2)
},staticRenderFns: []}

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_index_vue__);
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(exports, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__src_index_vue___default.a; });



/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draggable__ = __webpack_require__(93);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ exports["default"] = {
  name: 'mt-range',

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number
    },
    barHeight: {
      type: Number,
      default: 1
    }
  },

  computed: {
    progress: function progress() {
      var value = this.value;
      if (typeof value === 'undefined' || value === null) return 0;
      return Math.floor((value - this.min) / (this.max - this.min) * 100);
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    var thumb = this.$refs.thumb;
    var content = this.$refs.content;

    var getThumbPosition = function () {
      var contentBox = content.getBoundingClientRect();
      var thumbBox = thumb.getBoundingClientRect();
      return {
        left: thumbBox.left - contentBox.left,
        top: thumbBox.top - contentBox.top,
        thumbBoxLeft: thumbBox.left
      };
    };

    var dragState = {};
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__draggable__["a" /* default */])(thumb, {
      start: function (event) {
        if (this$1.disabled) return;
        var position = getThumbPosition();
        var thumbClickDetalX = event.clientX - position.thumbBoxLeft;
        dragState = {
          thumbStartLeft: position.left,
          thumbStartTop: position.top,
          thumbClickDetalX: thumbClickDetalX
        };
      },
      drag: function (event) {
        if (this$1.disabled) return;
        var contentBox = content.getBoundingClientRect();
        var deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;
        var stepCount = Math.ceil((this$1.max - this$1.min) / this$1.step);
        var newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

        var newProgress = newPosition / contentBox.width;

        if (newProgress < 0) {
          newProgress = 0;
        } else if (newProgress > 1) {
          newProgress = 1;
        }

        this$1.$emit('input', Math.round(this$1.min + newProgress * (this$1.max - this$1.min)));
      },
      end: function () {
        if (this$1.disabled) return;
        this$1.$emit('change', this$1.value);
        dragState = {};
      }
    });
  }
};


/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
var isDragging = false;

var supportTouch = !__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$isServer && 'ontouchstart' in window;

/* harmony default export */ exports["a"] = function(element, options) {
  var moveFn = function(event) {
    if (options.drag) {
      options.drag(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  var endFn = function(event) {
    if (!supportTouch) {
      document.removeEventListener('mousemove', moveFn);
      document.removeEventListener('mouseup', endFn);
    }
    document.onselectstart = null;
    document.ondragstart = null;

    isDragging = false;

    if (options.end) {
      options.end(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  };

  element.addEventListener(supportTouch ? 'touchstart' : 'mousedown', function(event) {
    if (isDragging) return;
    event.preventDefault();
    document.onselectstart = function() { return false; };
    document.ondragstart = function() { return false; };

    if (!supportTouch) {
      document.addEventListener('mousemove', moveFn);
      document.addEventListener('mouseup', endFn);
    }
    isDragging = true;

    if (options.start) {
      options.start(supportTouch ? event.changedTouches[0] || event.touches[0] : event);
    }
  });

  if (supportTouch) {
    element.addEventListener('touchmove', moveFn);
    element.addEventListener('touchend', endFn);
    element.addEventListener('touchcancel', endFn);
  }
};;


/***/ }

/******/ });

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(525);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(25)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(472),
  /* template */
  __webpack_require__(618),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 618:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "player-wrapper max-audio"
  }, [_c('div', {
    staticClass: "player-inner"
  }, [_c('div', {
    staticClass: "cd"
  }, [_c('div', {
    staticClass: "cd-bg cd-rotate",
    class: {
      'running': _vm.playing
    },
    on: {
      "click": _vm.togglePlay
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "cd-stick",
    class: {
      'stick-paused': !_vm.playing
    },
    on: {
      "click": _vm.togglePlay
    }
  })]), _vm._v(" "), _c('h3', {
    staticClass: "cd-name",
    domProps: {
      "textContent": _vm._s(_vm.playerOptions.title)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "progress"
  }, [_c('time', {
    attrs: {
      "id": "cur",
      "calss": "time"
    }
  }, [_vm._v(_vm._s(_vm._f("time")(_vm.currentTime)))]), _vm._v(" "), _c('mt-range', {
    staticClass: "audio-slider",
    attrs: {
      "min": 0,
      "max": _vm.durationTime,
      "step": 1,
      "bar-height": 4
    },
    on: {
      "change": _vm.changeTime
    },
    model: {
      value: (_vm.currentTime),
      callback: function($$v) {
        _vm.currentTime = $$v
      },
      expression: "currentTime"
    }
  }), _vm._v(" "), _c('time', {
    attrs: {
      "id": "total",
      "calss": "time"
    }
  }, [_vm._v(_vm._s(_vm._f("time")(_vm.durationTime)))])], 1), _vm._v(" "), _c('div', {
    staticClass: "play-btn",
    class: {
      'pause-btn': _vm.playing
    },
    on: {
      "click": _vm.togglePlay
    }
  })]), _vm._v(" "), _c('audio', {
    attrs: {
      "id": "audioPlayer",
      "controls": _vm.options.controls,
      "src": _vm.options.src,
      "autoplay": _vm.options.autoplay
    },
    on: {
      "play": function($event) {
        _vm.playerPlay($event)
      },
      "pause": function($event) {
        _vm.playerPause($event)
      },
      "ended": function($event) {
        _vm.playerEnded($event)
      },
      "loadeddata": function($event) {
        _vm.playerLoadeddata($event)
      },
      "timeupdate": function($event) {
        _vm.playerTimeupdate($event)
      }
    }
  }), _vm._v(" "), _c('c-timer', {
    ref: "timer",
    attrs: {
      "time-show": false
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 639:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('c-audio', {
    ref: "audio",
    attrs: {
      "playerOptions": _vm.playOptions
    },
    on: {
      "commit": _vm.commitProgress
    }
  })
},staticRenderFns: []}

/***/ })

});