interface Food {
  id?: number
  meal_id?: number
  user_id?: number
  name?: string
  date_added?: Date
  calorie?: number
}

interface CreateNewFood {
  meal_id: number
  user_id: number
  name: string
  date_added: Date
  calorie: number
}

interface Meal {
  id?: number
  name?: string
  max_food_entries?: number
}

interface AverageCalorie {
  name?: string
  avg?: number
  user_id?: number
}

interface MealCount {
  meals?: number
  meal_id?: number
  max_food_entries?: number
}

interface User {
  id?: number
  name?: string
  email?: string
  role?: "regular" | "admin"
  calorie_limit?: number
}

interface TotalCalorieAndDate {
  total_calories?: number
  date_added?: string
}

interface TotalCalorieForUser {
  total_calories?: number
}