module.exports = async(err) => {
    let errors = []
    if (err.message.includes('User validation failed')) {
        const errorsObj = Object.values(err.errors)
        errors = errorsObj.map(({properties}) => {
            console.log(properties);
            return {
                message: properties.message,
                path: properties.path,
                value: properties.value,
                type: properties.type,
            }
        })
    }
    
    return errors.length > 0 ? errors : []
}