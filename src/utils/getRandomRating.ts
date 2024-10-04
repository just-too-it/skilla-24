import { Rating } from '../pages/Calls/types';

export const getRandomRating = (): Rating => {
  const ratings = Object.values(Rating);
  const randomIndex = Math.floor(Math.random() * ratings.length);
  return ratings[randomIndex] as Rating;
};
