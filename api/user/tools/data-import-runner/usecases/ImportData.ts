import { DataSourceRepository } from './repositories/DataSourceRepository';
import { DataStorageRepository } from './repositories/DataStorageRepository';

export class ImportData {
    constructor(readonly dataSourceRepo: DataSourceRepository, readonly dataStorageRepo: DataStorageRepository) {}

    execute = async () => {
        const users = await this.dataSourceRepo.getUsers();
        await Promise.all(
            users.map(async (row) => {
                if (!row.email) return;
                await this.dataStorageRepo.saveUser(row);
                console.log(`saved user: ${row.email}`);
            }),
        );

        const amos = await this.dataSourceRepo.getAmos();
        await Promise.all(
            amos.map(async (row) => {
                if (!row.name) return;
                await this.dataStorageRepo.saveAmo(row);
                console.log(`saved amo: ${row.name}`);
            }),
        );

        const smbs = await this.dataSourceRepo.getSmbs();
        await Promise.all(
            smbs.map(async (row) => {
                if (!row.name) return;
                await this.dataStorageRepo.saveSmb(row);
                console.log(`saved smb: ${row.name}`);
            }),
        );

        const reports = await this.dataSourceRepo.getReports();
        await Promise.all(
            reports.map(async (row) => {
                if (!row.name) return;
                await this.dataStorageRepo.saveReport(row);
                console.log(`saved report: ${row.name}`);
            }),
        );
    };
}
