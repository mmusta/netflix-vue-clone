import { first } from 'lodash';
import { computed } from 'vue';
import { generatePath } from '../../common';
import { getComicUrl } from '../../common/apiUrls';
import useQuery from '../useQuery';

export default function useComicQuery({ comicId }) {
  const queryResponse = useQuery([generatePath(getComicUrl, {
    comicId,
  })]);

  const comic = computed(() => first(queryResponse.data?.value));

  return {
    ...queryResponse,
    comic,
    isComicLoading: queryResponse.isLoading,
  };
}
