class User < ApplicationRecord
  has_many :foods, dependent: :destroy
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist
end