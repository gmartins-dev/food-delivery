import { getFoodImageForCuisine, getFoodImageForRestaurant } from '../food-images'

describe('Food Images Utility', () => {
  describe('getFoodImageForCuisine', () => {
    it('should return a pizza image for Italian cuisine', () => {
      const cuisines = [{ id: '1', name: 'Italian' }]
      const result = getFoodImageForCuisine(cuisines)
      expect(result).toContain('images.unsplash.com')
      expect(result).toMatch(/photo-\d+/)
    })

    it('should return default image for unknown cuisine', () => {
      const cuisines = [{ id: '1', name: 'Unknown Cuisine' }]
      const result = getFoodImageForCuisine(cuisines)
      expect(result).toContain('images.unsplash.com')
    })

    it('should return default image for empty cuisines array', () => {
      const result = getFoodImageForCuisine([])
      expect(result).toContain('images.unsplash.com')
    })
  })

  describe('getFoodImageForRestaurant', () => {
    it('should return consistent image for same restaurant ID', () => {
      const restaurant = {
        id: '123',
        cuisines: [{ Name: 'Italian', SeoName: 'italian' }]
      }

      const firstResult = getFoodImageForRestaurant(restaurant)
      const secondResult = getFoodImageForRestaurant(restaurant)

      expect(firstResult).toBe(secondResult)
    })
  })
})
