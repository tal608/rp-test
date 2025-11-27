import Link from "next/link";
import { headers } from "next/headers";

// Common redirect patterns for old URLs
const REDIRECT_PATTERNS: Record<string, string> = {
  '/dog-grooming': '/dog-grooming',
  '/dog-hikes': '/dog-hikes',
  '/hiking': '/dog-hikes',
  '/team': '/caretakers',
  '/staff': '/caretakers',
  '/about': '/caretakers',
  '/about-us': '/caretakers',
  '/application': '/apply',
  '/search': '/blog',
  // Live site URLs discovered from sitemap
  '/grooming-application': '/grooming-application',
  '/dog-hike-scheduling': '/dog-hike-scheduling',
  '/dog-daycare': '/puppy-play',
  '/agreement': '/waivers',
  '/grooming-and-doggy-daycare-gallery': '/gallery',
  '/puppy-play': '/puppy-play',
  '/sms': '/contact',
};

// Common variations that should redirect
const VARIATION_PATTERNS = [
  { pattern: /^\/dog-grooming\/?$/i, dest: '/dog-grooming' },
  { pattern: /^\/dog-hikes\/?$/i, dest: '/dog-hikes' },
  { pattern: /^\/hiking\/?$/i, dest: '/dog-hikes' },
  { pattern: /^\/team\/?$/i, dest: '/caretakers' },
  { pattern: /^\/staff\/?$/i, dest: '/caretakers' },
  { pattern: /^\/about(-us)?\/?$/i, dest: '/caretakers' },
  { pattern: /^\/application\/?$/i, dest: '/apply' },
  { pattern: /^\/search\/?$/i, dest: '/blog' },
  // Live site URL patterns
  { pattern: /^\/grooming-application\/?$/i, dest: '/grooming-application' },
  { pattern: /^\/dog-hike-scheduling\/?$/i, dest: '/dog-hike-scheduling' },
  { pattern: /^\/dog-daycare\/?$/i, dest: '/puppy-play' },
  { pattern: /^\/agreement\/?$/i, dest: '/waivers' },
  { pattern: /^\/grooming-and-doggy-daycare-gallery\/?$/i, dest: '/gallery' },
  { pattern: /^\/puppy-play\/?$/i, dest: '/puppy-play' },
  { pattern: /^\/sms\/?$/i, dest: '/contact' },
];

export default async function NotFound() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // Check if URL matches a known redirect pattern
  const suggestedRedirect = REDIRECT_PATTERNS[pathname];
  
  // Try pattern matching
  let matchedRedirect: string | null = null;
  if (!suggestedRedirect) {
    for (const { pattern, dest } of VARIATION_PATTERNS) {
      if (pattern.test(pathname)) {
        matchedRedirect = dest;
        break;
      }
    }
  }
  
  const redirectTo = suggestedRedirect || matchedRedirect;
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {redirectTo && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-800 font-semibold mb-4">
              Did you mean to visit:
            </p>
            <Link
              href={redirectTo}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to {redirectTo === '/dog-grooming' ? 'Dog Grooming' : redirectTo === '/dog-hikes' ? 'Dog Hikes' : redirectTo === '/caretakers' ? 'Our Team' : redirectTo.replace('/', '')}
            </Link>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Home</div>
              <div className="text-sm text-gray-600">Return to homepage</div>
            </Link>
            <Link
              href="/dog-grooming"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Dog Grooming</div>
              <div className="text-sm text-gray-600">Our grooming services</div>
            </Link>
            <Link
              href="/dog-hikes"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Adventure Hikes</div>
              <div className="text-sm text-gray-600">Our hiking services</div>
            </Link>
            <Link
              href="/contact"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Contact Us</div>
              <div className="text-sm text-gray-600">Get in touch</div>
            </Link>
            <Link
              href="/apply"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Apply</div>
              <div className="text-sm text-gray-600">Book an appointment</div>
            </Link>
            <Link
              href="/blog"
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
            >
              <div className="font-semibold text-gray-900">Blog</div>
              <div className="text-sm text-gray-600">Articles & tips</div>
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all shadow-lg"
            >
              Go to Homepage
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
