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
    var secretKey, CryptoJSAesJson, headers, urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, linkEpisode_1, htmlEpisode, parseEpisode_1, sources_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (movieInfo.type == "movie") {
                    return [2];
                }
                secretKey = "HhajkHHGbxbhjHGkjal866aOo16Abxp";
                CryptoJSAesJson = {
                    stringify: function (_0x323ex23) {
                        var _0x323ex11 = {
                            ct: _0x323ex23.ciphertext.toString(crypto.enc.Base64)
                        };
                        if (_0x323ex23.iv) {
                            _0x323ex11.iv = _0x323ex23.iv.toString();
                        }
                        ;
                        if (_0x323ex23.salt) {
                            _0x323ex11.s = _0x323ex23.salt.toString();
                        }
                        ;
                        return JSON.stringify(_0x323ex11).replace(/\s/g, "");
                    },
                    parse: function (_0x323ex24) {
                        var _0x323ex10 = [40, 30, 20, 5, 2, 0];
                        for (var _0x323ex25 = 0; _0x323ex25 < _0x323ex10.length; _0x323ex25++) {
                            _0x323ex24 = _0x323ex24.slice(0, _0x323ex10[_0x323ex25]) + _0x323ex24.slice(_0x323ex10[_0x323ex25] + 1);
                        }
                        ;
                        _0x323ex24 = libs.string_atob(_0x323ex24);
                        var _0x323ex11 = JSON.parse(_0x323ex24);
                        var _0x323ex23 = crypto.lib.CipherParams.create({
                            ciphertext: crypto.enc.Base64.parse(_0x323ex11.ct)
                        });
                        if (_0x323ex11.iv) {
                            _0x323ex23.iv = crypto.enc.Hex.parse(_0x323ex11.iv);
                        }
                        ;
                        if (_0x323ex11.s) {
                            _0x323ex23.salt = crypto.enc.Hex.parse(_0x323ex11.s);
                        }
                        ;
                        return _0x323ex23;
                    }
                };
                headers = {
                    referer: "https://www1.watch-series.la/"
                };
                urlSearch = "https://www1.watch-series.la/search/" + slugify(movieInfo.title, { lower: true, replacement: "-", remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(urlSearch, headers)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".search-item").length, urlSearch, "--------- WATCHSERIES SEARCH LENGTH");
                parseSearch(".search-item").each(function (keySearch, itemSearch) {
                    var href = parseSearch(itemSearch).find("div[valign=top] a").first().attr("href");
                    var title = parseSearch(itemSearch).find("div[valign=top] a").first().find("strong").text();
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    console.log(href, title, "--------- WATCHSERIES SEARCH INFO");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        link = href;
                    }
                });
                console.log(link, "--------- WATCHSERIES LINK");
                if (!(link != "")) return [3, 5];
                return [4, libs.request_get(link, headers)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                linkEpisode_1 = "";
                console.log(parseDetail_1("div[itemprop=season]").length, "--------- WATCHSERIES LENGTH DETAIL");
                parseDetail_1("div[itemprop=season]").each(function (keySeason, itemSeason) {
                    var season = parseDetail_1(itemSeason).find("span[itemprop=name]").text();
                    console.log(season, movieInfo.season, "--------- WATCHSERIES SEARCH SEASON");
                    season = season.toLowerCase().match(/season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    if (season == movieInfo.season) {
                        console.log(parseDetail_1(itemSeason).find("li[itemprop=episode]").length, "--------- WATCHSERIES EPISODE LENGTH");
                        parseDetail_1(itemSeason).find("li[itemprop=episode]").each(function (keyEpisode, itemEpisode) {
                            var episode = parseDetail_1(itemEpisode).find("meta[itemprop=episodenumber]").attr("content");
                            var hrefEpisode = parseDetail_1(itemEpisode).find("meta[itemprop=url]").attr('content');
                            if (episode == movieInfo.episode) {
                                linkEpisode_1 = hrefEpisode;
                            }
                        });
                    }
                });
                console.log(linkEpisode_1, "--------- WATCHSERIES LINK EPISODE");
                if (!(linkEpisode_1 != "")) return [3, 5];
                return [4, libs.request_get(linkEpisode_1, headers)];
            case 3:
                htmlEpisode = _a.sent();
                parseEpisode_1 = cheerio.load(htmlEpisode);
                console.log(parseEpisode_1(".watchlink").length, "--------- WATCHSERIES WATCH LINK");
                sources_1 = [];
                parseEpisode_1(".watchlink").each(function (keyEpisode, itemEpisode) {
                    if (sources_1.length <= 150) {
                        var href = parseEpisode_1(itemEpisode).attr("href");
                        if (href) {
                            sources_1.push(href);
                        }
                    }
                });
                console.log(sources_1, "--------- WATCHSERIES SOURCES");
                arrMap = sources_1.map(function (href) { return __awaiter(_this, void 0, void 0, function () {
                    var token, embed, host;
                    return __generator(this, function (_a) {
                        token = href.match(/r\=(.*)/i);
                        token = token ? token[1] : "";
                        if (token) {
                            embed = JSON.parse(crypto.AES.decrypt(token, secretKey, { format: CryptoJSAesJson }).toString(crypto.enc.Utf8));
                            console.log(token, embed, "--------- WATCHSERIES TOKEN");
                            host = libs.string_getHost(embed);
                            console.log(embed, host, "embed--------------------");
                            if (hosts[host]) {
                                hosts[host](embed, movieInfo, _.merge(config, { provider: "WatchSeries" }), callback);
                            }
                        }
                        return [2];
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
