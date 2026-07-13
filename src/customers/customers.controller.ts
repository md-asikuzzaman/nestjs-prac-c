import {
  Body,
  Controller,
  Get,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { CustomerDto } from './dto/create-customer.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('customers')
export class CustomersController {
  @Get()
  @ResponseMessage('Users fetched successfully')
  getCustomers(@Body() body: CustomerDto) {
    throw new HttpException('Custom error message', 400);
    throw new InternalServerErrorException('Internal server error');
    throw new UnauthorizedException('Unauthorized access');
    throw new BadRequestException('Invalid request body');
    throw new NotFoundException('User not found');

    return { body };
  }
}
