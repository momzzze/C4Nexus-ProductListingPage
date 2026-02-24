import { RouterProvider } from 'react-router';
import { router } from './app/routes';
import { ProductsProvider } from './context';

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
}

export default App;
