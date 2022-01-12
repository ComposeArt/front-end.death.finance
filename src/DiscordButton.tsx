import * as React from "react"
import {
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaDiscord } from "react-icons/fa"

type DiscordButtonProps = Omit<IconButtonProps, "aria-label">

export const DiscordButton: React.FC<DiscordButtonProps> = (props) => {
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={()=> window.open("https://discord.gg/mTZAV2cwnY", "_blank")}
      icon={<FaDiscord />}
      aria-label={`Discord`}
      {...props}
    />
  )
}
