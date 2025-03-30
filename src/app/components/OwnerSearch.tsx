"use client";
import { useState } from 'react';

type SearchItem = {
  id: number;
  name: string;
};

const OwnerSearch = ({ onSelectionChange }: { onSelectionChange: (items: SearchItem[]) => void }) => {
  const [activeTab, setActiveTab] = useState<'Owners' | 'Law Firms' | 'Attorneys'>('Owners');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<SearchItem[]>([]);

  // Simplified mock data - just what's needed for search
  const tabData = {
    Owners: [
      { id: 1, name: 'Tesla, Inc.' },
      { id: 2, name: 'LEGALFORCE RAPC.' },
      { id: 3, name: 'SpaceX Inc.' },
      { id: 4, name: 'SpaceX Inc.' },
      { id: 5, name: 'Apple Inc.' },
      { id: 6, name:'Facebook Inc,'},
     
    ],
    'Law Firms': [
      { id: 1, name: 'LegalForce LLP' },
      { id: 2, name: 'Dentons' },
    ],
    'Attorneys': [
      { id: 1, name: 'John Smith, Esq.' },
      { id: 2, name: 'Sarah Johnson' },
    ]
  };

  const filteredItems = tabData[activeTab].filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (item: SearchItem, isChecked: boolean) => {
    const newSelectedItems = isChecked
      ? [...selectedItems, item]
      : selectedItems.filter(i => i.id !== item.id);
    
    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };

  return (
   
      <div className="flex flex-col gap-3 max-h-[256px]">
        {/* Tab headers */}
        <div className="flex gap-4 text-sm ">
          {(['Owners', 'Law Firms', 'Attorneys'] as const).map((tab) => (
            <button
              key={tab}
              className={`cursor-pointer pb-1 px-1 ${activeTab === tab 
                ? 'font-semibold border-b-2 border-black text-black' 
                : 'font-medium text-gray-500 hover:text-gray-700'}`}
              onClick={() => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search box */}
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            style={{
              backgroundImage: "url('/images/searchicon.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '12px center'
            }}
          />
        </div>

        {/* Results list */}
        <div className="max-h-[140px] overflow-y-auto mt-1  space-y-2 pr-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={`${activeTab}-${item.id}`} className="flex items-center p-1 hover:bg-gray-50 rounded">
                <input
                  type="checkbox"                  id={`item-${activeTab}-${item.id}`}
                  checked={selectedItems.some(selected => selected.id === item.id)}
                  onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                  className=" cursor-pointer mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label 
                  htmlFor={`item-${activeTab}-${item.id}`} 
                  className="text-sm text-gray-700 cursor-pointer flex-grow"
                >
                  {item.name}
                </label>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 p-2">No results found</p>
          )}
        </div>
      </div>
   
  );
};

export default OwnerSearch