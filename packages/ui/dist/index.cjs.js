'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var dateFns = require('date-fns');
var ReactDOM = require('react-dom');
var calculator = require('@schengen/calculator');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (typeof document === 'undefined') {
        return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
        if (head.firstChild) {
            head.insertBefore(style, head.firstChild);
        } else {
            head.appendChild(style);
        }
    } else {
        head.appendChild(style);
    }
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
}

var css_248z = "@import \"tailwindcss/base\";@import \"tailwindcss/components\";@import \"tailwindcss/utilities\";@import url(\"https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap\");@layer base{:root{--background:0 0% 100%;--foreground:222.2 84% 4.9%;--card:0 0% 100%;--card-foreground:222.2 84% 4.9%;--popover:0 0% 100%;--popover-foreground:222.2 84% 4.9%;--primary:24 100% 58%;--primary-foreground:210 40% 98%;--secondary:210 40% 96%;--secondary-foreground:222.2 84% 4.9%;--muted:210 40% 96%;--muted-foreground:215.4 16.3% 46.9%;--accent:210 40% 96%;--accent-foreground:222.2 84% 4.9%;--destructive:0 84.2% 60.2%;--destructive-foreground:210 40% 98%;--border:214.3 31.8% 91.4%;--input:214.3 31.8% 91.4%;--ring:24 100% 58%;--radius:0.5rem}.dark{--background:222.2 84% 4.9%;--foreground:210 40% 98%;--card:222.2 84% 4.9%;--card-foreground:210 40% 98%;--popover:222.2 84% 4.9%;--popover-foreground:210 40% 98%;--primary:24 100% 58%;--primary-foreground:222.2 84% 4.9%;--secondary:217.2 32.6% 17.5%;--secondary-foreground:210 40% 98%;--muted:217.2 32.6% 17.5%;--muted-foreground:215 20.2% 65.1%;--accent:217.2 32.6% 17.5%;--accent-foreground:210 40% 98%;--destructive:0 62.8% 30.6%;--destructive-foreground:210 40% 98%;--border:217.2 32.6% 17.5%;--input:217.2 32.6% 17.5%;--ring:24 100% 58%}*,body{@apply bg-background text-foreground font-sans}}@layer base{@media (max-width:767px){.touch-target,[role=button],button,input[type=button],input[type=submit]{@apply min-h-[44px] min-w-[44px]}}}@layer components{.schengen-available-date,.schengen-calendar,.schengen-conflict-date,.schengen-occupied-date,.schengen-selected-date{@apply bg-red-100 text-red-700 cursor-not-allowed border border-red-200}.schengen-brand-gradient{background:linear-gradient(135deg,#fa9937,#f93 50%,#e6802a)}.schengen-glass{@apply bg-white/80 backdrop-blur-md border border-white/20}.schengen-shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1),0 4px 6px -1px rgba(250,153,55,.1)}.schengen-focus-ring{@apply focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2}.date-picker-occupied:after,.date-picker-occupied:before{content:\"\";@apply absolute top-1/2 left-1/2 w-6 h-0.5 bg-gray-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45}@media (max-width:767px){.mobile-calendar-day,.mobile-spacing,.mobile-touch-target{@apply px-4 py-3}}.sr-only{@apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0}@media (prefers-contrast:high){.schengen-occupied-date,.schengen-selected-date{@apply border-2 border-white}}@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}@media print{.schengen-calendar,.schengen-occupied-date,.schengen-selected-date{@apply bg-gray-800 text-white}}}@layer utilities{.text-shadow-sm{text-shadow:0 1px 2px rgba(0,0,0,.05)}.text-shadow{text-shadow:0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.06)}.text-shadow-lg{text-shadow:0 10px 15px rgba(0,0,0,.1),0 4px 6px rgba(0,0,0,.05)}.animate-fade-in-up{animation:fade-in-up .3s ease-out forwards}.animate-bounce-subtle{animation:bounce-subtle 2s infinite}.focus-visible{@apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2}}";
styleInject(css_248z);

/**
 * Utility function to merge Tailwind CSS classes with conditional logic
 */ function cn(...inputs) {
    return tailwindMerge.twMerge(clsx.clsx(inputs));
}
/**
 * Format a date to ISO string for consistent date comparisons
 */ function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}
/**
 * Check if two dates are the same day (ignoring time)
 */ function isSameDay(date1, date2) {
    return formatDateKey(date1) === formatDateKey(date2);
}
/**
 * Check if a date is within a date range (inclusive)
 */ function isDateInRange(date, start, end) {
    const dateKey = formatDateKey(date);
    const startKey = formatDateKey(start);
    const endKey = formatDateKey(end);
    return dateKey >= startKey && dateKey <= endKey;
}
/**
 * Generate array of dates between start and end (inclusive)
 */ function getDateRange(start, end) {
    const dates = [];
    const current = new Date(start);
    while(current <= end){
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}
/**
 * Check if date is today
 */ function isToday(date) {
    return isSameDay(date, new Date());
}
/**
 * Check if date is in the past
 */ function isPastDate(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
}
/**
 * Check if date is in the future
 */ function isFutureDate(date) {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today;
}
/**
 * Format date for display in UI components
 */ function formatDisplayDate(date, options) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    });
}
/**
 * Format date range for display
 */ function formatDateRange(start, end) {
    if (isSameDay(start, end)) {
        return formatDisplayDate(start);
    }
    return `${formatDisplayDate(start)} - ${formatDisplayDate(end)}`;
}
/**
 * Calculate number of days between two dates
 */ function daysBetween(start, end) {
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    const endTime = new Date(end).setHours(0, 0, 0, 0);
    return Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
}
/**
 * Add days to a date
 */ function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
/**
 * Subtract days from a date
 */ function subtractDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}
/**
 * Get the start of day for consistent date comparisons
 */ function startOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}
/**
 * Get the end of day
 */ function endOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}
/**
 * Debounce function for performance optimization
 */ function debounce(func, wait) {
    let timeout = null;
    return (...args)=>{
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            func(...args);
        }, wait);
    };
}
/**
 * Throttle function for performance optimization
 */ function throttle(func, limit) {
    let inThrottle = false;
    return (...args)=>{
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(()=>{
                inThrottle = false;
            }, limit);
        }
    };
}
/**
 * Generate a unique ID for components
 */ function generateId(prefix = 'schengen') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
/**
 * Check if device is mobile based on viewport width
 */ function isMobile() {
    return typeof window !== 'undefined' && window.innerWidth < 768;
}
/**
 * Check if device has touch capability
 */ function isTouchDevice() {
    return typeof window !== 'undefined' && 'ontouchstart' in window;
}

// packages/react/compose-refs/src/compose-refs.tsx
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup == "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup == "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}

// src/slot.tsx
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = React__namespace.forwardRef((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        const childrenArray = React__namespace.Children.toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (React__namespace.Children.count(newElement) > 1) return React__namespace.Children.only(null);
                    return React__namespace.isValidElement(newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ jsxRuntime.jsx(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: React__namespace.isValidElement(newElement) ? React__namespace.cloneElement(newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ jsxRuntime.jsx(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = React__namespace.forwardRef((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        if (React__namespace.isValidElement(children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== React__namespace.Fragment) {
                props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
            }
            return React__namespace.cloneElement(children, props2);
        }
        return React__namespace.Children.count(children) > 1 ? React__namespace.Children.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
    return React__namespace.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    const result = childPropValue(...args);
                    slotPropValue(...args);
                    return result;
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}

const buttonVariants = classVarianceAuthority.cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 schengen-shadow",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            // Schengen-specific variants
            brand: "schengen-brand-gradient text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200",
            cream: "bg-cream text-gray-800 shadow hover:bg-cream/90 border border-primary/20",
            success: "bg-green-500 text-white shadow hover:bg-green-600",
            warning: "bg-yellow-500 text-white shadow hover:bg-yellow-600"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            xl: "h-12 rounded-lg px-10 text-base",
            icon: "h-9 w-9",
            // Mobile-optimized sizes
            mobile: "h-11 px-6 py-3 text-base min-h-[44px]",
            "mobile-sm": "h-10 px-4 py-2 text-sm min-h-[44px]",
            "mobile-lg": "h-12 px-8 py-4 text-lg min-h-[44px]"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button$1 = /*#__PURE__*/ React__namespace.forwardRef(({ className, variant, size, asChild = false, loading = false, loadingText, leftIcon, rightIcon, children, disabled, ...props }, ref)=>{
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    return /*#__PURE__*/ React__namespace.createElement(Comp, {
        className: cn(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        disabled: isDisabled,
        ...props
    }, loading && /*#__PURE__*/ React__namespace.createElement("svg", {
        className: "animate-spin -ml-1 mr-2 h-4 w-4",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
    }, /*#__PURE__*/ React__namespace.createElement("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
    }), /*#__PURE__*/ React__namespace.createElement("path", {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })), !loading && leftIcon && /*#__PURE__*/ React__namespace.createElement("span", {
        className: "mr-1",
        "aria-hidden": "true"
    }, leftIcon), /*#__PURE__*/ React__namespace.createElement("span", null, loading ? loadingText || 'Loading...' : children), !loading && rightIcon && /*#__PURE__*/ React__namespace.createElement("span", {
        className: "ml-1",
        "aria-hidden": "true"
    }, rightIcon));
});
Button$1.displayName = "Button";

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();

/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};

const Icon = React.forwardRef(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>{
    return React.createElement("svg", {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>React.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});

const createLucideIcon = (iconName, iconNode)=>{
    const Component = React.forwardRef(({ className, ...props }, ref)=>React.createElement(Icon, {
            ref,
            iconNode,
            className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
            ...props
        }));
    Component.displayName = `${iconName}`;
    return Component;
};

const ArrowRight = createLucideIcon("ArrowRight", [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }
    ]
]);

const Building2 = createLucideIcon("Building2", [
    [
        "path",
        {
            d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",
            key: "1b4qmf"
        }
    ],
    [
        "path",
        {
            d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",
            key: "i71pzd"
        }
    ],
    [
        "path",
        {
            d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",
            key: "10jefs"
        }
    ],
    [
        "path",
        {
            d: "M10 6h4",
            key: "1itunk"
        }
    ],
    [
        "path",
        {
            d: "M10 10h4",
            key: "tcdvrf"
        }
    ],
    [
        "path",
        {
            d: "M10 14h4",
            key: "kelpxr"
        }
    ],
    [
        "path",
        {
            d: "M10 18h4",
            key: "1ulq68"
        }
    ]
]);

const Calendar$1 = createLucideIcon("Calendar", [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
]);

const Check = createLucideIcon("Check", [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
]);

const ChevronDown = createLucideIcon("ChevronDown", [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
]);

const ChevronLeft = createLucideIcon("ChevronLeft", [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
]);

const ChevronRight = createLucideIcon("ChevronRight", [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
]);

const CircleAlert = createLucideIcon("CircleAlert", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }
    ]
]);

const CircleCheckBig = createLucideIcon("CircleCheckBig", [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
]);

const Clock = createLucideIcon("Clock", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "polyline",
        {
            points: "12 6 12 12 16 14",
            key: "68esgv"
        }
    ]
]);

const CreditCard = createLucideIcon("CreditCard", [
    [
        "rect",
        {
            width: "20",
            height: "14",
            x: "2",
            y: "5",
            rx: "2",
            key: "ynyp8z"
        }
    ],
    [
        "line",
        {
            x1: "2",
            x2: "22",
            y1: "10",
            y2: "10",
            key: "1b3vmo"
        }
    ]
]);

const Crown = createLucideIcon("Crown", [
    [
        "path",
        {
            d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
            key: "1vdc57"
        }
    ],
    [
        "path",
        {
            d: "M5 21h14",
            key: "11awu3"
        }
    ]
]);

const Headphones = createLucideIcon("Headphones", [
    [
        "path",
        {
            d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
            key: "1xhozi"
        }
    ]
]);

const Info = createLucideIcon("Info", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 16v-4",
            key: "1dtifu"
        }
    ],
    [
        "path",
        {
            d: "M12 8h.01",
            key: "e9boi3"
        }
    ]
]);

const LoaderCircle = createLucideIcon("LoaderCircle", [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
]);

const MapPin = createLucideIcon("MapPin", [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
]);

const PenLine = createLucideIcon("PenLine", [
    [
        "path",
        {
            d: "M12 20h9",
            key: "t2du7b"
        }
    ],
    [
        "path",
        {
            d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
            key: "1ykcvy"
        }
    ]
]);

const Shield = createLucideIcon("Shield", [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ]
]);

const Star = createLucideIcon("Star", [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
]);

const Trash2 = createLucideIcon("Trash2", [
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
            key: "4alrt4"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
            key: "v07s0e"
        }
    ],
    [
        "line",
        {
            x1: "10",
            x2: "10",
            y1: "11",
            y2: "17",
            key: "1uufr5"
        }
    ],
    [
        "line",
        {
            x1: "14",
            x2: "14",
            y1: "11",
            y2: "17",
            key: "xtxkd"
        }
    ]
]);

const TriangleAlert = createLucideIcon("TriangleAlert", [
    [
        "path",
        {
            d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
            key: "wmoenq"
        }
    ],
    [
        "path",
        {
            d: "M12 9v4",
            key: "juzpu7"
        }
    ],
    [
        "path",
        {
            d: "M12 17h.01",
            key: "p32p05"
        }
    ]
]);

const UserPlus = createLucideIcon("UserPlus", [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ],
    [
        "line",
        {
            x1: "19",
            x2: "19",
            y1: "8",
            y2: "14",
            key: "1bvyxn"
        }
    ],
    [
        "line",
        {
            x1: "22",
            x2: "16",
            y1: "11",
            y2: "11",
            key: "1shjgl"
        }
    ]
]);

const User = createLucideIcon("User", [
    [
        "path",
        {
            d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
            key: "975kel"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "7",
            r: "4",
            key: "17ys0d"
        }
    ]
]);

const Users = createLucideIcon("Users", [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ],
    [
        "path",
        {
            d: "M22 21v-2a4 4 0 0 0-3-3.87",
            key: "kshegd"
        }
    ],
    [
        "path",
        {
            d: "M16 3.13a4 4 0 0 1 0 7.75",
            key: "1da9ce"
        }
    ]
]);

const X = createLucideIcon("X", [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
]);

const Zap = createLucideIcon("Zap", [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
]);

/**
 * Time zone name format.
 */ /**
 * The function returns the time zone name for the given date in the specified
 * time zone.
 *
 * It uses the `Intl.DateTimeFormat` API and by default outputs the time zone
 * name in a long format, e.g. "Pacific Standard Time" or
 * "Singapore Standard Time".
 *
 * It is possible to specify the format as the third argument using one of the following options
 *
 * - "short": e.g. "EDT" or "GMT+8".
 * - "long": e.g. "Eastern Daylight Time".
 * - "shortGeneric": e.g. "ET" or "Singapore Time".
 * - "longGeneric": e.g. "Eastern Time" or "Singapore Standard Time".
 *
 * These options correspond to TR35 tokens `z..zzz`, `zzzz`, `v`, and `vvvv` respectively: https://www.unicode.org/reports/tr35/tr35-dates.html#dfst-zone
 *
 * @param timeZone - Time zone name (IANA or UTC offset)
 * @param date - Date object to get the time zone name for
 * @param format - Optional format of the time zone name. Defaults to "long". Can be "short", "long", "shortGeneric", or "longGeneric".
 *
 * @returns Time zone name (e.g. "Singapore Standard Time")
 */ function tzName(timeZone, date, format = "long") {
    return new Intl.DateTimeFormat("en-US", {
        // Enforces engine to render the time. Without the option JavaScriptCore omits it.
        hour: "numeric",
        timeZone: timeZone,
        timeZoneName: format
    }).format(date).split(/\s/g) // Format.JS uses non-breaking spaces
    .slice(2) // Skip the hour and AM/PM parts
    .join(" ");
}

const offsetFormatCache = {};
const offsetCache = {};
/**
 * The function extracts UTC offset in minutes from the given date in specified
 * time zone.
 *
 * Unlike `Date.prototype.getTimezoneOffset`, this function returns the value
 * mirrored to the sign of the offset in the time zone. For Asia/Singapore
 * (UTC+8), `tzOffset` returns 480, while `getTimezoneOffset` returns -480.
 *
 * @param timeZone - Time zone name (IANA or UTC offset)
 * @param date - Date to check the offset for
 *
 * @returns UTC offset in minutes
 */ function tzOffset(timeZone, date) {
    try {
        var _offsetFormatCache, _timeZone;
        const format = (_offsetFormatCache = offsetFormatCache)[_timeZone = timeZone] || (_offsetFormatCache[_timeZone] = new Intl.DateTimeFormat("en-US", {
            timeZone,
            timeZoneName: "longOffset"
        }).format);
        const offsetStr = format(date).split("GMT")[1];
        if (offsetStr in offsetCache) return offsetCache[offsetStr];
        return calcOffset(offsetStr, offsetStr.split(":"));
    } catch  {
        // Fallback to manual parsing if the runtime doesn't support ±HH:MM/±HHMM/±HH
        // See: https://github.com/nodejs/node/issues/53419
        if (timeZone in offsetCache) return offsetCache[timeZone];
        const captures = timeZone?.match(offsetRe);
        if (captures) return calcOffset(timeZone, captures.slice(1));
        return NaN;
    }
}
const offsetRe = /([+-]\d\d):?(\d\d)?/;
function calcOffset(cacheStr, values) {
    const hours = +(values[0] || 0);
    const minutes = +(values[1] || 0);
    // Convert seconds to minutes by dividing by 60 to keep the function return in minutes.
    const seconds = +(values[2] || 0) / 60;
    return offsetCache[cacheStr] = hours * 60 + minutes > 0 ? hours * 60 + minutes + seconds : hours * 60 - minutes - seconds;
}

class TZDateMini extends Date {
    static tz(tz, ...args) {
        return args.length ? new TZDateMini(...args, tz) : new TZDateMini(Date.now(), tz);
    }
    //#endregion
    //#region time zone
    withTimeZone(timeZone) {
        return new TZDateMini(+this, timeZone);
    }
    getTimezoneOffset() {
        const offset = -tzOffset(this.timeZone, this);
        // Remove the seconds offset
        // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
        return offset > 0 ? Math.floor(offset) : Math.ceil(offset);
    }
    //#endregion
    //#region time
    setTime(time) {
        Date.prototype.setTime.apply(this, arguments);
        syncToInternal(this);
        return +this;
    }
    //#endregion
    //#region date-fns integration
    [Symbol.for("constructDateFrom")](date) {
        return new TZDateMini(+new Date(date), this.timeZone);
    }
    //#region static
    constructor(...args){
        super();
        if (args.length > 1 && typeof args[args.length - 1] === "string") {
            this.timeZone = args.pop();
        }
        this.internal = new Date();
        if (isNaN(tzOffset(this.timeZone, this))) {
            this.setTime(NaN);
        } else {
            if (!args.length) {
                this.setTime(Date.now());
            } else if (typeof args[0] === "number" && (args.length === 1 || args.length === 2 && typeof args[1] !== "number")) {
                this.setTime(args[0]);
            } else if (typeof args[0] === "string") {
                this.setTime(+new Date(args[0]));
            } else if (args[0] instanceof Date) {
                this.setTime(+args[0]);
            } else {
                this.setTime(+new Date(...args));
                adjustToSystemTZ(this);
                syncToInternal(this);
            }
        }
    }
}
// Assign getters and setters
const re = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((method)=>{
    if (!re.test(method)) return;
    const utcMethod = method.replace(re, "$1UTC");
    // Filter out methods without UTC counterparts
    if (!TZDateMini.prototype[utcMethod]) return;
    if (method.startsWith("get")) {
        // Delegate to internal date's UTC method
        TZDateMini.prototype[method] = function() {
            return this.internal[utcMethod]();
        };
    } else {
        // Assign regular setter
        TZDateMini.prototype[method] = function() {
            Date.prototype[utcMethod].apply(this.internal, arguments);
            syncFromInternal(this);
            return +this;
        };
        // Assign UTC setter
        TZDateMini.prototype[utcMethod] = function() {
            Date.prototype[utcMethod].apply(this, arguments);
            syncToInternal(this);
            return +this;
        };
    }
});
/**
 * Function syncs time to internal date, applying the time zone offset.
 *
 * @param {Date} date - Date to sync
 */ function syncToInternal(date) {
    date.internal.setTime(+date);
    date.internal.setUTCSeconds(date.internal.getUTCSeconds() - Math.round(-tzOffset(date.timeZone, date) * 60));
}
/**
 * Function syncs the internal date UTC values to the date. It allows to get
 * accurate timestamp value.
 *
 * @param {Date} date - The date to sync
 */ function syncFromInternal(date) {
    // First we transpose the internal values
    Date.prototype.setFullYear.call(date, date.internal.getUTCFullYear(), date.internal.getUTCMonth(), date.internal.getUTCDate());
    Date.prototype.setHours.call(date, date.internal.getUTCHours(), date.internal.getUTCMinutes(), date.internal.getUTCSeconds(), date.internal.getUTCMilliseconds());
    // Now we have to adjust the date to the system time zone
    adjustToSystemTZ(date);
}
/**
 * Function adjusts the date to the system time zone. It uses the time zone
 * differences to calculate the offset and adjust the date.
 *
 * @param {Date} date - Date to adjust
 */ function adjustToSystemTZ(date) {
    // Save the time zone offset before all the adjustments
    const baseOffset = tzOffset(date.timeZone, date);
    // Remove the seconds offset
    // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
    const offset = baseOffset > 0 ? Math.floor(baseOffset) : Math.ceil(baseOffset);
    //#region System DST adjustment
    // The biggest problem with using the system time zone is that when we create
    // a date from internal values stored in UTC, the system time zone might end
    // up on the DST hour:
    //
    //   $ TZ=America/New_York node
    //   > new Date(2020, 2, 8, 1).toString()
    //   'Sun Mar 08 2020 01:00:00 GMT-0500 (Eastern Standard Time)'
    //   > new Date(2020, 2, 8, 2).toString()
    //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
    //   > new Date(2020, 2, 8, 3).toString()
    //   'Sun Mar 08 2020 03:00:00 GMT-0400 (Eastern Daylight Time)'
    //   > new Date(2020, 2, 8, 4).toString()
    //   'Sun Mar 08 2020 04:00:00 GMT-0400 (Eastern Daylight Time)'
    //
    // Here we get the same hour for both 2 and 3, because the system time zone
    // has DST beginning at 8 March 2020, 2 a.m. and jumps to 3 a.m. So we have
    // to adjust the internal date to reflect that.
    //
    // However we want to adjust only if that's the DST hour the change happenes,
    // not the hour where DST moves to.
    // We calculate the previous hour to see if the time zone offset has changed
    // and we have landed on the DST hour.
    const prevHour = new Date(+date);
    // We use UTC methods here as we don't want to land on the same hour again
    // in case of DST.
    prevHour.setUTCHours(prevHour.getUTCHours() - 1);
    // Calculate if we are on the system DST hour.
    const systemOffset = -new Date(+date).getTimezoneOffset();
    const prevHourSystemOffset = -new Date(+prevHour).getTimezoneOffset();
    const systemDSTChange = systemOffset - prevHourSystemOffset;
    // Detect the DST shift. System DST change will occur both on
    const dstShift = Date.prototype.getHours.apply(date) !== date.internal.getUTCHours();
    // Move the internal date when we are on the system DST hour.
    if (systemDSTChange && dstShift) date.internal.setUTCMinutes(date.internal.getUTCMinutes() + systemDSTChange);
    //#endregion
    //#region System diff adjustment
    // Now we need to adjust the date, since we just applied internal values.
    // We need to calculate the difference between the system and date time zones
    // and apply it to the date.
    const offsetDiff = systemOffset - offset;
    if (offsetDiff) Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetDiff);
    //#endregion
    //#region Seconds System diff adjustment
    const systemDate = new Date(+date);
    // Set the UTC seconds to 0 to isolate the timezone offset in seconds.
    systemDate.setUTCSeconds(0);
    // For negative systemOffset, invert the seconds.
    const systemSecondsOffset = systemOffset > 0 ? systemDate.getSeconds() : (systemDate.getSeconds() - 60) % 60;
    // Calculate the seconds offset based on the timezone offset.
    const secondsOffset = Math.round(-(tzOffset(date.timeZone, date) * 60)) % 60;
    if (secondsOffset || systemSecondsOffset) {
        date.internal.setUTCSeconds(date.internal.getUTCSeconds() + secondsOffset);
        Date.prototype.setUTCSeconds.call(date, Date.prototype.getUTCSeconds.call(date) + secondsOffset + systemSecondsOffset);
    }
    //#endregion
    //#region Post-adjustment DST fix
    const postBaseOffset = tzOffset(date.timeZone, date);
    // Remove the seconds offset
    // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
    const postOffset = postBaseOffset > 0 ? Math.floor(postBaseOffset) : Math.ceil(postBaseOffset);
    const postSystemOffset = -new Date(+date).getTimezoneOffset();
    const postOffsetDiff = postSystemOffset - postOffset;
    const offsetChanged = postOffset !== offset;
    const postDiff = postOffsetDiff - offsetDiff;
    if (offsetChanged && postDiff) {
        Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + postDiff);
        // Now we need to check if got offset change during the post-adjustment.
        // If so, we also need both dates to reflect that.
        const newBaseOffset = tzOffset(date.timeZone, date);
        // Remove the seconds offset
        // use Math.floor for negative GMT timezones and Math.ceil for positive GMT timezones.
        const newOffset = newBaseOffset > 0 ? Math.floor(newBaseOffset) : Math.ceil(newBaseOffset);
        const offsetChange = postOffset - newOffset;
        if (offsetChange) {
            date.internal.setUTCMinutes(date.internal.getUTCMinutes() + offsetChange);
            Date.prototype.setUTCMinutes.call(date, Date.prototype.getUTCMinutes.call(date) + offsetChange);
        }
    }
//#endregion
}

class TZDate extends TZDateMini {
    //#region static
    static tz(tz, ...args) {
        return args.length ? new TZDate(...args, tz) : new TZDate(Date.now(), tz);
    }
    //#endregion
    //#region representation
    toISOString() {
        const [sign, hours, minutes] = this.tzComponents();
        const tz = `${sign}${hours}:${minutes}`;
        return this.internal.toISOString().slice(0, -1) + tz;
    }
    toString() {
        // "Tue Aug 13 2024 07:50:19 GMT+0800 (Singapore Standard Time)";
        return `${this.toDateString()} ${this.toTimeString()}`;
    }
    toDateString() {
        // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
        const [day, date, month, year] = this.internal.toUTCString().split(" ");
        // "Tue Aug 13 2024"
        return `${day?.slice(0, -1)} ${month} ${date} ${year}`;
    }
    toTimeString() {
        // toUTCString returns RFC 7231 ("Mon, 12 Aug 2024 23:36:08 GMT")
        const time = this.internal.toUTCString().split(" ")[4];
        const [sign, hours, minutes] = this.tzComponents();
        // "07:42:23 GMT+0800 (Singapore Standard Time)"
        return `${time} GMT${sign}${hours}${minutes} (${tzName(this.timeZone, this)})`;
    }
    toLocaleString(locales, options) {
        return Date.prototype.toLocaleString.call(this, locales, {
            ...options,
            timeZone: options?.timeZone || this.timeZone
        });
    }
    toLocaleDateString(locales, options) {
        return Date.prototype.toLocaleDateString.call(this, locales, {
            ...options,
            timeZone: options?.timeZone || this.timeZone
        });
    }
    toLocaleTimeString(locales, options) {
        return Date.prototype.toLocaleTimeString.call(this, locales, {
            ...options,
            timeZone: options?.timeZone || this.timeZone
        });
    }
    //#endregion
    //#region private
    tzComponents() {
        const offset = this.getTimezoneOffset();
        const sign = offset > 0 ? "-" : "+";
        const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
        const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
        return [
            sign,
            hours,
            minutes
        ];
    }
    //#endregion
    withTimeZone(timeZone) {
        return new TZDate(+this, timeZone);
    }
    //#region date-fns integration
    [Symbol.for("constructDateFrom")](date) {
        return new TZDate(+new Date(date), this.timeZone);
    }
}

const formatDistanceLocale = {
    lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
    },
    xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
    },
    xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
    },
    aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
    },
    xHours: {
        one: "1 hour",
        other: "{{count}} hours"
    },
    xDays: {
        one: "1 day",
        other: "{{count}} days"
    },
    aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks"
    },
    xWeeks: {
        one: "1 week",
        other: "{{count}} weeks"
    },
    aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
    },
    xMonths: {
        one: "1 month",
        other: "{{count}} months"
    },
    aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
    },
    xYears: {
        one: "1 year",
        other: "{{count}} years"
    },
    overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
    },
    almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
    }
};
const formatDistance = (token, count, options)=>{
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
        result = tokenValue;
    } else if (count === 1) {
        result = tokenValue.one;
    } else {
        result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options?.addSuffix) {
        if (options.comparison && options.comparison > 0) {
            return "in " + result;
        } else {
            return result + " ago";
        }
    }
    return result;
};

function buildFormatLongFn(args) {
    return (options = {})=>{
        // TODO: Remove String()
        const width = options.width ? String(options.width) : args.defaultWidth;
        const format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
    };
}

const dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
};
const timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
};
const dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
};
const formatLong = {
    date: buildFormatLongFn({
        formats: dateFormats,
        defaultWidth: "full"
    }),
    time: buildFormatLongFn({
        formats: timeFormats,
        defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
        formats: dateTimeFormats,
        defaultWidth: "full"
    })
};

const formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
};
const formatRelative = (token, _date, _baseDate, _options)=>formatRelativeLocale[token];

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */ /**
 * The map of localized values for each width.
 */ /**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */ /**
 * Converts the unit value to the tuple of values.
 */ /**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */ /**
 * The tuple of localized quarter values. The first element represents Q1.
 */ /**
 * The tuple of localized day values. The first element represents Sunday.
 */ /**
 * The tuple of localized month values. The first element represents January.
 */ function buildLocalizeFn(args) {
    return (value, options)=>{
        const context = options?.context ? String(options.context) : "standalone";
        let valuesArray;
        if (context === "formatting" && args.formattingValues) {
            const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
            const width = options?.width ? String(options.width) : defaultWidth;
            valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
            const defaultWidth = args.defaultWidth;
            const width = options?.width ? String(options.width) : args.defaultWidth;
            valuesArray = args.values[width] || args.values[defaultWidth];
        }
        const index = args.argumentCallback ? args.argumentCallback(value) : value;
        // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
    };
}

const eraValues = {
    narrow: [
        "B",
        "A"
    ],
    abbreviated: [
        "BC",
        "AD"
    ],
    wide: [
        "Before Christ",
        "Anno Domini"
    ]
};
const quarterValues = {
    narrow: [
        "1",
        "2",
        "3",
        "4"
    ],
    abbreviated: [
        "Q1",
        "Q2",
        "Q3",
        "Q4"
    ],
    wide: [
        "1st quarter",
        "2nd quarter",
        "3rd quarter",
        "4th quarter"
    ]
};
// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
    narrow: [
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D"
    ],
    abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
};
const dayValues = {
    narrow: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    short: [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ],
    abbreviated: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
};
const dayPeriodValues = {
    narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    }
};
const formattingDayPeriodValues = {
    narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    },
    abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    },
    wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    }
};
const ordinalNumber = (dirtyNumber, _options)=>{
    const number = Number(dirtyNumber);
    // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`.
    //
    // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'.
    const rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
        switch(rem100 % 10){
            case 1:
                return number + "st";
            case 2:
                return number + "nd";
            case 3:
                return number + "rd";
        }
    }
    return number + "th";
};
const localize = {
    ordinalNumber,
    era: buildLocalizeFn({
        values: eraValues,
        defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: (quarter)=>quarter - 1
    }),
    month: buildLocalizeFn({
        values: monthValues,
        defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
        values: dayValues,
        defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide"
    })
};

function buildMatchFn(args) {
    return (string, options = {})=>{
        const width = options.width;
        const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        const matchResult = string.match(matchPattern);
        if (!matchResult) {
            return null;
        }
        const matchedString = matchResult[0];
        const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern)=>pattern.test(matchedString)) : findKey(parsePatterns, (pattern)=>pattern.test(matchedString));
        let value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
            value,
            rest
        };
    };
}
function findKey(object, predicate) {
    for(const key in object){
        if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
            return key;
        }
    }
    return undefined;
}
function findIndex(array, predicate) {
    for(let key = 0; key < array.length; key++){
        if (predicate(array[key])) {
            return key;
        }
    }
    return undefined;
}

function buildMatchPatternFn(args) {
    return (string, options = {})=>{
        const matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        const matchedString = matchResult[0];
        const parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        // [TODO] I challenge you to fix the type
        value = options.valueCallback ? options.valueCallback(value) : value;
        const rest = string.slice(matchedString.length);
        return {
            value,
            rest
        };
    };
}

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;
const matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
};
const parseEraPatterns = {
    any: [
        /^b/i,
        /^(a|c)/i
    ]
};
const matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
};
const parseQuarterPatterns = {
    any: [
        /1/i,
        /2/i,
        /3/i,
        /4/i
    ]
};
const matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
const parseMonthPatterns = {
    narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ],
    any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ]
};
const matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
const parseDayPatterns = {
    narrow: [
        /^s/i,
        /^m/i,
        /^t/i,
        /^w/i,
        /^t/i,
        /^f/i,
        /^s/i
    ],
    any: [
        /^su/i,
        /^m/i,
        /^tu/i,
        /^w/i,
        /^th/i,
        /^f/i,
        /^sa/i
    ]
};
const matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
const parseDayPeriodPatterns = {
    any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
    }
};
const match = {
    ordinalNumber: buildMatchPatternFn({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: (value)=>parseInt(value, 10)
    }),
    era: buildMatchFn({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: (index)=>index + 1
    }),
    month: buildMatchFn({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any"
    }),
    day: buildMatchFn({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any"
    })
};

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */ const enUS = {
    code: "en-US",
    formatDistance: formatDistance,
    formatLong: formatLong,
    formatRelative: formatRelative,
    localize: localize,
    match: match,
    options: {
        weekStartsOn: 0 /* Sunday */ ,
        firstWeekContainsDate: 1
    }
};

const FIVE_WEEKS = 5;
const FOUR_WEEKS = 4;
/**
 * Returns the number of weeks to display in the broadcast calendar for a given
 * month.
 *
 * The broadcast calendar may have either 4 or 5 weeks in a month, depending on
 * the start and end dates of the broadcast weeks.
 *
 * @since 9.4.0
 * @param month The month for which to calculate the number of weeks.
 * @param dateLib The date library to use for date manipulation.
 * @returns The number of weeks in the broadcast calendar (4 or 5).
 */ function getBroadcastWeeksInMonth(month, dateLib) {
    // Get the first day of the month
    const firstDayOfMonth = dateLib.startOfMonth(month);
    // Get the day of the week for the first day of the month (1-7, where 1 is Monday)
    const firstDayOfWeek = firstDayOfMonth.getDay() > 0 ? firstDayOfMonth.getDay() : 7;
    const broadcastStartDate = dateLib.addDays(month, -firstDayOfWeek + 1);
    const lastDateOfLastWeek = dateLib.addDays(broadcastStartDate, FIVE_WEEKS * 7 - 1);
    const numberOfWeeks = dateLib.getMonth(month) === dateLib.getMonth(lastDateOfLastWeek) ? FIVE_WEEKS : FOUR_WEEKS;
    return numberOfWeeks;
}

/**
 * Returns the start date of the week in the broadcast calendar.
 *
 * The broadcast week starts on Monday. If the first day of the month is not a
 * Monday, this function calculates the previous Monday as the start of the
 * broadcast week.
 *
 * @since 9.4.0
 * @param date The date for which to calculate the start of the broadcast week.
 * @param dateLib The date library to use for date manipulation.
 * @returns The start date of the broadcast week.
 */ function startOfBroadcastWeek(date, dateLib) {
    const firstOfMonth = dateLib.startOfMonth(date);
    const dayOfWeek = firstOfMonth.getDay();
    if (dayOfWeek === 1) {
        return firstOfMonth;
    } else if (dayOfWeek === 0) {
        return dateLib.addDays(firstOfMonth, -1 * 6);
    } else {
        return dateLib.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
    }
}

/**
 * Returns the end date of the week in the broadcast calendar.
 *
 * The broadcast week ends on the last day of the last broadcast week for the
 * given date.
 *
 * @since 9.4.0
 * @param date The date for which to calculate the end of the broadcast week.
 * @param dateLib The date library to use for date manipulation.
 * @returns The end date of the broadcast week.
 */ function endOfBroadcastWeek(date, dateLib) {
    const startDate = startOfBroadcastWeek(date, dateLib);
    const numberOfWeeks = getBroadcastWeeksInMonth(date, dateLib);
    const endDate = dateLib.addDays(startDate, numberOfWeeks * 7 - 1);
    return endDate;
}

/**
 * A wrapper class around [date-fns](http://date-fns.org) that provides utility
 * methods for date manipulation and formatting.
 *
 * @since 9.2.0
 * @example
 *   const dateLib = new DateLib({ locale: es });
 *   const newDate = dateLib.addDays(new Date(), 5);
 */ class DateLib {
    /**
     * Generates a mapping of Arabic digits (0-9) to the target numbering system
     * digits.
     *
     * @since 9.5.0
     * @returns A record mapping Arabic digits to the target numerals.
     */ getDigitMap() {
        const { numerals = "latn" } = this.options;
        // Use Intl.NumberFormat to create a formatter with the specified numbering system
        const formatter = new Intl.NumberFormat("en-US", {
            numberingSystem: numerals
        });
        // Map Arabic digits (0-9) to the target numerals
        const digitMap = {};
        for(let i = 0; i < 10; i++){
            digitMap[i.toString()] = formatter.format(i);
        }
        return digitMap;
    }
    /**
     * Replaces Arabic digits in a string with the target numbering system digits.
     *
     * @since 9.5.0
     * @param input The string containing Arabic digits.
     * @returns The string with digits replaced.
     */ replaceDigits(input) {
        const digitMap = this.getDigitMap();
        return input.replace(/\d/g, (digit)=>digitMap[digit] || digit);
    }
    /**
     * Formats a number using the configured numbering system.
     *
     * @since 9.5.0
     * @param value The number to format.
     * @returns The formatted number as a string.
     */ formatNumber(value) {
        return this.replaceDigits(value.toString());
    }
    /**
     * Creates an instance of `DateLib`.
     *
     * @param options Configuration options for the date library.
     * @param overrides Custom overrides for the date library functions.
     */ constructor(options, overrides){
        /**
         * Reference to the built-in Date constructor.
         *
         * @deprecated Use `newDate()` or `today()`.
         */ this.Date = Date;
        /**
         * Creates a new `Date` object representing today's date.
         *
         * @since 9.5.0
         * @returns A `Date` object for today's date.
         */ this.today = ()=>{
            if (this.overrides?.today) {
                return this.overrides.today();
            }
            if (this.options.timeZone) {
                return TZDate.tz(this.options.timeZone);
            }
            return new this.Date();
        };
        /**
         * Creates a new `Date` object with the specified year, month, and day.
         *
         * @since 9.5.0
         * @param year The year.
         * @param monthIndex The month (0-11).
         * @param date The day of the month.
         * @returns A new `Date` object.
         */ this.newDate = (year, monthIndex, date)=>{
            if (this.overrides?.newDate) {
                return this.overrides.newDate(year, monthIndex, date);
            }
            if (this.options.timeZone) {
                return new TZDate(year, monthIndex, date, this.options.timeZone);
            }
            return new Date(year, monthIndex, date);
        };
        /**
         * Adds the specified number of days to the given date.
         *
         * @param date The date to add days to.
         * @param amount The number of days to add.
         * @returns The new date with the days added.
         */ this.addDays = (date, amount)=>{
            return this.overrides?.addDays ? this.overrides.addDays(date, amount) : dateFns.addDays(date, amount);
        };
        /**
         * Adds the specified number of months to the given date.
         *
         * @param date The date to add months to.
         * @param amount The number of months to add.
         * @returns The new date with the months added.
         */ this.addMonths = (date, amount)=>{
            return this.overrides?.addMonths ? this.overrides.addMonths(date, amount) : dateFns.addMonths(date, amount);
        };
        /**
         * Adds the specified number of weeks to the given date.
         *
         * @param date The date to add weeks to.
         * @param amount The number of weeks to add.
         * @returns The new date with the weeks added.
         */ this.addWeeks = (date, amount)=>{
            return this.overrides?.addWeeks ? this.overrides.addWeeks(date, amount) : dateFns.addWeeks(date, amount);
        };
        /**
         * Adds the specified number of years to the given date.
         *
         * @param date The date to add years to.
         * @param amount The number of years to add.
         * @returns The new date with the years added.
         */ this.addYears = (date, amount)=>{
            return this.overrides?.addYears ? this.overrides.addYears(date, amount) : dateFns.addYears(date, amount);
        };
        /**
         * Returns the number of calendar days between the given dates.
         *
         * @param dateLeft The later date.
         * @param dateRight The earlier date.
         * @returns The number of calendar days between the dates.
         */ this.differenceInCalendarDays = (dateLeft, dateRight)=>{
            return this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(dateLeft, dateRight) : dateFns.differenceInCalendarDays(dateLeft, dateRight);
        };
        /**
         * Returns the number of calendar months between the given dates.
         *
         * @param dateLeft The later date.
         * @param dateRight The earlier date.
         * @returns The number of calendar months between the dates.
         */ this.differenceInCalendarMonths = (dateLeft, dateRight)=>{
            return this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(dateLeft, dateRight) : dateFns.differenceInCalendarMonths(dateLeft, dateRight);
        };
        /**
         * Returns the months between the given dates.
         *
         * @param interval The interval to get the months for.
         */ this.eachMonthOfInterval = (interval)=>{
            return this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(interval) : dateFns.eachMonthOfInterval(interval);
        };
        /**
         * Returns the end of the broadcast week for the given date.
         *
         * @param date The original date.
         * @returns The end of the broadcast week.
         */ this.endOfBroadcastWeek = (date)=>{
            return this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(date) : endOfBroadcastWeek(date, this);
        };
        /**
         * Returns the end of the ISO week for the given date.
         *
         * @param date The original date.
         * @returns The end of the ISO week.
         */ this.endOfISOWeek = (date)=>{
            return this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(date) : dateFns.endOfISOWeek(date);
        };
        /**
         * Returns the end of the month for the given date.
         *
         * @param date The original date.
         * @returns The end of the month.
         */ this.endOfMonth = (date)=>{
            return this.overrides?.endOfMonth ? this.overrides.endOfMonth(date) : dateFns.endOfMonth(date);
        };
        /**
         * Returns the end of the week for the given date.
         *
         * @param date The original date.
         * @returns The end of the week.
         */ this.endOfWeek = (date, options)=>{
            return this.overrides?.endOfWeek ? this.overrides.endOfWeek(date, options) : dateFns.endOfWeek(date, this.options);
        };
        /**
         * Returns the end of the year for the given date.
         *
         * @param date The original date.
         * @returns The end of the year.
         */ this.endOfYear = (date)=>{
            return this.overrides?.endOfYear ? this.overrides.endOfYear(date) : dateFns.endOfYear(date);
        };
        /**
         * Formats the given date using the specified format string.
         *
         * @param date The date to format.
         * @param formatStr The format string.
         * @returns The formatted date string.
         */ this.format = (date, formatStr, _options)=>{
            const formatted = this.overrides?.format ? this.overrides.format(date, formatStr, this.options) : dateFns.format(date, formatStr, this.options);
            if (this.options.numerals && this.options.numerals !== "latn") {
                return this.replaceDigits(formatted);
            }
            return formatted;
        };
        /**
         * Returns the ISO week number for the given date.
         *
         * @param date The date to get the ISO week number for.
         * @returns The ISO week number.
         */ this.getISOWeek = (date)=>{
            return this.overrides?.getISOWeek ? this.overrides.getISOWeek(date) : dateFns.getISOWeek(date);
        };
        /**
         * Returns the month of the given date.
         *
         * @param date The date to get the month for.
         * @returns The month.
         */ this.getMonth = (date, _options)=>{
            return this.overrides?.getMonth ? this.overrides.getMonth(date, this.options) : dateFns.getMonth(date, this.options);
        };
        /**
         * Returns the year of the given date.
         *
         * @param date The date to get the year for.
         * @returns The year.
         */ this.getYear = (date, _options)=>{
            return this.overrides?.getYear ? this.overrides.getYear(date, this.options) : dateFns.getYear(date, this.options);
        };
        /**
         * Returns the local week number for the given date.
         *
         * @param date The date to get the week number for.
         * @returns The week number.
         */ this.getWeek = (date, _options)=>{
            return this.overrides?.getWeek ? this.overrides.getWeek(date, this.options) : dateFns.getWeek(date, this.options);
        };
        /**
         * Checks if the first date is after the second date.
         *
         * @param date The date to compare.
         * @param dateToCompare The date to compare with.
         * @returns True if the first date is after the second date.
         */ this.isAfter = (date, dateToCompare)=>{
            return this.overrides?.isAfter ? this.overrides.isAfter(date, dateToCompare) : dateFns.isAfter(date, dateToCompare);
        };
        /**
         * Checks if the first date is before the second date.
         *
         * @param date The date to compare.
         * @param dateToCompare The date to compare with.
         * @returns True if the first date is before the second date.
         */ this.isBefore = (date, dateToCompare)=>{
            return this.overrides?.isBefore ? this.overrides.isBefore(date, dateToCompare) : dateFns.isBefore(date, dateToCompare);
        };
        /**
         * Checks if the given value is a Date object.
         *
         * @param value The value to check.
         * @returns True if the value is a Date object.
         */ this.isDate = (value)=>{
            return this.overrides?.isDate ? this.overrides.isDate(value) : dateFns.isDate(value);
        };
        /**
         * Checks if the given dates are on the same day.
         *
         * @param dateLeft The first date to compare.
         * @param dateRight The second date to compare.
         * @returns True if the dates are on the same day.
         */ this.isSameDay = (dateLeft, dateRight)=>{
            return this.overrides?.isSameDay ? this.overrides.isSameDay(dateLeft, dateRight) : dateFns.isSameDay(dateLeft, dateRight);
        };
        /**
         * Checks if the given dates are in the same month.
         *
         * @param dateLeft The first date to compare.
         * @param dateRight The second date to compare.
         * @returns True if the dates are in the same month.
         */ this.isSameMonth = (dateLeft, dateRight)=>{
            return this.overrides?.isSameMonth ? this.overrides.isSameMonth(dateLeft, dateRight) : dateFns.isSameMonth(dateLeft, dateRight);
        };
        /**
         * Checks if the given dates are in the same year.
         *
         * @param dateLeft The first date to compare.
         * @param dateRight The second date to compare.
         * @returns True if the dates are in the same year.
         */ this.isSameYear = (dateLeft, dateRight)=>{
            return this.overrides?.isSameYear ? this.overrides.isSameYear(dateLeft, dateRight) : dateFns.isSameYear(dateLeft, dateRight);
        };
        /**
         * Returns the latest date in the given array of dates.
         *
         * @param dates The array of dates to compare.
         * @returns The latest date.
         */ this.max = (dates)=>{
            return this.overrides?.max ? this.overrides.max(dates) : dateFns.max(dates);
        };
        /**
         * Returns the earliest date in the given array of dates.
         *
         * @param dates The array of dates to compare.
         * @returns The earliest date.
         */ this.min = (dates)=>{
            return this.overrides?.min ? this.overrides.min(dates) : dateFns.min(dates);
        };
        /**
         * Sets the month of the given date.
         *
         * @param date The date to set the month on.
         * @param month The month to set (0-11).
         * @returns The new date with the month set.
         */ this.setMonth = (date, month)=>{
            return this.overrides?.setMonth ? this.overrides.setMonth(date, month) : dateFns.setMonth(date, month);
        };
        /**
         * Sets the year of the given date.
         *
         * @param date The date to set the year on.
         * @param year The year to set.
         * @returns The new date with the year set.
         */ this.setYear = (date, year)=>{
            return this.overrides?.setYear ? this.overrides.setYear(date, year) : dateFns.setYear(date, year);
        };
        /**
         * Returns the start of the broadcast week for the given date.
         *
         * @param date The original date.
         * @returns The start of the broadcast week.
         */ this.startOfBroadcastWeek = (date, _dateLib)=>{
            return this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(date, this) : startOfBroadcastWeek(date, this);
        };
        /**
         * Returns the start of the day for the given date.
         *
         * @param date The original date.
         * @returns The start of the day.
         */ this.startOfDay = (date)=>{
            return this.overrides?.startOfDay ? this.overrides.startOfDay(date) : dateFns.startOfDay(date);
        };
        /**
         * Returns the start of the ISO week for the given date.
         *
         * @param date The original date.
         * @returns The start of the ISO week.
         */ this.startOfISOWeek = (date)=>{
            return this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(date) : dateFns.startOfISOWeek(date);
        };
        /**
         * Returns the start of the month for the given date.
         *
         * @param date The original date.
         * @returns The start of the month.
         */ this.startOfMonth = (date)=>{
            return this.overrides?.startOfMonth ? this.overrides.startOfMonth(date) : dateFns.startOfMonth(date);
        };
        /**
         * Returns the start of the week for the given date.
         *
         * @param date The original date.
         * @returns The start of the week.
         */ this.startOfWeek = (date, _options)=>{
            return this.overrides?.startOfWeek ? this.overrides.startOfWeek(date, this.options) : dateFns.startOfWeek(date, this.options);
        };
        /**
         * Returns the start of the year for the given date.
         *
         * @param date The original date.
         * @returns The start of the year.
         */ this.startOfYear = (date)=>{
            return this.overrides?.startOfYear ? this.overrides.startOfYear(date) : dateFns.startOfYear(date);
        };
        this.options = {
            locale: enUS,
            ...options
        };
        this.overrides = overrides;
    }
}
/**
 * The default date library with English locale.
 *
 * @since 9.2.0
 */ const defaultDateLib = new DateLib();

/**
 * Represents a day displayed in the calendar.
 *
 * In DayPicker, a `CalendarDay` is a wrapper around a `Date` object that
 * provides additional information about the day, such as whether it belongs to
 * the displayed month.
 */ class CalendarDay {
    /**
     * Checks if this day is equal to another `CalendarDay`, considering both the
     * date and the displayed month.
     *
     * @param day The `CalendarDay` to compare with.
     * @returns `true` if the days are equal, otherwise `false`.
     */ isEqualTo(day) {
        return this.dateLib.isSameDay(day.date, this.date) && this.dateLib.isSameMonth(day.displayMonth, this.displayMonth);
    }
    constructor(date, displayMonth, dateLib = defaultDateLib){
        this.date = date;
        this.displayMonth = displayMonth;
        this.outside = Boolean(displayMonth && !dateLib.isSameMonth(date, displayMonth));
        this.dateLib = dateLib;
    }
}

/**
 * Represents a month in a calendar year.
 *
 * A `CalendarMonth` contains the weeks within the month and the date of the
 * month.
 */ class CalendarMonth {
    constructor(month, weeks){
        this.date = month;
        this.weeks = weeks;
    }
}

/**
 * Represents a week in a calendar month.
 *
 * A `CalendarWeek` contains the days within the week and the week number.
 */ class CalendarWeek {
    constructor(weekNumber, days){
        this.days = days;
        this.weekNumber = weekNumber;
    }
}

/**
 * Render the button elements in the calendar.
 *
 * @private
 * @deprecated Use `PreviousMonthButton` or `@link NextMonthButton` instead.
 */ function Button(props) {
    return React.createElement("button", {
        ...props
    });
}

/**
 * Render the label in the month caption.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function CaptionLabel(props) {
    return React.createElement("span", {
        ...props
    });
}

/**
 * Render the chevron icon used in the navigation buttons and dropdowns.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Chevron(props) {
    const { size = 24, orientation = "left", className } = props;
    return(// biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    React.createElement("svg", {
        className: className,
        width: size,
        height: size,
        viewBox: "0 0 24 24"
    }, orientation === "up" && React.createElement("polygon", {
        points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28"
    }), orientation === "down" && React.createElement("polygon", {
        points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72"
    }), orientation === "left" && React.createElement("polygon", {
        points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20"
    }), orientation === "right" && React.createElement("polygon", {
        points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20"
    })));
}

/**
 * Render a grid cell for a specific day in the calendar.
 *
 * Handles interaction and focus for the day. If you only need to change the
 * content of the day cell, consider swapping the `DayButton` component
 * instead.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Day(props) {
    const { day, modifiers, ...tdProps } = props;
    return React.createElement("td", {
        ...tdProps
    });
}

/**
 * Render a button for a specific day in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function DayButton(props) {
    const { day, modifiers, ...buttonProps } = props;
    const ref = React.useRef(null);
    React.useEffect(()=>{
        if (modifiers.focused) ref.current?.focus();
    }, [
        modifiers.focused
    ]);
    return React.createElement("button", {
        ref: ref,
        ...buttonProps
    });
}

/**
 * Enum representing the UI elements composing DayPicker. These elements are
 * mapped to {@link CustomComponents}, {@link ClassNames}, and {@link Styles}.
 *
 * Some elements are extended by flags and modifiers.
 */ var UI;
(function(UI) {
    /** The root component displaying the months and the navigation bar. */ UI["Root"] = "root";
    /** The Chevron SVG element used by navigation buttons and dropdowns. */ UI["Chevron"] = "chevron";
    /**
     * The grid cell with the day's date. Extended by {@link DayFlag} and
     * {@link SelectionState}.
     */ UI["Day"] = "day";
    /** The button containing the formatted day's date, inside the grid cell. */ UI["DayButton"] = "day_button";
    /** The caption label of the month (when not showing the dropdown navigation). */ UI["CaptionLabel"] = "caption_label";
    /** The container of the dropdown navigation (when enabled). */ UI["Dropdowns"] = "dropdowns";
    /** The dropdown element to select for years and months. */ UI["Dropdown"] = "dropdown";
    /** The container element of the dropdown. */ UI["DropdownRoot"] = "dropdown_root";
    /** The root element of the footer. */ UI["Footer"] = "footer";
    /** The month grid. */ UI["MonthGrid"] = "month_grid";
    /** Contains the dropdown navigation or the caption label. */ UI["MonthCaption"] = "month_caption";
    /** The dropdown with the months. */ UI["MonthsDropdown"] = "months_dropdown";
    /** Wrapper of the month grid. */ UI["Month"] = "month";
    /** The container of the displayed months. */ UI["Months"] = "months";
    /** The navigation bar with the previous and next buttons. */ UI["Nav"] = "nav";
    /**
     * The next month button in the navigation. *
     *
     * @since 9.1.0
     */ UI["NextMonthButton"] = "button_next";
    /**
     * The previous month button in the navigation.
     *
     * @since 9.1.0
     */ UI["PreviousMonthButton"] = "button_previous";
    /** The row containing the week. */ UI["Week"] = "week";
    /** The group of row weeks in a month (`tbody`). */ UI["Weeks"] = "weeks";
    /** The column header with the weekday. */ UI["Weekday"] = "weekday";
    /** The row grouping the weekdays in the column headers. */ UI["Weekdays"] = "weekdays";
    /** The cell containing the week number. */ UI["WeekNumber"] = "week_number";
    /** The cell header of the week numbers column. */ UI["WeekNumberHeader"] = "week_number_header";
    /** The dropdown with the years. */ UI["YearsDropdown"] = "years_dropdown";
})(UI || (UI = {}));
/** Enum representing flags for the {@link UI.Day} element. */ var DayFlag;
(function(DayFlag) {
    /** The day is disabled. */ DayFlag["disabled"] = "disabled";
    /** The day is hidden. */ DayFlag["hidden"] = "hidden";
    /** The day is outside the current month. */ DayFlag["outside"] = "outside";
    /** The day is focused. */ DayFlag["focused"] = "focused";
    /** The day is today. */ DayFlag["today"] = "today";
})(DayFlag || (DayFlag = {}));
/**
 * Enum representing selection states that can be applied to the {@link UI.Day}
 * element in selection mode.
 */ var SelectionState;
(function(SelectionState) {
    /** The day is at the end of a selected range. */ SelectionState["range_end"] = "range_end";
    /** The day is at the middle of a selected range. */ SelectionState["range_middle"] = "range_middle";
    /** The day is at the start of a selected range. */ SelectionState["range_start"] = "range_start";
    /** The day is selected. */ SelectionState["selected"] = "selected";
})(SelectionState || (SelectionState = {}));
/**
 * Enum representing different animation states for transitioning between
 * months.
 */ var Animation;
(function(Animation) {
    /** The entering weeks when they appear before the exiting month. */ Animation["weeks_before_enter"] = "weeks_before_enter";
    /** The exiting weeks when they disappear before the entering month. */ Animation["weeks_before_exit"] = "weeks_before_exit";
    /** The entering weeks when they appear after the exiting month. */ Animation["weeks_after_enter"] = "weeks_after_enter";
    /** The exiting weeks when they disappear after the entering month. */ Animation["weeks_after_exit"] = "weeks_after_exit";
    /** The entering caption when it appears after the exiting month. */ Animation["caption_after_enter"] = "caption_after_enter";
    /** The exiting caption when it disappears after the entering month. */ Animation["caption_after_exit"] = "caption_after_exit";
    /** The entering caption when it appears before the exiting month. */ Animation["caption_before_enter"] = "caption_before_enter";
    /** The exiting caption when it disappears before the entering month. */ Animation["caption_before_exit"] = "caption_before_exit";
})(Animation || (Animation = {}));

/**
 * Render a dropdown component for navigation in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Dropdown(props) {
    const { options, className, components, classNames, ...selectProps } = props;
    const cssClassSelect = [
        classNames[UI.Dropdown],
        className
    ].join(" ");
    const selectedOption = options?.find(({ value })=>value === selectProps.value);
    return React.createElement("span", {
        "data-disabled": selectProps.disabled,
        className: classNames[UI.DropdownRoot]
    }, React.createElement(components.Select, {
        className: cssClassSelect,
        ...selectProps
    }, options?.map(({ value, label, disabled })=>React.createElement(components.Option, {
            key: value,
            value: value,
            disabled: disabled
        }, label))), React.createElement("span", {
        className: classNames[UI.CaptionLabel],
        "aria-hidden": true
    }, selectedOption?.label, React.createElement(components.Chevron, {
        orientation: "down",
        size: 18,
        className: classNames[UI.Chevron]
    })));
}

/**
 * Render the navigation dropdowns for the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function DropdownNav(props) {
    return React.createElement("div", {
        ...props
    });
}

/**
 * Render the footer of the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Footer(props) {
    return React.createElement("div", {
        ...props
    });
}

/**
 * Render the grid with the weekday header row and the weeks for a specific
 * month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Month(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React.createElement("div", {
        ...divProps
    }, props.children);
}

/**
 * Render the caption for a month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function MonthCaption(props) {
    const { calendarMonth, displayIndex, ...divProps } = props;
    return React.createElement("div", {
        ...divProps
    });
}

/**
 * Render the grid of days for a specific month.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function MonthGrid(props) {
    return React.createElement("table", {
        ...props
    });
}

/**
 * Render a container wrapping the month grids.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Months(props) {
    return React.createElement("div", {
        ...props
    });
}

/** @ignore */ const dayPickerContext = React.createContext(undefined);
/**
 * Provides access to the DayPicker context, which includes properties and
 * methods to interact with the DayPicker component. This hook must be used
 * within a custom component.
 *
 * @template T - Use this type to refine the returned context type with a
 *   specific selection mode.
 * @returns The context to work with DayPicker.
 * @throws {Error} If the hook is used outside of a DayPicker provider.
 * @group Hooks
 * @see https://daypicker.dev/guides/custom-components
 */ function useDayPicker() {
    const context = React.useContext(dayPickerContext);
    if (context === undefined) {
        throw new Error("useDayPicker() must be used within a custom component.");
    }
    return context;
}

/**
 * Render a dropdown to navigate between months in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function MonthsDropdown(props) {
    const { components } = useDayPicker();
    return React.createElement(components.Dropdown, {
        ...props
    });
}

/**
 * Render the navigation toolbar with buttons to navigate between months.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Nav(props) {
    const { onPreviousClick, onNextClick, previousMonth, nextMonth, ...navProps } = props;
    const { components, classNames, labels: { labelPrevious, labelNext } } = useDayPicker();
    const handleNextClick = React.useCallback((e)=>{
        if (nextMonth) {
            onNextClick?.(e);
        }
    }, [
        nextMonth,
        onNextClick
    ]);
    const handlePreviousClick = React.useCallback((e)=>{
        if (previousMonth) {
            onPreviousClick?.(e);
        }
    }, [
        previousMonth,
        onPreviousClick
    ]);
    return React.createElement("nav", {
        ...navProps
    }, React.createElement(components.PreviousMonthButton, {
        type: "button",
        className: classNames[UI.PreviousMonthButton],
        tabIndex: previousMonth ? undefined : -1,
        "aria-disabled": previousMonth ? undefined : true,
        "aria-label": labelPrevious(previousMonth),
        onClick: handlePreviousClick
    }, React.createElement(components.Chevron, {
        disabled: previousMonth ? undefined : true,
        className: classNames[UI.Chevron],
        orientation: "left"
    })), React.createElement(components.NextMonthButton, {
        type: "button",
        className: classNames[UI.NextMonthButton],
        tabIndex: nextMonth ? undefined : -1,
        "aria-disabled": nextMonth ? undefined : true,
        "aria-label": labelNext(nextMonth),
        onClick: handleNextClick
    }, React.createElement(components.Chevron, {
        disabled: nextMonth ? undefined : true,
        orientation: "right",
        className: classNames[UI.Chevron]
    })));
}

/**
 * Render the button to navigate to the next month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function NextMonthButton(props) {
    const { components } = useDayPicker();
    return React.createElement(components.Button, {
        ...props
    });
}

/**
 * Render an `option` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Option(props) {
    return React.createElement("option", {
        ...props
    });
}

/**
 * Render the button to navigate to the previous month in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function PreviousMonthButton(props) {
    const { components } = useDayPicker();
    return React.createElement(components.Button, {
        ...props
    });
}

/**
 * Render the root element of the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Root$1(props) {
    const { rootRef, ...rest } = props;
    return React.createElement("div", {
        ...rest,
        ref: rootRef
    });
}

/**
 * Render a `select` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Select$1(props) {
    return React.createElement("select", {
        ...props
    });
}

/**
 * Render a table row representing a week in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Week(props) {
    const { week, ...trProps } = props;
    return React.createElement("tr", {
        ...trProps
    });
}

/**
 * Render a table header cell with the name of a weekday (e.g., "Mo", "Tu").
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Weekday(props) {
    return React.createElement("th", {
        ...props
    });
}

/**
 * Render the table row containing the weekday names.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Weekdays(props) {
    return React.createElement("thead", {
        "aria-hidden": true
    }, React.createElement("tr", {
        ...props
    }));
}

/**
 * Render a table cell displaying the number of the week.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function WeekNumber(props) {
    const { week, ...thProps } = props;
    return React.createElement("th", {
        ...thProps
    });
}

/**
 * Render the header cell for the week numbers column.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function WeekNumberHeader(props) {
    return React.createElement("th", {
        ...props
    });
}

/**
 * Render the container for the weeks in the month grid.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function Weeks(props) {
    return React.createElement("tbody", {
        ...props
    });
}

/**
 * Render a dropdown to navigate between years in the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */ function YearsDropdown(props) {
    const { components } = useDayPicker();
    return React.createElement(components.Dropdown, {
        ...props
    });
}

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Button: Button,
  CaptionLabel: CaptionLabel,
  Chevron: Chevron,
  Day: Day,
  DayButton: DayButton,
  Dropdown: Dropdown,
  DropdownNav: DropdownNav,
  Footer: Footer,
  Month: Month,
  MonthCaption: MonthCaption,
  MonthGrid: MonthGrid,
  Months: Months,
  MonthsDropdown: MonthsDropdown,
  Nav: Nav,
  NextMonthButton: NextMonthButton,
  Option: Option,
  PreviousMonthButton: PreviousMonthButton,
  Root: Root$1,
  Select: Select$1,
  Week: Week,
  WeekNumber: WeekNumber,
  WeekNumberHeader: WeekNumberHeader,
  Weekday: Weekday,
  Weekdays: Weekdays,
  Weeks: Weeks,
  YearsDropdown: YearsDropdown
});

/**
 * Checks if a given date is within a specified date range.
 *
 * @since 9.0.0
 * @param range - The date range to check against.
 * @param date - The date to check.
 * @param excludeEnds - If `true`, the range's start and end dates are excluded.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the date is within the range, otherwise `false`.
 * @group Utilities
 */ function rangeIncludesDate(range, date, excludeEnds = false, dateLib = defaultDateLib) {
    let { from, to } = range;
    const { differenceInCalendarDays, isSameDay } = dateLib;
    if (from && to) {
        const isRangeInverted = differenceInCalendarDays(to, from) < 0;
        if (isRangeInverted) {
            [from, to] = [
                to,
                from
            ];
        }
        const isInRange = differenceInCalendarDays(date, from) >= (excludeEnds ? 1 : 0) && differenceInCalendarDays(to, date) >= (excludeEnds ? 1 : 0);
        return isInRange;
    }
    if (!excludeEnds && to) {
        return isSameDay(to, date);
    }
    if (!excludeEnds && from) {
        return isSameDay(from, date);
    }
    return false;
}

/**
 * Checks if the given value is of type {@link DateInterval}.
 *
 * @param matcher - The value to check.
 * @returns `true` if the value is a {@link DateInterval}, otherwise `false`.
 * @group Utilities
 */ function isDateInterval(matcher) {
    return Boolean(matcher && typeof matcher === "object" && "before" in matcher && "after" in matcher);
}
/**
 * Checks if the given value is of type {@link DateRange}.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a {@link DateRange}, otherwise `false`.
 * @group Utilities
 */ function isDateRange(value) {
    return Boolean(value && typeof value === "object" && "from" in value);
}
/**
 * Checks if the given value is of type {@link DateAfter}.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a {@link DateAfter}, otherwise `false`.
 * @group Utilities
 */ function isDateAfterType(value) {
    return Boolean(value && typeof value === "object" && "after" in value);
}
/**
 * Checks if the given value is of type {@link DateBefore}.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a {@link DateBefore}, otherwise `false`.
 * @group Utilities
 */ function isDateBeforeType(value) {
    return Boolean(value && typeof value === "object" && "before" in value);
}
/**
 * Checks if the given value is of type {@link DayOfWeek}.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a {@link DayOfWeek}, otherwise `false`.
 * @group Utilities
 */ function isDayOfWeekType(value) {
    return Boolean(value && typeof value === "object" && "dayOfWeek" in value);
}
/**
 * Checks if the given value is an array of valid dates.
 *
 * @private
 * @param value - The value to check.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the value is an array of valid dates, otherwise `false`.
 */ function isDatesArray(value, dateLib) {
    return Array.isArray(value) && value.every(dateLib.isDate);
}

/**
 * Checks if a given date matches at least one of the specified {@link Matcher}.
 *
 * @param date - The date to check.
 * @param matchers - The matchers to check against.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the date matches any of the matchers, otherwise `false`.
 * @group Utilities
 */ function dateMatchModifiers(date, matchers, dateLib = defaultDateLib) {
    const matchersArr = !Array.isArray(matchers) ? [
        matchers
    ] : matchers;
    const { isSameDay, differenceInCalendarDays, isAfter } = dateLib;
    return matchersArr.some((matcher)=>{
        if (typeof matcher === "boolean") {
            return matcher;
        }
        if (dateLib.isDate(matcher)) {
            return isSameDay(date, matcher);
        }
        if (isDatesArray(matcher, dateLib)) {
            return matcher.includes(date);
        }
        if (isDateRange(matcher)) {
            return rangeIncludesDate(matcher, date, false, dateLib);
        }
        if (isDayOfWeekType(matcher)) {
            if (!Array.isArray(matcher.dayOfWeek)) {
                return matcher.dayOfWeek === date.getDay();
            }
            return matcher.dayOfWeek.includes(date.getDay());
        }
        if (isDateInterval(matcher)) {
            const diffBefore = differenceInCalendarDays(matcher.before, date);
            const diffAfter = differenceInCalendarDays(matcher.after, date);
            const isDayBefore = diffBefore > 0;
            const isDayAfter = diffAfter < 0;
            const isClosedInterval = isAfter(matcher.before, matcher.after);
            if (isClosedInterval) {
                return isDayAfter && isDayBefore;
            } else {
                return isDayBefore || isDayAfter;
            }
        }
        if (isDateAfterType(matcher)) {
            return differenceInCalendarDays(date, matcher.after) > 0;
        }
        if (isDateBeforeType(matcher)) {
            return differenceInCalendarDays(matcher.before, date) > 0;
        }
        if (typeof matcher === "function") {
            return matcher(date);
        }
        return false;
    });
}

/**
 * Creates a function to retrieve the modifiers for a given day.
 *
 * This function calculates both internal and custom modifiers for each day
 * based on the provided calendar days and DayPicker props.
 *
 * @private
 * @param days The array of `CalendarDay` objects to process.
 * @param props The DayPicker props, including modifiers and configuration
 *   options.
 * @param dateLib The date library to use for date manipulation.
 * @returns A function that retrieves the modifiers for a given `CalendarDay`.
 */ function createGetModifiers(days, props, navStart, navEnd, dateLib) {
    const { disabled, hidden, modifiers, showOutsideDays, broadcastCalendar, today } = props;
    const { isSameDay, isSameMonth, startOfMonth, isBefore, endOfMonth, isAfter } = dateLib;
    const computedNavStart = navStart && startOfMonth(navStart);
    const computedNavEnd = navEnd && endOfMonth(navEnd);
    const internalModifiersMap = {
        [DayFlag.focused]: [],
        [DayFlag.outside]: [],
        [DayFlag.disabled]: [],
        [DayFlag.hidden]: [],
        [DayFlag.today]: []
    };
    const customModifiersMap = {};
    for (const day of days){
        const { date, displayMonth } = day;
        const isOutside = Boolean(displayMonth && !isSameMonth(date, displayMonth));
        const isBeforeNavStart = Boolean(computedNavStart && isBefore(date, computedNavStart));
        const isAfterNavEnd = Boolean(computedNavEnd && isAfter(date, computedNavEnd));
        const isDisabled = Boolean(disabled && dateMatchModifiers(date, disabled, dateLib));
        const isHidden = Boolean(hidden && dateMatchModifiers(date, hidden, dateLib)) || isBeforeNavStart || isAfterNavEnd || // Broadcast calendar will show outside days as default
        !broadcastCalendar && !showOutsideDays && isOutside || broadcastCalendar && showOutsideDays === false && isOutside;
        const isToday = isSameDay(date, today ?? dateLib.today());
        if (isOutside) internalModifiersMap.outside.push(day);
        if (isDisabled) internalModifiersMap.disabled.push(day);
        if (isHidden) internalModifiersMap.hidden.push(day);
        if (isToday) internalModifiersMap.today.push(day);
        // Add custom modifiers
        if (modifiers) {
            Object.keys(modifiers).forEach((name)=>{
                const modifierValue = modifiers?.[name];
                const isMatch = modifierValue ? dateMatchModifiers(date, modifierValue, dateLib) : false;
                if (!isMatch) return;
                if (customModifiersMap[name]) {
                    customModifiersMap[name].push(day);
                } else {
                    customModifiersMap[name] = [
                        day
                    ];
                }
            });
        }
    }
    return (day)=>{
        // Initialize all the modifiers to false
        const dayFlags = {
            [DayFlag.focused]: false,
            [DayFlag.disabled]: false,
            [DayFlag.hidden]: false,
            [DayFlag.outside]: false,
            [DayFlag.today]: false
        };
        const customModifiers = {};
        // Find the modifiers for the given day
        for(const name in internalModifiersMap){
            const days = internalModifiersMap[name];
            dayFlags[name] = days.some((d)=>d === day);
        }
        for(const name in customModifiersMap){
            customModifiers[name] = customModifiersMap[name].some((d)=>d === day);
        }
        return {
            ...dayFlags,
            // custom modifiers should override all the previous ones
            ...customModifiers
        };
    };
}

/**
 * Returns the class names for a day based on its modifiers.
 *
 * This function combines the base class name for the day with any class names
 * associated with active modifiers.
 *
 * @param modifiers The modifiers applied to the day.
 * @param classNames The base class names for the calendar elements.
 * @param modifiersClassNames The class names associated with specific
 *   modifiers.
 * @returns An array of class names for the day.
 */ function getClassNamesForModifiers(modifiers, classNames, modifiersClassNames = {}) {
    const modifierClassNames = Object.entries(modifiers).filter(([, active])=>active === true).reduce((previousValue, [key])=>{
        if (modifiersClassNames[key]) {
            previousValue.push(modifiersClassNames[key]);
        } else if (classNames[DayFlag[key]]) {
            previousValue.push(classNames[DayFlag[key]]);
        } else if (classNames[SelectionState[key]]) {
            previousValue.push(classNames[SelectionState[key]]);
        }
        return previousValue;
    }, [
        classNames[UI.Day]
    ]);
    return modifierClassNames;
}

/**
 * Merges custom components from the props with the default components.
 *
 * This function ensures that any custom components provided in the props
 * override the default components.
 *
 * @param customComponents The custom components provided in the DayPicker
 *   props.
 * @returns An object containing the merged components.
 */ function getComponents(customComponents) {
    return {
        ...components,
        ...customComponents
    };
}

/**
 * Extracts `data-` attributes from the DayPicker props.
 *
 * This function collects all `data-` attributes from the props and adds
 * additional attributes based on the DayPicker configuration.
 *
 * @param props The DayPicker props.
 * @returns An object containing the `data-` attributes.
 */ function getDataAttributes(props) {
    const dataAttributes = {
        "data-mode": props.mode ?? undefined,
        "data-required": "required" in props ? props.required : undefined,
        "data-multiple-months": props.numberOfMonths && props.numberOfMonths > 1 || undefined,
        "data-week-numbers": props.showWeekNumber || undefined,
        "data-broadcast-calendar": props.broadcastCalendar || undefined,
        "data-nav-layout": props.navLayout || undefined
    };
    Object.entries(props).forEach(([key, val])=>{
        if (key.startsWith("data-")) {
            dataAttributes[key] = val;
        }
    });
    return dataAttributes;
}

/**
 * Returns the default class names for the UI elements.
 *
 * This function generates a mapping of default class names for various UI
 * elements, day flags, selection states, and animations.
 *
 * @returns An object containing the default class names.
 * @group Utilities
 */ function getDefaultClassNames() {
    const classNames = {};
    for(const key in UI){
        classNames[UI[key]] = `rdp-${UI[key]}`;
    }
    for(const key in DayFlag){
        classNames[DayFlag[key]] = `rdp-${DayFlag[key]}`;
    }
    for(const key in SelectionState){
        classNames[SelectionState[key]] = `rdp-${SelectionState[key]}`;
    }
    for(const key in Animation){
        classNames[Animation[key]] = `rdp-${Animation[key]}`;
    }
    return classNames;
}

/**
 * Formats the caption of the month.
 *
 * @defaultValue `LLLL y` (e.g., "November 2022").
 * @param month The date representing the month.
 * @param options Configuration options for the date library.
 * @param dateLib The date library to use for formatting. If not provided, a new
 *   instance is created.
 * @returns The formatted caption as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatCaption(month, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(month, "LLLL y");
}
/**
 * @private
 * @deprecated Use {@link formatCaption} instead.
 * @group Formatters
 */ const formatMonthCaption = formatCaption;

/**
 * Formats the day date shown in the day cell.
 *
 * @defaultValue `d` (e.g., "1").
 * @param date The date to format.
 * @param options Configuration options for the date library.
 * @param dateLib The date library to use for formatting. If not provided, a new
 *   instance is created.
 * @returns The formatted day as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatDay(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(date, "d");
}

/**
 * Formats the month for the dropdown option label.
 *
 * @defaultValue The localized full month name.
 * @param month The date representing the month.
 * @param dateLib The date library to use for formatting. Defaults to
 *   `defaultDateLib`.
 * @returns The formatted month name as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatMonthDropdown(month, dateLib = defaultDateLib) {
    return dateLib.format(month, "LLLL");
}

/**
 * Formats the name of a weekday to be displayed in the weekdays header.
 *
 * @defaultValue `cccccc` (e.g., "Mo" for Monday).
 * @param weekday The date representing the weekday.
 * @param options Configuration options for the date library.
 * @param dateLib The date library to use for formatting. If not provided, a new
 *   instance is created.
 * @returns The formatted weekday name as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatWeekdayName(weekday, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(weekday, "cccccc");
}

/**
 * Formats the week number.
 *
 * @defaultValue The week number as a string, with a leading zero for single-digit numbers.
 * @param weekNumber The week number to format.
 * @param dateLib The date library to use for formatting. Defaults to
 *   `defaultDateLib`.
 * @returns The formatted week number as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatWeekNumber(weekNumber, dateLib = defaultDateLib) {
    if (weekNumber < 10) {
        return dateLib.formatNumber(`0${weekNumber.toLocaleString()}`);
    }
    return dateLib.formatNumber(`${weekNumber.toLocaleString()}`);
}

/**
 * Formats the header for the week number column.
 *
 * @defaultValue An empty string `""`.
 * @returns The formatted week number header as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatWeekNumberHeader() {
    return ``;
}

/**
 * Formats the year for the dropdown option label.
 *
 * @param year The year to format.
 * @param dateLib The date library to use for formatting. Defaults to
 *   `defaultDateLib`.
 * @returns The formatted year as a string.
 * @group Formatters
 * @see https://daypicker.dev/docs/translation#custom-formatters
 */ function formatYearDropdown(year, dateLib = defaultDateLib) {
    return dateLib.format(year, "yyyy");
}
/**
 * @private
 * @deprecated Use `formatYearDropdown` instead.
 * @group Formatters
 */ const formatYearCaption = formatYearDropdown;

var defaultFormatters = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatCaption: formatCaption,
  formatDay: formatDay,
  formatMonthCaption: formatMonthCaption,
  formatMonthDropdown: formatMonthDropdown,
  formatWeekNumber: formatWeekNumber,
  formatWeekNumberHeader: formatWeekNumberHeader,
  formatWeekdayName: formatWeekdayName,
  formatYearCaption: formatYearCaption,
  formatYearDropdown: formatYearDropdown
});

/**
 * Merges custom formatters from the props with the default formatters.
 *
 * @param customFormatters The custom formatters provided in the DayPicker
 *   props.
 * @returns The merged formatters object.
 */ function getFormatters(customFormatters) {
    if (customFormatters?.formatMonthCaption && !customFormatters.formatCaption) {
        customFormatters.formatCaption = customFormatters.formatMonthCaption;
    }
    if (customFormatters?.formatYearCaption && !customFormatters.formatYearDropdown) {
        customFormatters.formatYearDropdown = customFormatters.formatYearCaption;
    }
    return {
        ...defaultFormatters,
        ...customFormatters
    };
}

/**
 * Returns the months to show in the dropdown.
 *
 * This function generates a list of months for the current year, formatted
 * using the provided formatter, and determines whether each month should be
 * disabled based on the navigation range.
 *
 * @param displayMonth The currently displayed month.
 * @param navStart The start date for navigation.
 * @param navEnd The end date for navigation.
 * @param formatters The formatters to use for formatting the month labels.
 * @param dateLib The date library to use for date manipulation.
 * @returns An array of dropdown options representing the months, or `undefined`
 *   if no months are available.
 */ function getMonthOptions(displayMonth, navStart, navEnd, formatters, dateLib) {
    const { startOfMonth, startOfYear, endOfYear, eachMonthOfInterval, getMonth } = dateLib;
    const months = eachMonthOfInterval({
        start: startOfYear(displayMonth),
        end: endOfYear(displayMonth)
    });
    const options = months.map((month)=>{
        const label = formatters.formatMonthDropdown(month, dateLib);
        const value = getMonth(month);
        const disabled = navStart && month < startOfMonth(navStart) || navEnd && month > startOfMonth(navEnd) || false;
        return {
            value,
            label,
            disabled
        };
    });
    return options;
}

/**
 * Returns the computed style for a day based on its modifiers.
 *
 * This function merges the base styles for the day with any styles associated
 * with active modifiers.
 *
 * @param dayModifiers The modifiers applied to the day.
 * @param styles The base styles for the calendar elements.
 * @param modifiersStyles The styles associated with specific modifiers.
 * @returns The computed style for the day.
 */ function getStyleForModifiers(dayModifiers, styles = {}, modifiersStyles = {}) {
    let style = {
        ...styles?.[UI.Day]
    };
    Object.entries(dayModifiers).filter(([, active])=>active === true).forEach(([modifier])=>{
        style = {
            ...style,
            ...modifiersStyles?.[modifier]
        };
    });
    return style;
}

/**
 * Generates a series of 7 days, starting from the beginning of the week, to use
 * for formatting weekday names (e.g., Monday, Tuesday, etc.).
 *
 * @param dateLib The date library to use for date manipulation.
 * @param ISOWeek Whether to use ISO week numbering (weeks start on Monday).
 * @param broadcastCalendar Whether to use the broadcast calendar (weeks start
 *   on Monday, but may include adjustments for broadcast-specific rules).
 * @returns An array of 7 dates representing the weekdays.
 */ function getWeekdays(dateLib, ISOWeek, broadcastCalendar) {
    const today = dateLib.today();
    const start = ISOWeek ? dateLib.startOfISOWeek(today) : dateLib.startOfWeek(today);
    const days = [];
    for(let i = 0; i < 7; i++){
        const day = dateLib.addDays(start, i);
        days.push(day);
    }
    return days;
}

/**
 * Returns the years to display in the dropdown.
 *
 * This function generates a list of years between the navigation start and end
 * dates, formatted using the provided formatter.
 *
 * @param navStart The start date for navigation.
 * @param navEnd The end date for navigation.
 * @param formatters The formatters to use for formatting the year labels.
 * @param dateLib The date library to use for date manipulation.
 * @param reverse If true, reverses the order of the years (descending).
 * @returns An array of dropdown options representing the years, or `undefined`
 *   if `navStart` or `navEnd` is not provided.
 */ function getYearOptions(navStart, navEnd, formatters, dateLib, reverse = false) {
    if (!navStart) return undefined;
    if (!navEnd) return undefined;
    const { startOfYear, endOfYear, addYears, getYear, isBefore, isSameYear } = dateLib;
    const firstNavYear = startOfYear(navStart);
    const lastNavYear = endOfYear(navEnd);
    const years = [];
    let year = firstNavYear;
    while(isBefore(year, lastNavYear) || isSameYear(year, lastNavYear)){
        years.push(year);
        year = addYears(year, 1);
    }
    if (reverse) years.reverse();
    return years.map((year)=>{
        const label = formatters.formatYearDropdown(year, dateLib);
        return {
            value: getYear(year),
            label,
            disabled: false
        };
    });
}

/**
 * Generates the ARIA label for a day button.
 *
 * Use the `modifiers` argument to provide additional context for the label,
 * such as indicating if the day is "today" or "selected."
 *
 * @defaultValue The formatted date.
 * @param date - The date to format.
 * @param modifiers - The modifiers providing context for the day.
 * @param options - Optional configuration for the date formatting library.
 * @param dateLib - An optional instance of the date formatting library.
 * @returns The ARIA label for the day button.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelDayButton(date, modifiers, options, dateLib) {
    let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
    if (modifiers.today) label = `Today, ${label}`;
    if (modifiers.selected) label = `${label}, selected`;
    return label;
}
/**
 * @ignore
 * @deprecated Use `labelDayButton` instead.
 */ const labelDay = labelDayButton;

/**
 * Generates the ARIA label for the month grid, which is announced when entering
 * the grid.
 *
 * @defaultValue `LLLL y` (e.g., "November 2022").
 * @param date - The date representing the month.
 * @param options - Optional configuration for the date formatting library.
 * @param dateLib - An optional instance of the date formatting library.
 * @returns The ARIA label for the month grid.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelGrid(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(date, "LLLL y");
}
/**
 * @ignore
 * @deprecated Use {@link labelGrid} instead.
 */ const labelCaption = labelGrid;

/**
 * Generates the label for a day grid cell when the calendar is not interactive.
 *
 * @param date - The date to format.
 * @param modifiers - Optional modifiers providing context for the day.
 * @param options - Optional configuration for the date formatting library.
 * @param dateLib - An optional instance of the date formatting library.
 * @returns The label for the day grid cell.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelGridcell(date, modifiers, options, dateLib) {
    let label = (dateLib ?? new DateLib(options)).format(date, "PPPP");
    if (modifiers?.today) {
        label = `Today, ${label}`;
    }
    return label;
}

/**
 * Generates the ARIA label for the months dropdown.
 *
 * @defaultValue `"Choose the Month"`
 * @param options - Optional configuration for the date formatting library.
 * @returns The ARIA label for the months dropdown.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelMonthDropdown(_options) {
    return "Choose the Month";
}

/**
 * Generates the ARIA label for the navigation toolbar.
 *
 * @defaultValue `""`
 * @returns The ARIA label for the navigation toolbar.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelNav() {
    return "";
}

/**
 * Generates the ARIA label for the "next month" button.
 *
 * @defaultValue `"Go to the Next Month"`
 * @param month - The date representing the next month, or `undefined` if there
 *   is no next month.
 * @returns The ARIA label for the "next month" button.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelNext(_month) {
    return "Go to the Next Month";
}

/**
 * Generates the ARIA label for the "previous month" button.
 *
 * @defaultValue `"Go to the Previous Month"`
 * @param month - The date representing the previous month, or `undefined` if
 *   there is no previous month.
 * @returns The ARIA label for the "previous month" button.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelPrevious(_month) {
    return "Go to the Previous Month";
}

/**
 * Generates the ARIA label for a weekday column header.
 *
 * @defaultValue `"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"`
 * @param date - The date representing the weekday.
 * @param options - Optional configuration for the date formatting library.
 * @param dateLib - An optional instance of the date formatting library.
 * @returns The ARIA label for the weekday column header.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelWeekday(date, options, dateLib) {
    return (dateLib ?? new DateLib(options)).format(date, "cccc");
}

/**
 * Generates the ARIA label for the week number cell (the first cell in a row).
 *
 * @defaultValue `Week ${weekNumber}`
 * @param weekNumber - The number of the week.
 * @param options - Optional configuration for the date formatting library.
 * @returns The ARIA label for the week number cell.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelWeekNumber(weekNumber, _options) {
    return `Week ${weekNumber}`;
}

/**
 * Generates the ARIA label for the week number header element.
 *
 * @defaultValue `"Week Number"`
 * @param options - Optional configuration for the date formatting library.
 * @returns The ARIA label for the week number header.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelWeekNumberHeader(_options) {
    return "Week Number";
}

/**
 * Generates the ARIA label for the years dropdown.
 *
 * @defaultValue `"Choose the Year"`
 * @param options - Optional configuration for the date formatting library.
 * @returns The ARIA label for the years dropdown.
 * @group Labels
 * @see https://daypicker.dev/docs/translation#aria-labels
 */ function labelYearDropdown(_options) {
    return "Choose the Year";
}

var defaultLabels = /*#__PURE__*/Object.freeze({
  __proto__: null,
  labelCaption: labelCaption,
  labelDay: labelDay,
  labelDayButton: labelDayButton,
  labelGrid: labelGrid,
  labelGridcell: labelGridcell,
  labelMonthDropdown: labelMonthDropdown,
  labelNav: labelNav,
  labelNext: labelNext,
  labelPrevious: labelPrevious,
  labelWeekNumber: labelWeekNumber,
  labelWeekNumberHeader: labelWeekNumberHeader,
  labelWeekday: labelWeekday,
  labelYearDropdown: labelYearDropdown
});

const asHtmlElement = (element)=>{
    if (element instanceof HTMLElement) return element;
    return null;
};
const queryMonthEls = (element)=>[
        ...element.querySelectorAll("[data-animated-month]") ?? []
    ];
const queryMonthEl = (element)=>asHtmlElement(element.querySelector("[data-animated-month]"));
const queryCaptionEl = (element)=>asHtmlElement(element.querySelector("[data-animated-caption]"));
const queryWeeksEl = (element)=>asHtmlElement(element.querySelector("[data-animated-weeks]"));
const queryNavEl = (element)=>asHtmlElement(element.querySelector("[data-animated-nav]"));
const queryWeekdaysEl = (element)=>asHtmlElement(element.querySelector("[data-animated-weekdays]"));
/**
 * Handles animations for transitioning between months in the DayPicker
 * component.
 *
 * @private
 * @param rootElRef - A reference to the root element of the DayPicker
 *   component.
 * @param enabled - Whether animations are enabled.
 * @param options - Configuration options for the animation, including class
 *   names, months, focused day, and the date utility library.
 */ function useAnimation(rootElRef, enabled, { classNames, months, focused, dateLib }) {
    const previousRootElSnapshotRef = React.useRef(null);
    const previousMonthsRef = React.useRef(months);
    const animatingRef = React.useRef(false);
    React.useLayoutEffect(()=>{
        // get previous months before updating the previous months ref
        const previousMonths = previousMonthsRef.current;
        // update previous months ref for next effect trigger
        previousMonthsRef.current = months;
        if (!enabled || !rootElRef.current || // safety check because the ref can be set to anything by consumers
        !(rootElRef.current instanceof HTMLElement) || // validation required for the animation to work as expected
        months.length === 0 || previousMonths.length === 0 || months.length !== previousMonths.length) {
            return;
        }
        const isSameMonth = dateLib.isSameMonth(months[0].date, previousMonths[0].date);
        const isAfterPreviousMonth = dateLib.isAfter(months[0].date, previousMonths[0].date);
        const captionAnimationClass = isAfterPreviousMonth ? classNames[Animation.caption_after_enter] : classNames[Animation.caption_before_enter];
        const weeksAnimationClass = isAfterPreviousMonth ? classNames[Animation.weeks_after_enter] : classNames[Animation.weeks_before_enter];
        // get previous root element snapshot before updating the snapshot ref
        const previousRootElSnapshot = previousRootElSnapshotRef.current;
        // update snapshot for next effect trigger
        const rootElSnapshot = rootElRef.current.cloneNode(true);
        if (rootElSnapshot instanceof HTMLElement) {
            // if this effect is triggered while animating, we need to clean up the new root snapshot
            // to put it in the same state as when not animating, to correctly animate the next month change
            const currentMonthElsSnapshot = queryMonthEls(rootElSnapshot);
            currentMonthElsSnapshot.forEach((currentMonthElSnapshot)=>{
                if (!(currentMonthElSnapshot instanceof HTMLElement)) return;
                // remove the old month snapshots from the new root snapshot
                const previousMonthElSnapshot = queryMonthEl(currentMonthElSnapshot);
                if (previousMonthElSnapshot && currentMonthElSnapshot.contains(previousMonthElSnapshot)) {
                    currentMonthElSnapshot.removeChild(previousMonthElSnapshot);
                }
                // remove animation classes from the new month snapshots
                const captionEl = queryCaptionEl(currentMonthElSnapshot);
                if (captionEl) {
                    captionEl.classList.remove(captionAnimationClass);
                }
                const weeksEl = queryWeeksEl(currentMonthElSnapshot);
                if (weeksEl) {
                    weeksEl.classList.remove(weeksAnimationClass);
                }
            });
            previousRootElSnapshotRef.current = rootElSnapshot;
        } else {
            previousRootElSnapshotRef.current = null;
        }
        if (animatingRef.current || isSameMonth || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
        focused) {
            return;
        }
        const previousMonthEls = previousRootElSnapshot instanceof HTMLElement ? queryMonthEls(previousRootElSnapshot) : [];
        const currentMonthEls = queryMonthEls(rootElRef.current);
        if (currentMonthEls?.every((el)=>el instanceof HTMLElement) && previousMonthEls && previousMonthEls.every((el)=>el instanceof HTMLElement)) {
            animatingRef.current = true;
            // set isolation to isolate to isolate the stacking context during animation
            rootElRef.current.style.isolation = "isolate";
            // set z-index to 1 to ensure the nav is clickable over the other elements being animated
            const navEl = queryNavEl(rootElRef.current);
            if (navEl) {
                navEl.style.zIndex = "1";
            }
            currentMonthEls.forEach((currentMonthEl, index)=>{
                const previousMonthEl = previousMonthEls[index];
                if (!previousMonthEl) {
                    return;
                }
                // animate new displayed month
                currentMonthEl.style.position = "relative";
                currentMonthEl.style.overflow = "hidden";
                const captionEl = queryCaptionEl(currentMonthEl);
                if (captionEl) {
                    captionEl.classList.add(captionAnimationClass);
                }
                const weeksEl = queryWeeksEl(currentMonthEl);
                if (weeksEl) {
                    weeksEl.classList.add(weeksAnimationClass);
                }
                // animate new displayed month end
                const cleanUp = ()=>{
                    animatingRef.current = false;
                    if (rootElRef.current) {
                        rootElRef.current.style.isolation = "";
                    }
                    if (navEl) {
                        navEl.style.zIndex = "";
                    }
                    if (captionEl) {
                        captionEl.classList.remove(captionAnimationClass);
                    }
                    if (weeksEl) {
                        weeksEl.classList.remove(weeksAnimationClass);
                    }
                    currentMonthEl.style.position = "";
                    currentMonthEl.style.overflow = "";
                    if (currentMonthEl.contains(previousMonthEl)) {
                        currentMonthEl.removeChild(previousMonthEl);
                    }
                };
                // animate old displayed month
                previousMonthEl.style.pointerEvents = "none";
                previousMonthEl.style.position = "absolute";
                previousMonthEl.style.overflow = "hidden";
                previousMonthEl.setAttribute("aria-hidden", "true");
                // hide the weekdays container of the old month and only the new one
                const previousWeekdaysEl = queryWeekdaysEl(previousMonthEl);
                if (previousWeekdaysEl) {
                    previousWeekdaysEl.style.opacity = "0";
                }
                const previousCaptionEl = queryCaptionEl(previousMonthEl);
                if (previousCaptionEl) {
                    previousCaptionEl.classList.add(isAfterPreviousMonth ? classNames[Animation.caption_before_exit] : classNames[Animation.caption_after_exit]);
                    previousCaptionEl.addEventListener("animationend", cleanUp);
                }
                const previousWeeksEl = queryWeeksEl(previousMonthEl);
                if (previousWeeksEl) {
                    previousWeeksEl.classList.add(isAfterPreviousMonth ? classNames[Animation.weeks_before_exit] : classNames[Animation.weeks_after_exit]);
                }
                currentMonthEl.insertBefore(previousMonthEl, currentMonthEl.firstChild);
            });
        }
    });
}

/**
 * Returns all the dates to display in the calendar.
 *
 * This function calculates the range of dates to display based on the provided
 * display months, constraints, and calendar configuration.
 *
 * @param displayMonths The months to display in the calendar.
 * @param maxDate The maximum date to include in the range.
 * @param props The DayPicker props, including calendar configuration options.
 * @param dateLib The date library to use for date manipulation.
 * @returns An array of dates to display in the calendar.
 */ function getDates(displayMonths, maxDate, props, dateLib) {
    const firstMonth = displayMonths[0];
    const lastMonth = displayMonths[displayMonths.length - 1];
    const { ISOWeek, fixedWeeks, broadcastCalendar } = props ?? {};
    const { addDays, differenceInCalendarDays, differenceInCalendarMonths, endOfBroadcastWeek, endOfISOWeek, endOfMonth, endOfWeek, isAfter, startOfBroadcastWeek, startOfISOWeek, startOfWeek } = dateLib;
    const startWeekFirstDate = broadcastCalendar ? startOfBroadcastWeek(firstMonth, dateLib) : ISOWeek ? startOfISOWeek(firstMonth) : startOfWeek(firstMonth);
    const endWeekLastDate = broadcastCalendar ? endOfBroadcastWeek(lastMonth) : ISOWeek ? endOfISOWeek(endOfMonth(lastMonth)) : endOfWeek(endOfMonth(lastMonth));
    const nOfDays = differenceInCalendarDays(endWeekLastDate, startWeekFirstDate);
    const nOfMonths = differenceInCalendarMonths(lastMonth, firstMonth) + 1;
    const dates = [];
    for(let i = 0; i <= nOfDays; i++){
        const date = addDays(startWeekFirstDate, i);
        if (maxDate && isAfter(date, maxDate)) {
            break;
        }
        dates.push(date);
    }
    // If fixed weeks is enabled, add the extra dates to the array
    const nrOfDaysWithFixedWeeks = broadcastCalendar ? 35 : 42;
    const extraDates = nrOfDaysWithFixedWeeks * nOfMonths;
    if (fixedWeeks && dates.length < extraDates) {
        const daysToAdd = extraDates - dates.length;
        for(let i = 0; i < daysToAdd; i++){
            const date = addDays(dates[dates.length - 1], 1);
            dates.push(date);
        }
    }
    return dates;
}

/**
 * Returns all the days belonging to the calendar by merging the days in the
 * weeks for each month.
 *
 * @param calendarMonths The array of calendar months.
 * @returns An array of `CalendarDay` objects representing all the days in the
 *   calendar.
 */ function getDays(calendarMonths) {
    const initialDays = [];
    return calendarMonths.reduce((days, month)=>{
        const weekDays = month.weeks.reduce((weekDays, week)=>{
            return weekDays.concat(week.days.slice());
        }, initialDays.slice());
        return days.concat(weekDays.slice());
    }, initialDays.slice());
}

/**
 * Returns the months to display in the calendar.
 *
 * @param firstDisplayedMonth The first month currently displayed in the
 *   calendar.
 * @param calendarEndMonth The latest month the user can navigate to.
 * @param props The DayPicker props, including `numberOfMonths`.
 * @param dateLib The date library to use for date manipulation.
 * @returns An array of dates representing the months to display.
 */ function getDisplayMonths(firstDisplayedMonth, calendarEndMonth, props, dateLib) {
    const { numberOfMonths = 1 } = props;
    const months = [];
    for(let i = 0; i < numberOfMonths; i++){
        const month = dateLib.addMonths(firstDisplayedMonth, i);
        if (calendarEndMonth && month > calendarEndMonth) {
            break;
        }
        months.push(month);
    }
    return months;
}

/**
 * Determines the initial month to display in the calendar based on the provided
 * props.
 *
 * This function calculates the starting month, considering constraints such as
 * `startMonth`, `endMonth`, and the number of months to display.
 *
 * @param props The DayPicker props, including navigation and date constraints.
 * @param dateLib The date library to use for date manipulation.
 * @returns The initial month to display.
 */ function getInitialMonth(props, navStart, navEnd, dateLib) {
    const { month, defaultMonth, today = dateLib.today(), numberOfMonths = 1 } = props;
    let initialMonth = month || defaultMonth || today;
    const { differenceInCalendarMonths, addMonths, startOfMonth } = dateLib;
    if (navEnd && differenceInCalendarMonths(navEnd, initialMonth) < numberOfMonths - 1) {
        const offset = -1 * (numberOfMonths - 1);
        initialMonth = addMonths(navEnd, offset);
    }
    if (navStart && differenceInCalendarMonths(initialMonth, navStart) < 0) {
        initialMonth = navStart;
    }
    return startOfMonth(initialMonth);
}

/**
 * Returns the months to display in the calendar.
 *
 * This function generates `CalendarMonth` objects for each month to be
 * displayed, including their weeks and days, based on the provided display
 * months and dates.
 *
 * @param displayMonths The months (as dates) to display in the calendar.
 * @param dates The dates to display in the calendar.
 * @param props Options from the DayPicker props context.
 * @param dateLib The date library to use for date manipulation.
 * @returns An array of `CalendarMonth` objects representing the months to
 *   display.
 */ function getMonths(displayMonths, dates, props, dateLib) {
    const { addDays, endOfBroadcastWeek, endOfISOWeek, endOfMonth, endOfWeek, getISOWeek, getWeek, startOfBroadcastWeek, startOfISOWeek, startOfWeek } = dateLib;
    const dayPickerMonths = displayMonths.reduce((months, month)=>{
        const firstDateOfFirstWeek = props.broadcastCalendar ? startOfBroadcastWeek(month, dateLib) : props.ISOWeek ? startOfISOWeek(month) : startOfWeek(month);
        const lastDateOfLastWeek = props.broadcastCalendar ? endOfBroadcastWeek(month) : props.ISOWeek ? endOfISOWeek(endOfMonth(month)) : endOfWeek(endOfMonth(month));
        /** The dates to display in the month. */ const monthDates = dates.filter((date)=>{
            return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
        });
        const nrOfDaysWithFixedWeeks = props.broadcastCalendar ? 35 : 42;
        if (props.fixedWeeks && monthDates.length < nrOfDaysWithFixedWeeks) {
            const extraDates = dates.filter((date)=>{
                const daysToAdd = nrOfDaysWithFixedWeeks - monthDates.length;
                return date > lastDateOfLastWeek && date <= addDays(lastDateOfLastWeek, daysToAdd);
            });
            monthDates.push(...extraDates);
        }
        const weeks = monthDates.reduce((weeks, date)=>{
            const weekNumber = props.ISOWeek ? getISOWeek(date) : getWeek(date);
            const week = weeks.find((week)=>week.weekNumber === weekNumber);
            const day = new CalendarDay(date, month, dateLib);
            if (!week) {
                weeks.push(new CalendarWeek(weekNumber, [
                    day
                ]));
            } else {
                week.days.push(day);
            }
            return weeks;
        }, []);
        const dayPickerMonth = new CalendarMonth(month, weeks);
        months.push(dayPickerMonth);
        return months;
    }, []);
    if (!props.reverseMonths) {
        return dayPickerMonths;
    } else {
        return dayPickerMonths.reverse();
    }
}

/**
 * Returns the start and end months for calendar navigation.
 *
 * @param props The DayPicker props, including navigation and layout options.
 * @param dateLib The date library to use for date manipulation.
 * @returns A tuple containing the start and end months for navigation.
 */ function getNavMonths(props, dateLib) {
    let { startMonth, endMonth } = props;
    const { startOfYear, startOfDay, startOfMonth, endOfMonth, addYears, endOfYear, newDate, today } = dateLib;
    // Handle deprecated code
    const { fromYear, toYear, fromMonth, toMonth } = props;
    if (!startMonth && fromMonth) {
        startMonth = fromMonth;
    }
    if (!startMonth && fromYear) {
        startMonth = dateLib.newDate(fromYear, 0, 1);
    }
    if (!endMonth && toMonth) {
        endMonth = toMonth;
    }
    if (!endMonth && toYear) {
        endMonth = newDate(toYear, 11, 31);
    }
    const hasYearDropdown = props.captionLayout === "dropdown" || props.captionLayout === "dropdown-years";
    if (startMonth) {
        startMonth = startOfMonth(startMonth);
    } else if (fromYear) {
        startMonth = newDate(fromYear, 0, 1);
    } else if (!startMonth && hasYearDropdown) {
        startMonth = startOfYear(addYears(props.today ?? today(), -100));
    }
    if (endMonth) {
        endMonth = endOfMonth(endMonth);
    } else if (toYear) {
        endMonth = newDate(toYear, 11, 31);
    } else if (!endMonth && hasYearDropdown) {
        endMonth = endOfYear(props.today ?? today());
    }
    return [
        startMonth ? startOfDay(startMonth) : startMonth,
        endMonth ? startOfDay(endMonth) : endMonth
    ];
}

/**
 * Returns the next month the user can navigate to, based on the given options.
 *
 * The next month is not always the next calendar month:
 *
 * - If it is after the `calendarEndMonth`, it returns `undefined`.
 * - If paged navigation is enabled, it skips forward by the number of displayed
 *   months.
 *
 * @param firstDisplayedMonth The first month currently displayed in the
 *   calendar.
 * @param calendarEndMonth The latest month the user can navigate to.
 * @param options Navigation options, including `numberOfMonths` and
 *   `pagedNavigation`.
 * @param dateLib The date library to use for date manipulation.
 * @returns The next month, or `undefined` if navigation is not possible.
 */ function getNextMonth(firstDisplayedMonth, calendarEndMonth, options, dateLib) {
    if (options.disableNavigation) {
        return undefined;
    }
    const { pagedNavigation, numberOfMonths = 1 } = options;
    const { startOfMonth, addMonths, differenceInCalendarMonths } = dateLib;
    const offset = pagedNavigation ? numberOfMonths : 1;
    const month = startOfMonth(firstDisplayedMonth);
    if (!calendarEndMonth) {
        return addMonths(month, offset);
    }
    const monthsDiff = differenceInCalendarMonths(calendarEndMonth, firstDisplayedMonth);
    if (monthsDiff < numberOfMonths) {
        return undefined;
    }
    return addMonths(month, offset);
}

/**
 * Returns the previous month the user can navigate to, based on the given
 * options.
 *
 * The previous month is not always the previous calendar month:
 *
 * - If it is before the `calendarStartMonth`, it returns `undefined`.
 * - If paged navigation is enabled, it skips back by the number of displayed
 *   months.
 *
 * @param firstDisplayedMonth The first month currently displayed in the
 *   calendar.
 * @param calendarStartMonth The earliest month the user can navigate to.
 * @param options Navigation options, including `numberOfMonths` and
 *   `pagedNavigation`.
 * @param dateLib The date library to use for date manipulation.
 * @returns The previous month, or `undefined` if navigation is not possible.
 */ function getPreviousMonth(firstDisplayedMonth, calendarStartMonth, options, dateLib) {
    if (options.disableNavigation) {
        return undefined;
    }
    const { pagedNavigation, numberOfMonths } = options;
    const { startOfMonth, addMonths, differenceInCalendarMonths } = dateLib;
    const offset = pagedNavigation ? numberOfMonths ?? 1 : 1;
    const month = startOfMonth(firstDisplayedMonth);
    if (!calendarStartMonth) {
        return addMonths(month, -offset);
    }
    const monthsDiff = differenceInCalendarMonths(month, calendarStartMonth);
    if (monthsDiff <= 0) {
        return undefined;
    }
    return addMonths(month, -offset);
}

/**
 * Returns an array of calendar weeks from an array of calendar months.
 *
 * @param months The array of calendar months.
 * @returns An array of calendar weeks.
 */ function getWeeks(months) {
    const initialWeeks = [];
    return months.reduce((weeks, month)=>{
        return weeks.concat(month.weeks.slice());
    }, initialWeeks.slice());
}

/**
 * A custom hook for managing both controlled and uncontrolled component states.
 *
 * This hook allows a component to support both controlled and uncontrolled
 * states by determining whether the `controlledValue` is provided. If it is
 * undefined, the hook falls back to using the internal state.
 *
 * @example
 *   // Uncontrolled usage
 *   const [value, setValue] = useControlledValue(0, undefined);
 *
 *   // Controlled usage
 *   const [value, setValue] = useControlledValue(0, props.value);
 *
 * @template T - The type of the value.
 * @param defaultValue The initial value for the uncontrolled state.
 * @param controlledValue The value for the controlled state. If undefined, the
 *   component will use the uncontrolled state.
 * @returns A tuple where the first element is the current value (either
 *   controlled or uncontrolled) and the second element is a setter function to
 *   update the value.
 */ function useControlledValue(defaultValue, controlledValue) {
    const [uncontrolledValue, setValue] = React.useState(defaultValue);
    const value = controlledValue === undefined ? uncontrolledValue : controlledValue;
    return [
        value,
        setValue
    ];
}

/**
 * Provides the calendar object to work with the calendar in custom components.
 *
 * @private
 * @param props - The DayPicker props related to calendar configuration.
 * @param dateLib - The date utility library instance.
 * @returns The calendar object containing displayed days, weeks, months, and
 *   navigation methods.
 */ function useCalendar(props, dateLib) {
    const [navStart, navEnd] = getNavMonths(props, dateLib);
    const { startOfMonth, endOfMonth } = dateLib;
    const initialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
    const [firstMonth, setFirstMonth] = useControlledValue(initialMonth, // initialMonth is always computed from props.month if provided
    props.month ? initialMonth : undefined);
    // biome-ignore lint/correctness/useExhaustiveDependencies: change the initial month when the time zone changes.
    React.useEffect(()=>{
        const newInitialMonth = getInitialMonth(props, navStart, navEnd, dateLib);
        setFirstMonth(newInitialMonth);
    }, [
        props.timeZone
    ]);
    /** The months displayed in the calendar. */ const displayMonths = getDisplayMonths(firstMonth, navEnd, props, dateLib);
    /** The dates displayed in the calendar. */ const dates = getDates(displayMonths, props.endMonth ? endOfMonth(props.endMonth) : undefined, props, dateLib);
    /** The Months displayed in the calendar. */ const months = getMonths(displayMonths, dates, props, dateLib);
    /** The Weeks displayed in the calendar. */ const weeks = getWeeks(months);
    /** The Days displayed in the calendar. */ const days = getDays(months);
    const previousMonth = getPreviousMonth(firstMonth, navStart, props, dateLib);
    const nextMonth = getNextMonth(firstMonth, navEnd, props, dateLib);
    const { disableNavigation, onMonthChange } = props;
    const isDayInCalendar = (day)=>weeks.some((week)=>week.days.some((d)=>d.isEqualTo(day)));
    const goToMonth = (date)=>{
        if (disableNavigation) {
            return;
        }
        let newMonth = startOfMonth(date);
        // if month is before start, use the first month instead
        if (navStart && newMonth < startOfMonth(navStart)) {
            newMonth = startOfMonth(navStart);
        }
        // if month is after endMonth, use the last month instead
        if (navEnd && newMonth > startOfMonth(navEnd)) {
            newMonth = startOfMonth(navEnd);
        }
        setFirstMonth(newMonth);
        onMonthChange?.(newMonth);
    };
    const goToDay = (day)=>{
        // is this check necessary?
        if (isDayInCalendar(day)) {
            return;
        }
        goToMonth(day.date);
    };
    const calendar = {
        months,
        weeks,
        days,
        navStart,
        navEnd,
        previousMonth,
        nextMonth,
        goToMonth,
        goToDay
    };
    return calendar;
}

var FocusTargetPriority;
(function(FocusTargetPriority) {
    FocusTargetPriority[FocusTargetPriority["Today"] = 0] = "Today";
    FocusTargetPriority[FocusTargetPriority["Selected"] = 1] = "Selected";
    FocusTargetPriority[FocusTargetPriority["LastFocused"] = 2] = "LastFocused";
    FocusTargetPriority[FocusTargetPriority["FocusedModifier"] = 3] = "FocusedModifier";
})(FocusTargetPriority || (FocusTargetPriority = {}));
/**
 * Determines if a day is focusable based on its modifiers.
 *
 * A day is considered focusable if it is not disabled, hidden, or outside the
 * displayed month.
 *
 * @param modifiers The modifiers applied to the day.
 * @returns `true` if the day is focusable, otherwise `false`.
 */ function isFocusableDay(modifiers) {
    return !modifiers[DayFlag.disabled] && !modifiers[DayFlag.hidden] && !modifiers[DayFlag.outside];
}
/**
 * Calculates the focus target day based on priority.
 *
 * This function determines the day that should receive focus in the calendar,
 * prioritizing days with specific modifiers (e.g., "focused", "today") or
 * selection states.
 *
 * @param days The array of `CalendarDay` objects to evaluate.
 * @param getModifiers A function to retrieve the modifiers for a given day.
 * @param isSelected A function to determine if a day is selected.
 * @param lastFocused The last focused day, if any.
 * @returns The `CalendarDay` that should receive focus, or `undefined` if no
 *   focusable day is found.
 */ function calculateFocusTarget(days, getModifiers, isSelected, lastFocused) {
    let focusTarget;
    let foundFocusTargetPriority = -1;
    for (const day of days){
        const modifiers = getModifiers(day);
        if (isFocusableDay(modifiers)) {
            if (modifiers[DayFlag.focused] && foundFocusTargetPriority < FocusTargetPriority.FocusedModifier) {
                focusTarget = day;
                foundFocusTargetPriority = FocusTargetPriority.FocusedModifier;
            } else if (lastFocused?.isEqualTo(day) && foundFocusTargetPriority < FocusTargetPriority.LastFocused) {
                focusTarget = day;
                foundFocusTargetPriority = FocusTargetPriority.LastFocused;
            } else if (isSelected(day.date) && foundFocusTargetPriority < FocusTargetPriority.Selected) {
                focusTarget = day;
                foundFocusTargetPriority = FocusTargetPriority.Selected;
            } else if (modifiers[DayFlag.today] && foundFocusTargetPriority < FocusTargetPriority.Today) {
                focusTarget = day;
                foundFocusTargetPriority = FocusTargetPriority.Today;
            }
        }
    }
    if (!focusTarget) {
        // Return the first day that is focusable
        focusTarget = days.find((day)=>isFocusableDay(getModifiers(day)));
    }
    return focusTarget;
}

/**
 * Calculates the next date that should be focused in the calendar.
 *
 * This function determines the next focusable date based on the movement
 * direction, constraints, and calendar configuration.
 *
 * @param moveBy The unit of movement (e.g., "day", "week").
 * @param moveDir The direction of movement ("before" or "after").
 * @param refDate The reference date from which to calculate the next focusable
 *   date.
 * @param navStart The earliest date the user can navigate to.
 * @param navEnd The latest date the user can navigate to.
 * @param props The DayPicker props, including calendar configuration options.
 * @param dateLib The date library to use for date manipulation.
 * @returns The next focusable date.
 */ function getFocusableDate(moveBy, moveDir, refDate, navStart, navEnd, props, dateLib) {
    const { ISOWeek, broadcastCalendar } = props;
    const { addDays, addMonths, addWeeks, addYears, endOfBroadcastWeek, endOfISOWeek, endOfWeek, max, min, startOfBroadcastWeek, startOfISOWeek, startOfWeek } = dateLib;
    const moveFns = {
        day: addDays,
        week: addWeeks,
        month: addMonths,
        year: addYears,
        startOfWeek: (date)=>broadcastCalendar ? startOfBroadcastWeek(date, dateLib) : ISOWeek ? startOfISOWeek(date) : startOfWeek(date),
        endOfWeek: (date)=>broadcastCalendar ? endOfBroadcastWeek(date) : ISOWeek ? endOfISOWeek(date) : endOfWeek(date)
    };
    let focusableDate = moveFns[moveBy](refDate, moveDir === "after" ? 1 : -1);
    if (moveDir === "before" && navStart) {
        focusableDate = max([
            navStart,
            focusableDate
        ]);
    } else if (moveDir === "after" && navEnd) {
        focusableDate = min([
            navEnd,
            focusableDate
        ]);
    }
    return focusableDate;
}

/**
 * Determines the next focusable day in the calendar.
 *
 * This function recursively calculates the next focusable day based on the
 * movement direction and modifiers applied to the days.
 *
 * @param moveBy The unit of movement (e.g., "day", "week").
 * @param moveDir The direction of movement ("before" or "after").
 * @param refDay The currently focused day.
 * @param calendarStartMonth The earliest month the user can navigate to.
 * @param calendarEndMonth The latest month the user can navigate to.
 * @param props The DayPicker props, including modifiers and configuration
 *   options.
 * @param dateLib The date library to use for date manipulation.
 * @param attempt The current recursion attempt (used to limit recursion depth).
 * @returns The next focusable day, or `undefined` if no focusable day is found.
 */ function getNextFocus(moveBy, moveDir, refDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt = 0) {
    if (attempt > 365) {
        // Limit the recursion to 365 attempts
        return undefined;
    }
    const focusableDate = getFocusableDate(moveBy, moveDir, refDay.date, calendarStartMonth, calendarEndMonth, props, dateLib);
    const isDisabled = Boolean(props.disabled && dateMatchModifiers(focusableDate, props.disabled, dateLib));
    const isHidden = Boolean(props.hidden && dateMatchModifiers(focusableDate, props.hidden, dateLib));
    const targetMonth = focusableDate;
    const focusDay = new CalendarDay(focusableDate, targetMonth, dateLib);
    if (!isDisabled && !isHidden) {
        return focusDay;
    }
    // Recursively attempt to find the next focusable date
    return getNextFocus(moveBy, moveDir, focusDay, calendarStartMonth, calendarEndMonth, props, dateLib, attempt + 1);
}

/**
 * Manages focus behavior for the DayPicker component, including setting,
 * moving, and blurring focus on calendar days.
 *
 * @template T - The type of DayPicker props.
 * @param props - The DayPicker props.
 * @param calendar - The calendar object containing the displayed days and
 *   months.
 * @param getModifiers - A function to retrieve modifiers for a given day.
 * @param isSelected - A function to check if a date is selected.
 * @param dateLib - The date utility library instance.
 * @returns An object containing focus-related methods and the currently focused
 *   day.
 */ function useFocus(props, calendar, getModifiers, isSelected, dateLib) {
    const { autoFocus } = props;
    const [lastFocused, setLastFocused] = React.useState();
    const focusTarget = calculateFocusTarget(calendar.days, getModifiers, isSelected || (()=>false), lastFocused);
    const [focusedDay, setFocused] = React.useState(autoFocus ? focusTarget : undefined);
    const blur = ()=>{
        setLastFocused(focusedDay);
        setFocused(undefined);
    };
    const moveFocus = (moveBy, moveDir)=>{
        if (!focusedDay) return;
        const nextFocus = getNextFocus(moveBy, moveDir, focusedDay, calendar.navStart, calendar.navEnd, props, dateLib);
        if (!nextFocus) return;
        calendar.goToDay(nextFocus);
        setFocused(nextFocus);
    };
    const isFocusTarget = (day)=>{
        return Boolean(focusTarget?.isEqualTo(day));
    };
    const useFocus = {
        isFocusTarget,
        setFocused,
        focused: focusedDay,
        blur,
        moveFocus
    };
    return useFocus;
}

/**
 * Hook to manage multiple-date selection in the DayPicker component.
 *
 * @template T - The type of DayPicker props.
 * @param props - The DayPicker props.
 * @param dateLib - The date utility library instance.
 * @returns An object containing the selected dates, a function to select dates,
 *   and a function to check if a date is selected.
 */ function useMulti(props, dateLib) {
    const { selected: initiallySelected, required, onSelect } = props;
    const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
    const selected = !onSelect ? internallySelected : initiallySelected;
    const { isSameDay } = dateLib;
    const isSelected = (date)=>{
        return selected?.some((d)=>isSameDay(d, date)) ?? false;
    };
    const { min, max } = props;
    const select = (triggerDate, modifiers, e)=>{
        let newDates = [
            ...selected ?? []
        ];
        if (isSelected(triggerDate)) {
            if (selected?.length === min) {
                // Min value reached, do nothing
                return;
            }
            if (required && selected?.length === 1) {
                // Required value already selected do nothing
                return;
            }
            newDates = selected?.filter((d)=>!isSameDay(d, triggerDate));
        } else {
            if (selected?.length === max) {
                // Max value reached, reset the selection to date
                newDates = [
                    triggerDate
                ];
            } else {
                // Add the date to the selection
                newDates = [
                    ...newDates,
                    triggerDate
                ];
            }
        }
        if (!onSelect) {
            setSelected(newDates);
        }
        onSelect?.(newDates, triggerDate, modifiers, e);
        return newDates;
    };
    return {
        selected,
        select,
        isSelected
    };
}

/**
 * Adds a date to an existing range, considering constraints like minimum and
 * maximum range size.
 *
 * @param date - The date to add to the range.
 * @param initialRange - The initial range to which the date will be added.
 * @param min - The minimum number of days in the range.
 * @param max - The maximum number of days in the range.
 * @param required - Whether the range must always include at least one date.
 * @param dateLib - The date utility library instance.
 * @returns The updated date range, or `undefined` if the range is cleared.
 * @group Utilities
 */ function addToRange(date, initialRange, min = 0, max = 0, required = false, dateLib = defaultDateLib) {
    const { from, to } = initialRange || {};
    const { isSameDay, isAfter, isBefore } = dateLib;
    let range;
    if (!from && !to) {
        // the range is empty, add the date
        range = {
            from: date,
            to: min > 0 ? undefined : date
        };
    } else if (from && !to) {
        // adding date to an incomplete range
        if (isSameDay(from, date)) {
            // adding a date equal to the start of the range
            if (min === 0) {
                range = {
                    from,
                    to: date
                };
            } else if (required) {
                range = {
                    from,
                    to: undefined
                };
            } else {
                range = undefined;
            }
        } else if (isBefore(date, from)) {
            // adding a date before the start of the range
            range = {
                from: date,
                to: from
            };
        } else {
            // adding a date after the start of the range
            range = {
                from,
                to: date
            };
        }
    } else if (from && to) {
        // adding date to a complete range
        if (isSameDay(from, date) && isSameDay(to, date)) {
            // adding a date that is equal to both start and end of the range
            if (required) {
                range = {
                    from,
                    to
                };
            } else {
                range = undefined;
            }
        } else if (isSameDay(from, date)) {
            // adding a date equal to the the start of the range
            range = {
                from,
                to: min > 0 ? undefined : date
            };
        } else if (isSameDay(to, date)) {
            // adding a dare equal to the end of the range
            range = {
                from: date,
                to: min > 0 ? undefined : date
            };
        } else if (isBefore(date, from)) {
            // adding a date before the start of the range
            range = {
                from: date,
                to: to
            };
        } else if (isAfter(date, from)) {
            // adding a date after the start of the range
            range = {
                from,
                to: date
            };
        } else if (isAfter(date, to)) {
            // adding a date after the end of the range
            range = {
                from,
                to: date
            };
        } else {
            throw new Error("Invalid range");
        }
    }
    // check for min / max
    if (range?.from && range?.to) {
        const diff = dateLib.differenceInCalendarDays(range.to, range.from);
        if (max > 0 && diff > max) {
            range = {
                from: date,
                to: undefined
            };
        } else if (min > 1 && diff < min) {
            range = {
                from: date,
                to: undefined
            };
        }
    }
    return range;
}

/**
 * Checks if a date range contains one or more specified days of the week.
 *
 * @since 9.2.2
 * @param range - The date range to check.
 * @param dayOfWeek - The day(s) of the week to check for (`0-6`, where `0` is
 *   Sunday).
 * @param dateLib - The date utility library instance.
 * @returns `true` if the range contains the specified day(s) of the week,
 *   otherwise `false`.
 * @group Utilities
 */ function rangeContainsDayOfWeek(range, dayOfWeek, dateLib = defaultDateLib) {
    const dayOfWeekArr = !Array.isArray(dayOfWeek) ? [
        dayOfWeek
    ] : dayOfWeek;
    let date = range.from;
    const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
    // iterate at maximum one week or the total days if the range is shorter than one week
    const totalDaysLimit = Math.min(totalDays, 6);
    for(let i = 0; i <= totalDaysLimit; i++){
        if (dayOfWeekArr.includes(date.getDay())) {
            return true;
        }
        date = dateLib.addDays(date, 1);
    }
    return false;
}

/**
 * Determines if two date ranges overlap.
 *
 * @since 9.2.2
 * @param rangeLeft - The first date range.
 * @param rangeRight - The second date range.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the ranges overlap, otherwise `false`.
 * @group Utilities
 */ function rangeOverlaps(rangeLeft, rangeRight, dateLib = defaultDateLib) {
    return rangeIncludesDate(rangeLeft, rangeRight.from, false, dateLib) || rangeIncludesDate(rangeLeft, rangeRight.to, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.from, false, dateLib) || rangeIncludesDate(rangeRight, rangeLeft.to, false, dateLib);
}

/**
 * Checks if a date range contains dates that match the given modifiers.
 *
 * @since 9.2.2
 * @param range - The date range to check.
 * @param modifiers - The modifiers to match against.
 * @param dateLib - The date utility library instance.
 * @returns `true` if the range contains matching dates, otherwise `false`.
 * @group Utilities
 */ function rangeContainsModifiers(range, modifiers, dateLib = defaultDateLib) {
    const matchers = Array.isArray(modifiers) ? modifiers : [
        modifiers
    ];
    // Defer function matchers evaluation as they are the least performant.
    const nonFunctionMatchers = matchers.filter((matcher)=>typeof matcher !== "function");
    const nonFunctionMatchersResult = nonFunctionMatchers.some((matcher)=>{
        if (typeof matcher === "boolean") return matcher;
        if (dateLib.isDate(matcher)) {
            return rangeIncludesDate(range, matcher, false, dateLib);
        }
        if (isDatesArray(matcher, dateLib)) {
            return matcher.some((date)=>rangeIncludesDate(range, date, false, dateLib));
        }
        if (isDateRange(matcher)) {
            if (matcher.from && matcher.to) {
                return rangeOverlaps(range, {
                    from: matcher.from,
                    to: matcher.to
                }, dateLib);
            }
            return false;
        }
        if (isDayOfWeekType(matcher)) {
            return rangeContainsDayOfWeek(range, matcher.dayOfWeek, dateLib);
        }
        if (isDateInterval(matcher)) {
            const isClosedInterval = dateLib.isAfter(matcher.before, matcher.after);
            if (isClosedInterval) {
                return rangeOverlaps(range, {
                    from: dateLib.addDays(matcher.after, 1),
                    to: dateLib.addDays(matcher.before, -1)
                }, dateLib);
            }
            return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
        }
        if (isDateAfterType(matcher) || isDateBeforeType(matcher)) {
            return dateMatchModifiers(range.from, matcher, dateLib) || dateMatchModifiers(range.to, matcher, dateLib);
        }
        return false;
    });
    if (nonFunctionMatchersResult) {
        return true;
    }
    const functionMatchers = matchers.filter((matcher)=>typeof matcher === "function");
    if (functionMatchers.length) {
        let date = range.from;
        const totalDays = dateLib.differenceInCalendarDays(range.to, range.from);
        for(let i = 0; i <= totalDays; i++){
            if (functionMatchers.some((matcher)=>matcher(date))) {
                return true;
            }
            date = dateLib.addDays(date, 1);
        }
    }
    return false;
}

/**
 * Hook to manage range selection in the DayPicker component.
 *
 * @template T - The type of DayPicker props.
 * @param props - The DayPicker props.
 * @param dateLib - The date utility library instance.
 * @returns An object containing the selected range, a function to select a
 *   range, and a function to check if a date is within the range.
 */ function useRange(props, dateLib) {
    const { disabled, excludeDisabled, selected: initiallySelected, required, onSelect } = props;
    const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
    const selected = !onSelect ? internallySelected : initiallySelected;
    const isSelected = (date)=>selected && rangeIncludesDate(selected, date, false, dateLib);
    const select = (triggerDate, modifiers, e)=>{
        const { min, max } = props;
        const newRange = triggerDate ? addToRange(triggerDate, selected, min, max, required, dateLib) : undefined;
        if (excludeDisabled && disabled && newRange?.from && newRange.to) {
            if (rangeContainsModifiers({
                from: newRange.from,
                to: newRange.to
            }, disabled, dateLib)) {
                // if a disabled days is found, the range is reset
                newRange.from = triggerDate;
                newRange.to = undefined;
            }
        }
        if (!onSelect) {
            setSelected(newRange);
        }
        onSelect?.(newRange, triggerDate, modifiers, e);
        return newRange;
    };
    return {
        selected,
        select,
        isSelected
    };
}

/**
 * Hook to manage single-date selection in the DayPicker component.
 *
 * @template T - The type of DayPicker props.
 * @param props - The DayPicker props.
 * @param dateLib - The date utility library instance.
 * @returns An object containing the selected date, a function to select a date,
 *   and a function to check if a date is selected.
 */ function useSingle(props, dateLib) {
    const { selected: initiallySelected, required, onSelect } = props;
    const [internallySelected, setSelected] = useControlledValue(initiallySelected, onSelect ? initiallySelected : undefined);
    const selected = !onSelect ? internallySelected : initiallySelected;
    const { isSameDay } = dateLib;
    const isSelected = (compareDate)=>{
        return selected ? isSameDay(selected, compareDate) : false;
    };
    const select = (triggerDate, modifiers, e)=>{
        let newDate = triggerDate;
        if (!required && selected && selected && isSameDay(triggerDate, selected)) {
            // If the date is the same, clear the selection.
            newDate = undefined;
        }
        if (!onSelect) {
            setSelected(newDate);
        }
        if (required) {
            onSelect?.(newDate, triggerDate, modifiers, e);
        } else {
            onSelect?.(newDate, triggerDate, modifiers, e);
        }
        return newDate;
    };
    return {
        selected,
        select,
        isSelected
    };
}

/**
 * Determines the appropriate selection hook to use based on the selection mode
 * and returns the corresponding selection object.
 *
 * @template T - The type of DayPicker props.
 * @param props - The DayPicker props.
 * @param dateLib - The date utility library instance.
 * @returns The selection object for the specified mode, or `undefined` if no
 *   mode is set.
 */ function useSelection(props, dateLib) {
    const single = useSingle(props, dateLib);
    const multi = useMulti(props, dateLib);
    const range = useRange(props, dateLib);
    switch(props.mode){
        case "single":
            return single;
        case "multiple":
            return multi;
        case "range":
            return range;
        default:
            return undefined;
    }
}

/**
 * Renders the DayPicker calendar component.
 *
 * @param initialProps - The props for the DayPicker component.
 * @returns The rendered DayPicker component.
 * @group DayPicker
 * @see https://daypicker.dev
 */ function DayPicker(initialProps) {
    let props = initialProps;
    if (props.timeZone) {
        props = {
            ...initialProps
        };
        if (props.today) {
            props.today = new TZDate(props.today, props.timeZone);
        }
        if (props.month) {
            props.month = new TZDate(props.month, props.timeZone);
        }
        if (props.defaultMonth) {
            props.defaultMonth = new TZDate(props.defaultMonth, props.timeZone);
        }
        if (props.startMonth) {
            props.startMonth = new TZDate(props.startMonth, props.timeZone);
        }
        if (props.endMonth) {
            props.endMonth = new TZDate(props.endMonth, props.timeZone);
        }
        if (props.mode === "single" && props.selected) {
            props.selected = new TZDate(props.selected, props.timeZone);
        } else if (props.mode === "multiple" && props.selected) {
            props.selected = props.selected?.map((date)=>new TZDate(date, props.timeZone));
        } else if (props.mode === "range" && props.selected) {
            props.selected = {
                from: props.selected.from ? new TZDate(props.selected.from, props.timeZone) : undefined,
                to: props.selected.to ? new TZDate(props.selected.to, props.timeZone) : undefined
            };
        }
    }
    const { components, formatters, labels, dateLib, locale, classNames } = React.useMemo(()=>{
        const locale = {
            ...enUS,
            ...props.locale
        };
        const dateLib = new DateLib({
            locale,
            weekStartsOn: props.broadcastCalendar ? 1 : props.weekStartsOn,
            firstWeekContainsDate: props.firstWeekContainsDate,
            useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
            useAdditionalDayOfYearTokens: props.useAdditionalDayOfYearTokens,
            timeZone: props.timeZone,
            numerals: props.numerals
        }, props.dateLib);
        return {
            dateLib,
            components: getComponents(props.components),
            formatters: getFormatters(props.formatters),
            labels: {
                ...defaultLabels,
                ...props.labels
            },
            locale,
            classNames: {
                ...getDefaultClassNames(),
                ...props.classNames
            }
        };
    }, [
        props.locale,
        props.broadcastCalendar,
        props.weekStartsOn,
        props.firstWeekContainsDate,
        props.useAdditionalWeekYearTokens,
        props.useAdditionalDayOfYearTokens,
        props.timeZone,
        props.numerals,
        props.dateLib,
        props.components,
        props.formatters,
        props.labels,
        props.classNames
    ]);
    const { captionLayout, mode, navLayout, numberOfMonths = 1, onDayBlur, onDayClick, onDayFocus, onDayKeyDown, onDayMouseEnter, onDayMouseLeave, onNextClick, onPrevClick, showWeekNumber, styles } = props;
    const { formatCaption, formatDay, formatMonthDropdown, formatWeekNumber, formatWeekNumberHeader, formatWeekdayName, formatYearDropdown } = formatters;
    const calendar = useCalendar(props, dateLib);
    const { days, months, navStart, navEnd, previousMonth, nextMonth, goToMonth } = calendar;
    const getModifiers = createGetModifiers(days, props, navStart, navEnd, dateLib);
    const { isSelected, select, selected: selectedValue } = useSelection(props, dateLib) ?? {};
    const { blur, focused, isFocusTarget, moveFocus, setFocused } = useFocus(props, calendar, getModifiers, isSelected ?? (()=>false), dateLib);
    const { labelDayButton, labelGridcell, labelGrid, labelMonthDropdown, labelNav, labelPrevious, labelNext, labelWeekday, labelWeekNumber, labelWeekNumberHeader, labelYearDropdown } = labels;
    const weekdays = React.useMemo(()=>getWeekdays(dateLib, props.ISOWeek), [
        dateLib,
        props.ISOWeek
    ]);
    const isInteractive = mode !== undefined || onDayClick !== undefined;
    const handlePreviousClick = React.useCallback(()=>{
        if (!previousMonth) return;
        goToMonth(previousMonth);
        onPrevClick?.(previousMonth);
    }, [
        previousMonth,
        goToMonth,
        onPrevClick
    ]);
    const handleNextClick = React.useCallback(()=>{
        if (!nextMonth) return;
        goToMonth(nextMonth);
        onNextClick?.(nextMonth);
    }, [
        goToMonth,
        nextMonth,
        onNextClick
    ]);
    const handleDayClick = React.useCallback((day, m)=>(e)=>{
            e.preventDefault();
            e.stopPropagation();
            setFocused(day);
            select?.(day.date, m, e);
            onDayClick?.(day.date, m, e);
        }, [
        select,
        onDayClick,
        setFocused
    ]);
    const handleDayFocus = React.useCallback((day, m)=>(e)=>{
            setFocused(day);
            onDayFocus?.(day.date, m, e);
        }, [
        onDayFocus,
        setFocused
    ]);
    const handleDayBlur = React.useCallback((day, m)=>(e)=>{
            blur();
            onDayBlur?.(day.date, m, e);
        }, [
        blur,
        onDayBlur
    ]);
    const handleDayKeyDown = React.useCallback((day, modifiers)=>(e)=>{
            const keyMap = {
                ArrowLeft: [
                    e.shiftKey ? "month" : "day",
                    props.dir === "rtl" ? "after" : "before"
                ],
                ArrowRight: [
                    e.shiftKey ? "month" : "day",
                    props.dir === "rtl" ? "before" : "after"
                ],
                ArrowDown: [
                    e.shiftKey ? "year" : "week",
                    "after"
                ],
                ArrowUp: [
                    e.shiftKey ? "year" : "week",
                    "before"
                ],
                PageUp: [
                    e.shiftKey ? "year" : "month",
                    "before"
                ],
                PageDown: [
                    e.shiftKey ? "year" : "month",
                    "after"
                ],
                Home: [
                    "startOfWeek",
                    "before"
                ],
                End: [
                    "endOfWeek",
                    "after"
                ]
            };
            if (keyMap[e.key]) {
                e.preventDefault();
                e.stopPropagation();
                const [moveBy, moveDir] = keyMap[e.key];
                moveFocus(moveBy, moveDir);
            }
            onDayKeyDown?.(day.date, modifiers, e);
        }, [
        moveFocus,
        onDayKeyDown,
        props.dir
    ]);
    const handleDayMouseEnter = React.useCallback((day, modifiers)=>(e)=>{
            onDayMouseEnter?.(day.date, modifiers, e);
        }, [
        onDayMouseEnter
    ]);
    const handleDayMouseLeave = React.useCallback((day, modifiers)=>(e)=>{
            onDayMouseLeave?.(day.date, modifiers, e);
        }, [
        onDayMouseLeave
    ]);
    const handleMonthChange = React.useCallback((date)=>(e)=>{
            const selectedMonth = Number(e.target.value);
            const month = dateLib.setMonth(dateLib.startOfMonth(date), selectedMonth);
            goToMonth(month);
        }, [
        dateLib,
        goToMonth
    ]);
    const handleYearChange = React.useCallback((date)=>(e)=>{
            const selectedYear = Number(e.target.value);
            const month = dateLib.setYear(dateLib.startOfMonth(date), selectedYear);
            goToMonth(month);
        }, [
        dateLib,
        goToMonth
    ]);
    const { className, style } = React.useMemo(()=>({
            className: [
                classNames[UI.Root],
                props.className
            ].filter(Boolean).join(" "),
            style: {
                ...styles?.[UI.Root],
                ...props.style
            }
        }), [
        classNames,
        props.className,
        props.style,
        styles
    ]);
    const dataAttributes = getDataAttributes(props);
    const rootElRef = React.useRef(null);
    useAnimation(rootElRef, Boolean(props.animate), {
        classNames,
        months,
        focused,
        dateLib
    });
    const contextValue = {
        dayPickerProps: props,
        selected: selectedValue,
        select: select,
        isSelected,
        months,
        nextMonth,
        previousMonth,
        goToMonth,
        getModifiers,
        components,
        classNames,
        styles,
        labels,
        formatters
    };
    return React.createElement(dayPickerContext.Provider, {
        value: contextValue
    }, React.createElement(components.Root, {
        rootRef: props.animate ? rootElRef : undefined,
        className: className,
        style: style,
        dir: props.dir,
        id: props.id,
        lang: props.lang,
        nonce: props.nonce,
        title: props.title,
        role: props.role,
        "aria-label": props["aria-label"],
        ...dataAttributes
    }, React.createElement(components.Months, {
        className: classNames[UI.Months],
        style: styles?.[UI.Months]
    }, !props.hideNavigation && !navLayout && React.createElement(components.Nav, {
        "data-animated-nav": props.animate ? "true" : undefined,
        className: classNames[UI.Nav],
        style: styles?.[UI.Nav],
        "aria-label": labelNav(),
        onPreviousClick: handlePreviousClick,
        onNextClick: handleNextClick,
        previousMonth: previousMonth,
        nextMonth: nextMonth
    }), months.map((calendarMonth, displayIndex)=>{
        return React.createElement(components.Month, {
            "data-animated-month": props.animate ? "true" : undefined,
            className: classNames[UI.Month],
            style: styles?.[UI.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: displayIndex,
            displayIndex: displayIndex,
            calendarMonth: calendarMonth
        }, navLayout === "around" && !props.hideNavigation && displayIndex === 0 && React.createElement(components.PreviousMonthButton, {
            type: "button",
            className: classNames[UI.PreviousMonthButton],
            tabIndex: previousMonth ? undefined : -1,
            "aria-disabled": previousMonth ? undefined : true,
            "aria-label": labelPrevious(previousMonth),
            onClick: handlePreviousClick,
            "data-animated-button": props.animate ? "true" : undefined
        }, React.createElement(components.Chevron, {
            disabled: previousMonth ? undefined : true,
            className: classNames[UI.Chevron],
            orientation: props.dir === "rtl" ? "right" : "left"
        })), React.createElement(components.MonthCaption, {
            "data-animated-caption": props.animate ? "true" : undefined,
            className: classNames[UI.MonthCaption],
            style: styles?.[UI.MonthCaption],
            calendarMonth: calendarMonth,
            displayIndex: displayIndex
        }, captionLayout?.startsWith("dropdown") ? React.createElement(components.DropdownNav, {
            className: classNames[UI.Dropdowns],
            style: styles?.[UI.Dropdowns]
        }, captionLayout === "dropdown" || captionLayout === "dropdown-months" ? React.createElement(components.MonthsDropdown, {
            className: classNames[UI.MonthsDropdown],
            "aria-label": labelMonthDropdown(),
            classNames: classNames,
            components: components,
            disabled: Boolean(props.disableNavigation),
            onChange: handleMonthChange(calendarMonth.date),
            options: getMonthOptions(calendarMonth.date, navStart, navEnd, formatters, dateLib),
            style: styles?.[UI.Dropdown],
            value: dateLib.getMonth(calendarMonth.date)
        }) : React.createElement("span", null, formatMonthDropdown(calendarMonth.date, dateLib)), captionLayout === "dropdown" || captionLayout === "dropdown-years" ? React.createElement(components.YearsDropdown, {
            className: classNames[UI.YearsDropdown],
            "aria-label": labelYearDropdown(dateLib.options),
            classNames: classNames,
            components: components,
            disabled: Boolean(props.disableNavigation),
            onChange: handleYearChange(calendarMonth.date),
            options: getYearOptions(navStart, navEnd, formatters, dateLib, Boolean(props.reverseYears)),
            style: styles?.[UI.Dropdown],
            value: dateLib.getYear(calendarMonth.date)
        }) : React.createElement("span", null, formatYearDropdown(calendarMonth.date, dateLib)), React.createElement("span", {
            role: "status",
            "aria-live": "polite",
            style: {
                border: 0,
                clip: "rect(0 0 0 0)",
                height: "1px",
                margin: "-1px",
                overflow: "hidden",
                padding: 0,
                position: "absolute",
                width: "1px",
                whiteSpace: "nowrap",
                wordWrap: "normal"
            }
        }, formatCaption(calendarMonth.date, dateLib.options, dateLib))) : // biome-ignore lint/a11y/useSemanticElements: breaking change
        React.createElement(components.CaptionLabel, {
            className: classNames[UI.CaptionLabel],
            role: "status",
            "aria-live": "polite"
        }, formatCaption(calendarMonth.date, dateLib.options, dateLib))), navLayout === "around" && !props.hideNavigation && displayIndex === numberOfMonths - 1 && React.createElement(components.NextMonthButton, {
            type: "button",
            className: classNames[UI.NextMonthButton],
            tabIndex: nextMonth ? undefined : -1,
            "aria-disabled": nextMonth ? undefined : true,
            "aria-label": labelNext(nextMonth),
            onClick: handleNextClick,
            "data-animated-button": props.animate ? "true" : undefined
        }, React.createElement(components.Chevron, {
            disabled: nextMonth ? undefined : true,
            className: classNames[UI.Chevron],
            orientation: props.dir === "rtl" ? "left" : "right"
        })), displayIndex === numberOfMonths - 1 && navLayout === "after" && !props.hideNavigation && React.createElement(components.Nav, {
            "data-animated-nav": props.animate ? "true" : undefined,
            className: classNames[UI.Nav],
            style: styles?.[UI.Nav],
            "aria-label": labelNav(),
            onPreviousClick: handlePreviousClick,
            onNextClick: handleNextClick,
            previousMonth: previousMonth,
            nextMonth: nextMonth
        }), React.createElement(components.MonthGrid, {
            role: "grid",
            "aria-multiselectable": mode === "multiple" || mode === "range",
            "aria-label": labelGrid(calendarMonth.date, dateLib.options, dateLib) || undefined,
            className: classNames[UI.MonthGrid],
            style: styles?.[UI.MonthGrid]
        }, !props.hideWeekdays && React.createElement(components.Weekdays, {
            "data-animated-weekdays": props.animate ? "true" : undefined,
            className: classNames[UI.Weekdays],
            style: styles?.[UI.Weekdays]
        }, showWeekNumber && React.createElement(components.WeekNumberHeader, {
            "aria-label": labelWeekNumberHeader(dateLib.options),
            className: classNames[UI.WeekNumberHeader],
            style: styles?.[UI.WeekNumberHeader],
            scope: "col"
        }, formatWeekNumberHeader()), weekdays.map((weekday)=>React.createElement(components.Weekday, {
                "aria-label": labelWeekday(weekday, dateLib.options, dateLib),
                className: classNames[UI.Weekday],
                key: String(weekday),
                style: styles?.[UI.Weekday],
                scope: "col"
            }, formatWeekdayName(weekday, dateLib.options, dateLib)))), React.createElement(components.Weeks, {
            "data-animated-weeks": props.animate ? "true" : undefined,
            className: classNames[UI.Weeks],
            style: styles?.[UI.Weeks]
        }, calendarMonth.weeks.map((week)=>{
            return React.createElement(components.Week, {
                className: classNames[UI.Week],
                key: week.weekNumber,
                style: styles?.[UI.Week],
                week: week
            }, showWeekNumber && // biome-ignore lint/a11y/useSemanticElements: react component
            React.createElement(components.WeekNumber, {
                week: week,
                style: styles?.[UI.WeekNumber],
                "aria-label": labelWeekNumber(week.weekNumber, {
                    locale
                }),
                className: classNames[UI.WeekNumber],
                scope: "row",
                role: "rowheader"
            }, formatWeekNumber(week.weekNumber, dateLib)), week.days.map((day)=>{
                const { date } = day;
                const modifiers = getModifiers(day);
                modifiers[DayFlag.focused] = !modifiers.hidden && Boolean(focused?.isEqualTo(day));
                modifiers[SelectionState.selected] = isSelected?.(date) || modifiers.selected;
                if (isDateRange(selectedValue)) {
                    // add range modifiers
                    const { from, to } = selectedValue;
                    modifiers[SelectionState.range_start] = Boolean(from && to && dateLib.isSameDay(date, from));
                    modifiers[SelectionState.range_end] = Boolean(from && to && dateLib.isSameDay(date, to));
                    modifiers[SelectionState.range_middle] = rangeIncludesDate(selectedValue, date, true, dateLib);
                }
                const style = getStyleForModifiers(modifiers, styles, props.modifiersStyles);
                const className = getClassNamesForModifiers(modifiers, classNames, props.modifiersClassNames);
                const ariaLabel = !isInteractive && !modifiers.hidden ? labelGridcell(date, modifiers, dateLib.options, dateLib) : undefined;
                return(// biome-ignore lint/a11y/useSemanticElements: react component
                React.createElement(components.Day, {
                    key: `${dateLib.format(date, "yyyy-MM-dd")}_${dateLib.format(day.displayMonth, "yyyy-MM")}`,
                    day: day,
                    modifiers: modifiers,
                    className: className.join(" "),
                    style: style,
                    role: "gridcell",
                    "aria-selected": modifiers.selected || undefined,
                    "aria-label": ariaLabel,
                    "data-day": dateLib.format(date, "yyyy-MM-dd"),
                    "data-month": day.outside ? dateLib.format(date, "yyyy-MM") : undefined,
                    "data-selected": modifiers.selected || undefined,
                    "data-disabled": modifiers.disabled || undefined,
                    "data-hidden": modifiers.hidden || undefined,
                    "data-outside": day.outside || undefined,
                    "data-focused": modifiers.focused || undefined,
                    "data-today": modifiers.today || undefined
                }, !modifiers.hidden && isInteractive ? React.createElement(components.DayButton, {
                    className: classNames[UI.DayButton],
                    style: styles?.[UI.DayButton],
                    type: "button",
                    day: day,
                    modifiers: modifiers,
                    disabled: modifiers.disabled || undefined,
                    tabIndex: isFocusTarget(day) ? 0 : -1,
                    "aria-label": labelDayButton(date, modifiers, dateLib.options, dateLib),
                    onClick: handleDayClick(day, modifiers),
                    onBlur: handleDayBlur(day, modifiers),
                    onFocus: handleDayFocus(day, modifiers),
                    onKeyDown: handleDayKeyDown(day, modifiers),
                    onMouseEnter: handleDayMouseEnter(day, modifiers),
                    onMouseLeave: handleDayMouseLeave(day, modifiers)
                }, formatDay(date, dateLib.options, dateLib)) : !modifiers.hidden && formatDay(day.date, dateLib.options, dateLib)));
            }));
        }))));
    })), props.footer && // biome-ignore lint/a11y/useSemanticElements: react component
    React.createElement(components.Footer, {
        className: classNames[UI.Footer],
        style: styles?.[UI.Footer],
        role: "status",
        "aria-live": "polite"
    }, props.footer)));
}

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
    return /*#__PURE__*/ React__namespace.createElement(DayPicker, {
        showOutsideDays: showOutsideDays,
        className: cn("p-3 schengen-calendar", className),
        classNames: {
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(buttonVariants({
                variant: "outline",
                size: "icon"
            }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 mobile-touch-target"),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] sm:w-9",
            row: "flex w-full mt-2",
            cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-middle)]:rounded-none", "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"),
            day: cn(buttonVariants({
                variant: "ghost",
                size: "icon"
            }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100 sm:h-9 sm:w-9 mobile-calendar-day"),
            day_range_start: "day-range-start",
            day_range_end: "day-range-end",
            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground schengen-selected-date",
            day_today: "bg-accent text-accent-foreground font-semibold",
            day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
            ...classNames
        },
        components: {
            IconLeft: ({ ...props })=>/*#__PURE__*/ React__namespace.createElement(ChevronLeft, {
                    className: "h-4 w-4"
                }),
            IconRight: ({ ...props })=>/*#__PURE__*/ React__namespace.createElement(ChevronRight, {
                    className: "h-4 w-4"
                })
        },
        ...props
    });
}
Calendar.displayName = "Calendar";

const Card = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("div", {
        ref: ref,
        className: cn("rounded-xl border bg-card text-card-foreground shadow schengen-shadow", className),
        ...props
    }));
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("div", {
        ref: ref,
        className: cn("flex flex-col space-y-1.5 p-6", className),
        ...props
    }));
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("h3", {
        ref: ref,
        className: cn("font-semibold leading-none tracking-tight", className),
        ...props
    }));
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("p", {
        ref: ref,
        className: cn("text-sm text-muted-foreground", className),
        ...props
    }));
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("div", {
        ref: ref,
        className: cn("p-6 pt-0", className),
        ...props
    }));
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ React__namespace.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement("div", {
        ref: ref,
        className: cn("flex items-center p-6 pt-0", className),
        ...props
    }));
CardFooter.displayName = "CardFooter";

const Input = /*#__PURE__*/ React__namespace.forwardRef(({ className, type, leftIcon, rightIcon, error = false, helperText, ...props }, ref)=>{
    const inputId = React__namespace.useId();
    const helperTextId = `${inputId}-helper`;
    return /*#__PURE__*/ React__namespace.createElement("div", {
        className: "w-full"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "relative"
    }, leftIcon && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    }, leftIcon), /*#__PURE__*/ React__namespace.createElement("input", {
        type: type,
        className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors", "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground", "placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", leftIcon && "pl-10", rightIcon && "pr-10", error && "border-red-500 focus-visible:ring-red-500/50", // Mobile optimizations
        "min-h-[44px] md:min-h-[36px]", className),
        ref: ref,
        "aria-describedby": helperText ? helperTextId : undefined,
        "aria-invalid": error,
        ...props
    }), rightIcon && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    }, rightIcon)), helperText && /*#__PURE__*/ React__namespace.createElement("p", {
        id: helperTextId,
        className: cn("mt-1 text-xs", error ? "text-red-500" : "text-gray-500")
    }, helperText));
});
Input.displayName = "Input";

// src/primitive.tsx
var NODES = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul"
];
var Primitive = NODES.reduce((primitive, node)=>{
    const Slot = createSlot(`Primitive.${node}`);
    const Node = React__namespace.forwardRef((props, forwardedRef)=>{
        const { asChild, ...primitiveProps } = props;
        const Comp = asChild ? Slot : node;
        if (typeof window !== "undefined") {
            window[Symbol.for("radix-ui")] = true;
        }
        return /* @__PURE__ */ jsxRuntime.jsx(Comp, {
            ...primitiveProps,
            ref: forwardedRef
        });
    });
    Node.displayName = `Primitive.${node}`;
    return {
        ...primitive,
        [node]: Node
    };
}, {});

var NAME = "Label";
var Label$1 = React__namespace.forwardRef((props, forwardedRef)=>{
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.label, {
        ...props,
        ref: forwardedRef,
        onMouseDown: (event)=>{
            const target = event.target;
            if (target.closest("button, input, select, textarea")) return;
            props.onMouseDown?.(event);
            if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
        }
    });
});
Label$1.displayName = NAME;
var Root = Label$1;

const labelVariants = classVarianceAuthority.cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", {
    variants: {
        variant: {
            default: "",
            required: "after:content-['*'] after:ml-0.5 after:text-red-500",
            optional: "after:content-['(optional)'] after:ml-1 after:text-gray-400 after:font-normal after:text-xs"
        },
        size: {
            default: "text-sm",
            sm: "text-xs",
            lg: "text-base"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Label = /*#__PURE__*/ React__namespace.forwardRef(({ className, variant, size, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement(Root, {
        ref: ref,
        className: cn(labelVariants({
            variant,
            size
        }), className),
        ...props
    }));
Label.displayName = Root.displayName;

const badgeVariants = classVarianceAuthority.cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground",
            success: "border-transparent bg-green-500 text-white shadow hover:bg-green-500/80",
            warning: "border-transparent bg-amber-500 text-white shadow hover:bg-amber-500/80",
            info: "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ React__namespace.createElement("div", {
        className: cn(badgeVariants({
            variant
        }), className),
        ...props
    });
}

function Header({ onLoginClick, onSignupClick, className = "" }) {
    return /*#__PURE__*/ React.createElement("header", {
        className: `w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "container mx-auto px-4 sm:px-6 lg:px-8"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex h-16 items-center justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
    }, /*#__PURE__*/ React.createElement(MapPin, {
        className: "h-5 w-5 text-primary-foreground"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-lg font-bold text-foreground leading-none"
    }, "Schengen Calculator"), /*#__PURE__*/ React.createElement("span", {
        className: "text-xs text-muted-foreground leading-none"
    }, "90/180 Day Rule Checker"))), /*#__PURE__*/ React.createElement("nav", {
        className: "hidden md:flex items-center space-x-6"
    }, /*#__PURE__*/ React.createElement("a", {
        href: "#calculator",
        className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    }, "Calculator"), /*#__PURE__*/ React.createElement("a", {
        href: "#about",
        className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    }, "About 90/180 Rule"), /*#__PURE__*/ React.createElement("a", {
        href: "#help",
        className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
    }, "Help")), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement(Button$1, {
        variant: "ghost",
        size: "sm",
        onClick: onLoginClick,
        className: "hidden sm:inline-flex"
    }, /*#__PURE__*/ React.createElement(User, {
        className: "h-4 w-4 mr-2"
    }), "Log In"), /*#__PURE__*/ React.createElement(Button$1, {
        variant: "default",
        size: "sm",
        onClick: onSignupClick,
        className: "schengen-brand-gradient"
    }, /*#__PURE__*/ React.createElement(UserPlus, {
        className: "h-4 w-4 mr-2"
    }), "Sign Up"), /*#__PURE__*/ React.createElement(Button$1, {
        variant: "ghost",
        size: "sm",
        className: "md:hidden",
        "aria-label": "Open menu"
    }, /*#__PURE__*/ React.createElement("svg", {
        className: "h-6 w-6",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M4 6h16M4 12h16M4 18h16"
    })))))));
}

function Select({ options, value, placeholder = "Select an option...", onValueChange, disabled = false, className = "", searchable = false }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const [dropdownPosition, setDropdownPosition] = React.useState({
        top: 0,
        left: 0,
        width: 0
    });
    const selectRef = React.useRef(null);
    const searchInputRef = React.useRef(null);
    // Filter options based on search query
    const filteredOptions = searchable ? options.filter((option)=>option.label.toLowerCase().includes(searchQuery.toLowerCase())) : options;
    // Find selected option
    const selectedOption = options.find((option)=>option.value === value);
    // Calculate dropdown position for portal rendering with enhanced accuracy
    const calculateDropdownPosition = ()=>{
        if (!selectRef.current) return;
        const rect = selectRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        // Use viewport-relative positioning for better accuracy
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = 240 // max-h-60 = 15rem = 240px
        ;
        // Determine if dropdown should open upwards
        const shouldOpenUp = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
        // Calculate position relative to viewport (fixed positioning)
        const top = shouldOpenUp ? Math.max(10, rect.top - dropdownHeight - 4) // 4px gap
         : Math.min(viewportHeight - dropdownHeight - 10, rect.bottom + 4) // 4px gap
        ;
        // Ensure dropdown doesn't overflow horizontally
        let left = rect.left;
        const rightEdge = left + rect.width;
        if (rightEdge > viewportWidth) {
            left = Math.max(10, viewportWidth - rect.width - 10); // 10px margin
        }
        setDropdownPosition({
            top: top,
            left: Math.max(10, left),
            width: rect.width
        });
    };
    // Close dropdown when clicking outside
    React.useEffect(()=>{
        function handleClickOutside(event) {
            const target = event.target;
            // Check if click is outside both the select trigger and the dropdown
            if (selectRef.current && !selectRef.current.contains(target)) {
                // Also check if the click is not within the dropdown portal
                const dropdownElement = document.querySelector('[data-dropdown-portal]');
                if (!dropdownElement || !dropdownElement.contains(target)) {
                    setIsOpen(false);
                    setSearchQuery("");
                    setHighlightedIndex(-1);
                }
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return ()=>document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [
        isOpen
    ]);
    // Focus search input when dropdown opens
    React.useEffect(()=>{
        if (isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [
        isOpen,
        searchable
    ]);
    // Recalculate position on window resize
    React.useEffect(()=>{
        const handleResize = ()=>{
            if (isOpen) {
                calculateDropdownPosition();
            }
        };
        if (isOpen) {
            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleResize);
            return ()=>{
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleResize);
            };
        }
    }, [
        isOpen
    ]);
    // Handle keyboard navigation
    React.useEffect(()=>{
        function handleKeyDown(event) {
            if (!isOpen) return;
            switch(event.key){
                case 'Escape':
                    setIsOpen(false);
                    setSearchQuery("");
                    setHighlightedIndex(-1);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    setHighlightedIndex((prev)=>prev < filteredOptions.length - 1 ? prev + 1 : 0);
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    setHighlightedIndex((prev)=>prev > 0 ? prev - 1 : filteredOptions.length - 1);
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                        const selectedOption = filteredOptions[highlightedIndex];
                        if (!selectedOption.disabled) {
                            onValueChange?.(selectedOption.value);
                            setIsOpen(false);
                            setSearchQuery("");
                            setHighlightedIndex(-1);
                        }
                    }
                    break;
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            return ()=>document.removeEventListener('keydown', handleKeyDown);
        }
    }, [
        isOpen,
        highlightedIndex,
        filteredOptions,
        onValueChange
    ]);
    const handleToggle = ()=>{
        if (disabled) return;
        if (!isOpen) {
            setIsOpen(true);
            setSearchQuery("");
            setHighlightedIndex(-1);
            // Calculate position after state update
            requestAnimationFrame(()=>{
                calculateDropdownPosition();
            });
        } else {
            setIsOpen(false);
        }
    };
    const handleOptionClick = (option)=>{
        if (option.disabled) return;
        onValueChange?.(option.value);
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
    };
    return /*#__PURE__*/ React.createElement("div", {
        ref: selectRef,
        className: cn("relative", className)
    }, /*#__PURE__*/ React.createElement("button", {
        type: "button",
        onClick: handleToggle,
        disabled: disabled,
        className: cn("flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left", "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary", "disabled:cursor-not-allowed disabled:opacity-50", "hover:bg-accent hover:text-accent-foreground transition-colors", "mobile-touch-target"),
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox"
    }, /*#__PURE__*/ React.createElement("span", {
        className: cn(selectedOption ? "text-foreground" : "text-muted-foreground")
    }, selectedOption ? selectedOption.label : placeholder), /*#__PURE__*/ React.createElement(ChevronDown, {
        className: cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "transform rotate-180")
    })), isOpen && typeof window !== 'undefined' && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        "data-dropdown-portal": true,
        className: cn("fixed z-[9999] rounded-md border border-input bg-white shadow-2xl", "animate-in fade-in-0 zoom-in-95"),
        style: {
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${Math.max(dropdownPosition.width, 200)}px`,
            maxHeight: '240px'
        }
    }, searchable && /*#__PURE__*/ React.createElement("div", {
        className: "p-2"
    }, /*#__PURE__*/ React.createElement("input", {
        ref: searchInputRef,
        type: "text",
        placeholder: "Search countries...",
        value: searchQuery,
        onChange: (e)=>setSearchQuery(e.target.value),
        className: cn("w-full px-3 py-2 text-sm bg-background border border-input rounded-md", "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary")
    })), /*#__PURE__*/ React.createElement("div", {
        className: "max-h-48 overflow-y-auto",
        role: "listbox",
        style: {
            scrollbarWidth: 'thin'
        }
    }, filteredOptions.length === 0 ? /*#__PURE__*/ React.createElement("div", {
        className: "py-2 px-3 text-sm text-muted-foreground text-center"
    }, "No options found") : filteredOptions.map((option, index)=>/*#__PURE__*/ React.createElement("button", {
            key: option.value,
            type: "button",
            role: "option",
            "aria-selected": option.value === value,
            onClick: ()=>handleOptionClick(option),
            onMouseEnter: ()=>setHighlightedIndex(index),
            disabled: option.disabled,
            className: cn("flex w-full items-center justify-between px-3 py-3 text-sm text-left", "hover:bg-gray-100 hover:text-gray-900 cursor-pointer", "focus:bg-gray-100 focus:text-gray-900 focus:outline-none", "disabled:cursor-not-allowed disabled:opacity-50", "transition-colors duration-150", highlightedIndex === index && "bg-gray-100 text-gray-900", option.value === value && "bg-primary/10 text-primary font-medium", "min-h-[44px] flex items-center" // Ensure touch target size
            )
        }, /*#__PURE__*/ React.createElement("span", {
            className: "truncate"
        }, option.label), option.value === value && /*#__PURE__*/ React.createElement(Check, {
            className: "h-4 w-4 shrink-0"
        }))))), document.body));
}

function CircularProgress({ value, max = 90, size = 120, strokeWidth = 8, progressColor = "#10b981", backgroundColor = "#e5e7eb", textColor = "#374151", className, label, showPercentage = false, animationDuration = 1000 }) {
    // Calculate progress percentage
    const percentage = Math.min(Math.max(value / max * 100, 0), 100);
    // Calculate circle properties
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - percentage / 100 * circumference;
    // Display value
    const displayValue = showPercentage ? `${Math.round(percentage)}%` : Math.round(value).toString();
    return /*#__PURE__*/ React.createElement("div", {
        className: cn("relative inline-flex items-center justify-center", className)
    }, /*#__PURE__*/ React.createElement("svg", {
        width: size,
        height: size,
        className: "transform -rotate-90",
        "aria-labelledby": "circular-progress-title",
        role: "progressbar",
        "aria-valuenow": value,
        "aria-valuemin": 0,
        "aria-valuemax": max
    }, /*#__PURE__*/ React.createElement("title", {
        id: "circular-progress-title"
    }, label ? `${label}: ${displayValue}` : `Progress: ${displayValue}`), /*#__PURE__*/ React.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        stroke: backgroundColor,
        strokeWidth: strokeWidth,
        fill: "transparent",
        className: "opacity-30"
    }), /*#__PURE__*/ React.createElement("circle", {
        cx: size / 2,
        cy: size / 2,
        r: radius,
        stroke: progressColor,
        strokeWidth: strokeWidth,
        fill: "transparent",
        strokeDasharray: circumference,
        strokeDashoffset: offset,
        strokeLinecap: "round",
        className: "transition-all duration-1000 ease-out",
        style: {
            animationDuration: `${animationDuration}ms`
        }
    })), /*#__PURE__*/ React.createElement("div", {
        className: "absolute inset-0 flex flex-col items-center justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-3xl font-bold tabular-nums",
        style: {
            color: textColor
        }
    }, displayValue), label && /*#__PURE__*/ React.createElement("div", {
        className: "text-sm font-medium mt-1",
        style: {
            color: textColor
        }
    }, label)));
}

function CalendarModal({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates = [], minDate, maxDate, className }) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedRange, setSelectedRange] = React.useState(initialRange || {
        startDate: null,
        endDate: null
    });
    const [selectingEnd, setSelectingEnd] = React.useState(false);
    // Reset when modal opens/closes
    React.useEffect(()=>{
        if (isOpen) {
            setSelectedRange(initialRange || {
                startDate: null,
                endDate: null
            });
            setSelectingEnd(false);
        }
    }, [
        isOpen,
        initialRange
    ]);
    // Handle date click
    const handleDateClick = (date)=>{
        // Check if date is disabled
        if (isDateDisabled(date)) return;
        if (!selectedRange.startDate || selectingEnd) {
            // Select start date or reset and select new start date
            if (selectingEnd && selectedRange.startDate && date < selectedRange.startDate) {
                // If clicking before start date while selecting end, reset
                setSelectedRange({
                    startDate: date,
                    endDate: null
                });
                setSelectingEnd(false);
            } else if (!selectedRange.startDate) {
                // First selection - start date
                setSelectedRange({
                    startDate: date,
                    endDate: null
                });
                setSelectingEnd(true);
            } else {
                // Selecting end date
                setSelectedRange({
                    ...selectedRange,
                    endDate: date
                });
                setSelectingEnd(false);
            }
        } else {
            // Start date exists, this is end date selection
            if (date >= selectedRange.startDate) {
                setSelectedRange({
                    ...selectedRange,
                    endDate: date
                });
                setSelectingEnd(false);
            } else {
                // If clicked date is before start, make it the new start
                setSelectedRange({
                    startDate: date,
                    endDate: null
                });
                setSelectingEnd(true);
            }
        }
    };
    // Check if date is disabled
    const isDateDisabled = (date)=>{
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return disabledDates.some((disabledDate)=>dateFns.isSameDay(date, disabledDate));
    };
    // Check if date is in selected range
    const isDateInRange = (date)=>{
        if (!selectedRange.startDate) return false;
        if (!selectedRange.endDate) return dateFns.isSameDay(date, selectedRange.startDate);
        return date >= selectedRange.startDate && date <= selectedRange.endDate;
    };
    // Check if date is range boundary
    const isRangeStart = (date)=>{
        return selectedRange.startDate && dateFns.isSameDay(date, selectedRange.startDate);
    };
    const isRangeEnd = (date)=>{
        return selectedRange.endDate && dateFns.isSameDay(date, selectedRange.endDate);
    };
    // Handle clear
    const handleClear = ()=>{
        setSelectedRange({
            startDate: null,
            endDate: null
        });
        setSelectingEnd(false);
    };
    // Handle done
    const handleDone = ()=>{
        onDateRangeSelect(selectedRange);
        onClose();
    };
    // Navigation functions
    const goToPrevMonth = ()=>setCurrentMonth((prev)=>dateFns.subMonths(prev, 1));
    const goToNextMonth = ()=>setCurrentMonth((prev)=>dateFns.addMonths(prev, 1));
    // Render calendar month
    const renderMonth = (monthDate)=>{
        const monthStart = dateFns.startOfMonth(monthDate);
        const monthEnd = dateFns.endOfMonth(monthDate);
        // Get all days in the month
        const monthDays = dateFns.eachDayOfInterval({
            start: monthStart,
            end: monthEnd
        });
        // Add padding days from previous month
        const startPadding = monthStart.getDay();
        const paddingDays = [];
        for(let i = startPadding - 1; i >= 0; i--){
            const paddingDate = new Date(monthStart);
            paddingDate.setDate(paddingDate.getDate() - (i + 1));
            paddingDays.push(paddingDate);
        }
        // Add padding days from next month
        const endPadding = 6 - monthEnd.getDay();
        const endPaddingDays = [];
        for(let i = 1; i <= endPadding; i++){
            const paddingDate = new Date(monthEnd);
            paddingDate.setDate(paddingDate.getDate() + i);
            endPaddingDays.push(paddingDate);
        }
        const allDays = [
            ...paddingDays,
            ...monthDays,
            ...endPaddingDays
        ];
        return /*#__PURE__*/ React.createElement("div", {
            className: "flex-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-center font-semibold text-lg mb-4"
        }, dateFns.format(monthDate, 'MMMM yyyy')), /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-7 gap-1 mb-2"
        }, [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa'
        ].map((day)=>/*#__PURE__*/ React.createElement("div", {
                key: day,
                className: "text-center text-sm font-medium text-gray-500 p-2"
            }, day))), /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-7 gap-1"
        }, allDays.map((date, index)=>{
            const isCurrentMonth = dateFns.isSameMonth(date, monthDate);
            const disabled = isDateDisabled(date);
            const inRange = isDateInRange(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            const today = dateFns.isToday(date);
            return /*#__PURE__*/ React.createElement("button", {
                key: index,
                onClick: ()=>handleDateClick(date),
                disabled: disabled || !isCurrentMonth,
                className: cn("h-10 w-10 text-sm font-medium rounded-lg transition-colors", "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50", {
                    // Current month styling
                    "text-gray-900": isCurrentMonth && !disabled,
                    "text-gray-400": !isCurrentMonth,
                    // Disabled styling
                    "text-gray-300 cursor-not-allowed": disabled,
                    // Today styling
                    "bg-blue-100 text-blue-900": today && !inRange && isCurrentMonth,
                    // Range styling
                    "bg-primary/20": inRange && !rangeStart && !rangeEnd,
                    "bg-primary text-white": rangeStart || rangeEnd,
                    // Hover effects
                    "hover:bg-primary/10": !disabled && !inRange && isCurrentMonth,
                    "hover:bg-primary/90": (rangeStart || rangeEnd) && !disabled
                })
            }, date.getDate());
        })));
    };
    if (!isOpen) return null;
    return typeof window !== 'undefined' ? /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "absolute inset-0 bg-black/50",
        onClick: onClose,
        "aria-hidden": "true"
    }), /*#__PURE__*/ React.createElement("div", {
        className: cn("relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto", "animate-in fade-in-0 zoom-in-95 duration-200", className)
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-between p-6 border-b border-gray-200"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-4"
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: goToPrevMonth,
        className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
        "aria-label": "Previous month"
    }, /*#__PURE__*/ React.createElement(ChevronLeft, {
        className: "h-5 w-5"
    })), /*#__PURE__*/ React.createElement("h2", {
        className: "text-xl font-semibold"
    }, "Select dates"), /*#__PURE__*/ React.createElement("button", {
        onClick: goToNextMonth,
        className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
        "aria-label": "Next month"
    }, /*#__PURE__*/ React.createElement(ChevronRight, {
        className: "h-5 w-5"
    }))), /*#__PURE__*/ React.createElement("button", {
        onClick: onClose,
        className: "p-2 hover:bg-gray-100 rounded-lg transition-colors",
        "aria-label": "Close"
    }, /*#__PURE__*/ React.createElement(X, {
        className: "h-5 w-5"
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "p-6"
    }, selectedRange.startDate && !selectedRange.endDate && /*#__PURE__*/ React.createElement("div", {
        className: "mb-4 text-center"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-blue-600 font-medium"
    }, "Select your travel dates")), /*#__PURE__*/ React.createElement("div", {
        className: "flex gap-8 justify-center"
    }, renderMonth(currentMonth), renderMonth(dateFns.addMonths(currentMonth, 1)))), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-between p-6 border-t border-gray-200"
    }, /*#__PURE__*/ React.createElement(Button$1, {
        variant: "outline",
        onClick: handleClear,
        disabled: !selectedRange.startDate
    }, "Clear"), /*#__PURE__*/ React.createElement(Button$1, {
        onClick: handleDone,
        disabled: !selectedRange.startDate,
        className: "px-8"
    }, "Done")))), document.body) : null;
}

function AnimatedCounter({ value, duration = 800, className = "", suffix = "", prefix = "" }) {
    const [displayValue, setDisplayValue] = React.useState(0);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const frameRef = React.useRef();
    const startTimeRef = React.useRef();
    const startValueRef = React.useRef(0);
    React.useEffect(()=>{
        if (value === displayValue) return;
        setIsAnimating(true);
        startValueRef.current = displayValue;
        startTimeRef.current = Date.now();
        const animate = ()=>{
            const now = Date.now();
            const elapsed = now - (startTimeRef.current || now);
            const progress = Math.min(elapsed / duration, 1);
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValueRef.current + (value - startValueRef.current) * easeOut;
            setDisplayValue(Math.round(currentValue));
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
                setIsAnimating(false);
            }
        };
        frameRef.current = requestAnimationFrame(animate);
        return ()=>{
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [
        value,
        duration,
        displayValue
    ]);
    return /*#__PURE__*/ React.createElement("span", {
        className: `${className} ${isAnimating ? 'transition-transform duration-150 scale-105' : 'transition-transform duration-150 scale-100'}`
    }, prefix, displayValue, suffix);
}

function SchengenCalendar({ existingTrips = [], selected, selectedRange, mode = "single", onSelect, onRangeSelect, showOccupiedDates = true, showConflictWarnings = true, showAlternativeSuggestions = false, validatorConfig = {}, className, fromDate, toDate, disabled, customClassNames = {}, showValidationMessages = true, renderValidationMessage, ...props }) {
    // Stable validator configuration to prevent recreation
    const validatorConfigStringified = JSON.stringify(validatorConfig);
    const validator = React__namespace.useMemo(()=>new calculator.DateOverlapValidator(validatorConfig), [
        validatorConfigStringified
    ]);
    // Create stable reference for existingTrips to prevent infinite loops
    const stableTripsRef = React__namespace.useRef([]);
    const tripsStringified = JSON.stringify(existingTrips);
    React__namespace.useEffect(()=>{
        stableTripsRef.current = existingTrips;
    }, [
        tripsStringified
    ]);
    const occupiedDates = React__namespace.useMemo(()=>validator.getAllOccupiedDates(stableTripsRef.current), [
        validator,
        tripsStringified
    ]);
    const [validationResult, setValidationResult] = React__namespace.useState(null);
    const [alternativeDates, setAlternativeDates] = React__namespace.useState([]);
    // Validate current selection
    React__namespace.useEffect(()=>{
        const trips = stableTripsRef.current;
        if (mode === "single" && selected) {
            const range = {
                start: dateFns.startOfDay(selected),
                end: dateFns.endOfDay(selected)
            };
            const result = validator.validateDateRange(range, trips);
            setValidationResult(result);
            if (!result.isValid && showAlternativeSuggestions) {
                const alternatives = validator.suggestAlternativeDates(range, 1, trips);
                setAlternativeDates(alternatives);
            } else {
                setAlternativeDates([]);
            }
        } else if (mode === "range" && selectedRange) {
            const result = validator.validateDateRange(selectedRange, trips);
            setValidationResult(result);
            if (!result.isValid && showAlternativeSuggestions) {
                const duration = Math.ceil((selectedRange.end.getTime() - selectedRange.start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                const alternatives = validator.suggestAlternativeDates(selectedRange, duration, trips);
                setAlternativeDates(alternatives);
            } else {
                setAlternativeDates([]);
            }
        } else {
            setValidationResult(null);
            setAlternativeDates([]);
        }
    }, [
        selected,
        selectedRange,
        tripsStringified,
        validator,
        mode,
        showAlternativeSuggestions
    ]);
    // Check if a date is occupied
    const isDateOccupied = React__namespace.useCallback((date)=>{
        return occupiedDates.some((occupiedDate)=>dateFns.isSameDay(date, occupiedDate));
    }, [
        occupiedDates
    ]);
    // Check if a date has conflicts
    const isDateConflicted = React__namespace.useCallback((date)=>{
        if (!validationResult || validationResult.isValid) return false;
        if (mode === "single" && selected) {
            return dateFns.isSameDay(date, selected);
        } else if (mode === "range" && selectedRange) {
            return isDateInRange(date, selectedRange.start, selectedRange.end);
        }
        return false;
    }, [
        validationResult,
        mode,
        selected,
        selectedRange
    ]);
    // MANDATORY visual states per CLAUDE.md requirements
    const DATE_VISUAL_STATES = {
        occupied: 'bg-gray-200 text-gray-600 line-through cursor-not-allowed opacity-60 hover:bg-gray-200',
        available: 'bg-gray-50 hover:bg-primary/10 cursor-pointer transition-colors',
        selected: 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90',
        conflict: 'bg-red-100 text-red-700 cursor-not-allowed border border-red-200'};
    // Custom day class names with mandatory visual requirements
    const getDayClassNames = React__namespace.useCallback((date)=>{
        const classes = [];
        // CRITICAL: Occupied dates MUST be greyed out with strikethrough (CLAUDE.md requirement)
        if (showOccupiedDates && isDateOccupied(date)) {
            classes.push("schengen-occupied-date", DATE_VISUAL_STATES.occupied, customClassNames.occupied || "");
        } else {
            classes.push("schengen-available-date", DATE_VISUAL_STATES.available, customClassNames.available || "");
        }
        // Conflict styling with red indicators
        if (showConflictWarnings && isDateConflicted(date)) {
            classes.push("schengen-conflict-date", DATE_VISUAL_STATES.conflict, customClassNames.conflict || "");
        }
        // Selected date styling
        if (mode === "single" && selected && dateFns.isSameDay(date, selected) || mode === "range" && selectedRange && isDateInRange(date, selectedRange.start, selectedRange.end)) {
            classes.push("schengen-selected-date", DATE_VISUAL_STATES.selected, customClassNames.selected || "");
        }
        return classes.filter(Boolean).join(" ");
    }, [
        showOccupiedDates,
        showConflictWarnings,
        isDateOccupied,
        isDateConflicted,
        mode,
        selected,
        selectedRange,
        customClassNames
    ]);
    // Handle date selection with validation and helpful error messages
    const handleDateSelect = React__namespace.useCallback((date)=>{
        if (!date) {
            onSelect?.(undefined);
            return;
        }
        // CRITICAL: Occupied date interaction prevention with helpful error message (CLAUDE.md requirement)
        if (showOccupiedDates && isDateOccupied(date)) {
            const tripsOnDate = validator.getTripsOnDate(date, stableTripsRef.current);
            const tripNames = tripsOnDate.map((t)=>t.country).join(', ');
            // Show helpful error message as required by CLAUDE.md
            alert(`This date is occupied by existing trip${tripsOnDate.length > 1 ? 's' : ''}: ${tripNames}\n\nPlease select a different date or modify your existing trip.`);
            return;
        }
        onSelect?.(date);
    }, [
        onSelect,
        showOccupiedDates,
        isDateOccupied,
        validator,
        tripsStringified
    ]);
    // Handle range selection with validation and helpful error messages
    const handleRangeSelect = React__namespace.useCallback((range)=>{
        if (!range?.from) {
            onRangeSelect?.(undefined);
            return;
        }
        const dateRange = {
            start: range.from,
            end: range.to || range.from
        };
        // CRITICAL: Check for occupied dates in range with helpful error message (CLAUDE.md requirement)
        if (showOccupiedDates) {
            const occupiedInRange = occupiedDates.filter((occupiedDate)=>isDateInRange(occupiedDate, dateRange.start, dateRange.end));
            if (occupiedInRange.length > 0) {
                const conflictDates = occupiedInRange.map((date)=>dateFns.format(date, 'MMM d')).join(', ');
                alert(`Selected date range contains ${occupiedInRange.length} occupied date${occupiedInRange.length > 1 ? 's' : ''}: ${conflictDates}\n\nPlease select a different date range or modify your existing trips.`);
                return;
            }
        }
        onRangeSelect?.(dateRange);
    }, [
        onRangeSelect,
        showOccupiedDates,
        occupiedDates
    ]);
    // Disabled dates logic
    const isDateDisabled = React__namespace.useCallback((date)=>{
        // Check custom disabled logic
        if (typeof disabled === "function") {
            if (disabled(date)) return true;
        } else if (Array.isArray(disabled)) {
            if (disabled.some((disabledDate)=>dateFns.isSameDay(date, disabledDate))) return true;
        }
        // Check date range bounds
        if (fromDate && date < fromDate) return true;
        if (toDate && date > toDate) return true;
        // Optionally disable occupied dates
        if (showOccupiedDates && isDateOccupied(date)) {
            return true;
        }
        return false;
    }, [
        disabled,
        fromDate,
        toDate,
        showOccupiedDates,
        isDateOccupied
    ]);
    const calendarProps = React__namespace.useMemo(()=>{
        const baseProps = {
            className: cn("schengen-calendar", className),
            disabled: isDateDisabled,
            fromDate,
            toDate,
            modifiers: {
                occupied: (date)=>showOccupiedDates && isDateOccupied(date),
                conflicted: (date)=>showConflictWarnings && isDateConflicted(date)
            },
            modifiersClassNames: {
                occupied: DATE_VISUAL_STATES.occupied,
                conflicted: DATE_VISUAL_STATES.conflict
            },
            ...props
        };
        if (mode === "single") {
            return {
                ...baseProps,
                mode: "single",
                selected,
                onSelect: handleDateSelect
            };
        } else {
            return {
                ...baseProps,
                mode: "range",
                selected: selectedRange ? {
                    from: selectedRange.start,
                    to: selectedRange.end
                } : undefined,
                onSelect: handleRangeSelect
            };
        }
    }, [
        className,
        isDateDisabled,
        fromDate,
        toDate,
        getDayClassNames,
        mode,
        selected,
        selectedRange,
        handleDateSelect,
        handleRangeSelect,
        props
    ]);
    return /*#__PURE__*/ React__namespace.createElement("div", {
        className: "space-y-4"
    }, /*#__PURE__*/ React__namespace.createElement(Calendar, calendarProps), showValidationMessages && validationResult && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "space-y-2"
    }, renderValidationMessage ? renderValidationMessage(validationResult) : /*#__PURE__*/ React__namespace.createElement("div", {
        className: cn("flex items-start gap-2 p-3 rounded-md text-sm", validationResult.isValid ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800")
    }, validationResult.isValid ? /*#__PURE__*/ React__namespace.createElement(Info, {
        className: "h-4 w-4 mt-0.5 flex-shrink-0"
    }) : /*#__PURE__*/ React__namespace.createElement(CircleAlert, {
        className: "h-4 w-4 mt-0.5 flex-shrink-0"
    }), /*#__PURE__*/ React__namespace.createElement("span", null, validationResult.message)), !validationResult.isValid && validationResult.conflicts.length > 0 && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "text-sm text-gray-600 space-y-1"
    }, /*#__PURE__*/ React__namespace.createElement("p", {
        className: "font-medium"
    }, "Conflicting trips:"), validationResult.conflicts.map((conflict, index)=>/*#__PURE__*/ React__namespace.createElement("div", {
            key: index,
            className: "pl-4 border-l-2 border-red-200"
        }, /*#__PURE__*/ React__namespace.createElement("p", null, "🇪🇺 ", /*#__PURE__*/ React__namespace.createElement("strong", null, conflict.tripCountry), " - ", conflict.overlapDays, " day", conflict.overlapDays !== 1 ? 's' : '', " overlap"), /*#__PURE__*/ React__namespace.createElement("p", {
            className: "text-xs text-gray-500"
        }, dateFns.format(conflict.conflictStart, 'MMM d'), " - ", dateFns.format(conflict.conflictEnd, 'MMM d')))))), showAlternativeSuggestions && alternativeDates.length > 0 && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "space-y-2"
    }, /*#__PURE__*/ React__namespace.createElement("p", {
        className: "text-sm font-medium text-gray-700"
    }, "💡 Alternative dates available:"), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex flex-wrap gap-2"
    }, alternativeDates.map((alt, index)=>/*#__PURE__*/ React__namespace.createElement(Button$1, {
            key: index,
            variant: "outline",
            size: "sm",
            onClick: ()=>{
                if (mode === "single") {
                    onSelect?.(alt.start);
                } else {
                    onRangeSelect?.(alt);
                }
            },
            className: "text-xs"
        }, /*#__PURE__*/ React__namespace.createElement(Calendar$1, {
            className: "h-3 w-3 mr-1"
        }), dateFns.isSameDay(alt.start, alt.end) ? dateFns.format(alt.start, 'MMM d') : `${dateFns.format(alt.start, 'MMM d')} - ${dateFns.format(alt.end, 'MMM d')}`)))), showOccupiedDates && occupiedDates.length > 0 && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "text-xs text-gray-500 border-t pt-3"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center justify-center gap-6 mb-2"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "w-4 h-4 bg-gray-200 text-gray-600 rounded opacity-60 flex items-center justify-center relative"
    }, /*#__PURE__*/ React__namespace.createElement("span", {
        className: "text-xs"
    }, "X"), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "absolute inset-0 border-b border-gray-600 rotate-12 transform"
    })), /*#__PURE__*/ React__namespace.createElement("span", {
        className: "font-medium"
    }, "Occupied")), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "w-4 h-4 bg-gray-50 border border-gray-200 rounded flex items-center justify-center"
    }, /*#__PURE__*/ React__namespace.createElement(CircleCheckBig, {
        className: "w-2 h-2 text-gray-400"
    })), /*#__PURE__*/ React__namespace.createElement("span", {
        className: "font-medium"
    }, "Available")), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "w-4 h-4 bg-primary rounded flex items-center justify-center"
    }, /*#__PURE__*/ React__namespace.createElement(CircleCheckBig, {
        className: "w-2 h-2 text-white"
    })), /*#__PURE__*/ React__namespace.createElement("span", {
        className: "font-medium"
    }, "Selected"))), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/ React__namespace.createElement(Badge, {
        variant: "secondary",
        className: "text-xs"
    }, /*#__PURE__*/ React__namespace.createElement(MapPin, {
        className: "w-3 h-3 mr-1"
    }), occupiedDates.length, " day", occupiedDates.length !== 1 ? 's' : '', " occupied by existing trips")), /*#__PURE__*/ React__namespace.createElement("p", {
        className: "mt-2 text-center text-gray-400 italic"
    }, "💡 Occupied dates are greyed out and cannot be selected")));
}
SchengenCalendar.displayName = "SchengenCalendar";

// Simple country name to flag emoji mapping
const COUNTRY_FLAGS = {
    // Major Schengen countries
    'Austria': '🇦🇹',
    'Belgium': '🇧🇪',
    'Czech Republic': '🇨🇿',
    'Denmark': '🇩🇰',
    'Estonia': '🇪🇪',
    'Finland': '🇫🇮',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Greece': '🇬🇷',
    'Hungary': '🇭🇺',
    'Iceland': '🇮🇸',
    'Italy': '🇮🇹',
    'Latvia': '🇱🇻',
    'Liechtenstein': '🇱🇮',
    'Lithuania': '🇱🇹',
    'Luxembourg': '🇱🇺',
    'Malta': '🇲🇹',
    'Netherlands': '🇳🇱',
    'Norway': '🇳🇴',
    'Poland': '🇵🇱',
    'Portugal': '🇵🇹',
    'Slovakia': '🇸🇰',
    'Slovenia': '🇸🇮',
    'Spain': '🇪🇸',
    'Sweden': '🇸🇪',
    'Switzerland': '🇨🇭',
    // Common variations
    'The Netherlands': '🇳🇱',
    'Czech': '🇨🇿',
    'Czechia': '🇨🇿'
};
function TripCard({ trip, showEdit = false, showDelete = false, onEdit, onDelete, className, compact = false, showFlag = true, renderFlag }) {
    const flag = React__namespace.useMemo(()=>{
        if (renderFlag) {
            return renderFlag(trip.country);
        }
        if (showFlag) {
            return COUNTRY_FLAGS[trip.country] || '🇪🇺';
        }
        return null;
    }, [
        trip.country,
        showFlag,
        renderFlag
    ]);
    const duration = React__namespace.useMemo(()=>{
        return daysBetween(trip.startDate, trip.endDate) + 1;
    }, [
        trip.startDate,
        trip.endDate
    ]);
    const dateRange = React__namespace.useMemo(()=>{
        return formatDateRange(trip.startDate, trip.endDate);
    }, [
        trip.startDate,
        trip.endDate
    ]);
    return /*#__PURE__*/ React__namespace.createElement(Card, {
        className: cn("transition-all duration-200 hover:shadow-lg hover:shadow-primary/10", "border-l-4 border-l-primary", compact ? "p-3" : "", className)
    }, compact ? /*#__PURE__*/ React__namespace.createElement("div", {
        className: "space-y-2"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-start justify-between"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2 min-w-0"
    }, flag && /*#__PURE__*/ React__namespace.createElement("span", {
        className: "text-lg flex-shrink-0",
        role: "img",
        "aria-label": `${trip.country} flag`
    }, flag), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "min-w-0"
    }, /*#__PURE__*/ React__namespace.createElement("h3", {
        className: "font-semibold text-sm truncate"
    }, trip.country), /*#__PURE__*/ React__namespace.createElement("p", {
        className: "text-xs text-gray-500 flex items-center gap-1"
    }, /*#__PURE__*/ React__namespace.createElement(Calendar$1, {
        className: "h-3 w-3"
    }), dateRange))), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-1 flex-shrink-0"
    }, /*#__PURE__*/ React__namespace.createElement("span", {
        className: "bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
    }, duration, "d"), (showEdit || showDelete) && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex gap-1"
    }, showEdit && /*#__PURE__*/ React__namespace.createElement(Button$1, {
        variant: "ghost",
        size: "icon",
        className: "h-6 w-6",
        onClick: ()=>onEdit?.(trip),
        "aria-label": `Edit trip to ${trip.country}`
    }, /*#__PURE__*/ React__namespace.createElement(PenLine, {
        className: "h-3 w-3"
    })), showDelete && /*#__PURE__*/ React__namespace.createElement(Button$1, {
        variant: "ghost",
        size: "icon",
        className: "h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50",
        onClick: ()=>onDelete?.(trip),
        "aria-label": `Delete trip to ${trip.country}`
    }, /*#__PURE__*/ React__namespace.createElement(Trash2, {
        className: "h-3 w-3"
    })))))) : /*#__PURE__*/ React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/ React__namespace.createElement(CardHeader, {
        className: "pb-3"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-start justify-between"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-3"
    }, flag && /*#__PURE__*/ React__namespace.createElement("span", {
        className: "text-2xl",
        role: "img",
        "aria-label": `${trip.country} flag`
    }, flag), /*#__PURE__*/ React__namespace.createElement("div", null, /*#__PURE__*/ React__namespace.createElement("h3", {
        className: "font-semibold text-lg"
    }, trip.country), /*#__PURE__*/ React__namespace.createElement("p", {
        className: "text-sm text-gray-500 flex items-center gap-1"
    }, /*#__PURE__*/ React__namespace.createElement(MapPin, {
        className: "h-3 w-3"
    }), "Schengen Area"))), (showEdit || showDelete) && /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex gap-1"
    }, showEdit && /*#__PURE__*/ React__namespace.createElement(Button$1, {
        variant: "ghost",
        size: "sm",
        onClick: ()=>onEdit?.(trip),
        className: "h-8 w-8 p-0",
        "aria-label": `Edit trip to ${trip.country}`
    }, /*#__PURE__*/ React__namespace.createElement(PenLine, {
        className: "h-4 w-4"
    })), showDelete && /*#__PURE__*/ React__namespace.createElement(Button$1, {
        variant: "ghost",
        size: "sm",
        onClick: ()=>onDelete?.(trip),
        className: "h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50",
        "aria-label": `Delete trip to ${trip.country}`
    }, /*#__PURE__*/ React__namespace.createElement(Trash2, {
        className: "h-4 w-4"
    }))))), /*#__PURE__*/ React__namespace.createElement(CardContent, {
        className: "pt-0 space-y-3"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center justify-between text-sm"
    }, /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2 text-gray-600"
    }, /*#__PURE__*/ React__namespace.createElement(Calendar$1, {
        className: "h-4 w-4"
    }), /*#__PURE__*/ React__namespace.createElement("span", null, dateRange)), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React__namespace.createElement(Clock, {
        className: "h-4 w-4 text-gray-400"
    }), /*#__PURE__*/ React__namespace.createElement("span", {
        className: "bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
    }, duration, " day", duration !== 1 ? 's' : ''))), /*#__PURE__*/ React__namespace.createElement("div", {
        className: "text-xs text-gray-400 border-t pt-2"
    }, "Trip ID: ", trip.id))));
}
TripCard.displayName = "TripCard";

/**
 * Encapsulates the logic for issuing a request to the Stripe API.
 *
 * A custom HTTP client should should implement:
 * 1. A response class which extends HttpClientResponse and wraps around their
 *    own internal representation of a response.
 * 2. A client class which extends HttpClient and implements all methods,
 *    returning their own response class when making requests.
 */ class HttpClient {
    /** The client name used for diagnostics. */ getClientName() {
        throw new Error('getClientName not implemented.');
    }
    makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        throw new Error('makeRequest not implemented.');
    }
    /** Helper to make a consistent timeout error across implementations. */ static makeTimeoutError() {
        const timeoutErr = new TypeError(HttpClient.TIMEOUT_ERROR_CODE);
        timeoutErr.code = HttpClient.TIMEOUT_ERROR_CODE;
        return timeoutErr;
    }
}
// Public API accessible via Stripe.HttpClient
HttpClient.CONNECTION_CLOSED_ERROR_CODES = [
    'ECONNRESET',
    'EPIPE'
];
HttpClient.TIMEOUT_ERROR_CODE = 'ETIMEDOUT';
class HttpClientResponse {
    getStatusCode() {
        return this._statusCode;
    }
    getHeaders() {
        return this._headers;
    }
    getRawResponse() {
        throw new Error('getRawResponse not implemented.');
    }
    toStream(streamCompleteCallback) {
        throw new Error('toStream not implemented.');
    }
    toJSON() {
        throw new Error('toJSON not implemented.');
    }
    constructor(statusCode, headers){
        this._statusCode = statusCode;
        this._headers = headers;
    }
}

/**
 * HTTP client which uses a `fetch` function to issue requests.
 *
 * By default relies on the global `fetch` function, but an optional function
 * can be passed in. If passing in a function, it is expected to match the Web
 * Fetch API. As an example, this could be the function provided by the
 * node-fetch package (https://github.com/node-fetch/node-fetch).
 */ class FetchHttpClient extends HttpClient {
    static makeFetchWithRaceTimeout(fetchFn) {
        return (url, init, timeout)=>{
            let pendingTimeoutId;
            const timeoutPromise = new Promise((_, reject)=>{
                pendingTimeoutId = setTimeout(()=>{
                    pendingTimeoutId = null;
                    reject(HttpClient.makeTimeoutError());
                }, timeout);
            });
            const fetchPromise = fetchFn(url, init);
            return Promise.race([
                fetchPromise,
                timeoutPromise
            ]).finally(()=>{
                if (pendingTimeoutId) {
                    clearTimeout(pendingTimeoutId);
                }
            });
        };
    }
    static makeFetchWithAbortTimeout(fetchFn) {
        return async (url, init, timeout)=>{
            // Use AbortController because AbortSignal.timeout() was added later in Node v17.3.0, v16.14.0
            const abort = new AbortController();
            let timeoutId = setTimeout(()=>{
                timeoutId = null;
                abort.abort(HttpClient.makeTimeoutError());
            }, timeout);
            try {
                return await fetchFn(url, Object.assign(Object.assign({}, init), {
                    signal: abort.signal
                }));
            } catch (err) {
                // Some implementations, like node-fetch, do not respect the reason passed to AbortController.abort()
                // and instead it always throws an AbortError
                // We catch this case to normalise all timeout errors
                if (err.name === 'AbortError') {
                    throw HttpClient.makeTimeoutError();
                } else {
                    throw err;
                }
            } finally{
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        };
    }
    /** @override. */ getClientName() {
        return 'fetch';
    }
    async makeRequest(host, port, path, method, headers, requestData, protocol, timeout) {
        const isInsecureConnection = protocol === 'http';
        const url = new URL(path, `${isInsecureConnection ? 'http' : 'https'}://${host}`);
        url.port = port;
        // For methods which expect payloads, we should always pass a body value
        // even when it is empty. Without this, some JS runtimes (eg. Deno) will
        // inject a second Content-Length header. See https://github.com/stripe/stripe-node/issues/1519
        // for more details.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        const body = requestData || (methodHasPayload ? '' : undefined);
        const res = await this._fetchFn(url.toString(), {
            method,
            // @ts-ignore
            headers,
            // @ts-ignore
            body
        }, timeout);
        return new FetchHttpClientResponse(res);
    }
    constructor(fetchFn){
        super();
        // Default to global fetch if available
        if (!fetchFn) {
            if (!globalThis.fetch) {
                throw new Error('fetch() function not provided and is not defined in the global scope. ' + 'You must provide a fetch implementation.');
            }
            fetchFn = globalThis.fetch;
        }
        // Both timeout behaviors differs from Node:
        // - Fetch uses a single timeout for the entire length of the request.
        // - Node is more fine-grained and resets the timeout after each stage of the request.
        if (globalThis.AbortController) {
            // Utilise native AbortController if available
            // AbortController was added in Node v15.0.0, v14.17.0
            this._fetchFn = FetchHttpClient.makeFetchWithAbortTimeout(fetchFn);
        } else {
            // Fall back to racing against a timeout promise if not available in the runtime
            // This does not actually cancel the underlying fetch operation or resources
            this._fetchFn = FetchHttpClient.makeFetchWithRaceTimeout(fetchFn);
        }
    }
}
class FetchHttpClientResponse extends HttpClientResponse {
    getRawResponse() {
        return this._res;
    }
    toStream(streamCompleteCallback) {
        // Unfortunately `fetch` does not have event handlers for when the stream is
        // completely read. We therefore invoke the streamCompleteCallback right
        // away. This callback emits a response event with metadata and completes
        // metrics, so it's ok to do this without waiting for the stream to be
        // completely read.
        streamCompleteCallback();
        // Fetch's `body` property is expected to be a readable stream of the body.
        return this._res.body;
    }
    toJSON() {
        return this._res.json();
    }
    static _transformHeadersToObject(headers) {
        // Fetch uses a Headers instance so this must be converted to a barebones
        // JS object to meet the HttpClient interface.
        const headersObj = {};
        for (const entry of headers){
            if (!Array.isArray(entry) || entry.length != 2) {
                throw new Error('Response objects produced by the fetch function given to FetchHttpClient do not have an iterable headers map. Response#headers should be an iterable object.');
            }
            headersObj[entry[0]] = entry[1];
        }
        return headersObj;
    }
    constructor(res){
        super(res.status, FetchHttpClientResponse._transformHeadersToObject(res.headers));
        this._res = res;
    }
}

/**
 * Interface encapsulating the various crypto computations used by the library,
 * allowing pluggable underlying crypto implementations.
 */ class CryptoProvider {
    /**
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */ computeHMACSignature(payload, secret) {
        throw new Error('computeHMACSignature not implemented.');
    }
    /**
     * Asynchronous version of `computeHMACSignature`. Some implementations may
     * only allow support async signature computation.
     *
     * Computes a SHA-256 HMAC given a secret and a payload (encoded in UTF-8).
     * The output HMAC should be encoded in hexadecimal.
     *
     * Sample values for implementations:
     * - computeHMACSignature('', 'test_secret') => 'f7f9bd47fb987337b5796fdc1fdb9ba221d0d5396814bfcaf9521f43fd8927fd'
     * - computeHMACSignature('\ud83d\ude00', 'test_secret') => '837da296d05c4fe31f61d5d7ead035099d9585a5bcde87de952012a78f0b0c43
     */ computeHMACSignatureAsync(payload, secret) {
        throw new Error('computeHMACSignatureAsync not implemented.');
    }
    /**
     * Computes a SHA-256 hash of the data.
     */ computeSHA256Async(data) {
        throw new Error('computeSHA256 not implemented.');
    }
}
/**
 * If the crypto provider only supports asynchronous operations,
 * throw CryptoProviderOnlySupportsAsyncError instead of
 * a generic error so that the caller can choose to provide
 * a more helpful error message to direct the user to use
 * an asynchronous pathway.
 */ class CryptoProviderOnlySupportsAsyncError extends Error {
}

/**
 * `CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
 *
 * This only supports asynchronous operations.
 */ class SubtleCryptoProvider extends CryptoProvider {
    /** @override */ computeHMACSignature(payload, secret) {
        throw new CryptoProviderOnlySupportsAsyncError('SubtleCryptoProvider cannot be used in a synchronous context.');
    }
    /** @override */ async computeHMACSignatureAsync(payload, secret) {
        const encoder = new TextEncoder();
        const key = await this.subtleCrypto.importKey('raw', encoder.encode(secret), {
            name: 'HMAC',
            hash: {
                name: 'SHA-256'
            }
        }, false, [
            'sign'
        ]);
        const signatureBuffer = await this.subtleCrypto.sign('hmac', key, encoder.encode(payload));
        // crypto.subtle returns the signature in base64 format. This must be
        // encoded in hex to match the CryptoProvider contract. We map each byte in
        // the buffer to its corresponding hex octet and then combine into a string.
        const signatureBytes = new Uint8Array(signatureBuffer);
        const signatureHexCodes = new Array(signatureBytes.length);
        for(let i = 0; i < signatureBytes.length; i++){
            signatureHexCodes[i] = byteHexMapping[signatureBytes[i]];
        }
        return signatureHexCodes.join('');
    }
    /** @override */ async computeSHA256Async(data) {
        return new Uint8Array(await this.subtleCrypto.digest('SHA-256', data));
    }
    constructor(subtleCrypto){
        super();
        // If no subtle crypto is interface, default to the global namespace. This
        // is to allow custom interfaces (eg. using the Node webcrypto interface in
        // tests).
        this.subtleCrypto = subtleCrypto || crypto.subtle;
    }
}
// Cached mapping of byte to hex representation. We do this once to avoid re-
// computing every time we need to convert the result of a signature to hex.
const byteHexMapping = new Array(256);
for(let i = 0; i < byteHexMapping.length; i++){
    byteHexMapping[i] = i.toString(16).padStart(2, '0');
}

/**
 * Interface encapsulating various utility functions whose
 * implementations depend on the platform / JS runtime.
 */ class PlatformFunctions {
    /**
     * Gets uname with Node's built-in `exec` function, if available.
     */ getUname() {
        throw new Error('getUname not implemented.');
    }
    /**
     * Generates a v4 UUID. See https://stackoverflow.com/a/2117523
     */ uuid4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c)=>{
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }
    /**
     * Compares strings in constant time.
     */ secureCompare(a, b) {
        // return early here if buffer lengths are not equal
        if (a.length !== b.length) {
            return false;
        }
        const len = a.length;
        let result = 0;
        for(let i = 0; i < len; ++i){
            result |= a.charCodeAt(i) ^ b.charCodeAt(i);
        }
        return result === 0;
    }
    /**
     * Creates an event emitter.
     */ createEmitter() {
        throw new Error('createEmitter not implemented.');
    }
    /**
     * Checks if the request data is a stream. If so, read the entire stream
     * to a buffer and return the buffer.
     */ tryBufferData(data) {
        throw new Error('tryBufferData not implemented.');
    }
    /**
     * Creates an HTTP client which uses the Node `http` and `https` packages
     * to issue requests.
     */ createNodeHttpClient(agent) {
        throw new Error('createNodeHttpClient not implemented.');
    }
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */ createFetchHttpClient(fetchFn) {
        return new FetchHttpClient(fetchFn);
    }
    /**
     * Creates an HTTP client using runtime-specific APIs.
     */ createDefaultHttpClient() {
        throw new Error('createDefaultHttpClient not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the Node `crypto` package for its computations.
     */ createNodeCryptoProvider() {
        throw new Error('createNodeCryptoProvider not implemented.');
    }
    /**
     * Creates a CryptoProvider which uses the SubtleCrypto interface of the Web Crypto API.
     */ createSubtleCryptoProvider(subtleCrypto) {
        return new SubtleCryptoProvider(subtleCrypto);
    }
    createDefaultCryptoProvider() {
        throw new Error('createDefaultCryptoProvider not implemented.');
    }
    constructor(){
        this._fetchFn = null;
        this._agent = null;
    }
}

/**
 * @private
 * (For internal use in stripe-node.)
 * Wrapper around the Event Web API.
 */ class _StripeEvent extends Event {
    constructor(eventName, data){
        super(eventName);
        this.data = data;
    }
}
/** Minimal EventEmitter wrapper around EventTarget. */ class StripeEmitter {
    on(eventName, listener) {
        const listenerWrapper = (event)=>{
            listener(event.data);
        };
        this.listenerMapping.set(listener, listenerWrapper);
        return this.eventTarget.addEventListener(eventName, listenerWrapper);
    }
    removeListener(eventName, listener) {
        const listenerWrapper = this.listenerMapping.get(listener);
        this.listenerMapping.delete(listener);
        return this.eventTarget.removeEventListener(eventName, listenerWrapper);
    }
    once(eventName, listener) {
        const listenerWrapper = (event)=>{
            listener(event.data);
        };
        this.listenerMapping.set(listener, listenerWrapper);
        return this.eventTarget.addEventListener(eventName, listenerWrapper, {
            once: true
        });
    }
    emit(eventName, data) {
        return this.eventTarget.dispatchEvent(new _StripeEvent(eventName, data));
    }
    constructor(){
        this.eventTarget = new EventTarget();
        this.listenerMapping = new Map();
    }
}

/**
 * Specializes WebPlatformFunctions using APIs available in Web workers.
 */ class WebPlatformFunctions extends PlatformFunctions {
    /** @override */ getUname() {
        return Promise.resolve(null);
    }
    /** @override */ createEmitter() {
        return new StripeEmitter();
    }
    /** @override */ tryBufferData(data) {
        if (data.file.data instanceof ReadableStream) {
            throw new Error('Uploading a file as a stream is not supported in non-Node environments. Please open or upvote an issue at github.com/stripe/stripe-node if you use this, detailing your use-case.');
        }
        return Promise.resolve(data);
    }
    /** @override */ createNodeHttpClient() {
        throw new Error('Stripe: `createNodeHttpClient()` is not available in non-Node environments. Please use `createFetchHttpClient()` instead.');
    }
    /** @override */ createDefaultHttpClient() {
        return super.createFetchHttpClient();
    }
    /** @override */ createNodeCryptoProvider() {
        throw new Error('Stripe: `createNodeCryptoProvider()` is not available in non-Node environments. Please use `createSubtleCryptoProvider()` instead.');
    }
    /** @override */ createDefaultCryptoProvider() {
        return this.createSubtleCryptoProvider();
    }
}

/* eslint-disable camelcase */ /* eslint-disable no-warning-comments */ const generateV1Error = (rawStripeError)=>{
    switch(rawStripeError.type){
        case 'card_error':
            return new StripeCardError(rawStripeError);
        case 'invalid_request_error':
            return new StripeInvalidRequestError(rawStripeError);
        case 'api_error':
            return new StripeAPIError(rawStripeError);
        case 'authentication_error':
            return new StripeAuthenticationError(rawStripeError);
        case 'rate_limit_error':
            return new StripeRateLimitError(rawStripeError);
        case 'idempotency_error':
            return new StripeIdempotencyError(rawStripeError);
        case 'invalid_grant':
            return new StripeInvalidGrantError(rawStripeError);
        default:
            return new StripeUnknownError(rawStripeError);
    }
};
// eslint-disable-next-line complexity
const generateV2Error = (rawStripeError)=>{
    switch(rawStripeError.type){
        // switchCases: The beginning of the section generated from our OpenAPI spec
        case 'temporary_session_expired':
            return new TemporarySessionExpiredError(rawStripeError);
    }
    // Special handling for requests with missing required fields in V2 APIs.
    // invalid_field response in V2 APIs returns the field 'code' instead of 'type'.
    switch(rawStripeError.code){
        case 'invalid_fields':
            return new StripeInvalidRequestError(rawStripeError);
    }
    return generateV1Error(rawStripeError);
};
/**
 * StripeError is the base error from which all other more specific Stripe errors derive.
 * Specifically for errors returned from Stripe's REST API.
 */ class StripeError extends Error {
    constructor(raw = {}, type = null){
        super(raw.message);
        this.type = type || this.constructor.name;
        this.raw = raw;
        this.rawType = raw.type;
        this.code = raw.code;
        this.doc_url = raw.doc_url;
        this.param = raw.param;
        this.detail = raw.detail;
        this.headers = raw.headers;
        this.requestId = raw.requestId;
        this.statusCode = raw.statusCode;
        // @ts-ignore
        this.message = raw.message;
        this.userMessage = raw.user_message;
        this.charge = raw.charge;
        this.decline_code = raw.decline_code;
        this.payment_intent = raw.payment_intent;
        this.payment_method = raw.payment_method;
        this.payment_method_type = raw.payment_method_type;
        this.setup_intent = raw.setup_intent;
        this.source = raw.source;
    }
}
/**
 * Helper factory which takes raw stripe errors and outputs wrapping instances
 */ StripeError.generate = generateV1Error;
// Specific Stripe Error types:
/**
 * CardError is raised when a user enters a card that can't be charged for
 * some reason.
 */ class StripeCardError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeCardError');
    }
}
/**
 * InvalidRequestError is raised when a request is initiated with invalid
 * parameters.
 */ class StripeInvalidRequestError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeInvalidRequestError');
    }
}
/**
 * APIError is a generic error that may be raised in cases where none of the
 * other named errors cover the problem. It could also be raised in the case
 * that a new error has been introduced in the API, but this version of the
 * Node.JS SDK doesn't know how to handle it.
 */ class StripeAPIError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeAPIError');
    }
}
/**
 * AuthenticationError is raised when invalid credentials are used to connect
 * to Stripe's servers.
 */ class StripeAuthenticationError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeAuthenticationError');
    }
}
/**
 * PermissionError is raised in cases where access was attempted on a resource
 * that wasn't allowed.
 */ class StripePermissionError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripePermissionError');
    }
}
/**
 * RateLimitError is raised in cases where an account is putting too much load
 * on Stripe's API servers (usually by performing too many requests). Please
 * back off on request rate.
 */ class StripeRateLimitError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeRateLimitError');
    }
}
/**
 * StripeConnectionError is raised in the event that the SDK can't connect to
 * Stripe's servers. That can be for a variety of different reasons from a
 * downed network to a bad TLS certificate.
 */ class StripeConnectionError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeConnectionError');
    }
}
/**
 * SignatureVerificationError is raised when the signature verification for a
 * webhook fails
 */ class StripeSignatureVerificationError extends StripeError {
    constructor(header, payload, raw = {}){
        super(raw, 'StripeSignatureVerificationError');
        this.header = header;
        this.payload = payload;
    }
}
/**
 * IdempotencyError is raised in cases where an idempotency key was used
 * improperly.
 */ class StripeIdempotencyError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeIdempotencyError');
    }
}
/**
 * InvalidGrantError is raised when a specified code doesn't exist, is
 * expired, has been used, or doesn't belong to you; a refresh token doesn't
 * exist, or doesn't belong to you; or if an API key's mode (live or test)
 * doesn't match the mode of a code or refresh token.
 */ class StripeInvalidGrantError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeInvalidGrantError');
    }
}
/**
 * Any other error from Stripe not specifically captured above
 */ class StripeUnknownError extends StripeError {
    constructor(raw = {}){
        super(raw, 'StripeUnknownError');
    }
}
// classDefinitions: The beginning of the section generated from our OpenAPI spec
class TemporarySessionExpiredError extends StripeError {
    constructor(rawStripeError = {}){
        super(rawStripeError, 'TemporarySessionExpiredError');
    }
} // classDefinitions: The end of the section generated from our OpenAPI spec

var _Error = /*#__PURE__*/Object.freeze({
  __proto__: null,
  StripeAPIError: StripeAPIError,
  StripeAuthenticationError: StripeAuthenticationError,
  StripeCardError: StripeCardError,
  StripeConnectionError: StripeConnectionError,
  StripeError: StripeError,
  StripeIdempotencyError: StripeIdempotencyError,
  StripeInvalidGrantError: StripeInvalidGrantError,
  StripeInvalidRequestError: StripeInvalidRequestError,
  StripePermissionError: StripePermissionError,
  StripeRateLimitError: StripeRateLimitError,
  StripeSignatureVerificationError: StripeSignatureVerificationError,
  StripeUnknownError: StripeUnknownError,
  TemporarySessionExpiredError: TemporarySessionExpiredError,
  generateV1Error: generateV1Error,
  generateV2Error: generateV2Error
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
  var f = n.default;
	if (typeof f == "function") {
		var a = function a () {
			var isInstance = false;
      try {
        isInstance = this instanceof a;
      } catch {}
			if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
			}
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var type;
var hasRequiredType;
function requireType() {
    if (hasRequiredType) return type;
    hasRequiredType = 1;
    /** @type {import('./type')} */ type = TypeError;
    return type;
}

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _nodeResolve_empty
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(_nodeResolve_empty$1);

var objectInspect;
var hasRequiredObjectInspect;
function requireObjectInspect() {
    if (hasRequiredObjectInspect) return objectInspect;
    hasRequiredObjectInspect = 1;
    var hasMap = typeof Map === 'function' && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === 'function' && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === 'function' && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'object';
    // ie, `has-tostringtag/shams
    var toStringTag = typeof Symbol === 'function' && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? 'object' : 'symbol') ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype // eslint-disable-line no-proto
     ? function(O) {
        return O.__proto__; // eslint-disable-line no-proto
    } : null);
    function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1000 || $test.call(/e/, str)) {
            return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === 'number') {
            var int = num < 0 ? -$floor(-num) : $floor(num); // trunc(num)
            if (int !== num) {
                var intStr = String(int);
                var dec = $slice.call(str, intStr.length + 1);
                return $replace.call(intStr, sepRegex, '$&_') + '.' + $replace.call($replace.call(dec, /([0-9]{3})/g, '$&_'), /_$/, '');
            }
        }
        return $replace.call(str, sepRegex, '$&_');
    }
    var utilInspect = require$$0;
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
        __proto__: null,
        'double': '"',
        single: "'"
    };
    var quoteREs = {
        __proto__: null,
        'double': /(["\\])/g,
        single: /(['\\])/g
    };
    objectInspect = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, 'quoteStyle') && !has(quotes, opts.quoteStyle)) {
            throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
            throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
        if (typeof customInspect !== 'boolean' && customInspect !== 'symbol') {
            throw new TypeError('option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`');
        }
        if (has(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
            throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, 'numericSeparator') && typeof opts.numericSeparator !== 'boolean') {
            throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === 'undefined') {
            return 'undefined';
        }
        if (obj === null) {
            return 'null';
        }
        if (typeof obj === 'boolean') {
            return obj ? 'true' : 'false';
        }
        if (typeof obj === 'string') {
            return inspectString(obj, opts);
        }
        if (typeof obj === 'number') {
            if (obj === 0) {
                return Infinity / obj > 0 ? '0' : '-0';
            }
            var str = String(obj);
            return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === 'bigint') {
            var bigIntStr = String(obj) + 'n';
            return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
        if (typeof depth === 'undefined') {
            depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
            return isArray(obj) ? '[Array]' : '[Object]';
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === 'undefined') {
            seen = [];
        } else if (indexOf(seen, obj) >= 0) {
            return '[Circular]';
        }
        function inspect(value, from, noIndent) {
            if (from) {
                seen = $arrSlice.call(seen);
                seen.push(from);
            }
            if (noIndent) {
                var newOpts = {
                    depth: opts.depth
                };
                if (has(opts, 'quoteStyle')) {
                    newOpts.quoteStyle = opts.quoteStyle;
                }
                return inspect_(value, newOpts, depth + 1, seen);
            }
            return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === 'function' && !isRegExp(obj)) {
            var name = nameOf(obj);
            var keys = arrObjKeys(obj, inspect);
            return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']' + (keys.length > 0 ? ' { ' + $join.call(keys, ', ') + ' }' : '');
        }
        if (isSymbol(obj)) {
            var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, '$1') : symToString.call(obj);
            return typeof obj === 'object' && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
            var s = '<' + $toLowerCase.call(String(obj.nodeName));
            var attrs = obj.attributes || [];
            for(var i = 0; i < attrs.length; i++){
                s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
            }
            s += '>';
            if (obj.childNodes && obj.childNodes.length) {
                s += '...';
            }
            s += '</' + $toLowerCase.call(String(obj.nodeName)) + '>';
            return s;
        }
        if (isArray(obj)) {
            if (obj.length === 0) {
                return '[]';
            }
            var xs = arrObjKeys(obj, inspect);
            if (indent && !singleLineValues(xs)) {
                return '[' + indentedJoin(xs, indent) + ']';
            }
            return '[ ' + $join.call(xs, ', ') + ' ]';
        }
        if (isError(obj)) {
            var parts = arrObjKeys(obj, inspect);
            if (!('cause' in Error.prototype) && 'cause' in obj && !isEnumerable.call(obj, 'cause')) {
                return '{ [' + String(obj) + '] ' + $join.call($concat.call('[cause]: ' + inspect(obj.cause), parts), ', ') + ' }';
            }
            if (parts.length === 0) {
                return '[' + String(obj) + ']';
            }
            return '{ [' + String(obj) + '] ' + $join.call(parts, ', ') + ' }';
        }
        if (typeof obj === 'object' && customInspect) {
            if (inspectSymbol && typeof obj[inspectSymbol] === 'function' && utilInspect) {
                return utilInspect(obj, {
                    depth: maxDepth - depth
                });
            } else if (customInspect !== 'symbol' && typeof obj.inspect === 'function') {
                return obj.inspect();
            }
        }
        if (isMap(obj)) {
            var mapParts = [];
            if (mapForEach) {
                mapForEach.call(obj, function(value, key) {
                    mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
                });
            }
            return collectionOf('Map', mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
            var setParts = [];
            if (setForEach) {
                setForEach.call(obj, function(value) {
                    setParts.push(inspect(value, obj));
                });
            }
            return collectionOf('Set', setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
            return weakCollectionOf('WeakMap');
        }
        if (isWeakSet(obj)) {
            return weakCollectionOf('WeakSet');
        }
        if (isWeakRef(obj)) {
            return weakCollectionOf('WeakRef');
        }
        if (isNumber(obj)) {
            return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
            return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
            return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
            return markBoxed(inspect(String(obj)));
        }
        // note: in IE 8, sometimes `global !== window` but both are the prototypes of each other
        /* eslint-env browser */ if (typeof window !== 'undefined' && obj === window) {
            return '{ [object Window] }';
        }
        if (typeof globalThis !== 'undefined' && obj === globalThis || typeof commonjsGlobal !== 'undefined' && obj === commonjsGlobal) {
            return '{ [object globalThis] }';
        }
        if (!isDate(obj) && !isRegExp(obj)) {
            var ys = arrObjKeys(obj, inspect);
            var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
            var protoTag = obj instanceof Object ? '' : 'null prototype';
            var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? 'Object' : '';
            var constructorTag = isPlainObject || typeof obj.constructor !== 'function' ? '' : obj.constructor.name ? obj.constructor.name + ' ' : '';
            var tag = constructorTag + (stringTag || protoTag ? '[' + $join.call($concat.call([], stringTag || [], protoTag || []), ': ') + '] ' : '');
            if (ys.length === 0) {
                return tag + '{}';
            }
            if (indent) {
                return tag + '{' + indentedJoin(ys, indent) + '}';
            }
            return tag + '{ ' + $join.call(ys, ', ') + ' }';
        }
        return String(obj);
    };
    function wrapQuotes(s, defaultStyle, opts) {
        var style = opts.quoteStyle || defaultStyle;
        var quoteChar = quotes[style];
        return quoteChar + s + quoteChar;
    }
    function quote(s) {
        return $replace.call(String(s), /"/g, '&quot;');
    }
    function canTrustToString(obj) {
        return !toStringTag || !(typeof obj === 'object' && (toStringTag in obj || typeof obj[toStringTag] !== 'undefined'));
    }
    function isArray(obj) {
        return toStr(obj) === '[object Array]' && canTrustToString(obj);
    }
    function isDate(obj) {
        return toStr(obj) === '[object Date]' && canTrustToString(obj);
    }
    function isRegExp(obj) {
        return toStr(obj) === '[object RegExp]' && canTrustToString(obj);
    }
    function isError(obj) {
        return toStr(obj) === '[object Error]' && canTrustToString(obj);
    }
    function isString(obj) {
        return toStr(obj) === '[object String]' && canTrustToString(obj);
    }
    function isNumber(obj) {
        return toStr(obj) === '[object Number]' && canTrustToString(obj);
    }
    function isBoolean(obj) {
        return toStr(obj) === '[object Boolean]' && canTrustToString(obj);
    }
    // Symbol and BigInt do have Symbol.toStringTag by spec, so that can't be used to eliminate false positives
    function isSymbol(obj) {
        if (hasShammedSymbols) {
            return obj && typeof obj === 'object' && obj instanceof Symbol;
        }
        if (typeof obj === 'symbol') {
            return true;
        }
        if (!obj || typeof obj !== 'object' || !symToString) {
            return false;
        }
        try {
            symToString.call(obj);
            return true;
        } catch (e) {}
        return false;
    }
    function isBigInt(obj) {
        if (!obj || typeof obj !== 'object' || !bigIntValueOf) {
            return false;
        }
        try {
            bigIntValueOf.call(obj);
            return true;
        } catch (e) {}
        return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
    };
    function has(obj, key) {
        return hasOwn.call(obj, key);
    }
    function toStr(obj) {
        return objectToString.call(obj);
    }
    function nameOf(f) {
        if (f.name) {
            return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
            return m[1];
        }
        return null;
    }
    function indexOf(xs, x) {
        if (xs.indexOf) {
            return xs.indexOf(x);
        }
        for(var i = 0, l = xs.length; i < l; i++){
            if (xs[i] === x) {
                return i;
            }
        }
        return -1;
    }
    function isMap(x) {
        if (!mapSize || !x || typeof x !== 'object') {
            return false;
        }
        try {
            mapSize.call(x);
            try {
                setSize.call(x);
            } catch (s) {
                return true;
            }
            return x instanceof Map; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }
    function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakMapHas.call(x, weakMapHas);
            try {
                weakSetHas.call(x, weakSetHas);
            } catch (s) {
                return true;
            }
            return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }
    function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakRefDeref.call(x);
            return true;
        } catch (e) {}
        return false;
    }
    function isSet(x) {
        if (!setSize || !x || typeof x !== 'object') {
            return false;
        }
        try {
            setSize.call(x);
            try {
                mapSize.call(x);
            } catch (m) {
                return true;
            }
            return x instanceof Set; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }
    function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== 'object') {
            return false;
        }
        try {
            weakSetHas.call(x, weakSetHas);
            try {
                weakMapHas.call(x, weakMapHas);
            } catch (s) {
                return true;
            }
            return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
        } catch (e) {}
        return false;
    }
    function isElement(x) {
        if (!x || typeof x !== 'object') {
            return false;
        }
        if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
            return true;
        }
        return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
    }
    function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
            var remaining = str.length - opts.maxStringLength;
            var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
            return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var quoteRE = quoteREs[opts.quoteStyle || 'single'];
        quoteRE.lastIndex = 0;
        // eslint-disable-next-line no-control-regex
        var s = $replace.call($replace.call(str, quoteRE, '\\$1'), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, 'single', opts);
    }
    function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
            8: 'b',
            9: 't',
            10: 'n',
            12: 'f',
            13: 'r'
        }[n];
        if (x) {
            return '\\' + x;
        }
        return '\\x' + (n < 0x10 ? '0' : '') + $toUpperCase.call(n.toString(16));
    }
    function markBoxed(str) {
        return 'Object(' + str + ')';
    }
    function weakCollectionOf(type) {
        return type + ' { ? }';
    }
    function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ', ');
        return type + ' (' + size + ') {' + joinedEntries + '}';
    }
    function singleLineValues(xs) {
        for(var i = 0; i < xs.length; i++){
            if (indexOf(xs[i], '\n') >= 0) {
                return false;
            }
        }
        return true;
    }
    function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === '\t') {
            baseIndent = '\t';
        } else if (typeof opts.indent === 'number' && opts.indent > 0) {
            baseIndent = $join.call(Array(opts.indent + 1), ' ');
        } else {
            return null;
        }
        return {
            base: baseIndent,
            prev: $join.call(Array(depth + 1), baseIndent)
        };
    }
    function indentedJoin(xs, indent) {
        if (xs.length === 0) {
            return '';
        }
        var lineJoiner = '\n' + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, ',' + lineJoiner) + '\n' + indent.prev;
    }
    function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
            xs.length = obj.length;
            for(var i = 0; i < obj.length; i++){
                xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
            }
        }
        var syms = typeof gOPS === 'function' ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
            symMap = {};
            for(var k = 0; k < syms.length; k++){
                symMap['$' + syms[k]] = syms[k];
            }
        }
        for(var key in obj){
            if (!has(obj, key)) {
                continue;
            } // eslint-disable-line no-restricted-syntax, no-continue
            if (isArr && String(Number(key)) === key && key < obj.length) {
                continue;
            } // eslint-disable-line no-restricted-syntax, no-continue
            if (hasShammedSymbols && symMap['$' + key] instanceof Symbol) {
                continue; // eslint-disable-line no-restricted-syntax, no-continue
            } else if ($test.call(/[^\w$]/, key)) {
                xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
            } else {
                xs.push(key + ': ' + inspect(obj[key], obj));
            }
        }
        if (typeof gOPS === 'function') {
            for(var j = 0; j < syms.length; j++){
                if (isEnumerable.call(obj, syms[j])) {
                    xs.push('[' + inspect(syms[j]) + ']: ' + inspect(obj[syms[j]], obj));
                }
            }
        }
        return xs;
    }
    return objectInspect;
}

var sideChannelList;
var hasRequiredSideChannelList;
function requireSideChannelList() {
    if (hasRequiredSideChannelList) return sideChannelList;
    hasRequiredSideChannelList = 1;
    var inspect = /*@__PURE__*/ requireObjectInspect();
    var $TypeError = /*@__PURE__*/ requireType();
    /*
	* This function traverses the list returning the node corresponding to the given key.
	*
	* That node is also moved to the head of the list, so that if it's accessed again we don't need to traverse the whole list.
	* By doing so, all the recently used nodes can be accessed relatively quickly.
	*/ /** @type {import('./list.d.ts').listGetNode} */ // eslint-disable-next-line consistent-return
    var listGetNode = function(list, key, isDelete) {
        /** @type {typeof list | NonNullable<(typeof list)['next']>} */ var prev = list;
        /** @type {(typeof list)['next']} */ var curr;
        // eslint-disable-next-line eqeqeq
        for(; (curr = prev.next) != null; prev = curr){
            if (curr.key === key) {
                prev.next = curr.next;
                if (!isDelete) {
                    // eslint-disable-next-line no-extra-parens
                    curr.next = /** @type {NonNullable<typeof list.next>} */ list.next;
                    list.next = curr; // eslint-disable-line no-param-reassign
                }
                return curr;
            }
        }
    };
    /** @type {import('./list.d.ts').listGet} */ var listGet = function(objects, key) {
        if (!objects) {
            return void undefined;
        }
        var node = listGetNode(objects, key);
        return node && node.value;
    };
    /** @type {import('./list.d.ts').listSet} */ var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
            node.value = value;
        } else {
            // Prepend the new node to the beginning of the list
            objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */ {
                key: key,
                next: objects.next,
                value: value
            };
        }
    };
    /** @type {import('./list.d.ts').listHas} */ var listHas = function(objects, key) {
        if (!objects) {
            return false;
        }
        return !!listGetNode(objects, key);
    };
    /** @type {import('./list.d.ts').listDelete} */ // eslint-disable-next-line consistent-return
    var listDelete = function(objects, key) {
        if (objects) {
            return listGetNode(objects, key, true);
        }
    };
    /** @type {import('.')} */ sideChannelList = function getSideChannelList() {
        /** @typedef {ReturnType<typeof getSideChannelList>} Channel */ /** @typedef {Parameters<Channel['get']>[0]} K */ /** @typedef {Parameters<Channel['set']>[1]} V */ /** @type {import('./list.d.ts').RootNode<V, K> | undefined} */ var $o;
        /** @type {Channel} */ var channel = {
            assert: function(key) {
                if (!channel.has(key)) {
                    throw new $TypeError('Side channel does not contain ' + inspect(key));
                }
            },
            'delete': function(key) {
                var root = $o && $o.next;
                var deletedNode = listDelete($o, key);
                if (deletedNode && root && root === deletedNode) {
                    $o = void undefined;
                }
                return !!deletedNode;
            },
            get: function(key) {
                return listGet($o, key);
            },
            has: function(key) {
                return listHas($o, key);
            },
            set: function(key, value) {
                if (!$o) {
                    // Initialize the linked list as an empty node, so that we don't have to special-case handling of the first node: we can always refer to it as (previous node).next, instead of something like (list).head
                    $o = {
                        next: void undefined
                    };
                }
                // eslint-disable-next-line no-extra-parens
                listSet(/** @type {NonNullable<typeof $o>} */ $o, key, value);
            }
        };
        // @ts-expect-error TODO: figure out why this is erroring
        return channel;
    };
    return sideChannelList;
}

var esObjectAtoms;
var hasRequiredEsObjectAtoms;
function requireEsObjectAtoms() {
    if (hasRequiredEsObjectAtoms) return esObjectAtoms;
    hasRequiredEsObjectAtoms = 1;
    /** @type {import('.')} */ esObjectAtoms = Object;
    return esObjectAtoms;
}

var esErrors;
var hasRequiredEsErrors;
function requireEsErrors() {
    if (hasRequiredEsErrors) return esErrors;
    hasRequiredEsErrors = 1;
    /** @type {import('.')} */ esErrors = Error;
    return esErrors;
}

var _eval;
var hasRequired_eval;
function require_eval() {
    if (hasRequired_eval) return _eval;
    hasRequired_eval = 1;
    /** @type {import('./eval')} */ _eval = EvalError;
    return _eval;
}

var range;
var hasRequiredRange;
function requireRange() {
    if (hasRequiredRange) return range;
    hasRequiredRange = 1;
    /** @type {import('./range')} */ range = RangeError;
    return range;
}

var ref;
var hasRequiredRef;
function requireRef() {
    if (hasRequiredRef) return ref;
    hasRequiredRef = 1;
    /** @type {import('./ref')} */ ref = ReferenceError;
    return ref;
}

var syntax;
var hasRequiredSyntax;
function requireSyntax() {
    if (hasRequiredSyntax) return syntax;
    hasRequiredSyntax = 1;
    /** @type {import('./syntax')} */ syntax = SyntaxError;
    return syntax;
}

var uri;
var hasRequiredUri;
function requireUri() {
    if (hasRequiredUri) return uri;
    hasRequiredUri = 1;
    /** @type {import('./uri')} */ uri = URIError;
    return uri;
}

var abs;
var hasRequiredAbs;
function requireAbs() {
    if (hasRequiredAbs) return abs;
    hasRequiredAbs = 1;
    /** @type {import('./abs')} */ abs = Math.abs;
    return abs;
}

var floor;
var hasRequiredFloor;
function requireFloor() {
    if (hasRequiredFloor) return floor;
    hasRequiredFloor = 1;
    /** @type {import('./floor')} */ floor = Math.floor;
    return floor;
}

var max;
var hasRequiredMax;
function requireMax() {
    if (hasRequiredMax) return max;
    hasRequiredMax = 1;
    /** @type {import('./max')} */ max = Math.max;
    return max;
}

var min;
var hasRequiredMin;
function requireMin() {
    if (hasRequiredMin) return min;
    hasRequiredMin = 1;
    /** @type {import('./min')} */ min = Math.min;
    return min;
}

var pow;
var hasRequiredPow;
function requirePow() {
    if (hasRequiredPow) return pow;
    hasRequiredPow = 1;
    /** @type {import('./pow')} */ pow = Math.pow;
    return pow;
}

var round;
var hasRequiredRound;
function requireRound() {
    if (hasRequiredRound) return round;
    hasRequiredRound = 1;
    /** @type {import('./round')} */ round = Math.round;
    return round;
}

var _isNaN;
var hasRequired_isNaN;
function require_isNaN() {
    if (hasRequired_isNaN) return _isNaN;
    hasRequired_isNaN = 1;
    /** @type {import('./isNaN')} */ _isNaN = Number.isNaN || function isNaN(a) {
        return a !== a;
    };
    return _isNaN;
}

var sign;
var hasRequiredSign;
function requireSign() {
    if (hasRequiredSign) return sign;
    hasRequiredSign = 1;
    var $isNaN = /*@__PURE__*/ require_isNaN();
    /** @type {import('./sign')} */ sign = function sign(number) {
        if ($isNaN(number) || number === 0) {
            return number;
        }
        return number < 0 ? -1 : 1;
    };
    return sign;
}

var gOPD;
var hasRequiredGOPD;
function requireGOPD() {
    if (hasRequiredGOPD) return gOPD;
    hasRequiredGOPD = 1;
    /** @type {import('./gOPD')} */ gOPD = Object.getOwnPropertyDescriptor;
    return gOPD;
}

var gopd;
var hasRequiredGopd;
function requireGopd() {
    if (hasRequiredGopd) return gopd;
    hasRequiredGopd = 1;
    /** @type {import('.')} */ var $gOPD = /*@__PURE__*/ requireGOPD();
    if ($gOPD) {
        try {
            $gOPD([], 'length');
        } catch (e) {
            // IE 8 has a broken gOPD
            $gOPD = null;
        }
    }
    gopd = $gOPD;
    return gopd;
}

var esDefineProperty;
var hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
    if (hasRequiredEsDefineProperty) return esDefineProperty;
    hasRequiredEsDefineProperty = 1;
    /** @type {import('.')} */ var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
        try {
            $defineProperty({}, 'a', {
                value: 1
            });
        } catch (e) {
            // IE 8 has a broken defineProperty
            $defineProperty = false;
        }
    }
    esDefineProperty = $defineProperty;
    return esDefineProperty;
}

var shams;
var hasRequiredShams;
function requireShams() {
    if (hasRequiredShams) return shams;
    hasRequiredShams = 1;
    /** @type {import('./shams')} */ /* eslint complexity: [2, 18], max-statements: [2, 33] */ shams = function hasSymbols() {
        if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
            return false;
        }
        if (typeof Symbol.iterator === 'symbol') {
            return true;
        }
        /** @type {{ [k in symbol]?: unknown }} */ var obj = {};
        var sym = Symbol('test');
        var symObj = Object(sym);
        if (typeof sym === 'string') {
            return false;
        }
        if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
            return false;
        }
        if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
            return false;
        }
        // temp disabled per https://github.com/ljharb/object.assign/issues/17
        // if (sym instanceof Symbol) { return false; }
        // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
        // if (!(symObj instanceof Symbol)) { return false; }
        // if (typeof Symbol.prototype.toString !== 'function') { return false; }
        // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
        var symVal = 42;
        obj[sym] = symVal;
        for(var _ in obj){
            return false;
        } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
        if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
            return false;
        }
        if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
            return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
            return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
            return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === 'function') {
            // eslint-disable-next-line no-extra-parens
            var descriptor = /** @type {PropertyDescriptor} */ Object.getOwnPropertyDescriptor(obj, sym);
            if (descriptor.value !== symVal || descriptor.enumerable !== true) {
                return false;
            }
        }
        return true;
    };
    return shams;
}

var hasSymbols;
var hasRequiredHasSymbols;
function requireHasSymbols() {
    if (hasRequiredHasSymbols) return hasSymbols;
    hasRequiredHasSymbols = 1;
    var origSymbol = typeof Symbol !== 'undefined' && Symbol;
    var hasSymbolSham = requireShams();
    /** @type {import('.')} */ hasSymbols = function hasNativeSymbols() {
        if (typeof origSymbol !== 'function') {
            return false;
        }
        if (typeof Symbol !== 'function') {
            return false;
        }
        if (typeof origSymbol('foo') !== 'symbol') {
            return false;
        }
        if (typeof Symbol('bar') !== 'symbol') {
            return false;
        }
        return hasSymbolSham();
    };
    return hasSymbols;
}

var Reflect_getPrototypeOf;
var hasRequiredReflect_getPrototypeOf;
function requireReflect_getPrototypeOf() {
    if (hasRequiredReflect_getPrototypeOf) return Reflect_getPrototypeOf;
    hasRequiredReflect_getPrototypeOf = 1;
    /** @type {import('./Reflect.getPrototypeOf')} */ Reflect_getPrototypeOf = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
    return Reflect_getPrototypeOf;
}

var Object_getPrototypeOf;
var hasRequiredObject_getPrototypeOf;
function requireObject_getPrototypeOf() {
    if (hasRequiredObject_getPrototypeOf) return Object_getPrototypeOf;
    hasRequiredObject_getPrototypeOf = 1;
    var $Object = /*@__PURE__*/ requireEsObjectAtoms();
    /** @type {import('./Object.getPrototypeOf')} */ Object_getPrototypeOf = $Object.getPrototypeOf || null;
    return Object_getPrototypeOf;
}

var implementation;
var hasRequiredImplementation;
function requireImplementation() {
    if (hasRequiredImplementation) return implementation;
    hasRequiredImplementation = 1;
    /* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = '[object Function]';
    var concatty = function concatty(a, b) {
        var arr = [];
        for(var i = 0; i < a.length; i += 1){
            arr[i] = a[i];
        }
        for(var j = 0; j < b.length; j += 1){
            arr[j + a.length] = b[j];
        }
        return arr;
    };
    var slicy = function slicy(arrLike, offset) {
        var arr = [];
        for(var i = offset, j = 0; i < arrLike.length; i += 1, j += 1){
            arr[j] = arrLike[i];
        }
        return arr;
    };
    var joiny = function(arr, joiner) {
        var str = '';
        for(var i = 0; i < arr.length; i += 1){
            str += arr[i];
            if (i + 1 < arr.length) {
                str += joiner;
            }
        }
        return str;
    };
    implementation = function bind(that) {
        var target = this;
        if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
            throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
            if (this instanceof bound) {
                var result = target.apply(this, concatty(args, arguments));
                if (Object(result) === result) {
                    return result;
                }
                return this;
            }
            return target.apply(that, concatty(args, arguments));
        };
        var boundLength = max(0, target.length - args.length);
        var boundArgs = [];
        for(var i = 0; i < boundLength; i++){
            boundArgs[i] = '$' + i;
        }
        bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
        if (target.prototype) {
            var Empty = function Empty() {};
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            Empty.prototype = null;
        }
        return bound;
    };
    return implementation;
}

var functionBind;
var hasRequiredFunctionBind;
function requireFunctionBind() {
    if (hasRequiredFunctionBind) return functionBind;
    hasRequiredFunctionBind = 1;
    var implementation = requireImplementation();
    functionBind = Function.prototype.bind || implementation;
    return functionBind;
}

var functionCall;
var hasRequiredFunctionCall;
function requireFunctionCall() {
    if (hasRequiredFunctionCall) return functionCall;
    hasRequiredFunctionCall = 1;
    /** @type {import('./functionCall')} */ functionCall = Function.prototype.call;
    return functionCall;
}

var functionApply;
var hasRequiredFunctionApply;
function requireFunctionApply() {
    if (hasRequiredFunctionApply) return functionApply;
    hasRequiredFunctionApply = 1;
    /** @type {import('./functionApply')} */ functionApply = Function.prototype.apply;
    return functionApply;
}

var reflectApply;
var hasRequiredReflectApply;
function requireReflectApply() {
    if (hasRequiredReflectApply) return reflectApply;
    hasRequiredReflectApply = 1;
    /** @type {import('./reflectApply')} */ reflectApply = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
    return reflectApply;
}

var actualApply;
var hasRequiredActualApply;
function requireActualApply() {
    if (hasRequiredActualApply) return actualApply;
    hasRequiredActualApply = 1;
    var bind = requireFunctionBind();
    var $apply = requireFunctionApply();
    var $call = requireFunctionCall();
    var $reflectApply = requireReflectApply();
    /** @type {import('./actualApply')} */ actualApply = $reflectApply || bind.call($call, $apply);
    return actualApply;
}

var callBindApplyHelpers;
var hasRequiredCallBindApplyHelpers;
function requireCallBindApplyHelpers() {
    if (hasRequiredCallBindApplyHelpers) return callBindApplyHelpers;
    hasRequiredCallBindApplyHelpers = 1;
    var bind = requireFunctionBind();
    var $TypeError = /*@__PURE__*/ requireType();
    var $call = requireFunctionCall();
    var $actualApply = requireActualApply();
    /** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */ callBindApplyHelpers = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== 'function') {
            throw new $TypeError('a function is required');
        }
        return $actualApply(bind, $call, args);
    };
    return callBindApplyHelpers;
}

var get;
var hasRequiredGet;
function requireGet() {
    if (hasRequiredGet) return get;
    hasRequiredGet = 1;
    var callBind = requireCallBindApplyHelpers();
    var gOPD = /*@__PURE__*/ requireGopd();
    var hasProtoAccessor;
    try {
        // eslint-disable-next-line no-extra-parens, no-proto
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ [].__proto__ === Array.prototype;
    } catch (e) {
        if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
            throw e;
        }
    }
    // eslint-disable-next-line no-extra-parens
    var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, /** @type {keyof typeof Object.prototype} */ '__proto__');
    var $Object = Object;
    var $getPrototypeOf = $Object.getPrototypeOf;
    /** @type {import('./get')} */ get = desc && typeof desc.get === 'function' ? callBind([
        desc.get
    ]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */ function getDunder(value) {
        // eslint-disable-next-line eqeqeq
        return $getPrototypeOf(value == null ? value : $Object(value));
    } : false;
    return get;
}

var getProto;
var hasRequiredGetProto;
function requireGetProto() {
    if (hasRequiredGetProto) return getProto;
    hasRequiredGetProto = 1;
    var reflectGetProto = requireReflect_getPrototypeOf();
    var originalGetProto = requireObject_getPrototypeOf();
    var getDunderProto = /*@__PURE__*/ requireGet();
    /** @type {import('.')} */ getProto = reflectGetProto ? function getProto(O) {
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return reflectGetProto(O);
    } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== 'object' && typeof O !== 'function') {
            throw new TypeError('getProto: not an object');
        }
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return originalGetProto(O);
    } : getDunderProto ? function getProto(O) {
        // @ts-expect-error TS can't narrow inside a closure, for some reason
        return getDunderProto(O);
    } : null;
    return getProto;
}

var hasown;
var hasRequiredHasown;
function requireHasown() {
    if (hasRequiredHasown) return hasown;
    hasRequiredHasown = 1;
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = requireFunctionBind();
    /** @type {import('.')} */ hasown = bind.call(call, $hasOwn);
    return hasown;
}

var getIntrinsic;
var hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
    if (hasRequiredGetIntrinsic) return getIntrinsic;
    hasRequiredGetIntrinsic = 1;
    var undefined$1;
    var $Object = /*@__PURE__*/ requireEsObjectAtoms();
    var $Error = /*@__PURE__*/ requireEsErrors();
    var $EvalError = /*@__PURE__*/ require_eval();
    var $RangeError = /*@__PURE__*/ requireRange();
    var $ReferenceError = /*@__PURE__*/ requireRef();
    var $SyntaxError = /*@__PURE__*/ requireSyntax();
    var $TypeError = /*@__PURE__*/ requireType();
    var $URIError = /*@__PURE__*/ requireUri();
    var abs = /*@__PURE__*/ requireAbs();
    var floor = /*@__PURE__*/ requireFloor();
    var max = /*@__PURE__*/ requireMax();
    var min = /*@__PURE__*/ requireMin();
    var pow = /*@__PURE__*/ requirePow();
    var round = /*@__PURE__*/ requireRound();
    var sign = /*@__PURE__*/ requireSign();
    var $Function = Function;
    // eslint-disable-next-line consistent-return
    var getEvalledConstructor = function(expressionSyntax) {
        try {
            return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
        } catch (e) {}
    };
    var $gOPD = /*@__PURE__*/ requireGopd();
    var $defineProperty = /*@__PURE__*/ requireEsDefineProperty();
    var throwTypeError = function() {
        throw new $TypeError();
    };
    var ThrowTypeError = $gOPD ? function() {
        try {
            // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
            arguments.callee; // IE 8 does not throw here
            return throwTypeError;
        } catch (calleeThrows) {
            try {
                // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
                return $gOPD(arguments, 'callee').get;
            } catch (gOPDthrows) {
                return throwTypeError;
            }
        }
    }() : throwTypeError;
    var hasSymbols = requireHasSymbols()();
    var getProto = requireGetProto();
    var $ObjectGPO = requireObject_getPrototypeOf();
    var $ReflectGPO = requireReflect_getPrototypeOf();
    var $apply = requireFunctionApply();
    var $call = requireFunctionCall();
    var needsEval = {};
    var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined$1 : getProto(Uint8Array);
    var INTRINSICS = {
        __proto__: null,
        '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
        '%Array%': Array,
        '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
        '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined$1,
        '%AsyncFromSyncIteratorPrototype%': undefined$1,
        '%AsyncFunction%': needsEval,
        '%AsyncGenerator%': needsEval,
        '%AsyncGeneratorFunction%': needsEval,
        '%AsyncIteratorPrototype%': needsEval,
        '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
        '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
        '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
        '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
        '%Boolean%': Boolean,
        '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
        '%Date%': Date,
        '%decodeURI%': decodeURI,
        '%decodeURIComponent%': decodeURIComponent,
        '%encodeURI%': encodeURI,
        '%encodeURIComponent%': encodeURIComponent,
        '%Error%': $Error,
        '%eval%': eval,
        '%EvalError%': $EvalError,
        '%Float16Array%': typeof Float16Array === 'undefined' ? undefined$1 : Float16Array,
        '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
        '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
        '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
        '%Function%': $Function,
        '%GeneratorFunction%': needsEval,
        '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
        '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
        '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
        '%isFinite%': isFinite,
        '%isNaN%': isNaN,
        '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
        '%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
        '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
        '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
        '%Math%': Math,
        '%Number%': Number,
        '%Object%': $Object,
        '%Object.getOwnPropertyDescriptor%': $gOPD,
        '%parseFloat%': parseFloat,
        '%parseInt%': parseInt,
        '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
        '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
        '%RangeError%': $RangeError,
        '%ReferenceError%': $ReferenceError,
        '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
        '%RegExp%': RegExp,
        '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
        '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
        '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
        '%String%': String,
        '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined$1,
        '%Symbol%': hasSymbols ? Symbol : undefined$1,
        '%SyntaxError%': $SyntaxError,
        '%ThrowTypeError%': ThrowTypeError,
        '%TypedArray%': TypedArray,
        '%TypeError%': $TypeError,
        '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
        '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
        '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
        '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
        '%URIError%': $URIError,
        '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
        '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
        '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
        '%Function.prototype.call%': $call,
        '%Function.prototype.apply%': $apply,
        '%Object.defineProperty%': $defineProperty,
        '%Object.getPrototypeOf%': $ObjectGPO,
        '%Math.abs%': abs,
        '%Math.floor%': floor,
        '%Math.max%': max,
        '%Math.min%': min,
        '%Math.pow%': pow,
        '%Math.round%': round,
        '%Math.sign%': sign,
        '%Reflect.getPrototypeOf%': $ReflectGPO
    };
    if (getProto) {
        try {
            null.error; // eslint-disable-line no-unused-expressions
        } catch (e) {
            // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
            var errorProto = getProto(getProto(e));
            INTRINSICS['%Error.prototype%'] = errorProto;
        }
    }
    var doEval = function doEval(name) {
        var value;
        if (name === '%AsyncFunction%') {
            value = getEvalledConstructor('async function () {}');
        } else if (name === '%GeneratorFunction%') {
            value = getEvalledConstructor('function* () {}');
        } else if (name === '%AsyncGeneratorFunction%') {
            value = getEvalledConstructor('async function* () {}');
        } else if (name === '%AsyncGenerator%') {
            var fn = doEval('%AsyncGeneratorFunction%');
            if (fn) {
                value = fn.prototype;
            }
        } else if (name === '%AsyncIteratorPrototype%') {
            var gen = doEval('%AsyncGenerator%');
            if (gen && getProto) {
                value = getProto(gen.prototype);
            }
        }
        INTRINSICS[name] = value;
        return value;
    };
    var LEGACY_ALIASES = {
        __proto__: null,
        '%ArrayBufferPrototype%': [
            'ArrayBuffer',
            'prototype'
        ],
        '%ArrayPrototype%': [
            'Array',
            'prototype'
        ],
        '%ArrayProto_entries%': [
            'Array',
            'prototype',
            'entries'
        ],
        '%ArrayProto_forEach%': [
            'Array',
            'prototype',
            'forEach'
        ],
        '%ArrayProto_keys%': [
            'Array',
            'prototype',
            'keys'
        ],
        '%ArrayProto_values%': [
            'Array',
            'prototype',
            'values'
        ],
        '%AsyncFunctionPrototype%': [
            'AsyncFunction',
            'prototype'
        ],
        '%AsyncGenerator%': [
            'AsyncGeneratorFunction',
            'prototype'
        ],
        '%AsyncGeneratorPrototype%': [
            'AsyncGeneratorFunction',
            'prototype',
            'prototype'
        ],
        '%BooleanPrototype%': [
            'Boolean',
            'prototype'
        ],
        '%DataViewPrototype%': [
            'DataView',
            'prototype'
        ],
        '%DatePrototype%': [
            'Date',
            'prototype'
        ],
        '%ErrorPrototype%': [
            'Error',
            'prototype'
        ],
        '%EvalErrorPrototype%': [
            'EvalError',
            'prototype'
        ],
        '%Float32ArrayPrototype%': [
            'Float32Array',
            'prototype'
        ],
        '%Float64ArrayPrototype%': [
            'Float64Array',
            'prototype'
        ],
        '%FunctionPrototype%': [
            'Function',
            'prototype'
        ],
        '%Generator%': [
            'GeneratorFunction',
            'prototype'
        ],
        '%GeneratorPrototype%': [
            'GeneratorFunction',
            'prototype',
            'prototype'
        ],
        '%Int8ArrayPrototype%': [
            'Int8Array',
            'prototype'
        ],
        '%Int16ArrayPrototype%': [
            'Int16Array',
            'prototype'
        ],
        '%Int32ArrayPrototype%': [
            'Int32Array',
            'prototype'
        ],
        '%JSONParse%': [
            'JSON',
            'parse'
        ],
        '%JSONStringify%': [
            'JSON',
            'stringify'
        ],
        '%MapPrototype%': [
            'Map',
            'prototype'
        ],
        '%NumberPrototype%': [
            'Number',
            'prototype'
        ],
        '%ObjectPrototype%': [
            'Object',
            'prototype'
        ],
        '%ObjProto_toString%': [
            'Object',
            'prototype',
            'toString'
        ],
        '%ObjProto_valueOf%': [
            'Object',
            'prototype',
            'valueOf'
        ],
        '%PromisePrototype%': [
            'Promise',
            'prototype'
        ],
        '%PromiseProto_then%': [
            'Promise',
            'prototype',
            'then'
        ],
        '%Promise_all%': [
            'Promise',
            'all'
        ],
        '%Promise_reject%': [
            'Promise',
            'reject'
        ],
        '%Promise_resolve%': [
            'Promise',
            'resolve'
        ],
        '%RangeErrorPrototype%': [
            'RangeError',
            'prototype'
        ],
        '%ReferenceErrorPrototype%': [
            'ReferenceError',
            'prototype'
        ],
        '%RegExpPrototype%': [
            'RegExp',
            'prototype'
        ],
        '%SetPrototype%': [
            'Set',
            'prototype'
        ],
        '%SharedArrayBufferPrototype%': [
            'SharedArrayBuffer',
            'prototype'
        ],
        '%StringPrototype%': [
            'String',
            'prototype'
        ],
        '%SymbolPrototype%': [
            'Symbol',
            'prototype'
        ],
        '%SyntaxErrorPrototype%': [
            'SyntaxError',
            'prototype'
        ],
        '%TypedArrayPrototype%': [
            'TypedArray',
            'prototype'
        ],
        '%TypeErrorPrototype%': [
            'TypeError',
            'prototype'
        ],
        '%Uint8ArrayPrototype%': [
            'Uint8Array',
            'prototype'
        ],
        '%Uint8ClampedArrayPrototype%': [
            'Uint8ClampedArray',
            'prototype'
        ],
        '%Uint16ArrayPrototype%': [
            'Uint16Array',
            'prototype'
        ],
        '%Uint32ArrayPrototype%': [
            'Uint32Array',
            'prototype'
        ],
        '%URIErrorPrototype%': [
            'URIError',
            'prototype'
        ],
        '%WeakMapPrototype%': [
            'WeakMap',
            'prototype'
        ],
        '%WeakSetPrototype%': [
            'WeakSet',
            'prototype'
        ]
    };
    var bind = requireFunctionBind();
    var hasOwn = /*@__PURE__*/ requireHasown();
    var $concat = bind.call($call, Array.prototype.concat);
    var $spliceApply = bind.call($apply, Array.prototype.splice);
    var $replace = bind.call($call, String.prototype.replace);
    var $strSlice = bind.call($call, String.prototype.slice);
    var $exec = bind.call($call, RegExp.prototype.exec);
    /* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
    var stringToPath = function stringToPath(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === '%' && last !== '%') {
            throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
        } else if (last === '%' && first !== '%') {
            throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
            result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
        });
        return result;
    };
    /* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
            alias = LEGACY_ALIASES[intrinsicName];
            intrinsicName = '%' + alias[0] + '%';
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
            var value = INTRINSICS[intrinsicName];
            if (value === needsEval) {
                value = doEval(intrinsicName);
            }
            if (typeof value === 'undefined' && !allowMissing) {
                throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
            }
            return {
                alias: alias,
                name: intrinsicName,
                value: value
            };
        }
        throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
    };
    getIntrinsic = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== 'string' || name.length === 0) {
            throw new $TypeError('intrinsic name must be a non-empty string');
        }
        if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
            throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
            throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
        var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
            intrinsicBaseName = alias[0];
            $spliceApply(parts, $concat([
                0,
                1
            ], alias));
        }
        for(var i = 1, isOwn = true; i < parts.length; i += 1){
            var part = parts[i];
            var first = $strSlice(part, 0, 1);
            var last = $strSlice(part, -1);
            if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
                throw new $SyntaxError('property names with quotes must have matching quotes');
            }
            if (part === 'constructor' || !isOwn) {
                skipFurtherCaching = true;
            }
            intrinsicBaseName += '.' + part;
            intrinsicRealName = '%' + intrinsicBaseName + '%';
            if (hasOwn(INTRINSICS, intrinsicRealName)) {
                value = INTRINSICS[intrinsicRealName];
            } else if (value != null) {
                if (!(part in value)) {
                    if (!allowMissing) {
                        throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                    }
                    return void undefined$1;
                }
                if ($gOPD && i + 1 >= parts.length) {
                    var desc = $gOPD(value, part);
                    isOwn = !!desc;
                    // By convention, when a data property is converted to an accessor
                    // property to emulate a data property that does not suffer from
                    // the override mistake, that accessor's getter is marked with
                    // an `originalValue` property. Here, when we detect this, we
                    // uphold the illusion by pretending to see that original data
                    // property, i.e., returning the value rather than the getter
                    // itself.
                    if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                        value = desc.get;
                    } else {
                        value = value[part];
                    }
                } else {
                    isOwn = hasOwn(value, part);
                    value = value[part];
                }
                if (isOwn && !skipFurtherCaching) {
                    INTRINSICS[intrinsicRealName] = value;
                }
            }
        }
        return value;
    };
    return getIntrinsic;
}

var callBound;
var hasRequiredCallBound;
function requireCallBound() {
    if (hasRequiredCallBound) return callBound;
    hasRequiredCallBound = 1;
    var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();
    var callBindBasic = requireCallBindApplyHelpers();
    /** @type {(thisArg: string, searchString: string, position?: number) => number} */ var $indexOf = callBindBasic([
        GetIntrinsic('%String.prototype.indexOf%')
    ]);
    /** @type {import('.')} */ callBound = function callBoundIntrinsic(name, allowMissing) {
        /* eslint no-extra-parens: 0 */ var intrinsic = /** @type {(this: unknown, ...args: unknown[]) => unknown} */ GetIntrinsic(name, !!allowMissing);
        if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
            return callBindBasic(/** @type {const} */ [
                intrinsic
            ]);
        }
        return intrinsic;
    };
    return callBound;
}

var sideChannelMap;
var hasRequiredSideChannelMap;
function requireSideChannelMap() {
    if (hasRequiredSideChannelMap) return sideChannelMap;
    hasRequiredSideChannelMap = 1;
    var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();
    var callBound = /*@__PURE__*/ requireCallBound();
    var inspect = /*@__PURE__*/ requireObjectInspect();
    var $TypeError = /*@__PURE__*/ requireType();
    var $Map = GetIntrinsic('%Map%', true);
    /** @type {<K, V>(thisArg: Map<K, V>, key: K) => V} */ var $mapGet = callBound('Map.prototype.get', true);
    /** @type {<K, V>(thisArg: Map<K, V>, key: K, value: V) => void} */ var $mapSet = callBound('Map.prototype.set', true);
    /** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */ var $mapHas = callBound('Map.prototype.has', true);
    /** @type {<K, V>(thisArg: Map<K, V>, key: K) => boolean} */ var $mapDelete = callBound('Map.prototype.delete', true);
    /** @type {<K, V>(thisArg: Map<K, V>) => number} */ var $mapSize = callBound('Map.prototype.size', true);
    /** @type {import('.')} */ sideChannelMap = !!$Map && /** @type {Exclude<import('.'), false>} */ function getSideChannelMap() {
        /** @typedef {ReturnType<typeof getSideChannelMap>} Channel */ /** @typedef {Parameters<Channel['get']>[0]} K */ /** @typedef {Parameters<Channel['set']>[1]} V */ /** @type {Map<K, V> | undefined} */ var $m;
        /** @type {Channel} */ var channel = {
            assert: function(key) {
                if (!channel.has(key)) {
                    throw new $TypeError('Side channel does not contain ' + inspect(key));
                }
            },
            'delete': function(key) {
                if ($m) {
                    var result = $mapDelete($m, key);
                    if ($mapSize($m) === 0) {
                        $m = void undefined;
                    }
                    return result;
                }
                return false;
            },
            get: function(key) {
                if ($m) {
                    return $mapGet($m, key);
                }
            },
            has: function(key) {
                if ($m) {
                    return $mapHas($m, key);
                }
                return false;
            },
            set: function(key, value) {
                if (!$m) {
                    // @ts-expect-error TS can't handle narrowing a variable inside a closure
                    $m = new $Map();
                }
                $mapSet($m, key, value);
            }
        };
        // @ts-expect-error TODO: figure out why TS is erroring here
        return channel;
    };
    return sideChannelMap;
}

var sideChannelWeakmap;
var hasRequiredSideChannelWeakmap;
function requireSideChannelWeakmap() {
    if (hasRequiredSideChannelWeakmap) return sideChannelWeakmap;
    hasRequiredSideChannelWeakmap = 1;
    var GetIntrinsic = /*@__PURE__*/ requireGetIntrinsic();
    var callBound = /*@__PURE__*/ requireCallBound();
    var inspect = /*@__PURE__*/ requireObjectInspect();
    var getSideChannelMap = requireSideChannelMap();
    var $TypeError = /*@__PURE__*/ requireType();
    var $WeakMap = GetIntrinsic('%WeakMap%', true);
    /** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => V} */ var $weakMapGet = callBound('WeakMap.prototype.get', true);
    /** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K, value: V) => void} */ var $weakMapSet = callBound('WeakMap.prototype.set', true);
    /** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */ var $weakMapHas = callBound('WeakMap.prototype.has', true);
    /** @type {<K extends object, V>(thisArg: WeakMap<K, V>, key: K) => boolean} */ var $weakMapDelete = callBound('WeakMap.prototype.delete', true);
    /** @type {import('.')} */ sideChannelWeakmap = $WeakMap ? /** @type {Exclude<import('.'), false>} */ function getSideChannelWeakMap() {
        /** @typedef {ReturnType<typeof getSideChannelWeakMap>} Channel */ /** @typedef {Parameters<Channel['get']>[0]} K */ /** @typedef {Parameters<Channel['set']>[1]} V */ /** @type {WeakMap<K & object, V> | undefined} */ var $wm;
        /** @type {Channel | undefined} */ var $m;
        /** @type {Channel} */ var channel = {
            assert: function(key) {
                if (!channel.has(key)) {
                    throw new $TypeError('Side channel does not contain ' + inspect(key));
                }
            },
            'delete': function(key) {
                if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
                    if ($wm) {
                        return $weakMapDelete($wm, key);
                    }
                } else if (getSideChannelMap) {
                    if ($m) {
                        return $m['delete'](key);
                    }
                }
                return false;
            },
            get: function(key) {
                if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
                    if ($wm) {
                        return $weakMapGet($wm, key);
                    }
                }
                return $m && $m.get(key);
            },
            has: function(key) {
                if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
                    if ($wm) {
                        return $weakMapHas($wm, key);
                    }
                }
                return !!$m && $m.has(key);
            },
            set: function(key, value) {
                if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
                    if (!$wm) {
                        $wm = new $WeakMap();
                    }
                    $weakMapSet($wm, key, value);
                } else if (getSideChannelMap) {
                    if (!$m) {
                        $m = getSideChannelMap();
                    }
                    // eslint-disable-next-line no-extra-parens
                    /** @type {NonNullable<typeof $m>} */ $m.set(key, value);
                }
            }
        };
        // @ts-expect-error TODO: figure out why this is erroring
        return channel;
    } : getSideChannelMap;
    return sideChannelWeakmap;
}

var sideChannel;
var hasRequiredSideChannel;
function requireSideChannel() {
    if (hasRequiredSideChannel) return sideChannel;
    hasRequiredSideChannel = 1;
    var $TypeError = /*@__PURE__*/ requireType();
    var inspect = /*@__PURE__*/ requireObjectInspect();
    var getSideChannelList = requireSideChannelList();
    var getSideChannelMap = requireSideChannelMap();
    var getSideChannelWeakMap = requireSideChannelWeakmap();
    var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
    /** @type {import('.')} */ sideChannel = function getSideChannel() {
        /** @typedef {ReturnType<typeof getSideChannel>} Channel */ /** @type {Channel | undefined} */ var $channelData;
        /** @type {Channel} */ var channel = {
            assert: function(key) {
                if (!channel.has(key)) {
                    throw new $TypeError('Side channel does not contain ' + inspect(key));
                }
            },
            'delete': function(key) {
                return !!$channelData && $channelData['delete'](key);
            },
            get: function(key) {
                return $channelData && $channelData.get(key);
            },
            has: function(key) {
                return !!$channelData && $channelData.has(key);
            },
            set: function(key, value) {
                if (!$channelData) {
                    $channelData = makeChannel();
                }
                $channelData.set(key, value);
            }
        };
        // @ts-expect-error TODO: figure out why this is erroring
        return channel;
    };
    return sideChannel;
}

var formats;
var hasRequiredFormats;
function requireFormats() {
    if (hasRequiredFormats) return formats;
    hasRequiredFormats = 1;
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
        RFC1738: 'RFC1738',
        RFC3986: 'RFC3986'
    };
    formats = {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function(value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function(value) {
                return String(value);
            }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
    };
    return formats;
}

var utils;
var hasRequiredUtils;
function requireUtils() {
    if (hasRequiredUtils) return utils;
    hasRequiredUtils = 1;
    var formats = /*@__PURE__*/ requireFormats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
        var array = [];
        for(var i = 0; i < 256; ++i){
            array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
        }
        return array;
    }();
    var compactQueue = function compactQueue(queue) {
        while(queue.length > 1){
            var item = queue.pop();
            var obj = item.obj[item.prop];
            if (isArray(obj)) {
                var compacted = [];
                for(var j = 0; j < obj.length; ++j){
                    if (typeof obj[j] !== 'undefined') {
                        compacted.push(obj[j]);
                    }
                }
                item.obj[item.prop] = compacted;
            }
        }
    };
    var arrayToObject = function arrayToObject(source, options) {
        var obj = options && options.plainObjects ? {
            __proto__: null
        } : {};
        for(var i = 0; i < source.length; ++i){
            if (typeof source[i] !== 'undefined') {
                obj[i] = source[i];
            }
        }
        return obj;
    };
    var merge = function merge(target, source, options) {
        /* eslint no-param-reassign: 0 */ if (!source) {
            return target;
        }
        if (typeof source !== 'object' && typeof source !== 'function') {
            if (isArray(target)) {
                target.push(source);
            } else if (target && typeof target === 'object') {
                if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
                    target[source] = true;
                }
            } else {
                return [
                    target,
                    source
                ];
            }
            return target;
        }
        if (!target || typeof target !== 'object') {
            return [
                target
            ].concat(source);
        }
        var mergeTarget = target;
        if (isArray(target) && !isArray(source)) {
            mergeTarget = arrayToObject(target, options);
        }
        if (isArray(target) && isArray(source)) {
            source.forEach(function(item, i) {
                if (has.call(target, i)) {
                    var targetItem = target[i];
                    if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                        target[i] = merge(targetItem, item, options);
                    } else {
                        target.push(item);
                    }
                } else {
                    target[i] = item;
                }
            });
            return target;
        }
        return Object.keys(source).reduce(function(acc, key) {
            var value = source[key];
            if (has.call(acc, key)) {
                acc[key] = merge(acc[key], value, options);
            } else {
                acc[key] = value;
            }
            return acc;
        }, mergeTarget);
    };
    var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function(acc, key) {
            acc[key] = source[key];
            return acc;
        }, target);
    };
    var decode = function(str, defaultDecoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, ' ');
        if (charset === 'iso-8859-1') {
            // unescape never throws, no try...catch needed:
            return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        // utf-8
        try {
            return decodeURIComponent(strWithoutPlus);
        } catch (e) {
            return strWithoutPlus;
        }
    };
    var limit = 1024;
    /* eslint operator-linebreak: [2, "before"] */ var encode = function encode(str, defaultEncoder, charset, kind, format) {
        // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
        // It has been adapted here for stricter adherence to RFC 3986
        if (str.length === 0) {
            return str;
        }
        var string = str;
        if (typeof str === 'symbol') {
            string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== 'string') {
            string = String(str);
        }
        if (charset === 'iso-8859-1') {
            return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
                return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
            });
        }
        var out = '';
        for(var j = 0; j < string.length; j += limit){
            var segment = string.length >= limit ? string.slice(j, j + limit) : string;
            var arr = [];
            for(var i = 0; i < segment.length; ++i){
                var c = segment.charCodeAt(i);
                if (c === 0x2D // -
                 || c === 0x2E // .
                 || c === 0x5F // _
                 || c === 0x7E // ~
                 || c >= 0x30 && c <= 0x39 // 0-9
                 || c >= 0x41 && c <= 0x5A // a-z
                 || c >= 0x61 && c <= 0x7A // A-Z
                 || format === formats.RFC1738 && (c === 0x28 || c === 0x29) // ( )
                ) {
                    arr[arr.length] = segment.charAt(i);
                    continue;
                }
                if (c < 0x80) {
                    arr[arr.length] = hexTable[c];
                    continue;
                }
                if (c < 0x800) {
                    arr[arr.length] = hexTable[0xC0 | c >> 6] + hexTable[0x80 | c & 0x3F];
                    continue;
                }
                if (c < 0xD800 || c >= 0xE000) {
                    arr[arr.length] = hexTable[0xE0 | c >> 12] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
                    continue;
                }
                i += 1;
                c = 0x10000 + ((c & 0x3FF) << 10 | segment.charCodeAt(i) & 0x3FF);
                arr[arr.length] = hexTable[0xF0 | c >> 18] + hexTable[0x80 | c >> 12 & 0x3F] + hexTable[0x80 | c >> 6 & 0x3F] + hexTable[0x80 | c & 0x3F];
            }
            out += arr.join('');
        }
        return out;
    };
    var compact = function compact(value) {
        var queue = [
            {
                obj: {
                    o: value
                },
                prop: 'o'
            }
        ];
        var refs = [];
        for(var i = 0; i < queue.length; ++i){
            var item = queue[i];
            var obj = item.obj[item.prop];
            var keys = Object.keys(obj);
            for(var j = 0; j < keys.length; ++j){
                var key = keys[j];
                var val = obj[key];
                if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                    queue.push({
                        obj: obj,
                        prop: key
                    });
                    refs.push(val);
                }
            }
        }
        compactQueue(queue);
        return value;
    };
    var isRegExp = function isRegExp(obj) {
        return Object.prototype.toString.call(obj) === '[object RegExp]';
    };
    var isBuffer = function isBuffer(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    };
    var combine = function combine(a, b) {
        return [].concat(a, b);
    };
    var maybeMap = function maybeMap(val, fn) {
        if (isArray(val)) {
            var mapped = [];
            for(var i = 0; i < val.length; i += 1){
                mapped.push(fn(val[i]));
            }
            return mapped;
        }
        return fn(val);
    };
    utils = {
        arrayToObject: arrayToObject,
        assign: assign,
        combine: combine,
        compact: compact,
        decode: decode,
        encode: encode,
        isBuffer: isBuffer,
        isRegExp: isRegExp,
        maybeMap: maybeMap,
        merge: merge
    };
    return utils;
}

var stringify_1;
var hasRequiredStringify;
function requireStringify() {
    if (hasRequiredStringify) return stringify_1;
    hasRequiredStringify = 1;
    var getSideChannel = requireSideChannel();
    var utils = /*@__PURE__*/ requireUtils();
    var formats = /*@__PURE__*/ requireFormats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
            return prefix + '[]';
        },
        comma: 'comma',
        indices: function indices(prefix, key) {
            return prefix + '[' + key + ']';
        },
        repeat: function repeat(prefix) {
            return prefix;
        }
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = function(arr, valueOrArray) {
        push.apply(arr, isArray(valueOrArray) ? valueOrArray : [
            valueOrArray
        ]);
    };
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats['default'];
    var defaults = {
        addQueryPrefix: false,
        allowDots: false,
        allowEmptyArrays: false,
        arrayFormat: 'indices',
        charset: 'utf-8',
        charsetSentinel: false,
        commaRoundTrip: false,
        delimiter: '&',
        encode: true,
        encodeDotInKeys: false,
        encoder: utils.encode,
        encodeValuesOnly: false,
        filter: void undefined,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
            return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
    };
    var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
        return typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || typeof v === 'symbol' || typeof v === 'bigint';
    };
    var sentinel = {};
    var stringify = function stringify(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
        var obj = object;
        var tmpSc = sideChannel;
        var step = 0;
        var findFlag = false;
        while((tmpSc = tmpSc.get(sentinel)) !== void undefined && !findFlag){
            // Where object last appeared in the ref tree
            var pos = tmpSc.get(object);
            step += 1;
            if (typeof pos !== 'undefined') {
                if (pos === step) {
                    throw new RangeError('Cyclic object value');
                } else {
                    findFlag = true; // Break while
                }
            }
            if (typeof tmpSc.get(sentinel) === 'undefined') {
                step = 0;
            }
        }
        if (typeof filter === 'function') {
            obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
            obj = serializeDate(obj);
        } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
            obj = utils.maybeMap(obj, function(value) {
                if (value instanceof Date) {
                    return serializeDate(value);
                }
                return value;
            });
        }
        if (obj === null) {
            if (strictNullHandling) {
                return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key', format) : prefix;
            }
            obj = '';
        }
        if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
            if (encoder) {
                var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key', format);
                return [
                    formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value', format))
                ];
            }
            return [
                formatter(prefix) + '=' + formatter(String(obj))
            ];
        }
        var values = [];
        if (typeof obj === 'undefined') {
            return values;
        }
        var objKeys;
        if (generateArrayPrefix === 'comma' && isArray(obj)) {
            // we need to join elements in
            if (encodeValuesOnly && encoder) {
                obj = utils.maybeMap(obj, encoder);
            }
            objKeys = [
                {
                    value: obj.length > 0 ? obj.join(',') || null : void undefined
                }
            ];
        } else if (isArray(filter)) {
            objKeys = filter;
        } else {
            var keys = Object.keys(obj);
            objKeys = sort ? keys.sort(sort) : keys;
        }
        var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, '%2E') : String(prefix);
        var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + '[]' : encodedPrefix;
        if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
            return adjustedPrefix + '[]';
        }
        for(var j = 0; j < objKeys.length; ++j){
            var key = objKeys[j];
            var value = typeof key === 'object' && key && typeof key.value !== 'undefined' ? key.value : obj[key];
            if (skipNulls && value === null) {
                continue;
            }
            var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, '%2E') : String(key);
            var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? '.' + encodedKey : '[' + encodedKey + ']');
            sideChannel.set(object, step);
            var valueSideChannel = getSideChannel();
            valueSideChannel.set(sentinel, sideChannel);
            pushToArray(values, stringify(value, keyPrefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, generateArrayPrefix === 'comma' && encodeValuesOnly && isArray(obj) ? null : encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, valueSideChannel));
        }
        return values;
    };
    var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
        if (!opts) {
            return defaults;
        }
        if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
            throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
        }
        if (typeof opts.encodeDotInKeys !== 'undefined' && typeof opts.encodeDotInKeys !== 'boolean') {
            throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided');
        }
        if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
            throw new TypeError('Encoder has to be a function.');
        }
        var charset = opts.charset || defaults.charset;
        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }
        var format = formats['default'];
        if (typeof opts.format !== 'undefined') {
            if (!has.call(formats.formatters, opts.format)) {
                throw new TypeError('Unknown format option provided.');
            }
            format = opts.format;
        }
        var formatter = formats.formatters[format];
        var filter = defaults.filter;
        if (typeof opts.filter === 'function' || isArray(opts.filter)) {
            filter = opts.filter;
        }
        var arrayFormat;
        if (opts.arrayFormat in arrayPrefixGenerators) {
            arrayFormat = opts.arrayFormat;
        } else if ('indices' in opts) {
            arrayFormat = opts.indices ? 'indices' : 'repeat';
        } else {
            arrayFormat = defaults.arrayFormat;
        }
        if ('commaRoundTrip' in opts && typeof opts.commaRoundTrip !== 'boolean') {
            throw new TypeError('`commaRoundTrip` must be a boolean, or absent');
        }
        var allowDots = typeof opts.allowDots === 'undefined' ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
            addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
            allowDots: allowDots,
            allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
            arrayFormat: arrayFormat,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
            commaRoundTrip: !!opts.commaRoundTrip,
            delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
            encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
            encodeDotInKeys: typeof opts.encodeDotInKeys === 'boolean' ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
            encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
            encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
            filter: filter,
            format: format,
            formatter: formatter,
            serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
            skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
            sort: typeof opts.sort === 'function' ? opts.sort : null,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
        };
    };
    stringify_1 = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter;
        if (typeof options.filter === 'function') {
            filter = options.filter;
            obj = filter('', obj);
        } else if (isArray(options.filter)) {
            filter = options.filter;
            objKeys = filter;
        }
        var keys = [];
        if (typeof obj !== 'object' || obj === null) {
            return '';
        }
        var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
        var commaRoundTrip = generateArrayPrefix === 'comma' && options.commaRoundTrip;
        if (!objKeys) {
            objKeys = Object.keys(obj);
        }
        if (options.sort) {
            objKeys.sort(options.sort);
        }
        var sideChannel = getSideChannel();
        for(var i = 0; i < objKeys.length; ++i){
            var key = objKeys[i];
            var value = obj[key];
            if (options.skipNulls && value === null) {
                continue;
            }
            pushToArray(keys, stringify(value, key, generateArrayPrefix, commaRoundTrip, options.allowEmptyArrays, options.strictNullHandling, options.skipNulls, options.encodeDotInKeys, options.encode ? options.encoder : null, options.filter, options.sort, options.allowDots, options.serializeDate, options.format, options.formatter, options.encodeValuesOnly, options.charset, sideChannel));
        }
        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? '?' : '';
        if (options.charsetSentinel) {
            if (options.charset === 'iso-8859-1') {
                // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
                prefix += 'utf8=%26%2310003%3B&';
            } else {
                // encodeURIComponent('✓')
                prefix += 'utf8=%E2%9C%93&';
            }
        }
        return joined.length > 0 ? prefix + joined : '';
    };
    return stringify_1;
}

var parse;
var hasRequiredParse;
function requireParse() {
    if (hasRequiredParse) return parse;
    hasRequiredParse = 1;
    var utils = /*@__PURE__*/ requireUtils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
        allowDots: false,
        allowEmptyArrays: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: 'utf-8',
        charsetSentinel: false,
        comma: false,
        decodeDotInKeys: false,
        decoder: utils.decode,
        delimiter: '&',
        depth: 5,
        duplicates: 'combine',
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1000,
        parseArrays: true,
        plainObjects: false,
        strictDepth: false,
        strictNullHandling: false,
        throwOnLimitExceeded: false
    };
    var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, function($0, numberStr) {
            return String.fromCharCode(parseInt(numberStr, 10));
        });
    };
    var parseArrayValue = function(val, options, currentArrayLength) {
        if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
            return val.split(',');
        }
        if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
            throw new RangeError('Array limit exceeded. Only ' + options.arrayLimit + ' element' + (options.arrayLimit === 1 ? '' : 's') + ' allowed in an array.');
        }
        return val;
    };
    // This is what browsers will submit when the ✓ character occurs in an
    // application/x-www-form-urlencoded body and the encoding of the page containing
    // the form is iso-8859-1, or when the submitted form has an accept-charset
    // attribute of iso-8859-1. Presumably also with other charsets that do not contain
    // the ✓ character, such as us-ascii.
    var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')
    // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
    var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')
    var parseValues = function parseQueryStringValues(str, options) {
        var obj = {
            __proto__: null
        };
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
        cleanStr = cleanStr.replace(/%5B/gi, '[').replace(/%5D/gi, ']');
        var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
        var parts = cleanStr.split(options.delimiter, options.throwOnLimitExceeded ? limit + 1 : limit);
        if (options.throwOnLimitExceeded && parts.length > limit) {
            throw new RangeError('Parameter limit exceeded. Only ' + limit + ' parameter' + (limit === 1 ? '' : 's') + ' allowed.');
        }
        var skipIndex = -1; // Keep track of where the utf8 sentinel was found
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) {
            for(i = 0; i < parts.length; ++i){
                if (parts[i].indexOf('utf8=') === 0) {
                    if (parts[i] === charsetSentinel) {
                        charset = 'utf-8';
                    } else if (parts[i] === isoSentinel) {
                        charset = 'iso-8859-1';
                    }
                    skipIndex = i;
                    i = parts.length; // The eslint settings do not allow break;
                }
            }
        }
        for(i = 0; i < parts.length; ++i){
            if (i === skipIndex) {
                continue;
            }
            var part = parts[i];
            var bracketEqualsPos = part.indexOf(']=');
            var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;
            var key;
            var val;
            if (pos === -1) {
                key = options.decoder(part, defaults.decoder, charset, 'key');
                val = options.strictNullHandling ? null : '';
            } else {
                key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
                val = utils.maybeMap(parseArrayValue(part.slice(pos + 1), options, isArray(obj[key]) ? obj[key].length : 0), function(encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                });
            }
            if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
                val = interpretNumericEntities(String(val));
            }
            if (part.indexOf('[]=') > -1) {
                val = isArray(val) ? [
                    val
                ] : val;
            }
            var existing = has.call(obj, key);
            if (existing && options.duplicates === 'combine') {
                obj[key] = utils.combine(obj[key], val);
            } else if (!existing || options.duplicates === 'last') {
                obj[key] = val;
            }
        }
        return obj;
    };
    var parseObject = function(chain, val, options, valuesParsed) {
        var currentArrayLength = 0;
        if (chain.length > 0 && chain[chain.length - 1] === '[]') {
            var parentKey = chain.slice(0, -1).join('');
            currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
        }
        var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
        for(var i = chain.length - 1; i >= 0; --i){
            var obj;
            var root = chain[i];
            if (root === '[]' && options.parseArrays) {
                obj = options.allowEmptyArrays && (leaf === '' || options.strictNullHandling && leaf === null) ? [] : utils.combine([], leaf);
            } else {
                obj = options.plainObjects ? {
                    __proto__: null
                } : {};
                var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
                var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, '.') : cleanRoot;
                var index = parseInt(decodedRoot, 10);
                if (!options.parseArrays && decodedRoot === '') {
                    obj = {
                        0: leaf
                    };
                } else if (!isNaN(index) && root !== decodedRoot && String(index) === decodedRoot && index >= 0 && options.parseArrays && index <= options.arrayLimit) {
                    obj = [];
                    obj[index] = leaf;
                } else if (decodedRoot !== '__proto__') {
                    obj[decodedRoot] = leaf;
                }
            }
            leaf = obj;
        }
        return leaf;
    };
    var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
            return;
        }
        // Transform dot notation to bracket notation
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;
        // The regex chunks
        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;
        // Get the parent
        var segment = options.depth > 0 && brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;
        // Stash the parent if it exists
        var keys = [];
        if (parent) {
            // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
            if (!options.plainObjects && has.call(Object.prototype, parent)) {
                if (!options.allowPrototypes) {
                    return;
                }
            }
            keys.push(parent);
        }
        // Loop through children appending to the array until we hit depth
        var i = 0;
        while(options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth){
            i += 1;
            if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
                if (!options.allowPrototypes) {
                    return;
                }
            }
            keys.push(segment[1]);
        }
        // If there's a remainder, check strictDepth option for throw, else just add whatever is left
        if (segment) {
            if (options.strictDepth === true) {
                throw new RangeError('Input depth exceeded depth option of ' + options.depth + ' and strictDepth is true');
            }
            keys.push('[' + key.slice(segment.index) + ']');
        }
        return parseObject(keys, val, options, valuesParsed);
    };
    var normalizeParseOptions = function normalizeParseOptions(opts) {
        if (!opts) {
            return defaults;
        }
        if (typeof opts.allowEmptyArrays !== 'undefined' && typeof opts.allowEmptyArrays !== 'boolean') {
            throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided');
        }
        if (typeof opts.decodeDotInKeys !== 'undefined' && typeof opts.decodeDotInKeys !== 'boolean') {
            throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided');
        }
        if (opts.decoder !== null && typeof opts.decoder !== 'undefined' && typeof opts.decoder !== 'function') {
            throw new TypeError('Decoder has to be a function.');
        }
        if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
            throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        }
        if (typeof opts.throwOnLimitExceeded !== 'undefined' && typeof opts.throwOnLimitExceeded !== 'boolean') {
            throw new TypeError('`throwOnLimitExceeded` option must be a boolean');
        }
        var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;
        var duplicates = typeof opts.duplicates === 'undefined' ? defaults.duplicates : opts.duplicates;
        if (duplicates !== 'combine' && duplicates !== 'first' && duplicates !== 'last') {
            throw new TypeError('The duplicates option must be either combine, first, or last');
        }
        var allowDots = typeof opts.allowDots === 'undefined' ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
            allowDots: allowDots,
            allowEmptyArrays: typeof opts.allowEmptyArrays === 'boolean' ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
            allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
            allowSparse: typeof opts.allowSparse === 'boolean' ? opts.allowSparse : defaults.allowSparse,
            arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
            charset: charset,
            charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
            comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
            decodeDotInKeys: typeof opts.decodeDotInKeys === 'boolean' ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
            decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
            delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
            // eslint-disable-next-line no-implicit-coercion, no-extra-parens
            depth: typeof opts.depth === 'number' || opts.depth === false ? +opts.depth : defaults.depth,
            duplicates: duplicates,
            ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
            interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
            parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
            parseArrays: opts.parseArrays !== false,
            plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
            strictDepth: typeof opts.strictDepth === 'boolean' ? !!opts.strictDepth : defaults.strictDepth,
            strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling,
            throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === 'boolean' ? opts.throwOnLimitExceeded : false
        };
    };
    parse = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === '' || str === null || typeof str === 'undefined') {
            return options.plainObjects ? {
                __proto__: null
            } : {};
        }
        var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
        var obj = options.plainObjects ? {
            __proto__: null
        } : {};
        // Iterate over the keys and setup the new object
        var keys = Object.keys(tempObj);
        for(var i = 0; i < keys.length; ++i){
            var key = keys[i];
            var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
            obj = utils.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) {
            return obj;
        }
        return utils.compact(obj);
    };
    return parse;
}

var lib;
var hasRequiredLib;
function requireLib() {
    if (hasRequiredLib) return lib;
    hasRequiredLib = 1;
    var stringify = /*@__PURE__*/ requireStringify();
    var parse = /*@__PURE__*/ requireParse();
    var formats = /*@__PURE__*/ requireFormats();
    lib = {
        formats: formats,
        parse: parse,
        stringify: stringify
    };
    return lib;
}

var libExports = /*@__PURE__*/ requireLib();

const OPTIONS_KEYS = [
    'apiKey',
    'idempotencyKey',
    'stripeAccount',
    'apiVersion',
    'maxNetworkRetries',
    'timeout',
    'host',
    'authenticator',
    'stripeContext',
    'additionalHeaders'
];
function isOptionsHash(o) {
    return o && typeof o === 'object' && OPTIONS_KEYS.some((prop)=>Object.prototype.hasOwnProperty.call(o, prop));
}
/**
 * Stringifies an Object, accommodating nested objects
 * (forming the conventional key 'parent[child]=value')
 */ function queryStringifyRequestData(data, apiMode) {
    return libExports.stringify(data, {
        serializeDate: (d)=>Math.floor(d.getTime() / 1000).toString(),
        arrayFormat: apiMode == 'v2' ? 'repeat' : 'indices'
    })// Don't use strict form encoding by changing the square bracket control
    // characters back to their literals. This is fine by the server, and
    // makes these parameter strings easier to read.
    .replace(/%5B/g, '[').replace(/%5D/g, ']');
}
/**
 * Outputs a new function with interpolated object property values.
 * Use like so:
 *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
 *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
 */ const makeURLInterpolator = (()=>{
    const rc = {
        '\n': '\\n',
        '"': '\\"',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029'
    };
    return (str)=>{
        const cleanString = str.replace(/["\n\r\u2028\u2029]/g, ($0)=>rc[$0]);
        return (outputs)=>{
            return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1)=>// @ts-ignore
                encodeURIComponent(outputs[$1] || ''));
        };
    };
})();
function extractUrlParams(path) {
    const params = path.match(/\{\w+\}/g);
    if (!params) {
        return [];
    }
    return params.map((param)=>param.replace(/[{}]/g, ''));
}
/**
 * Return the data argument from a list of arguments
 *
 * @param {object[]} args
 * @returns {object}
 */ function getDataFromArgs(args) {
    if (!Array.isArray(args) || !args[0] || typeof args[0] !== 'object') {
        return {};
    }
    if (!isOptionsHash(args[0])) {
        return args.shift();
    }
    const argKeys = Object.keys(args[0]);
    const optionKeysInArgs = argKeys.filter((key)=>OPTIONS_KEYS.includes(key));
    // In some cases options may be the provided as the first argument.
    // Here we're detecting a case where there are two distinct arguments
    // (the first being args and the second options) and with known
    // option keys in the first so that we can warn the user about it.
    if (optionKeysInArgs.length > 0 && optionKeysInArgs.length !== argKeys.length) {
        emitWarning(`Options found in arguments (${optionKeysInArgs.join(', ')}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options.`);
    }
    return {};
}
/**
 * Return the options hash from a list of arguments
 */ function getOptionsFromArgs(args) {
    const opts = {
        host: null,
        headers: {},
        settings: {}
    };
    if (args.length > 0) {
        const arg = args[args.length - 1];
        if (typeof arg === 'string') {
            opts.authenticator = createApiKeyAuthenticator(args.pop());
        } else if (isOptionsHash(arg)) {
            const params = Object.assign({}, args.pop());
            const extraKeys = Object.keys(params).filter((key)=>!OPTIONS_KEYS.includes(key));
            if (extraKeys.length) {
                emitWarning(`Invalid options found (${extraKeys.join(', ')}); ignoring.`);
            }
            if (params.apiKey) {
                opts.authenticator = createApiKeyAuthenticator(params.apiKey);
            }
            if (params.idempotencyKey) {
                opts.headers['Idempotency-Key'] = params.idempotencyKey;
            }
            if (params.stripeAccount) {
                opts.headers['Stripe-Account'] = params.stripeAccount;
            }
            if (params.stripeContext) {
                if (opts.headers['Stripe-Account']) {
                    throw new Error("Can't specify both stripeAccount and stripeContext.");
                }
                opts.headers['Stripe-Context'] = params.stripeContext;
            }
            if (params.apiVersion) {
                opts.headers['Stripe-Version'] = params.apiVersion;
            }
            if (Number.isInteger(params.maxNetworkRetries)) {
                opts.settings.maxNetworkRetries = params.maxNetworkRetries;
            }
            if (Number.isInteger(params.timeout)) {
                opts.settings.timeout = params.timeout;
            }
            if (params.host) {
                opts.host = params.host;
            }
            if (params.authenticator) {
                if (params.apiKey) {
                    throw new Error("Can't specify both apiKey and authenticator.");
                }
                if (typeof params.authenticator !== 'function') {
                    throw new Error('The authenticator must be a function ' + 'receiving a request as the first parameter.');
                }
                opts.authenticator = params.authenticator;
            }
            if (params.additionalHeaders) {
                opts.headers = params.additionalHeaders;
            }
        }
    }
    return opts;
}
/**
 * Provide simple "Class" extension mechanism.
 * <!-- Public API accessible via Stripe.StripeResource.extend -->
 */ function protoExtend(sub) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Super = this;
    const Constructor = Object.prototype.hasOwnProperty.call(sub, 'constructor') ? sub.constructor : function(...args) {
        Super.apply(this, args);
    };
    // This initialization logic is somewhat sensitive to be compatible with
    // divergent JS implementations like the one found in Qt. See here for more
    // context:
    //
    // https://github.com/stripe/stripe-node/pull/334
    Object.assign(Constructor, Super);
    Constructor.prototype = Object.create(Super.prototype);
    Object.assign(Constructor.prototype, sub);
    return Constructor;
}
/**
 * Remove empty values from an object
 */ function removeNullish(obj) {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }
    return Object.keys(obj).reduce((result, key)=>{
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}
/**
 * Normalize standard HTTP Headers:
 * {'foo-bar': 'hi'}
 * becomes
 * {'Foo-Bar': 'hi'}
 */ function normalizeHeaders(obj) {
    if (!(obj && typeof obj === 'object')) {
        return obj;
    }
    return Object.keys(obj).reduce((result, header)=>{
        result[normalizeHeader(header)] = obj[header];
        return result;
    }, {});
}
/**
 * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
 * without the exceptions which are irrelevant to us.
 */ function normalizeHeader(header) {
    return header.split('-').map((text)=>text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()).join('-');
}
function callbackifyPromiseWithTimeout(promise, callback) {
    if (callback) {
        // Ensure callback is called outside of promise stack.
        return promise.then((res)=>{
            setTimeout(()=>{
                callback(null, res);
            }, 0);
        }, (err)=>{
            setTimeout(()=>{
                callback(err, null);
            }, 0);
        });
    }
    return promise;
}
/**
 * Allow for special capitalization cases (such as OAuth)
 */ function pascalToCamelCase(name) {
    if (name === 'OAuth') {
        return 'oauth';
    } else {
        return name[0].toLowerCase() + name.substring(1);
    }
}
function emitWarning(warning) {
    if (typeof process.emitWarning !== 'function') {
        return console.warn(`Stripe: ${warning}`); /* eslint-disable-line no-console */ 
    }
    return process.emitWarning(warning, 'Stripe');
}
function isObject(obj) {
    const type = typeof obj;
    return (type === 'function' || type === 'object') && !!obj;
}
// For use in multipart requests
function flattenAndStringify(data) {
    const result = {};
    const step = (obj, prevKey)=>{
        Object.entries(obj).forEach(([key, value])=>{
            const newKey = prevKey ? `${prevKey}[${key}]` : key;
            if (isObject(value)) {
                if (!(value instanceof Uint8Array) && !Object.prototype.hasOwnProperty.call(value, 'data')) {
                    // Non-buffer non-file Objects are recursively flattened
                    return step(value, newKey);
                } else {
                    // Buffers and file objects are stored without modification
                    result[newKey] = value;
                }
            } else {
                // Primitives are converted to strings
                result[newKey] = String(value);
            }
        });
    };
    step(data, null);
    return result;
}
function validateInteger(name, n, defaultVal) {
    if (!Number.isInteger(n)) {
        if (defaultVal !== undefined) {
            return defaultVal;
        } else {
            throw new Error(`${name} must be an integer`);
        }
    }
    return n;
}
function determineProcessUserAgentProperties() {
    return typeof process === 'undefined' ? {} : {
        lang_version: process.version,
        platform: process.platform
    };
}
function createApiKeyAuthenticator(apiKey) {
    const authenticator = (request)=>{
        request.headers.Authorization = 'Bearer ' + apiKey;
        return Promise.resolve();
    };
    // For testing
    authenticator._apiKey = apiKey;
    return authenticator;
}
/**
 * Replaces Date objects with Unix timestamps
 */ function dateTimeReplacer(key, value) {
    if (this[key] instanceof Date) {
        return Math.floor(this[key].getTime() / 1000).toString();
    }
    return value;
}
/**
 * JSON stringifies an Object, replacing Date objects with Unix timestamps
 */ function jsonStringifyRequestData(data) {
    return JSON.stringify(data, dateTimeReplacer);
}
/**
 * Inspects the given path to determine if the endpoint is for v1 or v2 API
 */ function getAPIMode(path) {
    if (!path) {
        return 'v1';
    }
    return path.startsWith('/v2') ? 'v2' : 'v1';
}

const MAX_RETRY_AFTER_WAIT = 60;
class RequestSender {
    _addHeadersDirectlyToObject(obj, headers) {
        // For convenience, make some headers easily accessible on
        // lastResponse.
        // NOTE: Stripe responds with lowercase header names/keys.
        obj.requestId = headers['request-id'];
        obj.stripeAccount = obj.stripeAccount || headers['stripe-account'];
        obj.apiVersion = obj.apiVersion || headers['stripe-version'];
        obj.idempotencyKey = obj.idempotencyKey || headers['idempotency-key'];
    }
    _makeResponseEvent(requestEvent, statusCode, headers) {
        const requestEndTime = Date.now();
        const requestDurationMs = requestEndTime - requestEvent.request_start_time;
        return removeNullish({
            api_version: headers['stripe-version'],
            account: headers['stripe-account'],
            idempotency_key: headers['idempotency-key'],
            method: requestEvent.method,
            path: requestEvent.path,
            status: statusCode,
            request_id: this._getRequestId(headers),
            elapsed: requestDurationMs,
            request_start_time: requestEvent.request_start_time,
            request_end_time: requestEndTime
        });
    }
    _getRequestId(headers) {
        return headers['request-id'];
    }
    /**
     * Used by methods with spec.streaming === true. For these methods, we do not
     * buffer successful responses into memory or do parse them into stripe
     * objects, we delegate that all of that to the user and pass back the raw
     * http.Response object to the callback.
     *
     * (Unsuccessful responses shouldn't make it here, they should
     * still be buffered/parsed and handled by _jsonResponseHandler -- see
     * makeRequest)
     */ _streamingResponseHandler(requestEvent, usage, callback) {
        return (res)=>{
            const headers = res.getHeaders();
            const streamCompleteCallback = ()=>{
                const responseEvent = this._makeResponseEvent(requestEvent, res.getStatusCode(), headers);
                this._stripe._emitter.emit('response', responseEvent);
                this._recordRequestMetrics(this._getRequestId(headers), responseEvent.elapsed, usage);
            };
            const stream = res.toStream(streamCompleteCallback);
            // This is here for backwards compatibility, as the stream is a raw
            // HTTP response in Node and the legacy behavior was to mutate this
            // response.
            this._addHeadersDirectlyToObject(stream, headers);
            return callback(null, stream);
        };
    }
    /**
     * Default handler for Stripe responses. Buffers the response into memory,
     * parses the JSON and returns it (i.e. passes it to the callback) if there
     * is no "error" field. Otherwise constructs/passes an appropriate Error.
     */ _jsonResponseHandler(requestEvent, apiMode, usage, callback) {
        return (res)=>{
            const headers = res.getHeaders();
            const requestId = this._getRequestId(headers);
            const statusCode = res.getStatusCode();
            const responseEvent = this._makeResponseEvent(requestEvent, statusCode, headers);
            this._stripe._emitter.emit('response', responseEvent);
            res.toJSON().then((jsonResponse)=>{
                if (jsonResponse.error) {
                    let err;
                    // Convert OAuth error responses into a standard format
                    // so that the rest of the error logic can be shared
                    if (typeof jsonResponse.error === 'string') {
                        jsonResponse.error = {
                            type: jsonResponse.error,
                            message: jsonResponse.error_description
                        };
                    }
                    jsonResponse.error.headers = headers;
                    jsonResponse.error.statusCode = statusCode;
                    jsonResponse.error.requestId = requestId;
                    if (statusCode === 401) {
                        err = new StripeAuthenticationError(jsonResponse.error);
                    } else if (statusCode === 403) {
                        err = new StripePermissionError(jsonResponse.error);
                    } else if (statusCode === 429) {
                        err = new StripeRateLimitError(jsonResponse.error);
                    } else if (apiMode === 'v2') {
                        err = generateV2Error(jsonResponse.error);
                    } else {
                        err = generateV1Error(jsonResponse.error);
                    }
                    throw err;
                }
                return jsonResponse;
            }, (e)=>{
                throw new StripeAPIError({
                    message: 'Invalid JSON received from the Stripe API',
                    exception: e,
                    requestId: headers['request-id']
                });
            }).then((jsonResponse)=>{
                this._recordRequestMetrics(requestId, responseEvent.elapsed, usage);
                // Expose raw response object.
                const rawResponse = res.getRawResponse();
                this._addHeadersDirectlyToObject(rawResponse, headers);
                Object.defineProperty(jsonResponse, 'lastResponse', {
                    enumerable: false,
                    writable: false,
                    value: rawResponse
                });
                callback(null, jsonResponse);
            }, (e)=>callback(e, null));
        };
    }
    static _generateConnectionErrorMessage(requestRetries) {
        return `An error occurred with our connection to Stripe.${requestRetries > 0 ? ` Request was retried ${requestRetries} times.` : ''}`;
    }
    // For more on when and how to retry API requests, see https://stripe.com/docs/error-handling#safely-retrying-requests-with-idempotency
    static _shouldRetry(res, numRetries, maxRetries, error) {
        if (error && numRetries === 0 && HttpClient.CONNECTION_CLOSED_ERROR_CODES.includes(error.code)) {
            return true;
        }
        // Do not retry if we are out of retries.
        if (numRetries >= maxRetries) {
            return false;
        }
        // Retry on connection error.
        if (!res) {
            return true;
        }
        // The API may ask us not to retry (e.g., if doing so would be a no-op)
        // or advise us to retry (e.g., in cases of lock timeouts); we defer to that.
        if (res.getHeaders()['stripe-should-retry'] === 'false') {
            return false;
        }
        if (res.getHeaders()['stripe-should-retry'] === 'true') {
            return true;
        }
        // Retry on conflict errors.
        if (res.getStatusCode() === 409) {
            return true;
        }
        // Retry on 500, 503, and other internal errors.
        //
        // Note that we expect the stripe-should-retry header to be false
        // in most cases when a 500 is returned, since our idempotency framework
        // would typically replay it anyway.
        if (res.getStatusCode() >= 500) {
            return true;
        }
        return false;
    }
    _getSleepTimeInMS(numRetries, retryAfter = null) {
        const initialNetworkRetryDelay = this._stripe.getInitialNetworkRetryDelay();
        const maxNetworkRetryDelay = this._stripe.getMaxNetworkRetryDelay();
        // Apply exponential backoff with initialNetworkRetryDelay on the
        // number of numRetries so far as inputs. Do not allow the number to exceed
        // maxNetworkRetryDelay.
        let sleepSeconds = Math.min(initialNetworkRetryDelay * Math.pow(2, numRetries - 1), maxNetworkRetryDelay);
        // Apply some jitter by randomizing the value in the range of
        // (sleepSeconds / 2) to (sleepSeconds).
        sleepSeconds *= 0.5 * (1 + Math.random());
        // But never sleep less than the base sleep seconds.
        sleepSeconds = Math.max(initialNetworkRetryDelay, sleepSeconds);
        // And never sleep less than the time the API asks us to wait, assuming it's a reasonable ask.
        if (Number.isInteger(retryAfter) && retryAfter <= MAX_RETRY_AFTER_WAIT) {
            sleepSeconds = Math.max(sleepSeconds, retryAfter);
        }
        return sleepSeconds * 1000;
    }
    // Max retries can be set on a per request basis. Favor those over the global setting
    _getMaxNetworkRetries(settings = {}) {
        return settings.maxNetworkRetries !== undefined && Number.isInteger(settings.maxNetworkRetries) ? settings.maxNetworkRetries : this._stripe.getMaxNetworkRetries();
    }
    _defaultIdempotencyKey(method, settings, apiMode) {
        // If this is a POST and we allow multiple retries, ensure an idempotency key.
        const maxRetries = this._getMaxNetworkRetries(settings);
        const genKey = ()=>`stripe-node-retry-${this._stripe._platformFunctions.uuid4()}`;
        // more verbose than it needs to be, but gives clear separation between V1 and V2 behavior
        if (apiMode === 'v2') {
            if (method === 'POST' || method === 'DELETE') {
                return genKey();
            }
        } else if (apiMode === 'v1') {
            if (method === 'POST' && maxRetries > 0) {
                return genKey();
            }
        }
        return null;
    }
    _makeHeaders({ contentType, contentLength, apiVersion, clientUserAgent, method, userSuppliedHeaders, userSuppliedSettings, stripeAccount, stripeContext, apiMode }) {
        const defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': contentType,
            'User-Agent': this._getUserAgentString(apiMode),
            'X-Stripe-Client-User-Agent': clientUserAgent,
            'X-Stripe-Client-Telemetry': this._getTelemetryHeader(),
            'Stripe-Version': apiVersion,
            'Stripe-Account': stripeAccount,
            'Stripe-Context': stripeContext,
            'Idempotency-Key': this._defaultIdempotencyKey(method, userSuppliedSettings, apiMode)
        };
        // As per https://datatracker.ietf.org/doc/html/rfc7230#section-3.3.2:
        //   A user agent SHOULD send a Content-Length in a request message when
        //   no Transfer-Encoding is sent and the request method defines a meaning
        //   for an enclosed payload body.  For example, a Content-Length header
        //   field is normally sent in a POST request even when the value is 0
        //   (indicating an empty payload body).  A user agent SHOULD NOT send a
        //   Content-Length header field when the request message does not contain
        //   a payload body and the method semantics do not anticipate such a
        //   body.
        //
        // These method types are expected to have bodies and so we should always
        // include a Content-Length.
        const methodHasPayload = method == 'POST' || method == 'PUT' || method == 'PATCH';
        // If a content length was specified, we always include it regardless of
        // whether the method semantics anticipate such a body. This keeps us
        // consistent with historical behavior. We do however want to warn on this
        // and fix these cases as they are semantically incorrect.
        if (methodHasPayload || contentLength) {
            if (!methodHasPayload) {
                emitWarning(`${method} method had non-zero contentLength but no payload is expected for this verb`);
            }
            defaultHeaders['Content-Length'] = contentLength;
        }
        return Object.assign(removeNullish(defaultHeaders), // If the user supplied, say 'idempotency-key', override instead of appending by ensuring caps are the same.
        normalizeHeaders(userSuppliedHeaders));
    }
    _getUserAgentString(apiMode) {
        const packageVersion = this._stripe.getConstant('PACKAGE_VERSION');
        const appInfo = this._stripe._appInfo ? this._stripe.getAppInfoAsString() : '';
        return `Stripe/${apiMode} NodeBindings/${packageVersion} ${appInfo}`.trim();
    }
    _getTelemetryHeader() {
        if (this._stripe.getTelemetryEnabled() && this._stripe._prevRequestMetrics.length > 0) {
            const metrics = this._stripe._prevRequestMetrics.shift();
            return JSON.stringify({
                last_request_metrics: metrics
            });
        }
    }
    _recordRequestMetrics(requestId, requestDurationMs, usage) {
        if (this._stripe.getTelemetryEnabled() && requestId) {
            if (this._stripe._prevRequestMetrics.length > this._maxBufferedRequestMetric) {
                emitWarning('Request metrics buffer is full, dropping telemetry message.');
            } else {
                const m = {
                    request_id: requestId,
                    request_duration_ms: requestDurationMs
                };
                if (usage && usage.length > 0) {
                    m.usage = usage;
                }
                this._stripe._prevRequestMetrics.push(m);
            }
        }
    }
    _rawRequest(method, path, params, options) {
        const requestPromise = new Promise((resolve, reject)=>{
            let opts;
            try {
                const requestMethod = method.toUpperCase();
                if (requestMethod !== 'POST' && params && Object.keys(params).length !== 0) {
                    throw new Error('rawRequest only supports params on POST requests. Please pass null and add your parameters to path.');
                }
                const args = [].slice.call([
                    params,
                    options
                ]);
                // Pull request data and options (headers, auth) from args.
                const dataFromArgs = getDataFromArgs(args);
                const data = Object.assign({}, dataFromArgs);
                const calculatedOptions = getOptionsFromArgs(args);
                const headers = calculatedOptions.headers;
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const authenticator = calculatedOptions.authenticator;
                opts = {
                    requestMethod,
                    requestPath: path,
                    bodyData: data,
                    queryData: {},
                    authenticator,
                    headers,
                    host: null,
                    streaming: false,
                    settings: {},
                    usage: [
                        'raw_request'
                    ]
                };
            } catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(response);
                }
            }
            const { headers, settings } = opts;
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const authenticator = opts.authenticator;
            this._request(opts.requestMethod, opts.host, path, opts.bodyData, authenticator, {
                headers,
                settings,
                streaming: opts.streaming
            }, opts.usage, requestCallback);
        });
        return requestPromise;
    }
    _request(method, host, path, data, authenticator, options, usage = [], callback, requestDataProcessor = null) {
        var _a;
        let requestData;
        authenticator = (_a = authenticator !== null && authenticator !== void 0 ? authenticator : this._stripe._authenticator) !== null && _a !== void 0 ? _a : null;
        const apiMode = getAPIMode(path);
        const retryRequest = (requestFn, apiVersion, headers, requestRetries, retryAfter)=>{
            return setTimeout(requestFn, this._getSleepTimeInMS(requestRetries, retryAfter), apiVersion, headers, requestRetries + 1);
        };
        const makeRequest = (apiVersion, headers, numRetries)=>{
            // timeout can be set on a per-request basis. Favor that over the global setting
            const timeout = options.settings && options.settings.timeout && Number.isInteger(options.settings.timeout) && options.settings.timeout >= 0 ? options.settings.timeout : this._stripe.getApiField('timeout');
            const request = {
                host: host || this._stripe.getApiField('host'),
                port: this._stripe.getApiField('port'),
                path: path,
                method: method,
                headers: Object.assign({}, headers),
                body: requestData,
                protocol: this._stripe.getApiField('protocol')
            };
            authenticator(request).then(()=>{
                const req = this._stripe.getApiField('httpClient').makeRequest(request.host, request.port, request.path, request.method, request.headers, request.body, request.protocol, timeout);
                const requestStartTime = Date.now();
                // @ts-ignore
                const requestEvent = removeNullish({
                    api_version: apiVersion,
                    account: headers['Stripe-Account'],
                    idempotency_key: headers['Idempotency-Key'],
                    method,
                    path,
                    request_start_time: requestStartTime
                });
                const requestRetries = numRetries || 0;
                const maxRetries = this._getMaxNetworkRetries(options.settings || {});
                this._stripe._emitter.emit('request', requestEvent);
                req.then((res)=>{
                    if (RequestSender._shouldRetry(res, requestRetries, maxRetries)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, // @ts-ignore
                        res.getHeaders()['retry-after']);
                    } else if (options.streaming && res.getStatusCode() < 400) {
                        return this._streamingResponseHandler(requestEvent, usage, callback)(res);
                    } else {
                        return this._jsonResponseHandler(requestEvent, apiMode, usage, callback)(res);
                    }
                }).catch((error)=>{
                    if (RequestSender._shouldRetry(null, requestRetries, maxRetries, error)) {
                        return retryRequest(makeRequest, apiVersion, headers, requestRetries, null);
                    } else {
                        const isTimeoutError = error.code && error.code === HttpClient.TIMEOUT_ERROR_CODE;
                        return callback(new StripeConnectionError({
                            message: isTimeoutError ? `Request aborted due to timeout being reached (${timeout}ms)` : RequestSender._generateConnectionErrorMessage(requestRetries),
                            // @ts-ignore
                            detail: error
                        }));
                    }
                });
            }).catch((e)=>{
                throw new StripeError({
                    message: 'Unable to authenticate the request',
                    exception: e
                });
            });
        };
        const prepareAndMakeRequest = (error, data)=>{
            if (error) {
                return callback(error);
            }
            requestData = data;
            this._stripe.getClientUserAgent((clientUserAgent)=>{
                const apiVersion = this._stripe.getApiField('version');
                const headers = this._makeHeaders({
                    contentType: apiMode == 'v2' ? 'application/json' : 'application/x-www-form-urlencoded',
                    contentLength: requestData.length,
                    apiVersion: apiVersion,
                    clientUserAgent,
                    method,
                    userSuppliedHeaders: options.headers,
                    userSuppliedSettings: options.settings,
                    stripeAccount: apiMode == 'v2' ? null : this._stripe.getApiField('stripeAccount'),
                    stripeContext: apiMode == 'v2' ? this._stripe.getApiField('stripeContext') : null,
                    apiMode: apiMode
                });
                makeRequest(apiVersion, headers, 0);
            });
        };
        if (requestDataProcessor) {
            requestDataProcessor(method, data, options.headers, prepareAndMakeRequest);
        } else {
            let stringifiedData;
            if (apiMode == 'v2') {
                stringifiedData = data ? jsonStringifyRequestData(data) : '';
            } else {
                stringifiedData = queryStringifyRequestData(data || {}, apiMode);
            }
            prepareAndMakeRequest(null, stringifiedData);
        }
    }
    constructor(stripe, maxBufferedRequestMetric){
        this._stripe = stripe;
        this._maxBufferedRequestMetric = maxBufferedRequestMetric;
    }
}

class V1Iterator {
    async iterate(pageResult) {
        if (!(pageResult && pageResult.data && typeof pageResult.data.length === 'number')) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `data` array.');
        }
        const reverseIteration = isReverseIteration(this.requestArgs);
        if (this.index < pageResult.data.length) {
            const idx = reverseIteration ? pageResult.data.length - 1 - this.index : this.index;
            const value = pageResult.data[idx];
            this.index += 1;
            return {
                value,
                done: false
            };
        } else if (pageResult.has_more) {
            // Reset counter, request next page, and recurse.
            this.index = 0;
            this.pagePromise = this.getNextPage(pageResult);
            const nextPageResult = await this.pagePromise;
            return this.iterate(nextPageResult);
        }
        return {
            done: true,
            value: undefined
        };
    }
    /** @abstract */ getNextPage(_pageResult) {
        throw new Error('Unimplemented');
    }
    async _next() {
        return this.iterate(await this.pagePromise);
    }
    next() {
        /**
         * If a user calls `.next()` multiple times in parallel,
         * return the same result until something has resolved
         * to prevent page-turning race conditions.
         */ if (this.promiseCache.currentPromise) {
            return this.promiseCache.currentPromise;
        }
        const nextPromise = (async ()=>{
            const ret = await this._next();
            this.promiseCache.currentPromise = null;
            return ret;
        })();
        this.promiseCache.currentPromise = nextPromise;
        return nextPromise;
    }
    constructor(firstPagePromise, requestArgs, spec, stripeResource){
        this.index = 0;
        this.pagePromise = firstPagePromise;
        this.promiseCache = {
            currentPromise: null
        };
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
}
class V1ListIterator extends V1Iterator {
    getNextPage(pageResult) {
        const reverseIteration = isReverseIteration(this.requestArgs);
        const lastId = getLastId(pageResult, reverseIteration);
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            [reverseIteration ? 'ending_before' : 'starting_after']: lastId
        });
    }
}
class V1SearchIterator extends V1Iterator {
    getNextPage(pageResult) {
        if (!pageResult.next_page) {
            throw Error('Unexpected: Stripe API response does not have a well-formed `next_page` field, but `has_more` was true.');
        }
        return this.stripeResource._makeRequest(this.requestArgs, this.spec, {
            page: pageResult.next_page
        });
    }
}
class V2ListIterator {
    async turnPage() {
        const nextPageUrl = await this.nextPageUrl;
        if (!nextPageUrl) return null;
        this.spec.fullPath = nextPageUrl;
        const page = await this.stripeResource._makeRequest([], this.spec, {});
        this.nextPageUrl = Promise.resolve(page.next_page_url);
        this.currentPageIterator = Promise.resolve(page.data[Symbol.iterator]());
        return this.currentPageIterator;
    }
    async next() {
        {
            const result = (await this.currentPageIterator).next();
            if (!result.done) return {
                done: false,
                value: result.value
            };
        }
        const nextPageIterator = await this.turnPage();
        if (!nextPageIterator) {
            return {
                done: true,
                value: undefined
            };
        }
        const result = nextPageIterator.next();
        if (!result.done) return {
            done: false,
            value: result.value
        };
        return {
            done: true,
            value: undefined
        };
    }
    constructor(firstPagePromise, requestArgs, spec, stripeResource){
        this.currentPageIterator = (async ()=>{
            const page = await firstPagePromise;
            return page.data[Symbol.iterator]();
        })();
        this.nextPageUrl = (async ()=>{
            const page = await firstPagePromise;
            return page.next_page_url || null;
        })();
        this.requestArgs = requestArgs;
        this.spec = spec;
        this.stripeResource = stripeResource;
    }
}
const makeAutoPaginationMethods = (stripeResource, requestArgs, spec, firstPagePromise)=>{
    const apiMode = getAPIMode(spec.fullPath || spec.path);
    if (apiMode !== 'v2' && spec.methodType === 'search') {
        return makeAutoPaginationMethodsFromIterator(new V1SearchIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode !== 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V1ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    if (apiMode === 'v2' && spec.methodType === 'list') {
        return makeAutoPaginationMethodsFromIterator(new V2ListIterator(firstPagePromise, requestArgs, spec, stripeResource));
    }
    return null;
};
const makeAutoPaginationMethodsFromIterator = (iterator)=>{
    const autoPagingEach = makeAutoPagingEach((...args)=>iterator.next(...args));
    const autoPagingToArray = makeAutoPagingToArray(autoPagingEach);
    const autoPaginationMethods = {
        autoPagingEach,
        autoPagingToArray,
        // Async iterator functions:
        next: ()=>iterator.next(),
        return: ()=>{
            // This is required for `break`.
            return {};
        },
        [getAsyncIteratorSymbol()]: ()=>{
            return autoPaginationMethods;
        }
    };
    return autoPaginationMethods;
};
/**
 * ----------------
 * Private Helpers:
 * ----------------
 */ function getAsyncIteratorSymbol() {
    if (typeof Symbol !== 'undefined' && Symbol.asyncIterator) {
        return Symbol.asyncIterator;
    }
    // Follow the convention from libraries like iterall: https://github.com/leebyron/iterall#asynciterator-1
    return '@@asyncIterator';
}
function getDoneCallback(args) {
    if (args.length < 2) {
        return null;
    }
    const onDone = args[1];
    if (typeof onDone !== 'function') {
        throw Error(`The second argument to autoPagingEach, if present, must be a callback function; received ${typeof onDone}`);
    }
    return onDone;
}
/**
 * We allow four forms of the `onItem` callback (the middle two being equivalent),
 *
 *   1. `.autoPagingEach((item) => { doSomething(item); return false; });`
 *   2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
 *   3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
 *   4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
 *
 * In addition to standard validation, this helper
 * coalesces the former forms into the latter form.
 */ function getItemCallback(args) {
    if (args.length === 0) {
        return undefined;
    }
    const onItem = args[0];
    if (typeof onItem !== 'function') {
        throw Error(`The first argument to autoPagingEach, if present, must be a callback function; received ${typeof onItem}`);
    }
    // 4. `.autoPagingEach((item, next) => { doSomething(item); next(false); });`
    if (onItem.length === 2) {
        return onItem;
    }
    if (onItem.length > 2) {
        throw Error(`The \`onItem\` callback function passed to autoPagingEach must accept at most two arguments; got ${onItem}`);
    }
    // This magically handles all three of these usecases (the latter two being functionally identical):
    // 1. `.autoPagingEach((item) => { doSomething(item); return false; });`
    // 2. `.autoPagingEach(async (item) => { await doSomething(item); return false; });`
    // 3. `.autoPagingEach((item) => doSomething(item).then(() => false));`
    return function _onItem(item, next) {
        const shouldContinue = onItem(item);
        next(shouldContinue);
    };
}
function getLastId(listResult, reverseIteration) {
    const lastIdx = reverseIteration ? 0 : listResult.data.length - 1;
    const lastItem = listResult.data[lastIdx];
    const lastId = lastItem && lastItem.id;
    if (!lastId) {
        throw Error('Unexpected: No `id` found on the last item while auto-paging a list.');
    }
    return lastId;
}
function makeAutoPagingEach(asyncIteratorNext) {
    return function autoPagingEach() {
        const args = [].slice.call(arguments);
        const onItem = getItemCallback(args);
        const onDone = getDoneCallback(args);
        if (args.length > 2) {
            throw Error(`autoPagingEach takes up to two arguments; received ${args}`);
        }
        const autoPagePromise = wrapAsyncIteratorWithCallback(asyncIteratorNext, // @ts-ignore we might need a null check
        onItem);
        return callbackifyPromiseWithTimeout(autoPagePromise, onDone);
    };
}
function makeAutoPagingToArray(autoPagingEach) {
    return function autoPagingToArray(opts, onDone) {
        const limit = opts && opts.limit;
        if (!limit) {
            throw Error('You must pass a `limit` option to autoPagingToArray, e.g., `autoPagingToArray({limit: 1000});`.');
        }
        if (limit > 10000) {
            throw Error('You cannot specify a limit of more than 10,000 items to fetch in `autoPagingToArray`; use `autoPagingEach` to iterate through longer lists.');
        }
        const promise = new Promise((resolve, reject)=>{
            const items = [];
            autoPagingEach((item)=>{
                items.push(item);
                if (items.length >= limit) {
                    return false;
                }
            }).then(()=>{
                resolve(items);
            }).catch(reject);
        });
        // @ts-ignore
        return callbackifyPromiseWithTimeout(promise, onDone);
    };
}
function wrapAsyncIteratorWithCallback(asyncIteratorNext, onItem) {
    return new Promise((resolve, reject)=>{
        function handleIteration(iterResult) {
            if (iterResult.done) {
                resolve();
                return;
            }
            const item = iterResult.value;
            return new Promise((next)=>{
                // Bit confusing, perhaps; we pass a `resolve` fn
                // to the user, so they can decide when and if to continue.
                // They can return false, or a promise which resolves to false, to break.
                onItem(item, next);
            }).then((shouldContinue)=>{
                if (shouldContinue === false) {
                    return handleIteration({
                        done: true,
                        value: undefined
                    });
                } else {
                    return asyncIteratorNext().then(handleIteration);
                }
            });
        }
        asyncIteratorNext().then(handleIteration).catch(reject);
    });
}
function isReverseIteration(requestArgs) {
    const args = [].slice.call(requestArgs);
    const dataFromArgs = getDataFromArgs(args);
    return !!dataFromArgs.ending_before;
}

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'charges' or 'customers')
 * @param [spec.fullPath=''] Fully qualified path to the method (eg. /v1/a/b/c).
 *  If this is specified, path should not be specified.
 * @param [spec.urlParams=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceding the also-optional callback argument
 * @param [spec.encode] Function for mutating input parameters to a method.
 *  Usefully for applying transforms to data on a per-method basis.
 * @param [spec.host] Hostname for the request.
 *
 * <!-- Public API accessible via Stripe.StripeResource.method -->
 */ function stripeMethod$1_(spec) {
    if (spec.path !== undefined && spec.fullPath !== undefined) {
        throw new Error(`Method spec specified both a 'path' (${spec.path}) and a 'fullPath' (${spec.fullPath}).`);
    }
    return function(...args) {
        const callback = typeof args[args.length - 1] == 'function' && args.pop();
        spec.urlParams = extractUrlParams(spec.fullPath || this.createResourcePathWithSymbols(spec.path || ''));
        const requestPromise = callbackifyPromiseWithTimeout(this._makeRequest(args, spec, {}), callback);
        Object.assign(requestPromise, makeAutoPaginationMethods(this, args, spec, requestPromise));
        return requestPromise;
    };
}

// Provide extension mechanism for Stripe Resource Sub-Classes
StripeResource.extend = protoExtend;
// Expose method-creator
StripeResource.method = stripeMethod$1_;
StripeResource.MAX_BUFFERED_REQUEST_METRICS = 100;
/**
 * Encapsulates request logic for a Stripe Resource
 */ function StripeResource(stripe, deprecatedUrlData) {
    this._stripe = stripe;
    if (deprecatedUrlData) {
        throw new Error('Support for curried url params was dropped in stripe-node v7.0.0. Instead, pass two ids.');
    }
    this.basePath = makeURLInterpolator(// @ts-ignore changing type of basePath
    this.basePath || stripe.getApiField('basePath'));
    // @ts-ignore changing type of path
    this.resourcePath = this.path;
    // @ts-ignore changing type of path
    this.path = makeURLInterpolator(this.path);
    this.initialize(...arguments);
}
StripeResource.prototype = {
    _stripe: null,
    // @ts-ignore the type of path changes in ctor
    path: '',
    resourcePath: '',
    // Methods that don't use the API's default '/v1' path can override it with this setting.
    basePath: null,
    initialize () {},
    // Function to override the default data processor. This allows full control
    // over how a StripeResource's request data will get converted into an HTTP
    // body. This is useful for non-standard HTTP requests. The function should
    // take method name, data, and headers as arguments.
    requestDataProcessor: null,
    // Function to add a validation checks before sending the request, errors should
    // be thrown, and they will be passed to the callback/promise.
    validateRequest: null,
    createFullPath (commandPath, urlData) {
        const urlParts = [
            this.basePath(urlData),
            this.path(urlData)
        ];
        if (typeof commandPath === 'function') {
            const computedCommandPath = commandPath(urlData);
            // If we have no actual command path, we just omit it to avoid adding a
            // trailing slash. This is important for top-level listing requests, which
            // do not have a command path.
            if (computedCommandPath) {
                urlParts.push(computedCommandPath);
            }
        } else {
            urlParts.push(commandPath);
        }
        return this._joinUrlParts(urlParts);
    },
    // Creates a relative resource path with symbols left in (unlike
    // createFullPath which takes some data to replace them with). For example it
    // might produce: /invoices/{id}
    createResourcePathWithSymbols (pathWithSymbols) {
        // If there is no path beyond the resource path, we want to produce just
        // /<resource path> rather than /<resource path>/.
        if (pathWithSymbols) {
            return `/${this._joinUrlParts([
                this.resourcePath,
                pathWithSymbols
            ])}`;
        } else {
            return `/${this.resourcePath}`;
        }
    },
    _joinUrlParts (parts) {
        // Replace any accidentally doubled up slashes. This previously used
        // path.join, which would do this as well. Unfortunately we need to do this
        // as the functions for creating paths are technically part of the public
        // interface and so we need to preserve backwards compatibility.
        return parts.join('/').replace(/\/{2,}/g, '/');
    },
    _getRequestOpts (requestArgs, spec, overrideData) {
        var _a;
        // Extract spec values with defaults.
        const requestMethod = (spec.method || 'GET').toUpperCase();
        const usage = spec.usage || [];
        const urlParams = spec.urlParams || [];
        const encode = spec.encode || ((data)=>data);
        const isUsingFullPath = !!spec.fullPath;
        const commandPath = makeURLInterpolator(isUsingFullPath ? spec.fullPath : spec.path || '');
        // When using fullPath, we ignore the resource path as it should already be
        // fully qualified.
        const path = isUsingFullPath ? spec.fullPath : this.createResourcePathWithSymbols(spec.path);
        // Don't mutate args externally.
        const args = [].slice.call(requestArgs);
        // Generate and validate url params.
        const urlData = urlParams.reduce((urlData, param)=>{
            const arg = args.shift();
            if (typeof arg !== 'string') {
                throw new Error(`Stripe: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`);
            }
            urlData[param] = arg;
            return urlData;
        }, {});
        // Pull request data and options (headers, auth) from args.
        const dataFromArgs = getDataFromArgs(args);
        const data = encode(Object.assign({}, dataFromArgs, overrideData));
        const options = getOptionsFromArgs(args);
        const host = options.host || spec.host;
        const streaming = !!spec.streaming;
        // Validate that there are no more args.
        if (args.filter((x)=>x != null).length) {
            throw new Error(`Stripe: Unknown arguments (${args}). Did you mean to pass an options object? See https://github.com/stripe/stripe-node/wiki/Passing-Options. (on API request to ${requestMethod} \`${path}\`)`);
        }
        // When using full path, we can just invoke the URL interpolator directly
        // as we don't need to use the resource to create a full path.
        const requestPath = isUsingFullPath ? commandPath(urlData) : this.createFullPath(commandPath, urlData);
        const headers = Object.assign(options.headers, spec.headers);
        if (spec.validator) {
            spec.validator(data, {
                headers
            });
        }
        const dataInQuery = spec.method === 'GET' || spec.method === 'DELETE';
        const bodyData = dataInQuery ? null : data;
        const queryData = dataInQuery ? data : {};
        return {
            requestMethod,
            requestPath,
            bodyData,
            queryData,
            authenticator: (_a = options.authenticator) !== null && _a !== void 0 ? _a : null,
            headers,
            host: host !== null && host !== void 0 ? host : null,
            streaming,
            settings: options.settings,
            usage
        };
    },
    _makeRequest (requestArgs, spec, overrideData) {
        return new Promise((resolve, reject)=>{
            var _a;
            let opts;
            try {
                opts = this._getRequestOpts(requestArgs, spec, overrideData);
            } catch (err) {
                reject(err);
                return;
            }
            function requestCallback(err, response) {
                if (err) {
                    reject(err);
                } else {
                    resolve(spec.transformResponseData ? spec.transformResponseData(response) : response);
                }
            }
            const emptyQuery = Object.keys(opts.queryData).length === 0;
            const path = [
                opts.requestPath,
                emptyQuery ? '' : '?',
                queryStringifyRequestData(opts.queryData, getAPIMode(opts.requestPath))
            ].join('');
            const { headers, settings } = opts;
            this._stripe._requestSender._request(opts.requestMethod, opts.host, path, opts.bodyData, opts.authenticator, {
                headers,
                settings,
                streaming: opts.streaming
            }, opts.usage, requestCallback, (_a = this.requestDataProcessor) === null || _a === void 0 ? void 0 : _a.bind(this));
        });
    }
};

function createWebhooks(platformFunctions) {
    const Webhook = {
        DEFAULT_TOLERANCE: 300,
        // @ts-ignore
        signature: null,
        constructEvent (payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            try {
                this.signature.verifyHeader(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            } catch (e) {
                if (e instanceof CryptoProviderOnlySupportsAsyncError) {
                    e.message += '\nUse `await constructEventAsync(...)` instead of `constructEvent(...)`';
                }
                throw e;
            }
            const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder('utf8').decode(payload)) : JSON.parse(payload);
            return jsonPayload;
        },
        async constructEventAsync (payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            await this.signature.verifyHeaderAsync(payload, header, secret, tolerance || Webhook.DEFAULT_TOLERANCE, cryptoProvider, receivedAt);
            const jsonPayload = payload instanceof Uint8Array ? JSON.parse(new TextDecoder('utf8').decode(payload)) : JSON.parse(payload);
            return jsonPayload;
        },
        /**
         * Generates a header to be used for webhook mocking
         *
         * @typedef {object} opts
         * @property {number} timestamp - Timestamp of the header. Defaults to Date.now()
         * @property {string} payload - JSON stringified payload object, containing the 'id' and 'object' parameters
         * @property {string} secret - Stripe webhook secret 'whsec_...'
         * @property {string} scheme - Version of API to hit. Defaults to 'v1'.
         * @property {string} signature - Computed webhook signature
         * @property {CryptoProvider} cryptoProvider - Crypto provider to use for computing the signature if none was provided. Defaults to NodeCryptoProvider.
         */ generateTestHeaderString: function(opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature || preparedOpts.cryptoProvider.computeHMACSignature(preparedOpts.payloadString, preparedOpts.secret);
            return preparedOpts.generateHeaderString(signature);
        },
        generateTestHeaderStringAsync: async function(opts) {
            const preparedOpts = prepareOptions(opts);
            const signature = preparedOpts.signature || await preparedOpts.cryptoProvider.computeHMACSignatureAsync(preparedOpts.payloadString, preparedOpts.secret);
            return preparedOpts.generateHeaderString(signature);
        }
    };
    const signature = {
        EXPECTED_SCHEME: 'v1',
        verifyHeader (encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = cryptoProvider.computeHMACSignature(makeHMACContent(payload, details), secret);
            validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
            return true;
        },
        async verifyHeaderAsync (encodedPayload, encodedHeader, secret, tolerance, cryptoProvider, receivedAt) {
            const { decodedHeader: header, decodedPayload: payload, details, suspectPayloadType } = parseEventDetails(encodedPayload, encodedHeader, this.EXPECTED_SCHEME);
            const secretContainsWhitespace = /\s/.test(secret);
            cryptoProvider = cryptoProvider || getCryptoProvider();
            const expectedSignature = await cryptoProvider.computeHMACSignatureAsync(makeHMACContent(payload, details), secret);
            return validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt);
        }
    };
    function makeHMACContent(payload, details) {
        return `${details.timestamp}.${payload}`;
    }
    function parseEventDetails(encodedPayload, encodedHeader, expectedScheme) {
        if (!encodedPayload) {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No webhook payload was provided.'
            });
        }
        const suspectPayloadType = typeof encodedPayload != 'string' && !(encodedPayload instanceof Uint8Array);
        const textDecoder = new TextDecoder('utf8');
        const decodedPayload = encodedPayload instanceof Uint8Array ? textDecoder.decode(encodedPayload) : encodedPayload;
        // Express's type for `Request#headers` is `string | []string`
        // which is because the `set-cookie` header is an array,
        // but no other headers are an array (docs: https://nodejs.org/api/http.html#http_message_headers)
        // (Express's Request class is an extension of http.IncomingMessage, and doesn't appear to be relevantly modified: https://github.com/expressjs/express/blob/master/lib/request.js#L31)
        if (Array.isArray(encodedHeader)) {
            throw new Error('Unexpected: An array was passed as a header, which should not be possible for the stripe-signature header.');
        }
        if (encodedHeader == null || encodedHeader == '') {
            throw new StripeSignatureVerificationError(encodedHeader, encodedPayload, {
                message: 'No stripe-signature header value was provided.'
            });
        }
        const decodedHeader = encodedHeader instanceof Uint8Array ? textDecoder.decode(encodedHeader) : encodedHeader;
        const details = parseHeader(decodedHeader, expectedScheme);
        if (!details || details.timestamp === -1) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'Unable to extract timestamp and signatures from header'
            });
        }
        if (!details.signatures.length) {
            throw new StripeSignatureVerificationError(decodedHeader, decodedPayload, {
                message: 'No signatures found with expected scheme'
            });
        }
        return {
            decodedPayload,
            decodedHeader,
            details,
            suspectPayloadType
        };
    }
    function validateComputedSignature(payload, header, details, expectedSignature, tolerance, suspectPayloadType, secretContainsWhitespace, receivedAt) {
        const signatureFound = !!details.signatures.filter(platformFunctions.secureCompare.bind(platformFunctions, expectedSignature)).length;
        const docsLocation = '\nLearn more about webhook signing and explore webhook integration examples for various frameworks at ' + 'https://docs.stripe.com/webhooks/signature';
        const whitespaceMessage = secretContainsWhitespace ? '\n\nNote: The provided signing secret contains whitespace. This often indicates an extra newline or space is in the value' : '';
        if (!signatureFound) {
            if (suspectPayloadType) {
                throw new StripeSignatureVerificationError(header, payload, {
                    message: 'Webhook payload must be provided as a string or a Buffer (https://nodejs.org/api/buffer.html) instance representing the _raw_ request body.' + 'Payload was provided as a parsed JavaScript object instead. \n' + 'Signature verification is impossible without access to the original signed material. \n' + docsLocation + '\n' + whitespaceMessage
                });
            }
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'No signatures found matching the expected signature for payload.' + ' Are you passing the raw request body you received from Stripe? \n' + ' If a webhook request is being forwarded by a third-party tool,' + ' ensure that the exact request body, including JSON formatting and new line style, is preserved.\n' + docsLocation + '\n' + whitespaceMessage
            });
        }
        const timestampAge = Math.floor((typeof receivedAt === 'number' ? receivedAt : Date.now()) / 1000) - details.timestamp;
        if (tolerance > 0 && timestampAge > tolerance) {
            // @ts-ignore
            throw new StripeSignatureVerificationError(header, payload, {
                message: 'Timestamp outside the tolerance zone'
            });
        }
        return true;
    }
    function parseHeader(header, scheme) {
        if (typeof header !== 'string') {
            return null;
        }
        return header.split(',').reduce((accum, item)=>{
            const kv = item.split('=');
            if (kv[0] === 't') {
                accum.timestamp = parseInt(kv[1], 10);
            }
            if (kv[0] === scheme) {
                accum.signatures.push(kv[1]);
            }
            return accum;
        }, {
            timestamp: -1,
            signatures: []
        });
    }
    let webhooksCryptoProviderInstance = null;
    /**
     * Lazily instantiate a CryptoProvider instance. This is a stateless object
     * so a singleton can be used here.
     */ function getCryptoProvider() {
        if (!webhooksCryptoProviderInstance) {
            webhooksCryptoProviderInstance = platformFunctions.createDefaultCryptoProvider();
        }
        return webhooksCryptoProviderInstance;
    }
    function prepareOptions(opts) {
        if (!opts) {
            throw new StripeError({
                message: 'Options are required'
            });
        }
        const timestamp = Math.floor(opts.timestamp) || Math.floor(Date.now() / 1000);
        const scheme = opts.scheme || signature.EXPECTED_SCHEME;
        const cryptoProvider = opts.cryptoProvider || getCryptoProvider();
        const payloadString = `${timestamp}.${opts.payload}`;
        const generateHeaderString = (signature)=>{
            return `t=${timestamp},${scheme}=${signature}`;
        };
        return Object.assign(Object.assign({}, opts), {
            timestamp,
            scheme,
            cryptoProvider,
            payloadString,
            generateHeaderString
        });
    }
    Webhook.signature = signature;
    return Webhook;
}

// File generated from our OpenAPI spec
const ApiVersion = '2025-02-24.acacia';

// ResourceNamespace allows you to create nested resources, i.e. `stripe.issuing.cards`.
// It also works recursively, so you could do i.e. `stripe.billing.invoicing.pay`.
function ResourceNamespace(stripe, resources) {
    for(const name in resources){
        if (!Object.prototype.hasOwnProperty.call(resources, name)) {
            continue;
        }
        const camelCaseName = name[0].toLowerCase() + name.substring(1);
        const resource = new resources[name](stripe);
        this[camelCaseName] = resource;
    }
}
function resourceNamespace(namespace, resources) {
    return function(stripe) {
        return new ResourceNamespace(stripe, resources);
    };
}

// File generated from our OpenAPI spec
const stripeMethod$1Z = StripeResource.method;
const Accounts$1 = StripeResource.extend({
    retrieve: stripeMethod$1Z({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}'
    }),
    list: stripeMethod$1Z({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts',
        methodType: 'list'
    }),
    disconnect: stripeMethod$1Z({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/disconnect'
    }),
    listOwners: stripeMethod$1Z({
        method: 'GET',
        fullPath: '/v1/financial_connections/accounts/{account}/owners',
        methodType: 'list'
    }),
    refresh: stripeMethod$1Z({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/refresh'
    }),
    subscribe: stripeMethod$1Z({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/subscribe'
    }),
    unsubscribe: stripeMethod$1Z({
        method: 'POST',
        fullPath: '/v1/financial_connections/accounts/{account}/unsubscribe'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1Y = StripeResource.method;
const ActiveEntitlements = StripeResource.extend({
    retrieve: stripeMethod$1Y({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements/{id}'
    }),
    list: stripeMethod$1Y({
        method: 'GET',
        fullPath: '/v1/entitlements/active_entitlements',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1X = StripeResource.method;
const Alerts = StripeResource.extend({
    create: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/billing/alerts'
    }),
    retrieve: stripeMethod$1X({
        method: 'GET',
        fullPath: '/v1/billing/alerts/{id}'
    }),
    list: stripeMethod$1X({
        method: 'GET',
        fullPath: '/v1/billing/alerts',
        methodType: 'list'
    }),
    activate: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/activate'
    }),
    archive: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/archive'
    }),
    deactivate: stripeMethod$1X({
        method: 'POST',
        fullPath: '/v1/billing/alerts/{id}/deactivate'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1W = StripeResource.method;
const Authorizations$1 = StripeResource.extend({
    create: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations'
    }),
    capture: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/capture'
    }),
    expire: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/expire'
    }),
    finalizeAmount: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount'
    }),
    increment: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/increment'
    }),
    respond: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/fraud_challenges/respond'
    }),
    reverse: stripeMethod$1W({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/authorizations/{authorization}/reverse'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1V = StripeResource.method;
const Authorizations = StripeResource.extend({
    retrieve: stripeMethod$1V({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations/{authorization}'
    }),
    update: stripeMethod$1V({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}'
    }),
    list: stripeMethod$1V({
        method: 'GET',
        fullPath: '/v1/issuing/authorizations',
        methodType: 'list'
    }),
    approve: stripeMethod$1V({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/approve'
    }),
    decline: stripeMethod$1V({
        method: 'POST',
        fullPath: '/v1/issuing/authorizations/{authorization}/decline'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1U = StripeResource.method;
const Calculations = StripeResource.extend({
    create: stripeMethod$1U({
        method: 'POST',
        fullPath: '/v1/tax/calculations'
    }),
    retrieve: stripeMethod$1U({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}'
    }),
    listLineItems: stripeMethod$1U({
        method: 'GET',
        fullPath: '/v1/tax/calculations/{calculation}/line_items',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1T = StripeResource.method;
const Cardholders = StripeResource.extend({
    create: stripeMethod$1T({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders'
    }),
    retrieve: stripeMethod$1T({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders/{cardholder}'
    }),
    update: stripeMethod$1T({
        method: 'POST',
        fullPath: '/v1/issuing/cardholders/{cardholder}'
    }),
    list: stripeMethod$1T({
        method: 'GET',
        fullPath: '/v1/issuing/cardholders',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1S = StripeResource.method;
const Cards$1 = StripeResource.extend({
    deliverCard: stripeMethod$1S({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver'
    }),
    failCard: stripeMethod$1S({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/fail'
    }),
    returnCard: stripeMethod$1S({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/return'
    }),
    shipCard: stripeMethod$1S({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/ship'
    }),
    submitCard: stripeMethod$1S({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/cards/{card}/shipping/submit'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1R = StripeResource.method;
const Cards = StripeResource.extend({
    create: stripeMethod$1R({
        method: 'POST',
        fullPath: '/v1/issuing/cards'
    }),
    retrieve: stripeMethod$1R({
        method: 'GET',
        fullPath: '/v1/issuing/cards/{card}'
    }),
    update: stripeMethod$1R({
        method: 'POST',
        fullPath: '/v1/issuing/cards/{card}'
    }),
    list: stripeMethod$1R({
        method: 'GET',
        fullPath: '/v1/issuing/cards',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1Q = StripeResource.method;
const Configurations$1 = StripeResource.extend({
    create: stripeMethod$1Q({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations'
    }),
    retrieve: stripeMethod$1Q({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations/{configuration}'
    }),
    update: stripeMethod$1Q({
        method: 'POST',
        fullPath: '/v1/billing_portal/configurations/{configuration}'
    }),
    list: stripeMethod$1Q({
        method: 'GET',
        fullPath: '/v1/billing_portal/configurations',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1P = StripeResource.method;
const Configurations = StripeResource.extend({
    create: stripeMethod$1P({
        method: 'POST',
        fullPath: '/v1/terminal/configurations'
    }),
    retrieve: stripeMethod$1P({
        method: 'GET',
        fullPath: '/v1/terminal/configurations/{configuration}'
    }),
    update: stripeMethod$1P({
        method: 'POST',
        fullPath: '/v1/terminal/configurations/{configuration}'
    }),
    list: stripeMethod$1P({
        method: 'GET',
        fullPath: '/v1/terminal/configurations',
        methodType: 'list'
    }),
    del: stripeMethod$1P({
        method: 'DELETE',
        fullPath: '/v1/terminal/configurations/{configuration}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1O = StripeResource.method;
const ConfirmationTokens$1 = StripeResource.extend({
    create: stripeMethod$1O({
        method: 'POST',
        fullPath: '/v1/test_helpers/confirmation_tokens'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1N = StripeResource.method;
const ConnectionTokens = StripeResource.extend({
    create: stripeMethod$1N({
        method: 'POST',
        fullPath: '/v1/terminal/connection_tokens'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1M = StripeResource.method;
const CreditBalanceSummary = StripeResource.extend({
    retrieve: stripeMethod$1M({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_summary'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1L = StripeResource.method;
const CreditBalanceTransactions = StripeResource.extend({
    retrieve: stripeMethod$1L({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions/{id}'
    }),
    list: stripeMethod$1L({
        method: 'GET',
        fullPath: '/v1/billing/credit_balance_transactions',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1K = StripeResource.method;
const CreditGrants = StripeResource.extend({
    create: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants'
    }),
    retrieve: stripeMethod$1K({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants/{id}'
    }),
    update: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}'
    }),
    list: stripeMethod$1K({
        method: 'GET',
        fullPath: '/v1/billing/credit_grants',
        methodType: 'list'
    }),
    expire: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/expire'
    }),
    voidGrant: stripeMethod$1K({
        method: 'POST',
        fullPath: '/v1/billing/credit_grants/{id}/void'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1J = StripeResource.method;
const CreditReversals = StripeResource.extend({
    create: stripeMethod$1J({
        method: 'POST',
        fullPath: '/v1/treasury/credit_reversals'
    }),
    retrieve: stripeMethod$1J({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals/{credit_reversal}'
    }),
    list: stripeMethod$1J({
        method: 'GET',
        fullPath: '/v1/treasury/credit_reversals',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1I = StripeResource.method;
const Customers$1 = StripeResource.extend({
    fundCashBalance: stripeMethod$1I({
        method: 'POST',
        fullPath: '/v1/test_helpers/customers/{customer}/fund_cash_balance'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1H = StripeResource.method;
const DebitReversals = StripeResource.extend({
    create: stripeMethod$1H({
        method: 'POST',
        fullPath: '/v1/treasury/debit_reversals'
    }),
    retrieve: stripeMethod$1H({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals/{debit_reversal}'
    }),
    list: stripeMethod$1H({
        method: 'GET',
        fullPath: '/v1/treasury/debit_reversals',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1G = StripeResource.method;
const Disputes$1 = StripeResource.extend({
    create: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/issuing/disputes'
    }),
    retrieve: stripeMethod$1G({
        method: 'GET',
        fullPath: '/v1/issuing/disputes/{dispute}'
    }),
    update: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}'
    }),
    list: stripeMethod$1G({
        method: 'GET',
        fullPath: '/v1/issuing/disputes',
        methodType: 'list'
    }),
    submit: stripeMethod$1G({
        method: 'POST',
        fullPath: '/v1/issuing/disputes/{dispute}/submit'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1F = StripeResource.method;
const EarlyFraudWarnings = StripeResource.extend({
    retrieve: stripeMethod$1F({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings/{early_fraud_warning}'
    }),
    list: stripeMethod$1F({
        method: 'GET',
        fullPath: '/v1/radar/early_fraud_warnings',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1E = StripeResource.method;
const EventDestinations = StripeResource.extend({
    create: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v2/core/event_destinations'
    }),
    retrieve: stripeMethod$1E({
        method: 'GET',
        fullPath: '/v2/core/event_destinations/{id}'
    }),
    update: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}'
    }),
    list: stripeMethod$1E({
        method: 'GET',
        fullPath: '/v2/core/event_destinations',
        methodType: 'list'
    }),
    del: stripeMethod$1E({
        method: 'DELETE',
        fullPath: '/v2/core/event_destinations/{id}'
    }),
    disable: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/disable'
    }),
    enable: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/enable'
    }),
    ping: stripeMethod$1E({
        method: 'POST',
        fullPath: '/v2/core/event_destinations/{id}/ping'
    })
});

// This file is manually maintained
const stripeMethod$1D = StripeResource.method;
const Events$1 = StripeResource.extend({
    retrieve (...args) {
        const transformResponseData = (response)=>{
            return this.addFetchRelatedObjectIfNeeded(response);
        };
        return stripeMethod$1D({
            method: 'GET',
            fullPath: '/v2/core/events/{id}',
            transformResponseData
        }).apply(this, args);
    },
    list (...args) {
        const transformResponseData = (response)=>{
            return Object.assign(Object.assign({}, response), {
                data: response.data.map(this.addFetchRelatedObjectIfNeeded.bind(this))
            });
        };
        return stripeMethod$1D({
            method: 'GET',
            fullPath: '/v2/core/events',
            methodType: 'list',
            transformResponseData
        }).apply(this, args);
    },
    /**
     * @private
     *
     * For internal use in stripe-node.
     *
     * @param pulledEvent The retrieved event object
     * @returns The retrieved event object with a fetchRelatedObject method,
     * if pulledEvent.related_object is valid (non-null and has a url)
     */ addFetchRelatedObjectIfNeeded (pulledEvent) {
        if (!pulledEvent.related_object || !pulledEvent.related_object.url) {
            return pulledEvent;
        }
        return Object.assign(Object.assign({}, pulledEvent), {
            fetchRelatedObject: ()=>// call stripeMethod with 'this' resource to fetch
                // the related object. 'this' is needed to construct
                // and send the request, but the method spec controls
                // the url endpoint and method, so it doesn't matter
                // that 'this' is an Events resource object here
                stripeMethod$1D({
                    method: 'GET',
                    fullPath: pulledEvent.related_object.url
                }).apply(this, [
                    {
                        stripeAccount: pulledEvent.context
                    }
                ])
        });
    }
});

// File generated from our OpenAPI spec
const stripeMethod$1C = StripeResource.method;
const Features = StripeResource.extend({
    create: stripeMethod$1C({
        method: 'POST',
        fullPath: '/v1/entitlements/features'
    }),
    retrieve: stripeMethod$1C({
        method: 'GET',
        fullPath: '/v1/entitlements/features/{id}'
    }),
    update: stripeMethod$1C({
        method: 'POST',
        fullPath: '/v1/entitlements/features/{id}'
    }),
    list: stripeMethod$1C({
        method: 'GET',
        fullPath: '/v1/entitlements/features',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1B = StripeResource.method;
const FinancialAccounts = StripeResource.extend({
    create: stripeMethod$1B({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts'
    }),
    retrieve: stripeMethod$1B({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}'
    }),
    update: stripeMethod$1B({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}'
    }),
    list: stripeMethod$1B({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts',
        methodType: 'list'
    }),
    close: stripeMethod$1B({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/close'
    }),
    retrieveFeatures: stripeMethod$1B({
        method: 'GET',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features'
    }),
    updateFeatures: stripeMethod$1B({
        method: 'POST',
        fullPath: '/v1/treasury/financial_accounts/{financial_account}/features'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1A = StripeResource.method;
const InboundTransfers$1 = StripeResource.extend({
    fail: stripeMethod$1A({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail'
    }),
    returnInboundTransfer: stripeMethod$1A({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/return'
    }),
    succeed: stripeMethod$1A({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/inbound_transfers/{id}/succeed'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1z = StripeResource.method;
const InboundTransfers = StripeResource.extend({
    create: stripeMethod$1z({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers'
    }),
    retrieve: stripeMethod$1z({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers/{id}'
    }),
    list: stripeMethod$1z({
        method: 'GET',
        fullPath: '/v1/treasury/inbound_transfers',
        methodType: 'list'
    }),
    cancel: stripeMethod$1z({
        method: 'POST',
        fullPath: '/v1/treasury/inbound_transfers/{inbound_transfer}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1y = StripeResource.method;
const Locations = StripeResource.extend({
    create: stripeMethod$1y({
        method: 'POST',
        fullPath: '/v1/terminal/locations'
    }),
    retrieve: stripeMethod$1y({
        method: 'GET',
        fullPath: '/v1/terminal/locations/{location}'
    }),
    update: stripeMethod$1y({
        method: 'POST',
        fullPath: '/v1/terminal/locations/{location}'
    }),
    list: stripeMethod$1y({
        method: 'GET',
        fullPath: '/v1/terminal/locations',
        methodType: 'list'
    }),
    del: stripeMethod$1y({
        method: 'DELETE',
        fullPath: '/v1/terminal/locations/{location}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1x = StripeResource.method;
const MeterEventAdjustments$1 = StripeResource.extend({
    create: stripeMethod$1x({
        method: 'POST',
        fullPath: '/v1/billing/meter_event_adjustments'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1w = StripeResource.method;
const MeterEventAdjustments = StripeResource.extend({
    create: stripeMethod$1w({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_adjustments'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1v = StripeResource.method;
const MeterEventSession = StripeResource.extend({
    create: stripeMethod$1v({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_session'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1u = StripeResource.method;
const MeterEventStream = StripeResource.extend({
    create: stripeMethod$1u({
        method: 'POST',
        fullPath: '/v2/billing/meter_event_stream',
        host: 'meter-events.stripe.com'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1t = StripeResource.method;
const MeterEvents$1 = StripeResource.extend({
    create: stripeMethod$1t({
        method: 'POST',
        fullPath: '/v1/billing/meter_events'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1s = StripeResource.method;
const MeterEvents = StripeResource.extend({
    create: stripeMethod$1s({
        method: 'POST',
        fullPath: '/v2/billing/meter_events'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1r = StripeResource.method;
const Meters = StripeResource.extend({
    create: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/billing/meters'
    }),
    retrieve: stripeMethod$1r({
        method: 'GET',
        fullPath: '/v1/billing/meters/{id}'
    }),
    update: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}'
    }),
    list: stripeMethod$1r({
        method: 'GET',
        fullPath: '/v1/billing/meters',
        methodType: 'list'
    }),
    deactivate: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/deactivate'
    }),
    listEventSummaries: stripeMethod$1r({
        method: 'GET',
        fullPath: '/v1/billing/meters/{id}/event_summaries',
        methodType: 'list'
    }),
    reactivate: stripeMethod$1r({
        method: 'POST',
        fullPath: '/v1/billing/meters/{id}/reactivate'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1q = StripeResource.method;
const Orders = StripeResource.extend({
    create: stripeMethod$1q({
        method: 'POST',
        fullPath: '/v1/climate/orders'
    }),
    retrieve: stripeMethod$1q({
        method: 'GET',
        fullPath: '/v1/climate/orders/{order}'
    }),
    update: stripeMethod$1q({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}'
    }),
    list: stripeMethod$1q({
        method: 'GET',
        fullPath: '/v1/climate/orders',
        methodType: 'list'
    }),
    cancel: stripeMethod$1q({
        method: 'POST',
        fullPath: '/v1/climate/orders/{order}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1p = StripeResource.method;
const OutboundPayments$1 = StripeResource.extend({
    update: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}'
    }),
    fail: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/fail'
    }),
    post: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/post'
    }),
    returnOutboundPayment: stripeMethod$1p({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_payments/{id}/return'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1o = StripeResource.method;
const OutboundPayments = StripeResource.extend({
    create: stripeMethod$1o({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments'
    }),
    retrieve: stripeMethod$1o({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments/{id}'
    }),
    list: stripeMethod$1o({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_payments',
        methodType: 'list'
    }),
    cancel: stripeMethod$1o({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_payments/{id}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1n = StripeResource.method;
const OutboundTransfers$1 = StripeResource.extend({
    update: stripeMethod$1n({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}'
    }),
    fail: stripeMethod$1n({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/fail'
    }),
    post: stripeMethod$1n({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/post'
    }),
    returnOutboundTransfer: stripeMethod$1n({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/outbound_transfers/{outbound_transfer}/return'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1m = StripeResource.method;
const OutboundTransfers = StripeResource.extend({
    create: stripeMethod$1m({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers'
    }),
    retrieve: stripeMethod$1m({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}'
    }),
    list: stripeMethod$1m({
        method: 'GET',
        fullPath: '/v1/treasury/outbound_transfers',
        methodType: 'list'
    }),
    cancel: stripeMethod$1m({
        method: 'POST',
        fullPath: '/v1/treasury/outbound_transfers/{outbound_transfer}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1l = StripeResource.method;
const PersonalizationDesigns$1 = StripeResource.extend({
    activate: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/activate'
    }),
    deactivate: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/deactivate'
    }),
    reject: stripeMethod$1l({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/personalization_designs/{personalization_design}/reject'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1k = StripeResource.method;
const PersonalizationDesigns = StripeResource.extend({
    create: stripeMethod$1k({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs'
    }),
    retrieve: stripeMethod$1k({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}'
    }),
    update: stripeMethod$1k({
        method: 'POST',
        fullPath: '/v1/issuing/personalization_designs/{personalization_design}'
    }),
    list: stripeMethod$1k({
        method: 'GET',
        fullPath: '/v1/issuing/personalization_designs',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1j = StripeResource.method;
const PhysicalBundles = StripeResource.extend({
    retrieve: stripeMethod$1j({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles/{physical_bundle}'
    }),
    list: stripeMethod$1j({
        method: 'GET',
        fullPath: '/v1/issuing/physical_bundles',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1i = StripeResource.method;
const Products$1 = StripeResource.extend({
    retrieve: stripeMethod$1i({
        method: 'GET',
        fullPath: '/v1/climate/products/{product}'
    }),
    list: stripeMethod$1i({
        method: 'GET',
        fullPath: '/v1/climate/products',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1h = StripeResource.method;
const Readers$1 = StripeResource.extend({
    presentPaymentMethod: stripeMethod$1h({
        method: 'POST',
        fullPath: '/v1/test_helpers/terminal/readers/{reader}/present_payment_method'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1g = StripeResource.method;
const Readers = StripeResource.extend({
    create: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers'
    }),
    retrieve: stripeMethod$1g({
        method: 'GET',
        fullPath: '/v1/terminal/readers/{reader}'
    }),
    update: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}'
    }),
    list: stripeMethod$1g({
        method: 'GET',
        fullPath: '/v1/terminal/readers',
        methodType: 'list'
    }),
    del: stripeMethod$1g({
        method: 'DELETE',
        fullPath: '/v1/terminal/readers/{reader}'
    }),
    cancelAction: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/cancel_action'
    }),
    processPaymentIntent: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_payment_intent'
    }),
    processSetupIntent: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/process_setup_intent'
    }),
    refundPayment: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/refund_payment'
    }),
    setReaderDisplay: stripeMethod$1g({
        method: 'POST',
        fullPath: '/v1/terminal/readers/{reader}/set_reader_display'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1f = StripeResource.method;
const ReceivedCredits$1 = StripeResource.extend({
    create: stripeMethod$1f({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_credits'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1e = StripeResource.method;
const ReceivedCredits = StripeResource.extend({
    retrieve: stripeMethod$1e({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits/{id}'
    }),
    list: stripeMethod$1e({
        method: 'GET',
        fullPath: '/v1/treasury/received_credits',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1d = StripeResource.method;
const ReceivedDebits$1 = StripeResource.extend({
    create: stripeMethod$1d({
        method: 'POST',
        fullPath: '/v1/test_helpers/treasury/received_debits'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1c = StripeResource.method;
const ReceivedDebits = StripeResource.extend({
    retrieve: stripeMethod$1c({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits/{id}'
    }),
    list: stripeMethod$1c({
        method: 'GET',
        fullPath: '/v1/treasury/received_debits',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1b = StripeResource.method;
const Refunds$1 = StripeResource.extend({
    expire: stripeMethod$1b({
        method: 'POST',
        fullPath: '/v1/test_helpers/refunds/{refund}/expire'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1a = StripeResource.method;
const Registrations = StripeResource.extend({
    create: stripeMethod$1a({
        method: 'POST',
        fullPath: '/v1/tax/registrations'
    }),
    retrieve: stripeMethod$1a({
        method: 'GET',
        fullPath: '/v1/tax/registrations/{id}'
    }),
    update: stripeMethod$1a({
        method: 'POST',
        fullPath: '/v1/tax/registrations/{id}'
    }),
    list: stripeMethod$1a({
        method: 'GET',
        fullPath: '/v1/tax/registrations',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$19 = StripeResource.method;
const ReportRuns = StripeResource.extend({
    create: stripeMethod$19({
        method: 'POST',
        fullPath: '/v1/reporting/report_runs'
    }),
    retrieve: stripeMethod$19({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs/{report_run}'
    }),
    list: stripeMethod$19({
        method: 'GET',
        fullPath: '/v1/reporting/report_runs',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$18 = StripeResource.method;
const ReportTypes = StripeResource.extend({
    retrieve: stripeMethod$18({
        method: 'GET',
        fullPath: '/v1/reporting/report_types/{report_type}'
    }),
    list: stripeMethod$18({
        method: 'GET',
        fullPath: '/v1/reporting/report_types',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$17 = StripeResource.method;
const Requests = StripeResource.extend({
    create: stripeMethod$17({
        method: 'POST',
        fullPath: '/v1/forwarding/requests'
    }),
    retrieve: stripeMethod$17({
        method: 'GET',
        fullPath: '/v1/forwarding/requests/{id}'
    }),
    list: stripeMethod$17({
        method: 'GET',
        fullPath: '/v1/forwarding/requests',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$16 = StripeResource.method;
const ScheduledQueryRuns = StripeResource.extend({
    retrieve: stripeMethod$16({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}'
    }),
    list: stripeMethod$16({
        method: 'GET',
        fullPath: '/v1/sigma/scheduled_query_runs',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$15 = StripeResource.method;
const Secrets = StripeResource.extend({
    create: stripeMethod$15({
        method: 'POST',
        fullPath: '/v1/apps/secrets'
    }),
    list: stripeMethod$15({
        method: 'GET',
        fullPath: '/v1/apps/secrets',
        methodType: 'list'
    }),
    deleteWhere: stripeMethod$15({
        method: 'POST',
        fullPath: '/v1/apps/secrets/delete'
    }),
    find: stripeMethod$15({
        method: 'GET',
        fullPath: '/v1/apps/secrets/find'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$14 = StripeResource.method;
const Sessions$2 = StripeResource.extend({
    create: stripeMethod$14({
        method: 'POST',
        fullPath: '/v1/billing_portal/sessions'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$13 = StripeResource.method;
const Sessions$1 = StripeResource.extend({
    create: stripeMethod$13({
        method: 'POST',
        fullPath: '/v1/checkout/sessions'
    }),
    retrieve: stripeMethod$13({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}'
    }),
    update: stripeMethod$13({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}'
    }),
    list: stripeMethod$13({
        method: 'GET',
        fullPath: '/v1/checkout/sessions',
        methodType: 'list'
    }),
    expire: stripeMethod$13({
        method: 'POST',
        fullPath: '/v1/checkout/sessions/{session}/expire'
    }),
    listLineItems: stripeMethod$13({
        method: 'GET',
        fullPath: '/v1/checkout/sessions/{session}/line_items',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$12 = StripeResource.method;
const Sessions = StripeResource.extend({
    create: stripeMethod$12({
        method: 'POST',
        fullPath: '/v1/financial_connections/sessions'
    }),
    retrieve: stripeMethod$12({
        method: 'GET',
        fullPath: '/v1/financial_connections/sessions/{session}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$11 = StripeResource.method;
const Settings = StripeResource.extend({
    retrieve: stripeMethod$11({
        method: 'GET',
        fullPath: '/v1/tax/settings'
    }),
    update: stripeMethod$11({
        method: 'POST',
        fullPath: '/v1/tax/settings'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$10 = StripeResource.method;
const Suppliers = StripeResource.extend({
    retrieve: stripeMethod$10({
        method: 'GET',
        fullPath: '/v1/climate/suppliers/{supplier}'
    }),
    list: stripeMethod$10({
        method: 'GET',
        fullPath: '/v1/climate/suppliers',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$$ = StripeResource.method;
const TestClocks = StripeResource.extend({
    create: stripeMethod$$({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks'
    }),
    retrieve: stripeMethod$$({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}'
    }),
    list: stripeMethod$$({
        method: 'GET',
        fullPath: '/v1/test_helpers/test_clocks',
        methodType: 'list'
    }),
    del: stripeMethod$$({
        method: 'DELETE',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}'
    }),
    advance: stripeMethod$$({
        method: 'POST',
        fullPath: '/v1/test_helpers/test_clocks/{test_clock}/advance'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$_ = StripeResource.method;
const Tokens$1 = StripeResource.extend({
    retrieve: stripeMethod$_({
        method: 'GET',
        fullPath: '/v1/issuing/tokens/{token}'
    }),
    update: stripeMethod$_({
        method: 'POST',
        fullPath: '/v1/issuing/tokens/{token}'
    }),
    list: stripeMethod$_({
        method: 'GET',
        fullPath: '/v1/issuing/tokens',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$Z = StripeResource.method;
const TransactionEntries = StripeResource.extend({
    retrieve: stripeMethod$Z({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries/{id}'
    }),
    list: stripeMethod$Z({
        method: 'GET',
        fullPath: '/v1/treasury/transaction_entries',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$Y = StripeResource.method;
const Transactions$4 = StripeResource.extend({
    createForceCapture: stripeMethod$Y({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_force_capture'
    }),
    createUnlinkedRefund: stripeMethod$Y({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/create_unlinked_refund'
    }),
    refund: stripeMethod$Y({
        method: 'POST',
        fullPath: '/v1/test_helpers/issuing/transactions/{transaction}/refund'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$X = StripeResource.method;
const Transactions$3 = StripeResource.extend({
    retrieve: stripeMethod$X({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions/{transaction}'
    }),
    list: stripeMethod$X({
        method: 'GET',
        fullPath: '/v1/financial_connections/transactions',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$W = StripeResource.method;
const Transactions$2 = StripeResource.extend({
    retrieve: stripeMethod$W({
        method: 'GET',
        fullPath: '/v1/issuing/transactions/{transaction}'
    }),
    update: stripeMethod$W({
        method: 'POST',
        fullPath: '/v1/issuing/transactions/{transaction}'
    }),
    list: stripeMethod$W({
        method: 'GET',
        fullPath: '/v1/issuing/transactions',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$V = StripeResource.method;
const Transactions$1 = StripeResource.extend({
    retrieve: stripeMethod$V({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}'
    }),
    createFromCalculation: stripeMethod$V({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_from_calculation'
    }),
    createReversal: stripeMethod$V({
        method: 'POST',
        fullPath: '/v1/tax/transactions/create_reversal'
    }),
    listLineItems: stripeMethod$V({
        method: 'GET',
        fullPath: '/v1/tax/transactions/{transaction}/line_items',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$U = StripeResource.method;
const Transactions = StripeResource.extend({
    retrieve: stripeMethod$U({
        method: 'GET',
        fullPath: '/v1/treasury/transactions/{id}'
    }),
    list: stripeMethod$U({
        method: 'GET',
        fullPath: '/v1/treasury/transactions',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$T = StripeResource.method;
const ValueListItems = StripeResource.extend({
    create: stripeMethod$T({
        method: 'POST',
        fullPath: '/v1/radar/value_list_items'
    }),
    retrieve: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items/{item}'
    }),
    list: stripeMethod$T({
        method: 'GET',
        fullPath: '/v1/radar/value_list_items',
        methodType: 'list'
    }),
    del: stripeMethod$T({
        method: 'DELETE',
        fullPath: '/v1/radar/value_list_items/{item}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$S = StripeResource.method;
const ValueLists = StripeResource.extend({
    create: stripeMethod$S({
        method: 'POST',
        fullPath: '/v1/radar/value_lists'
    }),
    retrieve: stripeMethod$S({
        method: 'GET',
        fullPath: '/v1/radar/value_lists/{value_list}'
    }),
    update: stripeMethod$S({
        method: 'POST',
        fullPath: '/v1/radar/value_lists/{value_list}'
    }),
    list: stripeMethod$S({
        method: 'GET',
        fullPath: '/v1/radar/value_lists',
        methodType: 'list'
    }),
    del: stripeMethod$S({
        method: 'DELETE',
        fullPath: '/v1/radar/value_lists/{value_list}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$R = StripeResource.method;
const VerificationReports = StripeResource.extend({
    retrieve: stripeMethod$R({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports/{report}'
    }),
    list: stripeMethod$R({
        method: 'GET',
        fullPath: '/v1/identity/verification_reports',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$Q = StripeResource.method;
const VerificationSessions = StripeResource.extend({
    create: stripeMethod$Q({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions'
    }),
    retrieve: stripeMethod$Q({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions/{session}'
    }),
    update: stripeMethod$Q({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}'
    }),
    list: stripeMethod$Q({
        method: 'GET',
        fullPath: '/v1/identity/verification_sessions',
        methodType: 'list'
    }),
    cancel: stripeMethod$Q({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/cancel'
    }),
    redact: stripeMethod$Q({
        method: 'POST',
        fullPath: '/v1/identity/verification_sessions/{session}/redact'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$P = StripeResource.method;
// Since path can either be `account` or `accounts`, support both through stripeMethod path
const Accounts = StripeResource.extend({
    create: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts'
    }),
    retrieve (id, ...args) {
        // No longer allow an api key to be passed as the first string to this function due to ambiguity between
        // old account ids and api keys. To request the account for an api key, send null as the id
        if (typeof id === 'string') {
            return stripeMethod$P({
                method: 'GET',
                fullPath: '/v1/accounts/{id}'
            }).apply(this, [
                id,
                ...args
            ]);
        } else {
            if (id === null || id === undefined) {
                // Remove id as stripeMethod would complain of unexpected argument
                [].shift.apply([
                    id,
                    ...args
                ]);
            }
            return stripeMethod$P({
                method: 'GET',
                fullPath: '/v1/account'
            }).apply(this, [
                id,
                ...args
            ]);
        }
    },
    update: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}'
    }),
    list: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts',
        methodType: 'list'
    }),
    del: stripeMethod$P({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}'
    }),
    createExternalAccount: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts'
    }),
    createLoginLink: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/login_links'
    }),
    createPerson: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons'
    }),
    deleteExternalAccount: stripeMethod$P({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}'
    }),
    deletePerson: stripeMethod$P({
        method: 'DELETE',
        fullPath: '/v1/accounts/{account}/persons/{person}'
    }),
    listCapabilities: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities',
        methodType: 'list'
    }),
    listExternalAccounts: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts',
        methodType: 'list'
    }),
    listPersons: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons',
        methodType: 'list'
    }),
    reject: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/reject'
    }),
    retrieveCurrent: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/account'
    }),
    retrieveCapability: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}'
    }),
    retrieveExternalAccount: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}'
    }),
    retrievePerson: stripeMethod$P({
        method: 'GET',
        fullPath: '/v1/accounts/{account}/persons/{person}'
    }),
    updateCapability: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/capabilities/{capability}'
    }),
    updateExternalAccount: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/external_accounts/{id}'
    }),
    updatePerson: stripeMethod$P({
        method: 'POST',
        fullPath: '/v1/accounts/{account}/persons/{person}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$O = StripeResource.method;
const AccountLinks = StripeResource.extend({
    create: stripeMethod$O({
        method: 'POST',
        fullPath: '/v1/account_links'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$N = StripeResource.method;
const AccountSessions = StripeResource.extend({
    create: stripeMethod$N({
        method: 'POST',
        fullPath: '/v1/account_sessions'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$M = StripeResource.method;
const ApplePayDomains = StripeResource.extend({
    create: stripeMethod$M({
        method: 'POST',
        fullPath: '/v1/apple_pay/domains'
    }),
    retrieve: stripeMethod$M({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains/{domain}'
    }),
    list: stripeMethod$M({
        method: 'GET',
        fullPath: '/v1/apple_pay/domains',
        methodType: 'list'
    }),
    del: stripeMethod$M({
        method: 'DELETE',
        fullPath: '/v1/apple_pay/domains/{domain}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$L = StripeResource.method;
const ApplicationFees = StripeResource.extend({
    retrieve: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}'
    }),
    list: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/application_fees',
        methodType: 'list'
    }),
    createRefund: stripeMethod$L({
        method: 'POST',
        fullPath: '/v1/application_fees/{id}/refunds'
    }),
    listRefunds: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/application_fees/{id}/refunds',
        methodType: 'list'
    }),
    retrieveRefund: stripeMethod$L({
        method: 'GET',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}'
    }),
    updateRefund: stripeMethod$L({
        method: 'POST',
        fullPath: '/v1/application_fees/{fee}/refunds/{id}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$K = StripeResource.method;
const Balance = StripeResource.extend({
    retrieve: stripeMethod$K({
        method: 'GET',
        fullPath: '/v1/balance'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$J = StripeResource.method;
const BalanceTransactions = StripeResource.extend({
    retrieve: stripeMethod$J({
        method: 'GET',
        fullPath: '/v1/balance_transactions/{id}'
    }),
    list: stripeMethod$J({
        method: 'GET',
        fullPath: '/v1/balance_transactions',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$I = StripeResource.method;
const Charges = StripeResource.extend({
    create: stripeMethod$I({
        method: 'POST',
        fullPath: '/v1/charges'
    }),
    retrieve: stripeMethod$I({
        method: 'GET',
        fullPath: '/v1/charges/{charge}'
    }),
    update: stripeMethod$I({
        method: 'POST',
        fullPath: '/v1/charges/{charge}'
    }),
    list: stripeMethod$I({
        method: 'GET',
        fullPath: '/v1/charges',
        methodType: 'list'
    }),
    capture: stripeMethod$I({
        method: 'POST',
        fullPath: '/v1/charges/{charge}/capture'
    }),
    search: stripeMethod$I({
        method: 'GET',
        fullPath: '/v1/charges/search',
        methodType: 'search'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$H = StripeResource.method;
const ConfirmationTokens = StripeResource.extend({
    retrieve: stripeMethod$H({
        method: 'GET',
        fullPath: '/v1/confirmation_tokens/{confirmation_token}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$G = StripeResource.method;
const CountrySpecs = StripeResource.extend({
    retrieve: stripeMethod$G({
        method: 'GET',
        fullPath: '/v1/country_specs/{country}'
    }),
    list: stripeMethod$G({
        method: 'GET',
        fullPath: '/v1/country_specs',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$F = StripeResource.method;
const Coupons = StripeResource.extend({
    create: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/coupons'
    }),
    retrieve: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/coupons/{coupon}'
    }),
    update: stripeMethod$F({
        method: 'POST',
        fullPath: '/v1/coupons/{coupon}'
    }),
    list: stripeMethod$F({
        method: 'GET',
        fullPath: '/v1/coupons',
        methodType: 'list'
    }),
    del: stripeMethod$F({
        method: 'DELETE',
        fullPath: '/v1/coupons/{coupon}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$E = StripeResource.method;
const CreditNotes = StripeResource.extend({
    create: stripeMethod$E({
        method: 'POST',
        fullPath: '/v1/credit_notes'
    }),
    retrieve: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/credit_notes/{id}'
    }),
    update: stripeMethod$E({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}'
    }),
    list: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/credit_notes',
        methodType: 'list'
    }),
    listLineItems: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/credit_notes/{credit_note}/lines',
        methodType: 'list'
    }),
    listPreviewLineItems: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview/lines',
        methodType: 'list'
    }),
    preview: stripeMethod$E({
        method: 'GET',
        fullPath: '/v1/credit_notes/preview'
    }),
    voidCreditNote: stripeMethod$E({
        method: 'POST',
        fullPath: '/v1/credit_notes/{id}/void'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$D = StripeResource.method;
const CustomerSessions = StripeResource.extend({
    create: stripeMethod$D({
        method: 'POST',
        fullPath: '/v1/customer_sessions'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$C = StripeResource.method;
const Customers = StripeResource.extend({
    create: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers'
    }),
    retrieve: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}'
    }),
    update: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}'
    }),
    list: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers',
        methodType: 'list'
    }),
    del: stripeMethod$C({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}'
    }),
    createBalanceTransaction: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions'
    }),
    createFundingInstructions: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/funding_instructions'
    }),
    createSource: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources'
    }),
    createTaxId: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/tax_ids'
    }),
    deleteDiscount: stripeMethod$C({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/discount'
    }),
    deleteSource: stripeMethod$C({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/sources/{id}'
    }),
    deleteTaxId: stripeMethod$C({
        method: 'DELETE',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}'
    }),
    listBalanceTransactions: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions',
        methodType: 'list'
    }),
    listCashBalanceTransactions: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions',
        methodType: 'list'
    }),
    listPaymentMethods: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods',
        methodType: 'list'
    }),
    listSources: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources',
        methodType: 'list'
    }),
    listTaxIds: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids',
        methodType: 'list'
    }),
    retrieveBalanceTransaction: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}'
    }),
    retrieveCashBalance: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance'
    }),
    retrieveCashBalanceTransaction: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/cash_balance_transactions/{transaction}'
    }),
    retrievePaymentMethod: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/payment_methods/{payment_method}'
    }),
    retrieveSource: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/sources/{id}'
    }),
    retrieveTaxId: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/{customer}/tax_ids/{id}'
    }),
    search: stripeMethod$C({
        method: 'GET',
        fullPath: '/v1/customers/search',
        methodType: 'search'
    }),
    updateBalanceTransaction: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/balance_transactions/{transaction}'
    }),
    updateCashBalance: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/cash_balance'
    }),
    updateSource: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}'
    }),
    verifySource: stripeMethod$C({
        method: 'POST',
        fullPath: '/v1/customers/{customer}/sources/{id}/verify'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$B = StripeResource.method;
const Disputes = StripeResource.extend({
    retrieve: stripeMethod$B({
        method: 'GET',
        fullPath: '/v1/disputes/{dispute}'
    }),
    update: stripeMethod$B({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}'
    }),
    list: stripeMethod$B({
        method: 'GET',
        fullPath: '/v1/disputes',
        methodType: 'list'
    }),
    close: stripeMethod$B({
        method: 'POST',
        fullPath: '/v1/disputes/{dispute}/close'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$A = StripeResource.method;
const EphemeralKeys = StripeResource.extend({
    create: stripeMethod$A({
        method: 'POST',
        fullPath: '/v1/ephemeral_keys',
        validator: (data, options)=>{
            if (!options.headers || !options.headers['Stripe-Version']) {
                throw new Error('Passing apiVersion in a separate options hash is required to create an ephemeral key. See https://stripe.com/docs/api/versioning?lang=node');
            }
        }
    }),
    del: stripeMethod$A({
        method: 'DELETE',
        fullPath: '/v1/ephemeral_keys/{key}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$z = StripeResource.method;
const Events = StripeResource.extend({
    retrieve: stripeMethod$z({
        method: 'GET',
        fullPath: '/v1/events/{id}'
    }),
    list: stripeMethod$z({
        method: 'GET',
        fullPath: '/v1/events',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$y = StripeResource.method;
const ExchangeRates = StripeResource.extend({
    retrieve: stripeMethod$y({
        method: 'GET',
        fullPath: '/v1/exchange_rates/{rate_id}'
    }),
    list: stripeMethod$y({
        method: 'GET',
        fullPath: '/v1/exchange_rates',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$x = StripeResource.method;
const FileLinks = StripeResource.extend({
    create: stripeMethod$x({
        method: 'POST',
        fullPath: '/v1/file_links'
    }),
    retrieve: stripeMethod$x({
        method: 'GET',
        fullPath: '/v1/file_links/{link}'
    }),
    update: stripeMethod$x({
        method: 'POST',
        fullPath: '/v1/file_links/{link}'
    }),
    list: stripeMethod$x({
        method: 'GET',
        fullPath: '/v1/file_links',
        methodType: 'list'
    })
});

// Method for formatting HTTP body for the multipart/form-data specification
// Mostly taken from Fermata.js
// https://github.com/natevw/fermata/blob/5d9732a33d776ce925013a265935facd1626cc88/fermata.js#L315-L343
const multipartDataGenerator = (method, data, headers)=>{
    const segno = (Math.round(Math.random() * 1e16) + Math.round(Math.random() * 1e16)).toString();
    headers['Content-Type'] = `multipart/form-data; boundary=${segno}`;
    const textEncoder = new TextEncoder();
    let buffer = new Uint8Array(0);
    const endBuffer = textEncoder.encode('\r\n');
    function push(l) {
        const prevBuffer = buffer;
        const newBuffer = l instanceof Uint8Array ? l : new Uint8Array(textEncoder.encode(l));
        buffer = new Uint8Array(prevBuffer.length + newBuffer.length + 2);
        buffer.set(prevBuffer);
        buffer.set(newBuffer, prevBuffer.length);
        buffer.set(endBuffer, buffer.length - 2);
    }
    function q(s) {
        return `"${s.replace(/"|"/g, '%22').replace(/\r\n|\r|\n/g, ' ')}"`;
    }
    const flattenedData = flattenAndStringify(data);
    for(const k in flattenedData){
        if (!Object.prototype.hasOwnProperty.call(flattenedData, k)) {
            continue;
        }
        const v = flattenedData[k];
        push(`--${segno}`);
        if (Object.prototype.hasOwnProperty.call(v, 'data')) {
            const typedEntry = v;
            push(`Content-Disposition: form-data; name=${q(k)}; filename=${q(typedEntry.name || 'blob')}`);
            push(`Content-Type: ${typedEntry.type || 'application/octet-stream'}`);
            push('');
            push(typedEntry.data);
        } else {
            push(`Content-Disposition: form-data; name=${q(k)}`);
            push('');
            push(v);
        }
    }
    push(`--${segno}--`);
    return buffer;
};
function multipartRequestDataProcessor(method, data, headers, callback) {
    data = data || {};
    if (method !== 'POST') {
        return callback(null, queryStringifyRequestData(data));
    }
    this._stripe._platformFunctions.tryBufferData(data).then((bufferedData)=>{
        const buffer = multipartDataGenerator(method, bufferedData, headers);
        return callback(null, buffer);
    }).catch((err)=>callback(err, null));
}

// File generated from our OpenAPI spec
const stripeMethod$w = StripeResource.method;
const Files = StripeResource.extend({
    create: stripeMethod$w({
        method: 'POST',
        fullPath: '/v1/files',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        host: 'files.stripe.com'
    }),
    retrieve: stripeMethod$w({
        method: 'GET',
        fullPath: '/v1/files/{file}'
    }),
    list: stripeMethod$w({
        method: 'GET',
        fullPath: '/v1/files',
        methodType: 'list'
    }),
    requestDataProcessor: multipartRequestDataProcessor
});

// File generated from our OpenAPI spec
const stripeMethod$v = StripeResource.method;
const InvoiceItems = StripeResource.extend({
    create: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoiceitems'
    }),
    retrieve: stripeMethod$v({
        method: 'GET',
        fullPath: '/v1/invoiceitems/{invoiceitem}'
    }),
    update: stripeMethod$v({
        method: 'POST',
        fullPath: '/v1/invoiceitems/{invoiceitem}'
    }),
    list: stripeMethod$v({
        method: 'GET',
        fullPath: '/v1/invoiceitems',
        methodType: 'list'
    }),
    del: stripeMethod$v({
        method: 'DELETE',
        fullPath: '/v1/invoiceitems/{invoiceitem}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$u = StripeResource.method;
const InvoiceRenderingTemplates = StripeResource.extend({
    retrieve: stripeMethod$u({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates/{template}'
    }),
    list: stripeMethod$u({
        method: 'GET',
        fullPath: '/v1/invoice_rendering_templates',
        methodType: 'list'
    }),
    archive: stripeMethod$u({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/archive'
    }),
    unarchive: stripeMethod$u({
        method: 'POST',
        fullPath: '/v1/invoice_rendering_templates/{template}/unarchive'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$t = StripeResource.method;
const Invoices = StripeResource.extend({
    create: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices'
    }),
    retrieve: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}'
    }),
    update: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}'
    }),
    list: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices',
        methodType: 'list'
    }),
    del: stripeMethod$t({
        method: 'DELETE',
        fullPath: '/v1/invoices/{invoice}'
    }),
    addLines: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/add_lines'
    }),
    createPreview: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/create_preview'
    }),
    finalizeInvoice: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/finalize'
    }),
    listLineItems: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices/{invoice}/lines',
        methodType: 'list'
    }),
    listUpcomingLines: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices/upcoming/lines',
        methodType: 'list'
    }),
    markUncollectible: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/mark_uncollectible'
    }),
    pay: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/pay'
    }),
    removeLines: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/remove_lines'
    }),
    retrieveUpcoming: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices/upcoming'
    }),
    search: stripeMethod$t({
        method: 'GET',
        fullPath: '/v1/invoices/search',
        methodType: 'search'
    }),
    sendInvoice: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/send'
    }),
    updateLines: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/update_lines'
    }),
    updateLineItem: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/lines/{line_item_id}'
    }),
    voidInvoice: stripeMethod$t({
        method: 'POST',
        fullPath: '/v1/invoices/{invoice}/void'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$s = StripeResource.method;
const Mandates = StripeResource.extend({
    retrieve: stripeMethod$s({
        method: 'GET',
        fullPath: '/v1/mandates/{mandate}'
    })
});

const stripeMethod$r = StripeResource.method;
const oAuthHost = 'connect.stripe.com';
const OAuth = StripeResource.extend({
    basePath: '/',
    authorizeUrl (params, options) {
        params = params || {};
        options = options || {};
        let path = 'oauth/authorize';
        // For Express accounts, the path changes
        if (options.express) {
            path = `express/${path}`;
        }
        if (!params.response_type) {
            params.response_type = 'code';
        }
        if (!params.client_id) {
            params.client_id = this._stripe.getClientId();
        }
        if (!params.scope) {
            params.scope = 'read_write';
        }
        return `https://${oAuthHost}/${path}?${queryStringifyRequestData(params)}`;
    },
    token: stripeMethod$r({
        method: 'POST',
        path: 'oauth/token',
        host: oAuthHost
    }),
    deauthorize (spec, ...args) {
        if (!spec.client_id) {
            spec.client_id = this._stripe.getClientId();
        }
        return stripeMethod$r({
            method: 'POST',
            path: 'oauth/deauthorize',
            host: oAuthHost
        }).apply(this, [
            spec,
            ...args
        ]);
    }
});

// File generated from our OpenAPI spec
const stripeMethod$q = StripeResource.method;
const PaymentIntents = StripeResource.extend({
    create: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents'
    }),
    retrieve: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_intents/{intent}'
    }),
    update: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}'
    }),
    list: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_intents',
        methodType: 'list'
    }),
    applyCustomerBalance: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/apply_customer_balance'
    }),
    cancel: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/cancel'
    }),
    capture: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/capture'
    }),
    confirm: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/confirm'
    }),
    incrementAuthorization: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/increment_authorization'
    }),
    search: stripeMethod$q({
        method: 'GET',
        fullPath: '/v1/payment_intents/search',
        methodType: 'search'
    }),
    verifyMicrodeposits: stripeMethod$q({
        method: 'POST',
        fullPath: '/v1/payment_intents/{intent}/verify_microdeposits'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$p = StripeResource.method;
const PaymentLinks = StripeResource.extend({
    create: stripeMethod$p({
        method: 'POST',
        fullPath: '/v1/payment_links'
    }),
    retrieve: stripeMethod$p({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}'
    }),
    update: stripeMethod$p({
        method: 'POST',
        fullPath: '/v1/payment_links/{payment_link}'
    }),
    list: stripeMethod$p({
        method: 'GET',
        fullPath: '/v1/payment_links',
        methodType: 'list'
    }),
    listLineItems: stripeMethod$p({
        method: 'GET',
        fullPath: '/v1/payment_links/{payment_link}/line_items',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$o = StripeResource.method;
const PaymentMethodConfigurations = StripeResource.extend({
    create: stripeMethod$o({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations'
    }),
    retrieve: stripeMethod$o({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations/{configuration}'
    }),
    update: stripeMethod$o({
        method: 'POST',
        fullPath: '/v1/payment_method_configurations/{configuration}'
    }),
    list: stripeMethod$o({
        method: 'GET',
        fullPath: '/v1/payment_method_configurations',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$n = StripeResource.method;
const PaymentMethodDomains = StripeResource.extend({
    create: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_method_domains'
    }),
    retrieve: stripeMethod$n({
        method: 'GET',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}'
    }),
    update: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}'
    }),
    list: stripeMethod$n({
        method: 'GET',
        fullPath: '/v1/payment_method_domains',
        methodType: 'list'
    }),
    validate: stripeMethod$n({
        method: 'POST',
        fullPath: '/v1/payment_method_domains/{payment_method_domain}/validate'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$m = StripeResource.method;
const PaymentMethods = StripeResource.extend({
    create: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_methods'
    }),
    retrieve: stripeMethod$m({
        method: 'GET',
        fullPath: '/v1/payment_methods/{payment_method}'
    }),
    update: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}'
    }),
    list: stripeMethod$m({
        method: 'GET',
        fullPath: '/v1/payment_methods',
        methodType: 'list'
    }),
    attach: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/attach'
    }),
    detach: stripeMethod$m({
        method: 'POST',
        fullPath: '/v1/payment_methods/{payment_method}/detach'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$l = StripeResource.method;
const Payouts = StripeResource.extend({
    create: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts'
    }),
    retrieve: stripeMethod$l({
        method: 'GET',
        fullPath: '/v1/payouts/{payout}'
    }),
    update: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}'
    }),
    list: stripeMethod$l({
        method: 'GET',
        fullPath: '/v1/payouts',
        methodType: 'list'
    }),
    cancel: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/cancel'
    }),
    reverse: stripeMethod$l({
        method: 'POST',
        fullPath: '/v1/payouts/{payout}/reverse'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$k = StripeResource.method;
const Plans = StripeResource.extend({
    create: stripeMethod$k({
        method: 'POST',
        fullPath: '/v1/plans'
    }),
    retrieve: stripeMethod$k({
        method: 'GET',
        fullPath: '/v1/plans/{plan}'
    }),
    update: stripeMethod$k({
        method: 'POST',
        fullPath: '/v1/plans/{plan}'
    }),
    list: stripeMethod$k({
        method: 'GET',
        fullPath: '/v1/plans',
        methodType: 'list'
    }),
    del: stripeMethod$k({
        method: 'DELETE',
        fullPath: '/v1/plans/{plan}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$j = StripeResource.method;
const Prices = StripeResource.extend({
    create: stripeMethod$j({
        method: 'POST',
        fullPath: '/v1/prices'
    }),
    retrieve: stripeMethod$j({
        method: 'GET',
        fullPath: '/v1/prices/{price}'
    }),
    update: stripeMethod$j({
        method: 'POST',
        fullPath: '/v1/prices/{price}'
    }),
    list: stripeMethod$j({
        method: 'GET',
        fullPath: '/v1/prices',
        methodType: 'list'
    }),
    search: stripeMethod$j({
        method: 'GET',
        fullPath: '/v1/prices/search',
        methodType: 'search'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$i = StripeResource.method;
const Products = StripeResource.extend({
    create: stripeMethod$i({
        method: 'POST',
        fullPath: '/v1/products'
    }),
    retrieve: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/{id}'
    }),
    update: stripeMethod$i({
        method: 'POST',
        fullPath: '/v1/products/{id}'
    }),
    list: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products',
        methodType: 'list'
    }),
    del: stripeMethod$i({
        method: 'DELETE',
        fullPath: '/v1/products/{id}'
    }),
    createFeature: stripeMethod$i({
        method: 'POST',
        fullPath: '/v1/products/{product}/features'
    }),
    deleteFeature: stripeMethod$i({
        method: 'DELETE',
        fullPath: '/v1/products/{product}/features/{id}'
    }),
    listFeatures: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/{product}/features',
        methodType: 'list'
    }),
    retrieveFeature: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/{product}/features/{id}'
    }),
    search: stripeMethod$i({
        method: 'GET',
        fullPath: '/v1/products/search',
        methodType: 'search'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$h = StripeResource.method;
const PromotionCodes = StripeResource.extend({
    create: stripeMethod$h({
        method: 'POST',
        fullPath: '/v1/promotion_codes'
    }),
    retrieve: stripeMethod$h({
        method: 'GET',
        fullPath: '/v1/promotion_codes/{promotion_code}'
    }),
    update: stripeMethod$h({
        method: 'POST',
        fullPath: '/v1/promotion_codes/{promotion_code}'
    }),
    list: stripeMethod$h({
        method: 'GET',
        fullPath: '/v1/promotion_codes',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$g = StripeResource.method;
const Quotes = StripeResource.extend({
    create: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes'
    }),
    retrieve: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}'
    }),
    update: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}'
    }),
    list: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes',
        methodType: 'list'
    }),
    accept: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/accept'
    }),
    cancel: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/cancel'
    }),
    finalizeQuote: stripeMethod$g({
        method: 'POST',
        fullPath: '/v1/quotes/{quote}/finalize'
    }),
    listComputedUpfrontLineItems: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/computed_upfront_line_items',
        methodType: 'list'
    }),
    listLineItems: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/line_items',
        methodType: 'list'
    }),
    pdf: stripeMethod$g({
        method: 'GET',
        fullPath: '/v1/quotes/{quote}/pdf',
        host: 'files.stripe.com',
        streaming: true
    })
});

// File generated from our OpenAPI spec
const stripeMethod$f = StripeResource.method;
const Refunds = StripeResource.extend({
    create: stripeMethod$f({
        method: 'POST',
        fullPath: '/v1/refunds'
    }),
    retrieve: stripeMethod$f({
        method: 'GET',
        fullPath: '/v1/refunds/{refund}'
    }),
    update: stripeMethod$f({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}'
    }),
    list: stripeMethod$f({
        method: 'GET',
        fullPath: '/v1/refunds',
        methodType: 'list'
    }),
    cancel: stripeMethod$f({
        method: 'POST',
        fullPath: '/v1/refunds/{refund}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$e = StripeResource.method;
const Reviews = StripeResource.extend({
    retrieve: stripeMethod$e({
        method: 'GET',
        fullPath: '/v1/reviews/{review}'
    }),
    list: stripeMethod$e({
        method: 'GET',
        fullPath: '/v1/reviews',
        methodType: 'list'
    }),
    approve: stripeMethod$e({
        method: 'POST',
        fullPath: '/v1/reviews/{review}/approve'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$d = StripeResource.method;
const SetupAttempts = StripeResource.extend({
    list: stripeMethod$d({
        method: 'GET',
        fullPath: '/v1/setup_attempts',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$c = StripeResource.method;
const SetupIntents = StripeResource.extend({
    create: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents'
    }),
    retrieve: stripeMethod$c({
        method: 'GET',
        fullPath: '/v1/setup_intents/{intent}'
    }),
    update: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}'
    }),
    list: stripeMethod$c({
        method: 'GET',
        fullPath: '/v1/setup_intents',
        methodType: 'list'
    }),
    cancel: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/cancel'
    }),
    confirm: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/confirm'
    }),
    verifyMicrodeposits: stripeMethod$c({
        method: 'POST',
        fullPath: '/v1/setup_intents/{intent}/verify_microdeposits'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$b = StripeResource.method;
const ShippingRates = StripeResource.extend({
    create: stripeMethod$b({
        method: 'POST',
        fullPath: '/v1/shipping_rates'
    }),
    retrieve: stripeMethod$b({
        method: 'GET',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}'
    }),
    update: stripeMethod$b({
        method: 'POST',
        fullPath: '/v1/shipping_rates/{shipping_rate_token}'
    }),
    list: stripeMethod$b({
        method: 'GET',
        fullPath: '/v1/shipping_rates',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$a = StripeResource.method;
const Sources = StripeResource.extend({
    create: stripeMethod$a({
        method: 'POST',
        fullPath: '/v1/sources'
    }),
    retrieve: stripeMethod$a({
        method: 'GET',
        fullPath: '/v1/sources/{source}'
    }),
    update: stripeMethod$a({
        method: 'POST',
        fullPath: '/v1/sources/{source}'
    }),
    listSourceTransactions: stripeMethod$a({
        method: 'GET',
        fullPath: '/v1/sources/{source}/source_transactions',
        methodType: 'list'
    }),
    verify: stripeMethod$a({
        method: 'POST',
        fullPath: '/v1/sources/{source}/verify'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$9 = StripeResource.method;
const SubscriptionItems = StripeResource.extend({
    create: stripeMethod$9({
        method: 'POST',
        fullPath: '/v1/subscription_items'
    }),
    retrieve: stripeMethod$9({
        method: 'GET',
        fullPath: '/v1/subscription_items/{item}'
    }),
    update: stripeMethod$9({
        method: 'POST',
        fullPath: '/v1/subscription_items/{item}'
    }),
    list: stripeMethod$9({
        method: 'GET',
        fullPath: '/v1/subscription_items',
        methodType: 'list'
    }),
    del: stripeMethod$9({
        method: 'DELETE',
        fullPath: '/v1/subscription_items/{item}'
    }),
    createUsageRecord: stripeMethod$9({
        method: 'POST',
        fullPath: '/v1/subscription_items/{subscription_item}/usage_records'
    }),
    listUsageRecordSummaries: stripeMethod$9({
        method: 'GET',
        fullPath: '/v1/subscription_items/{subscription_item}/usage_record_summaries',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$8 = StripeResource.method;
const SubscriptionSchedules = StripeResource.extend({
    create: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules'
    }),
    retrieve: stripeMethod$8({
        method: 'GET',
        fullPath: '/v1/subscription_schedules/{schedule}'
    }),
    update: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}'
    }),
    list: stripeMethod$8({
        method: 'GET',
        fullPath: '/v1/subscription_schedules',
        methodType: 'list'
    }),
    cancel: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/cancel'
    }),
    release: stripeMethod$8({
        method: 'POST',
        fullPath: '/v1/subscription_schedules/{schedule}/release'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$7 = StripeResource.method;
const Subscriptions = StripeResource.extend({
    create: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions'
    }),
    retrieve: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}'
    }),
    update: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}'
    }),
    list: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions',
        methodType: 'list'
    }),
    cancel: stripeMethod$7({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}'
    }),
    deleteDiscount: stripeMethod$7({
        method: 'DELETE',
        fullPath: '/v1/subscriptions/{subscription_exposed_id}/discount'
    }),
    resume: stripeMethod$7({
        method: 'POST',
        fullPath: '/v1/subscriptions/{subscription}/resume'
    }),
    search: stripeMethod$7({
        method: 'GET',
        fullPath: '/v1/subscriptions/search',
        methodType: 'search'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$6 = StripeResource.method;
const TaxCodes = StripeResource.extend({
    retrieve: stripeMethod$6({
        method: 'GET',
        fullPath: '/v1/tax_codes/{id}'
    }),
    list: stripeMethod$6({
        method: 'GET',
        fullPath: '/v1/tax_codes',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$5 = StripeResource.method;
const TaxIds = StripeResource.extend({
    create: stripeMethod$5({
        method: 'POST',
        fullPath: '/v1/tax_ids'
    }),
    retrieve: stripeMethod$5({
        method: 'GET',
        fullPath: '/v1/tax_ids/{id}'
    }),
    list: stripeMethod$5({
        method: 'GET',
        fullPath: '/v1/tax_ids',
        methodType: 'list'
    }),
    del: stripeMethod$5({
        method: 'DELETE',
        fullPath: '/v1/tax_ids/{id}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$4 = StripeResource.method;
const TaxRates = StripeResource.extend({
    create: stripeMethod$4({
        method: 'POST',
        fullPath: '/v1/tax_rates'
    }),
    retrieve: stripeMethod$4({
        method: 'GET',
        fullPath: '/v1/tax_rates/{tax_rate}'
    }),
    update: stripeMethod$4({
        method: 'POST',
        fullPath: '/v1/tax_rates/{tax_rate}'
    }),
    list: stripeMethod$4({
        method: 'GET',
        fullPath: '/v1/tax_rates',
        methodType: 'list'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$3 = StripeResource.method;
const Tokens = StripeResource.extend({
    create: stripeMethod$3({
        method: 'POST',
        fullPath: '/v1/tokens'
    }),
    retrieve: stripeMethod$3({
        method: 'GET',
        fullPath: '/v1/tokens/{token}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$2 = StripeResource.method;
const Topups = StripeResource.extend({
    create: stripeMethod$2({
        method: 'POST',
        fullPath: '/v1/topups'
    }),
    retrieve: stripeMethod$2({
        method: 'GET',
        fullPath: '/v1/topups/{topup}'
    }),
    update: stripeMethod$2({
        method: 'POST',
        fullPath: '/v1/topups/{topup}'
    }),
    list: stripeMethod$2({
        method: 'GET',
        fullPath: '/v1/topups',
        methodType: 'list'
    }),
    cancel: stripeMethod$2({
        method: 'POST',
        fullPath: '/v1/topups/{topup}/cancel'
    })
});

// File generated from our OpenAPI spec
const stripeMethod$1 = StripeResource.method;
const Transfers = StripeResource.extend({
    create: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers'
    }),
    retrieve: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}'
    }),
    update: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}'
    }),
    list: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers',
        methodType: 'list'
    }),
    createReversal: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers/{id}/reversals'
    }),
    listReversals: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers/{id}/reversals',
        methodType: 'list'
    }),
    retrieveReversal: stripeMethod$1({
        method: 'GET',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}'
    }),
    updateReversal: stripeMethod$1({
        method: 'POST',
        fullPath: '/v1/transfers/{transfer}/reversals/{id}'
    })
});

// File generated from our OpenAPI spec
const stripeMethod = StripeResource.method;
const WebhookEndpoints = StripeResource.extend({
    create: stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints'
    }),
    retrieve: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}'
    }),
    update: stripeMethod({
        method: 'POST',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}'
    }),
    list: stripeMethod({
        method: 'GET',
        fullPath: '/v1/webhook_endpoints',
        methodType: 'list'
    }),
    del: stripeMethod({
        method: 'DELETE',
        fullPath: '/v1/webhook_endpoints/{webhook_endpoint}'
    })
});

// File generated from our OpenAPI spec
const Apps = resourceNamespace('apps', {
    Secrets: Secrets
});
const Billing = resourceNamespace('billing', {
    Alerts: Alerts,
    CreditBalanceSummary: CreditBalanceSummary,
    CreditBalanceTransactions: CreditBalanceTransactions,
    CreditGrants: CreditGrants,
    MeterEventAdjustments: MeterEventAdjustments$1,
    MeterEvents: MeterEvents$1,
    Meters: Meters
});
const BillingPortal = resourceNamespace('billingPortal', {
    Configurations: Configurations$1,
    Sessions: Sessions$2
});
const Checkout = resourceNamespace('checkout', {
    Sessions: Sessions$1
});
const Climate = resourceNamespace('climate', {
    Orders: Orders,
    Products: Products$1,
    Suppliers: Suppliers
});
const Entitlements = resourceNamespace('entitlements', {
    ActiveEntitlements: ActiveEntitlements,
    Features: Features
});
const FinancialConnections = resourceNamespace('financialConnections', {
    Accounts: Accounts$1,
    Sessions: Sessions,
    Transactions: Transactions$3
});
const Forwarding = resourceNamespace('forwarding', {
    Requests: Requests
});
const Identity = resourceNamespace('identity', {
    VerificationReports: VerificationReports,
    VerificationSessions: VerificationSessions
});
const Issuing = resourceNamespace('issuing', {
    Authorizations: Authorizations,
    Cardholders: Cardholders,
    Cards: Cards,
    Disputes: Disputes$1,
    PersonalizationDesigns: PersonalizationDesigns,
    PhysicalBundles: PhysicalBundles,
    Tokens: Tokens$1,
    Transactions: Transactions$2
});
const Radar = resourceNamespace('radar', {
    EarlyFraudWarnings: EarlyFraudWarnings,
    ValueListItems: ValueListItems,
    ValueLists: ValueLists
});
const Reporting = resourceNamespace('reporting', {
    ReportRuns: ReportRuns,
    ReportTypes: ReportTypes
});
const Sigma = resourceNamespace('sigma', {
    ScheduledQueryRuns: ScheduledQueryRuns
});
const Tax = resourceNamespace('tax', {
    Calculations: Calculations,
    Registrations: Registrations,
    Settings: Settings,
    Transactions: Transactions$1
});
const Terminal = resourceNamespace('terminal', {
    Configurations: Configurations,
    ConnectionTokens: ConnectionTokens,
    Locations: Locations,
    Readers: Readers
});
const TestHelpers = resourceNamespace('testHelpers', {
    ConfirmationTokens: ConfirmationTokens$1,
    Customers: Customers$1,
    Refunds: Refunds$1,
    TestClocks: TestClocks,
    Issuing: resourceNamespace('issuing', {
        Authorizations: Authorizations$1,
        Cards: Cards$1,
        PersonalizationDesigns: PersonalizationDesigns$1,
        Transactions: Transactions$4
    }),
    Terminal: resourceNamespace('terminal', {
        Readers: Readers$1
    }),
    Treasury: resourceNamespace('treasury', {
        InboundTransfers: InboundTransfers$1,
        OutboundPayments: OutboundPayments$1,
        OutboundTransfers: OutboundTransfers$1,
        ReceivedCredits: ReceivedCredits$1,
        ReceivedDebits: ReceivedDebits$1
    })
});
const Treasury = resourceNamespace('treasury', {
    CreditReversals: CreditReversals,
    DebitReversals: DebitReversals,
    FinancialAccounts: FinancialAccounts,
    InboundTransfers: InboundTransfers,
    OutboundPayments: OutboundPayments,
    OutboundTransfers: OutboundTransfers,
    ReceivedCredits: ReceivedCredits,
    ReceivedDebits: ReceivedDebits,
    TransactionEntries: TransactionEntries,
    Transactions: Transactions
});
const V2 = resourceNamespace('v2', {
    Billing: resourceNamespace('billing', {
        MeterEventAdjustments: MeterEventAdjustments,
        MeterEventSession: MeterEventSession,
        MeterEventStream: MeterEventStream,
        MeterEvents: MeterEvents
    }),
    Core: resourceNamespace('core', {
        EventDestinations: EventDestinations,
        Events: Events$1
    })
});

var resources = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Account: Accounts,
  AccountLinks: AccountLinks,
  AccountSessions: AccountSessions,
  Accounts: Accounts,
  ApplePayDomains: ApplePayDomains,
  ApplicationFees: ApplicationFees,
  Apps: Apps,
  Balance: Balance,
  BalanceTransactions: BalanceTransactions,
  Billing: Billing,
  BillingPortal: BillingPortal,
  Charges: Charges,
  Checkout: Checkout,
  Climate: Climate,
  ConfirmationTokens: ConfirmationTokens,
  CountrySpecs: CountrySpecs,
  Coupons: Coupons,
  CreditNotes: CreditNotes,
  CustomerSessions: CustomerSessions,
  Customers: Customers,
  Disputes: Disputes,
  Entitlements: Entitlements,
  EphemeralKeys: EphemeralKeys,
  Events: Events,
  ExchangeRates: ExchangeRates,
  FileLinks: FileLinks,
  Files: Files,
  FinancialConnections: FinancialConnections,
  Forwarding: Forwarding,
  Identity: Identity,
  InvoiceItems: InvoiceItems,
  InvoiceRenderingTemplates: InvoiceRenderingTemplates,
  Invoices: Invoices,
  Issuing: Issuing,
  Mandates: Mandates,
  OAuth: OAuth,
  PaymentIntents: PaymentIntents,
  PaymentLinks: PaymentLinks,
  PaymentMethodConfigurations: PaymentMethodConfigurations,
  PaymentMethodDomains: PaymentMethodDomains,
  PaymentMethods: PaymentMethods,
  Payouts: Payouts,
  Plans: Plans,
  Prices: Prices,
  Products: Products,
  PromotionCodes: PromotionCodes,
  Quotes: Quotes,
  Radar: Radar,
  Refunds: Refunds,
  Reporting: Reporting,
  Reviews: Reviews,
  SetupAttempts: SetupAttempts,
  SetupIntents: SetupIntents,
  ShippingRates: ShippingRates,
  Sigma: Sigma,
  Sources: Sources,
  SubscriptionItems: SubscriptionItems,
  SubscriptionSchedules: SubscriptionSchedules,
  Subscriptions: Subscriptions,
  Tax: Tax,
  TaxCodes: TaxCodes,
  TaxIds: TaxIds,
  TaxRates: TaxRates,
  Terminal: Terminal,
  TestHelpers: TestHelpers,
  Tokens: Tokens,
  Topups: Topups,
  Transfers: Transfers,
  Treasury: Treasury,
  V2: V2,
  WebhookEndpoints: WebhookEndpoints
});

const DEFAULT_HOST = 'api.stripe.com';
const DEFAULT_PORT = '443';
const DEFAULT_BASE_PATH = '/v1/';
const DEFAULT_API_VERSION = ApiVersion;
const DEFAULT_TIMEOUT = 80000;
const MAX_NETWORK_RETRY_DELAY_SEC = 5;
const INITIAL_NETWORK_RETRY_DELAY_SEC = 0.5;
const APP_INFO_PROPERTIES = [
    'name',
    'version',
    'url',
    'partner_id'
];
const ALLOWED_CONFIG_PROPERTIES = [
    'authenticator',
    'apiVersion',
    'typescript',
    'maxNetworkRetries',
    'httpAgent',
    'httpClient',
    'timeout',
    'host',
    'port',
    'protocol',
    'telemetry',
    'appInfo',
    'stripeAccount',
    'stripeContext'
];
const defaultRequestSenderFactory = (stripe)=>new RequestSender(stripe, StripeResource.MAX_BUFFERED_REQUEST_METRICS);
function createStripe(platformFunctions, requestSender = defaultRequestSenderFactory) {
    Stripe.PACKAGE_VERSION = '17.7.0';
    Stripe.USER_AGENT = Object.assign({
        bindings_version: Stripe.PACKAGE_VERSION,
        lang: 'node',
        publisher: 'stripe',
        uname: null,
        typescript: false
    }, determineProcessUserAgentProperties());
    Stripe.StripeResource = StripeResource;
    Stripe.resources = resources;
    Stripe.HttpClient = HttpClient;
    Stripe.HttpClientResponse = HttpClientResponse;
    Stripe.CryptoProvider = CryptoProvider;
    // Previously Stripe.webhooks was just the createWebhooks() factory function
    // however going forward it will be a WebhookObject instance. To maintain
    // backwards compatibility it is currently a factory function that also
    // complies to the WebhookObject signature. The factory function signature
    // will be removed as a breaking change in the next major release.
    // See https://github.com/stripe/stripe-node/issues/1956
    function createWebhooksDefault(fns = platformFunctions) {
        return createWebhooks(fns);
    }
    Stripe.webhooks = Object.assign(createWebhooksDefault, createWebhooks(platformFunctions));
    function Stripe(key, config = {}) {
        if (!(this instanceof Stripe)) {
            return new Stripe(key, config);
        }
        const props = this._getPropsFromConfig(config);
        this._platformFunctions = platformFunctions;
        Object.defineProperty(this, '_emitter', {
            value: this._platformFunctions.createEmitter(),
            enumerable: false,
            configurable: false,
            writable: false
        });
        this.VERSION = Stripe.PACKAGE_VERSION;
        this.on = this._emitter.on.bind(this._emitter);
        this.once = this._emitter.once.bind(this._emitter);
        this.off = this._emitter.removeListener.bind(this._emitter);
        const agent = props.httpAgent || null;
        this._api = {
            host: props.host || DEFAULT_HOST,
            port: props.port || DEFAULT_PORT,
            protocol: props.protocol || 'https',
            basePath: DEFAULT_BASE_PATH,
            version: props.apiVersion || DEFAULT_API_VERSION,
            timeout: validateInteger('timeout', props.timeout, DEFAULT_TIMEOUT),
            maxNetworkRetries: validateInteger('maxNetworkRetries', props.maxNetworkRetries, 2),
            agent: agent,
            httpClient: props.httpClient || (agent ? this._platformFunctions.createNodeHttpClient(agent) : this._platformFunctions.createDefaultHttpClient()),
            dev: false,
            stripeAccount: props.stripeAccount || null,
            stripeContext: props.stripeContext || null
        };
        const typescript = props.typescript || false;
        if (typescript !== Stripe.USER_AGENT.typescript) {
            // The mutation here is uncomfortable, but likely fastest;
            // serializing the user agent involves shelling out to the system,
            // and given some users may instantiate the library many times without switching between TS and non-TS,
            // we only want to incur the performance hit when that actually happens.
            Stripe.USER_AGENT.typescript = typescript;
        }
        if (props.appInfo) {
            this._setAppInfo(props.appInfo);
        }
        this._prepResources();
        this._setAuthenticator(key, props.authenticator);
        this.errors = _Error;
        // Once Stripe.webhooks looses the factory function signature in a future release
        // then this should become this.webhooks = Stripe.webhooks
        this.webhooks = createWebhooksDefault();
        this._prevRequestMetrics = [];
        this._enableTelemetry = props.telemetry !== false;
        this._requestSender = requestSender(this);
        // Expose StripeResource on the instance too
        // @ts-ignore
        this.StripeResource = Stripe.StripeResource;
    }
    Stripe.errors = _Error;
    Stripe.createNodeHttpClient = platformFunctions.createNodeHttpClient;
    /**
     * Creates an HTTP client for issuing Stripe API requests which uses the Web
     * Fetch API.
     *
     * A fetch function can optionally be passed in as a parameter. If none is
     * passed, will default to the default `fetch` function in the global scope.
     */ Stripe.createFetchHttpClient = platformFunctions.createFetchHttpClient;
    /**
     * Create a CryptoProvider which uses the built-in Node crypto libraries for
     * its crypto operations.
     */ Stripe.createNodeCryptoProvider = platformFunctions.createNodeCryptoProvider;
    /**
     * Creates a CryptoProvider which uses the Subtle Crypto API from the Web
     * Crypto API spec for its crypto operations.
     *
     * A SubtleCrypto interface can optionally be passed in as a parameter. If none
     * is passed, will default to the default `crypto.subtle` object in the global
     * scope.
     */ Stripe.createSubtleCryptoProvider = platformFunctions.createSubtleCryptoProvider;
    Stripe.prototype = {
        // Properties are set in the constructor above
        _appInfo: undefined,
        on: null,
        off: null,
        once: null,
        VERSION: null,
        StripeResource: null,
        webhooks: null,
        errors: null,
        _api: null,
        _prevRequestMetrics: null,
        _emitter: null,
        _enableTelemetry: null,
        _requestSender: null,
        _platformFunctions: null,
        rawRequest (method, path, params, options) {
            return this._requestSender._rawRequest(method, path, params, options);
        },
        /**
         * @private
         */ _setAuthenticator (key, authenticator) {
            if (key && authenticator) {
                throw new Error("Can't specify both apiKey and authenticator");
            }
            if (!key && !authenticator) {
                throw new Error('Neither apiKey nor config.authenticator provided');
            }
            this._authenticator = key ? createApiKeyAuthenticator(key) : authenticator;
        },
        /**
         * @private
         * This may be removed in the future.
         */ _setAppInfo (info) {
            if (info && typeof info !== 'object') {
                throw new Error('AppInfo must be an object.');
            }
            if (info && !info.name) {
                throw new Error('AppInfo.name is required');
            }
            info = info || {};
            this._appInfo = APP_INFO_PROPERTIES.reduce((accum, prop)=>{
                if (typeof info[prop] == 'string') {
                    accum = accum || {};
                    accum[prop] = info[prop];
                }
                return accum;
            }, // @ts-ignore
            undefined);
        },
        /**
         * @private
         * This may be removed in the future.
         */ _setApiField (key, value) {
            this._api[key] = value;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */ getApiField (key) {
            return this._api[key];
        },
        setClientId (clientId) {
            this._clientId = clientId;
        },
        getClientId () {
            return this._clientId;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */ getConstant: (c)=>{
            switch(c){
                case 'DEFAULT_HOST':
                    return DEFAULT_HOST;
                case 'DEFAULT_PORT':
                    return DEFAULT_PORT;
                case 'DEFAULT_BASE_PATH':
                    return DEFAULT_BASE_PATH;
                case 'DEFAULT_API_VERSION':
                    return DEFAULT_API_VERSION;
                case 'DEFAULT_TIMEOUT':
                    return DEFAULT_TIMEOUT;
                case 'MAX_NETWORK_RETRY_DELAY_SEC':
                    return MAX_NETWORK_RETRY_DELAY_SEC;
                case 'INITIAL_NETWORK_RETRY_DELAY_SEC':
                    return INITIAL_NETWORK_RETRY_DELAY_SEC;
            }
            return Stripe[c];
        },
        getMaxNetworkRetries () {
            return this.getApiField('maxNetworkRetries');
        },
        /**
         * @private
         * This may be removed in the future.
         */ _setApiNumberField (prop, n, defaultVal) {
            const val = validateInteger(prop, n, defaultVal);
            this._setApiField(prop, val);
        },
        getMaxNetworkRetryDelay () {
            return MAX_NETWORK_RETRY_DELAY_SEC;
        },
        getInitialNetworkRetryDelay () {
            return INITIAL_NETWORK_RETRY_DELAY_SEC;
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent and uses a cached version for a slight
         * speed advantage.
         */ getClientUserAgent (cb) {
            return this.getClientUserAgentSeeded(Stripe.USER_AGENT, cb);
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         *
         * Gets a JSON version of a User-Agent by encoding a seeded object and
         * fetching a uname from the system.
         */ getClientUserAgentSeeded (seed, cb) {
            this._platformFunctions.getUname().then((uname)=>{
                var _a;
                const userAgent = {};
                for(const field in seed){
                    if (!Object.prototype.hasOwnProperty.call(seed, field)) {
                        continue;
                    }
                    userAgent[field] = encodeURIComponent((_a = seed[field]) !== null && _a !== void 0 ? _a : 'null');
                }
                // URI-encode in case there are unusual characters in the system's uname.
                userAgent.uname = encodeURIComponent(uname || 'UNKNOWN');
                const client = this.getApiField('httpClient');
                if (client) {
                    userAgent.httplib = encodeURIComponent(client.getClientName());
                }
                if (this._appInfo) {
                    userAgent.application = this._appInfo;
                }
                cb(JSON.stringify(userAgent));
            });
        },
        /**
         * @private
         * Please open or upvote an issue at github.com/stripe/stripe-node
         * if you use this, detailing your use-case.
         *
         * It may be deprecated and removed in the future.
         */ getAppInfoAsString () {
            if (!this._appInfo) {
                return '';
            }
            let formatted = this._appInfo.name;
            if (this._appInfo.version) {
                formatted += `/${this._appInfo.version}`;
            }
            if (this._appInfo.url) {
                formatted += ` (${this._appInfo.url})`;
            }
            return formatted;
        },
        getTelemetryEnabled () {
            return this._enableTelemetry;
        },
        /**
         * @private
         * This may be removed in the future.
         */ _prepResources () {
            for(const name in resources){
                if (!Object.prototype.hasOwnProperty.call(resources, name)) {
                    continue;
                }
                // @ts-ignore
                this[pascalToCamelCase(name)] = new resources[name](this);
            }
        },
        /**
         * @private
         * This may be removed in the future.
         */ _getPropsFromConfig (config) {
            // If config is null or undefined, just bail early with no props
            if (!config) {
                return {};
            }
            // config can be an object or a string
            const isString = typeof config === 'string';
            const isObject = config === Object(config) && !Array.isArray(config);
            if (!isObject && !isString) {
                throw new Error('Config must either be an object or a string');
            }
            // If config is a string, we assume the old behavior of passing in a string representation of the api version
            if (isString) {
                return {
                    apiVersion: config
                };
            }
            // If config is an object, we assume the new behavior and make sure it doesn't contain any unexpected values
            const values = Object.keys(config).filter((value)=>!ALLOWED_CONFIG_PROPERTIES.includes(value));
            if (values.length > 0) {
                throw new Error(`Config object may only contain the following: ${ALLOWED_CONFIG_PROPERTIES.join(', ')}`);
            }
            return config;
        },
        parseThinEvent (payload, header, secret, tolerance, cryptoProvider, receivedAt) {
            // parses and validates the event payload all in one go
            return this.webhooks.constructEvent(payload, header, secret, tolerance, cryptoProvider, receivedAt);
        }
    };
    return Stripe;
}

createStripe(new WebPlatformFunctions());

var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
    var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (!V3_URL_REGEX.test(script.src)) {
            continue;
        }
        return script;
    }
    return null;
};
var injectScript = function injectScript(params) {
    var queryString = '';
    var script = document.createElement('script');
    script.src = "".concat(V3_URL).concat(queryString);
    var headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
    }
    headOrBody.appendChild(script);
    return script;
};
var registerWrapper = function registerWrapper(stripe, startTime) {
    if (!stripe || !stripe._registerWrapper) {
        return;
    }
    stripe._registerWrapper({
        name: 'stripe-js',
        version: "4.6.0",
        startTime: startTime
    });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
    return function() {
        reject(new Error('Failed to load Stripe.js'));
    };
};
var onLoad = function onLoad(resolve, reject) {
    return function() {
        if (window.Stripe) {
            resolve(window.Stripe);
        } else {
            reject(new Error('Stripe.js not available'));
        }
    };
};
var loadScript = function loadScript(params) {
    // Ensure that we only attempt to load Stripe.js at most once
    if (stripePromise$1 !== null) {
        return stripePromise$1;
    }
    stripePromise$1 = new Promise(function(resolve, reject) {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.Stripe) {
            resolve(window.Stripe);
            return;
        }
        try {
            var script = findScript();
            if (script && params) ; else if (!script) {
                script = injectScript(params);
            } else if (script && onLoadListener !== null && onErrorListener !== null) {
                var _script$parentNode;
                // remove event listeners
                script.removeEventListener('load', onLoadListener);
                script.removeEventListener('error', onErrorListener); // if script exists, but we are reloading due to an error,
                // reload script to trigger 'load' event
                (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
                script = injectScript(params);
            }
            onLoadListener = onLoad(resolve, reject);
            onErrorListener = onError(reject);
            script.addEventListener('load', onLoadListener);
            script.addEventListener('error', onErrorListener);
        } catch (error) {
            reject(error);
            return;
        }
    }); // Resets stripePromise on error
    return stripePromise$1["catch"](function(error) {
        stripePromise$1 = null;
        return Promise.reject(error);
    });
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
    if (maybeStripe === null) {
        return null;
    }
    var stripe = maybeStripe.apply(undefined, args);
    registerWrapper(stripe, startTime);
    return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var stripePromise$1$1;
var loadCalled = false;
var getStripePromise = function getStripePromise() {
    if (stripePromise$1$1) {
        return stripePromise$1$1;
    }
    stripePromise$1$1 = loadScript(null)["catch"](function(error) {
        // clear cache on error
        stripePromise$1$1 = null;
        return Promise.reject(error);
    });
    return stripePromise$1$1;
}; // Execute our own script injection after a tick to give users time to do their
// own script injection.
Promise.resolve().then(function() {
    return getStripePromise();
})["catch"](function(error) {
    if (!loadCalled) {
        console.warn(error);
    }
});
var loadStripe = function loadStripe() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    loadCalled = true;
    var startTime = Date.now(); // if previous attempts are unsuccessful, will re-load script
    return getStripePromise().then(function(maybeStripe) {
        return initStripe(maybeStripe, args, startTime);
    });
};

// Subscription tier types
var SubscriptionTier = /*#__PURE__*/ function(SubscriptionTier) {
    SubscriptionTier["FREE"] = "free";
    SubscriptionTier["PREMIUM"] = "premium";
    SubscriptionTier["PRO"] = "pro";
    SubscriptionTier["BUSINESS"] = "business"; // $49.99/month
    return SubscriptionTier;
}({});
// Billing cycle types
var BillingCycle = /*#__PURE__*/ function(BillingCycle) {
    BillingCycle["MONTHLY"] = "monthly";
    BillingCycle["YEARLY"] = "yearly";
    return BillingCycle;
}({});
// Feature flags by tier
const FEATURES = {
    ["free"]: [
        'basic_calculator',
        'single_trip_list',
        'screenshot_export'
    ],
    ["premium"]: [
        'basic_calculator',
        'single_trip_list',
        'screenshot_export',
        'smart_alerts',
        'unlimited_lists',
        'pdf_export',
        'dark_mode',
        'no_ads',
        'email_reports'
    ],
    ["pro"]: [
        'basic_calculator',
        'single_trip_list',
        'screenshot_export',
        'smart_alerts',
        'unlimited_lists',
        'pdf_export',
        'dark_mode',
        'no_ads',
        'email_reports',
        'trip_optimizer_pro',
        'document_vault',
        'multi_person_tracking',
        'api_access_basic',
        'priority_support'
    ],
    ["business"]: [
        'basic_calculator',
        'single_trip_list',
        'screenshot_export',
        'smart_alerts',
        'unlimited_lists',
        'pdf_export',
        'dark_mode',
        'no_ads',
        'email_reports',
        'trip_optimizer_pro',
        'document_vault',
        'multi_person_tracking',
        'api_access_basic',
        'priority_support',
        'team_management',
        'white_label',
        'api_access_full',
        'dedicated_support',
        'custom_integrations'
    ]
};
// Free tier artificial limitations (Day 1 monetization)
const FREE_TIER_LIMITS = {
    calculationDelay: 2000,
    exportFormats: [
        'screenshot'
    ],
    tripLists: 1,
    adsEnabled: true,
    priorityCalculation: false,
    maxTripsPerList: 10,
    supportLevel: 'community',
    apiRequestsPerMonth: 0 // No API access
};
// Pricing configuration
const TIER_PRICING$1 = {
    ["free"]: {
        monthly: 0,
        yearly: 0,
        name: 'Free',
        description: 'Basic Schengen calculator'
    },
    ["premium"]: {
        monthly: 999,
        yearly: 9999,
        name: 'Premium',
        description: 'Smart alerts, unlimited lists, PDF export'
    },
    ["pro"]: {
        monthly: 1999,
        yearly: 19999,
        name: 'Pro',
        description: 'Trip optimizer, document vault, multi-person tracking'
    },
    ["business"]: {
        monthly: 4999,
        yearly: 49999,
        name: 'Business',
        description: 'Team management, white label, full API access'
    }
};
// Client-side Stripe instance (already lazy)
let stripePromise = null;
const getStripe = ()=>{
    if (!stripePromise) {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        if (!publishableKey) {
            console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY not set, Stripe features will be disabled');
            return Promise.resolve(null);
        }
        stripePromise = loadStripe(publishableKey);
    }
    return stripePromise;
};
// Stripe price IDs from environment variables (safe access)
({
    premium_monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY || '',
    premium_yearly: process.env.STRIPE_PRICE_PREMIUM_YEARLY || '',
    pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
    pro_yearly: process.env.STRIPE_PRICE_PRO_YEARLY || '',
    business_monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || '',
    business_yearly: process.env.STRIPE_PRICE_BUSINESS_YEARLY || ''
});
// Webhook configuration
({
    secret: process.env.STRIPE_WEBHOOK_SECRET});
// Format price for display
function formatPrice(amountInCents, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amountInCents / 100);
}
// Calculate savings for yearly billing
function calculateYearlySavings(monthlyPrice, yearlyPrice) {
    const monthlyTotal = monthlyPrice * 12;
    const savingsAmount = monthlyTotal - yearlyPrice;
    const savingsPercentage = Math.round(savingsAmount / monthlyTotal * 100);
    const monthlyEquivalent = Math.round(yearlyPrice / 12);
    return {
        savingsAmount,
        savingsPercentage,
        monthlyEquivalent
    };
}
/**
 * Feature access control system
 * Determines what features a user can access based on their subscription tier
 */ class FeatureGateSystem {
    /**
   * Check if user has access to a specific feature
   */ hasFeature(feature) {
        return FEATURES[this.tier].includes(feature);
    }
    /**
   * Check if feature requires an upgrade from current tier
   */ requiresUpgrade(feature) {
        return !this.hasFeature(feature);
    }
    /**
   * Get upgrade URL for a specific feature
   */ getUpgradeUrl(feature) {
        const recommendedTier = this.getRecommendedTierForFeature(feature);
        return `/upgrade?tier=${recommendedTier}&feature=${feature}`;
    }
    /**
   * Get remaining usage for a feature (if applicable)
   */ getRemainingUsage(feature) {
        if (this.tier !== SubscriptionTier.FREE || !this.usage) {
            return null; // Paid tiers have unlimited usage
        }
        switch(feature){
            case 'calculations':
                return Math.max(0, 100 - this.usage.calculations); // 100 calculations per month for free
            case 'api_requests':
                return 0; // No API access for free tier
            case 'exports':
                return Math.max(0, 5 - this.usage.exportCount); // 5 exports per month for free
            case 'storage':
                return Math.max(0, 10 * 1024 * 1024 - this.usage.storageUsed); // 10MB storage for free
            default:
                return null;
        }
    }
    /**
   * Get comprehensive feature gate result
   */ checkFeature(feature) {
        const hasAccess = this.hasFeature(feature);
        if (hasAccess) {
            return {
                allowed: true,
                usageRemaining: this.getRemainingUsage(feature)
            };
        }
        return {
            allowed: false,
            reason: this.getFeatureDenialReason(feature),
            upgradeRequired: true,
            recommendedTier: this.getRecommendedTierForFeature(feature)
        };
    }
    /**
   * Apply free tier limitations
   */ applyFreeTierLimitations() {
        if (this.tier !== SubscriptionTier.FREE) {
            return null;
        }
        return {
            calculationDelay: FREE_TIER_LIMITS.calculationDelay,
            exportFormats: FREE_TIER_LIMITS.exportFormats,
            tripLists: FREE_TIER_LIMITS.tripLists,
            adsEnabled: FREE_TIER_LIMITS.adsEnabled,
            priorityCalculation: FREE_TIER_LIMITS.priorityCalculation,
            maxTripsPerList: FREE_TIER_LIMITS.maxTripsPerList,
            supportLevel: FREE_TIER_LIMITS.supportLevel,
            apiRequestsPerMonth: FREE_TIER_LIMITS.apiRequestsPerMonth
        };
    }
    /**
   * Check if user has hit usage limits
   */ hasHitUsageLimit(feature) {
        const remaining = this.getRemainingUsage(feature);
        return remaining !== null && remaining <= 0;
    }
    /**
   * Get recommended tier for a specific feature
   */ getRecommendedTierForFeature(feature) {
        // Find the lowest tier that includes this feature
        const tiers = [
            SubscriptionTier.PREMIUM,
            SubscriptionTier.PRO,
            SubscriptionTier.BUSINESS
        ];
        for (const tier of tiers){
            if (FEATURES[tier].includes(feature)) {
                return tier;
            }
        }
        return SubscriptionTier.PREMIUM; // Default fallback
    }
    /**
   * Get user-friendly reason for feature denial
   */ getFeatureDenialReason(feature) {
        const reasons = {
            'smart_alerts': 'Smart alerts are available with Premium subscription',
            'unlimited_lists': 'Unlimited trip lists require Premium subscription',
            'pdf_export': 'PDF export is available with Premium subscription',
            'dark_mode': 'Dark mode is available with Premium subscription',
            'no_ads': 'Ad-free experience requires Premium subscription',
            'email_reports': 'Email reports are available with Premium subscription',
            'trip_optimizer_pro': 'Trip Optimizer Pro requires Pro subscription',
            'document_vault': 'Document vault is available with Pro subscription',
            'multi_person_tracking': 'Multi-person tracking requires Pro subscription',
            'api_access_basic': 'API access requires Pro subscription',
            'priority_support': 'Priority support is available with Pro subscription',
            'team_management': 'Team management requires Business subscription',
            'white_label': 'White label features require Business subscription',
            'api_access_full': 'Full API access requires Business subscription',
            'dedicated_support': 'Dedicated support requires Business subscription',
            'custom_integrations': 'Custom integrations require Business subscription'
        };
        return reasons[feature] || 'This feature requires a paid subscription';
    }
    constructor(tier, usage){
        this.tier = tier;
        this.usage = usage;
    }
}
/**
 * Create feature gate system for a user
 */ function createFeatureGates(tier, usage) {
    return new FeatureGateSystem(tier, usage);
}
/**
 * Check if a specific action is allowed
 */ function checkFeatureAccess(tier, feature, usage) {
    const gates = createFeatureGates(tier, usage);
    return gates.checkFeature(feature);
}
/**
 * Get tier comparison data
 */ function getTierComparison() {
    return {
        [SubscriptionTier.FREE]: {
            name: 'Free',
            price: '$0',
            features: FEATURES[SubscriptionTier.FREE],
            limitations: FREE_TIER_LIMITS
        },
        [SubscriptionTier.PREMIUM]: {
            name: 'Premium',
            price: '$9.99/month',
            features: FEATURES[SubscriptionTier.PREMIUM],
            limitations: null
        },
        [SubscriptionTier.PRO]: {
            name: 'Pro',
            price: '$19.99/month',
            features: FEATURES[SubscriptionTier.PRO],
            limitations: null
        },
        [SubscriptionTier.BUSINESS]: {
            name: 'Business',
            price: '$49.99/month',
            features: FEATURES[SubscriptionTier.BUSINESS],
            limitations: null
        }
    };
}

const TIER_ICONS = {
    [SubscriptionTier.FREE]: null,
    [SubscriptionTier.PREMIUM]: /*#__PURE__*/ React.createElement(Crown, {
        className: "w-5 h-5"
    }),
    [SubscriptionTier.PRO]: /*#__PURE__*/ React.createElement(Zap, {
        className: "w-5 h-5"
    }),
    [SubscriptionTier.BUSINESS]: /*#__PURE__*/ React.createElement(Building2, {
        className: "w-5 h-5"
    })
};
const TIER_COLORS = {
    [SubscriptionTier.FREE]: 'bg-gray-50 border-gray-200 text-gray-700',
    [SubscriptionTier.PREMIUM]: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 text-yellow-800',
    [SubscriptionTier.PRO]: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 text-blue-800',
    [SubscriptionTier.BUSINESS]: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 text-purple-800'
};
const FEATURE_DESCRIPTIONS = {
    'smart_alerts': 'Get notified when you\'re approaching your 90-day limit',
    'unlimited_lists': 'Create unlimited trip lists for better organization',
    'pdf_export': 'Export your trip calculations as professional PDF reports',
    'dark_mode': 'Easy-on-the-eyes dark theme for night planning',
    'no_ads': 'Ad-free experience for focused trip planning',
    'email_reports': 'Automated email reports with trip summaries',
    'trip_optimizer_pro': 'AI-powered trip optimization for maximum days',
    'document_vault': 'Secure storage for travel documents and receipts',
    'multi_person_tracking': 'Track Schengen compliance for multiple travelers',
    'api_access_basic': 'Basic API access for custom integrations',
    'priority_support': 'Priority customer support via email',
    'team_management': 'Manage team access and permissions',
    'white_label': 'White-label the calculator for your business',
    'api_access_full': 'Full API access with higher rate limits',
    'dedicated_support': 'Dedicated account manager and phone support',
    'custom_integrations': 'Custom API integrations and partnerships'
};
function SubscriptionGate({ feature, currentTier, userUsage = {}, mode = 'modal', showComparison = true, showTrialOffer = false, onUpgrade, onClose, customMessage, customTitle, className }) {
    const [selectedTier, setSelectedTier] = React.useState(null);
    const [showDetails, setShowDetails] = React.useState(false);
    // Check feature access
    const accessResult = checkFeatureAccess(currentTier, feature, userUsage);
    // If user already has access, don't show the gate
    if (accessResult.allowed) {
        return null;
    }
    const tierComparison = getTierComparison();
    const recommendedTier = accessResult.recommendedTier || SubscriptionTier.PREMIUM;
    const featureDescription = FEATURE_DESCRIPTIONS[feature] || 'Upgrade to unlock this premium feature';
    // Pricing information
    const tierPricing = {
        [SubscriptionTier.PREMIUM]: {
            monthly: 999,
            yearly: 9999
        },
        [SubscriptionTier.PRO]: {
            monthly: 1999,
            yearly: 19999
        },
        [SubscriptionTier.BUSINESS]: {
            monthly: 4999,
            yearly: 49999
        }
    };
    const handleUpgrade = (tier)=>{
        onUpgrade?.(tier);
    };
    const renderTierCard = (tier, isRecommended = false)=>{
        if (tier === SubscriptionTier.FREE) return null;
        const pricing = tierPricing[tier];
        const monthlyPrice = formatPrice(pricing.monthly);
        const yearlyPrice = formatPrice(pricing.yearly);
        const tierInfo = tierComparison[tier];
        return /*#__PURE__*/ React.createElement(Card, {
            key: tier,
            className: cn("relative cursor-pointer transition-all duration-200 hover:shadow-lg", TIER_COLORS[tier], selectedTier === tier && "ring-2 ring-primary ring-offset-2", isRecommended && "border-2 border-primary shadow-lg scale-105"),
            onClick: ()=>setSelectedTier(tier)
        }, isRecommended && /*#__PURE__*/ React.createElement("div", {
            className: "absolute -top-3 left-1/2 transform -translate-x-1/2"
        }, /*#__PURE__*/ React.createElement(Badge, {
            className: "bg-primary text-primary-foreground px-3 py-1"
        }, /*#__PURE__*/ React.createElement(Star, {
            className: "w-3 h-3 mr-1"
        }), "Recommended")), /*#__PURE__*/ React.createElement(CardHeader, {
            className: "pb-3"
        }, /*#__PURE__*/ React.createElement(CardTitle, {
            className: "flex items-center gap-2"
        }, TIER_ICONS[tier], /*#__PURE__*/ React.createElement("span", null, tierInfo.name)), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-2xl font-bold"
        }, monthlyPrice, "/month"), /*#__PURE__*/ React.createElement("div", {
            className: "text-sm opacity-70"
        }, "or ", yearlyPrice, "/year (save 17%)"))), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "space-y-3"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, tierInfo.features.slice(0, 4).map((featureName)=>/*#__PURE__*/ React.createElement("div", {
                key: featureName,
                className: "flex items-center gap-2 text-sm"
            }, /*#__PURE__*/ React.createElement(Check, {
                className: "w-4 h-4 text-green-600"
            }), /*#__PURE__*/ React.createElement("span", null, FEATURE_DESCRIPTIONS[featureName] || featureName.replace('_', ' ')))), tierInfo.features.length > 4 && /*#__PURE__*/ React.createElement("div", {
            className: "text-sm opacity-70"
        }, "+", tierInfo.features.length - 4, " more features")), /*#__PURE__*/ React.createElement(Button$1, {
            onClick: (e)=>{
                e.stopPropagation();
                handleUpgrade(tier);
            },
            className: cn("w-full", isRecommended ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"),
            size: "sm"
        }, /*#__PURE__*/ React.createElement(ArrowRight, {
            className: "w-4 h-4 mr-2"
        }), "Upgrade to ", tierInfo.name))));
    };
    const renderInlineMode = ()=>/*#__PURE__*/ React.createElement("div", {
            className: cn("border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg p-4", className)
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-start gap-3"
        }, /*#__PURE__*/ React.createElement(TriangleAlert, {
            className: "w-5 h-5 text-yellow-600 mt-0.5"
        }), /*#__PURE__*/ React.createElement("div", {
            className: "flex-1"
        }, /*#__PURE__*/ React.createElement("h3", {
            className: "font-semibold text-yellow-800 mb-1"
        }, customTitle || `${feature.replace('_', ' ')} requires ${recommendedTier} subscription`), /*#__PURE__*/ React.createElement("p", {
            className: "text-sm text-yellow-700 mb-3"
        }, customMessage || featureDescription), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(Button$1, {
            onClick: ()=>handleUpgrade(recommendedTier),
            size: "sm",
            className: "bg-yellow-600 hover:bg-yellow-700 text-white"
        }, "Upgrade Now"), showTrialOffer && /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            size: "sm"
        }, "Start Free Trial")))));
    const renderBannerMode = ()=>/*#__PURE__*/ React.createElement("div", {
            className: cn("bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-3", className)
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-3"
        }, /*#__PURE__*/ React.createElement(Crown, {
            className: "w-5 h-5 text-primary"
        }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("span", {
            className: "font-medium text-primary"
        }, customTitle || 'Premium Feature'), /*#__PURE__*/ React.createElement("p", {
            className: "text-sm text-gray-600"
        }, customMessage || featureDescription))), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(Button$1, {
            onClick: ()=>handleUpgrade(recommendedTier),
            size: "sm"
        }, "Upgrade"), onClose && /*#__PURE__*/ React.createElement(Button$1, {
            variant: "ghost",
            size: "sm",
            onClick: onClose
        }, "×"))));
    const renderModalMode = ()=>/*#__PURE__*/ React.createElement("div", {
            className: cn("fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", className)
        }, /*#__PURE__*/ React.createElement(Card, {
            className: "w-full max-w-4xl max-h-[90vh] overflow-auto"
        }, /*#__PURE__*/ React.createElement(CardHeader, {
            className: "text-center pb-6"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-center mb-4"
        }, /*#__PURE__*/ React.createElement(TriangleAlert, {
            className: "w-12 h-12 text-yellow-500"
        })), /*#__PURE__*/ React.createElement(CardTitle, {
            className: "text-2xl mb-2"
        }, customTitle || 'Upgrade Required'), /*#__PURE__*/ React.createElement("p", {
            className: "text-gray-600 max-w-2xl mx-auto"
        }, customMessage || `${featureDescription}. Choose a subscription plan to unlock this feature and many more.`)), /*#__PURE__*/ React.createElement(CardContent, null, showComparison && /*#__PURE__*/ React.createElement("div", {
            className: "grid md:grid-cols-3 gap-6 mb-6"
        }, [
            SubscriptionTier.PREMIUM,
            SubscriptionTier.PRO,
            SubscriptionTier.BUSINESS
        ].map((tier)=>renderTierCard(tier, tier === recommendedTier))), currentTier === SubscriptionTier.FREE && userUsage && /*#__PURE__*/ React.createElement("div", {
            className: "bg-gray-50 rounded-lg p-4 mb-6"
        }, /*#__PURE__*/ React.createElement("h4", {
            className: "font-medium text-gray-800 mb-3"
        }, "Your current usage (Free tier)"), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2 text-sm"
        }, userUsage.calculations !== undefined && /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between"
        }, /*#__PURE__*/ React.createElement("span", null, "Calculations this month:"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, userUsage.calculations, "/100")), userUsage.exportCount !== undefined && /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between"
        }, /*#__PURE__*/ React.createElement("span", null, "Exports this month:"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, userUsage.exportCount, "/5")), userUsage.storageUsed !== undefined && /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between"
        }, /*#__PURE__*/ React.createElement("span", null, "Storage used:"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, Math.round(userUsage.storageUsed / 1024 / 1024), "MB/10MB")))), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-between pt-4 border-t"
        }, onClose && /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            onClick: onClose
        }, "Not now"), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-2 ml-auto"
        }, showTrialOffer && /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline"
        }, "Start Free Trial"), /*#__PURE__*/ React.createElement(Button$1, {
            onClick: ()=>handleUpgrade(recommendedTier)
        }, /*#__PURE__*/ React.createElement(Crown, {
            className: "w-4 h-4 mr-2"
        }), "Upgrade to ", recommendedTier))))));
    // Render based on mode
    switch(mode){
        case 'inline':
            return renderInlineMode();
        case 'banner':
            return renderBannerMode();
        case 'modal':
        default:
            return renderModalMode();
    }
}
// Hook for easy subscription gating
function useSubscriptionGate(feature, currentTier, userUsage) {
    const [showGate, setShowGate] = React.useState(false);
    const accessResult = checkFeatureAccess(currentTier, feature, userUsage);
    const requireFeature = ()=>{
        if (!accessResult.allowed) {
            setShowGate(true);
            return false;
        }
        return true;
    };
    const closeGate = ()=>setShowGate(false);
    return {
        hasAccess: accessResult.allowed,
        showGate,
        requireFeature,
        closeGate,
        accessResult
    };
}

const TIER_FEATURES = {
    [SubscriptionTier.PREMIUM]: [
        'Smart alerts for compliance tracking',
        'Unlimited trip lists',
        'PDF export functionality',
        'Dark mode theme',
        'Ad-free experience',
        'Email reports and summaries'
    ],
    [SubscriptionTier.PRO]: [
        'Everything in Premium',
        'AI-powered trip optimization',
        'Secure document vault',
        'Multi-person tracking',
        'Basic API access',
        'Priority email support'
    ],
    [SubscriptionTier.BUSINESS]: [
        'Everything in Pro',
        'Team management dashboard',
        'White-label customization',
        'Full API access',
        'Dedicated account manager',
        'Custom integrations'
    ]
};
const TIER_PRICING = {
    [SubscriptionTier.PREMIUM]: {
        monthly: 999,
        yearly: 9999
    },
    [SubscriptionTier.PRO]: {
        monthly: 1999,
        yearly: 19999
    },
    [SubscriptionTier.BUSINESS]: {
        monthly: 4999,
        yearly: 49999
    }
};
function PaymentModal({ isOpen, onClose, selectedTier, billingCycle = BillingCycle.MONTHLY, userId, userEmail, currentTier = SubscriptionTier.FREE, title, subtitle, showFeatureComparison = true, showSecurityBadges = true, onSuccess, onError, onCancel, stripePublishableKey, priceId, className }) {
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [selectedBilling, setSelectedBilling] = React.useState(billingCycle);
    const [step, setStep] = React.useState('plan');
    if (!isOpen) return null;
    const pricing = TIER_PRICING[selectedTier];
    const monthlyPrice = formatPrice(pricing.monthly);
    const yearlyPrice = formatPrice(pricing.yearly);
    const savings = calculateYearlySavings(pricing.monthly, pricing.yearly);
    const features = TIER_FEATURES[selectedTier] || [];
    // Handle Stripe checkout
    const handleCheckout = async ()=>{
        setIsProcessing(true);
        setStep('processing');
        try {
            // Initialize Stripe
            const stripe = await getStripe();
            if (!stripe) {
                throw new Error('Stripe failed to initialize');
            }
            // Create checkout session
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    priceId: priceId || `${selectedTier}_${selectedBilling}`,
                    tier: selectedTier,
                    billingCycle: selectedBilling,
                    userId,
                    userEmail,
                    currentTier,
                    successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: `${window.location.origin}/pricing?canceled=true`
                })
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create checkout session');
            }
            const { sessionId } = await response.json();
            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({
                sessionId
            });
            if (error) {
                throw error;
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setIsProcessing(false);
            setStep('checkout');
            onError?.(error);
        }
    };
    const renderPlanSelection = ()=>/*#__PURE__*/ React.createElement("div", {
            className: "space-y-6"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "bg-gray-100 p-1 rounded-lg flex"
        }, /*#__PURE__*/ React.createElement("button", {
            onClick: ()=>setSelectedBilling(BillingCycle.MONTHLY),
            className: cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", selectedBilling === BillingCycle.MONTHLY ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")
        }, "Monthly"), /*#__PURE__*/ React.createElement("button", {
            onClick: ()=>setSelectedBilling(BillingCycle.YEARLY),
            className: cn("px-4 py-2 text-sm font-medium rounded-md transition-colors relative", selectedBilling === BillingCycle.YEARLY ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900")
        }, "Yearly", /*#__PURE__*/ React.createElement(Badge, {
            className: "absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5"
        }, "Save ", savings.savingsPercentage, "%")))), /*#__PURE__*/ React.createElement(Card, {
            className: "border-primary bg-primary/5"
        }, /*#__PURE__*/ React.createElement(CardHeader, {
            className: "text-center"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-center gap-2 mb-2"
        }, /*#__PURE__*/ React.createElement(Zap, {
            className: "w-5 h-5 text-primary"
        }), /*#__PURE__*/ React.createElement(CardTitle, {
            className: "text-xl"
        }, selectedTier, " Plan")), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-3xl font-bold text-primary"
        }, selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice, /*#__PURE__*/ React.createElement("span", {
            className: "text-lg font-normal text-gray-600"
        }, "/", selectedBilling === BillingCycle.YEARLY ? 'year' : 'month')), selectedBilling === BillingCycle.YEARLY && /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-green-600 font-medium"
        }, "Save ", formatPrice(savings.savingsAmount), " compared to monthly"))), showFeatureComparison && /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "space-y-3"
        }, /*#__PURE__*/ React.createElement("h4", {
            className: "font-medium text-gray-900"
        }, "What's included:"), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, features.map((feature, index)=>/*#__PURE__*/ React.createElement("div", {
                key: index,
                className: "flex items-center gap-2 text-sm"
            }, /*#__PURE__*/ React.createElement(Check, {
                className: "w-4 h-4 text-green-600 flex-shrink-0"
            }), /*#__PURE__*/ React.createElement("span", null, feature))))))), showSecurityBadges && /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center justify-center gap-4 text-sm text-gray-600"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-1"
        }, /*#__PURE__*/ React.createElement(Shield, {
            className: "w-4 h-4"
        }), /*#__PURE__*/ React.createElement("span", null, "Secure payments")), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-1"
        }, /*#__PURE__*/ React.createElement(CreditCard, {
            className: "w-4 h-4"
        }), /*#__PURE__*/ React.createElement("span", null, "Stripe powered")), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-1"
        }, /*#__PURE__*/ React.createElement(X, {
            className: "w-4 h-4"
        }), /*#__PURE__*/ React.createElement("span", null, "Cancel anytime"))), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-3"
        }, /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            className: "flex-1",
            onClick: ()=>{
                onCancel?.();
                onClose();
            }
        }, "Cancel"), /*#__PURE__*/ React.createElement(Button$1, {
            className: "flex-1",
            onClick: ()=>setStep('checkout')
        }, /*#__PURE__*/ React.createElement(CreditCard, {
            className: "w-4 h-4 mr-2"
        }), "Continue to Checkout")));
    const renderCheckout = ()=>/*#__PURE__*/ React.createElement("div", {
            className: "space-y-6"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "bg-gray-50 rounded-lg p-4"
        }, /*#__PURE__*/ React.createElement("h4", {
            className: "font-medium text-gray-900 mb-3"
        }, "Order Summary"), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2 text-sm"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between"
        }, /*#__PURE__*/ React.createElement("span", null, selectedTier, " Plan (", selectedBilling, ")"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice)), selectedBilling === BillingCycle.YEARLY && /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between text-green-600"
        }, /*#__PURE__*/ React.createElement("span", null, "Annual discount"), /*#__PURE__*/ React.createElement("span", null, "-", formatPrice(savings.savingsAmount))), /*#__PURE__*/ React.createElement("div", {
            className: "border-t pt-2 flex justify-between font-medium"
        }, /*#__PURE__*/ React.createElement("span", null, "Total"), /*#__PURE__*/ React.createElement("span", null, selectedBilling === BillingCycle.YEARLY ? yearlyPrice : monthlyPrice)))), /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement(CardTitle, {
            className: "text-lg"
        }, "Payment Information")), /*#__PURE__*/ React.createElement(CardContent, null, /*#__PURE__*/ React.createElement("div", {
            className: "text-center text-gray-600 mb-4"
        }, /*#__PURE__*/ React.createElement(CreditCard, {
            className: "w-8 h-8 mx-auto mb-2 text-gray-400"
        }), /*#__PURE__*/ React.createElement("p", null, "You'll be redirected to Stripe's secure checkout"), /*#__PURE__*/ React.createElement("p", {
            className: "text-sm"
        }, "Your payment information is never stored on our servers")))), /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center gap-3"
        }, /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            className: "flex-1",
            onClick: ()=>setStep('plan'),
            disabled: isProcessing
        }, "Back"), /*#__PURE__*/ React.createElement(Button$1, {
            className: "flex-1",
            onClick: handleCheckout,
            disabled: isProcessing
        }, isProcessing ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(LoaderCircle, {
            className: "w-4 h-4 mr-2 animate-spin"
        }), "Processing...") : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Shield, {
            className: "w-4 h-4 mr-2"
        }), "Secure Checkout"))));
    const renderProcessing = ()=>/*#__PURE__*/ React.createElement("div", {
            className: "text-center py-8"
        }, /*#__PURE__*/ React.createElement(LoaderCircle, {
            className: "w-12 h-12 mx-auto mb-4 text-primary animate-spin"
        }), /*#__PURE__*/ React.createElement("h3", {
            className: "text-lg font-medium mb-2"
        }, "Processing your subscription..."), /*#__PURE__*/ React.createElement("p", {
            className: "text-gray-600 mb-4"
        }, "Please wait while we set up your ", selectedTier, " subscription."), /*#__PURE__*/ React.createElement("p", {
            className: "text-sm text-gray-500"
        }, "This may take a few moments. Please do not close this window."));
    return /*#__PURE__*/ React.createElement("div", {
        className: cn("fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50", className)
    }, /*#__PURE__*/ React.createElement(Card, {
        className: "w-full max-w-lg max-h-[90vh] overflow-auto"
    }, /*#__PURE__*/ React.createElement(CardHeader, {
        className: "text-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex-1"
    }, /*#__PURE__*/ React.createElement(CardTitle, {
        className: "text-xl"
    }, title || `Subscribe to ${selectedTier}`), subtitle && /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600 mt-1"
    }, subtitle)), /*#__PURE__*/ React.createElement(Button$1, {
        variant: "ghost",
        size: "icon",
        onClick: onClose,
        disabled: isProcessing
    }, /*#__PURE__*/ React.createElement(X, {
        className: "w-4 h-4"
    })))), /*#__PURE__*/ React.createElement(CardContent, null, step === 'plan' && renderPlanSelection(), step === 'checkout' && renderCheckout(), step === 'processing' && renderProcessing())));
}
// Hook for payment modal management
function usePaymentModal() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedTier, setSelectedTier] = React.useState(SubscriptionTier.PREMIUM);
    const [billingCycle, setBillingCycle] = React.useState(BillingCycle.MONTHLY);
    const openModal = (tier, cycle = BillingCycle.MONTHLY)=>{
        setSelectedTier(tier);
        setBillingCycle(cycle);
        setIsOpen(true);
    };
    const closeModal = ()=>{
        setIsOpen(false);
    };
    return {
        isOpen,
        selectedTier,
        billingCycle,
        openModal,
        closeModal,
        setSelectedTier,
        setBillingCycle
    };
}

const TIER_CONFIG = {
    [SubscriptionTier.FREE]: {
        name: 'Free',
        icon: null,
        description: 'Perfect for trying out basic Schengen calculations',
        color: 'bg-gray-50 border-gray-200 text-gray-700',
        buttonColor: 'bg-gray-600 hover:bg-gray-700',
        popular: false,
        limitations: [
            'Limited to 100 calculations per month',
            'Single trip list only',
            'Screenshot export only',
            'Community support',
            'Ads enabled'
        ]
    },
    [SubscriptionTier.PREMIUM]: {
        name: 'Premium',
        icon: /*#__PURE__*/ React.createElement(Crown, {
            className: "w-5 h-5"
        }),
        description: 'Best for individual travelers who need advanced features',
        color: 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 text-yellow-800',
        buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
        popular: true,
        features: [
            'Unlimited calculations',
            'Smart compliance alerts',
            'Unlimited trip lists',
            'PDF export & reporting',
            'Dark mode theme',
            'Ad-free experience',
            'Email notifications',
            'Priority calculation queue'
        ]
    },
    [SubscriptionTier.PRO]: {
        name: 'Pro',
        icon: /*#__PURE__*/ React.createElement(Zap, {
            className: "w-5 h-5"
        }),
        description: 'Ideal for frequent travelers and travel professionals',
        color: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 text-blue-800',
        buttonColor: 'bg-blue-600 hover:bg-blue-700',
        popular: false,
        features: [
            'Everything in Premium',
            'AI-powered trip optimizer',
            'Secure document vault (10GB)',
            'Multi-person tracking',
            'Advanced analytics dashboard',
            'API access (1,000 requests/month)',
            'Priority email support',
            'Excel/CSV export formats'
        ]
    },
    [SubscriptionTier.BUSINESS]: {
        name: 'Business',
        icon: /*#__PURE__*/ React.createElement(Building2, {
            className: "w-5 h-5"
        }),
        description: 'Enterprise solution for teams and organizations',
        color: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 text-purple-800',
        buttonColor: 'bg-purple-600 hover:bg-purple-700',
        popular: false,
        features: [
            'Everything in Pro',
            'Team management dashboard',
            'White-label customization',
            'Unlimited API access',
            'Custom integrations',
            'Dedicated account manager',
            'Phone & priority support',
            'Custom compliance rules'
        ]
    }
};
function PricingCards({ currentTier = SubscriptionTier.FREE, currentUsage = {}, showComparison = true, showPopularBadge = true, showAnnualToggle = true, highlightTier, compact = false, onSelectPlan, onStartTrial, title = "Choose Your Plan", subtitle = "Upgrade anytime. Cancel anytime. Start your journey to smarter travel planning.", className }) {
    const [billingCycle, setBillingCycle] = React.useState(BillingCycle.MONTHLY);
    const [hoveredTier, setHoveredTier] = React.useState(null);
    const handleSelectPlan = (tier)=>{
        onSelectPlan?.(tier, billingCycle);
    };
    const handleStartTrial = (tier)=>{
        onStartTrial?.(tier);
    };
    const renderUsageLimits = ()=>{
        if (currentTier !== SubscriptionTier.FREE || !Object.keys(currentUsage).length) return null;
        return /*#__PURE__*/ React.createElement("div", {
            className: "mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg"
        }, /*#__PURE__*/ React.createElement("h3", {
            className: "font-medium text-amber-800 mb-3 flex items-center gap-2"
        }, /*#__PURE__*/ React.createElement(Crown, {
            className: "w-4 h-4"
        }), "Your Current Usage (Free Plan)"), /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
        }, currentUsage.calculations !== undefined && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between mb-1"
        }, /*#__PURE__*/ React.createElement("span", null, "Calculations"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, currentUsage.calculations, "/100")), /*#__PURE__*/ React.createElement("div", {
            className: "w-full bg-amber-200 rounded-full h-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "bg-amber-500 h-2 rounded-full transition-all duration-300",
            style: {
                width: `${Math.min(currentUsage.calculations / 100 * 100, 100)}%`
            }
        }))), currentUsage.exportCount !== undefined && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between mb-1"
        }, /*#__PURE__*/ React.createElement("span", null, "Exports"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, currentUsage.exportCount, "/5")), /*#__PURE__*/ React.createElement("div", {
            className: "w-full bg-amber-200 rounded-full h-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "bg-amber-500 h-2 rounded-full transition-all duration-300",
            style: {
                width: `${Math.min(currentUsage.exportCount / 5 * 100, 100)}%`
            }
        }))), currentUsage.storageUsed !== undefined && /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "flex justify-between mb-1"
        }, /*#__PURE__*/ React.createElement("span", null, "Storage"), /*#__PURE__*/ React.createElement("span", {
            className: "font-medium"
        }, Math.round(currentUsage.storageUsed / 1024 / 1024), "MB/0MB")), /*#__PURE__*/ React.createElement("div", {
            className: "w-full bg-amber-200 rounded-full h-2"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "bg-amber-500 h-2 rounded-full w-full"
        })))), /*#__PURE__*/ React.createElement("p", {
            className: "text-amber-700 text-sm mt-3"
        }, "Upgrade to remove limits and unlock premium features"));
    };
    const renderPricingCard = (tier)=>{
        const config = TIER_CONFIG[tier];
        const pricing = TIER_PRICING$1[tier];
        const isCurrentTier = tier === currentTier;
        const isHighlighted = tier === (highlightTier || SubscriptionTier.PREMIUM);
        const isHovered = tier === hoveredTier;
        // Calculate pricing
        let displayPrice = "Free";
        let billingText = "";
        let savings = null;
        if (tier !== SubscriptionTier.FREE) {
            const monthlyPrice = formatPrice(pricing.monthly);
            const yearlyPrice = formatPrice(pricing.yearly);
            if (billingCycle === BillingCycle.YEARLY) {
                displayPrice = yearlyPrice;
                billingText = "/year";
                savings = calculateYearlySavings(pricing.monthly, pricing.yearly);
            } else {
                displayPrice = monthlyPrice;
                billingText = "/month";
            }
        }
        return /*#__PURE__*/ React.createElement(Card, {
            key: tier,
            className: cn("relative transition-all duration-300 hover:shadow-lg", config.color, isHighlighted && "border-2 border-primary shadow-lg scale-105", isHovered && "transform -translate-y-1", isCurrentTier && "ring-2 ring-green-500 ring-offset-2", compact ? "p-4" : "p-6"),
            onMouseEnter: ()=>setHoveredTier(tier),
            onMouseLeave: ()=>setHoveredTier(null)
        }, config.popular && showPopularBadge && /*#__PURE__*/ React.createElement("div", {
            className: "absolute -top-3 left-1/2 transform -translate-x-1/2"
        }, /*#__PURE__*/ React.createElement(Badge, {
            className: "bg-primary text-primary-foreground px-3 py-1 font-medium"
        }, /*#__PURE__*/ React.createElement(Star, {
            className: "w-3 h-3 mr-1"
        }), "Most Popular")), isCurrentTier && /*#__PURE__*/ React.createElement("div", {
            className: "absolute -top-2 -right-2"
        }, /*#__PURE__*/ React.createElement(Badge, {
            className: "bg-green-500 text-white"
        }, "Current Plan")), /*#__PURE__*/ React.createElement(CardHeader, {
            className: compact ? "pb-3" : "pb-4"
        }, /*#__PURE__*/ React.createElement(CardTitle, {
            className: "flex items-center gap-2 text-xl"
        }, config.icon, /*#__PURE__*/ React.createElement("span", null, config.name)), !compact && /*#__PURE__*/ React.createElement("p", {
            className: "text-sm opacity-80"
        }, config.description), /*#__PURE__*/ React.createElement("div", {
            className: "space-y-1"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-baseline gap-1"
        }, /*#__PURE__*/ React.createElement("span", {
            className: "text-3xl font-bold"
        }, displayPrice), billingText && /*#__PURE__*/ React.createElement("span", {
            className: "text-lg opacity-70"
        }, billingText)), savings && billingCycle === BillingCycle.YEARLY && /*#__PURE__*/ React.createElement("div", {
            className: "text-sm text-green-600 font-medium"
        }, "Save ", formatPrice(savings.savingsAmount), " annually (", savings.savingsPercentage, "% off)"))), /*#__PURE__*/ React.createElement(CardContent, {
            className: "space-y-4"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "space-y-2"
        }, tier === SubscriptionTier.FREE ? /*#__PURE__*/ React.createElement(React.Fragment, null, config.limitations?.map((limitation, index)=>/*#__PURE__*/ React.createElement("div", {
                key: index,
                className: "flex items-start gap-2 text-sm"
            }, /*#__PURE__*/ React.createElement("div", {
                className: "w-4 h-4 rounded-full bg-gray-300 flex-shrink-0 mt-0.5"
            }), /*#__PURE__*/ React.createElement("span", {
                className: "opacity-80"
            }, limitation)))) : /*#__PURE__*/ React.createElement(React.Fragment, null, config.features?.slice(0, compact ? 4 : 8).map((feature, index)=>/*#__PURE__*/ React.createElement("div", {
                key: index,
                className: "flex items-start gap-2 text-sm"
            }, /*#__PURE__*/ React.createElement(Check, {
                className: "w-4 h-4 text-green-600 flex-shrink-0 mt-0.5"
            }), /*#__PURE__*/ React.createElement("span", null, feature))), config.features && config.features.length > (compact ? 4 : 8) && /*#__PURE__*/ React.createElement("div", {
            className: "text-sm opacity-70 italic"
        }, "+", config.features.length - (compact ? 4 : 8), " more features"))), /*#__PURE__*/ React.createElement("div", {
            className: "pt-4 space-y-2"
        }, isCurrentTier ? /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            className: "w-full",
            disabled: true
        }, "Current Plan") : tier === SubscriptionTier.FREE ? /*#__PURE__*/ React.createElement(Button$1, {
            variant: "outline",
            className: "w-full",
            onClick: ()=>handleSelectPlan(tier)
        }, "Your Current Plan") : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Button$1, {
            className: cn("w-full text-white", config.buttonColor),
            onClick: ()=>handleSelectPlan(tier)
        }, /*#__PURE__*/ React.createElement(ArrowRight, {
            className: "w-4 h-4 mr-2"
        }), "Upgrade to ", config.name), tier !== SubscriptionTier.BUSINESS && /*#__PURE__*/ React.createElement(Button$1, {
            variant: "ghost",
            size: "sm",
            className: "w-full text-xs",
            onClick: ()=>handleStartTrial(tier)
        }, "Start 7-day free trial")))));
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: cn("w-full", className)
    }, /*#__PURE__*/ React.createElement("div", {
        className: "text-center mb-8"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-3xl font-bold mb-4"
    }, title), subtitle && /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600 max-w-2xl mx-auto"
    }, subtitle), showAnnualToggle && /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-center mt-6"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "bg-gray-100 p-1 rounded-lg flex relative"
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setBillingCycle(BillingCycle.MONTHLY),
        className: cn("px-4 py-2 text-sm font-medium rounded-md transition-colors relative z-10", billingCycle === BillingCycle.MONTHLY ? "text-gray-900" : "text-gray-600 hover:text-gray-900")
    }, "Monthly"), /*#__PURE__*/ React.createElement("button", {
        onClick: ()=>setBillingCycle(BillingCycle.YEARLY),
        className: cn("px-4 py-2 text-sm font-medium rounded-md transition-colors relative z-10", billingCycle === BillingCycle.YEARLY ? "text-gray-900" : "text-gray-600 hover:text-gray-900")
    }, "Yearly", /*#__PURE__*/ React.createElement(Badge, {
        className: "absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5"
    }, "Save 17%")), /*#__PURE__*/ React.createElement("div", {
        className: cn("absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-transform duration-200 z-0", "w-[calc(50%-4px)]", billingCycle === BillingCycle.YEARLY ? "transform translate-x-[calc(100%+8px)]" : "transform translate-x-1")
    })))), renderUsageLimits(), /*#__PURE__*/ React.createElement("div", {
        className: cn("grid gap-6", compact ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4", showComparison && "lg:grid-cols-4")
    }, Object.values(SubscriptionTier).map((tier)=>renderPricingCard(tier))), showComparison && !compact && /*#__PURE__*/ React.createElement("div", {
        className: "mt-12 bg-white rounded-lg border shadow-sm overflow-hidden"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "px-6 py-4 bg-gray-50 border-b"
    }, /*#__PURE__*/ React.createElement("h3", {
        className: "text-lg font-semibold"
    }, "Compare Plans")), /*#__PURE__*/ React.createElement("div", {
        className: "overflow-x-auto"
    }, /*#__PURE__*/ React.createElement("table", {
        className: "w-full"
    }, /*#__PURE__*/ React.createElement("thead", null, /*#__PURE__*/ React.createElement("tr", {
        className: "border-b"
    }, /*#__PURE__*/ React.createElement("th", {
        className: "text-left py-3 px-6 font-medium"
    }, "Features"), Object.values(SubscriptionTier).map((tier)=>/*#__PURE__*/ React.createElement("th", {
            key: tier,
            className: "text-center py-3 px-6 font-medium"
        }, TIER_CONFIG[tier].name)))), /*#__PURE__*/ React.createElement("tbody", {
        className: "text-sm"
    }, /*#__PURE__*/ React.createElement("tr", {
        className: "border-b"
    }, /*#__PURE__*/ React.createElement("td", {
        className: "py-3 px-6"
    }, "Monthly calculations"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "100"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited")), /*#__PURE__*/ React.createElement("tr", {
        className: "border-b"
    }, /*#__PURE__*/ React.createElement("td", {
        className: "py-3 px-6"
    }, "Trip lists"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "1"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Unlimited")), /*#__PURE__*/ React.createElement("tr", {
        className: "border-b"
    }, /*#__PURE__*/ React.createElement("td", {
        className: "py-3 px-6"
    }, "Export formats"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Screenshot"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "PDF"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "PDF, Excel"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "All formats")), /*#__PURE__*/ React.createElement("tr", {
        className: "border-b"
    }, /*#__PURE__*/ React.createElement("td", {
        className: "py-3 px-6"
    }, "Support"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Community"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Email"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Priority"), /*#__PURE__*/ React.createElement("td", {
        className: "text-center py-3 px-6"
    }, "Dedicated")))))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-8 flex items-center justify-center gap-8 text-sm text-gray-500"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(Shield, {
        className: "w-4 h-4"
    }), /*#__PURE__*/ React.createElement("span", null, "30-day money back")), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(Users, {
        className: "w-4 h-4"
    }), /*#__PURE__*/ React.createElement("span", null, "10,000+ travelers trust us")), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center gap-2"
    }, /*#__PURE__*/ React.createElement(Headphones, {
        className: "w-4 h-4"
    }), /*#__PURE__*/ React.createElement("span", null, "24/7 support"))));
}

exports.AnimatedCounter = AnimatedCounter;
exports.Badge = Badge;
exports.Button = Button$1;
exports.Calendar = Calendar;
exports.CalendarModal = CalendarModal;
exports.Card = Card;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.CircularProgress = CircularProgress;
exports.Header = Header;
exports.Input = Input;
exports.Label = Label;
exports.PaymentModal = PaymentModal;
exports.PricingCards = PricingCards;
exports.SchengenCalendar = SchengenCalendar;
exports.Select = Select;
exports.SubscriptionGate = SubscriptionGate;
exports.TripCard = TripCard;
exports.addDays = addDays;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.cn = cn;
exports.daysBetween = daysBetween;
exports.debounce = debounce;
exports.endOfDay = endOfDay;
exports.formatDateKey = formatDateKey;
exports.formatDateRange = formatDateRange;
exports.formatDisplayDate = formatDisplayDate;
exports.generateId = generateId;
exports.getDateRange = getDateRange;
exports.isDateInRange = isDateInRange;
exports.isFutureDate = isFutureDate;
exports.isMobile = isMobile;
exports.isPastDate = isPastDate;
exports.isSameDay = isSameDay;
exports.isToday = isToday;
exports.isTouchDevice = isTouchDevice;
exports.labelVariants = labelVariants;
exports.startOfDay = startOfDay;
exports.subtractDays = subtractDays;
exports.throttle = throttle;
exports.usePaymentModal = usePaymentModal;
exports.useSubscriptionGate = useSubscriptionGate;
//# sourceMappingURL=index.cjs.js.map
