import { Controller, Get } from '@nestjs/common';
import { DnsService } from './dns.service';

@Controller('dns')
export class DnsController {

  constructor(private readonly dnsService: DnsService) { }
  @Get()
  async getDNSInfo() {
    this.dnsService.getDNSInfo('');
  }
}
