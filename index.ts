import generator from "megalodon"
import dotenv, { configDotenv } from "dotenv"
import { get } from "http"
import getTimeline from "./src/getTimeline"
import postRandomToot from "./src/postRandomToot"

configDotenv()

const STREMING_URL: string = process.env.STREMING_URL || ""
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || ""
const client = generator('mastodon', STREMING_URL, ACCESS_TOKEN)

// const client = generator('mastodon', BASE_URL, ACCESS_TOKEN)
// console.log("client: ", client)
// client.getHomeTimeline().then(res => {
//   console.log(res.data)
// })

// getTimeline(client)

postRandomToot(client)