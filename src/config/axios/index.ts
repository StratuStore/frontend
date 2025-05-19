import { default as _axios } from "axios"

export const axios = _axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
})

