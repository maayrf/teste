import { configure } from '@storybook/react';
import { setDefaults } from '@storybook/addon-info';

setDefaults({
  inline: true,
  source: true,
});

const reqStories = require.context('../app/components', true, /\.stories.js$/);

function loadStories() {
  reqStories.keys().forEach((story) => reqStories(story));
  // You can require as many stories as you need.
}

configure(loadStories, module);
