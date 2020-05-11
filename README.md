<h1 align="center">morfy</h1>
<h3 align="center">Fast morphing library for the web</h3>
<p align="center">
  <a href="https://www.npmjs.com/package/morfy" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/morfy.svg">
  </a>
  <a href="https://github.com/TimoBechtel/morfy/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TimoBechtel/morfy" />
  </a>
</p>
<p align="center">
  ·
  <a href="https://github.com/TimoBechtel/morfy#readme">Homepage</a>
  ·
  <a href="https://timobechtel.github.io/morfy/">View Demo</a>
  ·
  <a href="https://github.com/TimoBechtel/morfy/issues">Report Bug / Request Feature</a>
  ·
</p>

## Table of Contents

- [Installation](#Install)
- [Usage](#usage)
- [Test](#run-tests)
- [Contact](#contact)
- [Contributing](#Contributing)
- [License](#license)

## Install

### NPM:

```sh
npm install morfy
```

## Usage

### As module:

```javascript
import { morph } from 'morfy';
```

Then:

```javascript
const button = document.getElementById('test-button');
const target = document.getElementById('target');
button.addEventListener('click', () => {
  morph(button, target, {
    timingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  });
});
```

Docs:

```typescript
/**
 * Morph things
 */
function morph(source: HTMLElement, target: HTMLElement, options: MorfyOptions);

interface MorfyOptions {
  /**
   * duration in seconds
   */
  duration: number;
  /**
   * css timing function
   * @example 'ease-in'
   */
  timingFunction: string;
  /**
   * css properties to copy over to target
   */
  effectedCssProperties: string[];
}
```

## Run tests

```sh
npm run test
```

## Contact

👤 **Timo Bechtel**

- Website: https://timobechtel.com
- Twitter: [@TimoBechtel](https://twitter.com/TimoBechtel)
- GitHub: [@TimoBechtel](https://github.com/TimoBechtel)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />

1. Check [issues](https://github.com/TimoBechtel/morfy/issues)
1. Fork the Project
1. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
1. Test your changes `npm run test`
1. Commit your Changes (`git commit -m 'feat: add amazingFeature'`)
1. Push to the Branch (`git push origin feat/AmazingFeature`)
1. Open a Pull Request

### Commit messages

This project uses semantic-release for automated release versions. So commits in this project follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. I recommend using [commitizen](https://github.com/commitizen/cz-cli) for automated commit messages.

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Distributed under the [MIT](https://github.com/TimoBechtel/morfy/blob/master/LICENSE) License.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
