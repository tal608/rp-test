import Link from "next/link";
import Image from "next/image";
import { socialLinks, contactInfo, directoryLinks } from "@/constants/social";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">River Paws</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Professional dog grooming and adventure hiking services. Located on the edge of Waunakee and Madison, 
              serving families from Middleton, DeForest, Sun Prairie, and throughout the greater Madison area since 2017.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dog-grooming" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming
                </Link>
              </li>
              <li>
                <Link href="/puppy-play" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Puppy Play
                </Link>
              </li>
              <li>
                <Link href="/dog-hikes" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Adventure Hikes
                </Link>
              </li>
              <li>
                <Link href="/puppy-grooming" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Puppy Grooming
                </Link>
              </li>
              <li>
                <Link href="/canine-grooming" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Grooming Products Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Blog & Articles
                </Link>
              </li>
              <li>
                <Link href="/caretakers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Grooming FAQs By Clients Within Our Service Area</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dog-grooming-madison" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming Madison
                </Link>
              </li>
              <li>
                <Link href="/dog-grooming-waunakee" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming Waunakee
                </Link>
              </li>
              <li>
                <Link href="/dog-grooming-middleton" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming Middleton
                </Link>
              </li>
              <li>
                <Link href="/dog-grooming-sun-prairie" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming Sun Prairie
                </Link>
              </li>
              <li>
                <Link href="/dog-grooming-deforest" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dog Grooming DeForest
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect With Us</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {contactInfo.phoneDisplay}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {contactInfo.email}
                  </a>
                </p>
              </div>
              
              {/* Social Media Links */}
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Follow us on social media:</p>
                <div className="flex items-center gap-3 mb-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-110 group"
                      aria-label={`Visit our ${social.name} page`}
                    >
                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={20}
                        height={20}
                        className="filter brightness-0 dark:brightness-0 dark:invert group-hover:brightness-0 group-hover:invert"
                      />
                    </a>
                  ))}
                </div>
                {/* Directory Links & Reviews */}
                <div className="space-y-3">
                  {/* Business Directories */}
                  {directoryLinks.length > 0 && (
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Find us on:</p>
                      <div className="space-y-1.5">
                        {directoryLinks.map((directory) => (
                          <a
                            key={directory.name}
                            href={directory.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors inline-flex items-center gap-1.5 block"
                            title={directory.description}
                          >
                            {directory.name === "Google Business Profile" && (
                              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                            )}
                            <span>{directory.name}</span>
                            {directory.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">({directory.description})</span>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Review Links */}
                  <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Leave a review:</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <a
                        href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Google Review
                      </a>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <a
                        href="https://www.yelp.com/writeareview/biz/river-paws-waunakee"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Yelp Review
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              © {new Date().getFullYear()} River Paws. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/policies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Policies
              </Link>
              <Link href="/waivers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Waivers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

