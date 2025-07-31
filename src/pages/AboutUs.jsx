import React, { useEffect, useState } from 'react';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Simulated API endpoint URL
    const apiUrl = '/api/aboutus';

    useEffect(() => {
        // Simulate fetching data from API
        const fetchData = async () => {
            try {
                // For demonstration, using a timeout to simulate API call
                // Replace this with actual fetch(apiUrl) in real use
                const response = await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve({
                            json: () =>
                                Promise.resolve({
                                    header: 'S-ONE All in one Corporate Gifting Solution',
                                    sections: [
                                        {
                                            id: 1,
                                            title: 'Top quality products in your budget.',
                                            text: 'Sirmiti, launched in 2019 was an answer to the problems with quality gifting options. Sirmiti has now become the well established corporate gifting partner for many organizations. We have indulged ourselves in it for over ten years now. At Sirmiti, we have a wide selection of Corporate Gift Items for you to pick from. Whether it is Diwali or Christmas, Sirmiti fits in all the corporate events and exhibitions. Then, we prepare the very reasonable rates for all our corporate gifts. We have many utility product categories like pen drive, power banks, metal ball point pens calculators and more... we also cater in the field of gifting solutions where you will gift souvenirs for your office or corporate event which are not only beautifully crafted but complemented by master specialists.',
                                            imageUrl:
                                                'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
                                        },
                                        {
                                            id: 2,
                                            title: 'Service is Our Top Priority',
                                            text: 'Nowadays, the first thing we want is a Brand Image. At Sirmiti, we not just provide quality products but also what makes us different from others is the customization that we offer for our customers. The feature of branding on the products by mentioning the name and logo helps to showcase a strong brand image of the company. It pull the people in order to company business and it able to accomplish their long-term plans of targeted corporation. We serve the customized corporate gifts as a means to increase goodwill of their company and good relationship among different stakeholders like — Employees, Existing Customers, Prospective customers (Key accounts) & Suppliers etc.',
                                            imageUrl:
                                                'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                                        },
                                    ],
                                }),
                        });
                    }, 1000)
                );

                const data = await response.json();
                setAboutData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch about us data.');
                setLoading(false);
            }
        };

        fetchData();
    }, [apiUrl]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
            <h1 className="text-white bg-green-800 text-center text-xl md:text-2xl font-semibold py-4 rounded">
                {aboutData.header}
            </h1>

            {aboutData.sections.map((section, index) => (
                <div
                    key={section.id}
                    className={`flex flex-col md:flex-row items-center md:items-center md:space-x-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                        }`}
                >
                    <img
                        src={section.imageUrl}
                        alt={section.title}
                        className="w-full md:w-1/2 rounded-lg object-cover shadow-lg"
                    />
                    <div className="w-full md:w-1/2 mt-6 md:mt-0 md:mr-16">
                        <h2 className="text-blue-900 font-semibold text-lg mb-2">{section.title}</h2>
                        <p className="text-gray-700 text-sm md:text-base text-justify">{section.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AboutUs;
