import { cssMinify, jsMinify } from "../utils/minifiers";

const styles = cssMinify`
    .backers {
        max-width: 60rem;
        margin: 4rem auto 0;
        padding: 0 1.5rem;
        text-align: center;
    }

    .backers h2 { font-size: 1.5rem; font-weight: 400; }
    .backers p { line-height: 1.6; }
    .backers a { color: inherit; }
    .backers__tier { margin-top: 2.5rem; }
    .backers__tier h3 { font-size: 1.1rem; }
    .backers__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem 2rem;
        padding: 0;
        list-style: none;
    }
    .backers__list li { max-width: 100%; }
    .backers__brand {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        overflow-wrap: anywhere;
    }
    .backers__brand img {
        display: block;
        width: 160px;
        max-width: 100%;
        height: 64px;
        object-fit: contain;
    }
`;

const script = jsMinify`(async function () {
    const container = document.getElementById("backer-brands");
    function httpsUrl(value) {
        if (typeof value !== "string") return null;
        try {
            const url = new URL(value);
            return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
        } catch { return null; }
    }
    try {
        const response = await fetch("https://backers.schist.app/api/backers", {
            signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) return;
        const data = await response.json();
        if (!Array.isArray(data.tiers) || !Array.isArray(data.backers)) return;
        const fragment = document.createDocumentFragment();
        const tiers = data.tiers.filter(tier => tier && typeof tier.id === "string" && typeof tier.name === "string");
        tiers.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        for (const tier of tiers) {
            const list = document.createElement("ul");
            list.className = "backers__list";
            for (const backer of data.backers) {
                if (!backer || backer.tier !== tier.id || typeof backer.name !== "string" || !backer.name.trim()) continue;
                const website = httpsUrl(backer.website);
                if (!website) continue;
                const item = document.createElement("li");
                const link = document.createElement("a");
                link.className = "backers__brand";
                link.href = website;
                link.rel = "sponsored noopener noreferrer";
                const light = httpsUrl(backer.logoLight);
                const dark = httpsUrl(backer.logoDark);
                if (tier.id !== "bronze" && (light || dark)) {
                    const picture = document.createElement("picture");
                    if (dark) {
                        const source = document.createElement("source");
                        source.media = "(prefers-color-scheme: dark)";
                        source.srcset = dark;
                        picture.append(source);
                    }
                    const image = document.createElement("img");
                    image.src = light || dark;
                    image.alt = "";
                    image.width = 160;
                    image.height = 64;
                    image.loading = "lazy";
                    image.addEventListener("error", () => picture.remove());
                    picture.append(image);
                    link.append(picture);
                }
                const name = document.createElement("span");
                name.textContent = backer.name;
                link.append(name);
                item.append(link);
                list.append(item);
            }
            if (!list.childElementCount) continue;
            const group = document.createElement("div");
            group.className = "backers__tier";
            const heading = document.createElement("h3");
            heading.textContent = tier.name;
            group.append(heading, list);
            fragment.append(group);
        }
        container.replaceChildren(fragment);
    } catch {
        // The backing link remains usable when the feed is unavailable.
    }
})();`;

export default function Backers() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styles }} />
            <section className="backers" aria-labelledby="backers-heading">
                <h2 id="backers-heading">Backers</h2>
                <p>Help fund Schist with a one-time contribution.</p>
                <p><a href="https://backers.schist.app">Become a backer</a></p>
                <div id="backer-brands" />
            </section>
            <script dangerouslySetInnerHTML={{ __html: script }} />
        </>
    );
}
