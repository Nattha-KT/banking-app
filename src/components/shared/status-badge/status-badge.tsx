'use client';
import {
  StatusBadgeVariantProps,
  statusBadgeVariants,
} from './status-badge.variant';

export const StatusBadge = ({ variant }: StatusBadgeVariantProps) => {
  return (
    <div className={statusBadgeVariants({ variant })}>
      {/* <div className="mr-2 size-2 h-2 w-2 rounded-full" /> */}
      <p>● {variant}</p>
    </div>
  );
};
