import React from "react";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, message: "" };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, message: error?.message || "Unexpected error" };
	}

	componentDidCatch(error, errorInfo) {
		// eslint-disable-next-line no-console
		console.error("Application error:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen flex items-center justify-center">
					<div className="container-padded text-center">
						<h2 className="text-2xl font-bold text-midnight">Something went wrong.</h2>
						<p className="mt-2 text-midnight/70">{this.state.message}</p>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}





