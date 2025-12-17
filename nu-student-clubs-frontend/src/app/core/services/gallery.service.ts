import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MediaItem {
  id: number;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  title?: string;
  clubId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = `${environment.apiUrl}/gallery`;

  constructor(private http: HttpClient) {}

  getAllMedia(): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(this.apiUrl);
  }

  getMediaById(id: number): Observable<MediaItem> {
    return this.http.get<MediaItem>(`${this.apiUrl}/${id}`);
  }

  uploadMedia(request: any): Observable<MediaItem> {
    return this.http.post<MediaItem>(this.apiUrl, request);
  }

  updateMedia(id: number, request: any): Observable<MediaItem> {
    return this.http.put<MediaItem>(`${this.apiUrl}/${id}`, request);
  }

  deleteMedia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMediaByClub(clubId: number): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.apiUrl}/club/${clubId}`);
  }

  getMediaByType(type: 'IMAGE' | 'VIDEO'): Observable<MediaItem[]> {
    return this.http.get<MediaItem[]>(`${this.apiUrl}/type/${type}`);
  }
}
