import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PopularTripCard({ voyage }) {
    const router = useRouter();
    const imageUrl = voyage && voyage.couverture_images && voyage.couverture_images.length > 0
        ? `${UrlConfig}${voyage.couverture_images[0].image}`
        : '/images/default-image.jpg';

    return (
        <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm">
            {/* Main Image */}
            <div className="relative h-60 w-full overflow-hidden">
                <Image 
                    src={imageUrl} 
                    alt={voyage?.nom_voyage || 'Default Title'} 
                    layout="fill"
                    objectFit="cover"
                    className="transform hover:scale-110 transition-transform duration-500"
                />
                
                {/* Top Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-sm font-medium">{voyage?.prix_voyage || 'N/A'} km</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span className="text-sm font-medium">{voyage?.like_count || 0}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {voyage?.nom_voyage || 'Default Title'}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">{voyage?.nom_tour_operateur || 'Default Operator'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">
                            {voyage?.ville_depart || 'Unknown City'} - {voyage?.destination_voyage || 'Unknown Destination'}
                        </span>
                    </div>
                </div>

                <div className="h-[70px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {voyage?.description_voyage || 'No Description Available'}
                    </p>
                </div>

                <button 
                    onClick={() => router.push(`/users/tour/${voyage?.id}`)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

//To make the scrollbar styling work, add this to your tailwind.config.js:


//module.exports = {
  //  theme: {
    //    extend: {},
    //},
    //plugins: [
    //    require('@tailwindcss/line-clamp'),
    //    require('tailwind-scrollbar'),
    //],
//}

//npm install @tailwindcss/line-clamp tailwind-scrollbar