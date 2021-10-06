import { httpService } from "./http.service"
export const hostService = {
    query,
}

function query(hostId) {
    return httpService.get(`stay?hostId=${hostId}`)
}