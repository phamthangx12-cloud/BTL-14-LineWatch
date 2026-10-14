
// Lấy các phần tử cần sử dụng
const form = document.getElementById("form-su-co");
const thoiDiem = document.getElementById("thoi-diem");
const moTa = document.getElementById("mo-ta");
const mucAnhHuong = document.getElementById("muc-anh-huong");
const tepAnh = document.getElementById("tep-anh");

const thongBaoForm = document.getElementById("thong-bao-form");
const tenTep = document.getElementById("ten-tep");

// Hiển thị ngày hiện tại trên thanh đầu trang
const ngayHienTai = document.getElementById("ngay-hien-tai");

ngayHienTai.textContent = new Date().toLocaleDateString("vi-VN");

// Tự điền thời điểm hiện tại
function layThoiGianHienTai() {
    const ngay = new Date();
    ngay.setMinutes(ngay.getMinutes() - ngay.getTimezoneOffset());

    return ngay.toISOString().slice(0, 16);
}

thoiDiem.value = layThoiGianHienTai();

// Chọn mức ảnh hưởng
const cacNutMuc = document.querySelectorAll(".muc");

cacNutMuc.forEach(function(nut) {
    nut.addEventListener("click", function() {
        cacNutMuc.forEach(function(n) {
            n.classList.remove("anh-huong");
        });

        nut.classList.add("anh-huong");
        mucAnhHuong.value = nut.dataset.muc;
    });
});

// Kiểm tra ảnh được chọn
tepAnh.addEventListener("change", function() {
    const cacTep = Array.from(tepAnh.files);

    if (cacTep.length > 3) {
        alert("Bạn chỉ được chọn tối đa 3 ảnh.");
        tepAnh.value = "";
        tenTep.textContent = "Kéo tệp vào đây hoặc chọn ảnh";
        return;
    }

    const tepKhongHopLe = cacTep.some(function(tep) {
        return !["image/png", "image/jpeg"].includes(tep.type);
    });

    if (tepKhongHopLe) {
        alert("Vui lòng chọn ảnh PNG hoặc JPG.");
        tepAnh.value = "";
        tenTep.textContent = "Kéo tệp vào đây hoặc chọn ảnh";
        return;
    }

    if (cacTep.length > 0) {
        tenTep.textContent = cacTep.map(function(tep) {
            return tep.name;
        }).join(", ");
    } else {
        tenTep.textContent = "Kéo tệp vào đây hoặc chọn ảnh";
    }
});

// Lưu nháp trên trình duyệt
document.getElementById("nut-luu").addEventListener("click", function() {
    const duLieu = {
        dayChuyen: document.getElementById("day-chuyen").value,
        may: document.getElementById("may").value,
        thoiDiem: thoiDiem.value,
        moTa: moTa.value,
        mucAnhHuong: mucAnhHuong.value
    };

    localStorage.setItem("nhapSuCo", JSON.stringify(duLieu));

    thongBaoForm.textContent = "Đã lưu nháp trên trình duyệt.";
});

// Khôi phục bản nháp đã lưu
const banNhap = localStorage.getItem("nhapSuCo");

if (banNhap) {
    const duLieu = JSON.parse(banNhap);

    document.getElementById("day-chuyen").value = duLieu.dayChuyen;
    document.getElementById("may").value = duLieu.may;
    thoiDiem.value = duLieu.thoiDiem;
    moTa.value = duLieu.moTa;
    mucAnhHuong.value = duLieu.mucAnhHuong;

    cacNutMuc.forEach(function(nut) {
        nut.classList.toggle(
            "anh-huong",
            nut.dataset.muc === duLieu.mucAnhHuong
        );
    });
}

// Gửi báo cáo sự cố
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const noiDung = moTa.value.trim();

    if (noiDung === "") {
        thongBaoForm.textContent = "Vui lòng nhập mô tả sự cố.";
        moTa.focus();
        return;
    }

    alert(
        "Báo cáo đã được kiểm tra!\n" +
        "Dây chuyền: " + document.getElementById("day-chuyen").value +
        "\nMáy: " + document.getElementById("may").value +
        "\nMức ảnh hưởng: " + mucAnhHuong.value +
        "\n\nĐây là bản demo, dữ liệu chưa được gửi lên máy chủ."
    );

    thongBaoForm.textContent =
        "Đã hoàn thành thao tác demo gửi báo cáo.";
});

// Các nút thao tác với gợi ý AI
const thongBaoAI = document.getElementById("thong-bao-ai");

document.getElementById("chap-nhan").addEventListener("click", function() {
    thongBaoAI.textContent =
        "Bạn đã chấp nhận gợi ý phân loại: Lỗi cơ khí.";
});

document.getElementById("sua-ai").addEventListener("click", function() {
    const loaiLoi = prompt(
        "Nhập loại sự cố bạn muốn sửa:",
        document.getElementById("loai-loi").textContent
    );

    if (loaiLoi !== null && loaiLoi.trim() !== "") {
        document.getElementById("loai-loi").textContent = loaiLoi.trim();
        thongBaoAI.textContent = "Đã cập nhật loại sự cố theo lựa chọn của bạn.";
    }
});

document.getElementById("tu-choi").addEventListener("click", function() {
    thongBaoAI.textContent =
        "Bạn đã từ chối gợi ý AI. Hãy kiểm tra sự cố thủ công.";
});

document.getElementById("tao-lai").addEventListener("click", function() {
    document.getElementById("loai-loi").textContent = "Lỗi cơ khí";
    document.getElementById("muc-uu-tien").textContent = "Cao";
    document.getElementById("phan-tram-ai").textContent = "78%";
    document.getElementById("thanh-ai").style.width = "78%";

    thongBaoAI.textContent =
        "Đã đặt lại gợi ý minh họa ban đầu.";
});
