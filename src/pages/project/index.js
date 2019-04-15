import Logo from '../../assets/logo.png';
import HelloButton from '../../components/hello-button';

const project = document.createElement('p');
project.innerHTML = 'Webpack-Lab';
project.className = 'user';
document.body.appendChild(project)                               

const logo = new Image();
logo.className = 'logo';         
logo.src = Logo;  // webpack -> url-loader小图片(小于limit)转成base64
document.body.appendChild(logo);

const _button = new HelloButton('hello');
document.body.appendChild(_button)