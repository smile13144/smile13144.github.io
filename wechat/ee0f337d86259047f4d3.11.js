webpackJsonp([11],{

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(509),
  /* template */
  __webpack_require__(647),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

(function (window, document, Math) {
  'use strict';

  var JRoll;
  var VERSION = '2.5.0';
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
    setTimeout(callback, 17);
  };
  var sty = document.createElement('div').style;
  var jrollMap = {};
  var ua = navigator.userAgent.toLowerCase();
  var prefix = function () {
    var vendors = ['OT', 'msT', 'MozT', 'webkitT', 't'];
    var transform;
    var i = vendors.length;

    while (i--) {
      transform = vendors[i] + 'ransform';
      if (transform in sty) return vendors[i];
    }
  }();

  var utils = {
    TSF: prefix + 'ransform',
    TSD: prefix + 'ransitionDuration',
    TFO: prefix + 'ransformOrigin',
    isAndroid: /android/.test(ua),
    isIOS: /iphone|ipad/.test(ua),
    isMobile: /mobile|phone|android|pad/.test(ua),

    translateZ: function (pre) {
      var f;
      if (pre) {
        f = pre + 'Perspective' in sty;
      } else {
        f = 'perspective' in sty;
      }
      return f ? ' translateZ(0px)' : '';
    }(prefix.substr(0, prefix.length - 1)),

    computeTranslate: function computeTranslate(a, b) {
      var x = 0;
      var y = 0;
      var s;
      while (a) {
        s = window.getComputedStyle(a)[utils.TSF].replace(/matrix\(|\)/g, '').split(', ');
        x += parseInt(s[4]) || 0;
        y += parseInt(s[5]) || 0;
        a = a.parentElement;
        if (a === b) {
          a = null;
        }
      }
      return {
        x: x,
        y: y
      };
    },

    computePosition: function computePosition(a, b) {
      var left = 0;
      var top = 0;
      while (a) {
        left += a.offsetLeft;
        top += a.offsetTop;
        a = a.offsetParent;
        if (a === b) {
          a = null;
        }
      }
      return {
        left: left,
        top: top
      };
    },

    moveTo: function moveTo(el, x, y, duration, callback) {
      var startX = 0;
      var startY = 0;
      var endX;
      var endY;
      var zoom = 1;
      var stepX;
      var stepY;
      var d;
      var result;
      result = /translate\(([-\d.]+)px,\s+([-\d.]+)px\)\s+(?:translateZ\(0px\)\s+)?scale\(([\d.]+)\)/.exec(el.style[utils.TSF]);
      if (result) {
        startX = Number(result[1]);
        startY = Number(result[2]);
        zoom = Number(result[3]);
      }
      d = duration || 17;
      stepX = (x - startX) / (d / 17);
      stepY = (y - startY) / (d / 17);
      endX = startX;
      endY = startY;

      function moving() {
        d = d - 17;
        if (d <= 0) {
          endX = x;
          endY = y;
        } else {
          endX = parseInt(endX + stepX, 10);
          endY = parseInt(endY + stepY, 10);
        }
        el.style[utils.TSF] = 'translate(' + endX + 'px, ' + endY + 'px)' + utils.translateZ + ' scale(' + zoom + ')';

        if (d > 0 && !(endX === x && endY === y)) {
          rAF(moving);
        } else if (typeof callback === 'function') {
          callback();
        }
      }

      moving();
    },

    findScroller: function findScroller(el, force) {
      var id;

      if (force || !(el.tagName === 'TEXTAREA' && el.scrollHeight > el.offsetHeight)) {
        while (el !== document) {
          id = el.getAttribute('jroll-id');
          if (id) {
            return jrollMap[id];
          }
          el = el.parentNode;
        }
      }
      return null;
    },

    findAllJRolls: function findAllJRolls(el, force) {
      var jrolls = [];
      var id;

      if (force || !(el.tagName === 'TEXTAREA' && el.scrollHeight > el.clientHeight && el.scrollTop > 0 && el.scrollTop < el.scrollHeight - el.clientHeight)) {
        while (el !== document) {
          id = el.getAttribute('jroll-id');
          if (id) {
            jrolls.push(jrollMap[id]);
          }
          el = el.parentNode;
        }
      }
      return jrolls;
    }
  };

  function _touchstart(e) {
    var jrolls = utils.findAllJRolls(e.target);
    var l = jrolls.length;

    if (JRoll.jrollActive && !JRoll.jrollActive.options.zoom && e.touches && e.touches.length > 1) {
      return;
    }
    if (l) {
      while (l--) {
        if (jrolls[l].moving) {
          e.preventDefault();
          jrolls[l]._endAction();
        }
      }

      JRoll.jrollActive = jrolls[0];
      JRoll.jrollActive._start(e);
    } else if (JRoll.jrollActive) {
      JRoll.jrollActive._end(e);
    }
  }

  function _touchmove(e) {
    if (JRoll.jrollActive) {
      var activeElement = document.activeElement;
      if (JRoll.jrollActive.options.preventDefault) {
        e.preventDefault();
      }
      if (utils.isMobile && JRoll.jrollActive.options.autoBlur && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        activeElement.blur();
      }
      JRoll.jrollActive._move(e);
    }
  }

  function _touchend(e) {
    if (JRoll.jrollActive) {
      JRoll.jrollActive._end(e);
    }
  }

  function _resize() {
    setTimeout(function () {
      for (var i in jrollMap) {
        jrollMap[i].refresh().scrollTo(jrollMap[i].x, jrollMap[i].y, 0);
      }
    }, 0);
  }

  function _wheel(e) {
    var jroll = utils.findScroller(e.target);
    if (jroll) {
      jroll._wheel(e);
    }
  }

  var supportsPassiveOption = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassiveOption = true;
      }
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}

  function addEvent(type, method) {
    document.addEventListener(type, method, supportsPassiveOption ? { passive: false } : false);
  }

  addEvent(utils.isMobile ? 'touchstart' : 'mousedown', _touchstart);
  addEvent(utils.isMobile ? 'touchmove' : 'mousemove', _touchmove);
  addEvent(utils.isMobile ? 'touchend' : 'mouseup', _touchend);
  if (utils.isMobile) {
    addEvent('touchcancel', _touchend);
  } else {
    addEvent(/firefox/.test(ua) ? 'DOMMouseScroll' : 'mousewheel', _wheel);
  }
  window.addEventListener('resize', _resize);
  window.addEventListener('orientationchange', _resize);

  JRoll = function JRoll(el, options) {
    var me = this;

    me.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
    me.scroller = options && options.scroller ? typeof options.scroller === 'string' ? document.querySelector(options.scroller) : options.scroller : me.wrapper.children[0];

    if (me.scroller.jroll) {
      me.scroller.jroll.refresh();
      return me.scroller.jroll;
    } else {
      me.scroller.jroll = me;
    }

    this._init(el, options);
  };

  JRoll.version = VERSION;

  JRoll.utils = utils;

  JRoll.jrollMap = jrollMap;

  JRoll.prototype = {
    _init: function _init(el, options) {
      var me = this;

      me.wrapperOffset = utils.computePosition(me.wrapper, document.body);

      me.id = options && options.id || me.scroller.getAttribute('jroll-id') || 'jroll_' + Math.random().toString().substr(2, 8);

      me.scroller.setAttribute('jroll-id', me.id);
      jrollMap[me.id] = me;

      me.options = {
        scrollX: false,
        scrollY: true,
        scrollFree: false,
        minX: null,
        maxX: null,
        minY: null,
        maxY: null,
        zoom: false,
        zoomMin: 1,
        zoomMax: 4,
        zoomDuration: 400,
        bounce: true,
        scrollBarX: false,
        scrollBarY: false,
        scrollBarFade: false,
        preventDefault: true,
        momentum: true,
        autoStyle: true,
        autoBlur: true,
        edgeRelease: true };

      for (var i in options) {
        if (i !== 'scroller') {
          me.options[i] = options[i];
        }
      }

      if (me.options.autoStyle) {
        if (window.getComputedStyle(me.wrapper).position === 'static') {
          me.wrapper.style.position = 'relative';
          me.wrapper.style.top = '0';
          me.wrapper.style.left = '0';
        }
        me.wrapper.style.overflow = 'hidden';
        me.scroller.style.minHeight = '100%';
      }

      me.scroller.style.touchAction = 'none';

      me.x = 0;
      me.y = 0;

      me.s = null;
      me.scrollBarX = null;
      me.scrollBarY = null;

      me._s = {
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        endX: 0,
        endY: 0
      };

      me._z = {
        spacing: 0,
        scale: 1,
        startScale: 1
      };

      me._event = {
        'scrollStart': [],
        'scroll': [],
        'scrollEnd': [],
        'zoomStart': [],
        'zoom': [],
        'zoomEnd': [],
        'refresh': [],
        'touchEnd': []
      };

      me.refresh(true);
    },

    enable: function enable() {
      var me = this;
      me.scroller.setAttribute('jroll-id', me.id);
      return me;
    },

    disable: function disable() {
      var me = this;
      me.scroller.removeAttribute('jroll-id');
      return me;
    },

    destroy: function destroy() {
      var me = this;
      delete jrollMap[me.id];
      delete me.scroller.jroll;
      if (me.scrollBarX) {
        me.wrapper.removeChild(me.scrollBarX);
      }
      if (me.scrollBarY) {
        me.wrapper.removeChild(me.scrollBarY);
      }
      me.disable();
      me.scroller.style[utils.tSF] = '';
      me.scroller.style[utils.tSD] = '';
      me.prototype = null;
      for (var i in me) {
        if (me.hasOwnProperty(i)) {
          delete me[i];
        }
      }
    },

    call: function call(target, e) {
      var me = this;
      me.scrollTo(me.x, me.y);
      JRoll.jrollActive = target;
      if (e) target._start(e);
      return target;
    },

    refresh: function refresh(notRefreshEvent) {
      var me = this;
      var wrapperStyle = window.getComputedStyle(me.wrapper);
      var scrollerStyle = window.getComputedStyle(me.scroller);
      var paddingX;
      var paddingY;
      var marginX;
      var marginY;
      var temp;
      var size;

      me.wrapperWidth = me.wrapper.clientWidth;
      me.wrapperHeight = me.wrapper.clientHeight;

      me.scrollerWidth = Math.round(me.scroller.offsetWidth * me._z.scale);
      me.scrollerHeight = Math.round(me.scroller.offsetHeight * me._z.scale);

      paddingX = parseInt(wrapperStyle['padding-left']) + parseInt(wrapperStyle['padding-right']);
      paddingY = parseInt(wrapperStyle['padding-top']) + parseInt(wrapperStyle['padding-bottom']);
      marginX = parseInt(scrollerStyle['margin-left']) + parseInt(scrollerStyle['margin-right']);
      marginY = parseInt(scrollerStyle['margin-top']) + parseInt(scrollerStyle['margin-bottom']);

      me.minScrollX = me.options.minX === null ? 0 : me.options.minX;
      me.maxScrollX = me.options.maxX === null ? me.wrapperWidth - me.scrollerWidth - paddingX - marginX : me.options.maxX;
      me.minScrollY = me.options.minY === null ? 0 : me.options.minY;
      me.maxScrollY = me.options.maxY === null ? me.wrapperHeight - me.scrollerHeight - paddingY - marginY : me.options.maxY;

      if (me.minScrollX < 0) {
        me.minScrollX = 0;
      }
      if (me.minScrollY < 0) {
        me.minScrollY = 0;
      }
      if (me.maxScrollX > 0) {
        me.maxScrollX = 0;
      }
      if (me.maxScrollY > 0) {
        me.maxScrollY = 0;
      }

      me._s.endX = me.x;
      me._s.endY = me.y;

      if (me.options.scrollBarX) {
        if (!me.scrollBarX) {
          temp = me._createScrollBar('jroll-xbar', 'jroll-xbtn', false);
          me.scrollBarX = temp[0];
          me.scrollBtnX = temp[1];
        }
        me.scrollBarScaleX = me.wrapper.clientWidth / me.scrollerWidth;
        size = Math.round(me.scrollBarX.clientWidth * me.scrollBarScaleX);
        me.scrollBtnX.style.width = (size > 8 ? size : 8) + 'px';
        me._runScrollBarX();
      } else if (me.scrollBarX) {
        me.wrapper.removeChild(me.scrollBarX);
        me.scrollBarX = null;
      }

      if (me.options.scrollBarY) {
        if (!me.scrollBarY) {
          temp = me._createScrollBar('jroll-ybar', 'jroll-ybtn', true);
          me.scrollBarY = temp[0];
          me.scrollBtnY = temp[1];
        }
        me.scrollBarScaleY = me.wrapper.clientHeight / me.scrollerHeight;
        size = Math.round(me.scrollBarY.clientHeight * me.scrollBarScaleY);
        me.scrollBtnY.style.height = (size > 8 ? size : 8) + 'px';
        me._runScrollBarY();
      } else if (me.scrollBarY) {
        me.wrapper.removeChild(me.scrollBarY);
        me.scrollBarY = null;
      }

      if (!notRefreshEvent) {
        me._execEvent('refresh');
      }

      return me;
    },

    scale: function scale(multiple) {
      var me = this;
      var z = parseFloat(multiple);
      if (!isNaN(z)) {
        me.scroller.style[utils.TFO] = '0 0';
        me._z.scale = z;
        me.refresh()._scrollTo(me.x, me.y);
        me.scrollTo(me.x, me.y, 400);
      }
      return me;
    },

    _wheel: function _wheel(e) {
      var me = this;
      var y = e.wheelDelta || -(e.detail / 3) * 120;
      if (me.options.scrollY || me.options.scrollFree) {
        me.scrollTo(me.x, me._compute(me.y + y, me.minScrollY, me.maxScrollY));
      }
    },

    _runScrollBarX: function _runScrollBarX() {
      var me = this;
      var x = Math.round(-1 * me.x * me.scrollBarScaleX);

      me._scrollTo.call({
        scroller: me.scrollBtnX,
        _z: {
          scale: 1
        }
      }, x, 0);
    },
    _runScrollBarY: function _runScrollBarY() {
      var me = this;
      var y = Math.round(-1 * me.y * me.scrollBarScaleY);

      me._scrollTo.call({
        scroller: me.scrollBtnY,
        _z: {
          scale: 1
        }
      }, 0, y);
    },

    _createScrollBar: function _createScrollBar(a, b, isY) {
      var me = this;
      var bar;
      var btn;

      bar = document.createElement('div');
      btn = document.createElement('div');
      bar.className = a;
      btn.className = b;

      if (this.options.scrollBarX === true || this.options.scrollBarY === true) {
        if (isY) {
          bar.style.cssText = 'position:absolute;top:2px;right:2px;bottom:2px;width:6px;overflow:hidden;border-radius:2px;-webkit-transform: scaleX(.5);transform: scaleX(.5);';
          btn.style.cssText = 'background:rgba(0,0,0,.4);position:absolute;top:0;left:0;right:0;border-radius:2px;';
        } else {
          bar.style.cssText = 'position:absolute;left:2px;bottom:2px;right:2px;height:6px;overflow:hidden;border-radius:2px;-webkit-transform: scaleY(.5);transform: scaleY(.5);';
          btn.style.cssText = 'background:rgba(0,0,0,.4);height:100%;position:absolute;left:0;top:0;bottom:0;border-radius:2px;';
        }
      }

      if (me.options.scrollBarFade) {
        bar.style.opacity = 0;
      }

      bar.appendChild(btn);
      me.wrapper.appendChild(bar);

      return [bar, btn];
    },

    _fade: function _fade(bar, time) {
      var me = this;
      if (me.fading && time > 0) {
        time = time - 25;
        if (time % 100 === 0) bar.style.opacity = time / 1000;
      } else {
        return;
      }
      rAF(me._fade.bind(me, bar, time));
    },

    on: function on(event, callback) {
      var me = this;
      switch (event) {
        case 'scrollStart':
          me._event.scrollStart.push(callback);
          break;
        case 'scroll':
          me._event.scroll.push(callback);
          break;
        case 'scrollEnd':
          me._event.scrollEnd.push(callback);
          break;
        case 'zoomStart':
          me._event.zoomStart.push(callback);
          break;
        case 'zoom':
          me._event.zoom.push(callback);
          break;
        case 'zoomEnd':
          me._event.zoomEnd.push(callback);
          break;
        case 'refresh':
          me._event.refresh.push(callback);
          break;
        case 'touchEnd':
          me._event.touchEnd.push(callback);
          break;
      }
      return me;
    },

    _execEvent: function _execEvent(event, e) {
      var me = this;
      var i = me._event[event].length - 1;
      for (; i >= 0; i--) {
        me._event[event][i].call(me, e);
      }
    },

    _compute: function _compute(val, min, max) {
      var me = this;
      if (val > min) {
        if (me.options.bounce && val > min + 10) {
          return Math.round(min + (val - min) / 4);
        } else {
          return min;
        }
      }

      if (val < max) {
        if (me.options.bounce && val < max - 10) {
          return Math.round(max + (val - max) / 4);
        } else {
          return max;
        }
      }

      return val;
    },

    _scrollTo: function _scrollTo(x, y) {
      this.scroller.style[utils.TSF] = 'translate(' + x + 'px, ' + y + 'px)' + utils.translateZ + ' scale(' + this._z.scale + ')';
    },

    scrollTo: function scrollTo(x, y, timing, allow, callback, system, t) {
      var me = this;
      if (!allow) {
        if (x >= me.minScrollX) {
          me.x = me.minScrollX;

          if (t) {
            me._s.startX = t[0].pageX;
            me._s.endX = me.minScrollX;
          }
        } else if (x <= me.maxScrollX) {
          me.x = me.maxScrollX;
          if (t) {
            me._s.startX = t[0].pageX;
            me._s.endX = me.maxScrollX;
          }
        } else {
          me.x = x;
        }

        if (y >= me.minScrollY) {
          me.y = me.minScrollY;
          if (t) {
            me._s.startY = t[0].pageY;
            me._s.endY = me.minScrollY;
          }
        } else if (y <= me.maxScrollY) {
          me.y = me.maxScrollY;
          if (t) {
            me._s.startY = t[0].pageY;
            me._s.endY = me.maxScrollY;
          }
        } else {
          me.y = y;
        }
      } else {
        me.x = x;
        me.y = y;
      }
      if (!system) {
        me._s.endX = me.x;
        me._s.endY = me.y;
      }
      if (timing) {
        utils.moveTo(me.scroller, me.x, me.y, timing, callback);
      } else {
        me._scrollTo(me.x, me.y);
        if (typeof callback === 'function') {
          callback();
        }
      }

      if (me.scrollBtnX) me._runScrollBarX();
      if (me.scrollBtnY) me._runScrollBarY();

      return me;
    },

    scrollToElement: function scrollToElement(selector, timing) {
      var me = this;
      var el = typeof selector === 'string' ? me.scroller.querySelector(selector) : selector;
      if (el instanceof HTMLElement) {
        var p = utils.computePosition(el, me.scroller);
        var t = utils.computeTranslate(el, me.scroller);
        var x = -(p.left + t.x);
        var y = -(p.top + t.y);
        return me.scrollTo(x, y, timing);
      }
    },

    _endAction: function _endAction() {
      var me = this;
      me._s.endX = me.x;
      me._s.endY = me.y;
      me.moving = false;

      if (me.options.scrollBarFade && !me.fading) {
        me.fading = true;
        if (me.scrollBarX) me._fade(me.scrollBarX, 2000);
        if (me.scrollBarY) me._fade(me.scrollBarY, 2000);
      }
      me._execEvent('scrollEnd');
    },

    _stepBounce: function _stepBounce() {
      var me = this;

      me.bouncing = false;

      function over() {
        me.scrollTo(me.x, me.y, 300);
      }

      if (me.s === 'scrollY') {
        if (me.directionY === 1) {
          me.scrollTo(me.x, me.minScrollY + 15, 100, true, over);
          me.y = me.minScrollY;
        } else {
          me.scrollTo(me.x, me.maxScrollY - 15, 100, true, over);
          me.y = me.maxScrollY;
        }
      } else if (me.s === 'scrollX') {
        if (me.directionX === 1) {
          me.scrollTo(me.minScrollX + 15, me.y, 100, true, over);
          me.x = me.minScrollX;
        } else {
          me.scrollTo(me.maxScrollX - 15, me.y, 100, true, over);
          me.x = me.maxScrollX;
        }
      }
    },

    _x: function _x(p) {
      var me = this;
      var n = me.directionX * p;
      if (!isNaN(n)) {
        me.x = me.x + n;

        if (me.x >= me.minScrollX || me.x <= me.maxScrollX) {
          me.moving = false;
          if (me.options.bounce) {
            me.bouncing = true;
          }
        }
      }
    },

    _y: function _y(p) {
      var me = this;
      var n = me.directionY * p;
      if (!isNaN(n)) {
        me.y = me.y + n;

        if (me.y >= me.minScrollY || me.y <= me.maxScrollY) {
          me.moving = false;
          if (me.options.bounce) {
            me.bouncing = true;
          }
        }
      }
    },

    _xy: function _xy(p) {
      var me = this;
      var x = Math.round(me.cosX * p);
      var y = Math.round(me.cosY * p);
      if (!isNaN(x) && !isNaN(y)) {
        me.x = me.x + x;
        me.y = me.y + y;

        if ((me.x >= me.minScrollX || me.x <= me.maxScrollX) && (me.y >= me.minScrollY || me.y <= me.maxScrollY)) {
          me.moving = false;
        }
      }
    },

    _step: function _step(time) {
      var me = this;
      var now = Date.now();
      var t = now - time;
      var s = 0;

      if (me.bouncing) {
        me._stepBounce();
      }

      if (!me.moving) {
        me._endAction();
        return;
      }

      if (t > 10) {
        me.speed = me.speed - t * (me.speed > 1.2 ? 0.001 : me.speed > 0.6 ? 0.0008 : 0.0006);
        s = Math.round(me.speed * t);
        if (me.speed <= 0 || s <= 0) {
          me._endAction();
          return;
        }
        time = now;

        me._do(s);
        me.scrollTo(me.x, me.y, 0, false, null, true);
        me._execEvent('scroll');
      }

      rAF(me._step.bind(me, time));
    },

    _doScroll: function _doScroll(d, e) {
      var me = this;
      var pageY;
      me.distance = d;
      if (me.options.bounce) {
        me.x = me._compute(me.x, me.minScrollX, me.maxScrollX);
        me.y = me._compute(me.y, me.minScrollY, me.maxScrollY);
      }
      me.scrollTo(me.x, me.y, 0, me.options.bounce, null, true, e.touches || [e]);
      me._execEvent('scroll', e);

      if (e && e.touches && me.options.edgeRelease) {
        pageY = e.touches[0].pageY;
        if (pageY <= 10 || pageY >= window.innerHeight - 10) {
          me._end(e);
        }
      }
    },

    _yTextarea: function _yTextarea(e) {
      var me = this;
      var target = e.target;
      if (target.tagName === 'TEXTAREA' && target.scrollHeight > target.clientHeight && (target.scrollTop === 0 && me.directionY === -1 || target.scrollTop === target.scrollHeight - target.clientHeight && me.directionY === 1)) {
        me._end(e, true);
        return false;
      }
      return true;
    },

    _start: function _start(e) {
      var me = this;
      var t = e.touches || [e];

      if (me.options.zoom && t.length > 1) {
        me.s = 'preZoom';
        me.scroller.style[utils.TFO] = '0 0';

        var c1 = Math.abs(t[0].pageX - t[1].pageX);
        var c2 = Math.abs(t[0].pageY - t[1].pageY);

        me._z.spacing = Math.sqrt(c1 * c1 + c2 * c2);
        me._z.startScale = me._z.scale;

        me.originX = (t[0].pageX - t[1].pageX) / 2 + t[1].pageX - (utils.computePosition(me.scroller, document.body).left + utils.computeTranslate(me.scroller, document.body).x);

        me.originY = (t[0].pageY - t[1].pageY) / 2 + t[1].pageY - (utils.computePosition(me.scroller, document.body).top + utils.computeTranslate(me.scroller, document.body).y);

        me._execEvent('zoomStart', e);
        return;
      }

      if (me.options.scrollBarFade) {
        me.fading = false;
        if (me.scrollBarX) me.scrollBarX.style.opacity = 1;
        if (me.scrollBarY) me.scrollBarY.style.opacity = 1;
      }

      if (me.options.scrollFree) {
        me._do = me._xy;
        me.s = 'scrollFree';
      } else if (me.options.scrollX && me.options.scrollY) {
        me.s = 'preScroll';
      } else if (!me.options.scrollX && me.options.scrollY) {
        me._do = me._y;
        me.s = 'scrollY';
      } else if (me.options.scrollX && !me.options.scrollY) {
        me._do = me._x;
        me.s = 'scrollX';
      } else {
        me.s = null;
        return;
      }

      me.distance = 0;
      me.lastMoveTime = me.startTime = Date.now();
      me._s.lastX = me.startPositionX = me._s.startX = t[0].pageX;
      me._s.lastY = me.startPositionY = me._s.startY = t[0].pageY;

      me._execEvent('scrollStart', e);
    },

    _move: function _move(e) {
      var me = this;
      var t = e.touches || [e];
      var now;
      var x;
      var y;
      var dx;
      var dy;
      var px;
      var py;
      var sqrtXY;
      var directionX = 1;
      var directionY = 1;

      if (me.s === 'preScroll' || me.s === 'scrollX' || me.s === 'scrollFree') {
        x = t[0].pageX;
      }
      if (me.s === 'preScroll' || me.s === 'scrollY' || me.s === 'scrollFree') {
        y = t[0].pageY;
      }

      dx = x - me._s.lastX;
      dy = y - me._s.lastY;

      me._s.lastX = x;
      me._s.lastY = y;

      directionX = dx >= 0 ? 1 : -1;
      directionY = dy >= 0 ? 1 : -1;

      now = Date.now();

      if (now - me.lastMoveTime > 200 || me.directionX !== directionX || me.directionY !== directionY) {
        me.startTime = now;
        me.startPositionX = x;
        me.startPositionY = y;
        me.directionX = directionX;
        me.directionY = directionY;
      }

      me.lastMoveTime = now;

      px = x - me.startPositionX;
      py = y - me.startPositionY;

      if (me.s === 'preScroll') {
        if (Math.abs(y - me._s.startY) >= Math.abs(x - me._s.startX)) {
          me._do = me._y;
          me.s = 'scrollY';
          return;
        }

        if (Math.abs(y - me._s.startY) < Math.abs(x - me._s.startX)) {
          me._do = me._x;
          me.s = 'scrollX';
          return;
        }
      }

      if (me.s === 'scrollY') {
        me.y = y - me._s.startY + me._s.endY;
        if (me._yTextarea(e)) {
          me._doScroll(py, e);
        }
        return;
      }

      if (me.s === 'scrollX') {
        me.x = x - me._s.startX + me._s.endX;
        me._doScroll(px, e);
        return;
      }

      if (me.s === 'scrollFree') {
        me.x = x - me._s.startX + me._s.endX;
        me.y = y - me._s.startY + me._s.endY;
        sqrtXY = Math.sqrt(px * px + py * py);
        me.cosX = px / sqrtXY;
        me.cosY = py / sqrtXY;
        me._doScroll(Math.sqrt(px * px + py * py), e);
        return;
      }

      if (me.s === 'preZoom') {
        var c1 = Math.abs(t[0].pageX - t[1].pageX);
        var c2 = Math.abs(t[0].pageY - t[1].pageY);
        var spacing = Math.sqrt(c1 * c1 + c2 * c2);
        var scale = spacing / me._z.spacing * me._z.startScale;
        var lastScale;

        if (scale < me.options.zoomMin) {
          scale = me.options.zoomMin;
        } else if (scale > me.options.zoomMax) {
          scale = me.options.zoomMax;
        }

        lastScale = scale / me._z.startScale;

        me.x = Math.round(me.originX - me.originX * lastScale + me._s.endX);
        me.y = Math.round(me.originY - me.originY * lastScale + me._s.endY);
        me._z.scale = scale;

        me._scrollTo(me.x, me.y);
        me._execEvent('zoom', e);

        return;
      }
    },

    _end: function _end(e, manual) {
      var me = this;
      var ex1;
      var ex2;
      var now = Date.now();
      var s1 = me.s === 'scrollY';
      var s2 = me.s === 'scrollX';
      var s3 = me.s === 'scrollFree';

      if (s1 || s2 || s3) {
        if (e.touches && e.touches.length && !manual) {
          return;
        }

        me._execEvent('touchEnd');
        JRoll.jrollActive = null;
        me.duration = now - me.startTime;

        ex1 = me.y > me.minScrollY || me.y < me.maxScrollY;
        ex2 = me.x > me.minScrollX || me.x < me.maxScrollX;

        if (s1 && ex1 || s2 && ex2 || s3 && (ex1 || ex2)) {
          me.scrollTo(me.x, me.y, 300)._endAction();
        } else if (me.options.momentum && me.duration < 200 && me.distance) {
          me.speed = Math.abs(me.distance / me.duration);
          me.speed = me.speed > 2 ? 2 : me.speed;
          me.moving = true;
          rAF(me._step.bind(me, now));
        } else {
          me._endAction();
        }
        return;
      }

      if (me.s === 'preZoom') {
        me._execEvent('touchEnd');
        JRoll.jrollActive = null;

        if (me._z.scale > me.options.zoomMax) {
          me._z.scale = me.options.zoomMax;
        } else if (me._z.scale < me.options.zoomMin) {
          me._z.scale = me.options.zoomMin;
        }

        me.refresh();

        me.scrollTo(me.x, me.y, me.options.zoomDuration);

        me._execEvent('zoomEnd');

        return;
      }
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JRoll;
  }
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return JRoll;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  window.JRoll = JRoll;
})(window, document, Math);

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(241),
  /* template */
  __webpack_require__(242),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _jroll = __webpack_require__(237);

var _jroll2 = _interopRequireDefault(_jroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            jroll: null
        };
    },

    components: {},
    mounted: function mounted() {
        var vm = this;
        var wrapperName = this.wrapperName ? "#" + this.wrapperName : '#wrapper';
        this.jroll = new _jroll2.default(wrapperName, {
            scrollY: vm.scrollY === undefined ? true : vm.scrollY,
            scrollX: vm.scrollX === undefined ? false : vm.scrollX,
            bounce: vm.bounce === undefined ? true : vm.bounce
        });
    },
    updated: function updated() {
        if (this.jroll) {
            this.jroll.refresh();

            if (this.genseetips && this.wrapperName) {
                var obj = document.querySelector("#" + this.wrapperName + "Scroller");

                this.jroll.y = -obj.clientHeight;
            }
        }
    },
    created: function created() {},

    computed: {},
    methods: {},
    destroyed: function destroyed() {},

    props: ['wrapperName', 'scrollY', 'scrollX', 'test', 'bounce', 'genseetips']
};

/***/ }),

/***/ 242:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-components-scroll-notList-JRoll"
  }, [_c('div', {
    attrs: {
      "id": _vm.wrapperName ? _vm.wrapperName : 'wrapper'
    }
  }, [_c('div', {
    attrs: {
      "id": _vm.wrapperName ? _vm.wrapperName + 'Scroller' : 'Scroller'
    }
  }, [_vm._t("default")], 2)])])
},staticRenderFns: []}

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "$color-blue:#26a2ff;$color-white:#fff;$color-grey:#d9d9d9;$border-color:#c8c8cd;$success-color:#4caf50;$error-color:#f44336;$warning-color:#ffc107;$cell-value-color:#888;$header-height:40px;$button-default-color:#656b79;$button-default-background-color:#f6f8fa;$button-default-plain-color:#5a5a5a;$button-default-box-shadow:0 0 1px #b8bbbf;$button-primary-color:#fff;$button-primary-background-color:#26a2ff;$button-danger-color:#fff;$button-danger-background-color:#ef4f4f;$tab-item-font-size:12px;$tabbar-background-color:#fafafa;$tabbar-tab-item-selected-color:$color-blue;$navbar-background-color:#fafafa;$tabbar-tab-item-selected-background-color:#eaeaea;$checklist-title-color:#888;$radio-title-color:#888;$z-index-normal:1;", ""]);

// exports


/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


if (false) {
  require('mint-ui/packages/font/style.css');
}

exports.default = {
  name: 'mt-cell',

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  computed: {
    href: function href() {
      var _this = this;

      if (this.to && !this.added && this.$router) {
        var resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(function () {
          _this.added = true;
          _this.$el.addEventListener('click', _this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick: function handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
};

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports
exports.i(__webpack_require__(257), "");

// module
exports.push([module.i, "@component-namespace mint{@component cell{background-color:$color-white;box-sizing:border-box;color:inherit;min-height:48px;display:block;overflow:hidden;position:relative;text-decoration:none;&:first-child{.mint-cell-wrapper{background-origin:border-box}}&:last-child{background-image:linear-gradient(0deg,$color-grey,$color-grey 50%,transparent 0);background-size:100% 1px;background-repeat:no-repeat;background-position:bottom}@descendent wrapper{background-image:linear-gradient(180deg,$color-grey,$color-grey 50%,transparent 0);background-size:120% 1px;background-repeat:no-repeat;background-position:0 0;background-origin:content-box;align-items:center;box-sizing:border-box;display:flex;font-size:16px;line-height:1;min-height:inherit;overflow:hidden;padding:0 10px;width:100%}@descendent mask{&:after{background-color:#000;content:\" \";opacity:0;position:absolute 0}&:active:after{opacity:.1}}@descendent text{vertical-align:middle}@descendent label{color:#888;display:block;font-size:12px;margin-top:6px}img{vertical-align:middle}@descendent title{flex:1}@descendent value{color:$cell-value-color;display:flex;align-items:center;@when link{margin-right:24px}}@descendent left{position:absolute;height:100%;left:0;transform:translate3d(-100%,0,0)}@descendent right{position:absolute;height:100%;right:0;top:0;transform:translate3d(100%,0,0)}@descendent allow-right::after{border:2px solid $border-color;border-bottom-width:0;border-left-width:0;content:\" \";position:absolute 50% 20px * *;size:5px;transform:translateY(-50%) rotate(45deg)}}}", ""]);

// exports


/***/ }),

/***/ 301:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(305)
}
var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(290),
  /* template */
  __webpack_require__(304),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 304:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('a', {
    staticClass: "mint-cell",
    attrs: {
      "href": _vm.href
    }
  }, [(_vm.isLink) ? _c('span', {
    staticClass: "mint-cell-mask"
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-left"
  }, [_vm._t("left")], 2), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-wrapper"
  }, [_c('div', {
    staticClass: "mint-cell-title"
  }, [_vm._t("icon", [(_vm.icon) ? _c('i', {
    staticClass: "mintui",
    class: 'mintui-' + _vm.icon
  }) : _vm._e()]), _vm._v(" "), _vm._t("title", [_c('span', {
    staticClass: "mint-cell-text",
    domProps: {
      "textContent": _vm._s(_vm.title)
    }
  }), _vm._v(" "), (_vm.label) ? _c('span', {
    staticClass: "mint-cell-label",
    domProps: {
      "textContent": _vm._s(_vm.label)
    }
  }) : _vm._e()])], 2), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-value",
    class: {
      'is-link': _vm.isLink
    }
  }, [_vm._t("default", [_c('span', {
    domProps: {
      "textContent": _vm._s(_vm.value)
    }
  })])], 2), _vm._v(" "), (_vm.isLink) ? _c('i', {
    staticClass: "mint-cell-allow-right"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "mint-cell-right"
  }, [_vm._t("right")], 2)])
},staticRenderFns: []}

/***/ }),

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(294);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(34)("0c08db4a", content, true);

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popup = __webpack_require__(556);

var _popup2 = _interopRequireDefault(_popup);

__webpack_require__(573);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'mt-actionsheet',

  mixins: [_popup2.default],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    cancelText: {
      type: String,
      default: '取消'
    },

    actions: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    return {
      currentValue: false
    };
  },


  watch: {
    currentValue: function currentValue(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.currentValue = val;
    }
  },

  methods: {
    itemClick: function itemClick(item, index) {
      if (item.method && typeof item.method === 'function') {
        item.method(item, index);
      }
      this.currentValue = false;
    }
  },

  mounted: function mounted() {
    if (this.value) {
      this.rendered = true;
      this.currentValue = true;
      this.open();
    }
  }
};

/***/ }),

/***/ 509:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _notListScroll = __webpack_require__(240);

var _notListScroll2 = _interopRequireDefault(_notListScroll);

var _cell = __webpack_require__(301);

var _cell2 = _interopRequireDefault(_cell);

var _actionsheet = __webpack_require__(578);

var _actionsheet2 = _interopRequireDefault(_actionsheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            sheetVisible: false,
            actions: []
        };
    },
    mounted: function mounted() {
        this.actions = [{
            name: '是否退出?',
            method: this.backToLogin
        }];
    },

    methods: {
        logoutButtonAction: function logoutButtonAction() {
            var _this = this;
            _this.sheetVisible = true;
        },
        backToLogin: function backToLogin() {
            this.$router.push('/');
        }
    },
    components: {
        MtActionsheet: _actionsheet2.default,
        MtCell: _cell2.default,
        notListScroll: _notListScroll2.default
    }
};

/***/ }),

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, ".v-modal-enter {\n  animation: v-modal-in .2s ease;\n}\n\n.v-modal-leave {\n  animation: v-modal-out .2s ease forwards;\n}\n\n@keyframes v-modal-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n  }\n}\n\n@keyframes v-modal-out {\n  0% {\n  }\n  100% {\n    opacity: 0;\n  }\n}\n\n.v-modal {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0.5;\n  background: #000;\n}\n", ""]);

// exports


/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)();
// imports


// module
exports.push([module.i, "@component-namespace mint{@component actionsheet{position:fixed;background:#e0e0e0;width:100%;text-align:center;bottom:0;left:50%;transform:translate3d(-50%,0,0);backface-visibility:hidden;transition:transform .3s ease-out;@descendent list{list-style:none;padding:0;margin:0}@descendent listitem{border-bottom:1px solid #e0e0e0}@descendent button,listitem{display:block;width:100%;height:45px;line-height:45px;font-size:18px;color:#333;background-color:#fff;&:active{background-color:#f0f0f0}}}}.actionsheet-float-enter,.actionsheet-float-leave-active{transform:translate3d(-50%,100%,0)}", ""]);

// exports


/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hasClass */
/* harmony export (immutable) */ __webpack_exports__["a"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeClass;
/* unused harmony export setStyle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* istanbul ignore next */



const isServer = __WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer;
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const ieVersion = isServer ? 0 : Number(document.documentMode);

/* istanbul ignore next */
const trim = function(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
/* istanbul ignore next */
const camelCase = function(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

/* istanbul ignore next */
const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
/* unused harmony export on */


/* istanbul ignore next */
const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
/* unused harmony export off */


/* istanbul ignore next */
const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
/* unused harmony export once */


/* istanbul ignore next */
function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

/* istanbul ignore next */
function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

/* istanbul ignore next */
function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

/* istanbul ignore next */
const getStyle = ieVersion < 9 ? function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'styleFloat';
  }
  try {
    switch (styleName) {
      case 'opacity':
        try {
          return element.filters.item('alpha').opacity / 100;
        } catch (e) {
          return 1.0;
        }
      default:
        return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
    }
  } catch (e) {
    return element.style[styleName];
  }
} : function(element, styleName) {
  if (isServer) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};
/* unused harmony export getStyle */


/* istanbul ignore next */
function setStyle(element, styleName, value) {
  if (!element || !styleName) return;

  if (typeof styleName === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity' && ieVersion < 9) {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};


/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
});;


/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_merge__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__ = __webpack_require__(557);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PopupManager", function() { return __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a"]; });




let idSeed = 1;
const transitions = [];

const hookTransition = (transition) => {
  if (transitions.indexOf(transition) !== -1) return;

  const getVueInstance = (element) => {
    let instance = element.__vue__;
    if (!instance) {
      const textNode = element.previousSibling;
      if (textNode.__vue__) {
        instance = textNode.__vue__;
      }
    }
    return instance;
  };

  __WEBPACK_IMPORTED_MODULE_0_vue__["default"].transition(transition, {
    afterEnter(el) {
      const instance = getVueInstance(el);

      if (instance) {
        instance.doAfterOpen && instance.doAfterOpen();
      }
    },
    afterLeave(el) {
      const instance = getVueInstance(el);

      if (instance) {
        instance.doAfterClose && instance.doAfterClose();
      }
    }
  });
};

let scrollBarWidth;
const getScrollBarWidth = () => {
  if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

const getDOM = function(dom) {
  if (dom.nodeType === 3) {
    dom = dom.nextElementSibling || dom.nextSibling;
    getDOM(dom);
  }
  return dom;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: ''
    },
    openDelay: {},
    closeDelay: {},
    zIndex: {},
    modal: {
      type: Boolean,
      default: false
    },
    modalFade: {
      type: Boolean,
      default: true
    },
    modalClass: {
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  created() {
    if (this.transition) {
      hookTransition(this.transition);
    }
  },

  beforeMount() {
    this._popupId = 'popup-' + idSeed++;
    __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].register(this._popupId, this);
  },

  beforeDestroy() {
    __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].deregister(this._popupId);
    __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
    if (this.modal && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
      document.body.style.overflow = this.bodyOverflow;
      document.body.style.paddingRight = this.bodyPaddingRight;
    }
    this.bodyOverflow = null;
    this.bodyPaddingRight = null;
  },

  data() {
    return {
      opened: false,
      bodyOverflow: null,
      bodyPaddingRight: null,
      rendered: false
    };
  },

  watch: {
    value(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          __WEBPACK_IMPORTED_MODULE_0_vue__["default"].nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open(options) {
      if (!this.rendered) {
        this.rendered = true;
        this.$emit('input', true);
      }

      const props = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_merge__["a" /* default */])({}, this, options, this.$props);

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.$isServer) return;
      if (this.willOpen && !this.willOpen()) return;
      if (this.opened) return;

      this._opening = true;

      // 使用 vue-popup 的组件，如果需要和父组件通信显示的状态，应该使用 value，它是一个 prop，
      // 这样在父组件中用 v-model 即可；否则可以使用 visible，它是一个 data
      this.visible = true;
      this.$emit('input', true);

      const dom = getDOM(this.$el);

      const modal = props.modal;

      const zIndex = props.zIndex;
      if (zIndex) {
        __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].zIndex = zIndex;
      }

      if (modal) {
        if (this._closing) {
          __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
          this._closing = false;
        }
        __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].openModal(this._popupId, __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].nextZIndex(), dom, props.modalClass, props.modalFade);
        if (props.lockScroll) {
          if (!this.bodyOverflow) {
            this.bodyPaddingRight = document.body.style.paddingRight;
            this.bodyOverflow = document.body.style.overflow;
          }
          scrollBarWidth = getScrollBarWidth();
          let bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
          if (scrollBarWidth > 0 && bodyHasOverflow) {
            document.body.style.paddingRight = scrollBarWidth + 'px';
          }
          document.body.style.overflow = 'hidden';
        }
      }

      if (getComputedStyle(dom).position === 'static') {
        dom.style.position = 'absolute';
      }

      dom.style.zIndex = __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].nextZIndex();
      this.opened = true;

      this.onOpen && this.onOpen();

      if (!this.transition) {
        this.doAfterOpen();
      }
    },

    doAfterOpen() {
      this._opening = false;
    },

    close() {
      if (this.willClose && !this.willClose()) return;

      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this.visible = false;
      this.$emit('input', false);
      this._closing = true;

      this.onClose && this.onClose();

      if (this.lockScroll) {
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
      }

      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    doAfterClose() {
      __WEBPACK_IMPORTED_MODULE_2_mint_ui_src_utils_popup_popup_manager__["a" /* default */].closeModal(this._popupId);
      this._closing = false;
    }
  }
});




/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__ = __webpack_require__(554);



let hasModal = false;

const getModal = function() {
  if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
  let modalDom = PopupManager.modalDom;
  if (modalDom) {
    hasModal = true;
  } else {
    hasModal = false;
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    modalDom.addEventListener('touchmove', function(event) {
      event.preventDefault();
      event.stopPropagation();
    });

    modalDom.addEventListener('click', function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

const instances = {};

const PopupManager = {
  zIndex: 2000,

  modalFade: true,

  getInstance: function(id) {
    return instances[id];
  },

  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  nextZIndex: function() {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function() {
    const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    const instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function(id, zIndex, dom, modalClass, modalFade) {
    if (__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer) return;
    if (!id || zIndex === undefined) return;
    this.modalFade = modalFade;

    const modalStack = this.modalStack;

    for (let i = 0, j = modalStack.length; i < j; i++) {
      const item = modalStack[i];
      if (item.id === id) {
        return;
      }
    }

    const modalDom = getModal();

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["a" /* addClass */])(modalDom, 'v-modal');
    if (this.modalFade && !hasModal) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["a" /* addClass */])(modalDom, 'v-modal-enter');
    }
    if (modalClass) {
      let classArr = modalClass.trim().split(/\s+/);
      classArr.forEach(item => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["a" /* addClass */])(modalDom, item));
    }
    setTimeout(() => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["b" /* removeClass */])(modalDom, 'v-modal-enter');
    }, 200);

    if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
      dom.parentNode.appendChild(modalDom);
    } else {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function(id) {
    const modalStack = this.modalStack;
    const modalDom = getModal();

    if (modalStack.length > 0) {
      const topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        if (topItem.modalClass) {
          let classArr = topItem.modalClass.trim().split(/\s+/);
          classArr.forEach(item => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["b" /* removeClass */])(modalDom, item));
        }

        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (let i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (this.modalFade) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["a" /* addClass */])(modalDom, 'v-modal-leave');
      }
      setTimeout(() => {
        if (modalStack.length === 0) {
          if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
          modalDom.style.display = 'none';
          PopupManager.modalDom = undefined;
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mint_ui_src_utils_dom__["b" /* removeClass */])(modalDom, 'v-modal-leave');
      }, 200);
    }
  }
};
!__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$isServer && window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) { // ESC
    if (PopupManager.modalStack.length > 0) {
      const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topItem) return;
      const instance = PopupManager.getInstance(topItem.id);
      if (instance.closeOnPressEscape) {
        instance.close();
      }
    }
  }
});

/* harmony default export */ __webpack_exports__["a"] = (PopupManager);


/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(527);
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
		module.hot.accept("!!../../../css-loader/index.js!./popup.css", function() {
			var newContent = require("!!../../../css-loader/index.js!./popup.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(650)
}
var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(471),
  /* template */
  __webpack_require__(649),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 647:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('not-list-scroll', {
    staticClass: "my-setting-page"
  }, [_c('mt-cell', {
    attrs: {
      "title": "修改密码",
      "isLink": "",
      "to": "changePassword"
    }
  }), _vm._v(" "), _c('mt-cell', {
    attrs: {
      "title": "二维码",
      "isLink": "",
      "to": "qrcode"
    }
  }), _vm._v(" "), _c('mt-cell', {
    attrs: {
      "title": "关于知学云",
      "isLink": "",
      "to": "about"
    }
  })], 1), _vm._v(" "), _c('mt-button', {
    staticClass: "logout-button",
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.logoutButtonAction
    }
  }, [_vm._v("退出登录")]), _vm._v(" "), _c('mt-actionsheet', {
    attrs: {
      "actions": _vm.actions,
      "cancelText": "取消"
    },
    model: {
      value: (_vm.sheetVisible),
      callback: function($$v) {
        _vm.sheetVisible = $$v
      },
      expression: "sheetVisible"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 649:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "actionsheet-float"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentValue),
      expression: "currentValue"
    }],
    staticClass: "mint-actionsheet"
  }, [_c('ul', {
    staticClass: "mint-actionsheet-list",
    style: ({
      'margin-bottom': _vm.cancelText ? '5px' : '0'
    })
  }, _vm._l((_vm.actions), function(item, index) {
    return _c('li', {
      staticClass: "mint-actionsheet-listitem",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.itemClick(item, index)
        }
      }
    }, [_vm._v(_vm._s(item.name))])
  })), _vm._v(" "), (_vm.cancelText) ? _c('a', {
    staticClass: "mint-actionsheet-button",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.currentValue = false
      }
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]) : _vm._e()])])
},staticRenderFns: []}

/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(530);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(34)("4b2378d8", content, true);

/***/ })

});