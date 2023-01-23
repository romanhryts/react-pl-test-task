import React from 'react';
import Products from './components/Products';
import Brand from './components/Brand';


const App = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-12">
                <Brand/>
                <Products/>
            </div>
        </>
    )
};

export default App;
