import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
	{
		heading: { type: String, required: true },
		body: { type: String, required: true },
	},
	{ _id: false }
);

const ContentSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		sections: { type: [SectionSchema], default: [] },
	},
	{ timestamps: true }
);

const Content = mongoose.models.Content || mongoose.model("Content", ContentSchema);
export default Content;



