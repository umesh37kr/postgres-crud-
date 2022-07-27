class CustomErrorHandler extends Error{
    constructor(status, msg){
        super()
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
       return new CustomErrorHandler(409, message)
    }

    static notFound(message){
        return new CustomErrorHandler(404, message)
     }

     static badRequest(message){
        return new CustomErrorHandler(400, message)
     }

     static sucess(message){
        return new CustomErrorHandler(200, message)
     }
}

module.exports = CustomErrorHandler