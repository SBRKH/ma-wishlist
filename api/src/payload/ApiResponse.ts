export class ApiResponse<T> {
	private httpStatus = 201;
	private payload: T;
	private message = "Succès";

	constructor() {
	}

	withHttpStatus(httpStatus: number) {
		this.httpStatus = httpStatus;
		return this;
	}

	withPayload(payload: T) {
		this.payload = payload;
		return this;
	}

	withMessage(message: string) {
		this.message = message;
		return this;
	}

	build(): ApiResponse<T> {
		return this;
	}

	getHttpStatus() {
		return this.httpStatus;
	}

	getPayload() {
		return this.payload;
	}

	getMessage() {
		return this.message;
	}
}