import axios, { default as _axios } from "axios"

export const authClient = _axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
})

export const fmsClient = _axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
})

export const fsClient = axios.create()

