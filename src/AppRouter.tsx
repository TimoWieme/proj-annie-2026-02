import { Routes, Route } from "react-router-dom";
import ProductOverviewPage from "./pages/ProductOverviewPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const AppRouter = () => {
  return (
    <main className="w-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/producten" element={<ProductOverviewPage />} />
        <Route path="/producten/:id" element={<ProductDetailPage />} />
      </Routes>
    </main>
  );
};

export default AppRouter;
