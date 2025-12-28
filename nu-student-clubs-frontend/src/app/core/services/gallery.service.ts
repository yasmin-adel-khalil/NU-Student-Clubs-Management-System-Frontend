import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GalleryItem } from '../../shared/models/gallery.model';

export interface MediaItem {
  id?: number;
  imageUrl: string;
  url?: string;
  title: string;
  description: string;
  clubId: number;
  type?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class GalleryService {
  constructor(private api: ApiService) {}

  private base = '/gallery';

  getClubGallery(clubId: string): Observable<GalleryItem[]> {
    return this.api.get<GalleryItem[]>(`${this.base}/club/${clubId}`);
  }

  uploadClubImage(payload: { title: string; description: string; imageUrl: string; clubId: string }): Observable<GalleryItem> {
    // Backend expects imageUrl string; file upload is not supported
    return this.api.post<GalleryItem>(this.base, payload);
  }

  getAllMedia(): Observable<MediaItem[]> {
    return this.api.get<MediaItem[]>(this.base);
  }

  uploadMedia(payload: any): Observable<MediaItem> {
    return this.api.post<MediaItem>(this.base, payload);
  }

  updateMedia(id: number, payload: any): Observable<MediaItem> {
    return this.api.put<MediaItem>(`${this.base}/${id}`, payload);
  }

  deleteMedia(id: number): Observable<void> {
    return this.api.delete<void>(`${this.base}/${id}`);
  }
}
