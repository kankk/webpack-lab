import HelloButton from '../../components/hello-button';

const login = document.createElement('p');
login.innerHTML = 'Login-Page';
login.className = 'user';
document.body.appendChild(login)

const _button = new HelloButton('hello');
document.body.appendChild(_button)