import { cssMinify } from "../utils/minifiers";
import DownloadButton from "./DownloadButton";
import { Logo } from "./Icon";

const headerStyles = cssMinify`
    header {
        position: relative;
        text-align: center;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        margin-bottom: 4rem;
        background-color: #eef1f6;
    }

    .try-link {
        color: inherit;
    }

    header::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        height: 7rem;
        pointer-events: none;
        background-image: linear-gradient(180deg,
            #eef1f6 0%,
            rgba(238, 241, 246, 0.86) 18%,
            rgba(238, 241, 246, 0.62) 38%,
            rgba(238, 241, 246, 0.34) 60%,
            rgba(238, 241, 246, 0.12) 80%,
            rgba(238, 241, 246, 0) 100%);
    }

    header > img {
        margin-top: 1rem;
        margin-bottom: 0.7rem;
    }

    header h1 {
        margin-top: 0;
    }

    header h2 {
        font-size: 1rem;
        font-weight: 400;
        padding-bottom: 1rem;
    }

    @media (prefers-color-scheme: dark) {
        header {
            background-color: #202329;
        }

        header::after {
            background-image: linear-gradient(180deg,
                #202329 0%,
                rgba(32, 35, 41, 0.86) 18%,
                rgba(32, 35, 41, 0.62) 38%,
                rgba(32, 35, 41, 0.34) 60%,
                rgba(32, 35, 41, 0.12) 80%,
                rgba(32, 35, 41, 0) 100%);
        }
    }
`;

export default function Header() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: headerStyles }} />
        
            <header>
                <Logo />
                <h1>Schist</h1>
                <h2>
                    The open source image editor that feels good to use.{" "}
                    <a href="https://try.schist.app" className="try-link">Try it in your browser!</a>
                </h2>
                <DownloadButton />
                <p><a href="https://backers.schist.app" className="try-link">Back Schist</a></p>
            </header>
        </>
    );
}
