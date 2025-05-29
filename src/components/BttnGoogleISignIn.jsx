import React from "react";
const handleGoogleOnClick = () => {
  window.location.href = "http://localhost:3000/api/auth/google";
};
export default function BttnGoogleISignIn() {
  return (
    <div className="">
      <div
        class="flex items-center justify-center"
        onClick={handleGoogleOnClick}
      >
        <button class="px-4 py-2 border flex gap-2 border-slate-500 rounded-lg text-slate-700 hover:border-slate-700 hover:text-slate-900 hover:shadow transition duration-150 w-50">
          <img
            class="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
