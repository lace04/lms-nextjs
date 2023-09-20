import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'rounded-full flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-sky-100',
        success: 'bg-emerald-100',
        warn: 'bg-yellow-100',
        secondary: 'bg-purple-100',
        destructive: 'bg-red-100',
      },
      iconVariant: {
        default: 'text-sky-700',
        success: 'text-emerald-700',
        warn: 'text-yellow-700',
        secondary: 'text-purple-700',
        destructive: 'text-red-700',
      },
      size: {
        default: 'p-2',
        sm: 'p-1',
        md: 'p-3',
        lg: 'p-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariant = cva('', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
      warn: 'text-yellow-700',
      secondary: 'text-purple-700',
      destructive: 'text-red-700',
    },
    size: {
      default: 'w-5 h-5',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type backgroundVariantsProos = VariantProps<typeof backgroundVariants>;
type iconVariantProps = VariantProps<typeof iconVariant>;

interface IconBadgeProps extends backgroundVariantsProos, iconVariantProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariant({ variant, size }))} />
    </div>
  );
};
