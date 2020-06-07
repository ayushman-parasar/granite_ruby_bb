class User <  ApplicationRecord
  has_many :task, dependent: :destroy, foreign_key: :user_id
  has_secure_password
  # puts :password_digest,"password digest"
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end