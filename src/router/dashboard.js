export const dashboard = {
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
      component: () => import("@/view/pages/dashboard/preventive-maintenance")
    },
    {
      path: "breakdown-maintenance",
      name: "dashboardBreakdownMaintenance",
      component: () => import("@/view/pages/dashboard/breakdown-maintenance")
    },
    {
      path: "pending-task",
      name: "dashboardPendingTask",
      component: () => import("@/view/pages/dashboard/pending-task")
    }
  ]
};
