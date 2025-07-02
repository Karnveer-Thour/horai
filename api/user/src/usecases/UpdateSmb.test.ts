import { mock } from 'jest-mock-extended';
import moment from 'moment';
import { LoggedInUser } from '../domains/LoggedInUser';
import { ResourceEnum } from '../domains/ResourceEnum';
import { Smb } from '../domains/Smb';
import { UpdateSmb } from '../usecases/UpdateSmb';
import { UnauthorizedError } from './errors/UnauthorizedError';
import { SmbRepository } from './repositories/SmbRepository';

describe('UpdateSmb', () => {
    const dateNow = moment('2000-01-23T04:56:07.000Z').toDate();
    const smbRepo = mock<SmbRepository>();
    const dateTimeRepo = {
        now: jest.fn(() => dateNow),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    smbRepo.findById.mockResolvedValue(
        Smb.create(
            'smbId',
            'amoId',
            ResourceEnum.Activity,
            {
                address: 'address1',
                cancelationPolicy: 'cancelationPolicy1',
                description: 'description1',
                logoUrl: 'https://openapi-generator.tech1',
                precaution: 'precaution1',
                cancellationPolicyOfReservation: 'cancellationPolicyOfReservation1',
                precautionOfReservation: 'precautionOfReservation1',
                imageUrls: ['imageUrls1', 'imageUrls1'],
                name: 'name1',
                closeTime: '22:00:00',
                facilityIntroduction: 'facilityIntroduction1',
                openTime: '08:00:00',
                reservableItemMapImageUrls: ['reservableItemMapImageUrls1', 'reservableItemMapImageUrls1'],
                email: 'smbtest@gmail.com',
                optionalEmails: ['optionalEmails1', 'optionalEmails1'],
            },
            true,
            dateNow,
        ),
    );

    it('should update correctly', async () => {
        const usecase = new UpdateSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
            role: 'sv',
        });
        const res = await usecase.execute(
            {
                smbId: 'smbId',
                name: 'name',
                email: 'email',
                imageUrls: ['imageUrls', 'imageUrls'],
                optionalEmails: ['optionalEmails', 'optionalEmails'],

                description: 'desc',
                precaution: 'precaution',
                cancelationPolicy: 'cancelationPolicy',
                address: 'testaddress',
                openTime: '08:00:00',
                closeTime: '22:00:00',
                reservableItemMapImageUrls: ['reservableItemMapImageUrls', 'reservableItemMapImageUrls'],
                logoUrl: 'https://openapi-generator.tech',
                facilityIntroduction: 'facilityIntroduction',
                precautionOfReservation: 'precautionOfReservation',
                cancellationPolicyOfReservation: 'cancellationPolicyOfReservation',
            },
            user,
        );
        expect(smbRepo.save.mock.calls[0][0].smbId).toEqual('smbId');
        expect(smbRepo.save.mock.calls[0][0].name).toEqual('name');
        expect(smbRepo.save.mock.calls[0][0].email).toEqual('email');
        expect(smbRepo.save.mock.calls[0][0].createdAt).toEqual(dateNow);
        expect(smbRepo.save.mock.calls[0][0].updatedAt).toEqual(dateNow);
    });
    it('should throw UnauthorizedError when user is not SV user', async () => {
        const usecase = new UpdateSmb(dateTimeRepo, smbRepo);
        const user = new LoggedInUser({
            id: 'userId',
            email: 'autotest-user1@example.com',
        });
        try {
            const res = await usecase.execute(
                {
                    smbId: 'smbId',
                    name: 'name',
                    email: 'email',
                    imageUrls: ['imageUrls', 'imageUrls'],
                    optionalEmails: ['optionalEmails', 'optionalEmails'],
                    description: 'desc',
                    precaution: 'precaution',
                    cancelationPolicy: 'cancelationPolicy',
                    address: 'testaddress',
                    openTime: '08:00:00',
                    closeTime: '22:00:00',
                    reservableItemMapImageUrls: ['reservableItemMapImageUrls1', 'reservableItemMapImageUrls1'],
                    logoUrl: 'https://openapi-generator.tech1',
                    facilityIntroduction: 'facilityIntroduction',
                    precautionOfReservation: 'precautionOfReservation',
                    cancellationPolicyOfReservation: 'cancellationPolicyOfReservation',
                },
                user,
            );
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
        }
    });

    it('should throw UnauthorizedError when call without loggedInUser', async () => {
        const usecase = new UpdateSmb(dateTimeRepo, smbRepo);
        try {
            const res = await usecase.execute({
                smbId: 'smbId',
                name: 'name',
                email: 'email',
                imageUrls: ['imageUrls', 'imageUrls'],
                optionalEmails: ['optionalEmails', 'optionalEmails'],

                description: 'desc',
                precaution: 'precaution',
                cancelationPolicy: 'cancelationPolicy',
                address: 'testaddress',
                openTime: '08:00:00',
                closeTime: '22:00:00',
                reservableItemMapImageUrls: ['reservableItemMapImageUrls1', 'reservableItemMapImageUrls1'],
                logoUrl: 'https://openapi-generator.tech1',
                facilityIntroduction: 'facilityIntroduction',
                precautionOfReservation: 'precautionOfReservation',
                cancellationPolicyOfReservation: 'cancellationPolicyOfReservation',
            });
        } catch (e: any) {
            expect(e).toBeInstanceOf(UnauthorizedError);
        }
    });
});
