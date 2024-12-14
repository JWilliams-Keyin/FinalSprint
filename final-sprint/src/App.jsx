import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Frank's home page
// Import Frank's details page
import Cart from './Pages/cart';
import Checkout from './Pages/checkout';

function App() {
    return (
        <Router>
            <Routes>

                <Route path = "/" element = {<Cart />} />
                <Route path = "/checkout" element = {<Checkout />} />
            </Routes>
        </Router>
    );
}

export default App;