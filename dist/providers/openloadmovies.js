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
    var urlSearch, htmlSearch, parseSearch, link, htmlDetail, parseDetail_1, sources_1, urlAjax_1, maps;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (movieInfo.type == "tv") {
                    return [2];
                }
                urlSearch = "https://openloadmovies.ch/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                console.log(parseSearch(".result-item").length, urlSearch, '------------ OPENLOAD MOVIE SEARCH LENGTH --------');
                parseSearch(".result-item").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.title a').text();
                    var href = parseSearch(itemSearch).find('.title a').attr('href');
                    var year = title.match(/\( *([0-9]+)/i);
                    year = year ? year[1] : 0;
                    title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                    console.log(title, href, year, "-------------- OPENLOAD MOVIE SEARCH INFO -----------");
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        if (year == movieInfo.year) {
                            link = href;
                        }
                    }
                });
                console.log(link, '--------------- OPENLOAD MOVIE LINK ----------');
                if (!(link != "")) return [3, 4];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                sources_1 = [];
                console.log(parseDetail_1('.dooplay_player_option').length, "---------------- OPENLOAD LENGTH DETAIL -----------");
                parseDetail_1('.dooplay_player_option').each(function (keyDetail, itemDetail) {
                    var type = parseDetail_1(itemDetail).attr("data-type");
                    var post = parseDetail_1(itemDetail).attr('data-post');
                    var nume = parseDetail_1(itemDetail).attr("data-nume");
                    console.log(type, post, nume, "---------------- OPENLOAD TYPE POST NUME ");
                    if (nume.toLowerCase() != "trailer") {
                        sources_1.push({
                            type: type,
                            post: post,
                            nume: nume
                        });
                    }
                });
                urlAjax_1 = "https://openloadmovies.ch/wp-admin/admin-ajax.php";
                maps = sources_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                    var body, result, embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = {
                                    action: "doo_player_ajax",
                                    post: item.post,
                                    nume: item.nume,
                                    type: item.type
                                };
                                console.log(urlAjax_1, body, "------------- OPENLOAD MOVIE request POST");
                                return [4, libs.request_post(urlAjax_1, {
                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                                    }, qs.stringify(body), 'json')];
                            case 1:
                                result = _a.sent();
                                embed = result.embed_url;
                                console.log(embed, result, "embed xxxxxxxxx--------------------");
                                if (!embed) return [3, 3];
                                return [4, libs.request_getFileSize(embed)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "OpenloadMovies", urlDetail: link }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "OpenloadMovies"
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(maps)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2];
        }
    });
}); };
