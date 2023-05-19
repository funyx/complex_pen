import { InvalidFormat } from "./error/invalidFormat"
import { Partner } from "./interface"

export const partnerParser = (input: string): Partner[] => {
    let partners: Partner[] = []
    for (const partnerRecord of input.split(/\r?\n/)) {
        if (partnerRecord !== undefined) {
            try {
                const partnerData = JSON.parse(partnerRecord)
                partners.push({
                    latitude: parseInt(partnerData.latitude),
                    longitude: parseInt(partnerData.longitude),
                    partner_id: parseInt(partnerData.partner_id),
                    name: partnerData.name
                })
            } catch (e) {
                throw new InvalidFormat("Invalid record format")
            }
        }
    }

    return partners;
}