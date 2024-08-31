import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { contactSendEmail } from "../redux/reducers/contactSlice";
import { useSelector } from "react-redux";
const ContactUs = () => {
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactSendEmail(formData));

    // Handle form submission (e.g., send form data to a server)
    console.log("Form submitted:", formData);
    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-10 sm:m-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
          <div>
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-md font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full h-32 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="h-full uppercase font-semibold px-[4rem] text-white bg-[#1F212A] hover:bg-[#BC9B80] transition-all duration-300 py-3"
            >
              Send Message
            </button>
          </div>
          <div className="mx-auto text-center">
            {status === "succeeded" && (
              <p className="mb-4 text-green-600">
                Your message has been sent. Thank you!
              </p>
            )}
            {status === "failed" && (
              <p className="mt-4 text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
