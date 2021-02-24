import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { DnsModule } from './dns/dns.module';

const configService = new ConfigService();
@Module({
  imports: [
    DnsModule,
    ConfigModule.forRoot(),
    RedisModule.register({
      url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}?
        db=${configService.get('REDIS_DB')}&password=${configService.get('REDIS_PASSWORD')}`
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
