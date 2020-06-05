// import * as Routes from "../utils/Routes"

// const headers= {
//   Accept:"application/json",
//   "content-type":"application/json",
//   'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
// };
// 
// 
// export default {
//   postNewTask:( payload )=>{
//     return fetch(Routes.task_path(),{
//       method: "POST",
//       headers,
//       body:JSON.stringify(payload)
//     }).then(res=>{
//         if(!res.ok){
//           throw res 
//         }
//         console.log(res,"res in post api")
//         return res.json()
//     });
//   },

  // updateTask:( payload )=>{
  //   console.log("updateTask", payload)
  //   return fetch(Routes.update_task_path(payload.id),{
  //     method: "PATCH",
  //     headers,
  //     body: JSON.stringify(payload.taskPayload)
  //   }).then(res =>{
  //     if(!res.ok){
  //       throw res
  //     }
  //     console.log(res, "res in update api")
  //     return res.json()
  //   })
  // }
// }

// Refractoring the above code  to make it more reuseable

import { isUnauthorized } from './helpers';
import {
  STATUS_UNPROCESSABLE_ENTITY,
  STATUS_OK,
  STATUS_NOT_FOUND,
  STATUS_BAD_REQUEST,
} from './constants';

export const fetchApi = ({
  url,
  method,
  body,
  onError,
  errorCallback,
  onSuccess,
  successCallBack,
}) => {
  method = method.toUpperCase();

  var options = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content,
    },
  };

  const methods = ['POST', 'PUT', 'PATCH'];
  if (methods.includes(method)) {
    options['body'] = JSON.stringify(body);
  }
  console.log({"log":url, "options":options})
  fetch(url, options)
    .then(response =>
      response.json().then(data => {
        console.log("inside fetch api", response,"::::::",data)
        if (isUnauthorized(response)) {
          console.log("isUnauthorized")
          onError({ messages: [data.errors], type: 'danger' });
        } else if (response.status == STATUS_UNPROCESSABLE_ENTITY) {

          onError({ messages: data.errors, type: 'danger' });
        } else if (
          response.status >= STATUS_OK &&
          response.status < STATUS_BAD_REQUEST
        ) {
          console.log(response,"success")
          onSuccess({ messages: [data.notice], type: 'success' });
          successCallBack(data);
        } else if (response.status == STATUS_NOT_FOUND) {
          onError({ messages: [data.errors], type: 'danger' });
        } else {
          console.log("else part in Api", data)
          throw Error(response.statusText);
        }
      })
    )
    .catch(error => {
      console.error(error,"error in fetchApi");
    });
};

