import React, { useEffect, useState } from "react";

const ContactUs = () => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to manage the submission status message
  const [status, setStatus] = useState("");

  // State to manage the current theme ('light' or 'dark')
  const [theme, setTheme] = useState('light'); // Default to light theme

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Simulate form submission success
    setStatus("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Clear form fields
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Effect to scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Determine base background and text colors based on the theme
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const cardBg = isDark ? 'bg-800' : 'bg-white'; 
  const textColor = isDark ? 'text-gray-200' : 'text-gray-900';
  const lightTextColor = isDark ? 'text-gray-400' : 'text-gray-700';
  const inputBorder = isDark ? 'border-gray-600' : 'border-gray-300';
  const inputBg = isDark ? 'bg-gray-700' : 'bg-white';
  const inputPlaceholder = isDark ? 'placeholder-gray-500' : 'placeholder-gray-400';

  // Inline SVG for Phone Icon
  const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  // Inline SVG for Envelope Icon
  const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13V3" />
    </svg>
  );

  // Inline SVG for Map Marker Icon
  const MapMarkerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  // Inline SVG for Sun Icon (for light mode toggle)
  const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.675l-.707.707M6.343 6.343l-.707-.707m12.728 0l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  // Inline SVG for Moon Icon (for dark mode toggle)
  const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${bgColor}`}>
      <div className={`p-8 rounded-lg shadow-xl w-full max-w-6xl flex flex-col md:flex-row gap-8 transition-colors duration-300 ${cardBg}`}>
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full shadow-lg transition-colors duration-300 ${isDark ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            aria-label="Toggle Theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        {/* Column 1: Intro Text */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className={`text-4xl font-extrabold mb-6 font-inter ${textColor}`}>
              Contact Us
            </h2>
            <p className={`text-lg mb-8 font-inter leading-relaxed ${lightTextColor}`}>
              Have questions about Medi Mart, need assistance, or just want to
              say hello? We're here to help!
            </p>
          </div>
        </div>

        {/* Column 2: Contact Details */}
        <div className="md:w-1/3 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className={`text-2xl font-semibold mb-4 font-inter ${textColor}`}>
              Reach Us Directly
            </h3>
            <div className="flex items-center">
              <PhoneIcon />
              <span className={`font-inter ${textColor}`}>
                +1 (123) 456-7890
              </span>
            </div>
            <div className="flex items-center">
              <EnvelopeIcon />
              <span className={`font-inter ${textColor}`}>
                info@medimartcure.com
              </span>
            </div>
            <div className="flex items-start">
              <MapMarkerIcon />
              <address className={`not-italic font-inter ${textColor}`}>
                123 Car Street, Suite 456 <br />
                TX 78701 <br />
                USA
              </address>
            </div>
          </div>
        </div>

        {/* Column 3: Contact Form Section */}
        <div className="md:w-1/3">
          <h3 className={`text-2xl font-semibold mb-4 font-inter ${textColor}`}>
            Send a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium font-inter ${lightTextColor}`}
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 ${inputBorder} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter ${inputBg} ${textColor} ${inputPlaceholder}`}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium font-inter ${lightTextColor}`}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 ${inputBorder} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter ${inputBg} ${textColor} ${inputPlaceholder}`}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-medium font-inter ${lightTextColor}`}
              >
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-2 ${inputBorder} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-inter ${inputBg} ${textColor} ${inputPlaceholder}`}
                placeholder="Tell us how we can help..."
                required
              ></textarea>
            </div>

            {status && (
              <p
                className={`text-center font-semibold font-inter ${
                  status.includes("Thank you")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-inter"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
