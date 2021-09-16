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
    var DOMAIN, PROVIDER, urlSearch, userAgent, parseSearch, cookieData, csrfToken, LINK_DETAIL, ajaxUrl, linkTv, htmlDetail, parseDetail, tokens, token, headers, ajaxTv, idTv_1, bodyTv, parseTv_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = "https://m4ufree.tv";
                PROVIDER = 'M4UFREE';
                urlSearch = DOMAIN + "/search/" + libs.url_slug_search(movieInfo) + ".html";
                userAgent = libs.request_getRandomUserAgent();
                return [4, libs.request_get(urlSearch, {
                        'user-agent': userAgent,
                        origin: 'https://m4ufree.tv',
                        'x-requested-with': 'XMLHttpRequest',
                        'te': 'trailers',
                    }, true)];
            case 1:
                parseSearch = _a.sent();
                return [4, cookiesS.get(DOMAIN)];
            case 2:
                cookieData = _a.sent();
                libs.log(cookieData, PROVIDER, 'COOKIE DATA');
                csrfToken = parseSearch('meta[name=csrf-token]').attr('content');
                LINK_DETAIL = "";
                libs.log({ length: parseSearch("div.imagecover").length, urlSearch: urlSearch, csrfToken: csrfToken }, PROVIDER, 'SEARCH');
                parseSearch("div.imagecover").each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find("a").attr("title");
                    if (title) {
                        var year = title.match(/\( *([0-9]+)/i);
                        year = year ? year[1] : 0;
                        title = title.replace(/\( *[0-9]+ *\)/i, "").trim();
                        var href = parseSearch(itemSearch).find("a").attr("href");
                        console.log(title, year, href, "--------- M4uFREE SEARCH INFO ---------");
                        if (libs.string_matching_title(movieInfo, title)) {
                            if (movieInfo.type == "movie" && year == movieInfo.year) {
                                LINK_DETAIL = href;
                            }
                            if (movieInfo.type == 'tv') {
                                LINK_DETAIL = href;
                            }
                        }
                    }
                });
                libs.log(LINK_DETAIL, PROVIDER, 'LINK DETAIL');
                if (!LINK_DETAIL) {
                    return [2];
                }
                LINK_DETAIL = DOMAIN + "/" + LINK_DETAIL;
                ajaxUrl = DOMAIN + "/ajax";
                linkTv = '';
                return [4, libs.request_get(LINK_DETAIL, {
                        'user-agent': userAgent,
                        origin: 'https://m4ufree.tv',
                        'x-requested-with': 'XMLHttpRequest',
                        'te': 'trailers',
                    })];
            case 3:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                tokens = [];
                token = htmlDetail.match(/_token *: *\'([^\']+)/i);
                token = token ? token[1] : '';
                headers = {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'user-agent': userAgent,
                    origin: 'https://m4ufree.tv',
                    'x-requested-with': 'XMLHttpRequest',
                    'te': 'trailers',
                };
                if (!(movieInfo.type == "tv")) return [3, 6];
                ajaxTv = DOMAIN + "/ajaxtv";
                idTv_1 = "";
                libs.log({ length: parseDetail(".episode").length }, PROVIDER, 'SEARCH EPISODE TV');
                parseDetail(".episode").each(function (keyTv, itemTv) {
                    var textTv = parseDetail(itemTv).text();
                    var matchTv = textTv.toLowerCase().match(/s *([0-9]+) *\- *e([0-9]+)/i);
                    var season = matchTv ? matchTv[1] : 0;
                    var episode = matchTv ? matchTv[2] : 0;
                    var idEpisode = parseDetail(itemTv).attr("idepisode");
                    libs.log({ season: season, episode: episode }, PROVIDER, 'SEASON EPISODE');
                    if (season == movieInfo.season && episode == movieInfo.episode) {
                        idTv_1 = idEpisode;
                    }
                });
                if (!idTv_1) return [3, 5];
                bodyTv = qs.stringify({
                    idepisode: idTv_1,
                    _token: token
                });
                return [4, libs.request_post(ajaxTv, headers, bodyTv, true)];
            case 4:
                parseTv_1 = _a.sent();
                libs.log({ length: parseTv_1(".singlemv").length }, PROVIDER, 'TOKEN TV');
                parseTv_1(".singlemv").each(function (keyDetail, itemDetail) {
                    var id = parseTv_1(itemDetail).attr("data");
                    tokens.push(id);
                });
                _a.label = 5;
            case 5: return [3, 7];
            case 6:
                libs.log({ length: parseDetail(".singlemv").length }, PROVIDER, 'LENGTH MOVIE TOKEN');
                parseDetail(".singlemv").each(function (keyDetail, itemDetail) {
                    var id = parseDetail(itemDetail).attr("data");
                    tokens.push(id);
                });
                _a.label = 7;
            case 7:
                arrMap = tokens.map(function (idFilm) { return __awaiter(_this, void 0, void 0, function () {
                    var body, htmlEmbed, parseEmbed, iframe, source, source2, parse, arrSource, arrSource2;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                body = qs.stringify({
                                    m4u: idFilm,
                                    _token: csrfToken
                                });
                                return [4, libs.request_post(ajaxUrl, headers, body)];
                            case 1:
                                htmlEmbed = _a.sent();
                                parseEmbed = cheerio.load(htmlEmbed);
                                iframe = parseEmbed("iframe.video").attr("src");
                                if (!iframe) return [3, 3];
                                return [4, libs.embed_redirect(iframe, '', movieInfo, PROVIDER, callback)];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                libs.log({
                                    htmlEmbed: htmlEmbed,
                                    headers: headers,
                                    body: body,
                                    ajaxUrl: ajaxUrl
                                }, PROVIDER, 'HTML PARSE');
                                source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
                                source2 = source && source[2] ? source[2] + "]" : "[]";
                                source = source ? source[1] + "]" : "[]";
                                parse = [];
                                source = "parse = " + source;
                                eval(source);
                                libs.log(parse, PROVIDER, "PARSE");
                                arrSource = parse.map(function (direct) { return __awaiter(_this, void 0, void 0, function () {
                                    var file;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                file = direct.file;
                                                if (!file) return [3, 2];
                                                return [4, libs.embed_redirect(file, '', movieInfo, PROVIDER, callback)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrSource)];
                            case 4:
                                _a.sent();
                                parse = [];
                                source = "parse = " + source2;
                                eval(source);
                                libs.log(parse, PROVIDER, 'PARSE SOURCE 2');
                                arrSource2 = parse.map(function (direct) { return __awaiter(_this, void 0, void 0, function () {
                                    var file;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                file = direct.file;
                                                if (!file) return [3, 2];
                                                return [4, libs.embed_redirect(file, '', movieInfo, PROVIDER, callback)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrSource2)];
                            case 5:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 8:
                _a.sent();
                return [2];
        }
    });
}); };
