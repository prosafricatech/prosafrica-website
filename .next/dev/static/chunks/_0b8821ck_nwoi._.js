(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const styles = {
    primary: {
        md: 'bg-indigo text-white shadow-[0_14px_30px_rgba(33,19,173,0.25)] text-base px-7.5 py-4',
        sm: 'bg-indigo text-white shadow-[0_14px_30px_rgba(33,19,173,0.25)] text-[15px] px-6 py-[13px]'
    },
    outline: {
        md: 'bg-white text-indigo border-[1.5px] border-indigo text-base px-7.5 py-[15px]',
        sm: 'bg-white text-indigo border-[1.5px] border-indigo text-[15px] px-6 py-[13px]'
    },
    light: {
        md: 'bg-white text-indigo shadow-[0_14px_30px_rgba(12,10,46,0.3)] text-base px-7.5 py-4',
        sm: 'bg-white text-indigo text-[15px] px-6 py-[13px]'
    },
    outlineLight: {
        md: 'bg-transparent text-white border-[1.5px] border-white text-base px-7.5 py-[15px]',
        sm: 'bg-transparent text-white border-[1.5px] border-white text-[15px] px-6 py-[13px]'
    },
    pink: {
        md: 'bg-pink text-white text-base px-[34px] py-4',
        sm: 'bg-pink text-white text-[15px] px-6 py-[13px]'
    }
};
function Button({ variant = 'primary', size = 'md', href, className, children, ...rest }) {
    const classes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-block rounded-full border-0 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none', styles[variant][size], className);
    if (href) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            className: classes,
            children: children
        }, void 0, false, {
            fileName: "[project]/components/Button.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: classes,
        ...rest,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Button.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
function Logo({ light = false, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "/",
        "aria-label": "ProsERP home",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center', className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
            src: light ? '/logos/proserp-logo-reversed.png' : '/logos/proserp-logo.png',
            alt: "ProsERP",
            width: 800,
            height: 280,
            priority: true,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-auto', light ? 'h-10' : 'h-9')
        }, void 0, false, {
            fileName: "[project]/components/Logo.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Logo.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Nav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function Nav() {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // The menu is open only on the page it was opened on, so it closes by itself when the page changes.
    const [openOn, setOpenOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const open = openOn === path;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-auto relative w-full max-w-280 rounded-3xl shadow-[0_10px_40px_rgba(12,10,46,0.14),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.5),inset_0_0_24px_rgba(255,255,255,0.28)] backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-br before:from-white/55 before:via-transparent before:to-white/25 after:pointer-events-none after:absolute after:inset-x-6 after:top-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-white after:to-transparent", open ? "bg-white/95" : "bg-white/50"),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex h-16 items-center justify-between gap-6 px-4 md:h-17 md:px-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hidden gap-9 text-[15px] font-semibold md:flex", "text-body"),
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: l.href,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:text-indigo", path === l.href && "text-indigo"),
                                    children: l.label
                                }, l.href, false, {
                                    fileName: "[project]/components/Nav.tsx",
                                    lineNumber: 34,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/contact",
                                size: "sm",
                                variant: "primary",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].ctaLabel
                            }, void 0, false, {
                                fileName: "[project]/components/Nav.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-label": open ? "Close menu" : "Open menu",
                            "aria-expanded": open,
                            onClick: ()=>setOpenOn(open ? null : path),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex size-11 items-center justify-center rounded-xl text-navy md:hidden"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 24 24",
                                className: "size-6",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                strokeLinecap: "round",
                                children: open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M6 6l12 12M18 6 6 18"
                                }, void 0, false, {
                                    fileName: "[project]/components/Nav.tsx",
                                    lineNumber: 71,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    d: "M4 7h16M4 12h16M4 17h16"
                                }, void 0, false, {
                                    fileName: "[project]/components/Nav.tsx",
                                    lineNumber: 73,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Nav.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Nav.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative border-t border-navy/10 px-4 pt-2 pb-4 md:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex flex-col",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nav"].map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: l.href,
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl px-3 py-3.5 text-[17px] font-semibold", path === l.href ? "bg-tint text-indigo" : "text-navy"),
                                    children: l.label
                                }, l.href, false, {
                                    fileName: "[project]/components/Nav.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 81,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/contact",
                            size: "sm",
                            className: "mt-3 block w-full text-center",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["site"].ctaLabel
                        }, void 0, false, {
                            fileName: "[project]/components/Nav.tsx",
                            lineNumber: 95,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Nav.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Nav.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Nav.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(Nav, "LDWcSIim5FxGXjcT94qX6JFBGfI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Nav;
var _c;
__turbopack_context__.k.register(_c, "Nav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "about",
    ()=>about,
    "clients",
    ()=>clients,
    "contact",
    ()=>contact,
    "contactForm",
    ()=>contactForm,
    "faqs",
    ()=>faqs,
    "footer",
    ()=>footer,
    "highlights",
    ()=>highlights,
    "home",
    ()=>home,
    "industries",
    ()=>industries,
    "modules",
    ()=>modules,
    "nav",
    ()=>nav,
    "points",
    ()=>points,
    "sectors",
    ()=>sectors,
    "site",
    ()=>site,
    "steps",
    ()=>steps,
    "values",
    ()=>values
]);
const modules = [
    {
        n: '01',
        name: 'Accounting',
        desc: 'Ledgers, payments and reports that follow every transaction back to its source.'
    },
    {
        n: '02',
        name: 'Procurement',
        desc: 'Requisitions, purchase orders and supplier records with clear approval trails.'
    },
    {
        n: '03',
        name: 'Inventory',
        desc: 'Track stock across stores and sites, with receipts and issues tied to projects.'
    },
    {
        n: '04',
        name: 'HR & Payroll',
        desc: 'Employee records, leave, loan management and payroll in one place, from hiring to monthly pay.'
    },
    {
        n: '05',
        name: 'POS',
        desc: 'Sell at the counter and keep every sale connected to your stock and accounts.'
    },
    {
        n: '06',
        name: 'Fuel Station',
        desc: 'Run pump sales, fuel stock and daily station operations alongside the rest of your business.'
    },
    {
        n: '07',
        name: 'Projects',
        desc: 'Plan work, assign teams and see cost against progress as the job moves.'
    },
    {
        n: '08',
        name: 'Bio Farming',
        desc: 'Run fish and poultry farms: stock, feed and costs tracked in the same records your finance team uses.'
    }
];
const sectors = [
    {
        tag: 'SECTOR 01',
        name: 'Manufacturing',
        sub: 'Plants, stores and production costs under one roof.',
        img: '/images/silos.jpg',
        desc: 'Keep raw materials, finished stock, wages and purchasing connected, so production cost is clear at month end.',
        mods: [
            'Accounting',
            'Procurement',
            'Inventory',
            'HR & Payroll'
        ],
        features: [
            'Combine raw materials and production costs',
            'Calculate accurate cost per unit of finished goods',
            'Track work in progress and production runs',
            'Move finished goods into inventory automatically',
            'Analyze production efficiency and profitability'
        ]
    },
    {
        tag: 'SECTOR 02',
        name: 'Fuel & Energy',
        sub: 'Stock, suppliers and site operations kept accountable.',
        img: '/images/fuel.jpg',
        desc: 'Track stock, suppliers and site activity with approvals and records that stand up to review.',
        mods: [
            'Accounting',
            'Procurement',
            'Inventory',
            'Fuel Station'
        ],
        features: [
            'Record sales for every shift',
            'Track fuel stock per tank and nozzle',
            'Monitor dipping and variance',
            'Manage fuel deliveries and procurement',
            'Connect fuel operations to accounting and inventory'
        ]
    },
    {
        tag: 'SECTOR 03',
        name: 'Construction',
        sub: 'Materials, resources and project costs in step.',
        img: '/images/construction.jpg',
        desc: 'Tie materials, labour and spending to each project so you can track costs against progress while work is ongoing.',
        mods: [
            'Accounting',
            'Procurement',
            'Projects',
            'HR & Payroll'
        ],
        features: [
            'Define deliverables and milestones',
            'Build and manage work breakdown structures',
            'Manage subcontractors and site activities',
            'Control material consumption during execution',
            'Prepare payment claims and certificates',
            'Manage budgets and cost overruns'
        ]
    },
    {
        tag: 'SECTOR 04',
        name: 'Property Management',
        sub: 'Properties, staff and spending in one place.',
        img: '/images/property.jpg',
        desc: 'Track maintenance purchases, staff and running costs across your properties with clear records and approvals.',
        mods: [
            'Accounting',
            'Procurement',
            'HR & Payroll'
        ]
    },
    {
        tag: 'SECTOR 05',
        name: 'Distribution',
        sub: 'Stock moving between stores, always accounted for.',
        img: '/images/distribution.jpg',
        desc: 'Follow stock from supplier to store to customer, with purchasing and accounts tied to every movement.',
        mods: [
            'Accounting',
            'Procurement',
            'Inventory'
        ],
        features: [
            'Manage sales, purchases and expenses',
            'Track inventory across branches',
            'Handle customers, suppliers and pricing',
            'Operate multiple outlets under one system'
        ]
    },
    {
        tag: 'SECTOR 06',
        name: 'Wholesale',
        sub: 'Bulk buying and selling with clean records.',
        img: '/images/wholesale.jpg',
        desc: 'Manage bulk purchases, stock levels and counter sales, with every sale connected to your stock and accounts.',
        mods: [
            'Accounting',
            'Inventory',
            'POS'
        ],
        features: [
            'Manage sales, purchases and expenses',
            'Track inventory across branches',
            'Handle customers, suppliers and pricing',
            'Get P&L, balance sheet and cash flow reports'
        ]
    }
];
const points = [
    'Designed around real operational workflows',
    'Industry-ready ERP, not generic software',
    'Finance and operations fully integrated',
    'Scalable, simple to use, and powerful where it matters'
];
const values = [
    {
        n: '01',
        name: 'Built for how you work',
        desc: 'We design around real approvals, stores and payrolls, not generic templates.'
    },
    {
        n: '02',
        name: 'One source of truth',
        desc: 'Every department reads and writes the same records, so figures agree.'
    },
    {
        n: '03',
        name: 'Support you can reach',
        desc: 'Local people who understand your business answer when you need help.'
    }
];
const nav = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/about',
        label: 'About'
    },
    {
        href: '/industries',
        label: 'Industries'
    },
    {
        href: '/contact',
        label: 'Contact'
    }
];
const highlights = [
    {
        name: 'Accounting',
        image: '/images/modules/accounting.jpg',
        items: [
            'Ledgers and payments',
            'Reports traced to source entries',
            'Shared data with every other module'
        ]
    },
    {
        name: 'Procurement',
        image: '/images/modules/procurement.jpg',
        items: [
            'Purchase requisitions and orders',
            'Supplier records',
            'Approval trail on every request'
        ]
    },
    {
        name: 'Inventory',
        image: '/images/modules/inventory.jpg',
        items: [
            'Stock across stores and sites',
            'Receipts and issues',
            'Stock linked to projects'
        ]
    },
    {
        name: 'HR & Payroll',
        image: '/images/modules/hr-meeting.jpg',
        items: [
            'Employee profiles and designations',
            'Leave records per employee',
            'Loan management for staff',
            'Payroll from the same staff records'
        ]
    },
    {
        name: 'POS',
        image: '/images/modules/pos-cashier.jpg',
        items: [
            'Sales counters for daily selling',
            'Sales reports by product',
            'Sales per salesperson'
        ]
    },
    {
        name: 'Fuel Station',
        image: '/images/modules/fuel-station-sky.jpg',
        items: [
            'Pump sales and fuel stock',
            'Tank dipping records and reports',
            'Station activity tied to your accounts'
        ]
    },
    {
        name: 'Projects',
        image: '/images/modules/projects-meeting.jpg',
        items: [
            'Deliverables and work breakdown',
            'Budgets, subcontracts and claims',
            'Progress updates and project stores'
        ]
    },
    {
        name: 'Bio Farming',
        image: '/images/modules/bio-farming-sea.jpg',
        items: [
            'Fish and poultry stock and feed records',
            'Purchases and costs per farm',
            'Figures shared with finance'
        ]
    }
];
const steps = [
    {
        n: '1',
        name: 'Tell us about your operation',
        desc: 'Share what you run today and where the friction is.'
    },
    {
        n: '2',
        name: 'See ProsERP in action',
        desc: 'We walk your team through the modules that match your work.'
    },
    {
        n: '3',
        name: 'Choose your modules',
        desc: 'Start with what you need now and add more as you grow.'
    }
];
const faqs = [
    {
        q: 'Can we start with just one module?',
        a: 'Yes. Start with one and add others later. All modules share the same data.'
    },
    {
        q: 'Which industries is ProsERP built for?',
        a: 'Manufacturing, fuel and energy, construction, property management, distribution and wholesale. See the Industries page for detail.'
    },
    {
        q: 'Who builds and supports ProsERP?',
        a: 'ProsERP is a product of ProsAfrica, developed and supported in Tanzania.'
    },
    {
        q: 'How much does it cost?',
        a: 'Pricing depends on your business and the modules you need. Contact our team and we will prepare a quote for you.'
    },
    {
        q: 'How do I see a demo?',
        a: 'Use the Contact page to request one and tell us what you would like to see.'
    }
];
const clients = [
    {
        name: 'Black Mountain',
        src: '/logos/black-mountain.png',
        w: 410,
        h: 203
    },
    {
        name: 'Brecol',
        src: '/logos/brecol.png',
        w: 321,
        h: 240
    },
    {
        name: 'BuildSol',
        src: '/logos/buildsol.png',
        w: 283,
        h: 240
    },
    {
        name: 'Victoria Service Station',
        src: '/logos/victoria-service-station.png',
        w: 184,
        h: 71
    },
    {
        name: "Farmer's Basket",
        src: '/logos/farmers-basket.png',
        w: 189,
        h: 240
    },
    {
        name: 'doyy Beauty',
        src: '/logos/doyy-beauty.png',
        w: 406,
        h: 240
    },
    {
        name: 'Transpower',
        src: '/logos/transpower.png',
        w: 480,
        h: 57
    },
    {
        name: 'White City International',
        src: '/logos/white-city-international.png',
        w: 231,
        h: 240
    },
    {
        name: 'Dubai Energies',
        src: '/logos/dubai-energies.png',
        w: 480,
        h: 210
    },
    {
        name: 'The Big Best',
        src: '/logos/the-big-best.png',
        w: 358,
        h: 240
    },
    {
        name: 'GP Petrol Stations',
        src: '/logos/gp-petrol-stations.png',
        w: 480,
        h: 219
    },
    {
        name: 'RES Company Ltd',
        src: '/logos/res-company.png',
        w: 386,
        h: 240
    },
    {
        name: 'Shalakh Trading Company Ltd',
        src: '/logos/shalakh-trading.png',
        w: 480,
        h: 141
    },
    {
        name: 'Namis Corporate Ltd',
        src: '/logos/namis-corporate.png',
        w: 480,
        h: 185
    }
];
const site = {
    title: 'ProsERP',
    description: 'One system for accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming.',
    ctaLabel: 'Request a demo'
};
const footer = {
    blurb: 'One platform for accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming.',
    companyLinks: [
        {
            href: '/about',
            label: 'About'
        },
        {
            href: '/industries',
            label: 'Industries'
        },
        {
            href: '/contact',
            label: 'Contact'
        }
    ],
    moduleNames: [
        'Accounting',
        'Procurement',
        'Inventory',
        'HR & Payroll',
        'POS',
        'Fuel Station',
        'Projects',
        'Bio Farming'
    ],
    contact: [
        'info@prosafrica.com',
        '+255 746 917 817',
        'Dar es Salaam, Tanzania'
    ],
    copyright: '© ProsERP. All rights reserved.'
};
const home = {
    meta: {
        title: 'ProsERP'
    },
    hero: {
        badge: 'ENTERPRISE RESOURCE PLANNING',
        title: 'One system to run every part of your business.',
        lead: 'ProsERP brings accounting, procurement, inventory, HR & payroll, POS, fuel station, projects and bio farming into one platform, so your teams work from the same numbers.',
        primaryCta: 'Request a demo',
        secondaryCta: 'See industries',
        image: {
            src: '/images/dashboard.webp',
            alt: 'ProsERP dashboard showing profit and loss and balance sheet trends'
        }
    },
    clientsTitle: 'Trusted by a variety of businesses',
    modulesHeading: {
        eyebrow: 'The platform',
        title: 'Everything your operation needs, in eight modules.',
        text: 'Start with one, add the rest as you grow. Every module shares the same data.'
    },
    devices: {
        title: 'Choose where you work from.',
        text: 'ProsERP works on your laptop and on your phone. One system and one set of data, on every screen.',
        laptop: {
            name: 'Laptop and desktop',
            desc: 'The full system on a bigger screen, for the work you do at your desk.'
        },
        phone: {
            name: 'Mobile phone',
            desc: 'The same system in your pocket, so work does not wait until you are back at the office.'
        },
        laptopAlt: 'ProsERP dashboard on a laptop',
        phoneAlt: 'ProsERP dashboard on a mobile phone'
    },
    industriesHeading: {
        eyebrow: 'Industries',
        title: 'Built for heavy, high-volume work.'
    },
    industriesLink: 'Explore all industries →',
    workingTogether: {
        eyebrow: 'Working together',
        title: 'Your team, finance and field on the same page.',
        text: 'When purchasing, stores, payroll and accounts share one record, approvals move faster and nobody re-types the same data twice.',
        image: {
            src: '/images/team.jpg',
            alt: 'A team working together'
        }
    },
    stepsHeading: {
        eyebrow: 'Getting started',
        title: 'From first call to first module.'
    },
    faqHeading: {
        eyebrow: 'FAQ',
        title: 'Common questions.'
    },
    cta: {
        title: 'See ProsERP running on your own workflow.',
        text: 'Book a walkthrough and tell us what you run today. We will show you where ProsERP fits.'
    }
};
const about = {
    meta: {
        title: 'About | ProsAfrica'
    },
    hero: {
        eyebrow: 'About ProsAfrica',
        title: 'Business operations, made simpler.',
        lead: 'We believe businesses perform better when their operations work together.'
    },
    topImage: {
        src: '/images/team.jpg',
        alt: 'The team at work'
    },
    story: {
        eyebrow: 'Who we are',
        title: 'One connected platform for how you run.',
        paragraphs: [
            'ProsAfrica provides business management technology designed to help organisations manage their finances, people, resources and daily operations through one connected platform.',
            'Through ProsERP, we bring essential business functions together, giving organisations better visibility, control and the information they need to make informed decisions.'
        ]
    },
    whatWeDo: {
        eyebrow: 'What we do',
        title: 'One ERP. Every part of the operation.',
        text: 'We provide an integrated Enterprise Resource Planning (ERP) solution that connects key business operations, including:',
        items: [
            'Financial Management',
            'Procurement',
            'Inventory Management',
            'Project Management',
            'Manufacturing',
            'Fuel Management',
            'Human Resources',
            'Asset Register'
        ],
        closing: 'Our solution is designed to support businesses across different industries, adapting to their operational needs as they grow.'
    },
    approach: {
        eyebrow: 'Our approach',
        title: 'We understand that every business operates differently.',
        text: 'That is why we focus on providing flexible solutions that fit the way organisations work. From system setup and configuration to training and ongoing support, we work with businesses to make technology practical and useful.',
        steps: [
            {
                n: '1',
                name: 'Setup and configuration',
                desc: 'ProsERP is set up around how your business actually works.'
            },
            {
                n: '2',
                name: 'Training',
                desc: 'Your people learn the system so they can use it with confidence.'
            },
            {
                n: '3',
                name: 'Ongoing support',
                desc: 'Help stays available as your business and your needs grow.'
            }
        ]
    },
    whyHeading: {
        eyebrow: 'Why ProsAfrica?',
        title: 'What you can expect from us.'
    },
    why: [
        {
            n: '1',
            name: 'Connected Operations',
            desc: 'Bring essential business functions into one system.'
        },
        {
            n: '2',
            name: 'Better Visibility',
            desc: 'Access business information and reports in one place.'
        },
        {
            n: '3',
            name: 'Flexible Solutions',
            desc: 'Support different business structures and operational needs.'
        },
        {
            n: '4',
            name: 'Practical Support',
            desc: 'Get assistance with implementation, training and system use.'
        }
    ],
    whereWeWork: {
        eyebrow: 'Where we work',
        title: 'From the boardroom to the site office.',
        text: 'Leaders get the full picture on a dashboard. Teams in stores, yards and plants get simple screens for their daily tasks.',
        image: {
            src: '/images/boardroom.jpg',
            alt: 'Boardroom with the ProsERP dashboard'
        }
    },
    cta: {
        title: "Let's move your business forward.",
        text: 'Discover how ProsERP can bring your business operations together.',
        button: 'Request a Demo'
    }
};
const industries = {
    meta: {
        title: 'Industries | ProsERP'
    },
    hero: {
        eyebrow: 'Industries',
        title: 'Sectors we support.',
        lead: 'ProsERP fits businesses that move materials, manage labour and answer for every shilling spent.'
    },
    cta: {
        title: 'Not sure where you fit? Ask us.'
    }
};
const contactForm = {
    fields: [
        {
            label: 'Full name',
            id: 'name',
            placeholder: 'Your name'
        },
        {
            label: 'Company',
            id: 'company',
            placeholder: 'Company name'
        },
        {
            label: 'Email',
            id: 'email',
            type: 'email',
            placeholder: 'you@company.com'
        },
        {
            label: 'Phone',
            id: 'phone',
            type: 'tel',
            placeholder: '+255'
        }
    ],
    industryOptions: [
        ...sectors.map((s)=>s.name),
        'Other'
    ],
    messagePlaceholder: 'Tell us what you would like to improve',
    submitLabel: 'Send message'
};
const contact = {
    meta: {
        title: 'Contact | ProsERP'
    },
    hero: {
        eyebrow: 'Contact',
        title: 'Let us talk.',
        lead: 'Tell us about your business and we will arrange a walkthrough of ProsERP.'
    },
    image: {
        src: '/images/team.jpg',
        alt: 'Our team ready to help'
    },
    info: [
        {
            label: 'Email',
            value: 'info@prosafrica.com'
        },
        {
            label: 'Support',
            value: 'support@prosafrica.co.tz'
        },
        {
            label: 'Phone',
            value: '+255 746 917 817'
        },
        {
            label: 'Office',
            value: 'Dar es Salaam, Tanzania'
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0b8821ck_nwoi._.js.map