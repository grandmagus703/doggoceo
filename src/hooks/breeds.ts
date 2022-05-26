import { useEffect } from "react"
import { useQuery } from "react-query"

import { usePagination } from "./pagination"

import { fetchAllBreeds, fetchBreedImage, fetchBreedImages } from "~apis/breeds"

export const useBreeds = () => {
  // Fetch breeds information
  const { data: breeds } = useQuery(
    ['dog breeds'],
    () => fetchAllBreeds()
  )

  return {
    breeds
  }
}

export const useBreedItem = (breed: string) => {
  // Fetch breedItem information
  const { data: breedImage } = useQuery(
    ['breed image', breed],
    () => fetchBreedImage(breed),
    // Un-comment this when we need to cache breed image
    // Caching is not needed per requirement
    // { staleTime: Infinity }
  )

  return {
    breedImage
  }
}

export const useBreedDetails = (breed: string) => {
  // Use pagination in BreedDetails view
  const { pagination, setPagination, isLastPage, gotoNextPage, gotoPrevPage } = usePagination()

  // Fetch breedImages
  const { isLoading: loadingBreedImages, data: breedImages } = useQuery(
    ['breed images', breed],
    () => fetchBreedImages(breed),
    // This should be cached for performance
    { staleTime: Infinity }
  )

  useEffect(() => {
    // Once breedImages are loaded, set total count to pagination object
    setPagination({...pagination, total: breedImages?.length || 0})
  }, [breedImages])

  return {
    pagination,
    setPagination,
    isLastPage,
    gotoNextPage,
    gotoPrevPage,
    loadingBreedImages,
    breedImages
  }
}
