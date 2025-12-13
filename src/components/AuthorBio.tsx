import Link from "next/link";
import Image from "next/image";
import { getAuthor } from "@/constants/authors";

interface AuthorBioProps {
  authorName: string;
  className?: string;
}

export default function AuthorBio({ authorName, className = "" }: AuthorBioProps) {
  const author = getAuthor(authorName);

  return (
    <div className={`bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          {author.image ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-500 rounded-full flex items-center justify-center border-2 border-blue-500">
              <span className="text-white text-2xl font-bold">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{author.name}</h3>
              <p className="text-blue-600 font-semibold text-sm mb-2">{author.role}</p>
            </div>
            {author.teamMemberSlug && (
              <Link
                href={`/caretakers#${author.teamMemberSlug}`}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 whitespace-nowrap"
              >
                View Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          <p className="text-gray-700 text-sm leading-relaxed mb-3">{author.bio}</p>

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {author.credentials.map((cred, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {cred}
                </span>
              ))}
            </div>
          )}

          {/* Experience */}
          {author.yearsExperience && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{author.yearsExperience} years of professional experience</span>
            </div>
          )}

          {/* Link to Team Page */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/caretakers"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
            >
              Meet Our Full Team
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}




