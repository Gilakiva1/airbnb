import { httpService } from "./http.service"
export const hostService = {
    query,
}

function query(hostId) {
    debugger
    return httpService.get(`stay?hostId=${hostId}`)
}