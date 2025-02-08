import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
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

  @Get(':shortCode')
  public async getOriginalUrl(@Param('shortCode') shortCode: string) {
    const originalUrl = await this.urlService.getUrlInfo(shortCode);
    return originalUrl;
  }
}
