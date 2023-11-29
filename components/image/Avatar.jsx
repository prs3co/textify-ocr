import { chakra, useColorMode } from '@chakra-ui/system'
import { Image } from './Image'

export function NextAvatar ({
  src,
  showBorder,
  alt,
  style,
  ...props
}) {
  const { colorMode } = useColorMode()

  return (
    <Image
      {...props}
      {...(showBorder
        ? {
            border: '2px',
            borderColor: colorMode === 'dark' ? 'navy.700' : 'white'
          }
        : {})}
      alt={alt}
      src={src}
      style={{ ...style, borderRadius: '50%' }}
    />
  )
}

export const ChakraNextAvatar = chakra(NextAvatar, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})
