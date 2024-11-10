import Image from 'next/image';

import { cn } from '@/libs';
import { Progress } from '@/components/ui';
import { useGroupCategoryVariant } from './categoty.variant';

export default function Category({ category }: CategoryProps) {
  const { bg, icon, textMain, textCount, circleBg, progressIndicator } =
    useGroupCategoryVariant(category);

  return (
    <div className={cn('flex gap-[18px] rounded-xl p-4', bg)}>
      <figure className={cn('flex-center size-10 rounded-full', circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn('font-medium', textMain)}>{category.name}</h2>
          <h3 className={cn('font-normal', textCount)}>{category.count}</h3>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className="h-2 w-full"
          indicatorClassName={progressIndicator}
        />
      </div>
    </div>
  );
}
