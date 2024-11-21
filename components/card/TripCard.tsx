import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function TripCard({ href, voyage }) {
    const router = useRouter();
    
    const imageUrl = voyage.images_voyage && voyage.images_voyage.length > 0
        ? voyage.images_voyage[0].image
        : '/images/artisanat/aucun_image.jpeg';

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-2xl w-full">
            {/* Main Content Container */}
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                    <Image
                        src={imageUrl}
                        alt='Image_Voyages'
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 hover:scale-110"
                    />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <h2 className="text-xl font-bold text-gray-800">
                                {voyage.nom_voyage}
                            </h2>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                By - {voyage.nom_tour_operateur}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-blue-600">${voyage.prix_voyage}</span>
                            <p className="text-sm text-gray-600">per person</p>
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 text-gray-700 mb-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium">
                            {voyage.date_debut} - {voyage.date_fin}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mb-4 pr-2">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {voyage.description_voyage}
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-auto space-y-3">
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{voyage.ville_depart} - {voyage.destination_voyage}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <span className="text-sm">
                                Travel distance: <span className="font-medium">{voyage.distance} km</span>
                            </span>
                        </div>

                        <button
                            onClick={() => router.push(href)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4"
                        >
                            <span>View Details</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

//Add these to your tailwind.config.js:

//module.exports = {
//    theme: {
//        extend: {},
//    },
//    plugins: [
//        require('tailwind-scrollbar'),
//    ],
//}

//npm install tailwind-scrollbar