// ==UserScript==
// @name           All Communities Loader
// @author         Oleg Valter <o.a.valter@gmail.com>
// @connect        stackexchange.com
// @description    Userscript for loading all communities in the 'visible communities' list
// @grant          GM_xmlhttpRequest
// @homepage       https://github.com/userscripters/all-communities-loader#readme
// @match          https://stackoverflow.com/users/hidecommunities/*
// @match          https://serverfault.com/users/hidecommunities/*
// @match          https://superuser.com/users/hidecommunities/*
// @match          https://*.stackexchange.com/users/hidecommunities/*
// @match          https://askubuntu.com/users/hidecommunities/*
// @match          https://stackapps.com/users/hidecommunities/*
// @match          https://mathoverflow.net/users/hidecommunities/*
// @match          https://pt.stackoverflow.com/users/hidecommunities/*
// @match          https://ja.stackoverflow.com/users/hidecommunities/*
// @match          https://ru.stackoverflow.com/users/hidecommunities/*
// @match          https://es.stackoverflow.com/users/hidecommunities/*
// @match          https://meta.stackoverflow.com/users/hidecommunities/*
// @match          https://meta.serverfault.com/users/hidecommunities/*
// @match          https://meta.superuser.com/users/hidecommunities/*
// @match          https://meta.askubuntu.com/users/hidecommunities/*
// @match          https://meta.mathoverflow.net/users/hidecommunities/*
// @match          https://pt.meta.stackoverflow.com/users/hidecommunities/*
// @match          https://ja.meta.stackoverflow.com/users/hidecommunities/*
// @match          https://ru.meta.stackoverflow.com/users/hidecommunities/*
// @match          https://es.meta.stackoverflow.com/users/hidecommunities/*
// @namespace      userscripters
// @run-at         document-start
// @source         git+https://github.com/userscripters/all-communities-loader.git
// @supportURL     https://github.com/userscripters/all-communities-loader/issues
// @version        1.0.0
// ==/UserScript==

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function (w, d, l) {
    var API_VER = 2.3;
    var API_BASE = "https://api.stackexchange.com";
    var API_KEY = "IQMwZP9YnpSncK*buTaFuw((";
    var scriptName = "all-communities-loader";
    var selectors = {
        wrapper: ".js-community-lists",
        input: {
            prompt: ".js-community-lists > div > div > p"
        },
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
    var sleep = function (sec) {
        if (sec === void 0) { sec = 1; }
        return new Promise(function (r) { return setTimeout(r, sec * 1e3); });
    };
    var normalizeSiteName = function (site) { return site.replace(/\s+Stack Exchange$/, "").trim(); };
    var fetchAPI = function (method, path, _a) { return __awaiter(void 0, void 0, void 0, function () {
        var normalized, url, params, res, _b, items, has_more, backoff, more;
        var _c = _a.page, page = _c === void 0 ? 1 : _c, _d = _a.pagesize, pagesize = _d === void 0 ? 100 : _d, rest = __rest(_a, ["page", "pagesize"]);
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    normalized = path.replace(/^\//, "");
                    url = new URL("".concat(API_BASE, "/").concat(API_VER, "/").concat(normalized));
                    params = new URLSearchParams(__assign({ page: page.toFixed(0), pagesize: pagesize.toFixed(0) }, rest));
                    url.search = params.toString();
                    return [4, fetch(url.toString(), {
                            method: method,
                            headers: { "Content-Type": "application/json" },
                        })];
                case 1:
                    res = _e.sent();
                    return [4, res.json()];
                case 2:
                    _b = _e.sent(), items = _b.items, has_more = _b.has_more, backoff = _b.backoff;
                    if (!backoff) return [3, 4];
                    return [4, sleep(backoff)];
                case 3:
                    _e.sent();
                    return [2, fetchAPI(method, path, __assign({ page: page }, rest))];
                case 4:
                    if (!has_more) return [3, 6];
                    return [4, fetchAPI(method, path, __assign({ page: page + 1, pagesize: pagesize }, rest))];
                case 5:
                    more = _e.sent();
                    return [2, __spreadArray(__spreadArray([], __read(items), false), __read(more), false)];
                case 6: return [2, items];
            }
        });
    }); };
    var getUserAccountId = function (site, uid) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, account_id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, fetchAPI("get", "/users/".concat(uid), { site: site, key: API_KEY, filter: "!)HhSg0nAY2wmvmr" })];
                case 1:
                    _a = __read.apply(void 0, [_b.sent(), 1]), account_id = _a[0].account_id;
                    return [2, account_id];
            }
        });
    }); };
    var getAllSitesIconsMap = function () { return __awaiter(void 0, void 0, void 0, function () {
        var sites, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchAPI("get", "/sites", { key: API_KEY, filter: "!KJ20E7-8slWN-NKBj", pagesize: 999 })];
                case 1:
                    sites = _a.sent();
                    map = new Map();
                    sites.forEach(function (_a) {
                        var icon_url = _a.icon_url, site_url = _a.site_url;
                        return map.set(site_url, icon_url);
                    });
                    map.set("https://area51.stackexchange.com", "https://cdn.sstatic.net/Sites/area51/Img/icon-48.png");
                    return [2, map];
            }
        });
    }); };
    var getAllSitesIds = function () { return __awaiter(void 0, void 0, void 0, function () {
        var idMap, res, status, responseText, doc$;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idMap = new Map();
                    return [4, new Promise(function (resolve, reject) {
                            GM_xmlhttpRequest({
                                url: "https://stackexchange.com/leagues",
                                onload: resolve,
                                onerror: reject
                            });
                        })];
                case 1:
                    res = _a.sent();
                    status = res.status, responseText = res.responseText;
                    if (status !== 200)
                        return [2, idMap];
                    doc$ = $(responseText);
                    doc$.find(".league-item a").each(function (_, e) {
                        var href = $(e).attr("href");
                        var name = normalizeSiteName($(e).text());
                        idMap.set(name, href.replace(/\D/g, ""));
                    });
                    idMap.set("Area 51", "11");
                    return [2, idMap];
            }
        });
    }); };
    var removeHiddenSites = function (sites, siteIdMap, hiddenIds) {
        return sites.filter(function (_a) {
            var site_name = _a.site_name;
            return !hiddenIds.has(siteIdMap.get(normalizeSiteName(site_name)) || "");
        });
    };
    var getAssociatedSites = function (accountId) { return __awaiter(void 0, void 0, void 0, function () {
        var sites, res, status, responseText, doc$, accountElems, area51row, siteElem, href, textContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetchAPI("get", "/users/".concat(accountId, "/associated"), { key: API_KEY, filter: "*zKJspW7L9qK1Q8K" })];
                case 1:
                    sites = _a.sent();
                    return [4, new Promise(function (resolve, reject) {
                            GM_xmlhttpRequest({
                                url: "https://stackexchange.com/users/".concat(accountId, "?tab=accounts"),
                                onload: resolve,
                                onerror: reject
                            });
                        })];
                case 2:
                    res = _a.sent();
                    status = res.status, responseText = res.responseText;
                    if (status !== 200)
                        return [2, sites];
                    doc$ = $(responseText);
                    accountElems = doc$.find(".account-site").get();
                    area51row = accountElems.find(function (elem) { return elem.querySelector("a[href*=area51]"); });
                    siteElem = area51row === null || area51row === void 0 ? void 0 : area51row.querySelector("h2 > a");
                    if (siteElem) {
                        href = siteElem.href, textContent = siteElem.textContent;
                        sites.push({
                            site_name: normalizeSiteName(textContent || ""),
                            site_url: href.replace(/\/users.*$/, "")
                        });
                    }
                    return [2, sites];
            }
        });
    }); };
    var createVisibleCommunityRow = function (siteName, siteUrl, siteId, iconUrl, disableHideButton) {
        if (disableHideButton === void 0) { disableHideButton = false; }
        var wrapper = d.createElement("div");
        wrapper.classList.add("d-flex", "ai-center", "p8", "sm:p16", "bb", "bc-black-075");
        var iconWrapper = d.createElement("div");
        iconWrapper.classList.add("flex--item", "mr6");
        var icon = d.createElement("img");
        icon.width = icon.height = 36;
        icon.src = iconUrl;
        icon.title = siteName;
        icon.alt = siteUrl.replace(/^https:\/\//, "");
        var nameWrapper = d.createElement("div");
        nameWrapper.classList.add("flex--item", "fl-grow1", "fw-bold");
        nameWrapper.textContent = siteName;
        var btnWrapper = d.createElement("div");
        btnWrapper.classList.add("flex--item");
        var button = d.createElement("button");
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
    var waitFor = function (ctxt, selector, timeout) {
        if (timeout === void 0) { timeout = 1e3; }
        return new Promise(function (resolve, reject) {
            var immediate = ctxt.querySelectorAll(selector);
            if (immediate.length) {
                resolve(immediate);
            }
            var obs = new MutationObserver(function (_, obs) {
                var observed = ctxt.querySelectorAll(selector);
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
    var getHiddenCommunitiesIds = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ids, _a, communitiesWrapper, _b, listWrapper, unhideBtns;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ids = new Set();
                    return [4, waitFor(d, selectors.wrapper)];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 1]), communitiesWrapper = _a[0];
                    if (!communitiesWrapper) {
                        console.debug("".concat(scriptName, ": hidden communities wrapper not found"));
                        return [2, ids];
                    }
                    return [4, waitFor(communitiesWrapper, selectors.hidden.list.wrapper)];
                case 2:
                    _b = __read.apply(void 0, [_c.sent(), 1]), listWrapper = _b[0];
                    if (!listWrapper) {
                        console.debug("".concat(scriptName, ": hidden communities list wrapper not found"));
                        return [2, ids];
                    }
                    if (listWrapper.classList.contains("s-empty-state")) {
                        console.debug("".concat(scriptName, ": no hidden communities found"));
                        return [2, ids];
                    }
                    return [4, waitFor(listWrapper, selectors.hidden.list.buttons)];
                case 3:
                    unhideBtns = _c.sent();
                    unhideBtns.forEach(function (btn) {
                        var siteId = btn.getAttribute("data-site-id");
                        if (siteId)
                            ids.add(siteId);
                    });
                    return [2, ids];
            }
        });
    }); };
    var updateVisibleCommunitiesList = function (sites, siteIdMap, siteIconMap, hiddenIds) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, communitiesWrapper, _b, listWrapper, oldRows, rows;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, waitFor(d, selectors.wrapper)];
                case 1:
                    _a = __read.apply(void 0, [_d.sent(), 1]), communitiesWrapper = _a[0];
                    if (!communitiesWrapper) {
                        console.debug("".concat(scriptName, ": visible communities wrapper not found"));
                        return [2];
                    }
                    return [4, waitFor(communitiesWrapper, selectors.visible.list.wrapper)];
                case 2:
                    _b = __read.apply(void 0, [_d.sent(), 1]), listWrapper = _b[0];
                    if (!listWrapper) {
                        console.debug("".concat(scriptName, ": visible communities list wrapper not found"));
                        return [2];
                    }
                    return [4, waitFor(listWrapper, selectors.visible.list.rows)];
                case 3:
                    oldRows = _d.sent();
                    oldRows.forEach(function (row) { return row.remove(); });
                    rows = removeHiddenSites(sites, siteIdMap, hiddenIds).map(function (site) {
                        var site_name = site.site_name, site_url = site.site_url;
                        var siteName = normalizeSiteName(site_name);
                        var siteId = siteIdMap.get(siteName);
                        return createVisibleCommunityRow(siteName, site_url, siteId || "", siteIconMap.get(site_url) || "", !siteId);
                    });
                    listWrapper.append.apply(listWrapper, __spreadArray([], __read(rows), false));
                    (_c = communitiesWrapper.querySelector(selectors.input.prompt)) === null || _c === void 0 ? void 0 : _c.remove();
                    return [2];
            }
        });
    }); };
    w.addEventListener("load", function () { return __awaiter(void 0, void 0, void 0, function () {
        var hostname, pathname, site, uid, accId, sites, siteIconMap, siteIdMap, hiddenIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hostname = l.hostname, pathname = l.pathname;
                    site = hostname.slice(0, hostname.lastIndexOf("."));
                    uid = pathname.replace(/\D/g, "");
                    return [4, getUserAccountId(site, uid)];
                case 1:
                    accId = _a.sent();
                    console.debug("".concat(scriptName, ": user account id is ").concat(accId));
                    return [4, getAssociatedSites(accId)];
                case 2:
                    sites = _a.sent();
                    sites.sort(function (_a, _b) {
                        var aname = _a.site_name;
                        var bname = _b.site_name;
                        return aname < bname ? -1 : aname > bname ? 1 : 0;
                    });
                    console.debug("".concat(scriptName, ": ").concat(sites.length, " associated"));
                    return [4, getAllSitesIconsMap()];
                case 3:
                    siteIconMap = _a.sent();
                    console.debug("".concat(scriptName, ": ").concat(siteIconMap.size, " icons fetched"));
                    return [4, getAllSitesIds()];
                case 4:
                    siteIdMap = _a.sent();
                    console.debug("".concat(scriptName, ": ").concat(siteIdMap.size, " site ids fetched"));
                    return [4, getHiddenCommunitiesIds()];
                case 5:
                    hiddenIds = _a.sent();
                    console.debug("".concat(scriptName, ": ").concat(hiddenIds === null || hiddenIds === void 0 ? void 0 : hiddenIds.size, " hidden site ids found"));
                    return [4, updateVisibleCommunitiesList(sites, siteIdMap, siteIconMap, hiddenIds)];
                case 6:
                    _a.sent();
                    $(d).ajaxComplete(function (_, __, _a) {
                        var url = _a.url, data = _a.data;
                        if (!url || !["/hide", "/unhide"].some(function (p) { return url.endsWith(p); }) || !data)
                            return;
                        var siteId = typeof data === "object" ?
                            data.siteId :
                            new URLSearchParams(data).get("siteId");
                        if (!siteId) {
                            console.debug("".concat(scriptName, ": missing site-id of the updated site"));
                            return;
                        }
                        url.endsWith("/hide") ?
                            hiddenIds.add(siteId) :
                            hiddenIds.delete(siteId);
                        updateVisibleCommunitiesList(sites, siteIdMap, siteIconMap, hiddenIds);
                    });
                    return [2];
            }
        });
    }); });
})(window, document, location);
