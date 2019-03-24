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
        <el-button type="primary" @click="addingProduct = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <el-dialog title="Add plan" :visible.sync="addingPlan" width="30%">
      <el-form
        ref="addPlan"
        :rules="addPlanRules"
        :model="addPlanForm"
        label-width="120px"
        label-position="left"
      >
        <el-form-item label="Name" prop="nickname">
          <el-input
            v-model="addPlanForm.nickname"
            placeholder="Please input"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addingPlan = false">Cancel</el-button>
        <el-button type="primary" @click="addingPlan = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>

    <div class="blocker__header">
      <h1>Membership Plans</h1>
      <button @click="openAddProductDialog">
        <i class="fas fa-plus-circle"></i> Add Product
      </button>
    </div>
    <div class="membership-plan">
      <h2>
        Shinkendo <i class="fas fa-edit" @click="openEditProductDialog(2)"></i>
      </h2>
      <ul class="plans">
        <li class="plan">
          <div class="plan__description">
            Adults monthly
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€60</div>
          <div class="plan__interval">month</div>
        </li>
        <li class="plan">
          <div class="plan__description">
            Juniors monthly
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€30</div>
          <div class="plan__interval">month</div>
        </li>
        <li class="plan">
          <div class="plan__description">
            Adults yearly
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€620</div>
          <div class="plan__interval">month</div>
        </li>
        <li>
          <div class="add-plan-link" @click="openAddPlanDialog(1)">
            <i class="fas fa-plus" style="font-size: 12px;"></i> Add a pricing
            plan
          </div>
        </li>
      </ul>
    </div>

    <div class="membership-plan">
      <h2>
        Shinkendo
        <router-link
          class="add-pricing-plan"
          :to="{
            name: 'membership-plan',
            params: { dojoSlug: $route.params.dojoSlug, planId: 1 }
          }"
          ><i class="fas fa-edit" style="font-size:12px; color: #AAA"></i
        ></router-link>
      </h2>
      <ul class="plans">
        <li class="plan">
          <div class="plan__description">
            Adults monthly
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€40</div>
          <div class="plan__interval">month</div>
        </li>
        <li class="plan">
          <div class="plan__description">
            Juniors monthly
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€30</div>
          <div class="plan__interval">month</div>
        </li>
        <li>
          <router-link
            class="add-pricing-plan"
            :to="{
              name: 'student-new',
              params: { dojoSlug: $route.params.dojoSlug }
            }"
            ><i class="fas fa-plus" style="font-size: 12px;"></i> Add a pricing
            plan</router-link
          >
        </li>
      </ul>
    </div>

    <div class="membership-plan">
      <h2>
        Shinkendo
        <router-link
          class="add-pricing-plan"
          :to="{
            name: 'membership-plan',
            params: { dojoSlug: $route.params.dojoSlug, planId: 1 }
          }"
          ><i class="fas fa-edit" style="font-size:12px; color: #AAA"></i
        ></router-link>
      </h2>
      <ul class="plans">
        <li class="plan">
          <div class="plan__description">
            ISF Fee
            <span>
              <i class="fas fa-edit" @click="openEditPlanDialog(2)"></i>
            </span>
          </div>
          <div class="plan__price">€50</div>
          <div class="plan__interval">yearly</div>
        </li>
        <li>
          <router-link
            class="add-pricing-plan"
            :to="{
              name: 'student-new',
              params: { dojoSlug: $route.params.dojoSlug }
            }"
            ><i class="fas fa-plus" style="font-size: 12px;"></i> Add a pricing
            plan</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MembershipPlans",
  data() {
    return {
      editingProduct: false,
      editProductRules: {},
      editProductForm: {
        name: "Some"
      },
      editingPlan: false,
      editPlanRules: {},
      editPlanForm: {
        nickname: "nickname"
      },
      addingProduct: false,
      addProductRules: {},
      addProductForm: {
        name: "name"
      },
      addingPlan: false,
      addPlanRules: {},
      addPlanForm: {
        nickname: "nickname"
      }
    };
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
    }
  }
};
</script>

<style lang="scss" scoped>
.membership-plan {
  margin-bottom: 20px;
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
