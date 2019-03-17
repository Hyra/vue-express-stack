<template>
  <div>
    <header>
      <div><img src="@/assets/logo2.png" height="40" /></div>
      <div class="navItems">
        <!-- {{ $mq }} -->
        <!-- <router-link to="/">Home</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }">dashboard</router-link> -->
        <router-link :to="{ name: 'students' }">Students</router-link>
        <!-- <router-link :to="{ name: 'student', params: { studentId: 666 } }">student</router-link> -->
        <!-- <router-link :to="{ name: 'student-new' }">student-new</router-link> -->
        <router-link :to="{ name: 'invoices' }">Invoices</router-link>
        <!-- <router-link :to="{ name: 'invoice', params: { invoiceId: 222 } }">invoice</router-link> -->
        <!-- <router-link :to="{ name: 'contribution-plans' }">contribution-plans</router-link> -->
        <!-- <router-link :to="{ name: 'plan', params: { planId: 333 } }">plan</router-link> -->
        <!-- <router-link :to="{ name: 'subscriptions' }">subscriptions</router-link> -->
        <!-- <router-link :to="{ name: 'balance' }">balance</router-link> -->
        <!-- <router-link :to="{ name: 'payouts' }">payouts</router-link> -->
        <!-- <router-link :to="{ name: 'transactions' }">transactions</router-link> -->
        <!-- <router-link :to="{ name: 'settings' }">settings</router-link> -->
        <!-- <router-link :to="{ name: 'paymentsettings' }">paymentsettings</router-link> -->
      </div>
      <div>Settings / Logout</div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #fff url(/images/logo.svg) center center no-repeat;
  background: #0e8fff;
  color: white !important;
  border-bottom: 1px solid #f3f3ff;
  padding: 0 20px;
  position: fixed;
  z-index: 10;
  .navItems {
    width: 55rem;
    a {
      margin-right: 20px;
      font-weight: 100;
      text-decoration: none;
      color: #fff;
      font-weight: 600;
      text-transform: capitalize;
      font-size: 13px;
      border-radius: 3px;
      padding: 7px 12px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      font-weight: 500;
      transition: background-color 0.2s ease-in;
      &:hover {
        background-color: #06acff;
      }
      &.router-link-active {
        background-color: #06acff;
      }
    }
  }
}
</style>
