export const errorHandle = (err, _, res, _) => {
    let status = err.status || 500
    res.status(status).json(err.message)
}