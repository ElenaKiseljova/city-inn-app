import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      pageName: 'home',
      lang: 'uk',
      meta: {
        lang: 'uk',
        title: 'City Inn',
        items: [
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'description',
            content: 'City Inn - hotel in Lviv',
          },
          {
            property: 'og:title',
            content: 'City Inn',
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            property: 'og:url',
            content: window.location.origin,
          },
          {
            property: 'og:site_name',
            content: 'City Inn',
          },
          {
            property: 'og:image',
            content: '/img/menu-bg-0-desktop.jpg',
          },
        ],
      },
      header: null,
      footer: null,
      page: null,
    };
  },
  mutations: {
    setPageName(state, payload) {
      state.pageName = payload;
    },
    setLang(state, payload) {
      state.lang = payload;
    },
    setMeta(state, payload) {
      state.meta = payload;
    },
    setHeader(state, payload) {
      state.header = payload;
    },
    setFooter(state, payload) {
      state.footer = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
  },
  actions: {
    setPageName(context, payload) {
      context.commit('setPageName', payload);
    },
    setLang(context, payload) {
      context.commit('setLang', payload);
    },
    setMeta(context, payload) {
      context.commit('setMeta', payload);
    },
    async setHeader(context, payload) {
      let url = '';

      if (payload.lang !== 'uk') {
        url = `${window.location.origin}/api/${payload.lang}${payload.url}`;
      } else {
        url = `${window.location.origin}/api${payload.url}`;
      }

      console.log(url);

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
          "book": {
            "title": "BOOK NOW",
            "link": "https://google.com"
          },
          "offer": {
            "title": "SMART OFFER",
            "link": "smart-offer"
          },
          "address": {
            "icon": "icon-map-pin",
            "link": "https://google.maps"
          },
          "call": {
            "text": "Call us",
            "phone": "+38 032 247 15 51",
            "link": "tel:+380322471551"
          },
          "social": [
            {
              "icon": "icon-facebook",
              "link": "https://facebook.com"
            },
            {
              "icon": "icon-instagram",
              "link": "https://instagram.com"
            }
          ],
          "menu": [
            {
              "title": "Menu default background",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-0-mobile.webp",
                  "desktop": "/img/menu-bg-0-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-0-mobile.jpg",
                  "desktop": "/img/menu-bg-0-desktop.jpg"
                }
              }
            },
            {
              "title": "ПРО НАС",
              "link": "/about",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-1-mobile.webp",
                  "desktop": "/img/menu-bg-1-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-1-mobile.jpg",
                  "desktop": "/img/menu-bg-1-desktop.jpg"
                }
              }
            },
            {
              "title": "restaurant",
              "link": "/restaurant-sviatoslav",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-2-mobile.webp",
                  "desktop": "/img/menu-bg-2-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-2-mobile.jpg",
                  "desktop": "/img/menu-bg-2-desktop.jpg"
                }
              }
            },
            {
              "title": "smart пропозиція",
              "link": "/smart-offer",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-3-mobile.webp",
                  "desktop": "/img/menu-bg-3-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-3-mobile.jpg",
                  "desktop": "/img/menu-bg-3-desktop.jpg"
                }
              }
            },
            {
              "title": "star fit",
              "link": "/starfit",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-4-mobile.webp",
                  "desktop": "/img/menu-bg-4-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-4-mobile.jpg",
                  "desktop": "/img/menu-bg-4-desktop.jpg"
                }
              }
            },
            {
              "title": "lobby bar",
              "link": "/lobby-bar",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-5-mobile.webp",
                  "desktop": "/img/menu-bg-5-desktop.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-5-mobile.jpg",
                  "desktop": "/img/menu-bg-5-desktop.jpg"
                }
              }
            },
            {
              "title": "conference service",
              "link": "conference-service",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-6-mobile.webp",
                  "desktop": "/img/menu-bg-6-mobile.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-6-mobile.jpg",
                  "desktop": "/img/menu-bg-6-mobile.jpg"
                }
              }
            },
            {
              "title": "group request",
              "link": "/group-request",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-7-mobile.webp",
                  "desktop": "/img/menu-bg-7-mobile.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-7-mobile.jpg",
                  "desktop": "/img/menu-bg-7-mobile.jpg"
                }
              }
            },
            {
              "title": "контакти",
              "link": "/#contacts",
              "image": {
                "webp": {
                  "mobile": "/img/menu-bg-8-mobile.webp",
                  "desktop": "/img/menu-bg-8-mobile.webp"
                },
                "jpg": {
                  "mobile": "/img/menu-bg-8-mobile.jpg",
                  "desktop": "/img/menu-bg-8-mobile.jpg"
                }
              }
            }
          ]
        }
      }
      `;

      const headerObj = JSON.parse(headerJson);

      console.log('header', headerObj);
      /* TEST */

      context.commit('setHeader', headerObj);
    },
    async setFooter(context, payload) {
      let url = '';

      if (payload.lang !== 'uk') {
        url = `${window.location.origin}/api${payload.lang}/${payload.url}`;
      } else {
        url = `${window.location.origin}/api${payload.url}`;
      }

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */
      const footerJson = `
      {
        "status": "success",
        "content": {
          "copyright": [
            "All rights reserved",
            "City Inn Smart Hotel Lviv"
          ],
          "columns": [
            {
              "title": "Terms & Service",
              "items": [
                {
                  "text": "Політика конфіденціальності",
                  "link": "#"
                },
                {
                  "text": "Публічна оферта",
                  "link": "#"
                }
              ]
            },
            {
              "title": "Адреса",
              "items": [
                {
                  "text": "79495 Ivan Franko street, 53b, Vinniki, Lvivska oblast",
                  "link": ""
                }
              ]
            },
            {
              "title": "Продажі",
              "items": [
                {
                  "text": "sales@city-inn.com.ua",
                  "link": "mailto:sales@city-inn.com.ua"
                },
                {
                  "text": "+ 38 (032) 247-15-51",
                  "link": "tel:+380322471551"
                }
              ]
            },
            {
              "title": "Про нас",
              "items": [
                {
                  "text": "Про готель",
                  "link": "/about"
                },
                {
                  "text": "Чому SMART?",
                  "link": "/about#smart"
                }
              ]
            },
            {
              "title": "Бронювання",
              "items": [
                {
                  "text": "reservation@city-inn.com.ua",
                  "link": "mailto:reservation@city-inn.com.ua"
                },
                {
                  "text": "+ 38 (032) 247-15-51",
                  "link": "tel:+380322471551"
                }
              ]
            },
            {
              "title": "Рецепція",
              "items": [
                {
                  "text": "reception@city-inn.com.ua",
                  "link": "mailto:reception@city-inn.com.ua"
                },
                {
                  "text": "+ 38 (032) 247-15-51",
                  "link": "tel:+380322471551"
                }
              ]
            }
          ]
        }
      }
      `;

      const footerObj = JSON.parse(footerJson);

      console.log('footer', footerObj);
      /* TEST */

      context.commit('setFooter', footerObj);
    },
    async setPage(context, payload) {
      let url = '';

      url = `${window.location.origin}/api${payload.url}`;

      console.log(url);

      // const response = await fetch(url);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   const error = new Error(responseData.message || responseData.error.message || 'Failed to fetch!');

      //   throw error;
      // }

      /* TEST */
      const pagesJson = {
        '/': `
          {
            "status": "success",
            "content": {
              "language": "uk",
              "seoTitle": "City Inn - Home",
              "seoDescription": "City Inn the Best!!!",
              "template": "home",
              "image": {
                "webp": {
                  "mobile": "/storage/media/2022/07/alesha-4.webp",
                  "tablet": "/storage/media/2022/07/alesha-4.webp",
                  "desktop": "/storage/media/2022/07/alesha-4.webp"
                },
                "jpg": {
                  "mobile": "/storage/media/2022/07/alesha-3.jpg",
                  "tablet": "/storage/media/2022/07/alesha-3.jpg",
                  "desktop": "/storage/media/2022/07/alesha-3.jpg"
                }
              },
              "content": [
                {
                  "id": 4,
                  "sectionName": "smart",
                  "title": "smart номера",
                  "contentTop": "Щоб ви гарно виспались",
                  "contentBottom": "Буде тепло!",
                  "book": {
                    "title": "BOOK NOW",
                    "link": "google.com"
                  },
                  "more": {
                    "title": "Дізнатись більше",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 1,
                  "sectionName": "lobby",
                  "title": "lobby bar",
                  "contentTop": "Щоб ви гарно проводили вільний час",
                  "contentBottom": "Буде смачно!",
                  "book": {
                    "title": "RESERVE TABLE",
                    "link": "google.com"
                  },
                  "more": {
                    "title": "Menu",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 5,
                  "sectionName": "conference",
                  "title": "Conference service",
                  "contentTop": "Щоб ви провели гарний захід",
                  "contentBottom": "Буде SMART",
                  "more": {
                    "title": "View more",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 6,
                  "sectionName": "group",
                  "title": "group request",
                  "contentTop": "Щоб ви провели гарний захід",
                  "contentBottom": "Буде smart",
                  "book": {
                    "title": "group booking",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 7,
                  "sectionName": "restaurant",
                  "title": "restaurant",
                  "contentTop": "Щоб ви гарно проводили вільний час",
                  "contentBottom": "Буде смачно",
                  "book": {
                    "title": "Забронювати",
                    "link": "google.com"
                  },
                  "worktime": "07:00 до 22:00",
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 8,
                  "sectionName": "starfit",
                  "title": "star fit",
                  "contentTop": "Щоб ви відволіклись і перезавантажились",
                  "contentBottom": "Буде СПА! Буде СПОРТ!",
                  "more": {
                    "title": "Дізнатись більше",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 9,
                  "sectionName": "about",
                  "title": "про нас",
                  "contentTop": "Ми створили для вас концепцію SMART готель, щоб все було розумно і швидко, але обов'язково з високим сервісом.",
                  "contentBottom": "Буде професійно! Буде SMART",
                  "more": {
                    "title": "Дізнатись більше",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                }
              ]
            }
          }
        `,
        '/en': `
          {
            "status": "success",
            "content": {
              "language": "en",
              "seoTitle": "City Inn - Home En",
              "seoDescription": "City Inn the Best!!! En",
              "template": "home",
              "image": {
                "webp": {
                  "mobile": "/storage/media/2022/07/alesha-4.webp",
                  "tablet": "/storage/media/2022/07/alesha-4.webp",
                  "desktop": "/storage/media/2022/07/alesha-4.webp"
                },
                "jpg": {
                  "mobile": "/storage/media/2022/07/alesha-3.jpg",
                  "tablet": "/storage/media/2022/07/alesha-3.jpg",
                  "desktop": "/storage/media/2022/07/alesha-3.jpg"
                }
              },
              "content": [
                {
                  "id": 4,
                  "sectionName": "smart",
                  "title": "smart rooms",
                  "contentTop": "Good sleep",
                  "contentBottom": "It will be warm!",
                  "book": {
                    "title": "BOOK NOW",
                    "link": "google.com"
                  },
                  "more": {
                    "title": "Read more",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 1,
                  "sectionName": "lobby",
                  "title": "lobby bar",
                  "contentTop": "Щоб ви гарно проводили вільний час",
                  "contentBottom": "Буде смачно!",
                  "book": {
                    "title": "RESERVE TABLE",
                    "link": "google.com"
                  },
                  "more": {
                    "title": "Menu",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 5,
                  "sectionName": "conference",
                  "title": "Conference service",
                  "contentTop": "Щоб ви провели гарний захід",
                  "contentBottom": "Буде SMART",
                  "more": {
                    "title": "View more",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 6,
                  "sectionName": "group",
                  "title": "group request",
                  "contentTop": "Щоб ви провели гарний захід",
                  "contentBottom": "Буде smart",
                  "book": {
                    "title": "group booking",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 7,
                  "sectionName": "restaurant",
                  "title": "restaurant",
                  "contentTop": "Щоб ви гарно проводили вільний час",
                  "contentBottom": "Буде смачно",
                  "book": {
                    "title": "Забронювати",
                    "link": "google.com"
                  },
                  "worktime": "07:00 до 22:00",
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 8,
                  "sectionName": "starfit",
                  "title": "star fit",
                  "contentTop": "Щоб ви відволіклись і перезавантажились",
                  "contentBottom": "Буде СПА! Буде СПОРТ!",
                  "more": {
                    "title": "Дізнатись більше",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                },
                {
                  "id": 9,
                  "sectionName": "about",
                  "title": "про нас",
                  "contentTop": "Ми створили для вас концепцію SMART готель, щоб все було розумно і швидко, але обов'язково з високим сервісом.",
                  "contentBottom": "Буде професійно! Буде SMART",
                  "more": {
                    "title": "Дізнатись більше",
                    "link": "google.com"
                  },
                  "image": {
                    "webp": {
                      "mobile": "/storage/media/2022/07/alesha-4.webp",
                      "tablet": "/storage/media/2022/07/alesha-4.webp",
                      "desktop": "/storage/media/2022/07/alesha-4.webp"
                    },
                    "jpg": {
                      "mobile": "/storage/media/2022/07/alesha-3.jpg",
                      "tablet": "/storage/media/2022/07/alesha-3.jpg",
                      "desktop": "/storage/media/2022/07/alesha-3.jpg"
                    }
                  }
                }
              ]
            }
          }
        `,
      };
      const pageJson = pagesJson[payload.url] || pagesJson['/'];

      const pageObj = JSON.parse(pageJson);

      console.log('page', pageObj);
      /* TEST */

      // Update meta
      const meta = {
        lang: pageObj.content.language,
        title: pageObj.content.seoTitle,
        items: [
          ...context.getters.meta.items,
          {
            name: 'description',
            content: pageObj.content.seoDescription,
          },
          {
            property: 'og:title',
            content: pageObj.content.seoTitle,
          },
          {
            property: 'og:url',
            content: `${window.location.origin}${payload.url}`,
          },
        ],
      };

      context.commit('setMeta', meta);

      // Update lang
      const lang = pageObj.content.language;

      context.commit('setLang', lang);

      // Set page
      context.commit('setPage', pageObj);
    },
  },
  getters: {
    pageName(state) {
      return state.pageName;
    },
    lang(state) {
      return state.lang;
    },
    meta(state) {
      return state.meta;
    },
    header(state) {
      return state.header;
    },
    footer(state) {
      return state.footer;
    },
    page(state) {
      return state.page;
    },
  },
});

export default store;