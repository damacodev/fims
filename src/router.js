import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/dashboard/general",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          component: () => import("@/view/pages/dashboard"),
          children: [
            {
              path: "general",
              name: "dashboardGeneral",
              component: () => import("@/view/pages/dashboard/general")
            },
            {
              path: "preventive-maintenance",
              name: "dashboardPreventiveMaintenance",
              component: () =>
                import("@/view/pages/dashboard/preventive-maintenance")
            },
            {
              path: "breakdown-maintenance",
              name: "dashboardBreakdownMaintenance",
              component: () =>
                import("@/view/pages/dashboard/breakdown-maintenance")
            },
            {
              path: "pending-task",
              name: "dashboardPendingTask",
              component: () => import("@/view/pages/dashboard/pending-task")
            }
          ]
        },

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
          path: "/general-task",
          component: () => import("@/view/pages/general-task"),
          children: [
            {
              path: "/",
              name: "generalTask",
              component: () => import("@/view/pages/general-task/GridMenu.vue")
            },
            {
              path: "laporan-kerusakan",
              name: "laporanKerusakan",
              component: () =>
                import("@/view/pages/general-task/LaporanKerusakan.vue")
            },
            {
              path: "sf-103",
              component: () => import("@/view/pages/general-task/sf-103"),
              children: [
                {
                  path: "/",
                  name: "sf103",
                  component: () =>
                    import("@/view/pages/general-task/sf-103/Table.vue")
                },
                {
                  path: "form",
                  name: "sf103Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-103/Form")
                },
                {
                  path: "form/:id",
                  name: "sf103Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-103/Form")
                },
                {
                  path: "form/:id/item",
                  name: "sf103CreateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-103/Item")
                },
                {
                  path: "form/:id/item/:iditem",
                  name: "sf103UpdateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-103/Item")
                }
              ]
            },
            {
              path: "sf-109",
              component: () => import("@/view/pages/general-task/sf-109"),
              children: [
                {
                  path: "/",
                  name: "sf109",
                  component: () =>
                    import("@/view/pages/general-task/sf-109/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf109Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-109/Form")
                }
              ]
            },
            {
              path: "sf-110",
              component: () => import("@/view/pages/general-task/sf-110"),
              children: [
                {
                  path: "/",
                  name: "sf110",
                  component: () =>
                    import("@/view/pages/general-task/sf-110/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf110Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-110/Form")
                }
              ]
            },
            {
              path: "sf-111",
              component: () => import("@/view/pages/general-task/sf-111"),
              children: [
                {
                  path: "/",
                  name: "sf111",
                  component: () =>
                    import("@/view/pages/general-task/sf-111/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf111Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-111/Form")
                }
              ]
            },
            {
              path: "sf-112",
              component: () => import("@/view/pages/general-task/sf-112"),
              children: [
                {
                  path: "/",
                  name: "sf112",
                  component: () =>
                    import("@/view/pages/general-task/sf-112/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf112Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-112/Form")
                }
              ]
            },
            {
              path: "sf-118",
              component: () => import("@/view/pages/general-task/sf-118"),
              children: [
                {
                  path: "/",
                  name: "sf118",
                  component: () =>
                    import("@/view/pages/general-task/sf-118/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf118Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-118/Form")
                },
                {
                  path: "form/:id/item/:iditem",
                  name: "sf118UpdateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-118/Item")
                }
              ]
            },
            {
              path: "sf-119",
              component: () => import("@/view/pages/general-task/sf-119"),
              children: [
                {
                  path: "/",
                  name: "sf119",
                  component: () =>
                    import("@/view/pages/general-task/sf-119/Table.vue")
                },
                {
                  path: "form",
                  name: "sf119Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-119/Form")
                },
                {
                  path: "form/:id",
                  name: "sf119Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-119/Form")
                }
              ]
            },
            {
              path: "sf-120",
              component: () => import("@/view/pages/general-task/sf-120"),
              children: [
                {
                  path: "/",
                  name: "sf120",
                  component: () =>
                    import("@/view/pages/general-task/sf-120/Table.vue")
                },
                {
                  path: "form",
                  name: "sf120Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-120/Form")
                },
                {
                  path: "form/:id",
                  name: "sf120Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-120/Form")
                }
              ]
            },
            {
              path: "sf-123",
              component: () => import("@/view/pages/general-task/sf-123"),
              children: [
                {
                  path: "/",
                  name: "sf123",
                  component: () =>
                    import("@/view/pages/general-task/sf-123/Table.vue")
                },
                {
                  path: "form/:id",
                  name: "sf123Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-123/Form")
                },
                {
                  path: "form/:id/item/:iditem",
                  name: "sf123UpdateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-123/Item")
                }
              ]
            },
            {
              path: "sf-125",
              component: () => import("@/view/pages/general-task/sf-125"),
              children: [
                {
                  path: "/",
                  name: "sf125",
                  component: () =>
                    import("@/view/pages/general-task/sf-125/Table.vue")
                },
                {
                  path: "form",
                  name: "sf125Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-125/Form")
                },
                {
                  path: "form/:id",
                  name: "sf125Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-125/Form")
                },
                {
                  path: "form/:id/item",
                  name: "sf125CreateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-125/Item")
                },
                {
                  path: "form/:id/item/:iditem",
                  name: "sf125UpdateItem",
                  component: () =>
                    import("@/view/pages/general-task/sf-125/Item")
                }
              ]
            },
            {
              path: "sf-127",
              component: () => import("@/view/pages/general-task/sf-127"),
              children: [
                {
                  path: "/",
                  name: "sf127",
                  component: () =>
                    import("@/view/pages/general-task/sf-127/Table.vue")
                },
                {
                  path: "form",
                  name: "sf127Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-127/Form")
                },
                {
                  path: "form/:id",
                  name: "sf127Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-127/Form")
                }
              ]
            },
            {
              path: "sf-128",
              component: () => import("@/view/pages/general-task/sf-128"),
              children: [
                {
                  path: "/",
                  name: "sf128",
                  component: () =>
                    import("@/view/pages/general-task/sf-128/Table.vue")
                },
                {
                  path: "form",
                  name: "sf128Create",
                  component: () =>
                    import("@/view/pages/general-task/sf-128/Form")
                },
                {
                  path: "form/:id",
                  name: "sf128Update",
                  component: () =>
                    import("@/view/pages/general-task/sf-128/Form")
                }
              ]
            }
          ]
        },
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
