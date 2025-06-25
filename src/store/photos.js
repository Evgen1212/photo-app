import { defineStore } from 'pinia';

export const usePhotosStore = defineStore('photos', {
  state: () => ({
    photos: [],
    loading: false,
    error: null,
    filter: '',
    sort: { key: 'id', order: 'asc' },
    albumIds: [],
    page: 1,
    perPage: 30,
    allLoaded: false,
    theme: localStorage.getItem('theme') || 'system',
  }),
  actions: {
    // Загрузка фотографий с фильтрацией по альбомам
    async fetchPhotos(albumIds = []) {
      this.loading = true;
      this.error = null;
      this.page = 1;
      this.allLoaded = false;
      try {
        let url = 'https://jsonplaceholder.typicode.com/photos';
        if (albumIds.length) {
          url += '?' + albumIds.map((id) => `albumId=${id}`).join('&');
        }
        const res = await fetch(url);
        const data = await res.json();
        this.photos = data;
        this.albumIds = albumIds;
        localStorage.setItem('albumIds', albumIds.join(' '));
      } catch (e) {
        this.error = 'Ошибка загрузки данных';
      } finally {
        this.loading = false;
      }
    },
    // Загрузка следующей страницы данных
    loadMore() {
      if (this.allLoaded) return;
      const nextPage = this.page + 1;
      if (nextPage * this.perPage >= this.photos.length) {
        this.allLoaded = true;
      } else {
        this.page = nextPage;
      }
    },
    // Установка сортировки
    setSort(key) {
      if (this.sort.key === key) {
        this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort.key = key;
        this.sort.order = 'asc';
      }
      this.page = 1;
      this.allLoaded = false;
    },
    // Установка темы
    setTheme(theme) {
      this.theme = theme;
      localStorage.setItem('theme', theme);
    },
    // Восстановление настроек из localStorage
    restoreFromStorage() {
      const ids = localStorage.getItem('albumIds');
      if (ids) {
        this.albumIds = ids.split(' ').filter(Boolean);
      }
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.theme = theme;
      }
    },
  },
  getters: {
    // Отсортированные фотографии
    sortedPhotos(state) {
      const sorted = [...state.photos].sort((a, b) => {
        const { key, order } = state.sort;
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
      });
      return sorted;
    },
    // Пагинированные фотографии
    paginatedPhotos(state) {
      return this.sortedPhotos.slice(0, state.page * state.perPage);
    },
  },
});
