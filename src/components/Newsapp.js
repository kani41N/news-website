import React, { useState, useEffect } from 'react';
import Cards from './Cards';


function Newsapp() {

    const [search, setSearch] = useState('india');
    const [newsData, setNewsData] = useState(null);
    const API_KEY = 'dd51ded935e542189f3f0d151b14eb07';

    const getData = async() => {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
        const jsonData = await response.json();
        console.log(jsonData.articles);
        setNewsData(jsonData.articles);
    }

    const handleInput = (e) => {
       console.log(e.target.value);
       setSearch(e.target.value);
      
    }

    useEffect(() => {
        getData()
    }, []);

    const inputDatas = (e) => {
       setSearch(e.target.value);
    }

  return (
    <div className='flex flex-col gap-32'>
    <div>
     <nav className='flex justify-between py-10 px-8 bg-yellow-500 fixed w-full '>
        <div>
            <h1 className='font-bold text-xl'>Trendy News</h1>
        </div>
        <div>
            <ul>
                <a href=''>All News</a>
                <a href=''>Trending</a>
            </ul>
        </div>
        <div>
            <input 
             onChange={handleInput}
             type='search' 
             value={search}
             className='border-2 border-gray-700 rounded focus:outline-none px-2 py-1' 
             placeholder='Search news...'/>
            <button 
             onClick={getData}
             className='px-2 py-2 bg-gray-800 hover:bg-gray-900 text-yellow-500 hover:text-white text-[14px] ml-3 rounded'>Search</button>
        </div>
     </nav>

     
    </div>

     <div>
        <div className=''>
          <p className='text-xl font-semibold text-center py-6'>Stay updated with trendy news</p>
        </div>

        <div className='flex justify-center gap-5'> 
            <button onClick={inputDatas} value='sports' className='px-4 py-2  bg-yellow-700 rounded-2xl text-yellow-500 font-medium'>Sports</button>
            <button onClick={inputDatas} value='politics' className='px-4 py-2  bg-yellow-700 rounded-2xl text-yellow-500 font-medium'>Politics</button>
            <button onClick={inputDatas} value='entertaiment' className='px-4 py-2  bg-yellow-700 rounded-2xl text-yellow-500 font-medium'>Entertaiment</button>
            <button onClick={inputDatas} value='heath' className='px-4 py-2  bg-yellow-700 rounded-2xl text-yellow-500 font-medium'>Health</button>
            <button onClick={inputDatas} value='fitness' className='px-4 py-2  bg-yellow-700 rounded-2xl text-yellow-500 font-medium'>Fitness</button>
        </div>
    </div>

     <div className='mt-[-110px]'>
        {newsData ?  <Cards data={newsData}/> : null }
        
        </div>
   </div>


  )
}

export default Newsapp;