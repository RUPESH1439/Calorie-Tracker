class AddUserToFoods < ActiveRecord::Migration[5.2]
  def change
    add_reference :foods, :user, foreign_key: true
    add_reference :foods, :meal, foreign_key: true
  end
end
