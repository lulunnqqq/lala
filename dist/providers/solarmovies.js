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
    var urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail, movieId, urlAjaxEpisode, htmlEpisode, parseEpisode_1, ids_1, urlAjaxEmbed_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "https://solarmovie.mom/search/?keyword=" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g });
                console.log(urlSearch, "---------- SOLAR URL SEARCH --------");
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".ml-item").length, '-------------- SOLAR SEARCH ITEM ---------------');
                parseSearch(".ml-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".mli-info h2").text();
                    var season = title.toLowerCase().match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/\- * season *[0-9]+/i, "").trim();
                    var episode = parseSearch(itemSearch).find(".mli-eps i").text();
                    var href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href");
                    console.log(title, season, episode, href, '------------------ SOLAR INFO -----------');
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && !episode) {
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
                            link = href;
                        }
                    }
                });
                console.log(link, '------------ SOLAR LINK -------------');
                if (!(link != "")) return [3, 5];
                link = link + 'watching.html';
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                movieId = htmlDetail.match(/movie_id *= *\'([^\']+)/i);
                movieId = movieId ? movieId[1] : "";
                urlAjaxEpisode = "https://solarmovie.mom/ajax/v2_get_episodes/" + movieId;
                return [4, libs.request_get(urlAjaxEpisode)];
            case 3:
                htmlEpisode = _a.sent();
                parseEpisode_1 = cheerio.load(htmlEpisode);
                ids_1 = [];
                console.log(parseEpisode_1(".btn-eps").length, '------------- SOLAR EMBEDS SEARCH IDS --------------');
                parseEpisode_1(".btn-eps").each(function (keyEpisode, itemEpisode) {
                    var title = parseEpisode_1(itemEpisode).attr("title");
                    var episode = title.toLowerCase().match(/episode *([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    var eId = parseEpisode_1(itemEpisode).attr("episode-id");
                    if (movieInfo.type == "tv") {
                        if (movieInfo.episode == episode) {
                            ids_1.push(eId);
                        }
                    }
                    else {
                        ids_1.push(eId);
                    }
                });
                console.log(ids_1, '------------- SOLAR  ID --------------');
                urlAjaxEmbed_1 = "https://solarmovie.mom/ajax/load_embed/";
                arrMap = ids_1.map(function (eId) { return __awaiter(_this, void 0, void 0, function () {
                    var res, embed, getEmbedSolar, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_get(urlAjaxEmbed_1 + "mov" + eId, {}, 'json')];
                            case 1:
                                res = _a.sent();
                                console.log(res, urlAjaxEmbed_1 + "mov" + eId, '----------------- SOLAR EMBED -----------');
                                if (!(res.status == 1)) return [3, 5];
                                embed = res.embed_url;
                                if (!embed) return [3, 5];
                                if (!(embed.indexOf("solarmovie") != -1)) return [3, 3];
                                return [4, libs.request_get(embed, {}, 'json')];
                            case 2:
                                getEmbedSolar = _a.sent();
                                if (getEmbedSolar.embed_url) {
                                    embed = getEmbedSolar.embed_url;
                                }
                                _a.label = 3;
                            case 3: return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "SolarMovies" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "SolarMovies"
                                    });
                                }
                                _a.label = 5;
                            case 5: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2];
        }
    });
}); };
