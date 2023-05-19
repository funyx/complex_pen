export interface GeoLocation {
    readonly latitude: number,
    readonly longitude: number,
    // @see https://github.com/funyx/complex_pen/issues/1
    // readonly altitude: number | undefined
}

export interface Partner extends GeoLocation {
    readonly partner_id: number,
    readonly name: string,
}