class UsersController < ApplicationController
  #TODO Add authentication
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  def get_current_user
    render json: current_user
  end
  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @users
  end

  # user /user
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def get_total_calories_for_day 
    sql = "select sum(t.calorie) as total_calories, t.date_added from (
      select calorie, date(date_added) as date_added from foods where user_id=#{params[:id]}
    ) as t group by (t.date_added) order by t.date_added desc;"
    records = ActiveRecord::Base.connection.execute(sql)
    render json: records
  end

  def get_total_calories_for_date 
    sql = "select sum(calorie) as total_calories from foods where user_id=#{params[:id]} and date(date_added)='#{params[:date]}';"
    records = ActiveRecord::Base.connection.execute(sql)
    render json: records.first
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :calorie_limit, :role)
    end

    def validate_param
      
    end

    def get_total_calories_for_day_params
      params.require(:user).permit(:id, day)
    end
  
end
