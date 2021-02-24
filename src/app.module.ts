import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DnsModule } from './dns/dns.module';

@Module({
  imports: [DnsModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule { }
