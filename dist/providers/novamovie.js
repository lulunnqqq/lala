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
    var url, parse, link, parseDetail_1, linksEmbed_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://www.novamovie.net/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_getcaptcha(url, {}, "cheerio")];
            case 1:
                parse = _a.sent();
                link = "";
                console.log(parse(".movies-list.movies-list-full .ml-item").length, "------------ NOVAMOVIE SEARCH ----------------");
                parse(".movies-list.movies-list-full .ml-item").each(function (key, item) {
                    var href = parse(item).find(".ml-mask").attr("href");
                    var title = parse(item).find(".mli-info h2").text();
                    var year = title.match(/\( *([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    var episode = parse(item).find(".lt-eps i").text();
                    var season = 0;
                    if (episode) {
                        season = title.toLowerCase().match(/season *([0-9]+)/i);
                        season = season ? season[1] : 0;
                    }
                    title = title.toLowerCase().replace(/season *[0-9]+/i, "").trim();
                    console.log(href, title, year, season, episode, slugify(movieInfo.title, { lower: true }), slugify(title.trim(), { lower: true }), "---------- NOVAMOVIE SEARCH INFO ---------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && year == movieInfo.year) {
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
                            link = href + ("-episode-" + movieInfo.episode);
                        }
                    }
                });
                console.log(link, "------------ NOVAMOVIE LINK -----------");
                if (!(link != "")) return [3, 4];
                return [4, libs.request_getcaptcha(link, {}, "cheerio")];
            case 2:
                parseDetail_1 = _a.sent();
                linksEmbed_1 = [];
                console.log(parseDetail_1(".movieplay").length, "------------ NOVAMOVIE EMBED SEARCH -----------");
                parseDetail_1(".movieplay").each(function (key, item) {
                    var embed1 = parseDetail_1(item).find("iframe").attr("data-lazy-src");
                    linksEmbed_1.push(embed1);
                });
                console.log(linksEmbed_1, "------------ NOVAMOVIE EMBED -----------");
                arrMap = linksEmbed_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var embed, parseEmbed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                embed = "";
                                if (!(item.indexOf("novamovie") != -1)) return [3, 2];
                                return [4, libs.request_getcaptcha("https:" + item, {}, "cheerio")];
                            case 1:
                                parseEmbed = _a.sent();
                                embed = parseEmbed('iframe').attr("src");
                                console.log(embed, "embed novamovies--------------------");
                                return [3, 3];
                            case 2:
                                embed = item;
                                _a.label = 3;
                            case 3: return [4, libs.request_getFileSize(embed)];
                            case 4:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "NOVAMOVIE" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "NOVAMOVIE"
                                    });
                                }
                                return [2];
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
