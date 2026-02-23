import { createBrowserRouter } from 'react-router';
import { RootLayout } from './RootLayout';
import { HomePage } from '../features/home/pages/HomePage';
import { CategoryPage } from '../features/category/pages/CategoryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'category/:categorySlug',
        element: <CategoryPage />,
      },
    ],
  },
]);
