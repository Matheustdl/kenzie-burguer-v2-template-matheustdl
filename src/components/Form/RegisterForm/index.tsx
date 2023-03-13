import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Input from '../Input';
import { IUserRegister, UserContext } from '../../../Providers/UserContext';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => {
  const { UserRegister } = useContext(UserContext);

  const validatorRegister = yup
    .object({
      name: yup.string().required('nome obrigátorio'),
      email: yup.string().required('email obrigátorio'),
      password: yup
        .string()
        .required('digite uma senha')
        .matches(/[a-z]/, 'Deve conter ao menos 1 letra minuscula')
        .matches(/(\d)/, 'Deve conter ao menos 1 número')
        .matches(/[A-Z]/, 'Deve conter ao menos 1 letra maiúscula')
        .matches(/(\W|_)/, 'Deve conter no mínimo 1 caracter especial')
        .matches(/.{8,}/, 'Deve conter no mínimo 8 caracteres'),
      confirmpassword: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          'confirmação da senha deve ser igual a senha'
        )
        .required('Confimação de senha obrigatoria'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: yupResolver(validatorRegister),
  });

  return (
    <StyledForm noValidate onSubmit={handleSubmit(UserRegister)}>
      <Input
        label='Name'
        type='text'
        register={register('name')}
        errors={errors.name}
      />
      <Input
        label='Email'
        type='email'
        register={register('email')}
        errors={errors.email}
      />
      <Input
        label='Password'
        type='password'
        register={register('password')}
        errors={errors.password}
      />
      <Input
        label='Confirm password'
        type='password'
        register={register('confirmpassword')}
        errors={errors.confirmpassword}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
