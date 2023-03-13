import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICartContext, iProducts, IProviderChildren } from './@types';
import { api } from '../Services/Api';

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IProviderChildren) => {
  const [products, setProducts] = useState<iProducts[]>([]);
  const [currentSale, setCurrentSale] = useState<iProducts[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpenAndclose, setModalOpenAndclose] = useState(false);

  const removerTodos = () => {
    setCurrentSale([]);
  };

  const removerCarrinho = (product: iProducts) => {
    const item = currentSale.filter(
      (productCart) => productCart.id !== product.id
    );
    setCurrentSale(item);
  };

  const addCarrinho = (product: iProducts) => {
    const data = currentSale.find(
      (productCart) => productCart.id === product.id
    );
    const validate = products.some((e) => e.id === data?.id);

    if (!validate) {
      setCurrentSale([...currentSale, product]);
    }
  };

  const searchItem = (event: React.ChangeEvent | any) => {
    setSearch(event.target.value);
  };

  const filterSearch = products.filter(
    (element) =>
      element.category.toLowerCase().includes(search.toLowerCase().trim()) ||
      element.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const getItem: () => void = async () => {
      try {
        const response = await api.get('products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (err) {
        window.localStorage.clear();
        navigate('/');
      }
    };
    getItem();
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        search,
        setSearch,
        searchItem,
        filterSearch,
        removerTodos,
        addCarrinho,
        currentSale,
        removerCarrinho,
        modalOpenAndclose,
        setModalOpenAndclose,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
