let history = [];
let players = [];

// Danh sách các tộc và hệ
const items = [
    "Học Viện",
    "Cỗ Máy Tự Động",
    "Hoa Hồng Đen",
    "Hóa Chủ",
    "Sứ Giả",
    "Nổi Loạn",
    "Phục Kích",
    "Pháo Binh",
    "Bắn Tỉa",
    "Phù Thủy",
    "Tiên Tri",
    "Giám Sát",
    "Tái Chế",
    "Gia Đình",
    "Chinh Phục",
    "Võ Sĩ Lồng Sắt",
    "Cảnh Binh",
    "Đấu Sĩ",
    "Vệ Binh",
    "Thí Nghiệm",
    "Cực Tốc",
    "Ánh Lửa",
    "Thống Trị",
    "Song Hình",
    "Gia Đình và Võ Sĩ Lồng Sắt",
    "Sứ Giả và Phù Thủy",
    "Song Hình và Võ Sĩ Lồng Sắt",
    "Vệ Binh và Cực Tốc",
  	"Gia Đình và Giám Sát", 
  	"Vệ Binh và Pháo Binh", 
  	"Sứ Giả và Pháo Binh", 
  	"Hoa Hồng Đen và Thống Trị", 
  	"Hoa Hồng Đen và Tiên Tri", 
  	"Phục Kích và Hóa Chủ", 
  	"Vệ Binh và Tiên Tri", 
  	"Chinh Phục và Sứ Giả", 
  	"Cảnh Binh và Bắn Tỉa", 
  	"Thí Nghiệm và Võ Sĩ Lồng Sắt", 
  	"Tái Chế và Phục Kích", 
  	"Ánh Lửa và Sứ Giả", 
  	"Ánh Lửa và Giám Sát", 
  	"Ánh Lửa và Phục Kích", 
  	"Cỗ Máy Tự Động và Cực Tốc", 
  	"Cỗ Máy Tự Động và Tiên Tri", 
  	"Cỗ Máy Tự Động và Bắn Tỉa", 
  	"Cỗ Máy Tự Động và Thống Trị", 
  	"Thí Nghiệm và Bắn Tỉa", 
  	"Cảnh Binh và Phục Kích", 
  	"Tiên Tri và Phù Thủy", 
  	"Đấu Sĩ và Song Hình", 
  	"Đấu Sĩ và Giám Sát", 
  	"Vệ Binh và Cảnh Binh", 
  	"Tái Chế và Song Hình", 
  	"Nổi Loạn và Cực Tốc", 
  	"Nổi Loạn và Sứ Giả", 
  	"Nổi Loạn và Vệ Binh", 
  	"Nổi Loạn và Pháo Binh", 
  	"Nổi Loạn và Phục Kích", 
  	"Nổi Loạn và Phù Thủy"
];

document.getElementById('spinButton').addEventListener('click', spinWheel);
document.getElementById('playerTable').addEventListener('input', updateTopPlayers);

// Tải điểm số từ Local Storage khi trang được tải
window.onload = function() {
    loadScores();
};

// Hàm quay vòng
function spinWheel() {
   // Kiểm tra nếu tất cả các mục đã được quay
   if (history.length >= items.length) {
       alert("Tất cả các kết quả đã được quay!");
       return;
   }

   let result;
   
   // Chọn ngẫu nhiên từ danh sách cho đến khi tìm thấy một item chưa có trong lịch sử
   do {
       const randomIndex = Math.floor(Math.random() * items.length); // Chọn ngẫu nhiên từ danh sách
       result = items[randomIndex]; // Kết quả quay từ danh sách
       
       // Kiểm tra xem kết quả đã có trong lịch sử chưa
       if (history.includes(result)) {
           result = null; // Nếu đã có, đặt lại kết quả
       }
       
       // Kiểm tra nếu kết quả là một item đã xuất hiện trong lịch sử
       const parts = result.split(" và "); // Tách thành phần nếu có nhiều hơn 1 item
       if (parts.some(part => history.includes(part))) {
           result = null; // Nếu bất kỳ phần nào đã có trong lịch sử, đặt lại kết quả
       }
       
   } while (!result); // Tiếp tục cho đến khi tìm thấy một kết quả hợp lệ

   history.push(result);
   
   document.getElementById('result').innerText = `Kết quả quay: ${result}`;
   
   updateHistory();
}

// Hàm tải điểm số từ Local Storage
function loadScores() {
    const rows = document.querySelectorAll('#playerTable tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[0].innerText; // Tên người chơi
        const savedScore = localStorage.getItem(name); // Lấy điểm số từ Local Storage

        if (savedScore !== null) {
            row.cells[1].innerText = savedScore; // Cập nhật điểm số vào bảng
        }
        
        // Cập nhật sự kiện nhập liệu cho ô điểm số
        row.cells[1].addEventListener('input', function() {
            const score = parseInt(row.cells[1].innerText) || 0; // Lấy điểm số nhập vào
            localStorage.setItem(name, score); // Lưu điểm số vào Local Storage
            updateTopPlayers(); // Cập nhật bảng xếp hạng
        });
    });
}

function updateTopPlayers() {
   const topPlayersList = document.getElementById('topPlayers');
   
   // Xóa danh sách cũ
   topPlayersList.innerHTML = '';
   
   // Lấy tên người chơi và điểm từ bảng
   const rows = document.querySelectorAll('#playerTable tbody tr');
   
   players = []; // Reset danh sách người chơi

   rows.forEach(row => {
       const name = row.cells[0].innerText; // Tên người chơi
       const score = parseInt(row.cells[1].innerText); // Điểm số

       if (!isNaN(score)) {
           players.push({ name, score });
       }
   });

   // Sắp xếp người chơi theo điểm
   players.sort((a, b) => b.score - a.score);
   
   let rank = 1;
   
   for (let i = 0; i < players.length; i++) {
       const player = players[i];
       
       // Kiểm tra đồng hạng
       if (i > 0 && player.score === players[i - 1].score) {
           continue; // Nếu điểm bằng nhau thì không tăng hạng
       }
       
       const li = document.createElement('li');
       li.textContent = `Hạng ${rank}: ${player.name} - ${player.score} điểm`;
       topPlayersList.appendChild(li);
       
       rank++;
       
       if (rank > 6) break; // Giới hạn chỉ hiển thị top 6
   }
}

function updateHistory() {
   const historyList = document.getElementById('history');
   historyList.innerHTML = '';
   
   history.forEach((result, index) => {
       const li = document.createElement('li');
       li.textContent = `Lần quay ${index + 1}: ${result}`;
       historyList.appendChild(li);
   });
}