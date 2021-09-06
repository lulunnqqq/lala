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
    var DOMAIN, PROVIDER, URL_SEARCH, cheerioSearch, LINK_DETAIL, token, urlDetail, responseDetail, parseDetail, tokenIds, embeds, embedsMap, arrHost;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = "https://5movies.cloud";
                PROVIDER = '5MOVIES';
                URL_SEARCH = DOMAIN + "/movie/search/" + libs.url_slug_search(movieInfo, '+');
                return [4, libs.request_get(URL_SEARCH, {}, true)];
            case 1:
                cheerioSearch = _a.sent();
                LINK_DETAIL = '';
                libs.log(cheerioSearch('.ml-item').length, PROVIDER, 'SEARCH DETAIL');
                cheerioSearch('.ml-item').each(function (key, item) {
                    var title = cheerioSearch(item).find('.mli-info h2').text();
                    var href = cheerioSearch(item).find('.ml-mask').attr('href');
                    if (href && title) {
                        var titleSeason = libs.string_get_season_tvshow(title);
                        libs.log(titleSeason, PROVIDER, 'TITLE SEASON');
                        if (libs.string_matching_title(movieInfo, titleSeason.new_title)) {
                            if (movieInfo.type == 'movie') {
                                LINK_DETAIL = "" + DOMAIN + href;
                            }
                            else if (movieInfo.type == 'tv' && movieInfo.season == titleSeason.season) {
                                LINK_DETAIL = "" + DOMAIN + href;
                            }
                        }
                    }
                });
                libs.log(LINK_DETAIL, PROVIDER, 'LINK DETAIL');
                if (!LINK_DETAIL) {
                    return [2];
                }
                token = LINK_DETAIL.match(/\-([0-9]+)\/$/i);
                token = token ? token[1] : 0;
                libs.log(token, PROVIDER, 'TOKEN');
                if (!token) {
                    return [2];
                }
                urlDetail = DOMAIN + "/ajax/movie_episodes/" + token;
                return [4, libs.request_get(urlDetail, {})];
            case 2:
                responseDetail = _a.sent();
                libs.log({ urlDetail: urlDetail, responseDetail: responseDetail }, PROVIDER, 'MOVIE DETAIL');
                if (responseDetail.status != 1 || !responseDetail.html) {
                    return [2];
                }
                parseDetail = cheerio.load(responseDetail.html);
                tokenIds = [];
                libs.log(parseDetail('a.btn-eps').length, PROVIDER, 'LENGTH DETAIL');
                parseDetail('a.btn-eps').each(function (key, item) {
                    var episode = parseDetail(item).text();
                    episode = episode.match(/episode *([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    var id = parseDetail(item).attr('data-id');
                    if (id) {
                        if (movieInfo.type == 'tv') {
                            libs.log({ episode: episode, id: id }, PROVIDER, 'TOKEN EPISODE ID');
                            if (episode == movieInfo.episode) {
                                tokenIds.push(id);
                            }
                        }
                        else {
                            tokenIds.push(id);
                        }
                    }
                });
                libs.log(tokenIds, PROVIDER, 'TOKEN IDS');
                if (tokenIds.length == 0) {
                    return [2];
                }
                embeds = [];
                embedsMap = tokenIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var urlEmbed, resultEmbed;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlEmbed = DOMAIN + "/ajax/movie_embed/" + id;
                                return [4, libs.request_get(urlEmbed, {})];
                            case 1:
                                resultEmbed = _a.sent();
                                libs.log({ urlEmbed: urlEmbed, resultEmbed: resultEmbed }, PROVIDER, 'REQUEST EMBED');
                                if (resultEmbed && resultEmbed.status && resultEmbed.src) {
                                    embeds.push(resultEmbed.src);
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(embedsMap)];
            case 3:
                _a.sent();
                libs.log(embeds, PROVIDER, 'EMBEDS');
                if (embeds.length == 0) {
                    return [2];
                }
                arrHost = embeds.map(function (urlHost) { return __awaiter(_this, void 0, void 0, function () {
                    var host, html, parseSource, length_1, i, file, quality;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                host = libs.url_get_host(urlHost);
                                libs.log({ host: host, urlHost: urlHost }, PROVIDER, 'HOST');
                                if (!(host && host.indexOf('stream365') != -1)) return [3, 2];
                                return [4, libs.request_get(urlHost, {
                                        Referer: DOMAIN
                                    })];
                            case 1:
                                html = _a.sent();
                                parseSource = libs.embed_parse_source(html);
                                libs.log({ parseSource: parseSource, urlHost: urlHost }, PROVIDER, 'SOURCE STREAM');
                                length_1 = parseSource.length;
                                for (i = 0; i < length_1; i++) {
                                    if (!parseSource[i]) {
                                        continue;
                                    }
                                    file = parseSource[i].file;
                                    quality = parseSource[i].label;
                                    if (!file) {
                                        continue;
                                    }
                                    libs.log(parseSource[i], PROVIDER, 'SOURCE DETAIL PARSE');
                                    console.log(parseSource[i], "------------ SOURCE DETAIL STREAM 5MOVIES -------------");
                                    callback({
                                        file: file,
                                        host: 'Stream365',
                                        provider: PROVIDER,
                                        quality: quality,
                                        headers: {
                                            Referer: urlHost,
                                        }
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrHost)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); };
