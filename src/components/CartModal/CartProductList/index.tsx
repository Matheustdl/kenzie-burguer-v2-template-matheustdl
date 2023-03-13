import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../Providers/CartContext';
import { iProducts } from '../../../Providers/@types';

const CartProductList = () => {
  const { currentSale, removerTodos } = useContext(CartContext);

  return (
    <StyledCartProductList>
      {currentSale.length > 0 ? (
        <>
          <ul>
            {currentSale.map((item: iProducts) => (
                  <CartProductCard 
                  key={item.id}
                  item={item}/>
                ))}
          </ul>
          <StyledButton
            onClick={removerTodos}
            $buttonSize='default'
            $buttonStyle='gray'
          >
            Remover todos
          </StyledButton>
        </>
      ) : (
        <div className='emptyBox'>
          <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
            Sua sacola está vazia
          </StyledTitle>
          <StyledParagraph textAlign='center'>Adicione itens</StyledParagraph>
        </div>
      )}
      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>
          {currentSale
            .reduce((acc: number, current: any) => current.price * 1 + acc, 0)
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </StyledParagraph>
      </div>
    </StyledCartProductList>
  );
};

export default CartProductList;
