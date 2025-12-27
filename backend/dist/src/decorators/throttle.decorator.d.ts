export declare const SkipThrottle: () => import("@nestjs/common").CustomDecorator<string>;
export declare const Throttle: (limit: number, ttl: number) => MethodDecorator & ClassDecorator;
export declare const ThrottleStrict: () => MethodDecorator & ClassDecorator;
export declare const ThrottleModerate: () => MethodDecorator & ClassDecorator;
export declare const ThrottleRelaxed: () => MethodDecorator & ClassDecorator;
