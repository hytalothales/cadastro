/* ============================================
   LOGIN PAGE — SCRIPT
   ============================================ */
(function () {
  'use strict';

  // ─── DOM References ────────────────────────
  const loginCard     = document.getElementById('loginCard');
  const signupCard    = document.getElementById('signupCard');
  
  // Login DOM
  const form          = document.getElementById('loginForm');
  const identityInput = document.getElementById('identity');
  const passwordInput = document.getElementById('password');
  const identityLabel = document.getElementById('identityLabel');
  const identityIcon  = document.getElementById('identityIcon');
  const identityBadge = document.getElementById('identityBadge');
  const identityWrap  = document.getElementById('identityWrapper');
  const identityError = document.getElementById('identityError');
  const passwordError = document.getElementById('passwordError');
  const togglePwdBtn  = document.getElementById('togglePassword');
  const eyeOpen       = document.getElementById('eyeOpen');
  const eyeClosed     = document.getElementById('eyeClosed');
  const rememberMe    = document.getElementById('rememberMe');
  const btnLogin      = document.getElementById('btnLogin');
  const signupLink    = document.getElementById('signupLink');
  
  // Signup DOM
  const backToLoginLink = document.getElementById('backToLoginLink');
  const signupForm    = document.getElementById('signupForm');
  const signupName    = document.getElementById('signupName');
  const signupIdentity= document.getElementById('signupIdentity');
  const signupPassword= document.getElementById('signupPassword');
  const btnSignup     = document.getElementById('btnSignup');
  const toggleSignupPwdBtn = document.getElementById('toggleSignupPassword');
  const signupEyeOpen = document.getElementById('signupEyeOpen');
  const signupEyeClosed = document.getElementById('signupEyeClosed');
  const signupIdentityWrap = document.getElementById('signupIdentityWrapper');
  const signupIdentityIcon = document.getElementById('signupIdentityIcon');
  const signupIdentityLabel= document.getElementById('signupIdentityLabel');
  const signupIdentityBadge= document.getElementById('signupIdentityBadge');
  const signupIdentityError= document.getElementById('signupIdentityError');
  const signupNameError = document.getElementById('signupNameError');
  const signupPasswordError= document.getElementById('signupPasswordError');

  // Forgot DOM
  const forgotCard = document.getElementById('forgotCard');
  const forgotForm = document.getElementById('forgotForm');
  const forgotPasswordInput = document.getElementById('forgotPasswordInput');
  const forgotConfirmInput = document.getElementById('forgotConfirmInput');
  const forgotPasswordError = document.getElementById('forgotPasswordError');
  const forgotConfirmError = document.getElementById('forgotConfirmError');
  const btnForgotSubmit = document.getElementById('btnForgotSubmit');
  const toggleForgotPwdBtn = document.getElementById('toggleForgotPwdBtn');
  const toggleForgotConfirmBtn = document.getElementById('toggleForgotConfirmBtn');
  const forgotEyeOpen = document.getElementById('forgotEyeOpen');
  const forgotEyeClosed = document.getElementById('forgotEyeClosed');
  const forgotConfirmEyeOpen = document.getElementById('forgotConfirmEyeOpen');
  const forgotConfirmEyeClosed = document.getElementById('forgotConfirmEyeClosed');
  const backToLoginFromForgotLink = document.getElementById('backToLoginFromForgotLink');

  // OAuth DOM
  const btnGoogleAuth = document.getElementById('btnGoogle');
  const btnAppleAuth = document.getElementById('btnApple');
  const googleCard = document.getElementById('googleCard');
  const appleCard = document.getElementById('appleCard');
  const googleForm = document.getElementById('googleForm');
  const appleForm = document.getElementById('appleForm');
  const backToLoginFromGoogle = document.getElementById('backToLoginFromGoogle');
  const backToLoginFromApple = document.getElementById('backToLoginFromApple');
  const btnGoogleSubmit = document.getElementById('btnGoogleSubmit');
  const btnAppleSubmit = document.getElementById('btnAppleSubmit');

  // Toasts
  const toast         = document.getElementById('toast');
  const toastIcon     = document.getElementById('toastIcon');
  const toastMsg      = document.getElementById('toastMessage');

  // ─── SVG Icons ─────────────────────────────
  const ICONS = {
    user:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>',
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
  };

  // ─── State ─────────────────────────────────
  let fieldMode = 'none'; // 'none' | 'email' | 'phone'
  let signupFieldMode = 'none';

  // ─── LocalStorage Helpers ──────────────────
  const STORAGE_KEY = 'login_cache';
  const USERS_KEY = 'registered_users';

  function saveToCache(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
  }

  function loadFromCache() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function clearCache() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  }

  function getRegisteredUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch (_) { return []; }
  }

  function saveUser(user) {
    const users = getRegisteredUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ─── Phone Mask (BR format) ────────────────
  function formatPhone(digits) {
    const d = digits.replace(/\D/g, '').slice(0, 11);
    if (d.length === 0) return '';
    if (d.length <= 2)  return '(' + d;
    if (d.length <= 6)  return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  function rawDigits(value) {
    return value.replace(/\D/g, '');
  }

  // ─── Field Detection & Formatting ─────────
  function detectAndFormat() {
    const raw = identityInput.value;
    if (raw.length === 0) { setMode('none'); return; }
    const firstChar = raw.charAt(0);
    if (/\d/.test(firstChar)) {
      if (fieldMode !== 'phone') setMode('phone');
      identityInput.value = formatPhone(rawDigits(raw));
      identityInput.setAttribute('maxlength', '15');
    } else {
      if (fieldMode !== 'email') setMode('email');
      identityInput.removeAttribute('maxlength');
    }
  }

  function setMode(mode) {
    fieldMode = mode;
    if (mode === 'email') {
      identityIcon.innerHTML = ICONS.email;
      identityLabel.textContent = 'E-mail';
      identityInput.placeholder = 'seu@email.com';
      identityBadge.textContent = 'e-mail';
      identityBadge.className = 'input-badge show email';
    } else if (mode === 'phone') {
      identityIcon.innerHTML = ICONS.phone;
      identityLabel.textContent = 'Telefone';
      identityInput.placeholder = '(00) 00000-0000';
      identityBadge.textContent = 'telefone';
      identityBadge.className = 'input-badge show phone';
    } else {
      identityIcon.innerHTML = ICONS.user;
      identityLabel.textContent = 'E-mail ou Telefone';
      identityInput.placeholder = 'Digite seu e-mail ou telefone';
      identityBadge.className = 'input-badge';
      identityInput.removeAttribute('maxlength');
    }
  }

  function detectAndFormatSignup() {
    const raw = signupIdentity.value;
    if (raw.length === 0) { setSignupMode('none'); return; }
    const firstChar = raw.charAt(0);
    if (/\d/.test(firstChar)) {
      if (signupFieldMode !== 'phone') setSignupMode('phone');
      signupIdentity.value = formatPhone(rawDigits(raw));
      signupIdentity.setAttribute('maxlength', '15');
    } else {
      if (signupFieldMode !== 'email') setSignupMode('email');
      signupIdentity.removeAttribute('maxlength');
    }
  }

  function setSignupMode(mode) {
    signupFieldMode = mode;
    if (mode === 'email') {
      signupIdentityIcon.innerHTML = ICONS.email;
      signupIdentityLabel.textContent = 'E-mail';
      signupIdentity.placeholder = 'seu@email.com';
      signupIdentityBadge.textContent = 'e-mail';
      signupIdentityBadge.className = 'input-badge show email';
    } else if (mode === 'phone') {
      signupIdentityIcon.innerHTML = ICONS.phone;
      signupIdentityLabel.textContent = 'Telefone';
      signupIdentity.placeholder = '(00) 00000-0000';
      signupIdentityBadge.textContent = 'telefone';
      signupIdentityBadge.className = 'input-badge show phone';
    } else {
      signupIdentityIcon.innerHTML = ICONS.user;
      signupIdentityLabel.textContent = 'E-mail ou Telefone';
      signupIdentity.placeholder = 'Digite seu e-mail ou telefone';
      signupIdentityBadge.className = 'input-badge';
      signupIdentity.removeAttribute('maxlength');
    }
  }

  // ─── Validation ────────────────────────────
  function showError(wrapper, errorEl, msg) {
    wrapper.classList.add('error');
    wrapper.classList.remove('success');
    errorEl.textContent = msg;
    errorEl.classList.add('show');
  }

  function clearError(wrapper, errorEl) {
    wrapper.classList.remove('error');
    errorEl.classList.remove('show');
  }

  function validateIdentity() {
    const val = identityInput.value.trim();
    if (!val) {
      showError(identityWrap, identityError, 'Este campo é obrigatório.');
      return false;
    }
    if (fieldMode === 'email') {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        showError(identityWrap, identityError, 'Digite um e-mail válido.');
        return false;
      }
    }
    if (fieldMode === 'phone') {
      const digits = rawDigits(val);
      if (digits.length < 10 || digits.length > 11) {
        showError(identityWrap, identityError, 'Digite um telefone válido com DDD.');
        return false;
      }
    }
    clearError(identityWrap, identityError);
    return true;
  }

  function validatePassword() {
    const val = passwordInput.value;
    if (!val) {
      showError(passwordInput.closest('.input-wrapper'), passwordError, 'A senha é obrigatória.');
      return false;
    }
    if (val.length < 4) {
      showError(passwordInput.closest('.input-wrapper'), passwordError, 'Mínimo de 4 caracteres.');
      return false;
    }
    clearError(passwordInput.closest('.input-wrapper'), passwordError);
    return true;
  }

  function validateSignupName() {
    const val = signupName.value.trim();
    if (!val) {
      showError(signupName.closest('.input-wrapper'), signupNameError, 'O nome é obrigatório.');
      return false;
    }
    clearError(signupName.closest('.input-wrapper'), signupNameError);
    return true;
  }

  function validateSignupIdentity() {
    const val = signupIdentity.value.trim();
    if (!val) {
      showError(signupIdentityWrap, signupIdentityError, 'Este campo é obrigatório.');
      return false;
    }
    if (signupFieldMode === 'email') {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(val)) {
        showError(signupIdentityWrap, signupIdentityError, 'Digite um e-mail válido.');
        return false;
      }
    }
    if (signupFieldMode === 'phone') {
      const digits = rawDigits(val);
      if (digits.length < 10 || digits.length > 11) {
        showError(signupIdentityWrap, signupIdentityError, 'Digite um telefone válido.');
        return false;
      }
    }
    
    const users = getRegisteredUsers();
    if (users.some(u => u.identity === val)) {
      showError(signupIdentityWrap, signupIdentityError, 'Esta conta já está cadastrada.');
      return false;
    }

    clearError(signupIdentityWrap, signupIdentityError);
    return true;
  }

  function validateSignupPassword() {
    const val = signupPassword.value;
    if (!val) {
      showError(signupPassword.closest('.input-wrapper'), signupPasswordError, 'A senha é obrigatória.');
      return false;
    }
    if (val.length < 4) {
      showError(signupPassword.closest('.input-wrapper'), signupPasswordError, 'Mínimo de 4 caracteres.');
      return false;
    }
    clearError(signupPassword.closest('.input-wrapper'), signupPasswordError);
    return true;
  }

  // ─── Toast ─────────────────────────────────
  function showToast(message, type) {
    toastIcon.textContent = type === 'success' ? '✓' : '✕';
    toastMsg.textContent = message;
    toast.className = 'toast show ' + type;
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      toast.className = 'toast';
    }, 3500);
  }

  // ─── Toggle Views ──────────────────────────
  signupLink.addEventListener('click', function (e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    signupCard.style.display = 'block';
    signupCard.style.animation = 'none';
    void signupCard.offsetWidth;
    signupCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  backToLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    signupCard.style.display = 'none';
    loginCard.style.display = 'block';
    loginCard.style.animation = 'none';
    void loginCard.offsetWidth;
    loginCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  // ─── Toggle Password Visibility ────────────
  togglePwdBtn.addEventListener('click', function () {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    eyeOpen.style.display  = isHidden ? 'none'  : 'block';
    eyeClosed.style.display = isHidden ? 'block' : 'none';
  });

  toggleSignupPwdBtn.addEventListener('click', function () {
    const isHidden = signupPassword.type === 'password';
    signupPassword.type = isHidden ? 'text' : 'password';
    signupEyeOpen.style.display  = isHidden ? 'none'  : 'block';
    signupEyeClosed.style.display = isHidden ? 'block' : 'none';
  });

  toggleForgotPwdBtn.addEventListener('click', function () {
    const isHidden = forgotPasswordInput.type === 'password';
    forgotPasswordInput.type = isHidden ? 'text' : 'password';
    forgotEyeOpen.style.display  = isHidden ? 'none'  : 'block';
    forgotEyeClosed.style.display = isHidden ? 'block' : 'none';
  });

  toggleForgotConfirmBtn.addEventListener('click', function () {
    const isHidden = forgotConfirmInput.type === 'password';
    forgotConfirmInput.type = isHidden ? 'text' : 'password';
    forgotConfirmEyeOpen.style.display  = isHidden ? 'none'  : 'block';
    forgotConfirmEyeClosed.style.display = isHidden ? 'block' : 'none';
  });

  // ─── Input Events ─────────────────────────
  identityInput.addEventListener('input', function () {
    detectAndFormat();
    if (identityWrap.classList.contains('error')) validateIdentity();
  });

  passwordInput.addEventListener('input', function () {
    if (passwordInput.closest('.input-wrapper').classList.contains('error')) validatePassword();
  });

  signupName.addEventListener('input', function () {
    if (signupName.closest('.input-wrapper').classList.contains('error')) validateSignupName();
  });

  signupIdentity.addEventListener('input', function () {
    detectAndFormatSignup();
    if (signupIdentityWrap.classList.contains('error')) validateSignupIdentity();
  });

  signupPassword.addEventListener('input', function () {
    if (signupPassword.closest('.input-wrapper').classList.contains('error')) validateSignupPassword();
  });

  // ─── Form Submits ──────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isIdentityOk  = validateIdentity();
    const isPasswordOk  = validatePassword();

    if (!isIdentityOk || !isPasswordOk) {
      loginCard.style.animation = 'none';
      void loginCard.offsetWidth;
      loginCard.style.animation = 'shake 0.4s ease';
      return;
    }

    btnLogin.classList.add('loading');
    btnLogin.disabled = true;

    setTimeout(function () {
      btnLogin.classList.remove('loading');
      btnLogin.disabled = false;

      const users = getRegisteredUsers();
      const enteredIdentity = identityInput.value.trim();
      const enteredPassword = passwordInput.value;

      const user = users.find(u => u.identity === enteredIdentity && u.password === enteredPassword);

      if (user) {
        showToast(`Bem-vindo(a), ${user.name}!`, 'success');
        identityWrap.classList.add('success');
        passwordInput.closest('.input-wrapper').classList.add('success');

        if (rememberMe.checked) {
          saveToCache({
            identity: enteredIdentity,
            identityType: fieldMode,
            rememberMe: true,
            lastLogin: new Date().toISOString()
          });
        } else {
          clearCache();
        }
      } else {
        showToast('Credenciais inválidas ou usuário não encontrado.', 'error');
        loginCard.style.animation = 'none';
        void loginCard.offsetWidth;
        loginCard.style.animation = 'shake 0.4s ease';
      }
    }, 1200);
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameOk = validateSignupName();
    const isIdentityOk = validateSignupIdentity();
    const isPwdOk = validateSignupPassword();

    if (!isNameOk || !isIdentityOk || !isPwdOk) {
      signupCard.style.animation = 'none';
      void signupCard.offsetWidth;
      signupCard.style.animation = 'shake 0.4s ease';
      return;
    }

    btnSignup.classList.add('loading');
    btnSignup.disabled = true;

    setTimeout(() => {
      saveUser({
        name: signupName.value.trim(),
        identity: signupIdentity.value.trim(),
        password: signupPassword.value
      });

      btnSignup.classList.remove('loading');
      btnSignup.disabled = false;
      showToast('Cadastro realizado com sucesso!', 'success');
      
      signupForm.reset();
      setSignupMode('none');
      
      backToLoginLink.click();
    }, 1500);
  });

  // ─── Forgot Password ──────────────────────
  document.getElementById('forgotPassword').addEventListener('click', function (e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    forgotCard.style.display = 'block';
    forgotCard.style.animation = 'none';
    void forgotCard.offsetWidth;
    forgotCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  backToLoginFromForgotLink.addEventListener('click', function (e) {
    e.preventDefault();
    forgotCard.style.display = 'none';
    loginCard.style.display = 'block';
    loginCard.style.animation = 'none';
    void loginCard.offsetWidth;
    loginCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  function validateForgotPwd() {
    const val = forgotPasswordInput.value;
    if (!val) {
      showError(forgotPasswordInput.closest('.input-wrapper'), forgotPasswordError, 'A senha é obrigatória.');
      return false;
    }
    if (val.length < 4) {
      showError(forgotPasswordInput.closest('.input-wrapper'), forgotPasswordError, 'Mínimo de 4 caracteres.');
      return false;
    }
    clearError(forgotPasswordInput.closest('.input-wrapper'), forgotPasswordError);
    return true;
  }

  function validateForgotConfirm() {
    const pwd = forgotPasswordInput.value;
    const confirm = forgotConfirmInput.value;
    if (!confirm) {
      showError(forgotConfirmInput.closest('.input-wrapper'), forgotConfirmError, 'Confirme a senha.');
      return false;
    }
    if (pwd !== confirm) {
      showError(forgotConfirmInput.closest('.input-wrapper'), forgotConfirmError, 'As senhas não coincidem.');
      return false;
    }
    clearError(forgotConfirmInput.closest('.input-wrapper'), forgotConfirmError);
    return true;
  }

  forgotPasswordInput.addEventListener('input', function () {
    if (forgotPasswordInput.closest('.input-wrapper').classList.contains('error')) validateForgotPwd();
  });

  forgotConfirmInput.addEventListener('input', function () {
    if (forgotConfirmInput.closest('.input-wrapper').classList.contains('error')) validateForgotConfirm();
  });

  forgotForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const isPwdOk = validateForgotPwd();
    const isConfirmOk = validateForgotConfirm();

    if (!isPwdOk || !isConfirmOk) {
      forgotCard.style.animation = 'none';
      void forgotCard.offsetWidth;
      forgotCard.style.animation = 'shake 0.4s ease';
      return;
    }

    btnForgotSubmit.classList.add('loading');
    btnForgotSubmit.disabled = true;

    setTimeout(() => {
      btnForgotSubmit.classList.remove('loading');
      btnForgotSubmit.disabled = false;
      showToast('Senha alterada com sucesso!', 'success');
      
      forgotForm.reset();
      
      backToLoginFromForgotLink.click();
    }, 1500);
  });

  // ─── Google / Apple Login ─────────────────
  btnGoogleAuth.addEventListener('click', function (e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    googleCard.style.display = 'block';
    googleCard.style.animation = 'none';
    void googleCard.offsetWidth;
    googleCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  btnAppleAuth.addEventListener('click', function (e) {
    e.preventDefault();
    loginCard.style.display = 'none';
    appleCard.style.display = 'block';
    appleCard.style.animation = 'none';
    void appleCard.offsetWidth;
    appleCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  backToLoginFromGoogle.addEventListener('click', function (e) {
    e.preventDefault();
    googleCard.style.display = 'none';
    loginCard.style.display = 'block';
    loginCard.style.animation = 'none';
    void loginCard.offsetWidth;
    loginCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  backToLoginFromApple.addEventListener('click', function (e) {
    e.preventDefault();
    appleCard.style.display = 'none';
    loginCard.style.display = 'block';
    loginCard.style.animation = 'none';
    void loginCard.offsetWidth;
    loginCard.style.animation = 'cardEntrance 0.8s var(--transition-smooth) both';
  });

  googleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    btnGoogleSubmit.classList.add('loading');
    btnGoogleSubmit.disabled = true;
    setTimeout(() => {
      btnGoogleSubmit.classList.remove('loading');
      btnGoogleSubmit.disabled = false;
      showToast('Autenticado com Google com sucesso!', 'success');
      googleForm.reset();
      backToLoginFromGoogle.click();
    }, 1500);
  });

  appleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    btnAppleSubmit.classList.add('loading');
    btnAppleSubmit.disabled = true;
    setTimeout(() => {
      btnAppleSubmit.classList.remove('loading');
      btnAppleSubmit.disabled = false;
      showToast('Autenticado com Apple com sucesso!', 'success');
      appleForm.reset();
      backToLoginFromApple.click();
    }, 1500);
  });

  // ─── Restore Cache on Load ─────────────────
  function restoreFromCache() {
    const cached = loadFromCache();
    if (cached && cached.rememberMe) {
      identityInput.value = cached.identity || '';
      rememberMe.checked  = true;
      detectAndFormat();
    }
  }

  restoreFromCache();

  // ─── Shake Keyframes (injected) ────────────
  if (!document.getElementById('shake-style')) {
    var style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }';
    document.head.appendChild(style);
  }

})();
