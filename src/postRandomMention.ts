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

const initTargetMention = (userUrl: string, userName: string) => {
  const result = `<p><span class="h-card" translate="no"><a href="${userUrl}" class="u-url mention">@<span>${userName}</span></a></span>`
  return result
}

type VisibilityType = Entity.Status['visibility']

const BASE_URL = process.env.BASE_URL || ""
const ACCESS_TOKEN = process.env.ACCESS_TOKEN
const localClient = generator('mastodon', BASE_URL, ACCESS_TOKEN)

const selectRandomToot = () => {
  const index = Math.floor(Math.random() * TOOT_LIST.length)
  return TOOT_LIST[index].content
}

type TargetUser = {
  url: string
  name: string
}

const postRandomMention = async (reply_status_id: string, reply_username: string ,client?: MegalodonInterface, visibility?: VisibilityType) => {
  const targetClient = client || localClient 
  const toot = selectRandomToot()
  await targetClient.postStatus(`@${reply_username} ${toot}`, {visibility: visibility || 'unlisted', in_reply_to_id: reply_status_id})
}

export default postRandomMention