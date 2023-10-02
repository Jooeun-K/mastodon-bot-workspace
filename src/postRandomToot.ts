import { MegalodonInterface } from "megalodon"

const TOOT_LIST = [
  {
    content: "오늘은 뭐하지?",
  },
  {
    content: "내일은 뭐하지?",
  },
  {
    content: "어제는 뭐했지?"
  }

]

const selectRandomToot = () => {
  const index = Math.floor(Math.random() * TOOT_LIST.length)
  return TOOT_LIST[index].content
}

const postRandomToot = async (client: MegalodonInterface) => {
  const toot = selectRandomToot()
  await client.postStatus(toot, {visibility: 'unlisted'})
}

export default postRandomToot