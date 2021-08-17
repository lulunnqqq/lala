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
    var urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, headers, nonce, urlEmbed, body_1, htmlEmbed, sources, dataEmbed, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                urlSearch = "https://ww1.top123movieslive.com/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".ml-item").length, "-------- TOP123 SEARCH INFO -------");
                parseSearch(".ml-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".mli-info h2").text();
                    var season = title.toLowerCase().match(/\– *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    title = title.toLowerCase().replace(/\– *season [0-9]+/i, "").trim();
                    var href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href");
                    console.log(title, season, href, "-------- TOP123 DETAIL INFO -------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie") {
                            link = href;
                        }
                        if (movieInfo.type == "tv" && season == movieInfo.season) {
                            link = href;
                        }
                    }
                });
                console.log(link, "-------- TOP123 DETAIL INFO -------");
                if (!link) return [3, 5];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                headers = {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                };
                nonce = htmlDetail.match(/nonce\s*\:\s*\'([^'^]+)/i);
                nonce = nonce ? nonce[1] : "";
                urlEmbed = "https://ww1.top123movieslive.com/wp-admin/admin-ajax.php";
                body_1 = {
                    action: "halim_ajax_player",
                    nonce: nonce,
                    episode: 0,
                    server: 0,
                    postid: 0
                };
                if (movieInfo.type == "movie") {
                    body_1.postid = parseDetail_1(".idTabs li").first().find("a span").attr("data-post-id");
                    body_1.server = parseDetail_1(".idTabs li").first().find("a span").attr("data-server");
                    body_1.episode = parseDetail_1(".idTabs li").first().find("a span").attr("data-episode");
                    console.log(body_1, parseDetail_1(".idTabs li").first().find("a span").attr("data-post-id"), "---------- TOP123MOVIE BODY MOVIES ----------");
                }
                else {
                    parseDetail_1(".idTabs li").each(function (keyEpisode, itemEpisode) {
                        parseDetail_1(itemEpisode).find("a").each(function (keyId, itemId) {
                            var episode = parseDetail_1(itemId).find("span").text();
                            console.log(episode, movieInfo.episode, "-------- TOPMOVIES EPISODE ID --------");
                            if (episode == movieInfo.episode) {
                                body_1.postid = parseDetail_1(itemId).find("span").attr("data-post-id");
                                body_1.server = parseDetail_1(itemId).find("span").attr("data-server");
                                body_1.episode = parseDetail_1(itemId).find("span").attr("data-episode");
                            }
                        });
                    });
                }
                return [4, libs.request_post(urlEmbed, headers, qs.stringify(body_1))];
            case 3:
                htmlEmbed = _a.sent();
                console.log(body_1, urlEmbed, "---------- TOP123MOVIE HTML EMBED ----------");
                sources = [];
                dataEmbed = htmlEmbed.match(/var *vb_json_data *\= *\'([^\']+)/i);
                eval("sources = " + (dataEmbed ? dataEmbed[1] : "[]"));
                console.log(sources, "-------- TOP123 EMBED -------");
                sources = sources[1] ? sources[1] : [];
                arrMap = sources.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var decode, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(embed.s && embed.u)) return [3, 3];
                                decode = libs.string_base64_decode(embed.u);
                                if (!(embed.s.toLowerCase() == "hls")) return [3, 1];
                                return [3, 3];
                            case 1: return [4, libs.request_getFileSize(decode)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(decode);
                                console.log(decode, fileSize, host, "embed.u--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](decode, movieInfo, _.merge(config, { provider: "TopMovies", urlDetail: link }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: decode,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "TopMovies"
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2];
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
