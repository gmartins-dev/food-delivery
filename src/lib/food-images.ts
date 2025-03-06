/**
 * Utility to provide realistic food images based on cuisine types
 * These images are from Unsplash and are free to use
 */

interface FoodImageCategory {
  name: string;
  keywords: string[];
  images: string[];
}

// Define cuisine categories and corresponding high-quality food images
const foodImageCategories: FoodImageCategory[] = [
  {
    name: 'Pizza',
    keywords: ['pizza', 'italian'],
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Burger',
    keywords: ['burger', 'american', 'fast food'],
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Sushi',
    keywords: ['sushi', 'japanese', 'asian'],
    images: [
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Chinese',
    keywords: ['chinese', 'asian', 'noodles'],
    images: [
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541696490-8744a5dc0228?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Indian',
    keywords: ['indian', 'curry', 'spicy'],
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606471191009-63994c53433b?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Mexican',
    keywords: ['mexican', 'taco', 'burrito', 'tex-mex'],
    images: [
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Sandwich',
    keywords: ['sandwich', 'sub', 'deli'],
    images: [
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Salad',
    keywords: ['salad', 'vegetarian', 'vegan', 'healthy'],
    images: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Dessert',
    keywords: ['dessert', 'cake', 'ice cream', 'pastry', 'sweet'],
    images: [
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Coffee',
    keywords: ['coffee', 'cafe', 'bakery'],
    images: [
      'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'BBQ',
    keywords: ['bbq', 'barbecue', 'grill', 'meat'],
    images: [
      'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606852832329-c99c6f2a8f95?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Thai',
    keywords: ['thai', 'asian', 'spicy'],
    images: [
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569562211083-01c655233e5b?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=500&auto=format&fit=crop&q=80'
    ]
  },
  {
    name: 'Default',
    keywords: [],
    images: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=500&auto=format&fit=crop&q=80'
    ]
  }
];

/**
 * Gets a food image URL based on the cuisine type
 * @param cuisines Array of cuisine objects with name property
 * @returns A URL string to an appropriate food image
 */
export function getFoodImageForCuisine(cuisines: Array<{ id: string; name: string }>): string {
  // If no cuisines provided, return a random default image
  if (!cuisines || cuisines.length === 0) {
    const defaultCategory = foodImageCategories.find(category => category.name === 'Default')!;
    return getRandomImage(defaultCategory.images);
  }

  // Combine all cuisine names to lowercase for matching
  const cuisineNames = cuisines.map(cuisine => cuisine.name.toLowerCase());

  // Try to find a matching category
  for (const category of foodImageCategories) {
    // Check if any of the category keywords match any of the cuisine names
    if (category.keywords.some(keyword =>
      cuisineNames.some(cuisineName => cuisineName.includes(keyword))
    )) {
      return getRandomImage(category.images);
    }
  }

  // If no match found, use the first cuisine name to determine a fallback
  const firstCuisine = cuisines[0].name.toLowerCase();

  // Try partial matching for fallback
  for (const category of foodImageCategories) {
    for (const keyword of category.keywords) {
      if (keyword.includes(firstCuisine) || firstCuisine.includes(keyword)) {
        return getRandomImage(category.images);
      }
    }
  }

  // If all else fails, return a random default food image
  const defaultCategory = foodImageCategories.find(category => category.name === 'Default')!;
  return getRandomImage(defaultCategory.images);
}

/**
 * Returns a random image from an array of image URLs
 * @param images Array of image URLs
 * @returns A single random image URL
 */
function getRandomImage(images: string[]): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

/**
 * Deterministically selects an image based on the restaurant ID
 * This ensures the same restaurant always gets the same image
 * @param images Array of image URLs
 * @param id Restaurant ID to use as seed
 * @returns A consistently selected image URL for the given ID
 */
export function getConsistentImage(images: string[], id: string): string {
  // Convert the ID to a number by summing char codes
  const charSum = id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  // Use modulo to get a consistent index
  const index = charSum % images.length;
  return images[index];
}

/**
 * Gets a food image URL based on restaurant data
 * @param restaurant The restaurant object
 * @returns A URL string to an appropriate food image
 */
export function getFoodImageForRestaurant(restaurant: {
  id: string;
  cuisines: Array<{ id: string; name: string }>
}): string {
  // Find matching category based on cuisine
  let matchedCategory: FoodImageCategory | undefined;

  // Try to find an exact category match
  const cuisineNames = restaurant.cuisines.map(c => c.name.toLowerCase());

  for (const category of foodImageCategories) {
    if (category.keywords.some(keyword =>
      cuisineNames.some(name => name.includes(keyword))
    )) {
      matchedCategory = category;
      break;
    }
  }

  // If no match, use default
  if (!matchedCategory) {
    matchedCategory = foodImageCategories.find(c => c.name === 'Default')!;
  }

  // Use restaurant ID to consistently select an image from the category
  return getConsistentImage(matchedCategory.images, restaurant.id);
}
