'use clint';
import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/libs';

interface SidebarTooltipProps {
  content: string;
  children: ReactNode;
  defaultVisible?: boolean;
  className?: string;
}

export default function SidebarTooltip({
  content,
  children,
  defaultVisible = false,
  className = '',
}: SidebarTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip open={defaultVisible}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={cn('', className)}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
