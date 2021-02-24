import { HttpModule, Module } from '@nestjs/common';
import { DnsService } from './dns.service';
import { DnsController } from './dns.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [DnsService],
  controllers: [DnsController]
})
export class DnsModule { }
