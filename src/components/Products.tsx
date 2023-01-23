import React from 'react';
import useProducts from '../hooks/useProducts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SelectedProductModal from './SelectedProductModal';

const Products = () => {
    const {
        inputValue, setInputValue,
        dataView, noDataView, loadingView, errorView,
        onPrevPage, onNextPage,
        selectedProduct, setSelectedProduct
    } = useProducts('');

    return (
        <>
            {selectedProduct && <SelectedProductModal product={selectedProduct} selectProduct={setSelectedProduct}/>}
            <div className="w-[80%] mx-auto mt-[5%] min-h-[1px] flex flex-col items-center">
                <input
                    className="text-center outline-none bg-transparent border-none pb-2 px-1 min-w-[350px] text-2xl uppercase"
                    type="number"
                    placeholder="Filter data by id"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />
                <div
                    className="relative highlight-border flex flex-col items-center justify-center w-full min-h-[100px] p-2">
                    {loadingView}
                    {errorView}
                    {dataView}
                    {noDataView}
                    {
                        !noDataView && <div>
                            <ArrowBackIosIcon
                                className="absolute left-[-50px] bottom-1/2 top-1/2 highlight-bg pl-1 cursor-pointer rounded-full"
                                onClick={onPrevPage}
                            />
                            <ArrowForwardIosIcon
                                className="absolute right-[-50px] bottom-1/2 top-1/2 highlight-bg pl-1 cursor-pointer rounded-full"
                                onClick={onNextPage}
                            />
                        </div>
                    }
                </div>
            </div>
        </>

    )
};

export default Products;