import * as S from './styles';
import { useAuth } from '../../hooks/AuthProvider';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { ChangeEvent, useState } from 'react';
// import ReactInputMask from 'react-input-mask';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
// import PhoneIcon from '@mui/icons-material/Phone';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import emptyImage from '../../assets/images/empty-profile.png';

import { api } from '../../services/api';

export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : emptyImage;
  const [avatar, setAvatar] = useState<string | undefined>(avatarUrl);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const validationSchema = yup.object({
    name: yup.string().min(6, 'O nome deve conter pelo menos 6 caracteres'),
    email: yup.string().email('Insira um email válido'),
    oldPassword: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    newPassword: yup
      .string()
      .min(6, 'A nova senha deve conter no mínimo 6 caracteres'),
    birthday: yup
      .date()
      .max(new Date(), 'A data de nascimento não pode ser no futuro')
      .test('is-adult', 'O usuário deve ser maior de idade', function (value) {
        if (!value) return true;
        const today = new Date();
        const minAdultDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return value <= minAdultDate;
      })
      .test(
        'is-valid-birthday',
        'Data de nascimento inválida',
        function (value) {
          if (!value) return true;
          const day = value.getDate();
          const month = value.getMonth() + 1;
          const year = value.getFullYear();
          const compulsoryRetirementAge = 75;
          const minBirthYear =
            new Date().getFullYear() - compulsoryRetirementAge;

          if (day > 31 || month > 12 || year < minBirthYear) {
            return false;
          }

          return true;
        }
      ),
    homePhone: yup
      .string()
      .matches(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        'Formato de telefone inválido. Use (XX) XXXXX-XXXX'
      ),
    workPhone: yup
      .string()
      .matches(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        'Formato de telefone inválido. Use (XX) XXXXX-XXXX'
      ),
    mobilePhone: yup
      .string()
      .matches(
        /^\(\d{2}\) \d{5}-\d{4}$/,
        'Formato de telefone inválido. Use (XX) XXXXX-XXXX'
      ),
  });

  const formik: any = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      oldPassword: '',
      newPassword: '',
      birthday: '',
      homePhone: '',
      workPhone: '',
      mobilePhone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      try {
        const user = localStorage.getItem('@cerise-backend:user');
        if (user) {
          let userInfo = JSON.parse(user);
          let newUserInfo: any = {};

          Object.keys(values).forEach((value: any) => {
            if (
              values[value] !== undefined &&
              values[value] !== '' &&
              userInfo[value] !== values[value]
            ) {
              if (value == 'birthday') {
                values[value] = new Date(values[value] + 'T00:00:01.000Z');
              }
              newUserInfo[value] = values[value];
            }
          });

          updateProfile({
            userProfile: newUserInfo,
            avatarFile,
          });
        }
      } catch (error) {
        console.log(error);
      }

      alert('Perfil atualizado com sucesso!');

      navigate('/profile');
    },
  });

  function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const imagePreview = URL.createObjectURL(file);
      setAvatar(imagePreview);
    }
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    <S.Container>
      <header>
        <a onClick={handleBack}>
          <ArrowBackIcon />
        </a>
      </header>

      <S.Avatar>
        <img src={avatar} alt="Foto do usuário" />

        <label htmlFor="avatar">
          <CameraAltIcon />

          <input type="file" id="avatar" onChange={handleChangeAvatar} />
        </label>
      </S.Avatar>

      <S.Form onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          fullWidth
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          autoFocus
          type="text"
          id="name"
          placeholder="Nome"
          icon={<PersonIcon />}
        />

        <Input
          onChange={formik.handleChange}
          value={formik.values.email}
          fullWidth
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoFocus
          type="text"
          id="email"
          placeholder="Email"
          icon={<EmailIcon />}
        />

        <Input
          onChange={formik.handleChange}
          value={formik.values.oldPassword}
          fullWidth
          error={
            formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
          }
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          type="password"
          id="oldPassword"
          placeholder="Senha atual"
          icon={<LockIcon />}
        />

        <Input
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          fullWidth
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          type="password"
          id="newPassword"
          placeholder="Senha nova"
          icon={<LockIcon />}
        />

        <Input
          onChange={formik.handleChange}
          value={formik.values.birthday}
          fullWidth
          error={formik.touched.birthday && Boolean(formik.errors.birthday)}
          helperText={formik.touched.birthday && formik.errors.birthday}
          type="date"
          id="birthday"
          icon={<CalendarMonthIcon />}
        />
        {/* 
        <ReactInputMask
          onChange={formik.handleChange}
          value={formik.values.homePhone}
          fullWidth
          error={formik.touched.homePhone && Boolean(formik.errors.homePhone)}
          helperText={formik.touched.homePhone && formik.errors.homePhone}
          type="text"
          id="homePhone"
          placeholder="Telefone residencial"
          mask="(99) 99999-9999"
          maskChar="_"
        >
          {(inputProps: any) => <Input icon={<HomeIcon />} {...inputProps} />}
        </ReactInputMask>

        <ReactInputMask
          onChange={formik.handleChange}
          value={formik.values.workPhone}
          fullWidth
          error={formik.touched.workPhone && Boolean(formik.errors.workPhone)}
          helperText={formik.touched.workPhone && formik.errors.workPhone}
          type="text"
          id="workPhone"
          placeholder="Telefone profissional"
          mask="(99) 99999-9999"
          maskChar="_"
        >
          {(inputProps: any) => <Input icon={<PhoneIcon />} {...inputProps} />}
        </ReactInputMask>

        <ReactInputMask
          onChange={formik.handleChange}
          value={formik.values.mobilePhone}
          fullWidth
          error={
            formik.touched.mobilePhone && Boolean(formik.errors.mobilePhone)
          }
          helperText={formik.touched.mobilePhone && formik.errors.mobilePhone}
          type="text"
          id="mobilePhone"
          placeholder="Telefone móvel"
          mask="(99) 99999-9999"
          maskChar="_"
        >
          {(inputProps: any) => (
            <Input icon={<PhoneAndroidIcon />} {...inputProps} />
          )}
        </ReactInputMask> */}

        <Button
          color="secondary"
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Salvar
        </Button>
      </S.Form>
      <S.Footer>Feito por Cerise</S.Footer>
    </S.Container>
  );
}
