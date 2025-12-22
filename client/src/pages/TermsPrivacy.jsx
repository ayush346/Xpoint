import PageHeader from "../components/PageHeader.jsx";
import Section from "../components/Section.jsx";

export default function TermsPrivacy() {
	const sections = [
		{
			heading: "Terms of Use – Xpoint",
			body:
				"Effective as of: 21 December 2025\n\n" +
				"1) Acceptance of Terms\n" +
				"These Terms of Use govern your access to and use of the Xpoint website, the Xpoint mobile application, and other print‑management services (collectively, the “Services”). By accessing or using the Services, you agree to be bound by these Terms of Use.\n\n" +
				"2) About Xpoint\n" +
				"The Services are offered under the brand “Xpoint,” owned and operated by Xpoint Technologies Pvt. Ltd. (“Xpoint”, “we”, “us”, or “our”).\n\n" +
				"3) Nature of Services\n" +
				"Xpoint is a print‑technology platform that connects users with independent print/xerox shops and digitizes document‑printing workflows. Xpoint does not own or operate print shops and has no control over services provided by shops.\n\n" +
				"4) Changes to Terms\n" +
				"We may update these Terms without prior notice. Please review this page periodically for the latest Terms.\n\n" +
				"5) Equipment and Infrastructure\n" +
				"Xpoint is not responsible for loss, damage, or malfunction of printing equipment or infrastructure at any print shop.\n\n" +
				"6) Account Security\n" +
				"You are responsible for the confidentiality of your login credentials. Xpoint is not responsible for misuse if another person accesses your account.\n\n" +
				"7) Suspension and Termination\n" +
				"We may suspend or terminate your account without notice if misuse, fraud, or a violation of these Terms is detected.\n\n" +
				"8) Orders and Cancellations\n" +
				"All print orders are treated as confirmed and cannot be cancelled, modified, or transferred after placement.\n\n" +
				"9) Payments\n" +
				"Payments may be made through online methods or other modes available on the platform. By transacting, you agree to the terms of the applicable payment gateway.\n\n" +
				"10) Refunds\n" +
				"Refunds, if any, are provided only if the selected print shop cancels the order due to unavailability of service or for reasons determined by the shop.\n\n" +
				"11) Service Quality\n" +
				"Xpoint is not responsible for the quality, accuracy, timeliness, or outcome of printing services, including misprints, faded prints, machine issues, or delays.\n\n" +
				"12) Eligibility\n" +
				"The Services are intended for individuals 18+ years of age. If individuals under 18 access the Services, Xpoint assumes no responsibility for such usage.\n\n" +
				"13) Communications\n" +
				"You agree to receive SMS, emails, and in‑app notifications for order confirmations, updates, and service communications.\n\n" +
				"14) Acceptable Use\n" +
				"You must not use the Services for unlawful, harmful, or unauthorized commercial activities. Misuse is solely attributable to the user.\n\n" +
				"15) Care of Devices\n" +
				"If hardware or devices are provided, you agree to handle them with due care. Xpoint may recover damages in cases of misuse or negligence.\n\n" +
				"16) Intellectual Property\n" +
				"Xpoint owns all IP in and to the Services (apps, website, software, branding). Any attempt to damage, imitate, reverse‑engineer, or misuse these platforms is a breach of these Terms.",
		},
		{
			heading: "Privacy Policy – Xpoint",
			body:
				"Last reviewed on: 21 December 2025\n\n" +
				"1) Introduction\n" +
				"This Privacy Policy describes how Xpoint collects, uses, discloses, and safeguards personal information through the website, mobile app, related services, offline interactions, and cookies/tracking technologies.\n\n" +
				"2) Commitment to Privacy and Definition of Personal Information\n" +
				"Personal Information includes contact details, account login information, and user feedback shared through the platform.\n\n" +
				"3) Collection and Use of Personal Information\n" +
				"Personal information is used for order processing, account maintenance, customer support, service communications, platform security, and service improvement.\n\n" +
				"4) Scope and Acceptance\n" +
				"By using the platform, you consent to the practices described in this Privacy Policy. Xpoint may update this policy periodically.\n\n" +
				"5) Sharing of Personal Information\n" +
				"Xpoint does not sell personal data. Data may be shared with print shops for order fulfillment, to comply with law, or in connection with business transfers.\n\n" +
				"6) Third‑Party Print Shops\n" +
				"Independent print shops provide their own services. Xpoint is not responsible for those services.\n\n" +
				"7) Data Security\n" +
				"Xpoint follows reasonable security practices, including those consistent with the Digital Personal Data Protection Act, 2023.\n\n" +
				"8) Data Retention\n" +
				"Personal data is retained only as long as necessary and is securely deleted thereafter.\n\n" +
				"9) Data Subject Rights\n" +
				"You may request access to, correction or deletion of, restriction on processing of, or export of your personal data, subject to applicable law.\n\n" +
				"10) Data Transfer\n" +
				"Personal data will not be transferred outside India unless lawful, consented to where required, and protected with appropriate safeguards.\n\n" +
				"11) Children’s Privacy\n" +
				"The Services are not intended for children under 13 years of age.\n\n" +
				"12) Contact Information\n" +
				"For privacy concerns, contact: contact@xpointweb.com.\n\n" +
				"13) Governing Law\n" +
				"This Privacy Policy is governed by the laws of India.",
		},
	];

	return (
		<>
			<PageHeader title="Terms &amp; Policies" subtitle="Last reviewed on: 21 December 2025" />
			<section className="container-padded py-10 md:py-16 grid gap-6 max-w-3xl mx-auto">
				{sections.map((s, i) => (
					<Section key={s.heading} index={i} heading={s.heading} body={s.body} renderLegal renderLegalHeadings justify />
				))}
			</section>
		</>
	);
}


