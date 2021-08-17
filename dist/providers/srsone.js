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
    function dbneg2(X) {
        var Y = {};
        Y["GLXpa"] = function (Z, a0) {
            return Z - a0;
        };
        var a1 = 6946588830;
        var a2 = "";
        var a3 = X.split('-');
        for (i = 0x0; i < a3.length; i++) {
            xh = Y["GLXpa"](parseInt(a3[i], 16), a1);
            var a4 = String.fromCharCode(xh);
            var a2 = a2 + a4;
        }
        return a2;
    }
    var url, body, resultSearch, link, arrMap, linkWatch, htmlEpisode, parseEpisode_1, linkEpisode_1, htmlDetail, parseDetail_1, tokens_1, arrMap_1;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (movieInfo.type == "movie") {
                    return [2];
                }
                url = "https://srsone.top/ajax/search.php";
                body = {
                    q: movieInfo.title,
                    limit: 20,
                    timestamp: Date.now(),
                    verifiedCheck: ""
                };
                return [4, libs.request_post(url, {
                        "content-type": "application/x-www-form-urlencoded"
                    }, qs.stringify(body), "json")];
            case 1:
                resultSearch = _a.sent();
                console.log(resultSearch, url, body, "---------- SRSONE RESULT SEARCH -------");
                resultSearch = resultSearch ? resultSearch : [];
                link = "";
                arrMap = resultSearch.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var title;
                    return __generator(this, function (_a) {
                        title = item.title.replace(/\( *[0-9]+.*/i, "").trim();
                        if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                            link = item.permalink;
                        }
                        return [2];
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 2:
                _a.sent();
                console.log(link, "---------- SRSONE LINK -------");
                if (!(link != "")) return [3, 6];
                linkWatch = link + "/season/" + movieInfo.season;
                console.log(linkWatch, "----------- SRSONE LINK WATCH ---------");
                return [4, libs.request_get(linkWatch)];
            case 3:
                htmlEpisode = _a.sent();
                parseEpisode_1 = cheerio.load(htmlEpisode);
                linkEpisode_1 = "";
                console.log(parseEpisode_1(".hgrid").length, "--------- SRSONE EPISODE LENGTH ----------");
                parseEpisode_1(".hgrid").each(function (keyEpisode, itemEpisode) {
                    var hrefEpisode = parseEpisode_1(itemEpisode).find(".watch_now").attr("href");
                    var titleEpisode = parseEpisode_1(itemEpisode).find(".episode").text();
                    var episode = titleEpisode.toLowerCase().match(/ep *\.* *([0-9]+)/i);
                    episode = episode ? episode[1] : 0;
                    console.log(titleEpisode, episode, hrefEpisode, "---------- SRSONE EPISODE DETAIL ----------");
                    if (episode == movieInfo.episode) {
                        linkEpisode_1 = hrefEpisode;
                    }
                });
                console.log(linkEpisode_1, "----------- SRSONE LINK EPISODE  ---------");
                if (!(linkEpisode_1 != "")) return [3, 6];
                return [4, libs.request_get(linkEpisode_1)];
            case 4:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                tokens_1 = [];
                console.log(parseDetail_1("#listlink .embed-selector").length, "---------- SRSONE TOKEN LENGTH -------");
                parseDetail_1("#listlink .embed-selector").each(function (keyToken, itemToken) {
                    var token = parseDetail_1(itemToken).attr("onclick") || parseDetail_1(itemToken).attr("onClick");
                    token = token.match(/window\.open\( *dbneg\( *\'([^\']+)/i);
                    token = token ? token[1] : '';
                    if (token) {
                        tokens_1.push(token);
                    }
                });
                console.log(tokens_1, "---------- SRSONE TOKEN -------");
                arrMap_1 = tokens_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                embed = dbneg2(item);
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "SoneMovie" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "SoneMovie"
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap_1)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2];
        }
    });
}); };
