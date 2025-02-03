import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
} from '@nestjs/common';

import { UrlService } from './url.service';
import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  public async createShortUrl(
    @Body() shortUrlDto: CreateShortUrlDto,
  ): Promise<Url> {
    return await this.urlService.createShortUrl(shortUrlDto);
  }

  @Get()
  public getOriginalUrl() {
    return this.urlService.getOriginalUrl();
  }
}
