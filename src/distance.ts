import { GeoLocation } from "./interface"
import { toDegree, toRadian } from "./util"

/** 
 * Calculates the distance between two given geolocations using 2d model and a mean earth radius.
 * 
 * @param earthRadius IUGG mean earth radius in kilometers, from
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius.  Using a
 * default value  sphere with this radius results in an error of up to about 0.5%.
 */
export const distance = (origin: GeoLocation, target: GeoLocation, earthRadius: number = 6371.009): {
    distance: number,
    heading: number,
} => {
  const lat1 = toRadian(origin.latitude)
  const lat2 = toRadian(target.latitude)
  const dlat = toRadian(target.latitude - origin.latitude)
  const dlon = toRadian(target.longitude - origin.longitude)

  const a = Math.sin(dlat/2) * Math.sin(dlat/2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2) * Math.sin(dlon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  const distance = earthRadius * c

  const y = Math.sin(dlon) * Math.cos(lat2)
  const x = Math.cos(lat1) * Math.sin(lat2) -
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon)
  const heading = toDegree(Math.atan2(y, x))

  return { distance, heading }
}

/** 
 * filters targets within given radius
 * 
 * @param earthRadius IUGG mean earth radius in kilometers, from
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius.  Using a
 * default value  sphere with this radius results in an error of up to about 0.5%.
 */
export const inCircle = (origin: GeoLocation, targets: GeoLocation[], radius: number, earthRadius: number = 6371.009 ): GeoLocation[] => {
    return targets.filter((target) => distance(origin, target, earthRadius).distance <= radius)
}