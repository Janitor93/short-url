import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

import { Analytics } from './analytics.entity';

@Injectable()
export class AnalyticsRepository extends AbstractRepository<Analytics> {
  constructor(
    @InjectRepository(Analytics) private readonly analyticsRepository: Repository<Analytics>,
  ) {
    super(analyticsRepository);
  }
}
