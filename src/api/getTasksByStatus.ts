import { algoliaIndex } from "@lib/firebaseConfig"
import { TFilter } from "@store/filter"
import { TTask } from "@type/task.type"
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  orderBy
} from "firebase/firestore"

// const formatDate = (date: string | Date) => {
//   return dayjs(date).valueOf()
// }
const formatDate = (date: string) => Math.floor(new Date(date).getTime() / 1000)

export const getTasksByStatus = async (
  status: string,
  options: TFilter
): Promise<TReturn[]> => {
  if (!!options.search || !!options.dueOn?.length)
    return search(status, options)

  const filters = [where("taskStatus", "==", status)]
  if (options.taskCategory)
    filters.push(where("taskCategory", "==", options.taskCategory))

  const q = query(
    collection(getFirestore(), "tasks"),
    ...filters,
    orderBy("dueOnTimeStamp", options.sorting)
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as TReturn[]
}

const search = async (taskStatus: string, options?: TFilter) => {
  const filters = [`taskStatus:"${taskStatus}"`]

  if (options?.taskCategory)
    filters.push(`taskCategory:"${options.taskCategory}"`)
  if (options?.dueOn?.length) {
    const [startDate, endDate] = options?.dueOn

    if (startDate)
      filters.push(`dueOnTimeStamp.seconds >= ${formatDate(startDate)} `)
    if (endDate)
      filters.push(`dueOnTimeStamp.seconds <= ${formatDate(endDate)}`)
  }

  const filtersString = filters.join(" AND ")

  const response = await algoliaIndex.search(options?.search!, {
    filters: filtersString
  })

  return response.hits.map(d => ({
    id: d.objectID,
    ...d
  })) as unknown as TReturn[]
}

export type TReturn = TTask & {
  objectID: string
  id: string
}
