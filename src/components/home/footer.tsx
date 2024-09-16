export default function FooterC() {
    return (
        <div className="bg-gray-200 py-2 text-center">
            <div className="container mx-auto flex flex-col md:flex-row justify-between px-4">
                <div id="about" className="mb-6 md:mb-0 w-1/2">
                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                    <p className="text-justify">Welcome to our Farm, where we provide healthy goat straight from our farm to you. Our mission is to provide exceptional goat products while fostering a deep respect for nature and animal welfare. Established in 2080 B.S., our farm began with a passion for sustainable agriculture and a love for goats. We pride ourselves on maintaining a serene environment where our goats are free to roam and graze in open pastures. Our dedication to quality is reflected in our commitment to using organic feed and humane practices. Each member of our team brings a wealth of knowledge and dedication, ensuring that our goats receive the best care possible. Whether you're enjoying our healthy alive goat or minced meat of various part, you can trust that our products are crafted with care and integrity, rooted in our belief that great food starts with happy, healthy animals.</p>
                </div>
                <div id="contact" className="mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p>Address: 123 Farm Lane, Gandaki Province, Kaski, 3800</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@demofarm.com</p>
                </div>
                <div className="mb-6 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <a href="https://facebook.com/khbdch" target="_blank" className="block text-blue-600 hover:underline mb-1">Facebook</a>
                    <a href="https://x.com/farmname" target="_blank" className="block text-black hover:underline mb-1"> x.com!</a>
                    <a href="https://instagram.com/farmname" target="_blank" className="block text-pink-600 hover:underline">Instagram</a>
                </div>
            </div>
            <div className="bg-gray-300 py-3 mt-8">
                <p>&copy; 2024 Khum B. Chhetri. All rights reserved.</p>
            </div>
        </div>
    );
}
