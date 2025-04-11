export default function BttnSignIn() {
  return (
    <>
        <div className="flex space-x-2">
          <button className="bg-red-500 px-4 py-2 rounded-lg text-white font-bold hover:bg-red-600">Google</button>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-700">Facebook</button>
          <button className="bg-blue-800 px-4 py-2 rounded-lg text-white font-bold hover:bg-blue-900">LinkedIn</button>
        </div>
    </>
  );
}
