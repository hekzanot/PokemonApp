'use client';
import * as React from 'react';
import { Progress as MantineProgress } from '@mantine/core'; 
import { useId } from '@radix-ui/react-id';

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  const rootId = useId();

  return (
    <MantineProgress
      id={rootId}
      ref={ref}
      value={value}
      max={100}
      className={className}
      radius="xl"
      size="xl"
      animated
      {...props}
    />
  );
});

export { Progress };
