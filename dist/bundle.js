/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/imagediff/browser/canvas.js":
/*!**************************************************!*\
  !*** ./node_modules/imagediff/browser/canvas.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function Canvas () {\n  return document.createElement('canvas');\n};\n\n\n//# sourceURL=webpack://drawing-game/./node_modules/imagediff/browser/canvas.js?");

/***/ }),

/***/ "./node_modules/imagediff/imagediff.js":
/*!*********************************************!*\
  !*** ./node_modules/imagediff/imagediff.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("// js-imagediff 1.0.3\n// (c) 2011-2012 Carl Sutherland, Humble Software\n// Distributed under the MIT License\n// For original source and documentation visit:\n// http://www.github.com/HumbleSoftware/js-imagediff\n\n(function (name, definition) {\n  var root = this;\n  if (true) {\n    try {\n      var Canvas = __webpack_require__(/*! canvas */ \"./node_modules/imagediff/browser/canvas.js\");\n    } catch (e) {\n      throw new Error(\n        e.message + '\\n' +\n        'Please see https://github.com/HumbleSoftware/js-imagediff#cannot-find-module-canvas\\n'\n      );\n    }\n    module.exports = definition(root, name, Canvas);\n  } else {}\n})('imagediff', function (root, name, Canvas) {\n\n  var\n    TYPE_ARRAY        = /\\[object Array\\]/i,\n    TYPE_CANVAS       = /\\[object (Canvas|HTMLCanvasElement)\\]/i,\n    TYPE_CONTEXT      = /\\[object CanvasRenderingContext2D\\]/i,\n    TYPE_IMAGE        = /\\[object (Image|HTMLImageElement)\\]/i,\n    TYPE_IMAGE_DATA   = /\\[object ImageData\\]/i,\n\n    UNDEFINED         = 'undefined',\n\n    canvas            = getCanvas(),\n    context           = canvas.getContext('2d'),\n    previous          = root[name],\n    imagediff, jasmine;\n\n  // Creation\n  function getCanvas (width, height) {\n    var\n      canvas = Canvas ?\n        new Canvas() :\n        document.createElement('canvas');\n    if (width) canvas.width = width;\n    if (height) canvas.height = height;\n    return canvas;\n  }\n  function getImageData (width, height) {\n    canvas.width = width;\n    canvas.height = height;\n    context.clearRect(0, 0, width, height);\n    return context.createImageData(width, height);\n  }\n  // expost canvas module\n  function getCanvasRef() {\n    return Canvas;\n  }\n\n\n  // Type Checking\n  function isImage (object) {\n    return isType(object, TYPE_IMAGE);\n  }\n  function isCanvas (object) {\n    return isType(object, TYPE_CANVAS);\n  }\n  function isContext (object) {\n    return isType(object, TYPE_CONTEXT);\n  }\n  function isImageData (object) {\n    return !!(object &&\n      isType(object, TYPE_IMAGE_DATA) &&\n      typeof(object.width) !== UNDEFINED &&\n      typeof(object.height) !== UNDEFINED &&\n      typeof(object.data) !== UNDEFINED);\n  }\n  function isImageType (object) {\n    return (\n      isImage(object) ||\n      isCanvas(object) ||\n      isContext(object) ||\n      isImageData(object)\n    );\n  }\n  function isType (object, type) {\n    return typeof (object) === 'object' && !!Object.prototype.toString.apply(object).match(type);\n  }\n\n\n  // Type Conversion\n  function copyImageData (imageData) {\n    var\n      height = imageData.height,\n      width = imageData.width,\n      data = imageData.data,\n      newImageData, newData, i;\n\n    canvas.width = width;\n    canvas.height = height;\n    newImageData = context.getImageData(0, 0, width, height);\n    newData = newImageData.data;\n\n    for (i = imageData.data.length; i--;) {\n        newData[i] = data[i];\n    }\n\n    return newImageData;\n  }\n  function toImageData (object) {\n    if (isImage(object)) { return toImageDataFromImage(object); }\n    if (isCanvas(object)) { return toImageDataFromCanvas(object); }\n    if (isContext(object)) { return toImageDataFromContext(object); }\n    if (isImageData(object)) { return object; }\n  }\n  function toImageDataFromImage (image) {\n    var\n      height = image.height,\n      width = image.width;\n    canvas.width = width;\n    canvas.height = height;\n    context.clearRect(0, 0, width, height);\n    context.drawImage(image, 0, 0);\n    return context.getImageData(0, 0, width, height);\n  }\n  function toImageDataFromCanvas (canvas) {\n    var\n      height = canvas.height,\n      width = canvas.width,\n      context = canvas.getContext('2d');\n    return context.getImageData(0, 0, width, height);\n  }\n  function toImageDataFromContext (context) {\n    var\n      canvas = context.canvas,\n      height = canvas.height,\n      width = canvas.width;\n    return context.getImageData(0, 0, width, height);\n  }\n  function toCanvas (object) {\n    var\n      data = toImageData(object),\n      canvas = getCanvas(data.width, data.height),\n      context = canvas.getContext('2d');\n\n    context.putImageData(data, 0, 0);\n    return canvas;\n  }\n\n\n  // ImageData Equality Operators\n  function equalWidth (a, b) {\n    return a.width === b.width;\n  }\n  function equalHeight (a, b) {\n    return a.height === b.height;\n  }\n  function equalDimensions (a, b) {\n    return equalHeight(a, b) && equalWidth(a, b);\n  }\n  function equal (a, b, tolerance) {\n\n    var\n      aData     = a.data,\n      bData     = b.data,\n      length    = aData.length,\n      i;\n\n    tolerance = tolerance || 0;\n\n    if (!equalDimensions(a, b)) return false;\n    for (i = length; i--;) if (aData[i] !== bData[i] && Math.abs(aData[i] - bData[i]) > tolerance) return false;\n\n    return true;\n  }\n\n\n  // Diff\n  function diff (a, b, options) {\n    return (equalDimensions(a, b) ? diffEqual : diffUnequal)(a, b, options);\n  }\n  function diffEqual (a, b, options) {\n\n    var\n      height  = a.height,\n      width   = a.width,\n      c       = getImageData(width, height), // c = a - b\n      aData   = a.data,\n      bData   = b.data,\n      cData   = c.data,\n      length  = cData.length,\n      row, column,\n      i, j, k, v;\n\n    for (i = 0; i < length; i += 4) {\n      cData[i] = Math.abs(aData[i] - bData[i]);\n      cData[i+1] = Math.abs(aData[i+1] - bData[i+1]);\n      cData[i+2] = Math.abs(aData[i+2] - bData[i+2]);\n      cData[i+3] = Math.abs(255 - Math.abs(aData[i+3] - bData[i+3]));\n    }\n\n    return c;\n  }\n  function diffUnequal (a, b, options) {\n\n    var\n      height  = Math.max(a.height, b.height),\n      width   = Math.max(a.width, b.width),\n      c       = getImageData(width, height), // c = a - b\n      aData   = a.data,\n      bData   = b.data,\n      cData   = c.data,\n      align   = options && options.align,\n      rowOffset,\n      columnOffset,\n      row, column,\n      i, j, k, v;\n\n\n    for (i = cData.length - 1; i > 0; i = i - 4) {\n      cData[i] = 255;\n    }\n\n    // Add First Image\n    offsets(a);\n    for (row = a.height; row--;){\n      for (column = a.width; column--;) {\n        i = 4 * ((row + rowOffset) * width + (column + columnOffset));\n        j = 4 * (row * a.width + column);\n        cData[i+0] = aData[j+0]; // r\n        cData[i+1] = aData[j+1]; // g\n        cData[i+2] = aData[j+2]; // b\n        // cData[i+3] = aData[j+3]; // a\n      }\n    }\n\n    // Subtract Second Image\n    offsets(b);\n    for (row = b.height; row--;){\n      for (column = b.width; column--;) {\n        i = 4 * ((row + rowOffset) * width + (column + columnOffset));\n        j = 4 * (row * b.width + column);\n        cData[i+0] = Math.abs(cData[i+0] - bData[j+0]); // r\n        cData[i+1] = Math.abs(cData[i+1] - bData[j+1]); // g\n        cData[i+2] = Math.abs(cData[i+2] - bData[j+2]); // b\n      }\n    }\n\n    // Helpers\n    function offsets (imageData) {\n      if (align === 'top') {\n        rowOffset = 0;\n        columnOffset = 0;\n      } else {\n        rowOffset = Math.floor((height - imageData.height) / 2);\n        columnOffset = Math.floor((width - imageData.width) / 2);\n      }\n    }\n\n    return c;\n  }\n\n\n  // Validation\n  function checkType () {\n    var i;\n    for (i = 0; i < arguments.length; i++) {\n      if (!isImageType(arguments[i])) {\n        throw {\n          name : 'ImageTypeError',\n          message : 'Submitted object was not an image.'\n        };\n      }\n    }\n  }\n\n\n  // Jasmine Matchers\n  function get (element, content) {\n    element = document.createElement(element);\n    if (element && content) {\n      element.innerHTML = content;\n    }\n    return element;\n  }\n\n  jasmine = {\n\n    toBeImageData : function () {\n      return imagediff.isImageData(this.actual);\n    },\n\n    toImageDiffEqual : function (expected, tolerance) {\n\n      if (typeof (document) !== UNDEFINED) {\n        this.message = function () {\n          var\n            div     = get('div'),\n            a       = get('div', '<div>Actual:</div>'),\n            b       = get('div', '<div>Expected:</div>'),\n            c       = get('div', '<div>Diff:</div>'),\n            diff    = imagediff.diff(this.actual, expected),\n            canvas  = getCanvas(),\n            context;\n\n          canvas.height = diff.height;\n          canvas.width  = diff.width;\n\n          div.style.overflow = 'hidden';\n          a.style.float = 'left';\n          b.style.float = 'left';\n          c.style.float = 'left';\n\n          context = canvas.getContext('2d');\n          context.putImageData(diff, 0, 0);\n\n          a.appendChild(toCanvas(this.actual));\n          b.appendChild(toCanvas(expected));\n          c.appendChild(canvas);\n\n          div.appendChild(a);\n          div.appendChild(b);\n          div.appendChild(c);\n\n          return [\n            div,\n            \"Expected not to be equal.\"\n          ];\n        };\n      }\n\n      return imagediff.equal(this.actual, expected, tolerance);\n    }\n  };\n\n\n  // Image Output\n  function imageDataToPNG (imageData, outputFile, callback) {\n\n    var\n      canvas = toCanvas(imageData),\n      base64Data,\n      decodedImage;\n\n    callback = callback || Function;\n\n    base64Data = canvas.toDataURL().replace(/^data:image\\/\\w+;base64,/,\"\");\n    decodedImage = new Buffer(base64Data, 'base64');\n    Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'fs'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(outputFile, decodedImage, callback);\n  }\n\n\n  // Definition\n  imagediff = {\n\n    createCanvas : getCanvas,\n    createImageData : getImageData,\n    getCanvasRef: getCanvasRef,\n\n    isImage : isImage,\n    isCanvas : isCanvas,\n    isContext : isContext,\n    isImageData : isImageData,\n    isImageType : isImageType,\n\n    toImageData : function (object) {\n      checkType(object);\n      if (isImageData(object)) { return copyImageData(object); }\n      return toImageData(object);\n    },\n\n    equal : function (a, b, tolerance) {\n      checkType(a, b);\n      a = toImageData(a);\n      b = toImageData(b);\n      return equal(a, b, tolerance);\n    },\n    diff : function (a, b, options) {\n      checkType(a, b);\n      a = toImageData(a);\n      b = toImageData(b);\n      return diff(a, b, options);\n    },\n\n    jasmine : jasmine,\n\n    // Compatibility\n    noConflict : function () {\n      root[name] = previous;\n      return imagediff;\n    }\n  };\n\n  if (true) {\n    imagediff.imageDataToPNG = imageDataToPNG;\n  }\n\n  return imagediff;\n});\n\n\n//# sourceURL=webpack://drawing-game/./node_modules/imagediff/imagediff.js?");

/***/ }),

/***/ "./src/scss/frontend.scss":
/*!********************************!*\
  !*** ./src/scss/frontend.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://drawing-game/./src/scss/frontend.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_frontend_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/frontend.scss */ \"./src/scss/frontend.scss\");\n/* harmony import */ var _js_canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/canvas.js */ \"./src/js/canvas.js\");\n/* harmony import */ var _js_canvas_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_canvas_js__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n//# sourceURL=webpack://drawing-game/./src/index.js?");

/***/ }),

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const imagediff = __webpack_require__(/*! imagediff */ \"./node_modules/imagediff/imagediff.js\");\n\nconst canvases = document.getElementsByClassName('gameCanvas');\nconst sourceCanvas = document.getElementById('canvas-source');\nconst replicaCanvas = document.getElementById('canvas-replica');\n\nconst eraseCanvasesButton = document.getElementById('tool-erase-canvases');\nconst saveSourceCanvasButton = document.getElementById('tool-save-source');\nconst compareCanvasesButton = document.getElementById('tool-compare-canvases');\nconst overlapOutput = document.getElementById('tool-output-overlap');\nconst demo = document.getElementById('comparison__canvas')\n\n// Drawing\nconst width = 30;\n\nconst canvasInit = ( el ) => {\n    const width = el.offsetWidth;\n    const height = el.offsetHeight;\n\n    el.setAttribute( 'width' , width );\n    el.setAttribute( 'height' , height );\n}\n\nconst canvasesStatus = {};\nlet coord = {x:0 , y:0};\nlet paint = false;\n\nconst getPosition = ( canvas , e ) =>{\n    coord.x = e.clientX - canvas.offsetLeft;\n    coord.y = e.clientY - canvas.offsetTop;\n}\nconst getPositionTouch = ( canvas , e ) =>{\n    const touch = e.touches[0]\n    coord.x = touch.clientX - canvas.offsetLeft;\n    coord.y = touch.clientY - canvas.offsetTop;\n}\n    \nconst startPainting = ( canvas , e , method ) => {\n    paint = true;\n    method == 'touch' ? getPositionTouch( canvas , e ) : getPosition( canvas , e );\n}\n\nconst stopPainting = () =>{\n    paint = false;\n}\n\nconst sketch = ( canvas , e , method ) => {\n    if (!paint) return;\n    ctx = canvas.getContext('2d');\n    ctx.beginPath();\n    ctx.lineWidth = width;\n    ctx.lineCap = 'round';\n    ctx.strokeStyle = 'black';\n    ctx.moveTo(coord.x, coord.y);\n    method == 'touch' ? getPositionTouch( canvas , e ) : getPosition( canvas , e );\n    ctx.lineTo(coord.x , coord.y);\n    ctx.stroke();\n}\n\nfor (let i = 0; i < canvases.length; i++) {\n\n    canvasInit( canvases[i] );\n    \n    canvases[i].addEventListener('mousedown', (e) => {\n        startPainting( canvases[i] , e , 'mouse');\n    });\n    canvases[i].addEventListener('pointerup', stopPainting);\n    canvases[i].addEventListener('pointerout', stopPainting);\n    canvases[i].addEventListener('touchcancel', stopPainting);\n    canvases[i].addEventListener('mousemove', (e) => {\n        sketch( canvases[i] , e , 'mouse' )\n    });\n    canvases[i].addEventListener('touchstart', (e) => {\n        startPainting( canvases[i] , e , 'touch' );\n    });\n    canvases[i].addEventListener('touchmove', (e) => {\n        sketch( canvases[i] , e , 'touch')\n    });\n\n\n\n}\n\nconst saveSourceCanvas = () =>{\n    sourceCanvas.classList.add('gameCanvas_inactive');\n    replicaCanvas.classList.remove('gameCanvas_inactive');\n}\nconst eraseCanvases = () =>{\n    for (let i = 0; i < canvases.length; i++) {\n        const ctx = canvases[i].getContext('2d');\n        ctx.clearRect( 0 , 0 , canvases[i].offsetWidth , canvases[i].offsetHeight );\n    }\n    sourceCanvas.classList.remove('gameCanvas_inactive');\n    replicaCanvas.classList.add('gameCanvas_inactive');\n    overlapOutput.textContent = '';\n    demo.innerHTML = ''\n}\n\nconst compareCanvases = ( source , replica ) => {\n    \n    const sourceCtx = source.getContext('2d');\n    const sourceData = sourceCtx.getImageData( 0 , 0 , source.offsetWidth , source.offsetHeight ).data;\n    \n    const replicaCtx = replica.getContext('2d');\n    const replicaData = replicaCtx.getImageData( 0 , 0 , replica.offsetWidth , replica.offsetHeight ).data;\n\n    if( !sourceData.some(channel => channel !==0 ) ){\n        alert('Source canvas is empty');\n        return;\n    }\n\n    if( !replicaData.some(channel => channel !==0 ) ){\n        alert('Replica canvas is empty');\n        return;\n    }\n    \n    let whitePixels = 0;\n    let correctPixels = 0;\n\n    for (let i = 0; i < sourceData.length; i++) {\n        if( sourceData[i] !== 0){\n            if( sourceData[i] === replicaData[i]){\n                correctPixels++;\n            }\n        } else {\n            whitePixels++\n        }\n    }\n\n    const activePixels = sourceData.length - whitePixels;\n\n    const comparisonRate = correctPixels / activePixels;\n\n    overlapOutput.textContent = Math.round( comparisonRate * 100 ) + '%';\n\n    let diff, canvas, context;\n    diff = imagediff.diff( source , replica, {align: \"top\"} );\n    canvas = imagediff.createCanvas(diff.width, diff.height);\n    context = canvas.getContext('2d');\n    context.putImageData(diff, 0, 0);\n    demo.appendChild(canvas);\n    console.log( imagediff.equal(source, replica, 1500) )\n\n}\n\nsaveSourceCanvasButton.addEventListener( 'click' , saveSourceCanvas);\neraseCanvasesButton.addEventListener( 'click' , eraseCanvases);\ncompareCanvasesButton.addEventListener( 'click' , () => {\n    compareCanvases( sourceCanvas , replicaCanvas )\n});\n\n//# sourceURL=webpack://drawing-game/./src/js/canvas.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;