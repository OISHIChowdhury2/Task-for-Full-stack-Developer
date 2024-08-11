import React, { Fragment, useState } from "react";
import Joi from "joi";

export const Createcard = () => {
  const [e_name, setename] = useState("");
  const [e_email, sete_email] = useState("");
  const [e_age, sete_age] = useState("");
  const [e_salary, sete_salary] = useState("");
  const [e_address, sete_address] = useState("");
  const [e_joining_date, sete_joining_date] = useState("");
  const [e_total_sell, sete_total_sell] = useState("");
  const [errors, setErrors] = useState({});

  // Define the Joi schema for validation
  const schema = Joi.object({
    e_name: Joi.string().min(3).required().label("Name"),
    e_email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    e_age: Joi.number().integer().min(18).max(65).required().label("Age"),
    e_salary: Joi.number().min(0).required().label("Salary"),
    e_address: Joi.string().min(5).required().label("Address"),
    e_joining_date: Joi.date().required().label("Hiring Date"),
    e_total_sell: Joi.number().min(0).required().label("Total Sale"),
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { e_name, e_email, e_age, e_salary, e_address, e_joining_date, e_total_sell };

    // Validate the form data
    const { error } = schema.validate(body, { abortEarly: false });

    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    try {
      const response = await fetch("http://localhost:3000/api/v1/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.message === "email already exists") {
            // console.log(result.message)
            setErrors((prevErrors) => ({
              ...prevErrors,
              e_email: result.message,
            }));
          } else {
            // Handle other errors
            setErrors((prevErrors) => ({
                ...prevErrors,
                e_email: "Email already exists",
            }));
          }
          return;
        }
      window.location = "/createcard";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>

      <div className="items-start max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* <div className="text-2xl py-4 px-6  bg-indigo-400 text-white text-center font-bold uppercase">
          Client Details
        </div> */}
        <form className="py-4 px-6 " onSubmit={onSubmitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_name}
              onChange={(e) => setename(e.target.value)}
              id="e_name"
              required
            />
            {errors.e_name && <p className="text-red-500 text-xs mt-1">{errors.e_name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={e_email}
              onChange={(e) => sete_email(e.target.value)}
              id="e_email"
              required
            />
            {errors.e_email && <p className="text-red-500 text-xs mt-1">{errors.e_email}</p>}
        </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_age}
              onChange={(e) => sete_age(e.target.value)}
              id="e_age"
              required
            />
            {errors.e_age && <p className="text-red-500 text-xs mt-1">{errors.e_age}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="salary">
              Salary
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_salary}
              onChange={(e) => sete_salary(e.target.value)}
              id="e_salary"
              required
            />
            {errors.e_salary && <p className="text-red-500 text-xs mt-1">{errors.e_salary}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_address}
              onChange={(e) => sete_address(e.target.value)}
              id="e_address"
              required
            />
            {errors.e_address && <p className="text-red-500 text-xs mt-1">{errors.e_address}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="joining_date">
              Hiring Date
            </label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_joining_date}
              onChange={(e) => sete_joining_date(e.target.value)}
              id="e_joining_date"
              required
            />
            {errors.e_joining_date && <p className="text-red-500 text-xs mt-1">{errors.e_joining_date}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="total_sell">
              Total Sale
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={e_total_sell}
              onChange={(e) => sete_total_sell(e.target.value)}
              id="e_total_sell"
              required
            />
            {errors.e_total_sell && <p className="text-red-500 text-xs mt-1">{errors.e_total_sell}</p>}
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Client
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
