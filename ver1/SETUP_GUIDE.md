# Hướng Dẫn Cài Đặt Website Bảo Tàng AI

## Yêu Cầu Hệ Thống

- **Visual Studio Code** (đã có sẵn)
- **Live Server Extension** cho VS Code
- **Trình duyệt web** hiện đại (Chrome, Firefox, Edge, Safari)

## Cách Cài Đặt

### Bước 1: Cài đặt Live Server Extension

1. Mở Visual Studio Code
2. Nhấn `Ctrl + Shift + X` (Windows/Linux) hoặc `Cmd + Shift + X` (Mac) để mở Extensions
3. Tìm kiếm "Live Server"
4. Cài đặt extension "Live Server" của Ritwick Dey
5. Khởi động lại VS Code

### Bước 2: Tải và Giải Nén Website

1. Tải file ZIP của website về máy
2. Giải nén vào thư mục bạn muốn
3. Mở VS Code và chọn "Open Folder"
4. Chọn thư mục chứa website vừa giải nén

### Bước 3: Chạy Website

1. Trong VS Code, mở file `index.html`
2. Nhấp chuột phải vào file `index.html`
3. Chọn "Open with Live Server"
4. Website sẽ tự động mở trong trình duyệt tại địa chỉ `http://127.0.0.1:5500`

## Cấu Trúc Thư Mục

\`\`\`
ai-museum-website/
├── index.html          # Trang chính
├── styles.css          # File CSS styling
├── script.js           # File JavaScript chức năng
├── SETUP_GUIDE.md      # Hướng dẫn này
└── README.md           # Thông tin về dự án
\`\`\`

## Tính Năng Chính

### 🏛️ **Bảo Tàng Ảo**
- Trang chủ với banner AI art
- 6 khu vực triển lãm khác nhau
- Giao diện responsive trên mọi thiết bị

### 🎨 **Khu Vực Triển Lãm**
- Bộ sưu tập tranh AI theo chủ đề
- Bộ lọc theo: Nhân vật, Sự kiện, Biểu tượng
- Modal xem chi tiết với thuyết minh

### 🎬 **Phòng Chiếu**
- Video tái hiện Cách mạng Tháng Tám
- Giao diện video player tùy chỉnh
- Tính năng phụ đề và chia sẻ

### 🎵 **Phòng Âm Thanh**
- 3 bộ sưu tập audio:
  - Tuyên ngôn Độc lập
  - Lời kêu gọi khởi nghĩa  
  - Nhạc cách mạng
- Audio player với thời lượng

### 📊 **Timeline Tương Tác**
- Dòng thời gian các sự kiện 1945
- Bản đồ khởi nghĩa có thể click
- Hiệu ứng animation mượt mà

### 📚 **Thư Viện Tư Liệu**
- So sánh ảnh thật vs tranh AI
- Tài liệu lịch sử quý giá
- Giao diện thư viện hiện đại

### 🎯 **Tính Năng Tương Tác**
- **Quiz kiến thức lịch sử** - Trắc nghiệm sau khi xem tranh
- **Thuyết minh tự động** - AI voice đọc chú thích
- **Chia sẻ mạng xã hội** - Share từng tác phẩm
- **Dark/Light mode** - Chuyển đổi giao diện
- **Song ngữ Việt-Anh** - Hỗ trợ đa ngôn ngữ

## Tùy Chỉnh Nội Dung

### Thêm Tranh Mới
Mở file `script.js`, tìm mảng `artworks` và thêm object mới:

\`\`\`javascript
{
    id: 7,
    title: "Tên tranh mới",
    description: "Mô tả tranh",
    category: "characters", // hoặc "events", "symbols"
    image: "/placeholder.svg?height=300&width=400",
    narration: "Nội dung thuyết minh..."
}
\`\`\`

### Thêm Sự Kiện Timeline
Trong file `script.js`, tìm mảng `timelineEvents`:

\`\`\`javascript
{
    date: "Ngày/Tháng/Năm",
    title: "Tên sự kiện",
    description: "Mô tả chi tiết"
}
\`\`\`

### Thêm Câu Hỏi Quiz
Trong mảng `quizQuestions`:

\`\`\`javascript
{
    question: "Câu hỏi của bạn?",
    options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
    correct: 2 // Index của đáp án đúng (bắt đầu từ 0)
}
\`\`\`

## Nâng Cấp Tính Năng

### Thêm Audio Thật
1. Tạo thư mục `audio/` trong project
2. Thêm file MP3 vào thư mục
3. Sửa hàm `playAudio()` trong `script.js`:

\`\`\`javascript
function playAudio(audioType, button) {
    const audioFiles = {
        independence: 'audio/tuyen-ngon-doc-lap.mp3',
        uprising: 'audio/loi-keu-goi.mp3',
        music: 'audio/nhac-cach-mang.mp3'
    };
    
    const audio = new Audio(audioFiles[audioType]);
    audio.play();
}
\`\`\`

### Thêm Video Thật
1. Tạo thư mục `videos/`
2. Thêm file MP4
3. Thay thế `<img>` bằng `<video>` trong HTML

### Kết Nối Database
Để lưu trữ dữ liệu động, bạn có thể:
1. Sử dụng Firebase (miễn phí)
2. Tạo API với Node.js + MongoDB
3. Sử dụng Supabase (miễn phí)

## Triển Khai Website

### GitHub Pages (Miễn Phí)
1. Tạo repository trên GitHub
2. Upload code lên repository
3. Vào Settings > Pages
4. Chọn source branch
5. Website sẽ có địa chỉ: `https://username.github.io/repository-name`

### Netlify (Miễn Phí)
1. Đăng ký tài khoản Netlify
2. Kéo thả thư mục website vào Netlify
3. Website sẽ được deploy tự động

### Vercel (Miễn Phí)
1. Đăng ký Vercel
2. Connect với GitHub repository
3. Auto-deploy khi có thay đổi

## Khắc Phục Sự Cố

### Website không hiển thị đúng
- Kiểm tra Live Server đã chạy chưa
- Đảm bảo tất cả file trong cùng thư mục
- Kiểm tra Console trong Developer Tools (F12)

### Hình ảnh không hiển thị
- Placeholder images sẽ tự động tạo
- Để thêm ảnh thật, đặt trong thư mục `images/`
- Cập nhật đường dẫn trong `script.js`

### JavaScript không hoạt động
- Kiểm tra file `script.js` có lỗi syntax không
- Mở Developer Tools (F12) xem lỗi trong Console
- Đảm bảo file được load đúng thứ tự

## Hỗ Trợ

Nếu gặp vấn đề, bạn có thể:
1. Kiểm tra file `SETUP_GUIDE.md` này
2. Xem Console trong Developer Tools (F12)
3. Tìm kiếm lỗi trên Google/Stack Overflow
4. Hỏi trên các forum lập trình Việt Nam

## Kết Luận

Website Bảo tàng AI này được thiết kế để chạy hoàn toàn trên trình duyệt mà không cần server. Bạn có thể dễ dàng tùy chỉnh nội dung, thêm tính năng mới, và triển khai lên internet miễn phí.

Chúc bạn thành công với dự án! 🎉
