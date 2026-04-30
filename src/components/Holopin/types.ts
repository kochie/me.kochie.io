export interface Sticker {
  id: string
  image: string
  name: string
}

export interface StickerPosition {
  id: string
  width: number
  height: number
  rotation: number
  scale: number
  top: number
  left: number
}

export interface HolopinResponse {
  page: { positions: StickerPosition[] }
  stickers: Sticker[]
}
