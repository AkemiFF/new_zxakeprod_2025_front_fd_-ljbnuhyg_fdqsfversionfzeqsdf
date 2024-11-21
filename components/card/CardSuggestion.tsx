import { useState, useContext, useEffect, useRef } from 'react';
import LayoutContext from '@/layouts/context/layoutContext';
import { checkIfClientLikedAccomodation, LikeAccomodation } from '@/util/Like';
import Link from 'next/link';
import Image from 'next/image';

interface CardSuggestionProps {
  id: string;
  image: string;
  name: string;
  localisation: string;
  description: string;
  note: number;
  nb_like: number;
  onClick: () => void;
}

export default function CardSuggestion(props: CardSuggestionProps) {
  const [nbLike, setNbLike] = useState(props.nb_like);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(LayoutContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (props.id) {
        try {
          const liked = await checkIfClientLikedAccomodation(props.id);
          setIsLiked(liked);
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };

    if (user) {
      fetchLikeStatus();
    }
  }, [props.id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      setToastMessage('Please login to like this accommodation');
      setShowToast(true);
      return;
    }

    if (props.id) {
      try {
        await LikeAccomodation(props.id);
        setIsLiked((prev) => !prev);
        setNbLike((prevNbLike) => (isLiked ? prevNbLike - 1 : prevNbLike + 1));
      } catch (error) {
        console.error('Error liking the product:', error);
      }
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-sm">
      {/* Main Image */}
      <div className="relative h-48 w-full">
        <Image
          src={props.image}
          alt={props.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content Wrapper */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 mb-1">{props.name}</h3>
          <div className="flex items-center text-gray-600">
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
            <span className="text-sm">{props.localisation}</span>
          </div>
        </div>

        {/* Description */}
        <div className="h-[70px] overflow-y-auto custom-scrollbar mb-4">
          <p className="text-gray-600 text-sm">{props.description}</p>
        </div>

        {/* Rating and Like */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center bg-blue-800 text-white px-2 py-1 rounded-lg">
            <Image
              src="/images/star_filled.svg"
              alt="star"
              width={14}
              height={14}
              className="mr-1"
            />
            <span className="text-sm font-semibold">{props.note}</span>
          </div>

          <button
            onClick={handleLikeClick}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
          >
            <span className="text-sm">{nbLike}</span>
            <svg
              className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'stroke-current'}`}
              fill={isLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* View Button */}
        <button
          onClick={props.onClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          View Details
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          <p>{toastMessage}</p>
          <Link 
            href="/users/login"
            className="underline hover:text-blue-200 ml-2"
          >
            Login here
          </Link>
          <button
            onClick={() => setShowToast(false)}
            className="absolute top-2 right-2 text-white hover:text-blue-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}