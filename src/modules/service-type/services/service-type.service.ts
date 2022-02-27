import { UpdateServiceTypeDto } from './../dto/requests/update-service-type.dto';
import { Service } from './../../service/entity/service.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from './../../../common/constants';
import { ServiceTypeList } from './../dto/response/api-response.dto';
import { ServiceTypeListQueryStringDto } from './../dto/requests/list-service-type.dto';
import { ServiceType } from './../entity/service-type.entity';
import { CreateServiceTypeDto } from './../dto/requests/create-service-type.dto';
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
export class ServiceTypeService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(queryBuilder, { keyword }) {
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
    }

    async createServiceType(service: CreateServiceTypeDto) {
        try {
            const newServiceType = {
                ...service,
            };

            const insertedServiceType = await ServiceType.insert(
                newServiceType,
            );
            const serviceTypeId = insertedServiceType?.identifiers[0]?.id;
            if (serviceTypeId) {
                const serviceTypeDetail = await ServiceType.findOne(
                    serviceTypeId,
                );
                return serviceTypeDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async getServiceTypes(
        query: ServiceTypeListQueryStringDto,
    ): Promise<ServiceTypeList> {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
            } = query;

            const _queryBuilder = ServiceType.createQueryBuilder('service_type')
                // .leftJoinAndMapOne(
                //     'service_type.sender',
                //     User,
                //     'sender',
                //     'sender.id = service_type.senderId',
                // )
                // .leftJoinAndMapOne(
                //     'service_type.receiver',
                //     User,
                //     'receiver',
                //     'receiver.id = service_type.receiverId',
                // )
                // .leftJoinAndMapOne(
                //     'service_type.service',
                //     Service,
                //     'service',
                //     'service.id = service_type.serviceId',
                // )
                .where((queryBuilder) => {
                    this.generateQueryBuilder(queryBuilder, {
                        keyword,
                    });
                })
                .select();
            if (orderBy) {
                _queryBuilder.orderBy(
                    `service_type.${orderBy}`,
                    orderDirection,
                );
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

    async updateServiceType(
        id: number,
        service: UpdateServiceTypeDto,
    ): Promise<ServiceType> {
        try {
            const currentServiceType = {
                ...service,
            };
            await this.dbManager.update(ServiceType, id, currentServiceType);
            const savedServiceType = await this.getServiceTypeById(id);
            return savedServiceType;
        } catch (error) {
            throw error;
        }
    }

    async deleteServiceType(id: number, deletedBy: number): Promise<void> {
        try {
            const timeNow = new Date();
            await Promise.all([
                this.dbManager.update(
                    ServiceType,
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

    async getServiceTypeById(id: number): Promise<ServiceType> {
        try {
            const serviceType = await this.dbManager.findOne(ServiceType, {
                where: { id },
            });
            return serviceType;
        } catch (error) {
            throw error;
        }
    }
}
