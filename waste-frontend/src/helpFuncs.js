
export default function urlAppendListParams(url, name, list) {
    if (url.includes('?')) {
        url += '&'
    } else {
        url += '?'
    }
    for (const key in list) {
        url += name + '=' + list[key] + '&'
    }
    return url
}
