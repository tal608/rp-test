export interface CityFAQ {
  city: string;
  question: string;
  answer: string;
  fullContent?: string; // Full article content if needed
}

// City-specific FAQs extracted from live site
export const cityGroomingFaqs: Record<string, CityFAQ[]> = {
  madison: [
    {
      city: "Madison",
      question: "What are the benefits of regular dog grooming?",
      answer: "Regular grooming is essential to the health and well-being of your dog. Not only does it make them look good, but it also enables you to find and address any potential issues such as skin irritations or external parasites that may be present. Grooming also provides an opportunity to check for any lumps, bumps, or other changes in your dog's appearance that could be early signs of illness or disease. The health benefits of grooming your dog are vast and very important.",
      fullContent: `<p>Regular grooming is essential to the health and well-being of your dog. Not only does it make them look good, but it also plays a crucial role in maintaining their overall health. During grooming, we check for any potential issues such as skin irritations or external parasites. Grooming also provides an opportunity to spot lumps, bumps, or other changes that could be early signs of illness. Here are the key health benefits:</p>

<h3>Health Checks</h3>
<p>Grooming provides an opportunity to check your dog for any abnormalities, such as lumps, bumps, skin infections, or issues with their nails, teeth, ears, and eyes that may require attention from a veterinarian.</p>

<h3>Brushing</h3>
<p>Brushing is one of the most important aspects of grooming, as it helps remove dirt, debris, and dead skin cells. It also stimulates circulation and helps distribute natural oils throughout the coat. Be sure to use a brush appropriate for your dog's coat type.</p>

<h3>Bathing</h3>
<p>Bathing helps remove any dirt or debris lodged in the coat. It's important to use a shampoo specifically designed for dogs, as human shampoo can strip away natural oils and cause irritation.</p>

<h3>Nail Care</h3>
<p>Regular nail trims help maintain proper posture and prevent health problems. Long nails can cause discomfort and make it difficult for your dog to walk properly.</p>

<h3>Ear Cleaning</h3>
<p>Ear cleaning prevents accumulation of wax and debris that can lead to infections.</p>

<h3>Dental Hygiene</h3>
<p>Brushing your pet's teeth removes plaque build-up which can cause bacterial infections or tooth decay. It also contributes to fresher breath!</p>

<h3>Eye Care</h3>
<p>Cleaning away any discharge around their eyes with warm water helps prevent bacteria that could cause inflammation or irritation.</p>

<h3>Behavioral Conditioning</h3>
<p>Regular grooming helps dogs become accustomed to being handled, making vet visits and other handling situations less stressful. For puppies, early grooming experiences are especially important for creating positive associations.</p>

<h3>Socialization</h3>
<p>Professional grooming helps with socialization, getting dogs used to being around other dogs and people outside their home environment. Learn more about our <a href="/dog-grooming" class="text-emerald-600 hover:text-emerald-700 font-medium underline">professional grooming services</a>.</p>`
    }
  ],
  sunPrairie: [
    {
      city: "Sun Prairie",
      question: "What things could I do before/after the grooming appointment?",
      answer: "When you make a grooming appointment for your dog, there are a few additional things you can do before and after the appointment to help make the experience more pleasant for both you and your dog. Grooming can be a stressful experience for some dogs, so it's important to get them used to the idea of being groomed ahead of time. You can start by simply brushing your dog's fur regularly.",
      fullContent: `<p>When you make a grooming appointment for your dog, there are a few things you can do before and after to help make the experience more pleasant for both you and your dog.</p>

<h3>Before the Appointment:</h3>
<ul>
<li><strong>Grooming can be stressful for some dogs</strong>, so it's important to get them used to it ahead of time. Start by brushing your dog's fur regularly—this helps them get used to being touched and keeps their fur healthy and tangle-free.</li>
<li><strong>Prepare your dog mentally</strong> by creating positive associations with grooming tools. For puppies, this is especially important for long-term comfort.</li>
<li><strong>Exercise your dog before the appointment</strong> to help them be calmer during grooming.</li>
<li><strong>Bring your dog's favorite treats</strong> to help create positive associations.</li>
<li><strong>Arrive on time</strong> to avoid unnecessary stress for both you and your dog.</li>
</ul>

<h3>After the Appointment:</h3>
<ul>
<li><strong>Allow your dog to rest</strong> after grooming as the process can be tiring.</li>
<li><strong>Monitor your dog</strong> for any signs of discomfort or irritation.</li>
<li><strong>Follow any specific care instructions</strong> provided by your groomer.</li>
<li><strong>Maintain regular grooming schedules</strong> to keep your dog comfortable and healthy.</li>
</ul>

<p>Ready to book? Check out our <a href="/dog-grooming" class="text-emerald-600 hover:text-emerald-700 font-medium underline">grooming services</a> page for more information.</p>`
    }
  ],
  middleton: [
    {
      city: "Middleton",
      question: "What are the Tips and Tricks for bathing your dog at home?",
      answer: "Bathing your pup at home can be a difficult and daunting task, especially for first-time dog owners and those with anxious dogs. A good bath is essential for any pet's health, but it's important to keep the process stress-free. It is essential to gather all the necessary items ahead of time.",
      fullContent: `<p>Bathing your pup at home can be a daunting task, especially for first-time dog owners and those with anxious dogs. A good bath is essential for your pet's health, but it's important to keep the process stress-free.</p>

<h3>Preparation is Key:</h3>
<ul>
<li><strong>Gather all necessary items ahead of time</strong>: Dog-specific shampoo (human shampoo can strip natural oils and cause irritation), towels, treats, toys, and patience.</li>
<li><strong>Choose the right location</strong>: A bathtub, sink, or outdoor area with a hose works well. Make sure the space is secure and comfortable for your dog.</li>
<li><strong>Prepare the water</strong>: Test the water temperature—lukewarm is usually most comfortable for dogs.</li>
</ul>

<h3>During the Bath:</h3>
<ul>
<li><strong>Use dog-specific shampoo</strong>: Human shampoos can cause skin irritation and strip essential oils from your dog's coat.</li>
<li><strong>Be gentle and calm</strong>: Speak in a soothing voice and take your time. Rushing can increase anxiety.</li>
<li><strong>Avoid getting water in ears and eyes</strong>: Use a washcloth to protect these sensitive areas.</li>
<li><strong>Rinse thoroughly</strong>: Leftover shampoo can cause skin irritation.</li>
</ul>

<h3>After the Bath:</h3>
<ul>
<li><strong>Dry thoroughly</strong>: Use towels to remove excess water. Some dogs enjoy a gentle blow-dry on a low, cool setting.</li>
<li><strong>Reward your dog</strong>: Give treats and praise to create positive associations with bath time.</li>
<li><strong>Brush after drying</strong>: This helps remove any remaining loose fur and prevents matting.</li>
</ul>

<p>Need professional help? Our <a href="/dog-grooming" class="text-emerald-600 hover:text-emerald-700 font-medium underline">full-service grooming</a> takes the stress out of bath time.</p>`
    }
  ],
  waunakee: [
    {
      city: "Waunakee",
      question: "What are some of the best products for canine grooming?",
      answer: "Choosing the right grooming tools is important. There are several types of canine grooming brushes, each suited for different coat types that require different brushes for effective grooming. These include rubber brushes for short and medium coats, slicker brushes for medium, long, curly, or wire coats...",
      fullContent: `<p>Choosing the right grooming tools is important. There are several types of canine grooming brushes, each suited for different coat types.</p>

<h3>Types of Brushes:</h3>
<ul>
<li><strong>Rubber brushes</strong>: Best for short and medium coats. These help remove loose fur and distribute natural oils.</li>
<li><strong>Slicker brushes</strong>: Ideal for medium, long, curly, or wire coats. These help remove mats and tangles while being gentle on the skin.</li>
<li><strong>Pin brushes</strong>: Great for long-haired breeds. The rounded pins prevent scratching while removing tangles.</li>
<li><strong>Bristle brushes</strong>: Perfect for finishing and polishing smooth coats. Helps distribute oils and remove surface dirt.</li>
</ul>

<h3>Other Essential Tools:</h3>
<ul>
<li><strong>Dog-specific shampoos and conditioners</strong>: Choose products based on your dog's coat type and any skin conditions.</li>
<li><strong>Nail clippers or grinders</strong>: Essential for maintaining healthy nail length.</li>
<li><strong>Ear cleaning solutions</strong>: Help prevent ear infections by keeping ears clean and dry.</li>
<li><strong>Toothbrushes and toothpaste</strong>: Specially designed for dogs to maintain dental health.</li>
<li><strong>Grooming wipes</strong>: Convenient for quick cleanups between baths.</li>
</ul>

<h3>Choosing Products:</h3>
<p>When selecting grooming products, consider your dog's:</p>
<ul>
<li>Coat type (short, long, curly, wiry)</li>
<li>Skin sensitivity</li>
<li>Age (puppy, adult, senior)</li>
<li>Special needs (dry skin, allergies, etc.)</li>
</ul>
<p>At River Paws, we use only premium, professional-grade products that are safe and effective for all dogs. Learn more about our <a href="/dog-grooming" class="text-emerald-600 hover:text-emerald-700 font-medium underline">professional grooming services</a>.</p>`
    },
    {
      city: "Waunakee",
      question: "Do you do Puppy Grooming?",
      answer: "Starting grooming routines early with a puppy can be an important aspect of their physical health and emotional well-being. Puppy grooming acclimates them to being handled, which is essential for vet visits and future grooming appointments. Puppies are much more open to new experiences than older dogs and waiting...",
      fullContent: `<p>Starting grooming routines early with a puppy is important for their physical health and emotional well-being. Puppy grooming acclimates them to being handled, which is essential for vet visits and future grooming appointments.</p>

<h3>Why Start Early:</h3>
<ul>
<li><strong>Puppies are much more open to new experiences</strong> than older dogs. Waiting until they're older can make grooming more stressful.</li>
<li><strong>Early acclimation</strong> helps create positive associations with grooming that last a lifetime.</li>
<li><strong>Gentle introduction</strong> to grooming tools and processes prevents fear and anxiety later.</li>
</ul>

<h3>What Puppy Grooming Includes:</h3>
<ul>
<li>Gentle introduction to grooming tools</li>
<li>Basic brushing and handling</li>
<li>Light bathing (when appropriate)</li>
<li>Nail trimming (if needed)</li>
<li>Ear cleaning basics</li>
<li>Positive reinforcement throughout</li>
</ul>

<h3>Benefits of Puppy Grooming:</h3>
<ul>
<li>Creates positive associations with grooming</li>
<li>Makes future grooming appointments easier</li>
<li>Helps with socialization</li>
<li>Prepares puppies for vet visits</li>
<li>Establishes healthy grooming habits early</li>
</ul>

<h3>When to Start:</h3>
<p>Puppies can begin gentle grooming experiences as early as 12 weeks old, once they've received their initial vaccinations. Early, positive experiences set the foundation for a lifetime of comfortable grooming.</p>

<p>At River Paws, our experienced groomers specialize in making <a href="/puppy-grooming" class="text-emerald-600 hover:text-emerald-700 font-medium underline">puppy grooming</a> a positive, stress-free experience your puppy will look forward to.</p>`
    }
  ],
  deforest: [
    {
      city: "DeForest",
      question: "What should I know about dog grooming services near DeForest?",
      answer: "River Paws offers convenient dog grooming services for DeForest pet owners. Located southwest of DeForest via River Road, we're just minutes away and perfect for post-dog park grooming after visiting Yahara Heights Dog Park. Our expert groomers provide full-service grooming, breed-specific styling, and compassionate care. Many DeForest families find us convenient after their dogs enjoy the 20-acre off-leash area at Yahara Heights, just 500 feet from our location.",
      fullContent: `<p>River Paws offers convenient grooming services for pet owners in the DeForest area. Located southwest via River Road, we're just minutes away and perfect for post-adventure grooming.</p>

<h3>Convenient Location</h3>
<p>Our River Road location is especially convenient for post-dog park grooming after visiting Yahara Heights Dog Park, which is just 500 feet from our facility. Many families bring their dogs for grooming after their pups enjoy the 20-acre off-leash area.</p>

<h3>Why Pet Owners Choose River Paws</h3>
<ul>
<li><strong>Convenient location</strong>: Southwest via River Road, serving Windsor and surrounding communities</li>
<li><strong>Perfect for post-park grooming</strong>: Just 500 feet from Yahara Heights Dog Park, ideal for cleaning up muddy, happy dogs</li>
<li><strong>Expert groomers</strong>: Professional, experienced team who understand active dogs</li>
<li><strong>Full-service grooming</strong>: Breed-specific styling, nail trimming, ear cleaning, and more</li>
<li><strong>Gentle approach</strong>: Stress-free grooming experiences for dogs of all temperaments</li>
</ul>

<h3>Our Grooming Services</h3>
<ul>
<li>Full-service grooming with breed-specific styling</li>
<li>Puppy grooming starting at 12 weeks</li>
<li>Nail trimming and ear cleaning</li>
<li>Bathing with premium, pet-safe products</li>
<li>By appointment only</li>
</ul>

<h3>Easy Access</h3>
<p>Getting to River Paws is easy: take River Road west directly to our location at 5305 River Road. We're near Cherokee Marsh Wildlife Area, making us a convenient stop for families exploring the area's natural spaces.</p>

<p>Book your appointment today by calling <a href="tel:+16085717297" class="text-emerald-600 hover:text-emerald-700 font-medium underline">(608) 571-7297</a> or <a href="/grooming-application" class="text-emerald-600 hover:text-emerald-700 font-medium underline">apply online</a>.</p>`
    }
  ]
};

// Convert to FAQ format for FAQSection component
export function getCityGroomingFaqs(city: string): Array<{ question: string; answer: string }> {
  const cityKey = city.toLowerCase().replace(/\s+/g, '');
  const faqs = cityGroomingFaqs[cityKey as keyof typeof cityGroomingFaqs];
  
  if (!faqs) return [];
  
  return faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
}

