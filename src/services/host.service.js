import { httpService } from "./http.service"
export const hostService = {
    query,
    save
}

function query(hostId) {
    return httpService.get(`stay?hostId=${hostId}`)
}

function save(asset) {
    console.log('asset', asset);
    if (asset._id) {
        return httpService.put('stay', asset);
    } else {
        return httpService.post('stay', asset)
    }
}
