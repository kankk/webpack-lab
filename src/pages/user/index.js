import LogoLarge from '../../assets/logo_large.png';
import HelloButton from '../../components/hello-button';

const user = document.createElement('p');
user.innerHTML = 'Mangokk';
user.className = 'user';
document.body.appendChild(user)                               

const logoLarge = new Image();
logoLarge.className = 'logo-large'
logoLarge.src = LogoLarge;  // webpack -> url-loader打包图片路径
document.body.appendChild(logoLarge);

const _button = new HelloButton('hello');
document.body.appendChild(_button)