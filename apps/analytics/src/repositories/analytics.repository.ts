import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { AbstractRepository } from '@app/common';

import { UrlStat } from '../entities/url-stat.entity';

@Injectable()
export class UrlStatRepository extends AbstractRepository<UrlStat> {
  constructor(
    @InjectRepository(UrlStat) private readonly analyticsRepository: Repository<UrlStat>,
  ) {
    super(analyticsRepository);
  }

  async increment(id: string): Promise<UrlStat> {
    const record = await this.analyticsRepository.findOneBy({ _id: new ObjectId(id) });
    return await this.analyticsRepository.save({ ...record, clicks: record.clicks + 1 });
  }
}
