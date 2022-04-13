import React, { useEffect, useState } from "react";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";

const SignUp = () => {
  const [datalist, setDataList] = useState([]);
  useEffect(() => {
    axios.get("/json/iranstates.json").then((response) => {
      setDataList(response.data);
    });
  }, []);

  return (
    <div className="box">
      <h1>رایگان ثبت نام کنید</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          evidence: "",
          university: "",
          birthCity: "",
          birthProvince: "",
          email: "",
          password: "",
        }}
        validate={(values) => {
          console.log(values.evidence);

          const errors = {};
          values.email = values.email.toLowerCase();
          if (!values.email) {
            errors.email = "پر کردن این فیلد اجباریست";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.firstName) {
            errors.firstName = "پر کردن این فیلد اجباریست";
          }

          if (!values.lastName) {
            errors.lastName = "پر کردن این فیلد اجباریست";
          }
          if (!values.university) {
            errors.university = "پر کردن این فیلد اجباریست";
          }
          if (!values.password) {
            errors.password = "پر کردن این فیلد اجباریست";
          }

          return errors;
        }}
        onSubmit={(values) => {
          alert("شما با موفقیت ثبت نام شدید. حال از طریق صفحه ورود وارد شوید");
          axios.post("http://localhost:3001/profile", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="formHolder" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              placeholder="نام"
            />
            <div className="error">
              {errors.firstName && touched.firstName && errors.firstName}
            </div>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              placeholder="نام‌خانوادگی"
            />
            <div className="error">
              {errors.lastName && touched.lastName && errors.lastName}
            </div>

            <select
              name="evidence"
              className="Select"
              value={values.evidence}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">مدرک تحصیلی</option>
              <option>دیپلم</option>
              <option>کارشناسی</option>
              <option>کارشناسی ارشد</option>
            </select>
            {values.evidence != "" ? (
              <>
                <input
                  type="text"
                  name="university"
                  value={values.university}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="محل تحصیل"
                />
                <div className="error">
                  {errors.university && touched.university && errors.university}
                </div>
              </>
            ) : null}

            <div className="city">
              <select
                className="Select"
                name="birthProvince"
                value={values.birthProvince}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">استان محل تولد</option>
                {Object.keys(datalist).map((item) => {
                  return <option key={item}>{item}</option>;
                })}
              </select>
              <select
                onChange={handleChange}
                onBlur={handleBlur}
                className="Select"
                name="birthCity"
                value={values.birthCity}
              >
                <option value="">شهر محل تولد</option>
                {values.birthProvince != ""
                  ? Object.values(datalist)[
                      Object.keys(datalist).findIndex(
                        (e) => e === values.birthProvince
                      )
                    ].map((item) => {
                      return <option key={item}>{item}</option>;
                    })
                  : ""}
              </select>
            </div>
            <input
              className="emailّ"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="ایمیل"
              
            />
            <div className="error">
              {errors.email && touched.email && errors.email}
            </div>

            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="رمزعبور"
            />
            <div className="error">
              {errors.password && touched.password && errors.password}
            </div>

            <button type="submit" disabled={isSubmitting} className="mainBut">
              ثبت‌نام
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
