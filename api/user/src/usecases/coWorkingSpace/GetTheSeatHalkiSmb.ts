import { CoWorkingSpaceSmbDTO } from '../../domains/dtos/CoWorkingSpaceSmbDTO';
import { NotFoundError } from '../errors/NotFoundError';
import { SmbRepository } from '../repositories/SmbRepository';
export class GetTheSeatHalkiSmb {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (): Promise<CoWorkingSpaceSmbDTO> => {
        // for now we use id in gg spread sheet
        //TODO: We need to make it dynamic in future as we only have one coworking space now.
        const smbId = '921e7178-12b8-48a9-82e9-592f9f051734';
        const smb = await this.smbRepository.findById(smbId);
        if (!smb) throw NotFoundError.model(`smb`, `smbId`, smbId);
        return smb.toCoWorkingSpaceDTO();
    };
}
