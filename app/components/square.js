
'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Square = () => {
    const [counts, setCounts] = useState({
        temporaryOrdersCount: 0,
        totalForCurrentDate: 0,
        totalForPreviousMonth: 0, 
        totalBalance: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for existing counts
                const response = await axios.get('https://absback1.vercel.app/api/hotel/counts');
                setCounts(response.data);

                // Fetch data for temporary orders count
                const temporaryOrdersResponse = await axios.get('https://absback1.vercel.app/api/order/temporary-orders-count');
                setCounts(prevCounts => ({
                    ...prevCounts,
                    temporaryOrdersCount: temporaryOrdersResponse.data.temporaryOrdersCount,
                }));

                // Fetch data for total amount for the current date
                const totalForCurrentDateResponse = await axios.get('https://absback1.vercel.app/api/order/total-amount-for-current-date');
                setCounts(prevCounts => ({
                    ...prevCounts,
                    totalForCurrentDate: totalForCurrentDateResponse.data.totalForCurrentDate,
                }));

                // Fetch data for total amount for the previous month
                const totalForPreviousMonthResponse = await axios.get('https://absback1.vercel.app/api/order/total-amount-for-previous-month');
                setCounts(prevCounts => ({
                    ...prevCounts,
                    totalForPreviousMonth: totalForPreviousMonthResponse.data.totalForPreviousMonth,
                }));

                const totalBalanceResponse = await axios.get('https://absback1.vercel.app/api/purchase/purchases-total');
                setCounts(prevCounts => ({
                    ...prevCounts,
                    totalBalance: totalBalanceResponse.data.totalBalance,
                }));

       } catch (error) {
           console.error('Error fetching data:', error);
       }
   };

        fetchData();
    }, []);


    return (
        <div>
            <div className="flex items-center text-gray-800 mb-2 mt-11 font-sans">
                <div className="p-4 w-full">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 sm:col-span-6 md:col-span-3">
                        <div className="flex flex-row bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 shadow-md rounded p-4 whitespace-nowrap">
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-white">    
                                    <img
                                        src={`/cut.png`}
                                        className="h-8 w-8 object-cover rounded-md"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col flex-grow ml-4">
                                    <div className="text-sm text-white font-medium">Today&aposs Sale</div>
                                    <div className="font-bold text-sm text-white">
                                        {counts.totalForCurrentDate}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-12 sm:col-span-6 md:col-span-3">

                        <div className="flex flex-row bg-gradient-to-r from-orange-500 to-yellow-500 shadow-md rounded p-4 whitespace-nowrap">

                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-white">  
                                    <img
                                        src={`/chair.png`}
                                        className="h-8 w-8 object-cover rounded-md"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col flex-grow ml-4">
                                    <div className="text-sm text-white font-medium">Total Working Tables</div>
                                    <div className="font-bold text-sm text-white">
                                        {counts.temporaryOrdersCount}
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="col-span-12 sm:col-span-6 md:col-span-3">

                            <div className="flex flex-row bg-gradient-to-r from-pink-600 to-pink-400 shadow-md rounded p-4 whitespace-nowrap">
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-white">                             
                                    <img
                                        src={`/new-year.png`}
                                        className="h-8 w-8 object-cover rounded-md"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col flex-grow ml-4">
                                    <div className="text-sm text-white whitespace-nowrap font-medium">Monthly Sale</div>
                                    <div className="font-bold text-sm text-white">
                                        {counts.totalForPreviousMonth}
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="col-span-12 sm:col-span-6 md:col-span-3">

                            <div className="flex flex-row bg-gradient-to-r from-blue-500 to-blue-300 shadow-md rounded p-4 whitespace-nowrap">
                                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-white">
                                    <img
                                        src={`/wallet.png`}
                                        className="h-8 w-8 object-cover rounded-md"
                                        alt=""
                                    />
                                </div>
                                <div className="flex flex-col flex-grow ml-4">
                                    <div className="text-sm text-white font-medium">Total Stock Amount</div>
                                    <div className="font-bold text-sm text-white">
                                    {counts.totalBalance}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Square