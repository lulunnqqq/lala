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
    var domain, urlSearch, htmlSearch, parseSearch, link, detailHtml, parseDetail, year, embeds, arrMapSource;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://losmovies.life";
                urlSearch = domain + "/movies-search?q=" + slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = '';
                console.log(parseSearch('.showEntityMovie').length, urlSearch, '--------- LOSMOVIE SEARCH -----------');
                parseSearch('.showEntityMovie').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.showRowText').text();
                    var href = parseSearch(itemSearch).find('.showRowImage a').attr('href');
                    console.log(title, slugify(movieInfo.title, { lower: true }), slugify(title.trim(), { lower: true }), '--------- LOSMOVIE MATCHING -----------');
                    if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                        link = href;
                    }
                });
                console.log(link, '---------- LOSMOVIE LINK ');
                if (!link) {
                    return [2];
                }
                link = "" + domain + link;
                return [4, libs.request_get(link)];
            case 2:
                detailHtml = _a.sent();
                parseDetail = cheerio.load(detailHtml);
                year = parseDetail('.showValueRelease').text();
                console.log(year, '---------- LOSMOVIE YEAR ');
                if (movieInfo.type == 'movie' && year != movieInfo.year) {
                    return [2];
                }
                embeds = [];
                if (movieInfo.type == 'tv') {
                    console.log("td[data-season=" + movieInfo.season + "][data-serie=" + movieInfo.episode + "]", parseDetail("td[data-season=" + movieInfo.season + "][data-serie=" + movieInfo.episode + "]").length, '---------- LOSMOVIE TV SEASON ');
                    parseDetail("td[data-season=" + movieInfo.season + "][data-serie=" + movieInfo.episode + "]").each(function (keyTv, itemTv) {
                        var embed = parseDetail(itemTv).text();
                        console.log(embed, '------ LOSMOVIE EMBED');
                        if (embed) {
                            embeds.push(embed);
                        }
                    });
                }
                else {
                    console.log(parseDetail('.linkHiddenUrl').length, '------ LOSMOVIE MOVIE');
                    parseDetail('.linkHiddenUrl').each(function (keyMovie, itemMovie) {
                        var embed = parseDetail(itemMovie).text();
                        if (embed) {
                            embeds.push(embed);
                        }
                    });
                }
                console.log(embeds, '------ LOSMOVIE EMBEDS');
                arrMapSource = embeds.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (fileSize == 0) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "LOSMOVIES" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "LOSMOVIES"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMapSource)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
