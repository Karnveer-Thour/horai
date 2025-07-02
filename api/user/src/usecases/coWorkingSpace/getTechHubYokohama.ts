import { CoWorkingSpaceSmbDTO } from '../../domains/dtos/CoWorkingSpaceSmbDTO';
import { NotFoundError } from '../errors/NotFoundError';
import { SmbRepository } from '../repositories/SmbRepository';
export class GetTechHubYokohama {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (): Promise<CoWorkingSpaceSmbDTO> => {
        const smbId = '9cdfca08-62ed-4005-ace6-93e090d1b2f0';
        const smb = await this.smbRepository.findById(smbId);
        if (!smb) throw NotFoundError.model(`smb`, `smbId`, smbId);
        return smb.toCoWorkingSpaceDTO();
    };
}
