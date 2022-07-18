import { AuthModule } from './../auth/auth.module';
import { Cat, CatSchema } from './cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './controllers/cats.controller';
import { CatsService } from './services/cats.service';
import { CatsRepository } from './cats.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    // 순환종속성 문제 해결을 위해 forwardRef 사용 (ex. auth에서 cat이 필요 & cat에서도 auth가 필요)
    forwardRef(() => AuthModule),
  ],

  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // 외부에서 사용하기 위해서.
})
export class CatsModule {}
