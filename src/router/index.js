import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import EmailVerifyView from "@/views/EmailVerifyView.vue";
import PasswordForgotView from "@/views/PasswordForgotView.vue";
import VerifiedView from "@/views/VerifiedView.vue";
import PasswordRecoverView from "@/views/PasswordRecoverView.vue";
import NewsFeedView from "@/views/NewsFeedView.vue";
import ForbiddenView from "@/views/ForbiddenView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MovieListView from "@/views/MovieListView.vue";
import MovieDescriptionView from "@/views/MovieDescriptionView.vue";
import OAuthLoginView from "@/views/OAuthLoginView.vue";
import UpdateEmailView from "@/views/UpdateEmailView.vue";
import QuoteDetailsView from "@/views/QuoteDetailsView.vue";
import QuoteEditView from "@/views/QuoteEditView.vue";
import QuoteAddView from "@/views/QuoteAddView.vue";
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
      beforeEnter: [isLoggedIn],
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
          beforeEnter: [isLoggedIn],
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
    { 
      path: '/oauth', 
      name: 'oauth', 
      component: OAuthLoginView,
  },
    { 
      path: '/profile', 
      name: 'profile', 
      component: ProfileView,
      beforeEnter: [isAuthenticated],
  },
  { 
    path: '/update-email/:id',
    name: '/update-email', 
    component: UpdateEmailView,
    props:true,
},
    { 
      path: '/movie-list', 
      name: 'movie-list', 
      component: MovieListView,
      beforeEnter: [isAuthenticated],
  },
    { 
      path: '/movie-list/:id', 
      name: 'movie-description', 
      component: MovieDescriptionView,
      props:true,
      beforeEnter: [isAuthenticated],
  },
    { 
      path: '/quote-details/:id', 
      name: 'quote-details', 
      component: QuoteDetailsView,
      props:true,
      beforeEnter: [isAuthenticated],
  },
    { 
      path: '/quote-edit/:id', 
      name: 'quote-edit', 
      component: QuoteEditView,
      props:true,
      beforeEnter: [isAuthenticated],
  },
    { 
      path: '/quote-add/:id', 
      name: 'quote-add', 
      component: QuoteAddView,
      props:true,
      beforeEnter: [isAuthenticated],
  },
    { 
      path: '/403-forbidden', 
      name: 'forbidden', 
      component: ForbiddenView,
  },
    { 
      path: '/:notFound(.*)', 
      name: 'not-found', 
      component: NotFoundView,
  },
]
});

export default router;
