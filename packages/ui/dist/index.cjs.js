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
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string)=>string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2)=>p2 ? p2.toUpperCase() : p1.toLowerCase());
const toPascalCase = (string)=>{
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
const hasA11yProp = (props)=>{
    for(const prop in props){
        if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
            return true;
        }
    }
};

/**
 * @license lucide-react v0.542.0 - ISC
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

const Icon = React.forwardRef(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>React.createElement("svg", {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && {
            "aria-hidden": "true"
        },
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>React.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]));

const createLucideIcon = (iconName, iconNode)=>{
    const Component = React.forwardRef(({ className, ...props }, ref)=>React.createElement(Icon, {
            ref,
            iconNode,
            className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
            ...props
        }));
    Component.displayName = toPascalCase(iconName);
    return Component;
};

const __iconNode$p = [
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
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$p);

const __iconNode$o = [
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
];
const Building2 = createLucideIcon("building-2", __iconNode$o);

const __iconNode$n = [
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
];
const Calendar$1 = createLucideIcon("calendar", __iconNode$n);

const __iconNode$m = [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
];
const Check = createLucideIcon("check", __iconNode$m);

const __iconNode$l = [
    [
        "path",
        {
            d: "m6 9 6 6 6-6",
            key: "qrunsl"
        }
    ]
];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$l);

const __iconNode$k = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$k);

const __iconNode$j = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$j);

const __iconNode$i = [
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
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$i);

const __iconNode$h = [
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
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$h);

const __iconNode$g = [
    [
        "path",
        {
            d: "M12 6v6l4 2",
            key: "mmk7yg"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ]
];
const Clock = createLucideIcon("clock", __iconNode$g);

const __iconNode$f = [
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
];
const CreditCard = createLucideIcon("credit-card", __iconNode$f);

const __iconNode$e = [
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
];
const Crown = createLucideIcon("crown", __iconNode$e);

const __iconNode$d = [
    [
        "path",
        {
            d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
            key: "1xhozi"
        }
    ]
];
const Headphones = createLucideIcon("headphones", __iconNode$d);

const __iconNode$c = [
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
];
const Info = createLucideIcon("info", __iconNode$c);

const __iconNode$b = [
    [
        "path",
        {
            d: "M21 12a9 9 0 1 1-6.219-8.56",
            key: "13zald"
        }
    ]
];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$b);

const __iconNode$a = [
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
];
const MapPin = createLucideIcon("map-pin", __iconNode$a);

const __iconNode$9 = [
    [
        "path",
        {
            d: "M13 21h8",
            key: "1jsn5i"
        }
    ],
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$9);

const __iconNode$8 = [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ]
];
const Shield = createLucideIcon("shield", __iconNode$8);

const __iconNode$7 = [
    [
        "path",
        {
            d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
            key: "r04s7s"
        }
    ]
];
const Star = createLucideIcon("star", __iconNode$7);

const __iconNode$6 = [
    [
        "path",
        {
            d: "M10 11v6",
            key: "nco0om"
        }
    ],
    [
        "path",
        {
            d: "M14 11v6",
            key: "outv1u"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
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
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$6);

const __iconNode$5 = [
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
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$5);

const __iconNode$4 = [
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
];
const UserPlus = createLucideIcon("user-plus", __iconNode$4);

const __iconNode$3 = [
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
];
const User = createLucideIcon("user", __iconNode$3);

const __iconNode$2 = [
    [
        "path",
        {
            d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
            key: "1yyitq"
        }
    ],
    [
        "path",
        {
            d: "M16 3.128a4 4 0 0 1 0 7.744",
            key: "16gr8j"
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
        "circle",
        {
            cx: "9",
            cy: "7",
            r: "4",
            key: "nufk8"
        }
    ]
];
const Users = createLucideIcon("users", __iconNode$2);

const __iconNode$1 = [
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
];
const X = createLucideIcon("x", __iconNode$1);

const __iconNode = [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
];
const Zap = createLucideIcon("zap", __iconNode);

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
        className: cn("flex w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors", "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary", "disabled:cursor-not-allowed disabled:opacity-50", "hover:bg-accent hover:text-accent-foreground", "mobile-touch-target", selectedOption ? "justify-center text-center" : "justify-between text-left"),
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox"
    }, /*#__PURE__*/ React.createElement("span", {
        className: cn(selectedOption ? "text-foreground font-medium" : "text-muted-foreground")
    }, selectedOption ? selectedOption.label : placeholder), !selectedOption && /*#__PURE__*/ React.createElement(ChevronDown, {
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

// Payments module
const SUBSCRIPTION_TIERS = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        features: [
            'basic_calculator'
        ]
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        features: [
            'basic_calculator',
            'unlimited_lists',
            'pdf_export'
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19.99,
        features: [
            'basic_calculator',
            'unlimited_lists',
            'pdf_export',
            'api_access'
        ]
    }
];
function checkFeatureAccess(userTier, feature) {
    const tier = SUBSCRIPTION_TIERS.find((t)=>t.id === userTier);
    return tier ? tier.features.includes(feature) : false;
}
function getTierComparison(currentTier, targetTier) {
    const current = SUBSCRIPTION_TIERS.find((t)=>t.id === currentTier);
    const target = SUBSCRIPTION_TIERS.find((t)=>t.id === targetTier);
    if (!current || !target) return null;
    return {
        current,
        target,
        savings: target.price - current.price,
        newFeatures: target.features.filter((f)=>!current.features.includes(f))
    };
}
function formatPrice(price) {
    return price === 0 ? 'Free' : `$${price}/month`;
}
// Additional types and functions for payment modal
var BillingCycle = /*#__PURE__*/ function(BillingCycle) {
    BillingCycle["MONTHLY"] = "monthly";
    BillingCycle["YEARLY"] = "yearly";
    return BillingCycle;
}({});
function calculateYearlySavings(monthlyPrice) {
    const yearlyPrice = monthlyPrice * 10 // 20% discount
    ;
    const monthlyCost = monthlyPrice * 12;
    return monthlyCost - yearlyPrice;
}
function getStripe() {
    // Stripe instance placeholder
    return null;
}
const TIER_PRICING$1 = {
    free: {
        monthly: 0,
        yearly: 0
    },
    premium: {
        monthly: 9.99,
        yearly: 99
    },
    pro: {
        monthly: 19.99,
        yearly: 199
    },
    business: {
        monthly: 49.99,
        yearly: 499
    }
};

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
    const accessResult = checkFeatureAccess(currentTier, feature);
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
    const accessResult = checkFeatureAccess(currentTier, feature);
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
