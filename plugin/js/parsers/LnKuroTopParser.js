/*
  Template to use to create a new parser
*/
"use strict";

parserFactory.register("lnkuro.top", () => new LnKuroTopParser());

class LnKuroTopParser extends Parser { // eslint-disable-line no-unused-vars
    constructor() {
        super();
    }

    async getChapterUrls(dom) {
        return [...dom.querySelectorAll("ul.chapter-list_kuro a")].map(a => util.hyperLinkToChapter(a, null));
    }

    extractTitle(dom) {
        return dom.querySelector(".info_kuro h1").textContent.trim();
    }

    findContent(dom) {
        const contentNode = dom.querySelector(".article-inner .entry-content");
        if (!contentNode) {
            throw new Error("Content node not found");
        }
        // clean up unwanted web UI
        const nav = contentNode.querySelector("#kuro-chapter-nav-wrapper");
        const banner = contentNode.querySelector(".lnkuro-banner");
        const top_views = contentNode.querySelector(".post-views_kuro");
        const bottom_views = contentNode.querySelector(":scope > .post-views");
        const share = contentNode.querySelector(".blog-share");
        if (nav) contentNode.removeChild(nav);
        if (banner) contentNode.removeChild(banner);
        if (top_views) contentNode.removeChild(top_views);
        if (bottom_views) contentNode.removeChild(bottom_views);
        if (share) contentNode.removeChild(share);

        const styledChildren = contentNode.querySelectorAll(':scope > div[style]');
        styledChildren.forEach(child => child.remove());

        // return chapter content
        return contentNode;
    }

    extractAuthor(dom) { // eslint-disable-line no-unused-vars
        return "ln_kuro";
    }

    findChapterTitle(dom) {
        return dom.querySelector("header.entry-header h1.entry-title").textContent.trim();
    }

    findCoverImageUrl(dom) {
        return dom.querySelector(".cover_kuro img")?.src ?? null;
    }
}
