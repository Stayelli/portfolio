export const config = {
  // CHANGED: We now watch ALL paths (/:path*) instead of just /services and /start, 
  // so we can catch subdomains no matter what they type.
  matcher: '/:path*', 
};

export default function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country');
  const url = new URL(request.url);
  const hostname = request.headers.get('host') || '';

  // 1. THE SUBDOMAIN CATCH-ALL
  // If the user is NOT on the standard stayelli.com, www.stayelli.com, localhost, or a vercel preview link...
  if (
    !hostname.includes('localhost') &&
    hostname !== 'stayelli.com' &&
    hostname !== 'www.stayelli.com' &&
    !hostname.includes('vercel.app') 
  ) {
    // Instantly bounce them to a fake path on your main domain to trigger the 404 component
    const redirectUrl = new URL('/asset-not-found', 'https://stayelli.com');
    return Response.redirect(redirectUrl, 307); 
  }

  // 2. THE SERVICES GEOFENCE
  if (url.pathname === '/services') {
    if (country === 'PH') {
      url.pathname = '/services-ph';
      return Response.redirect(url, 307); 
    }
  }

  // 3. THE FORM GEOFENCE (/start)
  if (url.pathname === '/start') {
    if (country !== 'PH' && !url.searchParams.has('region')) {
      url.searchParams.set('region', 'hk');
      return Response.redirect(url, 307);
    }
  }
}