import { CreateServiceRequestDto } from './dto/requests/create-service-request.dto';
import { ServiceRequestList } from './dto/response/api-response.dto';
import { ServiceRequestListQueryStringDto } from './dto/requests/list-service-request.dto';
import { ServiceRequestService } from './services/service-request.service';
import { IRequest } from '../../common/base/base.interface';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { JwtGuard } from '../../common/guards/jwt.guard';
import { DEFAULT_LIMIT_FOR_PAGINATION } from '../../common/constants';
import { DatabaseService } from '../../common/services/database.service';

import { JoiValidationPipe } from '../../common/services/joi.validation.pipe';

import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { ACTIONS, RESOURCES } from 'src/common/permissionConstants';
import { RemoveEmptyQueryPipe } from 'src/common/services/removeEmptyQueryPipe';
import { HttpStatus } from '../common/common.constant';
import { Role } from '../role/entity/role.entity';
import { UpdateServiceRequestDto } from './dto/requests/update-service-request.dto';

@Controller('service-request')
@UseGuards(JwtGuard, AuthorizationGuard)
export class ServiceRequestController {
    constructor(
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
        private readonly serviceRequestService: ServiceRequestService,
    ) {}

    @Get(':id')
    async getServiceRequest(@Param('id', ParseIntPipe) id: number) {
        try {
            const service =
                await this.serviceRequestService.getServiceRequestById(id);
            return new SuccessResponse(service);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getServiceRequests(@Query() query: ServiceRequestListQueryStringDto) {
        try {
            const data: ServiceRequestList =
                await this.serviceRequestService.getServiceRequests(query);
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create(
        @Request() req: IRequest,
        @Body() data: CreateServiceRequestDto,
    ) {
        try {
            const newServiceRequest =
                await this.serviceRequestService.createServiceRequest(data);
            return new SuccessResponse(newServiceRequest);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async update(
        @Request() req,
        @Param('id') id: number,
        @Body() data: UpdateServiceRequestDto,
    ) {
        try {
            const savedServiceRequest =
                await this.serviceRequestService.updateServiceRequest(id, data);
            return new SuccessResponse(savedServiceRequest);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async delete(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            await this.serviceRequestService.deleteServiceRequest(
                id,
                req?.loginUser?.id,
            );
            return new SuccessResponse({ id }, 'xóa thành công');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
