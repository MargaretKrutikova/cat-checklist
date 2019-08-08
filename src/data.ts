import isSameDay from "date-fns/is_same_day"

export const START_DATE = new Date("8/7/2019")

export const END_DATE = new Date("8/13/2019")

const medicineDates = [new Date("8/7/2019"), new Date("8/8/2019")]

export const shouldGiveMedicine = (date: Date) =>
  !!medicineDates.find(d => isSameDay(d, date))

export const MEDICINE_CHECKLIST_ITEMS: ItemsInfo = {
  morning: [
    {
      name: "Дать антибиотик Vetrimoxin",
      details:
        "0.5 таблетки разломать на 1/4 и дать с вкусняшкой или 10-15 г влажного корма",
      code: "GIVE_MEDICINE_MORNING",
      requireEnterResult: true
    }
  ],
  evening: [
    {
      name: "Дать антибиотик",
      code: "GIVE_MEDICINE_EVENING",
      requireEnterResult: true
    }
  ]
}

export type ChecklistItemInfo = {
  name: string
  code: string
  details?: string
  requireEnterResult?: boolean
}

export type ItemsInfo = {
  morning: ChecklistItemInfo[]
  evening: ChecklistItemInfo[]
}

export const STANDARD_CHECKLIST_ITEMS: ItemsInfo = {
  morning: [
    { name: "Поменять воду (3 места)", code: "CHANGE_WATER_MORNING" },
    {
      name: "Дать вкусняшку ",
      details: "2-3 кубика тунца сухого",
      code: "GIVE_TASTY_FOOD_MORNING"
    },
    {
      name: "Проверить дверь в туалет ",
      details: "Должна быть открыта",
      code: "CHECK_TOILET_DOOR_MORNING"
    }
  ],
  evening: [
    { name: "Открыть окна", code: "OPEN_WINDOWS_EVENING" },
    { name: "Дать вкусняшку (2-3 штуки)", code: "GIVE_TASTY_FOOD_EVENING" },
    {
      name: "Добавить еду чтоб было с горкой",
      details: "Слева - красный, справа - синий",
      code: "REFILL_FOOD_EVENING"
    },
    {
      name: "Поставить в туалет",
      code: "PUT_IN_TOILET_EVENING",
      requireEnterResult: true
    },
    { name: "Промыть правую заднюю лапу с NaCl", code: "RINSE_PAW_EVENING" },
    {
      name: "Дать пол пачки влажного корма",
      details:
        "Разогреть 5-10 сек 300Вт, должен быть не горячим, остальное в холодиник",
      code: "GIVE_MOIST_FOOD_EVENING"
    },
    {
      name: "Снять воротник чтобы мог умыться",
      details: "Не давать вылизывать больную лапу!",
      code: "REMOVE_COLLAR_EVENING"
    },
    { name: "Одеть воротник", code: "PUT_ON_COLLAR_EVENING" },
    {
      name: "Закрыть окна, кроме окна в спальню",
      code: "CLOSE_WINDOWS_EVENING"
    },
    {
      name: "Убедиться что открыта дверь в туалет",
      code: "CHECK_TOILET_DOOR_EVENING"
    }
  ]
}

export const Users = [
  { userName: "rita", displayName: "Rita" },
  { userName: "katya", displayName: "Katya" }
]

export const getDisplayUserName = (userName: string) => {
  const user = Users.find(u => u.userName === userName)
  return user ? user.displayName : ""
}

export const userExists = (userName: string) =>
  Users.some(u => u.userName === userName)
