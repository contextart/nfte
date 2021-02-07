import { CSSProperties } from "react"

export type NFTData = {
  contract: string
  tokenId: string
  metadata: { [key: string]: any }
  name: string
  description: string
  ownerOf: string
  ownerOfUrl: string
  creatorOf: string
  creatorOfUrl: string
  platform: string
  platformUrl: string
  mediaUrl: string
  mediaPageUrl: string
  blockNumber: string
  timestamp: string
  // Deprecated
  media: string
  mintedBy: string
  mintedByUrl: string
}

export type NFTEProps = {
  data: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
}
