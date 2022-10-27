import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EmailVerifyView from "@/views/EmailVerifyView.vue";
import PasswordForgotView from "@/views/PasswordForgotView.vue";
import VerifiedView from "@/views/VerifiedView.vue";
import PasswordRecoverView from "@/views/PasswordRecoverView.vue";
import NewsFeedView from "@/views/NewsFeedView.vue";
import { isAuthenticated, isLoggedIn } from "@/router/guards.js";
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
          beforeEnter: [isLoggedIn],
        },
        {
          path: "email-verified",
          name: "verified",
          component: VerifiedView,
        },
        {
          path: "login",
          name: "login",
          component: LoginView,
          beforeEnter: [isLoggedIn],
        },
        {
          path: "forgot-password",
          name: "forgot-password",
          component: PasswordForgotView,
          beforeEnter: [isLoggedIn],
        },
        { 
          path: 'recover-password/:id',
          name: 'recover-password', 
          component: PasswordRecoverView,
          props:true,
          beforeEnter: [isLoggedIn],
      },
      ],
    },
    { 
      path: '/verify-email', 
      name: 'verification', 
      component: EmailVerifyView,
      beforeEnter: [isLoggedIn],
  },
    { 
      path: '/news-feed', 
      name: 'news-feed', 
      component: NewsFeedView,
      beforeEnter: [isAuthenticated],
  },
]
});

export default router;
