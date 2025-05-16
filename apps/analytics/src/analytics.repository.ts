import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AbstractRepository } from '@app/common';

import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsRepository extends AbstractRepository<Analytics> {
  constructor(
    @InjectRepository(Analytics) private readonly analyticsRepository: Repository<Analytics>,
  ) {
    super(analyticsRepository);
  }

  async increment(id: string) {
    const record = await this.analyticsRepository.findOneBy({ _id: new ObjectId(id) });
    await this.analyticsRepository.save({ ...record, clicks: record.clicks + 1 });
  }
}
