import { Fragment } from "react";
import { cssMinify } from "../utils/minifiers";

const styleData = cssMinify`.linux-modal {
    box-sizing: border-box;
    width: min(30rem, calc(100vw - 2rem));
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 14px;
    padding: 1.25rem;
    color: inherit;
    background-color: #ffffff;
    box-shadow: 0 24px 60px -24px rgba(15, 23, 42, 0.55);
}

.linux-modal::backdrop {
    background-color: rgba(15, 23, 42, 0.45);
}

.linux-modal__head {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
    text-align: left;
}

.linux-modal__title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
}

.linux-modal__subtitle {
    margin: 0.2rem 0 0;
    font-size: 0.85rem;
    line-height: 1.4;
    opacity: 0.75;
}

.linux-modal__close-form {
    margin-left: auto;
}

.linux-modal__close {
    display: block;
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 8px;
    padding: 0;
    color: inherit;
    background-color: transparent;
    font: inherit;
    font-size: 1.1rem;
    line-height: 1;
    cursor: pointer;
}

.linux-modal__close:hover {
    background-color: rgba(15, 23, 42, 0.06);
}

.linux-modal__close:focus-visible {
    outline: 2px solid #1d4ed8;
    outline-offset: 2px;
}

.linux-modal__arch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.35rem;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 10px;
    padding: 0.25rem;
    background-color: #eef1f6;
}

/* Hidden but still focusable, so the segmented control keeps working from the keyboard. */
.linux-modal__arch-radio {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
}

.linux-modal__arch-label {
    border-radius: 8px;
    padding: 0.4rem 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
}

.linux-modal__arch-radio:checked + .linux-modal__arch-label {
    color: #ffffff;
    background-image: linear-gradient(180deg, #3b82f6, #2563eb);
}

.linux-modal__arch-radio:focus-visible + .linux-modal__arch-label {
    outline: 2px solid #1d4ed8;
    outline-offset: 2px;
}

.linux-modal__loading {
    margin: 1rem 0 0;
    font-size: 0.9rem;
    text-align: center;
    opacity: 0.75;
}

/* The release tag handler drops an inline display on the list once the tag is known. */
.linux-modal:has(.linux-modal__options[style]) .linux-modal__loading {
    display: none;
}

.linux-modal__options {
    display: none;
    margin-top: 1rem;
}

.linux-modal:has(#linux-arch-x86_64:checked) .linux-modal__panel--aarch64,
.linux-modal:has(#linux-arch-aarch64:checked) .linux-modal__panel--x86_64 {
    display: none;
}

.linux-modal__panel {
    display: grid;
    gap: 0.5rem;
}

.linux-modal__panel-note {
    margin: 0 0 0.25rem;
    font-size: 0.8rem;
    text-align: left;
    opacity: 0.7;
}

.linux-modal__option {
    display: block;
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 10px;
    padding: 0.6rem 0.75rem;
    color: inherit;
    text-align: left;
    text-decoration: none;
}

.linux-modal__option:hover {
    border-color: rgba(37, 99, 235, 0.55);
    background-color: rgba(37, 99, 235, 0.08);
}

.linux-modal__option:focus-visible {
    outline: 2px solid #1d4ed8;
    outline-offset: 2px;
}

.linux-modal__option-name {
    display: block;
    font-weight: 600;
}

.linux-modal__option-file {
    display: block;
    margin-top: 0.15rem;
    font-size: 0.78rem;
    opacity: 0.7;
    overflow-wrap: anywhere;
}

@media (prefers-color-scheme: dark) {
    .linux-modal {
        border-color: rgba(148, 163, 184, 0.24);
        background-color: #202329;
        box-shadow: 0 24px 60px -24px rgba(0, 0, 0, 0.9);
    }

    .linux-modal::backdrop {
        background-color: rgba(0, 0, 0, 0.6);
    }

    .linux-modal__arch {
        border-color: rgba(148, 163, 184, 0.24);
        background-color: #0e0e0e;
    }

    .linux-modal__close,
    .linux-modal__option {
        border-color: rgba(148, 163, 184, 0.24);
    }

    .linux-modal__close:hover {
        background-color: rgba(148, 163, 184, 0.14);
    }

    .linux-modal__close:focus-visible,
    .linux-modal__arch-radio:focus-visible + .linux-modal__arch-label,
    .linux-modal__option:focus-visible {
        outline-color: #93c5fd;
    }

    .linux-modal__option:hover {
        border-color: rgba(147, 197, 253, 0.55);
        background-color: rgba(37, 99, 235, 0.22);
    }
}`;

const downloadBase = "https://github.com/Infrawrench/schist/releases/download/v$/";

/**
 * The Linux artifacts of a release, per architecture. `$` in a file name is swapped for the
 * release tag (without its leading `v`) by the data-replace-with-release-tag-no-v-then-unhide
 * handler in DownloadButton.
 */
const architectures = [
    {
        id: "x86_64",
        label: "x86_64",
        note: "Most desktops and laptops (Intel/AMD).",
        options: [
            { name: "AppImage", file: "Schist-x86_64.AppImage" },
            { name: "Debian / Ubuntu package", file: "schist_$-1_amd64.deb" },
            { name: "Fedora / RHEL package", file: "schist-$-1.x86_64.rpm" },
            { name: "Arch Linux package", file: "schist-$-1-x86_64.pkg.tar.zst" },
            { name: "Portable binary", file: "schist-linux-x86_64" },
        ],
    },
    {
        id: "aarch64",
        label: "ARM64",
        note: "Raspberry Pi, Ampere and other aarch64 machines.",
        options: [
            { name: "AppImage", file: "Schist-aarch64.AppImage" },
            { name: "Debian / Ubuntu package", file: "schist_$-1_arm64.deb" },
            { name: "Fedora / RHEL package", file: "schist-$-1.aarch64.rpm" },
            { name: "Arch Linux package", file: "schist-$-1-aarch64.pkg.tar.zst" },
            { name: "Portable binary", file: "schist-linux-aarch64" },
        ],
    },
];

export default function LinuxDownloadModal({ modalId }: { modalId: string }) {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: styleData }} />

            <dialog id={modalId} className="linux-modal" aria-labelledby={`${modalId}-title`}>
                <div className="linux-modal__head">
                    <div>
                        <h2 id={`${modalId}-title`} className="linux-modal__title">Download for Linux</h2>
                        <p className="linux-modal__subtitle">Pick your architecture, then the packaging your distribution uses.</p>
                    </div>

                    {/* A dialog-method form closes the modal without any script of our own. */}
                    <form method="dialog" className="linux-modal__close-form">
                        <button type="submit" className="linux-modal__close" aria-label="Close">&times;</button>
                    </form>
                </div>

                {/* Kept outside the options list: the release tag handler rewrites that subtree's innerHTML. */}
                <div className="linux-modal__arch">
                    {architectures.map((arch, i) => (
                        <Fragment key={arch.id}>
                            <input
                                type="radio"
                                name="linux-arch"
                                id={`linux-arch-${arch.id}`}
                                className="linux-modal__arch-radio"
                                defaultChecked={i === 0}
                            />
                            <label
                                htmlFor={`linux-arch-${arch.id}`}
                                className="linux-modal__arch-label"
                            >
                                {arch.label}
                            </label>
                        </Fragment>
                    ))}
                </div>

                <p className="linux-modal__loading">Looking up the latest release&hellip;</p>

                <div className="linux-modal__options" data-replace-with-release-tag-no-v-then-unhide="$">
                    {architectures.map(arch => (
                        <div className={`linux-modal__panel linux-modal__panel--${arch.id}`} key={arch.id}>
                            <p className="linux-modal__panel-note">{arch.note}</p>
                            {arch.options.map(option => (
                                <a
                                    className="linux-modal__option"
                                    href={downloadBase + option.file}
                                    key={option.file}
                                >
                                    <span className="linux-modal__option-name">{option.name}</span>
                                    <span className="linux-modal__option-file">{option.file}</span>
                                </a>
                            ))}
                        </div>
                    ))}
                </div>
            </dialog>
        </>
    );
}
