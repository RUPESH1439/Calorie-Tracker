import axios from './axios'


export const getMeals = function () {
  return axios.get<any, Meal[]>(
    '/meals'
  )
}
