import HTMLDocument from "./HTMLDocument.tsx";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { writeFileSync } from "fs";

const html = renderToString(createElement(HTMLDocument));

writeFileSync("public/index.html", html);
