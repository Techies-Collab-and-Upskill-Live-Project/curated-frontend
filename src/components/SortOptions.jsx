// components/SortOptions.jsx
import React, { useState } from 'react';
import BeautifulButton from './BeautifulButton';

const options = ["All", "Sort by Topic", "Sort by Date", "By Relevance", "By Hashtags"];

export default function SortOptions() {
    const [selected, setSelected] = useState("All");

    return (
        <div className="flex flex-wrap py-8 gap-2 pb-2">
            {options.map((label) => (
                <BeautifulButton
                    key={label}
                    variant={selected === label ? 'playlist' : 'default'}
                    className="text-sm px-14 py-3 rounded-[8px]"
                    onClick={() => setSelected(label)}
                >
                    {label}
                </BeautifulButton>
            ))}
        </div>
    );
}
