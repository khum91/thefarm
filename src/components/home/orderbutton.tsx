"use client"
import Swal from 'sweetalert2';
export default function Order() {
    const notification = () => {
        Swal.fire({
            title: "Order Now",
            text: "To order, Please feel free to contact us on the number mentioned in the 'Contact Us' section."
        });
    }
    return <button onClick={notification} className="w-full px-4 py-2 my-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Order Now
    </button>
}
