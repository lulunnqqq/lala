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
    var urlSearch, htmlSearch, parseSearch, sources, linkDetailEpisode_1, htmlEpisode, parseEpisode_1, appMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "";
                if (movieInfo.type == "movie") {
                    urlSearch = "https://database.gdriveplayer.me/movie.php?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                else {
                    urlSearch = "https://database.gdriveplayer.me/series.php?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                return [4, libs.request_get(urlSearch, {
                        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
                    })];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                sources = [];
                if (!(movieInfo.type == "movie")) return [3, 2];
                console.log(parseSearch("#t01 tr").length, urlSearch, "--------- DATABASE DRIVE SEARCH ---------");
                parseSearch("#t01 tr").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find("td").first().next().next().find("a").text();
                    var year = parseSearch(itemSearch).find("td").first().next().next().next().find("b").text();
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    console.log(title, year, "--------- DATABASE DRIVE INFO ---------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (year == movieInfo.year) {
                            parseSearch(itemSearch).find("td").first().next().next().next().next().next().next().next().next().find("b").each(function (keyEmbed, itemEmbed) {
                                var embed = parseSearch(itemEmbed).find("a").attr("href");
                                if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
                                    embed = embed.replace("//", "https://");
                                }
                                sources.push(embed);
                            });
                        }
                    }
                });
                return [3, 4];
            case 2:
                linkDetailEpisode_1 = "";
                console.log(parseSearch("#t01 tbody tr").length, "--------- DATABASE DRIVE SEARCH TV ---------");
                parseSearch("#t01 tbody tr").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find("td").first().next().next().find("a").text();
                    var href = parseSearch(itemSearch).find("td").first().next().next().next().next().next().next().next().next().find("button").attr("onclick");
                    var season = title.toLowerCase().match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.replace(/\- *season *[0-9]+/i, "").trim();
                    console.log(title, href, season, "--------- DATABASE DRIVE INFO TV ---------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (season == movieInfo.season) {
                            var idEpisode = href.match(/id\=([0-9]+)/i);
                            idEpisode = idEpisode ? idEpisode[1] : 0;
                            linkDetailEpisode_1 = "https://database.gdriveplayer.me/series.php?id=" + idEpisode;
                        }
                    }
                });
                console.log(linkDetailEpisode_1, "------------- DB DRIVE LINK EPISODE ------------");
                if (!!linkDetailEpisode_1) return [3, 4];
                return [4, libs.request_get(linkDetailEpisode_1)];
            case 3:
                htmlEpisode = _a.sent();
                parseEpisode_1 = cheerio.load(htmlEpisode);
                console.log(parseEpisode_1("#t01 tbody tr").length, "------------- DB DRIVE LENGTH EPISODE ------------");
                parseEpisode_1("#t01 tbody tr").each(function (keySearch, itemSearch) {
                    var episode = parseSearch(itemSearch).find("td").first().next().next().text();
                    console.log(episode, movieInfo.episode, "-------------- DB DRIVE MAPPING EPISODE ----------");
                    if (episode == movieInfo.episode) {
                        parseEpisode_1.find("td").first().next().next().next().next().next().find("a").each(function (keyEpisode, itemEpisode) {
                            var embed = parseSearch(itemEpisode).find("a").attr("href");
                            sources.push("https://database.gdriveplayer.me/" + embed);
                        });
                    }
                });
                _a.label = 4;
            case 4:
                console.log(sources, '----------- DB DRIVE SOURCES ------------');
                appMap = sources.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "MovieBlueray" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "MovieBlueray"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [3, 4];
                            case 3:
                                e_1 = _a.sent();
                                return [3, 4];
                            case 4: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(appMap)];
            case 5:
                _a.sent();
                return [2];
        }
    });
}); };
