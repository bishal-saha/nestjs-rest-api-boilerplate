import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto for the success response
 */
export class SuccessResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  statusCode?: number;

  @ApiProperty()
  result?: T;
}

/**
 * Dto for the error response
 */
export class ErrorResponseDto<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  statusCode?: number;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: T;
}
