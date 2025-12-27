"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottleRelaxed = exports.ThrottleModerate = exports.ThrottleStrict = exports.Throttle = exports.SkipThrottle = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const SkipThrottle = () => (0, common_1.SetMetadata)('skipThrottle', true);
exports.SkipThrottle = SkipThrottle;
const Throttle = (limit, ttl) => (0, throttler_1.Throttle)({ default: { limit, ttl } });
exports.Throttle = Throttle;
const ThrottleStrict = () => (0, throttler_1.Throttle)({ strict: { ttl: 60000, limit: 5 } });
exports.ThrottleStrict = ThrottleStrict;
const ThrottleModerate = () => (0, throttler_1.Throttle)({ moderate: { ttl: 60000, limit: 30 } });
exports.ThrottleModerate = ThrottleModerate;
const ThrottleRelaxed = () => (0, throttler_1.Throttle)({ relaxed: { ttl: 60000, limit: 100 } });
exports.ThrottleRelaxed = ThrottleRelaxed;
//# sourceMappingURL=throttle.decorator.js.map