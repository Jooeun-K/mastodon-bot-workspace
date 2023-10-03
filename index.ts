import generator, { WebSocketInterface } from "megalodon"
import dotenv, { configDotenv } from "dotenv"
import { get } from "http"
import getTimeline from "./src/getTimeline"
import postRandomToot from "./src/postRandomToot"
import postRandomMention from "./src/postRandomMention"

configDotenv()

const STREMING_URL: string = process.env.STREMING_URL || ""
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || ""
const client = generator('mastodon', STREMING_URL, ACCESS_TOKEN)

const stream: WebSocketInterface = client.userSocket()

stream.on('connect', () => {
  console.log(`connect / time: ${new Date()}`)
})

stream.on('update', (status: Entity.Status) => {
  console.log(`update / time: ${new Date()}`)
  console.log(status.content)
})

stream.on('notification', (notification: Entity.Notification) => {
  console.log(`notification / time: ${new Date()}`)
  if (notification.type === 'mention') {
    const reply_id = notification?.status?.id
    const reply_username = notification?.account?.username
    if (reply_id && reply_username) postRandomMention(reply_id, reply_username)
  }
})

stream.on('error', (err: Error) => {
  console.error(err)
})

stream.on('parser-error', (err: Error) => {
  console.error(err)
})
