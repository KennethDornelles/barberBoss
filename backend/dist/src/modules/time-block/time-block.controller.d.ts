import { TimeBlockService } from './time-block.service';
import { CreateTimeBlockDto } from './dto/create-time-block.dto';
import { UpdateTimeBlockDto } from './dto/update-time-block.dto';
export declare class TimeBlockController {
    private readonly timeBlockService;
    constructor(timeBlockService: TimeBlockService);
    create(createTimeBlockDto: CreateTimeBlockDto): Promise<import(".").TimeBlock>;
    findAll(): Promise<import(".").TimeBlock[]>;
    findByDateRange(startDate: string, endDate: string): Promise<import(".").TimeBlock[]>;
    findOne(id: string): Promise<import(".").TimeBlock>;
    update(id: string, updateTimeBlockDto: UpdateTimeBlockDto): Promise<import(".").TimeBlock>;
    remove(id: string): Promise<void>;
}
