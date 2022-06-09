export class IFile {
  _id?: string;
  originalname: string = '';
  filename?: string;
  destination?: string;
  url?:string;
  path?: string;
  mimetype?: string;
  size?: number;
  createdAt?: Date;
}
