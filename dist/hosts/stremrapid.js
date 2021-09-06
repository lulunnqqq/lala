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
hosts["vidembed"] = function (url, movieInfo, provider, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    var DOMAIN, HOST, htmlDetail, parseHtml, embeds, sources, sourceItem, source, parse, length_1, i, file, quality, _i, embeds_1, embedItem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                DOMAIN = 'https://vidembed.cc';
                HOST = 'VIDEMBED';
                return [4, libs.request_get(url, {})];
            case 1:
                htmlDetail = _a.sent();
                parseHtml = cheerio.load(htmlDetail);
                embeds = [];
                sources = htmlDetail.match(/sources *\: *([^\]]+)/im);
                sources = sources ? sources : [];
                libs.log(sources.length, HOST, 'SOURCE LENGTH');
                sourceItem = 1;
                _a.label = 2;
            case 2:
                if (!(sourceItem < sources.length)) return [3, 7];
                source = sources[sourceItem] ? sources[sourceItem] + "]" : "[]";
                parse = [];
                source = "parse = " + source;
                eval(source);
                libs.log(parse, HOST, 'SOURCES');
                length_1 = parse.length;
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < length_1)) return [3, 6];
                file = parse[i].file;
                quality = parse[i].label;
                if (!file) return [3, 5];
                return [4, libs.embed_redirect(file, quality ? quality.replace(' ', '') : '', movieInfo, provider, callback)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3, 3];
            case 6:
                sourceItem++;
                return [3, 2];
            case 7:
                libs.log(parseHtml('.linkserver').length, HOST, 'LINK SERVER LENGTH');
                parseHtml('.linkserver').each(function (key, item) {
                    var linkServer = parseHtml(item).attr('data-video');
                    if (linkServer) {
                        if (_.startsWith(linkServer, '/')) {
                            linkServer = 'https:' + linkServer;
                        }
                        embeds.push(linkServer);
                    }
                });
                libs.log(embeds, HOST, 'EMBEDS');
                _i = 0, embeds_1 = embeds;
                _a.label = 8;
            case 8:
                if (!(_i < embeds_1.length)) return [3, 11];
                embedItem = embeds_1[_i];
                return [4, libs.embed_redirect(embedItem, '', movieInfo, provider, callback, HOST)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                _i++;
                return [3, 8];
            case 11: return [2];
        }
    });
}); };
