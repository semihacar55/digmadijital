import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-neutral-900 text-white p-10 font-mono">
                    <h1 className="text-3xl text-red-500 font-bold mb-4">Something went wrong!</h1>
                    <div className="bg-black/50 p-6 rounded-xl border border-red-500/20">
                        <h2 className="text-xl text-red-400 mb-2">{this.state.error?.name}</h2>
                        <p className="mb-4 text-gray-300">{this.state.error?.message}</p>
                        <pre className="text-xs text-gray-500 overflow-auto max-h-96">
                            {this.state.error?.stack}
                        </pre>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
