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
libs.request_getRandomUserAgent = function () {
    var userAgent = [
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.59 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.113 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.89 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36"
    ];
    var random = _.random(0, userAgent.length - 1);
    return userAgent[random];
};
libs.send_tracking = function (link, status, method) { return __awaiter(_this, void 0, void 0, function () {
    var botToken, chat, message, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                botToken = "1393404165:AAH71U-CC4Z_OtaFHYk6IR8w6aNEd9XPjsU";
                chat = "-1001385365876";
                message = status + " - " + method + " - " + link;
                return [4, fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
                        headers: {
                            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        },
                        method: "POST",
                        body: qs.stringify({
                            text: message,
                            chat_id: chat,
                            parse_mode: 'html'
                        })
                    })];
            case 1:
                res = _a.sent();
                return [2];
        }
    });
}); };
libs.request_head = function (url, headers, isMap) {
    if (url === void 0) { url = ""; }
    if (headers === void 0) { headers = {}; }
    if (isMap === void 0) { isMap = true; }
    return __awaiter(_this, void 0, void 0, function () {
        var headerCustomize, res, headerResponse, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    headerCustomize = headers;
                    headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
                    headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
                    return [4, fetch(url, {
                            credentials: 'same-origin',
                            headers: headerCustomize,
                            method: "HEAD",
                        })];
                case 1:
                    res = _a.sent();
                    if (isMap) {
                        headerResponse = res.headers.map;
                        return [2, headerResponse];
                    }
                    return [2, res];
                case 2:
                    e_1 = _a.sent();
                    console.log("error_request_head", e_1);
                    return [2, 0];
                case 3: return [2];
            }
        });
    });
};
libs.request_get = function (url, headers, type, redirect) {
    if (headers === void 0) { headers = {}; }
    if (type === void 0) { type = ""; }
    if (redirect === void 0) { redirect = "follow"; }
    return __awaiter(_this, void 0, void 0, function () {
        var headerCustomize, res, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    headerCustomize = headers;
                    headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
                    headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
                    return [4, fetch(url, { headers: headerCustomize, redirect: redirect })];
                case 1:
                    res = _a.sent();
                    if (!(type === "" || type === "html")) return [3, 3];
                    return [4, res.text()];
                case 2: return [2, _a.sent()];
                case 3:
                    if (type === "url") {
                        console.log(res, "----------- RES ---------");
                        return [2, res.url];
                    }
                    return [4, res.json()];
                case 4: return [2, _a.sent()];
                case 5:
                    e_2 = _a.sent();
                    console.log("error_request_get", e_2);
                    return [2, ""];
                case 6: return [2];
            }
        });
    });
};
libs.request_put = function (url, headers, body, type) {
    if (headers === void 0) { headers = {}; }
    if (type === void 0) { type = ""; }
    return __awaiter(_this, void 0, void 0, function () {
        var res, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4, fetch(url, {
                            headers: headers,
                            method: "PUT",
                            body: body
                        })];
                case 1:
                    res = _a.sent();
                    if (!(type === "" || type === "html")) return [3, 3];
                    return [4, res.text()];
                case 2: return [2, _a.sent()];
                case 3: return [4, res.json()];
                case 4: return [2, _a.sent()];
                case 5:
                    e_3 = _a.sent();
                    console.log("error_request_post", e_3);
                    return [2, ""];
                case 6: return [2];
            }
        });
    });
};
libs.request_post = function (url, headers, body, type) {
    if (headers === void 0) { headers = {}; }
    if (type === void 0) { type = ""; }
    return __awaiter(_this, void 0, void 0, function () {
        var headerCustomize, res, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    headerCustomize = headers;
                    headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
                    headerCustomize['__RN_DEBUGGER_SET_HEADER_REQUEST_user-agent'] = libs.request_getRandomUserAgent();
                    return [4, fetch(url, {
                            headers: headerCustomize,
                            method: "POST",
                            body: body
                        })];
                case 1:
                    res = _a.sent();
                    if (!(type === "" || type === "html")) return [3, 3];
                    return [4, res.text()];
                case 2: return [2, _a.sent()];
                case 3: return [4, res.json()];
                case 4: return [2, _a.sent()];
                case 5:
                    e_4 = _a.sent();
                    console.log("error_request_post", e_4);
                    return [2, ""];
                case 6: return [2];
            }
        });
    });
};
libs.request_detect = function (url, headers, key) {
    if (headers === void 0) { headers = {}; }
    if (key === void 0) { key = "sources_captcha"; }
    return __awaiter(_this, void 0, void 0, function () {
        var host, headersSetup, headersConfig, mergeHeaders, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    host = libs.string_getHost(url);
                    headersSetup = _.merge({
                        "Connection": "keep-alive",
                        "Upgrade-Insecure-Requests": "1",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.8",
                    }, headers);
                    console.log(sourceCaptcha, host, "--------------- HOST CAPTCHA -------------");
                    if (!sourceCaptcha[host]) {
                        console.log(host, "----------sourceCaptcha-----------");
                        sourceCaptcha[host] = {
                            is_verify: false,
                            url: url,
                            headers: {}
                        };
                        return [2, headersSetup];
                    }
                    if (sourceCaptcha[host]["is_verify"] === false) {
                        return [2, headersSetup];
                    }
                    headersConfig = sourceCaptcha[host]["headers"];
                    mergeHeaders = _.merge(headersSetup, headersConfig);
                    return [4, libs.request_get(url, mergeHeaders)];
                case 1:
                    html = _a.sent();
                    if (!html || html.indexOf("captcha-bypass") !== -1) {
                        sourceCaptcha[host] = {
                            is_verify: false,
                            url: url,
                            headers: {}
                        };
                        return [2, headersSetup];
                    }
                    return [2, mergeHeaders];
            }
        });
    });
};
libs.request_getCookie = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var cookies, cookieS, item;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, cookieM.get(url)];
            case 1:
                cookies = _a.sent();
                cookieS = "";
                for (item in cookies) {
                    if (cookies[item].name && cookies[item].value) {
                        cookieS += cookies[item].name + "=" + cookies[item].value + "; ";
                    }
                }
                return [2, cookieS];
        }
    });
}); };
libs.request_getcaptcha = function (url, headers, type, key) {
    if (headers === void 0) { headers = {}; }
    if (type === void 0) { type = ""; }
    if (key === void 0) { key = "sources_captcha"; }
    return __awaiter(_this, void 0, void 0, function () {
        var detect, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, libs.request_detect(url, headers, key)];
                case 1:
                    detect = _a.sent();
                    console.log(detect, "---------------- HEADER GET CAPTCHA --------------");
                    return [4, libs.request_get(url, detect)];
                case 2:
                    html = _a.sent();
                    if (type === "" || type === "html") {
                        return [2, html];
                    }
                    return [2, cheerio.load(html)];
            }
        });
    });
};
libs.request_postcaptcha = function (url, body, headers, type, key) {
    if (body === void 0) { body = {}; }
    if (headers === void 0) { headers = {}; }
    if (type === void 0) { type = ""; }
    if (key === void 0) { key = "sources_captcha"; }
    return __awaiter(_this, void 0, void 0, function () {
        var detect, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, libs.request_detect(url, headers)];
                case 1:
                    detect = _a.sent();
                    return [4, libs.request_post(url, body, detect)];
                case 2:
                    html = _a.sent();
                    if (type === "" || type === "html") {
                        return [2, html];
                    }
                    return [2, cheerio.load(html)];
            }
        });
    });
};
libs.request_getFileSize = function (url, headers) {
    if (url === void 0) { url = ""; }
    if (headers === void 0) { headers = {}; }
    return __awaiter(_this, void 0, void 0, function () {
        var headerCustomize, res, headerResponse, contentLength, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    headerCustomize = headers;
                    headerCustomize['user-agent'] = libs.request_getRandomUserAgent();
                    return [4, fetch(url, {
                            headers: headerCustomize,
                            method: "HEAD"
                        })];
                case 1:
                    res = _a.sent();
                    headerResponse = res.headers.map;
                    contentLength = headerResponse["Content-Length"] || headerResponse["content-length"];
                    return [2, contentLength || 0];
                case 2:
                    e_5 = _a.sent();
                    console.log("error_request_head", e_5);
                    return [2, 0];
                case 3: return [2];
            }
        });
    });
};
libs.request_parseOload = function (embed, movieInfo, config, callback) { return __awaiter(_this, void 0, void 0, function () {
    function x_dfjsd45(_0x5196x2) {
        var _0x5196x3 = _0x904e[0];
        var _0x5196x4 = _0x904e[1];
        for (var _0x5196x5 = 0; _0x5196x5 < _0x5196x2; _0x5196x5++) {
            _0x5196x3 += _0x5196x4[_0x904e[5]](Math[_0x904e[4]](Math[_0x904e[2]]() * _0x5196x4[_0x904e[3]]));
        }
        ;
        return _0x5196x3;
    }
    function x7_pw481e(_0x5196x3) {
        return libs.string_btoa(_0x5196x3);
    }
    var _0x904e, _0x5196xa, _0x5196xb, _0x5196xc, _0x5196xd, playId, loadSource, parseCinemaEmbed, urlCinema, bodyCinema, htmlCinema, token, parseCinema, sourceCinema, arrCinema;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _0x904e = ["", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\x72\x61\x6E\x64\x6F\x6D", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x63\x6C\x69\x63\x6B", "\x23\x70\x6C\x61\x79", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x75\x73\x65\x72\x41\x67\x65\x6E\x74", "\x4C\x6F\x61\x64\x69\x6E\x67\x20\x76\x69\x64\x65\x6F\x2E\x2E\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x2E", "\x74\x65\x78\x74", "\x2E\x6C\x6F\x61\x64\x69\x6E\x67", "\x6F\x72\x69\x67\x69\x6E\x61\x6C\x45\x76\x65\x6E\x74", "\x2A", "\x70\x61\x67\x65\x58", "\x70\x61\x67\x65\x59", "\x76\x61\x6C", "\x23\x70\x6C\x61\x79\x49\x44", "\x73\x75\x62\x6D\x69\x74", "\x23\x70\x6C\x61\x79\x46\x6F\x72\x6D", "\x6F\x6E"];
                _0x5196xa = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
                _0x5196xb = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
                _0x5196xc = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
                _0x5196xd = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
                playId = _0x5196xc + _0x904e[0] + _0x5196xa + _0x904e[0] + x_dfjsd45(_0x5196xa) + _0x904e[0] + x7_pw481e("[object MouseEvent]" + _0x904e[14] + 642 + _0x904e[14] + 150) + _0x904e[0] + x_dfjsd45(_0x5196xb) + _0x904e[0] + _0x5196xb + _0x904e[0] + _0x5196xd;
                console.log(playId, "---------------  playID ------------");
                loadSource = "https://oload.party/loadsource.php";
                return [4, libs.request_get(embed, {
                        "user-agent": libs.request_getRandomUserAgent()
                    })];
            case 1:
                parseCinemaEmbed = _a.sent();
                parseCinemaEmbed = cheerio.load(parseCinemaEmbed);
                urlCinema = parseCinemaEmbed("#playForm").attr("action");
                bodyCinema = "playID=" + playId;
                console.log("------- EZWATCHFREE DETECT -----------", embed, urlCinema);
                return [4, libs.request_post(urlCinema, {
                        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                        "user-agent": libs.request_getRandomUserAgent()
                    }, bodyCinema)];
            case 2:
                htmlCinema = _a.sent();
                token = htmlCinema.match(/token *\= *\"([^\"]+)/i);
                token = token ? token[1] : "";
                parseCinema = cheerio.load(htmlCinema);
                sourceCinema = [];
                parseCinema(".item").each(function (keyCinema, itemCinema) {
                    var server = parseCinema(itemCinema).attr("data-server");
                    var serverId = parseCinema(itemCinema).attr("data-server-id");
                    if (server && serverId) {
                        sourceCinema.push(loadSource + "?server=" + server + "&id=" + serverId + "&token=" + token);
                    }
                });
                console.log(sourceCinema, "-------------  SOURCE CINEMA EMBED ---------");
                arrCinema = sourceCinema.map(function (itemCinema) { return __awaiter(_this, void 0, void 0, function () {
                    var htmlLoadSource, parseLoadSource, iframeLoadSource, host;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, libs.request_get(itemCinema, {})];
                            case 1:
                                htmlLoadSource = _a.sent();
                                parseLoadSource = cheerio.load(htmlLoadSource);
                                iframeLoadSource = parseLoadSource("iframe").attr("src");
                                console.log(iframeLoadSource, "-------------  EMBED LOAD SOURCE ---------");
                                if (iframeLoadSource) {
                                    host = libs.string_getHost(iframeLoadSource);
                                    if (hosts[host]) {
                                        hosts[host](iframeLoadSource, movieInfo, _.merge(config, { provider: config.provider }), callback);
                                    }
                                }
                                return [2];
                        }
                    });
                }); });
                return [4, Promise.all(arrCinema)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
