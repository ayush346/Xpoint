import mongoose from "mongoose";

const WaitlistSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, index: true },
		source: { type: String, default: "website" }
	},
	{ timestamps: true }
);

const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", WaitlistSchema);
export default Waitlist;






