import { cva } from 'class-variance-authority';
import React from 'react';

import { Card, CardDescription, CardTitle, Skeleton, Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';

interface Pokemon {
  description: string;
  image: string;
  name: string;
  pokemonId: number;
  types: string[];
}

interface PokemonCardContextValue {
  pokemon?: Pokemon;
}

const PokemonCardContext = React.createContext<PokemonCardContextValue>(
  {} as PokemonCardContextValue
);

interface PokemonCardProps extends React.ComponentProps<'div'> {
  pokemon?: Pokemon;
}

const PokemonCard = React.forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ children, className, pokemon, ...props }, ref) => {
    const value = React.useMemo(() => ({ pokemon }), [pokemon]);

    return (
      <Card ref={ref} className={cn('relative w-[350px] h-[400px]', className)} {...props}>
        <PokemonCardContext.Provider value={value}>{children}</PokemonCardContext.Provider>
      </Card>
    );
  }
);
PokemonCard.displayName = 'PokemonCard';

export interface PokemonCardBackgroundProps extends React.ComponentProps<'div'> {
  src: string;
}

const PokemonCardBackground = React.forwardRef<HTMLDivElement, PokemonCardBackgroundProps>(
  ({ className, src, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute top-0 left-0 bg-cover w-full h-full rounded-lg select-none',
        className
      )}
      style={{ backgroundImage: `url(${src})` }}
      {...props}
    />
  )
);
PokemonCardBackground.displayName = 'PokemonCardBackground';

const PokemonCardImage = React.forwardRef<HTMLImageElement, React.ComponentProps<'img'>>(
  ({ className, ...props }, ref) => {
    const pokemonContext = React.useContext(PokemonCardContext);
    const src = pokemonContext.pokemon?.image ?? props.src;

    if (!src) return null;

    return (
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <img
          ref={ref}
          alt='pokemon'
          className={cn('min-h-64 min-w-64 select-none', className)}
          src={src}
          style={{ imageRendering: 'pixelated' }}
          {...props}
        />
      </div>
    );
  }
);
PokemonCardImage.displayName = 'PokemonCardImage';

const PokemonCardImageSkeleton = React.forwardRef<HTMLDivElement, PokemonCardProps>(
  ({ children, className, pokemon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute h-full w-full left-0 top-0 flex justify-center items-center',
        className
      )}
      {...props}
    >
      <Spinner className='stroke-gray-300 size-12' />
    </div>
  )
);
PokemonCardImageSkeleton.displayName = 'PokemonCardImageSkeleton';

const PokemonCardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 absolute bottom-0 p-3 bg-gradient-to-b from-black/0 to-black/70 rounded-lg w-full',
        className
      )}
      {...props}
    />
  )
);
PokemonCardContent.displayName = 'CardFooter';

const PokemonCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const pokemonContext = React.useContext(PokemonCardContext);
  const title = pokemonContext.pokemon?.name ?? props.children;

  return (
    <CardTitle
      ref={ref}
      className={cn('text-white text-3xl capitalize mb-1', className)}
      {...props}
    >
      {title}
    </CardTitle>
  );
});
PokemonCardTitle.displayName = 'PokemonCardTitle';

const PokemonCardTitleSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('mb-1', className)} {...props}>
    <Skeleton className='h-10 w-1/2' {...props} />
  </div>
));
PokemonCardTitleSkeleton.displayName = 'PokemonCardTitleSkeleton';

const PokemonCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn('text-white text-xs font-light', className)}
    {...props}
  />
));
PokemonCardDescription.displayName = 'PokemonCardDescription';

const PokemonCardDescriptionSkeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('w-full', className)} {...props}>
    <Skeleton className='h-10' {...props} />
  </div>
));
PokemonCardDescriptionSkeleton.displayName = 'PokemonCardDescriptionSkeleton';

export const pokemonTypesVariants = cva<{ type: Record<string, string> }>(
  'rounded-lg text-[10px] py-0.5 px-2 text-white capitalize font-bold',
  {
    defaultVariants: {
      type: 'grass'
    },
    variants: {
      type: {
        bug: 'bg-lime-600 dark:lime-500',
        dark: 'bg-black dark:border-2 dark:bg-black',
        dragon: 'bg-indigo-600 dark:indigo-500',
        electric: 'bg-yellow-600 dark:yellow-500',
        fairy: 'bg-pink-600 dark:pink-500',
        fighting: 'bg-red-600 dark:red-500',
        fire: 'bg-orange-600 dark:orange-500',
        flying: 'bg-sky-600 dark:sky-500',
        ghost: 'bg-purple-600 dark:purple-500',
        grass: 'bg-green-600 dark:border-2 dark:bg-green-600',
        ground: 'bg-amber-600 dark:amber-500',
        normal: 'bg-neutral-600 dark:neutral-500',
        poison: 'bg-violet-600 dark:violet-500',
        rock: 'bg-stone-600 dark:stone-500',
        steel: 'bg-zinc-600 dark:zinc-500',
        water: 'bg-blue-600 dark:blue-500'
      }
    }
  }
);

export interface PokemonCardTypeProps extends React.ComponentProps<'div'> {
  children: string;
}

const PokemonType = React.forwardRef<HTMLDivElement, PokemonCardTypeProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn(pokemonTypesVariants({ className, type: children }))} {...props}>
      {children}
    </div>
  )
);
PokemonType.displayName = 'PokemonCardType';

interface PokemonCardTypesProps extends React.ComponentProps<'div'> {
  types?: string[];
}

const PokemonCardTypes = React.forwardRef<HTMLDivElement, PokemonCardTypesProps>(
  ({ className, ...props }, ref) => {
    const pokemonContext = React.useContext(PokemonCardContext);
    const types = pokemonContext.pokemon?.types ?? props.types ?? [];

    return (
      <div ref={ref} className={cn('flex gap-1', className)} {...props}>
        {types.map((type) => (
          <PokemonType key={type} className='text-white'>
            {type}
          </PokemonType>
        ))}
      </div>
    );
  }
);
PokemonCardTypes.displayName = 'PokemonCardTypes';

const PokemonCardTypesSkeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex gap-1', className)} {...props}>
      <Skeleton className='h-4 w-12' />
      <Skeleton className='h-4 w-12' />
    </div>
  )
);
PokemonCardTypesSkeleton.displayName = 'PokemonCardTypesSkeleton';

export {
  PokemonCard,
  PokemonCardBackground,
  PokemonCardContent,
  PokemonCardDescription,
  PokemonCardDescriptionSkeleton,
  PokemonCardImage,
  PokemonCardImageSkeleton,
  PokemonCardTitle,
  PokemonCardTitleSkeleton,
  PokemonCardTypes,
  PokemonCardTypesSkeleton,
  PokemonType
};
