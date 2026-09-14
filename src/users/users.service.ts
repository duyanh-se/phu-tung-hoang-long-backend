import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Prisma, Role } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { publicUserSelect } from './user.select';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async list({ page, limit }: PaginationQueryDto) {
    const [data, total] = await this.prisma.$transaction(
      [
        this.prisma.user.findMany({
          select: publicUserSelect,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        }),
        this.prisma.user.count(),
      ],
      { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead },
    );
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: publicUserSelect,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  updateProfile(id: string, dto: UpdateProfileDto) {
    return this.update(id, { fullName: dto.fullName });
  }
  updateRole(id: string, role: Role, actorId: string) {
    if (id === actorId)
      throw new BadRequestException('You cannot change your own role');
    return this.update(id, { role });
  }
  private async update(id: string, data: Prisma.UserUpdateInput) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
        select: publicUserSelect,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('User not found');
      throw error;
    }
  }
}
