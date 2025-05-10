import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const ItemModel: React.FC<ModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white"
      >
        <div className="relative flex flex-col">
          <div className="m-2.5 flex justify-center items-center h-24 rounded-md bg-slate-800 text-white">
            <h3 className="text-2xl">Sign In</h3>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div>
              <label className="block mb-2 text-sm text-slate-600">Email</label>
              <input
                type="email"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder:text-slate-400 text-slate-700 shadow-sm focus:outline-none focus:border-slate-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-slate-600">Password</label>
              <input
                type="password"
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder:text-slate-400 text-slate-700 shadow-sm focus:outline-none focus:border-slate-400"
                placeholder="Your Password"
              />
            </div>
            <div className="inline-flex items-center mt-2">
              <label className="flex items-center cursor-pointer relative" htmlFor="remember">
                <input
                  type="checkbox"
                  id="remember"
                  className="peer h-5 w-5 appearance-none border border-slate-300 rounded checked:bg-slate-800"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  ✓
                </span>
              </label>
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">Remember Me</label>
            </div>
          </div>
          <div className="p-6 pt-0">
            <button className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-700 text-sm">
              Sign In
            </button>
            <p className="flex justify-center mt-6 text-sm text-slate-600">
              Don’t have an account?
              <a href="#signup" className="ml-1 font-semibold text-slate-700 underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModel;
