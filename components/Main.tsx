import { cssMinify } from "../utils/minifiers";

const mainStyles = cssMinify`
    main {
        padding-top: 3rem;
        padding-bottom: 2rem;
        text-align: center;
    }

    main h3 {
        font-size: 1.5rem;
        font-weight: 400;
    }

    main #closed-source {
        color: #ff0000;
    }

    main #beautiful-and-feature-rich {
        color: #007bff;
    }

    .features {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        box-sizing: border-box;
        width: 100%;
        max-width: 60rem;
        margin: 5rem auto 0;
        padding: 0 1.5rem;
        text-align: left;
    }

    .feature {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 2.5rem;
    }

    /* Every other row flips, so the images zig-zag down the page. */
    .feature:nth-child(even) .feature__image {
        order: 2;
    }

    .feature__image {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 16 / 10;
        object-fit: cover;
        border: 1px solid rgba(15, 23, 42, 0.12);
        border-radius: 12px;
        background-color: #eef1f6;
        box-shadow: 0 10px 26px -14px rgba(15, 23, 42, 0.55);
    }

    .feature__title {
        margin: 0 0 0.6rem;
        font-size: 1.35rem;
        font-weight: 600;
    }

    .feature__desc {
        margin: 0;
        line-height: 1.6;
        opacity: 0.85;
    }

    @media (max-width: 40rem) {
        .feature {
            grid-template-columns: 1fr;
            gap: 1.25rem;
        }

        /* Stacked, the image always reads first. */
        .feature:nth-child(even) .feature__image {
            order: 0;
        }
    }

    @media (prefers-color-scheme: dark) {
        main #closed-source {
            color: #ff7878;
        }

        main #beautiful-and-feature-rich {
            color: #7fb1e7;
        }

        .feature__image {
            border-color: rgba(148, 163, 184, 0.24);
            background-color: #202329;
            box-shadow: 0 10px 26px -14px rgba(0, 0, 0, 0.8);
        }
    }
`;

const features = [
    {
        title: "Free but not feature-less",
        desc: "Brushes, transforms, selections, filters, and even your Photoshop plugins work in Schist. Pull in your Affinity or Photoshop files with no issues!",
        image: "./features/ui.png",
    },
    {
        title: "Works great on Linux",
        desc: "Free and open source, the tool is fully built to run on modern Linux distributions! Loads in under 2 seconds on any platform!",
        image: "./features/linux.png",
    },
    {
        title: "Photoshop-class filters",
        desc: "134 filters from Photoshop's Filter menu, Filter Gallery and Neural Filters included, with the dialogs you already know. Every one previews live on the canvas, and the heavy sweeps run on your GPU!",
        image: "./features/filters.png",
    },
];

export default function Main() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: mainStyles }} />
            <main>
                <h3>
                    <span id="beautiful-and-feature-rich">Beautiful and feature-rich</span>
                    {" "}shouldn't mean{" "}
                    <span id="closed-source">closed source</span>
                </h3>

                <div className="features">
                    {features.map(feature => (
                        <section className="feature" key={feature.title}>
                            <img className="feature__image" src={feature.image} alt="" width="800" height="500" loading="lazy" />
                            <div className="feature__text">
                                <h4 className="feature__title">{feature.title}</h4>
                                <p className="feature__desc">{feature.desc}</p>
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </>
    );
}
