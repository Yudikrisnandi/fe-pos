import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductPage from './pages/ProductPage';
import MenuPage from './pages/MenuPage';
import SalePage from './pages/SalePage';
import SideMenu from './components/SideMenu';

const queryClient = new QueryClient()


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="w-full h-screen font-sans text-grey-900 flex">
          <SideMenu/> 
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MenuPage />}/>
              <Route path="/product" element={<ProductPage/>}/>
              <Route path="/sale" element={<SalePage/>}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
