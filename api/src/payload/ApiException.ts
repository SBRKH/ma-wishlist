export class ApiException {
	private httpStatus: string;
	private message: string;

	constructor(httpStatus: string, message: string) {
		this.httpStatus = httpStatus;
		this.message = message;
	}

	public getHttpStatus(): string {
		return this.httpStatus;
	}

	public setHttpStatus(httpStatus: string) {
		this.httpStatus = httpStatus;
	}

	public getMessage(): string {
		return this.message;
	}

	public setMessage(message: string) {
		this.message = message;
	}
}