import type { City, District, Ward } from '@frontend/types/coutries'
import axios from 'axios'

export const fetchCities = (): Promise<City[]> => {
  const axiosWithCountries = axios.create({
    baseURL: `https://vapi.vnappmob.com`,
  })

  return axiosWithCountries
    .request({
      method: 'GET',
      url: '/api/province',
    })
    .then((res) => res.data.results)
}
export const fetchDistricts = (provinceId: number): Promise<District[]> => {
  const axiosWithCountries = axios.create({
    baseURL: `https://vapi.vnappmob.com/`,
  })

  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/api/province/district/${provinceId}`,
    })
    .then((res) => res.data.results)
}
export const fetchWards = (districtId: number): Promise<Ward[]> => {
  const axiosWithCountries = axios.create({
    baseURL: `https://vapi.vnappmob.com/`,
  })

  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/api/province/ward/${districtId}`,
    })
    .then((res) => res.data.results)
}
