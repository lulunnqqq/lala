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
    var domain, urlSearch, resultSearch, parseSearch, link, ajaxUrl_1, linkTv, htmlDetail, parseDetail_1, tokens_1, token, headers_1, ajaxTv, idTv_1, bodyTv, htmlTv, parseTv_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "http://m4ufree.tv";
                urlSearch = domain + "/search/" + slugify(movieInfo.title, { lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g }) + ".html";
                return [4, libs.request_get(urlSearch, {})];
            case 1:
                resultSearch = _a.sent();
                parseSearch = cheerio.load(resultSearch);
                link = "";
                console.log(parseSearch("div.imagecover"), urlSearch, "--------- M4uFREE SEARCH ---------");
                parseSearch("div.imagecover").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find("a").attr("title");
                    if (title) {
                        var year = title.match(/\( *([0-9]+)/i);
                        year = year ? year[1] : 0;
                        title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                        var href = parseSearch(itemSearch).find("a").attr("href");
                        console.log(title, year, href, "--------- M4uFREE SEARCH INFO ---------");
                        if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                            if (movieInfo.type == "movie" && year == movieInfo.year) {
                                link = href;
                            }
                            if (movieInfo.type == 'tv') {
                                link = href;
                            }
                        }
                    }
                });
                console.log(link, "--------- M4uFREE LINK ---------");
                if (!(link != "")) return [3, 8];
                link = domain + "/" + link;
                ajaxUrl_1 = domain + "/ajax";
                linkTv = '';
                return [4, libs.request_get(link, {})];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                tokens_1 = [];
                token = htmlDetail.match(/_token *: *\'([^\']+)/i);
                token = token ? token[1] : '';
                headers_1 = {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                };
                if (!(movieInfo.type == "tv")) return [3, 5];
                ajaxTv = domain + "/ajaxtv";
                idTv_1 = "";
                console.log(parseDetail_1(".episode").length, "--------- M4uFREE SEARCH EPISODE TV ---------");
                parseDetail_1(".episode").each(function (keyTv, itemTv) {
                    var textTv = parseDetail_1(itemTv).text();
                    var matchTv = textTv.toLowerCase().match(/s *([0-9]+) *\- *e([0-9]+)/i);
                    var season = matchTv ? matchTv[1] : 0;
                    var episode = matchTv ? matchTv[2] : 0;
                    var idEpisode = parseDetail_1(itemTv).attr("idepisode");
                    console.log(season, episode, "--------- M4uFREE SEASON, EPISODE ---------");
                    if (season == movieInfo.season && episode == movieInfo.episode) {
                        idTv_1 = idEpisode;
                    }
                });
                if (!idTv_1) return [3, 4];
                bodyTv = qs.stringify({
                    idepisode: idTv_1,
                    _token: token
                });
                return [4, libs.request_post(ajaxTv, headers_1, bodyTv)];
            case 3:
                htmlTv = _a.sent();
                parseTv_1 = cheerio.load(htmlTv);
                console.log(parseTv_1(".singlemv").length, "--------- M4uFREE TOKEN TV ---------");
                parseTv_1(".singlemv").each(function (keyDetail, itemDetail) {
                    var id = parseTv_1(itemDetail).attr("data");
                    tokens_1.push(id);
                });
                _a.label = 4;
            case 4: return [3, 6];
            case 5:
                console.log(parseDetail_1(".singlemv").length, "--------- M4uFREE TOKEN MOVIE ---------");
                parseDetail_1(".singlemv").each(function (keyDetail, itemDetail) {
                    var id = parseDetail_1(itemDetail).attr("data");
                    tokens_1.push(id);
                });
                _a.label = 6;
            case 6:
                arrMap = tokens_1.map(function (idFilm) { return __awaiter(_this, void 0, void 0, function () {
                    var body, htmlEmbed, parseEmbed, iframe, host, source, source2, parse, arrSource, arrSource;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = qs.stringify({
                                    m4u: idFilm,
                                    _token: 'IIcmtyiI5J4O9Ag2BTFa14WecGOdlFmIY5O61M3C'
                                });
                                return [4, libs.request_post(ajaxUrl_1, headers_1, body)];
                            case 1:
                                htmlEmbed = _a.sent();
                                parseEmbed = cheerio.load(htmlEmbed);
                                iframe = parseEmbed("iframe.video").attr("src");
                                if (iframe) {
                                    host = libs.string_getHost(iframe);
                                    console.log(ajaxUrl_1, host, headers_1, body, iframe, "--------- M4UFREE IFRAME AJAX ----------");
                                    if (hosts[host]) {
                                        hosts[host](iframe, movieInfo, _.merge(config, { provider: "M4uFree" }), callback);
                                    }
                                }
                                console.log(htmlEmbed, headers_1, body, ajaxUrl_1, "--------- M4uFREE htmlEmbed parse ---------");
                                source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
                                source2 = source && source[2] ? source[2] + "]" : "[]";
                                source = source ? source[1] + "]" : "[]";
                                parse = [];
                                source = "parse = " + source;
                                eval(source);
                                console.log(parse, "--------- M4uFREE PARSE ---------");
                                arrSource = parse.map(function (direct) { return __awaiter(_this, void 0, void 0, function () {
                                    var file, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                file = direct.file;
                                                return [4, libs.request_getFileSize(file)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(file);
                                                if (fileSize > 0) {
                                                    callback({
                                                        file: file,
                                                        size: fileSize,
                                                        host: host,
                                                        provider: "M4uFree"
                                                    });
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrSource)];
                            case 2:
                                _a.sent();
                                parse = [];
                                source = "parse = " + source2;
                                eval(source);
                                console.log(parse, "--------- M4uFREE PARSE ---------");
                                arrSource = parse.map(function (direct) { return __awaiter(_this, void 0, void 0, function () {
                                    var file, fileSize, host;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                file = direct.file;
                                                return [4, libs.request_getFileSize(file)];
                                            case 1:
                                                fileSize = _a.sent();
                                                host = libs.string_getHost(file);
                                                if (fileSize > 0) {
                                                    callback({
                                                        file: file,
                                                        size: fileSize,
                                                        host: host,
                                                        provider: "M4uFree"
                                                    });
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrSource)];
                            case 3:
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
