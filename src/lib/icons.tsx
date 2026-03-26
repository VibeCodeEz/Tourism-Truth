import type { LucideIcon } from 'lucide-react'
import {
  Archive,
  Building2,
  Castle,
  Compass,
  Heart,
  Landmark,
  Map,
  Palmtree,
  Shell,
  Shield,
  Sparkles,
  Star,
  Sun,
  TentTree,
  TowerControl,
  UtensilsCrossed,
  Users,
  Waves,
  Wind,
} from 'lucide-react'

import type { IconKey } from '@/types/models'

const iconMap: Record<IconKey, LucideIcon> = {
  compass: Compass,
  sparkles: Sparkles,
  users: Users,
  heart: Heart,
  castle: Castle,
  utensils: UtensilsCrossed,
  mountain: TentTree,
  palmtree: Palmtree,
  church: Landmark,
  archive: Archive,
  building: Building2,
  fortress: Shield,
  camera: TowerControl,
  map: Map,
  carriage: Star,
  bridge: TowerControl,
  wind: Wind,
  waves: Waves,
  shell: Shell,
  landmark: Landmark,
  sun: Sun,
  star: Star,
}

export function getIcon(iconKey: IconKey) {
  return iconMap[iconKey]
}
