import { partnerParser } from "../parser"
import { data } from "../__mocks__/partners"

describe('partnerParser', () => {
    it('should parse given data string format into Partner[]', () => {
        expect(
            partnerParser(data).length
        ).toBe(32)

        expect(
            partnerParser(data).pop()?.name
        ).toBe("Bombadil Rivendell")

        expect(
            partnerParser("\n").length
        ).toBe(0)
    })
})