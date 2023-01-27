Rails.application.routes.draw do
  devise_for :users,
              controllers: {
                sessions: 'users/sessions',
                registrations: 'users/registrations'
              }
post '/users/:id/foods', to: 'users/foods#create'
get '/users/:id/foods', to: 'users/foods#user_foods'
get '/users/:id/foods/:day', to: 'users/foods#user_foods_for_day'
get '/users/:id/food_meal_counts/:day', to: 'users/foods#user_foods_meal_count_for_day'

put '/foods/:id', to: 'users/foods#update'
get '/foods', to: 'users/foods#index'
delete '/foods/:id', to: 'users/foods#destroy'
get '/get_average_calories_for_users/:days', to: 'users/foods#average_calories_per_user'
get '/get_foods_for_last_n_days/:days', to: 'users/foods#count_foods_last_n_days'

post '/meals', to: 'meals#create'
get '/meals', to: 'meals#index'
put '/meals/:id', to: 'meals#update'

get '/users', to: 'users#index'
put '/users/:id', to: 'users#update'
get '/get_total_calories_for_day/:id', to: 'users#get_total_calories_for_day'
get '/get_total_calories_for_date/:id/:date', to: 'users#get_total_calories_for_date'
get '/current_user', to: 'users#get_current_user'
get '/invite', to: 'users#invite'



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
