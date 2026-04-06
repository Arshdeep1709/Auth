import yup, { Schema } from 'yup'

export const userSchema = yup.object({
    name: yup.string().trim().min(3, 'name should contain atleast 3 characters').required(),
    email: yup.string().email('email not valid').required(),
    password: yup.string().min(4, 'password must be 4 character long').required()
})

export const validateUser = (Schema) => async (req, res, next) => {
    try {
        await Schema.validate(req.body)
        next()
    } catch (err) {
        return res.status(400).json({ errors: err.errors })
    }
}