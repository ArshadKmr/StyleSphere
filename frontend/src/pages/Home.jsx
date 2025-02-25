import { useState } from "react";
import { Menu, X, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { instance } from "../config/baseUrl";

const Home = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all")

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Submission state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        message: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: '' });

        try {
            // Replace this with your actual API endpoint
            const response = await instance.post('/sendMessage', formData);

            if (response.status===200) {
                setSubmitStatus({
                    success: true,
                    message: 'Thank you! Your message has been sent successfully.'
                });
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setSubmitStatus({
                success: false,
                message: error.message || 'Something went wrong. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* For Navbar */}
            <div className="container mx-auto h-20 flex justify-between items-center shadow-md bg-white rounded-2xl my-4 px-6">
                <div className="flex items-center gap-3">
                    <img src="/images/logo2.jpg" alt="StyleSphere Logo" className="h-16 rounded-full border-2 border-[#479ACE]" />
                    <p className="uppercase font-bold text-2xl text-[#479ACE] tracking-wide font-sans">StyleSphere</p>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden font-sans sm:flex items-center gap-6">
                    <a href="#home" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Home</a>
                    <a href="#products" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Products</a>
                    <a href="#contact" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Contact</a>
                    <a href="#about" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">About</a>
                </nav>

                {/* Mobile Menu Button */}
                <div className="sm:hidden">
                    <button onClick={() => setIsNavOpen(!isNavOpen)}>
                        {isNavOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isNavOpen && (
                    <nav className="absolute font-sans top-20 right-4 w-48 bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 sm:hidden z-50">
                        <a href="#home" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Home</a>
                        <a href="#products" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Products</a>
                        <a href="#contact" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">Contact</a>
                        <a href="#about" className="text-lg font-medium text-[#221F1D] hover:text-[#479ACE] transition-all cursor-pointer">About</a>
                    </nav>
                )}
            </div>

            {/* For Banner */}
            <section id="home" className="font-sans container mx-auto h-dvh px-6 sm:px-20 flex flex-col justify-center items-start bg-gradient-to-br from-[#EAF6FF] to-[#FFFFFF] rounded-3xl shadow-lg overflow-hidden">
                <h1 className="font-bold text-5xl sm:text-[64px] leading-tight sm:leading-[76px] py-5">
                    Your Trusted Partner <br /> In <span className="text-[#479ACE]">Clothing</span>
                </h1>
                <p className="font-light text-lg sm:text-xl text-[#545471] leading-8 sm:leading-9 py-6">
                    Discover stylish and comfortable clothing that fits every occasion. Explore our collection and elevate your wardrobe with high-quality, affordable fashion.
                </p>
                <a href="#products" className="bg-[#479ACE] px-8 py-4 flex items-center gap-2 rounded-full justify-center font-medium text-lg text-white transition-all duration-300 hover:bg-[#357AA5] shadow-lg">
                    Explore <ArrowUpRight />
                </a>
            </section>

            {/* Products Section with Categories */}
            <section id="products" className="container mx-auto min-h-screen px-6 py-16 sm:px-20">
                <h2 className="font-medium text-4xl sm:text-[60px] leading-tight sm:leading-[70px] text-[#479ACE] text-center mb-12">
                    Our Products
                </h2>

                {/* Category Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${activeCategory === 'all'
                            ? 'bg-[#479ACE] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All Products
                    </button>
                    <button
                        onClick={() => setActiveCategory('uniforms')}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${activeCategory === 'uniforms'
                            ? 'bg-[#479ACE] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Uniforms
                    </button>
                    <button
                        onClick={() => setActiveCategory('tshirts')}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${activeCategory === 'tshirts'
                            ? 'bg-[#479ACE] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Printed T-Shirts
                    </button>
                    <button
                        onClick={() => setActiveCategory('caps')}
                        className={`px-6 py-3 rounded-full text-lg font-medium transition-all ${activeCategory === 'caps'
                            ? 'bg-[#479ACE] text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Caps
                    </button>
                </div>

                {/* All Products */}
                {activeCategory === 'all' && (
                    <div>
                        {/* Uniforms Section */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-medium text-[#479ACE] mb-6">Uniforms</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/school-uniform.jpg" alt="School Uniform" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">School Uniform Set</h3>
                                        <p className="text-gray-600 mb-4">Complete set including shirt, pants/skirt, and tie</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$89.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/corporate-uniform.jpg" alt="Corporate Uniform" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Corporate Uniform</h3>
                                        <p className="text-gray-600 mb-4">Professional attire for corporate environments</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$129.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/sports-uniform.jpg" alt="Sport Uniform" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Sports Uniform</h3>
                                        <p className="text-gray-600 mb-4">Comfortable athletic wear for sports activities</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$69.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* T-Shirts Section */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-medium text-[#479ACE] mb-6">Printed T-Shirts</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/t-shirt-1.jpg" alt="Graphic T-Shirt" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Graphic Print T-Shirt</h3>
                                        <p className="text-gray-600 mb-4">100% cotton with custom graphic design</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$24.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/t-shirt-2.jpg" alt="Company Logo T-Shirt" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Company Logo T-Shirt</h3>
                                        <p className="text-gray-600 mb-4">Customizable with your company branding</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$19.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/t-shirt-3.jpg" alt="Event T-Shirt" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Event T-Shirt</h3>
                                        <p className="text-gray-600 mb-4">Perfect for teams, events, and promotions</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$22.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Caps Section */}
                        <div>
                            <h3 className="text-2xl font-medium text-[#479ACE] mb-6">Caps</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/baseball-cap.jpg" alt="Baseball Cap" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Custom Baseball Cap</h3>
                                        <p className="text-gray-600 mb-4">Adjustable cotton cap with embroidered design</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$18.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/sports-team-cap.jpg" alt="Sport Cap" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Sports Team Cap</h3>
                                        <p className="text-gray-600 mb-4">Breathable performance cap for athletic use</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$21.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                                    <div className="h-64 overflow-hidden">
                                        <img src="/images/trucker-cap.jpg" alt="Trucker Cap" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-2">Trucker Cap</h3>
                                        <p className="text-gray-600 mb-4">Mesh-back cap with custom front panel design</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#479ACE] font-bold text-xl">$16.99</span>
                                            <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Uniforms */}
                {activeCategory === 'uniforms' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/school-uniform.jpg" alt="School Uniform" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">School Uniform Set</h3>
                                <p className="text-gray-600 mb-4">Complete set including shirt, pants/skirt, and tie</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$89.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/corporate-uniform.jpg" alt="Corporate Uniform" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Corporate Uniform</h3>
                                <p className="text-gray-600 mb-4">Professional attire for corporate environments</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$129.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/sports-uniform.jpg" alt="Sport Uniform" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Sports Uniform</h3>
                                <p className="text-gray-600 mb-4">Comfortable athletic wear for sports activities</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$69.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* T-Shirts */}
                {activeCategory === 'tshirts' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/t-shirt-1.jpg" alt="Graphic T-Shirt" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Graphic Print T-Shirt</h3>
                                <p className="text-gray-600 mb-4">100% cotton with custom graphic design</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$24.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/t-shirt-2.jpg" alt="Company Logo T-Shirt" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Company Logo T-Shirt</h3>
                                <p className="text-gray-600 mb-4">Customizable with your company branding</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$19.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/t-shirt-3.jpg" alt="Event T-Shirt" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Event T-Shirt</h3>
                                <p className="text-gray-600 mb-4">Perfect for teams, events, and promotions</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$22.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Caps */}
                {activeCategory === 'caps' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/baseball-cap.jpg" alt="Baseball Cap" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Custom Baseball Cap</h3>
                                <p className="text-gray-600 mb-4">Adjustable cotton cap with embroidered design</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$18.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/sports-team-cap.jpg" alt="Sport Cap" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Sports Team Cap</h3>
                                <p className="text-gray-600 mb-4">Breathable performance cap for athletic use</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$21.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                            <div className="h-64 overflow-hidden">
                                <img src="/images/trucker-cap.jpg" alt="Trucker Cap" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">Trucker Cap</h3>
                                <p className="text-gray-600 mb-4">Mesh-back cap with custom front panel design</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-[#479ACE] font-bold text-xl">$16.99</span>
                                    <button className="bg-[#479ACE] text-white px-4 py-2 rounded-lg hover:bg-[#357AA5] transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* About Section */}
            <section id="about" className="container mx-auto px-6 py-16 sm:px-20 bg-gray-50 rounded-3xl my-10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-medium text-4xl sm:text-[60px] leading-tight sm:leading-[70px] text-[#479ACE] text-center mb-12">
                        About StyleSphere
                    </h2>

                    <div className="flex flex-col md:flex-row gap-10 items-center">
                        <div className="w-full md:w-1/2 rounded-xl overflow-hidden">
                            <img src="https://picsum.photos/400/400" alt="StyleSphere Team" className="w-full h-auto" />
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                StyleSphere was founded in 2010 with a simple mission: to provide high-quality, customizable clothing solutions for businesses, schools, and organizations of all sizes.
                            </p>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Our team of experienced designers and production specialists work closely with each client to create clothing that perfectly represents their brand identity and meets their specific needs.
                            </p>

                            <p className="text-lg text-gray-700 leading-relaxed">
                                We pride ourselves on using premium materials, ethical manufacturing processes, and delivering exceptional customer service from the initial design consultation to final delivery.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section with Form */}
            <section id="contact" className="py-20 text-center bg-[#479ACE] text-white">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold mb-8">Contact Us</h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info Cards */}
                        <div className="grid grid-cols-1  gap-6 text-[#479ACE]">
                            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                                <Mail size={32} className="mx-auto mb-4" />
                                <h4 className="text-xl font-medium mb-2">Email</h4>
                                <a href="mailto:contact@stylesphere.com" className="underline hover:text-blue-100 transition-all">
                                    contact@stylesphere.com
                                </a>
                            </div>

                            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                                <Phone size={32} className="mx-auto mb-4" />
                                <h4 className="text-xl font-medium mb-2">Phone</h4>
                                <p>+123 456 7890</p>
                            </div>

                            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
                                <MapPin size={32} className="mx-auto mb-4" />
                                <h4 className="text-xl font-medium mb-2">Location</h4>
                                <p>123 Fashion Avenue,<br />City, Country</p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white bg-opacity-10 p-8 rounded-xl text-left text-[#479ACE]">
                            <h4 className="text-2xl font-medium mb-6 text-center underline">Send us a message</h4>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white border bg-opacity-20 focus:bg-opacity-30 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-white border bg-opacity-20 focus:bg-opacity-30 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white border bg-opacity-20 focus:bg-opacity-30 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-white border bg-opacity-20 focus:bg-opacity-30 focus:outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-3 bg-[#479ACE] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>

                                {submitStatus.message && (
                                    <div className={`text-center text-white p-3 rounded-lg ${submitStatus.success ? 'bg-green-500' : 'bg-red-500'} bg-opacity-25`}>
                                        {submitStatus.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 mb-6 md:mb-0">
                            <img src="/images/logo2.jpg" alt="StyleSphere Logo" className="h-12 rounded-full border-2 border-[#479ACE]" />
                            <p className="uppercase font-bold text-xl text-[#479ACE] tracking-wide font-sans">StyleSphere</p>
                        </div>

                        <div className="flex gap-6 mb-6 md:mb-0">
                            <a href="#home" className="text-gray-300 hover:text-[#479ACE] transition-all">Home</a>
                            <a href="#products" className="text-gray-300 hover:text-[#479ACE] transition-all">Products</a>
                            <a href="#contact" className="text-gray-300 hover:text-[#479ACE] transition-all">Contact</a>
                            <a href="#about" className="text-gray-300 hover:text-[#479ACE] transition-all">About</a>
                        </div>

                        <div className="flex gap-4">
                            <a href="#" className="text-gray-300 hover:text-[#479ACE] transition-all">
                                {/* <Facebook size={24} /> */}
                                Facebook
                            </a>
                            <a href="#" className="text-gray-300 hover:text-[#479ACE] transition-all">
                                {/* <Instagram size={24} /> */}
                                Instagram
                            </a>
                            <a href="#" className="text-gray-300 hover:text-[#479ACE] transition-all">
                                {/* <Twitter size={24} /> */}
                                Twitter
                            </a>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500">
                        <p>&copy; 2024 StyleSphere. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Home