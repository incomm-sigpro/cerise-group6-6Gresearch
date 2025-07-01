import * as S from './styles';
import { useAuth } from '../../../hooks/AuthProvider';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import logo from '@/assets/logos/logo-cerise.png';

export function Login() {
  const { signIn } = useAuth();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Insira um email válido')
      .required('É necessário inserir o seu email'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres')
      .required('É necessário inserir a sua senha'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      try {
        signIn(values);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <S.Container>
      <S.Content>
        <img style={{ width: 300 }} src={logo} />
        <S.Login>
          <h1>Login</h1>
          <span>
            Não possui uma conta? entre em contato conosco por{' '}
            <a href="https://website-cerise.vercel.app/">aqui</a>
          </span>
        </S.Login>
        <form onSubmit={formik.handleSubmit}>
          <Input
            onChange={formik.handleChange}
            value={formik.values.email}
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoFocus
            required
            id="email"
            label="Email"
          />
          <Input
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            required
            id="password"
            label="Senha"
            type="password"
          />
          <Button
            color="secondary"
            fullWidth
            size="large"
            variant="contained"
            type="submit"
          >
            Enviar
          </Button>
        </form>
        <span
          onClick={() =>
            (window.location.href = 'https://website-cerise.vercel.app/')
          }
        >
          Esqueci minha senha
        </span>
      </S.Content>
      <S.Image />
    </S.Container>
  );
}
