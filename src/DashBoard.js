
  import React, { useState } from 'react';
  import styles from './DashBoard.module.css';
  import Header from './Header';

  function DashBoard() {
  // Estado para el diálogo de autorización
  const [showAuthDialog, setShowAuthDialog] = useState(true);
  const [authUser, setAuthUser] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authError, setAuthError] = useState('');

  // Simulación de autorización
  const handleAuth = (e) => {
    e.preventDefault();
    // Mock: usuario admin, pass 1234
    if (authUser === 'admin' && authPass === '1234') {
      setShowAuthDialog(false);
      setAuthError('');
    } else {
      setAuthError('Usuario o contraseña incorrectos');
    }
  };
  // Estado para descripción normativa de enlaces
  const [linkNormDesc, setLinkNormDesc] = useState('');
  const [linkNormDescs, setLinkNormDescs] = useState({});
  // Estado para ver normativa
  const [showNormDialog, setShowNormDialog] = useState(false);
  const [normDescToShow, setNormDescToShow] = useState('');

  // Simulación de descripciones asociadas a archivos
  const [fileNormDescs, setFileNormDescs] = useState({});


  // Mostrar normativa asociada
  const handleShowNorm = (file) => {
    setNormDescToShow(fileNormDescs[file.name] || 'Sin descripción');
    setShowNormDialog(true);
  };
  // Estado para empresas
  const [companies, setCompanies] = useState(['Empresa 1', 'Empresa 2']);
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Agregar empresa
  const handleAddCompany = () => {
    if (newCompanyName && !companies.includes(newCompanyName)) {
      setCompanies([...companies, newCompanyName]);
      setSelectedCompany(newCompanyName);
      setNewCompanyName('');
      setShowAddDialog(false);
    }
  };

  // Eliminar empresa seleccionada
  const handleDeleteCompany = () => {
    if (selectedCompany) {
      const filtered = companies.filter(c => c !== selectedCompany);
      setCompanies(filtered);
      setSelectedCompany(filtered.length > 0 ? filtered[0] : '');
      setShowDeleteDialog(false);
    }
  };
    const [files, setFiles] = useState([]);
    const [uploadFiles, setUploadFiles] = useState([]);

    // Estado para gestión de enlaces
    const [links, setLinks] = useState([]);
    const [newLinkName, setNewLinkName] = useState('');
    const [newLinkUrl, setNewLinkUrl] = useState('');


  // Funciones para gestión de enlaces
  const handleAddLink = (e) => {
    e.preventDefault();
    if (newLinkName && newLinkUrl) {
      setLinks([...links, { name: newLinkName, url: newLinkUrl }]);
      setLinkNormDescs({ ...linkNormDescs, [newLinkName]: linkNormDesc });
      setNewLinkName('');
      setNewLinkUrl('');
      setLinkNormDesc('');
    }
  };

  const handleRemoveLink = (idx) => {
    const linkName = links[idx]?.name;
    setLinks(links.filter((_, i) => i !== idx));
    if (linkName) {
      const newDescs = { ...linkNormDescs };
      delete newDescs[linkName];
      setLinkNormDescs(newDescs);
    }
  };

    const handleFileChange = (e) => {
      setUploadFiles(Array.from(e.target.files));
    };

  // Al subir archivos, guardar la descripción actual
  const handleUpload = () => {
    setFiles(prev => [...prev, ...uploadFiles]);
    // Asocia la descripción a cada archivo subido
    const desc = document.getElementById('normDesc')?.value || '';
    const newDescs = { ...fileNormDescs };
    uploadFiles.forEach(f => {
      newDescs[f.name] = desc;
    });
    setFileNormDescs(newDescs);
    setUploadFiles([]);
  };

    const handleRemove = (idx) => {
      setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    return (
    <div className={styles.mainContainer}>
      <Header />
      {/* Dialogo de autorización */}
      {showAuthDialog && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <h3>Autorización requerida</h3>
            <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <label>
                Usuario:
                <input
                  type="text"
                  className={styles.input}
                  value={authUser}
                  onChange={e => setAuthUser(e.target.value)}
                  autoFocus
                  required
                />
              </label>
              <label>
                Contraseña:
                <input
                  type="password"
                  className={styles.input}
                  value={authPass}
                  onChange={e => setAuthPass(e.target.value)}
                  required
                />
              </label>
              {authError && <div style={{ color: 'red', fontSize: '0.95rem' }}>{authError}</div>}
              <button type="submit" className={styles.sendButton}>Autorizar</button>
            </form>
          </div>
        </div>
      )}
      {!showAuthDialog && (
        <div className={styles.flexContainer}>
          {/* Sección de selección de empresa */}
          <section className={styles.section}>
            <h2 className={styles.title}>Seleccionar Empresa</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <select
                className={styles.input}
                value={selectedCompany}
                onChange={e => setSelectedCompany(e.target.value)}
                style={{ minWidth: 180 }}
              >
                {companies.map((company, idx) => (
                  <option key={idx} value={company}>{company}</option>
                ))}
              </select>
              <button className={styles.sendButton} onClick={() => setShowAddDialog(true)}>Agregar Empresa</button>
              <button className={styles.actionButton} onClick={() => setShowDeleteDialog(true)} disabled={!selectedCompany}>Eliminar Seleccionada</button>
            </div>
          </section>

          {/* Dialogo para agregar empresa */}
          {showAddDialog && (
            <div className={styles.dialogOverlay}>
              <div className={styles.dialog}>
                <h3>Agregar nueva empresa</h3>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Nombre de la empresa"
                  value={newCompanyName}
                  onChange={e => setNewCompanyName(e.target.value)}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button className={styles.sendButton} onClick={handleAddCompany} disabled={!newCompanyName}>Confirmar</button>
                  <button className={styles.actionButton} onClick={() => setShowAddDialog(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* Dialogo para eliminar empresa */}
          {showDeleteDialog && (
            <div className={styles.dialogOverlay}>
              <div className={styles.dialog}>
                <h3>¿Eliminar la empresa seleccionada?</h3>
                <p>Esta acción no se puede deshacer.</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button className={styles.sendButton} onClick={handleDeleteCompany}>Eliminar</button>
                  <button className={styles.actionButton} onClick={() => setShowDeleteDialog(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* Sección de gestión de archivos */}
          <section className={styles.section}>
            <h2 className={styles.title}>Gestión de Archivos</h2>
            {/* Descripción normativa */}
            <div style={{ marginBottom: 20, width: '100%' }}>
              <label htmlFor="normDesc" style={{ fontWeight: 'bold', marginBottom: 8, display: 'block' }}>Descripción de la normativa</label>
              <textarea
                id="normDesc"
                rows={4}
                style={{ width: '100%', fontSize: '1rem', padding: 8, borderRadius: 6, border: '1px solid #ccc', boxSizing: 'border-box' }}
                placeholder="Ingrese la descripción de la normativa..."
              />
            </div>
            {/* File uploader */}
            <div style={{ marginBottom: 20, width: '100%', display: 'flex', gap: 12, alignItems: 'center' }}>
              <input type="file" multiple onChange={handleFileChange} />
              <button className={styles.uploadButton} onClick={handleUpload} disabled={uploadFiles.length === 0}>Subir</button>
            </div>
            {/* Grilla de archivos */}
            <table className={`${styles.table} ${styles.responsiveTable}`}>
              <thead>
                <tr>
                  <th className={styles.thTd}>Nombre</th>
                  <th className={styles.thTd}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td className={styles.thTd}>{file.name || file.webkitRelativePath || file}</td>
                    <td className={styles.thTd}><button className={styles.actionButton} onClick={() => handleRemove(idx)}>Eliminar</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Sección de gestión de enlaces */}
          <section className={styles.section}>
            <h2 className={styles.title}>Gestión de Enlaces</h2>
            <form onSubmit={handleAddLink} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              <label style={{ fontWeight: 'bold' }}>Nombre del enlace</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nombre del enlace"
                value={newLinkName}
                onChange={e => setNewLinkName(e.target.value)}
                required
              />
              <label style={{ fontWeight: 'bold' }}>URL del archivo</label>
              <input
                type="url"
                className={styles.input}
                placeholder="URL del archivo"
                value={newLinkUrl}
                onChange={e => setNewLinkUrl(e.target.value)}
                required
              />
              <label style={{ fontWeight: 'bold' }}>Descripción de la normativa</label>
              <textarea
                rows={3}
                className={styles.input}
                placeholder="Ingrese la descripción de la normativa..."
                value={linkNormDesc}
                onChange={e => setLinkNormDesc(e.target.value)}
              />
              <button type="submit" className={styles.sendButton}>Agregar enlace</button>
            </form>
            <div className={styles.tableWrapper}>
              <table className={`${styles.table} ${styles.responsiveTable}`} border="1" cellPadding="8">
                <thead>
                  <tr>
                    <th className={styles.thTd} style={{ width: '40%' }}>Nombre</th>
                    <th className={styles.thTd} style={{ width: '30%' }}>Normativa</th>
                    <th className={styles.thTd} style={{ width: '30%' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {links.length === 0 ? (
                    <tr><td colSpan={3} className={styles.thTd}>No hay enlaces agregados.</td></tr>
                  ) : (
                    links.map((link, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                        <td className={styles.thTd}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
                        </td>
                        <td className={styles.thTd}>
                          <button className={styles.actionButton} onClick={() => {
                            setNormDescToShow(linkNormDescs[link.name] || 'Sin descripción');
                            setShowNormDialog(true);
                          }}>Ver</button>
                        </td>
                        <td className={`${styles.thTd} ${styles.actionsCell}`}>
                          <button className={styles.actionButton} onClick={() => window.open(link.url, '_blank')}>Descargar</button>
                          <button className={styles.actionButton} onClick={() => handleRemoveLink(idx)}>Eliminar</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sección Generar Cartel Normativo QR */}
          <section className={styles.section}>
            <h2 className={styles.title}>Generar Cartel Normativo QR</h2>
            <button className={styles.sendButton} onClick={() => alert('Generando y descargando cartel QR...')}>Generar y Descargar</button>
          </section>

          <section className={styles.section}>
            <h3 className={styles.subtitle}>Documentación de la Empresa{selectedCompany ? `: ${selectedCompany}` : ''}</h3>
            <div className={styles.tableWrapper}>
              <table className={`${styles.table} ${styles.responsiveTable}`}>
                <thead>
                  <tr>
                    <th className={styles.thTd}>Nombre</th>
                    <th className={styles.thTd}>Normativa</th>
                    <th className={styles.thTd}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                      <td className={styles.thTd}>{file.name}</td>
                      <td className={styles.thTd}>
                        <button className={styles.actionButton} onClick={() => handleShowNorm(file)}>Ver</button>
                      </td>
                      <td className={styles.thTd}><button className={styles.actionButton} onClick={() => handleRemove(idx)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dialogo para ver normativa */}
          {showNormDialog && (
            <div className={styles.dialogOverlay}>
              <div className={styles.dialog}>
                <h3>Descripción de la normativa</h3>
                <div style={{ margin: '16px 0', whiteSpace: 'pre-line' }}>{normDescToShow}</div>
                <button className={styles.sendButton} onClick={() => setShowNormDialog(false)}>Cerrar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DashBoard;
