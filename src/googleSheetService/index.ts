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
  const 스탯시트 = doc.sheetsByTitle['스탯']
  const rows = await 스탯시트.getRows()
  console.log(rows.length)
  rows.forEach(row => {
    const name = row.get("이름")
    const id = row.get("계정")
    const age = row.get("나이")
    const stamina = row.get("스태미나")
    const crystal = row.get("크리스탈")
    console.log(`${name} / ${id} / ${age} / ${stamina} / ${crystal}`)
  })
  return 스탯시트
}

const drawFrotune = async () => {
  console.log("운세뽑기!") 
}

export const addNewUser = async (sheet: GoogleSpreadsheetWorksheet) => {
  const randomNum = Math.floor(Math.random() * 10)
  const id = `test_account_${randomNum}`
  const newUser = {
    "이름": `테스트 유저 ${randomNum}`,
    "계정": id,
    "나이": 20,
    "스태미나": 100,
    "크리스탈": 100
  }
  await sheet.addRow(newUser)
  return newUser
}

getStatSheet().then(addNewUser).then((newUser) => {
  console.log(newUser)
  console.log("신규 유저 생성 끝!")
})
