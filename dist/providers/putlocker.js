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
    var domain, urlSearch, htmlSearch, parseSearch, link, sourceId, ajaxMovieEpisode, responseAjaxMovie, parseAjaxMovie_1, ids_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://ww4.putlocker.vip";
                urlSearch = domain + "/movie/search/" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                console.log(urlSearch, "-------- PUTLOCKER URLSEARCH ---------");
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".ml-item").length, "-------------- PUTLOCKER LENGTH SEARCH -----------");
                parseSearch(".ml-item").each(function (keyItem, valueItem) {
                    var title = parseSearch(valueItem).find(".mli-info h2").text();
                    var href = parseSearch(valueItem).find(".ml-mask").attr("href");
                    var season = title.match(/ *\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/ *\- *season *[0-9]+/i, '');
                    title = title.trim();
                    console.log(title, href, season, "-------------- PUTLOCKER INFO -----------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && season == 0) {
                            link = href;
                        }
                        else if (movieInfo.type == "tv" && season == movieInfo.season) {
                            link = href;
                        }
                    }
                });
                console.log(link, "-------------- PUTLOCKER LINK -----------");
                if (!link) return [3, 5];
                sourceId = link.match(/\-([0-9]+)\//i);
                sourceId = sourceId ? sourceId[1] : 0;
                console.log(sourceId, "-------------- PUTLOCKER SOURCE ID -----------");
                if (sourceId == 0) {
                    return [2];
                }
                ajaxMovieEpisode = domain + "/ajax/movie_episodes/" + sourceId;
                return [4, libs.request_get(ajaxMovieEpisode, {}, 'json')];
            case 2:
                responseAjaxMovie = _a.sent();
                console.log(responseAjaxMovie, "-------------- PUTLOCKER responseAjaxMovie -----------");
                if (responseAjaxMovie.status == 0) {
                    return [2];
                }
                parseAjaxMovie_1 = cheerio.load(responseAjaxMovie.html);
                ids_1 = [];
                console.log(parseAjaxMovie_1(".ep-item").length, "-------------- PUTLOCKER Parse Ajax -----------");
                parseAjaxMovie_1(".ep-item").each(function (keyItem, valueItem) {
                    var episodeId = parseAjaxMovie_1(valueItem).attr("data-id");
                    console.log(episodeId, "-------------- PUTLOCKER Episode Id -----------");
                    if (movieInfo.type == "movie") {
                        if (episodeId) {
                            ids_1.push(episodeId);
                        }
                    }
                    else {
                        var titleEpisode = parseAjaxMovie_1(valueItem).text();
                        titleEpisode = titleEpisode.toLowerCase().match(/episode *([0-9]+)/i);
                        var episode = titleEpisode ? titleEpisode[1] : 0;
                        console.log(titleEpisode, episode, "-------------- PUTLOCKER episode -----------");
                        if (movieInfo.episode == episode) {
                            ids_1.push(episodeId);
                        }
                    }
                });
                console.log(ids_1, "-------------- PUTLOCKER ids -----------");
                return [4, ids_1.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        var urlEmbed, responseEmbed, hostEmbed, htmlEmbed, source, parse, i, embed, fileSize, host;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    urlEmbed = domain + "/ajax/movie_embed/" + id;
                                    console.log(urlEmbed, '------- PUTLOCKER URL EMBED -------');
                                    return [4, libs.request_get(urlEmbed, {}, 'json')];
                                case 1:
                                    responseEmbed = _a.sent();
                                    console.log(responseEmbed, "------------ PUTLOCKER responseEmbed -------");
                                    if (!responseEmbed.status) return [3, 6];
                                    hostEmbed = libs.string_getHost(responseEmbed.src);
                                    if (hosts[hostEmbed]) {
                                        hosts[hostEmbed](embed, movieInfo, _.merge(config, { provider: "PUTLOCKER" }), callback);
                                    }
                                    return [4, libs.request_get(responseEmbed.src, {
                                            "Referer": domain
                                        })];
                                case 2:
                                    htmlEmbed = _a.sent();
                                    source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
                                    source = source ? source[1] + "]" : "[]";
                                    parse = [];
                                    source = "parse = " + source;
                                    eval(source);
                                    console.log(parse, 'parse');
                                    i = 0;
                                    _a.label = 3;
                                case 3:
                                    if (!(i < parse.length)) return [3, 6];
                                    embed = parse[i].file;
                                    console.log(parse[i], "------------ SOURCE DETAIL PUTLOCKER -------------");
                                    return [4, libs.request_getFileSize(embed)];
                                case 4:
                                    fileSize = _a.sent();
                                    host = libs.string_getHost(embed);
                                    if (fileSize > 0) {
                                        callback({
                                            file: embed,
                                            size: fileSize,
                                            host: host,
                                            provider: 'Putlocker',
                                            quality: parse[i].label,
                                        });
                                    }
                                    else {
                                        if (hosts[host]) {
                                            hosts[host](embed, movieInfo, _.merge(config, { provider: "Putlocker" }), callback);
                                        }
                                    }
                                    _a.label = 5;
                                case 5:
                                    i++;
                                    return [3, 3];
                                case 6: return [2];
                            }
                        });
                    }); })];
            case 3:
                arrMap = _a.sent();
                return [4, Promise.all(arrMap)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2];
        }
    });
}); };
