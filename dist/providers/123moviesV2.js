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
    var headers, urlSearch, htmlSearch, parseSearch, link, _a, ids_1, htmlDetail, parseDetail_1, idEmbed, urlGetEpisode, urlAjax_1, arrMap;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                headers = {
                    "x-requested-with": "XMLHttpRequest",
                    "sec-fetch-site": "same-origin",
                    referer: "",
                    cookie: ""
                };
                urlSearch = "https://ww3.123movies.la/search/" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _b.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".ml-item").length, "-------- 123MOVIESV2 SEARCH --------");
                parseSearch(".ml-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".mli-info h2").text();
                    var href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href");
                    var quality = parseSearch(itemSearch).find(".mli-quality").text();
                    console.log(title, href, quality, "-------- 123MOVIESV2 SEARCH INFO --------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        link = href;
                    }
                });
                console.log(link, "-------- 123MOVIESV2 LINK --------");
                if (!(link != "")) return [3, 6];
                if (movieInfo.type == "tv") {
                    link += "/s" + movieInfo.season + "/watching.html";
                }
                else {
                    link += "/watching.html";
                }
                headers.referer = link;
                _a = headers;
                return [4, libs.request_getCookie(headers.referer)];
            case 2:
                _a.cookie = _b.sent();
                ids_1 = [];
                console.log(link, "-------- 123MOVIESV2 LINK WATCHING --------");
                return [4, libs.request_get(link)];
            case 3:
                htmlDetail = _b.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                idEmbed = htmlDetail.match(/id *: *\"([^\"]+)/i);
                idEmbed = idEmbed ? idEmbed[1].trim() : "";
                console.log(idEmbed, "-------- 123MOVIESV2 ID EMBED --------");
                urlGetEpisode = "https://ww3.123movies.la/ajax/v2_get_episodes/" + idEmbed;
                return [4, libs.request_get(urlGetEpisode, headers)];
            case 4:
                htmlDetail = _b.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                if (movieInfo.type == "movie") {
                    console.log(parseDetail_1(".btn-eps.first-ep.last-ep").length, "-------- 123MOVIESV2 DETAIL LENGTH --------");
                    parseDetail_1(".btn-eps.first-ep.last-ep").each(function (keyDetail, itemDetail) {
                        var href = parseDetail_1(itemDetail).attr("href");
                        var id = parseDetail_1(itemDetail).attr("episode-id");
                        if (href.toLowerCase().indexOf("intro") == -1) {
                            ids_1.push(id);
                        }
                    });
                }
                else {
                    console.log(parseDetail_1(".btn-eps.first-ep").length, "-------- 123MOVIESV2 DETAIL LENGTH TV --------");
                    parseDetail_1(".btn-eps.first-ep").each(function (keyDetail, itemDetail) {
                        var href = parseDetail_1(itemDetail).attr("href");
                        var id = parseDetail_1(itemDetail).attr("episode-id");
                        var episode = parseDetail_1(itemDetail).text();
                        episode = episode.toLowerCase().match(/episode *([0-9]+)/i);
                        episode = episode ? episode[1] : 0;
                        if (href.toLowerCase().indexOf("intro") == -1 && movieInfo.episode == episode) {
                            ids_1.push(id);
                        }
                    });
                }
                console.log(ids_1, "-------- 123MOVIESV2 IDS --------");
                urlAjax_1 = "https://ww3.123movies.la/ajax/load_embed/";
                arrMap = ids_1.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var result, embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_get("" + urlAjax_1 + id, headers, 'json')];
                            case 1:
                                result = _a.sent();
                                console.log(result, headers, "" + urlAjax_1 + id, "--------------- 123MOVIESV2 URLAJAX EmBED--------");
                                if (!(result.status == 1)) return [3, 3];
                                embed = result.embed_url;
                                if (!embed) return [3, 3];
                                return [4, libs.request_getFileSize(embed)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "MoviesBlueray" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "MoviesBlueray"
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6: return [2];
        }
    });
}); };
