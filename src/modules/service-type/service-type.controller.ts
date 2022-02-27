import { UpdateServiceTypeDto } from './dto/requests/update-service-type.dto';
import { CreateServiceTypeDto } from './dto/requests/create-service-type.dto';
import { ServiceTypeList } from './dto/response/api-response.dto';
import { ServiceTypeListQueryStringDto } from './dto/requests/list-service-type.dto';
import { ServiceTypeService } from './services/service-type.service';
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

@Controller('service-type')
@UseGuards(JwtGuard, AuthorizationGuard)
export class ServiceTypeController {
    constructor(
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
        private readonly serviceTypeService: ServiceTypeService,
    ) {}

    @Get(':id')
    async getServiceType(@Param('id', ParseIntPipe) id: number) {
        try {
            const serviceType = await this.serviceTypeService.getServiceTypeById(
                id,
            );
            return new SuccessResponse(serviceType);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getServiceTypes(@Query() query: ServiceTypeListQueryStringDto) {
        try {
            const data: ServiceTypeList =
                await this.serviceTypeService.getServiceTypes(query);
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create(@Request() req: IRequest, @Body() data: CreateServiceTypeDto) {
        try {
            const newServiceType =
                await this.serviceTypeService.createServiceType(data);
            return new SuccessResponse(newServiceType);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async update(
        @Request() req,
        @Param('id') id: number,
        @Body() data: UpdateServiceTypeDto,
    ) {
        try {
            const savedServiceType =
                await this.serviceTypeService.updateServiceType(id, data);
            return new SuccessResponse(savedServiceType);
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
            await this.serviceTypeService.deleteServiceType(
                id,
                req?.loginUser?.id,
            );
            return new SuccessResponse({ id }, 'xóa thành công');
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
