import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
	return request(app)
		.post("/signup")
		.send({
			email: "abc@test.com",
			password: "password",
			name: "Test restaurant",
		})
		.expect(201)
});

it("returns a 400 with an invalid email", async () => {
	return request(app)
		.post("/signup")
		.send({
			email: "alskdflaskjfd",
			password: "password",
			name: "Test restaurant",
		})
		.expect(400)
});
