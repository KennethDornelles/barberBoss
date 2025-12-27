"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const dayjs_config_1 = __importDefault(require("../config/dayjs.config"));
class DateUtil {
    static now() {
        return (0, dayjs_config_1.default)().tz('America/Sao_Paulo');
    }
    static toLocalTimezone(date) {
        return (0, dayjs_config_1.default)(date).tz('America/Sao_Paulo');
    }
    static toUTC(date) {
        return (0, dayjs_config_1.default)(date).utc();
    }
    static formatBR(date) {
        return (0, dayjs_config_1.default)(date).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
    }
    static formatISO(date) {
        return (0, dayjs_config_1.default)(date).toISOString();
    }
    static isValid(date) {
        return (0, dayjs_config_1.default)(date).isValid();
    }
    static add(date, amount, unit) {
        return (0, dayjs_config_1.default)(date).add(amount, unit);
    }
    static subtract(date, amount, unit) {
        return (0, dayjs_config_1.default)(date).subtract(amount, unit);
    }
    static isBefore(date1, date2) {
        return (0, dayjs_config_1.default)(date1).isBefore((0, dayjs_config_1.default)(date2));
    }
    static isAfter(date1, date2) {
        return (0, dayjs_config_1.default)(date1).isAfter((0, dayjs_config_1.default)(date2));
    }
    static startOfDay(date) {
        return (0, dayjs_config_1.default)(date).tz('America/Sao_Paulo').startOf('day');
    }
    static endOfDay(date) {
        return (0, dayjs_config_1.default)(date).tz('America/Sao_Paulo').endOf('day');
    }
    static diff(date1, date2, unit) {
        return (0, dayjs_config_1.default)(date1).diff((0, dayjs_config_1.default)(date2), unit);
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map