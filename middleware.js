export const config = {
  matcher: '/images/:path*',
};

export default function middleware(request) {
  const dest = request.headers.get('sec-fetch-dest');
  // Direct browser navigation to an image URL → redirect to homepage
  if (dest === 'document') {
    return Response.redirect(new URL('/', request.url), 302);
  }
  // Image loaded as resource by a page (<img src="...">) → serve normally
}
