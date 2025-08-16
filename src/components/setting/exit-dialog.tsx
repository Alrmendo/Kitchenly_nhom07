export default function ExitDialog() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#fffdf9" }}>
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full mx-4">
        <h1 className="text-2xl font-semibold text-center mb-4" style={{ color: "#fd5d69" }}>
          Thoát ứng dụng
        </h1>

        <p className="text-center mb-8" style={{ color: "#3e2823" }}>
          Bạn có chắc muốn đăng xuất không?
        </p>

        <div className="flex gap-4">
          <button
            className="flex-1 py-3 px-6 rounded-full border-2 font-medium"
            style={{
              borderColor: "#ffc6c9",
              color: "#fd5d69",
              backgroundColor: "transparent",
            }}
          >
            Thoát
          </button>

          <button
            className="flex-1 py-3 px-6 rounded-full font-medium text-white"
            style={{ backgroundColor: "#ffc6c9" }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  )
}
