import { Smb } from '../../domains/Smb';
import { SmbRepository } from '../repositories/SmbRepository';

export class GetSmbs {
    constructor(readonly smbRepository: SmbRepository) {}

    public execute = async (input: { amoId: string }): Promise<Smb[]> => {
        const amos = await this.smbRepository.getAllByAmoId(input.amoId);
        return amos;
    };
}
