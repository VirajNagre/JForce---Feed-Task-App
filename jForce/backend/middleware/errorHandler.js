import dotenv from 'dotenv'
dotenv.config()

const errorHandler = (err,req,res,next)=>{
    let statuscode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId'){
        message = 'Resource not found'
        statuscode = 404;
    }

    res.status(statuscode)
    res.json(
        {
            message,
            stack:err.stack,
        }
    )
}

export { errorHandler }

