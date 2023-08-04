import { when } from "jest-when";
import MathUtil from "../utils/math.utils";

describe('Test arerage function', () => {
    test('Test average success case', () => {
        MathUtil.sum = jest.fn()
        when(MathUtil.sum).calledWith(4,4).mockReturnValueOnce(8);

        expect(MathUtil.avarage(4,4)).toBe(4);
    })

    test('Test average failure case', () => {
        MathUtil.sum = jest.fn()
        when(MathUtil.sum).calledWith(4,4).mockReturnValueOnce(8);
        expect(MathUtil.avarage(4,4)).not.toBe(3);
    })
})

// describe('Test abs function', () => {
//     test('Success case', () => {
//         for(let i = -10; i<4; i++){
//             expect(MathUtil.abs(i)).toBe(-i)
//         }
//     })
// })