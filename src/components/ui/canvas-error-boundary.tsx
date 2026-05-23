'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { SystemAnnotation } from '@/components/ui/system-annotation';

interface Props {
  children?: ReactNode;
  fallbackLabel?: string;
}

interface State {
  hasError: boolean;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Context Lost or Render Failed:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#020917] pointer-events-none z-50">
          <SystemAnnotation 
            label="STATUS" 
            value={this.props.fallbackLabel || "SYSTEM_OFFLINE"} 
            className="opacity-50 text-red-500" 
          />
        </div>
      );
    }

    return this.props.children;
  }
}
