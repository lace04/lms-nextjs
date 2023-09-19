'use client';
import { Button } from '@/components/ui/button';

function HomePage() {
  return (
    <div className="">
      <p className="text-3xl font-medium text-sky-700">HomePage</p>
      <Button
      variant='destructive'
        onClick={() => {
          alert('Hello');
        }}
      >
        Click Me
      </Button>
    </div>
  );
}

export default HomePage;
