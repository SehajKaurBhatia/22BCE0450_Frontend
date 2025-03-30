// SearchContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";

type SearchContextType = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchInitiated: boolean;
    setSearchInitiated: (initiated: boolean) => void;
    selectedOwners: { id: number; name: string }[];
    setSelectedOwners: (owners: { id: number; name: string }[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInitiated, setSearchInitiated] = useState(false);
    const [selectedOwners, setSelectedOwners] = useState<{ id: number; name: string }[]>([]);

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchInitiated,
                setSearchInitiated,
                selectedOwners,
                setSelectedOwners,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};
