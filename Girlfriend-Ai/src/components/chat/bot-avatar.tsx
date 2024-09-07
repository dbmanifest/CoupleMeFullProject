import { Avatar, AvatarImage } from "../ui/avatar"
import { isBase64Image } from "@/lib/utils"; // Add this import

interface BotAvatarProps {
    src: string
}

export const BotAvatar =({
    src
}: BotAvatarProps)=>{
    return(
        <Avatar className="h-12 w-12">
            <AvatarImage src={isBase64Image(src) ? `data:image/png;base64,${src}` : src}/>
        </Avatar>
    )
}