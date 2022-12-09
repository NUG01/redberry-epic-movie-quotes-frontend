import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "axios";
import { useUserStore } from '@/stores/UserStore.js';

  
  export const pusher = () => {
    const login=useUserStore();
    Pusher.Runtime.createXHR = function () {
     var xhr = new XMLHttpRequest();
     xhr.withCredentials = true;
     return xhr;
   };
  
  window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  withCredentials: true,
  authorizer: (channel) => {
          return {
              authorize: (socketId, callback) => {
                  axios.post('http://127.0.0.1:8000/api/broadcasting/auth', {
                      socket_id: socketId,
                      channel_name: `private-notifications.${login.getUserData.id}`
                  })
                  .then(response => {
                      callback(false, response.data);
                  })
                  .catch(error => {
                      callback(true, error);
                  });
              }
          };
        }
  });
}

// export const pusher = () => {
//   window.Pusher= Pusher;
  
//   window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//   forceTLS: true,
//   encrypted: true,
//   withCredentials:true,
//   });
