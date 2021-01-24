import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    constructor(private http: HttpClient) {
    }

    getContents(params: string) {
        return this.http.get<any>(`${environment.API_URL}/my/content${params}`);
    }

    getContent(id: string, params?: string) {
        return this.http.get<any>(`${environment.API_URL}/my/content/${id}/text${params}`);
    }

    getContentImages(id: string, textID: string) {
        return this.http.get<any>(`${environment.API_URL}/my/content/${id}/text/${textID}/media?pageSize=100`);
    }

    updateContentBlock(payload: {
        content: {
            type: string,
            value: string
        }
    }, id: string) {
        return this.http.post<any>(`${environment.API_URL}/my/content/${id}/text/${id}/update`, payload);
    }

    uploadContentBlockImage(payload: {
        url: string,
        type: string,
        title: string
    }, id: string) {
        return this.http.post<any>(`${environment.API_URL}/my/content/${id}/text/${id}/media`, payload);
    }
}