import { useState, useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (props.id) {
      checkIfClientLikedAccomodation(props.id)
        .then(setIsLiked)
        .catch((error) => console.error('Error fetching like status:', error));
    }
  }, [props.id, user]);

  const handleLikeClick = () => {
    if (!user) {
      setShowToast(true);
      return;
    }
    LikeAccomodation(props.id)
      .then(() => {
        setIsLiked((prev) => !prev);
        setNbLike((prevNbLike) => (isLiked ? prevNbLike - 1 : prevNbLike + 1));
      })
      .catch((error) => console.error('Error liking the product:', error));
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow max-w-md">
      <div className="relative h-56">
        <Image
          className="rounded-t-lg object-cover"
          src={props.image}
          alt={props.name}
          layout="fill"
        />
        <div className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md">
          <svg
            className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            fill={isLiked ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={handleLikeClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{props.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{props.localisation}</p>
        <p className="text-sm text-gray-600 h-16 overflow-hidden">{props.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-800">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="ml-1">{props.note.toFixed(1)}</span>
          </div>
          <button
            onClick={props.onClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Details
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
          <p>
            No user connected{' '}
            <Link href="/users/login" className="underline">
              Login here
            </Link>.
          </p>
          <button
            onClick={() => setShowToast(false)}
            className="absolute top-2 right-2"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
