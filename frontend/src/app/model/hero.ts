import { IFile } from "./file";

export class Hero {
  name: string = '';
  level: number = 0;
  superpower: string = '';
  description: string = '';
  image?:IFile =  new IFile();
  _id?: string;
}
