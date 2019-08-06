export const START_DATE = new Date("8/6/2019");

export const END_DATE = new Date("8/13/2019");

const medicineDates = [new Date("8/7/2019"), new Date("8/8/2019")];
export const shouldGiveMedicine = (date: Date) =>
  medicineDates.indexOf(date) > -1;
export const medicineTodoItem = "Give antibiotik";

export type ChecklistItemInfo = {
  name: string;
  code: string;
};

export type ItemsInfo = {
  morning: ChecklistItemInfo[];
  evening: ChecklistItemInfo[];
};

export const STANDARD_CHECKLIST_ITEMS: ItemsInfo = {
  morning: [
    { name: "Change water", code: "CHANGE_WATER_MORNING" },
    { name: "Give sweets", code: "" },
    { name: "Check door to the toilet", code: "" }
  ],
  evening: [
    { name: "Open windows", code: "OPEN_WINDOWS_EVENING" },
    { name: "Check food", code: "OPEN_WINDOWS_EVENING" }
  ]
};

export const Users = [
  { userName: "rita", displayName: "Rita" },
  { userName: "katya", displayName: "Katya" }
];

export const getDisplayUserName = (userName: string) => {
  const user = Users.find(u => u.userName === userName);
  return user ? user.displayName : "";
};

export const userExists = (userName: string) =>
  Users.some(u => u.userName === userName);
