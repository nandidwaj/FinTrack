import React from "react";
import { useState } from "react";
import "../styles/searchbar.css"

function SearchBar({onSearch,
    parent,
    placeholder = "Search...",
    showTypeFilter=true,
    showDateFilter=true,

})
{

    const[query,setQuery] = useState("");
    const[type,setType] = useState("");
    const[fromDate,setFromDate] = useState("");
    const[toDate,setToDate] = useState("");

    const handleSearch = () =>{
        onSearch({
            query,
            type,
            fromDate,
            toDate,
        });
    };

    return(
        <div className="searchbar-wrapper">
            <input type ="text" className="searchbar-input" placeholder={placeholder} value={query} onChange={(e)=>setQuery(e.target.value)}/>
            {showTypeFilter&&(<select className="searchbar-select" value={type} onChange={(e)=>setType(e.target.value)}>
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>)}
            {showDateFilter && (
                <>
                <input type="date" className="searchbar-date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)}/>
                <input type="date" className="searchbar-date" value={toDate} onChange={(e)=>setToDate(e.target.value)}/>
                </>
            )}
            <button className="searchbar-btn" onClick={handleSearch}>Search</button>
        </div>
    );
 
}

export default SearchBar;