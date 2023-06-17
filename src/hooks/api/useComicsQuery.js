import { getComicsUrl } from '../../common/apiUrls';
import useQuery from '../useQuery';

export default function useComicsQuery() {
  const queryResponse = useQuery([getComicsUrl, {
    params: {
      limit: 30,
      hasDigitalIssue: true,
    },
  }]);

  return {
    ...queryResponse,
    comics: queryResponse.data,
    isComicsLoading: queryResponse.isLoading,
  };
}
