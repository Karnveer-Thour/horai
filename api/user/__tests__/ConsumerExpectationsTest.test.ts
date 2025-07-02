import firebase from 'firebase';
import supertest from 'supertest';
import * as uuid from 'uuid';
import UserCredential = firebase.auth.UserCredential;

const request = supertest('http://localhost:3001');
const projectId = 'horai-dev-scheme-verge-v2';
const firebaseApp = firebase.initializeApp({
    projectId,
    apiKey: process.env.FIREBASE_WEB_API_KEY || 'AIzaSyAl1PpWVBggHRKPq03BdqwO3vrpo_P5iyY',
});

describe('Consumer expectations test', () => {
    let token: string;
    const theSeatHalkiSmbId = '921e7178-12b8-48a9-82e9-592f9f051734';
    const theSeatHalkiSmbBody = {
        name: 'The Seat Halki Smb',
        email: 'duy.cao@gmail.com',
        precautionOfReservation: 'precautionOfReservation',
        cancellationPolicyOfReservation: 'cancellationPolicyOfReservation',
    };
    beforeAll(async () => {
        const user = await login('systemuser@schemeverge.com', 'Icecream@31');
        token = user.token;
    });

    test('health check', async () => {
        const res = await request
            .get(`/hc`)
            .set('authorization', ``)
            .set('Content-type', 'application/json')
            .expect(200);
        expect(res.body).toEqual({ status: 'ok' });
    });
    describe('SV user on web', () => {
        test('Get Users', async () => {
            const res = await request
                .get(`/users`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({ role: 'sv' })
                .expect(200);
            expect(res.body?.list?.length).toBe(20);
        });
        const amoId = uuid.v4();
        test('Create AMO', async () => {
            const res = await request
                .put(`/amos/${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                    name: 'testamo',
                    email: 'amo@example.com',
                })
                .expect(204);
        });
        test('Create AMO V2', async () => {
            const res = await request
                .post(`/v2/amos`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                    name: 'testamo',
                    email: 'amo@example.com',
                })
                .expect(200);
            await request
                .put(`/v2/amos/${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                    name: 'testAmoUpdated',
                    email: 'amo@example.com',
                })
                .expect(200);
        });

        test('Update V2 AMO Status', async () => {
            const res = await request
                .put(`/v2/amos/deactivate/${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    isActive: false,
                })
                .expect(200);
        });
        test('Get AMOS V2', async () => {
            const res = await request
                .get(`/v2/amos`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res).toBeDefined();
        });
        test('Get Amo By Id', async () => {
            const res = await request
                .get(`/v2/amos/${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                });
            expect(res.body.amoId).toBe(amoId);
            expect(res.body.email).toBe('amo@example.com');
            expect(res.body.name).toBe('testAmoUpdated');
        });
        test('Get AMO', async () => {
            jest.setTimeout(50000);
            const res = await request
                .get(`/amos/${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                });
            expect(res.body.amoId).toBe(amoId);
            expect(res.body.email).toBe('amo@example.com');
            expect(res.body.name).toBe('testAmoUpdated');
        });
        test('Create new Smb V2', async () => {
            const res = await request
                .post(`/v2/smbs`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    address: 'smb-address',
                    cancelationPolicy: 'cancelationPolicy',
                    description: 'description',
                    logoUrl: 'https://openapi-generator.tech',
                    precaution: 'precaution',
                    cancellationPolicyOfReservation: 'cancellationPolicyOfReservation',
                    precautionOfReservation: 'precautionOfReservation',
                    amoId: 'amoId',
                    imageUrls: ['imageUrls', 'imageUrls'],
                    name: 'name',
                    closeTime: '22:00:00',
                    facilityIntroduction: 'facilityIntroduction',
                    openTime: '08:00:00',
                    reservableItemMapImageUrls: ['reservableItemMapImageUrls', 'reservableItemMapImageUrls'],
                    email: 'email',
                    optionalEmails: ['optionalEmails', 'optionalEmails'],
                    resourceType: 'CoWorkingSpace',
                })
                .expect(204);
        });
        const smbId = uuid.v4();
        test('Create SMB', async () => {
            const res = await request
                .put(`/smbs/${smbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                    name: 'test',
                    email: 'test@gmail.com',
                })
                .expect(204);
            await request
                .put(`/smbs/${theSeatHalkiSmbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    amoId: amoId,
                    ...theSeatHalkiSmbBody,
                })
                .expect(204);
        });
        test('Update Smb V2', async () => {
            const res = await request
                .put(`/v2/smbs/${smbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    smbId: 'smbId',
                    name: 'name',
                    email: 'test@gmail.com',
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
                })
                .expect(204);
        });
        test('Get v2 SMB by id', async () => {
            const res = await request
                .get(`/v2/smbs/${smbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res.body).not.toBeNull();
            expect(res.body.amoId).toEqual(amoId);
            expect(res.body.smbId).toEqual(smbId);
            expect(res.body.email).toEqual('test@gmail.com');
        });
        test('Deactivate Smb V2', async () => {
            const res = await request
                .put(`/v2/smb/deactivate/${smbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({
                    isActive: false,
                })
                .expect(200);
        });
        test('Get SMB by id', async () => {
            const res = await request
                .get(`/smbs/${smbId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res.body).not.toBeNull();
            expect(res.body.amoId).toEqual(amoId);
            expect(res.body.smbId).toEqual(smbId);
            expect(res.body.email).toEqual('test@gmail.com');
        });

        test('Get the seat halki SMB detail', async () => {
            const res = await request
                .get('/coWorkingSpace/theSeatHalki')
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(res.body).not.toBeNull();
            expect(res.body.amoId).toEqual(amoId);
            expect(res.body.smbId).toEqual(theSeatHalkiSmbId);
            expect(res.body.name).toEqual(theSeatHalkiSmbBody.name);
            expect(res.body.email).toEqual(theSeatHalkiSmbBody.email);
            expect(res.body.precautionOfReservation).toEqual(theSeatHalkiSmbBody.precautionOfReservation);
            expect(res.body.cancellationPolicyOfReservation).toEqual(
                theSeatHalkiSmbBody.cancellationPolicyOfReservation,
            );
        });

        test('GET SMB', async () => {
            const { body } = await request
                .get(`/smbs?amoId=${amoId}`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send()
                .expect(200);
        });
    });

    describe('users', () => {
        test('should list user with default page and page size', async () => {
            const { body } = await request
                .get(`/users`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .expect(200);
            expect(body).toMatchInlineSnapshot(`
                Object {
                  "list": Array [
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user0@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "0",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user10@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "10",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user11@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "11",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user12@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "12",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user13@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "13",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user14@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "14",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user15@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "15",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user16@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "16",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user17@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "17",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user18@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "18",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user19@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "19",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user1@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "1",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user2@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "2",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user3@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "3",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user4@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "4",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user5@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "5",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user6@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "6",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user7@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "7",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user8@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "8",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user9@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "9",
                    },
                  ],
                  "total": 20,
                }
            `);
        });

        test('should list users with custom startIndex and endIndex', async () => {
            const { body } = await request
                .get(`/users?startIndex=3&endIndex=10`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .expect(200);
            console.log('1088>>>>>>>>>>>', body);
            expect(body).toMatchInlineSnapshot(`
                Object {
                  "list": Array [
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user11@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "11",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user12@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "12",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user13@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "13",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user14@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "14",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user15@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "15",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user16@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "16",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user17@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "17",
                    },
                    Object {
                      "amo": Object {
                        "amoId": "amo id",
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "email": "test",
                        "isActive": true,
                        "name": "name",
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "amoId": "amo id",
                      "createdAt": "2021-01-01T00:00:00.000Z",
                      "email": "user18@gmail.com",
                      "role": "sv",
                      "smb": Object {
                        "address": null,
                        "amoId": "amo id",
                        "cancelationPolicy": null,
                        "closeTime": null,
                        "createdAt": "2021-01-01T00:00:00.000Z",
                        "description": null,
                        "email": "testsmb@horai.com",
                        "facilityIntroduction": null,
                        "imageUrls": Array [],
                        "isActive": true,
                        "logoUrl": null,
                        "name": "name",
                        "openTime": null,
                        "optionalEmails": Array [],
                        "precaution": null,
                        "reservableItemMapImageUrls": Array [],
                        "resourceType": "Activity",
                        "smbId": "smb id",
                        "subRole": null,
                        "updatedAt": "2021-01-01T00:00:00.000Z",
                      },
                      "smbId": "smb id",
                      "status": "ACTIVE",
                      "updatedAt": "2021-01-01T00:00:00.000Z",
                      "userId": "18",
                    },
                  ],
                  "total": 20,
                }
            `);
        });
    });

    describe('update user', () => {
        test('should update user amo by email', async () => {
            const newAmoId = '9e06e272-66c2-41e3-9cf8-fcd78ce09d19';
            const { body } = await request
                .put(`/users/user1@gmail.com`)
                .send({
                    amoId: newAmoId,
                })
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json');
            expect(body.amoId).toBe(newAmoId);
        });

        test('should change user role', async () => {
            const { body } = await request
                .put(`/users/user1@gmail.com`)
                .send({
                    role: 'smb',
                })
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json');
            expect(body.role).toBe('smb');
        });
    });

    describe('get user', () => {
        test('should get user by email', async () => {
            const { body } = await request
                .get(`/users/user2@gmail.com`)
                .set('Authorization', `Bearer ${token}`)
                .set('authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json');

            expect(body).toMatchInlineSnapshot(`
                Object {
                  "amo": Object {
                    "amoId": "amo id",
                    "createdAt": "2021-01-01T00:00:00.000Z",
                    "email": "test",
                    "isActive": true,
                    "name": "name",
                    "updatedAt": "2021-01-01T00:00:00.000Z",
                  },
                  "amoId": "amo id",
                  "createdAt": "2021-01-01T00:00:00.000Z",
                  "email": "user2@gmail.com",
                  "role": "sv",
                  "smb": Object {
                    "address": null,
                    "amoId": "amo id",
                    "cancelationPolicy": null,
                    "closeTime": null,
                    "createdAt": "2021-01-01T00:00:00.000Z",
                    "description": null,
                    "email": "testsmb@horai.com",
                    "facilityIntroduction": null,
                    "imageUrls": Array [],
                    "isActive": true,
                    "logoUrl": null,
                    "name": "name",
                    "openTime": null,
                    "optionalEmails": Array [],
                    "precaution": null,
                    "reservableItemMapImageUrls": Array [],
                    "resourceType": "Activity",
                    "smbId": "smb id",
                    "subRole": null,
                    "updatedAt": "2021-01-01T00:00:00.000Z",
                  },
                  "smbId": "smb id",
                  "status": "ACTIVE",
                  "updatedAt": "2021-01-01T00:00:00.000Z",
                  "userId": "2",
                }
            `);
        });
    });
});

const login = async (email: string, password: string): Promise<{ token: string }> => {
    return firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (resUser: UserCredential) => {
            if (!resUser) {
                throw new Error(`userCredential is null`);
            } else if (!resUser.user) {
                throw new Error(`user is null`);
            }
            return { token: await resUser.user.getIdToken() };
        });
};
