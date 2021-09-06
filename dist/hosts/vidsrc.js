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
hosts["voe"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var uttf0, urlReal, htmlDetail, parseDetail, tokens, headers, arrMap;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uttf0 = function (uttp0) {
                    uttp0 = uttp0.join('');
                    uttp0 = uttp0.split('').reverse().join('');
                    ;
                    return atob(uttp0);
                };
                urlReal = url.replace('vidsrc', 'v2.vidsrc');
                return [4, libs.request_get(urlReal)];
            case 1:
                htmlDetail = _a.sent();
                parseDetail = cheerio.load(htmlDetail);
                tokens = [];
                parseDetail(".source").each(function (key, item) {
                    var token = parseDetail(item).attr("data-hash");
                    if (token) {
                        tokens.push(token);
                    }
                });
                headers = {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                };
                arrMap = tokens.map(function (token) { return __awaiter(_this, void 0, void 0, function () {
                    var urlToken, body, headerEmbed, urlSource, sourceData, urlLoc, sourceLoc, urlSrc, headerData, urlEmbed, result, embeds, _i, embeds_1, embed, dataVidStream, source, parse, length_1, i, file, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                urlToken = "https://v2.vidsrc.me/src/" + token;
                                body = qs.stringify({
                                    r: urlToken,
                                    d: 'vidsrc.xyz'
                                });
                                headerEmbed = {
                                    Host: 'v2.vidsrc.me',
                                    'upgrade-insecure-requests': 1,
                                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
                                    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                    'sec-fetch-site': 'same-origin',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-dest': 'iframe',
                                    'accept-language': 'vi-VN,vi;q=0.9',
                                };
                                urlSource = "https://v2.vidsrc.me/source/" + token;
                                headerEmbed.referer = urlSource;
                                return [4, libs.request_get(urlSource, headerEmbed)];
                            case 1:
                                sourceData = _a.sent();
                                urlLoc = sourceData.match(/src *\: *\'([^\']+)/i);
                                urlLoc = urlLoc ? urlLoc[1] : '';
                                if (!urlLoc) {
                                    return [2];
                                }
                                if (_.startsWith(urlLoc, '/')) {
                                    urlLoc = "https://v2.vidsrc.me" + urlLoc;
                                }
                                console.log(urlLoc, "------- VIDSRC URL LOC ------");
                                return [4, libs.request_get(urlLoc, headerEmbed)];
                            case 2:
                                sourceLoc = _a.sent();
                                urlSrc = sourceLoc.match(/src *\: *\'([^\']+)/i);
                                urlSrc = urlSrc ? urlSrc[1] : '';
                                if (!urlSrc) {
                                    return [2];
                                }
                                if (_.startsWith(urlSrc, '/')) {
                                    urlSrc = "https://v2.vidsrc.me" + urlSrc;
                                }
                                console.log(urlSrc, "------- VIDSRC URL urlSrc ------");
                                return [4, libs.request_head(urlSrc, headerEmbed, false)];
                            case 3:
                                headerData = _a.sent();
                                urlEmbed = headerData.url;
                                console.log(headerData, urlEmbed, urlSrc, '------------ HEADER EMBED VIDSRC -----------');
                                if (!urlEmbed) return [3, 8];
                                if (!(urlEmbed.indexOf("vidsrc.xyz/v") != -1)) return [3, 5];
                                urlEmbed = urlEmbed.replace("vidsrc.xyz/v", 'vidsrc.xyz/api/source');
                                console.log(urlEmbed, '----------- urlEmbed VidSRC.xyz');
                                return [4, libs.request_post(urlEmbed, headers, body, 'json')];
                            case 4:
                                result = _a.sent();
                                embeds = result && result.data ? result.data : [];
                                for (_i = 0, embeds_1 = embeds; _i < embeds_1.length; _i++) {
                                    embed = embeds_1[_i];
                                    console.log(embed, '---------- DIRECT VIDSRC -------');
                                    callback({
                                        file: embed.file,
                                        size: 0,
                                        host: "VidDirect",
                                        quality: embed.label,
                                        provider: config.provider
                                    });
                                }
                                return [3, 8];
                            case 5:
                                if (!(urlEmbed.indexOf("vidsrc.stream") != -1)) return [3, 7];
                                headerEmbed.referer = 'https://v2.vidsrc.me/';
                                return [4, libs.request_get(urlEmbed, {
                                        referer: 'https://v2.vidsrc.me/'
                                    })];
                            case 6:
                                dataVidStream = _a.sent();
                                source = dataVidStream.match(/sources *\: *([^\]]+)/i);
                                source = source ? source[1] + "]" : "[]";
                                parse = [];
                                source = "parse = " + source;
                                eval(source);
                                console.log(parse, "------------ SOURCES VidStream -------------");
                                length_1 = parse.length;
                                for (i = 0; i < length_1; i++) {
                                    file = parse[i].file;
                                    console.log(parse[i], "------------ SOURCE DETAIL VidStream -------------");
                                    callback({
                                        file: file,
                                        quality: 'HLS',
                                        host: "VidStream",
                                        provider: config.provider
                                    });
                                }
                                return [3, 8];
                            case 7:
                                console.log(urlEmbed, '---------- urlEmbed VIDSRC ---------');
                                host = libs.string_getHost(urlEmbed);
                                if (hosts[host]) {
                                    hosts[host](urlEmbed, movieInfo, _.merge(config, { provider: config.provider }), callback);
                                }
                                _a.label = 8;
                            case 8: return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrMap)];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };
