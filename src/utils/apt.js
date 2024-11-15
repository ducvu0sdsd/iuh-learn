export const checkHaveRoom = (room) => {
    return room.phong.maPhong !== ''
}

export const checkThoiGianPhong = (dsThoiGianDaDangKy, phong, ngay, tiet) => {
    if (phong && ngay !== -1) {
        const filter = dsThoiGianDaDangKy.filter(item => (item.phong.maPhong === phong._id && item.ngay === ngay && item.tiet === tiet))
        if (filter.length > 0) {
            return false
        } else {
            return true
        }
    }
}