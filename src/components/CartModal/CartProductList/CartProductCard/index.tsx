import { MdDelete } from 'react-icons/md';
import { useContext } from 'react';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../Providers/CartContext';
import { iProductsProps } from '../../../../Providers/@types';

const CartProductCard = ({ item }:iProductsProps) => {
  const { removerCarrinho } = useContext(CartContext);

  return (
      <StyledCartProductCard key={item.id}>
        <div className='imageBox'>
          <img src={item.img} alt='Hamburguer' />
        </div>
        <div className='contentBox'>
          <StyledTitle tag='h3' $fontSize='three'>
            {item.name}
          </StyledTitle>
          <button type='button' aria-label='Remover'>
            <MdDelete
              key={item.id}
              size={24}
              onClick={() => removerCarrinho(item)}
            />
          </button>
        </div>
      </StyledCartProductCard>
  )
};

export default CartProductCard;
