/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/lsWrapper */ "./src/helpers/lsWrapper.ts");


const DEFAULT_LS_DATA = {
    courses: [],
    timestamp: undefined,
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
    const snapshotLS = new _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_1__.LSWrapper(_config__WEBPACK_IMPORTED_MODULE_0__.LOCALSTORAGE_GRADES_KEY, DEFAULT_LS_DATA);
    const snapshot = snapshotLS.get();
    const now = Date.now();
    const result = {
        changes: compare(currentCourses, snapshot.courses),
        now,
        timeSaved: snapshot.timestamp,
    };
    snapshotLS.set({ courses: currentCourses, timestamp: now });
    return result;
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
/* harmony export */   LOCALSTORAGE_GRADES_KEY: () => (/* binding */ LOCALSTORAGE_GRADES_KEY),
/* harmony export */   LOCALSTORAGE_HOTKEYS_KEY: () => (/* binding */ LOCALSTORAGE_HOTKEYS_KEY),
/* harmony export */   WAIT_FOR_ELEMENT_DELAY: () => (/* binding */ WAIT_FOR_ELEMENT_DELAY)
/* harmony export */ });
// ms
const WAIT_FOR_ELEMENT_DELAY = 100;
const LOCALSTORAGE_GRADES_KEY = "OCP_grades";
const LOCALSTORAGE_HOTKEYS_KEY = "OCP_hotkeys";


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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");

class LSWrapper {
    constructor(location, defaultValue) {
        this.location = location;
        const currentValue = localStorage.getItem(location);
        if (currentValue === null) {
            localStorage.setItem(location, JSON.stringify(defaultValue));
            this.value = defaultValue;
            return;
        }
        try {
            this.value = JSON.parse(currentValue);
        }
        catch (error) {
            throw new _utils__WEBPACK_IMPORTED_MODULE_0__.AlertPanic(`Failed to parse localStorage value. Original error: ${String(error)}`);
        }
    }
    get() {
        return this.value;
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
/* harmony export */   debug: () => (/* binding */ debug),
/* harmony export */   sleep: () => (/* binding */ sleep)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/config.ts");

class AlertPanic extends Error {
    constructor(message) {
        alert("OCP: Something has gone wrong. See the developer console for more information.");
        localStorage.removeItem(_config__WEBPACK_IMPORTED_MODULE_0__.LOCALSTORAGE_KEY);
        console.error("OCP Error vvv");
        super(message);
    }
}
const OCPDebug = "development" === "development";
const debug = (message) => {
    if (OCPDebug) {
        console.log("OCP: " + message);
    }
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


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
const formatResult = (value, unit, includeAgo = true) => `${Math.round(value)} ${unit}${value === 1 ? "" : "s"}${includeAgo ? " ago" : ""}`;
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
const renderChanges = (changes) => {
    const parent = $("#gradeChanges");
    if (changes.timeSaved === undefined) {
        parent.text("Your current grades have been saved. Check back later to see how they have changed.");
    }
    else {
        const deltaT = Math.floor((changes.now - changes.timeSaved) / (1000 * 60));
        const formattedDuration = formatDuration(deltaT);
        if (changes.changes.length === 0) {
            parent.text(`Your grades are the same as the last time you checked ${formattedDuration}.`);
            return;
        }
        const text = $("<div>").css({ "margin-bottom": "10px" });
        text.text(`Your grades have changed since you last checked ${formattedDuration}.`);
        parent.append(text);
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
var code = `<div style="font-size: 12px; margin-top: 10px" id="gradeChanges"></div>
`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calcChanges__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calcChanges */ "./src/calcChanges.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/lsWrapper */ "./src/helpers/lsWrapper.ts");
/* harmony import */ var _helpers_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/utils */ "./src/helpers/utils.ts");
/* harmony import */ var _renderChanges__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./renderChanges */ "./src/renderChanges.ts");
/* harmony import */ var _resources_tile_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resources/tile.html */ "./src/resources/tile.html");






const extractData = () => $(".ic-DashboardCard__header")
    .map((_, row) => ({
    title: $(row).find(".ic-DashboardCard__header-title").text().trim(),
    grade: Number.parseFloat($(row)
        .find(".bettercanvas-card-grade")
        .text()
        .trim()
        .slice(0, -1)),
}))
    .filter((_, { grade }) => !Number.isNaN(grade))
    .toArray();
const gradeChanges = async () => {
    while ($(".bettercanvas-card-grade").length <= 0) {
        (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.debug)("Waiting for grades");
        await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.sleep)(_config__WEBPACK_IMPORTED_MODULE_1__.WAIT_FOR_ELEMENT_DELAY);
    }
    const gpaButton = $(".bettercanvas-gpa-edit-btn")[0];
    if (gpaButton === undefined) {
        throw new _helpers_utils__WEBPACK_IMPORTED_MODULE_3__.AlertPanic("Couldn't find GPA button.");
    }
    gpaButton.insertAdjacentHTML("afterend", _resources_tile_html__WEBPACK_IMPORTED_MODULE_5__["default"]);
    const currentGrades = extractData();
    const changes = (0,_calcChanges__WEBPACK_IMPORTED_MODULE_0__.calcChanges)(currentGrades);
    (0,_renderChanges__WEBPACK_IMPORTED_MODULE_4__.renderChanges)(changes);
    (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.debug)("Done with grade changes");
};
const parseClassSpecifier = (s) => {
    if (s.length !== 1) {
        return undefined;
    }
    const codePoint = s.codePointAt(0);
    if (codePoint === undefined) {
        return undefined;
    }
    const index = codePoint - 48;
    if (index >= 10) {
        return undefined;
    }
    return index;
};
const parsePageSpecifier = (s) => {
    switch (s) {
        // Home
        case "h": {
            return "";
        }
        // Assignments
        case "a": {
            return "assignments";
        }
        // Discussions
        case "d": {
            return "discussion_topics";
        }
        // Grades
        case "g": {
            return "grades";
        }
        // Modules
        case "m": {
            return "modules";
        }
        default: {
            return undefined;
        }
    }
};
const setHotkeys = (hotkeyMapLS) => {
    if (globalThis.location.pathname !== "/") {
        return;
    }
    const courseIds = $(".ic-DashboardCard__link")
        .toArray()
        .map((card) => {
        var _a;
        console.log(card);
        const courseIdStr = (_a = card.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.split("/").at(-1);
        if (courseIdStr === undefined) {
            throw new _helpers_utils__WEBPACK_IMPORTED_MODULE_3__.AlertPanic("Couldn't find course id");
        }
        return Number.parseInt(courseIdStr);
    })
        .slice(0, 10);
    const last = courseIds.pop();
    if (last === undefined) {
        return;
    }
    courseIds.unshift(last);
    console.log(courseIds);
    hotkeyMapLS.set(courseIds);
};
const hotkeys = () => {
    const hotkeyMapLS = new _helpers_lsWrapper__WEBPACK_IMPORTED_MODULE_2__.LSWrapper(_config__WEBPACK_IMPORTED_MODULE_1__.LOCALSTORAGE_HOTKEYS_KEY, undefined);
    setHotkeys(hotkeyMapLS);
    const hotkeyMap = hotkeyMapLS.get();
    if (hotkeyMap === undefined) {
        return;
    }
    let first = "";
    let second = "";
    document.addEventListener("keydown", (e) => {
        first = second;
        second = e.key;
        console.log(`first: ${first}, second: ${second}`);
        const classSpecifier = parseClassSpecifier(first);
        const pageSpecifier = parsePageSpecifier(second);
        if (classSpecifier === undefined || pageSpecifier === undefined) {
            return;
        }
        globalThis.location.href = `https://canvas.umn.edu/courses/${hotkeyMap[classSpecifier]}/${pageSpecifier}`;
    });
};
const main = async () => {
    (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.debug)("Running");
    if (globalThis.window.OCP_ran === true) {
        (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.debug)("Already ran, stopping");
        return;
    }
    globalThis.window.OCP_ran = true;
    // Check for jQuery
    while (typeof jQuery === "undefined") {
        (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.debug)("Waiting for jquery");
        await (0,_helpers_utils__WEBPACK_IMPORTED_MODULE_3__.sleep)(_config__WEBPACK_IMPORTED_MODULE_1__.WAIT_FOR_ELEMENT_DELAY);
    }
    hotkeys();
    if (globalThis.location.pathname !== "/") {
        void gradeChanges();
    }
};
void main();

})();

/******/ })()
;