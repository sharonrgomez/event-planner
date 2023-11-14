import {useEffect, useCallback, RefObject} from 'react'

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				callback()
			}
		},
		[ref, callback],
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [handleClickOutside])
}

export default useClickOutside
