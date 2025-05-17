import { Injectable, GatewayTimeoutException, Inject, HttpException } from '@nestjs/common';
import { HttpService, } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

import { GeoIpResponse } from '../interfaces';

@Injectable()
export class GeoIpService {
  private apiUrl: string = process.env.GEO_IP_URL;

  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getIpData(ip: string): Promise<GeoIpResponse> {
    const ipData = await this.request<{
        status: 'success' | 'fail',
        message: string,
        query: string,
        country: string,
      }>(`${this.apiUrl}/${ip}?fields=status,message,country,query`);
    if (ipData.status === 'fail') throw ipData.message;
    return {
      ip: ipData.query,
      country: ipData.country,
    };
  }
  private async request<T>(url: string): Promise<Partial<T>> {
    try {
      const { data } = await firstValueFrom(this.httpService.get<T>(url));
      return data;
    } catch (error) {
      throw new GatewayTimeoutException('Can\'t define the country by IP');
    }
  }
}
