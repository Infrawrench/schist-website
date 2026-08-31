import { cssMinify } from "./utils/minifiers";
import { Favicon } from "./components/Icon";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

const rootStyles = cssMinify`
    @import url('./Roboto.ttf');    

    * {
        font-family: 'Roboto', sans-serif;
    }

    body {
        margin-top: 0;
        color: #000;
        background-color: #fff;
    }

    @media (prefers-color-scheme: dark) {
        body {
            color: #fff;
            background-color: #0e0e0e;
        }
    }
`;

export default function HTMLDocument() {
    return (
        <html>
            <head>
                <meta name="description" content="Schist is a modern image editor that is free and open source." />
                <meta name="keywords" content="image editor, free, open source, linux" />
                <meta name="author" content="Schist" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta charSet="UTF-8" />
                <meta property="og:title" content="Schist" />
                <meta property="og:description" content="Schist is a modern image editor that is free and open source." />
                <meta property="og:url" content="https://schist.app" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Schist" />
                <title>Schist</title>
                <Favicon />
                <style dangerouslySetInnerHTML={{ __html: rootStyles }} />
            </head>
            <body>
                <Header />
                <Main />
                <Footer />
            </body>
        </html>
    );
}
