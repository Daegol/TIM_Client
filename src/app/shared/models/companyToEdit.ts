import { Guid } from 'guid-typescript';
export class CompanyToEdit {
  name: string;
  commanderId: string;
  soldiersId: Guid[];
  companyId: Guid;
}
