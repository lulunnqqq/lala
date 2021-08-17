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
    var domain, urlSearch, htmlSearch, parseSearch, link, embeds, htmlDetail, ajaxUrl, playerUrl, headers, a1984, di, body, htmlAjax, parseAjax_1, dataIds_1, arrMapDataId, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                domain = "https://w8.123movie.cc";
                urlSearch = domain + "/search?keyword=" + slugify(movieInfo.title, { lower: true, replacement: '+' });
                return [4, libs.request_get(urlSearch)];
            case 1:
                htmlSearch = _a.sent();
                parseSearch = cheerio.load(htmlSearch);
                link = '';
                parseSearch('.filmlist .item').each(function (keySearch, itemSearch) {
                    var title = parseSearch(itemSearch).find('.poster').attr('title');
                    var href = parseSearch(itemSearch).find('.poster').attr('href');
                    if (slugify(movieInfo.title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g }) == slugify(title, { lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g })) {
                        link = "" + domain + href;
                    }
                });
                if (!link) {
                    return [2];
                }
                embeds = [];
                return [4, libs.request_get(link)];
            case 2:
                htmlDetail = _a.sent();
                ajaxUrl = domain + "/ajax/";
                playerUrl = domain + "/players/";
                headers = {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'referer': link
                };
                if (!(movieInfo.type == 'movie')) return [3, 5];
                a1984 = htmlDetail.match(/A1984 *\: *\"([^\"]+)/i);
                a1984 = a1984 ? a1984[1] : '';
                di = htmlDetail.match(/di *\: *\"([^\"]+)/i);
                di = di ? di[1] : '';
                body = {
                    A1984: a1984,
                    di: di,
                };
                return [4, libs.request_post(ajaxUrl, headers, qs.stringify(body))];
            case 3:
                htmlAjax = _a.sent();
                parseAjax_1 = cheerio.load(htmlAjax);
                dataIds_1 = [];
                console.log(parseAjax_1('.episodes a').length, ajaxUrl, headers, body, htmlAjax, '------ 123moviescc EMBEDS ------');
                parseAjax_1('.episodes a').each(function (keyAjax, itemAjax) {
                    var dataId = parseAjax_1(itemAjax).attr('data-id');
                    if (dataId) {
                        dataIds_1.push(dataId);
                    }
                });
                console.log(dataIds_1, '--------- 123moviescc dataids');
                arrMapDataId = dataIds_1.map(function (dataIdItem) { return __awaiter(_this, void 0, void 0, function () {
                    var bodyDataId, htmlDataId, parseDataId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                bodyDataId = {
                                    ep: dataIdItem,
                                    img: ''
                                };
                                return [4, libs.request_post('https://w8.123movie.cc/player/', headers, "ep=" + dataIdItem + "&img=")];
                            case 1:
                                htmlDataId = _a.sent();
                                parseDataId = cheerio.load(htmlDataId);
                                console.log(parseDataId('iframe').length, playerUrl, headers, qs.stringify(bodyDataId), htmlDataId, ' -------- moviescc iframe');
                                parseDataId('iframe').each(function (keyDataId, itemDataId) {
                                    var urlIframe = parseDataId(itemDataId).attr('src');
                                    if (urlIframe) {
                                        embeds.push(urlIframe);
                                    }
                                });
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMapDataId)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                console.log(embeds, '--------- 123moviescc EMVBEDS ------------');
                arrMap = embeds.map(function (urlDetail) { return __awaiter(_this, void 0, void 0, function () {
                    var embed, fileSize, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(urlDetail, "-------- LOOP 123moviescc -------");
                                embed = urlDetail;
                                console.log(embed, "------------ 123moviescc  DIRECT EMBED");
                                if (!embed) return [3, 2];
                                return [4, libs.request_getFileSize(embed)];
                            case 1:
                                fileSize = _a.sent();
                                host = libs.string_getHost(embed);
                                console.log(embed, fileSize, host, "embed--------------------");
                                if (!fileSize) {
                                    if (hosts[host]) {
                                        hosts[host](embed, movieInfo, _.merge(config, { provider: "123Movies" }), callback);
                                    }
                                }
                                else {
                                    callback({
                                        file: embed,
                                        size: fileSize,
                                        host: host.toUpperCase(),
                                        provider: "123Movies"
                                    });
                                }
                                _a.label = 2;
                            case 2: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 6:
                _a.sent();
                return [2];
        }
    });
}); };
