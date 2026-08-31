import { cssMinify, jsMinify } from "../utils/minifiers";
import LinuxDownloadModal from "./LinuxDownloadModal.tsx";

const styleData = cssMinify`.download-button {
    display: none;
    box-sizing: border-box;
    margin: 0 auto;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 12px;
    padding: 0.7rem 1.15rem;
    background-image: linear-gradient(180deg, #3b82f6, #2563eb);
    color: #ffffff;
    font: inherit;
    font-weight: 600;
    line-height: 1.25;
    text-align: left;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.18), 0 10px 22px -12px rgba(37, 99, 235, 0.9);
    transition: transform 0.15s ease, box-shadow 0.15s ease, background-image 0.15s ease;
}

.download-button:hover {
    background-image: linear-gradient(180deg, #2563eb, #1d4ed8);
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.22), 0 14px 26px -12px rgba(37, 99, 235, 0.95);
    transform: translateY(-1px);
}

.download-button:active {
    background-image: linear-gradient(180deg, #1d4ed8, #1e40af);
    box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.28);
    transform: translateY(0);
}

.download-button:focus-visible {
    outline: 2px solid #1d4ed8;
    outline-offset: 3px;
}

.download-button__inner {
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

.download-button__icon {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    fill: currentColor;
}

.download-button__text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
}

.download-button__version {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    opacity: 0.85;
    text-align: center;
}

/* Stays out of the way until the script fills in the release tag. */
.download-button__version:empty {
    display: none;
}

#view-release {
    display: none;
    text-align: center;
}

#view-release-link {
    color: inherit;
}

@media (prefers-reduced-motion: reduce) {
    .download-button {
        transition: none;
    }

    .download-button:hover,
    .download-button:active {
        transform: none;
    }
}

@media (prefers-color-scheme: dark) {
    .download-button {
        border-color: rgba(148, 163, 184, 0.24);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 10px 22px -12px rgba(37, 99, 235, 0.8);
    }

    .download-button:focus-visible {
        outline-color: #93c5fd;
    }
}`;

const scriptData = jsMinify`(function () {
    // Wire up the Linux download button
    const linuxDownloadButton = document.getElementById("linux-download-button");
    const linuxDownloadModal = document.getElementById("linux-download-modal");
    linuxDownloadButton.addEventListener("click", () => {
        linuxDownloadModal.showModal();
        linuxDownloadButton.ariaExpanded = "true";
    });
    linuxDownloadModal.addEventListener("close", () => {
        linuxDownloadButton.ariaExpanded = "false";
    });
    linuxDownloadModal.addEventListener("click", event => {
        // Only the dialog's own box catches backdrop clicks; the rect check spares its padding.
        if (event.target !== linuxDownloadModal) {
            return;
        }
        const rect = linuxDownloadModal.getBoundingClientRect();
        const outside = event.clientX < rect.left || event.clientX > rect.right ||
            event.clientY < rect.top || event.clientY > rect.bottom;
        if (outside) {
            linuxDownloadModal.close();
        }
    });

    // Figure out what platform the user is on (fallback to Linux)
    const platform = navigator.userAgent.toLowerCase().includes("linux") ? "linux" :
        navigator.userAgent.toLowerCase().includes("windows") ? "windows" :
        navigator.userAgent.toLowerCase().includes("macos") || navigator.userAgent.toLowerCase().includes("mac os") ? "macos" : "linux";

    // Un-hide the correct download button
    document.getElementById(\`\${platform}-download-button\`).style.display = "block";

    // Buffer clicks for windows/macos download buttons
    const clickBuffer = [];
    const windowsDownloadButton = document.getElementById("windows-download-button");
    const macosDownloadButton = document.getElementById("macos-download-button");
    const bufferWindowsClick = () => {
        clickBuffer.push("windows");
    };
    const bufferMacosClick = () => {
        clickBuffer.push("macos");
    };
    windowsDownloadButton.addEventListener("click", bufferWindowsClick);
    macosDownloadButton.addEventListener("click", bufferMacosClick);

    fetch("https://api.github.com/repos/Infrawrench/schist/releases/latest")
        .then(response => response.json())
        .then(data => {
            // Get the release tag
            const releaseTag = data.tag_name;

            // Stop buffering clicks and redirect to the download page
            const dmgUrl = \`https://github.com/Infrawrench/schist/releases/download/\${releaseTag}/Schist.dmg\`;
            const windowsInstallerUrl = \`https://github.com/Infrawrench/schist/releases/download/\${releaseTag}/Schist-\${releaseTag.replace("v", "")}-setup.exe\`;
            windowsDownloadButton.removeEventListener("click", bufferWindowsClick);
            macosDownloadButton.removeEventListener("click", bufferMacosClick);
            clickBuffer.forEach(platform => {
                if (platform === "windows") {
                    window.location.href = windowsInstallerUrl;
                } else if (platform === "macos") {
                    window.location.href = dmgUrl;
                }
            });
            windowsDownloadButton.addEventListener("click", () => {
                window.location.href = windowsInstallerUrl;
            });
            macosDownloadButton.addEventListener("click", () => {
                window.location.href = dmgUrl;
            });

            // Now handle data-release-tag attribute
            document.body.querySelectorAll("[data-release-tag]").forEach(el => {
                el.innerHTML = releaseTag;
            });

            // Handle the data-replace-with-release-tag-no-v-then-unhide element
            document.body.querySelectorAll("[data-replace-with-release-tag-no-v-then-unhide]").forEach(el => {
                const needle = el.dataset.replaceWithReleaseTagNoVThenUnhide;
                el.innerHTML = el.innerHTML.replaceAll(needle, releaseTag.replace("v", ""));
                el.style.display = "block";
            });
        });
})();`;

export default function DownloadButton() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styleData }} />

            <LinuxDownloadModal modalId="linux-download-modal" />

            <button
                id="linux-download-button"
                className="download-button"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="linux-download-modal"
            >
                <span className="download-button__inner">
                    <svg
                        className="download-button__icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2c-2.2 0-4 1.8-4 4v2c0 .7-.25 1.35-.7 1.9C5.8 11.7 4.9 13.3 4.4 14.8c-.35 1 .85 1.75 1.55.95.15 1.3.6 2.45 1.25 3.3-.5.5-1.05 1-1.6 1.35-.75.5-.4 1.6.5 1.6h11.8c.9 0 1.25-1.1.5-1.6-.55-.35-1.1-.85-1.6-1.35.65-.85 1.1-2 1.25-3.3.7.8 1.9.05 1.55-.95-.5-1.5-1.4-3.1-2.9-4.9-.45-.55-.7-1.2-.7-1.9V6c0-2.2-1.8-4-4-4zM10.3 6.1a1 1.25 0 1 0 0 2.5 1 1.25 0 1 0 0-2.5zm3.4 0a1 1.25 0 1 0 0 2.5 1 1.25 0 1 0 0-2.5zM12 8.2l1.7 1.05L12 10.3l-1.7-1.05z"
                        />
                    </svg>
                    <span className="download-button__text">
                        <span>Download for Linux</span>
                        <span className="download-button__version" data-release-tag=""></span>
                    </span>
                </span>
            </button>
            <button id="windows-download-button" className="download-button" type="button" role="link">
                <span className="download-button__inner">
                    <svg
                        className="download-button__icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M3.5 5.7 10 4.8v6.4H3.5zm7.7-1.07L20.5 3.3v7.9h-9.3zM3.5 12.8H10v6.4l-6.5-.9zm7.7 0h9.3v7.9l-9.3-1.33z" />
                    </svg>
                    <span className="download-button__text">
                        <span>Download for Windows</span>
                        <span className="download-button__version" data-release-tag=""></span>
                    </span>
                </span>
            </button>
            <button id="macos-download-button" className="download-button" type="button" role="link">
                <span className="download-button__inner">
                    <svg
                        className="download-button__icon"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M17.05 12.54c.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.74 2.21 1.1-.04 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5zM14.86 6.1c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.32-.56.65-1.05 1.7-.92 2.7.98.08 1.98-.5 2.58-1.22z" />
                    </svg>
                    <span className="download-button__text">
                        <span>Download for macOS</span>
                        <span className="download-button__version" data-release-tag=""></span>
                    </span>
                </span>
            </button>

            <p id="view-release" data-replace-with-release-tag-no-v-then-unhide="$">
                <a id="view-release-link" href="https://github.com/Infrawrench/schist/releases/v$" target="_blank" rel="noopener noreferrer">
                    View v$ on GitHub
                </a>
            </p>

            <script dangerouslySetInnerHTML={{ __html: scriptData }} />
        </>
    );
}
