import React, { useMemo, useState } from 'react';
import useFetch from './useFetch';
import { ProductResponseData, ProductsResponse } from '../models/products-response';
import Product from '../components/Product';

let baseApi: string = 'https://reqres.in/api/products/?per_page=5&';

export default function useProducts(initialInputValue: string) {
    const [ inputValue, setInputValue ] = useState<string>(initialInputValue);
    const [ apiLink, setApiLink ] = useState<string>(baseApi);
    const [ selectedProduct, setSelectedProduct ] = useState<ProductResponseData | null>(null);
    const { fetched, error, loading, clearError } = useFetch<ProductsResponse>(apiLink);

    const loadingView = loading && <span>Loading...</span>;
    const errorView = error && <span>Error!</span>;
    const dataView = useMemo<JSX.Element[] | null>(() => {
        if (!fetched) {
            return null;
        }
        const visibleData = fetched?.data.filter(({ id }) => inputValue === '' ? true : id === +inputValue);
        return visibleData!.map((product) => (
            <Product key={product.id} product={product} selectProduct={setSelectedProduct}/>
        ));
    }, [ fetched, inputValue ]);
    const noDataView = (!!dataView && !dataView?.length) && <span>Items not found</span>;

    const onPrevPage = () => {
        const prevPage: number = fetched!.page - 1;
        if (prevPage >= 1) {
            setApiLink(baseApi + `page=${prevPage}`);
        }
    }

    const onNextPage = () => {
        const nextPage: number = fetched!.page + 1;
        if (nextPage <= fetched!.total_pages) {
            setApiLink(baseApi + `page=${nextPage}`);
        }
    }

    if (error && fetched) {
        clearError();
    }

    return {
        inputValue, setInputValue,
        loadingView, errorView, dataView, noDataView,
        onPrevPage, onNextPage,
        selectedProduct, setSelectedProduct
    };
}