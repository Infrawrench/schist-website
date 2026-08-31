import { minify } from "uglify-js";
import postcss from "postcss";
import cssnano from "cssnano";

/** Interleave a tagged template's cooked strings with its interpolated values. */
function interpolate(strings: TemplateStringsArray, values: any[]) {
    return strings.reduce(
        (acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ""),
        "",
    );
}

/** Via a template string and uglify-js, minify the given JS string, is a template literal function that returns a string */
export function jsMinify(strings: TemplateStringsArray, ...values: any[]) {
    const code = interpolate(strings, values);
    const minified = minify(code, {
        output: {
            comments: false,
        },
    });
    if (minified.error) {
        throw minified.error;
    }
    return minified.code;
}

/** Via a template string and cssnano, minify the given CSS string, is a template literal function that returns a string */
export function cssMinify(strings: TemplateStringsArray, ...values: any[]) {
    const code = interpolate(strings, values);
    return postcss([cssnano()]).process(code, { from: undefined }).css;
}

/** Via a template string, collapse the given SVG's whitespace and encode it as a `data:` URI, is a template literal function that returns a string */
export function svgDataURI(strings: TemplateStringsArray, ...values: any[]) {
    const svg = interpolate(strings, values)
        .replace(/>\s+</g, "><")
        .replace(/\s+/g, " ")
        .trim();
    const encoded = svg
        .replace(/%/g, "%25")
        .replace(/#/g, "%23")
        .replace(/"/g, "%22")
        .replace(/</g, "%3C")
        .replace(/>/g, "%3E");
    return `data:image/svg+xml,${encoded}`;
}
