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
    var _0x904e, _0x5196xa, _0x5196xb, _0x5196xc, _0x5196xd, playId, urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, sources_1, arrMap;
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
                console.log(playId, "--------------- EZWATCHFREE playID ------------");
                if (movieInfo.type == "tv") {
                    return [2];
                }
                urlSearch = "https://ezwatchfree.com/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch('.result-item').length, "--------------- EZWATCHFREE SEARCH ------------");
                parseSearch('.result-item').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".title a").text();
                    var href = parseSearch(itemSearch).find(".title a").attr("href");
                    var year = parseSearch(itemSearch).find('.year').text();
                    console.log(title, href, year, "--------------- EZWATCHFREE INFO ------------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (year == movieInfo.year) {
                            link = href;
                        }
                    }
                });
                console.log(link, "--------------- EZWATCHFREE LINK ------------");
                if (!(link != "")) return [3, 4];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                sources_1 = [];
                console.log(parseDetail_1('#playeroptionsul li').length, "--------------- EZWATCHFREE SEARCH EMBED ------------");
                parseDetail_1('#playeroptionsul li').each(function (keyDetail, itemDetail) {
                    var embed = parseDetail_1(itemDetail).attr("data-vs");
                    if (embed) {
                        sources_1.push(embed);
                    }
                });
                console.log(sources_1, "--------------- EZWATCHFREE LIST EMBED ------------");
                arrMap = sources_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var loadSource_1, parseCinemaEmbed, urlCinema, bodyCinema, htmlCinema, token_1, parseCinema_1, sourceCinema_1, arrCinema, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(embed.toLowerCase().trim().indexOf("ezwatchfree") != -1)) return [3, 4];
                                loadSource_1 = "https://oload.party/loadsource.php";
                                return [4, libs.request_get(embed, {
                                        "user-agent": libs.request_getRandomUserAgent()
                                    })];
                            case 1:
                                parseCinemaEmbed = _a.sent();
                                parseCinemaEmbed = cheerio.load(parseCinemaEmbed);
                                urlCinema = parseCinemaEmbed("#playForm").attr("action");
                                bodyCinema = "playID=" + playId;
                                console.log("------- EZWATCHFREE DETECT -----------", embed, urlCinema);
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
                                    var serverId = parseCinema_1(itemCinema).attr("data-server-id");
                                    if (server && serverId) {
                                        sourceCinema_1.push(loadSource_1 + "?server=" + server + "&id=" + serverId + "&token=" + token_1);
                                    }
                                });
                                console.log(sourceCinema_1, "------------- EZWATCHFREE SOURCE CINEMA EMBED ---------");
                                arrCinema = sourceCinema_1.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(itemCinema, {})];
                                            case 1:
                                                htmlLoadSource = _a.sent();
                                                parseLoadSource = cheerio.load(htmlLoadSource);
                                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                                console.log(iframeLoadSource, "------------- EZWATCHFREE EMBED LOAD SOURCE ---------");
                                                if (iframeLoadSource) {
                                                    host = libs.string_getHost(iframeLoadSource);
                                                    if (hosts[host]) {
                                                        hosts[host](iframeLoadSource, movieInfo, _.merge(config, { provider: "EzWatchFree" }), callback);
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
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "EzWatchFree" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "EzWatchFree"
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
            case 4: return [2];
        }
    });
}); };
