import { yupToFormErrors } from 'formik';
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

  const postValid = Yup.object().shape({
    tittle: Yup.string()
    .required('Tiêu đề bắt buộc phải nhập')
    .max(150, 'Tối đa 150 kí tự'),

    description: Yup.string()
    .required('Mô tả bài viết bắt buộc phải nhập')
    .max(350, 'Tối đa 350 kí tự'),

    idcategory: Yup.string().required('Vui lòng chọn thể loại'),

    avatarpost: Yup.string().required('vui lòng chọn file'),

    content: Yup.string()
    .required('Nội dung bài viết không được trống')
    .max(20000, 'Tối đa 20000 kí tự'),
  });

export const valid = {registerValid, loginValid, postValid}