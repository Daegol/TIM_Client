import { Guid } from 'guid-typescript';

export class SoldiersInCompany {
  id: Guid;
  isAssigned: boolean;
  firstName: string;
  lastName: string;
  pesel: string;
  company: string;
}
