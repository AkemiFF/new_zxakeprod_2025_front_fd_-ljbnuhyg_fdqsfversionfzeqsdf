import { UrlConfig } from '@/util/config';

interface BookingHotelCardProps {
  hotel_image: {
    image: string;
  };
  hotel_name: string;
  hotel_location: string;
  check_in: Date | null;
  check_out: Date | null;
  guest: number | null;
  rooms: {
    chambre: {
      type_chambre: string;
    };
    prix_nuit_chambre: string;
  }[];
}

const BookingHotelCard = (props: BookingHotelCardProps) => {
  const getNombreJour = (date1: Date | null, date2: Date | null): number => {
    if (props.check_in && props.check_out) {
      let dateMin = date1 < date2 ? date1 : date2;
      let dateMax = date1 > date2 ? date1 : date2;
      const differenceInTime = dateMax.getTime() - dateMin.getTime();
      return (differenceInTime / (1000 * 3600 * 24)) + 1;
    }
    return 1;
  };

  const totalRoom = (price: string): number => {
    return (parseFloat(price) * getNombreJour(props.check_in, props.check_out));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/2">
          <img
            className="w-full h-64 object-cover"
            alt={props.hotel_image.image}
            src={UrlConfig.apiBaseUrl + props.hotel_image.image}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h2 className="text-white text-xl font-bold mb-2">
              Place to stay | {props.hotel_name}
            </h2>
            <div className="flex items-center text-white">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span className="text-sm">{props.hotel_location}</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-6">
          <div className="h-[241px] overflow-y-auto custom-scrollbar">
            {/* Tour Stay Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Tour stay summary
              </h3>
              <div className="h-px bg-gray-200 mb-4"></div>
              
              {props.check_in && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{props.check_in.toLocaleDateString()}</span>
                </div>
              )}
              
              {props.check_out && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{props.check_out.toLocaleDateString()}</span>
                </div>
              )}
              
              {props.guest && (
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600">Guest</span>
                  <span className="font-medium">{props.guest}</span>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Price breakdown
              </h3>
              <div className="h-px bg-gray-200 mb-4"></div>
              
              {props.rooms.length > 0 && props.rooms.map((room, index) => (
                <div key={index} className="mb-4">
                  <span className="text-sm text-gray-700 block mb-2">
                    Chambre : {room.chambre.type_chambre}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      ${room.prix_nuit_chambre} x {getNombreJour(props.check_in, props.check_out)} night
                    </span>
                    <span className="font-semibold text-blue-600">
                      ${totalRoom(room.prix_nuit_chambre)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHotelCard;

/*Add this CSS to your globals.css for custom scrollbar:

css

Copier
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}
This version includes:

Full TypeScript support
Booking.com-like styling with Tailwind CSS
Responsive design
Custom scrollbar styling
Proper TypeScript interfaces
Modern UI elements with proper spacing and typography
Gradient overlay for image text
Shadow and rounded corners
Flex layout for better responsiveness
SVG icon for location marker
Hover effects and transitions
Price emphasis with blue color (booking.com style)*/