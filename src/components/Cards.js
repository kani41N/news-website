import React from 'react';

function Cards({ data }) {
    console.log(data);

    const readMore = (url) => {
        window.open(url);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {data.map((curItem, index) => (
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={index}>
                    <img className="w-full h-48 object-cover" src={curItem.urlToImage} alt={curItem.title} />
                    <div className="px-6 py-4">
                        <a 
                         onClick={() => readMore(curItem.url)}
                         className="font-bold text-xl mb-2 cursor-pointer hover:underline">{curItem.title}</a>
                        <p className="text-gray-700 text-base">
                            {curItem.description}
                        </p> 
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <button 
                         onClick={() => window.open(curItem.url)}
                         className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                            Read more
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Cards;
