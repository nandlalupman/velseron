"use client";

import React from "react";
import { CoinFallback } from "@/components/coin/CoinFallback";
import type { Metal } from "@/data/coins";

interface Props {
  children: React.ReactNode;
  fallbackMetal?: Metal;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("WebGL/R3F Error caught by boundary:", error);
  }

  render() {
    if (this.state.hasError) {
      // If no specific fallback metal provided, just show a graceful empty state
      // but typically we pass 'gold' or 'silver' depending on context.
      return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4">
          <CoinFallback metal={this.props.fallbackMetal || "gold"} size={300} />
        </div>
      );
    }
    return this.props.children;
  }
}
