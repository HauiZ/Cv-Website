function Toast({ message, type = "success" }) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`fixed top-4 right-4 p-3 rounded text-white shadow-lg z-50 ${bgColor}`}>
      {message}
    </div>
  );
}

export default Toast;
