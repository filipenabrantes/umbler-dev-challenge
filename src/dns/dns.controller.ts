import { Controller, Get, Query } from '@nestjs/common';
import { DnsService } from './dns.service';

@Controller('dns')
export class DnsController {

  constructor(private readonly dnsService: DnsService) { }
  @Get()
  async getDNSInfo(@Query() query: any) {
    return this.dnsService.getDNSInfo(query.domain);
  }
}
