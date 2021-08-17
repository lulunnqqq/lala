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
        while (_) try {
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
var _this = this;
source.topnow_getLink = function (linkIframe1, urlSearch) { return __awaiter(_this, void 0, void 0, function () {
    var htmlIframe1, parseIframe1, linkIframe2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, libs.request_get(linkIframe1, { referer: urlSearch })];
            case 1:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 2:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 3:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 4:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 5:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 6:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 7:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 8:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 9:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 10:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 11:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 12:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 13:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 14:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 15:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 16:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 17:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 18:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 19:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [4, libs.request_get(linkIframe2, { referer: linkIframe1 })];
            case 20:
                htmlIframe1 = _a.sent();
                parseIframe1 = cheerio.load(htmlIframe1);
                linkIframe1 = linkIframe2;
                linkIframe2 = parseIframe1("body iframe").attr("src");
                if (linkIframe2.indexOf("http") != -1) {
                    return [2, linkIframe2];
                }
                else {
                    linkIframe2 = "https://topnow.se" + linkIframe2;
                }
                return [2, ""];
        }
    });
}); };
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var urlSearch, headers, htmlSearch, parseSearch, urlWaiting, link, quality, htmlDetail, linkDownload, param1, param2, param3, linkIframe1, embed, fileSize, host, hostReal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "";
                if (movieInfo.type == "movie") {
                    urlSearch = "https://topnow.se/index.php?search=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                else {
                    urlSearch = "https://topnow.se/index.php?show=" + slugify(movieInfo.title, { lower: true, replacement: '-' });
                }
                headers = {
                    authority: "topnow.se",
                    "upgrade-insecure-requests": 1,
                    "user-agent": libs.request_getRandomUserAgent(),
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-dest": "iframe",
                    "referer": "https://topnow.se"
                };
                return [4, libs.request_get(urlSearch, headers)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                urlWaiting = "https://topnow.se/please_wait.php?IIlIllI=IlllIIIIIllllIIIIlI&title=";
                link = "";
                quality = "";
                console.log(parseSearch(".grid-item .titles").length, movieInfo.year, "---------------- TOPNOW LENGTH ----------------");
                parseSearch(".grid-item .titles").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find("a").text().replace("&nbsp;", "");
                    var cloneUrl = title;
                    var href = parseSearch(itemSearch).find("a").attr("href");
                    quality = parseSearch(itemSearch).find(".card_overlay").text();
                    quality = quality.match(/Quality *\: *([^\(]+)/i);
                    quality = quality ? quality[1].trim() : "";
                    var year = title.match(/\( *([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    var season = title.match(/ *S *([0-9]+) *E[0-9]+/i);
                    season = season ? season[1] : 0;
                    var episode = title.match(/ *S *[0-9]+ *E([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    title = title.replace(/S[0-9]+E[0-9]+/i, "").trim();
                    console.log(title, cloneUrl, href, quality, year, season, episode, "---------------- TOPNOW FILM INFO ----------------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie") {
                            if (year == movieInfo.year) {
                                link = "https://topnow.se" + href;
                            }
                        }
                        if (movieInfo.type == "tv") {
                            if (season == movieInfo.season && episode == movieInfo.episode) {
                                link = "https://topnow.se" + href;
                            }
                        }
                    }
                });
                console.log(link, "------------ TOPNOW LINK -----------");
                if (!(link != "")) return [3, 5];
                return [4, libs.request_get(link, { referer: urlSearch })];
            case 2:
                htmlDetail = _a.sent();
                linkDownload = "https://topnow.se";
                param1 = htmlDetail.match(/IllIllllIIIIIlllIl *\= *\"([^\"]+)/i);
                param1 = param1 ? param1[1] : "";
                param2 = htmlDetail.match(/IlllIIlllllllIIIlI *\= *\"([^\"]+)/i);
                param2 = param2 ? param2[1] : "";
                param3 = htmlDetail.match(/lIlllIlllllIIlIllI *\= *\"([^\"]+)/i);
                param3 = param3 ? param3[1] : "";
                linkIframe1 = linkDownload + "/" + param1 + param2 + param3;
                console.log(linkIframe1, "------------ TOPNOW SEARCH IFRAME -----------");
                return [4, source.topnow_getLink(linkIframe1, urlSearch)];
            case 3:
                embed = _a.sent();
                console.log(embed, "------------ TOPNOW RESULT EMBED -----------");
                if (!(embed != "")) return [3, 5];
                return [4, libs.request_getFileSize(embed)];
            case 4:
                fileSize = _a.sent();
                host = libs.string_getHost(embed);
                hostReal = libs.string_getHost(embed, true);
                console.log(embed, fileSize, host, hostReal, "embed--------------------");
                if (!fileSize || embed.indexOf("docs.google") != -1) {
                    if (hosts[hostReal]) {
                        hosts[hostReal](embed, movieInfo, _.merge(config, { provider: "TopNow" }), callback);
                    }
                }
                else {
                    callback({
                        file: embed,
                        size: fileSize,
                        host: host.toUpperCase(),
                        provider: "TopNow"
                    });
                }
                _a.label = 5;
            case 5: return [2];
        }
    });
}); };
