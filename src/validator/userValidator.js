import Joi from 'joi';

const updateBody = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: true } })
		.required(),
	name: Joi.string().required(),
});

export { updateBody };
