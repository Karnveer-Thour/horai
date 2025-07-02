import { LoggedInUser } from '../domains/LoggedInUser';
import { CustomerRepository } from './repositories/CustomerRepository';

import { UnauthorizedError } from './errors/UnauthorizedError';

import { ServiceType } from '../domains/customer/CustomerEnum';
import { ApplicationCustomerDTO } from '../domains/dtos/ApplicationCustomerDetailDTO';
import { PaginatedList } from '../domains/dtos/PageinatedListDTO';

export class GetAllCustomersWithPagination {
    constructor(readonly customerRepository: CustomerRepository) {}

    public execute = async (
        page: number = 1,
        limit: number = 10,
        searchText?: string,
        serviceType?: string,
        user?: LoggedInUser,
    ): Promise<PaginatedList<ApplicationCustomerDTO>> => {
        if (!user || (!user.isSv() && !user.isAmo() && !user.isSmb())) {
            throw new UnauthorizedError();
        }

        const customers = await this.customerRepository.getAllWithPagination(
            { page: page, pageSize: limit },
            searchText,
        );

        if (!serviceType || serviceType === ServiceType.Application) {
            return { list: customers.list.map((item) => item.toApplicationCustomerDTO()), total: customers.total };
        }

        return { list: [], total: 0 };
    };
}
