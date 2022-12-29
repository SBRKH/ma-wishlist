export class ApiResponse<T> {
	private httpStatus = 201;
	private payload: T;
	private message = "Success";
	private success: boolean

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

	withSuccess(success: boolean) {
		this.success = success;
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

	getSuccess() {
		return this.success;
	}
}