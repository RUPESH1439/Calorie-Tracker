class ChangeCalorieLimitToFloatOfUsers < ActiveRecord::Migration[5.2]
  def change
    change_column(:users, :calorie_limit, :float)
  end
end
