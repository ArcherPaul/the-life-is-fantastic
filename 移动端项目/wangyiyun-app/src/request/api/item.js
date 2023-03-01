import service from '../index'
//获取歌单详情页
export function getMusicItemList(data) {
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${data}`
    })
}
//获取歌单所有歌曲
export function getItemList(data) {
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}

//获取歌词  /lyric?id=1312414
export function getMusicLyric(data) {
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}