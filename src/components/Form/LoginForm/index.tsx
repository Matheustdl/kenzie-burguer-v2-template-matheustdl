import { useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { IUserLogin, UserContext } from '../../../Providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const { UserLogin } = useContext(UserContext);

  const formSchema = yup
    .object({
      email: yup.string().required('email obrigátorio').email('email obrigátorio'),
      password: yup
        .string()
        .required('digite uma senha')
        .matches(/(\d)/, "Password is too short"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: yupResolver(formSchema),
  });

  return (
    <StyledForm noValidate onSubmit={handleSubmit(UserLogin)}>
      <Input
        label='Email'
        type='email'
        register={register('email')}
        errors={errors?.email}
      />
      <Input
        label='Password'
        type='password'
        register={register('password')}
        errors={errors?.password}
      />
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
