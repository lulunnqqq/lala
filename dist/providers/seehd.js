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
    var url, parse, link, matchTv, replaceEpisode, sources, parseDetail_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "http://www.seehd.pl/?s=" + slugify(movieInfo.title, { lower: true, replacement: "+" });
                return [4, libs.request_getcaptcha(url, {}, "cheerio")];
            case 1:
                parse = _a.sent();
                link = "";
                parse(".movie.big").each(function (key, item) {
                    var title = parse(item).find(".thumb_title").text();
                    var href = parse(item).find(".post_thumb a").attr("href");
                    var slugTitle = slugify(title, { lower: true, replacement: "-" });
                    var slugTileInfo = slugify(movieInfo.title, { lower: true, replacement: "-" });
                    if (slugTitle.indexOf(slugTileInfo) !== -1) {
                        link = href;
                    }
                });
                if (!(link != "")) return [3, 3];
                matchTv = link.match(/\-season\-[0-9]+\-episode\-[0-9]+/i);
                if (movieInfo.type == "tv" && matchTv) {
                    replaceEpisode = "-season-" + movieInfo.season + "-episode-" + movieInfo.episode;
                    link = link.replace(/\-season\-[0-9]+\-episode\-[0-9]+/i, replaceEpisode);
                }
                sources = [];
                return [4, libs.request_getcaptcha(link, {}, "cheerio")];
            case 2:
                parseDetail_1 = _a.sent();
                parseDetail_1(".tabcontent iframe").each(function (keyDetail, itemDetail) {
                    var embed = parseDetail_1(itemDetail).attr("src") || parseDetail_1(itemDetail).attr("SRC");
                    if (embed) {
                        var fileSize = yield libs.request_getFileSize(embed);
                        var host = libs.string_getHost(embed);
                        console.log(embed, fileSize, host, "embed--------------------");
                        if (fileSize == 0) {
                            if (hosts[host]) {
                                hosts[host](embed, movieInfo, _.merge(config, { provider: "SEEHD" }), callback);
                            }
                        }
                        else {
                            callback({
                                file: embed,
                                size: fileSize,
                                host: host.toUpperCase(),
                                provider: "SEEHD"
                            });
                        }
                    }
                });
                _a.label = 3;
            case 3: return [2];
        }
    });
}); };
