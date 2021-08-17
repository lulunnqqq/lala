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
    var url, html, parse, link, htmlDetail, parseDetail_1, sources_1, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "http://extramovies.shop/?s=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(url, {})];
            case 1:
                html = _a.sent();
                parse = cheerio.load(html);
                link = "";
                console.log(parse(".imag").length, "--------------- EXTRAMOVIE SEARCH -----------");
                parse(".imag").each(function (key, item) {
                    var href = parse(item).find(".entry-title a").attr("href");
                    var title = parse(item).find(".entry-title a").attr("title");
                    var titleSlug = slugify(title, { lower: true, replacement: '-' });
                    var movieTitleSlug = slugify(movieInfo.title, { lower: true, replacement: '-' });
                    console.log(href, title, titleSlug, movieTitleSlug, "--------------- EXTRAMOVIE SEARCH INFO -----------");
                    if (movieInfo.type == "movie") {
                        console.log(titleSlug.indexOf(movieTitleSlug) != -1, titleSlug.indexOf(movieInfo.year) != -1, "--------------- EXTRAMOVIE SEARCH INFO MOVIES -----------");
                        if (titleSlug.indexOf(movieTitleSlug) != -1 && titleSlug.indexOf(movieInfo.year) != -1) {
                            link = href;
                        }
                    }
                    if (movieInfo.type == "tv") {
                        var seasonE = "season-" + movieInfo.season + "-episode-" + movieInfo.episode;
                        console.log(titleSlug.indexOf(movieTitleSlug) != -1, titleSlug.indexOf(seasonE) != -1, "--------------- EXTRAMOVIE SEARCH INFO TV -----------");
                        if (titleSlug.indexOf(movieTitleSlug) != -1 && titleSlug.indexOf(seasonE) != -1) {
                            link = href;
                        }
                    }
                });
                console.log(link, "---------- EXTRAMOVIE LINK ----------");
                if (!(link != "")) return [3, 4];
                return [4, libs.request_get(link, {})];
            case 2:
                htmlDetail = _a.sent();
                parseDetail_1 = cheerio.load(htmlDetail);
                sources_1 = [];
                console.log(parseDetail_1(".ttdbox").length, "---------- EXTRAMOVIE PARSE EMBED ----------");
                parseDetail_1(".ttdbox").each(function (keyDetail, itemDetail) {
                    parseDetail_1(itemDetail).find("a").each(function (keyA, itemA) {
                        var href = "http://extramovies.shop" + parseDetail_1(itemA).attr("href");
                        if (href && href.indexOf("download.php") == -1) {
                            sources_1.push(href);
                        }
                    });
                });
                console.log(sources_1, "---------- EXTRAMOVIE sources ----------");
                arrMap = sources_1.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var htmlIframe, parseHtml, iframe, fileSize, host, userAgent_1, headersMirror, htmlMirrorace, parseMirrorace_1, sourceMirrorace_1, arrMirror;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 8];
                                return [4, libs.request_get(embed, {})];
                            case 1:
                                htmlIframe = _a.sent();
                                parseHtml = cheerio.load(htmlIframe);
                                iframe = parseHtml("iframe").attr("SRC") || parseHtml("iframe").attr("src");
                                console.log(iframe, "iframe--------------------");
                                if (!iframe) return [3, 8];
                                return [4, libs.request_getFileSize(iframe)];
                            case 2:
                                fileSize = _a.sent();
                                host = libs.string_getHost(iframe);
                                console.log(iframe, fileSize, host, "embed--------------------");
                                if (!(fileSize == 0)) return [3, 7];
                                if (!(iframe.indexOf("mirrorace") != -1)) return [3, 5];
                                userAgent_1 = libs.request_getRandomUserAgent();
                                headersMirror = {
                                    "user-agent": userAgent_1
                                };
                                return [4, libs.request_get(iframe, headersMirror)];
                            case 3:
                                htmlMirrorace = _a.sent();
                                parseMirrorace_1 = cheerio.load(htmlMirrorace);
                                sourceMirrorace_1 = [];
                                console.log(parseMirrorace_1(".uk-active").length, "----- EXTRAMOVIE PARSE MIRROR --------");
                                parseMirrorace_1(".play-video").each(function (keyMirror, itemMirror) {
                                    var linkMirror = parseMirrorace_1(itemMirror).attr("data-link");
                                    var fileMirror = parseMirrorace_1(itemMirror).attr("data-file");
                                    var t = parseMirrorace_1(itemMirror).attr("data-t");
                                    sourceMirrorace_1.push({
                                        link: linkMirror,
                                        file: fileMirror,
                                        t: t
                                    });
                                });
                                console.log(sourceMirrorace_1, "----- EXTRAMOVIE SOURCE MIRROR --------");
                                arrMirror = sourceMirrorace_1.map(function (infoMirror) { return __awaiter(_this, void 0, void 0, function () {
                                    var urlGetLink, body, resultMirror, hostMirror;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                urlGetLink = "https://mirrorace.com/ajax/embed_link";
                                                body = "file=" + infoMirror.file + "&link=" + infoMirror.link + "&t=" + infoMirror.t;
                                                return [4, libs.request_post(urlGetLink, {
                                                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                                                        "x-requested-with": "XMLHttpRequest",
                                                        "user-agent": userAgent_1,
                                                        "origin": "https://mirrorace.com"
                                                    }, body, "json")];
                                            case 1:
                                                resultMirror = _a.sent();
                                                console.log(resultMirror, body, "-------------- EXTRAMOVIE EMBED MIRROR --------");
                                                if (resultMirror.msg) {
                                                    hostMirror = libs.string_getHost(resultMirror.msg);
                                                    if (hosts[hostMirror]) {
                                                        hosts[hostMirror](resultMirror.msg, movieInfo, _.merge(config, { provider: "ExtraMovies" }), callback);
                                                    }
                                                }
                                                return [2];
                                        }
                                    });
                                }); });
                                return [4, Promise.all(arrMirror)];
                            case 4:
                                _a.sent();
                                return [3, 6];
                            case 5:
                                if (hosts[host]) {
                                    console.log(_.merge(config, { provider: "EXTRAMOVIE" }), "---------- config extra movies---------");
                                    hosts[host](iframe, movieInfo, _.merge(config, { provider: "ExtraMovies" }), callback);
                                }
                                _a.label = 6;
                            case 6: return [3, 8];
                            case 7:
                                callback({
                                    file: iframe,
                                    size: fileSize,
                                    host: host.toUpperCase(),
                                    provider: "ExtraMovies"
                                });
                                _a.label = 8;
                            case 8: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [2];
        }
    });
}); };
