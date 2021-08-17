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
    var url, body, headers, results, linkId, searchMovies, searchTv, _i, searchMovies_1, item, _a, searchTv_1, item, titleTv, link, embeds, arrMap;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://simplestream.in/api/search";
                body = JSON.stringify({
                    query: movieInfo.title
                });
                headers = {
                    "content-type": "application/json",
                    referer: "https://simplestream.in/search/title/" + movieInfo.title
                };
                return [4, libs.request_put(url, headers, body, 'json')];
            case 1:
                results = _b.sent();
                console.log(results, url, headers, body, "---------------- SIMPLESTREAM SEARCH INFO -------");
                linkId = "";
                searchMovies = results.Movies ? results.Movies : [];
                searchTv = results.TV ? results.TV : [];
                console.log(searchMovies.length, searchTv.length, "---------------- SIMPLESTREAM SEARCH LENGTH RESULT");
                if (movieInfo.type == "movie") {
                    for (_i = 0, searchMovies_1 = searchMovies; _i < searchMovies_1.length; _i++) {
                        item = searchMovies_1[_i];
                        console.log(item.Title, movieInfo.title, movieInfo.year, item.Year, slugify(movieInfo.title, { lower: true }), slugify(item.Title.trim(), { lower: true }), "---------------- SIMPLESTREAM MOVIE INFO");
                        if (slugify(movieInfo.title, { lower: true }) == slugify(item.Title.trim(), { lower: true })) {
                            if (movieInfo.year == item.Year) {
                                linkId = item.IMDB;
                                break;
                            }
                        }
                    }
                }
                else {
                    for (_a = 0, searchTv_1 = searchTv; _a < searchTv_1.length; _a++) {
                        item = searchTv_1[_a];
                        titleTv = item.Title.replace(/\( *[0-9]+ *\)/i, "").trim();
                        console.log(titleTv, item.Year, "---------------- SIMPLESTREAM TV INFO");
                        if (slugify(movieInfo.title, { lower: true }) == slugify(item.Title.trim(), { lower: true })) {
                            linkId = item.IMDB;
                            break;
                        }
                    }
                }
                console.log(linkId, "---------------- SIMPLESTREAM LINK ID -------");
                if (!linkId) return [3, 4];
                link = "";
                if (movieInfo.type == "tv") {
                    link = "https://simplestream.in/api/releases/tv/" + linkId + "/" + movieInfo.season + "0000" + movieInfo.episode;
                }
                else {
                    link = "https://simplestream.in/api/releases/movie/" + linkId;
                }
                return [4, libs.request_get(link, {}, 'json')];
            case 2:
                embeds = _b.sent();
                console.log(embeds, "----------------- SIMPLESTREAM EMBEDS");
                embeds = embeds ? embeds : [];
                arrMap = embeds.map(function (itemEmbed) { return __awaiter(_this, void 0, void 0, function () {
                    var embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                embed = itemEmbed.Link;
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "SimpleStream" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "SimpleStream"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4: return [2];
        }
    });
}); };
