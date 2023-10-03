import { configDotenv } from "dotenv"
import generator, { Entity, MegalodonInterface } from "megalodon"

configDotenv()

const TOOT_LIST = [
  {
    content: "오늘의 운세: 대길",
  },
  {
    content: "오늘의 운세: 길",
  },
  {
    content: "오늘의 운세: 소길"
  }
]

type VisibilityType = Entity.Status['visibility']

const BASE_URL = process.env.BASE_URL || ""
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const localClient = generator('mastodon', BASE_URL, ACCESS_TOKEN)

const selectRandomToot = () => {
  const index = Math.floor(Math.random() * TOOT_LIST.length)
  return TOOT_LIST[index].content
}

const postRandomMention = async (reply_status_id: string, reply_username: string ,client?: MegalodonInterface, visibility?: VisibilityType) => {
  const targetClient = client || localClient 
  const toot = selectRandomToot()
  const postConfig = { visibility: visibility || 'unlisted', in_reply_to_id: reply_status_id }
  await targetClient.postStatus(`@${reply_username} ${toot}`, postConfig)
}

export default postRandomMention
