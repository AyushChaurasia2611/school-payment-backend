import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.ordersService.findAll(query);
  }

  @Get('school/:schoolId')
  async findBySchool(@Param('schoolId') schoolId: string, @Query() query: any) {
    return this.ordersService.findBySchool(schoolId, query);
  }

  @Get('status/:customOrderId')
  async checkStatus(@Param('customOrderId') customOrderId: string) {
    return this.ordersService.checkStatus(customOrderId);
  }
}
