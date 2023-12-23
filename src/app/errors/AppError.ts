class AppError extends Error {
     public statusCode: number;
 
     constructor(statusCode: number, message: string, stack = ''){
         super(message);
         this.statusCode = statusCode;
 
         if(stack){
             this.statusCode = statusCode;
         }else{
            Error.captureStackTrace(this, this.constructor)
         }
     }
}



export default AppError