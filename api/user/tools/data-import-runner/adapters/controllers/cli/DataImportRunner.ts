import { ImportData } from '../../../usecases/ImportData';
import { GoogleSpreadsheetDataSourceRepository } from '../../gateways/repositories/GoogleSpreadsheedDataSourceRepository';
import { ReservationServiceServerDataStorageRepository } from '../../gateways/repositories/ReservationServiceServerDataStorageRepository';
import { Auth } from '../service/Auth';

const startDataImport = async () => {
    try {
        const svUserToken = await Auth.login(
            process.env.HORAI_SYSTEMUSER_EMAIL || 'systemuser@schemeverge.com',
            process.env.HORAI_SYSTEMUSER_PASSWORD || 'Icecream@31',
        );

        const dataSource = new GoogleSpreadsheetDataSourceRepository();
        const dataStorage = new ReservationServiceServerDataStorageRepository(svUserToken);

        const usecase = new ImportData(dataSource, dataStorage);

        await usecase.execute();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startDataImport();
