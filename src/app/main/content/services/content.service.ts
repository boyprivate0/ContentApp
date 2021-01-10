import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONTENT } from '../models/content';
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private http: HttpClient) {
    }

    getContents() {
        return this.http.get<any>(`${environment.API_URL}/my/content`);
    }

    getContent(id: string) {
        return this.http.get<any>(`${environment.API_URL}/my/content/${id}/text`);
    }
}