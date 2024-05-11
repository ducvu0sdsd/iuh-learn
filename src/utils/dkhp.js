export const kiemTrLichTrung = (tietLyThuyet, tietThucHanh, dsHocPhanDaDangKy) => {
    const ds = dsHocPhanDaDangKy.map(item => {
        const ly = {
            ngay: item.hocPhan.thongTin.tietLyThuyet[0].ngay,
            tiet: item.hocPhan.thongTin.tietLyThuyet[0].tiet,
            mon: item.hocPhan.monHoc
        }
        const th = {
            ngay: item.hocPhan.thongTin.tietThucHanh.filter(item1 => item1._id === item.nhomThucHanh)[0].ngay,
            tiet: item.hocPhan.thongTin.tietThucHanh.filter(item1 => item1._id === item.nhomThucHanh)[0].tiet,
            mon: item.hocPhan.monHoc
        }
        return [ly, th]
    }).flat()
    if (tietLyThuyet) {
        const tietCuaHocPhan = ds.filter(item => item.ngay === tietLyThuyet.ngay)
        if (!tietCuaHocPhan) {
            return { status: true, message: '' }
        }
        const gioLyThuyet = tietLyThuyet.tiet.split('-').map(item => Number(item))
        const gioCuaHocPhan = tietCuaHocPhan.map((item => {
            return {
                ...item,
                gio: item.tiet.split('-').map(item => Number(item))
            }
        }))
        for (let i = 0; i < gioCuaHocPhan.length; i++) {
            const gio = gioCuaHocPhan[i]
            if (gio.gio[0] >= gioLyThuyet[0] && gio.gio[0] <= gioLyThuyet[1])
                return { status: false, message: `Đã trùng lịch với môn ${gio.mon.tenMon}` }
            if (gio.gio[1] >= gioLyThuyet[0] && gio.gio[1] <= gioLyThuyet[1])
                return { status: false, message: `Đã trùng lịch với môn ${gio.mon.tenMon}` }
        }
    }
    if (tietThucHanh) {
        const tietCuaHocPhan = ds.filter(item => item.ngay === tietThucHanh.ngay)
        if (!tietCuaHocPhan) {
            return { status: true, message: '' }
        }
        const gioThucHanh = tietThucHanh.tiet.split('-').map(item => Number(item))
        const gioCuaHocPhan = tietCuaHocPhan.map((item => {
            return {
                ...item,
                gio: item.tiet.split('-').map(item => Number(item))
            }
        }))
        for (let i = 0; i < gioCuaHocPhan.length; i++) {
            const gio = gioCuaHocPhan[i]
            if (gio.gio[0] >= gioThucHanh[0] && gio.gio[0] <= gioThucHanh[1])
                return { status: false, message: `Đã trùng lịch với môn ${gio.mon.tenMon}` }
            if (gio.gio[1] >= gioThucHanh[0] && gio.gio[1] <= gioThucHanh[1])
                return { status: false, message: `Đã trùng lịch với môn ${gio.mon.tenMon}` }
        }
    }
    return { status: true, message: '' }
}