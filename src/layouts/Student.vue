<template>
  <div>
    <router-link :to="{ name: 'student-dashboard' }">Dashboard</router-link> |
    <router-link :to="{ name: 'student-invoices' }">Invoices</router-link> |
    <router-link :to="{ name: 'student-invoice', params: { invoiceId: '123' } }"
      >Invoice</router-link
    >
    |
    <router-link :to="{ name: 'student-settings' }">Settings</router-link>
    <h1>Student</h1>
    <router-view />
  </div>
</template>
