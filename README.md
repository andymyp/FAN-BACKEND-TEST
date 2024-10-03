<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">FAN-BACKEND-TEST</h3>

  <p align="center">
    Project backend for technical test
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#logic-test">Logic Test</a></li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## Built With

Backend RESTFUL API build with Node.js, Express.js, PostgreSQL, Sequelize, JWT, Bcrypt, and Winston

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Prerequisites

- NPM
  ```sh
  npm install npm@latest -g
  ```
- PostgreSQL

<br />

## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/andymyp/FAN-BACKEND-TEST.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create PostgreSQL database. e.g. `fan_betest`
4. Create `.env` file from `.env.example` and update it
5. import `FAN-BACKEND-TEST.postman_collection.json` to your postman

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

1. Run

   ```sh
   # development
   npm run start

   # watch mode
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Logic Test

1. Run logic `kaos_kaki`

   ```sh
   node logic_test/kaos_kaki
   ```

2. Run logic `jumlah_kata`

   ```sh
   node logic_test/jumlah_kata
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/andymyp
