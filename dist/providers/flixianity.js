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
    var url, headers, resultSearch, link, item, title, year, href, type, urlDetail, htmlDetail, id, bodyDetail, resultDetail, embeds, item, html, parseEmbed, src, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.movieshd.tv/api/v1/cautare/nuxt?q=" + slugify(movieInfo.title.toLowerCase().trim(), { lower: true, replacement: "+" }) + "&limit=100&lo=0";
                headers = {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    authorization: "Bearer false",
                    'user-agent': libs.request_getRandomUserAgent(),
                    "x-requested-with": "XMLHttpRequest"
                };
                return [4, libs.request_get(url, {}, "json")];
            case 1:
                resultSearch = _a.sent();
                link = "";
                console.log(resultSearch, headers, "------------ FLIXIANTIY SEARCH INFO ----------");
                for (item in resultSearch) {
                    title = resultSearch[item].title;
                    year = resultSearch[item].year ? resultSearch[item].year : 0;
                    href = "https://flixanity.app" + resultSearch[item].permalink;
                    type = resultSearch[item].type;
                    console.log(title, year, href, "------------ FLIXIANTIY INFO ----------");
                    if (slugify(movieInfo.title, { lower: true, remove: /[*+~.()'"!:@]/g }) == slugify(title.trim(), { lower: true, remove: /[*+~.()'"!:@]/g })) {
                        if (movieInfo.type == "movie" && type.toLowerCase() == "movie") {
                            if (year == movieInfo.year) {
                                link = href;
                                break;
                            }
                        }
                        if (movieInfo.type == "tv" && type.toLowerCase() == "show") {
                            link = href;
                            break;
                        }
                    }
                }
                console.log(link, "------------ FLIXIANTIY link ----------");
                if (!(link != "")) return [3, 5];
                urlDetail = "https://flixanity.org/ajax/vsozrflxcw.php";
                if (movieInfo.type == "tv") {
                    link = link + "/season/" + movieInfo.season + "/episode/" + movieInfo.episode;
                }
                return [4, libs.request_get(link, headers)];
            case 2:
                htmlDetail = _a.sent();
                id = htmlDetail.match(/elid *\= *\"([^\"]+)/i);
                id = id ? id[1] : "";
                bodyDetail = qs.stringify({
                    action: movieInfo.type == "movie" ? "getMovieEmb" : "getEpisodeEmb",
                    idEl: id,
                    nopop: ""
                });
                console.log(id, bodyDetail, urlDetail, link, headers, "------------ FLIXIANTIY SEARCH DETAIL ----------");
                return [4, libs.request_post(urlDetail, headers, bodyDetail, "json")];
            case 3:
                resultDetail = _a.sent();
                embeds = [];
                console.log(resultDetail, "------------ FLIXIANTIY RESULT SEARCH DETAIL ----------");
                for (item in resultDetail) {
                    try {
                        html = resultDetail[item].embed;
                        parseEmbed = cheerio.load(html);
                        src = parseEmbed("iframe").attr("src");
                        if (src) {
                            embeds.push(src);
                        }
                    }
                    catch (e) { }
                }
                console.log(embeds, "------------ FLIXIANTIY LIST EMBEDS ----------");
                arrMap = embeds.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "Flixianity" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "Flixianity"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
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
