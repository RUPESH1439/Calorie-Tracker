class Users::FoodsController < ApplicationController
  #TODO Add authentication
  before_action :authenticate_user!
  before_action :check_admin, only: [:average_calories_per_user, :count_foods_last_n_days]
  before_action :set_food, only: [:show, :update, :destroy]

  # GET /foods
  def index
    @foods = Food.all

    render json: @foods
  end

  # Get /users/1/foods
  def user_foods
    @foods = Food.where("user_id = ?", params[:id])
    render json: @foods
  end

  # Get /users/1/foods
  def user_foods_for_day
    @foods = Food.where("user_id = ? and DATE(date_added) = ?", params[:id], params[:day])
    render json: @foods
  end

  def user_foods_meal_count_for_day
    sql = "select Count(F.meal_id) as meals, M.id as meal_id, M.max_food_entries from foods F join meals M on F.meal_id = M.id where user_id=#{params[:id]} and date(date_added)='#{params[:day]}' group by F.meal_id, M.id, M.max_food_entries;"
    records = ActiveRecord::Base.connection.execute(sql)
    render json: records
  end

  def average_calories_per_user
    sql = "select AVG(F.calorie), F.user_id, U.name from foods F join users U on U.id = F.user_id where DATE(date_added) BETWEEN DATE(current_date - interval '#{params[:days]} days') AND DATE(current_date) group by F.user_id, U.name;"
    records = ActiveRecord::Base.connection.execute(sql)
    render json: records
  end

  def count_foods_last_n_days
    sql = "select COUNT(*) as foods from foods F where DATE(date_added) BETWEEN DATE(current_date - interval '#{params[:days]} days') AND DATE(current_date);"
    records = ActiveRecord::Base.connection.execute(sql)
    render json: records.first
  end

  # GET /foods/1
  def show
    render json: @food
  end

  # food /foods
  def create
    @food = Food.new(food_params)

    if @food.save
      render json: @food, status: :created
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /foods/1
  def update
    if @food.update(food_params)
      render json: @food
    else
      render json: @food.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/foods/1
  def destroy
    @food.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food
      @food = Food.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def food_params
      params.require(:food).permit(:name, :user_id, :meal_id, :calorie, :date_added)
    end

  
end
