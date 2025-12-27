import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Prerender safe static routes
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'clubs', renderMode: RenderMode.Prerender },
  // Fallback to server render for dynamic or parameterized routes
  { path: '**', renderMode: RenderMode.Server }
];
