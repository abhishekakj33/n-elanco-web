import { ReactElement } from "react"
import { ThemeColor } from "../layouts/types"

interface ApplicationsData {
    ConsumedQuantity: string
    ResourceGroup: string
    Date: string
    ServiceName: string
    Tags: any
    Cost: string
    Consumed: string
    InstanceId: string
    consumedQuantity: number
    cost: number
    id: any
}



interface StatsDataType {
    stats: string
    title: string
    color: ThemeColor
    icon: ReactElement
  }

export type { ApplicationsData, StatsDataType }