class MakeDescNotNullable < ActiveRecord::Migration[6.0]
  def change
    change_column_null :tasks, :desc, false
  end
end
