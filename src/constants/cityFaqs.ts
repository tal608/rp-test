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
      question: "Where exactly is River Paws located for Madison dog owners?",
      answer: "We're right on the North Madison/Waunakee border—about 15 minutes from central Madison via Highway 113. We're also just 500 feet from Yahara Heights Dog Park, making us the perfect stop after an off-leash adventure.",
      fullContent: `<p>We're located right on the border of North Madison and Waunakee—about 15 minutes from central Madison via Highway 113 (Northport Drive). For families in Sherman, Northport, Cherokee, Maple Bluff, or the isthmus, we're an easy, straight shot north.</p>

<h3>The Yahara Heights Connection</h3>
<p>We're literally 500 feet from <strong>Yahara Heights Dog Park</strong>—one of the best off-leash parks in Dane County with 20 acres of woods and open fields. Many Madison families combine a morning at the park with a grooming appointment. Your dog runs, plays, gets muddy... then comes to us for a bath. It's become a whole Saturday routine for some regulars.</p>

<h3>Perfect for Cherokee Marsh Adventurers</h3>
<p>If your dog loves <strong>Cherokee Marsh Conservation Park</strong>, you know how messy they can get—especially during spring thaw or after rain. We're used to post-adventure dogs. Mud, burrs, that mysterious swamp smell... we've seen it all. Bring them dirty; we'll send them home fresh.</p>

<h3>What Makes Us Different</h3>
<p>Unlike high-volume pet store groomers, we see fewer dogs per day. That means:</p>
<ul>
<li><strong>Less waiting</strong> – Your dog isn't crated for hours before or after their groom</li>
<li><strong>Less stress</strong> – A calmer environment with fewer barking dogs</li>
<li><strong>More attention</strong> – Our groomers aren't rushing to hit quotas</li>
<li><strong>Better communication</strong> – We actually talk to you about what your dog needs</li>
</ul>

<h3>Great for Anxious Dogs</h3>
<p>If your dog has had stressful grooming experiences at high-volume salons, you'll notice the difference here. We go slow when needed, take breaks, and never force a dog through something they're clearly terrified of. Some of our most loyal Madison clients started with nervous dogs who'd been traumatized elsewhere.</p>

<p>Ready to try us out? <a href="/grooming-application" class="text-emerald-600 hover:text-emerald-700 font-medium underline">Book your first appointment</a> and see why Madison families keep coming back.</p>`
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
<p>Getting to River Paws is easy: take River Road west directly to our location at 5305 W River Rd. We're near Cherokee Marsh Wildlife Area, making us a convenient stop for families exploring the area's natural spaces.</p>

<p>Book your appointment today by calling <a href="tel:+16085717297" class="text-emerald-600 hover:text-emerald-700 font-medium underline">(608) 571-7297</a> or <a href="/grooming-application" class="text-emerald-600 hover:text-emerald-700 font-medium underline">apply online</a>.</p>`
    }
  ]
};

// Convert to FAQ format for FAQSection component
export function getCityGroomingFaqs(city: string): Array<{ question: string; answer: string }> {
  // Map normalized input to actual camelCase keys in cityGroomingFaqs
  const cityMap: Record<string, keyof typeof cityGroomingFaqs> = {
    'madison': 'madison',
    'sunprairie': 'sunPrairie',
    'sun prairie': 'sunPrairie',
    'middleton': 'middleton',
    'waunakee': 'waunakee',
    'deforest': 'deforest',
  };
  
  const normalizedInput = city.toLowerCase().replace(/\s+/g, '');
  const cityKey = cityMap[normalizedInput];
  
  if (!cityKey) return [];
  
  const faqs = cityGroomingFaqs[cityKey];
  if (!faqs) return [];
  
  return faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));
}

