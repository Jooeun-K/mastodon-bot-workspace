import { configDotenv } from "dotenv";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import creds from '../../mastodon-bot-sheet-c4a8fa931643.json'

configDotenv()

const SHEET_ID = "1eGxg99f6LaZxb_3Q8Kw6G_n_Obd-KBgsNVq_znPpD8s"
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

const jwt = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: SCOPES,
})

const doc = new GoogleSpreadsheet(SHEET_ID, jwt)

export const getStatSheet = async () => {
  await doc.loadInfo()
  console.log(doc.title)
  const 스탯 = doc.sheetsByTitle['스탯']
  const rows = await 스탯.getRows()
  console.log(rows.length)
  rows.forEach(row => {
    const name = row.get("이름")
    const age = row.get("나이")
    const stamina = row.get("스태미나")
    const crystal = row.get("크리스탈")
    console.log(`${name} / ${age} / ${stamina} / ${crystal}`)
  })
  return 스탯
}

const drawFrotune = async () => {
  console.log("운세뽑기!") 
}

const addNewUser = async (sheet: GoogleSpreadsheetWorksheet) => {
  const newUser = await sheet.addRow({"이름": "테스트 유저", "나이": 20, "스태미나": 100, "크리스탈": 100})
  return newUser
}

getStatSheet().then(addNewUser).then((newUser) => {
  console.log(newUser)
  console.log("신규 유저 생성 끝!")
})
