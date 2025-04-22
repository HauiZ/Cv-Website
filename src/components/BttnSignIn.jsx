export default function BttnSignIn() {
  const handleGoogleOnClick = () => {
    window.location.href = 'http://localhost:3000/api/auth/google'; };
  return (
    <>
        <div className="flex space-x-2">
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600" onClick={handleGoogleOnClick}>Google</button>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-700">Facebook</button>
          <button className="bg-blue-800 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-900">LinkedIn</button>
        </div>
    </>
  );
}
