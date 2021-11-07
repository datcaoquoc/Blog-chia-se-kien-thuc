import * as Yup from 'yup';
const registerValid = Yup.object().shape({
    name: Yup.string()
      .required('(*) Vui lòng nhập Tên'),
    email: Yup.string()
      .email('(*) Email không đúng định dạng')
      .required('(*) Vui lòng nhập Email'),
    password: Yup.string()
      .matches(
        /^(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "(*) Password > 8 kí tự, 1 kí tự đặc biệt"
      )
      .required('(*) Vui lòng nhập Password'),
    cfpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], ' (*) Passwords phải trùng khớp')
  });

  const loginValid = Yup.object().shape({
    email: Yup.string()
      .email('(*) Email không đúng định dạng')
      .required('(*) Vui lòng nhập Email'),
    password: Yup.string()
      .required('(*) Vui lòng nhập Password'),
  });


export const validateAuth = {registerValid, loginValid}