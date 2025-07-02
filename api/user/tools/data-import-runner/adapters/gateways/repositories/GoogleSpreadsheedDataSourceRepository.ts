import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Amo } from '../../../domains/Amo';
import { Report } from '../../../domains/Report';
import { Smb } from '../../../domains/Smb';
import { User } from '../../../domains/User';
import { DataSourceRepository } from '../../../usecases/repositories/DataSourceRepository';

const trimString = (e: string) => `${e}`.trim();

export class GoogleSpreadsheetDataSourceRepository implements DataSourceRepository {
    doc?: GoogleSpreadsheet;

    getUsers = async (): Promise<User[]> =>
        this.loadAsObject('User', (r) => {
            return {
                email: r['email'],
                role: r['role'],
                amoId: r['amoId'],
                smbId: r['smbId'],
            };
        });

    getAmos = async (): Promise<Amo[]> =>
        this.loadAsObject('Amo', (r) => {
            return {
                amoId: r['amoId'],
                name: r['name'],
                email: r['email'],
            };
        });

    getSmbs = async (): Promise<Smb[]> =>
        this.loadAsObject('Smb', (r): Smb => {
            return {
                smbId: r['smbId'],
                amoId: r['amoId'],
                name: r['name'],
                email: r['email'],
                imageUrls: r['imageUrls'] ? r['imageUrls'].split(',').map((e: string) => e.trim()) : [],
                description: r['description'],
                precaution: r['precaution'],
                cancelationPolicy: r['cancelationPolicy'],
                resourceType: r['resourceType'],
                optionalEmails: r['optionalEmails'] ? r['optionalEmails'].split(',').map((e: string) => e.trim()) : [],
                address: r['address'],
                openTime: r['openTime'],
                closeTime: r['closeTime'],
                reservableItemMapImageUrls: r['reservableItemMapImageUrls']
                    ? r['reservableItemMapImageUrls'].split(',').map((e: string) => e.trim())
                    : [],
                logoUrl: r['logoUrl'],
                facilityIntroduction: r['facilityIntroduction'],
                precautionOfReservation: r['precautionOfReservation'],
                cancellationPolicyOfReservation: r['cancellationPolicyOfReservation'],
                subRole: r['subRole'] ? r['subRole'] : null,
            };
        });

    getReports = async (): Promise<Report[]> =>
        this.loadAsObject('Report', (r) => {
            return {
                reportId: trimString(r['reportId']),
                smbId: trimString(r['smbId']),
                reportLink: trimString(r['reportLink']),
                name: trimString(r['name']),
                reportType: r['reportType'],
            };
        });

    private async loadAsObject<T>(
        sheetName: string,
        mappingFunc: (r: GoogleSpreadsheetRow) => T,
        headerRows: number = 3,
    ): Promise<T[]> {
        await this.loadDocument();
        if (!this.doc) throw new Error(`document is undefined`);
        const sheet = this.doc.sheetsByTitle[sheetName];
        const rows = await sheet.getRows();
        return rows
            .filter((r) => r.rowIndex > headerRows)
            .map((r) => {
                return mappingFunc(r);
            });
    }

    private loadDocument = async () => {
        if (this.doc) return;
        const url =
            process.env.HORAI_MODE === 'develop'
                ? 'https://docs.google.com/spreadsheets/d/1R1Wrz_xnmiPd0zufBcLnC6Uk4sSufSRheRWtgtLOCeI/edit#'
                : 'https://docs.google.com/spreadsheets/d/1lgvBccE3NCFyevnktTL6JEq_-Juy4EzqUZ20Jq2v3z4/edit#';
        const spreadsheetUrl = new URL(url);
        const docId = spreadsheetUrl.pathname.split('/')[3];
        this.doc = new GoogleSpreadsheet(docId);
        const creds = require('../../../../../operator-credential');
        await this.doc.useServiceAccountAuth(creds);
        await this.doc.loadInfo();
    };
}
