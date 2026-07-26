import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Builds the shop settlement statement entirely in the browser, from the
// same detail object the page already fetched — no backend PDF endpoint
// needed.
export function downloadPayoutPdf(detail) {
	const doc = new jsPDF();

	doc.setFontSize(16);
	doc.setFont(undefined, "bold");
	doc.text("XPoint — Shop Settlement Statement", 14, 18);

	doc.setFontSize(11);
	doc.setFont(undefined, "normal");
	doc.text(`Shop: ${detail.shopName || `Shop #${detail.shopId}`}`, 14, 28);
	doc.text(`Settlement date: ${detail.settlementDate}`, 14, 34);
	doc.text(`Status: ${detail.status}`, 14, 40);

	if (detail.bankDetails) {
		const b = detail.bankDetails;
		const payTo = b.upiId
			? `Paid to (UPI): ${b.upiId}`
			: `Paid to: ${b.accountHolderName} — A/C ${b.accountNumber}, IFSC ${b.ifsc}`;
		doc.text(payTo, 14, 46);
	}

	autoTable(doc, {
		startY: 54,
		head: [["Order ID", "Collected", "Sheets", "Amount (₹)"]],
		body: detail.orders.map((o) => [
			o.orderId,
			new Date(o.collectedAt).toLocaleDateString(),
			String(o.totalSheets),
			o.totalAmount.toFixed(2),
		]),
		foot: [["", "", "Total", detail.totalAmount.toFixed(2)]],
		headStyles: { fillColor: [2, 132, 199] }, // primary-500
		footStyles: { fillColor: [241, 245, 249], textColor: [11, 19, 43], fontStyle: "bold" },
		styles: { fontSize: 10 },
	});

	if (detail.paidReference) {
		const y = doc.lastAutoTable.finalY + 10;
		doc.text(`Paid reference: ${detail.paidReference}`, 14, y);
	}

	const filename = `${(detail.shopName || "shop").replace(/\s+/g, "-")}-${detail.settlementDate}.pdf`;
	doc.save(filename);
}
