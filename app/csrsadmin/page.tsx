"use client";
import React, { useState } from "react";

const AdminDashboard = () => {
  const defaultImage =
    "https://media.licdn.com/dms/image/v2/D5612AQE8NiooxTxA3w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1695825196046?e=2147483647&v=beta&t=2zU71mKLxGihkNQB5eMDjCgbD7srasN1gyEqowXMGV4";

  const [sliderImages, setSliderImages] = useState([defaultImage]);
  const [donationAmount, setDonationAmount] = useState(5000); // Fake initial donation amount
  const [certificates, setCertificates] = useState([defaultImage]);

  // Handlers for Slider Images
  const handleAddSliderImage = (file) => {
    const newImage = URL.createObjectURL(file);
    setSliderImages([...sliderImages, newImage]);
  };

  const handleDeleteSliderImage = (index) => {
    setSliderImages(sliderImages.filter((_, i) => i !== index));
  };

  // Handlers for Certificates
  const handleAddCertificate = (file) => {
    const newCertificate = URL.createObjectURL(file);
    setCertificates([...certificates, newCertificate]);
  };

  const handleDeleteCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8 space-y-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center text-gray-800">
        Admin Dashboard
      </h1>

      {/* Slider Image Handler */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-6 hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-gray-700">
          Slider Image Handler
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files[0] && handleAddSliderImage(e.target.files[0])
          }
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring focus:outline-none"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {sliderImages.map((img, index) => (
            <div key={index} className="relative group w-full aspect-video">
              <img
                src={img}
                alt={`Slider ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteSliderImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Amount Editor */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-6 hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-gray-700">Donation Amount</h2>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-32 p-2 border border-gray-300 rounded-md focus:ring focus:outline-none"
          />
          <span className="text-lg font-medium text-gray-600">USD</span>
        </div>
      </section>

      {/* Donation Certificate Showcase */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-6 hover:shadow-lg transition">
        <h2 className="text-xl font-bold text-gray-700">
          Donation Certificates
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files[0] && handleAddCertificate(e.target.files[0])
          }
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 focus:ring focus:outline-none"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {certificates.map((cert, index) => (
            <div key={index} className="relative group w-full aspect-[9/16]">
              <img
                src={cert}
                alt={`Certificate ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleDeleteCertificate(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
