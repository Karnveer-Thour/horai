import axios from 'axios';
import { Amo } from '../../../domains/Amo';
import { Report } from '../../../domains/Report';
import { Smb } from '../../../domains/Smb';
import { User } from '../../../domains/User';
import { DataStorageRepository } from '../../../usecases/repositories/DataStorageRepository';

export class ReservationServiceServerDataStorageRepository implements DataStorageRepository {
    endpoint: string;
    token: string;

    constructor(token: string) {
        this.endpoint = process.env.ENDPOINT || 'http://localhost:3001';
        this.token = token;
    }

    saveUser = async (row: User) => {
        const user = await this.getRequest(`/users/${encodeURIComponent(row.email)}`);
        if (!user || (user && Object.keys(user).length === 0 && user.constructor === Object)) {
            this.sendRequest(`/users/${encodeURIComponent(row.email)}`, row);
        } else {
            console.log('update user : ', row.email);
            this.putRequest(`/users/${encodeURIComponent(row.email)}`, row);
        }
    };

    saveAmo = async (row: Amo) => this.putRequest(`/amos/${row.amoId}`, row);

    saveSmb = async (row: Smb) => {
        const smb = await this.getRequest(`/smbs/${encodeURIComponent(row.smbId)}`);
        if (!smb || (smb && Object.keys(smb).length === 0 && smb.constructor === Object)) {
            this.putRequest(`/smbs/${row.smbId}`, row);
        } else {
            console.log('Update smb id: ', row.smbId);
            this.putRequest(`/smbs/${row.smbId}`, row);
        }
    };

    saveReport = async (row: Report) => this.putRequest(`/v2/smbs/${row.smbId}/reports/${row.reportId}`, row);

    private async sendRequest<T>(urlPath: string, body: T): Promise<void> {
        try {
            const res = await axios.post(
                `${this.endpoint}${urlPath}`,
                {
                    ...body,
                },
                {
                    headers: {
                        authorization: `Bearer ${this.token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    private async putRequest<T>(urlPath: string, body: T): Promise<void> {
        try {
            const res = await axios.put(
                `${this.endpoint}${urlPath}`,
                {
                    ...body,
                },
                {
                    headers: {
                        authorization: `Bearer ${this.token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    private async getRequest(urlPath: string): Promise<any> {
        try {
            const res = await axios.get(`${this.endpoint}${urlPath}`, {
                headers: {
                    authorization: `Bearer ${this.token}`,
                },
            });
            return res.data;
        } catch (e) {
            return null;
        }
    }
}
