import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EmailverifyView from "@/views/EmailverifyView.vue";
import PasswordforgotView from "@/views/PasswordforgotView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/landing',
      name:'main'
    },
    
    {
      path: "/landing",
      name: "landing",
      component: LandingView,
      children: [
        {
          path: "register",
          name: "registration",
          component: RegisterView,
        },
        {
          path: "login",
          name: "login",
          component: LoginView,
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: PasswordforgotView,
        },
      ],
    },
    { 
      path: '/verify-email', 
      name: 'verification', 
      component: EmailverifyView,
  },
]
});

export default router;
