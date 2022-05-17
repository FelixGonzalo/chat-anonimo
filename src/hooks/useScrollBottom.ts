import { useEffect, useRef } from 'react'

type refDataType = any // eslint-disable-line

export function useScrollBottom(refData: refDataType) {
  const refElement = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    try {
      const updateScroll = refElement?.current?.scrollHeight
      if (updateScroll) refElement.current.scrollTop = updateScroll
    } catch (error) {
      console.error(error)
    }
  }, [refData])

  return { refElement }
}
