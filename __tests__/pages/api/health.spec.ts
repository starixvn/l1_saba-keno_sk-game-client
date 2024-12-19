import { NextApiRequest, NextApiResponse } from "next";
import handler from "../../../src/pages/api/health";

const fakeDate = new Date('2024-12-20T00:00:00.000Z');

describe("Health API", () => {
    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(fakeDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("returns a 200 status and a JSON response with status and time", async () => {
        const req = {} as NextApiRequest;
        const jsonMock = jest.fn();

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jsonMock,
        } as unknown as NextApiResponse;

        // Call the handler
        handler(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: "ok",
            time: expect.any(Date),
        }));

        const response = jsonMock.mock.calls[0][0];

        expect(new Date(response.time).toISOString()).toEqual(response.time.toISOString());
    });
});
