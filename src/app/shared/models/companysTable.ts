import { Guid } from 'guid-typescript';
export class CompanysTable {
  id: number;
  name: string;
  commander: string;
  commanderPesel: string;
  soldiersNumber: number;
  databaseId: Guid;
}
