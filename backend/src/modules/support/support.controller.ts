import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { Roles } from '../../decorators/roles.decorator';
  import { JwtAuthGuard } from '../../guard/auth.guard';
  import { RolesGuard } from '../../guard/roles.guard';
  import { ID } from '../../infrastructure/global';
  import { CreateSupportRequestDto } from './dto/create-support.dto';
  import { GetChatListParams } from './dto/get-requests.dto';
  import { MarkMessagesAsReadDto } from './dto/mark-message.dto';
  import { SendMessageDto } from './dto/send-message.dto';
  import { Message } from './schemas/message.schema';
  import { Support } from './schemas/support.schema';
  import { SupportClientService } from './support.client.service';
  import { SupportEmployeeService } from './support.employee.service';
  import { SupportService } from './support.service';
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Controller('api/support')
  export class SupportController {
    constructor(
      private supportService: SupportService,
      private supportClientService: SupportClientService,
      private supportEmployeeService: SupportEmployeeService,
    ) {}
  
    @Roles('client')
    @Post()
    async createSupportRequest(@Body() body: CreateSupportRequestDto) {
      const newRequest =
        await this.supportClientService.createSupportRequest(body);
  
      await this.supportService.sendMessage({
        authorId: body.userId,
        supportRequestId: newRequest._id,
        text: body.text,
      });
  
      const unReadCount = await this.supportClientService.getUnreadCount(
        newRequest._id,
      );
  