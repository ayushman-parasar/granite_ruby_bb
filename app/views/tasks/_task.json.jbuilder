json.extract! task, :id, :desc, :created_at, :updated_at
json.url task_url(task, format: :json)
