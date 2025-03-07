import { updateTaskStatusBatch } from "@api"
import { TBatch } from "@store/batch"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { TBatchOptions } from "src/api/tasks/updateStatusByBatch"

export const useBatchStatus = () => {
  const queryClient = useQueryClient()
  const [state, setState] = useState<null | "DELETING" | "UPDATING">(null)
  const { data, error, isError, isPending, mutate, mutateAsync } = useMutation({
    mutationFn: ({
      taskIds,
      options
    }: {
      taskIds: TBatch["taskIds"]
      options: TBatchOptions
    }) => {
      if (options.type == "DELETE") setState("DELETING")
      else setState("UPDATING")
      return updateTaskStatusBatch(taskIds, options)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"], exact: false })
    }
  })

  return {
    data,
    error,
    isError,
    isPending,
    mutate,
    mutateAsync,
    isDeleting: state == "DELETING" && isPending,
    isUpdating: state == "UPDATING" && isPending
  } as const
}
