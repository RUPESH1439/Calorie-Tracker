import axios from './axios'

export const getFoods = function () {
  return axios.get<any, Food[]>(
    '/users/1/foods'
  )
}

export const postNewFood = function (food: CreateNewFood) {
  return axios.post<any, Food>(
    `/users/${food.user_id}/foods`, food
  )
}

export const updateFood = function (food: Food) {
  return axios.put<any, Food>(
    `/foods/${food?.id}`, food
  )
}

export const deleteFood = function (id: number) {
  return axios.delete<any, any>(
    `/foods/${id}`
  )
}

export const getFoodsForUser = function (userId: number) {
  return axios.get<any, Food[]>(
    `/users/${userId}/foods`
  )
}

export const getAverageCalorieForAllUsersForLastNDays = function (days: number) {
  return axios.get<any, AverageCalorie[]>(
    `/get_average_calories_for_users/${days}`
  )
}

export const getFoodCountForLastNDays = function (days: number) {
  return axios.get<any, { foods?: number }>(
    `/get_foods_for_last_n_days/${days}`
  )
}

export const getMealCountForFood = function (userId: number, day: string) {
  return axios.get<any, MealCount[]>(
    `/users/${userId}/food_meal_counts/${day}`
  )
}