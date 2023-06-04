import Joi from 'joi';

const signupBody = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: true } })
		.required(),
	name: Joi.string().required(),
	password: Joi.string().min(6).max(15).required(),
	c_password: Joi.any()
		.valid(Joi.ref('password'))
		.required()
		.error(errors => {
			errors[0].message = 'confirm password must be same';
			return errors;
		}),
});

export { signupBody };
