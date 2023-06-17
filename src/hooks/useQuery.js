import { merge } from 'lodash';
import useSWRV from 'swrv';
import { computed } from 'vue';
import { fetcher } from '../common/network';

export const defaultQueryConfig = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};

/**
 * @param {import('swrv/dist/types').IKey} key
 * @param {import('swrv').IConfig} config
 */
export default function useQuery(key, config) {
  const swrvResponse = useSWRV(key, fetcher, merge(defaultQueryConfig, config));

  return {
    ...swrvResponse,
    isLoading: computed(() => !swrvResponse.data.value),
  };
}
