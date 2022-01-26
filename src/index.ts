type ApiFetchOptions = {
    // body?:
    filter?: StackExchangeAPI.Filters.BuiltIn | string;
    key: string;
    site?: string;
    page?: number;
    pagesize?: number;
} & {
    [key: string]: string | number;
};

((w, d, l) => {

    const API_VER = 2.3;
    const API_BASE = "https://api.stackexchange.com";
    const API_KEY = "IQMwZP9YnpSncK*buTaFuw((";

    const scriptName = "all-communities-loader";

    const selectors = {
        wrapper: ".js-community-lists",
        visible: {
            list: {
                rows: "div:not(:first-child):is(.js-community-lists > div > div)",
                wrapper: "div:first-of-type"
            }
        },
        hidden: {
            list: {
                buttons: "div:is(.js-community-lists > div > div) button",
                rows: "div:is(.js-community-lists > div > div)",
                wrapper: "div:nth-of-type(2):is(.js-community-lists > div)"
            }
        }
    };

    const sleep = (sec = 1) => new Promise((r) => setTimeout(r, sec * 1e3));

    const normalizeSiteName = (site: string) => site.replace(/\s+Stack Exchange$/, "").trim();

    const fetchAPI = async <T extends object>(
        method: string,
        path: string,
        { page = 1, pagesize = 100, ...rest }: ApiFetchOptions
    ): Promise<T[]> => {
        const normalized = path.replace(/^\//, "");

        const url = new URL(`${API_BASE}/${API_VER}/${normalized}`);

        const params = new URLSearchParams({
            page: page.toFixed(0),
            pagesize: pagesize.toFixed(0),
            ...rest
        });

        url.search = params.toString();

        const res = await fetch(url.toString(), {
            method,
            headers: { "Content-Type": "application/json" },
        });

        const { items, has_more, backoff }: StackExchangeAPI.CommonWrapperObject<T> = await res.json();

        if (backoff) {
            await sleep(backoff);
            return fetchAPI<T>(method, path, { page, ...rest });
        }

        if (has_more) {
            const more = await fetchAPI<T>(method, path, { page: page + 1, pagesize, ...rest });
            return [...items, ...more];
        }

        return items;
    };

    const getUserAccountId = async (site: string, uid: number | string) => {
        const [{ account_id }] = await fetchAPI<StackExchangeAPI.User>(
            "get",
            `/users/${uid}`,
            { site, key: API_KEY, filter: "!)HhSg0nAY2wmvmr" });

        return account_id;
    };

    const getAllSitesIconsMap = async () => {
        const sites = await fetchAPI<Pick<StackExchangeAPI.Site, "site_url" | "icon_url">>(
            "get",
            "/sites",
            { key: API_KEY, filter: "!KJ20E7-8slWN-NKBj", pagesize: 999 }
        );

        const map = new Map<string, string>();
        sites.forEach(({ icon_url, site_url }) => map.set(site_url, icon_url));

        // Area 51 is not returned from any of the API endpoints
        map.set(
            "https://area51.stackexchange.com",
            "https://cdn.sstatic.net/Sites/area51/Img/icon-48.png"
        );

        return map;
    };

    const getAllSitesIds = async () => {
        const idMap = new Map<string, string>();

        const res = await new Promise<Tampermonkey.Response<any>>((resolve, reject) => {
            GM_xmlhttpRequest({
                url: "https://stackexchange.com/leagues",
                onload: resolve,
                onerror: reject
            });
        });

        const { status, responseText } = res;

        if (status !== 200) return idMap;

        const doc$ = $(responseText);

        doc$.find(".league-item a").each((_, e) => {
            const href = $(e).attr("href")!;
            const name = normalizeSiteName($(e).text());
            idMap.set(name, href.replace(/\D/g, ""));
        });

        // Area 51 is not present on the reputation leagus page
        idMap.set("Area 51", "11");

        return idMap;
    };

    const removeHiddenSites = (
        sites: Pick<StackExchangeAPI.NetworkUser, "site_name" | "site_url">[],
        siteIdMap: Map<string, string>,
        hiddenIds: Set<string>
    ) => {
        return sites.filter(({ site_name }) => !hiddenIds.has(siteIdMap.get(normalizeSiteName(site_name)) || ""));
    };

    const getAssociatedSites = async (accountId: number | string) => {
        const sites = await fetchAPI<Pick<StackExchangeAPI.NetworkUser, "site_name" | "site_url">>(
            "get",
            `/users/${accountId}/associated`,
            { key: API_KEY, filter: "*zKJspW7L9qK1Q8K" }
        );

        // if we want to get Area 51 in the list, we must scrape
        // see https://stackapps.com/q/8726/78873
        const res = await new Promise<Tampermonkey.Response<any>>((resolve, reject) => {
            GM_xmlhttpRequest({
                url: `https://stackexchange.com/users/${accountId}?tab=accounts`,
                onload: resolve,
                onerror: reject
            });
        });

        const { status, responseText } = res;
        if (status !== 200) return sites;

        const doc$ = $(responseText);
        const accountElems = doc$.find(".account-site").get();

        const area51row = accountElems.find((elem) => elem.querySelector("a[href*=area51]"));

        const siteElem = area51row?.querySelector<HTMLAnchorElement>("h2 > a");
        if (siteElem) {
            const { href, textContent } = siteElem;
            sites.push({
                site_name: normalizeSiteName(textContent || ""),
                site_url: href.replace(/\/users.*$/, "")
            });
        }

        return sites;
    };

    const createVisibleCommunityRow = (siteName: string, siteUrl: string, siteId: string, iconUrl: string, disableHideButton = false) => {
        const wrapper = d.createElement("div");
        wrapper.classList.add("d-flex", "ai-center", "p8", "sm:p16", "bb", "bc-black-075");

        const iconWrapper = d.createElement("div");
        iconWrapper.classList.add("flex--item", "mr6");

        const icon = d.createElement("img");
        icon.width = icon.height = 36;
        icon.src = iconUrl;
        icon.title = siteName;
        icon.alt = siteUrl.replace(/^https:\/\//, "");

        const nameWrapper = d.createElement("div");
        nameWrapper.classList.add("flex--item", "fl-grow1", "fw-bold");
        nameWrapper.textContent = siteName;

        const btnWrapper = d.createElement("div");
        btnWrapper.classList.add("flex--item");

        const button = d.createElement("button");
        button.classList.add("s-btn", "s-btn__filled", "js-hide-site");
        button.name = "hide-site";
        button.textContent = "Hide";
        button.disabled = disableHideButton;
        button.setAttribute("data-hide", "true");
        button.setAttribute("data-site-id", siteId);

        iconWrapper.append(icon);
        btnWrapper.append(button);
        wrapper.append(iconWrapper, nameWrapper, btnWrapper);
        return wrapper;
    };

    const waitFor = <T extends Element>(ctxt: Document | Element, selector: string, timeout = 1e3) => {
        return new Promise<NodeListOf<T>>((resolve, reject) => {
            const immediate = ctxt.querySelectorAll<T>(selector);
            if (immediate.length) {
                resolve(immediate);
            }

            const obs = new MutationObserver((_, obs) => {
                const observed = ctxt.querySelectorAll<T>(selector);
                if (observed.length) {
                    obs.disconnect();
                    resolve(observed);
                }
            });

            obs.observe(ctxt, {
                subtree: true,
                childList: true,
                attributes: true
            });

            setTimeout(reject, timeout);
        });
    };

    const getHiddenCommunitiesIds = async () => {
        const ids = new Set<string>();

        const [communitiesWrapper] = await waitFor(d, selectors.wrapper);

        if (!communitiesWrapper) {
            console.debug(`${scriptName}: hidden communities wrapper not found`);
            return ids;
        }

        const [listWrapper] = await waitFor(
            communitiesWrapper,
            selectors.hidden.list.wrapper
        );

        if (!listWrapper) {
            console.debug(`${scriptName}: hidden communities list wrapper not found`);
            return ids;
        }

        const unhideBtns = await waitFor(listWrapper, selectors.hidden.list.buttons);
        unhideBtns.forEach((btn) => {
            const siteId = btn.getAttribute("data-site-id");
            if (siteId) ids.add(siteId);
        });

        return ids;
    };

    const updateVisibleCommunitiesList = async (
        sites: Pick<StackExchangeAPI.NetworkUser, "site_name" | "site_url">[],
        siteIdMap: Map<string, string>,
        siteIconMap: Map<string, string>,
        hiddenIds: Set<string>
    ) => {
        const [communitiesWrapper] = await waitFor(d, selectors.wrapper);

        if (!communitiesWrapper) {
            console.debug(`${scriptName}: visible communities wrapper not found`);
            return;
        }

        const [listWrapper] = await waitFor(
            communitiesWrapper,
            selectors.visible.list.wrapper
        );

        if (!listWrapper) {
            console.debug(`${scriptName}: visible communities list wrapper not found`);
            return;
        }

        const oldRows = await waitFor(listWrapper, selectors.visible.list.rows);
        oldRows.forEach((row) => row.remove());

        const rows = removeHiddenSites(sites, siteIdMap, hiddenIds).map((site) => {
            const { site_name, site_url } = site;
            const siteName = normalizeSiteName(site_name);
            const siteId = siteIdMap.get(siteName);
            return createVisibleCommunityRow(
                siteName,
                site_url,
                siteId || "",
                siteIconMap.get(site_url) || "",
                !siteId
            );
        });

        listWrapper.append(...rows);
    };

    w.addEventListener("load", async () => {
        const { hostname, pathname } = l;

        const site = hostname.slice(0, hostname.lastIndexOf("."));
        const uid = pathname.replace(/\D/g, "");

        const accId = await getUserAccountId(site, uid);

        console.debug(`${scriptName}: user account id is ${accId}`);

        const sites = await getAssociatedSites(accId);

        sites.sort((
            { site_name: aname },
            { site_name: bname }
        ) => aname < bname ? -1 : aname > bname ? 1 : 0);

        console.debug(`${scriptName}: ${sites.length} associated`);

        const siteIconMap = await getAllSitesIconsMap();

        console.debug(`${scriptName}: ${siteIconMap.size} icons fetched`);

        const siteIdMap = await getAllSitesIds();

        console.debug(`${scriptName}: ${siteIdMap.size} site ids fetched`);

        const hiddenIds = await getHiddenCommunitiesIds();

        console.debug(`${scriptName}: ${hiddenIds?.size} hidden site ids found`);

        await updateVisibleCommunitiesList(sites, siteIdMap, siteIconMap, hiddenIds);

        $(d).ajaxComplete((_, __, { url, data }) => {
            if (!url || !["/hide", "/unhide"].some((p) => url.endsWith(p)) || !data) return;

            const siteId = typeof data === "object" ?
                data.siteId :
                new URLSearchParams(data).get("siteId");

            if (!siteId) {
                console.debug(`${scriptName}: missing site-id of the updated site`);
                return;
            }

            url.endsWith("/hide") ?
                hiddenIds.add(siteId) :
                hiddenIds.delete(siteId);

            updateVisibleCommunitiesList(sites, siteIdMap, siteIconMap, hiddenIds);
        });
    });


})(window, document, location);
