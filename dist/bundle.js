/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/resources/tile.html":
/*!*********************************!*\
  !*** ./src/resources/tile.html ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = `<div style="font-size: 11.5px; padding-bottom: 6px;" class="muted" id="gradeChanges"></div>
<div id="gpa"></div>
`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./src/resources/greenArrow.min.svg":
/*!******************************************!*\
  !*** ./src/resources/greenArrow.min.svg ***!
  \******************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27.777 36.514' version='1.0'%3e%3cdefs%3e%3clinearGradient id='prefix__a' x1='-155.74' gradientUnits='userSpaceOnUse' y1='558.8' gradientTransform='matrix(0 -1.6732 1.1476 0 -269.01 -124.96)' x2='-171.94' y2='541.27'%3e%3cstop stop-color='%2380ff26' offset='0'/%3e%3cstop stop-color='%232c9600' offset='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath stroke-linejoin='round' d='M348.77 146.39h5.34v20.89h15.3v-20.89h5.38l-13.03-13.87-12.99 13.87z' stroke='%23116b1c' stroke-width='1.75' fill='url(%23prefix__a)' color='%23000' transform='translate(-347.89 -131.64)'/%3e%3c/svg%3e"

/***/ }),

/***/ "./src/resources/redArrow.min.svg":
/*!****************************************!*\
  !*** ./src/resources/redArrow.min.svg ***!
  \****************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27.777 36.514' version='1.0'%3e%3cdefs%3e%3clinearGradient id='prefix__a' x1='155.51' gradientUnits='userSpaceOnUse' y1='-459.75' gradientTransform='matrix(0 1.6732 -1.1476 0 -237.29 -184.28)' x2='173.43' y2='-440.71'%3e%3cstop stop-color='%23ff2a26' offset='0'/%3e%3cstop stop-color='%2396000d' offset='1'/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath stroke-linejoin='round' d='M292.55 94.867h-5.35V73.971h-15.29v20.896h-5.38l13.03 13.873 12.99-13.873z' stroke='%236b1a11' stroke-width='1.75' fill='url(%23prefix__a)' color='%23000' transform='translate(-265.65 -73.096)'/%3e%3c/svg%3e"

/***/ }),

/***/ "./src/calcChanges.ts":
/*!****************************!*\
  !*** ./src/calcChanges.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcChanges: () => (/* binding */ calcChanges)
/* harmony export */ });
/* harmony import */ var _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/lsWrapper */ "./src/helpers/lsWrapper.ts");

var calcChanges = function (currentGrades) {
    var oldGrades = new _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_0__.LocalStorageWrapper("oldGrades", []);
    var changes = [];
    var _loop_1 = function (currentClass) {
        var oldClass = oldGrades.value.find(function (_a) {
            var classTitle = _a.classTitle;
            return classTitle === currentClass.classTitle;
        });
        if (oldClass !== undefined && oldClass.grade !== currentClass.grade) {
            changes.push({
                classTitle: currentClass.classTitle,
                newGrade: currentClass.grade,
                oldGrade: oldClass.grade,
            });
        }
    };
    for (var _i = 0, currentGrades_1 = currentGrades; _i < currentGrades_1.length; _i++) {
        var currentClass = currentGrades_1[_i];
        _loop_1(currentClass);
    }
    oldGrades.set(currentGrades);
    return changes;
};


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_GRADE: () => (/* binding */ DEFAULT_GRADE),
/* harmony export */   WAIT_FOR_ELEMENT_DELAY: () => (/* binding */ WAIT_FOR_ELEMENT_DELAY)
/* harmony export */ });
// the grade to assume when there are no points for a class
var DEFAULT_GRADE = 100;
// ms
var WAIT_FOR_ELEMENT_DELAY = 100;


/***/ }),

/***/ "./src/contentLoader.ts":
/*!******************************!*\
  !*** ./src/contentLoader.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentLoader: () => (/* binding */ contentLoader),
/* harmony export */   reload: () => (/* binding */ reload)
/* harmony export */ });
/* harmony import */ var _helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/jQueryHelpers */ "./src/helpers/jQueryHelpers.ts");
/* harmony import */ var _resources_tile_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/tile.html */ "./src/resources/tile.html");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var waitForPageLoad = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_0__.waitForElement)(".muted")];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_0__.waitForElement)(".ch.col-md-4")];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_0__.waitForElement)(".showGrade")];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var loadHTML = function () {
    (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_0__.getFirstElementSafe)("#performanceCollapse > div.bb-tile-content-section").insertAdjacentHTML("beforeend", _resources_tile_html__WEBPACK_IMPORTED_MODULE_1__["default"]);
};
var contentLoader = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForPageLoad()];
            case 1:
                _a.sent();
                loadHTML();
                return [2 /*return*/];
        }
    });
}); };
var reload = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, waitForPageLoad()];
            case 1:
                _a.sent();
                loadHTML();
                return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/extractData.ts":
/*!****************************!*\
  !*** ./src/extractData.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   extractData: () => (/* binding */ extractData)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");

var extractData = function () {
    return $("#coursesContainer > .row")
        .map(function (_, row) {
        var _a;
        return ({
            classTitle: (_a = $(row).find("a > h3").text().split(" -")[0]) !== null && _a !== void 0 ? _a : "",
            grade: Number.parseFloat($(row)
                .find("h3.showGrade")
                .text()
                .trim()
                .replaceAll(/[%-]/g, "")),
        });
    })
        .toArray()
        .filter(function (c) { return !isNaN(c.grade); });
};


/***/ }),

/***/ "./src/gpaCalc.ts":
/*!************************!*\
  !*** ./src/gpaCalc.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gpaCalc: () => (/* binding */ gpaCalc),
/* harmony export */   isWeightedClass: () => (/* binding */ isWeightedClass)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils.ts");
/* harmony import */ var _resources_gpaMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/gpaMap */ "./src/resources/gpaMap.ts");


var isWeightedClass = function (classTitle) {
    return classTitle.endsWith("-H");
};
var gpaCalc = function (currentGrades, weighted) {
    if (weighted === void 0) { weighted = true; }
    return currentGrades.reduce(function (accumulator, currentValue) {
        var _a;
        return accumulator +
            (((_a = _resources_gpaMap__WEBPACK_IMPORTED_MODULE_1__.gpaMap[(0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(Math.floor(currentValue.grade), 70, 99)]) !== null && _a !== void 0 ? _a : 0) +
                (weighted && isWeightedClass(currentValue.classTitle) ? 1 : 0));
    }, 0) / currentGrades.length;
};


/***/ }),

/***/ "./src/helpers/jQueryHelpers.ts":
/*!**************************************!*\
  !*** ./src/helpers/jQueryHelpers.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkJQuery: () => (/* binding */ checkJQuery),
/* harmony export */   getFirstElementSafe: () => (/* binding */ getFirstElementSafe),
/* harmony export */   waitForElement: () => (/* binding */ waitForElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var checkJQuery = function () {
    if (typeof jQuery === "undefined")
        throw new _utils__WEBPACK_IMPORTED_MODULE_1__.AlertPanic("This script is only meant to run on mySFHS.");
};
jQuery.fn.exists = function () {
    return this.length > 0;
};
function waitForElement(selector) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!$(selector).exists()) return [3 /*break*/, 2];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, _config__WEBPACK_IMPORTED_MODULE_0__.WAIT_FOR_ELEMENT_DELAY); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function getFirstElementSafe(selector) {
    var el = $(selector)[0];
    if (el === undefined)
        throw new _utils__WEBPACK_IMPORTED_MODULE_1__.AlertPanic("Couldn't find element ".concat(selector));
    return el;
}


/***/ }),

/***/ "./src/helpers/lsWrapper.ts":
/*!**********************************!*\
  !*** ./src/helpers/lsWrapper.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalStorageWrapper: () => (/* binding */ LocalStorageWrapper)
/* harmony export */ });
var LocalStorageWrapper = /** @class */ (function () {
    function LocalStorageWrapper(location, defaultValue) {
        this.location = location;
        var currentValue = localStorage.getItem(location);
        if (currentValue === null) {
            localStorage.setItem(location, JSON.stringify(defaultValue));
            this.value = defaultValue;
            return;
        }
        this.value = JSON.parse(currentValue);
    }
    LocalStorageWrapper.prototype.set = function (newValue) {
        localStorage.setItem(this.location, JSON.stringify(newValue));
        this.value = newValue;
    };
    return LocalStorageWrapper;
}());



/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlertPanic: () => (/* binding */ AlertPanic),
/* harmony export */   clamp: () => (/* binding */ clamp),
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   formatDuration: () => (/* binding */ formatDuration)
/* harmony export */ });
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AlertPanic = /** @class */ (function (_super) {
    __extends(AlertPanic, _super);
    function AlertPanic(message) {
        var _this = _super.call(this, message) || this;
        alert("OCP: Something has gone wrong. See the developer console for more information.");
        return _this;
    }
    return AlertPanic;
}(Error));

var OCPDebug = "development" === "development";
var debug = function (message) {
    if (OCPDebug)
        console.log(message);
};
var formatResult = function (value, unit, includeAgo) {
    if (includeAgo === void 0) { includeAgo = true; }
    return "".concat(Math.round(value), " ").concat(unit).concat(value === 1 ? "" : "s").concat(includeAgo ? " ago" : "");
};
var formatDuration = function (minutes) {
    if (minutes < 1) {
        return "less than a minute ago";
    }
    else if (minutes < 60) {
        return formatResult(minutes, "minute");
    }
    else if (minutes % 60 === 0) {
        return formatResult(minutes / 60, "hour");
    }
    else {
        return "".concat(formatResult((minutes - (minutes % 60)) / 60, "hour", false), " and ").concat(formatResult(minutes % 60, "minute"));
    }
};
var clamp = function (num, min, max) {
    return Math.max(min, Math.min(num, max));
};


/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contentLoader */ "./src/contentLoader.ts");
/* harmony import */ var _helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/jQueryHelpers */ "./src/helpers/jQueryHelpers.ts");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils.ts");



var domainChecker = function () {
    if (!window.location.href.includes("myschoolapp.com") &&
        !confirm("This script is only meant to run on mySFHS. Do you want to continue?"))
        throw new _helpers_utils__WEBPACK_IMPORTED_MODULE_2__.AlertPanic("Script canceled by user.");
};
var goToProgress = function () {
    window.location.hash = "#studentmyday/progress";
    // whenever the user goes to a new page, load the content again. Important
    // to put this after setting the hash for the first time
    $(window).on("hashchange", function () {
        if (window.location.hash === "#studentmyday/progress") {
            void (0,_contentLoader__WEBPACK_IMPORTED_MODULE_0__.reload)();
        }
    });
};
var init = function () {
    (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_1__.checkJQuery)();
    domainChecker();
    goToProgress();
};


/***/ }),

/***/ "./src/renderChanges.ts":
/*!******************************!*\
  !*** ./src/renderChanges.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderChanges: () => (/* binding */ renderChanges)
/* harmony export */ });
/* harmony import */ var _resources_greenArrow_min_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resources/greenArrow.min.svg */ "./src/resources/greenArrow.min.svg");
/* harmony import */ var _resources_greenArrow_min_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_resources_greenArrow_min_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _resources_redArrow_min_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/redArrow.min.svg */ "./src/resources/redArrow.min.svg");
/* harmony import */ var _resources_redArrow_min_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_resources_redArrow_min_svg__WEBPACK_IMPORTED_MODULE_1__);


var getArrow = function (change) {
    return change.newGrade < change.oldGrade ? (_resources_redArrow_min_svg__WEBPACK_IMPORTED_MODULE_1___default()) : (_resources_greenArrow_min_svg__WEBPACK_IMPORTED_MODULE_0___default());
};
var formatPercentage = function (percentage) {
    return "".concat(percentage.toFixed(2), "%");
};
var generateText = function (change) {
    return "".concat(change.classTitle, " used to be <b>").concat(formatPercentage(change.oldGrade), "</b>, now it's <b>").concat(formatPercentage(change.newGrade), "</b>");
};
var renderChanges = function (changes) {
    var parent = $("#gradeChanges");
    if (changes.length === 0) {
        parent.text("Your grades are the same as the last time you checked.");
        return;
    }
    for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
        var change = changes_1[_i];
        var changeDiv = $("<div>").css({ "margin-bottom": "5px" });
        var arrow = $("<img>")
            .attr("src", getArrow(change))
            .attr("width", 14)
            .css({ "margin-right": "2px" });
        var text = $("<span>").html(generateText(change));
        changeDiv.append(arrow, text);
        parent.append(changeDiv);
    }
};


/***/ }),

/***/ "./src/resources/gpaMap.ts":
/*!*********************************!*\
  !*** ./src/resources/gpaMap.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gpaMap: () => (/* binding */ gpaMap)
/* harmony export */ });
var gpaMap = {
    99: 4.86,
    98: 4.71,
    97: 4.57,
    96: 4.43,
    95: 4.29,
    94: 4.14,
    93: 4,
    92: 3.88,
    91: 3.75,
    90: 3.63,
    89: 3.5,
    88: 3.38,
    87: 3.25,
    86: 3.13,
    85: 3,
    84: 2.89,
    83: 2.78,
    82: 2.67,
    81: 2.56,
    80: 2.44,
    79: 2.33,
    78: 2.22,
    77: 2.11,
    76: 2,
    75: 1.83,
    74: 1.66,
    73: 1.5,
    72: 1.33,
    71: 1.16,
    70: 1,
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calcChanges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcChanges */ "./src/calcChanges.ts");
/* harmony import */ var _contentLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contentLoader */ "./src/contentLoader.ts");
/* harmony import */ var _extractData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./extractData */ "./src/extractData.ts");
/* harmony import */ var _gpaCalc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gpaCalc */ "./src/gpaCalc.ts");
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./init */ "./src/init.ts");
/* harmony import */ var _renderChanges__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./renderChanges */ "./src/renderChanges.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






void (function () { return __awaiter(void 0, void 0, void 0, function () {
    var currentGrades, changes, gpa;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0,_init__WEBPACK_IMPORTED_MODULE_4__.init)();
                return [4 /*yield*/, (0,_contentLoader__WEBPACK_IMPORTED_MODULE_1__.contentLoader)()];
            case 1:
                _a.sent();
                currentGrades = (0,_extractData__WEBPACK_IMPORTED_MODULE_2__.extractData)();
                changes = (0,_calcChanges__WEBPACK_IMPORTED_MODULE_0__.calcChanges)(currentGrades);
                gpa = (0,_gpaCalc__WEBPACK_IMPORTED_MODULE_3__.gpaCalc)(currentGrades);
                $("#gpa").text("GPA: " + gpa.toFixed(2));
                (0,_renderChanges__WEBPACK_IMPORTED_MODULE_5__.renderChanges)(changes);
                console.log("done");
                return [2 /*return*/];
        }
    });
}); })();

})();

/******/ })()
;