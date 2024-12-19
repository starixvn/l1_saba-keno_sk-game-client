import {
    Choices,
    StatisticRuleMapping,
    GetChoiceTranslate,
    getTotalPoint,
    getLabelFromFiveElements,
    StatisticRuleEntriesBigSmall,
    StatisticRuleEntriesOddEven,
    StatisticRuleEntriesFiveElements,
} from "../../../src/components/games/keno-pro-max/keno-pro-max-helper";
import { TFunction } from "next-i18next";

describe("Keno Pro Max Helper", () => {
    const mockT: TFunction = ((key: string) => key) as TFunction;

    describe("Choices", () => {
        it("should have correct choices", () => {
            expect(Choices).toEqual({
                big: "big",
                small: "small",
                even: "even",
                odd: "odd",
                gold: "gold",
                wood: "wood",
                water: "water",
                fire: "fire",
                earth: "earth",
            });
        });
    });

    describe("StatisticRuleMapping", () => {
        describe('StatisticRuleEntriesBigSmall', () => {
            const [bigKey, bigFunction] = StatisticRuleEntriesBigSmall.find(([key]) => key === 'big')!;
            const [smallKey, smallFunction] = StatisticRuleEntriesBigSmall.find(([key]) => key === 'small')!;

            test('big function calculates correct percentage', () => {
                const countResult = { big: 30, small: 20 };
                const total = 50;

                const result = bigFunction(countResult, total);
                expect(result).toBe(60); // (30 / 50) * 100 = 60
            });

            test('big function returns 0 when countResult[big] is undefined', () => {
                const countResult = { small: 20 };
                const total = 50;

                const result = bigFunction(countResult, total);
                expect(result).toBe(0);
            });

            test('small function calculates correct percentage', () => {
                const countResult = { big: 30, small: 20 };
                const total = 50;

                const result = smallFunction(countResult, total);
                expect(result).toBe(40); // 100 - ((30 / 50) * 100) = 40
            });

            test('small function returns 100 when countResult[big] is undefined', () => {
                const countResult = { small: 20 };
                const total = 50;

                const result = smallFunction(countResult, total);
                expect(result).toBe(100);
            });
        });;

        describe('StatisticRuleEntriesOddEven', () => {
            const [evenKey, evenFunction] = StatisticRuleEntriesOddEven.find(([key]) => key === 'even')!;
            const [oddKey, oddFunction] = StatisticRuleEntriesOddEven.find(([key]) => key === 'odd')!;

            describe('even function', () => {
                it('calculates percentage when countResult[even] is present', () => {
                    const countResult = { even: 40, odd: 10 };
                    const total = 50;
                    const result = evenFunction(countResult, total);
                    expect(result).toBe(80); // (40 / 50) * 100 = 80
                });

                it('returns 0 when countResult[even] is undefined', () => {
                    const countResult = { odd: 10 };
                    const total = 50;
                    const result = evenFunction(countResult, total);
                    expect(result).toBe(0);
                });
            });

            describe('odd function', () => {
                it('calculates complement percentage of even when countResult[even] is present', () => {
                    const countResult = { even: 40, odd: 10 };
                    const total = 50;
                    const result = oddFunction(countResult, total);
                    expect(result).toBe(20); // 100 - ((40 / 50) * 100) = 20
                });

                it('returns 100 when countResult[even] is undefined', () => {
                    const countResult = { odd: 10 };
                    const total = 50;
                    const result = oddFunction(countResult, total);
                    expect(result).toBe(100); // Complement of undefined even
                });
            });
        });

        describe('StatisticRuleEntriesFiveElements', () => {
            const functionsMap = Object.fromEntries(StatisticRuleEntriesFiveElements);

            describe('gold function', () => {
                it('calculates correct percentage when countResult[gold] is present', () => {
                    const countResult = { gold: 30 };
                    const total = 100;
                    const result = functionsMap.gold(countResult, total);
                    expect(result).toBe(30); // (30 / 100) * 100 = 30
                });

                it('returns 0 when countResult[gold] is undefined', () => {
                    const countResult = {};
                    const total = 100;
                    const result = functionsMap.gold(countResult, total);
                    expect(result).toBe(0);
                });
            });

            describe('wood function', () => {
                it('calculates correct percentage when countResult[wood] is present', () => {
                    const countResult = { wood: 20 };
                    const total = 100;
                    const result = functionsMap.wood(countResult, total);
                    expect(result).toBe(20); // (20 / 100) * 100 = 20
                });

                it('returns 0 when countResult[wood] is undefined', () => {
                    const countResult = {};
                    const total = 100;
                    const result = functionsMap.wood(countResult, total);
                    expect(result).toBe(0);
                });
            });

            describe('water function', () => {
                it('calculates correct percentage when countResult[water] is present', () => {
                    const countResult = { water: 40 };
                    const total = 200;
                    const result = functionsMap.water(countResult, total);
                    expect(result).toBe(20); // (40 / 200) * 100 = 20
                });

                it('returns 0 when countResult[water] is undefined', () => {
                    const countResult = {};
                    const total = 100;
                    const result = functionsMap.water(countResult, total);
                    expect(result).toBe(0);
                });
            });

            describe('fire function', () => {
                it('calculates correct percentage when countResult[fire] is present', () => {
                    const countResult = { fire: 50 };
                    const total = 100;
                    const result = functionsMap.fire(countResult, total);
                    expect(result).toBe(50); // (50 / 100) * 100 = 50
                });

                it('returns 0 when countResult[fire] is undefined', () => {
                    const countResult = {};
                    const total = 100;
                    const result = functionsMap.fire(countResult, total);
                    expect(result).toBe(0);
                });

            });

            describe('earth function', () => {
                it('calculates complement percentage correctly', () => {
                    const countResult = { gold: 30, wood: 20, water: 10, fire: 10 };
                    const total = 100;
                    const result = functionsMap.earth(countResult, total);
                    expect(result).toBe(30); // 100 - (30 + 20 + 10 + 10) = 30
                });

                it('returns 100 when all other elements are undefined', () => {
                    const countResult = {};
                    const total = 100;
                    const result = functionsMap.earth(countResult, total);
                    expect(result).toBe(100);
                });
            });
        });
    });

    describe("GetChoiceTranslate", () => {
        it("should return translated choices", () => {
            const translations = GetChoiceTranslate(mockT);
            expect(translations).toEqual({
                total: "kenopromax:total",
                big: "kenopromax:big",
                small: "kenopromax:small",
                even: "kenopromax:even",
                odd: "kenopromax:odd",
                gold: "kenopromax:gold",
                wood: "kenopromax:wood",
                water: "kenopromax:water",
                fire: "kenopromax:fire",
                earth: "kenopromax:earth",
            });
        });
    });

    describe("getTotalPoint", () => {
        it("should return the total points from the result array", () => {
            const result = [1, 2, 3, 4];
            const totalPoints = getTotalPoint(result);
            expect(totalPoints).toBe(10);
        });

        it("should return 0 if result is empty", () => {
            const result: number[] = [];
            const totalPoints = getTotalPoint(result);
            expect(totalPoints).toBe(0);
        });

        it("should return 0 if result is undefined", () => {
            const totalPoints = getTotalPoint(undefined as any);
            expect(totalPoints).toBe(0);
        });
    });

    describe("getLabelFromFiveElements", () => {
        it("should return the first element that is true in settlementResult", () => {
            const settlementResult = {
                big: false,
                even: false,
                odd: false,
                small: false,
                gold: false,
                wood: true,
                water: false,
                fire: false,
                earth: false,
            };
            const label = getLabelFromFiveElements(settlementResult);
            expect(label).toBe("wood");
        });

        it("should return an empty string if settlementResult is undefined", () => {
            const label = getLabelFromFiveElements(undefined as any);
            expect(label).toBe("");
        });

        it("should return an empty string if no elements are true", () => {
            const settlementResult = {
                big: false,
                even: false,
                odd: false,
                small: false,
                gold: false,
                wood: false,
                water: false,
                fire: false,
                earth: false,
            };
            const label = getLabelFromFiveElements(settlementResult);
            expect(label).toBe(undefined);
        });
    });
}); 