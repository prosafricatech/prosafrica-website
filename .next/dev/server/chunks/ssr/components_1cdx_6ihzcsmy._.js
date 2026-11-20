module.exports = [
"[project]/components/BranchDiagram.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BranchDiagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Container.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Photo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Photo.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function BranchDiagram({ top, items }) {
    const wrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [segs, setSegs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dots, setDots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [drawn, setDrawn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = wrap.current;
        if (!el) return;
        const measure = ()=>{
            const c = el.getBoundingClientRect();
            const root = el.querySelector('[data-branch-root]')?.getBoundingClientRect();
            const leaves = [
                ...el.querySelectorAll('[data-branch-leaf]')
            ].map((n)=>n.getBoundingClientRect());
            if (!root || !leaves.length) return;
            const rx = root.left + root.width / 2 - c.left;
            const rb = root.bottom - c.top;
            const L = leaves.map((r)=>({
                    l: r.left - c.left,
                    r: r.right - c.left,
                    t: r.top - c.top,
                    b: r.bottom - c.top
                }));
            const rowTops = [
                ...new Set(L.map((r)=>Math.round(r.t)))
            ].sort((a, b)=>a - b);
            const cols = L.filter((r)=>Math.round(r.t) === rowTops[0]).length;
            const out = [];
            const pts = [
                {
                    x: rx,
                    y: rb,
                    delay: 0
                }
            ];
            if (cols === 1) {
                // phones: one rail down the left edge with a short stub into every photo
                const railX = Math.min(...L.map((r)=>r.l)) - 14;
                const busY = rb + 36;
                const lastMid = (L[L.length - 1].t + L[L.length - 1].b) / 2;
                out.push({
                    d: `M${rx} ${rb} V${busY} H${railX} V${lastMid}`,
                    delay: 0,
                    len: busY - rb + Math.abs(rx - railX) + (lastMid - busY)
                });
                L.forEach((r, i)=>{
                    const mid = (r.t + r.b) / 2;
                    out.push({
                        d: `M${railX} ${mid} H${r.l}`,
                        delay: 500 + i * 140,
                        len: r.l - railX
                    });
                    pts.push({
                        x: r.l,
                        y: mid,
                        delay: 700 + i * 140
                    });
                });
            } else {
                const left = Math.min(...L.map((r)=>r.l)) - 16;
                const right = Math.max(...L.map((r)=>r.r)) + 16;
                const busY = rowTops.map((t)=>t - 36);
                out.push({
                    d: `M${rx} ${rb} V${busY[0]}`,
                    delay: 0,
                    len: busY[0] - rb
                });
                busY.forEach((y, i)=>out.push({
                        d: `M${left} ${y} H${right}`,
                        delay: 350 + i * 250,
                        len: right - left
                    }));
                if (busY.length > 1) {
                    const last = busY[busY.length - 1];
                    out.push({
                        d: `M${left} ${busY[0]} V${last}`,
                        delay: 600,
                        len: last - busY[0]
                    });
                    out.push({
                        d: `M${right} ${busY[0]} V${last}`,
                        delay: 600,
                        len: last - busY[0]
                    });
                }
                L.forEach((r, i)=>{
                    const row = rowTops.indexOf(Math.round(r.t));
                    const cx = (r.l + r.r) / 2;
                    const delay = 800 + row * 250 + i % cols * 90;
                    out.push({
                        d: `M${cx} ${busY[row]} V${r.t}`,
                        delay,
                        len: r.t - busY[row]
                    });
                    pts.push({
                        x: cx,
                        y: r.t,
                        delay: delay + 350
                    });
                });
            }
            setSegs(out);
            setDots(pts);
            setSize({
                w: c.width,
                h: c.height
            });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener('resize', measure);
        const first = el.querySelector('[data-branch-leaf]');
        const io = new IntersectionObserver(([e])=>{
            if (e.isIntersecting) {
                setDrawn(true);
                io.disconnect();
            }
        }, {
            rootMargin: '0px 0px -15% 0px'
        });
        if (first) io.observe(first);
        return ()=>{
            ro.disconnect();
            io.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, [
        items.length
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrap,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                "aria-hidden": true,
                width: size.w,
                height: size.h,
                className: "pointer-events-none absolute top-0 left-0 overflow-visible",
                children: [
                    segs.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: s.d,
                            pathLength: 1,
                            fill: "none",
                            stroke: "#111111",
                            strokeWidth: 2,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: 1,
                            style: {
                                strokeDashoffset: drawn ? 0 : 1,
                                transition: 'stroke-dashoffset 800ms ease-out',
                                transitionDelay: `${s.delay}ms`
                            },
                            className: "motion-reduce:transition-none"
                        }, i, false, {
                            fileName: "[project]/components/BranchDiagram.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)),
                    drawn && segs.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: s.d,
                            pathLength: 1,
                            fill: "none",
                            stroke: "var(--color-indigo)",
                            strokeWidth: 2.5,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeDasharray: "0.16 0.84",
                            className: "motion-reduce:hidden",
                            style: {
                                animation: `branch-pulse ${Math.max(1.2, s.len / 160)}s linear ${(s.delay + 1000) / 1000}s infinite`,
                                opacity: 0
                            }
                        }, `p${i}`, false, {
                            fileName: "[project]/components/BranchDiagram.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this)),
                    dots.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: d.x,
                            cy: d.y,
                            r: 4.5,
                            fill: "#111111",
                            style: {
                                opacity: drawn ? 1 : 0,
                                transition: 'opacity 400ms ease-out',
                                transitionDelay: `${d.delay}ms`
                            },
                            className: "motion-reduce:transition-none"
                        }, i, false, {
                            fileName: "[project]/components/BranchDiagram.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/BranchDiagram.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            top,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Container$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                className: "mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-y-20 md:grid-cols-3",
                children: items.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "data-branch-leaf": true,
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Photo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: s.img,
                                alt: s.name,
                                height: 220
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDiagram.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pointer-events-none absolute inset-x-0 bottom-0 rounded-b-3xl bg-linear-to-t from-navy/70 to-transparent px-5 pt-10 pb-4 text-[15px] font-bold text-white",
                                children: s.name
                            }, void 0, false, {
                                fileName: "[project]/components/BranchDiagram.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.name, true, {
                        fileName: "[project]/components/BranchDiagram.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/BranchDiagram.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/BranchDiagram.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Container.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Container
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Container({ className, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('mx-auto max-w-7xl px-5 md:px-10', className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/Container.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/components/Photo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Photo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-ssr] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
function Photo({ src, alt, height, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative w-full overflow-hidden rounded-3xl shadow-[0_30px_70px_rgba(12,10,46,0.14)]', className),
        style: {
            height
        },
        children: src ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
            src: src,
            alt: alt,
            fill: true,
            sizes: "(max-width: 900px) 100vw, 640px",
            className: "object-cover"
        }, void 0, false, {
            fileName: "[project]/components/Photo.tsx",
            lineNumber: 24,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            role: "img",
            "aria-label": alt,
            className: "absolute inset-0 bg-linear-to-br from-indigo to-navy"
        }, void 0, false, {
            fileName: "[project]/components/Photo.tsx",
            lineNumber: 26,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Photo.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=components_1cdx_6ihzcsmy._.js.map