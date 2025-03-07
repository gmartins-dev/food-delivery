# Food Delivery App

A modern web application that allows users to search for restaurants that deliver to their area using the Just Eat API based on their outcode (first part of a UK postcode) and also filter restaurants by cuisine type.

This application follows the **PIE Design System** - Just Eat Takeaway.com's global design system for interfaces and experiences, ensuring consistency with the Just Eat brand.

## Key features

- 🍽️ Search for restaurants by outcode (first part of UK postcode)
- 🍕 Filter restaurants by cuisine type
- 🌗 Dark and light mode support
- 📱 Responsive design for mobile, tablet, and desktop
- 🧩 PIE Design System integration
- ♿ Accessible UI components
- ⚡ Fast and optimized performance
- 📄 Pagination with 10 restaurants per page
- 💫 Loading states with skeleton UI
- 🔄 Error handling with retry mechanism
- 🎯 Type-safe API integrationtry mechanism


## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Design System**: PIE Design System (Just Eat's Design System)
- **State Management**: React Hooks
- **HTTP Client**: Native fetch API
- **Form Handling**: Native React form handling
- **Theming**: Custom theme implementation with localStorage

## PIE Design System Integration

This application has been built following Just Eat Takeaway.com's PIE Design System guidelines:

- **Design Tokens**: Colors, typography, spacing, and elevation follow PIE standards
- **Component Patterns**: UI components designed according to PIE specifications
- **Accessibility**: Follows PIE accessibility standards
- **Responsiveness**: Layouts adapt to different screen sizes following PIE guidelines
- **Brand Identity**: Maintains Just Eat visual identity throughout the application

Learn more about PIE Design System at [https://www.pie.design/](https://www.pie.design/)

## Architecture Overview

The application follows a component-based architecture with a clear separation of concerns:

- **API Layer**: Handles communication with the Just Eat API, including error handling and rate limiting
- **UI Components**: Components built with Tailwind CSS following PIE Design System
- **Page Components**: Composing UI components and managing state
- **Business Logic**: Filtering, sorting, and processing restaurant data
- **Theme Management**: Supporting dark and light modes with system preference detection

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Main restaurant search page
├── components/           # Reusable components
│   ├── layout/           # Layout components
│   ├── restaurant/       # Restaurant-specific components
│   └── ui/               # UI components (PIE Design System)
├── lib/                  # Utility functions and API service
│   ├── api.ts            # Just Eat API service
│   ├── pie-tokens.ts     # PIE Design System tokens
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions
```

## API Integration

The application integrates with the Just Eat API to fetch restaurant data. Key features of the integration include:

- Proper error handling for API failures
- Rate limiting protection with exponential backoff for 429 responses
- Type-safe API responses
- Mock data support for development and testing

## Running Locally

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/yourusername/food-delivery.git
cd food-delivery

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:3000


## API Integration Notes

This application interacts with the Just Eat API, which has certain limitations:

1. **CORS Issues**: The API may not allow direct browser requests due to CORS restrictions. For a production application, you might need to set up a proxy server.

2. **Rate Limiting**: The API implements rate limiting. The application handles 429 responses with exponential backoff.

## Future Improvements

- Add unit tests with Jest/React Testing Library
- Implement server-side rendering for better SEO
- Add more filtering options (delivery time, rating, etc.)
- Implement pagination for large result sets
- Add geolocation support to automatically detect user's location
- Improve API error handling with more detailed messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Architecture Decisions

### Choice of Framework and Libraries

I chose **Next.js** with **React** as the primary framework for this application because:

1. **Performance**: Next.js provides excellent performance optimization out of the box.
2. **Developer Experience**: React's component model allows for a clean, modular codebase.
3. **Scalability**: The application could easily grow to include more features like restaurant details, orders, etc.
4. **SSR/SSG Capability**: While not implemented in this version, Next.js offers the option to server-render pages, which could improve SEO and initial load performance.

For styling, **Tailwind CSS** was chosen because:
1. **Utility-first approach**: Enables rapid UI development without leaving HTML
2. **Consistency**: Built-in constraints help maintain a consistent design system
3. **Performance**: Only generates CSS for used styles, resulting in minimal CSS

### Component Structure

The application is structured into reusable components following these principles:

1. **Separation of Concerns**: UI components (buttons, cards) are separated from business logic components (restaurant lists, filters)
2. **Composition over Inheritance**: Smaller components are composed to create more complex UI elements
3. **Container/Presentational Pattern**: Data fetching and business logic are separated from presentation components

Key components include:
- `SearchForm`: Handles outcode input and validation
- `RestaurantGrid`: Displays the list of restaurants
- `RestaurantCard`: Individual restaurant display
- `CuisineFilter`: Filtering functionality by cuisine

### API Integration Approach

The API integration follows these best practices:

1. **Error Handling**: Comprehensive error handling for various failure scenarios (network, 404, 429, etc.)
2. **Rate Limiting Protection**: Exponential backoff strategy for 429 responses
3. **Mock Data Support**: Fallback to mock data when API is unavailable
4. **Type Safety**: TypeScript interfaces ensure correct data structure handling

### Testing Approach

The testing strategy for this application would include:

1. **Unit Tests**: Testing individual components and functions in isolation
   - API service functions
   - Utility functions for filtering and data transformation
   - Form validation logic

2. **Component Tests**: Testing UI components with React Testing Library
   - Form submission behavior
   - Filtering functionality
   - Restaurant card rendering

3. **Integration Tests**: Testing the integration between components
   - Search form submission leading to restaurant data display
   - Filter selection affecting the restaurant list

4. **E2E Tests**: Full user flow testing with Cypress or similar
   - Complete user journey from search to filtering

## Suggested API Improvements

Based on working with the Just Eat API, here are some suggested improvements:

1. **Pagination Support**: The API returns all restaurants at once, which could be problematic for areas with many restaurants. Pagination would improve performance.

2. **Filtering Options**: Server-side filtering would be more efficient than client-side filtering, especially for large datasets.

3. **Consistent Data Structure**: Some restaurant data appears inconsistent (missing fields, different format for similar data).

4. **CORS Support**: The API doesn't support direct browser requests, which complicates frontend integration.

5. **Rate Limiting Documentation**: Clear documentation on rate limits and retry strategies would be helpful.

6. **Schema Documentation**: Comprehensive OpenAPI/Swagger documentation would make integration easier.
