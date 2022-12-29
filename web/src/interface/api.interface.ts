
export interface ApiResponse<T> {
	message: string,
	success: boolean,
	status: number,
	payload: T,
}