import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Prerender safe static routes
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'clubs', renderMode: RenderMode.Prerender },
  { path: 'events', renderMode: RenderMode.Prerender },
  { path: 'gallery', renderMode: RenderMode.Prerender },
  { path: 'auth', renderMode: RenderMode.Prerender },
  { path: 'dashboard', renderMode: RenderMode.Prerender },
  // Fallback to server render for dynamic or parameterized routes
  { path: '**', renderMode: RenderMode.Server }
];
