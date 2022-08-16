import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      pageName: 'home',
      header: null,
    };
  },
  mutations: {
    setPageName(state, payload) {
      state.pageName = payload;
    },
    setHeader(state, payload) {
      state.header = payload;
    },
  },
  actions: {
    setPageName(context, payload) {
      context.commit('setPageName', payload);
    },
    async setHeader(context) {
      // const url = `https://osnova.webnauts.pro/city-inn/structure/header.json`;

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */
      const headerJson = `
      {
        "status": "success",
        "content": {
          "language": "en",
          "book": {
            "title": "BOOK NOW",
            "link": "google.com"
          },
          "offer": {
            "title": "SMART OFFER",
            "link": "google.com"
          },
          "address": {
            "icon": "map-pin",
            "link": "google.maps"
          },
          "call": {
            "text": "Call us",
            "phone": "+38 032 247 15 51",
            "link": "tel:+380322471551"
          },
          "social": [
            {
              "icon": "icon-facebook",
              "link": "facebook.com"
            },
            {
              "icon": "icon-instagram",
              "link": "instagram.com"
            }
          ],
          "menu": [
            {
              "title": "Menu default background",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-0-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-0-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-0-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-0-mobile.jpg"
                }
              }
            },
            {
              "title": "ПРО НАС",
              "link": "/about",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-1-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-1-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-1-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-1-mobile.jpg"
                }
              }
            },
            {
              "title": "restaurant",
              "link": "/restaurant",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-2-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-2-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-2-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-2-mobile.jpg"
                }
              }
            },
            {
              "title": "smart пропозиція",
              "link": "/smart-offer",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-3-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-3-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-3-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-3-mobile.jpg"
                }
              }
            },
            {
              "title": "star fit",
              "link": "/starfit",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-4-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-4-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-4-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-4-mobile.jpg"
                }
              }
            },
            {
              "title": "lobby bar",
              "link": "/lobby",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-5-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-5-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-5-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-5-mobile.jpg"
                }
              }
            },
            {
              "title": "conference service",
              "link": "conference-service",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-6-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-6-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-6-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-6-mobile.jpg"
                }
              }
            },
            {
              "title": "group request",
              "link": "/group-request",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-7-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-7-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-7-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-7-mobile.jpg"
                }
              }
            },
            {
              "title": "контакти",
              "link": "/contacts",
              "image": {
                "webp": {
                  "mobile": "@/assets/img/menu-bg-8-mobile.webp",
                  "desktop": "@/assets/img/menu-bg-8-mobile.webp"
                },
                "jpg": {
                  "mobile": "@/assets/img/menu-bg-8-mobile.jpg",
                  "desktop": "@/assets/img/menu-bg-8-mobile.jpg"
                }
              }
            }
          ]
        }
      }
      `;

      const headerObj = JSON.parse(headerJson);

      console.log(headerObj);
      /* TEST */

      context.commit('setHeader', headerObj);
    },
  },
  getters: {
    pageName(state) {
      return state.pageName;
    },
    header(state) {
      return state.header;
    }
  },
});

export default store;