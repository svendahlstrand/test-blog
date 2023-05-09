// deno-dom lack support for closest so use this for now.
export const closest = function (s, el) {
    do {
        if (el.matches(s)) return el;
        el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
};
