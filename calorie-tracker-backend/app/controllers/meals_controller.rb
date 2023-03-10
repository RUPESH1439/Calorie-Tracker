class MealsController < ApplicationController
  #TODO Add authentication
  before_action :authenticate_user!
  before_action :set_meal, only: [:show, :update, :destroy]

  # GET /meals
  def index
    @meals = Meal.all

    render json: @meals
  end

  # GET /meals/1
  def show
    render json: @meal
  end

  # meal /meals
  def create
    @meal = Meal.new(meal_params)

    if @meal.save
      render json: @meal, status: :created
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /meals/1
  def update
    if @meal.update(meal_params)
      render json: @meal
    else
      render json: @meal.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/meals/1
  def destroy
    @meal.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_meal
      @meal = Meal.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def meal_params
      params.require(:meal).permit(:name, :max_food_entries)
    end
  
end
