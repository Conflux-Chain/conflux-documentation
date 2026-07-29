import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

const REPO_RAW_BASE =
  "https://raw.githubusercontent.com/Conflux-Chain/conflux-documentation/main/";

/**
 * Derives the raw GitHub URL of the markdown source of a doc from its
 * Docusaurus source path (e.g. "@site/docs/overview.md" or
 * "@site/i18n/zh/docusaurus-plugin-content-docs/current/...").
 */
function getRawMarkdownUrl(source) {
  if (!source || !source.startsWith("@site/")) {
    return null;
  }
  return REPO_RAW_BASE + source.slice("@site/".length);
}

/** Fallback: extract the rendered page text when the raw source is unavailable. */
function getRenderedPageText() {
  const article = document.querySelector("article .theme-doc-markdown");
  return article ? article.innerText : null;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9h10v12H9zM5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 6 9 17l-5-5"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

export default function CopyPageButton() {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const markdownCache = useRef(null);

  const rawUrl = getRawMarkdownUrl(metadata.source);
  const pageUrl =
    siteConfig.url.replace(/\/$/, "") + (metadata.permalink || "");

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }
    const onClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  const getMarkdown = useCallback(async () => {
    if (markdownCache.current) {
      return markdownCache.current;
    }
    let content = null;
    if (rawUrl) {
      try {
        const response = await fetch(rawUrl);
        if (response.ok) {
          content = await response.text();
        }
      } catch {
        // Network error — fall through to the rendered-text fallback.
      }
    }
    if (content == null) {
      content = getRenderedPageText();
    }
    if (content == null) {
      throw new Error("Unable to load page content");
    }
    const header = [`# ${metadata.title}`, "", `Source: ${pageUrl}`, "", ""].join(
      "\n"
    );
    markdownCache.current = header + content;
    return markdownCache.current;
  }, [rawUrl, pageUrl, metadata.title]);

  const handleCopy = useCallback(async () => {
    setMenuOpen(false);
    let markdown;
    try {
      markdown = await getMarkdown();
    } catch {
      return;
    }
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      // Clipboard API unavailable or denied — fall back to execCommand.
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
      } finally {
        document.body.removeChild(textarea);
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [getMarkdown]);

  const prompt = translate(
    {
      id: "copyPageButton.aiPrompt",
      message: "Read {url} so I can ask questions about it.",
      description: "Prompt prefilled when opening the page in an AI assistant",
    },
    { url: pageUrl }
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.mainButton}
          onClick={handleCopy}
          title={translate({
            id: "copyPageButton.copyTitle",
            message: "Copy this page as Markdown for AI assistants and agents",
            description: "Tooltip of the copy page button",
          })}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? (
            <Translate id="copyPageButton.copied" description="Copy page button copied state">
              Copied
            </Translate>
          ) : (
            <Translate id="copyPageButton.label" description="Copy page button label">
              Copy page
            </Translate>
          )}
        </button>
        <button
          type="button"
          className={styles.caretButton}
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label={translate({
            id: "copyPageButton.moreOptions",
            message: "More copy options",
            description: "Aria label of the copy page dropdown toggle",
          })}
        >
          <ChevronIcon />
        </button>
      </div>
      {menuOpen && (
        <ul className={styles.menu} role="menu">
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={styles.menuItem}
              onClick={handleCopy}
            >
              <Translate
                id="copyPageButton.copyMarkdown"
                description="Dropdown item: copy page as Markdown"
              >
                Copy page as Markdown
              </Translate>
            </button>
          </li>
          {rawUrl && (
            <li role="none">
              <a
                role="menuitem"
                className={styles.menuItem}
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
              >
                <Translate
                  id="copyPageButton.viewMarkdown"
                  description="Dropdown item: view page source as Markdown"
                >
                  View as Markdown
                </Translate>
              </a>
            </li>
          )}
          <li role="none">
            <a
              role="menuitem"
              className={styles.menuItem}
              href={`https://claude.ai/new?q=${encodeURIComponent(prompt)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Translate
                id="copyPageButton.openClaude"
                description="Dropdown item: open page in Claude"
              >
                Open in Claude
              </Translate>
            </a>
          </li>
          <li role="none">
            <a
              role="menuitem"
              className={styles.menuItem}
              href={`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <Translate
                id="copyPageButton.openChatGPT"
                description="Dropdown item: open page in ChatGPT"
              >
                Open in ChatGPT
              </Translate>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
