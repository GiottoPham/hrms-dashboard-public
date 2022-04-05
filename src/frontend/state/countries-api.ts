import type { City, District, Ward } from '@frontend/types/coutries'
import axios from 'axios'
const axiosWithCountries = axios.create({
  baseURL: `https://arcane-taiga-55468.herokuapp.com/https://provinces.open-api.vn/api`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export const fetchCities = (): Promise<City[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/p`,
    })
    .then((res) =>
      res.data.map((city: { name: string; code: number }) => ({
        province_name: city.name,
        province_id: city.code,
      }))
    )
}
export const fetchDistricts = (provinceId: number): Promise<District[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `/d`,
    })
    .then((res) =>
      res.data
        .filter(
          (dist: { province_code: number }) => dist.province_code === provinceId
        )
        .map((dist: { name: string; code: number }) => ({
          district_name: dist.name,
          district_id: dist.code,
        }))
    )
}
export const fetchWards = (districtId: number): Promise<Ward[]> => {
  return axiosWithCountries
    .request({
      method: 'GET',
      url: `w`,
    })
    .then((res) =>
      res.data
        .filter(
          (ward: { district_code: number }) => ward.district_code === districtId
        )
        .map((ward: { name: string; code: number }) => ({
          ward_name: ward.name,
          ward_id: ward.code,
        }))
    )
}
