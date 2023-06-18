import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu-dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(createMemuDto: CreateMenuDto) {
    const { name, slug } = createMemuDto;
    await this.prisma.menu.create({
      data: {
        name,
        slug,
      },
    });
    return { message: 'tao thanh cong' };
  }

  async findAll() {
    const Menu = await this.prisma.menu.findMany({
      select: { id: true, name: true, slug: true },
    });
    return { Menu };
  }

  async findOne(slug: string) {
    const findBia = await this.prisma.menu.findUnique({ where: { slug } });
    return { findBia };
  }

  async update(slug: string, updateMenuDto: UpdateMenuDto) {
    const updateSlug = await this.prisma.menu.update({
      where: { slug },
      data: { ...updateMenuDto },
    });
    return { updateSlug };
  }

  async remove(slug: string) {
    return await this.prisma.menu.delete({
      where: { slug },
    });
  }
}
