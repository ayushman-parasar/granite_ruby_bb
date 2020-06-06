class Task < ApplicationRecord
  validates :desc, presence: true
  belongs_to :user, optional: :true
  # before_validation :set_description
  # after_validation :set_description
  

  # def set_description
  #   self.desc = "pay all Taxes at once"
  # end
end
