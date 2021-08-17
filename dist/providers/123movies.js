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
    var url, parse, link, parseDetail, matchUrl, _i, matchUrl_1, item, embed, fileSize, host, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://123movieshub.vip/search.php?keyword=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_getcaptcha(url, {}, "cheerio")];
            case 1:
                parse = _a.sent();
                link = "";
                console.log(parse(".wrapper .col2 ul li").length, '------- LENGTH SEARCH 123movies ------');
                parse(".wrapper .col2 ul li").each(function (key, item) {
                    var title = parse(item).find("figure a").first().find("h3").text();
                    var season = title.toLowerCase().match(/\- *season *([0-9]+)/i);
                    var season = season ? season[1] : 0;
                    title = title.replace(/\- *season *[0-9]+/i, "").trim();
                    var href = parse(item).find("a").first().attr("href");
                    var quanlity = parse(item).find(".quanlity").text();
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (quanlity && movieInfo.type == "movie") {
                            link = href;
                        }
                        else if (!quanlity && movieInfo.type == "tv") {
                            var episode = parse(item).find(".eps div").text();
                            console.log(title, href, season, episode, "------------ 123MOVIES SEASON EPISODE ------------");
                            if (season == movieInfo.season && episode == movieInfo.episode) {
                                link = href;
                            }
                        }
                    }
                });
                if (!(link != "")) return [3, 8];
                link = "https://123movieshub.vip" + link;
                return [4, libs.request_getcaptcha(link, {}, 'html')];
            case 2:
                parseDetail = _a.sent();
                matchUrl = parseDetail.match(/link_server_[A-z0-9_-]+ *\= *\"([^\"]+)/ig);
                console.log(matchUrl, "mathc--------------------");
                if (!matchUrl) {
                    return [2];
                }
                _i = 0, matchUrl_1 = matchUrl;
                _a.label = 3;
            case 3:
                if (!(_i < matchUrl_1.length)) return [3, 8];
                item = matchUrl_1[_i];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                embed = item.replace(/link_server_[A-z0-9_-]+ *\= *\"/i, "").trim();
                console.log(embed, "embed--------------------");
                if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
                    embed = embed.replace("//", "https://");
                }
                return [4, libs.request_getFileSize(embed)];
            case 5:
                fileSize = _a.sent();
                host = libs.string_getHost(embed);
                if (fileSize == 0) {
                    if (hosts[host]) {
                        hosts[host](embed, movieInfo, _.merge(config, { provider: "123MOVIES" }), callback);
                    }
                    return [3, 7];
                }
                callback({
                    file: embed,
                    size: fileSize,
                    host: host.toUpperCase(),
                    provider: "123Movies"
                });
                return [3, 7];
            case 6:
                e_1 = _a.sent();
                console.log(e_1, "error 123movies");
                return [3, 7];
            case 7:
                _i++;
                return [3, 3];
            case 8: return [2];
        }
    });
}); };
