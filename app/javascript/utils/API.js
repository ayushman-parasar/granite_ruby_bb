import * as Routes from "../utils/Routes"

const headers= {
  Accept:"application/json",
  "content-type":"application/json",
  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
};


export default {
  postNewTask:( payload )=>{
    return fetch(Routes.task_path(),{
      method: "POST",
      headers,
      body:JSON.stringify(payload)
    }).then(res=>{
        if(!res.ok){
          throw res 
        }
        console.log(res,"res in post api")
        return res.json()
    });
  }
}