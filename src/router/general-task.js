export const generalTask = {
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
      component: () => import("@/view/pages/general-task/LaporanKerusakan.vue")
    },
    {
      path: "sf-103",
      component: () => import("@/view/pages/general-task/sf-103"),
      children: [
        {
          path: "/",
          name: "sf103",
          component: () => import("@/view/pages/general-task/sf-103/Table.vue")
        },
        {
          path: "form",
          name: "sf103Create",
          component: () => import("@/view/pages/general-task/sf-103/Form")
        },
        {
          path: "form/:id",
          name: "sf103Update",
          component: () => import("@/view/pages/general-task/sf-103/Form")
        },
        {
          path: "form/:id/item",
          name: "sf103CreateItem",
          component: () => import("@/view/pages/general-task/sf-103/Item")
        },
        {
          path: "form/:id/item/:iditem",
          name: "sf103UpdateItem",
          component: () => import("@/view/pages/general-task/sf-103/Item")
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
          component: () => import("@/view/pages/general-task/sf-109/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf109Update",
          component: () => import("@/view/pages/general-task/sf-109/Form")
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
          component: () => import("@/view/pages/general-task/sf-110/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf110Update",
          component: () => import("@/view/pages/general-task/sf-110/Form")
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
          component: () => import("@/view/pages/general-task/sf-111/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf111Update",
          component: () => import("@/view/pages/general-task/sf-111/Form")
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
          component: () => import("@/view/pages/general-task/sf-112/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf112Update",
          component: () => import("@/view/pages/general-task/sf-112/Form")
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
          component: () => import("@/view/pages/general-task/sf-118/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf118Update",
          component: () => import("@/view/pages/general-task/sf-118/Form")
        },
        {
          path: "form/:id/item/:iditem",
          name: "sf118UpdateItem",
          component: () => import("@/view/pages/general-task/sf-118/Item")
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
          component: () => import("@/view/pages/general-task/sf-119/Table.vue")
        },
        {
          path: "form",
          name: "sf119Create",
          component: () => import("@/view/pages/general-task/sf-119/Form")
        },
        {
          path: "form/:id",
          name: "sf119Update",
          component: () => import("@/view/pages/general-task/sf-119/Form")
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
          component: () => import("@/view/pages/general-task/sf-120/Table.vue")
        },
        {
          path: "form",
          name: "sf120Create",
          component: () => import("@/view/pages/general-task/sf-120/Form")
        },
        {
          path: "form/:id",
          name: "sf120Update",
          component: () => import("@/view/pages/general-task/sf-120/Form")
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
          component: () => import("@/view/pages/general-task/sf-123/Table.vue")
        },
        {
          path: "form/:id",
          name: "sf123Update",
          component: () => import("@/view/pages/general-task/sf-123/Form")
        },
        {
          path: "form/:id/item/:iditem",
          name: "sf123UpdateItem",
          component: () => import("@/view/pages/general-task/sf-123/Item")
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
          component: () => import("@/view/pages/general-task/sf-125/Table.vue")
        },
        {
          path: "form",
          name: "sf125Create",
          component: () => import("@/view/pages/general-task/sf-125/Form")
        },
        {
          path: "form/:id",
          name: "sf125Update",
          component: () => import("@/view/pages/general-task/sf-125/Form")
        },
        {
          path: "form/:id/item",
          name: "sf125CreateItem",
          component: () => import("@/view/pages/general-task/sf-125/Item")
        },
        {
          path: "form/:id/item/:iditem",
          name: "sf125UpdateItem",
          component: () => import("@/view/pages/general-task/sf-125/Item")
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
          component: () => import("@/view/pages/general-task/sf-127/Table.vue")
        },
        {
          path: "form",
          name: "sf127Create",
          component: () => import("@/view/pages/general-task/sf-127/Form")
        },
        {
          path: "form/:id",
          name: "sf127Update",
          component: () => import("@/view/pages/general-task/sf-127/Form")
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
          component: () => import("@/view/pages/general-task/sf-128/Table.vue")
        },
        {
          path: "form",
          name: "sf128Create",
          component: () => import("@/view/pages/general-task/sf-128/Form")
        },
        {
          path: "form/:id",
          name: "sf128Update",
          component: () => import("@/view/pages/general-task/sf-128/Form")
        }
      ]
    },
    {
      path: "sf-137",
      component: () => import("@/view/pages/general-task/sf-137"),
      children: [
        {
          path: "/",
          name: "sf137",
          component: () => import("@/view/pages/general-task/sf-137/Table.vue")
        },
        {
          path: "form",
          name: "sf137Create",
          component: () => import("@/view/pages/general-task/sf-137/Form")
        },
        {
          path: "form/:id",
          name: "sf137Update",
          component: () => import("@/view/pages/general-task/sf-137/Form")
        }
      ]
    },
    {
      path: "sf-139a",
      component: () => import("@/view/pages/general-task/sf-139a"),
      children: [
        {
          path: "/",
          name: "sf139a",
          component: () => import("@/view/pages/general-task/sf-139a/Table.vue")
        },
        {
          path: "form",
          name: "sf139aCreate",
          component: () => import("@/view/pages/general-task/sf-139a/Form")
        },
        {
          path: "form/:id",
          name: "sf139aUpdate",
          component: () => import("@/view/pages/general-task/sf-139a/Form")
        }
      ]
    },
    {
      path: "sf-139b",
      component: () => import("@/view/pages/general-task/sf-139b"),
      children: [
        {
          path: "/",
          name: "sf139b",
          component: () => import("@/view/pages/general-task/sf-139b/Table.vue")
        },
        {
          path: "form",
          name: "sf139bCreate",
          component: () => import("@/view/pages/general-task/sf-139b/Form")
        },
        {
          path: "form/:id",
          name: "sf139bUpdate",
          component: () => import("@/view/pages/general-task/sf-139b/Form")
        }
      ]
    },
    {
      path: "sf-205",
      component: () => import("@/view/pages/general-task/sf-205"),
      children: [
        {
          path: "/",
          name: "sf205",
          component: () => import("@/view/pages/general-task/sf-205/Table.vue")
        },
        {
          path: "form",
          name: "sf205Create",
          component: () => import("@/view/pages/general-task/sf-205/Form")
        },
        {
          path: "form/:id",
          name: "sf205Update",
          component: () => import("@/view/pages/general-task/sf-205/Form")
        }
      ]
    },
    {
      path: "sf-206",
      component: () => import("@/view/pages/general-task/sf-206"),
      children: [
        {
          path: "/",
          name: "sf206",
          component: () => import("@/view/pages/general-task/sf-206/Table.vue")
        },
        {
          path: "form",
          name: "sf206Create",
          component: () => import("@/view/pages/general-task/sf-206/Form")
        },
        {
          path: "form/:id",
          name: "sf206Update",
          component: () => import("@/view/pages/general-task/sf-206/Form")
        }
      ]
    },
    {
      path: "sf-207",
      component: () => import("@/view/pages/general-task/sf-207"),
      children: [
        {
          path: "/",
          name: "sf207",
          component: () => import("@/view/pages/general-task/sf-207/Table.vue")
        },
        {
          path: "form",
          name: "sf207Create",
          component: () => import("@/view/pages/general-task/sf-207/Form")
        },
        {
          path: "form/:id",
          name: "sf207Update",
          component: () => import("@/view/pages/general-task/sf-207/Form")
        }
      ]
    },
    {
      path: "sf-209",
      component: () => import("@/view/pages/general-task/sf-209"),
      children: [
        {
          path: "/",
          name: "sf209",
          component: () => import("@/view/pages/general-task/sf-209/Table.vue")
        },
        {
          path: "form",
          name: "sf209Create",
          component: () => import("@/view/pages/general-task/sf-209/Form")
        },
        {
          path: "form/:id",
          name: "sf209Update",
          component: () => import("@/view/pages/general-task/sf-209/Form")
        }
      ]
    },
    {
      path: "sf-210",
      component: () => import("@/view/pages/general-task/sf-210"),
      children: [
        {
          path: "/",
          name: "sf210",
          component: () => import("@/view/pages/general-task/sf-210/Table.vue")
        },
        {
          path: "form",
          name: "sf210Create",
          component: () => import("@/view/pages/general-task/sf-210/Form")
        },
        {
          path: "form/:id",
          name: "sf210Update",
          component: () => import("@/view/pages/general-task/sf-210/Form")
        }
      ]
    },
    {
      path: "sf-211",
      component: () => import("@/view/pages/general-task/sf-211"),
      children: [
        {
          path: "/",
          name: "sf211",
          component: () => import("@/view/pages/general-task/sf-211/Table.vue")
        },
        {
          path: "form",
          name: "sf211Create",
          component: () => import("@/view/pages/general-task/sf-211/Form")
        },
        {
          path: "form/:id",
          name: "sf211Update",
          component: () => import("@/view/pages/general-task/sf-211/Form")
        }
      ]
    },
    {
      path: "sf-214",
      component: () => import("@/view/pages/general-task/sf-214"),
      children: [
        {
          path: "/",
          name: "sf214",
          component: () => import("@/view/pages/general-task/sf-214/Table.vue")
        },
        {
          path: "form",
          name: "sf214Create",
          component: () => import("@/view/pages/general-task/sf-214/Form")
        },
        {
          path: "form/:id",
          name: "sf214Update",
          component: () => import("@/view/pages/general-task/sf-214/Form")
        }
      ]
    },
    {
      path: "sf-215",
      component: () => import("@/view/pages/general-task/sf-215"),
      children: [
        {
          path: "/",
          name: "sf215",
          component: () => import("@/view/pages/general-task/sf-215/Table.vue")
        },
        {
          path: "form",
          name: "sf215Create",
          component: () => import("@/view/pages/general-task/sf-215/Form")
        },
        {
          path: "form/:id",
          name: "sf215Update",
          component: () => import("@/view/pages/general-task/sf-215/Form")
        }
      ]
    },
    {
      path: "sf-217",
      component: () => import("@/view/pages/general-task/sf-217"),
      children: [
        {
          path: "/",
          name: "sf217",
          component: () => import("@/view/pages/general-task/sf-217/Table.vue")
        },
        {
          path: "form",
          name: "sf217Create",
          component: () => import("@/view/pages/general-task/sf-217/Form")
        },
        {
          path: "form/:id",
          name: "sf217Update",
          component: () => import("@/view/pages/general-task/sf-217/Form")
        }
      ]
    },
    {
      path: "sf-218",
      component: () => import("@/view/pages/general-task/sf-218"),
      children: [
        {
          path: "/",
          name: "sf218",
          component: () => import("@/view/pages/general-task/sf-218/Table.vue")
        },
        {
          path: "form",
          name: "sf218Create",
          component: () => import("@/view/pages/general-task/sf-218/Form")
        },
        {
          path: "form/:id",
          name: "sf218Update",
          component: () => import("@/view/pages/general-task/sf-218/Form")
        }
      ]
    }
  ]
};
