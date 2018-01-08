webpackJsonp([32],{

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(482),
  /* template */
  __webpack_require__(636),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    created: function created() {
        this.url = JSON.parse(localStorage.htmlURL);
    },
    data: function data() {
        return {
            url: ''
        };
    },
    mounted: function mounted() {
        this.$refs.iframe1.onload = function (event) {
            console.log(window.frames['iframe1'].document);
        };
    },
    destroyed: function destroyed() {
        console.log("销毁了");
        var _this = this;
        var itemInfo = JSON.parse(localStorage.itemInfo);
        var _p = {
            "course_id": itemInfo._ids[0],
            "scorm_id": itemInfo._ids[1],
            "item_id": itemInfo._ids[2],
            "lesson_status": "completed",
            "lesson_location": "1",
            "session_time": "",
            "study_terminal": 'android',
            "browser_type": 'android',
            "suspendData": ''
        };
        _this.post(_this.api.scormSavePlayInfo, _p, 1).then(function (res) {
            if (res.ok && res.body.code == '0000') {}
        }, function (res) {});
    },

    methods: {
        ifr: function ifr() {
            window.frames['iframe1'].document.getElementById('confirmBtn').onclick = function () {};
        }
    }

};

/***/ }),

/***/ 636:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "iframe-page"
  }, [_c('iframe', {
    ref: "iframe1",
    staticStyle: {
      "position": "absolute",
      "left": "0",
      "top": "0",
      "height": "100%",
      "width": "105%",
      "border": "none",
      "overflow": "hidden"
    },
    attrs: {
      "id": "iframe1",
      "name": "iframe1",
      "src": _vm.url,
      "width": "100%",
      "height": "100%",
      "frameborder": "no",
      "border": "0",
      "marginwidth": "0",
      "marginheight": "0",
      "scrolling": "yes",
      "allowtransparency": "yes"
    }
  })])
},staticRenderFns: []}

/***/ })

});