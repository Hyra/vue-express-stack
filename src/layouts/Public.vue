<template>
  <div>
    <div id="nav">
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'signup' }">Sign up</router-link> |
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
    <router-view />
  </div>
</template>
