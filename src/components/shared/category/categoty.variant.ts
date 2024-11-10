import { cva, VariantProps } from 'class-variance-authority';

export const topCategoryBgStyles = cva('', {
  variants: {
    category: {
      'in store': 'bg-cyan-50/60',
      online: 'bg-emerald-50/60',
      other: 'bg-amber-50/60 ',
    },
  },
  defaultVariants: {
    category: 'other',
  },
});

export const topCategoryIconStyles: Record<string, string> = {
  'in store': '/icons/monitor.svg',
  online: '/icons/coins.svg',
  other: '/icons/shopping-bag.svg',
};

export const topCategoryTextStyles = cva('', {
  variants: {
    category: {
      'in store': 'text-cyan-900 ',
      online: 'text-emerald-900',
      other: 'text-amber-900',
    },
  },
});

export const topCategoryCountStyles = cva('', {
  variants: {
    category: {
      'in store': 'text-cyan-700 ',
      online: 'text-emerald-700',
      other: 'text-amber-700',
    },
  },
});

export const topCategoryCircleStyles = cva('', {
  variants: {
    category: {
      'in store': 'bg-cyan-100',
      online: 'bg-emerald-100',
      other: 'bg-amber-100',
    },
  },
});

export const topCategoryProgressIndicator = cva('', {
  variants: {
    category: {
      'in store': 'bg-cyan-400',
      online: 'bg-emerald-400',
      other: 'bg-amber-400',
    },
  },
});

export type TopCategoryProps = VariantProps<typeof topCategoryBgStyles>;

export function useGroupCategoryVariant(category: CategoryCount) {
  const categoryName = category.name as typePaymentChanelStyle;
  const bg = topCategoryBgStyles({ category: categoryName });
  const icon =
    topCategoryIconStyles[category.name] || topCategoryIconStyles.other;
  const textMain = topCategoryTextStyles({ category: categoryName });
  const textCount = topCategoryCountStyles({ category: categoryName });
  const circleBg = topCategoryCircleStyles({ category: categoryName });
  const progressIndicator = topCategoryProgressIndicator({
    category: categoryName,
  });
  return { bg, icon, textMain, textCount, circleBg, progressIndicator };
}
