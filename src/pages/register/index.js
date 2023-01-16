import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/actions/authAction";
import { HiEye, HiEyeOff, HiArrowSmLeft } from "react-icons/hi";

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState(true);

  const handleSecret = () => {
    setSecret(!secret);
  };

  async function register(b) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(b),
    };
    const response = await fetch(
      "https://garlic-backend.herokuapp.com/api/v1/akun",
      requestOptions
    );
    if (response.ok) {
      router.push("/login");
    } else {
      setLoading(false);
      const result = await response.text();
      alert(result);
    }
  }

  const handleClick = async (body) => {
    register(body);
  };

  const loginSchema = Yup.object().shape({
    nama: Yup.string().required("Required"),
    email: Yup.string()
      .email()
      .required("Required")
      .matches(
        /[a-zA-Z0-9]+([\w\.\'\!\#\$\%\&\*\+\-\/\=\?\^\`\{\|\}\~])+@apps.ipb.ac.id/,
        "Email harus menggunakan email ipb"
      ),
    phoneNumber: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    password: Yup.string().required("Required").min(3, "Too Short!"),
  });

  return (
    <>
      <div className="min-h-screen font-display flex items-center justify-center bg-primary-dark py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto my-16 ">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex px-4 ">
              <button
                onClick={() => {
                  window.history.back();
                }}
              >
                <HiArrowSmLeft className="w-6 h-6" />
              </button>
              <div className="flex-grow px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Registrasi Pengguna
                </h3>
              </div>
            </div>

            <div className="border-t border-gray-200">
              <Formik
                initialValues={{
                  nama: "",
                  email: "",
                  password: "",
                  phoneNumber: "",
                  address: "",
                  kebutuhan: "",
                  tipe: "",
                }}
                validationSchema={loginSchema}
                onSubmit={(values) => {
                  console.log(values);
                  setLoading(true);
                  handleClick(values);
                }}
              >
                <Form>
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 grid grid-cols-6 gap-4 ">
                      <dt className="text-sm font-medium text-gray-500">
                        Nama Lengkap
                      </dt>
                      <dd className=" text-sm text-gray-900 mt-0 col-span-5">
                        <Field
                          className={styles.field}
                          id="nama"
                          name="nama"
                          type="text"
                        />
                        <ErrorMessage
                          component="a"
                          className={styles.errorMsg}
                          name="nama"
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-5">
                        <Field
                          className={styles.field}
                          id="email"
                          name="email"
                          type="email"
                        />
                        <ErrorMessage
                          component="a"
                          className={styles.errorMsg}
                          name="email"
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Nomor Telepon
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-5">
                        <Field
                          className={styles.field}
                          id="phoneNumber"
                          name="phoneNumber"
                          type="text"
                        />
                        <ErrorMessage
                          component="a"
                          className={styles.errorMsg}
                          name="phoneNumber"
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Alamat
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-5">
                        <Field
                          className={styles.field}
                          id="address"
                          name="address"
                          type="text"
                        />
                        <ErrorMessage
                          component="a"
                          className={styles.errorMsg}
                          name="address"
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Kebutuhan
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-5">
                        <Field
                          className={styles.field}
                          as="select"
                          name="kebutuhan"
                        >
                          <option value="penelitian">Penelitian</option>
                          <option value="pendidikan">Pendidikan</option>
                          <option value="pengabdianMasyarakat">
                            Pengabdian Masyarakat
                          </option>
                        </Field>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Password
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-5">
                        <Field name="password">
                          {({
                            field, // { name, value, onChange, onBlur }
                            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            meta,
                          }) => (
                            <div className="flex bg-gray-200 text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                              <input
                                className="bg-gray-200 text-black focus:outline-none focus:shadow-outline border   block w-full appearance-none"
                                type={`${secret ? "password" : "text"}`}
                                {...field}
                              />
                              <div className="flex-grow"></div>
                              <button type="button" onClick={handleSecret}>
                                {secret ? (
                                  <HiEye className="w-6 h-6" />
                                ) : (
                                  <HiEyeOff className="w-6 h-6" />
                                )}
                              </button>
                            </div>
                          )}
                        </Field>
                        <ErrorMessage
                          component="a"
                          className={styles.errorMsg}
                          name="password"
                        />
                      </dd>
                    </div>
                  </dl>

                  <div className="flex m-4">
                    <div className="flex-grow"> </div>
                    <div className="flex-none">
                      <button
                        type="submit"
                        className={`bg-primary-coco flex-none hover:bg-primary-darkcoco text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md`}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  label: "block text-black text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-200 text-black focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  errorMsg: "text-red-500 text-sm",
};

export default Register;
