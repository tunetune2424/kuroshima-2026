// データ取得の唯一の窓口。画面側はこのファイルの関数だけを呼び、
// src/data/*.json を直接importしない。
// 今：バンドルされたJSONをそのまま返す。将来：Sheets由来のJSON取得やAPI呼び出しに
// body部分を差し替えるだけで済む（関数シグネチャ・戻り値の形は変えない）。
import timetableJson from '../data/timetable.json'
import staffJson from '../data/staff.json'
import shoppingListJson from '../data/shoppingList.json'
import equipmentCheckJson from '../data/equipmentCheck.json'
import inventoryJson from '../data/inventory.json'
import wishlistJson from '../data/wishlist.json'
import eventDetailsJson from '../data/eventDetails.json'

export async function getTimetable() {
  return timetableJson.days
}

export async function getStaff() {
  return staffJson.staff
}

export async function getShoppingList() {
  return shoppingListJson.stores
}

export async function getEquipmentCheck() {
  return equipmentCheckJson.categories
}

export async function getInventory() {
  return inventoryJson.categories
}

export async function getWishlist() {
  return wishlistJson.sections
}

export async function getEventDetail(eventId) {
  return eventDetailsJson.details[eventId] ?? null
}
