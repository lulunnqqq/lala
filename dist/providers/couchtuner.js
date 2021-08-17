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
    var urlSearch, htmlSearch, parseSearch, link, headers, linkDetail_1, htmlDetailTv, parseDetailTv_1, htmlDetail, mId, fId, urlServer, htmlServer, parseServer_1, servers_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                String.prototype.asdqew = function (key) {
                    if (key === void 0) { key = 123; }
                    var b = "";
                    for (var i = 0; i < this.length;) {
                        for (var j = 0; (j < key.toString().length && i < this.length); j++, i++) {
                            b += String.fromCharCode(this[i].charCodeAt(0) ^ key.toString()[j].charCodeAt(0));
                        }
                    }
                    return b;
                };
                urlSearch = "";
                if (movieInfo.type == "movie") {
                    urlSearch = "https://ww1.couchtuner.space/search/" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) + "/movies";
                }
                else {
                    urlSearch = "https://ww1.couchtuner.space/search/" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) + "/series";
                }
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(urlSearch, parseSearch(".c_UBDKbgadOvFEQplfxJZRQRWTOb").length, "------------ COUCHTUNER SEARCH LENGTH -------");
                parseSearch(".c_UBDKbgadOvFEQplfxJZRQRWTOb").each(function (keySearch, itemSearch) {
                    var year = parseSearch(itemSearch).attr("data-year");
                    var title = parseSearch(itemSearch).attr("data-filmname");
                    var episode = parseSearch(itemSearch).attr("data-count-episode");
                    var season = title.toLowerCase().match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/\- *season *[0-9]+/i, "").trim();
                    console.log(year, title, episode, season, "------------ COUCHTUNER SEARCH INFO -------");
                    if (slugify(movieInfo.title, { lower: true, remove: /[*+~.()'"!:@]/g }) == slugify(title.trim(), { lower: true, remove: /[*+~.()'"!:@]/g })) {
                        if (movieInfo.type == "movie" && year == movieInfo.year) {
                            var href = parseSearch(itemSearch).find("a.item_hd").attr("href");
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season) {
                            var href = parseSearch(itemSearch).find("a.item_series").attr("href");
                            link = href;
                        }
                    }
                });
                headers = {
                    accept: "application/json, text/javascript, */*; q=0.01",
                    "x-requested-with": "XMLHttpRequest",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors"
                };
                console.log(link, "------------ COUCHTUNER LINK -------");
                if (!(link != "")) return [3, 8];
                link = "https://ww1.couchtuner.space" + link;
                linkDetail_1 = "";
                if (!(movieInfo.type == "movie")) return [3, 2];
                linkDetail_1 = link;
                return [3, 4];
            case 2: return [4, libs.request_get(link)];
            case 3:
                htmlDetailTv = _a.sent();
                parseDetailTv_1 = cheerio.load(htmlDetailTv);
                console.log(parseDetailTv_1(".c_RJCqWnYsvGePCdFmByJaeLVQOI").length, "------------ COUCHTUNER SEARCH TV LENGTH -------");
                parseDetailTv_1(".c_RJCqWnYsvGePCdFmByJaeLVQOI").each(function (keyTv, itemTv) {
                    var hrefTv = parseDetailTv_1(itemTv).attr("href");
                    var titleTv = parseDetailTv_1(itemTv).attr("title");
                    if (titleTv && hrefTv) {
                        hrefTv = "https://ww1.couchtuner.space" + hrefTv;
                        var episodeTv = titleTv.toLowerCase().match(/episode *([0-9]+)/i);
                        episodeTv = episodeTv ? episodeTv[1] : 0;
                        console.log(hrefTv, titleTv, episodeTv, "------------ COUCHTUNER EPISODE INFO SEARCH -------");
                        if (episodeTv == movieInfo.episode) {
                            linkDetail_1 = hrefTv;
                        }
                    }
                });
                _a.label = 4;
            case 4:
                console.log(linkDetail_1, "------------ COUCHTUNER LINK FILM -------");
                if (!(linkDetail_1 != "")) return [3, 8];
                return [4, libs.request_get(linkDetail_1)];
            case 5:
                htmlDetail = _a.sent();
                mId = htmlDetail.match(/data.PlayerReports.m_id *= *\'([^\']+)/i);
                mId = mId ? mId[1] : "";
                fId = htmlDetail.match(/data.PlayerReports.f_id *= *\'([^\']+)/i);
                fId = fId ? fId[1] : "";
                console.log(mId, fId, "------------ COUCHTUNER FID MID -------");
                urlServer = "https://ww1.couchtuner.space/user/servers/" + mId + "?ep=" + (movieInfo.type == "tv" ? fId : '0');
                return [4, libs.request_get(urlServer)];
            case 6:
                htmlServer = _a.sent();
                parseServer_1 = cheerio.load(htmlServer);
                servers_1 = [];
                console.log(urlServer, parseServer_1(".c_xZwLteZxeaxNFANGijuJZvhPWE").length, "------------ COUCHTUNER SERVER LENGTH -------");
                parseServer_1(".c_xZwLteZxeaxNFANGijuJZvhPWE").each(function (keyServer, itemServer) {
                    var serverName = parseServer_1(itemServer).attr("data-value");
                    if (serverName) {
                        servers_1.push(serverName);
                    }
                });
                console.log(servers_1, "------------ COUCHTUNER SERVER INFO -------");
                arrMap = servers_1.map(function (server) { return __awaiter(_this, void 0, void 0, function () {
                    var urlAjaxServer, resultSearch, arrMapSource;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlAjaxServer = linkDetail_1 + "?server=" + server;
                                return [4, libs.request_get(urlAjaxServer, headers)];
                            case 1:
                                resultSearch = _a.sent();
                                resultSearch = JSON.parse(atob(resultSearch).asdqew());
                                console.log(resultSearch, "------------ COUCHTUNER AJAX RESULT SERVER -------");
                                arrMapSource = resultSearch.map(function (itemSource) { return __awaiter(_this, void 0, void 0, function () {
                                    var embed, host, fileSize;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                embed = itemSource.file;
                                                host = libs.string_getHost(embed);
                                                console.log(embed, host, itemSource, "embed--------------------");
                                                if (!embed) return [3, 3];
                                                if (!(itemSource.type == "m3u8")) return [3, 1];
                                                callback({
                                                    file: embed,
                                                    size: "",
                                                    host: host.toUpperCase(),
                                                    provider: "CouchTuner",
                                                    quality: "360p"
                                                });
                                                return [3, 3];
                                            case 1: return [4, libs.request_getFileSize(embed)];
                                            case 2:
                                                fileSize = _a.sent();
                                                if (!fileSize) {
                                                    if (hosts[host]) {
                                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "CouchTuner", urlDetail: link }), callback);
                                                    }
                                                }
                                                else {
                                                    callback({
                                                        file: embed,
                                                        size: fileSize,
                                                        host: host.toUpperCase(),
                                                        provider: "CouchTuner"
                                                    });
                                                }
                                                _a.label = 3;
                                            case 3: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMapSource)];
                            case 2:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [2];
        }
    });
}); };
