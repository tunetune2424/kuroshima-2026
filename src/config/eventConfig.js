// 開催日時アンカー：day1の1行目（買い出し開始 7:00）が起点。
// 実際の開催日が決まったら、この1行だけ更新すればタイムテーブル全体の日時計算に反映される。
export const EVENT_START_DATETIME = '2026-08-01T07:00:00+09:00'

export const DAY_OFFSETS = {
  day1: 0,
  day2: 1,
  departure: 2,
}

// 開発中に任意の日時での「現在のイベント」表示を確認するための上書き設定。
// 例: '2026-08-02T22:15:00+09:00'。本番では null にしておくこと。
export const DEV_TIME_OVERRIDE = null
