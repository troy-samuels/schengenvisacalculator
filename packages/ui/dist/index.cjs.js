'use strict';

var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var classVarianceAuthority = require('class-variance-authority');
var dateFns = require('date-fns');
var ReactDOM = require('react-dom');

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
var ReactDOM__namespace = /*#__PURE__*/_interopNamespaceDefault(ReactDOM);

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

/**
 * Custom hook for responsive media query detection
 * Used to determine when to show mobile vs desktop calendar layouts
 */ function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(false);
    React.useEffect(()=>{
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
            // During SSR, assume desktop (safer fallback)
            setMatches(false);
            return;
        }
        const media = window.matchMedia(query);
        // Set initial value
        setMatches(media.matches);
        // Create listener function
        const listener = (event)=>{
            setMatches(event.matches);
        };
        // Add listener
        if (media.addEventListener) {
            media.addEventListener('change', listener);
        } else {
            // Fallback for older browsers
            media.addListener(listener);
        }
        // Cleanup function
        return ()=>{
            if (media.removeEventListener) {
                media.removeEventListener('change', listener);
            } else {
                // Fallback for older browsers
                media.removeListener(listener);
            }
        };
    }, [
        query
    ]);
    return matches;
}
/**
 * Convenience hook for mobile detection
 * Returns true when screen width is 768px or less
 */ function useIsMobile() {
    return useMediaQuery('(max-width: 768px)');
}

// packages/react/compose-refs/src/compose-refs.tsx
function setRef$1(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs$1(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef$1(ref, node);
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
                        setRef$1(refs[i], null);
                    }
                }
            };
        }
    };
}
function useComposedRefs$1(...refs) {
    return React__namespace.useCallback(composeRefs$1(...refs), refs);
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
var Slot$1 = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = React__namespace.forwardRef((props, forwardedRef)=>{
        const { children, ...slotProps } = props;
        if (React__namespace.isValidElement(children)) {
            const childrenRef = getElementRef$1(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== React__namespace.Fragment) {
                props2.ref = forwardedRef ? composeRefs$1(forwardedRef, childrenRef) : childrenRef;
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
function getElementRef$1(element) {
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
    const Comp = asChild ? Slot$1 : "button";
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

const __iconNode$3 = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);

const __iconNode$2 = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);

const __iconNode$1 = [
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
const User = createLucideIcon("user", __iconNode$1);

const __iconNode = [
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
const X = createLucideIcon("x", __iconNode);

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
 */ function Root$3(props) {
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
 */ function Select(props) {
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
  Root: Root$3,
  Select: Select,
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
function dispatchDiscreteCustomEvent(target, event) {
    if (target) ReactDOM__namespace.flushSync(()=>target.dispatchEvent(event));
}

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
var Root$2 = Label$1;

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
const Label = /*#__PURE__*/ React__namespace.forwardRef(({ className, variant, size, ...props }, ref)=>/*#__PURE__*/ React__namespace.createElement(Root$2, {
        ref: ref,
        className: cn(labelVariants({
            variant,
            size
        }), className),
        ...props
    }));
Label.displayName = Root$2.displayName;

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

function Header({ onLoginClick, onSignupClick, user, loading, className = "" }) {
    return /*#__PURE__*/ React.createElement("header", {
        className: `w-full ${className}`
    }, /*#__PURE__*/ React.createElement("div", {
        className: "container mx-auto px-4 sm:px-6 lg:px-8"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex h-16 items-center justify-between"
    }, /*#__PURE__*/ React.createElement("div", null), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-6"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col"
    }, /*#__PURE__*/ React.createElement("span", {
        className: "text-lg font-bold text-foreground leading-none"
    }, "Schengen Calculator"))), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, loading ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "h-8 w-8 rounded-full bg-gray-200 animate-pulse"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "hidden sm:block h-4 w-20 bg-gray-200 animate-pulse rounded"
    })) : user ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-3"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, user.user_metadata?.avatar_url ? /*#__PURE__*/ React.createElement("img", {
        src: user.user_metadata.avatar_url,
        alt: "Profile",
        className: "h-8 w-8 rounded-full"
    }) : /*#__PURE__*/ React.createElement("div", {
        className: "h-8 w-8 rounded-full bg-primary flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement(User, {
        className: "h-4 w-4 text-primary-foreground"
    })), /*#__PURE__*/ React.createElement("span", {
        className: "hidden sm:block text-sm font-medium text-foreground"
    }, user.user_metadata?.full_name || user.email))) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("button", {
        onClick: onLoginClick,
        className: "text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors px-3 py-2"
    }, "Log In"), /*#__PURE__*/ React.createElement("button", {
        onClick: onSignupClick,
        className: "bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors shadow-sm"
    }, "Start Now")))))));
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

// src/primitive.tsx
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
    return function handleEvent(event) {
        originalEventHandler?.(event);
        if (checkForDefaultPrevented === false || !event.defaultPrevented) {
            return ourEventHandler?.(event);
        }
    };
}

// packages/react/context/src/create-context.tsx
function createContext2(rootComponentName, defaultContext) {
    const Context = React__namespace.createContext(defaultContext);
    const Provider = (props)=>{
        const { children, ...context } = props;
        const value = React__namespace.useMemo(()=>context, Object.values(context));
        return /* @__PURE__ */ jsxRuntime.jsx(Context.Provider, {
            value,
            children
        });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName) {
        const context = React__namespace.useContext(Context);
        if (context) return context;
        if (defaultContext !== void 0) return defaultContext;
        throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [
        Provider,
        useContext2
    ];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
    let defaultContexts = [];
    function createContext3(rootComponentName, defaultContext) {
        const BaseContext = React__namespace.createContext(defaultContext);
        const index = defaultContexts.length;
        defaultContexts = [
            ...defaultContexts,
            defaultContext
        ];
        const Provider = (props)=>{
            const { scope, children, ...context } = props;
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const value = React__namespace.useMemo(()=>context, Object.values(context));
            return /* @__PURE__ */ jsxRuntime.jsx(Context.Provider, {
                value,
                children
            });
        };
        Provider.displayName = rootComponentName + "Provider";
        function useContext2(consumerName, scope) {
            const Context = scope?.[scopeName]?.[index] || BaseContext;
            const context = React__namespace.useContext(Context);
            if (context) return context;
            if (defaultContext !== void 0) return defaultContext;
            throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
        }
        return [
            Provider,
            useContext2
        ];
    }
    const createScope = ()=>{
        const scopeContexts = defaultContexts.map((defaultContext)=>{
            return React__namespace.createContext(defaultContext);
        });
        return function useScope(scope) {
            const contexts = scope?.[scopeName] || scopeContexts;
            return React__namespace.useMemo(()=>({
                    [`__scope${scopeName}`]: {
                        ...scope,
                        [scopeName]: contexts
                    }
                }), [
                scope,
                contexts
            ]);
        };
    };
    createScope.scopeName = scopeName;
    return [
        createContext3,
        composeContextScopes(createScope, ...createContextScopeDeps)
    ];
}
function composeContextScopes(...scopes) {
    const baseScope = scopes[0];
    if (scopes.length === 1) return baseScope;
    const createScope = ()=>{
        const scopeHooks = scopes.map((createScope2)=>({
                useScope: createScope2(),
                scopeName: createScope2.scopeName
            }));
        return function useComposedScopes(overrideScopes) {
            const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName })=>{
                const scopeProps = useScope(overrideScopes);
                const currentScope = scopeProps[`__scope${scopeName}`];
                return {
                    ...nextScopes2,
                    ...currentScope
                };
            }, {});
            return React__namespace.useMemo(()=>({
                    [`__scope${baseScope.scopeName}`]: nextScopes
                }), [
                nextScopes
            ]);
        };
    };
    createScope.scopeName = baseScope.scopeName;
    return createScope;
}

// packages/react/use-layout-effect/src/use-layout-effect.tsx
var useLayoutEffect2 = globalThis?.document ? React__namespace.useLayoutEffect : ()=>{};

// packages/react/id/src/id.tsx
var useReactId = React__namespace[" useId ".trim().toString()] || (()=>void 0);
var count$1 = 0;
function useId(deterministicId) {
    const [id, setId] = React__namespace.useState(useReactId());
    useLayoutEffect2(()=>{
        setId((reactId)=>reactId ?? String(count$1++));
    }, [
        deterministicId
    ]);
    return deterministicId || (id ? `radix-${id}` : "");
}

// src/use-controllable-state.tsx
var useInsertionEffect = React__namespace[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState$1({ prop, defaultProp, onChange = ()=>{}, caller }) {
    const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState$1({
        defaultProp,
        onChange
    });
    const isControlled = prop !== void 0;
    const value = isControlled ? prop : uncontrolledProp;
    {
        const isControlledRef = React__namespace.useRef(prop !== void 0);
        React__namespace.useEffect(()=>{
            const wasControlled = isControlledRef.current;
            if (wasControlled !== isControlled) {
                const from = wasControlled ? "controlled" : "uncontrolled";
                const to = isControlled ? "controlled" : "uncontrolled";
                console.warn(`${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`);
            }
            isControlledRef.current = isControlled;
        }, [
            isControlled,
            caller
        ]);
    }
    const setValue = React__namespace.useCallback((nextValue)=>{
        if (isControlled) {
            const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
            if (value2 !== prop) {
                onChangeRef.current?.(value2);
            }
        } else {
            setUncontrolledProp(nextValue);
        }
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        onChangeRef
    ]);
    return [
        value,
        setValue
    ];
}
function useUncontrolledState$1({ defaultProp, onChange }) {
    const [value, setValue] = React__namespace.useState(defaultProp);
    const prevValueRef = React__namespace.useRef(value);
    const onChangeRef = React__namespace.useRef(onChange);
    useInsertionEffect(()=>{
        onChangeRef.current = onChange;
    }, [
        onChange
    ]);
    React__namespace.useEffect(()=>{
        if (prevValueRef.current !== value) {
            onChangeRef.current?.(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef
    ]);
    return [
        value,
        setValue,
        onChangeRef
    ];
}
function isFunction(value) {
    return typeof value === "function";
}

// packages/react/use-callback-ref/src/use-callback-ref.tsx
function useCallbackRef$2(callback) {
    const callbackRef = React__namespace.useRef(callback);
    React__namespace.useEffect(()=>{
        callbackRef.current = callback;
    });
    return React__namespace.useMemo(()=>(...args)=>callbackRef.current?.(...args), []);
}

// packages/react/use-escape-keydown/src/use-escape-keydown.tsx
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
    const onEscapeKeyDown = useCallbackRef$2(onEscapeKeyDownProp);
    React__namespace.useEffect(()=>{
        const handleKeyDown = (event)=>{
            if (event.key === "Escape") {
                onEscapeKeyDown(event);
            }
        };
        ownerDocument.addEventListener("keydown", handleKeyDown, {
            capture: true
        });
        return ()=>ownerDocument.removeEventListener("keydown", handleKeyDown, {
                capture: true
            });
    }, [
        onEscapeKeyDown,
        ownerDocument
    ]);
}

var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React__namespace.createContext({
    layers: /* @__PURE__ */ new Set(),
    layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
    branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = React__namespace.forwardRef((props, forwardedRef)=>{
    const { disableOutsidePointerEvents = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
    const context = React__namespace.useContext(DismissableLayerContext);
    const [node, setNode] = React__namespace.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React__namespace.useState({});
    const composedRefs = useComposedRefs$1(forwardedRef, (node2)=>setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [
        ...context.layersWithOutsidePointerEventsDisabled
    ].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event)=>{
        const target = event.target;
        const isPointerDownOnBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target));
        if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
        onPointerDownOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event)=>{
        const target = event.target;
        const isFocusInBranch = [
            ...context.branches
        ].some((branch)=>branch.contains(target));
        if (isFocusInBranch) return;
        onFocusOutside?.(event);
        onInteractOutside?.(event);
        if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event)=>{
        const isHighestLayer = index === context.layers.size - 1;
        if (!isHighestLayer) return;
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented && onDismiss) {
            event.preventDefault();
            onDismiss();
        }
    }, ownerDocument);
    React__namespace.useEffect(()=>{
        if (!node) return;
        if (disableOutsidePointerEvents) {
            if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
                originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
                ownerDocument.body.style.pointerEvents = "none";
            }
            context.layersWithOutsidePointerEventsDisabled.add(node);
        }
        context.layers.add(node);
        dispatchUpdate();
        return ()=>{
            if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
                ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
            }
        };
    }, [
        node,
        ownerDocument,
        disableOutsidePointerEvents,
        context
    ]);
    React__namespace.useEffect(()=>{
        return ()=>{
            if (!node) return;
            context.layers.delete(node);
            context.layersWithOutsidePointerEventsDisabled.delete(node);
            dispatchUpdate();
        };
    }, [
        node,
        context
    ]);
    React__namespace.useEffect(()=>{
        const handleUpdate = ()=>force({});
        document.addEventListener(CONTEXT_UPDATE, handleUpdate);
        return ()=>document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.div, {
        ...layerProps,
        ref: composedRefs,
        style: {
            pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
            ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
    });
});
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = React__namespace.forwardRef((props, forwardedRef)=>{
    const context = React__namespace.useContext(DismissableLayerContext);
    const ref = React__namespace.useRef(null);
    const composedRefs = useComposedRefs$1(forwardedRef, ref);
    React__namespace.useEffect(()=>{
        const node = ref.current;
        if (node) {
            context.branches.add(node);
            return ()=>{
                context.branches.delete(node);
            };
        }
    }, [
        context.branches
    ]);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.div, {
        ...props,
        ref: composedRefs
    });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
    const handlePointerDownOutside = useCallbackRef$2(onPointerDownOutside);
    const isPointerInsideReactTreeRef = React__namespace.useRef(false);
    const handleClickRef = React__namespace.useRef(()=>{});
    React__namespace.useEffect(()=>{
        const handlePointerDown = (event)=>{
            if (event.target && !isPointerInsideReactTreeRef.current) {
                let handleAndDispatchPointerDownOutsideEvent2 = function() {
                    handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, {
                        discrete: true
                    });
                };
                const eventDetail = {
                    originalEvent: event
                };
                if (event.pointerType === "touch") {
                    ownerDocument.removeEventListener("click", handleClickRef.current);
                    handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
                    ownerDocument.addEventListener("click", handleClickRef.current, {
                        once: true
                    });
                } else {
                    handleAndDispatchPointerDownOutsideEvent2();
                }
            } else {
                ownerDocument.removeEventListener("click", handleClickRef.current);
            }
            isPointerInsideReactTreeRef.current = false;
        };
        const timerId = window.setTimeout(()=>{
            ownerDocument.addEventListener("pointerdown", handlePointerDown);
        }, 0);
        return ()=>{
            window.clearTimeout(timerId);
            ownerDocument.removeEventListener("pointerdown", handlePointerDown);
            ownerDocument.removeEventListener("click", handleClickRef.current);
        };
    }, [
        ownerDocument,
        handlePointerDownOutside
    ]);
    return {
        // ensures we check React component tree (not just DOM tree)
        onPointerDownCapture: ()=>isPointerInsideReactTreeRef.current = true
    };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
    const handleFocusOutside = useCallbackRef$2(onFocusOutside);
    const isFocusInsideReactTreeRef = React__namespace.useRef(false);
    React__namespace.useEffect(()=>{
        const handleFocus = (event)=>{
            if (event.target && !isFocusInsideReactTreeRef.current) {
                const eventDetail = {
                    originalEvent: event
                };
                handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
                    discrete: false
                });
            }
        };
        ownerDocument.addEventListener("focusin", handleFocus);
        return ()=>ownerDocument.removeEventListener("focusin", handleFocus);
    }, [
        ownerDocument,
        handleFocusOutside
    ]);
    return {
        onFocusCapture: ()=>isFocusInsideReactTreeRef.current = true,
        onBlurCapture: ()=>isFocusInsideReactTreeRef.current = false
    };
}
function dispatchUpdate() {
    const event = new CustomEvent(CONTEXT_UPDATE);
    document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
    const target = detail.originalEvent.target;
    const event = new CustomEvent(name, {
        bubbles: false,
        cancelable: true,
        detail
    });
    if (handler) target.addEventListener(name, handler, {
        once: true
    });
    if (discrete) {
        dispatchDiscreteCustomEvent(target, event);
    } else {
        target.dispatchEvent(event);
    }
}

var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
    bubbles: false,
    cancelable: true
};
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = React__namespace.forwardRef((props, forwardedRef)=>{
    const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
    const [container, setContainer] = React__namespace.useState(null);
    const onMountAutoFocus = useCallbackRef$2(onMountAutoFocusProp);
    const onUnmountAutoFocus = useCallbackRef$2(onUnmountAutoFocusProp);
    const lastFocusedElementRef = React__namespace.useRef(null);
    const composedRefs = useComposedRefs$1(forwardedRef, (node)=>setContainer(node));
    const focusScope = React__namespace.useRef({
        paused: false,
        pause () {
            this.paused = true;
        },
        resume () {
            this.paused = false;
        }
    }).current;
    React__namespace.useEffect(()=>{
        if (trapped) {
            let handleFocusIn2 = function(event) {
                if (focusScope.paused || !container) return;
                const target = event.target;
                if (container.contains(target)) {
                    lastFocusedElementRef.current = target;
                } else {
                    focus(lastFocusedElementRef.current, {
                        select: true
                    });
                }
            }, handleFocusOut2 = function(event) {
                if (focusScope.paused || !container) return;
                const relatedTarget = event.relatedTarget;
                if (relatedTarget === null) return;
                if (!container.contains(relatedTarget)) {
                    focus(lastFocusedElementRef.current, {
                        select: true
                    });
                }
            }, handleMutations2 = function(mutations) {
                const focusedElement = document.activeElement;
                if (focusedElement !== document.body) return;
                for (const mutation of mutations){
                    if (mutation.removedNodes.length > 0) focus(container);
                }
            };
            document.addEventListener("focusin", handleFocusIn2);
            document.addEventListener("focusout", handleFocusOut2);
            const mutationObserver = new MutationObserver(handleMutations2);
            if (container) mutationObserver.observe(container, {
                childList: true,
                subtree: true
            });
            return ()=>{
                document.removeEventListener("focusin", handleFocusIn2);
                document.removeEventListener("focusout", handleFocusOut2);
                mutationObserver.disconnect();
            };
        }
    }, [
        trapped,
        container,
        focusScope.paused
    ]);
    React__namespace.useEffect(()=>{
        if (container) {
            focusScopesStack.add(focusScope);
            const previouslyFocusedElement = document.activeElement;
            const hasFocusedCandidate = container.contains(previouslyFocusedElement);
            if (!hasFocusedCandidate) {
                const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
                container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                container.dispatchEvent(mountEvent);
                if (!mountEvent.defaultPrevented) {
                    focusFirst(removeLinks(getTabbableCandidates(container)), {
                        select: true
                    });
                    if (document.activeElement === previouslyFocusedElement) {
                        focus(container);
                    }
                }
            }
            return ()=>{
                container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
                setTimeout(()=>{
                    const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
                    container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    container.dispatchEvent(unmountEvent);
                    if (!unmountEvent.defaultPrevented) {
                        focus(previouslyFocusedElement ?? document.body, {
                            select: true
                        });
                    }
                    container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
                    focusScopesStack.remove(focusScope);
                }, 0);
            };
        }
    }, [
        container,
        onMountAutoFocus,
        onUnmountAutoFocus,
        focusScope
    ]);
    const handleKeyDown = React__namespace.useCallback((event)=>{
        if (!loop && !trapped) return;
        if (focusScope.paused) return;
        const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
        const focusedElement = document.activeElement;
        if (isTabKey && focusedElement) {
            const container2 = event.currentTarget;
            const [first, last] = getTabbableEdges(container2);
            const hasTabbableElementsInside = first && last;
            if (!hasTabbableElementsInside) {
                if (focusedElement === container2) event.preventDefault();
            } else {
                if (!event.shiftKey && focusedElement === last) {
                    event.preventDefault();
                    if (loop) focus(first, {
                        select: true
                    });
                } else if (event.shiftKey && focusedElement === first) {
                    event.preventDefault();
                    if (loop) focus(last, {
                        select: true
                    });
                }
            }
        }
    }, [
        loop,
        trapped,
        focusScope.paused
    ]);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.div, {
        tabIndex: -1,
        ...scopeProps,
        ref: composedRefs,
        onKeyDown: handleKeyDown
    });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of candidates){
        focus(candidate, {
            select
        });
        if (document.activeElement !== previouslyFocusedElement) return;
    }
}
function getTabbableEdges(container) {
    const candidates = getTabbableCandidates(container);
    const first = findVisible(candidates, container);
    const last = findVisible(candidates.reverse(), container);
    return [
        first,
        last
    ];
}
function getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node)=>{
            const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
            if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
            return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    });
    while(walker.nextNode())nodes.push(walker.currentNode);
    return nodes;
}
function findVisible(elements, container) {
    for (const element of elements){
        if (!isHidden(element, {
            upTo: container
        })) return element;
    }
}
function isHidden(node, { upTo }) {
    if (getComputedStyle(node).visibility === "hidden") return true;
    while(node){
        if (upTo !== void 0 && node === upTo) return false;
        if (getComputedStyle(node).display === "none") return true;
        node = node.parentElement;
    }
    return false;
}
function isSelectableInput(element) {
    return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
    if (element && element.focus) {
        const previouslyFocusedElement = document.activeElement;
        element.focus({
            preventScroll: true
        });
        if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
    }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
    let stack = [];
    return {
        add (focusScope) {
            const activeFocusScope = stack[0];
            if (focusScope !== activeFocusScope) {
                activeFocusScope?.pause();
            }
            stack = arrayRemove(stack, focusScope);
            stack.unshift(focusScope);
        },
        remove (focusScope) {
            stack = arrayRemove(stack, focusScope);
            stack[0]?.resume();
        }
    };
}
function arrayRemove(array, item) {
    const updatedArray = [
        ...array
    ];
    const index = updatedArray.indexOf(item);
    if (index !== -1) {
        updatedArray.splice(index, 1);
    }
    return updatedArray;
}
function removeLinks(items) {
    return items.filter((item)=>item.tagName !== "A");
}

var PORTAL_NAME$1 = "Portal";
var Portal$2 = React__namespace.forwardRef((props, forwardedRef)=>{
    const { container: containerProp, ...portalProps } = props;
    const [mounted, setMounted] = React__namespace.useState(false);
    useLayoutEffect2(()=>setMounted(true), []);
    const container = containerProp || mounted && globalThis?.document?.body;
    return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntime.jsx(Primitive.div, {
        ...portalProps,
        ref: forwardedRef
    }), container) : null;
});
Portal$2.displayName = PORTAL_NAME$1;

function useStateMachine(initialState, machine) {
    return React__namespace.useReducer((state, event)=>{
        const nextState = machine[state][event];
        return nextState ?? state;
    }, initialState);
}
// src/presence.tsx
var Presence = (props)=>{
    const { present, children } = props;
    const presence = usePresence(present);
    const child = typeof children === "function" ? children({
        present: presence.isPresent
    }) : React__namespace.Children.only(children);
    const ref = useComposedRefs$1(presence.ref, getElementRef(child));
    const forceMount = typeof children === "function";
    return forceMount || presence.isPresent ? React__namespace.cloneElement(child, {
        ref
    }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
    const [node, setNode] = React__namespace.useState();
    const stylesRef = React__namespace.useRef(null);
    const prevPresentRef = React__namespace.useRef(present);
    const prevAnimationNameRef = React__namespace.useRef("none");
    const initialState = present ? "mounted" : "unmounted";
    const [state, send] = useStateMachine(initialState, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    React__namespace.useEffect(()=>{
        const currentAnimationName = getAnimationName(stylesRef.current);
        prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
    }, [
        state
    ]);
    useLayoutEffect2(()=>{
        const styles = stylesRef.current;
        const wasPresent = prevPresentRef.current;
        const hasPresentChanged = wasPresent !== present;
        if (hasPresentChanged) {
            const prevAnimationName = prevAnimationNameRef.current;
            const currentAnimationName = getAnimationName(styles);
            if (present) {
                send("MOUNT");
            } else if (currentAnimationName === "none" || styles?.display === "none") {
                send("UNMOUNT");
            } else {
                const isAnimating = prevAnimationName !== currentAnimationName;
                if (wasPresent && isAnimating) {
                    send("ANIMATION_OUT");
                } else {
                    send("UNMOUNT");
                }
            }
            prevPresentRef.current = present;
        }
    }, [
        present,
        send
    ]);
    useLayoutEffect2(()=>{
        if (node) {
            let timeoutId;
            const ownerWindow = node.ownerDocument.defaultView ?? window;
            const handleAnimationEnd = (event)=>{
                const currentAnimationName = getAnimationName(stylesRef.current);
                const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
                if (event.target === node && isCurrentAnimation) {
                    send("ANIMATION_END");
                    if (!prevPresentRef.current) {
                        const currentFillMode = node.style.animationFillMode;
                        node.style.animationFillMode = "forwards";
                        timeoutId = ownerWindow.setTimeout(()=>{
                            if (node.style.animationFillMode === "forwards") {
                                node.style.animationFillMode = currentFillMode;
                            }
                        });
                    }
                }
            };
            const handleAnimationStart = (event)=>{
                if (event.target === node) {
                    prevAnimationNameRef.current = getAnimationName(stylesRef.current);
                }
            };
            node.addEventListener("animationstart", handleAnimationStart);
            node.addEventListener("animationcancel", handleAnimationEnd);
            node.addEventListener("animationend", handleAnimationEnd);
            return ()=>{
                ownerWindow.clearTimeout(timeoutId);
                node.removeEventListener("animationstart", handleAnimationStart);
                node.removeEventListener("animationcancel", handleAnimationEnd);
                node.removeEventListener("animationend", handleAnimationEnd);
            };
        } else {
            send("ANIMATION_END");
        }
    }, [
        node,
        send
    ]);
    return {
        isPresent: [
            "mounted",
            "unmountSuspended"
        ].includes(state),
        ref: React__namespace.useCallback((node2)=>{
            stylesRef.current = node2 ? getComputedStyle(node2) : null;
            setNode(node2);
        }, [])
    };
}
function getAnimationName(styles) {
    return styles?.animationName || "none";
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

var count = 0;
function useFocusGuards() {
    React__namespace.useEffect(()=>{
        const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
        document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
        document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
        count++;
        return ()=>{
            if (count === 1) {
                document.querySelectorAll("[data-radix-focus-guard]").forEach((node)=>node.remove());
            }
            count--;
        };
    }, []);
}
function createFocusGuard() {
    const element = document.createElement("span");
    element.setAttribute("data-radix-focus-guard", "");
    element.tabIndex = 0;
    element.style.outline = "none";
    element.style.opacity = "0";
    element.style.position = "fixed";
    element.style.pointerEvents = "none";
    return element;
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for(var i = 0, l = from.length, ar; i < l; i++){
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */ var removedBarSizeVariable = '--removed-body-scroll-bar-size';

/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */ function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref) {
        ref.current = value;
    }
    return ref;
}

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */ function useCallbackRef$1(initialValue, callback) {
    var ref = React.useState(function() {
        return {
            // value
            value: initialValue,
            // last callback
            callback: callback,
            // "memoized" public interface
            facade: {
                get current () {
                    return ref.value;
                },
                set current (value){
                    var last = ref.value;
                    if (last !== value) {
                        ref.value = value;
                        ref.callback(value, last);
                    }
                }
            }
        };
    })[0];
    // update callback
    ref.callback = callback;
    return ref.facade;
}

var useIsomorphicLayoutEffect$1 = typeof window !== 'undefined' ? React__namespace.useLayoutEffect : React__namespace.useEffect;
var currentValues = new WeakMap();
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */ function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef$1(null, function(newValue) {
        return refs.forEach(function(ref) {
            return assignRef(ref, newValue);
        });
    });
    // handle refs changes - added or removed
    useIsomorphicLayoutEffect$1(function() {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
            var prevRefs_1 = new Set(oldValue);
            var nextRefs_1 = new Set(refs);
            var current_1 = callbackRef.current;
            prevRefs_1.forEach(function(ref) {
                if (!nextRefs_1.has(ref)) {
                    assignRef(ref, null);
                }
            });
            nextRefs_1.forEach(function(ref) {
                if (!prevRefs_1.has(ref)) {
                    assignRef(ref, current_1);
                }
            });
        }
        currentValues.set(callbackRef, refs);
    }, [
        refs
    ]);
    return callbackRef;
}

function ItoI(a) {
    return a;
}
function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) {
        middleware = ItoI;
    }
    var buffer = [];
    var assigned = false;
    var medium = {
        read: function() {
            if (assigned) {
                throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
            }
            if (buffer.length) {
                return buffer[buffer.length - 1];
            }
            return defaults;
        },
        useMedium: function(data) {
            var item = middleware(data, assigned);
            buffer.push(item);
            return function() {
                buffer = buffer.filter(function(x) {
                    return x !== item;
                });
            };
        },
        assignSyncMedium: function(cb) {
            assigned = true;
            while(buffer.length){
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
            }
            buffer = {
                push: function(x) {
                    return cb(x);
                },
                filter: function() {
                    return buffer;
                }
            };
        },
        assignMedium: function(cb) {
            assigned = true;
            var pendingQueue = [];
            if (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
                pendingQueue = buffer;
            }
            var executeQueue = function() {
                var cbs = pendingQueue;
                pendingQueue = [];
                cbs.forEach(cb);
            };
            var cycle = function() {
                return Promise.resolve().then(executeQueue);
            };
            cycle();
            buffer = {
                push: function(x) {
                    pendingQueue.push(x);
                    cycle();
                },
                filter: function(filter) {
                    pendingQueue = pendingQueue.filter(filter);
                    return buffer;
                }
            };
        }
    };
    return medium;
}
// eslint-disable-next-line @typescript-eslint/ban-types
function createSidecarMedium(options) {
    if (options === void 0) {
        options = {};
    }
    var medium = innerCreateMedium(null);
    medium.options = __assign({
        async: true,
        ssr: false
    }, options);
    return medium;
}

var SideCar$1 = function(_a) {
    var sideCar = _a.sideCar, rest = __rest(_a, [
        "sideCar"
    ]);
    if (!sideCar) {
        throw new Error('Sidecar: please provide `sideCar` property to import the right car');
    }
    var Target = sideCar.read();
    if (!Target) {
        throw new Error('Sidecar medium not found');
    }
    return React__namespace.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar$1;
}

var effectCar = createSidecarMedium();

var nothing = function() {
    return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */ var RemoveScroll = React__namespace.forwardRef(function(props, parentRef) {
    var ref = React__namespace.useRef(null);
    var _a = React__namespace.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? 'div' : _b, gapMode = props.gapMode, rest = __rest(props, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode"
    ]);
    var SideCar = sideCar;
    var containerRef = useMergeRefs([
        ref,
        parentRef
    ]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return React__namespace.createElement(React__namespace.Fragment, null, enabled && React__namespace.createElement(SideCar, {
        sideCar: effectCar,
        removeScrollBar: removeScrollBar,
        shards: shards,
        noRelative: noRelative,
        noIsolation: noIsolation,
        inert: inert,
        setCallbacks: setCallbacks,
        allowPinchZoom: !!allowPinchZoom,
        lockRef: ref,
        gapMode: gapMode
    }), forwardProps ? React__namespace.cloneElement(React__namespace.Children.only(children), __assign(__assign({}, containerProps), {
        ref: containerRef
    })) : React__namespace.createElement(Container, __assign({}, containerProps, {
        className: className,
        ref: containerRef
    }), children));
});
RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
};
RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName
};

var getNonce = function() {
    if (typeof __webpack_nonce__ !== 'undefined') {
        return __webpack_nonce__;
    }
    return undefined;
};

function makeStyleTag() {
    if (!document) return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = getNonce();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    } else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function() {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function(style) {
            if (counter == 0) {
                if (stylesheet = makeStyleTag()) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function() {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        }
    };
};

/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */ var styleHookSingleton = function() {
    var sheet = stylesheetSingleton();
    return function(styles, isDynamic) {
        React__namespace.useEffect(function() {
            sheet.add(styles);
            return function() {
                sheet.remove();
            };
        }, [
            styles && isDynamic
        ]);
    };
};

/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */ var styleSingleton = function() {
    var useStyle = styleHookSingleton();
    var Sheet = function(_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};

var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
};
var parse = function(x) {
    return parseInt(x || '', 10) || 0;
};
var getOffset = function(gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
    var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
    var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
    return [
        parse(left),
        parse(top),
        parse(right)
    ];
};
var getGapWidth = function(gapMode) {
    if (gapMode === void 0) {
        gapMode = 'margin';
    }
    if (typeof window === 'undefined') {
        return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
    };
};

var Style = styleSingleton();
var lockAttribute = 'data-scroll-locked';
// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
var getStyles = function(_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) {
        gapMode = 'margin';
    }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === 'margin' && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === 'padding' && "padding-right: ".concat(gap, "px ").concat(important, ";")
    ].filter(Boolean).join(''), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10);
    return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
    React__namespace.useEffect(function() {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function() {
            var newCounter = getCurrentUseCounter() - 1;
            if (newCounter <= 0) {
                document.body.removeAttribute(lockAttribute);
            } else {
                document.body.setAttribute(lockAttribute, newCounter.toString());
            }
        };
    }, []);
};
/**
 * Removes page scrollbar and blocks page scroll when mounted
 */ var RemoveScrollBar = function(_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? 'margin' : _b;
    useLockAttribute();
    /*
     gap will be measured on every component mount
     however it will be used only by the "first" invocation
     due to singleton nature of <Style
     */ var gap = React__namespace.useMemo(function() {
        return getGapWidth(gapMode);
    }, [
        gapMode
    ]);
    return React__namespace.createElement(Style, {
        styles: getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '')
    });
};

var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function() {
                passiveSupported = true;
                return true;
            }
        });
        // @ts-ignore
        window.addEventListener('test', options, options);
        // @ts-ignore
        window.removeEventListener('test', options, options);
    } catch (err) {
        passiveSupported = false;
    }
}
var nonPassive = passiveSupported ? {
    passive: false
} : false;

var alwaysContainsScroll = function(node) {
    // textarea will always _contain_ scroll inside self. It only can be hidden
    return node.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function(node, overflow) {
    if (!(node instanceof Element)) {
        return false;
    }
    var styles = window.getComputedStyle(node);
    return(// not-not-scrollable
    styles[overflow] !== 'hidden' && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === 'visible'));
};
var elementCouldBeVScrolled = function(node) {
    return elementCanBeScrolled(node, 'overflowY');
};
var elementCouldBeHScrolled = function(node) {
    return elementCanBeScrolled(node, 'overflowX');
};
var locationCouldBeScrolled = function(axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
        // Skip over shadow root
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
            current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
            var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
            if (scrollHeight > clientHeight) {
                return true;
            }
        }
        current = current.parentNode;
    }while (current && current !== ownerDocument.body)
    return false;
};
var getVScrollVariables = function(_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
        scrollTop,
        scrollHeight,
        clientHeight
    ];
};
var getHScrollVariables = function(_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
        scrollLeft,
        scrollWidth,
        clientWidth
    ];
};
var elementCouldBeScrolled = function(axis, node) {
    return axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
    return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
    /**
     * If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
     * and then increasingly negative as you scroll towards the end of the content.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
     */ return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    // find scrollable target
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
        if (!target) {
            break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
            if (elementCouldBeScrolled(axis, target)) {
                availableScroll += elementScroll;
                availableScrollTop += position;
            }
        }
        var parent_1 = target.parentNode;
        // we will "bubble" from ShadowDom in case we are, or just to the parent in normal case
        // this is the same logic used in focus-lock
        target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
    }while (// portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target))
    // handle epsilon around 0 (non standard zoom levels)
    if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
        shouldCancelScroll = true;
    } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
        shouldCancelScroll = true;
    }
    return shouldCancelScroll;
};

var getTouchXY = function(event) {
    return 'changedTouches' in event ? [
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
    ] : [
        0,
        0
    ];
};
var getDeltaXY = function(event) {
    return [
        event.deltaX,
        event.deltaY
    ];
};
var extractRef = function(ref) {
    return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
    return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
    return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
    var shouldPreventQueue = React__namespace.useRef([]);
    var touchStartRef = React__namespace.useRef([
        0,
        0
    ]);
    var activeAxis = React__namespace.useRef();
    var id = React__namespace.useState(idCounter++)[0];
    var Style = React__namespace.useState(styleSingleton)[0];
    var lastProps = React__namespace.useRef(props);
    React__namespace.useEffect(function() {
        lastProps.current = props;
    }, [
        props
    ]);
    React__namespace.useEffect(function() {
        if (props.inert) {
            document.body.classList.add("block-interactivity-".concat(id));
            var allow_1 = __spreadArray([
                props.lockRef.current
            ], (props.shards || []).map(extractRef), true).filter(Boolean);
            allow_1.forEach(function(el) {
                return el.classList.add("allow-interactivity-".concat(id));
            });
            return function() {
                document.body.classList.remove("block-interactivity-".concat(id));
                allow_1.forEach(function(el) {
                    return el.classList.remove("allow-interactivity-".concat(id));
                });
            };
        }
        return;
    }, [
        props.inert,
        props.lockRef.current,
        props.shards
    ]);
    var shouldCancelEvent = React__namespace.useCallback(function(event, parent) {
        if ('touches' in event && event.touches.length === 2 || event.type === 'wheel' && event.ctrlKey) {
            return !lastProps.current.allowPinchZoom;
        }
        var touch = getTouchXY(event);
        var touchStart = touchStartRef.current;
        var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
        // allow horizontal touch move on Range inputs. They will not cause any scroll
        if ('touches' in event && moveDirection === 'h' && target.type === 'range') {
            return false;
        }
        var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
            return true;
        }
        if (canBeScrolledInMainDirection) {
            currentAxis = moveDirection;
        } else {
            currentAxis = moveDirection === 'v' ? 'h' : 'v';
            canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
        // other axis might be not scrollable
        }
        if (!canBeScrolledInMainDirection) {
            return false;
        }
        if (!activeAxis.current && 'changedTouches' in event && (deltaX || deltaY)) {
            activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
            return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return handleScroll(cancelingAxis, parent, event, cancelingAxis === 'h' ? deltaX : deltaY);
    }, []);
    var shouldPrevent = React__namespace.useCallback(function(_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
            // not the last active
            return;
        }
        var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
        var sourceEvent = shouldPreventQueue.current.filter(function(e) {
            return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
        })[0];
        // self event, and should be canceled
        if (sourceEvent && sourceEvent.should) {
            if (event.cancelable) {
                event.preventDefault();
            }
            return;
        }
        // outside or shard event
        if (!sourceEvent) {
            var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
                return node.contains(event.target);
            });
            var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
            if (shouldStop) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }
    }, []);
    var shouldCancel = React__namespace.useCallback(function(name, delta, target, should) {
        var event = {
            name: name,
            delta: delta,
            target: target,
            should: should,
            shadowParent: getOutermostShadowParent(target)
        };
        shouldPreventQueue.current.push(event);
        setTimeout(function() {
            shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
                return e !== event;
            });
        }, 1);
    }, []);
    var scrollTouchStart = React__namespace.useCallback(function(event) {
        touchStartRef.current = getTouchXY(event);
        activeAxis.current = undefined;
    }, []);
    var scrollWheel = React__namespace.useCallback(function(event) {
        shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = React__namespace.useCallback(function(event) {
        shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    React__namespace.useEffect(function() {
        lockStack.push(Style);
        props.setCallbacks({
            onScrollCapture: scrollWheel,
            onWheelCapture: scrollWheel,
            onTouchMoveCapture: scrollTouchMove
        });
        document.addEventListener('wheel', shouldPrevent, nonPassive);
        document.addEventListener('touchmove', shouldPrevent, nonPassive);
        document.addEventListener('touchstart', scrollTouchStart, nonPassive);
        return function() {
            lockStack = lockStack.filter(function(inst) {
                return inst !== Style;
            });
            document.removeEventListener('wheel', shouldPrevent, nonPassive);
            document.removeEventListener('touchmove', shouldPrevent, nonPassive);
            document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
        };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return React__namespace.createElement(React__namespace.Fragment, null, inert ? React__namespace.createElement(Style, {
        styles: generateStyle(id)
    }) : null, removeScrollBar ? React__namespace.createElement(RemoveScrollBar, {
        noRelative: props.noRelative,
        gapMode: props.gapMode
    }) : null);
}
function getOutermostShadowParent(node) {
    var shadowParent = null;
    while(node !== null){
        if (node instanceof ShadowRoot) {
            shadowParent = node.host;
            node = node.host;
        }
        node = node.parentNode;
    }
    return shadowParent;
}

var SideCar = exportSidecar(effectCar, RemoveScrollSideCar);

var ReactRemoveScroll = React__namespace.forwardRef(function(props, ref) {
    return React__namespace.createElement(RemoveScroll, __assign({}, props, {
        ref: ref,
        sideCar: SideCar
    }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;

var getDefaultParent = function(originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
    return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
    return targets.map(function(target) {
        if (parent.contains(target)) {
            return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
        return null;
    }).filter(function(x) {
        return Boolean(x);
    });
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */ var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [
        originalTarget
    ]);
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function(el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function(parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function(node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            } else {
                try {
                    var attr = node.getAttribute(controlAttribute);
                    var alreadyHidden = attr !== null && attr !== 'false';
                    var counterValue = (counterMap.get(node) || 0) + 1;
                    var markerValue = (markerCounter.get(node) || 0) + 1;
                    counterMap.set(node, counterValue);
                    markerCounter.set(node, markerValue);
                    hiddenNodes.push(node);
                    if (counterValue === 1 && alreadyHidden) {
                        uncontrolledNodes.set(node, true);
                    }
                    if (markerValue === 1) {
                        node.setAttribute(markerName, 'true');
                    }
                    if (!alreadyHidden) {
                        node.setAttribute(controlAttribute, 'true');
                    }
                } catch (e) {
                    console.error('aria-hidden: cannot operate on ', node, e);
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function() {
        hiddenNodes.forEach(function(node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */ var hideOthers = function(originalTarget, parentNode, markerName) {
    if (markerName === void 0) {
        markerName = 'data-aria-hidden';
    }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [
        originalTarget
    ]);
    var activeParentNode = getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function() {
            return null;
        };
    }
    // we should not hide aria-live elements - https://github.com/theKashey/aria-hidden/issues/10
    // and script elements, as they have no impact on accessibility.
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live], script')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};

var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props)=>{
    const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
    const triggerRef = React__namespace.useRef(null);
    const contentRef = React__namespace.useRef(null);
    const [open, setOpen] = useControllableState$1({
        prop: openProp,
        defaultProp: defaultOpen ?? false,
        onChange: onOpenChange,
        caller: DIALOG_NAME
    });
    return /* @__PURE__ */ jsxRuntime.jsx(DialogProvider, {
        scope: __scopeDialog,
        triggerRef,
        contentRef,
        contentId: useId(),
        titleId: useId(),
        descriptionId: useId(),
        open,
        onOpenChange: setOpen,
        onOpenToggle: React__namespace.useCallback(()=>setOpen((prevOpen)=>!prevOpen), [
            setOpen
        ]),
        modal,
        children
    });
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs$1(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.button, {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
    });
});
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
    forceMount: void 0
});
var DialogPortal = (props)=>{
    const { __scopeDialog, forceMount, children, container } = props;
    const context = useDialogContext(PORTAL_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(PortalProvider, {
        scope: __scopeDialog,
        forceMount,
        children: React__namespace.Children.map(children, (child)=>/* @__PURE__ */ jsxRuntime.jsx(Presence, {
                present: forceMount || context.open,
                children: /* @__PURE__ */ jsxRuntime.jsx(Portal$2, {
                    asChild: true,
                    container,
                    children: child
                })
            }))
    });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = React__namespace.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntime.jsx(Presence, {
        present: forceMount || context.open,
        children: /* @__PURE__ */ jsxRuntime.jsx(DialogOverlayImpl, {
            ...overlayProps,
            ref: forwardedRef
        })
    }) : null;
});
DialogOverlay.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return(// Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
    // ie. when `Overlay` and `Content` are siblings
    /* @__PURE__ */ jsxRuntime.jsx(ReactRemoveScroll, {
        as: Slot,
        allowPinchZoom: true,
        shards: [
            context.contentRef
        ],
        children: /* @__PURE__ */ jsxRuntime.jsx(Primitive.div, {
            "data-state": getState(context.open),
            ...overlayProps,
            ref: forwardedRef,
            style: {
                pointerEvents: "auto",
                ...overlayProps.style
            }
        })
    }));
});
var CONTENT_NAME = "DialogContent";
var DialogContent = React__namespace.forwardRef((props, forwardedRef)=>{
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(Presence, {
        present: forceMount || context.open,
        children: context.modal ? /* @__PURE__ */ jsxRuntime.jsx(DialogContentModal, {
            ...contentProps,
            ref: forwardedRef
        }) : /* @__PURE__ */ jsxRuntime.jsx(DialogContentNonModal, {
            ...contentProps,
            ref: forwardedRef
        })
    });
});
DialogContent.displayName = CONTENT_NAME;
var DialogContentModal = React__namespace.forwardRef((props, forwardedRef)=>{
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = React__namespace.useRef(null);
    const composedRefs = useComposedRefs$1(forwardedRef, context.contentRef, contentRef);
    React__namespace.useEffect(()=>{
        const content = contentRef.current;
        if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsx(DialogContentImpl, {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event)=>{
            event.preventDefault();
            context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event)=>{
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(props.onFocusOutside, (event)=>event.preventDefault())
    });
});
var DialogContentNonModal = React__namespace.forwardRef((props, forwardedRef)=>{
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = React__namespace.useRef(false);
    const hasPointerDownOutsideRef = React__namespace.useRef(false);
    return /* @__PURE__ */ jsxRuntime.jsx(DialogContentImpl, {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event)=>{
            props.onCloseAutoFocus?.(event);
            if (!event.defaultPrevented) {
                if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
                event.preventDefault();
            }
            hasInteractedOutsideRef.current = false;
            hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event)=>{
            props.onInteractOutside?.(event);
            if (!event.defaultPrevented) {
                hasInteractedOutsideRef.current = true;
                if (event.detail.originalEvent.type === "pointerdown") {
                    hasPointerDownOutsideRef.current = true;
                }
            }
            const target = event.target;
            const targetIsTrigger = context.triggerRef.current?.contains(target);
            if (targetIsTrigger) event.preventDefault();
            if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
                event.preventDefault();
            }
        }
    });
});
var DialogContentImpl = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = React__namespace.useRef(null);
    const composedRefs = useComposedRefs$1(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntime.jsx(FocusScope, {
                asChild: true,
                loop: true,
                trapped: trapFocus,
                onMountAutoFocus: onOpenAutoFocus,
                onUnmountAutoFocus: onCloseAutoFocus,
                children: /* @__PURE__ */ jsxRuntime.jsx(DismissableLayer, {
                    role: "dialog",
                    id: context.contentId,
                    "aria-describedby": context.descriptionId,
                    "aria-labelledby": context.titleId,
                    "data-state": getState(context.open),
                    ...contentProps,
                    ref: composedRefs,
                    onDismiss: ()=>context.onOpenChange(false)
                })
            }),
            /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                    /* @__PURE__ */ jsxRuntime.jsx(TitleWarning, {
                        titleId: context.titleId
                    }),
                    /* @__PURE__ */ jsxRuntime.jsx(DescriptionWarning, {
                        contentRef,
                        descriptionId: context.descriptionId
                    })
                ]
            })
        ]
    });
});
var TITLE_NAME = "DialogTitle";
var DialogTitle = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.h2, {
        id: context.titleId,
        ...titleProps,
        ref: forwardedRef
    });
});
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.p, {
        id: context.descriptionId,
        ...descriptionProps,
        ref: forwardedRef
    });
});
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = React__namespace.forwardRef((props, forwardedRef)=>{
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntime.jsx(Primitive.button, {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, ()=>context.onOpenChange(false))
    });
});
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
    return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
    contentName: CONTENT_NAME,
    titleName: TITLE_NAME,
    docsSlug: "dialog"
});
var TitleWarning = ({ titleId })=>{
    const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
    const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
    React__namespace.useEffect(()=>{
        if (titleId) {
            const hasTitle = document.getElementById(titleId);
            if (!hasTitle) console.error(MESSAGE);
        }
    }, [
        MESSAGE,
        titleId
    ]);
    return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId })=>{
    const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
    const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
    React__namespace.useEffect(()=>{
        const describedById = contentRef.current?.getAttribute("aria-describedby");
        if (descriptionId && describedById) {
            const hasDescription = document.getElementById(descriptionId);
            if (!hasDescription) console.warn(MESSAGE);
        }
    }, [
        MESSAGE,
        contentRef,
        descriptionId
    ]);
    return null;
};
var Root$1 = Dialog;
var Portal$1 = DialogPortal;
var Overlay$1 = DialogOverlay;
var Content$1 = DialogContent;

function __insertCSS(code) {
    if (typeof document == 'undefined') return;
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    style.styleSheet ? style.styleSheet.cssText = code : style.appendChild(document.createTextNode(code));
}
const DrawerContext = React.createContext({
    drawerRef: {
        current: null
    },
    overlayRef: {
        current: null
    },
    onPress: ()=>{},
    onRelease: ()=>{},
    onDrag: ()=>{},
    onNestedDrag: ()=>{},
    onNestedOpenChange: ()=>{},
    onNestedRelease: ()=>{},
    openProp: undefined,
    dismissible: false,
    isOpen: false,
    isDragging: false,
    keyboardIsOpen: {
        current: false
    },
    snapPointsOffset: null,
    snapPoints: null,
    handleOnly: false,
    modal: false,
    shouldFade: false,
    activeSnapPoint: null,
    onOpenChange: ()=>{},
    setActiveSnapPoint: ()=>{},
    closeDrawer: ()=>{},
    direction: 'bottom',
    shouldAnimate: {
        current: true
    },
    shouldScaleBackground: false,
    setBackgroundColorOnScale: true,
    noBodyStyles: false,
    container: null,
    autoFocus: false
});
const useDrawerContext = ()=>{
    const context = React.useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a Drawer.Root');
    }
    return context;
};
__insertCSS("[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(\n[data-state=closed]\n){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}");
function isMobileFirefox() {
    const userAgent = navigator.userAgent;
    return typeof window !== 'undefined' && (/Firefox/.test(userAgent) && /Mobile/.test(userAgent) || // Android Firefox
    /FxiOS/.test(userAgent) // iOS Firefox
    );
}
function isMac() {
    return testPlatform(/^Mac/);
}
function isIPhone() {
    return testPlatform(/^iPhone/);
}
function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function isIPad() {
    return testPlatform(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
    return isIPhone() || isIPad();
}
function testPlatform(re) {
    return typeof window !== 'undefined' && window.navigator != null ? re.test(window.navigator.platform) : undefined;
}
// This code comes from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/overlays/src/usePreventScroll.ts
const KEYBOARD_BUFFER = 24;
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
function chain$1(...callbacks) {
    return (...args)=>{
        for (let callback of callbacks){
            if (typeof callback === 'function') {
                callback(...args);
            }
        }
    };
}
// @ts-ignore
const visualViewport = typeof document !== 'undefined' && window.visualViewport;
function isScrollable(node) {
    let style = window.getComputedStyle(node);
    return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function getScrollParent(node) {
    if (isScrollable(node)) {
        node = node.parentElement;
    }
    while(node && !isScrollable(node)){
        node = node.parentElement;
    }
    return node || document.scrollingElement || document.documentElement;
}
// HTML input types that do not cause the software keyboard to appear.
const nonTextInputTypes = new Set([
    'checkbox',
    'radio',
    'range',
    'color',
    'file',
    'image',
    'button',
    'submit',
    'reset'
]);
// The number of active usePreventScroll calls. Used to determine whether to revert back to the original page style/scroll position
let preventScrollCount = 0;
let restore;
/**
 * Prevents scrolling on the document body on mount, and
 * restores it on unmount. Also ensures that content does not
 * shift due to the scrollbars disappearing.
 */ function usePreventScroll(options = {}) {
    let { isDisabled } = options;
    useIsomorphicLayoutEffect(()=>{
        if (isDisabled) {
            return;
        }
        preventScrollCount++;
        if (preventScrollCount === 1) {
            if (isIOS()) {
                restore = preventScrollMobileSafari();
            }
        }
        return ()=>{
            preventScrollCount--;
            if (preventScrollCount === 0) {
                restore == null ? void 0 : restore();
            }
        };
    }, [
        isDisabled
    ]);
}
// Mobile Safari is a whole different beast. Even with overflow: hidden,
// it still scrolls the page in many situations:
//
// 1. When the bottom toolbar and address bar are collapsed, page scrolling is always allowed.
// 2. When the keyboard is visible, the viewport does not resize. Instead, the keyboard covers part of
//    it, so it becomes scrollable.
// 3. When tapping on an input, the page always scrolls so that the input is centered in the visual viewport.
//    This may cause even fixed position elements to scroll off the screen.
// 4. When using the next/previous buttons in the keyboard to navigate between inputs, the whole page always
//    scrolls, even if the input is inside a nested scrollable element that could be scrolled instead.
//
// In order to work around these cases, and prevent scrolling without jankiness, we do a few things:
//
// 1. Prevent default on `touchmove` events that are not in a scrollable element. This prevents touch scrolling
//    on the window.
// 2. Prevent default on `touchmove` events inside a scrollable element when the scroll position is at the
//    top or bottom. This avoids the whole page scrolling instead, but does prevent overscrolling.
// 3. Prevent default on `touchend` events on input elements and handle focusing the element ourselves.
// 4. When focusing an input, apply a transform to trick Safari into thinking the input is at the top
//    of the page, which prevents it from scrolling the page. After the input is focused, scroll the element
//    into view ourselves, without scrolling the whole page.
// 5. Offset the body by the scroll position using a negative margin and scroll to the top. This should appear the
//    same visually, but makes the actual scroll position always zero. This is required to make all of the
//    above work or Safari will still try to scroll the page when focusing an input.
// 6. As a last resort, handle window scroll events, and scroll back to the top. This can happen when attempting
//    to navigate to an input with the next/previous buttons that's outside a modal.
function preventScrollMobileSafari() {
    let scrollable;
    let lastY = 0;
    let onTouchStart = (e)=>{
        // Store the nearest scrollable parent element from the element that the user touched.
        scrollable = getScrollParent(e.target);
        if (scrollable === document.documentElement && scrollable === document.body) {
            return;
        }
        lastY = e.changedTouches[0].pageY;
    };
    let onTouchMove = (e)=>{
        // Prevent scrolling the window.
        if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
            e.preventDefault();
            return;
        }
        // Prevent scrolling up when at the top and scrolling down when at the bottom
        // of a nested scrollable area, otherwise mobile Safari will start scrolling
        // the window instead. Unfortunately, this disables bounce scrolling when at
        // the top but it's the best we can do.
        let y = e.changedTouches[0].pageY;
        let scrollTop = scrollable.scrollTop;
        let bottom = scrollable.scrollHeight - scrollable.clientHeight;
        if (bottom === 0) {
            return;
        }
        if (scrollTop <= 0 && y > lastY || scrollTop >= bottom && y < lastY) {
            e.preventDefault();
        }
        lastY = y;
    };
    let onTouchEnd = (e)=>{
        let target = e.target;
        // Apply this change if we're not already focused on the target element
        if (isInput(target) && target !== document.activeElement) {
            e.preventDefault();
            // Apply a transform to trick Safari into thinking the input is at the top of the page
            // so it doesn't try to scroll it into view. When tapping on an input, this needs to
            // be done before the "focus" event, so we have to focus the element ourselves.
            target.style.transform = 'translateY(-2000px)';
            target.focus();
            requestAnimationFrame(()=>{
                target.style.transform = '';
            });
        }
    };
    let onFocus = (e)=>{
        let target = e.target;
        if (isInput(target)) {
            // Transform also needs to be applied in the focus event in cases where focus moves
            // other than tapping on an input directly, e.g. the next/previous buttons in the
            // software keyboard. In these cases, it seems applying the transform in the focus event
            // is good enough, whereas when tapping an input, it must be done before the focus event. 🤷‍♂️
            target.style.transform = 'translateY(-2000px)';
            requestAnimationFrame(()=>{
                target.style.transform = '';
                // This will have prevented the browser from scrolling the focused element into view,
                // so we need to do this ourselves in a way that doesn't cause the whole page to scroll.
                if (visualViewport) {
                    if (visualViewport.height < window.innerHeight) {
                        // If the keyboard is already visible, do this after one additional frame
                        // to wait for the transform to be removed.
                        requestAnimationFrame(()=>{
                            scrollIntoView(target);
                        });
                    } else {
                        // Otherwise, wait for the visual viewport to resize before scrolling so we can
                        // measure the correct position to scroll to.
                        visualViewport.addEventListener('resize', ()=>scrollIntoView(target), {
                            once: true
                        });
                    }
                }
            });
        }
    };
    let onWindowScroll = ()=>{
        // Last resort. If the window scrolled, scroll it back to the top.
        // It should always be at the top because the body will have a negative margin (see below).
        window.scrollTo(0, 0);
    };
    // Record the original scroll position so we can restore it.
    // Then apply a negative margin to the body to offset it by the scroll position. This will
    // enable us to scroll the window to the top, which is required for the rest of this to work.
    let scrollX = window.pageXOffset;
    let scrollY = window.pageYOffset;
    let restoreStyles = chain$1(setStyle(document.documentElement, 'paddingRight', `${window.innerWidth - document.documentElement.clientWidth}px`));
    // Scroll to the top. The negative margin on the body will make this appear the same.
    window.scrollTo(0, 0);
    let removeEvents = chain$1(addEvent(document, 'touchstart', onTouchStart, {
        passive: false,
        capture: true
    }), addEvent(document, 'touchmove', onTouchMove, {
        passive: false,
        capture: true
    }), addEvent(document, 'touchend', onTouchEnd, {
        passive: false,
        capture: true
    }), addEvent(document, 'focus', onFocus, true), addEvent(window, 'scroll', onWindowScroll));
    return ()=>{
        // Restore styles and scroll the page back to where it was.
        restoreStyles();
        removeEvents();
        window.scrollTo(scrollX, scrollY);
    };
}
// Sets a CSS property on an element, and returns a function to revert it to the previous value.
function setStyle(element, style, value) {
    // https://github.com/microsoft/TypeScript/issues/17827#issuecomment-391663310
    // @ts-ignore
    let cur = element.style[style];
    // @ts-ignore
    element.style[style] = value;
    return ()=>{
        // @ts-ignore
        element.style[style] = cur;
    };
}
// Adds an event listener to an element, and returns a function to remove it.
function addEvent(target, event, handler, options) {
    // @ts-ignore
    target.addEventListener(event, handler, options);
    return ()=>{
        // @ts-ignore
        target.removeEventListener(event, handler, options);
    };
}
function scrollIntoView(target) {
    let root = document.scrollingElement || document.documentElement;
    while(target && target !== root){
        // Find the parent scrollable element and adjust the scroll position if the target is not already in view.
        let scrollable = getScrollParent(target);
        if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== target) {
            let scrollableTop = scrollable.getBoundingClientRect().top;
            let targetTop = target.getBoundingClientRect().top;
            let targetBottom = target.getBoundingClientRect().bottom;
            // Buffer is needed for some edge cases
            const keyboardHeight = scrollable.getBoundingClientRect().bottom + KEYBOARD_BUFFER;
            if (targetBottom > keyboardHeight) {
                scrollable.scrollTop += targetTop - scrollableTop;
            }
        }
        // @ts-ignore
        target = scrollable.parentElement;
    }
}
function isInput(target) {
    return target instanceof HTMLInputElement && !nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
// This code comes from https://github.com/radix-ui/primitives/tree/main/packages/react/compose-refs
/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */ function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */ function composeRefs(...refs) {
    return (node)=>refs.forEach((ref)=>setRef(ref, node));
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */ function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React__namespace.useCallback(composeRefs(...refs), refs);
}
const cache = new WeakMap();
function set(el, styles, ignoreCache = false) {
    if (!el || !(el instanceof HTMLElement)) return;
    let originalStyles = {};
    Object.entries(styles).forEach(([key, value])=>{
        if (key.startsWith('--')) {
            el.style.setProperty(key, value);
            return;
        }
        originalStyles[key] = el.style[key];
        el.style[key] = value;
    });
    if (ignoreCache) return;
    cache.set(el, originalStyles);
}
function reset(el, prop) {
    if (!el || !(el instanceof HTMLElement)) return;
    let originalStyles = cache.get(el);
    if (!originalStyles) {
        return;
    }
    {
        el.style[prop] = originalStyles[prop];
    }
}
const isVertical = (direction)=>{
    switch(direction){
        case 'top':
        case 'bottom':
            return true;
        case 'left':
        case 'right':
            return false;
        default:
            return direction;
    }
};
function getTranslate(element, direction) {
    if (!element) {
        return null;
    }
    const style = window.getComputedStyle(element);
    const transform = style.transform || style.webkitTransform || style.mozTransform;
    let mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) {
        // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
        return parseFloat(mat[1].split(', ')[isVertical(direction) ? 13 : 12]);
    }
    // https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[isVertical(direction) ? 5 : 4]) : null;
}
function dampenValue(v) {
    return 8 * (Math.log(v + 1) - 2);
}
function assignStyle(element, style) {
    if (!element) return ()=>{};
    const prevStyle = element.style.cssText;
    Object.assign(element.style, style);
    return ()=>{
        element.style.cssText = prevStyle;
    };
}
/**
 * Receives functions as arguments and returns a new function that calls all.
 */ function chain(...fns) {
    return (...args)=>{
        for (const fn of fns){
            if (typeof fn === 'function') {
                // @ts-ignore
                fn(...args);
            }
        }
    };
}
const TRANSITIONS = {
    DURATION: 0.5,
    EASE: [
        0.32,
        0.72,
        0,
        1
    ]
};
const VELOCITY_THRESHOLD = 0.4;
const CLOSE_THRESHOLD = 0.25;
const SCROLL_LOCK_TIMEOUT = 100;
const BORDER_RADIUS = 8;
const NESTED_DISPLACEMENT = 16;
const WINDOW_TOP_OFFSET = 26;
const DRAG_CLASS = 'vaul-dragging';
// This code comes from https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx
function useCallbackRef(callback) {
    const callbackRef = React.useRef(callback);
    React.useEffect(()=>{
        callbackRef.current = callback;
    });
    // https://github.com/facebook/react/issues/19240
    return React.useMemo(()=>(...args)=>callbackRef.current == null ? void 0 : callbackRef.current.call(callbackRef, ...args), []);
}
function useUncontrolledState({ defaultProp, onChange }) {
    const uncontrolledState = React.useState(defaultProp);
    const [value] = uncontrolledState;
    const prevValueRef = React.useRef(value);
    const handleChange = useCallbackRef(onChange);
    React.useEffect(()=>{
        if (prevValueRef.current !== value) {
            handleChange(value);
            prevValueRef.current = value;
        }
    }, [
        value,
        prevValueRef,
        handleChange
    ]);
    return uncontrolledState;
}
function useControllableState({ prop, defaultProp, onChange = ()=>{} }) {
    const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
        defaultProp,
        onChange
    });
    const isControlled = prop !== undefined;
    const value = isControlled ? prop : uncontrolledProp;
    const handleChange = useCallbackRef(onChange);
    const setValue = React.useCallback((nextValue)=>{
        if (isControlled) {
            const setter = nextValue;
            const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
            if (value !== prop) handleChange(value);
        } else {
            setUncontrolledProp(nextValue);
        }
    }, [
        isControlled,
        prop,
        setUncontrolledProp,
        handleChange
    ]);
    return [
        value,
        setValue
    ];
}
function useSnapPoints({ activeSnapPointProp, setActiveSnapPointProp, snapPoints, drawerRef, overlayRef, fadeFromIndex, onSnapPointChange, direction = 'bottom', container, snapToSequentialPoint }) {
    const [activeSnapPoint, setActiveSnapPoint] = useControllableState({
        prop: activeSnapPointProp,
        defaultProp: snapPoints == null ? void 0 : snapPoints[0],
        onChange: setActiveSnapPointProp
    });
    const [windowDimensions, setWindowDimensions] = React.useState(typeof window !== 'undefined' ? {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
    } : undefined);
    React.useEffect(()=>{
        function onResize() {
            setWindowDimensions({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            });
        }
        window.addEventListener('resize', onResize);
        return ()=>window.removeEventListener('resize', onResize);
    }, []);
    const isLastSnapPoint = React.useMemo(()=>activeSnapPoint === (snapPoints == null ? void 0 : snapPoints[snapPoints.length - 1]) || null, [
        snapPoints,
        activeSnapPoint
    ]);
    const activeSnapPointIndex = React.useMemo(()=>{
        var _snapPoints_findIndex;
        return (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint)=>snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : null;
    }, [
        snapPoints,
        activeSnapPoint
    ]);
    const shouldFade = snapPoints && snapPoints.length > 0 && (fadeFromIndex || fadeFromIndex === 0) && !Number.isNaN(fadeFromIndex) && snapPoints[fadeFromIndex] === activeSnapPoint || !snapPoints;
    const snapPointsOffset = React.useMemo(()=>{
        const containerSize = container ? {
            width: container.getBoundingClientRect().width,
            height: container.getBoundingClientRect().height
        } : typeof window !== 'undefined' ? {
            width: window.innerWidth,
            height: window.innerHeight
        } : {
            width: 0,
            height: 0
        };
        var _snapPoints_map;
        return (_snapPoints_map = snapPoints == null ? void 0 : snapPoints.map((snapPoint)=>{
            const isPx = typeof snapPoint === 'string';
            let snapPointAsNumber = 0;
            if (isPx) {
                snapPointAsNumber = parseInt(snapPoint, 10);
            }
            if (isVertical(direction)) {
                const height = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.height : 0;
                if (windowDimensions) {
                    return direction === 'bottom' ? containerSize.height - height : -containerSize.height + height;
                }
                return height;
            }
            const width = isPx ? snapPointAsNumber : windowDimensions ? snapPoint * containerSize.width : 0;
            if (windowDimensions) {
                return direction === 'right' ? containerSize.width - width : -containerSize.width + width;
            }
            return width;
        })) != null ? _snapPoints_map : [];
    }, [
        snapPoints,
        windowDimensions,
        container
    ]);
    const activeSnapPointOffset = React.useMemo(()=>activeSnapPointIndex !== null ? snapPointsOffset == null ? void 0 : snapPointsOffset[activeSnapPointIndex] : null, [
        snapPointsOffset,
        activeSnapPointIndex
    ]);
    const snapToPoint = React.useCallback((dimension)=>{
        var _snapPointsOffset_findIndex;
        const newSnapPointIndex = (_snapPointsOffset_findIndex = snapPointsOffset == null ? void 0 : snapPointsOffset.findIndex((snapPointDim)=>snapPointDim === dimension)) != null ? _snapPointsOffset_findIndex : null;
        onSnapPointChange(newSnapPointIndex);
        set(drawerRef.current, {
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            transform: isVertical(direction) ? `translate3d(0, ${dimension}px, 0)` : `translate3d(${dimension}px, 0, 0)`
        });
        if (snapPointsOffset && newSnapPointIndex !== snapPointsOffset.length - 1 && fadeFromIndex !== undefined && newSnapPointIndex !== fadeFromIndex && newSnapPointIndex < fadeFromIndex) {
            set(overlayRef.current, {
                transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
                opacity: '0'
            });
        } else {
            set(overlayRef.current, {
                transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
                opacity: '1'
            });
        }
        setActiveSnapPoint(snapPoints == null ? void 0 : snapPoints[Math.max(newSnapPointIndex, 0)]);
    }, [
        drawerRef.current,
        snapPoints,
        snapPointsOffset,
        fadeFromIndex,
        overlayRef,
        setActiveSnapPoint
    ]);
    React.useEffect(()=>{
        if (activeSnapPoint || activeSnapPointProp) {
            var _snapPoints_findIndex;
            const newIndex = (_snapPoints_findIndex = snapPoints == null ? void 0 : snapPoints.findIndex((snapPoint)=>snapPoint === activeSnapPointProp || snapPoint === activeSnapPoint)) != null ? _snapPoints_findIndex : -1;
            if (snapPointsOffset && newIndex !== -1 && typeof snapPointsOffset[newIndex] === 'number') {
                snapToPoint(snapPointsOffset[newIndex]);
            }
        }
    }, [
        activeSnapPoint,
        activeSnapPointProp,
        snapPoints,
        snapPointsOffset,
        snapToPoint
    ]);
    function onRelease({ draggedDistance, closeDrawer, velocity, dismissible }) {
        if (fadeFromIndex === undefined) return;
        const currentPosition = direction === 'bottom' || direction === 'right' ? (activeSnapPointOffset != null ? activeSnapPointOffset : 0) - draggedDistance : (activeSnapPointOffset != null ? activeSnapPointOffset : 0) + draggedDistance;
        const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
        const isFirst = activeSnapPointIndex === 0;
        const hasDraggedUp = draggedDistance > 0;
        if (isOverlaySnapPoint) {
            set(overlayRef.current, {
                transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
            });
        }
        if (!snapToSequentialPoint && velocity > 2 && !hasDraggedUp) {
            if (dismissible) closeDrawer();
            else snapToPoint(snapPointsOffset[0]); // snap to initial point
            return;
        }
        if (!snapToSequentialPoint && velocity > 2 && hasDraggedUp && snapPointsOffset && snapPoints) {
            snapToPoint(snapPointsOffset[snapPoints.length - 1]);
            return;
        }
        // Find the closest snap point to the current position
        const closestSnapPoint = snapPointsOffset == null ? void 0 : snapPointsOffset.reduce((prev, curr)=>{
            if (typeof prev !== 'number' || typeof curr !== 'number') return prev;
            return Math.abs(curr - currentPosition) < Math.abs(prev - currentPosition) ? curr : prev;
        });
        const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
        if (velocity > VELOCITY_THRESHOLD && Math.abs(draggedDistance) < dim * 0.4) {
            const dragDirection = hasDraggedUp ? 1 : -1; // 1 = up, -1 = down
            // Don't do anything if we swipe upwards while being on the last snap point
            if (dragDirection > 0 && isLastSnapPoint && snapPoints) {
                snapToPoint(snapPointsOffset[snapPoints.length - 1]);
                return;
            }
            if (isFirst && dragDirection < 0 && dismissible) {
                closeDrawer();
            }
            if (activeSnapPointIndex === null) return;
            snapToPoint(snapPointsOffset[activeSnapPointIndex + dragDirection]);
            return;
        }
        snapToPoint(closestSnapPoint);
    }
    function onDrag({ draggedDistance }) {
        if (activeSnapPointOffset === null) return;
        const newValue = direction === 'bottom' || direction === 'right' ? activeSnapPointOffset - draggedDistance : activeSnapPointOffset + draggedDistance;
        // Don't do anything if we exceed the last(biggest) snap point
        if ((direction === 'bottom' || direction === 'right') && newValue < snapPointsOffset[snapPointsOffset.length - 1]) {
            return;
        }
        if ((direction === 'top' || direction === 'left') && newValue > snapPointsOffset[snapPointsOffset.length - 1]) {
            return;
        }
        set(drawerRef.current, {
            transform: isVertical(direction) ? `translate3d(0, ${newValue}px, 0)` : `translate3d(${newValue}px, 0, 0)`
        });
    }
    function getPercentageDragged(absDraggedDistance, isDraggingDown) {
        if (!snapPoints || typeof activeSnapPointIndex !== 'number' || !snapPointsOffset || fadeFromIndex === undefined) return null;
        // If this is true we are dragging to a snap point that is supposed to have an overlay
        const isOverlaySnapPoint = activeSnapPointIndex === fadeFromIndex - 1;
        const isOverlaySnapPointOrHigher = activeSnapPointIndex >= fadeFromIndex;
        if (isOverlaySnapPointOrHigher && isDraggingDown) {
            return 0;
        }
        // Don't animate, but still use this one if we are dragging away from the overlaySnapPoint
        if (isOverlaySnapPoint && !isDraggingDown) return 1;
        if (!shouldFade && !isOverlaySnapPoint) return null;
        // Either fadeFrom index or the one before
        const targetSnapPointIndex = isOverlaySnapPoint ? activeSnapPointIndex + 1 : activeSnapPointIndex - 1;
        // Get the distance from overlaySnapPoint to the one before or vice-versa to calculate the opacity percentage accordingly
        const snapPointDistance = isOverlaySnapPoint ? snapPointsOffset[targetSnapPointIndex] - snapPointsOffset[targetSnapPointIndex - 1] : snapPointsOffset[targetSnapPointIndex + 1] - snapPointsOffset[targetSnapPointIndex];
        const percentageDragged = absDraggedDistance / Math.abs(snapPointDistance);
        if (isOverlaySnapPoint) {
            return 1 - percentageDragged;
        } else {
            return percentageDragged;
        }
    }
    return {
        isLastSnapPoint,
        activeSnapPoint,
        shouldFade,
        getPercentageDragged,
        setActiveSnapPoint,
        activeSnapPointIndex,
        onRelease,
        onDrag,
        snapPointsOffset
    };
}
const noop = ()=>()=>{};
function useScaleBackground() {
    const { direction, isOpen, shouldScaleBackground, setBackgroundColorOnScale, noBodyStyles } = useDrawerContext();
    const timeoutIdRef = React.useRef(null);
    const initialBackgroundColor = React.useMemo(()=>document.body.style.backgroundColor, []);
    function getScale() {
        return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
    }
    React.useEffect(()=>{
        if (isOpen && shouldScaleBackground) {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
            const wrapper = document.querySelector('[data-vaul-drawer-wrapper]') || document.querySelector('[vaul-drawer-wrapper]');
            if (!wrapper) return;
            chain(setBackgroundColorOnScale && !noBodyStyles ? assignStyle(document.body, {
                background: 'black'
            }) : noop, assignStyle(wrapper, {
                transformOrigin: isVertical(direction) ? 'top' : 'left',
                transitionProperty: 'transform, border-radius',
                transitionDuration: `${TRANSITIONS.DURATION}s`,
                transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
            }));
            const wrapperStylesCleanup = assignStyle(wrapper, {
                borderRadius: `${BORDER_RADIUS}px`,
                overflow: 'hidden',
                ...isVertical(direction) ? {
                    transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
                } : {
                    transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
                }
            });
            return ()=>{
                wrapperStylesCleanup();
                timeoutIdRef.current = window.setTimeout(()=>{
                    if (initialBackgroundColor) {
                        document.body.style.background = initialBackgroundColor;
                    } else {
                        document.body.style.removeProperty('background');
                    }
                }, TRANSITIONS.DURATION * 1000);
            };
        }
    }, [
        isOpen,
        shouldScaleBackground,
        initialBackgroundColor
    ]);
}
let previousBodyPosition = null;
/**
 * This hook is necessary to prevent buggy behavior on iOS devices (need to test on Android).
 * I won't get into too much detail about what bugs it solves, but so far I've found that setting the body to `position: fixed` is the most reliable way to prevent those bugs.
 * Issues that this hook solves:
 * https://github.com/emilkowalski/vaul/issues/435
 * https://github.com/emilkowalski/vaul/issues/433
 * And more that I discovered, but were just not reported.
 */ function usePositionFixed({ isOpen, modal, nested, hasBeenOpened, preventScrollRestoration, noBodyStyles }) {
    const [activeUrl, setActiveUrl] = React.useState(()=>typeof window !== 'undefined' ? window.location.href : '');
    const scrollPos = React.useRef(0);
    const setPositionFixed = React.useCallback(()=>{
        // All browsers on iOS will return true here.
        if (!isSafari()) return;
        // If previousBodyPosition is already set, don't set it again.
        if (previousBodyPosition === null && isOpen && !noBodyStyles) {
            previousBodyPosition = {
                position: document.body.style.position,
                top: document.body.style.top,
                left: document.body.style.left,
                height: document.body.style.height,
                right: 'unset'
            };
            // Update the dom inside an animation frame
            const { scrollX, innerHeight } = window;
            document.body.style.setProperty('position', 'fixed', 'important');
            Object.assign(document.body.style, {
                top: `${-scrollPos.current}px`,
                left: `${-scrollX}px`,
                right: '0px',
                height: 'auto'
            });
            window.setTimeout(()=>window.requestAnimationFrame(()=>{
                    // Attempt to check if the bottom bar appeared due to the position change
                    const bottomBarHeight = innerHeight - window.innerHeight;
                    if (bottomBarHeight && scrollPos.current >= innerHeight) {
                        // Move the content further up so that the bottom bar doesn't hide it
                        document.body.style.top = `${-(scrollPos.current + bottomBarHeight)}px`;
                    }
                }), 300);
        }
    }, [
        isOpen
    ]);
    const restorePositionSetting = React.useCallback(()=>{
        // All browsers on iOS will return true here.
        if (!isSafari()) return;
        if (previousBodyPosition !== null && !noBodyStyles) {
            // Convert the position from "px" to Int
            const y = -parseInt(document.body.style.top, 10);
            const x = -parseInt(document.body.style.left, 10);
            // Restore styles
            Object.assign(document.body.style, previousBodyPosition);
            window.requestAnimationFrame(()=>{
                if (preventScrollRestoration && activeUrl !== window.location.href) {
                    setActiveUrl(window.location.href);
                    return;
                }
                window.scrollTo(x, y);
            });
            previousBodyPosition = null;
        }
    }, [
        activeUrl
    ]);
    React.useEffect(()=>{
        function onScroll() {
            scrollPos.current = window.scrollY;
        }
        onScroll();
        window.addEventListener('scroll', onScroll);
        return ()=>{
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    React.useEffect(()=>{
        if (!modal) return;
        return ()=>{
            if (typeof document === 'undefined') return;
            // Another drawer is opened, safe to ignore the execution
            const hasDrawerOpened = !!document.querySelector('[data-vaul-drawer]');
            if (hasDrawerOpened) return;
            restorePositionSetting();
        };
    }, [
        modal,
        restorePositionSetting
    ]);
    React.useEffect(()=>{
        if (nested || !hasBeenOpened) return;
        // This is needed to force Safari toolbar to show **before** the drawer starts animating to prevent a gnarly shift from happening
        if (isOpen) {
            // avoid for standalone mode (PWA)
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
            !isStandalone && setPositionFixed();
            if (!modal) {
                window.setTimeout(()=>{
                    restorePositionSetting();
                }, 500);
            }
        } else {
            restorePositionSetting();
        }
    }, [
        isOpen,
        hasBeenOpened,
        activeUrl,
        modal,
        nested,
        setPositionFixed,
        restorePositionSetting
    ]);
    return {
        restorePositionSetting
    };
}
function Root({ open: openProp, onOpenChange, children, onDrag: onDragProp, onRelease: onReleaseProp, snapPoints, shouldScaleBackground = false, setBackgroundColorOnScale = true, closeThreshold = CLOSE_THRESHOLD, scrollLockTimeout = SCROLL_LOCK_TIMEOUT, dismissible = true, handleOnly = false, fadeFromIndex = snapPoints && snapPoints.length - 1, activeSnapPoint: activeSnapPointProp, setActiveSnapPoint: setActiveSnapPointProp, fixed, modal = true, onClose, nested, noBodyStyles = false, direction = 'bottom', defaultOpen = false, disablePreventScroll = true, snapToSequentialPoint = false, preventScrollRestoration = false, repositionInputs = true, onAnimationEnd, container, autoFocus = false }) {
    var _drawerRef_current, _drawerRef_current1;
    const [isOpen = false, setIsOpen] = useControllableState({
        defaultProp: defaultOpen,
        prop: openProp,
        onChange: (o)=>{
            onOpenChange == null ? void 0 : onOpenChange(o);
            if (!o && !nested) {
                restorePositionSetting();
            }
            setTimeout(()=>{
                onAnimationEnd == null ? void 0 : onAnimationEnd(o);
            }, TRANSITIONS.DURATION * 1000);
            if (o && !modal) {
                if (typeof window !== 'undefined') {
                    window.requestAnimationFrame(()=>{
                        document.body.style.pointerEvents = 'auto';
                    });
                }
            }
            if (!o) {
                // This will be removed when the exit animation ends (`500ms`)
                document.body.style.pointerEvents = 'auto';
            }
        }
    });
    const [hasBeenOpened, setHasBeenOpened] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [justReleased, setJustReleased] = React.useState(false);
    const overlayRef = React.useRef(null);
    const openTime = React.useRef(null);
    const dragStartTime = React.useRef(null);
    const dragEndTime = React.useRef(null);
    const lastTimeDragPrevented = React.useRef(null);
    const isAllowedToDrag = React.useRef(false);
    const nestedOpenChangeTimer = React.useRef(null);
    const pointerStart = React.useRef(0);
    const keyboardIsOpen = React.useRef(false);
    const shouldAnimate = React.useRef(!defaultOpen);
    const previousDiffFromInitial = React.useRef(0);
    const drawerRef = React.useRef(null);
    const drawerHeightRef = React.useRef(((_drawerRef_current = drawerRef.current) == null ? void 0 : _drawerRef_current.getBoundingClientRect().height) || 0);
    const drawerWidthRef = React.useRef(((_drawerRef_current1 = drawerRef.current) == null ? void 0 : _drawerRef_current1.getBoundingClientRect().width) || 0);
    const initialDrawerHeight = React.useRef(0);
    const onSnapPointChange = React.useCallback((activeSnapPointIndex)=>{
        // Change openTime ref when we reach the last snap point to prevent dragging for 500ms incase it's scrollable.
        if (snapPoints && activeSnapPointIndex === snapPointsOffset.length - 1) openTime.current = new Date();
    }, []);
    const { activeSnapPoint, activeSnapPointIndex, setActiveSnapPoint, onRelease: onReleaseSnapPoints, snapPointsOffset, onDrag: onDragSnapPoints, shouldFade, getPercentageDragged: getSnapPointsPercentageDragged } = useSnapPoints({
        snapPoints,
        activeSnapPointProp,
        setActiveSnapPointProp,
        drawerRef,
        fadeFromIndex,
        overlayRef,
        onSnapPointChange,
        direction,
        container,
        snapToSequentialPoint
    });
    usePreventScroll({
        isDisabled: !isOpen || isDragging || !modal || justReleased || !hasBeenOpened || !repositionInputs || !disablePreventScroll
    });
    const { restorePositionSetting } = usePositionFixed({
        isOpen,
        modal,
        nested: nested != null ? nested : false,
        hasBeenOpened,
        preventScrollRestoration,
        noBodyStyles
    });
    function getScale() {
        return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth;
    }
    function onPress(event) {
        var _drawerRef_current, _drawerRef_current1;
        if (!dismissible && !snapPoints) return;
        if (drawerRef.current && !drawerRef.current.contains(event.target)) return;
        drawerHeightRef.current = ((_drawerRef_current = drawerRef.current) == null ? void 0 : _drawerRef_current.getBoundingClientRect().height) || 0;
        drawerWidthRef.current = ((_drawerRef_current1 = drawerRef.current) == null ? void 0 : _drawerRef_current1.getBoundingClientRect().width) || 0;
        setIsDragging(true);
        dragStartTime.current = new Date();
        // iOS doesn't trigger mouseUp after scrolling so we need to listen to touched in order to disallow dragging
        if (isIOS()) {
            window.addEventListener('touchend', ()=>isAllowedToDrag.current = false, {
                once: true
            });
        }
        // Ensure we maintain correct pointer capture even when going outside of the drawer
        event.target.setPointerCapture(event.pointerId);
        pointerStart.current = isVertical(direction) ? event.pageY : event.pageX;
    }
    function shouldDrag(el, isDraggingInDirection) {
        var _window_getSelection;
        let element = el;
        const highlightedText = (_window_getSelection = window.getSelection()) == null ? void 0 : _window_getSelection.toString();
        const swipeAmount = drawerRef.current ? getTranslate(drawerRef.current, direction) : null;
        const date = new Date();
        // Fixes https://github.com/emilkowalski/vaul/issues/483
        if (element.tagName === 'SELECT') {
            return false;
        }
        if (element.hasAttribute('data-vaul-no-drag') || element.closest('[data-vaul-no-drag]')) {
            return false;
        }
        if (direction === 'right' || direction === 'left') {
            return true;
        }
        // Allow scrolling when animating
        if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
            return false;
        }
        if (swipeAmount !== null) {
            if (direction === 'bottom' ? swipeAmount > 0 : swipeAmount < 0) {
                return true;
            }
        }
        // Don't drag if there's highlighted text
        if (highlightedText && highlightedText.length > 0) {
            return false;
        }
        // Disallow dragging if drawer was scrolled within `scrollLockTimeout`
        if (lastTimeDragPrevented.current && date.getTime() - lastTimeDragPrevented.current.getTime() < scrollLockTimeout && swipeAmount === 0) {
            lastTimeDragPrevented.current = date;
            return false;
        }
        if (isDraggingInDirection) {
            lastTimeDragPrevented.current = date;
            // We are dragging down so we should allow scrolling
            return false;
        }
        // Keep climbing up the DOM tree as long as there's a parent
        while(element){
            // Check if the element is scrollable
            if (element.scrollHeight > element.clientHeight) {
                if (element.scrollTop !== 0) {
                    lastTimeDragPrevented.current = new Date();
                    // The element is scrollable and not scrolled to the top, so don't drag
                    return false;
                }
                if (element.getAttribute('role') === 'dialog') {
                    return true;
                }
            }
            // Move up to the parent element
            element = element.parentNode;
        }
        // No scrollable parents not scrolled to the top found, so drag
        return true;
    }
    function onDrag(event) {
        if (!drawerRef.current) {
            return;
        }
        // We need to know how much of the drawer has been dragged in percentages so that we can transform background accordingly
        if (isDragging) {
            const directionMultiplier = direction === 'bottom' || direction === 'right' ? 1 : -1;
            const draggedDistance = (pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX)) * directionMultiplier;
            const isDraggingInDirection = draggedDistance > 0;
            // Pre condition for disallowing dragging in the close direction.
            const noCloseSnapPointsPreCondition = snapPoints && !dismissible && !isDraggingInDirection;
            // Disallow dragging down to close when first snap point is the active one and dismissible prop is set to false.
            if (noCloseSnapPointsPreCondition && activeSnapPointIndex === 0) return;
            // We need to capture last time when drag with scroll was triggered and have a timeout between
            const absDraggedDistance = Math.abs(draggedDistance);
            const wrapper = document.querySelector('[data-vaul-drawer-wrapper]');
            const drawerDimension = direction === 'bottom' || direction === 'top' ? drawerHeightRef.current : drawerWidthRef.current;
            // Calculate the percentage dragged, where 1 is the closed position
            let percentageDragged = absDraggedDistance / drawerDimension;
            const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection);
            if (snapPointPercentageDragged !== null) {
                percentageDragged = snapPointPercentageDragged;
            }
            // Disallow close dragging beyond the smallest snap point.
            if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
                return;
            }
            if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingInDirection)) return;
            drawerRef.current.classList.add(DRAG_CLASS);
            // If shouldDrag gave true once after pressing down on the drawer, we set isAllowedToDrag to true and it will remain true until we let go, there's no reason to disable dragging mid way, ever, and that's the solution to it
            isAllowedToDrag.current = true;
            set(drawerRef.current, {
                transition: 'none'
            });
            set(overlayRef.current, {
                transition: 'none'
            });
            if (snapPoints) {
                onDragSnapPoints({
                    draggedDistance
                });
            }
            // Run this only if snapPoints are not defined or if we are at the last snap point (highest one)
            if (isDraggingInDirection && !snapPoints) {
                const dampenedDraggedDistance = dampenValue(draggedDistance);
                const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier;
                set(drawerRef.current, {
                    transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
                });
                return;
            }
            const opacityValue = 1 - percentageDragged;
            if (shouldFade || fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1) {
                onDragProp == null ? void 0 : onDragProp(event, percentageDragged);
                set(overlayRef.current, {
                    opacity: `${opacityValue}`,
                    transition: 'none'
                }, true);
            }
            if (wrapper && overlayRef.current && shouldScaleBackground) {
                // Calculate percentageDragged as a fraction (0 to 1)
                const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1);
                const borderRadiusValue = 8 - percentageDragged * 8;
                const translateValue = Math.max(0, 14 - percentageDragged * 14);
                set(wrapper, {
                    borderRadius: `${borderRadiusValue}px`,
                    transform: isVertical(direction) ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)` : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
                    transition: 'none'
                }, true);
            }
            if (!snapPoints) {
                const translateValue = absDraggedDistance * directionMultiplier;
                set(drawerRef.current, {
                    transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
                });
            }
        }
    }
    React.useEffect(()=>{
        window.requestAnimationFrame(()=>{
            shouldAnimate.current = true;
        });
    }, []);
    React.useEffect(()=>{
        var _window_visualViewport;
        function onVisualViewportChange() {
            if (!drawerRef.current || !repositionInputs) return;
            const focusedElement = document.activeElement;
            if (isInput(focusedElement) || keyboardIsOpen.current) {
                var _window_visualViewport;
                const visualViewportHeight = ((_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.height) || 0;
                const totalHeight = window.innerHeight;
                // This is the height of the keyboard
                let diffFromInitial = totalHeight - visualViewportHeight;
                const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0;
                // Adjust drawer height only if it's tall enough
                const isTallEnough = drawerHeight > totalHeight * 0.8;
                if (!initialDrawerHeight.current) {
                    initialDrawerHeight.current = drawerHeight;
                }
                const offsetFromTop = drawerRef.current.getBoundingClientRect().top;
                // visualViewport height may change due to somq e subtle changes to the keyboard. Checking if the height changed by 60 or more will make sure that they keyboard really changed its open state.
                if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
                    keyboardIsOpen.current = !keyboardIsOpen.current;
                }
                if (snapPoints && snapPoints.length > 0 && snapPointsOffset && activeSnapPointIndex) {
                    const activeSnapPointHeight = snapPointsOffset[activeSnapPointIndex] || 0;
                    diffFromInitial += activeSnapPointHeight;
                }
                previousDiffFromInitial.current = diffFromInitial;
                // We don't have to change the height if the input is in view, when we are here we are in the opened keyboard state so we can correctly check if the input is in view
                if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
                    const height = drawerRef.current.getBoundingClientRect().height;
                    let newDrawerHeight = height;
                    if (height > visualViewportHeight) {
                        newDrawerHeight = visualViewportHeight - (isTallEnough ? offsetFromTop : WINDOW_TOP_OFFSET);
                    }
                    // When fixed, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
                    if (fixed) {
                        drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`;
                    } else {
                        drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`;
                    }
                } else if (!isMobileFirefox()) {
                    drawerRef.current.style.height = `${initialDrawerHeight.current}px`;
                }
                if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) {
                    drawerRef.current.style.bottom = `0px`;
                } else {
                    // Negative bottom value would never make sense
                    drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`;
                }
            }
        }
        (_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.addEventListener('resize', onVisualViewportChange);
        return ()=>{
            var _window_visualViewport;
            return (_window_visualViewport = window.visualViewport) == null ? void 0 : _window_visualViewport.removeEventListener('resize', onVisualViewportChange);
        };
    }, [
        activeSnapPointIndex,
        snapPoints,
        snapPointsOffset
    ]);
    function closeDrawer(fromWithin) {
        cancelDrag();
        onClose == null ? void 0 : onClose();
        if (!fromWithin) {
            setIsOpen(false);
        }
        setTimeout(()=>{
            if (snapPoints) {
                setActiveSnapPoint(snapPoints[0]);
            }
        }, TRANSITIONS.DURATION * 1000); // seconds to ms
    }
    function resetDrawer() {
        if (!drawerRef.current) return;
        const wrapper = document.querySelector('[data-vaul-drawer-wrapper]');
        const currentSwipeAmount = getTranslate(drawerRef.current, direction);
        set(drawerRef.current, {
            transform: 'translate3d(0, 0, 0)',
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`
        });
        set(overlayRef.current, {
            transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            opacity: '1'
        });
        // Don't reset background if swiped upwards
        if (shouldScaleBackground && currentSwipeAmount && currentSwipeAmount > 0 && isOpen) {
            set(wrapper, {
                borderRadius: `${BORDER_RADIUS}px`,
                overflow: 'hidden',
                ...isVertical(direction) ? {
                    transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                    transformOrigin: 'top'
                } : {
                    transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                    transformOrigin: 'left'
                },
                transitionProperty: 'transform, border-radius',
                transitionDuration: `${TRANSITIONS.DURATION}s`,
                transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`
            }, true);
        }
    }
    function cancelDrag() {
        if (!isDragging || !drawerRef.current) return;
        drawerRef.current.classList.remove(DRAG_CLASS);
        isAllowedToDrag.current = false;
        setIsDragging(false);
        dragEndTime.current = new Date();
    }
    function onRelease(event) {
        if (!isDragging || !drawerRef.current) return;
        drawerRef.current.classList.remove(DRAG_CLASS);
        isAllowedToDrag.current = false;
        setIsDragging(false);
        dragEndTime.current = new Date();
        const swipeAmount = getTranslate(drawerRef.current, direction);
        if (!event || !shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return;
        if (dragStartTime.current === null) return;
        const timeTaken = dragEndTime.current.getTime() - dragStartTime.current.getTime();
        const distMoved = pointerStart.current - (isVertical(direction) ? event.pageY : event.pageX);
        const velocity = Math.abs(distMoved) / timeTaken;
        if (velocity > 0.05) {
            // `justReleased` is needed to prevent the drawer from focusing on an input when the drag ends, as it's not the intent most of the time.
            setJustReleased(true);
            setTimeout(()=>{
                setJustReleased(false);
            }, 200);
        }
        if (snapPoints) {
            const directionMultiplier = direction === 'bottom' || direction === 'right' ? 1 : -1;
            onReleaseSnapPoints({
                draggedDistance: distMoved * directionMultiplier,
                closeDrawer,
                velocity,
                dismissible
            });
            onReleaseProp == null ? void 0 : onReleaseProp(event, true);
            return;
        }
        // Moved upwards, don't do anything
        if (direction === 'bottom' || direction === 'right' ? distMoved > 0 : distMoved < 0) {
            resetDrawer();
            onReleaseProp == null ? void 0 : onReleaseProp(event, true);
            return;
        }
        if (velocity > VELOCITY_THRESHOLD) {
            closeDrawer();
            onReleaseProp == null ? void 0 : onReleaseProp(event, false);
            return;
        }
        var _drawerRef_current_getBoundingClientRect_height;
        const visibleDrawerHeight = Math.min((_drawerRef_current_getBoundingClientRect_height = drawerRef.current.getBoundingClientRect().height) != null ? _drawerRef_current_getBoundingClientRect_height : 0, window.innerHeight);
        var _drawerRef_current_getBoundingClientRect_width;
        const visibleDrawerWidth = Math.min((_drawerRef_current_getBoundingClientRect_width = drawerRef.current.getBoundingClientRect().width) != null ? _drawerRef_current_getBoundingClientRect_width : 0, window.innerWidth);
        const isHorizontalSwipe = direction === 'left' || direction === 'right';
        if (Math.abs(swipeAmount) >= (isHorizontalSwipe ? visibleDrawerWidth : visibleDrawerHeight) * closeThreshold) {
            closeDrawer();
            onReleaseProp == null ? void 0 : onReleaseProp(event, false);
            return;
        }
        onReleaseProp == null ? void 0 : onReleaseProp(event, true);
        resetDrawer();
    }
    React.useEffect(()=>{
        // Trigger enter animation without using CSS animation
        if (isOpen) {
            set(document.documentElement, {
                scrollBehavior: 'auto'
            });
            openTime.current = new Date();
        }
        return ()=>{
            reset(document.documentElement, 'scrollBehavior');
        };
    }, [
        isOpen
    ]);
    function onNestedOpenChange(o) {
        const scale = o ? (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth : 1;
        const initialTranslate = o ? -NESTED_DISPLACEMENT : 0;
        if (nestedOpenChangeTimer.current) {
            window.clearTimeout(nestedOpenChangeTimer.current);
        }
        set(drawerRef.current, {
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${initialTranslate}px, 0)` : `scale(${scale}) translate3d(${initialTranslate}px, 0, 0)`
        });
        if (!o && drawerRef.current) {
            nestedOpenChangeTimer.current = setTimeout(()=>{
                const translateValue = getTranslate(drawerRef.current, direction);
                set(drawerRef.current, {
                    transition: 'none',
                    transform: isVertical(direction) ? `translate3d(0, ${translateValue}px, 0)` : `translate3d(${translateValue}px, 0, 0)`
                });
            }, 500);
        }
    }
    function onNestedDrag(_event, percentageDragged) {
        if (percentageDragged < 0) return;
        const initialScale = (window.innerWidth - NESTED_DISPLACEMENT) / window.innerWidth;
        const newScale = initialScale + percentageDragged * (1 - initialScale);
        const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT;
        set(drawerRef.current, {
            transform: isVertical(direction) ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)` : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
            transition: 'none'
        });
    }
    function onNestedRelease(_event, o) {
        const dim = isVertical(direction) ? window.innerHeight : window.innerWidth;
        const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1;
        const translate = o ? -NESTED_DISPLACEMENT : 0;
        if (o) {
            set(drawerRef.current, {
                transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
                transform: isVertical(direction) ? `scale(${scale}) translate3d(0, ${translate}px, 0)` : `scale(${scale}) translate3d(${translate}px, 0, 0)`
            });
        }
    }
    React.useEffect(()=>{
        if (!modal) {
            // Need to do this manually unfortunately
            window.requestAnimationFrame(()=>{
                document.body.style.pointerEvents = 'auto';
            });
        }
    }, [
        modal
    ]);
    return /*#__PURE__*/ React.createElement(Root$1, {
        defaultOpen: defaultOpen,
        onOpenChange: (open)=>{
            if (!dismissible && !open) return;
            if (open) {
                setHasBeenOpened(true);
            } else {
                closeDrawer(true);
            }
            setIsOpen(open);
        },
        open: isOpen
    }, /*#__PURE__*/ React.createElement(DrawerContext.Provider, {
        value: {
            activeSnapPoint,
            snapPoints,
            setActiveSnapPoint,
            drawerRef,
            overlayRef,
            onOpenChange,
            onPress,
            onRelease,
            onDrag,
            dismissible,
            shouldAnimate,
            handleOnly,
            isOpen,
            isDragging,
            shouldFade,
            closeDrawer,
            onNestedDrag,
            onNestedOpenChange,
            onNestedRelease,
            keyboardIsOpen,
            modal,
            snapPointsOffset,
            activeSnapPointIndex,
            direction,
            shouldScaleBackground,
            setBackgroundColorOnScale,
            noBodyStyles,
            container,
            autoFocus
        }
    }, children));
}
const Overlay = /*#__PURE__*/ React.forwardRef(function({ ...rest }, ref) {
    const { overlayRef, snapPoints, onRelease, shouldFade, isOpen, modal, shouldAnimate } = useDrawerContext();
    const composedRef = useComposedRefs(ref, overlayRef);
    const hasSnapPoints = snapPoints && snapPoints.length > 0;
    // Overlay is the component that is locking scroll, removing it will unlock the scroll without having to dig into Radix's Dialog library
    if (!modal) {
        return null;
    }
    const onMouseUp = React.useCallback((event)=>onRelease(event), [
        onRelease
    ]);
    return /*#__PURE__*/ React.createElement(Overlay$1, {
        onMouseUp: onMouseUp,
        ref: composedRef,
        "data-vaul-overlay": "",
        "data-vaul-snap-points": isOpen && hasSnapPoints ? 'true' : 'false',
        "data-vaul-snap-points-overlay": isOpen && shouldFade ? 'true' : 'false',
        "data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? 'true' : 'false',
        ...rest
    });
});
Overlay.displayName = 'Drawer.Overlay';
const Content = /*#__PURE__*/ React.forwardRef(function({ onPointerDownOutside, style, onOpenAutoFocus, ...rest }, ref) {
    const { drawerRef, onPress, onRelease, onDrag, keyboardIsOpen, snapPointsOffset, activeSnapPointIndex, modal, isOpen, direction, snapPoints, container, handleOnly, shouldAnimate, autoFocus } = useDrawerContext();
    // Needed to use transition instead of animations
    const [delayedSnapPoints, setDelayedSnapPoints] = React.useState(false);
    const composedRef = useComposedRefs(ref, drawerRef);
    const pointerStartRef = React.useRef(null);
    const lastKnownPointerEventRef = React.useRef(null);
    const wasBeyondThePointRef = React.useRef(false);
    const hasSnapPoints = snapPoints && snapPoints.length > 0;
    useScaleBackground();
    const isDeltaInDirection = (delta, direction, threshold = 0)=>{
        if (wasBeyondThePointRef.current) return true;
        const deltaY = Math.abs(delta.y);
        const deltaX = Math.abs(delta.x);
        const isDeltaX = deltaX > deltaY;
        const dFactor = [
            'bottom',
            'right'
        ].includes(direction) ? 1 : -1;
        if (direction === 'left' || direction === 'right') {
            const isReverseDirection = delta.x * dFactor < 0;
            if (!isReverseDirection && deltaX >= 0 && deltaX <= threshold) {
                return isDeltaX;
            }
        } else {
            const isReverseDirection = delta.y * dFactor < 0;
            if (!isReverseDirection && deltaY >= 0 && deltaY <= threshold) {
                return !isDeltaX;
            }
        }
        wasBeyondThePointRef.current = true;
        return true;
    };
    React.useEffect(()=>{
        if (hasSnapPoints) {
            window.requestAnimationFrame(()=>{
                setDelayedSnapPoints(true);
            });
        }
    }, []);
    function handleOnPointerUp(event) {
        pointerStartRef.current = null;
        wasBeyondThePointRef.current = false;
        onRelease(event);
    }
    return /*#__PURE__*/ React.createElement(Content$1, {
        "data-vaul-drawer-direction": direction,
        "data-vaul-drawer": "",
        "data-vaul-delayed-snap-points": delayedSnapPoints ? 'true' : 'false',
        "data-vaul-snap-points": isOpen && hasSnapPoints ? 'true' : 'false',
        "data-vaul-custom-container": container ? 'true' : 'false',
        "data-vaul-animate": (shouldAnimate == null ? void 0 : shouldAnimate.current) ? 'true' : 'false',
        ...rest,
        ref: composedRef,
        style: snapPointsOffset && snapPointsOffset.length > 0 ? {
            '--snap-point-height': `${snapPointsOffset[activeSnapPointIndex != null ? activeSnapPointIndex : 0]}px`,
            ...style
        } : style,
        onPointerDown: (event)=>{
            if (handleOnly) return;
            rest.onPointerDown == null ? void 0 : rest.onPointerDown.call(rest, event);
            pointerStartRef.current = {
                x: event.pageX,
                y: event.pageY
            };
            onPress(event);
        },
        onOpenAutoFocus: (e)=>{
            onOpenAutoFocus == null ? void 0 : onOpenAutoFocus(e);
            if (!autoFocus) {
                e.preventDefault();
            }
        },
        onPointerDownOutside: (e)=>{
            onPointerDownOutside == null ? void 0 : onPointerDownOutside(e);
            if (!modal || e.defaultPrevented) {
                e.preventDefault();
                return;
            }
            if (keyboardIsOpen.current) {
                keyboardIsOpen.current = false;
            }
        },
        onFocusOutside: (e)=>{
            if (!modal) {
                e.preventDefault();
                return;
            }
        },
        onPointerMove: (event)=>{
            lastKnownPointerEventRef.current = event;
            if (handleOnly) return;
            rest.onPointerMove == null ? void 0 : rest.onPointerMove.call(rest, event);
            if (!pointerStartRef.current) return;
            const yPosition = event.pageY - pointerStartRef.current.y;
            const xPosition = event.pageX - pointerStartRef.current.x;
            const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2;
            const delta = {
                x: xPosition,
                y: yPosition
            };
            const isAllowedToSwipe = isDeltaInDirection(delta, direction, swipeStartThreshold);
            if (isAllowedToSwipe) onDrag(event);
            else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
                pointerStartRef.current = null;
            }
        },
        onPointerUp: (event)=>{
            rest.onPointerUp == null ? void 0 : rest.onPointerUp.call(rest, event);
            pointerStartRef.current = null;
            wasBeyondThePointRef.current = false;
            onRelease(event);
        },
        onPointerOut: (event)=>{
            rest.onPointerOut == null ? void 0 : rest.onPointerOut.call(rest, event);
            handleOnPointerUp(lastKnownPointerEventRef.current);
        },
        onContextMenu: (event)=>{
            rest.onContextMenu == null ? void 0 : rest.onContextMenu.call(rest, event);
            if (lastKnownPointerEventRef.current) {
                handleOnPointerUp(lastKnownPointerEventRef.current);
            }
        }
    });
});
Content.displayName = 'Drawer.Content';
const LONG_HANDLE_PRESS_TIMEOUT = 250;
const DOUBLE_TAP_TIMEOUT = 120;
const Handle = /*#__PURE__*/ React.forwardRef(function({ preventCycle = false, children, ...rest }, ref) {
    const { closeDrawer, isDragging, snapPoints, activeSnapPoint, setActiveSnapPoint, dismissible, handleOnly, isOpen, onPress, onDrag } = useDrawerContext();
    const closeTimeoutIdRef = React.useRef(null);
    const shouldCancelInteractionRef = React.useRef(false);
    function handleStartCycle() {
        // Stop if this is the second click of a double click
        if (shouldCancelInteractionRef.current) {
            handleCancelInteraction();
            return;
        }
        window.setTimeout(()=>{
            handleCycleSnapPoints();
        }, DOUBLE_TAP_TIMEOUT);
    }
    function handleCycleSnapPoints() {
        // Prevent accidental taps while resizing drawer
        if (isDragging || preventCycle || shouldCancelInteractionRef.current) {
            handleCancelInteraction();
            return;
        }
        // Make sure to clear the timeout id if the user releases the handle before the cancel timeout
        handleCancelInteraction();
        if (!snapPoints || snapPoints.length === 0) {
            if (!dismissible) {
                closeDrawer();
            }
            return;
        }
        const isLastSnapPoint = activeSnapPoint === snapPoints[snapPoints.length - 1];
        if (isLastSnapPoint && dismissible) {
            closeDrawer();
            return;
        }
        const currentSnapIndex = snapPoints.findIndex((point)=>point === activeSnapPoint);
        if (currentSnapIndex === -1) return; // activeSnapPoint not found in snapPoints
        const nextSnapPoint = snapPoints[currentSnapIndex + 1];
        setActiveSnapPoint(nextSnapPoint);
    }
    function handleStartInteraction() {
        closeTimeoutIdRef.current = window.setTimeout(()=>{
            // Cancel click interaction on a long press
            shouldCancelInteractionRef.current = true;
        }, LONG_HANDLE_PRESS_TIMEOUT);
    }
    function handleCancelInteraction() {
        if (closeTimeoutIdRef.current) {
            window.clearTimeout(closeTimeoutIdRef.current);
        }
        shouldCancelInteractionRef.current = false;
    }
    return /*#__PURE__*/ React.createElement("div", {
        onClick: handleStartCycle,
        onPointerCancel: handleCancelInteraction,
        onPointerDown: (e)=>{
            if (handleOnly) onPress(e);
            handleStartInteraction();
        },
        onPointerMove: (e)=>{
            if (handleOnly) onDrag(e);
        },
        // onPointerUp is already handled by the content component
        ref: ref,
        "data-vaul-drawer-visible": isOpen ? 'true' : 'false',
        "data-vaul-handle": "",
        "aria-hidden": "true",
        ...rest
    }, /*#__PURE__*/ React.createElement("span", {
        "data-vaul-handle-hitarea": "",
        "aria-hidden": "true"
    }, children));
});
Handle.displayName = 'Drawer.Handle';
function Portal(props) {
    const context = useDrawerContext();
    const { container = context.container, ...portalProps } = props;
    return /*#__PURE__*/ React.createElement(Portal$1, {
        container: container,
        ...portalProps
    });
}
const Drawer = {
    Root,
    Content,
    Overlay,
    Portal};

function MobileCalendarDrawer({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates = [], occupiedDateInfo = [], minDate, maxDate, className }) {
    const [selectedRange, setSelectedRange] = React.useState(initialRange || {
        startDate: null,
        endDate: null
    });
    const [selectingEnd, setSelectingEnd] = React.useState(false);
    const scrollContainerRef = React.useRef(null);
    // Generate months: 12 months back + 12 months forward from current date (25 months total)
    const months = React.useMemo(()=>{
        const monthsArray = [];
        const currentDate = new Date();
        const currentMonthStart = dateFns.startOfMonth(currentDate);
        console.log('📱 DEBUG: Raw current date:', currentDate);
        console.log('📱 DEBUG: Current date formatted:', dateFns.format(currentDate, 'MMMM yyyy dd'));
        console.log('📱 DEBUG: Current month start:', dateFns.format(currentMonthStart, 'MMMM yyyy dd'));
        // Dynamic range: 12 months back to 12 months forward from current date
        const startDate = dateFns.subMonths(currentMonthStart, 12) // 12 months back
        ;
        const endDate = dateFns.addMonths(currentMonthStart, 12) // 12 months forward
        ;
        console.log('📱 DEBUG: Start date (12 months back):', dateFns.format(startDate, 'MMMM yyyy dd'));
        console.log('📱 DEBUG: End date (12 months forward):', dateFns.format(endDate, 'MMMM yyyy dd'));
        let monthDate = startDate;
        while(monthDate <= endDate){
            monthsArray.push(new Date(monthDate));
            monthDate = dateFns.addMonths(monthDate, 1);
        }
        // Find current month index
        const currentMonthIndex = monthsArray.findIndex((month)=>month.getFullYear() === currentDate.getFullYear() && month.getMonth() === currentDate.getMonth());
        console.log('📱 DEBUG: Generated months array:');
        monthsArray.forEach((month, index)=>{
            const isCurrent = month.getFullYear() === currentDate.getFullYear() && month.getMonth() === currentDate.getMonth();
            console.log(`📱 DEBUG:   [${index}] ${dateFns.format(month, 'MMMM yyyy')} ${isCurrent ? '← CURRENT' : ''}`);
        });
        console.log('📱 Mobile calendar: Generated', monthsArray.length, 'months from', dateFns.format(monthsArray[0], 'MMMM yyyy'), 'to', dateFns.format(monthsArray[monthsArray.length - 1], 'MMMM yyyy'));
        console.log('📱 Mobile calendar: Current month is', dateFns.format(currentDate, 'MMMM yyyy'), 'at index:', currentMonthIndex);
        return monthsArray;
    }, []);
    // Reset when drawer opens/closes
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
    // Auto-scroll to current month when drawer opens
    React.useEffect(()=>{
        if (isOpen && scrollContainerRef.current && months.length > 0) {
            const currentDate = new Date();
            // Find the actual current month index instead of assuming it's at index 12
            const actualCurrentMonthIndex = months.findIndex((month)=>month.getFullYear() === currentDate.getFullYear() && month.getMonth() === currentDate.getMonth());
            console.log('📱 DEBUG: Auto-scroll triggered');
            console.log('📱 DEBUG: Drawer opened - current date:', dateFns.format(currentDate, 'MMMM yyyy dd'));
            console.log('📱 DEBUG: Months array length:', months.length);
            console.log('📱 DEBUG: Actual current month index:', actualCurrentMonthIndex);
            if (actualCurrentMonthIndex >= 0) {
                console.log('📱 DEBUG: Target month:', dateFns.format(months[actualCurrentMonthIndex], 'MMMM yyyy'));
            }
            // Auto-scroll to actual current month with retry mechanism
            const scrollToCurrentMonth = (attempt = 1, maxAttempts = 3)=>{
                if (!scrollContainerRef.current || actualCurrentMonthIndex < 0) {
                    console.warn('📱 DEBUG: Cannot scroll - container or month index invalid');
                    return;
                }
                console.log(`📱 DEBUG: Starting scroll animation... (attempt ${attempt}/${maxAttempts})`);
                // Progressive delay: 800ms, 1200ms, 1600ms
                const delay = 400 + 400 * attempt;
                // Wait for drawer animation and DOM rendering
                requestAnimationFrame(()=>{
                    setTimeout(()=>{
                        try {
                            const monthElements = scrollContainerRef.current?.querySelectorAll('[data-month-index]');
                            console.log('📱 DEBUG: Found month elements:', monthElements?.length);
                            console.log('📱 DEBUG: Looking for element at index:', actualCurrentMonthIndex);
                            if (monthElements && monthElements[actualCurrentMonthIndex]) {
                                const targetElement = monthElements[actualCurrentMonthIndex];
                                const scrollContainer = scrollContainerRef.current;
                                // Method 1: Try precise scroll calculation (primary approach)
                                try {
                                    const containerTop = scrollContainer.getBoundingClientRect().top;
                                    const elementTop = targetElement.getBoundingClientRect().top;
                                    const currentScroll = scrollContainer.scrollTop;
                                    const targetScroll = currentScroll + (elementTop - containerTop) - 20;
                                    console.log('📱 DEBUG: Scroll calculation:');
                                    console.log('📱 DEBUG:   Container top:', containerTop);
                                    console.log('📱 DEBUG:   Element top:', elementTop);
                                    console.log('📱 DEBUG:   Current scroll:', currentScroll);
                                    console.log('📱 DEBUG:   Target scroll:', targetScroll);
                                    scrollContainer.scrollTo({
                                        top: Math.max(0, targetScroll),
                                        behavior: 'smooth'
                                    });
                                    console.log('📱 DEBUG: Primary scroll method executed');
                                    // Verify scroll worked after a delay
                                    setTimeout(()=>{
                                        const finalScroll = scrollContainer.scrollTop;
                                        const scrollSuccess = Math.abs(finalScroll - targetScroll) < 100 // Allow 100px tolerance
                                        ;
                                        console.log('📱 DEBUG: Scroll verification - Final:', finalScroll, 'Target:', targetScroll, 'Success:', scrollSuccess);
                                        if (!scrollSuccess && attempt < maxAttempts) {
                                            console.log('📱 DEBUG: Primary method failed, retrying...');
                                            scrollToCurrentMonth(attempt + 1, maxAttempts);
                                        } else if (!scrollSuccess && attempt === maxAttempts) {
                                            console.log('📱 DEBUG: All primary attempts failed, trying fallback...');
                                            // Fallback: scrollIntoView
                                            targetElement.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start'
                                            });
                                            console.log('📱 DEBUG: Fallback scrollIntoView executed');
                                        }
                                    }, 1000);
                                } catch (calcError) {
                                    console.warn('📱 DEBUG: Scroll calculation failed, using fallback:', calcError);
                                    // Immediate fallback to scrollIntoView
                                    targetElement.scrollIntoView({
                                        behavior: 'smooth',
                                        block: 'start'
                                    });
                                    console.log('📱 DEBUG: Immediate fallback scrollIntoView executed');
                                }
                            } else {
                                console.warn('📱 DEBUG: Current month element not found at index', actualCurrentMonthIndex);
                                console.warn('📱 DEBUG: Available elements:', monthElements?.length);
                                // Retry if elements not found and attempts remaining
                                if (attempt < maxAttempts) {
                                    console.log(`📱 DEBUG: Elements not found, retrying in ${delay + 200}ms...`);
                                    setTimeout(()=>scrollToCurrentMonth(attempt + 1, maxAttempts), delay + 200);
                                }
                            }
                        } catch (error) {
                            console.error(`📱 DEBUG: Auto-scroll failed on attempt ${attempt}:`, error);
                            // Retry if attempts remaining
                            if (attempt < maxAttempts) {
                                console.log(`📱 DEBUG: Retrying due to error in ${delay + 200}ms...`);
                                setTimeout(()=>scrollToCurrentMonth(attempt + 1, maxAttempts), delay + 200);
                            }
                        }
                    }, delay);
                });
            };
            scrollToCurrentMonth();
        }
    }, [
        isOpen,
        months
    ]);
    // Handle date click - precise single-date selection
    const handleDateClick = (date)=>{
        // Create a clean date without time for comparison
        const cleanDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        // Check if date is disabled
        if (isDateDisabled(cleanDate)) {
            console.log('Date is disabled:', dateFns.format(cleanDate, 'yyyy-MM-dd'));
            return;
        }
        // Handle occupied date click - show helpful message
        if (isDateOccupied(cleanDate)) {
            const occupiedInfo = getOccupiedDateInfo(cleanDate);
            if (occupiedInfo) {
                console.log(`Cannot select ${dateFns.format(cleanDate, 'yyyy-MM-dd')} - already used by ${occupiedInfo.country} trip`);
            }
            return;
        }
        console.log('📱 Mobile calendar: Selecting date:', dateFns.format(cleanDate, 'yyyy-MM-dd'), 'Current state:', {
            startDate: selectedRange.startDate ? dateFns.format(selectedRange.startDate, 'yyyy-MM-dd') : null,
            endDate: selectedRange.endDate ? dateFns.format(selectedRange.endDate, 'yyyy-MM-dd') : null
        });
        // Clean Airbnb-style selection logic
        if (!selectedRange.startDate) {
            // First click: set start date (black circle)
            setSelectedRange({
                startDate: cleanDate,
                endDate: null
            });
            setSelectingEnd(true);
            console.log('📱 ✓ Start date set:', dateFns.format(cleanDate, 'yyyy-MM-dd'));
        } else if (!selectedRange.endDate) {
            // Second click: set end date or reset
            if (cleanDate.getTime() === selectedRange.startDate.getTime()) {
                // Clicking same date - do nothing or could deselect
                console.log('📱 Same date clicked, ignoring');
                return;
            } else if (cleanDate > selectedRange.startDate) {
                // Valid end date - show range
                setSelectedRange({
                    ...selectedRange,
                    endDate: cleanDate
                });
                setSelectingEnd(false);
                console.log('📱 ✓ End date set:', dateFns.format(cleanDate, 'yyyy-MM-dd'));
            } else {
                // Before start date - reset with new start
                setSelectedRange({
                    startDate: cleanDate,
                    endDate: null
                });
                setSelectingEnd(true);
                console.log('📱 ↺ Reset with new start:', dateFns.format(cleanDate, 'yyyy-MM-dd'));
            }
        } else {
            // Both dates already selected - reset with new start
            setSelectedRange({
                startDate: cleanDate,
                endDate: null
            });
            setSelectingEnd(true);
            console.log('📱 ↺ New selection started:', dateFns.format(cleanDate, 'yyyy-MM-dd'));
        }
    };
    // Check if date is disabled - identical to desktop
    const isDateDisabled = (date)=>{
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return disabledDates.some((disabledDate)=>dateFns.isSameDay(date, disabledDate));
    };
    // Check if date is occupied by an existing trip - identical to desktop
    const getOccupiedDateInfo = (date)=>{
        return occupiedDateInfo.find((info)=>dateFns.isSameDay(info.date, date)) || null;
    };
    // Check if date is occupied - identical to desktop
    const isDateOccupied = (date)=>{
        return getOccupiedDateInfo(date) !== null;
    };
    // Check if date is in selected range - only for current month dates
    const isDateInRange = (date, monthDate)=>{
        if (!selectedRange.startDate || !dateFns.isSameMonth(date, monthDate)) return false;
        if (!selectedRange.endDate) return dateFns.isSameDay(date, selectedRange.startDate);
        return date >= selectedRange.startDate && date <= selectedRange.endDate;
    };
    // Check if date is range boundary - only for current month dates
    const isRangeStart = (date, monthDate)=>{
        return selectedRange.startDate && dateFns.isSameMonth(date, monthDate) && dateFns.isSameDay(date, selectedRange.startDate);
    };
    const isRangeEnd = (date, monthDate)=>{
        return selectedRange.endDate && dateFns.isSameMonth(date, monthDate) && dateFns.isSameDay(date, selectedRange.endDate);
    };
    // Handle clear - identical to desktop
    const handleClear = ()=>{
        setSelectedRange({
            startDate: null,
            endDate: null
        });
        setSelectingEnd(false);
    };
    // Handle done - identical to desktop
    const handleDone = ()=>{
        onDateRangeSelect(selectedRange);
        onClose();
    };
    // No longer need touch handlers - scrolling is handled by native scroll
    // Render seamless month for Airbnb-style continuous scrolling
    const renderSeamlessMonth = (monthDate, isFirstMonth = false)=>{
        const monthStart = dateFns.startOfMonth(monthDate);
        const monthEnd = dateFns.endOfMonth(monthDate);
        // Get all days in the month
        const monthDays = dateFns.eachDayOfInterval({
            start: monthStart,
            end: monthEnd
        });
        // Add padding days from previous month for first week
        const startPadding = monthStart.getDay();
        const paddingDays = [];
        for(let i = startPadding - 1; i >= 0; i--){
            const paddingDate = new Date(monthStart);
            paddingDate.setDate(paddingDate.getDate() - (i + 1));
            paddingDays.push(paddingDate);
        }
        // Add padding days from next month for last week
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
            className: "px-4"
        }, /*#__PURE__*/ React.createElement("div", {
            className: "text-center font-bold text-sm mb-6 text-gray-900 pt-6"
        }, dateFns.format(monthDate, 'MMMM yyyy')), isFirstMonth && /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-7 gap-1 mb-3"
        }, [
            'S',
            'M',
            'T',
            'W',
            'T',
            'F',
            'S'
        ].map((day, index)=>/*#__PURE__*/ React.createElement("div", {
                key: index,
                className: "text-center text-sm font-medium text-gray-500 py-2"
            }, day))), /*#__PURE__*/ React.createElement("div", {
            className: "grid grid-cols-7 gap-1 mb-2",
            "data-testid": "mobile-calendar-content"
        }, allDays.map((date, index)=>{
            const isCurrentMonth = dateFns.isSameMonth(date, monthDate);
            const disabled = isDateDisabled(date);
            const occupied = isDateOccupied(date);
            const occupiedInfo = getOccupiedDateInfo(date);
            const inRange = isDateInRange(date, monthDate);
            const rangeStart = isRangeStart(date, monthDate);
            const rangeEnd = isRangeEnd(date, monthDate);
            dateFns.isToday(date);
            return /*#__PURE__*/ React.createElement("button", {
                key: `${dateFns.format(monthDate, 'yyyy-MM')}-${index}`,
                onClick: ()=>{
                    // Allow clicks on any non-disabled, non-occupied date (past, present, future)
                    if (!disabled && !occupied) {
                        console.log('📱 Selecting date:', dateFns.format(date, 'yyyy-MM-dd'), 'from month:', dateFns.format(monthDate, 'MMMM'));
                        handleDateClick(date);
                    } else {
                        console.log('📱 Click blocked - disabled:', disabled, 'occupied:', occupied);
                    }
                },
                disabled: disabled || occupied,
                title: occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined,
                className: cn(// Airbnb-style: 44px touch targets, clean design
                "h-11 w-11 text-sm font-medium transition-all duration-150 relative", "flex items-center justify-center", {
                    // All valid dates styling - clickable (current, past, future months)
                    "text-gray-900 hover:bg-gray-100 hover:rounded-full focus:outline-none focus:ring-1 focus:ring-black cursor-pointer": !disabled && !occupied && !inRange,
                    // Other month dates that are outside valid range - lighter but still clickable
                    "text-gray-500": !isCurrentMonth && !disabled && !occupied,
                    // Disabled styling
                    "text-gray-200 cursor-not-allowed": disabled,
                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60": occupied,
                    // Remove today auto-highlighting - no special styling for today
                    // Range start and end styling - clear black circles
                    "bg-black text-white rounded-full font-semibold": (rangeStart || rangeEnd) && !occupied,
                    // Range middle styling - light background
                    "bg-gray-100 text-gray-900": inRange && !rangeStart && !rangeEnd && !occupied
                })
            }, /*#__PURE__*/ React.createElement("span", {
                className: occupied ? "line-through" : ""
            }, date.getDate()));
        })));
    };
    // SSR Safety: Only render drawer on client side
    if (typeof window === 'undefined') {
        return null;
    }
    return /*#__PURE__*/ React.createElement(Drawer.Root, {
        open: isOpen,
        onOpenChange: onClose
    }, /*#__PURE__*/ React.createElement(Drawer.Portal, null, /*#__PURE__*/ React.createElement(Drawer.Overlay, {
        className: "fixed inset-0 bg-black/40 z-50"
    }), /*#__PURE__*/ React.createElement(Drawer.Content, {
        className: cn("bg-white flex flex-col rounded-t-xl h-[90vh] mt-24 fixed bottom-0 left-0 right-0", "focus:outline-none z-50", className),
        "data-testid": "mobile-drawer"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4 mt-4",
        "data-testid": "drag-handle"
    }), /*#__PURE__*/ React.createElement("div", {
        className: "text-center px-6 mb-6"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-lg font-semibold"
    }, "Select dates")), /*#__PURE__*/ React.createElement("div", {
        className: "flex-1 overflow-hidden"
    }, selectedRange.startDate && !selectedRange.endDate && /*#__PURE__*/ React.createElement("div", {
        className: "mb-3 text-center px-4"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600 font-medium text-sm"
    }, "Select your end date")), /*#__PURE__*/ React.createElement("div", {
        ref: scrollContainerRef,
        className: "h-full overflow-y-auto overscroll-y-contain",
        style: {
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
        },
        "data-testid": "scrollable-months"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "pb-8"
    }, months.map((month, index)=>{
        const isCurrentMonth = month.getFullYear() === new Date().getFullYear() && month.getMonth() === new Date().getMonth();
        return /*#__PURE__*/ React.createElement("div", {
            key: `${month.getFullYear()}-${month.getMonth()}`,
            "data-month-index": index,
            className: isCurrentMonth ? 'current-month' : '',
            "aria-label": isCurrentMonth ? `Current month: ${dateFns.format(month, 'MMMM yyyy')}` : dateFns.format(month, 'MMMM yyyy')
        }, renderSeamlessMonth(month, index === 0));
    })))), /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-between p-6 border-t border-gray-200 bg-white"
    }, /*#__PURE__*/ React.createElement(Button$1, {
        variant: "outline",
        onClick: handleClear,
        disabled: !selectedRange.startDate,
        className: "px-8"
    }, "Clear"), /*#__PURE__*/ React.createElement(Button$1, {
        onClick: handleDone,
        disabled: !selectedRange.startDate,
        className: "px-8"
    }, "Done")))));
}

function CalendarModal({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates = [], occupiedDateInfo = [], minDate, maxDate, className }) {
    const isMobile = useIsMobile();
    // If mobile, render the mobile drawer instead
    if (isMobile) {
        return /*#__PURE__*/ React.createElement(MobileCalendarDrawer, {
            isOpen: isOpen,
            onClose: onClose,
            onDateRangeSelect: onDateRangeSelect,
            initialRange: initialRange,
            disabledDates: disabledDates,
            occupiedDateInfo: occupiedDateInfo,
            minDate: minDate,
            maxDate: maxDate,
            className: className
        });
    }
    // Desktop version below (existing code unchanged)
    return /*#__PURE__*/ React.createElement(DesktopCalendarModal, {
        isOpen: isOpen,
        onClose: onClose,
        onDateRangeSelect: onDateRangeSelect,
        initialRange: initialRange || {
            startDate: null,
            endDate: null
        },
        disabledDates: disabledDates,
        occupiedDateInfo: occupiedDateInfo,
        minDate: minDate,
        maxDate: maxDate,
        className: className
    });
}
// Desktop modal component (extracted from existing code)
function DesktopCalendarModal({ isOpen, onClose, onDateRangeSelect, initialRange, disabledDates = [], occupiedDateInfo = [], minDate, maxDate, className }) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedRange, setSelectedRange] = React.useState(initialRange);
    const [selectingEnd, setSelectingEnd] = React.useState(false);
    // Reset when modal opens/closes
    React.useEffect(()=>{
        if (isOpen) {
            setSelectedRange(initialRange);
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
        // Handle occupied date click - show helpful message
        if (isDateOccupied(date)) {
            const occupiedInfo = getOccupiedDateInfo(date);
            if (occupiedInfo) {
                // You could add a toast notification here in the future
                console.log(`Cannot select ${dateFns.format(date, 'MMM dd')} - already used by ${occupiedInfo.country} trip`);
            }
            return;
        }
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
    // Check if date is occupied by an existing trip
    const getOccupiedDateInfo = (date)=>{
        return occupiedDateInfo.find((info)=>dateFns.isSameDay(info.date, date)) || null;
    };
    // Check if date is occupied
    const isDateOccupied = (date)=>{
        return getOccupiedDateInfo(date) !== null;
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
            const occupied = isDateOccupied(date);
            const occupiedInfo = getOccupiedDateInfo(date);
            const inRange = isDateInRange(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            const today = dateFns.isToday(date);
            return /*#__PURE__*/ React.createElement("button", {
                key: index,
                onClick: ()=>handleDateClick(date),
                disabled: disabled || !isCurrentMonth || occupied,
                title: occupied && occupiedInfo ? `Already used by ${occupiedInfo.country} trip` : undefined,
                className: cn("h-10 w-10 text-sm font-medium rounded-lg transition-colors relative", "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50", {
                    // Current month styling
                    "text-gray-900": isCurrentMonth && !disabled && !occupied,
                    "text-gray-400": !isCurrentMonth,
                    // Disabled styling
                    "text-gray-300 cursor-not-allowed": disabled,
                    // Occupied styling (CLAUDE.md requirement: grey + strikethrough)
                    "bg-gray-200 text-gray-600 cursor-not-allowed opacity-60": occupied && isCurrentMonth,
                    // Today styling
                    "bg-blue-100 text-blue-900": today && !inRange && !occupied && isCurrentMonth,
                    // Range styling
                    "bg-primary/20": inRange && !rangeStart && !rangeEnd && !occupied,
                    "bg-primary text-white": (rangeStart || rangeEnd) && !occupied,
                    // Hover effects
                    "hover:bg-primary/10": !disabled && !inRange && !occupied && isCurrentMonth,
                    "hover:bg-primary/90": (rangeStart || rangeEnd) && !disabled && !occupied
                })
            }, /*#__PURE__*/ React.createElement("span", {
                className: occupied ? "line-through" : ""
            }, date.getDate()));
        })));
    };
    if (!isOpen) return null;
    return typeof window !== 'undefined' ? /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        "data-testid": "desktop-calendar-modal"
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
        className: "flex gap-8 justify-center",
        "data-testid": "dual-month-view"
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

/**
 * Date Overlap Prevention System
 * CRITICAL: Prevents users from selecting dates that conflict with existing trips
 * Requirement: A person cannot be in two different locations simultaneously
 */ class DateOverlapValidator {
    /**
   * CRITICAL: Validates if new date range conflicts with existing trips
   * Must be 100% accurate for EU Schengen compliance
   */ static validateDateRange(newRange, existingTrips, excludeTripId) {
        if (!newRange.startDate || !newRange.endDate) {
            return {
                isValid: true,
                conflicts: [],
                message: 'Dates are available',
                conflictDates: []
            };
        }
        // Filter out the trip being edited (if any)
        const tripsToCheck = existingTrips.filter((trip)=>trip.id !== excludeTripId && trip.startDate && trip.endDate);
        const conflicts = tripsToCheck.filter((trip)=>this.rangesOverlap(newRange, {
                startDate: trip.startDate,
                endDate: trip.endDate
            }));
        const conflictDates = conflicts.length > 0 ? this.getOverlapDates(newRange, conflicts) : [];
        return {
            isValid: conflicts.length === 0,
            conflicts: conflicts,
            message: conflicts.length > 0 ? `Dates overlap with existing trip: ${conflicts[0].country}` : 'Dates are available',
            conflictDates
        };
    }
    /**
   * Returns array of dates that should be disabled in date picker
   * These dates MUST be visually greyed out with strikethrough
   */ static getDisabledDates(existingTrips, excludeTripId) {
        const disabledDates = [];
        const tripsToCheck = existingTrips.filter((trip)=>trip.id !== excludeTripId && trip.startDate && trip.endDate);
        tripsToCheck.forEach((trip)=>{
            if (!trip.startDate || !trip.endDate) return;
            let currentDate = new Date(trip.startDate);
            const endDate = new Date(trip.endDate);
            while(currentDate <= endDate){
                disabledDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return disabledDates;
    }
    /**
   * Returns detailed information about occupied dates for tooltips
   */ static getOccupiedDateInfo(existingTrips, excludeTripId) {
        const occupiedInfo = [];
        const tripsToCheck = existingTrips.filter((trip)=>trip.id !== excludeTripId && trip.startDate && trip.endDate);
        tripsToCheck.forEach((trip)=>{
            if (!trip.startDate || !trip.endDate) return;
            let currentDate = new Date(trip.startDate);
            const endDate = new Date(trip.endDate);
            while(currentDate <= endDate){
                occupiedInfo.push({
                    date: new Date(currentDate),
                    tripId: trip.id,
                    country: trip.country,
                    tripName: `${trip.country} Trip`
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return occupiedInfo;
    }
    /**
   * Check if two date ranges overlap
   */ static rangesOverlap(range1, range2) {
        if (!range1.startDate || !range1.endDate || !range2.startDate || !range2.endDate) {
            return false;
        }
        // Convert to timestamps for accurate comparison
        const start1 = range1.startDate.getTime();
        const end1 = range1.endDate.getTime();
        const start2 = range2.startDate.getTime();
        const end2 = range2.endDate.getTime();
        // Check for overlap: ranges overlap if start1 <= end2 AND end1 >= start2
        return start1 <= end2 && end1 >= start2;
    }
    /**
   * Get specific dates where overlap occurs
   */ static getOverlapDates(newRange, conflicts) {
        if (!newRange.startDate || !newRange.endDate) return [];
        const overlapDates = [];
        const newStart = new Date(newRange.startDate);
        const newEnd = new Date(newRange.endDate);
        let currentDate = new Date(newStart);
        while(currentDate <= newEnd){
            // Check if this date is occupied by any conflicting trip
            const isOccupied = conflicts.some((trip)=>{
                if (!trip.startDate || !trip.endDate) return false;
                const tripStart = new Date(trip.startDate);
                const tripEnd = new Date(trip.endDate);
                return currentDate >= tripStart && currentDate <= tripEnd;
            });
            if (isOccupied) {
                overlapDates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return overlapDates;
    }
    /**
   * Helper to format date for user messages
   */ static formatDateForMessage(date) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
    /**
   * Get user-friendly error message for date conflicts
   */ static getConflictMessage(conflicts, conflictDates) {
        if (conflicts.length === 0) return 'Dates are available';
        if (conflicts.length === 1) {
            const conflict = conflicts[0];
            const startStr = conflict.startDate ? this.formatDateForMessage(conflict.startDate) : 'Unknown';
            const endStr = conflict.endDate ? this.formatDateForMessage(conflict.endDate) : 'Unknown';
            return `Cannot select these dates. You already have a trip to ${conflict.country} from ${startStr} to ${endStr}.`;
        }
        return `Cannot select these dates. You have ${conflicts.length} overlapping trips.`;
    }
}
function useDateOverlapPrevention({ existingTrips, excludeTripId }) {
    const validateDateRange = (range)=>{
        return DateOverlapValidator.validateDateRange(range, existingTrips, excludeTripId);
    };
    const getDisabledDates = ()=>{
        return DateOverlapValidator.getDisabledDates(existingTrips, excludeTripId);
    };
    const getOccupiedDateInfo = ()=>{
        return DateOverlapValidator.getOccupiedDateInfo(existingTrips, excludeTripId);
    };
    const isDateOccupied = (date)=>{
        const disabledDates = getDisabledDates();
        return disabledDates.some((disabledDate)=>disabledDate.toDateString() === date.toDateString());
    };
    return {
        validateDateRange,
        getDisabledDates,
        getOccupiedDateInfo,
        isDateOccupied
    };
}

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
exports.DateOverlapValidator = DateOverlapValidator;
exports.Header = Header;
exports.Input = Input;
exports.Label = Label;
exports.MobileCalendarDrawer = MobileCalendarDrawer;
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
exports.useDateOverlapPrevention = useDateOverlapPrevention;
exports.useIsMobile = useIsMobile;
exports.useMediaQuery = useMediaQuery;
//# sourceMappingURL=index.cjs.js.map
