import request from "supertest";
import { app } from "../../app";

beforeEach(async () => {
	await request(app).post("/signup").send({
		email: "abc@test.com",
		password: "password",
		name: "Test restaurant",
	});
});

it("returns a 200 on successful add promotion API call", async () => {
	return request(app)
		.post("/api/merchant/promotion")
		.send({
			email: "abc@test.com",
			promotion: {
				startDate: "10/31/2020",
				endDate: "11/30/2020",
				item: "Matcha Icecream",
				discount: 10,
			},
		})
		.expect(200);
});

it("returns a 200 on successful update store hours API call", async () => {
	return request(app)
		.put("/api/merchant/storehours")
		.send({
			email: "abc@test.com",
			storeHours: [
				{
					startHour: 9,
					endHour: 19,
					dayOfWeek: 1,
				},
				{
					startHour: 9,
					endHour: 20,
					dayOfWeek: 2,
				},
				{
					startHour: 9,
					endHour: 20,
					dayOfWeek: 3,
				},
				{
					startHour: 9,
					endHour: 20,
					dayOfWeek: 4,
				},
				{
					startHour: 9,
					endHour: 20,
					dayOfWeek: 0,
				},
			],
		})
		.expect(200);
});
