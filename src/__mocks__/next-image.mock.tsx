import * as React from 'react'

// Mock next/image component
const MockNextImage = ({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) => {
  return <img src={src} alt={alt} className={className} />
}

export default MockNextImage
