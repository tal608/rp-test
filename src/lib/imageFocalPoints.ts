/**
 * Image focal point coordinates from CSV optimization report
 * Maps image filenames to their optimal focal point coordinates (X%, Y%)
 */

const focalPointMap: Record<string, { x: number; y: number }> = {
  // Transformation/before-after images
  'grooming-transformation-doodle-madison-wi-river-paws.jpg': { x: 50, y: 36 },  
  // Happy Bernesemix/Spaniel mix
  'happy-bernesemix-grooming-madison-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Pomeranian images
  'freshly-groomed-pomeranian-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Doodle images
  'freshcut-doodle-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },
  'freshly-groomed-doodle-salon-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },
  'freshly-groomed-doodle-mix-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },
  // Goldendoodle images
  'freshly-groomed-goldendoodle-salon-madison-wi-river-paws.jpg': { x: 50, y: 25 },  
  // Spaniel/Bath images
  'pampered-spaniel-bath-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Husky images
  'happy-husky-groomed-deforest-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Maltipoo/Cavapoo images
  'curious-maltipoo-grooming-tub-sun-prairie-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Poodle images
  'groomed-poodle-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 20 },  
  // Shih Tzu images
  'groomed-shih-tzu-grooming-madison-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Terrier images
  'calm-biewer-terrier-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 60 },  
  // Cockapoo images
  'calm-cockapoo-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },  
  // German Shepherd images
  'calm-german-shepherd-grooming-salon-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },  
  // Other grooming images
  'groomed-dog-grooming-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },
  
  // Halloween/Special images
  'halloween-portrait-schnauzer-madison-wi-river-paws.jpg': { x: 50, y: 55 },
  
  // Adventure/Hiking images (from Grooming folder)
  'joyful-rolling-mixed-breed-grassy-field-sun-prairie-wi-river-paws.jpg': { x: 55, y: 65 },
  
  // Adventure/Hiking images (from Hiking folder)
  'joyful-lab-and-doodle-wilderness-trails-madison-wi-river-paws.jpg': { x: 45, y: 42 },
  'energetic-pack-fitness-hiking-waunakee-wi-river-paws.jpg': { x: 35, y: 40 },
  'happy-golden-retriever-wilderness-trails-sun-prairie-wi-river-paws.jpg': { x: 53, y: 35 },
  'joyful-goldendoodle-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 47, y: 45 },
  'energetic-terrier-mix-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 52, y: 38 },
  'confident-terrier-mix-wilderness-trails-madison-wi-river-paws.jpg': { x: 50, y: 40 },
  'curious-chihuahua-mix-dog-hiking-madison-wi-river-paws.jpg': { x: 65, y: 35 },
  'joyful-golden-retriever-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 42, y: 45 },
  'energetic-german-shepherd-dog-hiking-madison-wi-river-paws.jpg': { x: 48, y: 38 },
  'playful-aussie-mix-wilderness-adventure-waunakee-wi-river-paws.jpg': { x: 22, y: 48 },
  'happy-alert-brindle-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 42, y: 35 },
  'energetic-english-cream-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 50, y: 55 },
  'confident-mixed-pack-dog-hiking-waunakee-wi-river-paws.jpg': { x: 82, y: 48 },
  'joyful-mini-aussie-dog-hiking-madison-wi-river-paws.jpg': { x: 50, y: 55 },
  'joyful-australian-shepherd-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 45, y: 30 },
  'energetic-husky-mix-wilderness-trails-sun-prairie-wi-river-paws.jpg': { x: 52, y: 58 },
  'happy-mixed-pack-social-hiking-deforest-wi-river-paws.jpg': { x: 45, y: 35 },
  'content-golden-retriever-wilderness-hiking-sun-prairie-wi-river-paws.jpg': { x: 45, y: 40 },
  'energetic-pointer-dog-hiking-deforest-wi-river-paws.jpg': { x: 58, y: 40 },
  'joyful-bernedoodle-dog-hiking-waunakee-wi-river-paws.jpg': { x: 38, y: 30 },
  'joyful-pointer-labrador-off-leash-hiking-sun-prairie-wi-river-paws.jpg': { x: 48, y: 20 },
  'joyful-terrier-mix-wilderness-hiking-sun-prairie-wi-river-paws.jpg': { x: 48, y: 42 },
  'happy-golden-retriever-pack-hiking-deforest-wi-river-paws.jpg': { x: 38, y: 28 },
  'relaxed-terrier-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 18, y: 62 },
  'curious-golden-retriever-spaniel-dog-hiking-waunakee-wi-river-paws.jpg': { x: 45, y: 60 },
  'energetic-spaniel-wilderness-trails-madison-wi-river-paws.jpg': { x: 58, y: 40 },
  'happy-pack-resting-dog-hiking-deforest-wi-river-paws.jpg': { x: 50, y: 30 },
  'attentive-pack-socialization-waunakee-wi-river-paws.jpg': { x: 65, y: 45 },
  'joyful-pack-social-hiking-madison-wi-river-paws.jpg': { x: 50, y: 40 },
  'joyful-golden-retriever-adventure-hiking-sun-prairie-wi-river-paws.jpg': { x: 48, y: 38 },
  'golden-retriever-group-hiking-sun-prairie-wi-river-paws.jpg': { x: 70, y: 65 },
  'content-goldendoodle-outdoor-enrichment-deforest-wi-river-paws.jpg': { x: 52, y: 35 },
  'energetic-pack-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 56, y: 65 },
  'confident-goldendoodle-terrier-mix-wilderness-trails-madison-wi-river-paws.jpg': { x: 68, y: 28 },
  'content-terrier-mix-dog-hiking-deforest-wi-river-paws.jpg': { x: 42, y: 35 },
  'joyful-terrier-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 40, y: 38 },
  'radiant-golden-retriever-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 50, y: 52 },
  'joyful-brindle-mix-running-waunakee-wi-river-paws.jpg': { x: 48, y: 35 },
  'confident-mixed-breeds-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 65, y: 55 },
  'joyful-havanese-dog-bus-transport-deforest-wi-river-paws.jpg': { x: 50, y: 35 },
  'energetic-golden-retriever-pack-dog-hiking-madison-wi-river-paws.jpg': { x: 45, y: 50 },
  'curious-dogs-natural-enrichment-hiking-madison-wi-river-paws.jpg': { x: 40, y: 55 },
  'joyful-golden-retriever-outdoor-enrichment-sun-prairie-wi-river-paws.jpg': { x: 48, y: 38 },
  'adventurous-mixed-breed-wilderness-trails-sun-prairie-wi-river-paws.jpg': { x: 60, y: 45 },
  'energetic-pack-wilderness-hiking-madison-wi-river-paws.jpg': { x: 40, y: 45 },
  'energetic-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 65, y: 42 },
  'joyful-golden-retriever-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 55, y: 35 },
  'satisfied-golden-retriever-hiking-waunakee-wi-river-paws.jpg': { x: 38, y: 35 },
  'satisfied-aussie-mix-adventure-play-deforest-wi-river-paws.jpg': { x: 42, y: 28 },
  'joyful-golden-retrievers-pack-hiking-deforest-wi-river-paws.jpg': { x: 64, y: 40 },
  'radiant-lab-mix-wilderness-play-waunakee-wi-river-paws.jpg': { x: 38, y: 30 },
  'content-golden-retriever-wilderness-trails-deforest-wi-river-paws.jpg': { x: 50, y: 50 },
  'confident-mixed-pack-hiking-waunakee-wi-river-paws.jpg': { x: 40, y: 50 },
  'excited-weimaraner-dog-bus-transport-sun-prairie-wi-river-paws.jpg': { x: 54, y: 32 },
  'content-golden-retriever-outdoor-enrichment-deforest-wi-river-paws.jpg': { x: 47, y: 32 },
  'confident-weimaraner-dog-bus-transport-madison-wi-river-paws.jpg': { x: 42, y: 22 },
  'content-golden-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 45, y: 40 },
  'joyful-golden-retriever-outdoor-enrichment-deforest-wi-river-paws.jpg': { x: 35, y: 65 },
  'eager-pack-dog-bus-transport-deforest-wi-river-paws.jpg': { x: 62, y: 22 },
  'curious-terrier-mix-wilderness-exploration-deforest-wi-river-paws.jpg': { x: 52, y: 38 },
  'curious-goldendoodle-wilderness-hiking-sun-prairie-wi-river-paws.jpg': { x: 35, y: 40 },
  'content-bernedoodle-dog-bus-madison-wi-river-paws.jpg': { x: 55, y: 38 },
  'focused-gsp-pointer-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 22, y: 63 },
  'energetic-bernedoodle-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 48, y: 45 },
  'adventurous-goldendoodle-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 43, y: 38 },
  'spirited-golden-retriever-adventure-park-madison-wi-river-paws.jpg': { x: 82, y: 78 },
  'joyful-gsp-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 45, y: 35 },
  'content-gsp-golden-retriever-dog-hiking-madison-wi-river-paws.jpg': { x: 58, y: 35 },
  'happy-golden-retriever-dog-hiking-madison-wi-river-paws.jpg': { x: 56, y: 54 },
  'athletic-black-mix-dog-hiking-deforest-wi-river-paws.jpg': { x: 55, y: 38 },
  'inquisitive-chihuahua-mix-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 50, y: 45 },
  'wisconsin-active-pack-dog-hiking-madison-wi-river-paws.jpg': { x: 66, y: 55 },
  'athletic-lab-mix-dog-hiking-deforest-wi-river-paws.jpg': { x: 40, y: 48 },
  'attentive-gsp-dog-bus-transport-waunakee-wi-river-paws.jpg': { x: 42, y: 30 },
  'happy-bernedoodle-dog-bus-madison-wi-river-paws.jpg': { x: 65, y: 35 },
  'energetic-mixed-breed-dog-hiking-madison-wi-river-paws.jpg': { x: 48, y: 38 },
  'curious-small-dog-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 44, y: 22 },
  'curious-terrier-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 55, y: 60 },
  'peaceful-mixed-pack-wilderness-trails-deforest-wi-river-paws.jpg': { x: 45, y: 55 },
  'content-spaniel-outdoor-enrichment-deforest-wi-river-paws.jpg': { x: 38, y: 32 },
  'relaxed-golden-retriever-socializing-waunakee-wi-river-paws.jpg': { x: 42, y: 40 },
  'wisconsin-content-golden-retriever-dog-hiking-madison-wi-river-paws.jpg': { x: 40, y: 50 },
  'playful-blue-merle-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 45, y: 35 },
  'joyful-black-lab-dog-bus-madison-wi-river-paws.jpg': { x: 50, y: 35 },
  'calm-golden-retriever-dog-bus-transport-madison-wi-river-paws.jpg': { x: 52, y: 25 }, // Adjusted higher for Convenient Pickup card (h-48 container)
  'playful-golden-retriever-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 55, y: 38 },
  'confident-mixed-pack-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 22, y: 42 },
  'content-terrier-buddies-dog-bus-transport-waunakee-wi-river-paws.jpg': { x: 50, y: 45 },
  'joyful-blue-merle-adventure-hiking-waunakee-wi-river-paws.jpg': { x: 55, y: 40 },
  'joyful-goldendoodle-dog-hiking-madison-wi-river-paws.jpg': { x: 42, y: 45 },
  'content-golden-retriever-spaniel-pack-outdoor-enrichment-sun-prairie-wi-river-paws.jpg': { x: 60, y: 35 },
  'birthday-golden-retriever-social-waunakee-wi-river-paws.jpg': { x: 50, y: 45 },
  'happy-mixed-pack-social-hiking-middleton-wi-river-paws.jpg': { x: 45, y: 35 },
  'energetic-pointer-dog-hiking-middleton-wi-river-paws.jpg': { x: 58, y: 40 },
  'happy-golden-retriever-pack-hiking-middleton-wi-river-paws.jpg': { x: 38, y: 28 },
  'happy-pack-resting-dog-hiking-middleton-wi-river-paws.jpg': { x: 50, y: 30 },
  'content-goldendoodle-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 52, y: 35 },
  'content-terrier-mix-dog-hiking-middleton-wi-river-paws.jpg': { x: 42, y: 35 },
  'spirited-terrier-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 40, y: 38 },
  'joyful-havanese-dog-bus-transport-middleton-wi-river-paws.jpg': { x: 50, y: 35 },
  'satisfied-aussie-mix-adventure-play-middleton-wi-river-paws.jpg': { x: 42, y: 28 },
  'joyful-golden-retrievers-pack-hiking-middleton-wi-river-paws.jpg': { x: 64, y: 40 },
  'content-golden-retriever-wilderness-trails-middleton-wi-river-paws.jpg': { x: 50, y: 50 },
  'disciplined-mixed-pack-hiking-waunakee-wi-river-paws.jpg': { x: 60, y: 75 },
  'content-golden-retriever-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 47, y: 32 },
  'playful-golden-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 45, y: 40 },
  'joyful-golden-retriever-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 35, y: 65 },
  'eager-pack-dog-bus-transport-middleton-wi-river-paws.jpg': { x: 62, y: 22 },
  'curious-terrier-mix-wilderness-exploration-middleton-wi-river-paws.jpg': { x: 52, y: 38 },
  'athletic-black-mix-dog-hiking-middleton-wi-river-paws.jpg': { x: 55, y: 38 },
  'athletic-lab-mix-dog-hiking-middleton-wi-river-paws.jpg': { x: 40, y: 48 },
  'peaceful-mixed-pack-wilderness-trails-middleton-wi-river-paws.jpg': { x: 45, y: 55 },
  'athletic-golden-retriever-jolly-ball-waunakee-wi-river-paws.jpg': { x: 55, y: 38 },
  'radiant-golden-retriever-dog-hiking-madison-wi-river-paws.jpg': { x: 64, y: 42 },
  'content-golden-retriever-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 60, y: 35 },
  'playful-golden-retriever-adventure-park-sun-prairie-wi-river-paws.jpg': { x: 42, y: 52 },
  'focused-german-shepherd-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 48, y: 35 },
  'happy-black-lab-dog-bus-transport-madison-wi-river-paws.jpg': { x: 50, y: 42 },
  'happy-australian-shepherd-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 50, y: 25 },
  'energetic-shepherd-mix-wilderness-trails-sun-prairie-wi-river-paws.jpg': { x: 58, y: 35 },
  'wisconsin-playful-mix-dog-hiking-madison-wi-river-paws.jpg': { x: 48, y: 55 },
  'focused-golden-retriever-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 40, y: 65 },
  'focused-german-shepherd-outdoor-enrichment-sun-prairie-wi-river-paws.jpg': { x: 45, y: 35 },
  'focused-spaniel-golden-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 55, y: 60 },
  'playful-spaniel-mix-dog-hiking-middleton-wi-river-paws.jpg': { x: 60, y: 35 },
  'socializing-golden-retriever-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 40, y: 50 },
  'content-havanese-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 52, y: 28 },
  'joyful-bernedoodle-pack-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 35, y: 38 },
  'enthusiastic-terrier-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 50, y: 40 },
  'playful-havanese-mix-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 48, y: 35 },
  'joyful-black-lab-mix-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 32, y: 52 },
  'joyful-pack-socialization-sun-prairie-wi-river-paws.jpg': { x: 52, y: 35 },
  'confident-chihuahua-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 33, y: 65 },
  'joyful-aussie-spaniel-pack-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 42, y: 35 },
  'joyful-blue-merle-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 48, y: 35 },
  'festive-havanese-mix-socialization-waunakee-wi-river-paws.jpg': { x: 50, y: 45 },
  'playful-golden-retriever-outdoor-enrichment-sun-prairie-wi-river-paws.jpg': { x: 58, y: 28 },
  'joyful-lab-golden-pack-dog-hiking-middleton-wi-river-paws.jpg': { x: 58, y: 45 },
  'joyful-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 40, y: 50 },
  'joyful-mixed-pack-wilderness-hiking-waunakee-wi-river-paws.jpg': { x: 47, y: 60 },
  'smiling-golden-retriever-dog-hiking-waunakee-wi-river-paws.jpg': { x: 50, y: 45 },
  'content-golden-retriever-doodle-dog-hiking-waunakee-wi-river-paws.jpg': { x: 60, y: 55 },
  'happy-golden-retriever-wilderness-trails-madison-wi-river-paws.jpg': { x: 58, y: 28 },
  'happy-goldendoodle-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 52, y: 45 },
  'energetic-aussie-mix-dog-hiking-middleton-wi-river-paws.jpg': { x: 42, y: 40 },
  'cheerful-havanese-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 55, y: 30 },
  'confident-goldendoodle-dog-bus-sun-prairie-wi-river-paws.jpg': { x: 40, y: 18 },
  'playful-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 32, y: 35 },
  'joyful-lab-mix-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 42, y: 48 },
  'playful-lab-mixes-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 22, y: 46 },
  'energetic-poodle-mix-dog-hiking-waunakee-wi-river-paws.jpg': { x: 55, y: 40 },
  'energetic-shepherd-golden-dog-hiking-middleton-wi-river-paws.jpg': { x: 72, y: 60 },
  'content-golden-retrievers-dog-hiking-madison-wi-river-paws.jpg': { x: 65, y: 35 },
  'energetic-golden-retriever-wilderness-trails-madison-wi-river-paws.jpg': { x: 42, y: 45 },
  'curious-spaniel-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 58, y: 55 },
  'radiant-golden-retriever-dog-hiking-waunakee-wi-river-paws.jpg': { x: 55, y: 35 },
  'content-golden-retriever-wilderness-trails-madison-wi-river-paws.jpg': { x: 40, y: 35 },
  'content-red-lab-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 39, y: 24 },
  'energetic-mixed-pack-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 35, y: 45 },
  'spirited-large-breeds-social-play-waunakee-wi-river-paws.jpg': { x: 48, y: 65 },
  'joyful-golden-retriever-wilderness-trails-sun-prairie-wi-river-paws.jpg': { x: 50, y: 35 },
  'focused-german-shepherd-outdoor-enrichment-middleton-wi-river-paws.jpg': { x: 68, y: 32 },
  'focused-springer-spaniel-outdoor-enrichment-sun-prairie-wi-river-paws.jpg': { x: 42, y: 48 },
  'joyful-golden-retriever-pack-hiking-madison-wi-river-paws.jpg': { x: 40, y: 35 },
  'wisconsin-attentive-pack-dog-bus-madison-wi-river-paws.jpg': { x: 40, y: 35 },
  'relaxed-golden-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 48, y: 45 },
  'attentive-chihuahua-mix-outdoor-enrichment-waunakee-wi-river-paws.jpg': { x: 50, y: 30 },
  'joyful-mixed-breeds-wilderness-adventure-waunakee-wi-river-paws.jpg': { x: 50, y: 48 },
  'confident-brindle-mix-dog-hiking-madison-wi-river-paws.jpg': { x: 55, y: 42 },
  'confident-mixed-pack-dog-socialization-madison-wi-river-paws.jpg': { x: 51, y: 28 },
  'content-golden-retrievers-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 35, y: 55 },
  'peaceful-mixed-pack-dog-hiking-sun-prairie-wi-river-paws.jpg': { x: 40, y: 70 },
  'joyful-golden-retrievers-wilderness-trails-waunakee-wi-river-paws.jpg': { x: 73, y: 38 },
  'joyful-mixed-pack-hiking-waunakee-wi-river-paws.jpg': { x: 65, y: 55 },
  'happy-mixed-pack-social-dog-hiking-middleton-wi-river-paws.jpg': { x: 40, y: 42 },
  'confident-mixed-pack-socialization-waunakee-wi-river-paws.jpg': { x: 48, y: 35 },
  'joyful-golden-retriever-adventure-park-sun-prairie-wi-river-paws.jpg': { x: 46, y: 30 },
  'joyful-yellow-lab-dog-hiking-madison-wi-river-paws.jpg': { x: 48, y: 48 },
  'soulful-lab-mix-dog-hiking-madison-wi-river-paws.jpg': { x: 50, y: 50 },
  'happy-mixed-pack-hiking-waunakee-wi-river-paws.jpg': { x: 52, y: 65 },
  'wisconsin-gsp-dog-hiking-madison-wi-river-paws.jpg': { x: 35, y: 55 },
  'peaceful-pointer-spaniel-pack-hiking-madison-wi-river-paws.jpg': { x: 22, y: 25 },
  'playful-golden-retriever-dog-hiking-madison-wi-river-paws.jpg': { x: 53, y: 18 },
  'gentle-golden-retriever-outdoor-enrichment-madison-wi-river-paws.jpg': { x: 45, y: 35 },
};

/**
 * Get focal point coordinates for an image
 * @param imagePath - Full path to the image (e.g., "/Grooming/image-name.jpg")
 * @returns Object with x and y percentages, or default { x: 50, y: 40 }
 */
export function getImageFocalPoint(imagePath: string): { x: number; y: number } {
  if (!imagePath) {
    return { x: 50, y: 40 }; // Default center-top
  }
  
  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';
  
  // Find matching focal point
  const focalPoint = focalPointMap[filename];
  
  if (focalPoint) {
    return focalPoint;
  }
  
  // Default for grooming images
  if (imagePath.includes('/Grooming/')) {
    return { x: 50, y: 40 };
  }
  
  // Default for hiking images
  if (imagePath.includes('/Hiking/')) {
    return { x: 50, y: 45 };
  }
  
  // Default for other images
  return { x: 50, y: 40 };
}

/**
 * Get CSS object-position string for an image
 * @param imagePath - Full path to the image
 * @returns CSS object-position value (e.g., "50% 40%")
 */
export function getImageObjectPosition(imagePath: string): string {
  const { x, y } = getImageFocalPoint(imagePath);
  return `${x}% ${y}%`;
}
