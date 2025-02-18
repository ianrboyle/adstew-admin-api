import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { CustomLogDto } from './dtos/custom-log-dto';
import { CustomLog } from './custom-log.entity';
@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(CustomLog) private repo: Repository<CustomLog>,
  ) {}
  async log(customLogDto: CustomLogDto) {
    if (customLogDto.message) {
      const customLog = this.repo.create(customLogDto);
      return await this.repo.save(customLog);
    }
  }
}
