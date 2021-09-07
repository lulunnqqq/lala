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
    var DOMAIN, PROVIDER, urlSearch, parseSearch, LINK_DETAIL, sourceId, ajaxMovieEpisode, responseAjaxMovie, parseAjaxMovie, ids, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = "https://ww4.putlocker.vip";
                PROVIDER = 'PUTLOCKER';
                urlSearch = DOMAIN + "/movie/search/" + libs.url_slug_search(movieInfo, '+');
                libs.log(urlSearch, PROVIDER, 'URL SEARCH');
                return [4, libs.request_get(urlSearch, {}, true)];
            case 1:
                parseSearch = _a.sent();
                LINK_DETAIL = "";
                libs.log({ length: parseSearch(".ml-item").length }, PROVIDER, 'LENGTH SEARCH');
                parseSearch(".ml-item").each(function (keyItem, valueItem) {
                    var title = parseSearch(valueItem).find(".mli-info h2").text();
                    var href = parseSearch(valueItem).find(".ml-mask").attr("href");
                    var season = title.match(/ *\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/ *\- *season *[0-9]+/i, '');
                    title = title.trim();
                    libs.log({ title: title, href: href, season: season }, PROVIDER, 'ITEM INFO');
                    if (libs.string_matching_title(movieInfo, title)) {
                        if (movieInfo.type == "movie" && season == 0) {
                            LINK_DETAIL = href;
                        }
                        else if (movieInfo.type == "tv" && season == movieInfo.season) {
                            LINK_DETAIL = href;
                        }
                    }
                });
                libs.log(LINK_DETAIL, PROVIDER, 'LINK');
                if (!LINK_DETAIL) {
                    return [2];
                }
                sourceId = LINK_DETAIL.match(/\-([0-9]+)\//i);
                sourceId = sourceId ? sourceId[1] : 0;
                libs.log(sourceId, PROVIDER, 'SOURCE ID');
                if (sourceId == 0) {
                    return [2];
                }
                ajaxMovieEpisode = DOMAIN + "/ajax/movie_episodes/" + sourceId;
                return [4, libs.request_get(ajaxMovieEpisode, {})];
            case 2:
                responseAjaxMovie = _a.sent();
                libs.log(responseAjaxMovie, PROVIDER, 'RESPONSE AJAX MOVIE');
                if (responseAjaxMovie.status == 0) {
                    return [2];
                }
                parseAjaxMovie = cheerio.load(responseAjaxMovie.html);
                ids = [];
                libs.log({ length: parseAjaxMovie(".ep-item").length }, PROVIDER, 'PARSE AJAXJ');
                parseAjaxMovie(".ep-item").each(function (keyItem, valueItem) {
                    var episodeId = parseAjaxMovie(valueItem).attr("data-id");
                    libs.log(episodeId, PROVIDER, 'EPISODE ID');
                    if (movieInfo.type == "movie") {
                        if (episodeId) {
                            ids.push(episodeId);
                        }
                    }
                    else {
                        var titleEpisode = parseAjaxMovie(valueItem).text();
                        titleEpisode = titleEpisode.toLowerCase().match(/episode *([0-9]+)/i);
                        var episode = titleEpisode ? titleEpisode[1] : 0;
                        libs.log({ titleEpisode: titleEpisode, episode: episode }, PROVIDER, 'EPISODE ID');
                        if (movieInfo.episode == episode) {
                            ids.push(episodeId);
                        }
                    }
                });
                libs.log(ids, PROVIDER, "IDS");
                return [4, ids.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        var urlEmbed, responseEmbed, htmlEmbed, parse, i, embed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    urlEmbed = DOMAIN + "/ajax/movie_embed/" + id;
                                    return [4, libs.request_get(urlEmbed, {})];
                                case 1:
                                    responseEmbed = _a.sent();
                                    libs.log({ urlEmbed: urlEmbed, responseEmbed: responseEmbed }, PROVIDER, 'URL EMBED');
                                    if (!responseEmbed.status) return [3, 8];
                                    if (!responseEmbed.src) return [3, 3];
                                    return [4, libs.embed_redirect(responseEmbed.src, '', movieInfo, PROVIDER, callback)];
                                case 2:
                                    _a.sent();
                                    _a.label = 3;
                                case 3: return [4, libs.request_get(responseEmbed.src, {
                                        "Referer": DOMAIN
                                    })];
                                case 4:
                                    htmlEmbed = _a.sent();
                                    parse = libs.embed_parse_source(htmlEmbed);
                                    i = 0;
                                    _a.label = 5;
                                case 5:
                                    if (!(i < parse.length)) return [3, 8];
                                    embed = parse[i].file;
                                    libs.log(parse[i], PROVIDER, 'SOURCE DETAIL');
                                    if (!embed) return [3, 7];
                                    return [4, libs.embed_redirect(embed, '', movieInfo, PROVIDER, callback)];
                                case 6:
                                    _a.sent();
                                    _a.label = 7;
                                case 7:
                                    i++;
                                    return [3, 5];
                                case 8: return [2];
                            }
                        });
                    }); })];
            case 3:
                arrMap = _a.sent();
                return [4, Promise.all(arrMap)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); };
