import { UpdateServiceDto } from './../dto/requests/update-service.dto';
import { ServiceType } from './../../service-type/entity/service-type.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
    DEFAULT_ORDER_BY,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_DIRECTION,
} from './../../../common/constants';
import { ServiceListQueryStringDto } from './../dto/requests/list-service.dto';
import { ServiceList } from './../dto/response/api-response.dto';
import { Service } from './../../service/entity/service.entity';
import { CreateServiceDto } from './../dto/requests/create-service.dto';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Optional,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Request } from 'express';
import { EntityManager, In, Like, Brackets } from 'typeorm';

@Injectable()
export class ServiceService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword, statuses }) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            name: Like(likeKeyword),
                        },
                        {
                            description: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }
        if (statuses && statuses.length > 0) {
            queryBuilder.andWhere({
                status: In(statuses),
            });
        }
    }

    async createService(service: CreateServiceDto, managerId: number) {
        try {
            const newService = {
                managerId: managerId,
                ...service,
            };

            const insertedService = await Service.insert(newService);
            const serviceId = insertedService?.identifiers[0]?.id;
            if (serviceId) {
                const serviceDetail = await Service.findOne(serviceId);
                return serviceDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async getServices(query: ServiceListQueryStringDto): Promise<ServiceList> {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                statuses = [],
            } = query;

            const _queryBuilder = Service.createQueryBuilder('service')
                .leftJoinAndMapOne(
                    'service.manager',
                    User,
                    'manager',
                    'manager.id = service.managerId',
                )
                .leftJoinAndMapOne(
                    'service.serviceType',
                    ServiceType,
                    'serviceType',
                    'serviceType.id = service.serviceTypeId',
                )
                .where((queryBuilder) => {
                    this.generateQueryBuilder(queryBuilder, {
                        keyword,
                        statuses,
                    });
                })
                .select();
            if (orderBy) {
                _queryBuilder.orderBy(`service.${orderBy}`, orderDirection);
            }
            if (limit && page)
                _queryBuilder.take(limit).skip((page - 1) * limit);
            const [items, totalItems] = await _queryBuilder.getManyAndCount();
            return {
                items,
                totalItems: totalItems,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateService(
        id: number,
        service: UpdateServiceDto,
    ): Promise<Service> {
        try {
            const currentService = {
                ...service,
            };
            await this.dbManager.update(Service, id, currentService);
            const savedService = await this.getServiceById(id);
            return savedService;
        } catch (error) {
            throw error;
        }
    }

    async deleteService(id: number, deletedBy: number): Promise<void> {
        try {
            const timeNow = new Date();
            await Promise.all([
                this.dbManager.update(
                    Service,
                    { id },
                    {
                        deletedAt: timeNow,
                        deletedBy,
                    },
                ),
            ]);
        } catch (error) {
            throw error;
        }
    }

    async getServiceById(id: number): Promise<Service> {
        try {
            const service = await this.dbManager.findOne(Service, {
                relations: ['manager', 'serviceType'],
                where: { id },
            });
            return service;
        } catch (error) {
            throw error;
        }
    }
}
