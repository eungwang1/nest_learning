import { CatUpdateDto } from './dto/cats.update.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import { Cat } from './cats.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<any> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async update(email: string, catUpdateInfo: CatUpdateDto) {
    const catInfo = await this.catModel.findOne({ email });
    if (catUpdateInfo.password) catInfo.password = catUpdateInfo.password;
    if (catUpdateInfo.name) catInfo.name = catUpdateInfo.name;
    if (catUpdateInfo.hashedRefreshToken)
      catInfo.hashedRefreshToken = catUpdateInfo.hashedRefreshToken;
    await catInfo.save();
    return catInfo.readOnlyData;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async getAllCats(): Promise<Cat[]> {
    return await this.catModel.find();
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }
}
