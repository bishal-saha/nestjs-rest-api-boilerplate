import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'number of records to skip',
  })
  @IsOptional()
  @IsPositive()
  offset?: number;

  @ApiPropertyOptional({
    description: 'number of records per page',
  })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Current page number',
  })
  @IsOptional()
  @IsPositive()
  page?: number;

  @ApiPropertyOptional({
    description: 'sorting order for the records',
    default: OrderBy.DESC,
  })
  @IsEnum(OrderBy)
  @IsOptional()
  order?: OrderBy;

  @ApiPropertyOptional({
    description: 'search terms',
  })
  @IsOptional()
  @IsString()
  params?: any;
}
