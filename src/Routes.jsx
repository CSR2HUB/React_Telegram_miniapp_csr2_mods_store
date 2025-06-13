import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ModStorefront from "pages/mod-storefront";
import ModDetails from "pages/mod-details";
import ShoppingCart from "pages/shopping-cart";
import PurchaseHistory from "pages/purchase-history";
import SearchResults from "pages/search-results";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ModStorefront />} />
          <Route path="/mod-storefront" element={<ModStorefront />} />
          <Route path="/mod-details" element={<ModDetails />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/search-results" element={<SearchResults />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;