import { cssMinify } from "../utils/minifiers";

const footerStyles = cssMinify`
    footer {
        padding: 4rem 1.5rem 2rem;
        text-align: center;
        font-size: 0.9rem;
        opacity: 0.75;
    }

    footer a {
        color: inherit;
    }
`;

export default function Footer() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: footerStyles }} />

            <footer>
                <p>
                    Proudly built by{" "}
                    <a href="https://infrawrench.com" target="_blank" rel="noopener noreferrer">Infrawrench</a>.
                </p>
            </footer>
        </>
    );
}
