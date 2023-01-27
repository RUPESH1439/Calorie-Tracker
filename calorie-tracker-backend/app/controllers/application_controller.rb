class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  private
    def check_admin
      if (current_user.role != 'admin')
        render json: { message: "Not authorized" }, status: :unauthorized
      end
    end

  protected
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password, :role, :calorie_limit)}
    end

end
