import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('كلمتا المرور غير متطابقتين');
      return;
    }
    let users = JSON.parse(localStorage.getItem('hegazy_users') || '{}');
    if (users[username]) {
      alert('اسم المستخدم موجود بالفعل');
      return;
    }
    users[username] = password;
    localStorage.setItem('hegazy_users', JSON.stringify(users));
    alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
    localStorage.setItem('hegazy_logged_in', username);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>إنشاء حساب</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>إنشاء حساب</button>
      </form>
      <p>
        هل لديك حساب؟ <Link to="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#ffffff',
    color: '#000000',
    margin: 0,
    padding: 30,
    maxWidth: 400,
    width: '100%',
    border: '1px solid #000000',
    borderRadius: 8,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 20,
    border: '1px solid #333',
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    border: '1px solid #000000',
    color: '#000000',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 20,
    borderRadius: 4,
    textTransform: 'uppercase',
  },
};

export default Signup;
