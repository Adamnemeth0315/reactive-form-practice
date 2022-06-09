import { Address } from "./address";

export class User {
  _id?: string;
  username: string = '';
  email: string = '';
  password: string = '';
  address?: Address = new Address();
  accessToken?: string;
  rememberMe: boolean = false;
}
