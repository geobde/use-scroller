"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useScroller;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useScroller(moreContent) {
  var initialPagination = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var _useState = (0, _react.useState)(initialPagination),
      _useState2 = _slicedToArray(_useState, 2),
      page = _useState2[0],
      setPage = _useState2[1];

  var containerRef = (0, _react.useRef)();
  var loaderRef = (0, _react.useRef)();
  var chart = {
    prevY: -1,
    previousRatio: -1,
    bottomLine: false,
    observerOptions: {
      root: containerRef.current,
      threshold: 1.0
    },
    callback: function callback(entries) {
      entries.forEach(function (_ref) {
        var isIntersecting = _ref.isIntersecting,
            intersectionRatio = _ref.intersectionRatio,
            _ref$boundingClientRe = _ref.boundingClientRect,
            boundingClientRect = _ref$boundingClientRe === void 0 ? {} : _ref$boundingClientRe;
        var y = boundingClientRect.y;

        if (isIntersecting && intersectionRatio >= chart.previousRatio && (!chart.prevY || y < chart.prevY)) {
          setPage(function (page) {
            return page + 1;
          });
        }

        chart.prevY = y;
        chart.previousRatio = intersectionRatio;
      });
    }
  };
  (0, _react.useLayoutEffect)(function () {
    if (!containerRef.current || !loaderRef.current || !moreContent) {
      return;
    }

    ;
    var observer = new IntersectionObserver(chart.callback, chart.observerOptions);
    observer.observe(loaderRef.current);
    return function () {
      return observer.disconnect();
    };
  }, [moreContent]);
  return [page, loaderRef, containerRef];
}

;