import { Modal } from "@mantine/core";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

export default function OrderModal({ opened, setOpened, paymentMethod }) {

  const total = typeof window !== 'undefined' && localStorage.getItem("total");
  const [formData, setFormData] = useState({})

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(null)}>
        {/* Modal content */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input className="w-[100%] outline-none p-[.8rem] border-2 border-solid border-gray-300 rounded-md resize-none" onChange={handleInput} type="text" name="name" required placeholder="Name" />
          <input className="w-[100%] outline-none p-[.8rem] border-2 border-solid border-gray-300 rounded-md resize-none" onChange={handleInput} type="text" name="phone" required placeholder="Phone Number" />
          <textarea className="w-[100%] outline-none p-[.8rem] border-2 border-solid border-gray-300 rounded-md resize-none" onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>

          <span>
            You will pay <span className="font-bold text-red-500 text-xl">${total}</span> on delivery
          </span>

          <button className="p-[0.9rem] text-[1rem] bg-green-600 rounded-lg" type="submit">Place Order</button>
        </form>
        <Toaster />
      </Modal>
    </>
  );
}
