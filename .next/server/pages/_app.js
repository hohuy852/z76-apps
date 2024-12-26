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
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _toolpad_core_nextjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @toolpad/core/nextjs */ \"@toolpad/core/nextjs\");\n/* harmony import */ var _toolpad_core_nextjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_toolpad_core_nextjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _toolpad_core_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @toolpad/core/DashboardLayout */ \"@toolpad/core/DashboardLayout\");\n/* harmony import */ var _toolpad_core_DashboardLayout__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_toolpad_core_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _toolpad_core_PageContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @toolpad/core/PageContainer */ \"@toolpad/core/PageContainer\");\n/* harmony import */ var _toolpad_core_PageContainer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_toolpad_core_PageContainer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mui_material_nextjs_v14_pagesRouter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material-nextjs/v14-pagesRouter */ \"@mui/material-nextjs/v14-pagesRouter\");\n/* harmony import */ var _mui_material_nextjs_v14_pagesRouter__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_nextjs_v14_pagesRouter__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _mui_icons_material_Dashboard__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/Dashboard */ \"./node_modules/@mui/icons-material/esm/Dashboard.js\");\n/* harmony import */ var _mui_icons_material_ShoppingCart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/icons-material/ShoppingCart */ \"./node_modules/@mui/icons-material/esm/ShoppingCart.js\");\n/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-auth/react */ \"./node_modules/next-auth/react.js\");\n/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/LinearProgress */ \"./node_modules/@mui/material/node/LinearProgress/index.js\");\n/* harmony import */ var _mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../theme */ \"./theme.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_auth_react__WEBPACK_IMPORTED_MODULE_7__]);\nnext_auth_react__WEBPACK_IMPORTED_MODULE_7__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\n\n\n\n\n\n\nconst NAVIGATION = [\n    {\n        kind: 'header',\n        title: 'Main items'\n    },\n    {\n        segment: '',\n        title: 'Dashboard',\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Dashboard__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 34,\n            columnNumber: 11\n        }, undefined)\n    },\n    {\n        segment: 'orders',\n        title: 'Orders',\n        icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_ShoppingCart__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 39,\n            columnNumber: 11\n        }, undefined)\n    }\n];\nconst BRANDING = {\n    title: 'My Toolpad Core Next.js Pages App'\n};\nconst AUTHENTICATION = {\n    signIn: next_auth_react__WEBPACK_IMPORTED_MODULE_7__.signIn,\n    signOut: next_auth_react__WEBPACK_IMPORTED_MODULE_7__.signOut\n};\nfunction RequireAuth({ children }) {\n    const { status } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_7__.useSession)();\n    if (status === 'loading') {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_mui_material_LinearProgress__WEBPACK_IMPORTED_MODULE_11___default()), {}, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 57,\n            columnNumber: 12\n        }, this);\n    }\n    return children;\n}\nfunction getDefaultLayout(page) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolpad_core_DashboardLayout__WEBPACK_IMPORTED_MODULE_3__.DashboardLayout, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolpad_core_PageContainer__WEBPACK_IMPORTED_MODULE_4__.PageContainer, {\n            maxWidth: \"lg\",\n            children: page\n        }, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 70,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n        lineNumber: 69,\n        columnNumber: 5\n    }, this);\n}\nfunction AppLayout({ children }) {\n    const { data: session } = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_7__.useSession)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_5___default()), {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"meta\", {\n                    name: \"viewport\",\n                    content: \"initial-scale=1, width=device-width\"\n                }, void 0, false, {\n                    fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n                    lineNumber: 80,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n                lineNumber: 79,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_toolpad_core_nextjs__WEBPACK_IMPORTED_MODULE_2__.AppProvider, {\n                navigation: NAVIGATION,\n                branding: BRANDING,\n                session: session,\n                authentication: AUTHENTICATION,\n                theme: _theme__WEBPACK_IMPORTED_MODULE_8__[\"default\"],\n                children: children\n            }, void 0, false, {\n                fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n                lineNumber: 82,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, this);\n}\nfunction App(props) {\n    const { Component, pageProps: { session, ...pageProps } } = props;\n    const getLayout = Component.getLayout ?? getDefaultLayout;\n    const requireAuth = Component.requireAuth ?? true;\n    let pageContent = getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n        lineNumber: 104,\n        columnNumber: 31\n    }, this));\n    if (requireAuth) {\n        pageContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(RequireAuth, {\n            children: pageContent\n        }, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 106,\n            columnNumber: 19\n        }, this);\n    }\n    pageContent = /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AppLayout, {\n        children: pageContent\n    }, void 0, false, {\n        fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n        lineNumber: 108,\n        columnNumber: 17\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_nextjs_v14_pagesRouter__WEBPACK_IMPORTED_MODULE_6__.AppCacheProvider, {\n        ...props,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_auth_react__WEBPACK_IMPORTED_MODULE_7__.SessionProvider, {\n            session: session,\n            children: pageContent\n        }, void 0, false, {\n            fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n            lineNumber: 112,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/hohuy852/Documents/z76-apps/pages/_app.tsx\",\n        lineNumber: 111,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStCO0FBQ29CO0FBQ2E7QUFDSjtBQUMvQjtBQUMyQztBQUNkO0FBQ007QUFJZTtBQUNyQjtBQUU3QjtBQVc3QixNQUFNYyxhQUF5QjtJQUM3QjtRQUNFQyxNQUFNO1FBQ05DLE9BQU87SUFDVDtJQUNBO1FBQ0VDLFNBQVM7UUFDVEQsT0FBTztRQUNQRSxvQkFBTSw4REFBQ1oscUVBQWFBOzs7OztJQUN0QjtJQUNBO1FBQ0VXLFNBQVM7UUFDVEQsT0FBTztRQUNQRSxvQkFBTSw4REFBQ1gseUVBQWdCQTs7Ozs7SUFDekI7Q0FDRDtBQUVELE1BQU1ZLFdBQVc7SUFDZkgsT0FBTztBQUNUO0FBR0EsTUFBTUksaUJBQWlCO0lBQ3JCWCxNQUFNQSxxREFBQUE7SUFDTkMsT0FBT0Esc0RBQUFBO0FBQ1Q7QUFFQSxTQUFTVyxZQUFZLEVBQUVDLFFBQVEsRUFBaUM7SUFDOUQsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR1osMkRBQVVBO0lBRTdCLElBQUlZLFdBQVcsV0FBVztRQUN4QixxQkFBTyw4REFBQ1gsc0VBQWNBOzs7OztJQUN4QjtJQUtBLE9BQU9VO0FBQ1Q7QUFHQSxTQUFTRSxpQkFBaUJDLElBQXdCO0lBQ2hELHFCQUNFLDhEQUFDdkIsMEVBQWVBO2tCQUNkLDRFQUFDQyxzRUFBYUE7WUFBQ3VCLFVBQVM7c0JBQU1EOzs7Ozs7Ozs7OztBQUdwQztBQUVBLFNBQVNFLFVBQVUsRUFBRUwsUUFBUSxFQUFpQztJQUM1RCxNQUFNLEVBQUVNLE1BQU1DLE9BQU8sRUFBRSxHQUFHbEIsMkRBQVVBO0lBQ3BDLHFCQUNFLDhEQUFDWCwyQ0FBYzs7MEJBQ2IsOERBQUNJLGtEQUFJQTswQkFDSCw0RUFBQzJCO29CQUFLQyxNQUFLO29CQUFXQyxTQUFROzs7Ozs7Ozs7OzswQkFFaEMsOERBQUNoQyw2REFBV0E7Z0JBQ1ZpQyxZQUFZcEI7Z0JBQ1pxQixVQUFVaEI7Z0JBQ1ZVLFNBQVNBO2dCQUNUTyxnQkFBZ0JoQjtnQkFDaEJQLE9BQU9BLDhDQUFLQTswQkFFWFM7Ozs7Ozs7Ozs7OztBQUlUO0FBRWUsU0FBU2UsSUFBSUMsS0FBeUI7SUFDbkQsTUFBTSxFQUNKQyxTQUFTLEVBQ1RDLFdBQVcsRUFBRVgsT0FBTyxFQUFFLEdBQUdXLFdBQVcsRUFDckMsR0FBR0Y7SUFFSixNQUFNRyxZQUFZRixVQUFVRSxTQUFTLElBQUlqQjtJQUN6QyxNQUFNa0IsY0FBY0gsVUFBVUcsV0FBVyxJQUFJO0lBRTdDLElBQUlDLGNBQWNGLHdCQUFVLDhEQUFDRjtRQUFXLEdBQUdDLFNBQVM7Ozs7OztJQUNwRCxJQUFJRSxhQUFhO1FBQ2ZDLDRCQUFjLDhEQUFDdEI7c0JBQWFzQjs7Ozs7O0lBQzlCO0lBQ0FBLDRCQUFjLDhEQUFDaEI7a0JBQVdnQjs7Ozs7O0lBRTFCLHFCQUNFLDhEQUFDdEMsa0ZBQWdCQTtRQUFFLEdBQUdpQyxLQUFLO2tCQUN6Qiw0RUFBQzlCLDREQUFlQTtZQUFDcUIsU0FBU0E7c0JBQ3ZCYzs7Ozs7Ozs7Ozs7QUFJVCIsInNvdXJjZXMiOlsiL1VzZXJzL2hvaHV5ODUyL0RvY3VtZW50cy96NzYtYXBwcy9wYWdlcy9fYXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBcHBQcm92aWRlciB9IGZyb20gJ0B0b29scGFkL2NvcmUvbmV4dGpzJztcbmltcG9ydCB7IERhc2hib2FyZExheW91dCB9IGZyb20gJ0B0b29scGFkL2NvcmUvRGFzaGJvYXJkTGF5b3V0JztcbmltcG9ydCB7IFBhZ2VDb250YWluZXIgfSBmcm9tICdAdG9vbHBhZC9jb3JlL1BhZ2VDb250YWluZXInO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCB7IEFwcENhY2hlUHJvdmlkZXIgfSBmcm9tICdAbXVpL21hdGVyaWFsLW5leHRqcy92MTQtcGFnZXNSb3V0ZXInO1xuaW1wb3J0IERhc2hib2FyZEljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9EYXNoYm9hcmQnO1xuaW1wb3J0IFNob3BwaW5nQ2FydEljb24gZnJvbSAnQG11aS9pY29ucy1tYXRlcmlhbC9TaG9wcGluZ0NhcnQnO1xuaW1wb3J0IHR5cGUgeyBOZXh0UGFnZSB9IGZyb20gJ25leHQnO1xuaW1wb3J0IHR5cGUgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcbmltcG9ydCB0eXBlIHsgTmF2aWdhdGlvbiB9IGZyb20gJ0B0b29scGFkL2NvcmUvQXBwUHJvdmlkZXInO1xuaW1wb3J0IHsgU2Vzc2lvblByb3ZpZGVyLCBzaWduSW4sIHNpZ25PdXQsIHVzZVNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgvcmVhY3QnO1xuaW1wb3J0IExpbmVhclByb2dyZXNzIGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGluZWFyUHJvZ3Jlc3MnO1xuXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vdGhlbWUnO1xuXG5leHBvcnQgdHlwZSBOZXh0UGFnZVdpdGhMYXlvdXQ8UCA9IHt9LCBJUCA9IFA+ID0gTmV4dFBhZ2U8UCwgSVA+ICYge1xuICBnZXRMYXlvdXQ/OiAocGFnZTogUmVhY3QuUmVhY3RFbGVtZW50KSA9PiBSZWFjdC5SZWFjdE5vZGU7XG4gIHJlcXVpcmVBdXRoPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgQXBwUHJvcHNXaXRoTGF5b3V0ID0gQXBwUHJvcHMgJiB7XG4gIENvbXBvbmVudDogTmV4dFBhZ2VXaXRoTGF5b3V0O1xufTtcblxuY29uc3QgTkFWSUdBVElPTjogTmF2aWdhdGlvbiA9IFtcbiAge1xuICAgIGtpbmQ6ICdoZWFkZXInLFxuICAgIHRpdGxlOiAnTWFpbiBpdGVtcycsXG4gIH0sXG4gIHtcbiAgICBzZWdtZW50OiAnJyxcbiAgICB0aXRsZTogJ0Rhc2hib2FyZCcsXG4gICAgaWNvbjogPERhc2hib2FyZEljb24gLz4sXG4gIH0sXG4gIHtcbiAgICBzZWdtZW50OiAnb3JkZXJzJyxcbiAgICB0aXRsZTogJ09yZGVycycsXG4gICAgaWNvbjogPFNob3BwaW5nQ2FydEljb24gLz4sXG4gIH0sXG5dO1xuXG5jb25zdCBCUkFORElORyA9IHtcbiAgdGl0bGU6ICdNeSBUb29scGFkIENvcmUgTmV4dC5qcyBQYWdlcyBBcHAnLFxufTtcblxuXG5jb25zdCBBVVRIRU5USUNBVElPTiA9IHtcbiAgc2lnbkluLFxuICBzaWduT3V0LFxufTtcblxuZnVuY3Rpb24gUmVxdWlyZUF1dGgoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCB7IHN0YXR1cyB9ID0gdXNlU2Vzc2lvbigpO1xuICBcbiAgaWYgKHN0YXR1cyA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgcmV0dXJuIDxMaW5lYXJQcm9ncmVzcyAvPjtcbiAgfVxuXG4gIFxuXG5cbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5cbmZ1bmN0aW9uIGdldERlZmF1bHRMYXlvdXQocGFnZTogUmVhY3QuUmVhY3RFbGVtZW50KSB7XG4gIHJldHVybiAoXG4gICAgPERhc2hib2FyZExheW91dD5cbiAgICAgIDxQYWdlQ29udGFpbmVyIG1heFdpZHRoPSdsZyc+e3BhZ2V9PC9QYWdlQ29udGFpbmVyPlxuICAgIDwvRGFzaGJvYXJkTGF5b3V0PlxuICApO1xufVxuXG5mdW5jdGlvbiBBcHBMYXlvdXQoeyBjaGlsZHJlbiB9OiB7IGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGUgfSkge1xuICBjb25zdCB7IGRhdGE6IHNlc3Npb24gfSA9IHVzZVNlc3Npb24oKTtcbiAgcmV0dXJuIChcbiAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICA8SGVhZD5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cImluaXRpYWwtc2NhbGU9MSwgd2lkdGg9ZGV2aWNlLXdpZHRoXCIgLz5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxBcHBQcm92aWRlclxuICAgICAgICBuYXZpZ2F0aW9uPXtOQVZJR0FUSU9OfVxuICAgICAgICBicmFuZGluZz17QlJBTkRJTkd9XG4gICAgICAgIHNlc3Npb249e3Nlc3Npb259XG4gICAgICAgIGF1dGhlbnRpY2F0aW9uPXtBVVRIRU5USUNBVElPTn1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L0FwcFByb3ZpZGVyPlxuICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcChwcm9wczogQXBwUHJvcHNXaXRoTGF5b3V0KSB7XG4gIGNvbnN0IHtcbiAgICBDb21wb25lbnQsXG4gICAgcGFnZVByb3BzOiB7IHNlc3Npb24sIC4uLnBhZ2VQcm9wcyB9LFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZ2V0TGF5b3V0ID0gQ29tcG9uZW50LmdldExheW91dCA/PyBnZXREZWZhdWx0TGF5b3V0O1xuICBjb25zdCByZXF1aXJlQXV0aCA9IENvbXBvbmVudC5yZXF1aXJlQXV0aCA/PyB0cnVlO1xuXG4gIGxldCBwYWdlQ29udGVudCA9IGdldExheW91dCg8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+KTtcbiAgaWYgKHJlcXVpcmVBdXRoKSB7XG4gICAgcGFnZUNvbnRlbnQgPSA8UmVxdWlyZUF1dGg+e3BhZ2VDb250ZW50fTwvUmVxdWlyZUF1dGg+O1xuICB9XG4gIHBhZ2VDb250ZW50ID0gPEFwcExheW91dD57cGFnZUNvbnRlbnR9PC9BcHBMYXlvdXQ+O1xuXG4gIHJldHVybiAoXG4gICAgPEFwcENhY2hlUHJvdmlkZXIgey4uLnByb3BzfT5cbiAgICAgIDxTZXNzaW9uUHJvdmlkZXIgc2Vzc2lvbj17c2Vzc2lvbn0+XG4gICAgICAgIHtwYWdlQ29udGVudH1cbiAgICAgIDwvU2Vzc2lvblByb3ZpZGVyPlxuICAgIDwvQXBwQ2FjaGVQcm92aWRlcj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkFwcFByb3ZpZGVyIiwiRGFzaGJvYXJkTGF5b3V0IiwiUGFnZUNvbnRhaW5lciIsIkhlYWQiLCJBcHBDYWNoZVByb3ZpZGVyIiwiRGFzaGJvYXJkSWNvbiIsIlNob3BwaW5nQ2FydEljb24iLCJTZXNzaW9uUHJvdmlkZXIiLCJzaWduSW4iLCJzaWduT3V0IiwidXNlU2Vzc2lvbiIsIkxpbmVhclByb2dyZXNzIiwidGhlbWUiLCJOQVZJR0FUSU9OIiwia2luZCIsInRpdGxlIiwic2VnbWVudCIsImljb24iLCJCUkFORElORyIsIkFVVEhFTlRJQ0FUSU9OIiwiUmVxdWlyZUF1dGgiLCJjaGlsZHJlbiIsInN0YXR1cyIsImdldERlZmF1bHRMYXlvdXQiLCJwYWdlIiwibWF4V2lkdGgiLCJBcHBMYXlvdXQiLCJkYXRhIiwic2Vzc2lvbiIsIkZyYWdtZW50IiwibWV0YSIsIm5hbWUiLCJjb250ZW50IiwibmF2aWdhdGlvbiIsImJyYW5kaW5nIiwiYXV0aGVudGljYXRpb24iLCJBcHAiLCJwcm9wcyIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsImdldExheW91dCIsInJlcXVpcmVBdXRoIiwicGFnZUNvbnRlbnQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./theme.ts":
/*!******************!*\
  !*** ./theme.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/node/styles/index.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nconst theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_0__.createTheme)({\n    cssVariables: {\n        colorSchemeSelector: 'data-toolpad-color-scheme'\n    },\n    colorSchemes: {\n        light: true,\n        dark: true\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90aGVtZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7NkRBRXFEO0FBRW5ELE1BQU1DLFFBQVFELGlFQUFXQSxDQUFDO0lBQ3hCRSxjQUFjO1FBQ1pDLHFCQUFxQjtJQUN2QjtJQUNBQyxjQUFjO1FBQUVDLE9BQU87UUFBTUMsTUFBTTtJQUFLO0FBRTFDO0FBRUEsaUVBQWVMLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob2h1eTg1Mi9Eb2N1bWVudHMvejc2LWFwcHMvdGhlbWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG4gIFwidXNlIGNsaWVudFwiO1xuICBpbXBvcnQgeyBjcmVhdGVUaGVtZSB9IGZyb20gJ0BtdWkvbWF0ZXJpYWwvc3R5bGVzJztcblxuICBjb25zdCB0aGVtZSA9IGNyZWF0ZVRoZW1lKHtcbiAgICBjc3NWYXJpYWJsZXM6IHtcbiAgICAgIGNvbG9yU2NoZW1lU2VsZWN0b3I6ICdkYXRhLXRvb2xwYWQtY29sb3Itc2NoZW1lJyxcbiAgICB9LFxuICAgIGNvbG9yU2NoZW1lczogeyBsaWdodDogdHJ1ZSwgZGFyazogdHJ1ZSB9LFxuICAgIFxuICB9KTtcblxuICBleHBvcnQgZGVmYXVsdCB0aGVtZTtcbiAgIl0sIm5hbWVzIjpbImNyZWF0ZVRoZW1lIiwidGhlbWUiLCJjc3NWYXJpYWJsZXMiLCJjb2xvclNjaGVtZVNlbGVjdG9yIiwiY29sb3JTY2hlbWVzIiwibGlnaHQiLCJkYXJrIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./theme.ts\n");

/***/ }),

/***/ "@mui/material-nextjs/v14-pagesRouter":
/*!*******************************************************!*\
  !*** external "@mui/material-nextjs/v14-pagesRouter" ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = require("@mui/material-nextjs/v14-pagesRouter");

/***/ }),

/***/ "@mui/system":
/*!******************************!*\
  !*** external "@mui/system" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@mui/system");

/***/ }),

/***/ "@mui/system/DefaultPropsProvider":
/*!***************************************************!*\
  !*** external "@mui/system/DefaultPropsProvider" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/DefaultPropsProvider");

/***/ }),

/***/ "@mui/system/InitColorSchemeScript":
/*!****************************************************!*\
  !*** external "@mui/system/InitColorSchemeScript" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/InitColorSchemeScript");

/***/ }),

/***/ "@mui/system/RtlProvider":
/*!******************************************!*\
  !*** external "@mui/system/RtlProvider" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/RtlProvider");

/***/ }),

/***/ "@mui/system/colorManipulator":
/*!***********************************************!*\
  !*** external "@mui/system/colorManipulator" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/colorManipulator");

/***/ }),

/***/ "@mui/system/createBreakpoints":
/*!************************************************!*\
  !*** external "@mui/system/createBreakpoints" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createBreakpoints");

/***/ }),

/***/ "@mui/system/createStyled":
/*!*******************************************!*\
  !*** external "@mui/system/createStyled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createStyled");

/***/ }),

/***/ "@mui/system/createTheme":
/*!******************************************!*\
  !*** external "@mui/system/createTheme" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/system/createTheme");

/***/ }),

/***/ "@mui/system/cssVars":
/*!**************************************!*\
  !*** external "@mui/system/cssVars" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@mui/system/cssVars");

/***/ }),

/***/ "@mui/system/spacing":
/*!**************************************!*\
  !*** external "@mui/system/spacing" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@mui/system/spacing");

/***/ }),

/***/ "@mui/system/styleFunctionSx":
/*!**********************************************!*\
  !*** external "@mui/system/styleFunctionSx" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/styleFunctionSx");

/***/ }),

/***/ "@mui/system/useThemeProps":
/*!********************************************!*\
  !*** external "@mui/system/useThemeProps" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/system/useThemeProps");

/***/ }),

/***/ "@mui/utils":
/*!*****************************!*\
  !*** external "@mui/utils" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@mui/utils");

/***/ }),

/***/ "@mui/utils/capitalize":
/*!****************************************!*\
  !*** external "@mui/utils/capitalize" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/capitalize");

/***/ }),

/***/ "@mui/utils/composeClasses":
/*!********************************************!*\
  !*** external "@mui/utils/composeClasses" ***!
  \********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/composeClasses");

/***/ }),

/***/ "@mui/utils/createChainedFunction":
/*!***************************************************!*\
  !*** external "@mui/utils/createChainedFunction" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/createChainedFunction");

/***/ }),

/***/ "@mui/utils/debounce":
/*!**************************************!*\
  !*** external "@mui/utils/debounce" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/debounce");

/***/ }),

/***/ "@mui/utils/deepmerge":
/*!***************************************!*\
  !*** external "@mui/utils/deepmerge" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deepmerge");

/***/ }),

/***/ "@mui/utils/deprecatedPropType":
/*!************************************************!*\
  !*** external "@mui/utils/deprecatedPropType" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/deprecatedPropType");

/***/ }),

/***/ "@mui/utils/formatMuiErrorMessage":
/*!***************************************************!*\
  !*** external "@mui/utils/formatMuiErrorMessage" ***!
  \***************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/formatMuiErrorMessage");

/***/ }),

/***/ "@mui/utils/generateUtilityClass":
/*!**************************************************!*\
  !*** external "@mui/utils/generateUtilityClass" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClass");

/***/ }),

/***/ "@mui/utils/generateUtilityClasses":
/*!****************************************************!*\
  !*** external "@mui/utils/generateUtilityClasses" ***!
  \****************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/generateUtilityClasses");

/***/ }),

/***/ "@mui/utils/isMuiElement":
/*!******************************************!*\
  !*** external "@mui/utils/isMuiElement" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/isMuiElement");

/***/ }),

/***/ "@mui/utils/ownerDocument":
/*!*******************************************!*\
  !*** external "@mui/utils/ownerDocument" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerDocument");

/***/ }),

/***/ "@mui/utils/ownerWindow":
/*!*****************************************!*\
  !*** external "@mui/utils/ownerWindow" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/ownerWindow");

/***/ }),

/***/ "@mui/utils/requirePropFactory":
/*!************************************************!*\
  !*** external "@mui/utils/requirePropFactory" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/requirePropFactory");

/***/ }),

/***/ "@mui/utils/setRef":
/*!************************************!*\
  !*** external "@mui/utils/setRef" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/setRef");

/***/ }),

/***/ "@mui/utils/unsupportedProp":
/*!*********************************************!*\
  !*** external "@mui/utils/unsupportedProp" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/unsupportedProp");

/***/ }),

/***/ "@mui/utils/useControlled":
/*!*******************************************!*\
  !*** external "@mui/utils/useControlled" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useControlled");

/***/ }),

/***/ "@mui/utils/useEnhancedEffect":
/*!***********************************************!*\
  !*** external "@mui/utils/useEnhancedEffect" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEnhancedEffect");

/***/ }),

/***/ "@mui/utils/useEventCallback":
/*!**********************************************!*\
  !*** external "@mui/utils/useEventCallback" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useEventCallback");

/***/ }),

/***/ "@mui/utils/useForkRef":
/*!****************************************!*\
  !*** external "@mui/utils/useForkRef" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useForkRef");

/***/ }),

/***/ "@mui/utils/useId":
/*!***********************************!*\
  !*** external "@mui/utils/useId" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@mui/utils/useId");

/***/ }),

/***/ "@toolpad/core/DashboardLayout":
/*!************************************************!*\
  !*** external "@toolpad/core/DashboardLayout" ***!
  \************************************************/
/***/ ((module) => {

module.exports = require("@toolpad/core/DashboardLayout");

/***/ }),

/***/ "@toolpad/core/PageContainer":
/*!**********************************************!*\
  !*** external "@toolpad/core/PageContainer" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("@toolpad/core/PageContainer");

/***/ }),

/***/ "@toolpad/core/nextjs":
/*!***************************************!*\
  !*** external "@toolpad/core/nextjs" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@toolpad/core/nextjs");

/***/ }),

/***/ "clsx":
/*!***********************!*\
  !*** external "clsx" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("clsx");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "@auth/core/errors":
/*!************************************!*\
  !*** external "@auth/core/errors" ***!
  \************************************/
/***/ ((module) => {

module.exports = import("@auth/core/errors");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@mui","vendor-chunks/next-auth","vendor-chunks/@babel"], () => (__webpack_exec__("./pages/_app.tsx")));
module.exports = __webpack_exports__;

})();