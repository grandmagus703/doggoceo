import { APIBaseURL } from "~consts/apis"

// API factory for doggo breeds
export const fetchAllBreeds = () => fetch(`${APIBaseURL}/breeds/list/all`).then(res => res.json().then(({ message }) => Object.keys(message)))
export const fetchBreedImage = (breed: string) => fetch(`${APIBaseURL}/breed/${breed}/images/random`).then(res => res.json().then(({ message }) => message))
export const fetchBreedImages = (breed:string) => fetch(`${APIBaseURL}/breed/${breed}/images`).then(res => res.json().then(({ message }) => message as string[]))
