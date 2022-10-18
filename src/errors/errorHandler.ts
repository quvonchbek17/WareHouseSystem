export class CustomErrorHandler extends Error {
	status: number

    constructor(message: any, status: number) {
		super()
        this.message = message || "Internal server error"
        this.status = status || 500
    }
	
    getErrorInfo() {
        return {
			status: this.status,
            message: this.message
        }
    }
}

class BadRequestError extends Error {}