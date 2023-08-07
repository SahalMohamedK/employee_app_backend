import HttpException from "./http.exception";

class ValidationException extends HttpException{
    public errors: object;

    constructor(status: number, errors: object){
        super(status, '')
        this.errors = errors
    }
}

export default ValidationException;