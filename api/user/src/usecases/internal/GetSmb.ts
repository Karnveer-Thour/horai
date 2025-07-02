import { Smb } from '../../domains/Smb';
import { NotFoundError } from '../errors/NotFoundError';
import { SmbRepository } from '../repositories/SmbRepository';
export class GetSmb {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (smbId: string): Promise<Smb> => {
        const smbItem = await this.smbRepository.findById(smbId);
        if (!smbItem) throw NotFoundError.model(`smbItem`, `smbItemId`, smbId);
        return smbItem;
    };
}
