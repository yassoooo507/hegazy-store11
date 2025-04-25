import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('hegazy_users') || '{}');
    if (users[username] && users[username] === password) {
      localStorage.setItem('hegazy_logged_in', username);
      navigate('/');
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div style={styles.container}>
      <h2>تسجيل الدخول</h2>
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
        <button type="submit" style={styles.button}>تسجيل الدخول</button>
      </form>
      <p>
        ليس لديك حساب؟ <Link to="/signup">إنشاء حساب</Link>
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

export default Login;
