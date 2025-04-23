export default function BttnSignIn() {
  const handleGoogleOnClick = () => {
  const width = 500, height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  window.open(
    "http://localhost:3000/api/auth/google?prompt=select_account",
    "_blank",
    `width=${width},height=${height},top=${top},left=${left}`
  );
};

  return (
    <div className="flex space-x-2">
      <button
        type="button"
        className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600"
        onClick={handleGoogleOnClick}
      >
        Google
      </button>
      <button
        type="button"
        className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-700"
      >
        Facebook
      </button>
      <button
        type="button"
        className="bg-blue-800 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-900"
      >
        LinkedIn
      </button>
    </div>
  );
}
