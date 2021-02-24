import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import whis from 'whis';

@Injectable()
export class DnsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {

  }

  async getDNSInfo(domain: string) {
    const whoisURL = this.configService.get('WHOIS_URL');

    const options: AxiosRequestConfig = {
      params: {
        apiKey: this.configService.get('WHOIS_APIKEY'),
        domainName: 'umbler.com',
        outputFormat: 'JSON',
        ip: 1,
        ignoreRawTexts: 1,
      }
    }

    const res = await this.httpService.get(whoisURL, options).toPromise();
    console.log(res.data.WhoisRecord);

    // const res = await whis('portaliir.com.br')
    // console.log(res)
  }
}
