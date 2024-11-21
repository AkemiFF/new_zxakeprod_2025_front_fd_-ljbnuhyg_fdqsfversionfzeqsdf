import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ReviewAboutProps {
  nom: string
  rate: number
  review: string
  userPhoto?: string
  username: string
  localisation: string
}

export default function ReviewAbout({ nom, rate, review, userPhoto, username, localisation }: ReviewAboutProps) {
  const getLabelAvatar = (str: string) => {
    return str.length > 0 ? str.charAt(0) : ''
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{nom}</h3>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rate ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <ScrollArea className="h-44 w-full">
        <p className="text-sm text-gray-600">{review}</p>
      </ScrollArea>
      <div className="flex items-center space-x-3">
        <Avatar className="border border-gray-200">
          <AvatarImage src={userPhoto} alt={username} />
          <AvatarFallback>{getLabelAvatar(username)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {localisation}
          </p>
        </div>
      </div>
    </div>
  )
}

