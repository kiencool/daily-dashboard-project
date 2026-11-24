# DeskDash — Smart Desk Dashboard (Android & Web)

Ứng dụng **Smart Display** tối ưu cho điện thoại **OPPO A95** (màn hình AMOLED 20:9, đặt bàn 24/7) và hỗ trợ chạy dạng **PWA trên iOS/Web**.

---

## Tính năng chính

- **Trang chủ (StandBy View)**:
  - Đồng hồ số cỡ lớn, lịch tháng nền trắng tương tác (chạm ngày để xem/thêm nhanh Gym, Chi tiêu, Công việc; chấm xanh lá = có tập Gym, chấm cam = có việc/ghi chú).
  - Thời tiết **TP. Hồ Chí Minh** trực tiếp (Open-Meteo, không cần API key).
  - **Đồng hồ Pomodoro** tùy chỉnh thời gian (`15p`, `25p`, `45p`, `60p` hoặc tự nhập) + **Âm thanh mưa nền** (Web Audio API).
  - **Bản tin giọng nói** tóm tắt nhanh thời tiết, công việc, bài tập và từ vựng.
  - **Widget học JLPT N4**: Lọc theo Bài (*Minna no Nihongo* 26–36) hoặc Chủ đề, phát âm tiếng Nhật (`ja-JP`), và **Mini Quiz 4 đáp án**.
- **Đầu tư**:
  - Theo dõi cổ phiếu (`HPG`, `FPT`, tùy chỉnh thêm mã), Crypto (`BTC`, `ETH`), tỷ giá `USD/VND` và **Giá vàng Phú Hào (`phuhao2.com`)** qua cầu nối Android.
- **Gym & Biểu đồ**:
  - Ghi nhanh bài tập theo **Nhóm cơ**, **Số sets**, **Số reps**, **Mức tạ (kg)** hoặc **Thời gian (phút)** cho *Cardio / Toàn thân*.
  - Biểu đồ theo dõi **Cân nặng (kg)** và **Tần suất tập 14 ngày**.
- **Chi tiêu & Công việc**:
  - Quản lý thu/chi, vòng tròn tiến độ ngân sách tháng ngay tại trang Chi tiêu.
  - Danh sách việc cần làm & ghi chú theo từng ngày, hỗ trợ **Xuất / Nhập JSON**.
- **Trợ lý AI (Chat & Giọng nói 2 chiều)**:
  - Hỗ trợ **Gemini** và **Groq** API Key (người dùng tự nhập key miễn phí trong Cài đặt), nói tiếng Việt bằng Micro và đọc trả lời bằng loa.
- **Tiết kiệm pin thông minh**:
  - Sau **1 phút** không thao tác và **không có tác vụ nào đang chạy** (Pomodoro, tiếng mưa, cửa sổ pop-up), tự chuyển sang **Mặt đồng hồ OLED `#000000`** và hạ độ sáng phần cứng xuống `3%` (có nút bật/tắt chế độ này ngay trên thanh công cụ).

---

## Cấu trúc thư mục

```text
oppo-dashboard-android/
├── app/
│   ├── build.gradle.kts
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── assets/dashboard/      # Giao diện WebView (index.html, styles.css, app.js)
│       ├── java/com/oppodesk/dashboard/
│       │   └── MainActivity.kt    # WebView, Bridge giá vàng, Độ sáng, Giọng nói & TTS
│       └── res/                   # Adaptive Icon Bento & Theme tràn viền
├── build.gradle.kts
├── gradle.properties
└── settings.gradle.kts
```

---

## Hướng dẫn Build bằng Android Studio

1. Mở **Android Studio** → **File → Open...** → chọn thư mục `oppo-dashboard-android`.
2. Đợi Gradle Sync hoàn tất (project tự tạo `local.properties` hoặc trỏ tới Android SDK của máy).
3. Chạy thử lên thiết bị: bật **Gỡ lỗi USB** trên OPPO → bấm **Run (▶)**.
4. Xuất file `.apk` cài đặt:
   - **Build → Build Bundle(s) / APK(s) → Build APK(s)** (hoặc **Generate Signed Bundle / APK → APK → release**).

---

## Mẹo thiết lập trên OPPO (ColorOS) chạy 24/7

1. **Khóa app trong Đa nhiệm**: Mở màn hình Đa nhiệm → bấm `⋮` trên thẻ **DeskDash** → **Khóa (Lock)**.
2. **Tắt tối ưu pin**: Nhấn giữ icon app → **Thông tin ứng dụng → Mức sử dụng pin** → bật **Cho phép hoạt động nền** & **Không tối ưu hóa**.
3. **Tràn viền camera nốt ruồi**: *Cài đặt → Màn hình & độ sáng → Hiển thị camera trước* → chọn **Hiển thị camera trước / Toàn màn hình** cho DeskDash.
