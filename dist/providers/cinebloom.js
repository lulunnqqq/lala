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
    function x_dfjsd45(_0x5196x2) {
        var _0x5196x3 = _0x904e[0];
        var _0x5196x4 = _0x904e[1];
        for (var _0x5196x5 = 0; _0x5196x5 < _0x5196x2; _0x5196x5++) {
            _0x5196x3 += _0x5196x4[_0x904e[5]](Math[_0x904e[4]](Math[_0x904e[2]]() * _0x5196x4[_0x904e[3]]));
        }
        ;
        return _0x5196x3;
    }
    function x7_pw481e(_0x5196x3) {
        return libs.string_btoa(_0x5196x3);
    }
    var _0x904e, _0x5196xa, _0x5196xb, _0x5196xc, _0x5196xd, playId, url, link, parse, parseDetail_1, sources_1, arrMap, linkTv_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _0x904e = ["", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\x72\x61\x6E\x64\x6F\x6D", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x63\x6C\x69\x63\x6B", "\x23\x70\x6C\x61\x79", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x75\x73\x65\x72\x41\x67\x65\x6E\x74", "\x4C\x6F\x61\x64\x69\x6E\x67\x20\x76\x69\x64\x65\x6F\x2E\x2E\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x2E", "\x74\x65\x78\x74", "\x2E\x6C\x6F\x61\x64\x69\x6E\x67", "\x6F\x72\x69\x67\x69\x6E\x61\x6C\x45\x76\x65\x6E\x74", "\x2A", "\x70\x61\x67\x65\x58", "\x70\x61\x67\x65\x59", "\x76\x61\x6C", "\x23\x70\x6C\x61\x79\x49\x44", "\x73\x75\x62\x6D\x69\x74", "\x23\x70\x6C\x61\x79\x46\x6F\x72\x6D", "\x6F\x6E"];
                _0x5196xa = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
                _0x5196xb = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
                _0x5196xc = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
                _0x5196xd = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
                playId = _0x5196xc + _0x904e[0] + _0x5196xa + _0x904e[0] + x_dfjsd45(_0x5196xa) + _0x904e[0] + x7_pw481e("[object MouseEvent]" + _0x904e[14] + 642 + _0x904e[14] + 150) + _0x904e[0] + x_dfjsd45(_0x5196xb) + _0x904e[0] + _0x5196xb + _0x904e[0] + _0x5196xd;
                console.log(playId, "--------------- CINEBLOOM playID ------------");
                url = "";
                if (movieInfo.type == "movie") {
                    url = "https://www.cinebloom.org/searched/movies?q=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                else {
                    url = "https://www.cinebloom.org/searched/tvshows?q=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                }
                link = "";
                return [4, libs.request_getcaptcha(url, {}, "cheerio")];
            case 1:
                parse = _a.sent();
                console.log(parse(".grid-view.clearfix li").length, '--------- CINEBLOOM SEARCH PARSE ------');
                parse(".grid-view.clearfix li").each(function (key, item) {
                    var href = parse(item).find("a").first().attr("href");
                    var title = parse(item).find(".information .title strong").text();
                    var year = title.match(/\(([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    console.log(href, title, year, slugify(movieInfo.title, { lower: true }), slugify(title.trim(), { lower: true }), "---------- CINEBLOOM INFO MOVIE -----------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && year == movieInfo.year) {
                            link = href;
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, "--------------- CINEBLOOM LINK -----------");
                if (!(link != "")) return [3, 6];
                return [4, libs.request_getcaptcha(link, {}, "cheerio")];
            case 2:
                parseDetail_1 = _a.sent();
                if (!(movieInfo.type == "movie")) return [3, 4];
                sources_1 = [];
                console.log(parseDetail_1(".embed-details").length, "--------------- CINEBLOOM EMBED -----------");
                parseDetail_1(".embed-details").each(function (key, item) {
                    var href = parseDetail_1(item).find("a").attr("href");
                    sources_1.push(href);
                });
                console.log(sources_1, "--------------- CINEBLOOM EMBED -----------");
                arrMap = sources_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var loadSource_1, parseCinemaEmbed, urlCinema, bodyCinema, htmlCinema, token_1, parseCinema_1, sourceCinema_1, arrCinema, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 6];
                                if (!(embed.toLowerCase().trim().indexOf("cinebloom") != -1)) return [3, 4];
                                console.log("------- CINEBLOOM DETECT -----------", embed);
                                loadSource_1 = "https://oload.party/loadsource.php";
                                return [4, libs.request_getcaptcha(embed, {}, "cheerio")];
                            case 1:
                                parseCinemaEmbed = _a.sent();
                                urlCinema = parseCinemaEmbed("#playForm").attr("action");
                                bodyCinema = "playID=" + playId;
                                return [4, libs.request_post(urlCinema, {
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "user-agent": libs.request_getRandomUserAgent()
                                    }, bodyCinema)];
                            case 2:
                                htmlCinema = _a.sent();
                                token_1 = htmlCinema.match(/token *\= *\"([^\"]+)/i);
                                token_1 = token_1 ? token_1[1] : "";
                                parseCinema_1 = cheerio.load(htmlCinema);
                                sourceCinema_1 = [];
                                parseCinema_1(".item").each(function (keyCinema, itemCinema) {
                                    var server = parseCinema_1(itemCinema).attr("data-server");
                                    sourceCinema_1.push(loadSource_1 + "?server=" + server + "&token=" + token_1);
                                });
                                console.log(sourceCinema_1, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------");
                                arrCinema = sourceCinema_1.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(itemCinema, {})];
                                            case 1:
                                                htmlLoadSource = _a.sent();
                                                parseLoadSource = cheerio.load(htmlLoadSource);
                                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                                if (iframeLoadSource) {
                                                    host = libs.string_getHost(iframeLoadSource);
                                                    if (hosts[host]) {
                                                        hosts[host](iframeLoadSource, movieInfo, _.merge(config, { provider: "CINEBLOOM" }), callback);
                                                    }
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrCinema)];
                            case 3:
                                _a.sent();
                                return [3, 6];
                            case 4: return [4, libs.request_getFileSize(embed)];
                            case 5:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "CineBloom" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "CineBloom"
                                    });
                                }
                                _a.label = 6;
                            case 6: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(movieInfo.type == "tv")) return [3, 6];
                linkTv_1 = [];
                console.log(parseDetail_1(".season").length, "--------------- CINEBLOOM SEASON -----------");
                parseDetail_1(".season").each(function (keySeason, itemSeason) {
                    var season = parseDetail_1(itemSeason).find(".title").text();
                    season = season.toLowerCase().match(/season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    console.log(season, movieInfo.season, "--------------- CINEBLOOM SEASON INFO -----------");
                    if (season == movieInfo.season) {
                        console.log(parseDetail_1(itemSeason).length, "--------------- CINEBLOOM episode -----------");
                        parseDetail_1(itemSeason).find(".episodes li").each(function (keyEpisode, itemEpisode) {
                            var episode = parseDetail_1(itemEpisode).find("h5").text();
                            episode = episode.toLowerCase().match(/ep *([0-9]+)/i);
                            episode = episode ? episode[1] : 0;
                            console.log(episode, movieInfo.episode, "--------------- CINEBLOOM episode info -----------");
                            if (episode == movieInfo.episode) {
                                parseDetail_1(itemEpisode).find(".streams-list li").each(function (keyS, itemS) {
                                    var hrefTv = parseDetail_1(itemS).find("a").attr("href");
                                    linkTv_1.push(hrefTv);
                                });
                            }
                        });
                    }
                });
                console.log(linkTv_1, "--------------- CINEBLOOM episode embed link -----------");
                arrMap = linkTv_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var loadSource_2, parseCinemaEmbed, urlCinema, bodyCinema, htmlCinema, token_2, parseCinema_2, sourceCinema_2, arrCinema, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 6];
                                console.log(embed, embed.toLowerCase().trim().indexOf("cinebloom") != -1, "--------- CINEBLOOM ITEM OLOAD ---------");
                                if (!(embed.toLowerCase().trim().indexOf("cinebloom") != -1)) return [3, 4];
                                loadSource_2 = "https://oload.party/loadsource.php";
                                return [4, libs.request_getcaptcha(embed, {}, "cheerio")];
                            case 1:
                                parseCinemaEmbed = _a.sent();
                                urlCinema = parseCinemaEmbed("#playForm").attr("action");
                                bodyCinema = "playID=" + playId;
                                return [4, libs.request_post(urlCinema, {
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                        "user-agent": libs.request_getRandomUserAgent()
                                    }, bodyCinema)];
                            case 2:
                                htmlCinema = _a.sent();
                                token_2 = htmlCinema.match(/token *\= *\"([^\"]+)/i);
                                token_2 = token_2 ? token_2[1] : "";
                                parseCinema_2 = cheerio.load(htmlCinema);
                                sourceCinema_2 = [];
                                parseCinema_2(".item").each(function (keyCinema, itemCinema) {
                                    var server = parseCinema_2(itemCinema).attr("data-server");
                                    var serverId = parseCinema_2(itemCinema).attr("data-server-id");
                                    if (server && serverId) {
                                        sourceCinema_2.push(loadSource_2 + "?server=" + server + "&id=" + serverId + "&token=" + token_2);
                                    }
                                });
                                console.log(sourceCinema_2, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------");
                                arrCinema = sourceCinema_2.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(itemCinema, {})];
                                            case 1:
                                                htmlLoadSource = _a.sent();
                                                parseLoadSource = cheerio.load(htmlLoadSource);
                                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                                if (iframeLoadSource) {
                                                    host = libs.string_getHost(iframeLoadSource);
                                                    if (hosts[host]) {
                                                        hosts[host](iframeLoadSource, movieInfo, _.merge(config, { provider: "CINEBLOOM" }), callback);
                                                    }
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrCinema)];
                            case 3:
                                _a.sent();
                                return [3, 6];
                            case 4: return [4, libs.request_getFileSize(embed)];
                            case 5:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](url, movieInfo, _.merge(config, { provider: "CineBloom" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "CineBloom"
                                    });
                                }
                                _a.label = 6;
                            case 6: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2];
        }
    });
}); };
