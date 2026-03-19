export const config = {
  // Now it watches BOTH the services page and the direct form page
  matcher: ['/services', '/start'], 
};

export default function middleware(request) {
  const country = request.headers.get('x-vercel-ip-country');
  const url = new URL(request.url);

  // 1. Handle the Services routing
  if (url.pathname === '/services') {
    if (country === 'PH') {
      url.pathname = '/services-ph';
      return Response.redirect(url, 307); 
    }
  }

  // 2. Handle the Hero CTA routing (/start)
  if (url.pathname === '/start') {
    // If the user is NOT in the Philippines, and the URL doesn't already have the HK tag...
    if (country !== 'PH' && !url.searchParams.has('region')) {
      // Invisibly add the HK tag to the URL so the form renders premium pricing
      url.searchParams.set('region', 'hk');
      return Response.redirect(url, 307);
    }
  }
}