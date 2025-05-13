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

const DEFAULT_LS_DATA = {
    old: { courses: [], timestamp: undefined },
    prev: { courses: [], timestamp: undefined },
};
const compare = (a, b) => {
    const changes = [];
    for (const currentCourse of a) {
        const oldCourse = b.find(({ title }) => title === currentCourse.title);
        if (oldCourse !== undefined &&
            oldCourse.grade !== currentCourse.grade) {
            changes.push({
                title: currentCourse.title,
                newGrade: currentCourse.grade,
                oldGrade: oldCourse.grade,
            });
        }
    }
    return changes;
};
const calcChanges = (currentCourses) => {
    var _a;
    const oldCourses = new _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_0__.LSWrapper("oldGrades", DEFAULT_LS_DATA);
    const now = Date.now();
    const { value: { prev, old }, } = oldCourses;
    if (now - ((_a = prev.timestamp) !== null && _a !== void 0 ? _a : 0) > 1000 * 60 * 10) {
        const changes = compare(currentCourses, prev.courses);
        oldCourses.set({
            prev: { courses: currentCourses, timestamp: now },
            old: prev,
        });
        return {
            changes,
            now,
            timeSaved: prev.timestamp,
        };
    }
    else {
        const changes = compare(currentCourses, old.courses);
        oldCourses.set({
            prev: { courses: currentCourses, timestamp: now },
            old,
        });
        return {
            changes,
            now,
            timeSaved: old.timestamp,
        };
    }
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
/* harmony export */   WAIT_FOR_ELEMENT_DELAY: () => (/* binding */ WAIT_FOR_ELEMENT_DELAY)
/* harmony export */ });
// ms
const WAIT_FOR_ELEMENT_DELAY = 100;


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
const extractData = () => $("#coursesContainer > .row")
    .map((_, row) => {
    var _a;
    return ({
        title: (_a = $(row).find("a > h3").text().split(" -")[0]) !== null && _a !== void 0 ? _a : "",
        grade: Number.parseFloat($(row)
            .find("h3.showGrade")
            .text()
            .trim()
            .replaceAll(/[%-]/g, "")),
    });
})
    .toArray()
    .filter((c) => !Number.isNaN(c.grade));


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
/* harmony export */   maxGpaCalc: () => (/* binding */ maxGpaCalc)
/* harmony export */ });
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils.ts");
/* harmony import */ var _resources_gpaMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resources/gpaMap */ "./src/resources/gpaMap.ts");


const base_gpa = (grade) => { var _a; return (_a = _resources_gpaMap__WEBPACK_IMPORTED_MODULE_1__.gpaMap[(0,_helpers_utils__WEBPACK_IMPORTED_MODULE_0__.clamp)(Math.floor(grade), 70, 99)]) !== null && _a !== void 0 ? _a : 0; };
const isWeightedClass = (title) => title.endsWith("-H");
const weight = (weighted, title) => weighted && isWeightedClass(title) ? 1 : 0;
const gpaCalc = (courses, weighted = true) => courses
    .map(({ grade, title }) => base_gpa(grade) + weight(weighted, title))
    .reduce((acc, n) => acc + n, 0) / courses.length;
const maxGpaCalc = (courses, weighted = true) => courses
    .map(({ title }) => base_gpa(99) + weight(weighted, title))
    .reduce((acc, n) => acc + n, 0) / courses.length;


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
/* harmony export */   setUpJQuery: () => (/* binding */ setUpJQuery),
/* harmony export */   waitForElement: () => (/* binding */ waitForElement)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");


const checkJQuery = async () => {
    while (typeof jQuery === "undefined") {
        await new Promise((r) => setTimeout(r, _config__WEBPACK_IMPORTED_MODULE_0__.WAIT_FOR_ELEMENT_DELAY));
    }
    // if (typeof jQuery === "undefined") {
    // 	// for some reason we don't have jquery, so we load our own
    // 	console.error("jQuery was undefined, trying to load from cdn");
    // 	const el = document.createElement("script");
    // 	el.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    // 	el.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
    // 	el.crossOrigin = "anonymous";
    // 	el.async = false;
    // 	document.head.append(el);
    // 	if (typeof jQuery === "undefined") {
    // 		throw new AlertPanic("Couldn't initialize jQuery");
    // 	}
    // }
};
const setUpJQuery = () => {
    jQuery.fn.exists = function () {
        return this.length > 0;
    };
};
async function waitForElement(selector) {
    while (!$(selector).exists())
        await new Promise((r) => setTimeout(r, _config__WEBPACK_IMPORTED_MODULE_0__.WAIT_FOR_ELEMENT_DELAY));
}
function getFirstElementSafe(selector) {
    const el = $(selector)[0];
    if (el === undefined)
        throw new _utils__WEBPACK_IMPORTED_MODULE_1__.AlertPanic(`Couldn't find element ${selector}`);
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
/* harmony export */   LSWrapper: () => (/* binding */ LSWrapper)
/* harmony export */ });
class LSWrapper {
    constructor(location, defaultValue) {
        this.location = location;
        const currentValue = localStorage.getItem(location);
        if (currentValue === null) {
            localStorage.setItem(location, JSON.stringify(defaultValue));
            this.value = defaultValue;
            return;
        }
        this.value = JSON.parse(currentValue);
    }
    set(newValue) {
        localStorage.setItem(this.location, JSON.stringify(newValue));
        this.value = newValue;
    }
}


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
class AlertPanic extends Error {
    constructor(message) {
        super(message);
        alert("OCP: Something has gone wrong. See the developer console for more information.");
    }
}
const OCPDebug = "development" === "development";
const debug = (message) => {
    if (OCPDebug)
        console.log(message);
};
const formatResult = (value, unit, includeAgo = true) => {
    return `${Math.round(value)} ${unit}${value === 1 ? "" : "s"}${includeAgo ? " ago" : ""}`;
};
const formatDuration = (minutes) => {
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
        return `${formatResult((minutes - (minutes % 60)) / 60, "hour", false)} and ${formatResult(minutes % 60, "minute")}`;
    }
};
const clamp = (num, min, max) => Math.max(min, Math.min(num, max));


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calcChanges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcChanges */ "./src/calcChanges.ts");
/* harmony import */ var _extractData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./extractData */ "./src/extractData.ts");
/* harmony import */ var _gpaCalc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gpaCalc */ "./src/gpaCalc.ts");
/* harmony import */ var _helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/jQueryHelpers */ "./src/helpers/jQueryHelpers.ts");
/* harmony import */ var _renderChanges__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderChanges */ "./src/renderChanges.ts");
/* harmony import */ var _resources_tile_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resources/tile.html */ "./src/resources/tile.html");






// need to use var to avoid redeclaration
// eslint-disable-next-line no-var
var OCP_ran;
const reRunProtection = () => {
    if (OCP_ran == true) {
        console.log("already ran");
        return true;
    }
    OCP_ran = true;
    return false;
};
const domainChecker = () => {
    if (!globalThis.location.href.includes("myschoolapp.com") &&
        !confirm("This script is only meant to run on mySFHS. Do you want to continue?")) {
        throw new Error("Canceled by user");
    }
};
const reload = async () => {
    if (globalThis.location.hash === "#studentmyday/progress") {
        await waitForPageLoad();
        loadHTML();
        insertData();
    }
};
const waitForPageLoad = async () => {
    await (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.waitForElement)(".muted");
    await (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.waitForElement)(".ch.col-md-4");
    await (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.waitForElement)(".showGrade");
};
const loadHTML = () => {
    (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.getFirstElementSafe)("#performanceCollapse > div.bb-tile-content-section").insertAdjacentHTML("beforeend", _resources_tile_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
};
const insertData = () => {
    const currentGrades = (0,_extractData__WEBPACK_IMPORTED_MODULE_1__.extractData)();
    const gpa = (0,_gpaCalc__WEBPACK_IMPORTED_MODULE_2__.gpaCalc)(currentGrades);
    const maxGpa = (0,_gpaCalc__WEBPACK_IMPORTED_MODULE_2__.maxGpaCalc)(currentGrades);
    $("#gpa").text(`GPA: ${gpa.toFixed(2)}/${maxGpa.toFixed(2)} (${((gpa / maxGpa) * 100).toFixed(0)}%)`);
    const changes = (0,_calcChanges__WEBPACK_IMPORTED_MODULE_0__.calcChanges)(currentGrades);
    (0,_renderChanges__WEBPACK_IMPORTED_MODULE_4__.renderChanges)(changes);
    console.log("done");
};
await (async () => {
    console.log("Running OCP");
    if (reRunProtection()) {
        return;
    }
    domainChecker();
    await (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.checkJQuery)();
    (0,_helpers_jQueryHelpers__WEBPACK_IMPORTED_MODULE_3__.setUpJQuery)();
    // whenever the user goes to the progress page, load the content again
    $(globalThis).on("hashchange", () => {
        void reload();
    });
    void reload();
})();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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


const getArrow = (change) => change.newGrade < change.oldGrade ? (_resources_redArrow_min_svg__WEBPACK_IMPORTED_MODULE_1___default()) : (_resources_greenArrow_min_svg__WEBPACK_IMPORTED_MODULE_0___default());
const formatPercentage = (percentage) => `${percentage.toFixed(2)}%`;
const generateText = (change) => `${change.title} used to be <b>${formatPercentage(change.oldGrade)}</b>, now it's <b>${formatPercentage(change.newGrade)}</b>`;
const renderChanges = (changes) => {
    const parent = $("#gradeChanges");
    if (changes.changes.length === 0) {
        parent.text("Your grades are the same as the last time you checked.");
        return;
    }
    for (const change of changes.changes) {
        const changeDiv = $("<div>").css({ "margin-bottom": "5px" });
        const arrow = $("<img>")
            .attr("src", getArrow(change))
            .attr("width", 14)
            .css({ "margin-right": "2px" });
        const text = $("<span>").html(generateText(change));
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
const gpaMap = {
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
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;