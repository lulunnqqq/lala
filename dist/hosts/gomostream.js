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
hosts["gomostream"] = function (url, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    function _86x876T(s) {
        return s.split("");
    }
    function _M29xM7(r) {
        return r.reverse();
    }
    function _23Sx87(n) {
        return n.join("");
    }
    function _tsd_tsd_ds(s) {
        var _78x36m = s;
        var _63jxx127 = _78x36m.slice(slice1, slice2);
        var _566Ox16 = _86x876T(_63jxx127);
        var _0x28W = _M29xM7(_566Ox16);
        return _23Sx87(_0x28W) + key1 + key2;
    }
    var html, tc, _token, secret, key1, key2, slice, slice1, slice2, headers, body, urldecode, results, _i, results_1, embed, fileSize, host;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, libs.request_get(url)];
            case 1:
                html = _a.sent();
                tc = html.match(/var *tc *= *\'([^\']+)/i);
                tc = tc ? tc[1] : '';
                _token = html.match(/_token *\" *\: *\"([^\"]+)/i);
                _token = _token ? _token[1] : '';
                console.log(tc, _token, html, "---------------- GOMOSTREAM TOKEN ----------");
                secret = html.match(/[A-z0-9_]*\) *\+ *\"([0-9]+)\" *\+ *\"([0-9]+)\"\;/i);
                key1 = secret ? secret[1] : '';
                key2 = secret ? secret[2] : '';
                slice = html.match(/.slice\(([0-9]+) *\, *([0-9]+)/i);
                slice1 = slice ? slice[1] : 0;
                slice2 = slice ? slice[2] : 0;
                console.log(key1, key2, slice1, slice2, "---------------- GOMOSTREAM KEY ----------");
                headers = {
                    'x-token': _tsd_tsd_ds(tc),
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                };
                body = qs.stringify({
                    tokenCode: tc,
                    _token: _token,
                });
                urldecode = "https://gomo.to/decoding_v3.php";
                return [4, libs.request_post(urldecode, headers, body, 'json')];
            case 2:
                results = _a.sent();
                console.log(headers, body, urldecode, results, "------------- GOMOSTREAM AJAX REQUEST -------");
                results = results ? results : [];
                _i = 0, results_1 = results;
                _a.label = 3;
            case 3:
                if (!(_i < results_1.length)) return [3, 6];
                embed = results_1[_i];
                if (!embed) return [3, 5];
                return [4, libs.request_getFileSize(embed)];
            case 4:
                fileSize = _a.sent();
                host = libs.string_getHost(embed);
                console.log(embed, fileSize, host, "embed--------------------");
                if (!fileSize) {
                    if (hosts[host]) {
                        hosts[host](embed, movieInfo, _.merge(config, { provider: config.provider }), callback);
                    }
                }
                else {
                    callback({
                        file: embed,
                        size: fileSize,
                        host: 'GomoStream',
                        provider: config.provider
                    });
                }
                _a.label = 5;
            case 5:
                _i++;
                return [3, 3];
            case 6: return [2];
        }
    });
}); };
