<template>
  <div class="membership-plans blocker">
    <el-dialog title="Edit product" :visible.sync="editingProduct" width="30%">
      <el-form
        ref="editProduct"
        :rules="editProductRules"
        :model="editProductForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Name" prop="name">
          <el-input
            v-model="editProductForm.name"
            placeholder="Please input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editingProduct = false">Cancel</el-button>
        <el-button type="primary" @click="editingProduct = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="Edit plan" :visible.sync="editingPlan" width="30%">
      <el-form
        ref="editPlan"
        :rules="editPlanRules"
        :model="editPlanForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Name" prop="nickname">
          <el-input
            v-model="editPlanForm.nickname"
            placeholder="Please input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editingPlan = false">Cancel</el-button>
        <el-button type="primary" @click="editingPlan = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="Add product" :visible.sync="addingProduct" width="30%">
      <el-form
        ref="addProduct"
        :rules="addProductRules"
        :model="addProductForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Name" prop="name">
          <el-input
            v-model="addProductForm.name"
            placeholder="Please input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addingProduct = false">Cancel</el-button>
        <el-button type="primary" @click="doAddProduct">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-if="dojo"
      title="Add plan"
      :visible.sync="addingPlan"
      width="30%"
    >
      <el-form
        ref="addPlan"
        :rules="addPlanRules"
        :model="addPlanForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Name" prop="nickname">
          <el-input v-model="addPlanForm.nickname" auto-complete="off" />
        </el-form-item>

        <el-form-item label="Amount" prop="amount">
          <el-input v-model.number="addPlanForm.amount" auto-complete="off">
            <template slot="prepend">{{ dojo.currency_symbol }}</template>
          </el-input>
        </el-form-item>

        <el-form-item label="Interval" prop="interval">
          <el-select v-model="addPlanForm.interval" placeholder="Choose one">
            <el-option label="Daily" value="day" />
            <el-option label="Weekly" value="week" />
            <el-option label="Monthly" value="month" />
            <el-option label="Yearly" value="year" />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addingPlan = false">Cancel</el-button>
        <el-button type="primary" @click="doAddPlan">Confirm</el-button>
      </span>
    </el-dialog>

    <div class="blocker__header">
      <h1>Membership Plans</h1>
      <button @click="openAddProductDialog">
        <i class="fas fa-plus-circle"></i> Add Product
      </button>
    </div>

    <div v-for="product in products" :key="product.id" class="membership-plan">
      <h2>
        {{ product.name }}
        <i class="fas fa-edit" @click="openEditProductDialog(product.id)"></i>
      </h2>
      <ul class="plans">
        <li v-for="plan in product.plans" :key="plan.id" class="plan">
          <div class="plan__description">
            {{ plan.nickname }}
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <!-- <div class="plan__price">{{ plan.currency }} {{ plan.amount }}</div> -->
          <div class="plan__price">
            {{ parseAmount(plan.amount, plan.currency, false) }}
          </div>
          <div class="plan__interval">{{ plan.interval }}ly</div>
        </li>
        <li v-if="!product.plans.length" class="no-content">
          You have not created any pricing plans for {{ product.name }} yet.
        </li>
        <li>
          <div class="add-plan-link" @click="openAddPlanDialog(product.id)">
            <i class="fas fa-plus" style="font-size: 12px;"></i> Add a pricing
            plan
          </div>
        </li>
      </ul>
    </div>

    <div v-if="!products.length" class="no-content">
      You have not created any products yet.
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "MembershipPlans",
  data() {
    return {
      editingProduct: false,
      editProductRules: {},
      editProductForm: {
        name: ""
      },
      editingPlan: false,
      editPlanRules: {},
      editPlanForm: {
        nickname: ""
      },
      addingProduct: false,
      addProductRules: {},
      addProductForm: {
        name: ""
      },
      addingPlan: false,
      addPlanRules: {},
      addPlanForm: {
        productId: "",
        nickname: "",
        interval: "",
        interval_count: "",
        amount: ""
      }
    };
  },
  apollo: {
    dojo: {
      query: gql`
        query {
          dojo: getDojo(dojoSlug: "firewall") {
            id
            title
            handle
            country
            currency
            currency_symbol
            currency_zerodecimal
          }
        }
      `
    },
    products: {
      query: gql`
        query getBillingProducts($dojoSlug: String!) {
          products: getBillingProducts(dojoSlug: $dojoSlug) {
            id
            name
            plans {
              id
              nickname
              interval
              interval_count
              amount
              currency
            }
          }
        }
      `,
      variables() {
        return {
          dojoSlug: this.$route.params.dojoSlug
        };
      }
    }
  },
  methods: {
    openEditProductDialog(productId) {
      this.editProductForm.name = productId;
      this.editingProduct = true;
    },
    openEditPlanDialog(planId) {
      this.editPlanForm.name = planId;
      this.editingPlan = true;
    },
    openAddPlanDialog(productId) {
      this.addPlanForm.productId = productId;
      this.addPlanForm.name = "";
      this.addingPlan = true;
    },
    openAddProductDialog() {
      this.addProductForm.name = "";
      this.addingProduct = true;
    },
    doAddProduct() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($dojoSlug: String!, $name: String!) {
              newBillingProduct(dojoSlug: $dojoSlug, name: $name) {
                id
                name
              }
            }
          `,
          variables: {
            dojoSlug: this.$route.params.dojoSlug,
            name: this.addProductForm.name
          },
          update: () => {
            this.$apollo.queries.products.refetch().then(() => {
              this.addProductForm.name = "";
              this.addingProduct = false;
            });
          }
        })
        .catch(e => {
          this.errorMessage = e.message;
        });
    },
    doAddPlan() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation(
              $dojoSlug: String!
              $product: String!
              $nickname: String!
              $interval: String!
              $interval_count: Int!
              $amount: Int!
            ) {
              newPlan(
                dojoSlug: $dojoSlug
                product: $product
                nickname: $nickname
                interval: $interval
                interval_count: $interval_count
                amount: $amount
              ) {
                id
                nickname
                interval
                interval_count
                amount
                currency
              }
            }
          `,
          variables: {
            dojoSlug: this.$route.params.dojoSlug,
            product: this.addPlanForm.productId,
            nickname: this.addPlanForm.nickname,
            interval: this.addPlanForm.interval,
            interval_count: 1, // TODO: this.addPlanForm.interval_count,
            amount: this.addPlanForm.amount
          },
          update: () => {
            this.$apollo.queries.products.refetch().then(() => {
              this.addPlanForm.name = {
                productId: "",
                nickname: "",
                interval: "",
                interval_count: "",
                amount: ""
              };
              this.addingPlan = false;
            });
          }
        })
        .catch(e => {
          this.errorMessage = e.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.membership-plan {
  margin-bottom: 20px;
  .no-content {
    color: #888;
    font-size: 14px;
  }
  h2 {
    &:hover {
      i {
        display: inline;
      }
    }
    i {
      display: none;
      cursor: pointer;
      font-size: 12px;
      color: lighten(#000, 50%);
    }
  }
  .plans {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      // margin: 0px 0 20px 0;
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: 0;
      }
      display: flex;
      align-items: center;
      .student {
        // &__avatar {
        //   width: 50px;
        // }
        &__name {
          flex: 1;
          // font-weight: 600;
        }
        &__link a {
          font-size: 14px;
        }
      }
      a {
        padding-left: 20px;
        text-decoration: none;
        color: #434343;
        // font-weight: bold;
        // font-size: 16px;
        &.add-pricing-plan {
          font-weight: 300;
          margin-left: -20px;
          color: #333;
          text-decoration: none;
          font-size: 14px;
          color: #0e8fff;
          float: right;
        }
      }
      &.plan {
        display: flex;
        justify-content: space-between;
        text-align: left;
        color: #333;
        width: 100%;
        &:hover {
          // color: #0e8fff;
        }
        .plan__description {
          flex: 1;
          &:hover {
            i {
              display: inline;
            }
          }
          i {
            display: none;
            cursor: pointer;
            font-size: 12px;
            color: lighten(#000, 50%);
          }
        }
        .plan__price {
          flex: 1;
        }
        .plan__interval {
          flex: 1;
        }
      }

      .add-plan-link {
        color: #0e8fff;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
