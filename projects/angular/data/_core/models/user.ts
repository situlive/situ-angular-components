import { Brand } from './brand';
import { Category } from './category';
import { Plan } from './plan';
import { Theatre } from './theatre';

export class User {
  userId: string;
  firstName: string;
  lastName: string;
  userName?: string;
  confirmed?: boolean; // A brand user variable

  brands?: Brand[];
  categories?: Category[];
  plans?: Plan[];
  theatres?: Theatre[];
}