class Task < ApplicationRecord
  validates :desc, presence: true
end
