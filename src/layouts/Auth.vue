<template>
  <div>
    <router-link :to="{ name: 'home' }">Home</router-link> |
    <router-link :to="{ name: 'signup' }">Sign up</router-link> |
    <router-link :to="{ name: 'admin-login' }">Login</router-link>
    <h1>AUTH LAYOUT</h1>
    <router-view />
  </div>
</template>
