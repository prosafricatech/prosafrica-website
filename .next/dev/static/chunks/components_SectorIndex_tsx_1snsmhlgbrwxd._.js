(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/SectorIndex.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SectorIndex
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SectorIndex({ items }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(items[0]?.slug);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SectorIndex.useEffect": ()=>{
            const els = items.map({
                "SectorIndex.useEffect.els": (i)=>document.getElementById(i.slug)
            }["SectorIndex.useEffect.els"]).filter({
                "SectorIndex.useEffect.els": (el)=>!!el
            }["SectorIndex.useEffect.els"]);
            if (!els.length) return;
            // An industry is "current" while it crosses a line about a third of the way down the screen.
            const io = new IntersectionObserver({
                "SectorIndex.useEffect": (entries)=>{
                    for (const e of entries)if (e.isIntersecting) setActive(e.target.id);
                }
            }["SectorIndex.useEffect"], {
                rootMargin: '-30% 0px -65% 0px'
            });
            els.forEach({
                "SectorIndex.useEffect": (el)=>io.observe(el)
            }["SectorIndex.useEffect"]);
            return ({
                "SectorIndex.useEffect": ()=>io.disconnect()
            })["SectorIndex.useEffect"];
        }
    }["SectorIndex.useEffect"], [
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Industries",
        className: "hidden lg:block",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "sticky top-28 flex flex-col",
            children: items.map((s, i)=>{
                const on = s.slug === active;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `#${s.slug}`,
                        "aria-current": on ? 'true' : undefined,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex items-baseline gap-3 border-b border-border/70 py-3.5 text-[15.5px] font-semibold transition-colors duration-300 hover:text-indigo', on ? 'text-indigo' : 'text-body'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute bottom-[-1px] left-0 h-px bg-indigo transition-all duration-300', on ? 'w-full' : 'w-0')
                            }, void 0, false, {
                                fileName: "[project]/components/SectorIndex.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs font-bold tracking-wider transition-colors duration-300', on ? 'text-indigo' : 'text-muted'),
                                children: String(i + 1).padStart(2, '0')
                            }, void 0, false, {
                                fileName: "[project]/components/SectorIndex.tsx",
                                lineNumber: 43,
                                columnNumber: 17
                            }, this),
                            s.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/SectorIndex.tsx",
                        lineNumber: 31,
                        columnNumber: 15
                    }, this)
                }, s.slug, false, {
                    fileName: "[project]/components/SectorIndex.tsx",
                    lineNumber: 30,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/components/SectorIndex.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/SectorIndex.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(SectorIndex, "5pJmF2iWilJp3uhIgmSVbzh3VT4=");
_c = SectorIndex;
var _c;
__turbopack_context__.k.register(_c, "SectorIndex");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_SectorIndex_tsx_1snsmhlgbrwxd._.js.map