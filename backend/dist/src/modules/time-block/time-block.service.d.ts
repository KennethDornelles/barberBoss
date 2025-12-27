import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { TimeBlock } from './entities/time-block.entity';
export declare class TimeBlockService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createTimeBlockDto: CreateTimeBlockDto): Promise<TimeBlock>;
    findAll(): Promise<TimeBlock[]>;
    findOne(id: string): Promise<TimeBlock>;
    findByDateRange(start: Date, end: Date): Promise<TimeBlock[]>;
    isBlocked(startsAt: Date, endsAt: Date): Promise<boolean>;
    getBlockInfo(startsAt: Date, endsAt: Date): Promise<TimeBlock | null>;
    update(id: string, updateTimeBlockDto: UpdateTimeBlockDto): Promise<TimeBlock>;
    remove(id: string): Promise<void>;
}
