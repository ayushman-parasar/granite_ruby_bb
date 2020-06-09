export function tasks_path(){
  return "/tasks"
}

export function new_task_path(){
  return "/tasks/new"
}

export function task_path(id){
  return `/tasks/${id}`
}

export function edit_task_path(id){
  return `/tasks/${id}/edit`
}

export function update_task_path(id){
  return `/tasks/${id}`
}

export function delete_task_path(id){
  return `/tasks/${id}`
}

export function users_path(){
  return "/users";
}
export function users_new_path(){
  return "/users/new"
}

export function login_path(){
  return "/session";
}

export function login_new_path(){
  return "/session/new"
}

export function logout_path(){
  return "/logout";
}

export function task_comments_path(task_id){
  return `/tasks/${task_id}/comments`
}