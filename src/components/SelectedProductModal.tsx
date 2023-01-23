import { ProductResponseData } from '../models/products-response';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface SelectedProductModalProps {
    product: ProductResponseData
    selectProduct: Dispatch<SetStateAction<ProductResponseData | null>>;
}

const SelectedProductModal = ({ product, selectProduct }: SelectedProductModalProps) => {
    const view: string = JSON.stringify(product);
    const container = useRef(null);

    const closeModal = (event: MouseEvent) => {
        if (event.target === container.current) {
            selectProduct(null);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal)
        return () => {
            document.removeEventListener('click', closeModal);
        }
    }, [])

    return (
        <div
            ref={container}
            className="absolute top-0 bottom-0 left-0 right-0 bg-[#121212] min-w-[300px] min-h-[300px] flex justify-center items-center z-40"
        >
            <div className="text-black flex flex-col items-center p-3 highlight-border">
                <h3 className="uppercase text-black text-4xl highlight">{product.name}</h3>
                <pre>{view}</pre>
            </div>
        </div>
    );
};

export default SelectedProductModal;