import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { GalleryItem } from '../../shared/models/gallery.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  constructor(private api: ApiService) {}

  private base = '/api/gallery';

  getClubGallery(clubId: string): Observable<GalleryItem[]> {
    return this.api.get<GalleryItem[]>(`${this.base}/club/${clubId}`);
  }

  uploadClubImage(payload: { title: string; description: string; imageUrl: string; clubId: string }): Observable<GalleryItem> {
    return this.api.post<GalleryItem>(this.base, payload);
  }
}
