import { Service } from './../../service/entity/service.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { UpdateServiceRequestDto } from './../dto/requests/update-service-request.dto';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from './../../../common/constants';
import { ServiceRequestList } from './../dto/response/api-response.dto';
import { ServiceRequestListQueryStringDto } from './../dto/requests/list-service-request.dto';
import { ServiceRequest } from './../entity/service-request.entity';
import { CreateServiceRequestDto } from './../dto/requests/create-service-request.dto';
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
export class ServiceRequestService {
    constructor(
        @Optional() @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}

    generateQueryBuilder(
        queryBuilder,
        { keyword, statuses, receiverId, senderId, serviceId },
    ) {
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
        if (receiverId) {
            queryBuilder.andWhere({
                receiverId: receiverId,
            });
        }
        if (senderId) {
            queryBuilder.andWhere({
                senderId: senderId,
            });
        }
        if (serviceId) {
            queryBuilder.andWhere({
                serviceId: serviceId,
            });
        }
    }

    async createServiceRequest(service: CreateServiceRequestDto) {
        try {
            const newServiceRequest = {
                ...service,
            };

            const insertedServiceRequest = await ServiceRequest.insert(
                newServiceRequest,
            );
            const serviceRequestId = insertedServiceRequest?.identifiers[0]?.id;
            if (serviceRequestId) {
                const serviceRequestDetail = await ServiceRequest.findOne(
                    serviceRequestId,
                );
                return serviceRequestDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async getServiceRequests(
        query: ServiceRequestListQueryStringDto,
    ): Promise<ServiceRequestList> {
        try {
            const {
                page = DEFAULT_FIRST_PAGE,
                limit = DEFAULT_LIMIT_FOR_PAGINATION,
                keyword = '',
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                senderId,
                receiverId,
                serviceId,
                statuses,
            } = query;

            const _queryBuilder = ServiceRequest.createQueryBuilder(
                'service_request',
            )
                .leftJoinAndMapOne(
                    'service_request.sender',
                    User,
                    'sender',
                    'sender.id = service_request.senderId',
                )
                .leftJoinAndMapOne(
                    'service_request.receiver',
                    User,
                    'receiver',
                    'receiver.id = service_request.receiverId',
                )
                .leftJoinAndMapOne(
                    'service_request.service',
                    Service,
                    'service',
                    'service.id = service_request.serviceId',
                )
                .where((queryBuilder) => {
                    this.generateQueryBuilder(queryBuilder, {
                        keyword,
                        statuses,
                        senderId,
                        receiverId,
                        serviceId,
                    });
                })
                .select();
            if (orderBy) {
                _queryBuilder.orderBy(
                    `service_request.${orderBy}`,
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

    async updateServiceRequest(
        id: number,
        service: UpdateServiceRequestDto,
    ): Promise<ServiceRequest> {
        try {
            const currentServiceRequest = {
                ...service,
            };
            await this.dbManager.update(
                ServiceRequest,
                id,
                currentServiceRequest,
            );
            const savedServiceRequest = await this.getServiceRequestById(id);
            return savedServiceRequest;
        } catch (error) {
            throw error;
        }
    }

    async deleteServiceRequest(id: number, deletedBy: number): Promise<void> {
        try {
            const timeNow = new Date();
            await Promise.all([
                this.dbManager.update(
                    ServiceRequest,
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

    async getServiceRequestById(id: number): Promise<ServiceRequest> {
        try {
            const serviceRequest = await this.dbManager.findOne(
                ServiceRequest,
                {
                    relations: ['sender', 'receiver', 'service'],
                    where: { id },
                },
            );
            return serviceRequest;
        } catch (error) {
            throw error;
        }
    }
}
