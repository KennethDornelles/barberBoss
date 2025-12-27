declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;
    ALLOWED_ORIGINS?: string;
    THROTTLE_TTL?: number;
    THROTTLE_LIMIT?: number;
    CORS_CREDENTIALS?: string;
    DEFAULT_BUSINESS_HOUR_START?: number;
    DEFAULT_BUSINESS_HOUR_END?: number;
    DEFAULT_APPOINTMENT_DURATION?: number;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
