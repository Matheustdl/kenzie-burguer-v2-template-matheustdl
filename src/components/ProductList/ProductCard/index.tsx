import { useContext, useEffect } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext } from '../../../Providers/CartContext';
import { api } from '../../../Services/Api';

const ProductCard = () => {
  const { products, setProducts , addCarrinho } = useContext(CartContext);

  useEffect(() => {
    const RenderItens = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    RenderItens();
  }, []);
  

  return (
    <>
      {products.map((item) => (
        <StyledProductCard key={item.id}>
          <div className='imageBox'>
            <img src={item.img} alt={item.name} />
          </div>
          <div className='content'>
            <StyledTitle tag='h3' $fontSize='three'>
              {item.name}
            </StyledTitle>
            <StyledParagraph className='category'>
              {item.category}
            </StyledParagraph>
            <StyledParagraph className='price'>
              R$ {item.price}
            </StyledParagraph>
            <StyledButton onClick={() => addCarrinho(item)}  $buttonSize='medium' $buttonStyle='green'>
              Adicionar
            </StyledButton>
          </div>
        </StyledProductCard>
      ))}
    </>
  );
};

export default ProductCard;
