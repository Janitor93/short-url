import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';

import { Country } from '../entities/country.entity';

@Injectable()
export class CountryRepository extends AbstractRepository<Country> {
  constructor(
    @InjectRepository(Country) private readonly countryRepository: Repository<Country>,
  ) {
    super(countryRepository);
  }

  async findAndUpdate(country: string): Promise<void> {
    const data = await this.countryRepository.findOne({ where: { country }});
    if (data) {
      await this.countryRepository.update(data._id, { country: data.country, clicks: data.clicks + 1 });
    } else {
      await this.countryRepository.save({ country, clicks: data?.clicks + 1 || 1 });
    }
  }
}
