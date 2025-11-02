

// import React, { useState } from 'react';
// import API from '../api';

// export default function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const [skills, setSkills] = useState('');
//   const [image, setImage] = useState('');
//   const [cv, setCv] = useState('');

//   const handle = async (e) => {
//     e.preventDefault();
//     try {
//       const skillsArray = skills.split(',').map(s => s.trim()); 

//       const res = await API.post('/auth/register', {
//         name, email, password, phone, skills: skillsArray, image, cv
//       });

//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       window.location.href = '/jobs';
//     } catch (err) {
//       alert(err.response?.data?.message || 'Register failed');
//     }
//   };

//   return (
//     <div>
//       <div className="navbar">Job Tracker</div>
//       <div className="container">
//         <h2>Register</h2>
//         <form onSubmit={handle} className="card">
//           <div>
//             <label>Name</label><br/>
//             <input value={name} onChange={e => setName(e.target.value)} required />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>Email</label><br/>
//             <input value={email} onChange={e => setEmail(e.target.value)} required />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>Password</label><br/>
//             <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>Phone</label><br/>
//             <input value={phone} onChange={e => setPhone(e.target.value)} />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>Skills (comma separated)</label><br/>
//             <input value={skills} onChange={e => setSkills(e.target.value)} />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>Profile Image URL</label><br/>
//             <input value={image} onChange={e => setImage(e.target.value)} />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <label>CV URL</label><br/>
//             <input value={cv} onChange={e => setCv(e.target.value)} />
//           </div>

//           <div style={{ marginTop: 8 }}>
//             <button className="btn">Register</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import API from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phone', phone);
      formData.append('skills', skills);
      if (image) formData.append('image', image);
      if (cv) formData.append('cv', cv);

      const res = await API.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/jobs';
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* <div style={styles.navbar}>Job Tracker</div> */}

      <div style={styles.cardContainer}>
        <form onSubmit={handle} style={styles.card} encType="multipart/form-data">
          <h2 style={styles.title}>Create an Account</h2>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input
                style={styles.input}
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                style={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input
                style={styles.input}
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Skills (comma separated)</label>
              <input
                style={styles.input}
                value={skills}
                onChange={e => setSkills(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Profile Image</label>
              <input
                type="file"
                style={styles.inputFile}
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.field, width: '100%' }}>
              <label style={styles.label}>CV (optional)</label>
              <input
                type="file"
                style={styles.inputFile}
                accept=".pdf,.doc,.docx"
                onChange={e => setCv(e.target.files[0])}
              />
            </div>
          </div>

          <button style={styles.button}>Register</button>

          <p style={styles.linkText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e8d7ff 0%, #c7b2ff 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    background: '#6b3fa0',
    color: '#fff',
    padding: '15px 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  cardContainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    background: '#fff',
    padding: '35px',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '700px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#6b3fa0',
  },
  row: {
    display: 'flex',
    gap: '50px',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  field: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
  inputFile: {
    padding: '8px 0',
  },
  button: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: '#6b3fa0',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s ease',
  },
  linkText: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#555',
  },
  link: {
    color: '#6b3fa0',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};
