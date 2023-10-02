import generator from "megalodon"
import dotenv from "dotenv"

dotenv.config()

const BASE_URL = process.env.BASE_URL
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

const client = generator('mastodon', BASE_URL, ACCESS_TOKEN)
console.log("client: ", client)
client.getHomeTimeline().then(res => {
  console.log(res.data)
})
