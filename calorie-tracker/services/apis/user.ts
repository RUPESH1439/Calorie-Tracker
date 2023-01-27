import axios from 'axios'
import config from '../../config/api'
import configuredAxios from './axios'
const { baseURL } = config
export const signup = function (user: any) {
  return axios.post<any, any>(
    baseURL + '/users', user
  )
}

export const signin = function (user: any) {
  return axios.post<any, any>(
    baseURL + '/users/sign_in', user, {
    headers: {
      "Content-Type": "application/json"
    }
  }
  )
}

export const getCurrentUser = function () {
  return configuredAxios.get<any, User>(
    '/current_user'
  )
}


export const getTotalCaloriesForUser = function (userId: number) {
  return configuredAxios.get<any, TotalCalorieAndDate[]>(
    `/get_total_calories_for_day/${userId}`
  )
}

export const getTotalCaloriesForADateUser = function (userId: number, date: string) {
  return configuredAxios.get<any, TotalCalorieForUser>(
    `/get_total_calories_for_date/${userId}/${date}`
  )
}

