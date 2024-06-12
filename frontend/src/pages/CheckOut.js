import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import Container from "../components/Container";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";

const CheckOut = () => {
  const userState = useSelector((state) => state?.auth?.user);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartState?.length; i++) {
      sum += cartState[i].productId.price * cartState[i].quantity;
      setTotalAmount(sum);
    }
  }, [cartState]);

  const checkoutSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address is required"),
    apartment: yup.string(),
    city: yup.string().required("City is required"),
    zipCode: yup.string().required("ZIP code is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      zipCode: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      await handleCheckout();
    },
  });

  const handleCheckout = async () => {
    toast.success("Order has been placed!");

    const deletePromises = cartState.map((item) =>
      fetch(`http://localhost:5000/api/user/empty-cart`, {
        method: "DELETE",
        headers: {
          // Assuming you store your auth token in localStorage; adjust as necessary.
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete item from cart");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          // Handle error (e.g., show error message to user)
        })
    );

    try {
      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      setTimeout(() => {
        window.location.href = "http://localhost:3000/";
      }, 5000);
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle checkout error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Shop</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item total-price">
                    <Link to="/cart" className="text-dark">
                      Cart
                    </Link>
                  </li>{" "}
                  &nbsp; /
                  <li className="breadcrumb-item total-price">Information</li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price">Shipping</li>{" "}
                  &nbsp; /
                  <li className="breadcrumb-item total-price">Payment</li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">{userState?.email}</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit} // Dodane onSubmit
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="">United States</option>
                    <option value="">India</option>
                    <option value="">China</option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <CustomInput
                    type="text"
                    name="firstName" // Poprawione
                    placeholder="First name"
                    value={formik.values.firstName} // Poprawione
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <p className="mb-0 text-danger">
                        {formik.errors.firstName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <CustomInput
                    type="text"
                    name="lastName" // Poprawione
                    placeholder="Last name"
                    value={formik.values.lastName} // Poprawione
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <p className="mb-0 text-danger">
                        {formik.errors.lastName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="w-100">
                  <CustomInput
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.address && formik.errors.address ? (
                      <p className="mb-0 text-danger">
                        {formik.errors.address}
                      </p>
                    ) : null}
                  </div>{" "}
                </div>
                <div className="w-100">
                  <CustomInput
                    type="text"
                    name="apartment"
                    placeholder="Apartment"
                    value={formik.values.apartment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.apartment && formik.errors.apartment ? (
                      <p className="mb-0 text-danger">
                        {formik.errors.apartment}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <CustomInput
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.city && formik.errors.city ? (
                      <p className="mb-0 text-danger">{formik.errors.city}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <CustomInput
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div className="error mb-0">
                    {formik.touched.zipCode && formik.errors.zipCode ? (
                      <p className="mb-0 text-danger">
                        {formik.errors.zipCode}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <IoMdArrowBack className="me-2" />
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      className="button"
                      disabled={!formik.isValid}
                    >
                      {" "}
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            {Array.isArray(cartState) &&
              cartState.map((item, index) => (
                <div className="border-bottom py-4" key={index}>
                  <div className="d-flex gap-15  mb-2 align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          className="badge bg-secondary text-white rounded-circle p-1 position-absolute"
                          style={{ top: "-10px", right: "2px" }}
                        >
                          {item?.quantity}
                        </span>
                        <img
                          src={item?.productId?.images[0]?.url}
                          alt="item"
                          className="img-fluid"
                        />
                      </div>
                      <div>
                        <h5 className="total-price">
                          {item?.productId?.title}
                        </h5>
                        <p className="total-price">
                          {item?.productId?.description.length > 30
                            ? item?.productId?.description.slice(0, 30) + "..."
                            : item?.productId?.description}
                        </p>{" "}
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">
                        $ {item?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            <div className="">
              <div className="d-flex justify-content-between align-items-center pt-4">
                <p className="mb-0 total">SubTotal</p>
                <p className="mb-0 total-price">$ {totalAmount}</p>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center border-bottom">
                <p className="mb-4 total">Shipping</p>
                <p className="mb-4 total-price">$ 0</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pt-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">USD $ {totalAmount}</h5>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckOut;
