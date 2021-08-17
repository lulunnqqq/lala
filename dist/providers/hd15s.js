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
    var url, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, linkEmbed_1, htmlEmbed, parseEmbed_1, sources_1, urlAjax_1, type_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://hd15s.com/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(url)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".result-item").length, "-------------- HD15s SEARCH LENGTH ------------");
                parseSearch(".result-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find(".details .title a").text();
                    var href = parseSearch(itemSearch).find(".details .title a").attr("href");
                    var type = parseSearch(itemSearch).find(".movies").text();
                    var year = parseSearch(itemSearch).find(".meta .year").text();
                    console.log(title, href, type, year, "-------------- HD15s SEARCH INFO ------------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (movieInfo.type == "movie" && type) {
                            if (year == movieInfo.year) {
                                link = href;
                            }
                        }
                        if (movieInfo.type == "tv") {
                            link = href;
                        }
                    }
                });
                console.log(link, "-------------- HD15s LINK ------------");
                if (!(link != "")) return [3, 5];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                linkEmbed_1 = "";
                if (movieInfo.type == "tv") {
                    parseDetail_1(".episodios li").each(function (keyDetail, itemDetail) {
                        var seasonInfo = parseDetail_1(itemDetail).find(".numerando").text();
                        var season = seasonInfo.match(/([0-9]+)/i);
                        season = season ? season[1] : 0;
                        var episode = seasonInfo.match(/[0-9]+ *\- *([0-9]+)/i);
                        episode = episode ? episode[1] : 0;
                        console.log(season, episode, "-------------- HD15s SEASON EPISODE ------------");
                        var href = parseDetail_1(itemDetail).find(".episodiotitle a").attr("href");
                        if (season == movieInfo.season && episode == movieInfo.episode) {
                            linkEmbed_1 = href;
                        }
                    });
                }
                if (movieInfo.type == "movie") {
                    linkEmbed_1 = link;
                }
                console.log(linkEmbed_1, "-------------- HD15s LINK  EMBED ------------");
                if (!(linkEmbed_1 != "")) return [3, 5];
                return [4, libs.request_get(linkEmbed_1)];
            case 3:
                htmlEmbed = _a.sent();
                parseEmbed_1 = cheerio.load(htmlEmbed);
                sources_1 = [];
                urlAjax_1 = "https://hd15s.com/wp-admin/admin-ajax.php";
                type_1 = movieInfo.type == "tv" ? 'tv' : "movie";
                console.log(parseEmbed_1("#playeroptionsul li").length, "-------------- HD15s SEARCH EMBED ------------");
                parseEmbed_1("#playeroptionsul li").each(function (keyEmbed, itemEmbed) {
                    var dataPost = parseEmbed_1(itemEmbed).attr("data-post");
                    var dataNume = parseEmbed_1(itemEmbed).attr("data-nume");
                    if (dataPost && dataNume) {
                        sources_1.push({
                            post: dataPost,
                            nume: dataNume
                        });
                    }
                });
                console.log(sources_1, "-------------- HD15s SOURCES ------------");
                arrMap = sources_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var body, htmlSearchEmbed, parseSearchEmbed, embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = qs.stringify({
                                    action: 'doo_player_ajax',
                                    post: item.post,
                                    nume: item.nume,
                                    type: type_1
                                });
                                return [4, libs.request_post(urlAjax_1, {
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    }, body)];
                            case 1:
                                htmlSearchEmbed = _a.sent();
                                parseSearchEmbed = cheerio.load(htmlSearchEmbed);
                                embed = parseSearchEmbed(".metaframe").attr("src");
                                if (!embed) return [3, 3];
                                console.log(embed, "-------------- HD15s EMBED ------------");
                                if (_.startsWith("//")) {
                                    embed = "https:" + embed;
                                }
                                return [4, libs.request_getFileSize(embed)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "HD15s" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "HD15s"
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
