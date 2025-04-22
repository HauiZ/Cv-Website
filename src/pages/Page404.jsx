export default function SimplePenguin404() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Sử dụng placeholder cho mục đích minh họa - trong thực tế sẽ thay bằng hình ảnh chim cánh cụt */}
          <img src="/src/assets/image/logoNoBg.png" alt="Penguin with briefcase" className="w-60" />
          
          <h1 className="text-8xl font-bold text-green-500">404</h1>
        </div>
        
        <p className="text-2xl text-gray-800 font-medium mb-8">Trang bạn đang tìm đã đi lạc mất rồi.</p>
        
        <button className="px-6 py-3 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-colors" onClick={() => window.location.href = '/'}>
          Quay về Trang chủ
        </button>
      </div>
    </div>
  );
}