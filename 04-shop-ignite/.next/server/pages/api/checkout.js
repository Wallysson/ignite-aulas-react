"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/checkout";
exports.ids = ["pages/api/checkout"];
exports.modules = {

/***/ "stripe":
/*!*************************!*\
  !*** external "stripe" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),

/***/ "(api)/./src/lib/stripe.ts":
/*!***************************!*\
  !*** ./src/lib/stripe.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stripe\": () => (/* binding */ stripe)\n/* harmony export */ });\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! stripe */ \"stripe\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stripe__WEBPACK_IMPORTED_MODULE_0__);\n\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_0__.Stripe(process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2022-08-01\",\n    appInfo: {\n        name: \"Ignite Shop\"\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvbGliL3N0cmlwZS50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFekIsTUFBTUMsTUFBTSxHQUFHLElBQUlELDBDQUFNLENBQUNFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxpQkFBaUIsRUFBRTtJQUM5REMsVUFBVSxFQUFFLFlBQVk7SUFDeEJDLE9BQU8sRUFBRTtRQUNQQyxJQUFJLEVBQUUsYUFBYTtLQUNwQjtDQUNGLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzA0LXNob3AvLi9zcmMvbGliL3N0cmlwZS50cz83OThhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0cmlwZSB9IGZyb20gXCJzdHJpcGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzdHJpcGUgPSBuZXcgU3RyaXBlKHByb2Nlc3MuZW52LlNUUklQRV9TRUNSRVRfS0VZLCB7XHJcbiAgYXBpVmVyc2lvbjogJzIwMjItMDgtMDEnLFxyXG4gIGFwcEluZm86IHtcclxuICAgIG5hbWU6ICdJZ25pdGUgU2hvcCdcclxuICB9XHJcbn0pOyJdLCJuYW1lcyI6WyJTdHJpcGUiLCJzdHJpcGUiLCJwcm9jZXNzIiwiZW52IiwiU1RSSVBFX1NFQ1JFVF9LRVkiLCJhcGlWZXJzaW9uIiwiYXBwSW5mbyIsIm5hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/lib/stripe.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/checkout.ts":
/*!***********************************!*\
  !*** ./src/pages/api/checkout.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ hander)\n/* harmony export */ });\n/* harmony import */ var _lib_stripe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../lib/stripe */ \"(api)/./src/lib/stripe.ts\");\n\nasync function hander(req, res) {\n    const { products  } = req.body;\n    if (req.method !== \"POST\") {\n        return res.status(405).json({\n            error: \"Method not allowed.\"\n        });\n    }\n    if (!products) {\n        return res.status(400).json({\n            error: \"Products not found\"\n        });\n    }\n    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;\n    const cancelUrl = `${process.env.NEXT_URL}/`;\n    const checkoutSession = await _lib_stripe__WEBPACK_IMPORTED_MODULE_0__.stripe.checkout.sessions.create({\n        success_url: successUrl,\n        cancel_url: cancelUrl,\n        mode: \"payment\",\n        line_items: products.map((product)=>({\n                price: product.defaultPriceId,\n                quantity: 1\n            }))\n    });\n    return res.status(201).json({\n        checkoutUrl: checkoutSession.url\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2NoZWNrb3V0LnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBRTBDO0FBRTNCLGVBQWVDLE1BQU0sQ0FBQ0MsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtJQUM5RSxNQUFNLEVBQUVDLFFBQVEsR0FBRSxHQUFHRixHQUFHLENBQUNHLElBQUk7SUFFN0IsSUFBSUgsR0FBRyxDQUFDSSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQ3pCLE9BQU9ILEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBQ0MsS0FBSyxFQUFFLHFCQUFxQjtTQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELElBQUksQ0FBQ0wsUUFBUSxFQUFFO1FBQ2IsT0FBT0QsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFDQyxLQUFLLEVBQUUsb0JBQW9CO1NBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsTUFBTUMsVUFBVSxHQUFHLENBQUMsRUFBRUMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVEsQ0FBQyx5Q0FBeUMsQ0FBQztJQUNyRixNQUFNQyxTQUFTLEdBQUcsQ0FBQyxFQUFFSCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUc1QyxNQUFNRSxlQUFlLEdBQUcsTUFBTWYsd0VBQStCLENBQUM7UUFDNURtQixXQUFXLEVBQUVULFVBQVU7UUFDdkJVLFVBQVUsRUFBRU4sU0FBUztRQUNyQk8sSUFBSSxFQUFFLFNBQVM7UUFDZkMsVUFBVSxFQUFFbEIsUUFBUSxDQUFDbUIsR0FBRyxDQUFDLENBQUNDLE9BQU8sR0FBTTtnQkFDckNDLEtBQUssRUFBRUQsT0FBTyxDQUFDRSxjQUFjO2dCQUM3QkMsUUFBUSxFQUFFLENBQUM7YUFDWixFQUFFO0tBQ0osQ0FBQztJQUVGLE9BQU94QixHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1FBQzFCb0IsV0FBVyxFQUFFYixlQUFlLENBQUNjLEdBQUc7S0FDakMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8wNC1zaG9wLy4vc3JjL3BhZ2VzL2FwaS9jaGVja291dC50cz9mMTM0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tIFwibmV4dFwiO1xyXG5pbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gXCIuLi8uLi9jb250ZXh0cy9DYXJ0Q29udGV4dFwiO1xyXG5pbXBvcnQgeyBzdHJpcGUgfSBmcm9tIFwiLi4vLi4vbGliL3N0cmlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGVyKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSB7XHJcbiAgY29uc3QgeyBwcm9kdWN0cyB9ID0gcmVxLmJvZHkgYXMgeyBwcm9kdWN0czogSVByb2R1Y3RbXSB9ICBcclxuXHJcbiAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xyXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5qc29uKHtlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZC4nfSlcclxuICB9XHJcblxyXG4gIGlmICghcHJvZHVjdHMpIHtcclxuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7ZXJyb3I6ICdQcm9kdWN0cyBub3QgZm91bmQnfSlcclxuICB9XHJcbiAgXHJcbiAgY29uc3Qgc3VjY2Vzc1VybCA9IGAke3Byb2Nlc3MuZW52Lk5FWFRfVVJMfS9zdWNjZXNzP3Nlc3Npb25faWQ9e0NIRUNLT1VUX1NFU1NJT05fSUR9YFxyXG4gIGNvbnN0IGNhbmNlbFVybCA9IGAke3Byb2Nlc3MuZW52Lk5FWFRfVVJMfS9gXHJcblxyXG5cclxuICBjb25zdCBjaGVja291dFNlc3Npb24gPSBhd2FpdCBzdHJpcGUuY2hlY2tvdXQuc2Vzc2lvbnMuY3JlYXRlKHtcclxuICAgIHN1Y2Nlc3NfdXJsOiBzdWNjZXNzVXJsLFxyXG4gICAgY2FuY2VsX3VybDogY2FuY2VsVXJsLFxyXG4gICAgbW9kZTogJ3BheW1lbnQnLFxyXG4gICAgbGluZV9pdGVtczogcHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiAoe1xyXG4gICAgICBwcmljZTogcHJvZHVjdC5kZWZhdWx0UHJpY2VJZCxcclxuICAgICAgcXVhbnRpdHk6IDFcclxuICAgIH0pKVxyXG4gIH0pXHJcblxyXG4gIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih7XHJcbiAgICBjaGVja291dFVybDogY2hlY2tvdXRTZXNzaW9uLnVybFxyXG4gIH0pXHJcbn0iXSwibmFtZXMiOlsic3RyaXBlIiwiaGFuZGVyIiwicmVxIiwicmVzIiwicHJvZHVjdHMiLCJib2R5IiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwic3VjY2Vzc1VybCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1VSTCIsImNhbmNlbFVybCIsImNoZWNrb3V0U2Vzc2lvbiIsImNoZWNrb3V0Iiwic2Vzc2lvbnMiLCJjcmVhdGUiLCJzdWNjZXNzX3VybCIsImNhbmNlbF91cmwiLCJtb2RlIiwibGluZV9pdGVtcyIsIm1hcCIsInByb2R1Y3QiLCJwcmljZSIsImRlZmF1bHRQcmljZUlkIiwicXVhbnRpdHkiLCJjaGVja291dFVybCIsInVybCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/checkout.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/checkout.ts"));
module.exports = __webpack_exports__;

})();