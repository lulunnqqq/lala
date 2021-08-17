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
    var urlSearch, urlAjax, endpoint, endpoint, headers, htmlDetail, parseDetail, link, htmlTv, parseTv_1, idsEpisode_1, arrMap, idsEpisode_2, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "";
                urlAjax = "https://123moviesfull.name/wp-admin/motherfucker.php";
                if (movieInfo.type == "movie") {
                    endpoint = movieInfo.title.trim() + (" " + movieInfo.year);
                    urlSearch = "https://123moviesfull.name/film/" + slugify(endpoint, { lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g }) + "/";
                }
                else {
                    endpoint = movieInfo.title.trim() + (" season " + movieInfo.season);
                    urlSearch = "https://123moviesfull.name/tvshow/" + slugify(endpoint, { lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g }) + "/";
                }
                console.log(urlSearch, "----------- 123MOVIESFULL URLSEARCH -----------");
                headers = {};
                return [4, libs.request_get(urlSearch, headers)];
            case 1:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                link = parseDetail(".thumb.mvi-cover").attr("href");
                console.log(link, "----------- 123MOVIESFULL Link -----------");
                if (!link) return [3, 6];
                return [4, libs.request_get(link)];
            case 2:
                htmlTv = _a.sent();
                parseTv_1 = cheerio.load(htmlTv);
                if (!(movieInfo.type == "movie")) return [3, 4];
                idsEpisode_1 = [];
                console.log(parseTv_1(".btn-eps.first-ep.last-ep").length, "----------- 123MOVIESFULL SEARCH ITEM -----------");
                parseTv_1(".btn-eps.first-ep.last-ep").each(function (keyTv, itemTv) {
                    var onClickData = parseTv_1(itemTv).attr("onclick");
                    var matchEpisode = onClickData.match(/load_movie_iframe2\( *([0-9]+)/i);
                    var e = matchEpisode ? matchEpisode[1] : 0;
                    var id = parseTv_1(itemTv).attr("episode-id");
                    idsEpisode_1.push({
                        id: id,
                        e: e
                    });
                });
                console.log(idsEpisode_1, "----------- 123MOVIESFULL ID EPISODE -----------");
                arrMap = idsEpisode_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var headersBody, body, result, url;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(item.e == 3)) return [3, 3];
                                headersBody = {
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                };
                                body = "action=fkingyrfather&id=" + item.id + "&annoying=videospider";
                                return [4, libs.request_post(urlAjax, headersBody, body, "json")];
                            case 1:
                                result = _a.sent();
                                console.log(result, body, "----------- 123MOVIESFULL URL HTML -----------");
                                if (!(result.status == 1)) return [3, 3];
                                url = result.url;
                                console.log(result, body, "----------- 123MOVIESFULL URL OLOAD -----------");
                                return [4, libs.request_parseOload(url, movieInfo, _.merge(config, { provider: "123MoviesFull" }), callback)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(movieInfo.type == "tv")) return [3, 6];
                idsEpisode_2 = [];
                console.log(parseTv_1(".btn-eps.first-ep.last-ep").length, "----------- 123MOVIESFULL SEARCH TV -----------");
                parseTv_1(".btn-eps.first-ep.last-ep").each(function (keyTv, itemTv) {
                    var titleEpisode = parseTv_1(itemTv).text();
                    var episode = titleEpisode.toLowerCase().match(/episode *([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    console.log(episode, movieInfo.episode, "----------- 123MOVIESFULL MAPPING EPISODE -----------");
                    if (episode == movieInfo.episode) {
                        var onClickData = parseTv_1(itemTv).attr("onclick");
                        var matchEpisode = onClickData.match(/load_episode_iframe2\( *([0-9]+) *\, *([0-9]+)/i);
                        var id = matchEpisode ? matchEpisode[1] : 0;
                        var e = matchEpisode ? matchEpisode[2] : 0;
                        var idEmbed = parseTv_1(itemTv).attr("data-very");
                        idsEpisode_2.push({
                            id: id,
                            e: e,
                            idEmbed: idEmbed
                        });
                    }
                });
                console.log(idsEpisode_2, "----------- 123MOVIESFULL ID EPISODE TV -----------");
                arrMap = idsEpisode_2.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var headersBody, body, result, url;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(item.e == 123)) return [3, 3];
                                headersBody = {
                                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                };
                                body = "action=fkingyrfatherep&id=" + item.id + "&annoying=videospider";
                                return [4, libs.request_post(urlAjax, headersBody, body, "json")];
                            case 1:
                                result = _a.sent();
                                console.log(result, body, "----------- MOVIESFULLHD TV SPIDER ---------");
                                if (!(result.status == 1)) return [3, 3];
                                url = result.url;
                                return [4, libs.request_parseOload(url, movieInfo, _.merge(config, { provider: "123MoviesFull" }), callback)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2];
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
