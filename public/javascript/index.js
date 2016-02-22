'use strict';


  console.log('index.js loaded');
  const btnLogin = document.getElementById('btn-login');
  const btnRegister = document.getElementById('btn-register');

  btnLogin.addEventListener('click', (e) => {
    window.location.pathname = '/login';
  });

  btnRegister.addEventListener('click', (e) => {
    window.location.pathname = '/register';
  });

