




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Public.module.css';

function Public() {
  const { key } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentFile, setCommentFile] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [inspectorId, setInspectorId] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showNormDialog, setShowNormDialog] = useState(false);
  const [normFile, setNormFile] = useState(null);


  useEffect(() => {
    // Simulación de llamada a API con normativas mock
    setLoading(true);
    setTimeout(() => {
      setFiles([
        {
          name: 'Documento1.pdf',
          normativa: 'Esta es la descripción normativa del Documento1.pdf. Cumple con la ley 1234 y el decreto 5678.'
        },
        {
          name: 'Documento2.docx',
          normativa: 'Documento2.docx está regulado por la resolución 4321 y la norma ISO 9001.'
        },
        {
          name: 'Documento3.xlsx',
          normativa: 'Normativa para Documento3.xlsx: Reglamento interno de la empresa y ley 8765.'
        },
      ]);
      setLoading(false);
    }, 800);
  }, [key]);
  const handleOpenNormDialog = (file) => {
    setNormFile(file);
    setShowNormDialog(true);
  };

  const handleCloseNormDialog = () => {
    setShowNormDialog(false);
    setNormFile(null);
  };

  const handleOpenCommentDialog = (file) => {
    setCommentFile(file);
    setShowCommentDialog(true);
    setCommentText('');
    setInspectorId('');
    setSent(false);
  };

  const handleCloseDialog = () => {
    setShowCommentDialog(false);
    setCommentFile(null);
    setCommentText('');
    setInspectorId('');
    setSent(false);
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        <div className={styles.title}>CENTRO DE DOCUMENTOS LEGALES</div>
      </header>
      <div className={styles.flexContainer}>
        {/* Sección Comentar */}
        <section className={styles.section}>
          <div className={styles.commentBox}>
            <h3 className={styles.commentTitle}>Comentar</h3>
            <textarea
              className={styles.textarea}
              placeholder="Deja tu mensaje aquí..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
            />
            <button className={styles.sendButton}>Enviar comentario</button>
          </div>
        </section>

        {/* Sección Documentos */}
        <section className={styles.section}>
          <h2 className={styles.docsTitle}>Documentos de: {key}</h2>
          {loading ? (
            <p>Loading files...</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={`${styles.table} ${styles.responsiveTable}`} border="1" cellPadding="8">
                <thead>
                  <tr>
                    <th className={styles.thTd} style={{ width: '60%' }}>Nombre</th>
                    <th className={styles.thTd} style={{ width: '40%' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {files.length === 0 ? (
                    <tr><td colSpan={2} className={styles.thTd}>No files found for this key.</td></tr>
                  ) : (
                    files.map((file, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                        <td className={styles.thTd}>{file.name}</td>
                        <td className={`${styles.thTd} ${styles.actionsCell}`}>
                          <button className={styles.actionButton} onClick={() => alert('Descargando ' + file.name)}>Descargar</button>
                          <button className={styles.actionButton} onClick={() => handleOpenCommentDialog(file)}>Comentar</button>
                          <button className={styles.actionButton} onClick={() => handleOpenNormDialog(file)}>Ver normativa</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {showCommentDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
              <button className={styles.closeButton} onClick={handleCloseDialog}>×</button>
              <h3>Comentar sobre: {commentFile?.name}</h3>
              <form onSubmit={handleSendComment}>
                <label>
                  Comentario:
                  <textarea
                    className={styles.textarea}
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Identificador de inspector:
                  <input
                    type="text"
                    className={styles.input}
                    value={inspectorId}
                    onChange={e => setInspectorId(e.target.value)}
                    required
                  />
                </label>
                <button type="submit" className={styles.sendButton} disabled={sending}>Enviar</button>
                {sent && <div className={styles.sentMsg}>¡Comentario enviado!</div>}
              </form>
            </div>
          </div>
        )}

        {showNormDialog && (
          <div className={styles.dialogOverlay}>
            <div className={styles.dialog}>
              <button className={styles.closeButton} onClick={handleCloseNormDialog}>×</button>
              <h3>Descripción normativa del documento</h3>
              <div className={styles.normText}>{normFile?.normativa}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Public;
