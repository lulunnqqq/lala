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
libs.embed_redirect = function (embed, quality, movieInfo, provider, callback, host) { return __awaiter(_this, void 0, void 0, function () {
    var hostname, headersData, contentLength;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!embed) {
                    return [2];
                }
                hostname = libs.url_get_host(embed);
                libs.log({ hostname: hostname, embed: embed }, provider, 'EMBED HOST');
                if (embed.indexOf('.m3u8') != -1 || embed.indexOf('.hls') != -1) {
                    callback({
                        file: embed,
                        host: host ? host : hostname.toUpperCase(),
                        provider: provider,
                        quality: 'HLS',
                    });
                    return [2];
                }
                if (!hostname) {
                    return [2];
                }
                if (quality) {
                    callback({
                        file: embed,
                        quality: quality,
                        host: host ? host : hostname.toUpperCase(),
                        provider: provider,
                    });
                }
                if (hosts && hosts[hostname]) {
                    hosts[hostname](embed, movieInfo, provider, {}, callback);
                    return [2];
                }
                return [4, libs.request_head(embed, {})];
            case 1:
                headersData = _a.sent();
                contentLength = headersData['content-length'];
                if (contentLength > 100000000) {
                    callback({
                        file: embed,
                        size: contentLength,
                        host: host ? host : hostname.toUpperCase(),
                        provider: provider,
                    });
                }
                return [2];
        }
    });
}); };
libs.embed_parse_source = function (html) {
    var source = html.match(/sources *\: *([^\]]+)/i);
    source = source ? source[1] + "]" : "[]";
    var parse = [];
    source = "parse = " + source;
    eval(source);
    return parse;
};
