<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/signup">Sign up</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </div>
    <router-view />
  </div>
</template>
