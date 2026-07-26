import { Navigate, useLocation } from "react-router-dom";
import { getStoredAuthHeader } from "./payoutAuth.js";

// Quick client-side gate so we don't even attempt a fetch without a
// stored credential. The real enforcement still happens server-side —
// individual API calls handle 401s by clearing the stored header and
// bouncing back here.
export default function RequireAdminAuth({ children }) {
	const location = useLocation();
	const authHeader = getStoredAuthHeader();

	if (!authHeader) {
		return <Navigate to="/admin/payouts/login" state={{ from: location.pathname }} replace />;
	}

	return children;
}
