import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/auth.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin, clearState, postRegister,postRenderOtp } from '../redux/features/auth/authSlice';
import { Formik, Form, Field } from 'formik';
import { validateAuth } from '../commons/validate/validateAuth';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { message } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const onBtnDialog = () => {
    console.log()
    dispatch(postRenderOtp({ email })).unwrap()
      .then((data) => {
        if (data.message === 'Đã gửi mã otp xác thực') {
          history.push({
            pathname:'/verificationcode',
            state: { account: email },
        })
        }
      })
  }

  const onRegister = (values) => {
    const { name, email, password } = values;
    dispatch(postRegister({ name, email, password })).unwrap()
      .then((data) => {
        if (data.message === 'đăng kí thành công') {
          history.push({
            pathname:'/verificationcode',
            state: { account: email },
        })
        }
      })
  }


  const onlogin = (values) => {
    const { email, password } = values;
    dispatch(postLogin({ email, password })).unwrap()
      .then((data) => {
        switch (data.message) {
          case 'đăng nhập thành công':
            history.push("/");
            break;
          case '(*) tài khoản chưa được xác thực':
            setOpen(true)
            break;
        }
      })
  };
  const singup = () => {
    document.getElementById('container').classList.add("right-panel-active");
    dispatch(clearState());

  };
  const signin = () => {
    document.getElementById('container').classList.remove("right-panel-active");
    dispatch(clearState());
  };


  return (
    <>
      <Dialog
        open={open}
      >
        <DialogTitle>
          {"Tài khoản chưa xác thực"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tài khoản của bạn chưa xác thực thông tin, Vui lòng xác thực tài khoản trước khi đăng nhập
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="btn-dialog" onClick={() => setOpen(false)}>Hủy</Button>
          <Button className="btn-dialog" onClick={onBtnDialog} >Xác thực tài khoản</Button>
        </DialogActions>
      </Dialog>
      <div className="anhnen">
        {isLoading ? <div width="500px" height="500px" className="fp-loader" /> : null}

        <div className="container" id="container">

          <div className="right-container"></div>
          <div className="left-container">

            <div className="form-container sign-in-container">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validateAuth.loginValid}
                onSubmit={values => {
                  onlogin(values)
                }}
              >
                {({ errors, touched }) => (
                  <Form className="form">
                    <img src="../access/mobifone-logo.png" width="70%" />
                    <h5 className="title-login">Đăng nhập bằng tài khoản của bạn</h5>

                    <div className="formItem">
                      <img src="../access/iconEmail.png" alt="" className="icon-input" />
                      <Field className="input" name="email" type="email" placeholder="Email" />
                    </div>
                    {errors.email && touched.email ? (
                      <span className='error'>{errors.email}</span>
                    ) : <span className='error'></span>}

                    <div className="formItem">
                      <img src="../access/iconPassword.png" alt="" className="icon-input" />

                      <Field className="input" name="password" type="password" placeholder="Password"></Field>
                    </div>
                    {errors.password && touched.password ? (
                      <span className='error'>{errors.password}</span>
                    ) : <span className='error'></span>}
                    <button className="btn" type="submit">Đăng nhập</button>

                    <a href="#" className="forgotpassword">Forgot your password ?</a>
                    <div>
                      <span>Nếu chưa có tài khoản hãy </span>
                      <button className="click-form-register" type="reset" onClick={singup} >  Đăng kí tài khoản</button>
                    </div>
                    <span className='error-result'>{message}</span>
                  </Form>
                )}
              </Formik>
            </div>


            <div className="form-container sign-up-container">
              <Formik
                initialValues={{ name: '', email: '', password: '', cfpassword: '' }}
                validationSchema={validateAuth.registerValid}
                onSubmit={values => {
                  onRegister(values)
                }}
              >
                {({ errors, touched }) => (
                  <Form className="form">
                    <h5 className="title-register">Đăng kí tài khoản</h5>

                    <div className="formItem">
                      <img src="../access/iconuser.png" alt="" className="icon-input" />
                      <Field className="input" name="name" type="text" placeholder="Họ và Tên" />
                    </div>
                    {errors.name && touched.name ? (
                      <span className='error'>{errors.name}</span>
                    ) : <span className='error'></span>}

                    <div className="formItem">
                      <img src="../access/iconEmail.png" alt="" className="icon-input" />
                      <Field className="input" name="email" type="email" placeholder="me@example.com" />
                    </div>
                    {errors.email && touched.email ? (
                      <span className='error'>{errors.email}</span>
                    ) : <span className='error'></span>}

                    <div className="formItem">
                      <img src="../access/iconPassword.png" alt="" className="icon-input" />
                      <Field className="input" name="password" type="password" placeholder="*****" />
                    </div>
                    {errors.password && touched.password ? (
                      <span className='error'>{errors.password}</span>
                    ) : <span className='error'></span>}

                    <div className="formItem">
                      <img src="../access/iconPassword.png" alt="" className="icon-input" />
                      <Field className="input" name="cfpassword" type="password" placeholder="*****" />
                    </div>
                    {errors.cfpassword && touched.cfpassword ? (
                      <span className='error'>{errors.cfpassword}</span>
                    ) : <span className='error'></span>}

                    <button className="btn" type="submit">Đăng kí</button>

                    <div className="rs">
                      <span>Bạn đã có tài khoản ? </span>
                      <button className="click-form-register" type="reset" onClick={signin} >  Đăng nhập</button>
                    </div>
                    <span className='error-result-register'>{message}</span>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div>
            <span className="credit">Sản phẩm được phát triển bởi Trung tâm CNTT MobiFone</span>
          </div>

        </div>

      </div>


    </>


  );
}

export default Login;