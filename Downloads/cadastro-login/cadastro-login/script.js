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
  const signupObra    = document.getElementById('signupObra');
  const signupObraError = document.getElementById('signupObraError');

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

  // Dashboard DOM
  const dashboardCard = document.getElementById('dashboardCard');
  const btnLogout     = document.getElementById('btnLogout');
  
  // Tabs
  const tabHome       = document.getElementById('tabHome');
  const tabArquivos   = document.getElementById('tabArquivos');
  const tabProfile    = document.getElementById('tabProfile');
  
  // Panels
  const panelHome     = document.getElementById('panelHome');
  const panelArquivos = document.getElementById('panelArquivos');
  const panelProfile  = document.getElementById('panelProfile');
  
  const fileUpload    = document.getElementById('fileUpload');
  const fileUploadLabel= document.getElementById('fileUploadLabel');
  const uploadNF      = document.getElementById('uploadNF');
  const uploadData    = document.getElementById('uploadData');
  const searchNF = document.getElementById('searchNF');
  const searchDate = document.getElementById('searchDate');
  const dashWelcomeName = document.getElementById('dashWelcomeName');
  const profileName   = document.getElementById('profileName');
  const profileIdentity= document.getElementById('profileIdentity');
  const profileObra   = document.getElementById('profileObra');
  const btnSaveFile      = document.getElementById('btnSaveFile');
  const filterArquivos   = document.getElementById('filterArquivos');
  const arquivosList     = document.getElementById('arquivosList');

  let fieldMode = 'none';
  let signupFieldMode = 'none';
  let isAdmin = true; // Definido como true para permitir gerenciamento completo

  // ─── SVG Icons ─────────────────────────────
  const ICONS = {
    user:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    email: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>',
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
  };



  // ─── API Helpers ───────────────────────────
  const STORAGE_KEY = 'login_cache';
  const API_URL = 'http://localhost:8081/api';

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

  // ─── Default Date ──────────────────────────
  function setDefaultDate() {
    const uploadData = document.getElementById('uploadData');
    if (uploadData) {
      const today = new Date().toISOString().split('T')[0];
      uploadData.value = today;
    }
  }
  setDefaultDate();

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

  function validateSignupObra() {
    const val = signupObra.value.trim();
    if (!val) {
      showError(signupObra.closest('.input-wrapper'), signupObraError, 'O nome da obra é obrigatório.');
      return false;
    }
    clearError(signupObra.closest('.input-wrapper'), signupObraError);
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

  // ─── Centralized Card Navigation ───────────
  function showCard(targetCard) {
    if (!targetCard) return;
    // Hide all possible cards
    [loginCard, signupCard, forgotCard, googleCard, appleCard, dashboardCard].forEach(c => {
      if (c) c.style.display = 'none';
    });
    // Show the target card
    targetCard.style.display = 'block';
    targetCard.style.animation = 'cardEntrance 0.8s ease both';
  }

  // Cadastre-se
  if (signupLink) {
    signupLink.addEventListener('click', function (e) {
      e.preventDefault();
      showCard(signupCard);
    });
  }

  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', function (e) {
      e.preventDefault();
      showCard(loginCard);
    });
  }

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

      const enteredIdentity = identityInput.value.trim();
      const enteredPassword = passwordInput.value;

      fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: enteredIdentity, password: enteredPassword })
      })
      .then(response => {
        if (!response.ok) throw new Error('Credenciais inválidas');
        return response.json();
      })
      .then(user => {
        showToast(`Bem-vindo(a), ${user.name}!`, 'success');
        identityWrap.classList.add('success');
        passwordInput.closest('.input-wrapper').classList.add('success');

        const sessionData = {
          identity: enteredIdentity,
          identityType: fieldMode,
          rememberMe: rememberMe.checked,
          lastLogin: new Date().toISOString(),
          activeUser: user,
          isLoggedIn: true
        };
        saveToCache(sessionData);
        
        setTimeout(() => {
          showDashboard(user);
        }, 500);
      })
      .catch(err => {
        showToast('Credenciais inválidas ou usuário não encontrado.', 'error');
        loginCard.style.animation = 'none';
        void loginCard.offsetWidth;
        loginCard.style.animation = 'shake 0.4s ease';
      });
    }, 1200);
  });

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameOk = validateSignupName();
    const isObraOk = validateSignupObra();
    const isIdentityOk = validateSignupIdentity();
    const isPwdOk = validateSignupPassword();

    if (!isNameOk || !isObraOk || !isIdentityOk || !isPwdOk) {
      signupCard.style.animation = 'none';
      void signupCard.offsetWidth;
      signupCard.style.animation = 'shake 0.4s ease';
      return;
    }

    btnSignup.classList.add('loading');
    btnSignup.disabled = true;

    setTimeout(() => {
      fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: signupName.value.trim(),
          obra: signupObra.value.trim(),
          identity: signupIdentity.value.trim(),
          password: signupPassword.value
        })
      })
      .then(response => {
        if (response.status === 409) throw new Error('Usuário já existe');
        if (!response.ok) throw new Error('Erro ao cadastrar');
        return response.text();
      })
      .then(msg => {
        btnSignup.classList.remove('loading');
        btnSignup.disabled = false;
        showToast('Cadastro realizado com sucesso!', 'success');
        
        signupForm.reset();
        setSignupMode('none');
        
        backToLoginLink.click();
      })
      .catch(err => {
        btnSignup.classList.remove('loading');
        btnSignup.disabled = false;
        showToast(err.message, 'error');
      });
    }, 1500);
  });

  // ─── Forgot Password ──────────────────────
  document.getElementById('forgotPassword').addEventListener('click', function (e) {
    e.preventDefault();
    showCard(forgotCard);
  });

  backToLoginFromForgotLink.addEventListener('click', function (e) {
    e.preventDefault();
    forgotForm.reset();
    showCard(loginCard);
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
    showCard(googleCard);
  });

  btnAppleAuth.addEventListener('click', function (e) {
    e.preventDefault();
    showCard(appleCard);
  });

  backToLoginFromGoogle.addEventListener('click', function (e) {
    e.preventDefault();
    googleForm.reset();
    showCard(loginCard);
  });

  backToLoginFromApple.addEventListener('click', function (e) {
    e.preventDefault();
    appleForm.reset();
    showCard(loginCard);
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
      showCard(loginCard);
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
      showCard(loginCard);
    }, 1500);
  });

  // ─── Restore Cache on Load ─────────────────
  function restoreFromCache() {
    const cached = loadFromCache();
    if (cached) {
      if (cached.isLoggedIn && cached.activeUser) {
        showDashboard(cached.activeUser);
      } else if (cached.rememberMe) {
        identityInput.value = cached.identity || '';
        rememberMe.checked  = true;
        detectAndFormat();
      }
    }
  }

  // ─── Dashboard Logic ───────────────────────
  function showDashboard(user) {
    showCard(dashboardCard);

    dashWelcomeName.textContent = user.name.split(' ')[0];
    profileName.textContent = user.name;
    profileIdentity.textContent = user.identity;
    
    if (profileObra) {
      profileObra.textContent = user.obra || '-';
    }

    switchTab(tabHome, panelHome);
    renderArquivos();
  }

  btnLogout.addEventListener('click', () => {
    const cached = loadFromCache();
    if (cached) {
      cached.isLoggedIn = false;
      cached.activeUser = null;
      if (!cached.rememberMe) cached.identity = '';
      saveToCache(cached);
    }
    form.reset();
    identityWrap.classList.remove('success');
    passwordInput.closest('.input-wrapper').classList.remove('success');
    showCard(loginCard);
    if (cached && cached.rememberMe && cached.identity) {
      identityInput.value = cached.identity;
      detectAndFormat();
    }
  });

  const allTabs = [tabHome, tabArquivos, tabProfile];
  const allPanels = [panelHome, panelArquivos, panelProfile];

  function switchTab(activeTab, activePanel) {
    allTabs.forEach(t => t.classList.remove('active'));
    allPanels.forEach(p => p.classList.remove('active'));
    
    activeTab.classList.add('active');
    activePanel.classList.add('active');
  }

  tabHome.addEventListener('click', () => switchTab(tabHome, panelHome));
  tabArquivos.addEventListener('click', () => switchTab(tabArquivos, panelArquivos));
  tabProfile.addEventListener('click', () => switchTab(tabProfile, panelProfile));

  fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      fileUploadLabel.textContent = e.target.files[0].name;
    } else {
      fileUploadLabel.textContent = 'Escolher Arquivo';
    }
  });

  btnSaveFile.addEventListener('click', () => {
    if (fileUpload.files.length === 0) {
      showToast('Selecione um arquivo primeiro.', 'error');
      return;
    }
    const enteredNF = uploadNF.value.trim();
    if (!enteredNF || !uploadData.value) {
      showToast('Preencha a NF e a Data de Moldagem.', 'error');
      return;
    }

    const file = fileUpload.files[0];
    
    const cached = loadFromCache();
    if (!cached || !cached.activeUser) return;

    btnSaveFile.classList.add('loading');
    btnSaveFile.disabled = true;

    // Verificar se a NF já existe no servidor antes de salvar
    fetch(API_URL + '/arquivos/obra/' + cached.activeUser.obra)
      .then(res => res.ok ? res.json() : [])
      .then(filesData => {
        const nfExists = filesData && filesData.some(f => f.nf === enteredNF);
        if (nfExists) {
          showToast('número de NF já adicionada!', 'error');
          btnSaveFile.classList.remove('loading');
          btnSaveFile.disabled = false;
          return; // Para o processo aqui
        }

        // Se não existir, procede com o salvamento
        const reader = new FileReader();
        reader.onload = function(event) {
          const fileData = event.target.result; // Base64 Data URL

        const novoArquivo = {
          name: file.name,
          nf: uploadNF.value.trim(),
          date: uploadData.value,
          timestamp: Date.now(),
          content: fileData
        };

        fetch(API_URL + '/arquivos/obra/' + cached.activeUser.obra, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(novoArquivo)
        })
        .then(res => {
          if(!res.ok) throw new Error('Erro ao salvar no servidor');
          return res.text();
        })
        .then(() => {
          showToast(`Arquivo salvo com sucesso!`, 'success');
          
          // Reset form
          fileUpload.value = '';
          fileUploadLabel.textContent = 'Escolher Arquivo';
          uploadNF.value = '';
          setDefaultDate();

          renderArquivos();
        })
        .catch(err => {
          showToast(err.message, 'error');
        });
        
        btnSaveFile.classList.remove('loading');
        btnSaveFile.disabled = false;
      }; // <-- Close reader.onload

      reader.readAsDataURL(file);
    })
      .catch(err => {
        showToast('Erro ao verificar NF.', 'error');
        btnSaveFile.classList.remove('loading');
        btnSaveFile.disabled = false;
      });
  });

  // renderArquivos will be defined below

  // Update render function to handle filters and search
  function renderArquivos() {
    const cached = loadFromCache();
    if (!cached || !cached.activeUser) return;
    
    fetch(API_URL + '/arquivos/obra/' + cached.activeUser.obra)
      .then(res => res.json())
      .then(filesData => {
        if (!filesData || filesData.length === 0) {
          arquivosList.innerHTML = '<p style="color: var(--clr-text-muted);">Nenhum arquivo encontrado.</p>';
          return;
        }

        let files = [...filesData];
        const filter = filterArquivos.value;
        const nfQuery = searchNF.value.trim().toLowerCase();
        const dateQuery = searchDate.value;

        // Apply filter ordering
        if (filter === 'recent') {
          files.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        } else if (filter === 'data') {
          files.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
        } else if (filter === 'nf') {
          files.sort((a, b) => (a.nf || '').localeCompare(b.nf || ''));
        }

        // Apply search queries
        if (nfQuery) {
          files = files.filter(f => (f.nf || '').toLowerCase().includes(nfQuery));
        }
        if (dateQuery) {
          files = files.filter(f => f.date === dateQuery);
        }

        arquivosList.innerHTML = '';
        files.forEach((f, idx) => {
          const name = typeof f === 'object' ? f.name : f;
          const nf = typeof f === 'object' && f.nf ? f.nf : 'N/A';
          const date = typeof f === 'object' && f.date ? new Date(f.date + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A';
          const content = typeof f === 'object' ? f.content : null;

          const div = document.createElement('div');
          div.className = 'file-item';
          
          let inner = `
            <div class="file-item-title">${name}</div>
            <div class="file-item-meta">
              <span>NF: ${nf}</span>
              <span>Data: ${date}</span>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">`;
          
          if (content) {
            inner += `<a href="${content}" download="${name}" class="btn-open" style="background:var(--clr-primary);color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">Baixar Arquivo</a>`;
          }
          
          if (isAdmin) {
            inner += `<button type="button" class="btn-delete" data-idx="${idx}" style="background:#e11d48;color:#fff;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:0.8rem;margin-left:auto;">Excluir</button>`;
          }
          
          inner += `</div>`;
          div.innerHTML = inner;
          arquivosList.appendChild(div);
        });

        // Attach delete handlers only if admin
        if (isAdmin) {
          const deleteButtons = arquivosList.querySelectorAll('.btn-delete');
          deleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
              const idx = parseInt(btn.getAttribute('data-idx'));
              deleteFile(idx);
            });
          });
        }
      })
      .catch(err => {
         arquivosList.innerHTML = '<p style="color: var(--clr-text-muted);">Erro ao carregar arquivos do servidor.</p>';
      });
  }

  function deleteFile(index) {
    if (!isAdmin) {
      showToast('Você não tem permissão para excluir arquivos.', 'error');
      return;
    }
    showToast('Ação de deletar arquivo será implementada na API futuramente.', 'success');
  }

  // Attach filter/search listeners
  filterArquivos.addEventListener('change', renderArquivos);
  searchNF.addEventListener('input', renderArquivos);
  searchDate.addEventListener('change', renderArquivos);

  // Restaurar sessão ao final após todas as variáveis estarem inicializadas
  restoreFromCache();

})();
