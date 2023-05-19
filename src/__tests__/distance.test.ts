import { partnerParser } from "../parser";
import { distance, inCircle } from "../distance";
import { Partner } from "../interface";
import { data } from "../__mocks__/partners"

describe('distance', () => {
    it('should calculate the distance between plovdiv and sofia', () => {
        expect(
            distance(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                { latitude: 42.68576522158046, longitude: 23.319125305306535 }
            ).distance
        ).toEqual(131.93006103028935)
    })
    it('should calculate the distance between buckhingam palace and golden gate', () => {
        expect(
            distance(
                { latitude: 37.8114128, longitude: -122.479021 },
                { latitude: 51.5017693, longitude: -0.1408002 }
            ).distance
        ).toEqual(8615.686618137901)
    });

    it('should return 0 if two identical points are given', () => {
        expect(
            distance(
                { latitude: 51.516241843, longitude: 7.456494328 },
                { latitude: 51.516241843, longitude: 7.456494328 }
            ).distance
        ).toBe(0);
    });
});

describe('inCercle', () => {
    it('should filter targets within given circle radius', () => {
        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                [{ latitude: 42.68576522158046, longitude: 23.319125305306535 }],
                132
            ).pop()?.latitude
        ).toEqual(42.68576522158046)

        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                [{ latitude: 42.68576522158046, longitude: 23.319125305306535 }],
                131
            ).pop()?.latitude
        ).toBeUndefined()
    })

    it('should be able to filter partners', () => {
        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                100
            ).length
        ).toEqual(3)

        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                110
            ).length
        ).toEqual(3)

        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                120
            ).length
        ).toEqual(4)


        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                130
            ).length
        ).toEqual(6)


        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                140
            ).length
        ).toEqual(6)

        expect(
            inCircle(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                150
            ).length
        ).toEqual(28)
    })

    it('Test with given example params origin = office, radius = 100', () => {

        expect(
            inCircle(
                { latitude: 42.6665921, longitude: 23.351723 },
                partnerParser(data),
                100
            ).length
        ).toEqual(25)

        expect(
            // last partner in range is 29
            inCircle<Partner>(
                { latitude: 42.14425334441039, longitude: 24.749097545929303 },
                partnerParser(data),
                100
            ).sort((a, b) => (a.partner_id < b.partner_id) ? -1 : 1).pop()?.partner_id
        ).toEqual(29)
    })
});