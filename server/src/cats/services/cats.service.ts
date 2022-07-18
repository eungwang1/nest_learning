import { CatUpdateDto } from './../dto/cats.update.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from '../cats.repository';
import { CatRequestDto } from '../dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCats() {
    const cats = await this.catsRepository.getAllCats();
    const readOnlyCats = cats.map((cat) => ({
      id: cat.id,
      email: cat.email,
      name: cat.name,
    }));
    return readOnlyCats;
  }

  async findCatByIdWithoutPassword(id: string) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(id);
    return cat.readOnlyData;
  }

  async update(email: string, catUpdateInfo: CatUpdateDto) {
    return await this.catsRepository.update(email, catUpdateInfo);
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email); // 이메일 중복체크
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    return cat.readOnlyData;
  }
}
