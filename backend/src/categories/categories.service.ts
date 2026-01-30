import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name, slug, ...rest } = createCategoryDto;

    // Generate slug from name if not provided
    const categorySlug = slug || this.generateSlug(name);

    // Check if category with same name or slug already exists
    const existingCategory = await this.categoryModel.findOne({
      $or: [{ name }, { slug: categorySlug }],
    });

    if (existingCategory) {
      throw new ConflictException('Category with this name or slug already exists');
    }

    const category = new this.categoryModel({
      name,
      slug: categorySlug,
      ...rest,
    });

    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updateData: any = { ...updateCategoryDto };

    // If name is updated and slug is not provided, regenerate slug
    if (updateCategoryDto.name && !updateCategoryDto.slug) {
      updateData.slug = this.generateSlug(updateCategoryDto.name);
    }

    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Category not found');
    }
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}







