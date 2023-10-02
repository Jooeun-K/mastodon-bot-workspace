import generator from "megalodon"
import dotenv from "dotenv"
import { get } from "http"
import getTimeline from "./src/getTimeline"

dotenv.config()

const BASE_URL: string = process.env.BASE_URL || ""
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || ""

const client = generator('mastodon', BASE_URL, ACCESS_TOKEN)
// console.log("client: ", client)
// client.getHomeTimeline().then(res => {
//   console.log(res.data)
// })
getTimeline(client)
