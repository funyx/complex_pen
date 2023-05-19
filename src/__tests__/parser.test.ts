import { partnerParser } from "../parser"
import { data } from "../__mocks__/partners"
import { InvalidFormat } from "../error/invalidFormat"

describe('partnerParser', () => {
    it('should parse given data string format into Partner[]', () => {
        expect(
            partnerParser(data).length
        ).toBe(32)

        expect(
            partnerParser(data).pop()?.name
        ).toBe("Bombadil Rivendell")
    })
})

describe('partnerParser', () => {
    it('should throw exception if a line contains invalid json', () => {
        expect.assertions(1);

        try {partnerParser("\n").length} catch (e) {
            expect(e).toBeInstanceOf(InvalidFormat)
        }
    })
})