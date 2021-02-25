import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class DnsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {

  }

  async getDNSInfo(domain: string) {
    const whoisURL = this.configService.get('WHOIS_URL');

    const cachedWhois = await this.redisService.getClient().get(domain);
    if (cachedWhois) {
      return JSON.parse(cachedWhois);
    }

    const options: AxiosRequestConfig = {
      params: {
        apiKey: this.configService.get('WHOIS_APIKEY'),
        domainName: domain,
        outputFormat: 'JSON',
        ip: 1,
        ignoreRawTexts: 1,
      }
    }
    const { data: { WhoisRecord } } = await this.httpService.get(whoisURL, options).toPromise();
    const sanitizedInfo = this.sanitizedInfo(WhoisRecord);
    await this.redisService.getClient().set(domain, JSON.stringify(sanitizedInfo), 'EX', 86400);
    return sanitizedInfo;
  }

  sanitizedInfo(info: any) {
    const sanitizedInfo = {
      'Registrant': info.registrant || '',
      'Technical Contact': info.technicalContact || {},
      'Name Servers': info.nameServers?.hostNames || {},
      'Status': info.status || {},
      'IPs': info.ips || {},
    }
    return sanitizedInfo;
  }
}
