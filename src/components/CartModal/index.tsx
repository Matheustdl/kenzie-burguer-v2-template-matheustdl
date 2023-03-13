import { MdClose } from 'react-icons/md';
import { useContext } from 'react';
import CartProductList from './CartProductList';
import { StyledCartModalBox } from './style';
import { StyledTitle } from '../../styles/typography';
import { CartContext } from '../../Providers/CartContext';

const CartModal = () => {
  const { modalOpenAndclose, setModalOpenAndclose } = useContext(CartContext);

  if (modalOpenAndclose) {
    return (
      <StyledCartModalBox>
        <dialog>
          <header>
            <StyledTitle tag='h2' $fontSize='three'>
              Carrinho de compras
            </StyledTitle>
            <button
              type='button'
              aria-label='Fechar'
              onClick={() => {
                setModalOpenAndclose(false);
              }}
            >
              <MdClose size={21} />
            </button>
          </header>
          <div className='cartBox'>
            <CartProductList />
          </div>
        </dialog>
      </StyledCartModalBox>
    );
  }
  return null;
};

export default CartModal;
