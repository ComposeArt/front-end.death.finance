import * as React from "react"
import {
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaTwitter } from "react-icons/fa"

type TwitterButtonProps = Omit<IconButtonProps, "aria-label">

export const TwitterButton: React.FC<TwitterButtonProps> = (props) => {
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={()=> window.open("https://twitter.com/death_finance", "_blank")}
      icon={<FaTwitter />}
      aria-label={`Twitter`}
      {...props}
    />
  )
}
