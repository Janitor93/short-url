import { Controller, Get, Param, Res, VERSION_NEUTRAL } from '@nestjs/common';
import { Response } from 'express';

import { UrlService } from '../url/url.service';

@Controller({
  version: VERSION_NEUTRAL,
})
export class GlobalController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.getOriginalUrl(shortCode);
    return res.redirect(301, url);
  }
}
