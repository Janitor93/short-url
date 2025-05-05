import { Controller, Get, Param, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UrlService } from '../url/url.service';

@Controller({
  version: VERSION_NEUTRAL,
})
export class GlobalController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  @ApiOperation({
    summary: 'Redirects from short URL to original URL',
  })
  @ApiResponse({
    status: 301,
    description: 'Redirection to original URL',
  })
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.getOriginalUrl(shortCode);
    return res.redirect(301, url);
  }
}
