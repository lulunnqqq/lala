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
    var domain, url, htmlSearch, parseSearch, link, searchInfos, arrMovieMap, detailHtml, parseDetailHtml, embeds, appMapEmbed;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://www.putlockers.gg";
                url = domain + "/search/" + slugify(movieInfo.title, { lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g });
                return [4, libs.request_get(url)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = "";
                searchInfos = [];
                console.log(url, parseSearch('.ml-mask').length, '------ PUTLOCKER-CR Search INfo ------');
                parseSearch('.ml-mask').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.mli-info h2').text();
                    var season = title.match(/\- *season *([0-9]+)/i);
                    season = season ? season[1] : 0;
                    if (season) {
                        title = title.replace(/\- *season *[0-9]+/i, '').trim();
                    }
                    var movieId = parseSearch(itemSearch).attr('data-id');
                    console.log(title, season, movieId, '------ PUTLOCKER-CR Movie Info');
                    if (movieId) {
                        if (slugify(movieInfo.title, { lower: true }) == slugify(title.trim(), { lower: true })) {
                            if (movieInfo.type == 'tv' && season == movieInfo.season) {
                                searchInfos.push(movieId);
                            }
                            else {
                                searchInfos.push(movieId);
                            }
                        }
                    }
                });
                console.log(searchInfos, '------- PUTLOCKER_CR Search Info ------');
                arrMovieMap = searchInfos.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                    var urlSearchInfo, dataSearchResponse, year, href;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlSearchInfo = domain + "/movie_get_info/" + id;
                                return [4, libs.request_get(urlSearchInfo, {}, 'json')];
                            case 1:
                                dataSearchResponse = _a.sent();
                                year = dataSearchResponse.data ? dataSearchResponse.data.release : '';
                                href = dataSearchResponse.data ? dataSearchResponse.data.link_url : '';
                                console.log(dataSearchResponse, '----- PUTLOCKER DATA SEARCH RESPONSE ----');
                                console.log(urlSearchInfo, year, href, '------- PUTLOCKER MOVIE ------');
                                if (movieInfo.type == 'movie' && year == movieInfo.year) {
                                    link = href;
                                }
                                else {
                                    link = href;
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMovieMap)];
            case 2:
                _a.sent();
                console.log(link, '----- PUTLOCKER-CR LINK');
                if (!link) {
                    return [2];
                }
                link = "" + domain + link;
                return [4, libs.request_get(link)];
            case 3:
                detailHtml = _a.sent();
                parseDetailHtml = cheerio.load(detailHtml);
                embeds = [];
                if (movieInfo.type == 'movie') {
                    console.log(parseDetailHtml('.btn-eps').length, '----- PUTLOCKER-CR BTN EPS----- ');
                    parseDetailHtml('.btn-eps').each(function (keyDetail, itemDetail) {
                        var urlEmbed = parseDetailHtml(itemDetail).attr('data-file');
                        console.log(urlEmbed, '------- PUTLOCKER-CR EMBEDS ----- ');
                        if (urlEmbed) {
                            embeds.push(urlEmbed);
                        }
                    });
                }
                else {
                    console.log(parseDetailHtml('.btn-eps').length, '----- PUTLOCKER-CR BTN EPS----- ');
                    parseDetailHtml('.btn-eps').each(function (keyDetail, itemDetail) {
                        var episode = parseDetailHtml(itemDetail).text();
                        episode = episode.match(/episode *([0-9]+)/i);
                        episode = episode ? episode[1] : 0;
                        var urlEmbed = parseDetailHtml(itemDetail).attr('data-file');
                        console.log(episode, urlEmbed, '----- PUTLOCKER-CR EMBEDS----- ');
                        if (urlEmbed && episode == movieInfo.episode) {
                            embeds.push(urlEmbed);
                        }
                    });
                }
                ;
                appMapEmbed = embeds.map(function (embed) { return __awaiter(_this, void 0, void 0, function () {
                    var fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "PUTLOCKER-CR" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "PUTLOCKER-CR"
                                    });
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(appMapEmbed)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); };
