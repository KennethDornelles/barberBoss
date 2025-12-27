import { UpdateSettingsDto } from './dto/update-settings.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Settings } from './entities/settings.entity';
export declare class SettingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    get(): Promise<Settings>;
    update(updateSettingsDto: UpdateSettingsDto): Promise<Settings>;
    isWithinBusinessHours(date: Date): boolean;
    getDayName(dayNumber: number): string;
    private timeToMinutes;
    private cachedSettings;
    private lastCacheTime;
    private readonly CACHE_DURATION_MS;
    private getCachedSettings;
    refreshCache(): Promise<void>;
}
