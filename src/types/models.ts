export type TravelType =
  | 'Solo Traveler'
  | 'With Companion'
  | 'Group Traveler'
  | 'Couple Traveler'

export type DestinationKey = 'intramuros' | 'binondo' | 'ilocos' | 'boracay'

export type GameMode = 'truth' | 'dare' | 'audio-tour'

export type IconKey =
  | 'compass'
  | 'sparkles'
  | 'users'
  | 'heart'
  | 'castle'
  | 'utensils'
  | 'mountain'
  | 'palmtree'
  | 'church'
  | 'archive'
  | 'building'
  | 'fortress'
  | 'camera'
  | 'map'
  | 'carriage'
  | 'bridge'
  | 'wind'
  | 'waves'
  | 'shell'
  | 'landmark'
  | 'sun'
  | 'star'

export interface TravelTypeOption {
  id: TravelType
  title: TravelType
  description: string
  supportCopy: string
  toneLabel: string
  accent: string
  iconKey: IconKey
}

export interface Destination {
  key: DestinationKey
  name: string
  tagline: string
  description: string
  imagePath: string
  location: string
  premiumOnly: boolean
  accent: string
  iconKey: IconKey
  highlight: string
}

export interface PlaceExperience {
  id: string
  destinationKey: DestinationKey
  name: string
  shortDescription: string
  detail: string
  truth: string
  funFact: string
  dares: string[]
  iconKey: IconKey
  accent: string
}

export interface AppProfile {
  id: string
  fullName: string
  travelType: TravelType | null
  isPremium: boolean
  createdAt: string | null
}

export interface GameFlowState {
  travelType: TravelType | null
  destinationKey: DestinationKey | null
  placeId: string | null
  mode: GameMode | null
  revealedCardTitle: string | null
  revealedPrompt: string | null
}
