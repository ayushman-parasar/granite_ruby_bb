class Task < ApplicationRecord
  validates :desc, presence: true
  belongs_to :user, optional: :true, foreign_key: "user_id"
  has_many :comments, dependent: :destroy
  after_create :log_task_details 
  # before_validation :set_description
  # after_validation :set_description
  
  def log_task_details
    TaskLoggerJob.perform_later(self)
    
  end

  # def set_description
  #   self.desc = "pay all Taxes at once"
  # end
end
