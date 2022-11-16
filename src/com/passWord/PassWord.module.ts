import { Module } from '@nestjs/common';
import { PassWordService } from './PassWord.service';

@Module({
  providers: [PassWordService],
  exports: [PassWordService],
})
export class PassWordModule {}
