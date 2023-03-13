import { ReactNode } from 'react';

export interface IProviderChildren {
  children: ReactNode;
}

export interface ICartContext {
  products: iProducts[];
  setProducts: (products: iProducts[]) => void;
  search: string;
  setSearch: (dataInput: string) => void;
  searchItem: (event: React.ChangeEvent | any) => void;
  filterSearch: iProducts[];
  addCarrinho: (product: iProducts) => void;
  removerCarrinho: (product: iProducts) => void;
  currentSale: iProducts[];
  removerTodos: () => void;
  modalOpenAndclose: boolean;
  setModalOpenAndclose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface iProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface iProductsProps {
  item: iProducts;
}
