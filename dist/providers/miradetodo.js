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
    var url, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, linkEmbed_1, htmlEmbed, parseEmbed_1, embeds_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://miradetodo.co/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(url)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".item_1.items .item").length, "----------- MIRADETODO SEARCH LENGTH ----------");
                parseSearch(".item_1.items .item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".boxinfo .tt").text();
                    var href = parseSearch(itemSearch).find(".boxinfo a").first().attr("href");
                    var year = title.match(/\( *([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+.*/i, "").trim();
                    console.log(title, href, year, "----------- MIRADETODO SEARCH INFO ----------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie") {
                            if (year == movieInfo.year) {
                                link = href;
                            }
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, "----------- MIRADETODO LINK ----------");
                if (!(link != "")) return [3, 5];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                linkEmbed_1 = "";
                if (movieInfo.type == "movie") {
                    linkEmbed_1 = link;
                }
                if (movieInfo.type == "tv") {
                    parseDetail_1(".episodios li").each(function (keyDetail, itemDetail) {
                        var seasonInfo = parseDetail_1(itemDetail).find(".numerando").text();
                        var season = seasonInfo.match(/([0-9]+)/i);
                        season = season ? season[1] : 0;
                        var episode = seasonInfo.match(/[0-9]+ *x *([0-9]+)/i);
                        episode = episode ? episode[1] : 0;
                        var href = parseDetail_1(itemDetail).find(".episodiotitle a").attr("href");
                        console.log(season, episode, href, "----------- MIRADETODO SEASON INFO ----------");
                        if (movieInfo.season == season && movieInfo.episode == episode) {
                            linkEmbed_1 = href;
                        }
                    });
                }
                console.log(linkEmbed_1, "----------- MIRADETODO LINK EMBED ----------");
                if (!(linkEmbed_1 != "")) return [3, 5];
                return [4, libs.request_get(linkEmbed_1)];
            case 3:
                htmlEmbed = _a.sent();
                parseEmbed_1 = cheerio.load(htmlEmbed);
                embeds_1 = [];
                console.log(parseEmbed_1("#player21 iframe").length, "----------- MIRADETODO IFRAME LENGTH ----------");
                parseEmbed_1("#player21 iframe").each(function (keyEmbed, itemEmbed) {
                    var embed = parseEmbed_1(itemEmbed).attr("data-lazy-src");
                    if (embed) {
                        embeds_1.push(embed);
                    }
                });
                console.log(embeds_1, "----------- MIRADETODO EMBEDS ----------");
                arrMap = embeds_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var htmlSource, parseSource_1, sources_1, arrMapSource, fileSize, host;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(embed.indexOf("player.miradetodo") != -1)) return [3, 3];
                                return [4, libs.request_get(embed)];
                            case 1:
                                htmlSource = _a.sent();
                                parseSource_1 = cheerio.load(htmlSource);
                                sources_1 = [];
                                console.log(parseSource_1("#menu li").length, "----------- MIRADETODO PARSE EMBED SOURCE ----------");
                                parseSource_1("#menu li").each(function (keySource, itemSource) {
                                    var source = parseSource_1(itemSource).find("a").attr("href");
                                    if (source) {
                                        sources_1.push(source);
                                    }
                                });
                                console.log(sources_1, "----------- MIRADETODO EMBED SOURCES ----------");
                                arrMapSource = sources_1.map(function (linkSource) { return __awaiter(_this, void 0, void 0, function () {
                                    var htmlLink, parseLink, embedL, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4, libs.request_get(linkSource)];
                                            case 1:
                                                htmlLink = _a.sent();
                                                parseLink = cheerio.load(htmlLink);
                                                embedL = parseLink("iframe").attr("src").replace("\r", "").trim();
                                                console.log(embedL, "----------- MIRADETODO EMBED V2 ----------");
                                                if (!embedL) return [3, 3];
                                                return [4, libs.request_getFileSize(embedL)];
                                            case 2:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embedL);
                                                console.log(embedL, fileSize, host, "embedL--------------------");
                                                if (hosts[host]) {
                                                    hosts[host](embedL, movieInfo, _.merge(config, { provider: "Miradetodo", urlDetail: link }), callback);
                                                }
                                                _a.label = 3;
                                            case 3: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 2:
                                _a.sent();
                                return [3, 5];
                            case 3: return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "Miradetodo", urlDetail: link }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "Miradetodo"
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
