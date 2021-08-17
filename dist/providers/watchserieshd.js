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
source.getResource = function (movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var domain, urlSearch, jsonSearch, parseSearch, link, htmlEmbed, parseEmbed_1, embeds_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://watchserieshd.co";
                urlSearch = domain + "/ajax/suggest_search?keyword=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                console.log(urlSearch, '--------------- WATCHSERIESHD URL SEARCH ----------');
                return [4, libs.request_get(urlSearch, {
                        accept: "application/json, text/javascript, */*; q=0.01",
                        "user-agent": libs.request_getRandomUserAgent(),
                        "x-requested-with": "XMLHttpRequest",
                        "sec-fetch-site": "same-origin",
                        host: "watchserieshd.co"
                    }, 'json')];
            case 1:
                jsonSearch = _a.sent();
                console.log(jsonSearch, 'jsonSearch');
                jsonSearch = jsonSearch.content ? jsonSearch.content : "";
                if (!jsonSearch) {
                    return [2];
                }
                parseSearch = cheerio.load(jsonSearch);
                link = "";
                console.log(parseSearch('ul li').length, '-------------- WATCHSERIESHD SEARCH LENGTH -------');
                parseSearch('ul li').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.ss-title').text();
                    title = title.trim().toLowerCase();
                    var href = parseSearch(itemSearch).find('.ss-title').attr('href');
                    if (href) {
                        href = domain + href;
                    }
                    var season = title.match(/ *\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.replace(/ *\- *season *[0-9]+/, '').trim();
                    console.log(title, href, season, '----------------- WATCHSERIESHD INFO -----------');
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (!season && movieInfo.type == 'movie') {
                            link = href;
                        }
                        else if (season && movieInfo.type == 'tv' && season == movieInfo.season) {
                            link = href;
                        }
                    }
                });
                console.log(link, '----------------- WATCHSERIESHD LINK -----------');
                if (!link) return [3, 3];
                link = link + ("/watching.html?ep=" + (movieInfo.type == 'movie' ? 0 : movieInfo.episode));
                console.log(link, '----------------- WATCHSERIESHD LINK CUSTOM -----------');
                return [4, libs.request_get(link)];
            case 2:
                htmlEmbed = _a.sent();
                parseEmbed_1 = cheerio.load(htmlEmbed);
                embeds_1 = [];
                console.log(parseEmbed_1('.btn-eps').length, '----------------- WATCHSERIESHD EMBED LENGTH -----------');
                parseEmbed_1('.btn-eps').each(function (keyEmbed, itemEmbed) {
                    var urlEmbed = parseEmbed_1(itemEmbed).attr("player-data");
                    if (urlEmbed) {
                        if (_.startsWith(urlEmbed, "/")) {
                            urlEmbed = "https:" + urlEmbed;
                        }
                        embeds_1.push(urlEmbed);
                    }
                });
                console.log(embeds_1, '----------------- WATCHSERIESHD EMBEDS -----------');
                arrMap = embeds_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "WatchSeriesHD", urlDetail: link }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "WatchSeriesHD"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                _a.label = 3;
            case 3: return [2];
        }
    });
}); };
