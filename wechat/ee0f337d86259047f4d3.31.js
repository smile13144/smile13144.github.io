webpackJsonp([31],{

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(489),
  /* template */
  __webpack_require__(603),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    name: 'ADWebView',
    data: function data() {
        return {
            adItem: {}
        };
    },
    mounted: function mounted() {
        var _this = this;
        _this.adItem = JSON.parse(localStorage.ADInfo);
    }
};

/***/ }),

/***/ 603:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "100%"
    }
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.adItem.app_content)
    }
  })])
},staticRenderFns: []}

/***/ })

});