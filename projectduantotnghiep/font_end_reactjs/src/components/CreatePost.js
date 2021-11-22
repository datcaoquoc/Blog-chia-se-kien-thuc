import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/creatpost.css';
import { Formik, Form, Field, useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import { checkImage } from '../commons/validate/checkImage.js';
import { valid } from '../commons/validate/validateForm';
import uploadService from '../commons/axios/api/uploadService';
import { RiBallPenLine } from "react-icons/ri";
import postApi from '../commons/axios/api/postApi';
function CreatePost(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.listCategory);
  const quillRef = useRef(null)
  //toolbar react quill
  const modules = { toolbar: { container } }
  // select list category
  const Categories = listCategory.map((category) => {
    const { _id, namecategory } = category;
    return (
      <option key={_id} value={_id}>{namecategory}</option>
    );
  })
  const CreatePost = async (values) => {
    const { tittle, description, idcategory, avatarpost, content  } = values;
    await postApi.creatPost(content,tittle,idcategory, description, avatarpost).then(res => {
      toast.success(res.message)
    });
  };

  const handleChangeImage = useCallback(() => {
    // tạo element input
    const elementInput = document.createElement('input')
    elementInput.type = "file"
    elementInput.accept = ".png, .jpg, .jpeg"
    // elementInput.name = "image"
    // elementInput.enctype = "multipart/form-data"
    elementInput.click()
    elementInput.onchange = async () => {
      const files = elementInput.files;
      if (!files) toast.warn("vui lòng chọn file")
      const file = files[0]
      console.log('ss', file)
      const checkimg = checkImage(file)
      if (checkimg) return toast.info(checkimg);
      const width = 1000;
      const height = 600;
      const response = await toast.promise(
        uploadService.uploadimgpost(file, width, height),
        {
          pending: 'Đang tải ảnh lên....',
          success: 'Thành công',
          error: 'Có lỗi sảy ra, vui lòng thử lại'
        }
      );
      // const im = await uploadService.uploadimgpost(file, width, height);
      setTimeout(() => {
        const quill = quillRef.current;
        const range = quill?.getEditor().getSelection()?.index;
        if (range !== undefined) {
          quill?.getEditor().insertEmbed(range, 'image', `${response.urlimagepost}`);
        }
      }, 500)
    }
  });

  const handleAvtImage = async (e, setFieldValue) => {
    const tg = e.target
    const file = tg.files[0]
    const checkimg = checkImage(file)
    if (checkimg) return toast.info(checkimg);
      const width = 600;
      const height = 350;
      const im = await uploadService.uploadimgpost(file, width, height);
      setFieldValue('avatarpost', im.urlimagepost)

  }

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule('toolbar')
    toolbar.addHandler('image', handleChangeImage)
  }, [handleChangeImage])


  return (
    <div>
      <div className="creat-post-container">

        <ToastContainer />
        <h2 color="#000">Tạo bài viết</h2>
        <div className="container-body">
          {/* <div className="container-left">
                <img className="img-adv" src="https://mobibeat.mobifone.vn/ttnb/upload/news_images/93578b2e0fa9c9e31869b7e65fe945fc.jpg"></img>
            </div> */}
          <Formik

            initialValues={{ tittle: '', description: '', idcategory: '', avatarpost: '', content: '' }}
            validationSchema={valid.postValid}
            onSubmit={values => {
              CreatePost(values)
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form enctype="multipart/form-data">
                <div className="field">
                  <div className="lable-item">
                    <p>Tiêu đề : </p>
                  </div>
                  <div className="input-field">
                    <Field maxLength="150" className="input-title-creatpost" name="tittle" autocomplete="off" />
                    <div className="notifi">

                      {errors.tittle && touched.tittle ? (
                        <p className='input-error'>{errors.tittle}</p>
                      ) : <p className='input-error'></p>}
                      <small className="text-length">{values.tittle.length}/150</small>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="lable-item">
                    <p>Mô tả bài viết : </p>
                  </div>
                  <div className="input-field">
                    <Field maxLength="350" as="textarea" rows="2" className="input-desc-creatpost" name="description" autocomplete="off" />
                    <div className="notifi">

                      {errors.description && touched.description ? (
                        <p className='input-error'>{errors.description}</p>
                      ) : <p className='input-error'></p>}
                      <small className="text-length">{values.description.length}/350</small>
                    </div>

                  </div>
                </div>
                <div className="field">
                  <div className="lable-item">
                    <p>File đính kèm :  </p>
                  </div>
                  <div className="input-field">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      name="avatarpost"
                      enctype="multipart/form-data"
                      onChange={(e) => handleAvtImage(e, setFieldValue)} />
                    <div className="notifi">
                      {errors.avatarpost && touched.avatarpost ? (
                        <p className='input-error'>{errors.avatarpost}</p>
                      ) : <p className='input-error'></p>}
                    </div>

                  </div>
                </div>

                <div className="field">
                  <div className="lable-item">
                    <p>Thể loại : </p>
                  </div>
                  <div className="input-field">
                    <Field component="select" className="input-desc-creatpost" name="idcategory" autocomplete="off" >
                      <option disabled value=""></option>
                      {Categories}
                    </Field>
                    <div className="notifi">

                      {errors.idcategory && touched.idcategory ? (
                        <p className='input-error'>{errors.idcategory}</p>
                      ) : <p className='input-error'></p>}
                      <br />
                    </div>

                  </div>
                </div>

                <div className="field">
                  <div className="lable-item">
                    <p>Nội dung : </p>
                  </div>
                  <div className="input-field">
                    <Field name="content" >
                      {({ field }) => <ReactQuill
                        theme="snow"
                        placeholder="Nhập nội dung bài viết"
                        modules={modules} value={field.value}
                        onChange={field.onChange(field.name)}
                        ref={quillRef} />}
                    </Field>
                    <div className="notifi">

                      {errors.content && touched.content ? (
                        <p className='input-error'>{errors.content}</p>
                      ) : <p className='input-error'></p>}
                      <small className="text-length">{values.content.length}/20000</small>
                    </div>
                  </div>
                </div>
                <button className="btn-create-post" type="submit">Đăng bài <RiBallPenLine className="icon-creat-post"/></button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>

  );
}

let container = [
  [{ 'font': [] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'align': [] }],

  ['clean', 'link', 'image', 'video']
]

export default CreatePost;