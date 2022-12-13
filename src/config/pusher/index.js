import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useUserStore } from '@/stores/UserStore.js';
import axios from "axios";
import baseAxios from "@/config/axios/index.js";


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
encrypted: true,
authorizer: (channel) => {
        return {
            authorize: (socketId, callback) => {
                baseAxios.post('broadcasting/auth',
                  {
                    socket_id: socketId,
                    channel_name: `private-notifications.${login.getUserData.id}`
                }
                )
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
return pusher;
}
