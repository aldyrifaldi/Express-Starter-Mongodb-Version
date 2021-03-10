module.exports = async(err) => {
    let errors = {}

    // unique validator
    if (err.code == 11000) {
        let path = Object.keys(err.keyPattern)[0]
        errors[path] = {
            message: 'already exists',
            type: 'unique',
            path: path,
        }
        return [errors]
    }

    // other validator
    if (err.message.includes('User validation failed')) {
        const errorsObj = Object.values(err.errors)
        let kVal = {}

        // loop error exceptions
        errorsObj.forEach(({properties}) => {
            // set attributes to array object
            kVal[properties.path] = {
                message: properties.message,
                path: properties.path,
                value: properties.value,
                type: properties.type,
            } 
        })
        errors = [kVal] // set to errors variable
    }

    return errors;
}