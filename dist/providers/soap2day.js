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
    var url, parse, link, parseDetail, id, urlPostAjax, postRequest, parseRequest, source, arrMap, linkTv_1, id, postEpisode, parseRequestEpisode, source, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://soap2day.to/search/keyword/" + slugify(movieInfo.title, { lower: true, replacement: "%20" });
                return [4, libs.request_getcaptcha(url, {}, "cheerio", "sources_clouflare")];
            case 1:
                parse = _a.sent();
                link = "";
                console.log(parse(".col-lg-2.col-md-3.col-sm-4.col-xs-6.no-padding").length, "------------ SOAP SEARCH INFO ------------");
                parse(".col-lg-2.col-md-3.col-sm-4.col-xs-6.no-padding").each(function (key, item) {
                    var href = parse(item).find("h5 a").first().attr("href");
                    var title = parse(item).find("h5 a").first().text();
                    var year = parse(item).find(".label.label-info").text();
                    console.log(href, title, year, "------------- SOAP INFO FILM ---------------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && year == movieInfo.year) {
                            link = href;
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, "-------------- SOAP LINK FILM ---------------");
                if (!(link != "")) return [3, 5];
                return [4, libs.request_getcaptcha(link, {}, "cheerio", "sources_clouflare")];
            case 2:
                parseDetail = _a.sent();
                id = parseDetail("#hId").attr("value");
                urlPostAjax = "https://soap2day.to/home/index/GetMInfoAjax";
                if (!(movieInfo.type == "movie")) return [3, 5];
                return [4, libs.request_postcaptcha(urlPostAjax, { pass: id }, {}, "sources_clouflare")];
            case 3:
                postRequest = _a.sent();
                parseRequest = JSON.parse(postRequest);
                source = [];
                if (parseRequest.val) {
                    source.push(parseRequest.val);
                }
                if (parseRequest.val_bak) {
                    source.push(parseRequest.val_bak);
                }
                arrMap = source.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
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
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "SOAP" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "SOAP"
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
            case 5:
                if (!(movieInfo.type == "tv")) return [3, 9];
                linkTv_1 = "";
                parseDetail(".alert.alert-info-ex.col-sm-12").each(function (key, item) {
                    var season = parse(item).find('h4').first().text();
                    season = season.toLowerCase().match(/season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    if (season == movieInfo.season) {
                        parse(item).find("col-sm-12.col-md-6.col-lg-4.myp1").each(function (keyE, itemE) {
                            var episode = parse(itemE).find("a").text();
                            var href = parse(itemE).find("a").attr("href");
                            episode = episode.match(/([0-9]+) *\./i);
                            episode = episode ? episode[1] : 0;
                            if (episode == movieInfo.episode) {
                                linkTv_1 = href;
                            }
                        });
                    }
                });
                if (!(linkTv_1 != "")) return [3, 9];
                return [4, libs.request_getcaptcha(linkTv_1, {}, "cheerio", "sources_clouflare")];
            case 6:
                parseEpisode = _a.sent();
                id = parseEpisode("#hId").attr("value");
                return [4, libs.request_postcaptcha(urlPostAjax, { pass: id }, {})];
            case 7:
                postEpisode = _a.sent();
                parseRequestEpisode = JSON.parse(postEpisode);
                source = [];
                if (parseRequestEpisode.val) {
                    source.push(parseRequestEpisode.val);
                }
                if (parseRequestEpisode.val_bak) {
                    source.push(parseRequestEpisode.val_bak);
                }
                arrMap = source.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
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
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "SOAP" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "SOAP"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2];
        }
    });
}); };
