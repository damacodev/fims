export const warning = [
  { text: "Yes", value: true },
  { text: "No", value: false }
];

export const status = [
  { text: "Active", value: true },
  { text: "Inactive", value: false }
];

export const inOut = [
  { text: "Stock In", value: 0 },
  { text: "Stock Out", value: 1 }
];

export const role = [
  {
    value: 0,
    text: "Admin"
  },
  {
    value: 1,
    text: "Operation Head"
  },
  {
    value: 2,
    text: "Maintenance"
  },
  {
    value: 3,
    text: "RSD"
  },
  {
    value: 4,
    text: "Technician"
  },
  {
    value: 5,
    text: "Supervisor Maintenance"
  },
  {
    value: 6,
    text: "Supervisor RSD"
  },
  {
    value: 7,
    text: "Supervisor HSSE"
  },
  {
    value: 8,
    text: "Supervisor GA"
  },
  {
    value: 9,
    text: "HSSE"
  },
  {
    value: 10,
    text: "GA"
  }
];

export const category = [
  {
    value: 1,
    text: "Automation & Field Instrument",
    icon: "misc/004-retweet.svg"
  },
  {
    value: 2,
    text: "Electrical Instrumen & Panel",
    icon: "misc/002-eolic-energy.svg"
  },
  {
    value: 3,
    text: "Filtration",
    icon: "misc/013-rgb.svg"
  },
  {
    value: 4,
    text: "Hydrant/Pipeline System",
    icon: "misc/006-plurk.svg"
  },
  {
    value: 5,
    text: "Pump",
    icon: "pump.png"
  },
  {
    value: 6,
    text: "Refueler/Hydrant Dispenser",
    icon: "truck.png"
  },
  {
    value: 7,
    text: "Storage Tank",
    icon: "tank.png"
  }
];

export const yesNo = [
  { text: "Yes", value: true },
  { text: "No", value: false }
];

export const available = [
  { text: "Available", value: true },
  { text: "Unavailable", value: false }
];

import { getYear } from "@/core/utils";
let year = [];
for (let i = getYear(); i > 1900; i--) {
  year.push({ text: i, value: i });
}
export const years = year;

export const breatherValve = [
  { text: "Free Vent", value: "Free Vent" },
  { text: "PV Valve", value: "PV Valve" }
];

export const movAtg = [
  { text: "ATG", value: "ATG" },
  { text: "MOV", value: "MOV" }
];

export const requestType = [
  {
    value: 0,
    text: "Equipment Request (Create)"
  },
  {
    value: 1,
    text: "Equipment Request (Update)"
  },
  {
    value: 2,
    text: "Equipment Request (Delete)"
  },
  {
    value: 3,
    text: "Preventive Maintenance"
  },
  {
    value: 4,
    text: "Breakdown Maintenance"
  },
  {
    value: 5,
    text: "Work Order"
  },
  {
    value: 6,
    text: "Standard Form"
  }
];

export const requestStatus = [
  {
    value: 0,
    text: "New"
  },
  {
    value: 1,
    text: "On Run"
  },
  {
    value: 2,
    text: "Pending"
  },
  {
    value: 3,
    text: "Accepted"
  },
  {
    value: 4,
    text: "Rejected"
  },
  {
    value: 5,
    text: "Closed"
  },
  {
    value: 6,
    text: "Re-Assign"
  }
];

export const period = [
  {
    value: 1,
    text: "Daily"
  },
  {
    value: 2,
    text: "Weekly"
  },
  {
    value: 3,
    text: "Monthly"
  },
  {
    value: 4,
    text: "3 Monthly"
  },
  {
    value: 5,
    text: "6 Monthly"
  },
  {
    value: 6,
    text: "Yearly"
  },
  {
    value: 7,
    text: "3 Yearly"
  }
];

export const pendingReason = [
  {
    value: 0,
    text: "Waiting Spare Part"
  },
  {
    value: 1,
    text: "Waiting Inspection Service"
  },
  {
    value: 2,
    text: "Waiting Repair Service"
  }
];
