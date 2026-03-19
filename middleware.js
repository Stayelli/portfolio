export const config = {
  // This tells Vercel to ONLY run this script when someone visits the default premium page
  matcher: '/services', 
};

export default function middleware(request) {
  // Vercel automatically injects the user's country code based on their IP address
  const country = request.headers.get('x-vercel-ip-country');

  // If the user is in the Philippines, intercept and reroute to the local PHP page
  if (country === 'PH') {
    const url = new URL('/services-ph', request.url);
    return Response.redirect(url, 307); // 307 is a temporary redirect
  }

  // If the user is in Hong Kong, the US, or anywhere else, do nothing. 
  // Let them proceed to the premium HKD pricing.
}