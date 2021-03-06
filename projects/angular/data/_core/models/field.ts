import { Base } from './base';
import { IKey } from './key';
export enum FieldDataType {
  Text,
  Integer,
  BigInteger,
  Double,
  Boolean,
}

export class Field extends Base implements IKey {
  id: number;
  categoryId: number;
  name: string;
  dataType: FieldDataType;
  isSpecification: boolean;
  display: boolean;
  required: boolean;
  canCopy: boolean;
  order?: number;
}
