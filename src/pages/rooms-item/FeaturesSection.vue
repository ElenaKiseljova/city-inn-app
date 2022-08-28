<template lang="pug">
section.features
  h2.visually-hidden Features
  .features__container.container
    .features__icons
      ul.services.features__wrapper.swiper-wrapper
        each service in features.services
          +service(service, features.sectionName, 'swiper-slide features__icons-slide')

      +pagination('features')
</template>