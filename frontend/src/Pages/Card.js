import React, { Fragment, useState, useEffect } from 'react';
import CardUpdate from './CardUpdate';

export const Card = () => {
    const [infos, setInfos] = useState([]);
    const [selectedInfo, setSelectedInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getinfo = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/employee');
            const jsonData = await response.json();
            setInfos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteinfo = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/employee/${selectedInfo.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                setInfos(infos.filter(info => info.id !== selectedInfo.id));
                setShowModal(false);
            } else {
                console.error('Failed to delete the info');
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const openModal = (info) => {
        setSelectedInfo(info);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedInfo(null);
    };

    useEffect(() => {
        getinfo();
    }, []);

    return (
        <Fragment>
            <div className="text-2xl py-4 px-6 bg-indigo-200 text-white text-center font-bold uppercase ">
                Client Details
          </div>
            <div className="flex flex-wrap justify-center mt-10  ">
                {infos.map(info => (
                    <div key={info.id} className="p-4 max-w-sm">
                        <div className="flex rounded-lg h-full bg-indigo-400 p-8 flex-col">
                            <div className="flex items-center mb-3">
                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-yellow-300 text-white flex-shrink-0">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                    </svg>
                                </div>
                                <h2 className="text-white text-lg font-medium">{info.e_name}</h2>
                            </div>
                            <div className="flex flex-col justify-between flex-grow">
                                <ul className="leading-relaxed text-base text-white ">
                                    <li>Email: {info.e_email}</li>
                                    <li>Age: {info.e_age}</li>
                                    <li>Salary: {info.e_salary}</li>
                                    <li>Address: {info.e_address}</li>
                                    <li>Hiring Date: {info.e_joining_date}</li>
                                    <li>Total Sell: {info.e_total_sell}</li>
                                    <li><CardUpdate info={info} /></li>
                                </ul>
                                <button
                                    className="bg-red-500 rounded-tl-full rounded-br-full text-white text-sm text-center self-center px-4 py-2 m-2"
                                    onClick={() => openModal(info)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{selectedInfo?.e_name}</h2>
                            <p>Are you sure you want to delete this record?</p>
                        </div>
                        <div className="p-4 flex justify-end space-x-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={deleteinfo}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
       
        </Fragment>
    );
};

