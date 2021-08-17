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
    var urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail, iframe, imdbid, body, headers, urlEmbed, resultEmbed, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "https://vikv.net/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                return [4, cheerio.load(htmlSearch)];
            case 2:
                parseSearch = _a.sent();
                link = "";
                console.log(parseSearch(".nag.cf .item").length, "------------ VIKV SEARCH LENGTH ---------");
                parseSearch(".nag.cf .item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".entry-title a").text();
                    var year = title.match(/\( *([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, '');
                    title = title.toLowerCase().replace(/s[0-9]+ *e[0-9]+.*/i, '');
                    var href = parseSearch(itemSearch).find(".entry-title a").attr("href");
                    var tvInfo = href.toLowerCase().match(/\-s([0-9]+)-e([0-9]+)/i);
                    var season = tvInfo && tvInfo[1];
                    var episode = tvInfo && tvInfo[2];
                    console.log(title, href, tvInfo, season, episode, "------------ VIKV SEARCH INFO ---------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && !season && !episode && (!year || year == movieInfo.year)) {
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
                            link = href;
                        }
                    }
                });
                console.log(link, "------------ VIKV link ---------");
                if (!(link != "")) return [3, 6];
                return [4, libs.request_get(link)];
            case 3:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                iframe = parseDetail("iframe[allow=autoplay]").attr("src");
                console.log(iframe, "------------ VIKV IFRAME ---------");
                if (!iframe) return [3, 6];
                imdbid = iframe.match(/embed\/([A-z0-9]+)/i);
                imdbid = imdbid ? imdbid[1] : '';
                console.log(imdbid, "------------ VIKV IMDBID ---------");
                if (!imdbid) return [3, 6];
                body = qs.stringify({
                    imdb: imdbid,
                    ip: '',
                    hd: false,
                });
                headers = {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                };
                urlEmbed = "https://eb2.srtaem.casa/l1";
                return [4, libs.request_post(urlEmbed, headers, body, 'json')];
            case 4:
                resultEmbed = _a.sent();
                console.log(body, headers, urlEmbed, resultEmbed, "------------ VIKV EMBED AJAX ---------");
                resultEmbed = resultEmbed ? resultEmbed : [];
                arrMap = resultEmbed.map(function (itemEmbed) { return __awaiter(_this, void 0, void 0, function () {
                    var embeds, arrMapEmbed;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                embeds = itemEmbed.src ? itemEmbed.src : [];
                                arrMapEmbed = embeds.map(function (embedInfo) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = embedInfo.src;
                                                if (!embed) return [3, 2];
                                                return [4, libs.request_getFileSize(embed)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(embed);
                                                console.log(embed, fileSize, host, "embed--------------------");
                                                if (fileSize == 0) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "VIKV" }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "VIKV",
                                                        quality: embedInfo.res,
                                                    });
                                                }
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapEmbed)];
                            case 1:
                                _a.sent();
                                return [2];
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
