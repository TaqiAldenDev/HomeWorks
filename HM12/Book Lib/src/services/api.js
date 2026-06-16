import axios from 'axios'

const API_BASE = '/api'

export const api = {
  getRecent: async () => {
    const { data } = await axios.get(`${API_BASE}/recent`)
    return data
  },

  search: async (query) => {
    const { data } = await axios.get(`${API_BASE}/search/${encodeURIComponent(query)}`)
    return data
  },

  book: async (id) => {
    const { data } = await axios.get(`${API_BASE}/book/${id}`)
    return data
  },
}
