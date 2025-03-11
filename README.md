# ZAKKI OPTIMIZED(React + TypeScript + Vite)

## Background and Purpose

ZAKKI is a non-profit organization in Indonesia that supports elderly, mentally or physically disabled individuals, and low-income families. These people often have low social status, and a lack of information prevents them from seeking support from the wider community. ZAKKI's establishment provides them with a means to connect with the world.

Presently, ZAKKI has made the decision to redesign its website with the aim of gaining more visibility on a global scale. This initiative is intended to inspire people to contribute donations or volunteer their time in support of the groups they assist.

**This project is an extension of ZAKKI stage 1 development. If you would like to learn more about the initial phase, please visit [ZAKKI vite](https://github.com/tonia83731/ZAKKI-vite)**

## Target Users

- Users interested in the ZAKKI organization
- Local donors in Indonesia
- Global volunteers interested in joining

## Demo

- Phase One visit [here](https://tonia83731.github.io/ZAKKI-vite/)
- Phase Two visit [here](https://tonia83731.github.io/Zakki-frontend-optimized/)

# Project Improvement

- Phase 1: Users can only select English for reading

  Phase 2: Users can choose English, Traditional Chinese or Indonesian according to their preference

- Phase 1: For Programs, Events and Join Us page, project fetch data from locale files to display

  Phase 2: Projects use Sanity to manage data for Programs, Events and Join Us page and fetch data via AIP on the page

- Phase 1: The Join Us page is a multi-page form, currently submission do not save data, making it unusable for real use.
  Phase 2: The Join Us page integrates with Google Sheets, allowing form data to be saved through the Google API, enabling real-time data storage and management.

## Roles

- I was actively involved in UI/UX planning and front-end development. In this project, my role was as a UX Designer, tasked with aiding in the website's reconstruction.

- For UI/UX design, please visit [here](https://www.figma.com/file/UiUglBbnxgVxiF9x6EL265/Front-end-Project?type=design&node-id=1%3A4512&mode=design&t=rn2rKN4UeehwHo1F-1)

## Challenges

- Problem: The project uses React Router DOM to switch pages. However, after deployment, the server cannot resolve the correct path, resulting in a 404 not found error.

  - Soluntion: Currently, HashRouter is used to resolve the issue. The only downside is that the router displays “/#/” in front of every page.

- Problem: How to prevent the page language from resetting when refreshed the page?
  - Solution: Store the select language in localStorage. When refreshed the page, the server retrieve the language from localStorge to display the the page in the selected language

## Tools

- react @19.0.0
- typescript @5.7.2
- react-router-dom @7.2.0
- i18next @24.2.2
- react-i18next @15.4.1
- react-slick 0.30.3
- slick-carousel @1.8.1
- sweetalert2 @11.17.2
- tailwindcss @3.4.17
- validator @13.12.0
- eslint @9.19.0

## Further Developments

- For event applications, ZAKKI currently uses Google Forms to save data. We are still discussing whether to switch to using Google API, similar to the Join Us page.
- Due to privacy and security concerns, donations currently only support local bank transfers. In the future, we will consider integrating credit card payment functionality to offer more donation options

## Project Setup

1. Clone project to local

```sh
git clone https://github.com/tonia83731/Zakki-frontend-optimized.git
```

2. Install package

```sh
npm install
```

3. Run dev

```sh
npm run dev
```
