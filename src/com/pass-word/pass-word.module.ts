import { Module } from '@nestjs/common';
import { PassWordService } from './pass-word.service';

@Module({
  providers: [PassWordService]
})
export class PassWordModule {}
