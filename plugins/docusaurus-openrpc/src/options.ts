import { Joi } from "@docusaurus/utils-validation";

export const OptionsSchema = Joi.object({
	openRPCPath: Joi.string().required(),
	outputPath: Joi.string().required(),
	category: Joi.object({
		position: Joi.number().optional(),
		label: Joi.string().required(),
		collapsible: Joi.boolean().optional(),
		collapsed: Joi.boolean().optional(),
		className: Joi.string().optional(),
	}),
});
