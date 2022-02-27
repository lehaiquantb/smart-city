import { UpdateServiceDto } from './dto/requests/update-service.dto';
import { ServiceList } from './dto/response/api-response.dto';
import { ServiceListQueryStringDto } from './dto/requests/list-service.dto';
import { ServiceService } from './../service/services/service.service';
import { CreateServiceDto } from './dto/requests/create-service.dto';
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

@Controller('service')
@UseGuards(JwtGuard, AuthorizationGuard)
export class ServiceController {
    constructor(
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
        private readonly serviceService: ServiceService,
    ) {}

    @Get(':id')
    async getService(@Param('id', ParseIntPipe) id: number) {
        try {
            const service = await this.serviceService.getServiceById(id);
            return new SuccessResponse(service);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getServices(@Query() query: ServiceListQueryStringDto) {
        try {
            const data: ServiceList = await this.serviceService.getServices(
                query,
            );
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create(@Request() req: IRequest, @Body() data: CreateServiceDto) {
        try {
            const newService = await this.serviceService.createService(
                data,
                req.loginUser.id,
            );
            return new SuccessResponse(newService);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateService(
        @Request() req,
        @Param('id') id: number,
        @Body() data: UpdateServiceDto,
    ) {
        try {
            const savedService = await this.serviceService.updateService(
                id,
                data,
            );
            return new SuccessResponse(savedService);
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
            await this.serviceService.deleteService(id, req?.loginUser?.id);
            return new SuccessResponse({ id }, 'xóa thành công');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
