import axios from 'axios'

let api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND + '/api',
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': window.localStorage.getItem('token')
    }
});

export function setAuthToken(token) {
    api = axios.create({
        baseURL: process.env.REACT_APP_BACKEND + '/api',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    });
}

export async function getUserInfo() {
    return await api.get(`/auth`);
}

export async function getUserBalance() {
    return await api.post('/pay/balance')
}

export async function getHome() {
    return await api.get(`/game`);
}

export async function getNew() {
    return await api.get(`/game/new`);
}

export async function getRandom({gameType}) {
    return await api.get(`/game/random?gameType=${gameType}`);
}

export async function getGames({page, limit, gameType, platform}) {
    return await api.get(`/game/${page}?limit=${limit}&gameType=${gameType}&platform=${platform}`);
}

// export async function getGamesByFilter({gameType, platform}) {
//     return await api.get(`/game/filter/${gameType}/${platform}`);
// }

export async function getGamePlayUrl(id) {
  return await api.get(`/game/play/${id}`);
}