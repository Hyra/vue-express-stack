<template>
  <div>
    <header>
      <!-- <div><img src="@/assets/logo2.png" height="40" /></div> -->
      <div class="navItems">
        <!-- {{ $mq }} -->
        <!-- <router-link to="/">Home</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }" exact>dashboard</router-link> -->
        <!-- <router-link :to="{ name: 'students' }">Students</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }" exact>Payments</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }" exact>Balance</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }" exact>Billing</router-link> -->
        <!-- <router-link :to="{ name: 'dashboard' }" exact>Dojo Settings</router-link> -->
        <!-- <router-link :to="{ name: 'student', params: { studentId: 666 } }">student</router-link> -->
        <!-- <router-link :to="{ name: 'student-new' }">student-new</router-link> -->
        <!-- <router-link :to="{ name: 'invoices' }">Invoices</router-link> -->
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

    <div class="students">
      <div class="content-box">
        <div class="view-box">
          <div class="aside-sticky">
            <div class="aside-wrap">
              <ul class="aside-actions">
                <li>
                  <router-link :to="{ name: 'dashboard' }" exact
                    ><i class="fas fa-tachometer-alt"></i>
                    Dashboard</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'students' }" exact
                    ><i class="fas fa-graduation-cap"></i> Students</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'dashboard' }" exact
                    ><i class="far fa-credit-card"></i> Payments</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'dashboard' }" exact
                    ><i class="fas fa-balance-scale"></i> Balance</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'invoices' }" exact
                    ><i class="fas fa-money-bill-alt"></i> Billing</router-link
                  >
                  <ul v-if="$route.path.indexOf('billing') > 0" class="subnav">
                    <li>
                      <router-link :to="{ name: 'dashboard' }" exact>
                        Invoices</router-link
                      >
                    </li>
                    <li>
                      <router-link :to="{ name: 'membership-plans' }" exact>
                        Membership Plans</router-link
                      >
                    </li>
                    <li>
                      <router-link :to="{ name: 'subscriptions' }" exact>
                        Subscriptions</router-link
                      >
                    </li>
                  </ul>
                </li>
                <li>
                  <router-link :to="{ name: 'dashboard' }" exact
                    ><i class="fas fa-cog"></i> Dojo settings</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="container">
            <transition
              name="fade"
              mode="out-in"
              @beforeLeave="beforeLeave"
              @enter="enter"
              @afterEnter="afterEnter"
            >
              <router-view
            /></transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Admin",
  methods: {
    // beforeLeave(element) {
    //   this.prevHeight = getComputedStyle(element).height;
    // },
    // enter(element) {
    //   const { height } = getComputedStyle(element);
    //   element.style.height = this.prevHeight;
    //   setTimeout(() => {
    //     element.style.height = height;
    //   });
    // },
    // afterEnter(element) {
    //   element.style.height = "auto";
    // }
  }
};
</script>

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
  background: linear-gradient(to left, #0e8fff, #2c80ca);
  color: white !important;
  border-bottom: 1px solid #f3f3ff;
  padding: 0 20px;
  position: fixed;
  z-index: 10;
  .navItems {
    width: 55rem;
    a {
      margin-right: 10px;
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
