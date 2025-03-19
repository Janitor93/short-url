import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

import { Url } from './url.entity';

@Injectable()
export class UrlRepository extends AbstractRepository<Url> {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {
    super(urlRepository);
  }
}
