# C4Nexus-ProductListingPage

Junior Developer Technical Task
[Download Assignment PDF](./assignment.pdf)

Summary:
Why im using React+ Vite + TS?

- First and most important part is thats the library and the tools that i know and i can be productive with it from day one without learning curve.
- Second reason why vite and not create react app its ideal for MVPs its optimized for production builds using Rollup its with minimal configuration compared to webpack instant startup. Why TS because its better to describe your data flow with types and its better for maintainability and scalability of the project.
  I added react router ^7.13.0 implemented it with one layout file (RootLayout.tsx) I added the router in app.js one there in the layout file we have header and footer so that they can be persistent and for rendering we use <Outlet/>
  Our route.tsx file is simple we have one index router one dynamic router with the (/category/:categorySlug) and "/" both are child routes.
  Reason and needs: SPA and aligns with best practices for modern web development. It allows for a smoother user experience and faster navigation between pages without full page reloads.
  I could use SSR like the new tanstack or next.js and their approach for router.They are good for SEO and performance but I will need more time to implement it and since its not in the requirements and we have 7 days I will stick with client side rendering.
  Why Plain CSS: Although modern solutions like Tailwind CSS or shadcn/ui could have been used, plain CSS was intentionally chosen to demonstrate core frontend fundamentals and avoid any perception that the UI was assembled from pre-built templates or e-commerce modules.
  Using vanilla CSS ensures that:
  All layout, spacing, and styling decisions are explicitly implemented
  There is full control over the UI structure and visual behavior
  The solution clearly reflects custom development, not framework-provided design systems
  PLP for my css is short for Product Listing Page.
  Lets start with the structures and the tasks:

1. Header with Navigation Menu this part was the second thing that I implemented. I added one nav section logo and one cart icon I wanted to implement in smaller screens [[burgerMenu] [logo] [carticon]] approach. On desktop is [[logo][navLinks][cartIcon]] i made it sticky as the requirements were like this i put some mt on other parts so it will not be covered by the header. I added and active styles for the nav links.
2. Product Counter this part I implemented almost at the last because I need to decide from where my data will come and its not hard to implement but I added it at on top of load more part.

3. Product Grid
   This part was the first thing that I implemented. I structured the filter section and the product listing section. I added a grid-based layout with a .container using width: min(100%, 1200px); and an app shell defined with grid-template-rows: auto 1fr auto;. After that, I added the grid for the products, where the main styles are plp-content-grid and plp-main. I also added skeletons for the product loading state. A “Load More” button was added initially, but it was fully implemented later when I introduced fake API functions to simulate product fetching. Products are displayed with a maximum of four items per row on larger screens, which declines to two items per row on smaller screens.

4. Filtering Mechanism
   Implemented with multi-select filters for Brand and Price Range in the Category page. Users can combine multiple checkboxes, and filtering is applied in-memory on the fetched products list. On mobile, filters open in a slide-in drawer with backdrop, Close, Apply (Show results), and Reset actions. On desktop, the same filter block is shown as a static sidebar. The results count is updated in real time based on active filters.

5. Sorting Mechanism I create useHook if its needed to be reused just add the string of the criteria its mapped with switch cases and we return the sorting part.
6.
7. Category Title and Description inside is the sorting mechanism its one div elements with 2 sections with buttons in right and left side with title of the category and text description under it.
8.
9. Load More Functionality
   On click of the button we run the function handleLoadMore which increment the size of the displayed products based on the set Page_Size which is 5\*4 20 its added with Math.min so it will not exceed the total number of products the fisability is controlled by hasMore= displayedCount < sortedProducts.length;

10. Footer last was the footer I added some links and copyrights on contact page i added my github page rest of the links are dummy links.

Difficulties:
I had some issues with the mock data I decided to use some free APIs since I don't know dealing with the chatGPT I stop on the API called https://dummyjson.com because reason one don't need api_key and reason two the dummy products inside were good identical images without background that allowed me to build a good looking product listing page. I wont add pagination because it's not needed we have load more button.
Its hard for me to without figma to add good small logo and icon that was pain for me too but since i do not have license for figma.
Day2: - There were no major difficulties only bugfixes and planing what i will do in the next day.
