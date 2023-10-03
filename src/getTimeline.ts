import { MegalodonInterface } from "megalodon";

const getTimeline = async (client: MegalodonInterface) => {
  const res = await client.getHomeTimeline()
  res.data.forEach((status) => {
    console.log("-----------")
    console.log(status.account.username, "님의 게시글")
    console.log(status.content)
  })
}

export default getTimeline