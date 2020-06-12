class TaskLoggerJob < ApplicationJob
  # queue_as :default

  before_enqueue :print_before_enqueue_message
  after_enqueue :print_after_enqueue_message

  def perform
    puts "TaskLoggerJob is performed"
  end

  # def perform(task)
  #   puts "Created a task with following attributes :: #{task.attributes} "
  # end

  def print_before_enqueue_message
    puts "Printing from inside before_enqueue callback"
  end

  def print_after_enqueue_message
    puts "Printing from inside after_enqueue callback"
  end

end
