require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def setup
    Task.delete_all
  end

  def test_is_instance_of_task
    # assert_difference Task.count
    task = Task.new
    assert task.is_a?(Task)
  end
# assert not
  test "test_instance_of_task" do
    task = Task.new
    assert_not task.is_a?(User)
  end

  test "test_value_of_description_assigned" do
    task = Task.new(desc:"this is new")
    # assert task.desc == "this is new"
    assert_equal task.desc, "this is new"
  end

  def test_value_created_at
    task = Task.new(desc:"hello world")
    assert_nil task.created_at
    task.save!
    assert_not_nil task.created_at
  end

  test "test_error_raised" do
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end

  def test_count_of_number_of_tasks
    assert_difference ->{Task.count} do
      Task.create!(desc: "Creating a task through test")
    end
  end

  test "test_count_number_of_task_new" do
    assert_difference ->{Task.count},2 do
      Task.create!(desc: "Creating a task through test")
      Task.create!(desc: "Creating a task through test again")
    end
  end

end
