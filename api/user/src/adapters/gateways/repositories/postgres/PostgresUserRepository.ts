import { Amo, Smb, UserStatus, User } from '@prisma/client';
import { UserRepository } from '../../../../usecases/repositories/UserRepository';
import { User as DomainUser } from '../../../../domains/User';
import { UserListDTO } from '../../../../domains/dtos/UserListDTO';
import { Amo as DomainAmo } from '../../../../domains/Amo';
import { Smb as DomainSmb } from '../../../../domains/Smb';
import { dbConnection } from '../../../../infrastructures/config/IoC/inversify.config';
import { ResourceEnum } from '../../../../domains/ResourceEnum';
import { injectable } from 'inversify';

@injectable()
export class PostgresUserRepository implements UserRepository {
    public save = async (ex: DomainUser): Promise<void> => {
        const prisma = dbConnection.getInstance();
        const user = this.transformFromDomain(ex);

        await prisma.user.upsert({
            where: { email: user.email },
            update: user,
            create: user,
        });
    };

    public getAll = async (startIndex: number = 1, endIndex: number = 20): Promise<UserListDTO> => {
        const prisma = dbConnection.getInstance();
        const offset = startIndex - 1;
        const limit = endIndex - startIndex + 1;
        const users = await prisma.user.findMany({
            skip: offset,
            take: Number(limit),
        });
        const smbQuery: { smbId: string }[] = [],
            amoQuery: { amoId: string }[] = [];
        users.forEach((user: any) => {
            if (user.smbId) smbQuery.push({ smbId: user.smbId });
            if (user.amoId) amoQuery.push({ amoId: user.amoId });
        });
        let amos: Amo[] = [],
            smbs: Smb[] = [],
            userCount: number = 0;
        await Promise.all([
            (amos = await prisma.amo.findMany({
                where: {
                    OR: amoQuery,
                },
            })),
            (smbs = await prisma.smb.findMany({
                where: {
                    OR: smbQuery,
                },
            })),
            (userCount = await prisma.user.count()),
        ]);
        return {
            total: userCount,
            list: users.map((item: any) =>
                this.transformToDomain(
                    item,
                    amos.find((amo) => amo.amoId === item.amoId),
                    smbs.find((smb) => smb.smbId === item.smbId),
                ),
            ),
        };
    };

    public findById = async (email: string): Promise<DomainUser | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.user.findUnique({ where: { email } });
        let amo: Amo | null = null,
            smb: Smb | null = null;
        if (!exp) return;

        if (exp?.amoId) {
            amo = await prisma.amo.findUnique({
                where: {
                    amoId: exp.amoId,
                },
            });
        }
        if (exp?.smbId) {
            smb = await prisma.smb.findUnique({
                where: {
                    smbId: exp.smbId,
                },
            });
        }
        return this.transformToDomain(exp, amo ? amo : undefined, smb ? smb : undefined);
    };

    public softDeleteById = async (email: string): Promise<DomainUser> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.user.update({
            where: {
                email,
            },
            data: {
                status: UserStatus.INACTIVE,
            },
        });
        return this.transformToDomain(exp);
    };

    public findByUserId = async (userId: string): Promise<DomainUser | undefined> => {
        const prisma = dbConnection.getInstance();

        const exp = await prisma.user.findFirst({
            where: { userId },
        });
        if (!exp) return;
        return this.transformToDomain(exp);
    };

    private transformToDomain = (item: User, amo?: Amo, smb?: Smb): DomainUser => {
        const role = (role: string | null): 'sv' | 'amo' | 'smb' | undefined => {
            if (!item.role) return undefined;
            else if (role === 'sv' || role === 'amo' || role === 'smb') return role;
            throw new Error(`invalid role in user. userId: ${item.userId}, role: ${item.role}`);
        };
        const user = new DomainUser({
            email: item.email,
            userId: item.userId || undefined,
            role: role(item.role),
            amoId: item.amoId || undefined,
            smbId: item.smbId || undefined,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            status: item.status,
        });
        if (amo) {
            user.setAmo(
                new DomainAmo({
                    ...amo,
                }),
            );
        }
        if (smb) {
            user.setSmb(
                new DomainSmb({
                    ...smb,
                    cancellationPolicyOfReservation: smb.cancellationPolicyOfReservation || undefined,
                    precautionOfReservation: smb.precautionOfReservation || undefined,
                    resourceType: smb.resourceType as ResourceEnum,
                    //@ts-ignore
                    subRole: smb.subRole,
                }),
            );
        }
        return user;
    };

    private transformFromDomain = (d: DomainUser): User => {
        return {
            email: d.email,
            userId: d.userId || null,
            role: d.role || null,
            amoId: d.amoId || null,
            smbId: d.smbId || null,
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
            status: d.status,
        };
    };
}
