'use client';
import { useState } from 'react';
import { SearchIcon, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebouncedCallback } from 'use-debounce';

export const Search = () => {
  const searchParams = useSearchParams();  
  const { push } = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = useDebouncedCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const params = new URLSearchParams(searchParams);
   
    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }
   
    push(`/search?${params.toString()}`);
  }, 300);

  const onClear = () => {
    setValue('');
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full items-center lg:w-[400px]"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
        <X onClick={onClear} className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition hover:opacity-75" />
      )}
      <Button
        type="submit"
        size="sm"
        variant="ghost"
        className="h-10 rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

export default Search;
