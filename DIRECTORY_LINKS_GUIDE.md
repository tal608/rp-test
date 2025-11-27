# Directory Links Guide

## Current Directory Links

The website footer now includes a dynamic directory links section that automatically displays verified business listings. Currently active:

- ✅ **Google Business Profile** - Find us on Google Maps
- ✅ **Yelp** - Read reviews on Yelp

## How to Add More Directory Links

As you verify or create listings on additional directories, you can easily add them by editing `riverpaws/src/constants/social.ts`.

### Step-by-Step Instructions

1. **Verify Your Listing Exists**
   - Search for "River Paws Waunakee" on the directory website
   - Make sure your business information is accurate
   - Copy the direct URL to your business listing/profile

2. **Add to `directoryLinks` Array**
   - Open `riverpaws/src/constants/social.ts`
   - Find the `directoryLinks` array (around line 38)
   - Uncomment and fill in a directory entry:

```typescript
{
  name: "Better Business Bureau",
  url: "https://www.bbb.org/profile/your-business-id",
  description: "BBB Accredited Business"
},
```

3. **Save and Deploy**
   - The footer will automatically update to include the new link
   - No other code changes needed!

## Priority Directories to Verify/Create

Based on local SEO best practices, here are the most valuable directories to claim:

### 🔴 High Priority (Do First):
1. **Better Business Bureau (BBB)**
   - Search: https://www.bbb.org/search
   - Query: "River Paws Waunakee WI"
   - Benefit: Trust signal, high authority citation

2. **Yellow Pages**
   - Search: https://www.yellowpages.com/
   - Query: "River Paws Waunakee"
   - Benefit: Still indexed by Google, trusted directory

3. **Bing Places for Business**
   - URL: https://www.bingplaces.com/
   - Claim your listing (if not already)
   - Benefit: Second largest search engine

4. **Apple Maps**
   - URL: https://businessconnect.apple.com/
   - Claim via Apple Business Connect
   - Benefit: iPhone users rely heavily on Apple Maps

### 🟡 Medium Priority:
5. **Angi (formerly Angie's List)**
   - URL: https://www.angi.com/
   - Create business profile
   - Benefit: Popular for service businesses

6. **Manta**
   - URL: https://www.manta.com/
   - Create/claim listing
   - Benefit: Good citation source

7. **Nextdoor Business**
   - URL: https://business.nextdoor.com/
   - Create business page
   - Benefit: Hyperlocal visibility

## How to Find Your Directory URLs

### For Each Directory:
1. **BBB**: Search your business, click your listing, copy the URL from browser
   - Example: `https://www.bbb.org/us/wi/waunakee/profile/dog-grooming/river-paws-123456`

2. **Yellow Pages**: Search your business, click listing, copy URL
   - Example: `https://www.yellowpages.com/waunakee-wi/mip/river-paws-1234567890`

3. **Angi**: Create profile, then copy the business page URL
   - Example: `https://www.angi.com/companylist/us/wi/waunakee/river-paws.htm`

4. **Manta**: Create listing, copy the business profile URL
   - Example: `https://www.manta.com/c/mxxxxx/river-paws`

## Current Implementation

The footer now displays directory links in a clean, organized section under "Find us on:" with:
- Descriptive names
- Optional descriptions
- Proper external link attributes (target="_blank", rel="noopener noreferrer")
- Icon support (currently Google Maps has an icon)

All directory links are styled consistently with the rest of the footer and include hover effects.

## Notes

- Directory links are separate from social media links
- Review links (Leave Google Review, Leave Yelp Review) remain in their own section
- The structure is extensible - just uncomment and fill in more entries as you verify listings
- Make sure NAP (Name, Address, Phone) is consistent across all directories

