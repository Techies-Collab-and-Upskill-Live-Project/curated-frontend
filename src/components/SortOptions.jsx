import React, { useState } from 'react';
import BeautifulButton from './BeautifulButton';

const options = ["All", "Sort by Topic", "Sort by Date", "Sort By Relevance", "Sort By Hashtags"];

// Map each option to a specific width in pixels
const widthMap = {
    "All": 140,
    "Sort by Topic": 142,
    "Sort by Date": 142,
    "Sort By Relevance": 191,
    "Sort By Hashtags": 188,
};

export default function SortOptions() {
    const [selected, setSelected] = useState("All");

    return (
        <div className="flex flex-wrap py-8 mb-3 gap-4 pb-2">
            {options.map((label) => (
                <BeautifulButton
                    key={label}
                    variant={selected === label ? 'playlist' : 'default'}
                    className="text-[16px] py-3 rounded-[8px]"
                    style={{ width: `${widthMap[label]}px` }}
                    onClick={() => setSelected(label)}
                >
                    {label}
                </BeautifulButton>
            ))}
        </div>
    );
}
