import axios from '~/api/axios'

export function getStatistics1() {
  return axios.get('/admin/statistics1')
}
