"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import PageBanner from "@/components/pageBanner/PageBanner";
import SeoMeta from "@/components/seo";

interface LeadFormData {
  name: string;
  contactNumber: string;
  email?: string;
  city: string;
  purpose: string;
  donationAmount: number | "";
  personalMessage?: string;
  paymentMethod: string;
  transactionId?: string;
}

interface ApiResponse {
  message: string;
  success: boolean;
}

export default function DonateUs() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    contactNumber: "",
    email: "",
    city: "",
    purpose: "Donation",
    donationAmount: "",
    personalMessage: "",
    paymentMethod: "Bank Transfer",
    transactionId: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "donationAmount" ? (value ? parseFloat(value) : "") : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (formData.donationAmount === "" || formData.donationAmount <= 0) {
      newErrors.donationAmount = "Donation amount must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/submitDonation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.name,
          contactNumber: formData.contactNumber,
          email: formData.email || null,
          city: formData.city,
          purpose: formData.purpose,
          donationAmount: formData.donationAmount
            ? Number(formData.donationAmount)
            : 0,
          personalMessage: formData.personalMessage || null,
          paymentMethod: formData.paymentMethod,
          transactionId: formData.transactionId || null,
        }),
      });

      const result: ApiResponse = await response.json();
      setMessage(result.message);

      if (result.success) {
        setShowThankYou(true);
      }

      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        city: "",
        purpose: "Donation",
        donationAmount: "",
        personalMessage: "",
        paymentMethod: "Bank Transfer",
        transactionId: "",
      });
    } catch (error) {
      setMessage("Failed to submit lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SeoMeta
        title="Donate Us For Preaching The True Teachings | Paigham Tv | Paigham TV"
        url="/donate-us"
        description="DONATE US for preaching the true teachings of the Holy Quran and Sunnah"
      />
      <PageBanner title="Donate Us" image="/images/banner-2.jpg" />

      {/* Donation Form Section */}
      <section className="container mx-auto mb-28 px-4 mt-28 ">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-6xl">
          {/* Side Image - Hidden on Mobile */}
          <div
            className="hidden bg-cover bg-no-repeat bg-center lg:block lg:w-1/2"
            style={{
              backgroundImage: "url('/images/donatebanner.webp')",
            }}
          ></div>

          {/* Form Container */}
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <img className="w-24 mx-auto" src="/images/logo-wot.png" alt="" />
            <h2 className="text-2xl font-semibold text-center mb-6">
              Donate Now
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Contact Number and Email Fields */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Whatsapp Number
                  </label>
                  <input
                    type="text"
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="Whatsapp Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-600"
                  >
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email (Optional)"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* City Field */}
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              {/* Purpose Field */}
              <div>
                <label
                  htmlFor="purpose"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="Donation">Donation</option>
                  <option value="Zakat">Zakat</option>
                  <option value="Sadqa">Sadqa</option>
                  <option value="Fitrana">Fitrana</option>
                  <option value="Fidya">Fidya</option>
                  <option value="Program Sponsor">Program Sponsor</option>
                </select>
              </div>

              {/* Donation Amount Field */}
              <div>
                <label
                  htmlFor="donationAmount"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Enter Your Donation
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  name="donationAmount"
                  placeholder="Donation Amount"
                  value={formData.donationAmount}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
                {errors.donationAmount && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.donationAmount}
                  </p>
                )}
              </div>

              {/* Personal Message Field */}
              <div>
                <label
                  htmlFor="personalMessage"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Personal Message (Optional)
                </label>
                <textarea
                  id="personalMessage"
                  name="personalMessage"
                  placeholder="Personal Message (Optional)"
                  value={formData.personalMessage}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>

              {/* Payment Method Field */}
              <div className="space-y-2">
                <label className="block font-medium">
                  Select Payment Method:
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      defaultChecked
                      value="Bank Transfer"
                      checked={formData.paymentMethod === "Bank Transfer"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Bank Transfer
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="JazzCash"
                      checked={formData.paymentMethod === "JazzCash"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    JazzCash
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="EasyPaisa"
                      checked={formData.paymentMethod === "EasyPaisa"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    EasyPaisa
                  </label>
                </div>
              </div>

              {/* Bank Transfer Details */}
              {formData.paymentMethod === "Bank Transfer" && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2 text-gray-600">
                  {/* Bank Name at the Top (Like a Logo) */}
                  <div className="text-center mb-4 flex items-center justify-center">
                    <img
                      src="/images/banklogo.png"
                      alt="Dubai Islamic Bank"
                      className="w-8 m-2"
                    />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Dubai Islamic Bank
                    </h2>
                  </div>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* Account Title */}
                  <p className="text-sm text-gray-600">
                    <strong>Account Title:</strong> Zam Zam Welfare Trust
                  </p>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("0709217001");
                      alert("Account Number!");
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none flex justify-between w-full"
                  >
                    {/* Account Number */}
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 0709217001
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h3a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3V3z" />
                      <path d="M6 5a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H6z" />
                    </svg>
                  </button>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* IBAN with Copy Icon on the Left */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "PK45DUIB0000000709217001"
                        );
                        alert("IBAN copied to clipboard!");
                      }}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none flex justify-between w-full"
                    >
                      <p className="text-sm text-gray-600">
                        <strong>IBAN NO:</strong> PK45DUIB0000000709217001
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h3a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3V3z" />
                        <path d="M6 5a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H6z" />
                      </svg>
                    </button>
                  </div>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* Branch Name */}
                  <p className="text-sm text-gray-600">
                    <strong>Branch Name:</strong> Ravi Road Branch Lahore,
                    Pakistan
                  </p>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* Branch Code */}
                  <p className="text-sm text-gray-600">
                    <strong>Branch Code:</strong> 0219
                  </p>

                  {/* Horizontal Line */}
                </div>
              )}

              {formData.paymentMethod === "EasyPaisa" && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2 text-gray-600">
                  {/* Bank Name at the Top (Like a Logo) */}
                  <div className="text-center mb-4 flex items-center justify-center">
                    <img
                      src="/images/easy.jpg"
                      alt="Dubai Islamic Bank"
                      className="w-8 m-2"
                    />
                    <h2 className="text-xl font-semibold text-gray-800">
                      EasyPaisa
                    </h2>
                  </div>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* Account Title */}
                  <p className="text-sm text-gray-600">
                    <strong>Account Title:</strong> M.Asim Hafeez
                  </p>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("03217165256");
                      alert("Account Number copied");
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none flex justify-between w-full"
                  >
                    {/* Account Number */}
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 03217165256
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h3a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3V3z" />
                      <path d="M6 5a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H6z" />
                    </svg>
                  </button>
                </div>
              )}
              {formData.paymentMethod === "JazzCash" && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm space-y-2 text-gray-600">
                  {/* Bank Name at the Top (Like a Logo) */}
                  <div className="text-center mb-4 flex items-center justify-center">
                    <img
                      src="/images/jazz.jpg"
                      alt="Dubai Islamic Bank"
                      className="w-24 m-2"
                    />
                  </div>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  {/* Account Title */}
                  <p className="text-sm text-gray-600">
                    <strong>Account Title:</strong> M.Asim Hafeez
                  </p>

                  {/* Horizontal Line */}
                  <hr className="border-gray-200" />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("03217165256");
                      alert("Account Number copied!");
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none flex justify-between w-full"
                  >
                    {/* Account Number */}
                    <p className="text-sm text-gray-600">
                      <strong>Account Number:</strong> 03217165256
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1h3a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3V3z" />
                      <path d="M6 5a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H6z" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Transaction ID Field */}
              <div>
                <label
                  htmlFor="transactionId"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Transaction ID
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  placeholder="Transaction ID"
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? "Donating..." : "Donate Now"}
              </button>

              {message && <p className="text-center mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </section>
      <footer className="footer-new p-5 bg-gray-50 border-t border-gray-200">
        <div className="footer-content max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-600">
            For more details, please contact Mr. Abdul Qayyum Zaheer
          </p>
          <div className="contact-info mt-3 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <p className="text-sm text-gray-600">
              <strong>Tel:</strong> +92 333 4089688
            </p>
            <p className="text-sm text-gray-600">
              <strong>Tel:</strong> +92 308 4089688
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> aqzaheer@paigham.tv
            </p>
          </div>
        </div>
      </footer>

      {/* Thank You Popup */}
      {showThankYou && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white pt-2 p-6 rounded-lg shadow-lg text-center m-4 font-mehr">
            <div className="ml-auto text-right">
              <button onClick={() => setShowThankYou(false)}>❌</button>
            </div>
            <div className="text-center">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-xl font-bold text-gray-800 mb-3 font-mehr">
                  جزاکم اللہ خیراً! 🌸
                </p>
                <p className="text-lg text-gray-600 mb-3 ">
                  اللہ تعالیٰ آپ کے اس صدقہ و خیرات کو قبول فرمائے اور آپ کو بے
                  حساب برکتوں اور نعمتوں سے نوازے۔
                </p>
                <p className=" text-xl font-bold  text-gray-800 border-l-4 border-green-500 pl-3 mb-3">
                  نبی کریم ﷺ نے فرمایا: "اللہ فرماتا ہے: اے ابن آدم! خرچ کرو،
                  میں تم پر خرچ کروں گا۔"
                  <span className="text-sm text-gray-500">
                    {" "}
                    (صحیح مسلم: 993)
                  </span>
                </p>
                <p className="text-lg text-gray-600">
                  آپ کی سخاوت دوسروں کے لیے روشنی اور رحمت کا ذریعہ بنے! 💖✨
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
