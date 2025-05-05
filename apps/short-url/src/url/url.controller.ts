import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { CurrentUser } from '@app/common';
import { ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

import { UrlService } from './url.service';
import { Url } from './url.entity';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Post()
  @ApiOperation({
    summary: 'Create shorten url',
    description: `Create shorten url and return url data.
    If token is valid then store the URL as a private link. Might be updated or other operation.
    If token is absent then store the URL as a guest link. Can't be updated later.`
  })
  @ApiHeader({ name: 'Authorization', description: 'Valid access token', required: false })
  @ApiResponse({
    status: 200,
    description: 'Returns URL information',
    example: {
      id: 'c0696d19-1757-4274-9890-0d3602dcc1fa',
      originalUrl: 'https://chess.com',
      code: 'Rr5MytH',
      userId: null,
      createdAt: '2025-05-05T09:52:33.398Z'
  },
  })
  @ApiResponse({
    status: 400,
    description: 'The reason why record could not been created',
    example: {
      statusCode: 400,
      message: 'Bad Request Exception'
    },
  })
  @UsePipes(new ValidationPipe())
  public async createShortUrl(
    @Body() shortUrlDto: CreateShortUrlDto,
    @CurrentUser('userId') userId: string,
  ): Promise<Url> {
    return await this.urlService.createShortUrl(shortUrlDto, userId);
  }

  @Get(':shortCode')
  @ApiOperation({
    summary: 'Gets URL information',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns URL information',
    example: {
      id: 'c0696d19-1757-4274-9890-0d3602dcc1fa',
      originalUrl: 'https://chess.com',
      code: 'Rr5MytH',
      userId: null,
      createdAt: '2025-05-05T09:52:33.398Z'
  },
  })
  @ApiResponse({
    status: 404,
    description: 'If the URL does not exist',
    example: {
      statusCode: 404,
      message: 'Not Found'
    },
  })
  public async getOriginalUrl(@Param('shortCode') shortCode: string) {
    const originalUrl = await this.urlService.getUrlInfo(shortCode);
    return originalUrl;
  }
}
