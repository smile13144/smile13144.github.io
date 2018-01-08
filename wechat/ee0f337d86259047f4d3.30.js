webpackJsonp([30],{

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(70)(
  /* script */
  __webpack_require__(487),
  /* template */
  __webpack_require__(646),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(72);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(238);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(71);

var _vue = __webpack_require__(4);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(78);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            subjectNumArr: ['一、', '二、', '三、', '四、'],
            questionsId: [],
            questionsLength: '',
            show: true,
            answerPaperInfo: '',
            correct: true };
    },
    mounted: function mounted() {
        var _this = this;

        if (this.examStore.examTabIndex === 1 && this.$route.params.modeType == 'simExam_0') {
            this.viewSimExamResult({ 'r_id': this.$route.params.examId }).then(function (datas) {
                _this.commonSubmit(datas);
            });
        } else if (this.examStore.examTabIndex === 0 && this.$route.params.modeType == 'exam_0') {
                this.viewExamResult({ 'e_id': this.$route.params.examId }).then(function (datas) {
                    _this.commonSubmit(datas);
                });
            } else if (this.$route.params.modeType == 'exam_c') {
                    this.courseExamResultView({ 'r_id': this.$route.params.examId }).then(function (datas) {
                        _this.commonSubmit(datas);
                    });
                } else if (this.$route.params.modeType == 'exam_t') {
                        this.trainExamResultView({ 'e_id': this.$route.params.examId }).then(function (datas) {
                            _this.commonSubmit(datas);
                        });
                    }
    },

    computed: (0, _extends3.default)({}, (0, _vuex.mapState)(['examStore']), {
        checkAnswer: function checkAnswer() {
            if (this.examStore.questionStatusMap[this.examStore.questions[this.examStore.questionNum - 1].id] == 0) {
                return '呃，答错了';
                this.correct = false;
            } else {
                return '不错哟，答对了！';
                this.correct = true;
            }
        }
    }),
    filters: {
        exchange: function exchange(val) {
            if (val == 1) {
                return "单选";
            } else if (val == 2) {
                return "多选";
            } else if (val == 3) {
                return "判断";
            } else if (val == 5) {
                return "问答";
            }
        },
        changeTF: function changeTF(val) {
            if (val == "1") {
                return "对";
            } else if (val == "0") {
                return "错";
            }
        }
    },
    methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['checkStart', 'viewSimExamResult', 'commonSubmit', 'viewExamResult', 'courseExamResultView']), {
        viewResult: function viewResult(item, i) {
            this.show = !this.show;
            this.examStore.questionNum = this.calculate(item, i);
        },
        calculate: function calculate(item, i) {
            if (i == 0) {
                return item;
            } else if (i == 1) {
                return item + this.examStore.typeMap[1].questions.length;
            } else if (i == 2) {
                return item + this.examStore.typeMap[1].questions.length + this.examStore.typeMap[2].questions.length;
            } else if (i == 3) {
                return item + this.examStore.typeMap[1].questions.length + this.examStore.typeMap[2].questions.length + this.examStore.typeMap[3].questions.length;
            }
        },
        questionClassCheck: function questionClassCheck(index, id) {
            var questions = this.examStore.typeMap[this.examStore.typeIds[index]].questions;
            var questionsYesObject = {};
            if (this.examStore.questionScoreMap[id] == undefined) {
                return 'bg-wrong';
            } else if (this.examStore.questionScoreMap[id] >= 1) {
                return 'bg-right';
            } else if (this.examStore.questionScoreMap[id] == 0) {
                return 'bg-wrong';
            }
        },
        goBack: function goBack() {
            if (this.$route.params.check == '-1') {
                history.go(-1);
            } else if (this.$route.params.check == 'confirm') {
                history.go(-2);
            }
        },
        spreadQuestion: function spreadQuestion() {
            this.show = !this.show;
            console.log(this.examStore.questionNum);
        },
        essayQuestion: function essayQuestion() {
            return this.examStore.answerMap[this.examStore.questions[this.examStore.questionNum - 1].id];
        },
        lastQuestion: function lastQuestion() {
            this.$store.dispatch('cutNum', this.choosedId);
        },
        nextQuestion: function nextQuestion() {
            this.$store.dispatch('addNum', this.choosedId);
        },

        chooseType: function chooseType(type) {
            switch (type) {
                case 0:
                    return 'A';
                case 1:
                    return 'B';
                case 2:
                    return 'C';
                case 3:
                    return 'D';
            }
        },
        checkResultClass: function checkResultClass(optionId) {
            if (this.examStore.answerMap[this.examStore.questions[this.examStore.questionNum - 1].id].indexOf(optionId) >= 0) {
                return 'has-choosed';
            }
        },
        checkResultClassText: function checkResultClassText(optionId) {
            if (this.examStore.answerMap[this.examStore.questions[this.examStore.questionNum - 1].id].indexOf(optionId) >= 0) {
                return 'has-choosed-text';
            }
        }
    })
};

/***/ }),

/***/ 646:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view-exam-result-page"
  }, [_c('div', {
    staticClass: "result-page-top-bar"
  }, [_c('div', {
    staticClass: "top-bar-back",
    on: {
      "click": _vm.goBack
    }
  }, [_c('span', {
    staticClass: "icon icon-arrow-left font-css",
    attrs: {
      "slot": "icon"
    },
    slot: "icon"
  })]), _vm._v(" "), _c('div', {
    staticClass: "top-bar-title"
  }, [_vm._v("考试成绩")]), _vm._v(" "), _c('div', {
    staticClass: "bar-right-exam-list",
    on: {
      "click": _vm.spreadQuestion
    }
  }, [_c('span', {
    staticClass: "icon icon-shitiliebiao font-css",
    attrs: {
      "slot": "icon"
    },
    slot: "icon"
  }), _vm._v(" "), _c('span', {
    staticClass: "bar-right-item-title"
  }, [_vm._v(_vm._s(_vm.examStore.questionNum) + "/" + _vm._s(_vm.examStore.paper.questionNum))])])]), _vm._v(" "), (_vm.show) ? _c('div', [_c('div', {
    staticClass: "view-result"
  }, [_c('div', {
    staticClass: "result-head"
  }, [_c('div', {
    staticClass: "result-title"
  }, [_vm._v("\n                    " + _vm._s(_vm.examStore.examScoreAnalysisDto.examName) + "\n                ")]), _vm._v(" "), _c('div', {
    staticClass: "result-body"
  }, [_c('div', {
    staticClass: "body-left"
  }, [_c('span', [_vm._v(_vm._s(_vm.examStore.examScoreAnalysisDto.stuScore) + "分")])]), _vm._v(" "), _c('div', {
    staticClass: "body-right"
  }, [_c('p', [_vm._v("试卷总分："), _c('span', {
    staticClass: "body-score"
  }, [_vm._v(_vm._s(_vm.examStore.examScoreAnalysisDto.paperScore))]), _vm._v("分")]), _vm._v(" "), _c('p', [_vm._v("正确："), _c('span', {
    staticClass: "right-num"
  }, [_vm._v(_vm._s(_vm.examStore.rightQuestionNum))]), _vm._v("道")]), _vm._v(" "), _c('p', [_vm._v("错误："), _c('span', {
    staticClass: "wrong-num"
  }, [_vm._v(_vm._s(_vm.examStore.wrongQuestionNum))]), _vm._v("道")]), _vm._v(" "), _c('p', [_vm._v("放弃："), _c('span', {
    staticClass: "abandon-num"
  }, [_vm._v(_vm._s(_vm.examStore.paper.questionNum - _vm.examStore.answerCount))]), _vm._v("道")])])])]), _vm._v(" "), _c('div', {
    staticClass: "result-bottom"
  }, _vm._l((_vm.examStore.typeIds.length), function(d, index) {
    return _c('div', {
      key: index
    }, [_c('div', {
      staticClass: "question-num"
    }, [_c('span', [_vm._v(_vm._s(_vm.subjectNumArr[index]))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("exchange")(_vm.examStore.typeIds[index])))])]), _vm._v(" "), _c('div', {
      staticClass: "question-num-info"
    }, _vm._l((_vm.examStore.typeMap[_vm.examStore.typeIds[index]].questions.length), function(d, insideIndex) {
      return _c('span', {
        key: insideIndex,
        staticClass: "question-num-info-btn",
        class: _vm.questionClassCheck(index, _vm.examStore.typeMap[_vm.examStore.typeIds[index]].questions[insideIndex].id)
      }, [_c('span', {
        on: {
          "click": function($event) {
            _vm.viewResult(d, index)
          }
        }
      }, [_vm._v(_vm._s(_vm.calculate(d, index)))])])
    }))])
  }))])]) : _c('div', {
    staticClass: "view-expan-question"
  }, [_c('header', {
    staticClass: "view-question-header"
  }, [_c('span', {
    staticClass: "view-question-type"
  }, [_vm._v(_vm._s(_vm._f("exchange")(_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId)))]), _vm._v(" "), _c('span', {
    staticClass: "question-content",
    domProps: {
      "innerHTML": _vm._s(_vm.examStore.questions[_vm.examStore.questionNum - 1].content)
    }
  }), _vm._v(" "), _c('span', [_vm._v("(" + _vm._s(_vm.examStore.questions[_vm.examStore.questionNum - 1].score.toFixed(1)) + "分)")])]), _vm._v(" "), _c('div', {
    staticClass: "view-questions-page-control"
  }, [(_vm.examStore.questionNum <= _vm.examStore.questions.length) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.examStore.questionNum !== 1),
      expression: "examStore.questionNum!==1"
    }],
    staticClass: "view-last-question",
    on: {
      "click": _vm.lastQuestion
    }
  }, [_c('div', {
    staticClass: "arrow"
  })]) : _vm._e(), _vm._v(" "), (_vm.examStore.questionNum < _vm.examStore.questions.length) ? _c('div', {
    staticClass: "view-next-question",
    on: {
      "click": _vm.nextQuestion
    }
  }, [_c('div', {
    staticClass: "arrow"
  })]) : _vm._e()]), _vm._v(" "), (_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 1 || _vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 2 || _vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 3) ? _c('div', [_c('ul', {
    staticClass: "questions-list"
  }, _vm._l((_vm.examStore.questions[_vm.examStore.questionNum - 1].options), function(item, index) {
    return _c('li', {
      key: index
    }, [_c('span', {
      staticClass: "option-style",
      class: _vm.checkResultClass(item.id)
    }, [_vm._v(_vm._s(_vm.chooseType(index)))]), _vm._v(" "), (_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 3) ? _c('span', {
      staticClass: "option-detail",
      class: _vm.checkResultClassText(item.id)
    }, [_vm._v(_vm._s(_vm._f("changeTF")(item.optionContent)))]) : _c('span', {
      staticClass: "option-detail",
      class: _vm.checkResultClassText(item.id),
      domProps: {
        "innerHTML": _vm._s(item.optionContent)
      }
    })])
  }))]) : _vm._e(), _vm._v(" "), (_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 5) ? _c('div', {
    staticClass: "essay"
  }, [_c('textarea', {
    staticClass: "essay-qustion",
    domProps: {
      "innerHTML": _vm._s(_vm.essayQuestion())
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 5) ? _c('div', {
    staticClass: "essay-footer"
  }, [_c('p', [_c('span', [_vm._v("得分")]), _vm._v("："), _c('span', [_vm._v(_vm._s(_vm.examStore.questionScoreMap[_vm.examStore.questions[_vm.examStore.questionNum - 1].id]) + "分")])]), _vm._v(" "), _c('p', [_c('span', [_vm._v("标准答案：")]), _c('span', [_vm._v(_vm._s(_vm.examStore.questions[_vm.examStore.questionNum - 1].options[0].optionContent))])])]) : _vm._e(), _vm._v(" "), (_vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 1 || _vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 2 || _vm.examStore.questions[_vm.examStore.questionNum - 1].typeId == 3) ? _c('footer', {
    staticClass: "view-footer",
    class: _vm.examStore.questionStatusMap[_vm.examStore.questions[_vm.examStore.questionNum - 1].id] == 1 ? 'view-footer-true' : 'view-footer-false'
  }, [(_vm.examStore.viewResultStyle == 3 || _vm.examStore.examTabIndex === 1) ? _c('p', [_c('span', [_vm._v("标准答案：")]), _vm._v(" "), _vm._l((_vm.examStore.questions[_vm.examStore.questionNum - 1].answer), function(d, index) {
    return _c('span', {
      key: index
    }, [_vm._v(_vm._s(_vm.chooseType(d)))])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.examStore.viewResultStyle == 2 && _vm.examStore.examTabIndex === 0) ? _c('p', [_c('span', [_vm._v("本题得分：" + _vm._s(_vm.examStore.questionScoreMap[_vm.examStore.questions[_vm.examStore.questionNum - 1].id]) + "分")])]) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "view-footer-text"
  }, [_vm._v(_vm._s(_vm.checkAnswer))])]) : _vm._e()])])
},staticRenderFns: []}

/***/ })

});