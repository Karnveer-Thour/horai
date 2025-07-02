import { ConnectedCustomerDetails as PrismaConnectedCustomerDetails } from '@prisma/client';
import { ConnectedCustomerDetails as DomainConnectedCustomerDetails } from '../../../../../domains/customer/ConnectedCustomerDetails';

export const transformConnectedCustomerToDomain = (
    item: PrismaConnectedCustomerDetails,
): DomainConnectedCustomerDetails =>
    new DomainConnectedCustomerDetails({
        connectedCustomerDetailsId: item.connectedCustomerDetailsId,
        customerId: item.customerId,
        appType: item.appType,
        connectedCustomerPayload: JSON.parse(item.connectedCustomerPayload), // Deserialize from JSON string
        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
    });

export const transformConnectedCustomerFromDomain = (
    d: DomainConnectedCustomerDetails,
): PrismaConnectedCustomerDetails => {
    return {
        connectedCustomerDetailsId: d.connectedCustomerDetailsId,
        customerId: d.customerId,
        appType: d.appType,
        connectedCustomerPayload: JSON.stringify(d.connectedCustomerPayload), // Serialize to JSON string
        isActive: d.isActive,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
    };
};
