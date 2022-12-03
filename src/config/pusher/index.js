import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "axios";
import { useUserStore } from '@/stores/UserStore.js';

// Pusher.Runtime.createXHR = function () {
//     const pusher = new XMLHttpRequest();
//     pusher.withCredentials = true;
//     pusher.open('POST', 'http://127.0.0.1:8000/api/broadcasting', true);
//     pusher.send();
//     return pusher;
// };


// Pusher.Runtime.createXHR = function () {
//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;
//     return xhr;
// };

export const pusher = () => {
  const login=useUserStore();
window.Echo = new Echo({
  broadcaster: "pusher",
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  encrypted: true,
  withCredentials:true,
  forceTLS: true,
  key: import.meta.env.VITE_PUSHER_APP_KEY,
//   authEndPoint: 'http://127.0.0.1:8000/api/broadcasting',
//   authEndPoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  enabledTransports:['ws', 'wss'],
  authorizer: (channel) => {
      return {
          authorize: (socketId, callback) => {
            //   axios.post('http://127.0.0.1:8000/api/broadcasting/auth', {
              axios.post('http://127.0.0.1:8000/api/broadcasting/auth', {
                  socket_id: socketId,
                  channel_name: `auth.${login.getUserData.id}`
                //   channel_name: channel.name
              })
              .then(response => {
                  callback(false, response.data);
              })
              .catch(error => {
                  callback(true, error);
              });
          }
      };
  },
})

return pusher;
}
// pusher.defaults.withCredentials = true;

// export default pusher;

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
