import React, { useState } from "react";
import Joi from "joi";

const CardUpdate = ({ info }) => {
  const [e_name, setename] = useState(info.e_name);
  const [e_email, sete_email] = useState(info.e_email);
  const [e_age, sete_age] = useState(info.e_age);
  const [e_salary, sete_salary] = useState(info.e_salary);
  const [e_address, sete_address] = useState(info.e_address);
  const [e_joining_date, sete_joining_date] = useState(info.e_joining_date);
  const [e_total_sell, sete_total_sell] = useState(info.e_total_sell);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Define JOI schema
  const schema = Joi.object({
    e_name: Joi.string().min(3).max(30).required(),
    e_email: Joi.string().email({ tlds: { allow: false } }).required(),
    e_age: Joi.number().integer().min(18).required(),
    e_salary: Joi.number().min(0).required(),
    e_address: Joi.string().min(3).max(100).required(),
    e_joining_date: Joi.date().required(),
    e_total_sell: Joi.number().min(0).required(),
  });

  const updateinfo = async (e) => {
    e.preventDefault();

    const body = {
      e_name,
      e_email,
      e_age,
      e_salary,
      e_address,
      e_joining_date,
      e_total_sell,
    };

    // Check if the form values have been updated
    const isUnchanged =
      e_name === info.e_name &&
      e_email === info.e_email &&
      e_age === info.e_age &&
      e_salary === info.e_salary &&
      e_address === info.e_address &&
      e_joining_date === info.e_joining_date &&
      e_total_sell === info.e_total_sell;

    if (isUnchanged) {
      setError("Please update at least one field before submitting.");
      return;
    }

    // Validate data with JOI
    const { error } = schema.validate(body);

    if (error) {
      setError(error.details[0].message);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/employee/${info.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      if (response.ok) {
        window.location = "/";
      } else {
        const errorMsg = await response.text();
        setError(`Failed to update: ${errorMsg}`);
      }
    } catch (err) {
      console.error(err.message);
      setError("An error occurred while updating. Please try again.");
    }
  };

  const handleEditClick = () => {
    setError(null); // Clear previous errors
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        className="bg-indigo-500 rounded-tl-full rounded-br-full text-white text-sm text-center self-center px-4 py-2 m-2"
        onClick={handleEditClick}
      >
        Edit
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-3xl mx-auto my-6">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-3xl text-black font-semibold">Edit Info</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>

              <form className="py-4 px-6 w-auto" onSubmit={updateinfo}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_name}
                      onChange={(e) => setename(e.target.value)}
                      id="e_name"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_email}
                      onChange={(e) => sete_email(e.target.value)}
                      id="e_email"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
                      Age
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_age}
                      onChange={(e) => sete_age(e.target.value)}
                      id="e_age"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_address}
                      onChange={(e) => sete_address(e.target.value)}
                      id="e_address"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="joining_date">
                      Hiring Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_joining_date}
                      type="date"
                      onChange={(e) => sete_joining_date(e.target.value)}
                      id="e_joining_date"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="salary">
                      Salary
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_salary}
                      onChange={(e) => sete_salary(e.target.value)}
                      id="e_salary"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="total_sell">
                      Total Sale
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={e_total_sell}
                      onChange={(e) => sete_total_sell(e.target.value)}
                      id="e_total_sell"
                    />
                  </div>
                </div>
              </form>

              <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-yellow-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={(e) => {
                    updateinfo(e);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 inset-0 z-40 bg-black"></div>
        </div>
      )}
    </>
  );
};

export default CardUpdate;
