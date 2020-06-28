import { Guid } from 'guid-typescript';
export class CompanyToSend {
  name: string;
  commanderId: Guid;
  soldiersId: Guid[];
}
