import { configDotenv } from 'dotenv'
import generator, { Entity, WebSocketInterface } from 'megalodon'
import postRandomToot from './postRandomToot'
import postRandomMention from './postRandomMention'

configDotenv()

const STREMING_URL: string = process.env.STREMING_URL || ""
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || ""
const client = generator('mastodon', STREMING_URL, ACCESS_TOKEN)

const stream: WebSocketInterface = client.userSocket()

stream.on('connect', () => {
  console.log(`connect / time: ${new Date()}`)
})

stream.on('pong', () => {
  console.log(`pong / time: ${new Date()}`)
})

stream.on('update', (status: Entity.Status) => {
  console.log(`update / time: ${new Date()}`)
  console.log('updateStatus: ', status)
})

stream.on('notification', (notification: Entity.Notification) => {
  console.log(`notification / time: ${new Date()}`)
  console.log('notificationContent: ', notification)
  console.log("notification.type: ", notification.type === 'mention', notification.type)
  if (notification.type === 'mention') {
    const reply_id = notification?.status?.id
    const reply_username = notification?.account?.username
    if (reply_id && reply_username) postRandomMention(reply_id, reply_username)
  }
})

stream.on('delete', (id: number) => {
  console.log(id)
})

stream.on('error', (err: Error) => {
  console.error(err)
})

stream.on('status_update', (status: Entity.Status) => {
  console.log("status_update")
  console.log('updated: ', status.url)
})

stream.on('heartbeat', () => {
  console.log('thump.')
})

stream.on('close', () => {
  console.log('close')
})

stream.on('parser-error', (err: Error) => {
  console.error(err)
})
