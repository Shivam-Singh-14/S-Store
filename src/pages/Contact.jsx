import React, { useState, useEffect } from 'react';
import { Building2, PhoneCall } from 'lucide-react';

const Contact = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [contactInfo, setContactInfo] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'Technical Help',
        message: ''
    });
    const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Fetch contact info from dummy API
        // Using jsonplaceholder.typicode.com for demo purposes
        // We simulate contact info with a GET request to /users/1
        fetch('https://jsonplaceholder.typicode.com/users/1')
            .then((response) => response.json())
            .then((data) => {
                // Map dummy data to contact info structure
                setContactInfo({
                    showroomAddress: data.address.street + ', ' + data.address.city + ', ' + data.address.zipcode,
                    showroomPhones: ['(+44) 1800 5555 3535', '(+44) 1800 5555 6969'], // static phones as dummy API doesn't provide
                    quickHelpDescription: 'You can ask anything you want to know about our products',
                    quickHelpEmails: ['support24@xstore.com', 'information@xstore.com'] // static emails
                });
            })
            .catch(() => {
                // fallback to default static data on error
                setContactInfo({
                    showroomAddress: '551 Water Color Green Ball St, New York, NY 2041, USA',
                    showroomPhones: ['(+44) 1800 5555 3535', '(+44) 1800 5555 6969'],
                    quickHelpDescription: 'You can ask anything you want to know about our products',
                    quickHelpEmails: ['support24@xstore.com', 'information@xstore.com']
                });
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setFormStatus(null);

        // Post form data to dummy API endpoint
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    setFormStatus('success');
                    setFormData({
                        name: '',
                        email: '',
                        subject: 'Technical Help',
                        message: ''
                    });
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(() => {
                setFormStatus('error');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-8 lg:p-10 bg-white">
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Map with Slide-Right Animation */}
                    <div
                        className={`w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out ${
                            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
                        }`}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        <iframe
                            title="store-location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090565!2d144.95373531550498!3d-37.816279742021065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f3f51b5f%3A0x2c7d8f73e7dcdf5!2sEnvato!5e0!3m2!1sen!2sus!4v1614462217395!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            className="w-full h-full border-0"
                        ></iframe>
                    </div>
                    {/* Info and Form with Slide-Left Animation */}
                    <div
                        className={`w-full lg:w-1/2 flex flex-col gap-6 transition-all duration-700 ease-in-out ${
                            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
                        }`}
                        style={{ willChange: 'transform, opacity' }}
                    >
                        {/* Showroom & Quick Help */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                            <div className="flex-1 flex flex-col justify-center">
                                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-1">
                                    <Building2 className="text-green-700 w-6 h-6 sm:w-7 sm:h-7" /> Our Showroom
                                </h2>
                                <p className="text-gray-700 text-sm sm:text-base mt-2 mb-2">
                                    {contactInfo ? contactInfo.showroomAddress : 'Loading address...'}
                                </p>
                                {contactInfo &&
                                    contactInfo.showroomPhones.map((phone, idx) => (
                                        <p key={idx} className="text-gray-700 text-sm sm:text-base mb-1">
                                            {phone}
                                        </p>
                                    ))}
                            </div>
                            <div className="flex-1 flex flex-col justify-center">
                                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-1">
                                    <PhoneCall className="text-green-700 w-6 h-6 sm:w-7 sm:h-7" /> Quick Help
                                </h2>
                                <p className="text-gray-700 text-sm sm:text-base mt-2 mb-2">
                                    {contactInfo ? contactInfo.quickHelpDescription : 'Loading description...'}
                                </p>
                                {contactInfo &&
                                    contactInfo.quickHelpEmails.map((email, idx) => (
                                        <p key={idx} className="text-gray-700 text-sm sm:text-base">
                                            {email}
                                        </p>
                                    ))}
                            </div>
                        </div>
                        {/* Form */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-2">Send a Message</h2>
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your E-mail"
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    required
                                />
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                >
                                    <option>Technical Help</option>
                                    <option>Sales Inquiry</option>
                                    <option>Customer Support</option>
                                </select>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Message"
                                    className="border border-gray-300 rounded px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                                    required
                                ></textarea>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-green-700 text-white rounded px-6 py-2 font-semibold hover:bg-green-800 transition mt-2 w-fit disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Submit'}
                                </button>
                            </form>
                            {formStatus === 'success' && (
                                <p className="text-green-600 mt-2">Message sent successfully!</p>
                            )}
                            {formStatus === 'error' && (
                                <p className="text-red-600 mt-2">Failed to send message. Please try again.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;