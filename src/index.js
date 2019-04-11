import Logo from './assets/logo.png';
import LogoLarge from './assets/logo_large.png';
import IndexCSS from './index.css';

const logo = new Image();
logo.className = 'logo';
logo.src = Logo;  // webpack -> url-loader小图片(小于limit)转成base64
document.body.appendChild(logo);

const logoLarge = new Image();
logoLarge.className = 'logo-large'
logoLarge.src = LogoLarge;  // webpack -> url-loader打包图片路径
document.body.appendChild(logoLarge);

// scss
import IndexSCSS from './index.scss';
const scssDiv = document.createElement('div');
scssDiv.className = 'scss-box';
document.body.appendChild(scssDiv);

// lesss
import IndexLESS from './index.less';
const lessDiv = document.createElement('div');
lessDiv.className = 'less-box';
document.body.appendChild(lessDiv);

// for babel
// const proxy = new Proxy();

// for tree-shaking
// const author = require('./author');
import author from './author';
// import { authorName, authorAge } from './author';
const nameP = document.createElement('p');
nameP.innerHTML = author.name;
// nameP.innerHTML = authorName;
const ageP = document.createElement('p');
ageP.innerHTML = author.age;
// ageP.innerHTML = authorAge;
document.body.appendChild(nameP);
document.body.appendChild(ageP);