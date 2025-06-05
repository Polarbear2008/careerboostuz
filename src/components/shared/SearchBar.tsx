
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  variant?: "default" | "minimal";
  onSearch?: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "Search for any skill or service...",
  className,
  variant = "default",
  onSearch,
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "w-full",
        variant === "default" 
          ? "relative flex items-center" 
          : "flex items-center",
        className
      )}
    >
      {variant === "default" && (
        <button
          type="button"
          onClick={handleSearchClick}
          className="absolute inset-y-0 left-0 flex items-center pl-4 hover:text-primary transition-colors"
        >
          <Search className="h-5 w-5 text-muted-foreground hover:text-primary" />
        </button>
      )}
      
      <input
        type="search"
        name="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={cn(
          "w-full transition-all focus-visible:ring-2 focus-visible:ring-offset-0",
          variant === "default" 
            ? "pl-12 pr-4 py-3 rounded-full border bg-background shadow-sm focus-visible:border-primary" 
            : "border-0 border-b bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0 py-2"
        )}
      />
      
      {variant === "minimal" && (
        <button type="submit" className="p-2 hover:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
