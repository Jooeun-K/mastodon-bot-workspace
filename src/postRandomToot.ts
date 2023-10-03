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

const postRandomToot = async (client?: MegalodonInterface, visibility?: VisibilityType) => {
  const targetClient = client || localClient 
  const toot = selectRandomToot()
  await targetClient.postStatus(toot, {visibility: visibility || 'unlisted'})
}

export default postRandomToot
