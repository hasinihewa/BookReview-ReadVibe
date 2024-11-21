import { FaArrowRight } from 'react-icons/fa';
export default () => {
    return (
        <div className="mt-12 mx-4 px-4 rounded-md border-l-4 border-blue-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
            <div className="flex justify-between py-3">
                <div className="flex">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rounded-full text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="self-center ml-3">
                        <span className="text-blue-300 font-semibold">
                            Success
                        </span>
                        <p className="text-blue-300 mt-1">
                            Your review added successfully.
                        </p>
                    </div>
                </div>
             


                <a href="/ReviewCard" className="flex items-center gap-x-2 text-white p-2 rounded-lg hover:bg-lightblue hover:text-black active:bg-gray-100 duration-150">
                <FaArrowRight className="text-blue-500" />
                </a>
            </div>
        </div>
    )
}
