import React, { useState } from 'react';
import { Package, Download, FileText, Printer, RefreshCw, Shield, Home } from 'lucide-react';

const RetourenlabelGenerator = () => {
  const [currentPage, setCurrentPage] = useState('generator');
  const [senderType, setSenderType] = useState('private');
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderStreet: '',
    senderPostal: '',
    senderCity: '',
    senderCountry: 'Österreich',
    recipientType: 'company',
    recipientName: '',
    recipientStreet: '',
    recipientPostal: '',
    recipientCity: '',
    recipientCountry: 'Deutschland',
    returnNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    if (confirm('Möchtest du wirklich alle Eingaben löschen?')) {
      setFormData({
        senderName: '',
        senderStreet: '',
        senderPostal: '',
        senderCity: '',
        senderCountry: 'Österreich',
        recipientType: 'company',
        recipientName: '',
        recipientStreet: '',
        recipientPostal: '',
        recipientCity: '',
        recipientCountry: 'Deutschland',
        returnNumber: ''
      });
      setSenderType('private');
    }
  };

  const isFormValid = () => {
    return formData.senderName && formData.senderStreet && formData.senderCity &&
           formData.recipientName && formData.recipientStreet && formData.recipientCity;
  };

  const generateTextFile = () => {
    const content = `
Absender: ${formData.senderName}, ${formData.senderStreet}, ${formData.senderPostal} ${formData.senderCity}
_______________________________________________


${formData.recipientName}
${formData.recipientStreet}
${formData.recipientPostal} ${formData.recipientCity}
${formData.recipientCountry}

${formData.returnNumber ? `Retoure ${formData.returnNumber}` : ''}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Retourenlabel_${formData.recipientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printLabel = () => {
    window.print();
  };

  // Datenschutz Seite
  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
          <button
            onClick={() => setCurrentPage('generator')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <Home className="w-4 h-4" />
            Zurück zur App
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Datenschutzerklärung</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold mb-3">1. Verantwortlicher</h2>
              <p>
                Mustermann GmbH<br />
                Musterstraße 123<br />
                1010 Wien, Österreich<br />
                E-Mail: kontakt@beispiel.at
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">2. Grundsatz: Keine Datenspeicherung</h2>
              <p className="mb-3">
                Diese Web-App wurde nach dem Prinzip der Datensparsamkeit entwickelt. 
                <strong> Es werden KEINE personenbezogenen Daten auf Servern gespeichert.</strong>
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Keine Cookies:</strong> Diese App verwendet keine Cookies</li>
                <li><strong>Kein localStorage:</strong> Keine lokale Speicherung im Browser</li>
                <li><strong>Keine Server-Speicherung:</strong> Alle Daten bleiben nur im Arbeitsspeicher (RAM) Ihres Browsers</li>
                <li><strong>Keine Weitergabe:</strong> Es werden keine Daten an Dritte weitergegeben</li>
                <li><strong>Kein Tracking:</strong> Keine Analytics, keine Tracking-Tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">3. Datenverarbeitung</h2>
              <p className="mb-3">
                Die von Ihnen eingegebenen Daten (Name, Adresse, etc.) werden ausschließlich zur 
                Generierung des Retourenlabels verwendet und existieren nur während Ihrer aktiven Nutzung 
                der App in Ihrem Browser.
              </p>
              <p className="font-semibold text-indigo-600">
                Beim Schließen des Browsers, Neuladen der Seite oder Verlassen der App werden 
                alle Daten automatisch und unwiderruflich gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">4. Server-Logs</h2>
              <p>
                Beim Aufruf dieser Website werden durch den Hosting-Provider (Vercel Inc.) 
                technisch notwendige Zugriffsdaten gespeichert:
              </p>
              <ul className="list-disc ml-6 space-y-1 mt-2">
                <li>IP-Adresse (anonymisiert)</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Browser-Typ und Version</li>
                <li>Betriebssystem</li>
              </ul>
              <p className="mt-2">
                Diese Daten werden ausschließlich zur Gewährleistung der Funktionsfähigkeit 
                und Sicherheit der Website verwendet und nach 7 Tagen automatisch gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">5. Ihre Rechte</h2>
              <p>
                Da wir keine personenbezogenen Daten speichern, entstehen auch keine Rechte auf 
                Auskunft, Berichtigung oder Löschung von gespeicherten Daten. Die Daten existieren 
                nur temporär in Ihrem Browser und werden automatisch gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">6. SSL-Verschlüsselung</h2>
              <p>
                Diese Website nutzt aus Sicherheitsgründen eine SSL-Verschlüsselung. 
                Dadurch werden übertragene Daten vor dem Zugriff durch Dritte geschützt.
              </p>
            </section>

            <section className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-800 mb-2">Zusammenfassung</h3>
              <p className="text-green-700">
                Diese App ist bewusst so gestaltet, dass sie keine Datenschutzrisiken birgt. 
                Ihre Daten bleiben ausschließlich in Ihrem Browser und werden niemals gespeichert, 
                übertragen oder analysiert.
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Stand: Oktober 2025
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Impressum Seite
  if (currentPage === 'imprint') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 my-8">
          <button
            onClick={() => setCurrentPage('generator')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <Home className="w-4 h-4" />
            Zurück zur App
          </button>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Impressum</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold mb-3">Angaben gemäß § 5 TMG</h2>
              <p>
                Mustermann GmbH<br />
                Musterstraße 123<br />
                1010 Wien<br />
                Österreich
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Kontakt</h2>
              <p>
                E-Mail: kontakt@beispiel.at<br />
                Telefon: +43 1 234567
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Haftungsausschluss</h2>
              <h3 className="font-bold mt-4 mb-2">Haftung für Inhalte</h3>
              <p>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. 
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir 
                jedoch keine Gewähr übernehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                unterliegen dem österreichischen Urheberrecht.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Hauptseite (Generator)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Datenschutz-Hinweis Banner */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-sm">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-green-800">
              <strong>100% Datenschutz:</strong> Diese App speichert keine Daten. 
              Alle Eingaben bleiben nur in deinem Browser und werden nach dem Schließen automatisch gelöscht. 
              Keine Cookies, kein Tracking, keine Server-Speicherung.
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Retourenlabel Generator
          </h1>
          <p className="text-gray-600">
            Erstelle professionelle Retourenlabels in Sekunden
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Sender Type Toggle */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => {
                  setSenderType('private');
                  setFormData({...formData, recipientType: 'company'});
                }}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  senderType === 'private'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Privatperson
              </button>
              <button
                onClick={() => {
                  setSenderType('company');
                  setFormData({...formData, recipientType: 'company'});
                }}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  senderType === 'company'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Firma
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Absender */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">1</span>
                Deine Daten (Absender)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {senderType === 'private' ? 'Name *' : 'Firmenname *'}
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={senderType === 'private' ? 'Max Mustermann' : 'Mustermann GmbH'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Straße & Hausnummer *
                  </label>
                  <input
                    type="text"
                    name="senderStreet"
                    value={formData.senderStreet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Musterstraße 123"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PLZ
                    </label>
                    <input
                      type="text"
                      name="senderPostal"
                      value={formData.senderPostal}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="1010"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stadt *
                    </label>
                    <input
                      type="text"
                      name="senderCity"
                      value={formData.senderCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Wien"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land
                  </label>
                  <select
                    name="senderCountry"
                    value={formData.senderCountry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Österreich</option>
                    <option>Deutschland</option>
                    <option>Schweiz</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Empfänger */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">2</span>
                Empfänger
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Firmenname / Name *
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Beispiel GmbH"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Straße & Hausnummer *
                  </label>
                  <input
                    type="text"
                    name="recipientStreet"
                    value={formData.recipientStreet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Firmenstraße 88"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PLZ
                    </label>
                    <input
                      type="text"
                      name="recipientPostal"
                      value={formData.recipientPostal}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="01277"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stadt *
                    </label>
                    <input
                      type="text"
                      name="recipientCity"
                      value={formData.recipientCity}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Dresden"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Land
                  </label>
                  <select
                    name="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option>Deutschland</option>
                    <option>Österreich</option>
                    <option>Schweiz</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retourennummer (optional)
                  </label>
                  <input
                    type="text"
                    name="returnNumber"
                    value={formData.returnNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="1793238"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4 justify-center flex-wrap">
            <button
              onClick={generateTextFile}
              disabled={!isFormValid()}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-5 h-5" />
              Als Textdatei herunterladen
            </button>

            <button
              onClick={printLabel}
              disabled={!isFormValid()}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Printer className="w-5 h-5" />
              Drucken
            </button>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Zurücksetzen
            </button>
          </div>
        </div>

        {/* Vorschau */}
        {isFormValid() && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Vorschau</h2>
            
            <div className="border-4 border-gray-800 p-8 bg-white max-w-md mx-auto" id="label-preview">
              <div className="text-xs border-b border-gray-300 pb-2 mb-4">
                <strong>Absender:</strong><br />
                {formData.senderName}, {formData.senderStreet}, {formData.senderPostal} {formData.senderCity}
              </div>
              
              <div className="text-lg mb-6">
                <div className="font-bold text-xl mb-2">{formData.recipientName}</div>
                <div>{formData.recipientStreet}</div>
                <div>{formData.recipientPostal} {formData.recipientCity}</div>
                <div className="font-bold">{formData.recipientCountry}</div>
              </div>
              
              {formData.returnNumber && (
                <div className="bg-gray-100 border-l-4 border-gray-800 p-3 font-bold">
                  Retoure {formData.returnNumber}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-600 space-x-4">
          <button
            onClick={() => setCurrentPage('privacy')}
            className="hover:text-indigo-600 underline"
          >
            Datenschutzerklärung
          </button>
          <span>•</span>
          <button
            onClick={() => setCurrentPage('imprint')}
            className="hover:text-indigo-600 underline"
          >
            Impressum
          </button>
        </footer>
      </div>
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #label-preview, #label-preview * {
            visibility: visible;
          }
          #label-preview {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RetourenlabelGenerator;