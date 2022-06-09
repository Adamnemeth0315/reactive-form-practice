import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFile } from '../model/file';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  create(file: File): Observable<IFile> {
    const formData: FormData = new FormData();
    if(
      file.name.includes('.png') ||
      file.name.includes('.jpg')
    ) {
      formData.append('file', file);
    } else {
      throw new Error('Only png and jpg format allowed!');
    }
    
    return this.http.post<IFile>(`${this.config.apiUrl}single`, formData);
  }


  remove(file: IFile): Observable<IFile>{
    return this.http.delete<IFile>(`${this.config.apiUrl}single/${file.filename}`);
  }
}
