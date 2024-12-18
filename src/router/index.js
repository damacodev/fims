import Vue from "vue";
import Router from "vue-router";
import { dashboard } from "@/router/dashboard";
import { generalTask } from "@/router/general-task";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard/general",
      component: () => import("@/view/layout/Layout"),
      children: [
        dashboard,
        {
          path: "/calendar",
          name: "calendar",
          component: () => import("@/view/pages/Calendar.vue")
        },
        {
          path: "/work-order",
          name: "workOrder",
          component: () => import("@/view/pages/WorkOrder.vue")
        },
        {
          path: "/ois-file",
          name: "oisFile",
          component: () => import("@/view/pages/ManageOisFile.vue")
        },
        generalTask,
        {
          path: "/approver",
          component: () => import("@/view/pages/approver"),
          children: [
            {
              path: "/",
              name: "approver",
              component: () => import("@/view/pages/approver/Table.vue")
            },
            {
              path: "form",
              name: "approverCreate",
              component: () => import("@/view/pages/approver/Form.vue")
            },
            {
              path: "form/:id",
              name: "approverUpdate",
              component: () => import("@/view/pages/approver/Form.vue")
            }
          ]
        },
        {
          path: "/document-number",
          component: () => import("@/view/pages/document-number"),
          children: [
            {
              path: "/",
              name: "documentNumber",
              component: () => import("@/view/pages/document-number/Table.vue")
            },
            {
              path: "form",
              name: "documentNumberCreate",
              component: () => import("@/view/pages/document-number/Form.vue")
            },
            {
              path: "form/:id",
              name: "documentNumberUpdate",
              component: () => import("@/view/pages/document-number/Form.vue")
            }
          ]
        },

        {
          path: "/documents",
          name: "documents",
          component: () => import("@/view/pages/Documents.vue")
        },
        {
          path: "/technician",
          name: "technician",
          component: () => import("@/view/pages/Technician.vue")
        },
        {
          path: "/work-items",
          component: () => import("@/view/pages/work-item"),
          children: [
            {
              path: "/",
              name: "workItem",
              component: () => import("@/view/pages/work-item/Table.vue")
            },
            {
              path: "equipment/:id/:action",
              name: "workItemFormEquipment",
              component: () => import("@/view/pages/work-item/equipment")
            },
            {
              path: "maintenance/:id/:action",
              name: "workItemFormMaintenance",
              component: () => import("@/view/pages/work-item/maintenance")
            },
            {
              path: "work-order/:id",
              name: "workItemFormWorkOrder",
              component: () => import("@/view/pages/work-item/work-order")
            },
            {
              path: "standard-form/:id",
              name: "workItemFormStandardForm",
              component: () => import("@/view/pages/work-item/standard-form")
            }
          ]
        },
        {
          path: "/user-management",
          component: () => import("@/view/pages/user-management"),
          children: [
            {
              path: "/",
              name: "userManagement",
              component: () => import("@/view/pages/user-management/Table.vue")
            },
            {
              path: "form",
              name: "userManagementCreate",
              component: () => import("@/view/pages/user-management/Form.vue")
            },
            {
              path: "form/:id",
              name: "userManagementUpdate",
              component: () => import("@/view/pages/user-management/Form.vue")
            }
          ]
        },
        {
          path: "/configuration",
          component: () => import("@/view/pages/configuration"),
          children: [
            {
              path: "/",
              name: "configuration",
              component: () => import("@/view/pages/configuration/Table.vue")
            },
            {
              path: "form/:id",
              name: "configurationUpdate",
              component: () => import("@/view/pages/configuration/Form.vue")
            }
          ]
        },
        {
          path: "/region",
          component: () => import("@/view/pages/region"),
          children: [
            {
              path: "/",
              name: "region",
              component: () => import("@/view/pages/region/Table.vue")
            },
            {
              path: "form",
              name: "regionCreate",
              component: () => import("@/view/pages/region/Form.vue")
            },
            {
              path: "form/:id",
              name: "regionUpdate",
              component: () => import("@/view/pages/region/Form.vue")
            }
          ]
        },
        {
          path: "/cro",
          component: () => import("@/view/pages/cro"),
          children: [
            {
              path: "/",
              name: "cro",
              component: () => import("@/view/pages/cro/Table.vue")
            },
            {
              path: "form",
              name: "croCreate",
              component: () => import("@/view/pages/cro/Form.vue")
            },
            {
              path: "form/:id",
              name: "croUpdate",
              component: () => import("@/view/pages/cro/Form.vue")
            }
          ]
        },
        {
          path: "/dppu",
          component: () => import("@/view/pages/dppu"),
          children: [
            {
              path: "/",
              name: "dppu",
              component: () => import("@/view/pages/dppu/Table.vue")
            },
            {
              path: "import",
              name: "dppuImport",
              component: () => import("@/view/pages/dppu/Import.vue")
            },
            {
              path: "form",
              name: "dppuCreate",
              component: () => import("@/view/pages/dppu/Form.vue")
            },
            {
              path: "form/:id",
              name: "dppuUpdate",
              component: () => import("@/view/pages/dppu/Form.vue")
            }
          ]
        },
        {
          path: "/equipment",
          component: () => import("@/view/pages/equipment"),
          children: [
            {
              path: ":category",
              name: "equipment",
              component: () => import("@/view/pages/equipment/Table.vue")
            },
            {
              path: ":category/form",
              name: "equipmentCreate",
              component: () => import("@/view/pages/equipment/Form.vue")
            },
            {
              path: ":category/form/:id",
              name: "equipmentUpdate",
              component: () => import("@/view/pages/equipment/Form.vue")
            },
            {
              path: ":category/import",
              name: "equipmentImport",
              component: () => import("@/view/pages/equipment/Import.vue")
            }
          ]
        },
        {
          path: "/warehouse",
          component: () => import("@/view/pages/warehouse"),
          children: [
            {
              path: "sparepart",
              component: () => import("@/view/pages/warehouse/sparepart"),
              children: [
                {
                  path: "/",
                  name: "sparepart",
                  component: () =>
                    import("@/view/pages/warehouse/sparepart/Table.vue")
                },
                {
                  path: "form",
                  name: "sparepartCreate",
                  component: () =>
                    import("@/view/pages/warehouse/sparepart/Form.vue")
                },
                {
                  path: "form/:id",
                  name: "sparepartUpdate",
                  component: () =>
                    import("@/view/pages/warehouse/sparepart/Form.vue")
                },
                {
                  path: "qrcode",
                  name: "qrCode",
                  component: () =>
                    import("@/view/pages/warehouse/sparepart/QrCode.vue")
                }
              ]
            },
            {
              path: "dailystock",
              component: () => import("@/view/pages/warehouse/daily-stock"),
              children: [
                {
                  path: "/",
                  name: "dailyStock",
                  component: () =>
                    import("@/view/pages/warehouse/daily-stock/Table.vue")
                },
                {
                  path: "form",
                  name: "dailyStockCreate",
                  component: () =>
                    import("@/view/pages/warehouse/daily-stock/form")
                },
                {
                  path: "form/:id",
                  name: "dailyStockUpdate",
                  component: () =>
                    import("@/view/pages/warehouse/daily-stock/form")
                }
              ]
            }
          ]
        },
        {
          path: "/locationIndex",
          component: () => import("@/view/pages/location-index"),
          children: [
            {
              path: "/",
              name: "locationIndex",
              component: () => import("@/view/pages/location-index/Table.vue")
            },
            {
              path: "form",
              name: "locationIndexCreate",
              component: () => import("@/view/pages/location-index/Form.vue")
            },
            {
              path: "form/:id",
              name: "locationIndexUpdate",
              component: () => import("@/view/pages/location-index/Form.vue")
            }
          ]
        },
        {
          path: "/activity",
          component: () => import("@/view/pages/activity"),
          children: [
            {
              path: "/",
              name: "activity",
              component: () => import("@/view/pages/activity/Table.vue")
            },
            {
              path: "form",
              name: "activityCreate",
              component: () => import("@/view/pages/activity/Form.vue")
            },
            {
              path: "form/:id",
              name: "activityUpdate",
              component: () => import("@/view/pages/activity/Form.vue")
            }
          ]
        },
        {
          path: "/schedule",
          component: () => import("@/view/pages/schedule"),
          children: [
            {
              path: "/",
              name: "schedule",
              component: () => import("@/view/pages/schedule/Table.vue")
            },
            {
              path: "form",
              name: "scheduleCreate",
              component: () => import("@/view/pages/schedule/Form.vue")
            },
            {
              path: "form/:id",
              name: "scheduleUpdate",
              component: () => import("@/view/pages/schedule/Form.vue")
            }
          ]
        },
        {
          path: "/owner-estimate",
          component: () => import("@/view/pages/owner-estimate"),
          children: [
            {
              path: "/",
              name: "ownerEstimate",
              component: () => import("@/view/pages/owner-estimate/Table.vue")
            },
            {
              path: "form",
              name: "ownerEstimateCreate",
              component: () => import("@/view/pages/owner-estimate/Form.vue")
            },
            {
              path: "form/:id",
              name: "ownerEstimateUpdate",
              component: () => import("@/view/pages/owner-estimate/Form.vue")
            }
          ]
        },
        {
          path: "/owner-estimate-generator",
          component: () => import("@/view/pages/owner-estimate-generator"),
          children: [
            {
              path: "/",
              name: "ownerEstimateGenerator",
              component: () =>
                import("@/view/pages/owner-estimate-generator/Table.vue")
            },
            {
              path: "form",
              name: "ownerEstimateGeneratorCreate",
              component: () =>
                import("@/view/pages/owner-estimate-generator/Form.vue")
            },
            {
              path: "form/:id",
              name: "ownerEstimateGeneratorUpdate",
              component: () =>
                import("@/view/pages/owner-estimate-generator/Form.vue")
            }
          ]
        },
        {
          path: "/checklist",
          component: () => import("@/view/pages/checklist"),
          children: [
            {
              path: "/",
              name: "checklist",
              component: () => import("@/view/pages/checklist/Table.vue")
            },
            {
              path: "form/:id",
              name: "checklistDetail",
              component: () => import("@/view/pages/checklist/Form.vue")
            }
          ]
        }
      ]
    },
    {
      name: "auth",
      path: "/auth",
      component: () => import("@/view/pages/auth/Auth")
    },
    {
      name: "setupPassword",
      path: "/setup-password",
      component: () => import("@/view/pages/auth/SetupPassword")
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/404.vue")
    }
  ]
});
