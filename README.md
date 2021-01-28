# cambio

## Features

Cambio uses the exchangeratesapi.io API to perform currency conversion and plot
the variation in rates in a graph.

You can type in the first input and the result will appear in the second one. If
you start typing in the second input, it updates the first input using the
stored exchange rate, without making another API call.

By default the app uses the current date for the exchange rates and the past
week for the period plotted on the chart.

If you change the data in the calendar, the app makes an API call to get the new
rates and updates both the result input as well as the chart data.

I've also created a favorites widget that allows you to save preferred currency
pairs that are shown in the sidebar and synced to the local storage.

Clicking on a favorite pair from the sidebar will set the current currencies to
those values and update the covnersion result and the chart.

The app is also fully responsive and resizes smoothly for smaller screens.

## HTTP client

The HTTP client is abstracted so that the currently used library, axios can be
swapped for another one without making edits across the repo.

It's also configured to throttle the API requests based on a duration set in the env files, with different values for production and
development.

What this means is so that if you made this request
history?base=EUR&start_at=2020-12-04&end_at=2021-01-04, the call to the API gets
through, then if the URL changes because you select a different currency, date
or period for the chart, another requests gets made but if afterwards, within
the throttling duration you make a call to the same URL (same settings for dates
and currency), then you get a cached response, no extra call will be made to the
API.

After the throttling duration has expired, hitting the same URL will results in
actual calls across the network.

## API

Everything related to the API has its own folder and includes API states, the
HTTP client, the supported methods. The API is also injected globally via a
plugin so that if you wanted to make API calls from the components themselves
you could access the right methods like this:

```js
this.$currencyApi.getRates({base, date})
```

### Handling API states for an improved UX

• IDLE - Starting point
• PENDING - An action is being performed
• SUCCESS - An action finished successfully
• ERROR - An action finished with an error

## Base and wrapper components

I've created some base components for a input and a spinner (@/components/base). Creating a
BaseInput component that encapsulates the input tag allows for a consistent look
across the app. The base components are globally registered using Webpack's API
(helpers/registerBaseComponents.js) so that you don't need to import them in
every place they're used.

Because I've used 3rd party calendar and custom select components, I've wrapped
them in some generic components (@/components/common) so that they can be easily reused without having
to care about what package is used inside. This allows the specific packages to
be later changed for something else without having to make changes in all of the
places they're used in.

## Assets

I'm using Tailwind as the CSS framework and I've configured it to purge unused
CSS so that only what's actually used in the app gets deployed.

The CSS is also split into a tailwind file that holds all Tailwind imports, a
typography file, a file for transitions, a file that updates the look of the
custom select component and a main.css file that's the entry point for all
global css.

Because I've used Tailwind there was no need for scoped CSS in the components
themselves.

The assets folder also has an SVG folder and Webpack is configured to load SVG's
so that you can import them as components in your file (import Star from
"@/assets/svg/star.svg").

## Layouts and pages

I'm using a layouts folder to group possible layouts, in this case there's only
one the Main.vue. Then in the router I can use these layout components to hold
the specific pages like Home.

## Vuex

This implementation uses a store (Vuex) and features best practices like setting
constant types for mutations which helps to take advantage of tools like linters and avoid accidental
typos. Also, a file with constant types can serve as a quick guide on what kind
of getters, actions, and mutations a Vuex module deals with.

Normally the store should be used for state that is trully global like the
user's name in an app that would appear in multiple places, runtime app config etc.

In a small project such as this one where we don't use modules or use just a few it's
ok but for large scale apps where you might end up with dozens of modules it
might be difficult to manage and refactor the code because no one knows what part of the
app you might be affecting with your changes).

In this case I've used it because it was convenient and because being able to
track mutations in vue dev tools was helpful.

Otherwise lifting up state in the component tree can be better pattern. Another
solution would be using a stateful service with Vue observable or upgrading to
Vue3 which thanks to its setup function makes the usage of Vuex much less
needed.


### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
